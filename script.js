// =========================================================
// ENTENDA — dados estruturados e interações
// Eficácias aproximadas, uso correto e consistente, com base
// em dados amplamente publicados por OMS/CDC. Valores typical-use
// (uso comum) tendem a ser mais baixos — sempre indicado como aproximado.
// =========================================================

const METHODS = [
  {
    id: "camisinha-externa",
    category: "barreira",
    categoryLabel: "Barreira",
    name: "Preservativo externo (camisinha masculina)",
    icon: "condom",
    desc: "Barreira de látex ou poliuretano colocada no pênis antes da relação sexual.",
    how: "Impede o contato direto entre a pele e a troca de fluidos, retendo o sêmen e evitando que espermatozoides alcancem o óvulo.",
    efficacy: 85,
    efficacyLabel: "~85% no uso típico / ~98% no uso correto e consistente",
    advantages: ["Também reduz o risco de ISTs", "Não exige prescrição médica", "Sem efeitos hormonais", "Baixo custo e fácil acesso"],
    limitations: ["Eficácia depende do uso correto em toda relação", "Pode romper se usado de forma inadequada", "Alergia ao látex em alguns casos (existem opções sem látex)"],
    important: "Deve ser usado em todas as relações, do início ao fim, com armazenamento adequado (longe de calor e luz)."
  },
  {
    id: "camisinha-interna",
    category: "barreira",
    categoryLabel: "Barreira",
    name: "Preservativo interno (camisinha feminina)",
    icon: "condom",
    desc: "Barreira flexível inserida na vagina antes da relação sexual.",
    how: "Reveste as paredes vaginais, impedindo o contato entre espermatozoides e o colo do útero.",
    efficacy: 79,
    efficacyLabel: "~79% no uso típico / ~95% no uso correto e consistente",
    advantages: ["Reduz risco de ISTs", "Pode ser inserida com antecedência", "Controlada por quem a utiliza"],
    limitations: ["Menos disponível que a camisinha externa", "Curva de aprendizado para inserção", "Custo geralmente mais alto"],
    important: "Não deve ser usada ao mesmo tempo que o preservativo externo, pois o atrito pode causar deslizamento de ambos."
  },
  {
    id: "diafragma",
    category: "barreira",
    categoryLabel: "Barreira",
    name: "Diafragma",
    icon: "shield",
    desc: "Disco flexível de silicone posicionado sobre o colo do útero antes da relação.",
    how: "Cria uma barreira física que bloqueia a entrada de espermatozoides no útero; geralmente usado com espermicida.",
    efficacy: 88,
    efficacyLabel: "~88% no uso típico com espermicida",
    advantages: ["Reutilizável", "Sem hormônios", "Pode ser inserido horas antes da relação"],
    limitations: ["Não protege contra ISTs", "Requer ajuste de tamanho por profissional", "Precisa permanecer no local por algumas horas após a relação"],
    important: "O tamanho deve ser reavaliado após parto ou mudanças significativas de peso."
  },
  {
    id: "pilula-combinada",
    category: "hormonal",
    categoryLabel: "Hormonal",
    name: "Pílula anticoncepcional combinada",
    icon: "pill",
    desc: "Comprimido diário com estrogênio e progestagênio.",
    how: "Impede a ovulação e espessa o muco cervical, dificultando a passagem dos espermatozoides.",
    efficacy: 91,
    efficacyLabel: "~91% no uso típico / ~99% no uso correto e consistente",
    advantages: ["Pode regular o ciclo menstrual", "Reduz cólicas em muitos casos", "Reversível rapidamente ao interromper"],
    limitations: ["Não protege contra ISTs", "Exige uso diário no mesmo horário", "Contraindicada em algumas condições de saúde (ex.: certos riscos cardiovasculares)"],
    important: "A prescrição deve considerar histórico de saúde, incluindo tabagismo e risco de trombose."
  },
  {
    id: "minipilula",
    category: "hormonal",
    categoryLabel: "Hormonal",
    name: "Minipílula (só progestagênio)",
    icon: "pill",
    desc: "Comprimido diário contendo apenas progestagênio, indicado inclusive na amamentação.",
    how: "Espessa o muco cervical e, em muitos casos, inibe a ovulação.",
    efficacy: 91,
    efficacyLabel: "~91% no uso típico / ~99% no uso correto e consistente",
    advantages: ["Opção para quem não pode usar estrogênio", "Compatível com amamentação"],
    limitations: ["Exige horário rígido de uso, com pouca margem de atraso", "Pode causar sangramento irregular"],
    important: "O atraso na tomada reduz a eficácia mais do que na pílula combinada."
  },
  {
    id: "adesivo",
    category: "hormonal",
    categoryLabel: "Hormonal",
    name: "Adesivo transdérmico",
    icon: "patch",
    desc: "Adesivo hormonal trocado semanalmente, aplicado na pele.",
    how: "Libera hormônios continuamente através da pele para impedir a ovulação.",
    efficacy: 91,
    efficacyLabel: "~91% no uso típico / ~99% no uso correto e consistente",
    advantages: ["Não exige tomada diária", "Fácil de aplicar e trocar"],
    limitations: ["Não protege contra ISTs", "Pode causar irritação na pele", "Menos eficaz em pessoas com peso corporal elevado, segundo bulas"],
    important: "Deve ser trocado no dia certo da semana para manter a eficácia."
  },
  {
    id: "anel-vaginal",
    category: "hormonal",
    categoryLabel: "Hormonal",
    name: "Anel vaginal",
    icon: "ring",
    desc: "Anel flexível inserido na vagina, que permanece por três semanas.",
    how: "Libera hormônios localmente para impedir a ovulação.",
    efficacy: 91,
    efficacyLabel: "~91% no uso típico / ~99% no uso correto e consistente",
    advantages: ["Uso mensal, não diário", "Pode ser inserido e removido pela própria usuária"],
    limitations: ["Não protege contra ISTs", "Pode causar desconforto em algumas pessoas"],
    important: "Se sair do lugar por mais de três horas, a eficácia pode ser reduzida — consulte a bula."
  },
  {
    id: "injetavel",
    category: "hormonal",
    categoryLabel: "Hormonal",
    name: "Injetável (mensal ou trimestral)",
    icon: "injection",
    desc: "Aplicação de hormônios por via intramuscular, feita por profissional de saúde.",
    how: "Impede a ovulação por um período determinado, dependendo da formulação.",
    efficacy: 94,
    efficacyLabel: "~94% no uso típico / ~99% no uso correto e consistente",
    advantages: ["Não exige lembrança diária", "Boa opção para quem esquece comprimidos"],
    limitations: ["Requer retorno periódico ao serviço de saúde", "Retorno da fertilidade pode demorar após interrupção, principalmente na versão trimestral"],
    important: "Atrasos na aplicação da dose seguinte reduzem a proteção."
  },
  {
    id: "diu-cobre",
    category: "intrauterino",
    categoryLabel: "Intrauterino",
    name: "DIU de cobre",
    icon: "iud",
    desc: "Dispositivo intrauterino sem hormônios, inserido por profissional de saúde.",
    how: "O cobre altera o ambiente uterino, dificultando a movimentação e a sobrevivência dos espermatozoides.",
    efficacy: 99,
    efficacyLabel: ">99% — um dos métodos reversíveis mais eficazes",
    advantages: ["Longa duração (até 10 anos, conforme o modelo)", "Sem hormônios", "Reversível a qualquer momento"],
    limitations: ["Não protege contra ISTs", "Pode aumentar o fluxo menstrual e as cólicas em alguns casos", "Inserção e remoção exigem profissional"],
    important: "Deve ser inserido por profissional treinado; consultas de acompanhamento são recomendadas."
  },
  {
    id: "diu-hormonal",
    category: "intrauterino",
    categoryLabel: "Intrauterino",
    name: "DIU hormonal (levonorgestrel)",
    icon: "iud",
    desc: "Dispositivo intrauterino que libera progestagênio localmente.",
    how: "Espessa o muco cervical e afina o endométrio, além de poder inibir a ovulação em algumas pessoas.",
    efficacy: 99,
    efficacyLabel: ">99% — um dos métodos reversíveis mais eficazes",
    advantages: ["Pode reduzir significativamente o fluxo menstrual", "Longa duração (3 a 8 anos, conforme o modelo)", "Reversível"],
    limitations: ["Não protege contra ISTs", "Pode causar sangramento irregular nos primeiros meses"],
    important: "A inserção deve ser feita por profissional de saúde qualificado."
  },
  {
    id: "implante",
    category: "hormonal",
    categoryLabel: "Hormonal",
    name: "Implante subdérmico",
    icon: "implant",
    desc: "Bastonete flexível inserido sob a pele do braço, liberando progestagênio.",
    how: "Impede a ovulação e espessa o muco cervical por até três anos.",
    efficacy: 99,
    efficacyLabel: ">99% — um dos métodos reversíveis mais eficazes",
    advantages: ["Longa duração sem necessidade de lembrar do uso", "Reversível pela remoção"],
    limitations: ["Não protege contra ISTs", "Pode causar sangramento irregular", "Inserção e remoção exigem procedimento simples com profissional"],
    important: "A remoção só deve ser feita por profissional treinado, para evitar complicações."
  },
  {
    id: "laqueadura",
    category: "permanente",
    categoryLabel: "Permanente",
    name: "Laqueadura tubária",
    icon: "surgery",
    desc: "Procedimento cirúrgico que interrompe ou bloqueia as trompas de Falópio.",
    how: "Impede que o óvulo encontre o espermatozoide, interrompendo o trajeto nas trompas.",
    efficacy: 99,
    efficacyLabel: ">99% — método permanente",
    advantages: ["Efeito definitivo, sem necessidade de manutenção"],
    limitations: ["Reversão é difícil, cara e nem sempre bem-sucedida", "Não protege contra ISTs", "Requer procedimento cirúrgico e recuperação"],
    important: "No Brasil, a legislação estabelece critérios específicos de idade, número de filhos ou intervalo de tempo para a realização do procedimento."
  },
  {
    id: "vasectomia",
    category: "permanente",
    categoryLabel: "Permanente",
    name: "Vasectomia",
    icon: "surgery",
    desc: "Procedimento cirúrgico simples que interrompe os ductos deferentes.",
    how: "Impede que os espermatozoides produzidos nos testículos cheguem ao sêmen ejaculado.",
    efficacy: 99,
    efficacyLabel: ">99% — método permanente",
    advantages: ["Procedimento ambulatorial, geralmente rápido", "Efeito definitivo"],
    limitations: ["Não é imediato: exige exame de confirmação após alguns meses", "Reversão é difícil e nem sempre eficaz", "Não protege contra ISTs"],
    important: "É necessário usar outro método até a confirmação, por exame, da ausência de espermatozoides no sêmen."
  },
  {
    id: "tabelinha",
    category: "comportamental",
    categoryLabel: "Comportamental",
    name: "Método do ritmo (tabelinha)",
    icon: "calendar",
    desc: "Identificação do período fértil com base no histórico do ciclo menstrual.",
    how: "Evita relações sem proteção adicional durante os dias considerados mais férteis do ciclo.",
    efficacy: 76,
    efficacyLabel: "~76% no uso típico",
    advantages: ["Sem custos ou efeitos hormonais", "Pode ajudar a entender melhor o próprio ciclo"],
    limitations: ["Exige ciclos regulares para maior precisão", "Alta taxa de falha no uso comum", "Não protege contra ISTs"],
    important: "Costuma ser mais eficaz quando combinado a outros sinais corporais (temperatura basal, muco cervical) e orientação especializada."
  },
  {
    id: "sintotermico",
    category: "comportamental",
    categoryLabel: "Comportamental",
    name: "Método sintotérmico",
    icon: "calendar",
    desc: "Combina observação da temperatura basal, muco cervical e calendário menstrual.",
    how: "Cruza diferentes sinais do corpo para identificar com mais precisão o período fértil.",
    efficacy: 88,
    efficacyLabel: "~76 a 88% no uso típico, variando conforme a consistência do acompanhamento",
    advantages: ["Sem hormônios ou dispositivos", "Aumenta o autoconhecimento sobre o ciclo"],
    limitations: ["Exige disciplina diária de registro", "Curva de aprendizado inicial, idealmente com orientação profissional", "Não protege contra ISTs"],
    important: "Recomenda-se aprender o método com um profissional treinado antes de utilizá-lo como única proteção."
  },
  {
    id: "coito-interrompido",
    category: "comportamental",
    categoryLabel: "Comportamental",
    name: "Coito interrompido",
    icon: "calendar",
    desc: "Retirada do pênis da vagina antes da ejaculação.",
    how: "Tenta evitar que o sêmen entre em contato com a vagina.",
    efficacy: 78,
    efficacyLabel: "~78% no uso típico",
    advantages: ["Não tem custo", "Não exige planejamento prévio"],
    limitations: ["Alta margem de erro humano", "Fluido pré-ejaculatório pode conter espermatozoides", "Não protege contra ISTs"],
    important: "É considerado um dos métodos menos confiáveis entre os comportamentais."
  }
];

