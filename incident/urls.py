from django.urls import path
from .views import IncidentListView, IncidentDetailView, IncidentSummaryView

urlpatterns = [
    path('', IncidentListView.as_view()),
    path('<int:pk>/', IncidentDetailView.as_view()),
    path('summary/', IncidentSummaryView.as_view())
]