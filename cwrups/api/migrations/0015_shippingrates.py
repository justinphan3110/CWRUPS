# Generated by Django 2.2.7 on 2019-12-03 01:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20191202_2145'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShippingRates',
            fields=[
                ('shipping_rate_id', models.AutoField(primary_key=True, serialize=False)),
                ('effective_date', models.DateTimeField()),
                ('flat_fee', models.DecimalField(decimal_places=2, max_digits=4)),
                ('parcel_type', models.ForeignKey(db_column='parcel_type', on_delete=django.db.models.deletion.DO_NOTHING, to='api.ParcelType')),
            ],
            options={
                'db_table': 'shipping_rates',
                'unique_together': {('parcel_type', 'effective_date')},
            },
        ),
    ]
