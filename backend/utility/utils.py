from database.mysql_reader_and_writer import *
from loguru import logger

def login_checker(username):
    logger.info(mysql_connection_obj)
    # select_query =f"select * from user_info where username = '{username}' and password ='{password}'"
    # rows=mysql_connection_obj.reader(select_query)
    # return rows
    """
    Check if a user exists by their username.
    """
    logger.info("Checking for existing user in the database.")
    
    # Use parameterized query to prevent SQL injection
    select_query = f"SELECT id, username, password FROM user_info WHERE username = '{username}' "
    rows = mysql_connection_obj.reader(select_query)
    logger.info(f'User Found : {rows}')

    if rows:
        logger.info(f"User with username {rows[0]['username']}  and email {rows[1]['email']} already exists.")
    else:
        logger.info("User not found.")

    return rows