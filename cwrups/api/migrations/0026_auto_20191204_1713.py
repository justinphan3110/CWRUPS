# Generated by Django 2.2.7 on 2019-12-04 22:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_auto_20191204_1712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='distributioncenteraddress',
            name='address_id',
            field=models.ForeignKey(db_column='address_id', on_delete=django.db.models.deletion.DO_NOTHING, to='api.Address'),
        ),
    ]
