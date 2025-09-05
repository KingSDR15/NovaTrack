// script.js (fixed + small safe improvements)
// keeps your original style and inline CSS approach, plus tolerant status matching

const el = sel => document.querySelector(sel);
const steps = ["Accepted", "Order Processing", "Shipment Pending", "Custom cleared", "Estimated Delivery"];

// ===== loader
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = el("#loader");
    if (loader) loader.style.display = "none";
  }, 1800);
});

// init UI: hide panel until valid code
function initUI() {
  const trackPanel = el("#track-panel");
  if (trackPanel) trackPanel.style.display = "none";
  const trackingResult = el("#trackingResult") || el("#homeSummary");
  if (trackingResult) trackingResult.innerHTML = "Enter a tracking code above to view details.";
}
document.addEventListener("DOMContentLoaded", initUI);

// Helper: normalize and map various status strings to a step index
function mapStatusToStepIndex(status) {
  if (!status) return 0;
  const s = String(status).toLowerCase().trim();

  // direct mappings (case-insensitive, tolerant)
  if (s.includes("accepted")) return steps.indexOf("Accepted");
  if (s.includes("order")) return steps.indexOf("Order Processing");
  if (s.includes("custom") || s.includes("cleared")) return steps.indexOf("Custom cleared");
  if (s.includes("estimate") || s.includes("estimated")) return steps.indexOf("Estimated Delivery");

  // map any variant of pending -> "Shipment Pending"
  if (s.includes("pending")) return steps.indexOf("Shipment Pending");

  // if exact full match to one of steps (case-insensitive)
  const exact = steps.findIndex(st => st.toLowerCase() === s);
  if (exact !== -1) return exact;

  // fallback to Accepted (index 0)
  return 0;
}

// Build steps HTML (keeps inline style approach)
function buildStepsHTML(lastStepIndex) {
  return steps.map((st, i) => `
    <div class="step" style="display:inline-block; text-align:center; width:12%;">
      <div class="dot ${i <= lastStepIndex ? "active" : ""}" style="
        width:15px; height:15px; border-radius:50%; display:block; margin:auto;
        background:${i <= lastStepIndex ? '#28a745' : '#ccc'};"></div>
      <div style="font-size:8px; margin-top:5px;">${st}</div>
    </div>
  `).join('<span style="color:#aaa;">—</span>');
}

// Render top summary
function renderSummary(s) {
  const container = el("#trackingResult") || el("#homeSummary");
  if (!container) return;
  const currentStatus = s.shipment?.status || (Array.isArray(s.statusTimeline) && s.statusTimeline.length ? s.statusTimeline[s.statusTimeline.length - 1] : "") || "";
  const lastStepIndex = Math.max(0, mapStatusToStepIndex(currentStatus));
  const stepsHTML = buildStepsHTML(lastStepIndex);

  const prettyStatus = String(currentStatus || "").charAt(0).toUpperCase() + String(currentStatus || "").slice(1);

  container.innerHTML = `
    <div class="statusbar mb-3">${stepsHTML}</div>
    <p class="muted">Tracking <span class="code text-primary">${escapeHtml(s.trackingCode)}</span> for <strong>${escapeHtml(s.shipper?.name || '')} → ${escapeHtml(s.receiver?.name || '')}</strong></p>
    <p><strong>Current status:</strong> ${escapeHtml(prettyStatus)}</p>
  `;
}

/* Small helpers (kept local & minimal) */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatValue(key, value) {
  if (value === null || value === undefined || value === '') return 'Not provided';
  const k = String(key).toLowerCase();

  // weight -> show "5 kg" if numeric
  if (k.includes('weight')) {
    const numeric = parseFloat(String(value).replace(/[^\d.-]/g, ''));
    if (!isNaN(numeric)) return `${numeric} kg`;
    return String(value);
  }

  // numeric-ish fields: packages, quantity
  if (k.includes('quantity') || k.includes('packages')) {
    const n = parseInt(value, 10);
    return isNaN(n) ? String(value) : String(n);
  }

  // money / freight
  if (k.includes('freight') || k.includes('total') || k.includes('price') || k.includes('amount')) {
    const s = String(value);
    if (s.match(/[$¢£¥€]/)) return s;
    const numeric = parseFloat(s.replace(/[^\d.-]/g, ''));
    return isNaN(numeric) ? s : `$${numeric}`;
  }

  // try basic date formatting for ISO-ish strings
  if (k.includes('date') || k.includes('time')) {
    const d = new Date(value);
    if (!isNaN(d)) return d.toLocaleString();
    return String(value);
  }

  return String(value);
}

