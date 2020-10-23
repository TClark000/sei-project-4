from django.urls import path
from .views import IncidentListView, IncidentDetailView

urlpatterns = [
    path('', IncidentListView.as_view()),
    path('<int:pk>/', IncidentDetailView.as_view())
]