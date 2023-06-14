import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Solution
from .serializers import SolutionSerializer

class SolutionListCreateAPI(APIView):
    def post(self, request, format=None):
        serializer = SolutionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            problem = serializer.validated_data['problem']
            source_code = serializer.validated_data['source_code']

            # 문제의 각 '테스트 케이스'에 대해
            for test_case in problem.test_cases.all(): 
                data = {
                    'script': source_code,
                    'input': test_case.input,
                    'expected_output': test_case.expected_output,
                }
            
                res = requests.post('http://localhost:80/run', data=json.dumps(data), headers={'Content-Type': 'application/json'})

                # 채점 서버의 응답을 처리
                # 서버 응답에 테스트 통과 여부를 나타내는 'result' 필드가 포함되어 있다고 가정..
                if res.status_code == status.HTTP_200_OK:
                    result = res.json().get('result')
                    if result == 'pass':
                        print(f'테스트 케이스 통과: {test_case.id}')
                    else:
                        print(f'테스트 케이스 통과XX: {test_case.id}')
                else:
                    print(f'요청 실패: {res.status_code}')

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request, format=None):
        solutions = Solution.objects.all()
        serializer = SolutionSerializer(solutions, many=True)
        return Response(serializer.data)

class SolutionDetailAPI(APIView):
    def get(self, request, pk, format=None):
        solution = get_object_or_404(Solution, pk=pk)
        serializer = SolutionSerializer(solution)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        solution = get_object_or_404(Solution, pk=pk)
        serializer = SolutionSerializer(solution, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
