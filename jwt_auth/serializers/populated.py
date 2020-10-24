# from incident.serializers.common import IncidentSerializer
from incident.serializers.populated import PopulatedIncidentSerializer
from comments.serializers.common import CommentSerializer
from ..serializers.common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    filed_incident = PopulatedIncidentSerializer(many=True)
    posted_comments = CommentSerializer(many=True)