// =========================================================
// FLOWPACK CALCULATOR
// =========================================================

// NOTE: Logic is table-based (boss planning table) with deterministic interpolation.
// - Max 3 lanes total across all designs
// - Two modes:
//   1) "3 ens FP" when exactly one active design uses 3 lanes
//   2) "1 FP pr lane" for all other cases (uses kgPerLane = totalKg / 3)
// - Interpolation:
//   - Linear between defined kg points
//   - Proportional scaling below 5 kg and above 100 kg
// - Rounding:
//   - Clicks: ceil
//   - Meters: preserve table ratio (m/click) then round to nearest 5 m

const FLOWPACK_MAX_LANES_TOTAL = 3;

// Boss table from planning sheet
const FLOWPACK_KG_POINTS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];

// "1 FP pr lane" (mix)
const FLOWPACK_CLICKS_1 = [90, 165, 235, 315, 385, 455, 530, 605, 671, 830, 1125, 1495];
const FLOWPACK_METERS_1 = [80, 150, 220, 295, 360, 435, 505, 580, 645, 795, 1090, 1440];

// "3 ens FP" (same design on all 3 lanes)
const FLOWPACK_CLICKS_3 = [35, 60, 85, 110, 135, 155, 180, 205, 230, 280, 380, 500];
const FLOWPACK_METERS_3 = [25, 45, 70, 95, 115, 140, 165, 190, 210, 260, 360, 475];

const flowpackTableBody = document.querySelector("#flowpackTable tbody");
const flowpackAddRowBtn = document.getElementById("flowpackAddRowBtn");
const flowpackSummary = document.getElementById("flowpackSummary");

function roundToNearest5(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value / 5) * 5;
}

function flowpackInterpolateFromTable(kg, points, clicksArr, metersArr) {
  // Returns base (float) values for clicks and meters at the given kg.
  // Scaling:
  //  - below first point: proportional scaling from first row
  //  - above last point: proportional scaling from last row
  //  - between: linear interpolation
  const x = Number(kg);
  if (!Number.isFinite(x) || x <= 0) {
    return { clicks: 0, meters: 0 };
  }

  const firstKg = points[0];
  const lastKg = points[points.length - 1];

  if (x <= firstKg) {
    const factor = x / firstKg;
    return {
      clicks: clicksArr[0] * factor,
      meters: metersArr[0] * factor
    };
  }

  if (x >= lastKg) {
    const factor = x / lastKg;
    return {
      clicks: clicksArr[clicksArr.length - 1] * factor,
      meters: metersArr[metersArr.length - 1] * factor
    };
  }

  // Find bracket [i, i+1]
  for (let i = 0; i < points.length - 1; i++) {
    const x0 = points[i];
    const x1 = points[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0);
      const c0 = clicksArr[i];
      const c1 = clicksArr[i + 1];
      const m0 = metersArr[i];
      const m1 = metersArr[i + 1];
      return {
        clicks: c0 + (c1 - c0) * t,
        meters: m0 + (m1 - m0) * t
      };
    }
  }

  // Should be unreachable due to bounds above
  return { clicks: 0, meters: 0 };
}

function flowpackFinalize(base) {
  // Final rounding rules:
  // - clicks: ceil
  // - meters: keep ratio (m per click) then round to nearest 5 m
  const baseClicks = Number(base.clicks);
  const baseMeters = Number(base.meters);

  if (!Number.isFinite(baseClicks) || baseClicks <= 0 || !Number.isFinite(baseMeters) || baseMeters <= 0) {
    return { clicks: 0, meters: 0 };
  }

  const clicks = Math.ceil(baseClicks);
  const mPerClick = baseMeters / baseClicks;
  const meters = roundToNearest5(clicks * mPerClick);

  return { clicks, meters };
}

function createFlowpackRow(initial = {}) {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  const tdKg = document.createElement("td");
  const tdLanes = document.createElement("td");
  const tdClicks = document.createElement("td");
  const tdMeters = document.createElement("td");
  const tdActions = document.createElement("td");
  tdActions.className = "row-actions";

  const designNumber =
    initial.designNumber ||
    flowpackTableBody.querySelectorAll("tr").length + 1;
  const designLabel = initial.name || `Design ${designNumber}`;
  tdName.textContent = designLabel;
  tr.dataset.designName = designLabel;

  const inputKg = document.createElement("input");
  inputKg.type = "number";
  inputKg.min = "0";
  inputKg.step = "0.1";
  inputKg.className = "number-input flowpack-kg-input";
  inputKg.value = initial.kg != null ? initial.kg : "";

  const inputLanes = document.createElement("input");
  inputLanes.type = "number";
  inputLanes.min = "0";
  inputLanes.step = "1";
  inputLanes.className = "number-input flowpack-lanes-input";
  inputLanes.value = initial.lanes != null ? initial.lanes : "";

  tdKg.appendChild(inputKg);
  tdLanes.appendChild(inputLanes);

  // Max button (sets this row's lanes to the maximum allowed and triggers normal recalculation)
  const maxBtn = document.createElement("button");
  maxBtn.type = "button";
  maxBtn.textContent = "Max";
  maxBtn.className = "btn-secondary";
  maxBtn.addEventListener("click", () => {
    inputLanes.value = String(FLOWPACK_MAX_LANES_TOTAL);
    inputLanes.dispatchEvent(new Event("input", { bubbles: true }));
  });
  tdLanes.appendChild(maxBtn);
  tdClicks.textContent = "";
  tdMeters.textContent = "";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("btn-danger");
  tdActions.appendChild(removeBtn);

  tr.appendChild(tdName);
  tr.appendChild(tdKg);
  tr.appendChild(tdLanes);
  tr.appendChild(tdClicks);
  tr.appendChild(tdMeters);
  tr.appendChild(tdActions);

  inputKg.addEventListener("input", recalcFlowpack);
  inputLanes.addEventListener("input", recalcFlowpack);
  removeBtn.addEventListener("click", () => {
    const rows = flowpackTableBody.querySelectorAll("tr");
    if (rows.length > 1) {
      tr.remove();
      recalcFlowpack();
    } else {
      alert("At least one flowpack design row must remain.");
    }
  });

  return tr;
}

