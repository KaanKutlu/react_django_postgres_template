from .models import SNP, Patient 
from .serializers import PatientSerializer, SNPSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.serializers.json import DjangoJSONEncoder
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import viewsets


class SimpleRequest(APIView):
    def get(self, request, format=None):
        final_data = [1, 2, 3, 4, 5]    
        return Response(final_data)

class PatientList(viewsets.ModelViewSet):
    model = Patient
    serializer_class = PatientSerializer
    queryset = Patient.objects


class SNPList(viewsets.ModelViewSet):
    model = SNP
    serializer_class = SNPSerializer
    queryset = SNP.objects
