// =========================================================
// LABEL PRINT CALCULATOR
// =========================================================

// Product configuration for LABEL calculator
const PRODUCT_CONFIG = [
  {
    id: "p196x48",
    label: "Penta-Petit 196 x 48 mm",
    maxLanes: 6,
    labelsPerClick: 4,
    extraClicks: 18
  },
  { id: "papvand_shots_45x118", label: "Papvand/Shots 45 x 118 mm", maxLanes: 6, labelsPerClick: 36, extraClicks: 18 },
  { id: "plexo_90x280", label: "Plexo 90 x 280 mm", maxLanes: 3, labelsPerClick: 9, extraClicks: 18 },
  { id: "plenty_100x204", label: "Plenty 100 x 204 mm", maxLanes: 3, labelsPerClick: 12, extraClicks: 18 },
  { id: "energidrik_122x172", label: "Energidrik 122 x 172 mm", maxLanes: 2, labelsPerClick: 10, extraClicks: 18 },
  { id: "State_90x205", label: "State 90 x 205 mm", maxLanes: 3, labelsPerClick: 12, extraClicks: 18 },
  { id: "prima_62x204", label: "Prima 62 x 204 mm", maxLanes: 4, labelsPerClick: 16, extraClicks: 18 },
  { id: "mm30x50_L", label: '30 x 50 mm " L "', maxLanes: 8, labelsPerClick: 128, extraClicks: 18 },
  { id: "mm50x30_S", label: '50 x 30 mm " S "', maxLanes: 5, labelsPerClick: 120, extraClicks: 18 },
  { id: "saharas_70x180", label: "Saharas 70 x 180 mm", maxLanes: 4, labelsPerClick: 16, extraClicks: 18 },
  { id: "luksus_brod_50x140", label: "Luksus brød 50 x 140 mm", maxLanes: 2, labelsPerClick: 14, extraClicks: 18 },
  { id: "luksus_brod_front_58x50", label: "Luksus brød  Front 58 x 50 mm", maxLanes: 5, labelsPerClick: 70, extraClicks: 18 },
  { id: "luksus_brod_back_58x80", label: "Luksus brød  Back 58 x 80 mm", maxLanes: 5, labelsPerClick: 50, extraClicks: 18 },
  { id: "LOHILO_126x181", label: "LOHILO 126 x 181 mm", maxLanes: 2, labelsPerClick: 8, extraClicks: 25 },
  { id: "kidi_small_22x32", label: "Kidi Small 22 x 32 mm", maxLanes: 11, labelsPerClick: 264, extraClicks: 18 },
  { id: "kidi_deco_63x88", label: "Kidi Deco 63 x 88 mm", maxLanes: 4, labelsPerClick: 32, extraClicks: 18 },
  { id: "bil_80x50", label: "Bil 80 x 50 mm", maxLanes: 3, labelsPerClick: 45, extraClicks: 18 },
  { id: "mm35x100", label: "35 x 100 mm", maxLanes: 8, labelsPerClick: 64, extraClicks: 18 },
  { id: "mm100x35", label: "100 x 35 mm", maxLanes: 3, labelsPerClick: 72, extraClicks: 18 },
  { id: "monster_95x60", label: "Monster 95 x 60 mm", maxLanes: 3, labelsPerClick: 45, extraClicks: 18 },
  { id: "monster_L_60x95", label: "Monster  L 60 x 95 mm", maxLanes: 4, labelsPerClick: 36, extraClicks: 18 },
  { id: "monster_111x60", label: "Monster 111 x 60 mm", maxLanes: 2, labelsPerClick: 24, extraClicks: 18 },
  { id: "mm45x75", label: "45 x 75 mm", maxLanes: 6, labelsPerClick: 72, extraClicks: 18 },
  { id: "mm115x300", label: "115 x 300 mm", maxLanes: 2, labelsPerClick: 6, extraClicks: 18 },
  { id: "mm40x120", label: "40 x 120 mm", maxLanes: 2, labelsPerClick: 40, extraClicks: 18 },
  { id: "mm25x15", label: "25 x 15 mm", maxLanes: 8, labelsPerClick: 240, extraClicks: 18 },
  { id: "mm75x135", label: "75 x 135 mm", maxLanes: 3, labelsPerClick: 18, extraClicks: 18 },
  { id: "mm35x25", label: "35 x 25 mm", maxLanes: 7, labelsPerClick: 210, extraClicks: 18 },
  { id: "mm50x70_L", label: '50 x 70 mm " L "', maxLanes: 4, labelsPerClick: 48, extraClicks: 18 },
  { id: "mm70x50_S", label: '70 x 50 mm " S "', maxLanes: 4, labelsPerClick: 64, extraClicks: 18 },
  { id: "mm50x50", label: "50 x 50 mm", maxLanes: 5, labelsPerClick: 75, extraClicks: 18 },
  { id: "tee_dawn_68x90", label: "Tee Dawn 68 x 90 mm", maxLanes: 3, labelsPerClick: 36, extraClicks: 18 },
  { id: "tee_dawn_80x80", label: "Tee Dawn 80 x 80 mm", maxLanes: 3, labelsPerClick: 27, extraClicks: 18 },
  { id: "Collagen_115x300", label: "Collagen 115 x 300 mm", maxLanes: 2, labelsPerClick: 6, extraClicks: 20 },
  { id: "diam73", label: "Ø73 mm", maxLanes: 3, labelsPerClick: 36, extraClicks: 18 },
  { id: "diam90", label: "Ø80 - Ø90 mm", maxLanes: 3, labelsPerClick: 27, extraClicks: 18 },
  { id: "diam48", label: "Ø48 mm", maxLanes: 5, labelsPerClick: 75, extraClicks: 18 },
  { id: "diam40", label: "Ø40 mm", maxLanes: 4, labelsPerClick: 80, extraClicks: 18 },
  { id: "diam60", label: "Ø60 mm", maxLanes: 4, labelsPerClick: 60, extraClicks: 18 }
];

