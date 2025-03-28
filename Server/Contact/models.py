# from django.db import models


# class Contact(models.Model):
#     full_name = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     message = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.full_name  # Fixed issue here (removed tuple return)


#! test
from django.db import models


class Contact(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)  # New field for tracking read status

    def __str__(self):
        return f"{self.full_name} - {self.email}"

    class Meta:
        ordering = ["-created_at"]  # Newest first
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
