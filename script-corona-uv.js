// =========================================================
// CORONA & UV CALCULATORS
// =========================================================

// ---------- UV ----------
const UV_ADHESIVES = [
  {
    id: "FPC406",
    name: "FPC 406 (standard)",
    referenceSpeed: 120,
    referencePower: 80,
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

  const clampedSpeed = Math.min(
    adhesive.speedLimitMax,
    Math.max(adhesive.speedLimitMin, speed)
  );

  let factor = 1;
  if (mode === "eco") factor = adhesive.ecoFactor;
  else if (mode === "strong") factor = adhesive.strongFactor;

  const targetPowerAtRef = adhesive.referencePower * factor;
  const gradient = targetPowerAtRef / adhesive.referenceSpeed;
  const rawPower = clampedSpeed * gradient;

  let uvPower = Math.min(
    adhesive.maxPercent,
    Math.max(adhesive.minPercent, rawPower)
  );
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

const PROCESS_TARGET_DYNE = {
  printing: {
    paper: { min: 0, max: 0 },
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

  const basePercent = 35;
  const speedTerm = speed * 0.05;
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

  if (uvSummary) {
    uvSummary.innerHTML =
      "<span class='muted'>Enter speed to get a suggested Min Power and Gradient.</span>";
  }
  if (coronaSummary) {
    coronaSummary.innerHTML =
      "<span class='muted'>Enter material, process and speed to get a suggested power.</span>";
  }
}

window.initCoronaUv = initCoronaUv;