const productSelect = document.getElementById("productSelect");
const productInfo = document.getElementById("productInfo");
const designTableBody = document.querySelector("#designTable tbody");
const addRowBtn = document.getElementById("addRowBtn");
const laneWarning = document.getElementById("laneWarning");
const resultsSummary = document.getElementById("resultsSummary");
const resultTableBody = document.querySelector("#resultTable tbody");

// ---------- helpers ----------

function getSelectedProduct() {
  const id = productSelect.value;
  return PRODUCT_CONFIG.find((p) => p.id === id);
}

function clampLanes(value, maxLanes) {
  const v = Number(value);
  if (!Number.isFinite(v) || v < 0) return 0;
  if (maxLanes != null && v > maxLanes) return maxLanes;
  return v;
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("da-DK");
}

function roundUpToNext10(x) {
  return Math.ceil(x / 10) * 10;
}

function createDesignRow(initial = {}) {
  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  const tdTotal = document.createElement("td");
  const tdLanes = document.createElement("td");
  const tdActions = document.createElement("td");
  tdActions.className = "row-actions";

  const designNumber =
    initial.designNumber || designTableBody.querySelectorAll("tr").length + 1;
  const designLabel = initial.name || `Design ${designNumber}`;
  tdName.textContent = designLabel;
  tr.dataset.designName = designLabel;

  const inputTotal = document.createElement("input");
  inputTotal.type = "number";
  inputTotal.min = "0";
  inputTotal.step = "1";
  inputTotal.className = "number-input design-total-input";
  inputTotal.value = initial.total != null ? initial.total : "";

  const inputLanes = document.createElement("input");
  inputLanes.type = "number";
  inputLanes.min = "0";
  inputLanes.step = "1";
  inputLanes.className = "number-input design-lanes-input";
  inputLanes.value = initial.lanes != null ? initial.lanes : "";

  const currentProduct = getSelectedProduct();
  if (currentProduct && currentProduct.maxLanes != null) {
    inputLanes.max = String(currentProduct.maxLanes);
  }

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("btn-danger");

  tdTotal.appendChild(inputTotal);
  tdLanes.appendChild(inputLanes);
  tdActions.appendChild(removeBtn);

  tr.appendChild(tdName);
  tr.appendChild(tdTotal);
  tr.appendChild(tdLanes);
  tr.appendChild(tdActions);

  inputTotal.addEventListener("input", recalcLabel);
  inputLanes.addEventListener("input", recalcLabel);

  removeBtn.addEventListener("click", () => {
    const rows = designTableBody.querySelectorAll("tr");
    if (rows.length > 1) {
      tr.remove();
      recalcLabel();
    } else {
      alert("At least one design row must remain.");
    }
  });

  return tr;
}

