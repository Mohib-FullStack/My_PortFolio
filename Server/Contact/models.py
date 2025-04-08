# models.py
from django.db import models


# 🌟 CONTACT MODEL - Database structure for contact messages
class Contact(models.Model):
    # 🔹 Basic Fields
    full_name = models.CharField(
        max_length=255, verbose_name="Full Name"
    )  # Visitor's name
    email = models.EmailField(
        unique=True, verbose_name="Email"
    )  # Unique email constraint
    message = models.TextField(verbose_name="Message", blank=True)  # Optional message

    # ⏱️ Timestamp with database indexing for faster queries
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Created At",
        db_index=True,  # 🚀 Performance optimization
    )

    class Meta:
        verbose_name = "Contact"  # Singular name in admin
        verbose_name_plural = "Contacts"  # Plural name
        ordering = ["-created_at"]  # ⬇️ Newest first by default

    def __str__(self):
        return self.full_name  # Human-readable representation
