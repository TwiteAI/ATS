from loguru import logger
from fastapi import HTTPException
from utility.utils import existing_user_checker
from database.mysql_reader_and_writer import *
from utility.security import *
from utility.email_utils import *
import os
print(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASS"))

async def forgot_password_logic(forgot_password_body):
    passcode = generate_passcode()
    email = forgot_password_body["email"]

    existing_user = existing_user_checker(email)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User with this email does not exist")

    # Check if a reset entry exists
    existing_entry_query = f"SELECT id FROM password_reset_codes WHERE email = '{email}'"
    logger.info(f"Executing query: {existing_entry_query}")
    existing_entry = mysql_connection_obj.reader(existing_entry_query)

    if existing_entry:
        update_query = f"UPDATE password_reset_codes SET passcode = '{passcode}', is_used = FALSE WHERE email = '{email}'"
        mysql_connection_obj.writer(update_query)
    else:
        insert_query = f"INSERT INTO password_reset_codes (email, passcode) VALUES ('{email}', '{passcode}')"
        mysql_connection_obj.writer(insert_query)

    # Send email
    try:
        await send_email(email, passcode)
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail="Error sending email")
    
    return {"message": "Passcode sent successfully"}


        
        
        
    