function recalcLabel() {
  const product = getSelectedProduct();
  if (!product) return;

  laneWarning.textContent = "";

  const labelsPerClick = Number(product.labelsPerClick) || 0;
  const extraClicks = Number(product.extraClicks) || 0;

  const rows = Array.from(designTableBody.querySelectorAll("tr"));
  const rowInfos = [];

  // First pass: read values
  rows.forEach((row, idx) => {
    const designName = row.dataset.designName || `Design ${idx + 1}`;
    const totalInput = row.querySelector(".design-total-input");
    const lanesInput = row.querySelector(".design-lanes-input");

    if (product.maxLanes != null) {
      lanesInput.max = String(product.maxLanes);
    } else {
      lanesInput.removeAttribute("max");
    }

    const totalLabels = Number(totalInput.value);
    let requestedLanes = clampLanes(lanesInput.value, null); // only clamp negatives

    rowInfos.push({
      row,
      designName,
      totalInput,
      lanesInput,
      totalLabels,
      requestedLanes,
      effectiveLanes: 0
    });
  });

  // Second pass: enforce GLOBAL lane limit across all designs
  let globalClamped = false;
  let remainingLanes =
    product.maxLanes != null ? product.maxLanes : Infinity;

  rowInfos.forEach((info) => {
    let lanes = info.requestedLanes;

    if (remainingLanes <= 0) {
      if (lanes !== 0) {
        lanes = 0;
        info.lanesInput.value = "";
        globalClamped = true;
      }
    } else if (lanes > remainingLanes) {
      lanes = remainingLanes;
      info.lanesInput.value = lanes ? String(lanes) : "";
      globalClamped = true;
    }

    info.effectiveLanes = lanes;
    remainingLanes -= lanes;
  });

  if (globalClamped && product.maxLanes != null) {
    laneWarning.textContent = `Total lanes have been limited to max ${product.maxLanes} for this product. Some lane counts were reduced.`;
  }

  const laneEntries = [];
  let totalJobLabels = 0;
  let totalLanes = 0;

  // Third pass: build lane entries + totals
  rowInfos.forEach((info, idx) => {
    const lanes = info.effectiveLanes;
    const totalLabels = info.totalLabels;

    if (!Number.isFinite(totalLabels) || totalLabels <= 0 || lanes <= 0) {
      return;
    }

    totalJobLabels += totalLabels;
    totalLanes += lanes;

    const perLaneRequired = Math.round(totalLabels / lanes);

    for (let laneIndex = 1; laneIndex <= lanes; laneIndex++) {
      laneEntries.push({
        designName: info.designName,
        laneIndex,
        required: perLaneRequired
      });
    }
  });

  if (laneEntries.length === 0 || labelsPerClick <= 0) {
    productInfo.innerHTML = `
      <strong>${product.label}</strong><br />
      Max lanes: <strong>${product.maxLanes ?? "n/a"}</strong><br />
      Labels per click: <strong>${labelsPerClick}</strong><br />
      Extra setup clicks: <strong>${extraClicks}</strong>
    `;
    resultsSummary.innerHTML = `
      <span class="muted">Enter total labels and lanes for at least one design to see the calculation.</span>
    `;
    resultTableBody.innerHTML = "";
    return;
  }

  let totalClicks;
  let summaryHtml = "";

  if (product.id === "p196x48") {
    const extraLabels = labelsPerClick * extraClicks;
    const maxRequired = laneEntries.reduce(
      (max, entry) => (entry.required > max ? entry.required : max),
      0
    );

    totalClicks = Math.ceil((maxRequired + extraLabels) / labelsPerClick);

    productInfo.innerHTML = `
      <strong>${product.label}</strong><br />
      Max lanes: <strong>${product.maxLanes ?? "n/a"}</strong><br />
      Labels per click (per lane): <strong>${labelsPerClick}</strong><br />
      Extra setup clicks: <strong>${extraClicks}</strong> (≈ ${formatNumber(
      extraLabels
    )} extra labels)
    `;

    summaryHtml = `
      Total lanes in this job: <strong>${laneEntries.length}</strong><br />
      Max need on any lane: <strong>${formatNumber(
        maxRequired
      )}</strong> labels<br />
      Extra labels buffer: <strong>${formatNumber(extraLabels)}</strong><br />
      <span style="font-size: 15px;">
        <strong>Total clicks to print:</strong> ${formatNumber(totalClicks)}
      </span>
    `;
  } else {
    if (totalLanes <= 0) {
      resultsSummary.innerHTML = `
        <span class="muted">Please enter at least one lane for the job.</span>
      `;
      resultTableBody.innerHTML = "";
      return;
    }

    const rawClicks = totalJobLabels / labelsPerClick + extraClicks;
    totalClicks = roundUpToNext10(rawClicks);

    productInfo.innerHTML = `
      <strong>${product.label}</strong><br />
      Max lanes: <strong>${product.maxLanes ?? "n/a"}</strong><br />
      Labels per click (all lanes): <strong>${labelsPerClick}</strong><br />
      Extra setup clicks: <strong>${extraClicks}</strong>
    `;

    summaryHtml = `
      Total job labels: <strong>${formatNumber(totalJobLabels)}</strong><br />
      Labels per click (all lanes): <strong>${labelsPerClick}</strong><br />
      Raw clicks (incl. setup): <strong>${rawClicks.toFixed(1)}</strong><br />
      <span style="font-size: 15px;">
        <strong>Total clicks to print (rounded up to next 10):</strong> ${formatNumber(
          totalClicks
        )}
      </span>
    `;
  }

  resultTableBody.innerHTML = "";

  if (product.id === "p196x48") {
    laneEntries.forEach((entry) => {
      const produced = totalClicks * labelsPerClick;
      const waste = produced - entry.required;

      const tr = document.createElement("tr");

      const tdLane = document.createElement("td");
      const tdDesign = document.createElement("td");
      const tdRequired = document.createElement("td");
      const tdLpc = document.createElement("td");
      const tdClicks = document.createElement("td");
      const tdProduced = document.createElement("td");
      const tdWaste = document.createElement("td");

      tdLane.textContent = entry.laneIndex;
      tdDesign.textContent = entry.designName;
      tdRequired.textContent = formatNumber(entry.required);
      tdLpc.textContent = formatNumber(labelsPerClick);
      tdClicks.textContent = formatNumber(totalClicks);
      tdProduced.textContent = formatNumber(produced);
      tdWaste.textContent = formatNumber(waste);

      tdRequired.className = "right";
      tdLpc.className = "right";
      tdClicks.className = "right";
      tdProduced.className = "right";
      tdWaste.className = "right";

      tr.appendChild(tdLane);
      tr.appendChild(tdDesign);
      tr.appendChild(tdRequired);
      tr.appendChild(tdLpc);
      tr.appendChild(tdClicks);
      tr.appendChild(tdProduced);
      tr.appendChild(tdWaste);

      resultTableBody.appendChild(tr);
    });
  } else {
    const labelsPerLanePerClick = labelsPerClick / totalLanes;

    laneEntries.forEach((entry) => {
      const producedExact = totalClicks * labelsPerLanePerClick;
      const produced = Math.round(producedExact);
      const waste = produced - entry.required;

      const tr = document.createElement("tr");

      const tdLane = document.createElement("td");
      const tdDesign = document.createElement("td");
      const tdRequired = document.createElement("td");
      const tdLpc = document.createElement("td");
      const tdClicks = document.createElement("td");
      const tdProduced = document.createElement("td");
      const tdWaste = document.createElement("td");

      tdLane.textContent = entry.laneIndex;
      tdDesign.textContent = entry.designName;
      tdRequired.textContent = formatNumber(entry.required);
      tdLpc.textContent = labelsPerLanePerClick.toFixed(2);
      tdClicks.textContent = formatNumber(totalClicks);
      tdProduced.textContent = formatNumber(produced);
      tdWaste.textContent = formatNumber(waste);

      tdRequired.className = "right";
      tdLpc.className = "right";
      tdClicks.className = "right";
      tdProduced.className = "right";
      tdWaste.className = "right";

      tr.appendChild(tdLane);
      tr.appendChild(tdDesign);
      tr.appendChild(tdRequired);
      tr.appendChild(tdLpc);
      tr.appendChild(tdClicks);
      tr.appendChild(tdProduced);
      tr.appendChild(tdWaste);

      resultTableBody.appendChild(tr);
    });
  }

  resultsSummary.innerHTML = summaryHtml;
}

