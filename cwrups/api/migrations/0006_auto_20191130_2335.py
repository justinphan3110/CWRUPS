# Generated by Django 2.2.7 on 2019-11-30 23:35

import api.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20191130_2333'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='adminsitecredentials',
            managers=[
                ('objects', api.models.UserManager()),
            ],
        ),
    ]
