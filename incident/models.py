from django.db import models

class Incident(models.Model):

    date = models.DateField()
    author = models.CharField(max_length=100, null=True, blank=True)
    target = models.CharField(max_length=100, null=True,  blank=True)
    description = models.TextField()
    records_lost = models.PositiveIntegerField(null=True, blank=True)
    monetary_cost = models.PositiveIntegerField(null=True ,blank=True)
    link1 = models.CharField(max_length=300)
    link2 = models.CharField(max_length=300, null=True, blank=True)
    tag = models.CharField(max_length=100, null=True, blank=True)
    vetted = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.date} - {self.description}'

# blank=True (field is not required)