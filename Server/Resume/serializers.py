from rest_framework import serializers

from .models import Resume


class ResumeSerializer(serializers.ModelSerializer):
    experience = serializers.JSONField(default=list)
    education = serializers.JSONField(default=list)
    skills = serializers.JSONField(default=list)
    languages = serializers.JSONField(default=list)

    class Meta:
        model = Resume
        fields = "__all__"
