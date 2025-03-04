from fastapi import HTTPException
from datetime import datetime
import bcrypt
from database.mysql_reader_and_writer import *
from utility.security import *

def reset_password_logic(reset_body):
    email = reset_body["email"]
    passcode = reset_body["passcode"]
    new_password = reset_body["new_password"]

    # Fetch stored passcode
    query = f"SELECT id, passcode, is_used FROM password_reset_codes WHERE email ='{email}' "
    result = mysql_connection_obj.reader(query)
    logger.info(f'{result}')

    if not result:
        raise HTTPException(status_code=400, detail="Invalid email or passcode.")
    
    reset_id, stored_passcode, is_used = result[0]


    # Validate passcode
    if str(stored_passcode) != str(passcode) or is_used == 1:
        logger.info(f"Stored Passcode: {stored_passcode}, Input Passcode: {passcode}, is_used: {is_used}")
        raise HTTPException(status_code=400, detail="Invalid or expired passcode.")
    
    # Hash the new password
    hashed_password = hash_password(new_password)

    # Update user password
    updated_at=datetime.now()
    update_query = f"UPDATE user_info SET password = '{hashed_password}', updated_at = '{updated_at}' WHERE email = '{email}' "
    mysql_connection_obj.writer(update_query)

    # Mark passcode as used
    mark_passcode_used_query =f"UPDATE password_reset_codes SET is_used = TRUE WHERE id = {reset_id}"
    mysql_connection_obj.writer(mark_passcode_used_query)

    logger.info(f"Password reset successful for {email}")
    return {"message": "Password reset successful"}
