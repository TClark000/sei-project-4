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

    def post(self, request):
        request.data['owner'] = request.user.id
        incident_to_create = IncidentSerializer(data=request.data)
        if incident_to_create .is_valid():
            incident_to_create.save()
            return Response(incident_to_create.data, status=status.HTTP_201_CREATED)
        return Response(incident_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    