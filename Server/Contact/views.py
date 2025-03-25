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


from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Contact
from .serializers import ContactSerializer


@api_view(["GET", "POST"])
@permission_classes([AllowAny])  # Allows anyone to access this endpoint
def contact_list(request):
    """Handles listing all contacts (GET) and submitting a new contact form (POST)."""
    if request.method == "GET":
        contacts = Contact.objects.all().order_by(
            "-created_at"
        )  # Orders contacts from newest to oldest
        serializer = ContactSerializer(contacts, many=True)
        return Response(
            {"success": True, "payload": serializer.data}, status=status.HTTP_200_OK
        )

    elif request.method == "POST":
        serializer = ContactSerializer(data=request.data)  # Deserialize incoming data
        if serializer.is_valid():
            serializer.save()  # Save the new contact to the database
            return Response(
                {"success": True, "payload": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"success": False, "error": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(["GET", "PUT", "DELETE"])
def contact_detail(request, pk):
    """Handles retrieving (GET), updating (PUT), and deleting (DELETE) a single contact."""
    contact = get_object_or_404(
        Contact, pk=pk
    )  # Retrieve contact by primary key, return 404 if not found

    if request.method == "GET":
        serializer = ContactSerializer(contact)  # Serialize the contact data
        return Response(
            {"success": True, "payload": serializer.data}, status=status.HTTP_200_OK
        )

    elif request.method == "PUT":
        serializer = ContactSerializer(
            contact, data=request.data, partial=True
        )  # Allows partial updates
        if serializer.is_valid():
            serializer.save()  # Save the updated contact data
            return Response(
                {"success": True, "payload": serializer.data}, status=status.HTTP_200_OK
            )
        return Response(
            {"success": False, "error": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

    elif request.method == "DELETE":
        contact.delete()  # Deletes the contact from the database
        return Response(
            {"success": True, "message": "Contact deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )
