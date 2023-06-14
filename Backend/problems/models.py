from django.db import models
from django.db.models import JSONField

class Problem(models.Model):
    level = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    title = models.CharField(max_length=300)
    description = models.TextField()
    language = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True # 상속해주기 위함.
        
class CodingProblem(Problem): # 소스코드 문제
    input_format = models.CharField(max_length=200) # 실제 테스트케이스는 아니고 in, out 예제를 보여주는거일뿐...
    output_format = models.CharField(max_length=200)
    hint = models.CharField(max_length=400)

class OptionProblem(Problem): # O/X question
     is_correct = models.BooleanField() # O이면 True, X면 False

class BlankProblem(Problem): # 빈칸 문제
    blank_answer = models.CharField(max_length=200)

class TestCase(models.Model):
    input = models.TextField()
    expected_output = models.TextField()
    problem = models.ForeignKey(CodingProblem, related_name='test_cases', on_delete=models.CASCADE)

    def __str__(self):
        return f'TestCase {self.id} for problem {self.problem.id}'