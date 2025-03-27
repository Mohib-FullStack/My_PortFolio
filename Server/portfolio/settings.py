"""
Django settings for portfolio project.

For more information see:
https://docs.djangoproject.com/en/4.2/topics/settings/
"""

# ==============================================
# 🟡 1. INITIAL SETUP & ENVIRONMENT VARIABLES
# ==============================================
import os
from datetime import timedelta
from pathlib import Path

import dj_database_url
from decouple import config

# Load environment variables
from dotenv import load_dotenv

load_dotenv()

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# ==============================================
# 🔴 2. SECURITY SETTINGS (PRODUCTION CRITICAL)
# ==============================================
SECRET_KEY = config("SECRET_KEY")  # Must be set in production

# Security settings - different for dev/prod
DEBUG = config("DEBUG", default=False, cast=bool)

# Hosts configuration
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "my-portfolio-pmve.onrender.com",  # Backend
    "my-portfolio-1-b7xw.onrender.com",  # Frontend
]


# ==============================================
# 🟢 PRODUCTION DATABASE CONFIGURATION (FOR RENDER)
# ==============================================

# Force production database configuration
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "my_portfolio_db_fa0r",
        "USER": "my_portfolio_db_fa0r_user",
        "PASSWORD": "CiM3U7AobOFeqszWeDKDY7MdnMIfRmPH",
        "HOST": "dpg-cvhl39lds78s7398vee0-a.frankfurt-postgres.render.com",
        "PORT": "5432",
        "OPTIONS": {
            "sslmode": "require",  # Critical for Render
        },
    }
}

# Test connection immediately
try:
    from django.db import connection

    connection.ensure_connection()
    print("🟢 Production database connection successful!")
except Exception as e:
    print(f"🔴 Production database connection failed: {e}")


# ==============================================
# 🔵 4. APPLICATION DEFINITION
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
    "whitenoise.middleware.WhiteNoiseMiddleware",  # For static files
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # CORS should be high
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ==============================================
# 🟣 5. TEMPLATES & STATIC FILES
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

# Static files (CSS, JavaScript, Images)
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# Media files
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# ==============================================
# 🟠 6. CORS & API SETTINGS
# ==============================================
CORS_ALLOWED_ORIGINS = [
    "https://my-portfolio-1-b7xw.onrender.com",
    "https://my-portfolio-pmve.onrender.com",
    "http://localhost:5173",
]

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
# 🔵 8. EMAIL & PRODUCTION SETTINGS
# ==============================================
if not DEBUG:
    # Production-specific settings
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

    # Email settings
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = config("SMTP_USERNAME")
    EMAIL_HOST_PASSWORD = config("SMTP_PASSWORD")

# ==============================================
# ⚪ 9. INTERNATIONALIZATION & MISC
# ==============================================
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ==============================================
# 🟢 LOCAL DEVELOPMENT OVERRIDES
# ==============================================
try:
    from .local_settings import *  # noqa

    print("🟢 Local settings overrides applied")

    # Configure debug toolbar only after all settings are loaded
    if DEBUG:

        def configure_debug_toolbar():
            if "debug_toolbar" not in INSTALLED_APPS:
                INSTALLED_APPS.append("debug_toolbar")
                MIDDLEWARE.insert(0, "debug_toolbar.middleware.DebugToolbarMiddleware")

        # Delay configuration until after URLconf is ready
        from django.apps import apps

        if apps.ready:
            configure_debug_toolbar()
        else:
            from django.apps import AppConfig

            original_ready = AppConfig.ready

            def patched_ready(self):
                original_ready(self)
                if self.name == "django.apps":
                    configure_debug_toolbar()

            AppConfig.ready = patched_ready

except ImportError:
    print("🟡 No local_settings.py found, using production settings")
except Exception as e:
    print(f"🔴 Error in local_settings.py: {e}")


#! this is for Developement
# import os
# from datetime import timedelta
# from pathlib import Path

# from corsheaders.defaults import default_headers
# from decouple import config

# # Base directory of the project
# BASE_DIR = Path(__file__).resolve().parent.parent

# # Security settings
# SECRET_KEY = config(
#     "SECRET_KEY", default="uik3z=ovrad_r_km6bt%))&2a^m!kx)md&#oi7x%ml1bdro0b1"
# )
# DEBUG = config("DEBUG", default=True, cast=bool)

# ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1").split(",")

# ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# DEBUG = False  # Make sure it's False in production
# ALLOWED_HOSTS = ["localhost", ".render.com"]


# ALLOWED_HOSTS = ["*"]


# INTERNAL_IPS = ["127.0.0.1"]


# TEMPLATES = [
#     {
#         "BACKEND": "django.template.backends.django.DjangoTemplates",
#         "DIRS": [BASE_DIR / "templates"],
#         "APP_DIRS": True,
#         "OPTIONS": {
#             "context_processors": [
#                 "django.template.context_processors.debug",
#                 "django.template.context_processors.request",
#                 "django.contrib.auth.context_processors.auth",
#                 "django.contrib.messages.context_processors.messages",
#             ],
#         },
#     },
# ]

