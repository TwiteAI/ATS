from database.mysql_reader_and_writer import *
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

def get_candidates_logic(size, offset, filters, filter_values):
    try:
        # Construct WHERE clause only if there are filters
        filter_clause = f" WHERE {' AND '.join(filters)}" if filters else ""

        # **Manually format the query safely**
        filter_values_str = [f"'{value}'" for value in filter_values]  # Wrap values in single quotes
        query = f"""
        SELECT name, email, phone, skills, experience
        FROM candidate_info {filter_clause} 
        LIMIT {size} OFFSET {offset}
        """

        logger.info(f"Executing Query: {query}")

        # ✅ Call reader with a single query string (No params)
        candidates = mysql_connection_obj.reader(query)

        # ✅ Ensure skills are correctly formatted as a list
        return [
            {
                "name": candidate["name"],
                "email": candidate["email"],
                "phone": candidate["phone"],
                "skills": candidate["skills"],  # Keep it as a string
                "experience": candidate["experience"],
            }
            for candidate in candidates
        ] if candidates else []

    except Exception as e:
        logger.error(f"Error fetching candidates: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
