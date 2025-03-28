from fastapi import HTTPException
from database.mysql_reader_and_writer import *
from utility.utils import *
from utility.security import *
from loguru import logger
from datetime import datetime

def user_signup_logic(user_input):
    logger.info(f"{user_input}")

    username=user_input['username']
    password=user_input['password']
    confirm_password=user_input['confirm_password']
    company_name=user_input['company_name']
    email=user_input["email"]
    role=user_input['role']
    phone=user_input.get("phone")
    logger.info(phone)
    created_at=datetime.now()

    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    existing_user = existing_user_checker(username,email)
    logger.info(f"{len(existing_user)}")

    hashed_password=hash_password(password)
    logger.info(f"Hashed password: {hashed_password}")

    if existing_user:
        raise HTTPException(status_code=406, detail="User already exists.")
    else:
        logger.info("Inserting data into table.")
        try:
            if phone:  # If phone is provided
                insert_query = f'''
                    INSERT INTO user_info (username, password, email, role, phone, created_at,company_name)
                    VALUES ('{username}', '{hashed_password}', '{email}', '{role}', '{phone}', '{created_at}','{company_name}')
                '''
            else:  # If phone is not provided, insert NULL
                insert_query = f'''
                    INSERT INTO user_info (username, password, email, role, phone, created_at)
                    VALUES ('{username}', '{hashed_password}', '{email}', '{role}', NULL, '{created_at}')
                '''
            mysql_connection_obj.writer(insert_query)
            return {"Message": "Signup Successful"}
        except Exception as e:
            logger.error(f"Database error: {e}")
            raise HTTPException(status_code=500, detail=f"Database error: {e}")