const COMPARE_ROWS = [
  { name: "Preservativo externo", type: "Barreira", duration: "Uso único, por relação", frequent: "Sim, a cada relação", ist: true, efficacy: "85–98%", followup: "Não" },
  { name: "Pílula combinada", type: "Hormonal", duration: "Diária", frequent: "Sim, diariamente", ist: false, efficacy: "91–99%", followup: "Sim, prescrição médica" },
  { name: "Adesivo / anel vaginal", type: "Hormonal", duration: "Semanal / mensal", frequent: "Troca periódica", ist: false, efficacy: "91–99%", followup: "Sim, prescrição médica" },
  { name: "Injetável", type: "Hormonal", duration: "1 a 3 meses por dose", frequent: "Aplicação periódica", ist: false, efficacy: "94–99%", followup: "Sim, aplicação profissional" },
  { name: "DIU de cobre", type: "Intrauterino", duration: "Até 10 anos", frequent: "Não", ist: false, efficacy: ">99%", followup: "Sim, inserção e checagens" },
  { name: "DIU hormonal", type: "Intrauterino", duration: "3 a 8 anos", frequent: "Não", ist: false, efficacy: ">99%", followup: "Sim, inserção e checagens" },
  { name: "Implante subdérmico", type: "Hormonal", duration: "Até 3 anos", frequent: "Não", ist: false, efficacy: ">99%", followup: "Sim, inserção e remoção" },
  { name: "Laqueadura", type: "Permanente", duration: "Definitiva", frequent: "Não", ist: false, efficacy: ">99%", followup: "Sim, cirurgia" },
  { name: "Vasectomia", type: "Permanente", duration: "Definitiva", frequent: "Não", ist: false, efficacy: ">99%", followup: "Sim, cirurgia e exame de confirmação" },
  { name: "Método do ritmo", type: "Comportamental", duration: "Contínuo, por ciclo", frequent: "Sim, registro diário", ist: false, efficacy: "~76%", followup: "Recomendado" },
];

