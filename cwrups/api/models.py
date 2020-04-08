# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser

'''
TO-DO: Add models, list foreign keys
commands to import: 
manage.py makemigrations
manage.py migrate
(If error due to created table) manage.py migrate --fake api
manage.py migrate (again... if error)
'''


class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    house_number = models.IntegerField()
    street_name = models.TextField()
    apt_number = models.IntegerField(blank=True, null=True)
    city = models.TextField()
    state = models.TextField()
    zip_code = models.IntegerField()

    class Meta:

        db_table = 'address'


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, password=None, **extra_fields):
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user


class AdminSiteCredentials(AbstractBaseUser):
    username = models.AutoField(primary_key=True)
    salted_and_hashed_password = models.TextField()

    objects = UserManager()
    class Meta:
        db_table = 'admin_site_credentials'

# class User(AbstractBaseUser):

#     objects = UserManager()

#     USERNAME_FIELD = "email"
#     class Meta:
#         db_table = 'admin_site_credentials'


class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.TextField()
    last_name = models.TextField()

    class Meta:

        db_table = 'customer'


class ShipFromCustomer(models.Model):
    order_id = models.IntegerField(primary_key=True)
    customer_id = models.IntegerField()

    class Meta:
        db_table = 'ships_from_customer'


class ShipToCustomer(models.Model):
    order_id = models.IntegerField(primary_key=True)
    customer_id = models.IntegerField()

    class Meta:

        db_table = 'ships_to_customer'


class ShipFromAddress(models.Model):
    order_id = models.IntegerField(primary_key=True)
    address_id = models.IntegerField()

    class Meta:
        db_table = 'ships_from_address'


class ShipToAddress(models.Model):
    order_id = models.IntegerField(primary_key=True)
    address_id = models.IntegerField()

    class Meta:
        db_table = 'ships_to_address'


class DistributionCenter(models.Model):
    distribution_center_id = models.AutoField(primary_key=True)
    description = models.TextField()

    class Meta:

        db_table = 'distribution_center'
# Unable to inspect table 'distribution_center_address'
# The error was: list index out of range


class Order(models.Model):
    order_id = models.AutoField(primary_key=True, db_column='order_id')
    order_date = models.DateTimeField()
    initial_estimated_arrival_date = models.DateTimeField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)

    class Meta:

        db_table = 'order'


# Unable to inspect table 'order_parcel_type'
# The error was: list index out of range


