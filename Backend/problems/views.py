from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.generics import CreateAPIView
from .models import Problem, CodingProblem, OptionProblem, BlankProblem, TestCase
from .serializers import CodingProblemSerializer, OptionProblemSerializer, BlankProblemSerializer, TestCaseSerializer
import requests
import json

def get_serializer(problem_instance):
    if isinstance(problem_instance, CodingProblem):
        return CodingProblemSerializer
    elif isinstance(problem_instance, OptionProblem):
        return OptionProblemSerializer
    elif isinstance(problem_instance, BlankProblem):
        return BlankProblemSerializer
    else:
        raise ValueError("Invalid problem type")

class ProblemListAPI(APIView):
    def get(self, request): # 전체 문제 리스트 가져오기
        problem_list = []
        problem_list.extend(CodingProblem.objects.all())
        problem_list.extend(OptionProblem.objects.all())
        problem_list.extend(BlankProblem.objects.all())
        serialized_problems = []

        for problem in problem_list:
            serializer_class = get_serializer(problem)
            serialized_problems.append(serializer_class(problem).data)

        return Response(serialized_problems, status=status.HTTP_200_OK)

class ProblemAPI(APIView):
    def get_problem_by_type_and_id(self, type, id):
        problem_model = None

        if type == 'code':
            problem_model = CodingProblem
        elif type == 'select':
            problem_model = OptionProblem
        elif type == 'blank':
            problem_model = BlankProblem
        else:
            return None

        return problem_model.objects.filter(pk=id).first()

    def get(self, request, type, id):  # 문제 정보 가져오기
        problem = self.get_problem_by_type_and_id(type, id)

        if problem is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = get_serializer(problem)
        serializer = serializer_class(problem)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, type, id):  # 문제 삭제
        problem = self.get_problem_by_type_and_id(type, id)

        if problem is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        problem.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, type, id):  # update problem
        problem = self.get_problem_by_type_and_id(type, id)

        if problem is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer_class = get_serializer(problem)
        serializer = serializer_class(problem, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProblemCreateAPI(APIView):
    def post(self, request): # 문제 출제(생성)
        type = request.data.get('type')
        serializer_class = None

        if type == 'code':
            serializer_class = CodingProblemSerializer
        elif type == 'select':
            serializer_class = OptionProblemSerializer
        elif type == 'blank':
            serializer_class = BlankProblemSerializer
        else:
            return Response({"error": "Invalid problem type"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProblemsByTypeAPI(APIView): # 문제 유형별로 검색
    def get(self, request, type):
        problem_model = None

        if type == 'code': # 타입 이름 정의
            problem_model = CodingProblem
        elif type == 'select':
            problem_model = OptionProblem
        elif type == 'blank':
            problem_model = BlankProblem
        else:
            return Response({"error": "Invalid problem type"}, status=status.HTTP_400_BAD_REQUEST)

        problems = problem_model.objects.all()
        if problems:
            serializer_class = get_serializer(problems.first())
            serializer = serializer_class(problems, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)
    
class ProblemsByLanguageAPI(APIView): # 문제 언어별 검색
    def get(self, request, language):
        problem_list = []
        problem_list.extend(CodingProblem.objects.filter(language=language))
        problem_list.extend(OptionProblem.objects.filter(language=language))
        problem_list.extend(BlankProblem.objects.filter(language=language))
        serialized_problems = []

        for problem in problem_list:
            serializer_class = get_serializer(problem)
            serialized_problems.append(serializer_class(problem).data)

        return Response(serialized_problems, status=status.HTTP_200_OK)
    
class TestCaseCreateAPI(APIView):
    def post(self, request):  # Test case 생성
        serializer = TestCaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):  # Test case 리스트 불러오기
        test_cases = TestCase.objects.all()
        serializer = TestCaseSerializer(test_cases, many=True)
        return Response(serializer.data)
    
class TestCaseListAPI(APIView):
    def get(self, request, id): # 특정 문제에 대한 테스트 케이스들 검색
        print(f"Problem ID: {id}") # 디버그
        test_cases = TestCase.objects.filter(problem_id=id)
        print(f"Test Cases: {test_cases}") # 디버그
        if not test_cases.exists():
            return Response({'message': '이 문제에 대한 테스트케이스가 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TestCaseSerializer(test_cases, many=True)
        return Response(serializer.data)

    
class ScoreView(APIView):

    def post(self, request, *args, **kwargs):
        problem_id = request.data.get("problem_id")  # the id of the problem
        code = request.data.get("code")  # the user's code

        problem = CodingProblem.objects.get(id=problem_id)
        test_cases = problem.test_cases.all()

        test_cases_list = []
        for test_case in test_cases:
            test_cases_list.append({
                "input": test_case.input,
                "expected_output": test_case.expected_output,
            })

        # send a request to the scoring server
        scoring_server_url = "http://localhost:80/run"
        data = {
            "code": code,
            "test_cases": test_cases_list,
        }
        response = requests.post(scoring_server_url, json=data)

        if response.status_code == 200:
            # return the results to the front-end
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            # something went wrong
            return Response({"error": "Failed to score the code."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        