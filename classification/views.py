from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import CountrySerializer, Attack_ClassSerializer, Attack_TypeSerializer, Target_ClassSerializer
from .models import Country, Attack_Class, Attack_Type, Target_Class

class CountryListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, _request):
        country_list = Country.objects.all()
        serialized_country_list = CountrySerializer(country_list, many=True)
        return Response(serialized_country_list.data, status=status.HTTP_200_OK)

class Attack_ClassListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, _request):
        attack_class_list = Attack_Class.objects.all()
        serialized_attack_class_list = Attack_ClassSerializer(attack_class_list, many=True)
        return Response(serialized_attack_class_list.data, status=status.HTTP_200_OK)

class Attack_TypeListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, _request):
        attack_type_list = Attack_Type.objects.all()
        serialized_attack_type_list = Attack_TypeSerializer(attack_type_list, many=True)
        return Response(serialized_attack_type_list.data, status=status.HTTP_200_OK)

class Target_ClassListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    def get(self, _request):
        target_class_list = Target_Class.objects.all()
        serialized_target_class_list = Target_ClassSerializer(target_class_list, many=True)
        return Response(serialized_target_class_list.data, status=status.HTTP_200_OK)
