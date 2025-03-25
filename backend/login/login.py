from database.mysql_reader_and_writer import *
from fastapi import HTTPException
from utility.security import verify_password
from utility.auth import create_access_token
from datetime import datetime
from loguru import logger

def user_login_logic(user_input):
    email = user_input['email']
    password = user_input['password']
    last_login = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Fetch stored hashed password
    select_query = f"SELECT password FROM user_info WHERE email = '{email}'"
    user_details = mysql_connection_obj.reader(select_query)

    if not user_details:
        logger.error("User not found in DB")
        raise HTTPException(status_code=401, detail="Invalid email or password")

    stored_hashed_password = user_details[0]['password']
    logger.info(f"Stored Hashed Password: {stored_hashed_password}")

    # Debugging: Check password manually
    import bcrypt
    is_valid = bcrypt.checkpw(password.encode(), stored_hashed_password.encode())
    logger.info(f"Password Match: {is_valid}")

    # Verify password
    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Update last login time
    update_query = f"UPDATE user_info SET last_login = '{last_login}' WHERE email = '{email}'"
    mysql_connection_obj.writer(update_query)

    # Generate JWT Token
    token = create_access_token(data={"email": email})
    logger.info(f"Generated Token: {token}")  # Debugging line

    return {"access_token": token, "token_type": "bearer"}
