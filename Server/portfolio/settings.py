import os
from datetime import timedelta
from pathlib import Path

from corsheaders.defaults import default_headers
from decouple import config

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Security settings
SECRET_KEY = config(
    "SECRET_KEY", default="uik3z=ovrad_r_km6bt%))&2a^m!kx)md&#oi7x%ml1bdro0b1"
)
DEBUG = config("DEBUG", default=True, cast=bool)

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1").split(",")

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "my-portfolio-pmve.onrender.com",  # Backend URL
    "my-portfolio-1-b7xw.onrender.com",  # Frontend URL
]


DEBUG = config("DEBUG", default=False, cast=bool)


INTERNAL_IPS = ["127.0.0.1"]


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

# Installed applications
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "Home",
    "About",
    "Projects",
    "Experience",
    "Blog",
    "Resume",
    "Contact",
    "User",
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "django_celery_beat",
    "debug_toolbar",
    "cloudinary",
    "cloudinary_storage",
    "haystack",
]

# Middleware
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

HAYSTACK_CONNECTIONS = {
    "default": {
        "ENGINE": "haystack.backends.whoosh_backend.WhooshEngine",
        "PATH": BASE_DIR / "whoosh_index",
    },
}

# Celery settings
CELERY_BROKER_URL = "redis://localhost:6379/0"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"

# Stripe settings
STRIPE_SECRET_KEY = config("STRIPE_SECRET_KEY")
STRIPE_PUBLIC_KEY = config("STRIPE_PUBLIC_KEY")


# CORS configuration
CORS_ALLOWED_ORIGINS = [
    "https://my-portfolio-1-b7xw.onrender.com",  # Frontend URL
    "https://my-portfolio-pmve.onrender.com",  # Backend URL
    "http://localhost:5173",  # Local development (if needed)
]

CORS_ALLOW_CREDENTIALS = True  # Allow credentials (cookies) to be sent

CORS_ALLOW_HEADERS = list(default_headers) + [
    "Authorization",
    "Content-Type",
    "X-Requested-With",  # For some XMLHttpRequest-based requests
]

# Ensure `Access-Control-Allow-Credentials` is set to 'true'
CORS_ALLOW_ALL_ORIGINS = False  # Set to False to restrict origins


# Client URL
CLIENT_URL = config("CLIENT_URL", default="https://my-portfolio-1-b7xw.onrender.com")


# URLs and WSGI settings
ROOT_URLCONF = "portfolio.urls"
WSGI_APPLICATION = "portfolio.wsgi.application"

# Database settings
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("POSTGRES_DATABASE"),
        "USER": config("POSTGRES_USER"),
        "PASSWORD": config("POSTGRES_PASSWORD"),
        "HOST": config("POSTGRES_HOST", default="localhost"),
        "PORT": config("POSTGRES_PORT", default="5432"),
        "OPTIONS": {"options": "-c search_path=public"},
    }
}

# Cloudinary configuration
CLOUDINARY_NAME = config("CLOUDINARY_NAME")
CLOUDINARY_API = config("CLOUDINARY_API")
CLOUDINARY_SECRET_KEY = config("CLOUDINARY_SECRET_KEY")

if not CLOUDINARY_NAME or not CLOUDINARY_API or not CLOUDINARY_SECRET_KEY:
    raise ValueError("Cloudinary configuration is incomplete.")

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": CLOUDINARY_NAME,
    "API_KEY": CLOUDINARY_API,
    "API_SECRET": CLOUDINARY_SECRET_KEY,
}
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# Email configuration
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config("SMTP_USERNAME")
EMAIL_HOST_PASSWORD = config("SMTP_PASSWORD")

# Static files
# Add this line to define the STATIC_ROOT
# STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# # Ensure you have the following in your settings as well
# STATIC_URL = "/static/"
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, "static"),
# ]


STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")  # Required for deployment

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Serve static files with WhiteNoise
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")


# Authentication
# AUTH_USER_MODEL = "User.User"

# Django REST Framework configuration
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# JWT settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Localization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Primary key type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


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

# # ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

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


#! test
# import os
# from datetime import timedelta
# from pathlib import Path

# from corsheaders.defaults import default_headers
# from decouple import config

# # Base directory of the project
# BASE_DIR = Path(__file__).resolve().parent.parent

# # Security settings
# SECRET_KEY = config("SECRET_KEY")  # No default value
# DEBUG = config("DEBUG", default=False, cast=bool)
# ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1").split(",")

# # Debug toolbar
# INTERNAL_IPS = ["127.0.0.1"]

# # Templates
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
#     "django.middleware.security.SecurityMiddleware",
#     "whitenoise.middleware.WhiteNoiseMiddleware",  # Whitenoise for static files
#     "corsheaders.middleware.CorsMiddleware",
#     "debug_toolbar.middleware.DebugToolbarMiddleware",
#     "django.contrib.sessions.middleware.SessionMiddleware",
#     "django.middleware.common.CommonMiddleware",
#     "django.middleware.csrf.CsrfViewMiddleware",
#     "django.contrib.auth.middleware.AuthenticationMiddleware",
#     "django.contrib.messages.middleware.MessageMiddleware",
#     "django.middleware.clickjacking.XFrameOptionsMiddleware",
# ]

# # Database
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": config("DB_NAME"),
#         "USER": config("DB_USER"),
#         "PASSWORD": config("DB_PASSWORD"),
#         "HOST": config("DB_HOST"),
#         "PORT": config("DB_PORT", default="5432"),
#     }
# }

# # Static and media files
# STATIC_URL = "/static/"
# STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
# STATICFILES_DIRS = [
#     BASE_DIR / "static"
# ]  # Add this line if you have a global static directory
# STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# MEDIA_URL = "/media/"
# MEDIA_ROOT = os.path.join(BASE_DIR, "media")  # Add this line for local media storage
# DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# # Security settings for production
# if not DEBUG:
#     SECURE_HSTS_SECONDS = 31536000  # 1 year
#     SECURE_HSTS_INCLUDE_SUBDOMAINS = True
#     SECURE_HSTS_PRELOAD = True
#     SECURE_SSL_REDIRECT = True
#     SESSION_COOKIE_SECURE = True
#     CSRF_COOKIE_SECURE = True

# # CORS configuration
# CORS_ALLOWED_ORIGINS = [
#     "https://your-render-app.onrender.com",
#     "http://localhost:5173",  # Add your frontend URL if applicable
# ]

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

# # Haystack configuration
# HAYSTACK_CONNECTIONS = {
#     "default": {
#         "ENGINE": "haystack.backends.whoosh_backend.WhooshEngine",
#         "PATH": os.path.join(BASE_DIR, "whoosh_index"),
#     },
# }

# # Celery configuration
# CELERY_BROKER_URL = config("REDIS_URL", default="redis://localhost:6379/0")
