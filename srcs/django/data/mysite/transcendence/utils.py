from django.core.mail import send_mail

def send_email_code(email, verification_code):
    subject = "Your 2FA verification code"
    message = f"Your verification code is {verification_code}. Please enter it to finalize your connection."
    from_email = '42transcendence2fa@gmail.com'

    try:
        send_mail(subject, message, from_email, [email], fail_silently=False)
        print("Email send")
    except Exception as e:
        print(f"Error sending email : {e}")
