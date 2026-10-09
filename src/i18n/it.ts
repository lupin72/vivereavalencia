// Testi della home. Un file per lingua: per aggiungerne una, duplicare la struttura (es. es.ts).

export const it = {
  brand: {
    name: "Vivere a Valencia",
    tagline: "Il portale per chi sceglie Valencia",
  },

  nav: {
    search: "Chiedi",
    menu: "Menu",
    close: "Chiudi",
    moments: {
      alba: "Alba",
      mezzogiorno: "Mezzogiorno",
      tramonto: "Tramonto",
      notte: "Notte",
    },
    links: [
      { label: "Vivere", to: "/categoria/vivere" },
      { label: "Quartieri", to: "/categoria/quartieri" },
      { label: "Guide", to: "/categoria/guide" },
      { label: "Mangiare", to: "/categoria/mangiare" },
      { label: "Cultura", to: "/categoria/cultura" },
      { label: "Eventi", to: "/categoria/eventi" },
    ],
  },

  preloader: { greeting: "Buongiorno" },

  hero: {
    coords: "39°28′N — 0°22′O",
    place: "Valencia, Comunitat Valenciana",
    titleA: "Svegliarsi",
    titleB: "a Valencia.",
    placeholderLead: "Chiedi a Valencia…",
    examples: [
      "Quanto costa vivere a Russafa?",
      "Come ottengo il NIE?",
      "Meglio Benimaclet o Ruzafa per lavorare da remoto?",
      "Dove si mangia la paella vera?",
      "Quanto ci vuole dal centro al mare?",
    ],
    suggestions: [
      "Quanto costa vivere a Russafa?",
      "Come ottengo il NIE?",
      "Meglio Benimaclet o Ruzafa per lavorare da remoto?",
    ],
    submit: "Chiedi",
    scroll: "Scorri per vedere la giornata",
    reveal: "Qui il sole sorge dal mare, trecento mattine l'anno.",
  },

  manifesto: {
    eyebrow: "Perché Valencia",
    text: "Una città abbastanza grande per costruirti una carriera e abbastanza piccola per attraversarla in bicicletta. Con il mare alla fine del parco e la cena che comincia alle dieci.",
    stats: [
      { value: 300, suffix: "", label: "giorni di sole l'anno" },
      {
        value: 9,
        suffix: " km",
        label: "di parco nel vecchio letto del Turia",
      },
      { value: 20, suffix: "′", label: "in bici dal centro alla spiaggia" },
    ],
  },

  primaPagina: {
    eyebrow: "Prima pagina",
    title: "Oggi a Valencia",
    edition: "Edizione del mattino",
    mostRead: "Le più lette",
    by: "di",
    read: "Leggi",
    allArticles: "Tutti gli articoli",
  },

  rubriche: {
    eyebrow: "Mezzogiorno — Leggere",
    title: "La città,\nuna rubrica alla volta.",
    all: "Tutte",
    allDesc:
      "Guide pratiche, cucina, cultura e quello che succede in città, scritte in italiano da chi ci vive.",
    seeAll: "Tutta la rubrica",
    tabs: ["vivere", "guide", "mangiare", "cultura", "eventi"],
    label: "Filtra per rubrica",
  },

  quartieri: {
    eyebrow: "Mezzogiorno — Decidere",
    title: "Sei quartieri,\nsei modi di vivere.",
    intro:
      "Ogni barrio ha il suo ritmo. Scorri, confronta, e quando hai un dubbio chiedi.",
    rent: "Bilocale",
    forWho: "Per chi",
    discover: "Scopri il quartiere",
    endTitle: "Non sai ancora quale?",
    endCta: "Confrontali con l'AI",
    endQuery: "Meglio Benimaclet o Ruzafa per lavorare da remoto?",
    forWhoById: {
      ruzafa: "Creativi, nomadi digitali, chi vuole tutto sotto casa.",
      elcarmen: "Chi ama la storia e non teme la vita notturna.",
      cabanyal: "Chi vuole il mare a cinque minuti, a prezzi ancora umani.",
      benimaclet: "Studenti, famiglie giovani, chi cerca un'aria di paese.",
      patacona: "Chi lavora da remoto e vuole la spiaggia come ufficio.",
      ensanche: "Chi cerca eleganza, servizi e il centro a piedi.",
    } as Record<string, string>,
  },

  percorso: {
    eyebrow: "Tramonto — Arrivare",
    title: "Il tuo trasloco,\nin otto tappe.",
    intro:
      "Dalla prima ricerca al primo caffè sotto casa. Le guide pratiche, nell'ordine in cui ti serviranno.",
    read: "Leggi la guida",
    steps: [
      {
        title: "Trasferirsi a Valencia",
        desc: "NIE, residenza, conto corrente: tutto il necessario prima di partire.",
        id: "trasferirsi-valencia",
        when: "3 mesi prima",
      },
      {
        title: "Dove vivere",
        desc: "Confronto tra i quartieri: prezzi, atmosfera, pro e contro.",
        id: "quartieri-dove-vivere",
        when: "2 mesi prima",
      },
      {
        title: "Costo della vita",
        desc: "Affitti, spesa, trasporti: quanto costa davvero vivere a Valencia.",
        id: "costo-vita-valencia",
        when: "2 mesi prima",
      },
      {
        title: "Lavorare a Valencia",
        desc: "Contratti, partita IVA spagnola, remote working, opportunità locali.",
        id: "lavorare-valencia",
        when: "1 mese prima",
      },
      {
        title: "Il NIE, passo per passo",
        desc: "Appuntamento, moduli e tempi per il tuo numero di identificazione.",
        id: "nie-guida-passo-passo",
        when: "Prima settimana",
      },
      {
        title: "Sanità e assistenza",
        desc: "Come iscriversi al sistema sanitario pubblico spagnolo.",
        id: "trasferirsi-valencia",
        when: "Primo mese",
      },
      {
        title: "Banche e fisco",
        desc: "Aprire un conto, obblighi fiscali e dichiarazione dei redditi.",
        id: "trasferirsi-valencia",
        when: "Primo mese",
      },
      {
        title: "Muoversi in città",
        desc: "Metro, bus, bici e tram: come vivere senza macchina.",
        id: "trasferirsi-valencia",
        when: "Da subito",
      },
    ],
  },

  storie: {
    eyebrow: "Storie vere",
    quote:
      "Sono arrivata con una valigia. Oggi ho un appartamento, un lavoro e duecento amici.",
    who: "Valentina, 31 anni",
    whoDetail: "Da Milano a Ruzafa, tre anni fa",
    cta: "Leggi la sua storia",
    moreTitle: "Altre storie",
    more: [
      {
        title: "Cabanyal: il quartiere dei pescatori che rinasce",
        tag: "Quartieri",
        id: "quartieri-dove-vivere",
      },
      {
        title: "IVAM: guida al museo di arte moderna di Valencia",
        tag: "Arte",
        id: "calatrava-ciudad-artes",
      },
      {
        title: "Il gruppo Telegram degli italiani a Valencia: 4.000 iscritti",
        tag: "Community",
        id: "nie-guida-passo-passo",
      },
    ],
  },

  notte: {
    eyebrow: "Notte — Vivere",
    title: "Quando cala la sera,\nValencia comincia.",
    eventsTitle: "Questa settimana",
    marquee: [
      "Horchata",
      "Mascletà",
      "Turia",
      "Fallas",
      "Agua de Valencia",
      "Malvarrosa",
      "Esmorzaret",
      "Albufera",
    ],
    tasteTitle: "Da assaggiare, da vedere",
    allEvents: "Tutti gli eventi",
  },

  footer: {
    goodnight: "Buonanotte,",
    goodnightB: "Valencia.",
    newsletterTitle: "Una lettera a settimana dalla città.",
    newsletterBody:
      "Eventi, case, burocrazia che cambia. Niente spam, solo Valencia.",
    emailPlaceholder: "La tua email",
    subscribe: "Iscriviti",
    subscribed: "Grazie. Ci sentiamo domenica mattina.",
    rights: "© 2026 Vivere a Valencia",
    made: "Fatto a Valencia, con il sole addosso.",
    backToDawn: "Torna all'alba",
  },

  ask: {
    label: "Chiedi a Valencia",
    placeholder: "Fai una domanda sulla città…",
    demo: "Demo — risposte simulate",
    thinking: "Sto cercando tra le guide",
    sources: "Fonti",
    followUps: "Puoi anche chiedere",
    empty: "Prova con una di queste",
    close: "Chiudi",
    genericIntro:
      "Ecco cosa ho trovato tra le guide di Vivere a Valencia. Per una risposta su misura, prova a essere più specifico: quartiere, budget, situazione lavorativa.",
    widgets: {
      rent: "Affitto bilocale",
      sea: "Dal mare",
      scores: "Punteggi",
      steps: "Passaggi",
      compare: "Confronto",
    },
  },
}

export type Strings = typeof it
