# Generated by Django 3.1.2 on 2020-10-25 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classification', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='country',
            name='iso3',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]
