/* ==========================================================================
   hungariansongbook.com – közös vanilla JS
   1) mobil navigáció + legördülő, 1b) táblázatok telefonon, 1c) YouTube-előnézet,
   2) vásárlói kapu (SHA-256, spec 5.11)
   Nincs külső függőség, nincs build-lépés.
   ========================================================================== */

/* --- 1. Navigáció (mobil hamburger + Learn/Tanulj legördülő) --- */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("open"));
    });
    // Esc bezárja a nyitott mobil menüt
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  // Legördülő almenü (mobilon kattintásra nyílik; desktopon CSS hover kezeli)
  document.querySelectorAll(".dropdown-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const parent = btn.closest(".dropdown");
      if (!parent) return;
      const open = parent.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();

/* --- 1b. Táblázatok telefonon: a sorok kártyákká válnak ---
   A fejléc szövegét data-label-ként a cellákra írjuk; a CSS (.stacked)
   700px alatt ebből rajzol címkéket. JS nélkül marad a vízszintes görgetés. */
(function () {
  document.querySelectorAll(".table-wrap table").forEach(function (table) {
    const labels = [...table.querySelectorAll("thead th")].map(function (th) {
      return th.textContent.trim();
    });
    if (!labels.length) return;
    table.querySelectorAll("tbody tr").forEach(function (tr) {
      [...tr.children].forEach(function (td, i) {
        if (labels[i]) td.setAttribute("data-label", labels[i]);
        // Szám az első cellában (oldalszám): mellé kell a címke, hogy értelmes legyen
        if (i === 0 && /^\d/.test(td.textContent.trim())) td.classList.add("label-inline");
      });
    });
    table.classList.add("stacked");
  });
})();

/* --- 1c. YouTube: könnyű előnézet, a lejátszó csak kattintásra töltődik be ---
   JS nélkül a link egyszerűen megnyitja a videót a YouTube-on. */
(function () {
  document.querySelectorAll("a.yt-lite[data-yt]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // új lapon nyitás maradjon
      e.preventDefault();
      const frame = document.createElement("iframe");
      frame.src =
        "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(link.dataset.yt) +
        "?autoplay=1&rel=0";
      frame.title = link.getAttribute("aria-label") || "YouTube";
      frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      frame.allowFullscreen = true;
      const box = document.createElement("div");
      box.className = "yt-lite playing";
      box.appendChild(frame);
      link.replaceWith(box);
    });
  });
})();

/* --- 2. Vásárlói kapu (For Book Owners / Vásárlói oldal) --- */
/* A hash előállítása terminálban:  echo -n "aszó" | shasum -a 256
   A normalizálás (trim + lowercase) miatt a hash-t is a kisbetűs,
   szóköz-mentes alakból kell generálni. */

// TODO [KAPU-SZÓ]: cseréld le a könyv megadott oldalán/szaván lévő szó
// SHA-256 hash-ére (lásd spec 5.11 + 7. pont). A jelenlegi placeholder
// SOHA nem fog egyezni, így a kapu zárva marad, amíg ki nem töltöd.
const OWNER_HASH = "IDE_JON_A_HASH";

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkWord(input) {
  const norm = input.trim().toLowerCase();
  const hex = await sha256Hex(norm);
  if (hex === OWNER_HASH) {
    unlockOwnerContent();
    localStorage.setItem("owner", "1"); // visszatérőknek
    return true;
  }
  return false;
}

function unlockOwnerContent() {
  const gate = document.getElementById("gate");
  const content = document.getElementById("content");
  if (gate) gate.hidden = true;
  if (content) content.hidden = false;
}

(function () {
  const form = document.getElementById("gate-form");
  if (!form) return; // csak a vásárlói oldalon fut

  // Visszatérő vásárló: ha korábban már belépett, ne kérdezzünk újra.
  if (localStorage.getItem("owner") === "1") {
    unlockOwnerContent();
  }

  const errorEl = document.getElementById("gate-error");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const value = form.querySelector('input[type="text"]').value;
    const ok = await checkWord(value);
    if (!ok && errorEl) {
      // TODO [SZÖVEG]: a hibaüzenetet a data-error attribútumból olvassuk,
      // hogy nyelvenként (EN/HU) eltérő lehessen.
      errorEl.textContent = errorEl.dataset.message || "Try again.";
    }
  });
})();
