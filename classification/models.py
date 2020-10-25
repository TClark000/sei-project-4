from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=50, unique=True)
    iso2 = models.CharField(max_length=2, unique=True)
    iso3 = models.CharField(max_length=3, null=True,  blank=True)
    region = models.CharField(max_length=100, null=True,  blank=True)
    sub_region = models.CharField(max_length=100, null=True,  blank=True)
    class Meta:
        db_table = 'country'
    def __str__(self):
        return f'{self.name} - {self.iso2}'

class Attack_Type(models.Model):
    attack_type = models.CharField(max_length=80, unique=True)
    class Meta:
        db_table = 'attack_type'
    def __str__(self):
        return f'{self.attack_type}'

class Attack_Class(models.Model):
    attack_class = models.CharField(max_length=10, unique=True)
    class Meta:
        db_table = 'attack_class'
    def __str__(self):
        return f'{self.attack_class}'

class Target_Class(models.Model):
    target = models.CharField(max_length=100)
    target_class = models.CharField(max_length=3, unique=True)
    class Meta:
        db_table = 'target_class'
    def __str__(self):
        return f'{self.target_class} - {self.target}'