# views.py
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Contact
from .pagination import CustomPagination  # Our custom pagination
from .serializers import ContactSerializer

# ==============================================
# 🟢 PUBLIC ENDPOINTS (No authentication needed)
# ==============================================


@api_view(["POST"])
@permission_classes([AllowAny])  # 🌐 Open to everyone
def contact_list(request):
    """Handles new contact form submissions"""
    try:
        # 🔐 Ensure CSRF protection
        if not request.session.session_key:
            request.session.create()

        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "Contact submitted successfully"},
                status=status.HTTP_201_CREATED,  # ✅ 201 for successful creation
            )

        return Response(
            {"success": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,  # ❌ 400 for validation errors
        )

    except Exception as e:
        return Response(
            {"success": False, "message": "Internal Server Error", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,  # 🚨 500 for server errors
        )


@api_view(["GET"])
def get_csrf_token(request):
    """Provides CSRF token for form security"""
    if not request.session.session_key:
        request.session.create()
    return Response(
        {"success": True, "csrf_token": get_token(request)},
        status=status.HTTP_200_OK,  # 🛡️ Security endpoint
    )


# ==============================================
# 🔐 ADMIN ENDPOINTS (Require authentication)
# ==============================================


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])  # 🔒 Requires login
def contact_detail(request, pk):
    """CRUD operations for individual contacts"""
    contact = get_object_or_404(Contact, pk=pk)  # ❓ 404 if not found

    # 📥 GET - Retrieve contact details
    if request.method == "GET":
        serializer = ContactSerializer(contact)
        return Response(
            {"success": True, "payload": serializer.data}, status=status.HTTP_200_OK
        )

    # ✏️ PUT - Update existing contact
    elif request.method == "PUT":
        serializer = ContactSerializer(contact, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "payload": serializer.data}, status=status.HTTP_200_OK
            )
        return Response(
            {"success": False, "error": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # 🗑️ DELETE - Remove contact
    elif request.method == "DELETE":
        contact.delete()
        return Response(
            {"success": True, "message": "Contact deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,  # ⚠️ 204 for successful deletion
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])  # 🔒 Admin only
def contact_list_all(request):
    """Paginated list of all contacts"""
    try:
        contacts = Contact.objects.all().order_by("-created_at")
        paginator = CustomPagination()  # 🎛️ Using our custom settings
        paginated_contacts = paginator.paginate_queryset(contacts, request)
        serializer = ContactSerializer(paginated_contacts, many=True)
        response = paginator.get_paginated_response(serializer.data)

        # ✨ Enhance default pagination response
        response.data.update(
            {"success": True, "message": "Contacts retrieved successfully"}
        )
        return response

    except Exception as e:
        return Response(
            {
                "success": False,
                "message": "Failed to retrieve contacts",
                "error": str(e),
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# from django.middleware.csrf import get_token
# from django.shortcuts import get_object_or_404
# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response

# from .models import Contact
# from .pagination import CustomPagination  # Import the custom pagination class
# from .serializers import ContactSerializer


# @api_view(["POST"])
# @permission_classes([AllowAny])
# def contact_list(request):
#     """Handles submitting a new contact form (POST)."""
#     try:
#         # Ensure session exists for CSRF token
#         if not request.session.session_key:
#             request.session.create()

#         serializer = ContactSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 {"success": True, "message": "Contact submitted successfully"},
#                 status=status.HTTP_201_CREATED,
#             )

#         return Response(
#             {"success": False, "errors": serializer.errors},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     except Exception as e:
#         return Response(
#             {"success": False, "message": "Internal Server Error", "error": str(e)},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#         )


# @api_view(["GET"])
# def get_csrf_token(request):
#     """Endpoint to get CSRF token."""
#     if not request.session.session_key:
#         request.session.create()
#     return Response(
#         {"success": True, "csrf_token": get_token(request)}, status=status.HTTP_200_OK
#     )


# @api_view(["GET", "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
# def contact_detail(request, pk):
#     """Handles retrieving (GET), updating (PUT), and deleting (DELETE) a single contact."""
#     contact = get_object_or_404(Contact, pk=pk)

#     if request.method == "GET":
#         serializer = ContactSerializer(contact)
#         return Response(
#             {"success": True, "payload": serializer.data}, status=status.HTTP_200_OK
#         )

#     elif request.method == "PUT":
#         serializer = ContactSerializer(contact, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(
#                 {"success": True, "payload": serializer.data}, status=status.HTTP_200_OK
#             )
#         return Response(
#             {"success": False, "error": serializer.errors},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     elif request.method == "DELETE":
#         contact.delete()
#         return Response(
#             {"success": True, "message": "Contact deleted successfully"},
#             status=status.HTTP_204_NO_CONTENT,
#         )


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def contact_list_all(request):
#     """Admin view to list all contacts with custom pagination"""
#     try:
#         contacts = Contact.objects.all().order_by("-created_at")
#         paginator = CustomPagination()  # Using the custom pagination class
#         paginated_contacts = paginator.paginate_queryset(contacts, request)
#         serializer = ContactSerializer(paginated_contacts, many=True)
#         response = paginator.get_paginated_response(serializer.data)

#         # Maintain your custom response format
#         response.data.update(
#             {"success": True, "message": "Contacts retrieved successfully"}
#         )
#         return response

#     except Exception as e:
#         return Response(
#             {
#                 "success": False,
#                 "message": "Failed to retrieve contacts",
#                 "error": str(e),
#             },
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR,
#         )
