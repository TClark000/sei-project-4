# Generated by Django 3.1.2 on 2020-10-27 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incident', '0002_auto_20201023_1033'),
    ]

    operations = [
        migrations.CreateModel(
            name='IncidentSummary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=50)),
                ('iso2', models.CharField(max_length=2)),
                ('iso3', models.CharField(max_length=3)),
                ('yy_mm', models.DateField()),
                ('monthly_count', models.PositiveIntegerField()),
                ('monthly_total', models.PositiveIntegerField()),
                ('percentage', models.DecimalField(decimal_places=10, max_digits=13)),
            ],
            options={
                'db_table': 'incident_summary',
                'managed': False,
            },
        ),
    ]
