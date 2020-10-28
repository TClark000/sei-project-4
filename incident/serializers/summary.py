from rest_framework import serializers
from ..models import IncidentSummary

class IncidentSummarySerializer(serializers.ModelSerializer):

    class Meta:
        model = IncidentSummary
        fields = '__all__'