function resetCalculatorForProduct() {
  laneWarning.textContent = "";
  designTableBody.innerHTML = "";
  resultTableBody.innerHTML = "";
  resultsSummary.innerHTML = `
    <span class="muted">Enter total labels and lanes for at least one design to see the calculation.</span>
  `;

  const firstRow = createDesignRow({ designNumber: 1 });
  designTableBody.appendChild(firstRow);

  recalcLabel();
}

function onProductChange() {
  resetCalculatorForProduct();
}

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

  // read rows
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

  // clamp lanes to GLOBAL max 3
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

    // add 2 kg buffer per design
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
      Total flowpack clicks: <strong>${formatNumber(
        totalClicksAll
      )}</strong><br />
      Approx. diecut stop: <strong>${totalMetersAll.toFixed(
        1
      )}</strong> m
    `;
  }
}

// =========================================================
// CANDY JAR CALCULATOR (MIDI / MAXI) – with overrides
// =========================================================

const jarProductSelect = document.getElementById("jarProductSelect");
const jarCountInput = document.getElementById("jarCountInput");
const jarSummary = document.getElementById("jarSummary");

// boss table overrides – EXACT matches
const JAR_OVERRIDES = {
  midi: {
    12: { kg: 2.5, clicks: 30, meters: 25 },
    24: { kg: 4.5, clicks: 30, meters: 25 },
    48: { kg: 9, clicks: 55, meters: 45 },
    96: { kg: 18, clicks: 105, meters: 95 },
    324: { kg: 65, clicks: 305 }, // meters will be calculated
    648: { kg: 122, clicks: 625 },
    1296: { kg: 244, clicks: 1212 }
  },
  maxi: {
    12: { kg: 5, clicks: 30, meters: 25 },
    24: { kg: 10, clicks: 55, meters: 45 },
    48: { kg: 20, clicks: 105, meters: 95 },
    96: { kg: 40, clicks: 200, meters: 190 },
    324: { kg: 122, clicks: 625 },
    648: { kg: 260, clicks: 1320 },
    1296: { kg: 517, clicks: 7530 }
  }
};

// base assumptions for non-override values
const JAR_WRAPPERS_PER_JAR = {
  midi: 40,
  maxi: 85
};
const JAR_PIECES_PER_KG = 190;
const JAR_WRAPPERS_PER_CLICK = 48;
const JAR_CLICK_LENGTH_M = 0.976;

function computeJarMeters(clicks) {
  // standard formula then round to nearest 5 m
  const raw = clicks * JAR_CLICK_LENGTH_M;
  return Math.round(raw / 5) * 5;
}

function recalcJars() {
  const productType = jarProductSelect.value || "midi";
  const jars = Number(jarCountInput.value);

  if (!Number.isFinite(jars) || jars <= 0) {
    jarSummary.innerHTML =
      "<span class='muted'>Enter product type and number of jars to see the calculation.</span>";
    return;
  }

  const overrides = JAR_OVERRIDES[productType];
  let kg, clicks, meters;

  if (overrides && overrides[jars]) {
    kg = overrides[jars].kg;
    clicks = overrides[jars].clicks;
    meters =
      overrides[jars].meters != null
        ? overrides[jars].meters
        : computeJarMeters(clicks);
  } else {
    // generic logic (not in boss table) – based on pieces and 190 pcs/kg
    const piecesPerJar = JAR_WRAPPERS_PER_JAR[productType];
    const wrappers = jars * piecesPerJar;

    const exactKg = wrappers / JAR_PIECES_PER_KG;
    kg = Math.round(exactKg * 10) / 10; // 0.1 kg precision

    const baseClicks = wrappers / JAR_WRAPPERS_PER_CLICK;

    // apply a small safety factor depending on size
    const safetyFactor = productType === "midi" ? 1.18 : 1.22;
    clicks = Math.ceil(baseClicks * safetyFactor);

    meters = computeJarMeters(clicks);
  }

  jarSummary.innerHTML = `
    Product type: <strong>${productType === "midi" ? "Midi" : "Maxi"}</strong><br />
    Jars to produce: <strong>${formatNumber(jars)}</strong><br />
    Approx. weight: <strong>${kg.toFixed(1)}</strong> kg<br />
    Total clicks: <strong>${formatNumber(clicks)}</strong><br />
    Approx. diecut stop: <strong>${meters}</strong> m
  `;
}

// =========================================================
// CORONA & UV CALCULATORS
// =========================================================

// ---------- UV ----------

const UV_ADHESIVES = [
  {
    id: "FPC406",
    name: "FPC 406 (standard)",
    referenceSpeed: 120, // m/min
    referencePower: 80, // %
    minPercent: 30,
    maxPercent: 100,
    speedLimitMin: 40,
    speedLimitMax: 220,
    ecoFactor: 0.9,
    strongFactor: 1.1
  }
];

const uvAdhesiveSelect = document.getElementById("uvAdhesiveSelect");
const uvSpeedInput = document.getElementById("uvSpeedInput");
const uvModeSelect = document.getElementById("uvModeSelect");
const uvSummary = document.getElementById("uvSummary");

function computeUvSettings() {
  const speed = Number(uvSpeedInput.value);
  const mode = uvModeSelect.value || "normal";
  const adhesiveId = uvAdhesiveSelect.value || "FPC406";

  const adhesive =
    UV_ADHESIVES.find((a) => a.id === adhesiveId) || UV_ADHESIVES[0];

  if (!Number.isFinite(speed) || speed <= 0) {
    uvSummary.innerHTML =
      "<span class='muted'>Enter a running speed to get a suggestion.</span>";
    return;
  }

  // clamp speed
  const clampedSpeed = Math.min(
    adhesive.speedLimitMax,
    Math.max(adhesive.speedLimitMin, speed)
  );

  let factor = 1;
  if (mode === "eco") factor = adhesive.ecoFactor;
  else if (mode === "strong") factor = adhesive.strongFactor;

  const targetPowerAtRef = adhesive.referencePower * factor; // %
  const gradient = targetPowerAtRef / adhesive.referenceSpeed; // % per m/min
  const rawPower = clampedSpeed * gradient; // %

  let uvPower = Math.min(adhesive.maxPercent, Math.max(adhesive.minPercent, rawPower));
  const minPowerSetting = Math.round(uvPower);
  const gradientSetting = Math.round(gradient * 10) / 10;

  uvSummary.innerHTML = `
    Adhesive: <strong>${adhesive.name}</strong><br />
    Speed used for calc: <strong>${clampedSpeed.toFixed(0)}</strong> m/min<br />
    Suggested Min Power: <strong>${minPowerSetting}%</strong><br />
    Suggested Gradient: <strong>${gradientSetting}% per 10 m/min</strong><br />
    <span class="muted">
      Mode: <strong>${mode}</strong> – use this as a starting point and fine-tune on press.
    </span>
  `;
}

// ---------- CORONA ----------

const coronaMaterialSelect = document.getElementById("coronaMaterialSelect");
const coronaProcessSelect = document.getElementById("coronaProcessSelect");
const coronaSpeedInput = document.getElementById("coronaSpeedInput");
const coronaDyneInput = document.getElementById("coronaDyneInput");
const coronaSummary = document.getElementById("coronaSummary");

// simple target dyne table
const PROCESS_TARGET_DYNE = {
  printing: {
    paper: { min: 0, max: 0 }, // no corona needed
    pe: { min: 38, max: 40 },
    pet: { min: 40, max: 42 }
  },
  varnish: {
    paper: { min: 0, max: 0 },
    pe: { min: 40, max: 42 },
    pet: { min: 42, max: 44 }
  },
  lamination: {
    paper: { min: 0, max: 0 },
    pe: { min: 40, max: 42 },
    pet: { min: 42, max: 44 }
  },
  coldfoil: {
    paper: { min: 0, max: 0 },
    pe: { min: 42, max: 44 },
    pet: { min: 44, max: 46 }
  }
};

function computeCoronaSettings() {
  const material = coronaMaterialSelect.value || "pe";
  const process = coronaProcessSelect.value || "printing";
  const speed = Number(coronaSpeedInput.value);
  const currentDyne = Number(coronaDyneInput.value);

  if (!Number.isFinite(speed) || speed <= 0) {
    coronaSummary.innerHTML =
      "<span class='muted'>Enter speed (m/min) to get a suggestion.</span>";
    return;
  }

  const processMap = PROCESS_TARGET_DYNE[process];
  const target = processMap ? processMap[material] : null;

  if (!target || target.max === 0) {
    coronaSummary.innerHTML = `
      Material: <strong>Paper / board</strong><br />
      Process: <strong>${process}</strong><br />
      <span class="muted">Normally no corona treatment is required on paper/board for this process.</span>
    `;
    return;
  }

  const targetMid = (target.min + target.max) / 2;

  let dyneGap = NaN;
  if (Number.isFinite(currentDyne) && currentDyne > 0) {
    dyneGap = Math.max(0, targetMid - currentDyne);
  }

  // simple suggestion: base 35% + contribution from speed + dyne gap
  const basePercent = 35;
  const speedTerm = speed * 0.05; // 100 m/min -> +5%
  const gapTerm = Number.isFinite(dyneGap) ? dyneGap * 1.5 : 5;

  let suggestedPower = basePercent + speedTerm + gapTerm;
  suggestedPower = Math.max(20, Math.min(80, suggestedPower));
  suggestedPower = Math.round(suggestedPower);

  let dyneText;
  if (Number.isFinite(dyneGap)) {
    dyneText = `You are currently at ~${currentDyne} dyn/cm; this setting aims to increase by ≈ ${dyneGap.toFixed(
      1
    )} dyn.`;
  } else {
    dyneText =
      "No current dyne value entered – assuming untreated film. Adjust after dyne pen test.";
  }

  coronaSummary.innerHTML = `
    Material: <strong>${
      material === "pe"
        ? "PE / BOPP film"
        : material === "pet"
        ? "PET / metallised film"
        : "Paper / board"
    }</strong><br />
    Process: <strong>${process}</strong><br />
    Target dyne range: <strong>${target.min}–${target.max} dyn/cm</strong><br />
    Suggested corona power: <strong>${suggestedPower}%</strong><br />
    <span class="muted">${dyneText} Corona effect decays within ~48 hours, so re-treat if film is old.</span>
  `;
}

// =========================================================
// TABS + INIT
// =========================================================

function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      // buttons
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // panels
      document.querySelectorAll(".tab-panel").forEach((panel) => {
        if (panel.id === targetId) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });
}

function initQuickGuide() {
  const helpToggle = document.getElementById("helpToggle");
  const helpPanel = document.getElementById("helpPanel");

  if (helpToggle && helpPanel) {
    helpToggle.addEventListener("click", () => {
      helpPanel.classList.toggle("visible");
    });
  }
}

function initLabelCalculator() {
  // populate product select
  PRODUCT_CONFIG.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.label;
    productSelect.appendChild(opt);
  });

  if (PRODUCT_CONFIG.length > 0) {
    productSelect.value = PRODUCT_CONFIG[0].id;
  }

  productSelect.addEventListener("change", onProductChange);

  addRowBtn.addEventListener("click", () => {
    const product = getSelectedProduct();
    if (!product) return;

    // Calculate total lanes currently used
    let usedLanes = 0;
    document.querySelectorAll(".design-lanes-input").forEach((input) => {
      const v = Number(input.value);
      if (Number.isFinite(v) && v > 0) {
        usedLanes += v;
      }
    });

    if (product.maxLanes != null && usedLanes >= product.maxLanes) {
      alert(
        `You already use ${usedLanes} lanes out of maximum ${product.maxLanes} for this product. You cannot add more designs.`
      );
      return;
    }

    const rowCount = designTableBody.querySelectorAll("tr").length;
    const newRow = createDesignRow({ designNumber: rowCount + 1 });
    designTableBody.appendChild(newRow);
    recalcLabel();
  });

  const firstRow = createDesignRow({ designNumber: 1 });
  designTableBody.appendChild(firstRow);

  recalcLabel();
}

function initFlowpackCalculator() {
  const firstRow = createFlowpackRow({ designNumber: 1 });
  flowpackTableBody.appendChild(firstRow);

  flowpackAddRowBtn.addEventListener("click", () => {
    // check lanes before adding
    let usedLanes = 0;
    document.querySelectorAll(".flowpack-lanes-input").forEach((input) => {
      const v = Number(input.value);
      if (Number.isFinite(v) && v > 0) {
        usedLanes += v;
      }
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

function initJarCalculator() {
  if (!jarProductSelect || !jarCountInput || !jarSummary) return;

  jarProductSelect.addEventListener("change", recalcJars);
  jarCountInput.addEventListener("input", recalcJars);

  jarSummary.innerHTML =
    "<span class='muted'>Enter product type and number of jars to see the calculation.</span>";
}

function initCoronaUv() {
  if (uvSpeedInput) {
    uvAdhesiveSelect.addEventListener("change", computeUvSettings);
    uvSpeedInput.addEventListener("input", computeUvSettings);
    uvModeSelect.addEventListener("change", computeUvSettings);
  }

  if (coronaSpeedInput) {
    coronaMaterialSelect.addEventListener("change", computeCoronaSettings);
    coronaProcessSelect.addEventListener("change", computeCoronaSettings);
    coronaSpeedInput.addEventListener("input", computeCoronaSettings);
    coronaDyneInput.addEventListener("input", computeCoronaSettings);
  }

  uvSummary.innerHTML =
    "<span class='muted'>Enter speed to get a suggested Min Power and Gradient.</span>";
  coronaSummary.innerHTML =
    "<span class='muted'>Enter material, process and speed to get a suggested power.</span>";
}

function init() {
  initTabs();
  initQuickGuide();
  initLabelCalculator();
  initFlowpackCalculator();
  initJarCalculator();
  initCoronaUv();
}

init();
