from django.urls import path, include
from django.conf.urls import url
from . import views
urlpatterns = [
    path('orders/', views.OrderCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('orders/<int:pk>', views.OrderCreateListRetriveView.as_view({'get' : 'retrieve'})),
    path('orders/description/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'parcel_description'})),
    path('orders/current_distribution_center/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'current_distro_ctr'})),
    path('orders/current_status_update/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'current_status_update'})),
    path('orders/ship/from/customer/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'customer_from_description'})),
    path('orders/ship/to/customer/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'customer_to_description'})),
    path('orders/ship/from/address/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'address_from_description'})),
    path('orders/ship/to/address/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'address_to_description'})),
    path('orders/waiting', views.OrderCreateListRetriveView.as_view({'get' : 'waiting_orders'})),
    path('orders/moredetails/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'order_details'})),
    path('orders/enter_updates/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'get_enter_updates'})),
    path('orders/exit_updates/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'get_exit_updates'})),
    path('orders/status/<int:orderID>', views.OrderCreateListRetriveView.as_view({'get' : 'status_updates'})),


    path('customers/', views.CustomerCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('customers/<int:pk>', views.CustomerCreateListRetriveView.as_view({'get' : 'retrieve'})),
    path('customers/orders/from/<int:customerID>', views.CustomerCreateListRetriveView.as_view({'get' : 'all_orders_from'})),
    path('customers/most-frequent', views.CustomerCreateListRetriveView.as_view({'get' : 'highest_frequency_customer'})),
    path('customers/single-type', views.CustomerCreateListRetriveView.as_view({'get' : 'single_parcel_type_customers'})),

    path('ship/to/customers/', views.ShipToCustomerCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('ship/to/customers/<int:pk>', views.ShipToCustomerCreateListRetriveView.as_view({'get' : 'retrieve'})),

    path('ship/from/customers/', views.ShipFromCustomerCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('ship/from/customers/<int:pk>', views.ShipFromCustomerCreateListRetriveView.as_view({'get' : 'retrieve'})),

    path('address/', views.AddressCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('address/<int:pk>', views.AddressCreateListRetriveView.as_view({'get' : 'retrieve'})),

    path('ship/to/address/', views.ShipToAddressCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('ship/to/address/<int:pk>', views.ShipToAddressCreateListRetriveView.as_view({'get' : 'retrieve'})),

    path('ship/from/address/', views.ShipFromAddressCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('ship/from/address/<int:pk>', views.ShipFromAddressCreateListRetriveView.as_view({'get' : 'retrieve'})),
    path('ship/from/address/states/most-popular', views.ShipFromAddressCreateListRetriveView.as_view({'get' : 'most_ordered_state'})),


    path('address/', views.AddressCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('address/<int:pk>', views.AddressCreateListRetriveView.as_view({'get' : 'retrieve', 'put' : 'update'})),
    path('address/orders/from/<int:addressID>', views.AddressCreateListRetriveView.as_view({'get': 'all_orders_from'})),

    path('parcel/', views.ParcelTypeCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('parcel/<int:pk>', views.ParcelTypeCreateListRetriveView.as_view({'get' : 'retrieve', 'put' : 'update'})),


    path('parceltype/', views.OrderParcelTypeCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('parceltype/<int:pk>', views.OrderParcelTypeCreateListRetriveView.as_view({'get' : 'retrieve', 'put' : 'update'})),

    path('transit-assets/srv-time', views.TransitHardAssetViewSet.as_view({'get' : 'service_times'})),
    path('transit-assets/temp-controlled', views.TransitHardAssetViewSet.as_view({'get' : 'temp_controled_vehicles'})),
    path('transit-assets/', views.TransitHardAssetViewSet.as_view({'get' : 'list', 'post':'create'})),
    path('transit-assets/orders/<int:assetID>', views.TransitAssetMethodCreateListRetrieveView.as_view({'get' : 'order_details'})),

    path('transit-assets/method/', views.TransitAssetMethodCreateListRetrieveView.as_view({'get' : 'list'})),
    path('transit-assets/most-leg', views.TransitHardAssetViewSet.as_view({'get' : 'most_leg'})),

    path('status-updates/', views.StatusUpdatesCreateListRetrieveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('status-updates/update/<int:pk>', views.StatusUpdatesCreateListRetrieveView.as_view({'get' : 'list', 'post' : 'partial_update'})),

    path('shipping-rates/', views.ShippingRatesCreateListRetrieveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('shipping-rates/current-effective/', views.ParcelTypeCreateListRetriveView.as_view({'get' : 'current_parcel_rates'})),

    path('distribution-center/', views.DistributionCenterCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('distribution-center/details/', views.DistributionCenterAddressCreateListRetrieveView.as_view({'get' : 'center_details'})),
    path('distribution-center/orders/<int:centerID>', views.DistributionCenterCreateListRetriveView.as_view({'get' : 'order_details'})),
    path('distribution-center/<int:pk>', views.DistributionCenterCreateListRetriveView.as_view({'get' : 'retrieve',})),
    path('distribution-center/address/', views.DistributionCenterAddressCreateListRetrieveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('distribution-center/address/<int:pk>', views.DistributionCenterAddressCreateListRetrieveView.as_view({'get' : 'retrieve',})),
    path('distribution-center/count', views.OrderCreateListRetriveView.as_view({'get' : 'count_distro_center_orders'})),

    path('ship/leg/', views.ShippingLegCreateListRetriveView.as_view({'get' : 'list', 'post' : 'create'})),
    path('ship/leg/<int:pk>', views.ShippingLegCreateListRetriveView.as_view({'get' : 'retrieve',})),
    path('ship/leg/update/<int:pk>', views.ShippingLegCreateListRetriveView.as_view({'get' : 'retrieve', 'post': 'partial_update'})),
    path('ship/leg/origin/', views.ShippingLegOriginCreateListRetrieveView.as_view({'get': 'list', 'post': 'create'})),
    path('ship/leg/origin/<int:pk>', views.ShippingLegOriginCreateListRetrieveView.as_view({'get': 'retrieve', })),
    path('ship/leg/destination/', views.ShippingLegDestinationCreateListRetrieveView.as_view({'get': 'list', 'post': 'create'})),
    path('ship/leg/destination/<int:pk>', views.ShippingLegDestinationCreateListRetrieveView.as_view({'get': 'retrieve', })),
    path('ship/leg/asset/', views.ShippingLegAssetUsedCreateListRetrieveView.as_view({'get': 'list', 'post': 'create'})),
    path('ship/leg/asset/<int:pk>', views.ShippingLegAssetUsedCreateListRetrieveView.as_view({'get': 'retrieve', })),

    path('transit-method/', views.TransitMethodCreateListRetrieveView.as_view({'get' : 'list'})),

    url(r'^auth/', include('djoser.urls')),
    url(r'^auth/', include('djoser.urls.authtoken')),
    url(r"^auth/", include("djoser.urls.jwt")),
]