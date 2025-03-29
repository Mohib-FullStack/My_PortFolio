# from rest_framework import serializers
# from .models import Contact

# class ContactSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Contact
#         fields = "__all__"  # Removed the trailing comma

#! test
# serializers.py
from rest_framework import serializers

from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["full_name", "email", "message", "created_at", "is_read"]
        read_only_fields = ["created_at", "is_read"]
        extra_kwargs = {
            "full_name": {"required": True, "allow_blank": False},
            "email": {"required": True, "allow_blank": False},
            "message": {"required": True, "allow_blank": False},
        }

    def validate_email(self, value):
        value = value.strip().lower()
        if not value or "@" not in value:
            raise serializers.ValidationError("Enter a valid email address")
        return value
