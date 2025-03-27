# ==============================================
# 🟢 DEVELOPMENT-SPECIFIC OVERRIDES ONLY
# ==============================================
from .settings import DATABASES

DEBUG = True

# Update database configuration
DATABASES["default"].update(
    {
        "NAME": "My_portfolio",
        "USER": "postgres",
        "PASSWORD": "mavishaP15112010@",
        "HOST": "localhost",
        "PORT": "5432",
        "OPTIONS": {"sslmode": "disable"},
    }
)

# Development tools
INTERNAL_IPS = ["127.0.0.1"]
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Test connection
try:
    from django.db import connection

    connection.ensure_connection()
    print("🟢 Development database connection successful!")
except Exception as e:
    print(f"🔴 Development database connection failed: {e}")
