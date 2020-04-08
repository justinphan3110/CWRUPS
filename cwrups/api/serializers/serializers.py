from rest_framework import serializers
from ..models import *


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class ShipFromCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipFromCustomer
        fields = '__all__'


class ShipToCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipToCustomer
        fields = '__all__'


class ShipToAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipToAddress
        fields = '__all__'


class ShipFromAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipFromAddress
        fields = '__all__'


class DistributionCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistributionCenter
        fields = '__all__'


class ParcelTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParcelType
        fields = '__all__'


class OrderParceltypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderParcelType
        fields = '__all__'


class ShippingLegSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingLeg
        fields = '__all__'


class TransitHardAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransitHardAsset
        fields = '__all__'


class TransitMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransitMethod
        fields = '__all__'


class StatusUpdatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusUpdates
        fields = '__all__'


class ShippingRatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingRates
        fields = '__all__'


class DistributionCenterAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistributionCenterAddress
        fields = '__all__'


class ShippingLegOriginSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingLegOrigin
        fields = '__all__'


class ShippingLegDestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingLegDestination
        fields = '__all__'


class ShippingLegAssetUsedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingLegAssetUsed
        fields = '__all__'


class TransitAssetMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransitAssetMethod
        fields = '__all__'
