# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Address(models.Model):
    address_id = models.AutoField()
    house_number = models.IntegerField()
    street_name = models.TextField()
    apt_number = models.IntegerField(blank=True, null=True)
    city = models.TextField()
    state = models.TextField()
    zip_code = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'address'


class AdminSiteCredentials(models.Model):
    username = models.AutoField()
    salted_and_hashed_password = models.TextField()

    class Meta:
        managed = False
        db_table = 'admin_site_credentials'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    last_name = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Customer(models.Model):
    customer_id = models.AutoField()
    first_name = models.TextField()
    last_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'customer'


class DistributionCenter(models.Model):
    distribution_center_id = models.AutoField()
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'distribution_center'
# Unable to inspect table 'distribution_center_address'
# The error was: list index out of range


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    action_flag = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Order(models.Model):
    order_id = models.AutoField()
    order_date = models.DateTimeField()
    initial_estimated_arrival_date = models.DateTimeField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'order'
# Unable to inspect table 'order_parcel_type'
# The error was: list index out of range


class ParcelType(models.Model):
    type_id = models.AutoField()
    type_description = models.TextField()

    class Meta:
        managed = False
        db_table = 'parcel_type'


class ShippingLeg(models.Model):
    leg_id = models.AutoField()
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
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
    asset_id = models.AutoField()
    make = models.TextField()
    model = models.TextField()
    purchase_date = models.DateTimeField()
    temperature_controlled = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'transit_hard_asset'


class TransitMethod(models.Model):
    method_id = models.AutoField()
    method_description = models.TextField()

    class Meta:
        managed = False
        db_table = 'transit_method'
