import json
import os

import requests
from django.conf import settings
from django.http import JsonResponse, HttpResponseServerError, HttpResponse
from django.shortcuts import render
from django.views import View
from django.views.decorators.http import require_GET

@require_GET
def mock_devices(request):
    return JsonResponse(MOCK_DEVICES, safe=False)

MOCK_DEVICES = [
    {"id": 1, "name": "Router1", "ip_address": "192.168.1.1", "status": "Up"},
    {"id": 2, "name": "Switch1", "ip_address": "192.168.1.2", "status": "Down"},
    {"id": 3, "name": "Firewall1", "ip_address": "192.168.1.3", "status": "Up"},
]

def get_devices_from_api(api_url=None, timeout=2):
    url = api_url or settings.DEVICES_API_URL
    resp = requests.get(url, timeout=timeout)
    resp.raise_for_status()
    return resp.json()


def devices_proxy(request):
    try:
        devices = get_devices_from_api()
        return JsonResponse(devices, safe=False)
    except requests.RequestException:
        return HttpResponseServerError(
            json.dumps({"error": "Unable to fetch device data"}),
            content_type='application/json'
        )

def dashboard(request):
    return render(request, 'devices/index.html')
