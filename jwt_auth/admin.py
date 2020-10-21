from django.contrib import admin

# confirm use of custom user model
from django.contrib.auth import get_user_model
User = get_user_model()

admin.site.register(User)
