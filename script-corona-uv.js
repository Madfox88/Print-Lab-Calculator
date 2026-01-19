// =========================================================
// DC330 MINI — CORONA/UV CALCULATOR (v1)
// =========================================================
// Offline, deterministic, no dependencies.
//
// IMPORTANT:
// - This file must contain JavaScript only.
// - It targets the Corona & UV tab markup (dc330* element IDs).
// - It is safe to load even if the Corona & UV markup is not present.

(function () {
  "use strict";

  // ---------------------------------------------
  // Machine limits + warning thresholds
  // ---------------------------------------------
  const machineLimits = {
    speedMin: 0,
    speedMax: 40,
    uvMinMin: 1000,
    uvMinMax: 3000,
    gradientMin: 50,
    gradientMax: 500
  };

  const warningThresholds = {
    // Speed-limited warning
    speedLimitedWattsDanger: 3000, // predicted == 3000
    speedLimitedWattsWarn: 2900, // predicted >= 2900

    // Under-cure risk heuristic (starter)
    lowSpeedMpm: 10, // <= 10 m/min
    lowEnergyWatts: 1400, // <= 1400W

    // Bulb end-of-life margin (guidance only)
    bulbEolExtraPercent: 0.15 // +15%
  };

  // ---------------------------------------------
  // Substrate + coating tables (v1 runnable defaults)
  // ---------------------------------------------
  const substrates = [
    "CA PP UCO White",
    "CA PP UCO Clear",
    "PP Silver FTC 50",
    "PP BlueGray",
    "Forest PE White FTC 85",
    "Forest PE Clear FTC 85",
    "SYN-BOPP White 20",
    "SYN-BOPP Metallic 20",
    "SYN-BOPP Clear 20",
    "SYN-BOPP Mat Peach 20",
    "SYN-BOPP Mat 20"
  ];

  const coatings = [
    "UV Varnish",
    "UV Lamination Adhesive",
    "Cold-foil Adhesive"
  ];

  // Baseline per substrate; coating modifier applied.
  const substrateBaseline = {
    "CA PP UCO White": {
      recommendedGradient: 220,
      recommendedMinUV: 1600,
      notes: "Baseline for coated PP (white). Adjust after cure tests.",
      riskLevel: "medium"
    },
    "CA PP UCO Clear": {
      recommendedGradient: 240,
      recommendedMinUV: 1700,
      notes: "Baseline for coated PP (clear). Clear films can be trickier—watch tack/odor.",
      riskLevel: "medium"
    },
    "PP Silver FTC 50": {
      recommendedGradient: 260,
      recommendedMinUV: 1800,
      notes: "Silver facestock—monitor reflectivity + cure on dense ink/varnish areas.",
      riskLevel: "medium"
    },
    "PP BlueGray": {
      recommendedGradient: 240,
      recommendedMinUV: 1700,
      notes: "Colored PP baseline. Confirm cure on heavy coverage.",
      riskLevel: "medium"
    },
    "Forest PE White FTC 85": {
      recommendedGradient: 280,
      recommendedMinUV: 1900,
      notes: "PE typically needs more surface energy management; verify adhesion/cure.",
      riskLevel: "high"
    },
    "Forest PE Clear FTC 85": {
      recommendedGradient: 300,
      recommendedMinUV: 2000,
      notes: "Clear PE baseline. If bonding issues appear, review corona + adhesive choice.",
      riskLevel: "high"
    },
    "SYN-BOPP White 20": {
      recommendedGradient: 240,
      recommendedMinUV: 1700,
      notes: "SYN-BOPP 20µ white baseline. Refine after your lamp + speed trials.",
      riskLevel: "medium"
    },
    "SYN-BOPP Metallic 20": {
      recommendedGradient: 270,
      recommendedMinUV: 1900,
      notes: "Metallized film can behave differently (reflection/heat). Verify cure carefully.",
      riskLevel: "high"
    },
    "SYN-BOPP Clear 20": {
      recommendedGradient: 250,
      recommendedMinUV: 1800,
      notes: "SYN-BOPP 20µ clear baseline. Watch curl/tack on long runs.",
      riskLevel: "medium"
    },
    "SYN-BOPP Mat Peach 20": {
      recommendedGradient: 260,
      recommendedMinUV: 1900,
      notes: "Matt/peach-touch style: often needs more energy. Validate scuff resistance.",
      riskLevel: "high"
    },
    "SYN-BOPP Mat 20": {
      recommendedGradient: 260,
      recommendedMinUV: 1900,
      notes: "Matt film baseline: validate cure on solid areas and after lamination.",
      riskLevel: "high"
    }
  };

  const coatingModifier = {
    "UV Varnish": { gradientAdd: 0, minUVAdd: 0, noteTag: "Varnish" },
    "UV Lamination Adhesive": {
      gradientAdd: 30,
      minUVAdd: 150,
      noteTag: "Adhesive (lamination)"
    },
    "Cold-foil Adhesive": {
      gradientAdd: 40,
      minUVAdd: 200,
      noteTag: "Adhesive (cold-foil)"
    }
  };

  const defaults = {
    substrate: "CA PP UCO White",
    coating: "UV Varnish",
    jobType: "Production",
    bulbCondition: "New/OK",
    speedMpm: 15,
    overrides: { enabled: false }
  };

  // ---------------------------------------------
  // Helpers
  // ---------------------------------------------
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function roundTo(n, step) {
    return Math.round(n / step) * step;
  }

  function formatValueWithSource(value, source) {
    return source === "manual" ? `${value} (manual)` : String(value);
  }

  function getRecipe(substrate, coating) {
    const base = substrateBaseline[substrate];
    const mod = coatingModifier[coating];
    if (!base || !mod) {
      return {
        recommendedGradient: 250,
        recommendedMinUV: 1800,
        notes: "Default recipe (fallback).",
        riskLevel: "medium"
      };
    }

    return {
      recommendedGradient: base.recommendedGradient + mod.gradientAdd,
      recommendedMinUV: base.recommendedMinUV + mod.minUVAdd,
      notes: `${mod.noteTag}: ${base.notes}`,
      riskLevel: base.riskLevel
    };
  }

  function applyOverrides(recipe, overrides) {
    const uvMinManual = overrides.enabled && typeof overrides.uvMinW === "number";
    const gradManual = overrides.enabled && typeof overrides.gradient === "number";

    return {
      uvMin: {
        value: uvMinManual ? overrides.uvMinW : recipe.recommendedMinUV,
        source: uvMinManual ? "manual" : "recommended"
      },
      gradient: {
        value: gradManual ? overrides.gradient : recipe.recommendedGradient,
        source: gradManual ? "manual" : "recommended"
      }
    };
  }

  function calculate(inputs) {
    // 1) validate speed
    const speed = clamp(inputs.speedMpm, machineLimits.speedMin, machineLimits.speedMax);

    // 2) get recipe
    const recipe = getRecipe(inputs.substrate, inputs.coating);

    // 3) apply overrides
    const applied = applyOverrides(recipe, inputs.overrides);

    // 4) rounding + clamp
    const uvMin = clamp(roundTo(applied.uvMin.value, 100), machineLimits.uvMinMin, machineLimits.uvMinMax);
    const gradient = clamp(roundTo(applied.gradient.value, 10), machineLimits.gradientMin, machineLimits.gradientMax);

    // 5) DC330 model
    const raw = Math.max(uvMin, speed * gradient);
    const predicted = clamp(raw, 0, machineLimits.uvMinMax);

    // 6) warnings
    const warnings = [];

    if (predicted >= warningThresholds.speedLimitedWattsDanger) {
      warnings.push({
        level: "danger",
        message: `Speed-limited: predicted UV hits ${machineLimits.uvMinMax}W. Reduce speed or verify cure at max.`
      });
    } else if (predicted >= warningThresholds.speedLimitedWattsWarn) {
      warnings.push({
        level: "warn",
        message: `Near limit: predicted UV is ${predicted.toFixed(0)}W (≥ ${warningThresholds.speedLimitedWattsWarn}W).`
      });
    }

    if (speed <= warningThresholds.lowSpeedMpm && predicted <= warningThresholds.lowEnergyWatts) {
      warnings.push({
        level: "warn",
        message: `Under-cure risk heuristic: low speed (${speed} m/min) + low predicted power (${predicted.toFixed(0)}W). Consider raising UV Min / Gradient or verify cure.`
      });
    }

    if (inputs.bulbCondition === "Near end-of-life") {
      const extra = Math.round(predicted * warningThresholds.bulbEolExtraPercent);
      warnings.push({
        level: "info",
        message: `Bulb near end-of-life: consider ~+${Math.round(warningThresholds.bulbEolExtraPercent * 100)}% energy margin (≈ +${extra}W) and confirm cure.`
      });
    }

    if (inputs.jobType === "Setup test strip") {
      warnings.push({
        level: "info",
        message: "Setup mode: run a short test strip and confirm cure/adhesion before full production."
      });
    }

    return {
      uvMin: { value: uvMin, source: applied.uvMin.source },
      gradient: { value: gradient, source: applied.gradient.source },
      predictedWatts: predicted,
      notes: recipe.notes,
      warnings
    };
  }

  function renderWarnings(container, warnings) {
    if (!container) return;

    if (!warnings || warnings.length === 0) {
      container.innerHTML = "<span class='muted'>No warnings.</span>";
      return;
    }

    const parts = warnings.map((w) => {
      const color = w.level === "danger" ? "#ff6b6b" : w.level === "warn" ? "#ffd166" : "#4aa3ff";
      return `<div style="margin: 6px 0; padding: 8px 10px; border-left: 4px solid ${color}; background: rgba(255,255,255,0.04); border-radius: 8px;">${w.message}</div>`;
    });

    container.innerHTML = parts.join("");
  }

  function renderNotes(container, recipeNotes, uvMin, grad, speedUsed, predicted) {
    if (!container) return;
    container.innerHTML = `
      <div><strong>Notes:</strong> ${recipeNotes}</div>
      <div class="muted" style="margin-top: 6px;">
        Speed used: <strong>${speedUsed.toFixed(1)}</strong> m/min · Predicted watts: <strong>${predicted.toFixed(0)}</strong>W
      </div>
      <div class="muted" style="margin-top: 4px;">
        UV Min: <strong>${formatValueWithSource(uvMin.value, uvMin.source)}</strong> · Gradient: <strong>${formatValueWithSource(grad.value, grad.source)}</strong>
      </div>
    `;
  }

  // ---------------------------------------------
  // UI wiring
  // ---------------------------------------------
  function getEls() {
    return {
      uvTabBtn: document.getElementById("dc330UvTabBtn"),
      coronaTabBtn: document.getElementById("dc330CoronaTabBtn"),
      uvPanel: document.getElementById("dc330UvPanel"),
      coronaPanel: document.getElementById("dc330CoronaPanel"),

      speed: document.getElementById("dc330SpeedInput"),
      substrate: document.getElementById("dc330SubstrateSelect"),
      coating: document.getElementById("dc330CoatingSelect"),
      jobType: document.getElementById("dc330JobTypeSelect"),
      bulb: document.getElementById("dc330BulbSelect"),
      overridesEnabled: document.getElementById("dc330OverridesEnabled"),
      overrideMin: document.getElementById("dc330OverrideMin"),
      overrideGradient: document.getElementById("dc330OverrideGradient"),
      resetBtn: document.getElementById("dc330ResetBtn"),

      outMin: document.getElementById("dc330OutMin"),
      outGrad: document.getElementById("dc330OutGradient"),
      outWatts: document.getElementById("dc330OutWatts"),
      warnings: document.getElementById("dc330Warnings"),
      notes: document.getElementById("dc330Notes"),
      coronaGuidelines: document.getElementById("dc330CoronaGuidelines")
    };
  }

  function setPanel(which) {
    const els = getEls();
    if (!els.uvPanel || !els.coronaPanel) return;

    const uvOn = which === "uv";
    els.uvPanel.style.display = uvOn ? "" : "none";
    els.coronaPanel.style.display = uvOn ? "none" : "";
  }

  function recalc() {
    const els = getEls();
    if (!els.speed || !els.substrate || !els.coating) return;

    const speedVal = Number(els.speed.value);
    const speed = Number.isFinite(speedVal) ? speedVal : defaults.speedMpm;

    const overrides = {
      enabled: !!els.overridesEnabled && els.overridesEnabled.checked,
      uvMinW: undefined,
      gradient: undefined
    };

    const oMinVal = els.overrideMin ? Number(els.overrideMin.value) : NaN;
    if (Number.isFinite(oMinVal)) overrides.uvMinW = oMinVal;

    const oGradVal = els.overrideGradient ? Number(els.overrideGradient.value) : NaN;
    if (Number.isFinite(oGradVal)) overrides.gradient = oGradVal;

    const inputs = {
      speedMpm: speed,
      substrate: els.substrate.value || defaults.substrate,
      coating: els.coating.value || defaults.coating,
      jobType: els.jobType ? els.jobType.value : defaults.jobType,
      bulbCondition: els.bulb ? els.bulb.value : defaults.bulbCondition,
      overrides
    };

    const res = calculate(inputs);

    if (els.outMin) els.outMin.textContent = formatValueWithSource(res.uvMin.value, res.uvMin.source);
    if (els.outGrad) els.outGrad.textContent = formatValueWithSource(res.gradient.value, res.gradient.source);
    if (els.outWatts) els.outWatts.textContent = res.predictedWatts.toFixed(0);

    renderWarnings(els.warnings, res.warnings);
    renderNotes(els.notes, res.notes, res.uvMin, res.gradient, clamp(inputs.speedMpm, 0, 40), res.predictedWatts);
  }

  function applyDefaults() {
    const els = getEls();
    if (!els.speed || !els.substrate || !els.coating) return;

    els.speed.value = String(defaults.speedMpm);
    els.substrate.value = defaults.substrate;
    els.coating.value = defaults.coating;
    if (els.jobType) els.jobType.value = defaults.jobType;
    if (els.bulb) els.bulb.value = defaults.bulbCondition;

    if (els.overridesEnabled) els.overridesEnabled.checked = false;
    if (els.overrideMin) els.overrideMin.value = "";
    if (els.overrideGradient) els.overrideGradient.value = "";

    recalc();
  }

  function initCoronaUvCalculator() {
    const els = getEls();

    // If this calculator's DOM isn't present, do nothing.
    if (!els.speed || !els.substrate || !els.coating) return;

    // Populate selects
    els.substrate.innerHTML = substrates
      .map((s) => `<option value="${s}">${s}</option>`)
      .join("");
    els.coating.innerHTML = coatings
      .map((c) => `<option value="${c}">${c}</option>`)
      .join("");

    // Corona guideline bullets (v1 informational)
    if (els.coronaGuidelines) {
      const bullets = [
        "Corona treatment helps adhesion on low surface-energy films (PP/PE) before coating/lamination.",
        "Confirm surface energy with dyne pens before critical jobs.",
        "Corona effect can decay quickly (often within 24–48 hours); re-treat if the roll is old or handled.",
        "Treat just before coating/adhesive when possible.",
        "Watch for contamination (silicone, slip additives, dust) — corona won’t fix dirty film.",
        "If bonding issues persist, review adhesive/coating choice and verify UV cure.",
        "Run a short test strip and do a quick tape/adhesion check before full production."
      ];
      els.coronaGuidelines.innerHTML = bullets
        .map((b) => `<li style="margin: 6px 0;">${b}</li>`)
        .join("");
    }

    // Defaults
    applyDefaults();

    // Listeners
    els.speed.addEventListener("input", recalc);
    els.substrate.addEventListener("change", recalc);
    els.coating.addEventListener("change", recalc);

    if (els.jobType) els.jobType.addEventListener("change", recalc);
    if (els.bulb) els.bulb.addEventListener("change", recalc);
    if (els.overridesEnabled) els.overridesEnabled.checked = false;

    if (els.overridesEnabled) els.overridesEnabled.addEventListener("change", recalc);
    if (els.overrideMin) els.overrideMin.addEventListener("input", recalc);
    if (els.overrideGradient) els.overrideGradient.addEventListener("input", recalc);
    if (els.resetBtn) els.resetBtn.addEventListener("click", applyDefaults);

    if (els.uvTabBtn) els.uvTabBtn.addEventListener("click", () => setPanel("uv"));
    if (els.coronaTabBtn) els.coronaTabBtn.addEventListener("click", () => setPanel("corona"));

    // Start on UV panel
    setPanel("uv");
  }

  // Expose init (and keep backwards compatibility)
  window.initCoronaUvCalculator = initCoronaUvCalculator;
  window.initCoronaUv = initCoronaUvCalculator;

  // Self-init on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCoronaUvCalculator);
  } else {
    initCoronaUvCalculator();
  }
})();
