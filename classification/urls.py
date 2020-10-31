from django.urls import path
from .views import CountryListView, Attack_ClassListView, Attack_TypeListView, Target_ClassListView

urlpatterns = [
    path('countries/', CountryListView.as_view()),
    path('attack_classes/', Attack_ClassListView.as_view()),
    path('attack_types/', Attack_TypeListView.as_view()),
    path('target_classes/', Target_ClassListView.as_view())
]