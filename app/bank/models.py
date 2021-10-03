from django.db import models
from django.db.models.fields import TextField
from django.db.models.fields.related import ForeignKey
from django.utils.translation import gettext_lazy as _
class VariantGroup(models.model):
    pass

class Assertions(models.Model):
    '''
    do assestions need to be the same lenght as evidence? 
    '''
    pass


class Evidence(models.Model):
    """
    https://civic.readthedocs.io/en/latest/model/evidence/overview.html

    Storing evidence for the variant

    Multiple variants can have multiple "evidence"
    """

    class LevelOfEvidence(models.TextChoices):
        VALIDATED = 'A', _('Validated')
        CLINICAL = 'B', _('Clinical')
        CASE_STUDY = 'C', _('Case Study')
        PRECLINCAL = 'D', _('Preclinical')
        INFERENCTIAL = 'F', _('Inferenctial')

    """
    https://civic.readthedocs.io/en/latest/curating/evidence.html#curating-evidence-general
    These are the "types" of evidence
    """
    class Types(models.TextChoices):
        PREDICTIVE = 'Predictive', _('Predictive')
        DIAGNOSTICS = 'Diagnostic', _('Diagnostic')
        PROGNOSTIC = 'Prognostic', _('Prognostic')
        PRECLINCAL = 'Predisposing', _('Predisposing')
        INFERENCTIAL = 'Oncogenic', _('Oncogenic')
        FUNCTIONAL = 'Functional', _('Functional')

    class Direction(models.TextChoices):
        NEGATIVE = 'Negative', _('Negative')
        POSITIVE = 'Positive', _('Positive')

    level = models.CharField(max_length=1, choices=LevelOfEvidence, blank=False, null=False)
    type = models.TextField(choices=Types, null=False, blank=False)
    clinical_significance = models.TextField(blank=True, null=True)
    direction = models.TextField(choices=Direction, blank=True, null=True)
    origin = models.TextField(choices=Direction, blank=True, null=True)
    variant = models.ForeignKey(Variant, on_delete=models.RESTRICT)
    civic_assert = models.ForeignKey() 
    

class Predictive(models.Model):
    name = models.TextField(null=False, primary_key=True)




class Source(models.Model):
    name = models.TextField()
    citation = models.TextField()
    citation_id = models.TextField()
    source_type = models.TextField()
    asco_abstract_id = models.TextField(blank=True, null=True)
    source_url = models.URLField()
    open_access = models.TextField(blank=True, null=False)
    pmc_id = models.TextField(blank=True, null=False)
    publication_date = models.DateField()
    journal = models.TextField()
    full_journal_title = models.TextField()
    status = models.TextField()
    is_reviewed = models.BooleanField()
    clinical_trials = models.TextField(many=True)



class Gene(models.Model):
    entrez_id = models.IntegerField(primary_key=True)
    description = models.TextField()
    name = models.TextField()
    flagged = models.BooleanField()
    # TODO: Variants
    # variants = #
    aliases = models.TextField(many=True)
    updated_at = models.DateField()
    
    sources = models.ForeignKey(Source, many=True)
    provisional_values = models.JSONField()
    errors = models.JSONField()
    
class RootConcept(models.Model):
    so_id = models.TextField()
    name = models.TextField()

class VariantTypes(models.Model):
    name = models.TextField()
    so_id = models.TextField()
    description = models.TextField()
    url = http://www.sequenceontology.org/browser/current_svn/term/SO:0001583
    root_concept = ForeignKey(RootConcept)

class Variant(models.Model):
    """
    https://civic.readthedocs.io/en/latest/model/variants/overview.html?highlight=civic%20actionability%20score#variants-overview
    """
    gene = models.ForeignKey(Gene) 
    name = models.TextField()
    description = models.TextField()
    variant_types 
    aliases = models.TextField()
    hgvs_expressions = models.TextField()
    variant_evidence_score = models.TextField()
    allele_registry_id = models.TextField()
    civic_evidnece_score = models.TextField()
    summary_sources = models.TextField()
    variant_types = models.TextField()
    clinvar_id = models.TextField()
    my_variant_info = models.TextField()
    coordinates = models.TextField()    


