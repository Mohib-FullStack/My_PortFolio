# Server/Contact/pagination.py
# pagination.py
from rest_framework.pagination import PageNumberPagination


# 🎚️ CUSTOM PAGINATION - Tailored for contact list display
class CustomPagination(PageNumberPagination):
    page_size = 20  # Default number of items per page
    page_size_query_param = "page_size"  # 💡 Allows client to override page size
    max_page_size = 100  # 🛡️ Safety limit to prevent excessive load
