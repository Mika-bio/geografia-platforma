import { allTopics, getTopicsByGrade, type Topic } from "./topics";
import type { KmzhSample, KmzhStage } from "./data/kmzh-samples";

export type KmzhGenerateInput = {
  synyp: 8 | 9;
  takyryp: string;
  topicId?: string;
  maqsat?: string;
};

function findTopic(synyp: 8 | 9, topicId?: string, takyryp?: string): Topic | undefined {
  if (topicId) {
    const t = allTopics.find((x) => x.id === topicId);
    if (t) return t;
  }
  if (!takyryp) return undefined;
  const list = getTopicsByGrade(synyp);
  const lower = takyryp.toLowerCase();
  return (
    list.find((t) => t.title.toLowerCase() === lower) ||
    list.find((t) => t.title.toLowerCase().includes(lower) || lower.includes(t.title.toLowerCase()))
  );
}

function codePrefix(synyp: 8 | 9): string {
  return synyp === 8 ? "8.1.1" : "9.1.1";
}

function buildStages(title: string, theory: string[], synyp: 8 | 9): KmzhStage[] {
  const t1 = theory[0] || `${title} — география курсының маңызды бөлімі.`;
  const t2 = theory[1] || `Негізгі ұғымдар мен заңдылықтар қарастырылады.`;
  const t3 = theory[2] || `Карта, кесте және практикалық тапсырмалар арқылы бекітіледі.`;
  const points = theory.slice(0, 5);

  return [
    {
      id: "basi",
      title: "Сабақтың басы",
      rows: [
        {
          time: "2 мин",
          teacher:
            "(Ұ) Ұйымдастыру кезеңі. Оқушылармен амандасып, сыныпты түгелдеу, зейінді сабаққа аудару.",
          student: "Мұғаліммен амандасып, кезекші оқушы санын баяндайды.",
          assessment: "(ҚБ) 1–10 балл · «матрица» әдісі",
          resources: "Geo_aqparat.kz — Матрица әдісі",
        },
        {
          time: "3 мин",
          teacher:
            "ТРЕНИНГ «Сәлемдесу шеңбері». Мақсаты: жылы атмосфера. «Адал азамат» — еңбекқорлық және кәсіби біліктілік құндылығы дәріптеледі.",
          student:
            "Қасындағы досына қимылмен және сөзбен ерекше сәлем береді.",
          assessment: "ЖИ бағалау әдісі",
          resources: "—",
        },
      ],
    },
    {
      id: "ortasy",
      title: "Сабақтың ортасы",
      rows: [
        {
          time: "2 мин",
          teacher: `«АДАЛ АЗАМАТ»: «Еңбек — қуаныштың кілті» дәйексөзі. «${title}» тақырыбы арқылы еңбекқорлық пен кәсіби біліктілікке баулу.`,
          student: "Апта дәйексөзі мен құндылыққа байланысты мысал келтіреді.",
          assessment: "Ынталандыру: «Жарайсың»",
          resources: "—",
        },
        {
          time: "3 мин",
          teacher: `ЖАҢА САБАҚ — «Puzzle» әдісі. Оқушылар puzzle арқылы тақырыпты анықтайды: «${title}».`,
          student: "Puzzle әдісі арқылы сабақ тақырыбын табады.",
          assessment: "Қалыптастырушы бақылау",
          resources: "jigsawplanet / ЖИ puzzle",
        },
        {
          time: "3 мин",
          teacher: `МАҒЫНАНЫ ТАНУ. Бейнеролик / кіріспе: «${title}». Негізгі сұрақтар: ${t1.slice(0, 120)}`,
          student: "Бейнероликті / түсіндірмені тыңдап, сұрақтарды талдайды.",
          assessment: "Ауызша ҚБ",
          resources: "Презентация / бейне",
        },
        {
          time: "7 мин",
          teacher: `№1 тапсырма «Географ не көреді?» / мәтінмен жұмыс (ЖЖ немесе ЖТ, ФС тапсырмасы).\nНегізгі мазмұн:\n• ${points.map((p) => p).join("\n• ") || t2}`,
          student:
            "Жұпта/жеке кесте немесе сызбаны толтырып, зерттеу нысандарын анықтайды.",
          assessment:
            "Дескриптор (3 балл): негізгі ұғымдарды ажыратады; мысал келтіреді; кестені толық толтырады.",
          resources: `Оқулық § · Geo_aqparat.kz — ${codePrefix(synyp)}`,
        },
        {
          time: "2 мин",
          teacher: `ҚЫЗЫҚ ЕКЕН — «${title}» туралы қызықты дерек: ${t3.slice(0, 140)}`,
          student: "Қызықты ақпаратты тыңдайды.",
          assessment: "—",
          resources: "—",
        },
        {
          time: "8 мин",
          teacher: `№2 тапсырма «Суреттер / карта арқылы таны» (ЖТ, ФС).\nОқушылар визуалды деректер арқылы «${title}» ұғымдарын сәйкестендіреді.\n${t2}`,
          student: "Суреттер мен карта бойынша сәйкестендіруді орындайды.",
          assessment:
            "Дескриптор (3 балл): нысанды анықтайды; саланы/ұғымды табады; зерттеу бағытын ажыратады.",
          resources: "ЖИ сурет-тапсырмалары · атлас",
        },
        {
          time: "10 мин",
          teacher: `№3 тапсырма «Викторина» / «Тың деректер» (ЖТ).\nСұрақ үлгілері:\n1) «${title}» негізгі мәні неде?\n2) Қазақстандық мысал келтіріңіз.\n3) Себеп-салдарлық байланысты түсіндіріңіз.\n4) Картадан қатысты нысанды көрсетіңіз.\n5) Қорытынды жасаңыз.`,
          student: "Викторина/тың деректер сұрақтарына жауап беріп, тақырыпты бекітеді.",
          assessment:
            "Дескриптор (2 балл): терминдерді дұрыс қолданады; логикалық қорытынды жасайды.",
          resources: "ЖИ викторина",
        },
      ],
    },
    {
      id: "sony",
      title: "Сабақтың соңы",
      rows: [
        {
          time: "5 мин",
          teacher: `Кері байланыс «3 себеп» әдісі. Үйге тапсырма: «${title}» тақырыбын оқу, қысқа схема құру немесе 3 сұраққа жауап жазу.`,
          student:
            "Бүгінгі сабақ бойынша 3 дәлел келтіреді; үй тапсырмасын жазып алады.",
          assessment: "1–10 балл аралығында ҚБ",
          resources: "Geo_aqparat.kz — 3 дәлел әдісі",
        },
      ],
    },
  ];
}

