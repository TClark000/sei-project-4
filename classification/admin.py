from django.contrib import admin

from .models import Country
from .models import Attack_Type
from .models import Attack_Class
from .models import Target_Class

admin.site.register(Country)
admin.site.register(Attack_Type)
admin.site.register(Attack_Class)
admin.site.register(Target_Class)