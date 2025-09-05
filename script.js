// script.js (updated)
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
  const currentStatus = s.shipment?.status || s.statusTimeline[s.statusTimeline.length - 1] || "";
  const lastStepIndex = Math.max(0, mapStatusToStepIndex(currentStatus));
  const stepsHTML = buildStepsHTML(lastStepIndex);

  container.innerHTML = `
    <div class="statusbar mb-3">${stepsHTML}</div>
    <p class="muted">Tracking <span class="code text-primary">${s.trackingCode}</span> for <strong>${s.shipper.name} → ${s.receiver.name}</strong></p>
    <p><strong>Current status:</strong> ${String(currentStatus).charAt(0).toUpperCase() + String(currentStatus).slice(1)}</p>
  `;
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

  const shipment = deliveries.find(s => s.trackingCode === code);
  if (!shipment) {
    clearDisplay(`<p style="color:red">Tracking code "${code}" not found.</p>`);
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
