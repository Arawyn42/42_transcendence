from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    victory_count = models.IntegerField(default=0)
    defeat_count = models.IntegerField(default=0)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    friends = models.ManyToManyField('self', symmetrical=True, blank=True)
    def __str__(self):
        return self.user.username

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='received_requests', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def accept(self):
        """Method to accept the friend request"""
        self.to_user.profile.friends.add(self.from_user.profile)
        self.from_user.profile.friends.add(self.to_user.profile)
        self.delete()  # Remove the friend request after accepting

class Friendship(models.Model):
    from_user = models.ForeignKey(User, related_name='friendship_requests_sent', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='friendship_requests_received', on_delete=models.CASCADE)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user')  # Empêche les doublons

    def __str__(self):
        return f"{self.from_user} -> {self.to_user} (Accepted: {self.is_accepted})"