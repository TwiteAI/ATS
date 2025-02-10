from database.mysql_reader_and_writer import *
from loguru import logger

def login_checker(username, email):
    logger.info(mysql_connection_obj)
    
    logger.info("Checking for existing user in the database.")
    
    # Fetch both username and email
    select_query = f"SELECT id, username, email FROM user_info WHERE username = '{username}' OR email = '{email}'"
    rows = mysql_connection_obj.reader(select_query)
    
    logger.info(f'User Found : {rows}')

    if rows:
        logger.info(f"User with username {rows[0]['username']} and email {rows[0]['email']} already exists.")
    else:
        logger.info("User not found.")

    return rows
