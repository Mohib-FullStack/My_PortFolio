# ==============================================
# 🟢 DEVELOPMENT-SPECIFIC OVERRIDES ONLY
# ==============================================


DEBUG = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "My_portfolio",
        "USER": "postgres",
        "PASSWORD": "mavishaP15112010@",
        "HOST": "localhost",
        "PORT": "5432",
        "OPTIONS": {"sslmode": "disable"},
    }
}

# Development tools
INTERNAL_IPS = ["127.0.0.1"]
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# Development-specific settings
# DEBUG = True

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "NAME": "My_portfolio",
#         "USER": "postgres",
#         "PASSWORD": "mavishaP15112010@",
#         "HOST": "localhost",
#         "PORT": "5432",
#         "OPTIONS": {"sslmode": "disable"},
#     }
# }

# INTERNAL_IPS = ["127.0.0.1"]
# EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
