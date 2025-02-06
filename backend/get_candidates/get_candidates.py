from database.mysql_reader_and_writer import *
from fastapi import HTTPException
   

def get_candidates_logic(size,offset,filters):
    # Build the final query with filters using f-strings
    filter_clause = f" WHERE {' AND '.join(filters)}" if filters else ""
    query = f"SELECT id,username,email,role,phone FROM user_info {filter_clause} LIMIT {size} OFFSET {offset}"

    try:
        # Use your reader function to execute the query
        candidates = mysql_connection_obj.reader(query)
        logger.info(candidates)

        if not candidates:
            return []

        return candidates
    except Exception as e:
        logger.error(f"Error fetching candidates: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