function renderDetailPanel(s, singleColumn = false) {
  const panel = document.querySelector('#track-panel');
  const body = document.querySelector('#trackBody');
  if (!panel || !body) return;

  panel.style.display = 'block';

  const pickupDisplay = s?.shipment?.pickupDate && s?.shipment?.pickupTime
    ? `${s.shipment.pickupDate} - ${s.shipment.pickupTime}`
    : (s?.shipment?.pickup || 'N/A');

  // Define sections and their rows as [label, valueExpression]
  const sections = [
    ['Information ID', [
      ['Code', s?.trackingCode],
      ['Estimated Delivery', s?.estimatedDelivery || ''],
      ['Customs', s?.customs || '']
    ]],
    ['Shipper Information', [
      ['Name', s?.shipper?.name],
      ['Phone', s?.shipper?.phone || ''],
      ['Address', s?.shipper?.address || ''],
      ['Email', s?.shipper?.email || '']
    ]],
    ['Receiver Information', [
      ['Name', s?.receiver?.name],
      ['Phone', s?.receiver?.phone || 'Not provided'],
      ['Address', s?.receiver?.address || ''],
      ['Email', s?.receiver?.email || 'Not provided']
    ]],
    ['Shipment Details', [
      ['Weight', s?.shipment?.weight],
      ['Courier', s?.shipment?.courier],
      ['Packages', s?.shipment?.packages],
      ['Mode', s?.shipment?.mode],
      ['Product', s?.shipment?.product],
      ['Quantity', s?.shipment?.quantity],
      ['Payment Mode', s?.shipment?.paymentMode],
      ['Total Freight', s?.shipment?.totalFreight],
      ['Carrier', s?.shipment?.carrier],
      ['Carrier Ref', s?.shipment?.carrierRef],
      ['Departure Time', s?.shipment?.departureTime],
      ['Origin', s?.shipment?.origin],
      ['Destination', s?.shipment?.destination],
      ['Pickup Date & Time', pickupDisplay],
      ['Status', s?.shipment?.status],
      ['Comments', s?.shipment?.comments],
      ['Agent Name', s?.shipment?.agentName],
      ['Shipment Type', s?.shipment?.shipmentType]
    ]]
  ];

  // Build HTML for the table (keeps your singleColumn toggle)
  let html = `<table style="width:100%; border-collapse:collapse; font-family:inherit;">`;
  sections.forEach(([title, rows]) => {
    html += `<tr><th colspan="2" style="text-align:left; background:#f3f4f6; padding:8px; border-top:1px solid #e2e8f0;">${escapeHtml(title)}</th></tr>`;
    rows.forEach(([label, rawVal]) => {
      const formatted = formatValue(label, rawVal);
      if (singleColumn) {
        html += `<tr><td colspan="2" style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(label)} - ${escapeHtml(formatted)}</td></tr>`;
      } else {
        html += `<tr>
          <td style="width:35%; padding:8px; border-bottom:1px solid #eee; font-weight:600;" data-label="${escapeHtml(label)}">${escapeHtml(label)}</td>
          <td style="width:65%; padding:8px; border-bottom:1px solid #eee;" data-label="${escapeHtml(label)}">${escapeHtml(formatted)}</td>
        </tr>`;
      }
    });
  });
  html += `</table>`;

  body.innerHTML = html;
}

// Clear displays and hide panel
function clearDisplay(message) {
  if (el("#trackingResult")) el("#trackingResult").innerHTML = message || "Enter a tracking code above to view details.";
  if (el("#trackBody")) el("#trackBody").innerHTML = "";
  if (el("#track-panel")) el("#track-panel").style.display = "none";
}

// Main lookup
function performTrack(code) {
  console.log("[performTrack] lookup for:", code);
  clearDisplay();

  if (!code) {
    alert("Please enter a tracking code!");
    return;
  }

  if (typeof deliveries === "undefined") {
    console.error("[performTrack] deliveries is undefined — check that deliveries.js loaded BEFORE script.js");
    alert("Internal error: deliveries data missing. See console for details.");
    return;
  }

  // case-insensitive lookup (small improvement)
  const shipment = deliveries.find(s => String(s.trackingCode || '').toLowerCase() === String(code || '').toLowerCase());
  if (!shipment) {
    clearDisplay(`<p style="color:red">Tracking code "${escapeHtml(code)}" not found.</p>`);
    return;
  }

  // render
  renderSummary(shipment);
  renderDetailPanel(shipment);
}

// Wire up inputs + button + url param
document.addEventListener("DOMContentLoaded", () => {
  const btn = el("#btnQuickTrack");
  const input = el("#trackingCode");

  if (btn) {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      performTrack(input?.value?.trim());
    });
  } else console.warn("#btnQuickTrack not found in DOM");

  if (input) {
    input.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        performTrack(input.value.trim());
      }
    });
  } else console.warn("#trackingCode input not found in DOM");

  // support ?track=CODE
  const trackParam = new URLSearchParams(window.location.search).get("track");
  if (trackParam) {
    if (input) input.value = trackParam;
    performTrack(trackParam);
  }
});
