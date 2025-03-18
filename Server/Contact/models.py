from django.db import models


class Contact(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name  # Fixed issue here (removed tuple return)
