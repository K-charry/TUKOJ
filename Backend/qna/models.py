from django.db import models

class Question(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    question = models.TextField()
    is_solved = models.BooleanField(default=False) # 질문 해결여부
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    # user = models.ForeignKey(User, on_delete=models.CASCADE) # 여기서 CASCADE 말고 SET_NULL 해주면 답변 삭제 못하도록 할 수 있음!!
    answer = models.TextField()
    is_adopted = models.BooleanField(default=False) # 답변 채택여부
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # 정답 채택 여부 확인
        if self.is_adopted:
            # 해당 질문을 '해결됨'으로 업데이트 
            self.question.is_solved = True
            self.question.save()
