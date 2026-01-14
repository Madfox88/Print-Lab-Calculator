// =========================================================
// LABEL PRINT CALCULATOR
// =========================================================

// Product configuration for LABEL calculator
const PRODUCT_CONFIG = [
  { id: "p196x48", label: "Penta-Petit 196 x 48 mm", maxLanes: 6, labelsPerClick: 4, extraClicks: 18 },
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
  { id: "Dolu_52x201", label: "Dolu 52 x 201 mm", maxLanes: 5, labelsPerClick: 20, extraClicks: 18 },
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

function getSelectedProduct() {
  const id = productSelect.value;
  return PRODUCT_CONFIG.find((p) => p.id === id);
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

  // Keep max attribute in sync with selected product
  const currentProduct = getSelectedProduct();
  if (currentProduct && currentProduct.maxLanes != null) {
    inputLanes.max = String(currentProduct.maxLanes);
  }

  // --- NEW: Max button next to lane input (Label Print Calculator only) ---
  const maxBtn = document.createElement("button");
  maxBtn.type = "button";
  maxBtn.textContent = "Max";
  maxBtn.classList.add("btn-secondary");
  maxBtn.setAttribute("aria-label", "Set lanes to maximum for current product");

  // Use inline layout so we don't have to touch style.css
  const lanesWrap = document.createElement("div");
  lanesWrap.style.display = "flex";
  lanesWrap.style.gap = "8px";
  lanesWrap.style.alignItems = "center";

  lanesWrap.appendChild(inputLanes);
  lanesWrap.appendChild(maxBtn);

  maxBtn.addEventListener("click", () => {
    const product = getSelectedProduct();
    if (!product || product.maxLanes == null) return;

    // Set this lane input to maxLanes and trigger the same recalculation path as typing
    inputLanes.value = String(product.maxLanes);
    inputLanes.dispatchEvent(new Event("input", { bubbles: true }));
  });
  // --- END NEW ---

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("btn-danger");

  tdTotal.appendChild(inputTotal);
  tdLanes.appendChild(lanesWrap);
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
    let requestedLanes = clampLanes(lanesInput.value, null);

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

  let globalClamped = false;
  let remainingLanes = product.maxLanes != null ? product.maxLanes : Infinity;

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

  rowInfos.forEach((info) => {
    const lanes = info.effectiveLanes;
    const totalLabels = info.totalLabels;

    if (!Number.isFinite(totalLabels) || totalLabels <= 0 || lanes <= 0) return;

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
      Extra setup clicks: <strong>${extraClicks}</strong> (≈ ${formatNumber(extraLabels)} extra labels)
    `;

    summaryHtml = `
      Total lanes in this job: <strong>${laneEntries.length}</strong><br />
      Max need on any lane: <strong>${formatNumber(maxRequired)}</strong> labels<br />
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
        <strong>Total clicks to print (rounded up to next 10):</strong> ${formatNumber(totalClicks)}
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

function initLabelCalculator() {
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

    let usedLanes = 0;
    document.querySelectorAll(".design-lanes-input").forEach((input) => {
      const v = Number(input.value);
      if (Number.isFinite(v) && v > 0) usedLanes += v;
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

// expose init for script-init.js
window.initLabelCalculator = initLabelCalculator;
