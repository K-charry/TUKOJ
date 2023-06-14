from rest_framework import serializers
from .models import CodingProblem, OptionProblem, BlankProblem, TestCase

class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = '__all__'
        
class CodingProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodingProblem
        fields = ['id', 'level', 'type', 'title', 'description', 'language', 'input_format', 'output_format', 'hint', 'created_at', 'updated_at', 'is_deleted']
        read_only_fields = ['id', 'created_at', 'updated_at']

class OptionProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionProblem
        fields = ['id', 'level', 'type', 'title', 'description', 'language', 'is_correct', 'created_at', 'updated_at', 'is_deleted']
        read_only_fields = ['id', 'created_at', 'updated_at']

class BlankProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlankProblem
        fields = ['id', 'level', 'type', 'title', 'description', 'language', 'blank_answer', 'created_at', 'updated_at', 'is_deleted']
        read_only_fields = ['id', 'created_at', 'updated_at']
