from rest_framework import serializers
from ..models import Country, Attack_Class, Attack_Type, Target_Class

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class Attack_ClassSerializer(serializers.ModelSerializer):
     class Meta:
        model = Attack_Class
        fields = '__all__'

class Attack_TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attack_Type
        fields = '__all__'

class Target_ClassSerializer(serializers.ModelSerializer):
     class Meta:
        model = Target_Class
        fields = '__all__'