from fastapi import FastAPI,HTTPException
from pydantic import BaseModel,Field,EmailStr,field_validator,model_validator
from typing import List,Optional

class SignupBody(BaseModel):
    username: str = Field(..., description="Username is required")
    password: str = Field(..., min_length=8, max_length=20, description="Password must be 8-20 characters long")
    confirm_password: str = Field(..., min_length=8, max_length=20, description="Passwords must match")
    company_name:Optional[str]
    email: EmailStr
    role: str
    phone: Optional[str] = None

    @model_validator(mode='after')
    def check_passwords_match(self) -> "SignupBody":
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self

    @field_validator("phone")
    def validate_phone(cls, value: Optional[str]) -> Optional[str]:
        if value and (not value.isdigit() or len(value) != 10):
            raise HTTPException(status_code=400, detail="Phone number must be exactly 10 digits.")
        return value
    
    @field_validator("email")
    def validate_email(cls, value: str) -> str:
        """Ensure the email follows a valid format and domain rules (optional)."""
        import re
        email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if not re.match(email_regex, value):
            raise HTTPException(status_code=400, detail="Invalid email format.")
        return value

class LoginBody(BaseModel):
    email:EmailStr
    password:str

class OptionalFilters(BaseModel):
    name:Optional[str]
    role:Optional[str]

class CandidateSchema(BaseModel):
    username: str
    email: str
    phone: str
    skills: str
    experience: int


class UpdateBody(BaseModel):
    username:Optional[str]=""
    password:Optional[str]=""
    email:Optional[str]=""
    role:Optional[str]=""
    phone:Optional[str]=""

class ForgotPasswordBody(BaseModel):
    email:EmailStr

class ResetPasswordBody(BaseModel):
    email:EmailStr
    passcode:str
    new_password:str = Field(..., min_length=8, max_length=20, description="Password must be 8-20 characters long")

class CandidateBody(BaseModel):
    name:str
    email:EmailStr
    phone:Optional[str]=""
    skills:List[str]
    experience:Optional[int]=0

    @field_validator("phone")
    def validate_phone(cls, value: Optional[str]) -> Optional[str]:
        if value and (not value.isdigit() or len(value) != 10):
            raise HTTPException(status_code=400, detail="Phone number must be exactly 10 digits.")
        return value