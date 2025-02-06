from database.mysql_reader_and_writer import *
from fastapi import HTTPException


def delete_candidate_logic(id):
    query = f"DELETE FROM user_info WHERE id = {id}"

    try:
        result = mysql_connection_obj.writer(query)
        if result:
            return {"message": f"Candidate with id {id} deleted successfully."}
        else:
            raise HTTPException(
                status_code=404, detail=f"Candidate with id {id} not found."
            )
    except Exception as e:
        logger.error(f"Error deleting candidate: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")