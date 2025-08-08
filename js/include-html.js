document.addEventListener("DOMContentLoaded", () => {
  // Include HTML files
  includeHTMLFiles();
});

async function includeHTMLFiles() {
  const includes = document.querySelectorAll("[data-include]");
  let pending = includes.length;

  if (pending === 0) {
    // Nếu không có file nào cần include, khởi tạo modules ngay
    initializeModules();
    return;
  }

  includes.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Cannot fetch ${file}`);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error("Include error:", err);
      el.innerHTML = "<!-- Failed to load include: " + file + " -->";
    } finally {
      pending--;
      if (pending === 0) {
        // Khi tất cả include đã xong, khởi tạo modules
        initializeModules();
      }
    }
  });
}

async function initializeModules() {
  try {
    // Sử dụng module manager để khởi tạo các module
    const { initializeModulesWithDelay } = await import('./module-manager.js');
    await initializeModulesWithDelay(100);
  } catch (err) {
    console.error("Failed to initialize modules:", err);
  }
}
