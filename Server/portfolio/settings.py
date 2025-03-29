"""
Django settings for portfolio project.

Refactored to:
- Fix production database connection issues
- Remove duplicate code
- Improve organization
- Better environment handling
"""

import os
from datetime import timedelta
from pathlib import Path

import dj_database_url
from decouple import Csv, config

# ==============================================
# 🟢 1. INITIAL SETUP & ENVIRONMENT DETECTION
# ==============================================

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent.parent

# Core settings
ROOT_URLCONF = "portfolio.urls"
WSGI_APPLICATION = "portfolio.wsgi.application"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Environment detection
IS_RENDER = config("RENDER", default=False, cast=bool)
IS_PRODUCTION = IS_RENDER  # For clarity, we can use both terms
DEBUG = config("DEBUG", default=not IS_PRODUCTION, cast=bool)

# ==============================================
# 🔴 2. SECURITY SETTINGS
# ==============================================

SECRET_KEY = config("SECRET_KEY")

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1", cast=Csv())

if IS_PRODUCTION:
    ALLOWED_HOSTS.extend(
        [
            "my-portfolio-pmve.onrender.com",  # Backend
            "my-portfolio-1-b7xw.onrender.com",  # Frontend
        ]
    )

# Security middleware settings
if IS_PRODUCTION:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

# ==============================================
# 🟠 3. DATABASE CONFIGURATION
# ==============================================

# Database URL - must be set in production
DATABASE_URL = config("DATABASE_URL")

DATABASES = {
    "default": dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=600,
        ssl_require=IS_PRODUCTION,  # SSL only in production
    )
}

# Test database connection
try:
    from django.db import connection

    connection.ensure_connection()
    print(
        f"🟢 {'Production' if IS_PRODUCTION else 'Development'} DB connection successful"
    )
except Exception as e:
    print(f"🔴 Database connection failed: {e}")

# ==============================================
# 🟡 4. APPLICATION DEFINITION
# ==============================================

INSTALLED_APPS = [
    # Django core apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Local apps
    "Home",
    "About",
    "Projects",
    "Experience",
    "Blog",
    "Resume",
    "Contact",
    "User",
    # Third-party apps
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "cloudinary",
    "cloudinary_storage",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ==============================================
# 🔵 5. TEMPLATES & STATIC FILES
# ==============================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Static files
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Media files
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# ==============================================
# 🟣 6. CORS & API SETTINGS
# ==============================================

# CORS_ALLOWED_ORIGINS = config(
#     "CORS_ALLOWED_ORIGINS", default="http://localhost:5173", cast=Csv()
# )

# if IS_PRODUCTION:
#     CORS_ALLOWED_ORIGINS.extend(
#         [
#             "https://my-portfolio-1-b7xw.onrender.com",
#             "https://my-portfolio-pmve.onrender.com",
#         ]
#     )

# CORS_ALLOW_CREDENTIALS = True

# Replace your current CORS settings with these:
CORS_ALLOWED_ORIGINS = [
    "https://my-portfolio-1-b7xw.onrender.com",
    "https://my-portfolio-pmve.onrender.com",
    "http://localhost:5173",
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CORS_EXPOSE_HEADERS = ["Content-Type", "X-CSRFToken"]
CORS_ALLOW_CREDENTIALS = True

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

# ==============================================
# 🟤 7. CLOUDINARY CONFIGURATION
# ==============================================

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": config("CLOUDINARY_NAME"),
    "API_KEY": config("CLOUDINARY_API"),
    "API_SECRET": config("CLOUDINARY_SECRET_KEY"),
}
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# ==============================================
# 🟢 8. EMAIL CONFIGURATION
# ==============================================

if IS_PRODUCTION:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = config("SMTP_USERNAME")
    EMAIL_HOST_PASSWORD = config("SMTP_PASSWORD")

# ==============================================
# ⚪ 9. INTERNATIONALIZATION
# ==============================================

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True
