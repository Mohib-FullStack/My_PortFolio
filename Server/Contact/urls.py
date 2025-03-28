# # URLs Configuration
# from django.urls import path

# from .views import contact_detail, contact_list, get_csrf_token

# urlpatterns = [
#     path("contacts/", contact_list, name="contact-list"),
#     path("contacts/<int:pk>/", contact_detail, name="contact-detail"),
#     path("csrf-token/", get_csrf_token, name="get-csrf-token"),
# ]

#! test
from django.urls import path

from .views import (
    contact_create,
    contact_detail,
    contact_list,
    get_csrf_token,
    mark_as_read,
)

urlpatterns = [
    path("contacts/", contact_list, name="contact-list"),
    path("contacts/create/", contact_create, name="contact-create"),
    path("contacts/<int:pk>/", contact_detail, name="contact-detail"),
    path("contacts/<int:pk>/mark-read/", mark_as_read, name="mark-as-read"),
    path("csrf-token/", get_csrf_token, name="get-csrf-token"),
]
