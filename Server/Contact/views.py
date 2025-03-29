# from django.middleware.csrf import get_token
# from django.shortcuts import get_object_or_404
# from rest_framework import status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response

# from .models import Contact
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


#! test
from django.db import models  # Add this import
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Contact
from .serializers import ContactSerializer


class ContactPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


from django.db import models
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Contact
from .serializers import ContactSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def contact_list(request):
    """List all contacts (paginated) with filtering"""
    try:
        contacts = Contact.objects.all().order_by("-created_at")

        # Filtering
        is_read = request.query_params.get("is_read", None)
        if is_read in ["true", "false"]:
            contacts = contacts.filter(is_read=is_read.lower() == "true")

        # Search
        search = request.query_params.get("search", None)
        if search:
            contacts = contacts.filter(
                models.Q(full_name__icontains=search)
                | models.Q(email__icontains=search)
                | models.Q(message__icontains=search)
            )  # Fixed: Added this closing parenthesis

        # Pagination
        paginator = ContactPagination()
        result_page = paginator.paginate_queryset(contacts, request)
        serializer = ContactSerializer(result_page, many=True)

        return paginator.get_paginated_response(
            {"success": True, "data": serializer.data, "count": contacts.count()}
        )

    except Exception as e:
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def contact_create(request):
    """Create a new contact message"""
    try:
        if not request.session.session_key:
            request.session.create()

        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Contact submitted successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"success": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    except Exception as e:
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def contact_detail(request, pk):
    """Retrieve, update or delete a contact message"""
    try:
        contact = get_object_or_404(Contact, pk=pk)

        if request.method == "GET":
            serializer = ContactSerializer(contact)
            return Response({"success": True, "data": serializer.data})

        elif request.method == "PUT":
            serializer = ContactSerializer(contact, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "success": True,
                        "message": "Contact updated successfully",
                        "data": serializer.data,
                    }
                )
            return Response(
                {"success": False, "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        elif request.method == "DELETE":
            contact.delete()
            return Response(
                {"success": True, "message": "Contact deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )

    except Exception as e:
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def mark_as_read(request, pk):
    """Mark a contact message as read"""
    try:
        contact = get_object_or_404(Contact, pk=pk)
        contact.is_read = True
        contact.save()
        return Response(
            {
                "success": True,
                "message": "Contact marked as read",
                "data": ContactSerializer(contact).data,
            }
        )
    except Exception as e:
        return Response(
            {"success": False, "message": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def get_csrf_token(request):
    """Get CSRF token"""
    if not request.session.session_key:
        request.session.create()
    return Response({"success": True, "csrf_token": get_token(request)})
