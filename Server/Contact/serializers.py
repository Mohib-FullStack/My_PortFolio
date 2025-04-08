from rest_framework import serializers

from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"  # Removed the trailing comma
        read_only_fields = ("created_at",)  # Add this to prevent updates to created_at
