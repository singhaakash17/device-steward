import pytest
import requests
from django.urls import reverse

from backend.devices import views


# -------------------------------
# mock_devices()
# -------------------------------
@pytest.mark.django_db
def test_mock_devices_returns_expected_data(client):
    """Positive: /api/devices returns correct mock data."""
    url = reverse("mock_devices")
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 3
    assert all(key in data[0] for key in ["id", "name", "ip_address", "status"])


@pytest.mark.django_db
def test_mock_devices_disallows_post(client):
    """Negative: POST should not be allowed."""
    url = reverse("mock_devices")
    response = client.post(url)
    assert response.status_code in [400, 405]


# -------------------------------
# get_devices_from_api()
# -------------------------------
def test_get_devices_from_api_success(requests_mock, settings):
    """Positive: Returns parsed JSON on valid API call."""
    mock_url = "http://mock-api/devices"
    mock_data = [{"id": 99, "name": "TestRouter"}]

    requests_mock.get(mock_url, json=mock_data, status_code=200)

    result = views.get_devices_from_api(api_url=mock_url)
    assert result == mock_data


def test_get_devices_from_api_failure(requests_mock, settings):
    """Negative: Raises HTTPError when API returns 500."""
    mock_url = "http://mock-api/devices"
    requests_mock.get(mock_url, status_code=500)

    with pytest.raises(requests.exceptions.HTTPError):
        views.get_devices_from_api(api_url=mock_url)


# -------------------------------
# devices_proxy()
# -------------------------------
@pytest.mark.django_db
def test_devices_proxy_success(client, monkeypatch):
    """Positive: Returns JSON if API fetch succeeds."""
    fake_data = [{"id": 1, "name": "Router"}]
    monkeypatch.setattr("devices.views.get_devices_from_api", lambda *a, **k: fake_data)

    response = client.get(reverse("devices_proxy"))
    assert response.status_code == 200
    assert response.json() == fake_data


@pytest.mark.django_db
def test_devices_proxy_handles_exception(client, monkeypatch):
    """Negative: Returns 500 if API fails."""
    def mock_fail(*args, **kwargs):
        raise requests.RequestException("Network down")

    monkeypatch.setattr(views, "get_devices_from_api", mock_fail)

    response = client.get(reverse("devices_proxy"))
    assert response.status_code == 500
    assert "error" in response.json()