const MYTHS = [
  {
    q: "Todo método contraceptivo protege contra ISTs?",
    verdict: "mito",
    a: "Não. Apenas métodos de barreira, como a camisinha externa e a interna, reduzem o risco de infecções sexualmente transmissíveis. Métodos hormonais, DIU e métodos comportamentais não oferecem essa proteção."
  },
  {
    q: "A eficácia é igual para todos os métodos?",
    verdict: "mito",
    a: "Não. A eficácia varia bastante entre métodos e também entre 'uso correto e consistente' e 'uso típico' (do dia a dia, com possíveis falhas humanas). Métodos como DIU e implante têm menos dependência do uso diário e, por isso, tendem a apresentar eficácia mais estável."
  },
  {
    q: "É possível escolher qualquer método sem orientação profissional?",
    verdict: "mito",
    a: "Não é recomendado. Condições de saúde, histórico familiar, uso de medicamentos e outros fatores individuais podem tornar alguns métodos mais ou menos indicados. Um profissional de saúde ajuda a avaliar riscos e benefícios para o seu caso."
  },
  {
    q: "Métodos contraceptivos são todos hormonais?",
    verdict: "mito",
    a: "Não. Existem métodos de barreira, o DIU de cobre (sem hormônios), métodos comportamentais e métodos permanentes que não utilizam hormônios. A escolha de usar ou não hormônios pode ser conversada com um profissional de saúde."
  },
  {
    q: "Depois de parar de tomar a pílula, a fertilidade volta rapidamente?",
    verdict: "verdade",
    a: "Na maioria dos casos, sim — a fertilidade tende a retornar logo após a interrupção da pílula combinada ou da minipílula. Em métodos injetáveis trimestrais, esse retorno pode demorar mais."
  },
  {
    q: "O DIU pode ser usado por quem nunca teve filhos?",
    verdict: "verdade",
    a: "Sim. Atualmente, diretrizes de saúde reconhecem o DIU como opção segura também para pessoas que nunca engravidaram, desde que avaliadas individualmente por um profissional de saúde."
  }
];

