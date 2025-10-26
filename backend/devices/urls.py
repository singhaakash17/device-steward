from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('api/devices', views.devices_proxy, name='api_devices'),
    path('devices', views.mock_devices, name='mock_devices'),
]
