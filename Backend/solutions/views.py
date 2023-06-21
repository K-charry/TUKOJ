from django.conf import settings
import logging
import requests
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Solution
from .serializers import SolutionSerializer

logger = logging.getLogger(__name__)

class SolutionListCreateAPI(APIView):
    def post(self, request, format=None):
        serializer = SolutionSerializer(data=request.data)
        if serializer.is_valid():
            problem = serializer.validated_data['problem']
            source_code = serializer.validated_data['source_code']

            # 각 테스트 케이스의 결과를 담을 딕셔너리.
            test_case_results = {}

            # 문제의 각 '테스트 케이스'에 대해
            for test_case in problem.test_cases.all(): 
                data = {
                    'script': source_code,
                    'input': test_case.input,
                    'expected_output': test_case.expected_output,
                }

                try:
                    res = requests.post('http://judge-server:5001/run', data=json.dumps(data), headers={'Content-Type': 'application/json'})
                    res.raise_for_status()
                except requests.exceptions.HTTPError as err:
                    logger.error(f"HTTP error occurred: {err}") # Django의 로깅 사용
                    return Response({"error": "Failed to score the code due to HTTP error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                except Exception as err:
                    logger.error(f"An error occurred: {err}") # Django의 로깅 사용
                    return Response({"error": "Failed to score the code due to an error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                

                # 채점 서버의 응답을 처리
                # 서버 응답에 테스트 통과 여부를 나타내는 'result' 필드가 포함되어 있다고 가정..
                result = res.json().get('result')
                if result is None:
                    logger.error('Unexpected response from judge server')
                    # handle this error
                elif result == 'pass':
                    logger.info(f'테스트 케이스 통과됨: {test_case.id}') # Django의 로깅 사용
                    test_case_results[test_case.id] = "pass"
                else:
                    logger.info(f'Test case failed: {test_case.id}') # Django의 로깅 사용
                    # 여기에서 테스트 케이스가 실패하면 프로세스를 중지하고 사용자에게 오류를 반환할 수 있습니다.
                    # 또는 처리를 계속하되 솔루션을 잘못된 것으로 표시할 수 있습니다. (v)
                    test_case_results[test_case.id] = "fail"

            serializer.save()

            # 응답에 테스트 케이스 결과를 추가
            response_data = serializer.data
            response_data["test_case_results"] = test_case_results
            
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
