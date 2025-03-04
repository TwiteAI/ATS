import aiosmtplib
from email.message import EmailMessage
from loguru import logger
from config import EMAIL_CONFIG  # Import the configuration

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

port=2525
smtp_sever="smtp.mailmug.net"
login="2o5a8iejjmoj8oqu"
password="gkqzmuriguy7gwj7"

sender_email="vaishnavi@twite.ai"
# to_email=""


# Fetch email credentials from config
# EMAIL_HOST = EMAIL_CONFIG["EMAIL_HOST"]
# EMAIL_PORT = EMAIL_CONFIG["EMAIL_PORT"]
# EMAIL_USER = EMAIL_CONFIG["EMAIL_USER"]
# EMAIL_PASS = EMAIL_CONFIG["EMAIL_PASS"]

# logger.info(EMAIL_USER)
# logger.info(EMAIL_PASS)

async def send_email(to_email: str, passcode: str):
    message=MIMEMultipart("alternative")
    message["From"] = sender_email
    message["To"] = to_email
    message["Subject"] = "Password Reset Code"

    # msg = EmailMessage()
    # msg["From"] = EMAIL_USER
    # msg["To"] = to_email
    # msg["Subject"] = "Password Reset Code"
    # msg.set_content(f"Your password reset code is: {passcode}")

    html=f"""
            <html>
            <body>
                <p>Hi,<br>
                Your password reset code is: {passcode}
            </body>
            </html>"""
    part=MIMEText(html,"html")
    message.attach(part)
    server=smtplib.SMTP(smtp_sever,port)
    server.set_debuglevel(1)
    server.esmtp_features['auth']='LOGIN PLAIN'
    server.login(login,password)
    server.sendmail(sender_email,to_email,message.as_string())

    # if not EMAIL_USER or not EMAIL_PASS:
    #     raise ValueError("Email credentials are missing!")

    # await aiosmtplib.send(
    #     msg,
    #     hostname=EMAIL_HOST,
    #     port=EMAIL_PORT,
    #     username=EMAIL_USER,
    #     password=EMAIL_PASS,
    #     start_tls=True
    # )
    return {"msg":"send email"}
