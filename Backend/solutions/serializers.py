from rest_framework import serializers
from .models import Solution
from problems.models import CodingProblem

class SolutionSerializer(serializers.ModelSerializer):
    problem = serializers.PrimaryKeyRelatedField(queryset=CodingProblem.objects.all())
    
    class Meta:
        model = Solution
        fields = '__all__'
