/* =========================================================
   ENTENDA — Dados estruturados e interações
   Refatorado, sem secção de vídeos e com validações de segurança
========================================================= */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel); const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- Base de Dados de Métodos ----------
  const METHODS = [
    {
      id: "camisinha-externa", category: "barreira", categoryLabel: "Barreira",
      name: "Preservativo externo (camisinha masculina)", icon: "condom",
      desc: "Barreira de látex ou poliuretano colocada no pênis antes da relação sexual.",
      how: "Impede o contato direto entre a pele e a troca de fluidos, retendo o sêmen e evitando que espermatozoides alcancem o óvulo.",
      efficacy: 85, efficacyLabel: "~85% no uso típico / ~98% no uso correto e consistente",
      advantages: ["Também reduz o risco de ISTs", "Não exige prescrição médica", "Sem efeitos hormonais", "Baixo custo e fácil acesso"],
      limitations: ["Eficácia depende do uso correto em toda relação", "Pode romper se usado de forma inadequada", "Alergia ao látex em alguns casos (existem opções sem látex)"],
      important: "Deve ser usado em todas as relações, do início ao fim, com armazenamento adequado (longe de calor e luz)."
    },
    {
      id: "camisinha-interna", category: "barreira", categoryLabel: "Barreira",
      name: "Preservativo interno (camisinha feminina)", icon: "condom",
      desc: "Barreira flexível inserida na vagina antes da relação sexual.",
      how: "Reveste as paredes vaginais, impedindo o contato entre espermatozoides e o colo do útero.",
      efficacy: 79, efficacyLabel: "~79% no uso típico / ~95% no uso correto e consistente",
      advantages: ["Reduz risco de ISTs", "Pode ser inserida com antecedência", "Controlada por quem a utiliza"],
      limitations: ["Menos disponível que a camisinha externa", "Curva de aprendizado para inserção", "Custo geralmente mais alto"],
      important: "Não deve ser usada ao mesmo tempo que o preservativo externo, pois o atrito pode causar deslizamento de ambos."
    },
    {
      id: "diafragma", category: "barreira", categoryLabel: "Barreira",
      name: "Diafragma", icon: "shield",
      desc: "Disco flexível de silicone posicionado sobre o colo do útero antes da relação.",
      how: "Cria uma barreira física que bloqueia a entrada de espermatozoides no útero; geralmente usado com espermicida.",
      efficacy: 88, efficacyLabel: "~88% no uso típico com espermicida",
      advantages: ["Reutilizável", "Sem hormônios", "Pode ser inserido horas antes da relação"],
      limitations: ["Não protege contra ISTs", "Requer ajuste de tamanho por profissional", "Precisa permanecer no local por algumas horas após a relação"],
      important: "O tamanho deve ser reavaliado após parto ou mudanças significativas de peso."
    },
    {
      id: "pilula-combinada", category: "hormonal", categoryLabel: "Hormonal",
      name: "Pílula anticoncepcional combinada", icon: "pill",
      desc: "Comprimido diário com estrogênio e progestagênio.",
      how: "Impede a ovulação e espessa o muco cervical, dificultando a passagem dos espermatozoides.",
      efficacy: 91, efficacyLabel: "~91% no uso típico / ~99% no uso correto e consistente",
      advantages: ["Pode regular o ciclo menstrual", "Reduz cólicas em muitos casos", "Reversível rapidamente ao interromper"],
      limitations: ["Não protege contra ISTs", "Exige uso diário no mesmo horário", "Contraindicada em algumas condições de saúde (ex.: certos riscos cardiovasculares)"],
      important: "A prescrição deve considerar histórico de saúde, incluindo tabagismo e risco de trombose."
    },
    {
      id: "minipilula", category: "hormonal", categoryLabel: "Hormonal",
      name: "Minipílula (só progestagênio)", icon: "pill",
      desc: "Comprimido diário contendo apenas progestagênio, indicado inclusive na amamentação.",
      how: "Espessa o muco cervical e, em muitos casos, inibe a ovulação.",
      efficacy: 91, efficacyLabel: "~91% no uso típico / ~99% no uso correto e consistente",
      advantages: ["Opção para quem não pode usar estrogênio", "Compatível com amamentação"],
      limitations: ["Exige horário rígido de uso, com pouca margem de atraso", "Pode causar sangramento irregular"],
      important: "O atraso na tomada reduz a eficácia mais do que na pílula combinada."
    },
    {
      id: "adesivo", category: "hormonal", categoryLabel: "Hormonal",
      name: "Adesivo transdérmico", icon: "patch",
      desc: "Adesivo hormonal trocado semanalmente, aplicado na pele.",
      how: "Libera hormônios continuamente através da pele para impedir a ovulação.",
      efficacy: 91, efficacyLabel: "~91% no uso típico / ~99% no uso correto e consistente",
      advantages: ["Não exige tomada diária", "Fácil de aplicar e trocar"],
      limitations: ["Não protege contra ISTs", "Pode causar irritação na pele", "Menos eficaz em pessoas com peso corporal elevado, segundo bulas"],
      important: "Deve ser trocado no dia certo da semana para manter a eficácia."
    },
    {
      id: "anel-vaginal", category: "hormonal", categoryLabel: "Hormonal",
      name: "Anel vaginal", icon: "ring",
      desc: "Anel flexível inserido na vagina, que permanece por três semanas.",
      how: "Libera hormônios localmente para impedir a ovulação.",
      efficacy: 91, efficacyLabel: "~91% no uso típico / ~99% no uso correto e consistente",
      advantages: ["Uso mensal, não diário", "Pode ser inserido e removido pela própria usuária"],
      limitations: ["Não protege contra ISTs", "Pode causar desconforto em algumas pessoas"],
      important: "Se sair do lugar por mais de três horas, a eficácia pode ser reduzida — consulte a bula."
    },
    {
      id: "injetavel", category: "hormonal", categoryLabel: "Hormonal",
      name: "Injetável (mensal ou trimestral)", icon: "injection",
      desc: "Aplicação de hormônios por via intramuscular, feita por profissional de saúde.",
      how: "Impede a ovulação por um período determinado, dependendo da formulação.",
      efficacy: 94, efficacyLabel: "~94% no uso típico / ~99% no uso correto e consistente",
      advantages: ["Não exige lembrança diária", "Boa opção para quem esquece comprimidos"],
      limitations: ["Requer retorno periódico ao serviço de saúde", "Retorno da fertilidade pode demorar após interrupção, principalmente na versão trimestral"],
      important: "Atrasos na aplicação da dose seguinte reduzem a proteção."
    },
    {
      id: "diu-cobre", category: "intrauterino", categoryLabel: "Intrauterino",
      name: "DIU de cobre", icon: "iud",
      desc: "Dispositivo intrauterino sem hormônios, inserido por profissional de saúde.",
      how: "O cobre altera o ambiente uterino, dificultando a movimentação e a sobrevivência dos espermatozoides.",
      efficacy: 99, efficacyLabel: ">99% — um dos métodos reversíveis mais eficazes",
      advantages: ["Longa duração (até 10 anos, conforme o modelo)", "Sem hormônios", "Reversível a qualquer momento"],
      limitations: ["Não protege contra ISTs", "Pode aumentar o fluxo menstrual e as cólicas em alguns casos", "Inserção e remoção exigem profissional"],
      important: "Deve ser inserido por profissional treinado; consultas de acompanhamento são recomendadas."
    },
    {
      id: "diu-hormonal", category: "intrauterino", categoryLabel: "Intrauterino",
      name: "DIU hormonal (levonorgestrel)", icon: "iud",
      desc: "Dispositivo intrauterino que libera progestagênio localmente.",
      how: "Espessa o muco cervical e afina o endométrio, além de poder inibir a ovulação em algumas pessoas.",
      efficacy: 99, efficacyLabel: ">99% — um dos métodos reversíveis mais eficazes",
      advantages: ["Pode reduzir significativamente o fluxo menstrual", "Longa duração (3 a 8 anos, conforme o modelo)", "Reversível"],
      limitations: ["Não protege contra ISTs", "Pode causar sangramento irregular nos primeiros meses"],
      important: "A inserção deve ser feita por profissional de saúde qualificado."
    },
    {
      id: "implante", category: "hormonal", categoryLabel: "Hormonal",
      name: "Implante subdérmico", icon: "implant",
      desc: "Bastonete flexível inserido sob a pele do braço, liberando progestagênio.",
      how: "Impede a ovulação e espessa o muco cervical por até três anos.",
      efficacy: 99, efficacyLabel: ">99% — um dos métodos reversíveis mais eficazes",
      advantages: ["Longa duração sem necessidade de lembrar do uso", "Reversível pela remoção"],
      limitations: ["Não protege contra ISTs", "Pode causar sangramento irregular", "Inserção e remoção exigem procedimento simples com profissional"],
      important: "A remoção só deve ser feita por profissional treinado, para evitar complicações."
    },
    {
      id: "laqueadura", category: "permanente", categoryLabel: "Permanente",
      name: "Laqueadura tubária", icon: "surgery",
      desc: "Procedimento cirúrgico que interrompe ou bloqueia as trompas de Falópio.",
      how: "Impede que o óvulo encontre o espermatozoide, interrompendo o trajeto nas trompas.",
      efficacy: 99, efficacyLabel: ">99% — método permanente",
      advantages: ["Efeito definitivo, sem necessidade de manutenção"],
      limitations: ["Reversão é difícil, cara e nem sempre bem-sucedida", "Não protege contra ISTs", "Requer procedimento cirúrgico e recuperação"],
      important: "No Brasil, a legislação estabelece critérios específicos de idade, número de filhos ou intervalo de tempo para a realização do procedimento."
    },
    {
      id: "vasectomia", category: "permanente", categoryLabel: "Permanente",
      name: "Vasectomia", icon: "surgery",
      desc: "Procedimento cirúrgico simples que interrompe os ductos deferentes.",
      how: "Impede que os espermatozoides produzidos nos testículos cheguem ao sêmen ejaculado.",
      efficacy: 99, efficacyLabel: ">99% — método permanente",
      advantages: ["Procedimento ambulatorial, geralmente rápido", "Efeito definitivo"],
      limitations: ["Não é imediato: exige exame de confirmação após alguns meses", "Reversão é difícil e nem sempre eficaz", "Não protege contra ISTs"],
      important: "É necessário usar outro método até a confirmação, por exame, da ausência de espermatozoides no sêmen."
    },
    {
      id: "tabelinha", category: "comportamental", categoryLabel: "Comportamental",
      name: "Método do ritmo (tabelinha)", icon: "calendar",
      desc: "Identificação do período fértil com base no histórico do ciclo menstrual.",
      how: "Evita relações sem proteção adicional durante os dias considerados mais férteis do ciclo.",
      efficacy: 76, efficacyLabel: "~76% no uso típico",
      advantages: ["Sem custos ou efeitos hormonais", "Pode ajudar a entender melhor o próprio ciclo"],
      limitations: ["Exige ciclos regulares para maior precisão", "Alta taxa de falha no uso comum", "Não protege contra ISTs"],
      important: "Costuma ser mais eficaz quando combinado a outros sinais corporais (temperatura basal, muco cervical) e orientação especializada."
    },
    {
      id: "sintotermico", category: "comportamental", categoryLabel: "Comportamental",
      name: "Método sintotérmico", icon: "calendar",
      desc: "Combina observação da temperatura basal, muco cervical e calendário menstrual.",
      how: "Cruza diferentes sinais do corpo para identificar com mais precisão o período fértil.",
      efficacy: 88, efficacyLabel: "~76 a 88% no uso típico, variando conforme a consistência do acompanhamento",
      advantages: ["Sem hormônios ou dispositivos", "Aumenta o autoconhecimento sobre o ciclo"],
      limitations: ["Exige disciplina diária de registro", "Curva de aprendizado inicial, idealmente com orientação profissional", "Não protege contra ISTs"],
      important: "Recomenda-se aprender o método com um profissional treinado antes de utilizá-lo como única proteção."
    },
    {
      id: "coito-interrompido", category: "comportamental", categoryLabel: "Comportamental",
      name: "Coito interrompido", icon: "calendar",
      desc: "Retirada do pênis da vagina antes da ejaculação.",
      how: "Tenta evitar que o sêmen entre em contato com a vagina.",
      efficacy: 78, efficacyLabel: "~78% no uso típico",
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
    { name: "Método do ritmo", type: "Comportamental", duration: "Contínuo, por ciclo", frequent: "Sim, registro diário", ist: false, efficacy: "~76%", followup: "Recomendado" }
  ];

  const MYTHS = [
    { q: "Todo método contraceptivo protege contra ISTs?", verdict: "mito",
      a: "Não. Apenas métodos de barreira, como a camisinha externa e a interna, reduzem o risco de infecções sexualmente transmissíveis. Métodos hormonais, DIU e métodos comportamentais não oferecem essa proteção." },
    { q: "A eficácia é igual para todos os métodos?", verdict: "mito",
      a: "Não. A eficácia varia bastante entre métodos e também entre 'uso correto e consistente' e 'uso típico' (do dia a dia, com possíveis falhas humanas). Métodos como DIU e implante têm menos dependência do uso diário e, por isso, tendem a apresentar eficácia mais estável." },
    { q: "É possível escolher qualquer método sem orientação profissional?", verdict: "mito",
      a: "Não é recomendado. Condições de saúde, histórico familiar, uso de medicamentos e outros fatores individuais podem tornar alguns métodos mais ou menos indicados. Um profissional de saúde ajuda a avaliar riscos e benefícios para o seu caso." },
    { q: "Métodos contraceptivos são todos hormonais?", verdict: "mito",
      a: "Não. Existem métodos de barreira, o DIU de cobre (sem hormônios), métodos comportamentais e métodos permanentes que não utilizam hormônios. A escolha de usar ou não hormônios pode ser conversada com um profissional de saúde." },
    { q: "Depois de parar de tomar a pílula, a fertilidade volta rapidamente?", verdict: "verdade",
      a: "Na maioria dos casos, sim — a fertilidade tende a retornar logo após a interrupção da pílula combinada ou da minipílula. Em métodos injetáveis trimestrais, esse retorno pode demorar mais." },
    { q: "O DIU pode ser usado por quem nunca teve filhos?", verdict: "verdade",
      a: "Sim. Atualmente, diretrizes de saúde reconhecem o DIU como opção segura também para pessoas que nunca engravidaram, desde que avaliadas individualmente por um profissional de saúde." }
  ];

  const FAQ = [
    { q: "Qual é o método contraceptivo mais eficaz?", a: "Em geral, os métodos de longa duração — como DIU e implante — apresentam as maiores taxas de eficácia, porque dependem menos de ações diárias do utilizador. Ainda assim, 'mais eficaz' não significa 'mais indicado para si': isso depende de fatores individuais avaliados por um profissional de saúde." },
    { q: "Posso combinar dois métodos ao mesmo tempo?", a: "Sim, e essa combinação é chamada de dupla proteção — geralmente um método de barreira (para prevenção de ISTs) junto de outro método (para reforço contraceptivo). Vale confirmar com um profissional quais combinações fazem sentido no seu caso." },
    { q: "Métodos contraceptivos têm efeitos colaterais?", a: "Alguns métodos hormonais podem causar efeitos como alterações de humor, sangramento irregular ou sensibilidade nas mamas em parte das pessoas. A intensidade varia de pessoa para pessoa, e um profissional de saúde pode ajudar a ajustar o método conforme a resposta do corpo." },
    { q: "A pílula do dia seguinte é um método contraceptivo de uso contínuo?", a: "Não. Ela é um recurso de emergência, indicado para situações pontuais (como falha do método usado ou relação sem proteção), e não substitui um método contraceptivo de uso regular." },
    { q: "Onde posso obter os métodos contraceptivos gratuitamente?", a: "No Brasil, o Sistema Único de Saúde (SUS) disponibiliza diversos métodos contraceptivos gratuitamente em unidades básicas de saúde. Consulte a unidade mais próxima para saber quais estão disponíveis." },
    { q: "É seguro usar métodos contraceptivos por muitos anos seguidos?", a: "Para a maioria dos métodos, sim, desde que haja acompanhamento periódico com um profissional de saúde, que pode reavaliar a indicação ao longo do tempo conforme mudanças de saúde ou de necessidades." }
  ];

  const ICONS = {
    condom: '<path d="M4 12a8 8 0 0 1 16 0"/><path d="M4 12v3a2 2 0 0 0 2 2h1"/><path d="M20 12v3a2 2 0 0 1-2 2h-1"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>',
    pill: '<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-25 12 12)"/><line x1="12" y1="8" x2="12" y2="16" transform="rotate(-25 12 12)"/>',
    patch: '<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3"/>',
    ring: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    injection: '<path d="M19 5l-3-3-9 9-3 7 7-3 9-9z"/><line x1="13" y1="7" x2="17" y2="11"/>',
    iud: '<path d="M12 3v10M8 6a4 4 0 0 1 8 0"/><circle cx="12" cy="18" r="3"/>',
    implant: '<rect x="10" y="3" width="4" height="18" rx="2"/>',
    surgery: '<path d="M6 6l12 12M6 18L18 6"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/>',
    calendar: '<rect x="3" y="5" width="
