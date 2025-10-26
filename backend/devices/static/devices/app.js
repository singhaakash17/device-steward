async function fetchDevices() {
  const resp = await fetch('/api/devices');
  if (!resp.ok) throw new Error('Network error');
  return resp.json();
}

function renderDevices(devices) {
  const tbody = document.querySelector('#devices-table tbody');
  tbody.innerHTML = '';
  devices.forEach(d => {
    const row = `
      <tr>
        <td>${d.id}</td>
        <td>${d.name}</td>
        <td>${d.ip_address}</td>
        <td>${d.status === 'Up' ? '<span class="badge bg-success">Up</span>' : '<span class="badge bg-danger">Down</span>'}</td>
      </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

function showAlert(msg) {
  document.getElementById('alert-placeholder').innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}

(async function init() {
  try {
    const devices = await fetchDevices();
    renderDevices(devices);
  } catch {
    showAlert('Failed to load device data.');
  }
})();
