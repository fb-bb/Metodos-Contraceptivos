/* =========================================================
   ENTENDA — Interações (depende de data.js)
========================================================= */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const icon = (key) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">${ICONS[key] || ""}</svg>`;
  const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  /* ---------- Métodos ---------- */
  const grid = $("#methodsGrid");
  const status = $("#filterStatus");

  function renderMethods(filter = "todos") {
    if (!grid) return;
    const items = filter === "todos" ? METHODS : METHODS.filter((m) => m.category === filter);
    grid.innerHTML = items.map((m) => `
      <article class="method-card">
        <div class="method-card-top">
          <span class="method-icon">${icon(m.icon)}</span>
          <span class="method-category">${m.categoryLabel}</span>
        </div>
        <h3>${m.name}</h3>
        <p class="method-desc">${m.desc}</p>
        <div class="method-meta">
          <span>Eficácia</span>
          <span class="efficacy-bar" role="img" aria-label="Eficácia aproximada: ${m.efficacy}%">
            <span class="efficacy-fill" style="width:${m.efficacy}%"></span>
          </span>
        </div>
        <button type="button" class="btn btn-small" data-method="${m.id}" aria-label="Saiba mais sobre ${m.name}">Saiba mais</button>
      </article>`).join("");
    if (status) status.textContent = `${items.length} métodos exibidos`;
  }

  const modal = $("#methodModal");
  const modalContent = $("#modalContent");

  function openMethod(id) {
    const m = METHODS.find((x) => x.id === id);
    if (!m || !modalContent || !modal) return;
    modalContent.innerHTML = `
      <span class="modal-tag">${m.categoryLabel}</span>
      <h2 id="modalTitle" class="modal-title">${m.name}</h2>
      <div class="modal-body">
        <p>${m.desc}</p>
        <h3>Como funciona</h3><p>${m.how}</p>
        <h3>Eficácia aproximada</h3><p>${m.efficacyLabel}</p>
        <h3>Vantagens</h3>${list(m.advantages)}
        <h3>Limitações</h3>${list(m.limitations)}
        <h3>Informação importante</h3><p>${m.important}</p>
      </div>`;
    modal.showModal();
    modal.scrollTop = 0;
  }

  if (grid) {
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-method]");
      if (btn) openMethod(btn.dataset.method);
    });
  }
  
  if (modal) {
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
  }

  const filterTabs = $("#filterTabs");
  if (filterTabs) {
    filterTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".filter-tab");
      if (!tab) return;
      $$(".filter-tab").forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-pressed", String(active));
      });
      renderMethods(tab.dataset.filter);
    });
  }

  /* ---------- Tabela comparativa ---------- */
  const compareBody = $("#compareBody");
  if (compareBody) {
    compareBody.innerHTML = COMPARE_ROWS.map((r) => `
      <tr>
        <th scope="row">${r.name}</th>
        <td>${r.type}</td>
        <td>${r.duration}</td>
        <td>${r.frequent}</td>
        <td class="${r.ist ? "tag-yes" : "tag-no"}">${r.ist ? "Sim" : "Não"}</td>
        <td>${r.efficacy}</td>
        <td>${r.followup}</td>
      </tr>`).join("");
  }

  /* ---------- Acordeões ---------- */
  const accordion = (items, badge) => items.map((item) => `
    <details class="acc-item">
      <summary><span>${item.q}</span><span class="acc-icon" aria-hidden="true"></span></summary>
      <div class="acc-body">
        ${badge ? `<span class="verdict verdict-${item.verdict}">${item.verdict === "mito" ? "Mito" : "Verdade"}</span>` : ""}
        <p>${item.a}</p>
      </div>
    </details>`).join("");

  const mythsList = $("#mythsList");
  if (mythsList) mythsList.innerHTML = accordion(MYTHS, true);

  const faqList = $("#faqList");
  if (faqList) faqList.innerHTML = accordion(FAQ, false);

  /* ---------- Menu mobile ---------- */
  const navToggle = $("#navToggle");
  const mainNav = $("#mainNav");

  if (navToggle && mainNav) {
    function setNav(open) {
      mainNav.classList.toggle("is-open", open);
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    }
    navToggle.addEventListener("click", () => setNav(!mainNav.classList.contains("is-open")));
    mainNav.addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("is-open")) { setNav(false); navToggle.focus(); }
    });
  }

  /* ---------- Rodapé e inicialização ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  renderMethods();
})();
