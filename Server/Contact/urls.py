# URLs Configuration
from django.urls import path

from .views import contact_detail, contact_list

urlpatterns = [
    path("contacts/", contact_list, name="contact-list"),
    path("contacts/<int:pk>/", contact_detail, name="contact-detail"),
]
