from incident.serializers.common import IncidentSerializer
from comments.serializers.common import CommentSerializer
from ..serializers.common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    filed_incident = IncidentSerializer(many=True)
    posted_comments = CommentSerializer(many=True)