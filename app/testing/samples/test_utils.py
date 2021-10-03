
import pytest
import os
from samples.models import Lab, Sample
from samples.serializers import TSO500Serializer 
from xml.dom import minidom

from samples.utils.tso500_file_parser import parse_tso500_metrics_file

DATA_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), "data")
METRICS_OUTPUT_FILE = os.path.join(DATA_FOLDER, "MetricsOutput.tsv")
RUN_INFO_FILE = os.path.join(DATA_FOLDER, "RunInfo.xml")
RUN_PARAMETERS_FILE = os.path.join(DATA_FOLDER, "RunParameters.xml")

@pytest.mark.django_db
def test_file_parser():
    with open(METRICS_OUTPUT_FILE, "rb") as metrics_file, \
        open(RUN_PARAMETERS_FILE, "rb") as run_parameters_file, \
        open(RUN_INFO_FILE, "rb") as run_info_file:
        full_data = parse_tso500_metrics_file(metrics_file, run_info_file, run_parameters_file, "LabTest") 

        serializer = TSO500Serializer(data=full_data)
        assert serializer.is_valid(), serializer.errors
        serializer.save()
        assert serializer.errors == {}
        assert Lab.objects.all().count() == 1
        assert Sample.objects.all().count() == 16

@pytest.mark.django_db
def test_add_tso500_run_from_file(client):
    zero_samples = Sample.objects.all()
    assert len(zero_samples) == 0
    with open(METRICS_OUTPUT_FILE, "r") as metrics, \
        open(RUN_PARAMETERS_FILE, "r") as run_parameters_file, \
        open(RUN_INFO_FILE, "r") as run_info:
        resp = client.post(
            "/api/tso500/",
            data={
                'metrics_output_file': metrics,
                'run_info_file': run_info,
                'run_parameters_file': run_parameters_file,
                'lab': 'Lab123TestTestTestTestTest',
            },
        )
        
    assert resp.status_code == 201

    sample = Sample.objects.all()
    assert len(sample) == 16
