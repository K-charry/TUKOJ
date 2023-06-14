from django.urls import path
from .views import ProblemListAPI, ProblemAPI, ProblemCreateAPI, ProblemsByTypeAPI, ProblemsByLanguageAPI, TestCaseCreateAPI, TestCaseListAPI, ScoreView

urlpatterns = [
    path('list/', ProblemListAPI.as_view(), name='problem_list'),
    path('', ProblemCreateAPI.as_view(), name='problem_create'),
    path('<str:type>/<int:id>/', ProblemAPI.as_view(), name='problem_detail'),
    path('type/<str:type>/', ProblemsByTypeAPI.as_view(), name='problems_by_type'),
    path('language/<str:language>/', ProblemsByLanguageAPI.as_view(), name='problems_by_language'),
    path('testcases/', TestCaseCreateAPI.as_view(), name='test_case_create'),
    path('testcases/<int:problem_id>/', TestCaseListAPI.as_view(), name='test_case_list'),
    path('score/', ScoreView.as_view(), name='score_code'),
]

