// =========================================================
// FLOWPACK CALCULATOR
// =========================================================

const FLOWPACK_MAX_LANES_TOTAL = 3;
const FLOWPACK_PIECES_PER_KG = 190;
const FLOWPACK_PIECES_PER_LANE_PER_CLICK = 16; // 3 lanes -> 48 wrappers/click
const FLOWPACK_CLICK_LENGTH_M = 0.976;

const flowpackTableBody = document.querySelector("#flowpackTable tbody");
const flowpackAddRowBtn = document.getElementById("flowpackAddRowBtn");
const flowpackSummary = document.getElementById("flowpackSummary");

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
  let usedLanes = 0;

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
      lanesInput
    });

    usedLanes += lanes;
  });

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

  let totalClicksAll = 0;
  let totalMetersAll = 0;

  rowInfos.forEach((info) => {
    const row = info.row;
    const tdClicks = row.children[3];
    const tdMeters = row.children[4];

    const lanes = info.effectiveLanes || 0;
    const kg = info.kg || 0;

    if (lanes <= 0 || kg <= 0) {
      tdClicks.textContent = "";
      tdMeters.textContent = "";
      return;
    }

    const wrappersNeeded = kg * FLOWPACK_PIECES_PER_KG;
    const wrappersPerClick = lanes * FLOWPACK_PIECES_PER_LANE_PER_CLICK;
    const baseClicks = Math.ceil(wrappersNeeded / wrappersPerClick);

    const extraWrappers = 2 * FLOWPACK_PIECES_PER_KG;
    const extraClicks = Math.ceil(extraWrappers / wrappersPerClick);

    const totalClicks = baseClicks + extraClicks;
    const meters = totalClicks * FLOWPACK_CLICK_LENGTH_M;

    tdClicks.textContent = formatNumber(totalClicks);
    tdMeters.textContent = meters.toFixed(1);

    totalClicksAll += totalClicks;
    totalMetersAll += meters;
  });

  if (totalClicksAll === 0) {
    flowpackSummary.innerHTML =
      "<span class='muted'>Enter kilos and lanes for at least one design.</span>";
  } else {
    flowpackSummary.innerHTML = `
      Total flowpack clicks: <strong>${formatNumber(totalClicksAll)}</strong><br />
      Approx. diecut stop: <strong>${totalMetersAll.toFixed(1)}</strong> m
    `;
  }
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
