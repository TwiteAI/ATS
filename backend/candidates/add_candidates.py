from database.mysql_reader_and_writer import mysql_connection_obj
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

def create_candidate_logic(candidate_body, current_user):
    """
    Securely creates a candidate in the database using f-strings.
    """
    try:
        logger.info(f"Creating candidate for user: {current_user['email']}")  # ✅ Log user

        # Extract and validate required fields
        required_fields = ["name", "email", "phone"]
        missing_fields = [field for field in required_fields if not candidate_body.get(field)]

        if missing_fields:
            raise HTTPException(status_code=400, detail=f"Missing fields: {', '.join(missing_fields)}")

        name = candidate_body["name"].replace("'", "''")  # Escape single quotes to prevent SQL injection
        email = candidate_body["email"].replace("'", "''")
        phone = candidate_body["phone"].replace("'", "''")
        skills = candidate_body.get("skills", [])
        experience = candidate_body.get("experience")

        # Ensure experience is a valid number
        if experience is None or not isinstance(experience, (int, float)):
            raise HTTPException(status_code=400, detail="Experience must be a valid number")

        # Convert skills list to a comma-separated string
        skills_str = ",".join(skills).replace("'", "''") if isinstance(skills, list) else skills.replace("'", "''")

        # ✅ Secure f-string-based SQL query (Escaping applied)
        insert_query = f"""
        INSERT INTO candidate_info (name, email, phone, skills, experience, created_by)
        VALUES ('{name}', '{email}', '{phone}', '{skills_str}', {experience}, '{current_user["email"]}')
        """

        # Execute the query
        result = mysql_connection_obj.writer(insert_query)
        logger.info(f"Candidate created successfully: {result}")
        return {"message": "Candidate created successfully", "candidate_id": result}

    except Exception as e:
        logger.error(f"Error creating candidate: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
