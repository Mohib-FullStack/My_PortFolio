"""
URL configuration for protfolio project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# from django.conf import settings
# from django.contrib import admin
# from django.urls import include, path

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("api/contacts/", include("Contact.urls")),  # Include Contact app URLs
#     path("api/resume/", include("Resume.urls")),  # Include Resume app URLs
# ]


# # Enable debug toolbar only in debug mode
# if settings.DEBUG:
#     import debug_toolbar

#     urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]


from django.conf import settings
from django.contrib import admin
from django.http import HttpResponse  # Add this
from django.urls import include, path


# Simple test view
def test_view(request):
    return HttpResponse("Backend is working! ✅")


urlpatterns = [
    path("", test_view),  # Root URL test
    path("admin/", admin.site.urls),
    path("api/", include("Contact.urls")),
    path("api/resume/", include("Resume.urls")),
]

# Debug toolbar (dev only)
if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
