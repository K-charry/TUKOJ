from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer

class QuestionView(APIView):
    def get(self, request, question_id=None):
        if question_id:
            question = Question.objects.filter(id=question_id, is_deleted=False).first()
            if not question:
                return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = QuestionSerializer(question)
        else:
            questions = Question.objects.filter(is_deleted=False)
            serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, question_id):
        question = Question.objects.filter(id=question_id, is_deleted=False).first()
        if not question:
            return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, question_id):
        question = Question.objects.filter(id=question_id, is_deleted=False).first()
        if not question:
            return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)
        question.is_deleted = True
        question.save()
        return Response({'message': 'Question deleted successfully'}, status=status.HTTP_200_OK)


class AnswerView(APIView):
    def get(self, request, answer_id=None):
        if answer_id:
            answer = Answer.objects.filter(id=answer_id, is_deleted=False).first()
            if not answer:
                return Response({'error': 'Answer not found'}, status=status.HTTP_404_NOT_FOUND)
            serializer = AnswerSerializer(answer)
        else:
            answers = Answer.objects.filter(is_deleted=False)
            serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, question_id=None): # 질문글에 대한 id도 파라미터로 받아옴.
        question = Question.objects.filter(id=question_id, is_deleted=False).first()
        if not question:
            return Response({'error': 'Question not found'}, status=status.HTTP_404_NOT_FOUND)
        data = request.data.copy() # 요청 데이터의 변경 가능한 사본 만듦.
        data['question'] = question_id
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, answer_id):
        answer = Answer.objects.filter(id=answer_id, is_deleted=False).first()
        if not answer:
            return Response({'error': 'Answer not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, answer_id):
        answer = Answer.objects.filter(id=answer_id, is_deleted=False).first()
        if not answer:
            return Response({'error': 'Answer not found'}, status=status.HTTP_404_NOT_FOUND)
        answer.is_deleted = True
        answer.save()
        return Response({'message': 'Answer deleted successfully'}, status=status.HTTP_200_OK)

