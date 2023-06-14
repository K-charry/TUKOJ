from django.urls import path
from .views import SolutionListCreateAPI, SolutionDetailAPI

urlpatterns = [
     path('submit/', SolutionListCreateAPI.as_view(), name='submit_solution'),
     path('submit/<int:pk>/', SolutionDetailAPI.as_view()),
]
