from django.shortcuts import render
from rest_framework import generics, mixins, viewsets
from .models import Order, Address
from rest_framework import serializers
from .serializers.serializers import *
from rest_framework.views import APIView
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import AllowAny, AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.forms.models import model_to_dict
from rest_framework.renderers import JSONRenderer
from ._order_create_model_and_print_label import OrderCreateModelAndPrintLabelMixin


# Create your views here.
class OrderCreateListRetriveView(OrderCreateModelAndPrintLabelMixin,
                                 mixins.ListModelMixin,
                                 mixins.RetrieveModelMixin,
                                 viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def parcel_description(self, request, orderID, *args, **kwargs):
        '''
         Getting parcel description of an order
        '''
        order_id = str(self.kwargs['orderID'])

        queryset = ParcelType.objects.raw(
            "SELECT type_id\
             FROM parcel_type\
             JOIN order_parcel_type ON parcel_type.type_id = order_parcel_type.parcel_type\
             WHERE order_parcel_type.order_id = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'parcel_description': obj.type_description,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data[0])

    def current_distro_ctr(self, request, orderID, *args, **kwargs):
        order_id = str(self.kwargs['orderID'])

        queryset = StatusUpdates.objects.raw(
            # Must include "SELECT 1 as status_update_id" to solve Django's "raw query must include primary key".
            "SELECT 1 as status_update_id, distribution_center\
            FROM status_updates\
            WHERE exit_leg IS NULL\
            AND  status_updates.order_id = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'distribution_center': obj.distribution_center.distribution_center_id,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data[0])

    def current_status_update(self, request, orderID, *args, **kwargs):
        order_id = str(self.kwargs['orderID'])

        queryset = StatusUpdates.objects.raw(
            # Must include "SELECT 1 as status_update_id" to solve Django's "raw query must include primary key".
            "SELECT status_update_id\
            FROM status_updates\
            WHERE exit_leg IS NULL\
            AND  status_updates.order_id = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'status_update_id': obj.status_update_id,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data[0])

    def order_details(self, request, orderID, *args, **kwargs):
        '''
            Getting more details of an order
        '''
        class OrderDetails(models.Model):
            order_id = models.IntegerField(primary_key=True)
            weight = models.IntegerField(blank=True, null=True)
            type_description = models.TextField()
            customer_from_id = models.IntegerField()
            customer_from_first_name = models.TextField()
            customer_from_last_name = models.TextField()
            customer_to_id = models.IntegerField()
            customer_to_first_name = models.TextField()
            customer_to_last_name = models.TextField()
            address_from_address_id = models.IntegerField()
            address_from_house_number = models.IntegerField()
            address_from_street_name = models.TextField()
            address_from_apt_number = models.IntegerField(blank=True, null=True)
            address_from_city = models.TextField()
            address_from_state = models.TextField()
            address_from_zip_code = models.IntegerField()
            address_to_address_id = models.IntegerField()
            address_to_house_number = models.IntegerField()
            address_to_street_name = models.TextField()
            address_to_apt_number = models.IntegerField(blank=True, null=True)
            address_to_city = models.TextField()
            address_to_state = models.TextField()
            address_to_zip_code = models.IntegerField()

        order_id = str(self.kwargs['orderID'])

        queryset = OrderDetails.objects.raw(
            'SELECT O.order_id, O.weight\
            , parcel_type.type_description\
            , customerFrom.customer_id AS customer_from_id , customerFrom.first_name AS customer_from_first_name\
            , customerFrom.last_name AS customer_from_last_name\
            , customerTo.customer_id AS customer_to_id , customerTo.first_name AS customer_to_first_name\
            , customerTo.last_name AS customer_to_last_name\
            , addressFrom.address_id AS address_from_address_id, addressFrom.house_number AS address_from_house_number\
            , addressFrom.street_name AS address_from_street_name, addressFrom.apt_number AS address_from_apt_number\
            , addressFrom.city AS address_from_city, addressFrom.state AS address_from_state, addressFrom.zip_code AS address_from_zip_code\
            , addressTo.address_id AS address_to_address_id, addressTo.house_number AS address_to_house_number\
            , addressTo.street_name AS address_to_street_name,addressTo.apt_number AS address_to_apt_number\
            , addressTo.city AS address_to_city, addressTo.state AS address_to_state, addressTo.zip_code AS address_to_zip_code\
             FROM "order" AS O\
             JOIN order_parcel_type ON order_parcel_type.order_id = O.order_id\
             JOIN parcel_type ON order_parcel_type.parcel_type = parcel_type.type_id\
             JOIN ships_from_customer ON ships_from_customer.order_id = O.order_id\
             JOIN customer AS customerFrom ON ships_from_customer.customer_id = customerFrom.customer_id\
             JOIN ships_to_customer ON ships_to_customer.order_id = O.order_id\
             JOIN customer AS customerTo ON ships_to_customer.customer_id = customerTo.customer_id\
             JOIN ships_from_address ON ships_from_address.order_id = O.order_id\
             JOIN address AS addressFrom ON ships_from_address.address_id = addressFrom.address_id\
             JOIN ships_to_address ON ships_to_address.order_id = O.order_id\
             JOIN address AS addressTo ON ships_to_address.address_id = addressTo.address_id\
             WHERE O.order_id = ' + order_id 
        )
        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'order_id': obj.order_id,
                    'weight': obj.weight,
                    'type_description': obj.type_description,
                    'customer': {
                        'from':{
                            'customer_id': obj.customer_from_id,
                            'first_name': obj.customer_from_first_name,
                            'last_name': obj.customer_from_last_name,
                        },
                        'to': {
                            'customer_id': obj.customer_to_id,
                            'first_name': obj.customer_to_first_name,
                            'last_name': obj.customer_to_last_name,
                        }
                    },
                    'address': {
                        'from': {
                            'address_id': obj.address_from_address_id,
                            'house_number': obj.address_from_house_number,
                            'street_name': obj.address_from_street_name,
                            'apt_number': obj.address_from_apt_number,
                            'city': obj.address_from_city,
                            'state': obj.address_from_state,
                            'zip_code': obj.address_from_zip_code
                        },
                        'to': {
                            'address_id': obj.address_to_address_id,
                            'house_number': obj.address_to_house_number,
                            'street_name': obj.address_to_street_name,
                            'apt_number': obj.address_to_apt_number,
                            'city': obj.address_to_city,
                            'state': obj.address_to_state,
                            'zip_code': obj.address_to_zip_code
                        },
                    }
                }
        
        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)

    def get_enter_updates(self, request, orderID, *args, **kwargs):
        order_id = str(self.kwargs['orderID'])

        queryset = StatusUpdates.objects.raw(
            # Must include "SELECT 1 as status_update_id" to solve Django's "raw query must include primary key".
            "SELECT 1 as status_update_id, description, arrival_time as distribution_center_enter_time, make, model\
            FROM status_updates, distribution_center, shipping_leg, shipping_leg_asset_used, transit_hard_asset\
            WHERE status_updates.distribution_center = distribution_center.distribution_center_id\
            AND status_updates.enter_leg = shipping_leg.leg_id\
            AND shipping_leg.leg_id = shipping_leg_asset_used.leg_id\
            AND shipping_leg_asset_used.asset_id = transit_hard_asset.asset_id\
            AND status_updates.order_id  = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'description': obj.description,
                    'distribution_center_enter_time' : obj.distribution_center_enter_time,
                    'make': obj.make,
                    'model': obj.model,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)

    def get_exit_updates(self, request, orderID, *args, **kwargs):
        order_id = str(self.kwargs['orderID'])

        queryset = StatusUpdates.objects.raw(
            # Must include "SELECT 1 as status_update_id" to solve Django's "raw query must include primary key".
            "SELECT 1 as status_update_id, description, departure_time as distribution_center_exit_time, make, model\
            FROM status_updates, distribution_center, shipping_leg, shipping_leg_asset_used, transit_hard_asset\
            WHERE status_updates.distribution_center = distribution_center.distribution_center_id\
            AND status_updates.exit_leg = shipping_leg.leg_id\
            AND shipping_leg.leg_id = shipping_leg_asset_used.leg_id\
            AND shipping_leg_asset_used.asset_id = transit_hard_asset.asset_id\
            AND status_updates.order_id  = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'description': obj.description,
                    'distribution_center_exit_time' : obj.distribution_center_exit_time,
                    'make': obj.make,
                    'model': obj.model,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)

    def count_distro_center_orders(self, request, *args, **kwargs):
        # NOTE: Use greater than 1 to exclude origin and destination points.
        queryset = DistributionCenter.objects.raw(
            "SELECT distribution_center.distribution_center_id, distribution_center.description, count(*) as orders_handled\
            FROM status_updates, distribution_center\
            WHERE status_updates.distribution_center > 1\
            AND distribution_center.distribution_center_id = status_updates.distribution_center\
            GROUP BY status_updates.distribution_center, distribution_center.description"
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'distribution_center_id': obj.distribution_center_id,
                    'description' : obj.description,
                    'orders_handled': obj.orders_handled,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)

    def customer_from_description(self, request, orderID, *args, **kwargs):
        '''
         Getting customer from of an order
        '''
        order_id = str(self.kwargs['orderID'])

        queryset = Customer.objects.raw(
            "SELECT customer.customer_id\
             FROM customer\
             JOIN ships_from_customer ON ships_from_customer.customer_id = customer.customer_id\
             WHERE ships_from_customer.order_id = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'customer_id': obj.customer_id,
                    'first_name' : obj.first_name,
                    'last_name' : obj.last_name,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data[0])

    def customer_to_description(self, request, orderID, *args, **kwargs):
        '''
         Getting customer ti of an order
        '''
        order_id = str(self.kwargs['orderID'])

        queryset = Customer.objects.raw(
            "SELECT customer.customer_id\
             FROM customer\
             JOIN ships_to_customer ON ships_to_customer.customer_id = customer.customer_id\
             WHERE ships_to_customer.order_id = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'customer_id': obj.customer_id,
                    'first_name' : obj.first_name,
                    'last_name' : obj.last_name
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data[0])

    def address_from_description(self, request, orderID, *args, **kwargs):
        '''
         Getting customer ti of an order
        '''
        order_id = str(self.kwargs['orderID'])

        queryset = Address.objects.raw(
            "SELECT address.address_id\
             FROM address\
             JOIN ships_from_address ON ships_from_address.address_id = address.address_id\
             WHERE ships_from_address.order_id = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'address_id': obj.address_id,
                    'house_number' : obj.house_number,
                    'street_name' : obj.street_name,
                    'house_number': obj.house_number,
                    'street_name': obj.street_name,
                    'apt_number': obj.apt_number,
                    'city': obj.city,
                    'state': obj.state,
                    'zip_code': obj.zip_code
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data[0])

    def address_to_description(self, request, orderID, *args, **kwargs):
        '''
         Getting customer ti of an order
        '''
        order_id = str(self.kwargs['orderID'])

        queryset = Address.objects.raw(
            "SELECT address.address_id\
             FROM address\
             JOIN ships_to_address ON ships_to_address.address_id = address.address_id\
             WHERE ships_to_address.order_id = " + order_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'address_id': obj.address_id,
                    'house_number' : obj.house_number,
                    'street_name' : obj.street_name,
                    'house_number': obj.house_number,
                    'street_name': obj.street_name,
                    'apt_number': obj.apt_number,
                    'city': obj.city,
                    'state': obj.state,
                    'zip_code': obj.zip_code
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data[0])

    def waiting_orders(self, request):
        '''
         Get packages that have been ordered 
         but not yet transported or in a distribution center
        '''
        queryset = Order.objects.raw(
            "SELECT order_id FROM 'order' \
            EXCEPT \
            SELECT order_id FROM status_updates"
        )
        waiting_orders = OrderSerializer(queryset, many=True)
        return Response(data=waiting_orders.data)

    def status_updates(self, request, orderID, *args, **kwargs):
        '''
            Get status updates of an orderI
        '''
        class OrderTransit(models.Model):
            order_id = models.IntegerField(primary_key=True)
            distribution_center_id = models.IntegerField()
            distribution_center_description = models.TextField()
            enter_leg = models.IntegerField()
            # enter_distribution_center = models.TextField(blank=True, null=True)
            # exit_distribution_center = models.TextField(blank=True, null=True)

        order_id = str(self.kwargs['orderID'])
                    # , enterDistributionCenter.description AS enter_distribution_center\
        # queryset = OrderTransit.objects.raw(
        #     'SELECT O.order_id AS order_id\
        #     , distributionCenter.distribution_center_id\
        #     , distributionCenter.description AS distribution_center_description\
        #      FROM "order" AS O\
        #      JOIN "status_updates" AS SU ON status_updates.order = O.order_id\
        #      JOIN distribution_center AS distributionCenter ON distributionCenter.distribution_center_id = status_updates.distribution_center\
        #      JOIN shipping_leg AS enterLeg ON enterLeg.leg_id = status_updates.enter_leg\
        #      JOIN shipping_leg_origin ON enterLeg.leg_id = shipping_leg_origin.shipping_leg_id\
        #      JOIN address AS enterAddress ON enterAddress.address_id = shipping_leg_origin.address_id\
        #      JOIN distribution_center_address ON distribution_center_address.address_id = enterAddress.address_id\
        #      JOIN distribution_center AS enterDistributionCenter ON\
        #      enterDistributionCenter.distribution_center_id = distribution_center_address.distribution_center_id'
        # )

        queryset = OrderTransit.objects.raw(
            'SELECT O.order_id AS order_id\
            , distributionCenter.distribution_center_id\
            , distributionCenter.description AS distribution_center_description\
            , status_updates.enter_leg\
            FROM "order" AS O\
            JOIN status_updates ON status_updates.order_id = O.order_id\
            JOIN distribution_center AS distributionCenter ON distributionCenter.distribution_center_id = status_updates.distribution_center\
            '
        )
        

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'order_id': obj.order_id,
                    'distribution_center_description': obj.distribution_center_description,
                    'distribution_center_id': obj.distribution_center_id,
                    'enter_leg': obj.enter_leg
                }
        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)


