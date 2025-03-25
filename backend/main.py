from typing import Optional, List
from loguru import logger
from fastapi import FastAPI, Query, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from schema.schema import *
from login.login import *
from signup.signup import *
from update.update_details import *
from candidates.get_candidates import *
from candidates.add_candidates import *
from delete.delete import *
from forgot_password.forgot_password import *
from forgot_password.reset_password import *
from utility.auth import create_access_token, get_current_user  # ✅ Import authentication functions
import uvicorn
from datetime import timedelta

app = FastAPI()

origins = ["*"]  # Consider restricting to allowed domains in production

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ✅ Allow your React frontend
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # ✅ Allow all headers
)

@app.post("/signup")
def new_user_signup(user_data: SignupBody):
    user_data = user_data.model_dump()
    logger.info(type(user_data))
    result = user_signup_logic(user_data)
    return result

@app.post("/login")
def user_login(user_input: LoginBody):
    """Authenticate user and return JWT token."""
    user_data = user_input.model_dump()
    logger.info(f"Login Attempt: {user_data['email']}")

    result = user_login_logic(user_data)

    if "access_token" not in result:  # Ensure token is returned
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return result  

@app.get("/get_current_user")
def get_user(current_user: dict = Depends(get_current_user)):
    """Fetch logged-in user's details."""
    return {"email": current_user.get("email")}

@app.post("/forgot_password")
async def forgot_password(forgot_password: ForgotPasswordBody):
    forgot_password = forgot_password.model_dump()
    logger.info(f"{forgot_password}")
    return await forgot_password_logic(forgot_password)

@app.put("/reset_password")
def reset_password(reset_details: ResetPasswordBody):
    reset_body = reset_details.model_dump()
    logger.info(reset_body)
    result = reset_password_logic(reset_body)
    return result    

@app.post("/create_candidates")
def create_candidate(candidate_details: CandidateBody, current_user: dict = Depends(get_current_user)):
    """✅ Only authenticated users can create candidates."""
    candidate_body = candidate_details.model_dump()
    logger.info(candidate_body)
    result = create_candidate_logic(candidate_body)
    return result

@app.get("/retrieve_candidates", response_model=List[CandidateSchema])
def get_candidates(
    page: int = Query(1, gt=0),  
    size: int = Query(10, gt=0, le=100),  
    name: Optional[str] = None,
    email: Optional[str] = None,
    phone: Optional[str] = None,
    skills: Optional[str] = None,
    min_experience: Optional[int] = None,
    max_experience: Optional[int] = None
):
    offset = (page - 1) * size
    filters = []
    filter_values = []

    if name:
        filters.append("name LIKE %s")
        filter_values.append(f"%{name}%")
    if email:
        filters.append("email LIKE %s")
        filter_values.append(f"%{email}%")
    if phone:
        filters.append("phone LIKE %s")
        filter_values.append(f"%{phone}%")
    if skills:
        filters.append("skills LIKE %s")
        filter_values.append(f"%{skills}%")
    if min_experience is not None:
        filters.append("experience >= %s")
        filter_values.append(min_experience)
    if max_experience is not None:
        filters.append("experience <= %s")
        filter_values.append(max_experience)

    try:
        logger.info(f"Filters: {filters}, Filter values: {filter_values}")
        result = get_candidates_logic(size, offset, filters, filter_values)

        transformed_result = [
            {
                "username": candidate["name"],
                "email": candidate["email"],
                "phone": candidate["phone"],
                "skills": candidate["skills"],
                "experience": candidate["experience"],
            }
            for candidate in result
        ]
        return transformed_result
    except Exception as e:
        logger.error(f"Error retrieving candidates: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
        
@app.put("/update_candidates/{id}")
def update_candidate_details(update_details: UpdateBody, id: int, current_user: dict = Depends(get_current_user)):
    """✅ Only authenticated users can update candidates."""
    update_body = update_details.model_dump()
    logger.info(update_body)
    result = update_logic(update_body, id)
    return result

@app.delete("/delete_candidates/{id}")
async def delete_candidate(id: int, current_user: dict = Depends(get_current_user)):
    """✅ Only authenticated users can delete candidates."""
    result = delete_candidate_logic(id)
    return result
