# from rest_framework import serializers
# from .models import Contact

# class ContactSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Contact
#         fields = "__all__"  # Removed the trailing comma

#! test
from rest_framework import serializers

from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"
        read_only_fields = ("created_at", "is_read")

    def validate_email(self, value):
        """Ensure email is properly formatted"""
        if not value or "@" not in value:
            raise serializers.ValidationError("Enter a valid email address")
        return value.lower()  # Normalize email to lowercase
