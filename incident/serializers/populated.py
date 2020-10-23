from jwt_auth.serializers.nested import NestedUserSerializer
from ..serializers.common import IncidentSerializer
from classification.serializers.common import CountrySerializer, Attack_ClassSerializer, Attack_TypeSerializer, Target_ClassSerializer

class PopulatedIncidentSerializer(IncidentSerializer):
    owner = NestedUserSerializer()
    countries = CountrySerializer(many=True)
    attack_classes = Attack_ClassSerializer(many=True)
    attack_types = Attack_TypeSerializer(many=True)
    target_classes = Target_ClassSerializer(many=True)
