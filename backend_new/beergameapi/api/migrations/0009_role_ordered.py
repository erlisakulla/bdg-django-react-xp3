# Generated by Django 3.1.7 on 2021-04-09 20:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20210409_2018'),
    ]

    operations = [
        migrations.AddField(
            model_name='role',
            name='ordered',
            field=models.BooleanField(default=False),
        ),
    ]