# # Installed applications
# INSTALLED_APPS = [
#     "django.contrib.admin",
#     "django.contrib.auth",
#     "django.contrib.contenttypes",
#     "django.contrib.sessions",
#     "django.contrib.messages",
#     "django.contrib.staticfiles",
#     "Home",
#     "About",
#     "Projects",
#     "Experience",
#     "Blog",
#     "Resume",
#     "Contact",
#     "User",
#     "corsheaders",
#     "rest_framework",
#     "rest_framework_simplejwt",
#     "django_celery_beat",
#     "debug_toolbar",
#     "cloudinary",
#     "cloudinary_storage",
#     "haystack",
# ]

# # Middleware
# MIDDLEWARE = [
#     "corsheaders.middleware.CorsMiddleware",
#     "debug_toolbar.middleware.DebugToolbarMiddleware",
#     "django.middleware.security.SecurityMiddleware",
#     "django.contrib.sessions.middleware.SessionMiddleware",
#     "django.middleware.common.CommonMiddleware",
#     "django.middleware.csrf.CsrfViewMiddleware",
#     "django.contrib.auth.middleware.AuthenticationMiddleware",
#     "django.contrib.messages.middleware.MessageMiddleware",
#     "django.middleware.clickjacking.XFrameOptionsMiddleware",
# ]

# HAYSTACK_CONNECTIONS = {
#     "default": {
#         "ENGINE": "haystack.backends.whoosh_backend.WhooshEngine",
#         "PATH": BASE_DIR / "whoosh_index",
#     },
# }

# # Celery settings
# CELERY_BROKER_URL = "redis://localhost:6379/0"
# CELERY_ACCEPT_CONTENT = ["json"]
# CELERY_TASK_SERIALIZER = "json"

# # Stripe settings
# STRIPE_SECRET_KEY = config("STRIPE_SECRET_KEY")
# STRIPE_PUBLIC_KEY = config("STRIPE_PUBLIC_KEY")

# # CORS configuration
# CORS_ALLOW_ALL_ORIGINS = True  # Allows all origins (remove if restricting)
# CORS_ALLOW_HEADERS = list(default_headers) + ["Authorization", "Content-Type"]
# CORS_ALLOW_CREDENTIALS = True

# # Client URL
# CLIENT_URL = config("CLIENT_URL", default="http://localhost:5173")

# # URLs and WSGI settings
# ROOT_URLCONF = "portfolio.urls"
# WSGI_APPLICATION = "portfolio.wsgi.application"

# # Database settings
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": config("POSTGRES_DATABASE"),
#         "USER": config("POSTGRES_USER"),
#         "PASSWORD": config("POSTGRES_PASSWORD"),
#         "HOST": config("POSTGRES_HOST", default="localhost"),
#         "PORT": config("POSTGRES_PORT", default="5432"),
#         "OPTIONS": {"options": "-c search_path=public"},
#     }
# }

# # Cloudinary configuration
# CLOUDINARY_NAME = config("CLOUDINARY_NAME")
# CLOUDINARY_API = config("CLOUDINARY_API")
# CLOUDINARY_SECRET_KEY = config("CLOUDINARY_SECRET_KEY")

# if not CLOUDINARY_NAME or not CLOUDINARY_API or not CLOUDINARY_SECRET_KEY:
#     raise ValueError("Cloudinary configuration is incomplete.")

# CLOUDINARY_STORAGE = {
#     "CLOUD_NAME": CLOUDINARY_NAME,
#     "API_KEY": CLOUDINARY_API,
#     "API_SECRET": CLOUDINARY_SECRET_KEY,
# }
# DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# # Email configuration
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# EMAIL_HOST = "smtp.gmail.com"
# EMAIL_PORT = 587
# EMAIL_USE_TLS = True
# EMAIL_HOST_USER = config("SMTP_USERNAME")
# EMAIL_HOST_PASSWORD = config("SMTP_PASSWORD")

# # Static files
# # Add this line to define the STATIC_ROOT
# STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# # Ensure you have the following in your settings as well
# STATIC_URL = "/static/"
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, "static"),
# ]

# # Authentication
# # AUTH_USER_MODEL = "User.User"

# # Django REST Framework configuration
# REST_FRAMEWORK = {
#     "DEFAULT_AUTHENTICATION_CLASSES": [
#         "rest_framework_simplejwt.authentication.JWTAuthentication",
#     ],
#     "DEFAULT_PERMISSION_CLASSES": [
#         "rest_framework.permissions.IsAuthenticated",
#     ],
# }

# # JWT settings
# SIMPLE_JWT = {
#     "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
#     "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
#     "ROTATE_REFRESH_TOKENS": False,
#     "BLACKLIST_AFTER_ROTATION": True,
# }

# # Password validation
# AUTH_PASSWORD_VALIDATORS = [
#     {
#         "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
#     },
#     {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
#     {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
#     {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
# ]

# # Localization
# LANGUAGE_CODE = "en-us"
# TIME_ZONE = "UTC"
# USE_I18N = True
# USE_TZ = True

# # Primary key type
# DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
