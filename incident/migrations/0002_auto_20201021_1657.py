# Generated by Django 3.1.2 on 2020-10-21 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incident', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='incident',
            name='author',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='link2',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='monetary_cost',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='records_lost',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='tag',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='incident',
            name='target',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
