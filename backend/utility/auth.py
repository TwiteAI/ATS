from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from loguru import logger
from config import SECRET_CONFIG  # ✅ Correct import

# ✅ Extract values from SECRET_CONFIG
SECRET_KEY = SECRET_CONFIG["SECRET_KEY"]
ALGORITHM = SECRET_CONFIG["ALGORITHM"]
ACCESS_TOKEN_EXPIRE_MINUTES = SECRET_CONFIG["ACCESS_TOKEN_EXPIRE_MINUTES"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Generate a JWT token with expiration."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_access_token(token: str):
    """Verify and decode the JWT token."""
    try:
        logger.info(f"Verifying token: {token}")  # ✅ Debugging line
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logger.info(f"Decoded token: {payload}")
        return payload  
    except JWTError as e:
        logger.error(f"JWT error: {e}")
        raise HTTPException(status_code=401, detail="Invalid token or expired session")

def get_current_user(token: str = Depends(oauth2_scheme)):
    """Retrieve user details from token."""
    try:
        payload = verify_access_token(token)
        email = payload.get("email")

        if not email:
            logger.error("Token is missing email")
            raise HTTPException(status_code=401, detail="Invalid token")

        logger.info(f"Authenticated user: {email}")
        return payload  # ✅ Return full payload
    except HTTPException:
        logger.error("Invalid or expired token")
        raise HTTPException(status_code=401, detail="Invalid or expired token")
