from django.db import models

class Incident(models.Model):

    date = models.DateField()
    author = models.CharField(max_length=100, null=True, blank=True)
    target = models.CharField(max_length=150, null=True,  blank=True)
    description = models.TextField(max_length=500)
    records_lost = models.PositiveIntegerField(null=True, blank=True)
    monetary_cost = models.PositiveIntegerField(null=True ,blank=True)
    link1 = models.CharField(max_length=300)
    link2 = models.CharField(max_length=300, null=True, blank=True)
    tag = models.CharField(max_length=200, null=True, blank=True)
    vetted = models.BooleanField(default=False)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name="filed_incident",
        on_delete=models.CASCADE
    )
    countries = models.ManyToManyField(
        'classification.Country',
        related_name = "country_list",
        blank=True
    )
    attack_classes = models.ManyToManyField(
        'classification.Attack_Class',
        related_name = 'attack_class_selection',
        blank=True
    ) 
    attack_types = models.ManyToManyField(
        'classification.Attack_Type',
        related_name = 'attack_type_selection',
        blank=True
    )
    target_classes = models.ManyToManyField(
        'classification.target_class',
        related_name = 'target_type_selection',
        blank=True
    )

    def __str__(self):
        return f'{self.date} - {self.description}'

class IncidentSummary(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    country = models.CharField(max_length=50)
    iso2 = models.CharField(max_length=2)
    iso3 = models.CharField(max_length=3)
    yy_mm = models.DateField()
    monthly_count = models.PositiveIntegerField()
    monthly_total = models.PositiveIntegerField()
    percentage = models.DecimalField(max_digits=13, decimal_places=10)
    class Meta:
        managed = False
        db_table = 'incident_summary'