from typing import Union
from loguru import logger
from fastapi import FastAPI,Query
from fastapi.middleware.cors import CORSMiddleware
from schema.schema import *
from login.login import *
from signup.signup import *
from update.update_details import *
from get_candidates.get_candidates import *
from delete.delete import *
import uvicorn
from typing import List

app = FastAPI()

origins=[
    "http://localhost:5173",
    "http://localhost:5174"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/candidates/userSignup")
def new_user_signup(user_data:SignupBody):
    user_data=user_data.model_dump()
    logger.info(type(user_data))
    result=user_signup_logic(user_data)
    return result

@app.post("/candidates/userLogin")
def user_login(user_input:LoginBody):
    user_input=user_input.model_dump()
    logger.info(type(user_input))
    # call user_login logic here
    result=user_login_logic(user_input)
    return result

@app.get("/candidates", response_model=List[CandidateSchema])
def get_candidates(
    page: int = Query(1, gt=0),  # Default page is 1, must be greater than 0
    size: int = Query(10, gt=0, le=100),  # Default size is 10, max 100
    username: Optional[str] = None,  # Optional search filter by name
    role: Optional[str] = None  # Optional search filter by role
):
    """
    Retrieve all candidates with optional pagination and filtering.
    """
    offset = (page - 1) * size
    filters = []
    # Add optional filters
    if username:
        filters.append(f"username LIKE '%{username}%'")
    if role:
        filters.append(f"role = '{role}'")
    result = get_candidates_logic(size,offset,filters)
    return result


@app.put("/candidates/{id}")
def update_candidate_details(update_details:UpdateBody,id:int=1):
    update_body=update_details.model_dump()
    logger.info(update_body)
    result=update_logic(update_body,id)
    return result

@app.delete("/candidates/{id}")
async def delete_candidate(id: int):
    result=delete_candidate_logic(id)
    return result