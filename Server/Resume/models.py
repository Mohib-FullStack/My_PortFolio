# Create your models here.
from django.db import models


class Resume(models.Model):
    full_name = models.CharField(max_length=255)
    job_title = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    linkedin_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    summary = models.TextField()

    experience = models.JSONField(
        default=list
    )  # Store experience as a list of JSON objects
    education = models.JSONField(
        default=list
    )  # Store education as a list of JSON objects
    skills = models.JSONField(default=list)  # Store skills as a list of strings
    languages = models.JSONField(
        default=list
    )  # Store languages as a list of JSON objects

    def __str__(self):
        return self.full_name
