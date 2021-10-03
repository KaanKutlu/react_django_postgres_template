import pytest

from samples.models import Lab, Machine, Run, Sample

@pytest.mark.django_db
def test_simple_sample_setup():
    lab = Lab(name="The David Lab")
    lab.save()
    machine = Machine(name="Dave's Machine", lab=lab)
    machine.save()
    run = Run(name="David's Awesome Test Run", machine=machine)
    run.save()
    sample = Sample(name="0david streett - but don't put pid here", run=run)
    sample.save()
    sample = Sample(name="1david streett - but don't put pid here", run=run)
    sample.save()
    sample = Sample(name="2david streett - but don't put pid here", run=run)
    sample.save()
    sample = Sample(name="3david streett - but don't put pid here", run=run)
    sample.save()
    sample = Sample(name="4david streett - but don't put pid here", run=run)
    sample.save()
    sample = Sample(name="5david streett - but don't put pid here", run=run)
    sample.save()

    assert len(Lab.objects.all()) == 1
    assert len(Sample.objects.all()) == 6
    