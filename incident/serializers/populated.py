from jwt_auth.serializers.nested import NestedUserSerializer
from ..serializers.common import IncidentSerializer

class PopulatedIncidentSerializer(IncidentSerializer):
    owner = NestedUserSerializer()
