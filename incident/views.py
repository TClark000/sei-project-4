from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Incident
from .serializers.common import IncidentSerializer

class IncidentListView(APIView):

    def get(self, _request):
        incident_list = Incident.objects.all()
        serialized_incident_list = IncidentSerializer(incident_list, many=True)
        return Response(serialized_incident_list.data, status=status.HTTP_200_OK)