export function generateKmzhStructured(input: KmzhGenerateInput): KmzhSample {
  const topic = findTopic(input.synyp, input.topicId, input.takyryp);
  const title = (input.takyryp || topic?.title || "География тақырыбы").trim();
  const theory = topic?.theory?.length
    ? topic.theory
    : [
        `${title} — 8–9 сынып география курсының маңызды бөлімі.`,
        "Зерттеу кезеңдері: мәселе → гипотеза → дерек → талдау → қорытынды.",
        "Карта, кесте және практикалық тапсырмалар арқылы білім бекітіледі.",
        "Қазақстандық компонент пен нақты мысалдар қолданылады.",
        "Қалыптастырушы бағалау дескрипторлар бойынша жүргізіледі.",
      ];

  const maqsat =
    input.maqsat?.trim() ||
    `${title} бойынша негізгі ұғымдарды түсіндіріп, карта/кестемен жұмыс істеу және себеп-салдарлық байланыстарды анықтау дағдыларын қалыптастырады.`;

  const prefix = codePrefix(input.synyp);

  return {
    id: `gen-${input.synyp}-${Date.now()}`,
    synyp: input.synyp,
    bolim: topic?.category
      ? topic.category
      : "1. ГЕОГРАФИЯНЫ ЗЕРТТЕУ ТӘСІЛДЕРІ",
    bolimKod: "1.1. ЗЕРТТЕУ ЖӘНЕ ЗЕРТТЕУШІЛЕР",
    takyryp: title,
    oqytuMaqsattary: [
      `${prefix}.1 «${title}» бойынша негізгі ұғымдарды түсіндіреді`,
      `${prefix}.2 тақырыпқа қатысты зерттеулер мен мысалдарды анықтайды`,
    ],
    sabakMaqsaty: maqsat,
    ebbq: `Мұғалімнің көмегімен «${title}» негізгі ұғымдарын сызба/кесте арқылы ажыратады және берілген мысалдарды сәйкестендіреді.`,
    qundylyq: "Еңбекқорлық және кәсіби біліктілік («Адал азамат»)",
    downloadPath: "",
    stages: buildStages(title, theory, input.synyp),
  };
}

/** Plain-text KMZh for copy/print */
export function kmzhToPlainText(doc: KmzhSample): string {
  const lines: string[] = [
    "Бекітемін________________________",
    "Білім беру ұйымының атауы",
    "Пәні: География",
    `Бөлім: ${doc.bolim}`,
    doc.bolimKod,
    "Педагогтің тегі, аты, әкесінің аты",
    "Күні:",
    `Сынып: ${doc.synyp}`,
    "Қатысушылар саны:",
    "Қатыспағандар саны:",
    `Сабақтың тақырыбы: ${doc.takyryp}`,
    "Оқу бағдарламасына сәйкес оқыту мақсаттары:",
    ...doc.oqytuMaqsattary.map((m) => `• ${m}`),
    `Сабақтың мақсаты: ${doc.sabakMaqsaty}`,
    `ЕББҚ: ${doc.ebbq}`,
    doc.qundylyq ? `Құндылық: ${doc.qundylyq}` : "",
    "",
    "Сабақтың барысы (~45 мин)",
    "Кезең | Уақыт | Педагогтің әрекеті | Оқушының әрекеті | Бағалау | Ресурстар",
    "---",
  ];

  for (const stage of doc.stages) {
    lines.push(`\n=== ${stage.title} ===`);
    for (const row of stage.rows) {
      lines.push(
        `[${row.time}]\nПедагог: ${row.teacher}\nОқушы: ${row.student}\nБағалау: ${row.assessment}\nРесурстар: ${row.resources}\n`
      );
    }
  }

  lines.push(
    "",
    "---",
    "«Географияға саяхат» платформасында жасалды — мұғалім қажетіне қарай өңдеңіз."
  );
  return lines.filter((l) => l !== undefined).join("\n");
}
