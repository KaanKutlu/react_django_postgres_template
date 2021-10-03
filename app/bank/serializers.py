from django.db.models.fields import TextField
from rest_framework import serializers

from .models import SNP, Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
    
class SNPSerializer(serializers.ModelSerializer):
    class Meta:
        model = SNP
        fields = '__all__'
        read_only_fields = ('id',)
