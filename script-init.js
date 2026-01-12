// =========================================================
// TABS + INIT
// =========================================================

function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".tab-panel").forEach((panel) => {
        if (panel.id === targetId) panel.classList.add("active");
        else panel.classList.remove("active");
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

function init() {
  initTabs();
  initQuickGuide();

  if (window.initLabelCalculator) window.initLabelCalculator();
  if (window.initFlowpackCalculator) window.initFlowpackCalculator();
  if (window.initJarCalculator) window.initJarCalculator();
  if (window.initCoronaUv) window.initCoronaUv();
}

init();