// IMPORTANTE: os IDs abaixo são placeholders (SUBSTITUA_PELO_ID_DO_VIDEO).
// Troque cada "youtubeId" pelo ID real do vídeo do YouTube que deseja incorporar
// (o trecho que vem depois de "watch?v=" na URL do vídeo).
const VIDEOS = [
  { title: "O que são métodos contraceptivos?", desc: "Uma introdução geral aos principais tipos de métodos disponíveis.", duration: "6:12", youtubeId: "SUBSTITUA_PELO_ID_DO_VIDEO" },
  { title: "Como escolher um método contraceptivo?", desc: "Fatores a considerar antes de decidir, com apoio profissional.", duration: "8:45", youtubeId: "SUBSTITUA_PELO_ID_DO_VIDEO" },
  { title: "Métodos de barreira explicados", desc: "Como funcionam camisinhas e diafragma na prática.", duration: "5:30", youtubeId: "SUBSTITUA_PELO_ID_DO_VIDEO" },
  { title: "Métodos hormonais na prática", desc: "Pílula, adesivo, anel e injetável — diferenças e cuidados.", duration: "9:02", youtubeId: "SUBSTITUA_PELO_ID_DO_VIDEO" },
  { title: "DIU e métodos de longa duração", desc: "Entenda o que esperar da inserção, uso e remoção do DIU.", duration: "7:18", youtubeId: "SUBSTITUA_PELO_ID_DO_VIDEO" },
  { title: "Contracepção e prevenção de ISTs", desc: "Por que contracepção e prevenção de ISTs não são a mesma coisa.", duration: "6:40", youtubeId: "SUBSTITUA_PELO_ID_DO_VIDEO" }
];

