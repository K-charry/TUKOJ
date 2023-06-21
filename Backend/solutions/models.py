from django.db import models
from django.db.models import JSONField
from problems.models import CodingProblem

class Solution(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    source_code = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_accepted = models.BooleanField(default=False) # 올바른 출력을 제공하면 True입니다. (채점 결과를 테스트 케이스로 반영)
    test_case_results = models.JSONField(null=True)
    execution_result = models.TextField(null=True, blank=True)

    # Foreign key to CodeProblem 
    problem = models.ForeignKey(CodingProblem, on_delete=models.CASCADE)
