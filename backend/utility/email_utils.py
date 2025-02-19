import os
import aiosmtplib
from email.message import EmailMessage
from loguru import logger

# Fetch credentials securely from environment variables
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USER = os.getenv("EMAIL_USER")  # Gmail address
EMAIL_PASS = os.getenv("EMAIL_PASS")  # App Password
logger.info(EMAIL_USER)
logger.info(EMAIL_PASS)

async def send_email(to_email: str, passcode: str):
    msg = EmailMessage()
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg["Subject"] = "Password Reset Code"
    msg.set_content(f"Your password reset code is: {passcode}")

    if not EMAIL_USER or not EMAIL_PASS:
        raise ValueError("Email credentials are missing! Set EMAIL_USER and EMAIL_PASS environment variables.")

    await aiosmtplib.send(
        msg,
        hostname=EMAIL_HOST,
        port=EMAIL_PORT,
        username=EMAIL_USER,
        password=EMAIL_PASS,
        start_tls=True
    )