const FAQ = [
  { q: "Qual é o método contraceptivo mais eficaz?", a: "Em geral, os métodos de longa duração — como DIU e implante — apresentam as maiores taxas de eficácia, porque dependem menos de ações diárias do usuário. Ainda assim, 'mais eficaz' não significa 'mais indicado para você': isso depende de fatores individuais avaliados por um profissional de saúde." },
  { q: "Posso combinar dois métodos ao mesmo tempo?", a: "Sim, e essa combinação é chamada de dupla proteção — geralmente um método de barreira (para prevenção de ISTs) junto de outro método (para reforço contraceptivo). Vale confirmar com um profissional quais combinações fazem sentido no seu caso." },
  { q: "Métodos contraceptivos têm efeitos colaterais?", a: "Alguns métodos hormonais podem causar efeitos como alterações de humor, sangramento irregular ou sensibilidade nas mamas em parte das pessoas. A intensidade varia de pessoa para pessoa, e um profissional de saúde pode ajudar a ajustar o método conforme a resposta do corpo." },
  { q: "A pílula do dia seguinte é um método contraceptivo de uso contínuo?", a: "Não. Ela é um recurso de emergência, indicado para situações pontuais (como falha do método usado ou relação sem proteção), e não substitui um método contraceptivo de uso regular." },
  { q: "Onde posso obter os métodos contraceptivos gratuitamente?", a: "No Brasil, o Sistema Único de Saúde (SUS) disponibiliza diversos métodos contraceptivos gratuitamente em unidades básicas de saúde. Consulte a unidade mais próxima para saber quais estão disponíveis." },
  { q: "É seguro usar métodos contraceptivos por muitos anos seguidos?", a: "Para a maioria dos métodos, sim, desde que haja acompanhamento periódico com um profissional de saúde, que pode reavaliar a indicação ao longo do tempo conforme mudanças de saúde ou de necessidades." }
];

