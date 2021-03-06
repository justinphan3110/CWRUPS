# Generated by Django 2.2.7 on 2019-12-03 01:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_shippinglegassetused'),
    ]

    operations = [
        migrations.CreateModel(
            name='TransitAssetMethod',
            fields=[
                ('asset_id', models.OneToOneField(db_column='asset_id', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='api.TransitHardAsset')),
                ('method_id', models.ForeignKey(db_column='method_id', on_delete=django.db.models.deletion.DO_NOTHING, to='api.TransitMethod')),
            ],
            options={
                'db_table': 'transit_asset_method',
            },
        ),
    ]