function recalcFlowpack() {
  const rows = Array.from(flowpackTableBody.querySelectorAll("tr"));

  const rowInfos = [];

  rows.forEach((row, idx) => {
    const designName = row.dataset.designName || `Design ${idx + 1}`;
    const kgInput = row.querySelector(".flowpack-kg-input");
    const lanesInput = row.querySelector(".flowpack-lanes-input");

    let kg = Number(kgInput.value);
    if (!Number.isFinite(kg) || kg <= 0) kg = 0;

    let lanes = Number(lanesInput.value);
    if (!Number.isFinite(lanes) || lanes < 0) lanes = 0;

    rowInfos.push({
      row,
      designName,
      kg,
      lanes,
      kgInput,
      lanesInput,
      effectiveLanes: 0
    });
  });

  // Clamp total lanes across designs to FLOWPACK_MAX_LANES_TOTAL
  let remaining = FLOWPACK_MAX_LANES_TOTAL;
  let clamped = false;

  rowInfos.forEach((info) => {
    let lanes = info.lanes;
    if (remaining <= 0) {
      if (lanes !== 0) {
        lanes = 0;
        info.lanesInput.value = "";
        clamped = true;
      }
    } else if (lanes > remaining) {
      lanes = remaining;
      info.lanesInput.value = lanes ? String(lanes) : "";
      clamped = true;
    }

    info.effectiveLanes = lanes;
    remaining -= lanes;
  });

  if (clamped) {
    flowpackSummary.innerHTML =
      "<span class='muted'>Total lanes limited to 3 across all designs.</span>";
  }

  // Active designs are those that actually have kg and lanes
  const active = rowInfos.filter((info) => (info.kg || 0) > 0 && (info.effectiveLanes || 0) > 0);

  // Clear per-row outputs first
  rowInfos.forEach((info) => {
    const tdClicks = info.row.children[3];
    const tdMeters = info.row.children[4];
    tdClicks.textContent = "";
    tdMeters.textContent = "";
  });

  if (active.length === 0) {
    flowpackSummary.innerHTML =
      "<span class='muted'>Enter kilos and lanes for at least one design.</span>";
    return;
  }

  // Determine mode
  let mode = "1 FP pr lane";
  let kgForTable = 0;
  let base;

  if (active.length === 1 && active[0].effectiveLanes === 3) {
    mode = "3 ens FP";
    kgForTable = active[0].kg;
    base = flowpackInterpolateFromTable(kgForTable, FLOWPACK_KG_POINTS, FLOWPACK_CLICKS_3, FLOWPACK_METERS_3);
  } else {
    const totalKg = active.reduce((sum, info) => sum + info.kg, 0);
    // Table expects kg per physical lane in this mode (legacy behavior)
    kgForTable = totalKg / 3;
    base = flowpackInterpolateFromTable(kgForTable, FLOWPACK_KG_POINTS, FLOWPACK_CLICKS_1, FLOWPACK_METERS_1);
  }

  const final = flowpackFinalize(base);

  // Write the same job result into each active row (logic-only focus)
  active.forEach((info) => {
    const tdClicks = info.row.children[3];
    const tdMeters = info.row.children[4];
    tdClicks.textContent = formatNumber(final.clicks);
    tdMeters.textContent = String(final.meters);
  });

  // Summary
  const usedLanes = active.reduce((sum, info) => sum + (info.effectiveLanes || 0), 0);
  const totalKgAll = active.reduce((sum, info) => sum + (info.kg || 0), 0);

  flowpackSummary.innerHTML = `
    Total kg entered: <strong>${formatNumber(totalKgAll)}</strong><br />
    Total lanes used: <strong>${formatNumber(usedLanes)}</strong> / ${FLOWPACK_MAX_LANES_TOTAL}<br />
    <span class="muted">Mode: ${mode} (table kg basis: ${formatNumber(kgForTable)})</span><br />
    <span style="font-size: 15px;">
      <strong style="color: var(--accent, var(--primary, #4aa3ff));">Total to print:</strong> ${formatNumber(final.clicks)}
    </span><br />
    <span style="font-size: 15px;">
      <strong style="color: var(--accent, var(--primary, #4aa3ff));">Approx. diecut stop:</strong> ${formatNumber(final.meters)} m
    </span>
  `;
}


function initFlowpackCalculator() {
  const firstRow = createFlowpackRow({ designNumber: 1 });
  flowpackTableBody.appendChild(firstRow);

  flowpackAddRowBtn.addEventListener("click", () => {
    let usedLanes = 0;
    document.querySelectorAll(".flowpack-lanes-input").forEach((input) => {
      const v = Number(input.value);
      if (Number.isFinite(v) && v > 0) usedLanes += v;
    });

    if (usedLanes >= FLOWPACK_MAX_LANES_TOTAL) {
      alert(
        `You already use ${usedLanes} lanes out of maximum ${FLOWPACK_MAX_LANES_TOTAL}. You cannot add more designs.`
      );
      return;
    }

    const rowCount = flowpackTableBody.querySelectorAll("tr").length;
    const newRow = createFlowpackRow({ designNumber: rowCount + 1 });
    flowpackTableBody.appendChild(newRow);
    recalcFlowpack();
  });

  recalcFlowpack();
}

window.initFlowpackCalculator = initFlowpackCalculator;
