// =========================================================
// CANDY JAR CALCULATOR (MIDI / MAXI) – with overrides
// =========================================================

const jarProductSelect = document.getElementById("jarProductSelect");
const jarCountInput = document.getElementById("jarCountInput");
const jarSummary = document.getElementById("jarSummary");

const JAR_OVERRIDES = {
  midi: {
    12: { kg: 2.5, clicks: 30, meters: 25 },
    24: { kg: 4.5, clicks: 30, meters: 25 },
    48: { kg: 9, clicks: 55, meters: 45 },
    96: { kg: 18, clicks: 105, meters: 95 },
    324: { kg: 65, clicks: 305 },
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

const JAR_WRAPPERS_PER_JAR = { midi: 40, maxi: 85 };
const JAR_PIECES_PER_KG = 190;
const JAR_WRAPPERS_PER_CLICK = 48;
const JAR_CLICK_LENGTH_M = 0.976;

function computeJarMeters(clicks) {
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
    const piecesPerJar = JAR_WRAPPERS_PER_JAR[productType];
    const wrappers = jars * piecesPerJar;

    const exactKg = wrappers / JAR_PIECES_PER_KG;
    kg = Math.round(exactKg * 10) / 10;

    const baseClicks = wrappers / JAR_WRAPPERS_PER_CLICK;

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

function initJarCalculator() {
  if (!jarProductSelect || !jarCountInput || !jarSummary) return;

  jarProductSelect.addEventListener("change", recalcJars);
  jarCountInput.addEventListener("input", recalcJars);

  jarSummary.innerHTML =
    "<span class='muted'>Enter product type and number of jars to see the calculation.</span>";
}

window.initJarCalculator = initJarCalculator;
