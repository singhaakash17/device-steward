from django.urls import path
from . import views

urlpatterns = [
    path('api/devices', views.devices_proxy, name='devices_proxy'),
    path('devices', views.mock_devices, name='mock_devices'),
    path('', views.dashboard, name='dashboard'),
]
