from django.urls import path

from .views import PatientList, SNPList, SimpleRequest

urlpatterns = [
    path("api/simple_endpoint/", SimpleRequest.as_view()),
    path("api/patients/", PatientList.as_view({"get": "list", "post": "create"})),
    path("api/snps/", SNPList.as_view({"get": "list", "post": "create"})),
]
