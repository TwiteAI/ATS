from database.mysql_reader_and_writer import *
from fastapi import HTTPException
from utility.utils import *
from utility.security import *
from datetime import datetime
from loguru import logger


def user_login_logic(user_input):
    email=user_input['email']
    password=user_input['password']
    last_login = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    select_query=f''' select password from user_info where email = '{email}' '''
    user_details=mysql_connection_obj.reader(select_query)
    
    if not user_details:
        raise HTTPException(status_code=401,detail='Invalid email or password')
    logger.info(user_details)

    stored_hashed_password=user_details[0]['password']

    # Verify the entered password against the stored hashed password
    if not verify_password(password, stored_hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Update the last login timestamp
    update_query = f"UPDATE user_info SET last_login = '{last_login}' WHERE email = '{email}' "
    mysql_connection_obj.writer(update_query) 
    
    return {"Message": "Login Successful"}