const ICONS = {
  condom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12a8 8 0 0 1 16 0" /><path d="M4 12v3a2 2 0 0 0 2 2h1" /><path d="M20 12v3a2 2 0 0 1-2 2h-1"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/></svg>',
  pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-25 12 12)"/><line x1="12" y1="8" x2="12" y2="16" transform="rotate(-25 12 12)"/></svg>',
  patch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3"/></svg>',
  ring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
  injection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 5l-3-3-9 9-3 7 7-3 9-9z"/><line x1="13" y1="7" x2="17" y2="11"/></svg>',
  iud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v10M8 6a4 4 0 0 1 8 0"/><circle cx="12" cy="18" r="3"/></svg>',
  implant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="10" y="3" width="4" height="18" rx="2"/></svg>',
  surgery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M6 18L18 6"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>'
};

// ---------- Render: método cards ----------
function renderMethods(filter = "todos"){
  const grid = document.getElementById("methodsGrid");
  const list = filter === "todos" ? METHODS : METHODS.filter(m => m.category === filter);
  grid.innerHTML = list.map(m => `
    <article class="method-card" data-id="${m.id}">
      <div class="method-card-top">
        <span class="method-icon">${ICONS[m.icon] || ""}</span>
        <span class="method-category">${m.categoryLabel}</span>
      </div>
      <h3>${m.name}</h3>
      <p class="method-desc">${m.desc}</p>
      <div class="method-meta">
        <span>Eficácia</span>
        <span class="efficacy-bar"><span class="efficacy-fill" style="width:${m.efficacy}%"></span></span>
      </div>
      <button class="btn btn-small" data-open-method="${m.id}">Saiba mais</button>
    </article>
  `).join("");

  grid.querySelectorAll("[data-open-method]").forEach(btn => {
    btn.addEventListener("click", () => openMethodModal(btn.dataset.openMethod));
  });
}

function openMethodModal(id){
  const m = METHODS.find(x => x.id === id);
  if(!m) return;
  document.getElementById("modalContent").innerHTML = `
    <span class="modal-tag">${m.categoryLabel}</span>
    <h3 id="modalTitle">${m.name}</h3>
    <div class="modal-body">
      <p>${m.desc}</p>
      <h4>Como funciona</h4>
      <p>${m.how}</p>
      <h4>Eficácia aproximada</h4>
      <p>${m.efficacyLabel}</p>
      <h4>Vantagens</h4>
      <ul>${m.advantages.map(a => `<li>${a}</li>`).join("")}</ul>
      <h4>Limitações</h4>
      <ul>${m.limitations.map(l => `<li>${l}</li>`).join("")}</ul>
      <h4>Informação importante</h4>
      <p>${m.important}</p>
    </div>
  `;
  toggleModal("methodModal", true);
}