class StatusUpdatesCreateListRetrieveView(mixins.CreateModelMixin,
                                          mixins.ListModelMixin,
                                          mixins.RetrieveModelMixin,
                                          mixins.UpdateModelMixin,
                                          viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = StatusUpdates.objects.all()
    serializer_class = StatusUpdatesSerializer


class ShippingRatesCreateListRetrieveView(mixins.CreateModelMixin,
                                          mixins.ListModelMixin,
                                          mixins.RetrieveModelMixin,
                                          viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShippingRates.objects.all()
    serializer_class = ShippingRatesSerializer


class CustomerCreateListRetriveView(mixins.CreateModelMixin,
                                    mixins.ListModelMixin,
                                    mixins.RetrieveModelMixin,
                                    viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    def all_orders_from(self, request, customerID, *args, **kwargs):
        '''
          Getting all order from a customer
        '''

        class OrderDetails(models.Model):
            order_id = models.IntegerField(primary_key=True)
            order_date = models.IntegerField()
            initial_estimated_arrival_date = models.DateTimeField(blank=True, null=True)
            weight = models.IntegerField(blank=True, null=True)
            type_description = models.TextField()
            customer_to_id = models.IntegerField()
            customer_to_first_name = models.TextField()
            customer_to_last_name = models.TextField()

        customer_id = str(self.kwargs['customerID'])

        queryset = OrderDetails.objects.raw(
            'SELECT O.order_id, O.order_date, O.initial_estimated_arrival_date, O.weight, parcel_type.type_description,\
             customer.customer_id as customer_to_id, customer.first_name as customer_to_first_name,\
             customer.last_name as customer_to_last_name\
             FROM "order" as O\
             JOIN "ships_from_customer" as SFC ON SFC.order_id = O.order_id\
             JOIN order_parcel_type ON order_parcel_type.order_id = O.order_id\
             JOIN parcel_type ON order_parcel_type.parcel_type = parcel_type.type_id\
             JOIN ships_to_customer ON ships_to_customer.order_id = O.order_id\
             JOIN customer ON ships_to_customer.customer_id = customer.customer_id\
             WHERE SFC.customer_id = ' + customer_id
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'order_id': obj.order_id,
                    'order_date': obj.order_date,
                    'initial_estimated_arrival_date': obj.initial_estimated_arrival_date,
                    'weight': obj.weight,
                    'type_description': obj.type_description,
                    'customer_to_id': obj.customer_to_id,
                    'customer_to_first_name': obj.customer_to_first_name,
                    'customer_to_last_name': obj.customer_to_last_name,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)

    def highest_frequency_customer(self, request):
        """
        Get customers who have the highest frequency of order per all time
        """

        queryset = Customer.objects.raw(
            "SELECT orders_by_user.customer_id, customer.first_name, customer.last_name, max(orders_by_user.customer_count) as freq\
            FROM ( \
                SELECT customer_id, count(customer_id) as customer_count \
                FROM 'order' NATURAL JOIN ships_from_customer \
                GROUP BY customer_id \
            ) as orders_by_user NATURAL JOIN customer"
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'customer_id' : obj.customer_id,
                    'first_name' : obj.first_name,
                    'last_name' : obj.last_name,
                    'frequency' : obj.freq
                }
        customers = QuerySerializer(queryset, many=True)
        return Response(data=customers.data[0])
    
    def single_parcel_type_customers(self, request):
        '''
        Get all users who order only one type of package
        '''
        queryset = Customer.objects.raw(
            '\
            SELECT outer_customer.customer_id, outer_customer.first_name, outer_customer.last_name, outer_parcel_type.parcel_type \
            FROM customer as outer_customer NATURAL JOIN ships_from_customer as outer_ships NATURAL JOIN order_parcel_type as outer_parcel_type \
            WHERE NOT EXISTS ( \
                SELECT inner_customer.customer_id, inner_parcel_type.parcel_type\
                FROM customer as inner_customer NATURAL JOIN ships_from_customer as inner_ships NATURAL JOIN order_parcel_type as inner_parcel_type\
                WHERE inner_customer.customer_id = outer_customer.customer_id\
                AND inner_parcel_type.parcel_type != outer_parcel_type.parcel_type\
            )\
          '
        )

        class QuerySerializer(serializers.BaseSerializer):
            depth = 1
            def to_representation(self, obj):
                return {
                    'customer_id' : obj.customer_id,
                    'first_name' : obj.first_name,
                    'last_name' : obj.last_name,
                    'parcel_type' : model_to_dict(ParcelType.objects.get(type_id=obj.parcel_type))
                }
        customers = QuerySerializer(queryset, many=True)
        return Response(data=customers.data)
        

class ShipFromCustomerCreateListRetriveView(mixins.CreateModelMixin,
                                            mixins.ListModelMixin,
                                            mixins.RetrieveModelMixin,
                                            viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShipFromCustomer.objects.all()
    serializer_class = ShipFromCustomerSerializer


class ShipToCustomerCreateListRetriveView(mixins.CreateModelMixin,
                                          mixins.ListModelMixin,
                                          mixins.RetrieveModelMixin,
                                          viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShipToCustomer.objects.all()
    serializer_class = ShipToCustomerSerializer


class ShipFromAddressCreateListRetriveView(mixins.CreateModelMixin,
                                           mixins.ListModelMixin,
                                           mixins.RetrieveModelMixin,
                                           viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShipFromAddress.objects.all()
    serializer_class = ShipFromAddressSerializer

    def most_ordered_state(self, request):
        '''
        Get the state with the most orders originating from it
        '''
        class QueryModel(models.Model):
            state = models.TextField(primary_key=True)
            count = models.IntegerField()

        queryset = QueryModel.objects.raw(
            'SELECT orders_by_state.state, max(orders_by_state.num_orders) as count\
            FROM ( \
                SELECT a.state, count(a.state) as num_orders \
                FROM ships_from_address as f, address as a\
                WHERE f.address_id = a.address_id\
                GROUP BY a.state \
            ) AS orders_by_state',
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'state' : obj.state,
                    'count' : obj.count
                }
        state = QuerySerializer(queryset, many=True)
        return Response(data=state.data[0])


class ShipToAddressCreateListRetriveView(mixins.CreateModelMixin,
                                         mixins.ListModelMixin,
                                         mixins.RetrieveModelMixin,
                                         viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShipToAddress.objects.all()
    serializer_class = ShipToAddressSerializer


class AddressCreateListRetriveView(mixins.CreateModelMixin,
                                   mixins.ListModelMixin,
                                   mixins.RetrieveModelMixin,
                                   mixins.UpdateModelMixin,
                                   viewsets.GenericViewSet):
    # Will need to login using the token
    permission_classes = [AllowAny]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

    def all_orders_from(self, request, addressID, *args, **kwargs):
        '''
            Getting all orders info from an adress
        '''

        class OrderDetails(models.Model):
            order_id = models.IntegerField(primary_key=True)
            order_date = models.IntegerField()
            initial_estimated_arrival_date = models.DateTimeField(blank=True, null=True)
            weight = models.IntegerField(blank=True, null=True)
            type_description = models.TextField()
            customer_from_id = models.IntegerField()
            customer_from_first_name = models.TextField()
            customer_from_last_name = models.TextField()
            customer_to_id = models.IntegerField()
            customer_to_first_name = models.TextField()
            customer_to_last_name = models.TextField()
            address_id = models.IntegerField()
            house_number = models.IntegerField()
            street_name = models.TextField()
            apt_number = models.IntegerField(blank=True, null=True)
            city = models.TextField()
            state = models.TextField()
            zip_code = models.IntegerField()

        address_id = str(self.kwargs['addressID'])

        queryset = OrderDetails.objects.raw(
            'SELECT O.order_id, O.order_date, O.initial_estimated_arrival_date, O.weight\
             , parcel_type.type_description\
             , customerFrom.customer_id AS customer_from_id, customerFrom.first_name AS customer_from_first_name\
             , customerFrom.last_name AS customer_from_last_name\
             , customerTo.customer_id AS customer_to_id, customerTo.first_name AS customer_to_first_name\
             ,customerTo.last_name AS customer_to_last_name\
             , address.address_id, address.house_number, address.street_name, address.apt_number, address.city\
                , address.state, address.zip_code\
             FROM "order" AS O\
             JOIN ships_from_address AS SFA ON SFA.order_id = O.order_id\
             JOIN ships_from_customer AS SFC ON SFC.order_id = O.order_id\
             JOIN customer AS CustomerFrom ON CustomerFrom.customer_id = SFC.customer_id\
             JOIN ships_to_address AS SCA ON SCA.order_id = O.order_id\
             JOIN ships_to_customer AS SCC ON SCC.order_id = O.order_id\
             JOIN customer AS CustomerTo ON CustomerTo.customer_id = SCC.customer_id\
             JOIN order_parcel_type ON order_parcel_type.order_id = O.order_id\
             JOIN parcel_type ON order_parcel_type.parcel_type = parcel_type.type_id\
             JOIn address ON address.address_id = SCA.address_id\
             WHERE SFA.address_id = ' + address_id

        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'order_id': obj.order_id,
                    'order_date': obj.order_date,
                    'initial_estimated_arrival_date': obj.initial_estimated_arrival_date,
                    'weight': obj.weight,
                    'type_description': obj.type_description,
                    'customer_from': {
                        'customer_id': obj.customer_from_id,
                        'first_name': obj.customer_from_first_name,
                        'last_name': obj.customer_from_last_name,
                    },
                    'customer_to': {
                        'customer_id': obj.customer_to_id,
                        'first_name': obj.customer_to_first_name,
                        'last_name': obj.customer_to_last_name,
                    },
                    'address': {
                        'address_id': obj.address_id,
                        'house_number' : obj.house_number,
                        'street_name' : obj.street_name,
                        'apt_number': obj.apt_number,
                        'city' : obj.city,
                        'state': obj.state,
                        'zip_code': obj.zip_code
                    },
                }   

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)


class ParcelTypeCreateListRetriveView(mixins.CreateModelMixin,
                                      mixins.ListModelMixin,
                                      mixins.RetrieveModelMixin,
                                      mixins.UpdateModelMixin,
                                      viewsets.GenericViewSet
                                      ):
    # Will need to login using the token
    permission_classes = [AllowAny]
    queryset = ParcelType.objects.all()
    serializer_class = ParcelTypeSerializer

    def current_parcel_rates(self, request):
        queryset = ParcelType.objects.raw(
            "SELECT type_id, type_description, flat_fee, effective_date\
            FROM shipping_rate, parcel_type\
            WHERE shipping_rate.parcel_type = parcel_type.type_id\
            AND NOT EXISTS (\
                SELECT *\
                FROM shipping_rate as inner_shipping_rate\
                WHERE inner_shipping_rate.parcel_type = shipping_rate.parcel_type\
                AND inner_shipping_rate.effective_date > shipping_rate.effective_date\
            )")

        class QuerySerializer(serializers.BaseSerializer):
            '''
            To implement a subview, consider implementing a sub QuerySerializer like this
            Only need to override to_representation
            '''

            def to_representation(self, obj):
                return {
                    'type_id': obj.type_id,
                    'type_description': obj.type_description,
                    'flat_fee': obj.flat_fee,
                    'effective_date': obj.effective_date,
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)


class OrderParcelTypeCreateListRetriveView(mixins.CreateModelMixin,
                                           mixins.ListModelMixin,
                                           mixins.RetrieveModelMixin,
                                           mixins.UpdateModelMixin,
                                           viewsets.GenericViewSet):
    # Will need to login using the token
    permission_classes = [AllowAny]
    queryset = OrderParcelType.objects.all()
    serializer_class = OrderParceltypeSerializer


class TransitHardAssetViewSet(mixins.CreateModelMixin,
                              mixins.ListModelMixin,
                              mixins.RetrieveModelMixin,
                              mixins.UpdateModelMixin,
                              viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = TransitHardAsset.objects.all()
    serializer_class = TransitHardAssetSerializer

    def service_times(self, request):
        '''
        Vehicle #7: Get a vehicle’s time in service
        '''
        queryset = TransitHardAsset.objects.raw(
            "SELECT asset_id, (julianday('now') - julianday(purchase_date)) as service_time\
            FROM transit_hard_asset",
        )

        class QuerySerializer(serializers.BaseSerializer):
            '''
            To implement a subview, consider implementing a sub QuerySerializer like this
            Only need to override to_representation
            '''

            def to_representation(self, obj):
                return {
                    'asset_id': obj.asset_id,
                    'service_time': obj.service_time
                }

        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)

    def temp_controled_vehicles(self, request):
        '''
        Vehicle #3: Get all temperature controlled vehicles
        '''
        queryset = TransitHardAsset.objects.raw(
            'SELECT asset_id \
            FROM transit_hard_asset \
            WHERE temperature_controlled = 1'
        )
        assets = TransitHardAssetSerializer(queryset, many=True)
        return Response(data=assets.data)

    def most_leg(self, request):
        '''
        Get the vehicle that has been on the most legs
        '''
        queryset = TransitHardAsset.objects.raw(
            'SELECT leg_counts.asset_id \
            FROM (SELECT asset_id, count(*) as count From shipping_leg_asset_used GROUP BY asset_id) as leg_counts \
            WHERE NOT EXISTS( \
            SELECT asset_id  \
            FROM (SELECT asset_id, count(*) as count From shipping_leg_asset_used GROUP BY asset_id) as leg_counts2 \
            WHERE leg_counts2.count > leg_counts.count)'
        )
        assets = TransitHardAssetSerializer(queryset, many=True)
        return Response(data=assets.data)


class DistributionCenterCreateListRetriveView(mixins.CreateModelMixin,
                                              mixins.ListModelMixin,
                                              mixins.RetrieveModelMixin,
                                              viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = DistributionCenter.objects.all()
    serializer_class = DistributionCenterSerializer

    def order_details(self, request, centerID, *args, **kwargs):
        '''
            Getting more details of an order
        '''
        class OrderDetails(models.Model):
            order_id = models.IntegerField(primary_key=True)
            weight = models.IntegerField(blank=True, null=True)
            type_description = models.TextField()
            customer_from_id = models.IntegerField()
            customer_from_first_name = models.TextField()
            customer_from_last_name = models.TextField()
            customer_to_id = models.IntegerField()
            customer_to_first_name = models.TextField()
            customer_to_last_name = models.TextField()
            address_from_address_id = models.IntegerField()
            address_from_house_number = models.IntegerField()
            address_from_street_name = models.TextField()
            address_from_apt_number = models.IntegerField(blank=True, null=True)
            address_from_city = models.TextField()
            address_from_state = models.TextField()
            address_from_zip_code = models.IntegerField()
            address_to_address_id = models.IntegerField()
            address_to_house_number = models.IntegerField()
            address_to_street_name = models.TextField()
            address_to_apt_number = models.IntegerField(blank=True, null=True)
            address_to_city = models.TextField()
            address_to_state = models.TextField()
            address_to_zip_code = models.IntegerField()

        distribution_center_id = str(self.kwargs['centerID'])

        queryset = OrderDetails.objects.raw(
            'SELECT O.order_id, O.weight\
            , parcel_type.type_description\
            , customerFrom.customer_id AS customer_from_id , customerFrom.first_name AS customer_from_first_name\
            , customerFrom.last_name AS customer_from_last_name\
            , customerTo.customer_id AS customer_to_id , customerTo.first_name AS customer_to_first_name\
            , customerTo.last_name AS customer_to_last_name\
            , addressFrom.address_id AS address_from_address_id, addressFrom.house_number AS address_from_house_number\
            , addressFrom.street_name AS address_from_street_name, addressFrom.apt_number AS address_from_apt_number\
            , addressFrom.city AS address_from_city, addressFrom.state AS address_from_state, addressFrom.zip_code AS address_from_zip_code\
            , addressTo.address_id AS address_to_address_id, addressTo.house_number AS address_to_house_number\
            , addressTo.street_name AS address_to_street_name,addressTo.apt_number AS address_to_apt_number\
            , addressTo.city AS address_to_city, addressTo.state AS address_to_state, addressTo.zip_code AS address_to_zip_code\
             FROM "order" AS O\
             JOIN order_parcel_type ON order_parcel_type.order_id = O.order_id\
             JOIN parcel_type ON order_parcel_type.parcel_type = parcel_type.type_id\
             JOIN ships_from_customer ON ships_from_customer.order_id = O.order_id\
             JOIN customer AS customerFrom ON ships_from_customer.customer_id = customerFrom.customer_id\
             JOIN ships_to_customer ON ships_to_customer.order_id = O.order_id\
             JOIN customer AS customerTo ON ships_to_customer.customer_id = customerTo.customer_id\
             JOIN ships_from_address ON ships_from_address.order_id = O.order_id\
             JOIN address AS addressFrom ON ships_from_address.address_id = addressFrom.address_id\
             JOIN ships_to_address ON ships_to_address.order_id = O.order_id\
             JOIN address AS addressTo ON ships_to_address.address_id = addressTo.address_id\
             JOIN status_updates ON status_updates.order_id = O.order_id\
             JOIN distribution_center ON status_updates.distribution_center = distribution_center.distribution_center_id\
             WHERE distribution_center.distribution_center_id = ' + distribution_center_id 
        )
        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'order_id': obj.order_id,
                    'weight': obj.weight,
                    'type_description': obj.type_description,
                    'customer': {
                        'from':{
                            'customer_id': obj.customer_from_id,
                            'first_name': obj.customer_from_first_name,
                            'last_name': obj.customer_from_last_name,
                        },
                        'to': {
                            'customer_id': obj.customer_to_id,
                            'first_name': obj.customer_to_first_name,
                            'last_name': obj.customer_to_last_name,
                        }
                    },
                    'address': {
                        'from': {
                            'address_id': obj.address_from_address_id,
                            'house_number': obj.address_from_house_number,
                            'street_name': obj.address_from_street_name,
                            'apt_number': obj.address_from_apt_number,
                            'city': obj.address_from_city,
                            'state': obj.address_from_state,
                            'zip_code': obj.address_from_zip_code
                        },
                        'to': {
                            'address_id': obj.address_to_address_id,
                            'house_number': obj.address_to_house_number,
                            'street_name': obj.address_to_street_name,
                            'apt_number': obj.address_to_apt_number,
                            'city': obj.address_to_city,
                            'state': obj.address_to_state,
                            'zip_code': obj.address_to_zip_code
                        },
                    }
                }
        
        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)


class ShippingLegCreateListRetriveView(mixins.CreateModelMixin,
                                       mixins.ListModelMixin,
                                       mixins.RetrieveModelMixin,
                                       mixins.UpdateModelMixin,
                                       viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShippingLeg.objects.all()
    serializer_class = ShippingLegSerializer


class TransitMethodCreateListRetrieveView(mixins.CreateModelMixin,
                                          mixins.ListModelMixin,
                                          mixins.RetrieveModelMixin,
                                          viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = TransitMethod.objects.all()
    serializer_class = TransitMethodSerializer


class DistributionCenterAddressCreateListRetrieveView(mixins.CreateModelMixin,
                                                      mixins.ListModelMixin,
                                                      mixins.RetrieveModelMixin,
                                                     viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = DistributionCenterAddress.objects.all()
    serializer_class = DistributionCenterAddressSerializer

    def center_details(self, request):
        '''
            Getting details of all center
        '''
        class CenterDetails(models.Model):
            distribution_center_id = models.IntegerField(primary_key=True)
            description = models.TextField()
            address_id = models.IntegerField()
            house_number = models.IntegerField()
            street_name = models.TextField()
            apt_number = models.IntegerField()
            city = models.TextField()
            state = models.TextField()
            zip_code = models.IntegerField()

        queryset = CenterDetails.objects.raw(
            'SELECT DC.distribution_center_id, DC.description,\
             address.address_id, address.house_number, address.street_name, address.apt_number, \
             address.city, address.state, address.zip_code\
            FROM distribution_center AS DC\
            JOIN distribution_center_address AS DCA ON DCA.distribution_center_id = DC.distribution_center_id\
            JOIN address ON address.address_id = DCA.address_id'
        )

        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                        return {
                            'distribution_center_id': obj.distribution_center_id,
                            'description': obj.description,
                            'address': {
                                  'address_id': obj.address_id,
                                  'house_number' : obj.house_number,
                                  'street_name' : obj.street_name,
                                  'house_number': obj.house_number,
                                  'street_name': obj.street_name,
                                  'apt_number': obj.apt_number,
                                  'city': obj.city,
                                  'state': obj.state,
                                  'zip_code': obj.zip_code      
                            }
                        }
        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)


class ShippingLegOriginCreateListRetrieveView(mixins.CreateModelMixin,
                                                      mixins.ListModelMixin,
                                                      mixins.RetrieveModelMixin,
                                                     viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShippingLegOrigin.objects.all()
    serializer_class = ShippingLegOriginSerializer


class ShippingLegDestinationCreateListRetrieveView(mixins.CreateModelMixin,
                                                      mixins.ListModelMixin,
                                                      mixins.RetrieveModelMixin,
                                                      viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShippingLegDestination.objects.all()
    serializer_class = ShippingLegDestinationSerializer


class ShippingLegAssetUsedCreateListRetrieveView(mixins.CreateModelMixin,
                                                      mixins.ListModelMixin,
                                                      mixins.RetrieveModelMixin,
                                                      viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ShippingLegAssetUsed.objects.all()
    serializer_class = ShippingLegAssetUsedSerializer


class TransitAssetMethodCreateListRetrieveView(mixins.CreateModelMixin,
                                                      mixins.ListModelMixin,
                                                      mixins.RetrieveModelMixin,
                                                      viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = TransitAssetMethod.objects.all()
    serializer_class = TransitAssetMethodSerializer

    def order_details(self, request, assetID, *args, **kwargs):
        '''
            Getting more details of an order
        '''
        class OrderDetails(models.Model):
            order_id = models.IntegerField(primary_key=True)
            weight = models.IntegerField(blank=True, null=True)
            type_description = models.TextField()
            customer_from_id = models.IntegerField()
            customer_from_first_name = models.TextField()
            customer_from_last_name = models.TextField()
            customer_to_id = models.IntegerField()
            customer_to_first_name = models.TextField()
            customer_to_last_name = models.TextField()
            address_from_address_id = models.IntegerField()
            address_from_house_number = models.IntegerField()
            address_from_street_name = models.TextField()
            address_from_apt_number = models.IntegerField(blank=True, null=True)
            address_from_city = models.TextField()
            address_from_state = models.TextField()
            address_from_zip_code = models.IntegerField()
            address_to_address_id = models.IntegerField()
            address_to_house_number = models.IntegerField()
            address_to_street_name = models.TextField()
            address_to_apt_number = models.IntegerField(blank=True, null=True)
            address_to_city = models.TextField()
            address_to_state = models.TextField()
            address_to_zip_code = models.IntegerField()

        asset_id = str(self.kwargs['assetID'])

        queryset = OrderDetails.objects.raw(
            'SELECT DISTINCT O.order_id, O.weight\
            , parcel_type.type_description\
            , customerFrom.customer_id AS customer_from_id , customerFrom.first_name AS customer_from_first_name\
            , customerFrom.last_name AS customer_from_last_name\
            , customerTo.customer_id AS customer_to_id , customerTo.first_name AS customer_to_first_name\
            , customerTo.last_name AS customer_to_last_name\
            , addressFrom.address_id AS address_from_address_id, addressFrom.house_number AS address_from_house_number\
            , addressFrom.street_name AS address_from_street_name, addressFrom.apt_number AS address_from_apt_number\
            , addressFrom.city AS address_from_city, addressFrom.state AS address_from_state, addressFrom.zip_code AS address_from_zip_code\
            , addressTo.address_id AS address_to_address_id, addressTo.house_number AS address_to_house_number\
            , addressTo.street_name AS address_to_street_name,addressTo.apt_number AS address_to_apt_number\
            , addressTo.city AS address_to_city, addressTo.state AS address_to_state, addressTo.zip_code AS address_to_zip_code\
             FROM "order" AS O\
             JOIN order_parcel_type ON order_parcel_type.order_id = O.order_id\
             JOIN parcel_type ON order_parcel_type.parcel_type = parcel_type.type_id\
             JOIN ships_from_customer ON ships_from_customer.order_id = O.order_id\
             JOIN customer AS customerFrom ON ships_from_customer.customer_id = customerFrom.customer_id\
             JOIN ships_to_customer ON ships_to_customer.order_id = O.order_id\
             JOIN customer AS customerTo ON ships_to_customer.customer_id = customerTo.customer_id\
             JOIN ships_from_address ON ships_from_address.order_id = O.order_id\
             JOIN address AS addressFrom ON ships_from_address.address_id = addressFrom.address_id\
             JOIN ships_to_address ON ships_to_address.order_id = O.order_id\
             JOIN address AS addressTo ON ships_to_address.address_id = addressTo.address_id\
             JOIN status_updates ON status_updates.order_id = O.order_id\
             JOIN distribution_center ON status_updates.distribution_center = distribution_center.distribution_center_id\
             JOIN shipping_leg AS LE ON LE.leg_id = status_updates.enter_leg\
             JOIN shipping_leg AS LF ON LF.leg_id = status_updates.exit_leg\
             JOIN shipping_leg_asset_used AS UE ON  UE.leg_id = LE.leg_id\
             JOIN shipping_leg_asset_used AS UF ON UF.leg_id = UF.leg_id\
             JOIN transit_hard_asset AS AE ON AE.asset_id = UE.asset_id\
             JOIN transit_hard_asset AS AF ON AF.asset_id = UF.asset_id\
             WHERE AE.asset_id = ' + asset_id + ' OR AF.asset_id = ' + asset_id 
        )
        class QuerySerializer(serializers.BaseSerializer):
            def to_representation(self, obj):
                return {
                    'order_id': obj.order_id,
                    'weight': obj.weight,
                    'type_description': obj.type_description,
                    'customer': {
                        'from':{
                            'customer_id': obj.customer_from_id,
                            'first_name': obj.customer_from_first_name,
                            'last_name': obj.customer_from_last_name,
                        },
                        'to': {
                            'customer_id': obj.customer_to_id,
                            'first_name': obj.customer_to_first_name,
                            'last_name': obj.customer_to_last_name,
                        }
                    },
                    'address': {
                        'from': {
                            'address_id': obj.address_from_address_id,
                            'house_number': obj.address_from_house_number,
                            'street_name': obj.address_from_street_name,
                            'apt_number': obj.address_from_apt_number,
                            'city': obj.address_from_city,
                            'state': obj.address_from_state,
                            'zip_code': obj.address_from_zip_code
                        },
                        'to': {
                            'address_id': obj.address_to_address_id,
                            'house_number': obj.address_to_house_number,
                            'street_name': obj.address_to_street_name,
                            'apt_number': obj.address_to_apt_number,
                            'city': obj.address_to_city,
                            'state': obj.address_to_state,
                            'zip_code': obj.address_to_zip_code
                        },
                    }
                }
        
        assets = QuerySerializer(queryset, many=True)
        return Response(data=assets.data)
