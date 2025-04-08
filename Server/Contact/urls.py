# # URLs Configuration
from django.urls import path

from .views import contact_detail, contact_list, contact_list_all, get_csrf_token

urlpatterns = [
    path("contacts/", contact_list, name="contact-list"),
    path("contacts/all/", contact_list_all, name="contact-list-all"),  # Admin endpoint
    path("contacts/<int:pk>/", contact_detail, name="contact-detail"),
    path("csrf-token/", get_csrf_token, name="get-csrf-token"),
]