class ParcelType(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_description = models.TextField()

    class Meta:

        db_table = 'parcel_type'


class OrderParcelType(models.Model):
    order_id = models.IntegerField(primary_key=True)
    parcel_type = models.IntegerField()

    class Meta:

        db_table = 'order_parcel_type'


class ShippingLeg(models.Model):
    leg_id = models.AutoField(primary_key=True)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField(blank=True, null=True)

    class Meta:

        db_table = 'shipping_leg'
# Unable to inspect table 'shipping_leg_asset_used'
# The error was: list index out of range
# Unable to inspect table 'shipping_leg_destination'
# The error was: list index out of range
# Unable to inspect table 'shipping_leg_origin'
# The error was: list index out of range
# Unable to inspect table 'shipping_rate'
# The error was: list index out of range
# Unable to inspect table 'ships_from_address'
# The error was: list index out of range
# Unable to inspect table 'ships_from_customer'
# The error was: list index out of range
# Unable to inspect table 'ships_to_address'
# The error was: list index out of range
# Unable to inspect table 'ships_to_customer'
# The error was: list index out of range
# Unable to inspect table 'status_updates'
# The error was: list index out of range
# Unable to inspect table 'transit_asset_method'
# The error was: list index out of range

class TransitHardAsset(models.Model):
    asset_id = models.AutoField(primary_key=True)
    make = models.TextField()
    model = models.TextField()
    purchase_date = models.DateTimeField()
    temperature_controlled = models.BooleanField()  # This field type is a guess.

    class Meta:

        db_table = 'transit_hard_asset'


class TransitMethod(models.Model):
    method_id = models.AutoField(primary_key=True)
    method_description = models.TextField()

    class Meta:

        db_table = 'transit_method'


class StatusUpdates(models.Model):
    status_update_id = models.AutoField(primary_key=True)
    order_id = models.ForeignKey(Order, on_delete=models.DO_NOTHING, db_column='order_id', unique=False)
    distribution_center = models.ForeignKey(DistributionCenter,
                                            on_delete=models.DO_NOTHING, db_column='distribution_center')
    enter_leg = models.ForeignKey(ShippingLeg,
                                  on_delete=models.DO_NOTHING, db_column='enter_leg', related_name='enter_leg',
                                  blank=True, null=True)
    exit_leg = models.ForeignKey(ShippingLeg,
                                 on_delete=models.DO_NOTHING, db_column='exit_leg', related_name='exit_leg',
                                 blank=True, null=True)
    '''
    CREATE TABLE `status_updates` (
    `order_id` INTEGER NOT NULL,
    `distribution_center_id` INTEGER NOT NULL,
    `enter_leg` INTEGER DEFAULT NULL,
    `exit_leg` INTEGER DEFAULT NULL,
    PRIMARY KEY (`order_id`,`distribution_center_id`),
    FOREIGN KEY (`distribution_center_id`) REFERENCES `distribution_center` (`distribution_center_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (`enter_leg`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (`exit_leg`) REFERENCES `shipping_leg` (`leg_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    );
    '''

    class Meta:
        db_table = 'status_updates'
        unique_together = (('order_id', 'distribution_center'),)


class ShippingRates(models.Model):
    shipping_rate_id = models.AutoField(primary_key=True)
    parcel_type = models.ForeignKey(ParcelType, on_delete=models.DO_NOTHING, db_column='parcel_type', unique=False)
    effective_date = models.DateField()
    flat_fee = models.DecimalField(decimal_places=2, max_digits=4)

    class Meta:
        db_table = 'shipping_rates'
        unique_together = (('parcel_type', 'effective_date'),)


class DistributionCenterAddress(models.Model):
    distribution_center_id = models.OneToOneField(DistributionCenter, on_delete=models.DO_NOTHING, primary_key=True,
                                                  db_column="distribution_center_id")
    address_id = models.ForeignKey(Address, on_delete=models.DO_NOTHING, db_column="address_id")

    class Meta:

        db_table = 'distribution_center_address'


class ShippingLegOrigin(models.Model):
    shipping_leg_id = models.OneToOneField(ShippingLeg, on_delete=models.DO_NOTHING, db_column='shipping_leg_id', primary_key=True)
    address_id = models.ForeignKey(Address, on_delete=models.DO_NOTHING, db_column='address_id')

    class Meta:

        db_table = 'shipping_leg_origin'


class ShippingLegDestination(models.Model):
    shipping_leg_id = models.OneToOneField(ShippingLeg, on_delete=models.DO_NOTHING, db_column='shipping_leg_id', primary_key=True)
    address_id = models.ForeignKey(Address, on_delete=models.DO_NOTHING, db_column='address_id')

    class Meta:

        db_table = 'shipping_leg_destination'


class ShippingLegAssetUsed(models.Model):
    leg_id = models.OneToOneField(ShippingLeg, on_delete=models.DO_NOTHING, db_column='leg_id', primary_key=True)
    asset_id = models.ForeignKey(TransitHardAsset, on_delete=models.DO_NOTHING, db_column='asset_id')

    class Meta:

        db_table = 'shipping_leg_asset_used'


class TransitAssetMethod(models.Model):
    asset_id = models.OneToOneField(TransitHardAsset, on_delete=models.DO_NOTHING, db_column='asset_id', primary_key=True)
    method_id = models.ForeignKey(TransitMethod, on_delete=models.DO_NOTHING, db_column='method_id')

    class Meta:

        db_table = 'transit_asset_method'
