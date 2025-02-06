from datetime import datetime
from database.mysql_reader_and_writer import *  
from fastapi import HTTPException

def update_logic(update_body,id):
    update_body={key : val for key,val in update_body.items() if val not in [None,""]}
    if not update_body:
        raise HTTPException(status_code=400, detail="No fields provided for update.")
    update_body["updated_at"]=datetime.now()
    update_query=", ".join(f"{key}='{value}'" for key,value in update_body.items())
    query=f"update user_info set {update_query} where id ={id}"
    try:
        result = mysql_connection_obj.writer(query)
        if result != 0:
            return {
                "message": "Successfully updated user information.",
                "updated_fields": update_body,
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to update the user.")
    except Exception as e:
        logger.error(f"Error updating user: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")