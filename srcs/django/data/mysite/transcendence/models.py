from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class CustomUser(AbstractUser):
    # Ajouter les champs personnalisés ici si nécessaire

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Utilisation d'un related_name unique
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',  # Utilisation d'un related_name unique
        blank=True
    )
