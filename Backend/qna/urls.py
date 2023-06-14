from django.urls import path
from .views import QuestionView, AnswerView

urlpatterns = [
    path('questions/', QuestionView.as_view()), # 질문 리스트, 생성
    path('questions/<int:question_id>/', QuestionView.as_view()), # 질문 화면 보기
    path('questions/<int:question_id>/answers/', AnswerView.as_view()), # 특정 질문에 대한 답변 리스트, 답변 생성
    path('answers/<int:answer_id>/', AnswerView.as_view()), # 답변 화면 보기
]
