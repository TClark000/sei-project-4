# Generated by Django 3.1.2 on 2020-10-23 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attack_Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attack_class', models.CharField(max_length=10, unique=True)),
            ],
            options={
                'db_table': 'attack_class',
            },
        ),
        migrations.CreateModel(
            name='Attack_Type',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attack_type', models.CharField(max_length=80, unique=True)),
            ],
            options={
                'db_table': 'attack_type',
            },
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('iso2', models.CharField(max_length=2, unique=True)),
                ('region', models.CharField(blank=True, max_length=100, null=True)),
                ('sub_region', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'country',
            },
        ),
        migrations.CreateModel(
            name='Target_Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target', models.CharField(max_length=100)),
                ('target_class', models.CharField(max_length=3, unique=True)),
            ],
            options={
                'db_table': 'target_class',
            },
        ),
    ]
