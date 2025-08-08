document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  let pending = includes.length;

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
        // Khi tất cả include đã xong, import nav-scroll
        import('./nav-scroll.js')
          .then(mod => {
            if (typeof mod.initNavScroll === 'function') {
              // Đợi một chút để đảm bảo navbar được render hoàn toàn
              setTimeout(() => {
                mod.initNavScroll();
              }, 100);
            } else {
              console.error("initNavScroll() not found in nav-scroll.js");
            }
          })
          .catch(err => console.error("Failed to load nav-scroll.js", err));

        import('./search-typewriter.js')
          .then(mod => {
            if (typeof mod.initSearchTypewriter === 'function') {
              mod.initSearchTypewriter();
            } else {
              console.error("initSearchTypewriter() not found in search-typewriter.js");
            }
          })
          .catch(err => console.error("Failed to load search-typewriter.js", err));
      }
    }
  });
});
