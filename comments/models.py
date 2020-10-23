from django.db import models

class Comment(models.Model):
    text = models.TextField(max_length =150)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name="posted_comments",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'Comment - {self.id} by user: {self.owner}'