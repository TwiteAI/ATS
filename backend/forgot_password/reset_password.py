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
    logger.info(f"Query Result: {result}")

    if not result:
        raise HTTPException(status_code=400, detail="Invalid email or passcode.")
    
    # Correct way to extract values from the dictionary
    reset_id = result[0]["id"]
    stored_passcode = result[0]["passcode"]
    is_used = result[0]["is_used"]

    # Debugging log
    logger.info(f"Stored Passcode: {stored_passcode} (type: {type(stored_passcode)}), "
                f"Input Passcode: {passcode} (type: {type(passcode)}), "
                f"is_used: {is_used} (type: {type(is_used)})")

    # Validate passcode
    if str(stored_passcode).strip() != str(passcode).strip() or int(is_used) == 1:
        logger.info(f"Passcode mismatch or already used. Stored: {stored_passcode}, Input: {passcode}, is_used: {is_used}")
        raise HTTPException(status_code=400, detail="Invalid or expired passcode.")

    # Hash the new password
    hashed_password = hash_password(new_password)

    # Update user password
    updated_at = datetime.now()
    update_query = f"UPDATE user_info SET password = '{hashed_password}', updated_at = '{updated_at}' WHERE email = '{email}' "
    mysql_connection_obj.writer(update_query)

    # Mark passcode as used
    mark_passcode_used_query = f"UPDATE password_reset_codes SET is_used = TRUE WHERE id = {reset_id}"
    mysql_connection_obj.writer(mark_passcode_used_query)

    logger.info(f"Password reset successful for {email}")
    return {"message": "Password reset successful"}
