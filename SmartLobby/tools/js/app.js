// SmartLobby QR Poster - builds the form URL and draws the QR code

const baseInput = document.getElementById('base');
const pathInput = document.getElementById('path');
const fullUrlBox = document.getElementById('full');
const qrBox = document.getElementById('qr');

function buildUrl() {
  const base = baseInput.value.trim().replace(/\/+$/, '');
  let path = pathInput.value.trim();

  if (path && !path.startsWith('/')) {
    path = '/' + path;
  }

  return base + path;
}

function render() {
  const url = buildUrl();

  if (!baseInput.value.trim() || !pathInput.value.trim()) {
    fullUrlBox.textContent = 'Fill in both fields to generate the QR code.';
    qrBox.textContent = 'QR code will appear here';
    return;
  }

  fullUrlBox.textContent = url;

  try {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    qrBox.innerHTML = qr.createSvgTag({ cellSize: 8, margin: 2, scalable: true });
  } catch (err) {
    qrBox.textContent = 'Address too long for a QR code';
  }
}

baseInput.addEventListener('input', render);
pathInput.addEventListener('input', render);
render();
