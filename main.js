(() => {
  const $ = (s) => document.querySelector(s);
  const ul = (a) => `<ul>${a.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  const box = $("#methods"),
    status = $("#fstatus");
  function renderMethods(f = "todos") {
    const items =
      f === "todos" ? METHODS : METHODS.filter((m) => m.category === f);
    box.innerHTML = items
      .map(
        (m) => `
      <li><details>
        <summary>
          <span class="m-name">${m.name}</span>
          <span class="m-desc">${m.desc}</span>
          <span class="m-cat">${m.categoryLabel}</span>
        </summary>
        <div class="m-body">
          <div><h3>Como funciona</h3><p>${m.how}</p><h3>Eficácia aproximada</h3><p>${m.efficacyLabel}</p></div>
          <div><h3>Vantagens</h3>${ul(m.advantages)}<h3>Limitações</h3>${ul(m.limitations)}</div>
          <div class="full m-warn"><h3>Informação importante</h3><p>${m.important}</p></div>
        </div>
      </details></li>`,
      )
      .join("");
    status.textContent = `${items.length} métodos exibidos`;
  }
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    document
      .querySelectorAll("#filters button")
      .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    renderMethods(b.dataset.f);
  });

  $("#cmpBody").innerHTML = COMPARE_ROWS.map(
    (r) => `
    <tr><th scope="row">${r.name}</th><td>${r.type}</td><td>${r.duration}</td><td>${r.frequent}</td>
    <td class="${r.ist ? "yes" : ""}">${r.ist ? "Sim" : "Não"}</td><td>${r.efficacy}</td><td>${r.followup}</td></tr>`,
  ).join("");

  const acc = (items, v) =>
    items
      .map(
        (i) => `
    <details><summary>${i.q}</summary>
      <div class="ans">${v ? `<span class="verdict ${i.verdict}">${i.verdict === "mito" ? "Mito" : "Verdade"}</span>` : ""}<p>${i.a}</p></div>
    </details>`,
      )
      .join("");
  $("#myths").innerHTML = acc(MYTHS, true);
  $("#faqList").innerHTML = acc(FAQ, false);

  const nav = $("#nav"),
    btn = $("#menuBtn");
  const setNav = (o) => {
    nav.classList.toggle("open", o);
    btn.setAttribute("aria-expanded", String(o));
  };
  btn.addEventListener("click", () => setNav(!nav.classList.contains("open")));
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setNav(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setNav(false);
      btn.focus();
    }
  });

  $("#year").textContent = new Date().getFullYear();
  renderMethods();
})();
