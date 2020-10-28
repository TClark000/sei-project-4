from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Incident, IncidentSummary
from .serializers.common import IncidentSerializer
from .serializers.populated import PopulatedIncidentSerializer
from .serializers.summary import IncidentSummarySerializer

class IncidentListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        incident_list = Incident.objects.all()
        serialized_incident_list = PopulatedIncidentSerializer(incident_list, many=True)
        return Response(serialized_incident_list.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        incident_to_create = IncidentSerializer(data=request.data)
        if incident_to_create .is_valid():
            incident_to_create.save()
            return Response(incident_to_create.data, status=status.HTTP_201_CREATED)
        return Response(incident_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class IncidentDetailView(APIView):
    
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_incident(self, pk):
        try:
            return Incident.objects.get(pk=pk)
        except Incident.DoesNotExit:
            raise NotFound()
    
    def is_incident_owner(self, incident, user):
        if incident.owner.id != user.id:
            raise PermissionDenied()
    
    def get(self, _request, pk):
        incident = self.get_incident(pk=pk)
        serialized_incident = PopulatedIncidentSerializer(incident)
        return Response(serialized_incident.data, status=status.HTTP_200_OK)

    def put(self,request, pk):
        incident_to_update = self.get_incident(pk=pk)
        self.is_incident_owner(incident_to_update, request.user)
        updated_incident = IncidentSerializer(incident_to_update, data=request.data)
        if updated_incident.is_valid():
            updated_incident.save()
            return Response(updated_incident.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_incident.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        incident_to_delete = self.get_incident(pk=pk)
        self.is_incident_owner(incident_to_delete, request.user)
        incident_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class IncidentSummaryView(APIView):

    def get(self, _request):
        incident_summary = IncidentSummary.objects.all()
        serialized_incident_summary = IncidentSummarySerializer(incident_summary, many=True)
        return Response(serialized_incident_summary.data, status=status.HTTP_200_OK)