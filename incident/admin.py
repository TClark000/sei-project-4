from django.contrib import admin

from .models import Incident, IncidentSummary

admin.site.register(Incident)
admin.site.register(IncidentSummary)