// ---------- Render: tabela comparativa ----------
function renderCompareTable(){
  const tbody = document.querySelector("#compareTable tbody");
  tbody.innerHTML = COMPARE_ROWS.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.type}</td>
      <td>${r.duration}</td>
      <td>${r.frequent}</td>
      <td class="${r.ist ? "tag-yes" : "tag-no"}">${r.ist ? "Sim" : "Não"}</td>
      <td>${r.efficacy}</td>
      <td>${r.followup}</td>
    </tr>
  `).join("");
}

// ---------- Render: mitos ----------
function renderMyths(){
  const list = document.getElementById("mythsList");
  list.innerHTML = MYTHS.map((item, i) => `
    <div class="myth-item" data-index="${i}">
      <button class="myth-question" aria-expanded="false">
        <span>${item.q}</span>
        <span class="myth-icon" aria-hidden="true">+</span>
      </button>
      <div class="myth-answer">
        <div class="myth-answer-inner">
          <span class="myth-verdict ${item.verdict}">${item.verdict === "mito" ? "Mito" : "Verdade"}</span>
          <p>${item.a}</p>
        </div>
      </div>
    </div>
  `).join("");

  list.querySelectorAll(".myth-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".myth-item");
      const answer = item.querySelector(".myth-answer");
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });
}

// ---------- Render: vídeos ----------
function renderVideos(){
  const grid = document.getElementById("videosGrid");
  grid.innerHTML = VIDEOS.map((v, i) => `
    <article class="video-card">
      <div class="video-thumb" data-open-video="${i}" role="button" tabindex="0" aria-label="Assistir: ${v.title}">
        <span class="play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </span>
        <span class="video-duration">${v.duration}</span>
      </div>
      <div class="video-info">
        <h3>${v.title}</h3>
        <p>${v.desc}</p>
        <button class="btn btn-small" data-open-video="${i}">Assistir</button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-open-video]").forEach(el => {
    el.addEventListener("click", () => openVideoModal(Number(el.dataset.openVideo)));
    el.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openVideoModal(Number(el.dataset.openVideo)); }
    });
  });
}

function openVideoModal(index){
  const v = VIDEOS[index];
  if(!v) return;
  document.getElementById("videoFrame").innerHTML = `
    <iframe src="https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0"
      title="${v.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
  `;
  toggleModal("videoModal", true);
}

// ---------- Render: FAQ ----------
function renderFaq(){
  const acc = document.getElementById("faqAccordion");
  acc.innerHTML = FAQ.map((item, i) => `
    <div class="accordion-item" data-index="${i}">
      <button class="accordion-question" aria-expanded="false">
        <span>${item.q}</span>
        <span class="plus" aria-hidden="true">+</span>
      </button>
      <div class="accordion-answer">
        <div class="accordion-answer-inner"><p>${item.a}</p></div>
      </div>
    </div>
  `).join("");

  acc.querySelectorAll(".accordion-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      const answer = item.querySelector(".accordion-answer");
      const isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });
}

// ---------- Modal helpers ----------
function toggleModal(id, open){
  const overlay = document.getElementById(id);
  overlay.classList.toggle("is-open", open);
  overlay.setAttribute("aria-hidden", String(!open));
  document.body.style.overflow = open ? "hidden" : "";
  if(!open && id === "videoModal"){
    document.getElementById("videoFrame").innerHTML = "";
  }
}

document.getElementById("modalClose").addEventListener("click", () => toggleModal("methodModal", false));
document.getElementById("methodModal").addEventListener("click", (e) => {
  if(e.target.id === "methodModal") toggleModal("methodModal", false);
});
document.getElementById("videoModalClose").addEventListener("click", () => toggleModal("videoModal", false));
document.getElementById("videoModal").addEventListener("click", (e) => {
  if(e.target.id === "videoModal") toggleModal("videoModal", false);
});
document.addEventListener("keydown", (e) => {
  if(e.key === "Escape"){
    toggleModal("methodModal", false);
    toggleModal("videoModal", false);
  }
});

// ---------- Filtro de categorias ----------
document.querySelectorAll(".filter-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(t => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    renderMethods(tab.dataset.filter);
  });
});

// ---------- Menu mobile ----------
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- Ano no rodapé ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Inicialização ----------
renderMethods();
renderCompareTable();
renderMyths();
renderVideos();
renderFaq();
