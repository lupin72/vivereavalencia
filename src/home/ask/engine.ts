// Motore di risposta simulato per la demo. Verrà sostituito dalla chiamata al modello reale:
// la forma di `Answer` è il contratto che l'interfaccia si aspetta.
import { articles, quartieri } from "@/data"

export type Score = { label: string; value: number } // 0–5

export type Widget = {
  kind: "neighborhood"
  id: string
  name: string
  img: string
  rent: string
  sea: string
  scores: Score[]
} | {
  kind: "checklist"
  title: string
  steps: { title: string; detail: string }[]
} | {
  kind: "compare"
  a: string
  b: string
  rows: { label: string; a: number; b: number }[]
  verdict: string
}

export type Source = { id: string; title: string; cat: string; img: string }

export type Answer = {
  text: string
  widget?: Widget
  sources: Source[]
  followUps: string[]
}

const src = (id: string): Source => {
  const a = articles.find((x) => x.id === id)!
  return { id: a.id, title: a.title, cat: a.catLabel, img: a.img }
}
const q = (id: string) => quartieri.find((x) => x.id === id)!

const norm = (s: string) =>
  s.toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")

export function answer(query: string): Answer {
  const s = norm(query)
  const ruzafa = /ruzafa|russafa/.test(s)
  const benimaclet = /benimaclet/.test(s)

  if (ruzafa && benimaclet) {
    return {
      text: "Per chi lavora da remoto la differenza la fanno tre cose: il silenzio di giorno, i coworking a portata di piedi e quanto spendi d'affitto. Ruzafa vince su servizi e vita sociale, Benimaclet su calma, prezzi e quella sensazione di paese dentro la città. Se le videochiamate sono la tua giornata, Benimaclet; se cerchi stimoli e networking, Ruzafa.",
      widget: {
        kind: "compare",
        a: "Benimaclet",
        b: "Ruzafa",
        rows: [
          { label: "Affitto accessibile", a: 4, b: 2 },
          { label: "Silenzio di giorno", a: 4, b: 2 },
          { label: "Coworking vicini", a: 3, b: 5 },
          { label: "Vita sociale", a: 3, b: 5 },
          { label: "Verde", a: 4, b: 3 },
        ],
        verdict:
          "Videochiamate tutto il giorno → Benimaclet. Networking e caffè speciali → Ruzafa.",
      },
      sources: [
        src("quartieri-dove-vivere"),
        src("lavorare-valencia"),
        src("costo-vita-valencia"),
      ],
      followUps: [
        "Quanto costa vivere a Russafa?",
        "Quali coworking ci sono a Ruzafa?",
        "Come si arriva al mare da Benimaclet?",
      ],
    }
  }

  if (ruzafa) {
    const r = q("ruzafa")
    return {
      text: "Ruzafa è il quartiere più richiesto dagli italiani, e i prezzi lo dicono. Un bilocale va dai 900 ai 1.400 € al mese, più delle zone universitarie ma meno dell'Ensanche. In cambio hai il mercato coperto sotto casa, i migliori caffè della città e il centro a dieci minuti a piedi. Le strade intorno a Calle Sueca sono le più vivaci, e anche le più rumorose il venerdì.",
      widget: {
        kind: "neighborhood",
        id: r.id,
        name: r.name,
        img: r.img,
        rent: "900–1.400 €",
        sea: "25′ in bici",
        scores: [
          { label: "Vita notturna", value: 5 },
          { label: "Servizi", value: 5 },
          { label: "Famiglie", value: 2 },
          { label: "Verde", value: 3 },
        ],
      },
      sources: [src("quartieri-dove-vivere"), src("costo-vita-valencia")],
      followUps: [
        "Meglio Benimaclet o Ruzafa per lavorare da remoto?",
        "Quali sono le vie più tranquille di Ruzafa?",
        "Come ottengo il NIE?",
      ],
    }
  }

  // Solo la domanda "come si ottiene"; le altre domande sul NIE (es. conto in banca) vanno alla ricerca generica.
  if (
    /\bnie\b/.test(s) &&
    /ottengo|ottenere|ottiene|richied|fare il|cos.e/.test(s) &&
    !/banca|conto/.test(s)
  ) {
    return {
      text: "Il NIE è il tuo numero di identificazione da straniero: ti serve per firmare un contratto d'affitto, aprire un conto e lavorare. Da cittadino europeo che resta più di tre mesi chiederai il Certificado de Registro de Ciudadano de la UE, che lo contiene. La parte difficile non sono i documenti: è trovare l'appuntamento.",
      widget: {
        kind: "checklist",
        title: "Ottenere il NIE da cittadino UE",
        steps: [
          {
            title: "Prenota la cita previa",
            detail:
              "Sul portale della Sede Electrónica, sezione Extranjería. Controlla al mattino presto: gli slot si liberano a ondate.",
          },
          {
            title: "Compila il modulo EX-18",
            detail:
              "Richiesta di registrazione come cittadino dell'Unione, in due copie.",
          },
          {
            title: "Paga la tassa 790, codice 012",
            detail:
              "Si paga in banca prima dell'appuntamento. Porta la ricevuta timbrata.",
          },
          {
            title: "Prepara i documenti",
            detail:
              "Passaporto o carta d'identità con fotocopia, contratto di lavoro o prova di mezzi economici, assicurazione sanitaria.",
          },
          {
            title: "Presentati all'appuntamento",
            detail:
              "Di solito il certificato verde viene consegnato il giorno stesso.",
          },
        ],
      },
      sources: [src("nie-guida-passo-passo"), src("trasferirsi-valencia")],
      followUps: [
        "Cos'è l'empadronamiento?",
        "Come apro un conto in banca senza NIE?",
        "Quanto costa vivere a Russafa?",
      ],
    }
  }

  // Risposta generica: articoli più vicini per parole in comune.
  const words = s.split(/\W+/).filter((w) => w.length > 3)
  const ranked = articles
    .map((a) => {
      const hay = norm(`${a.title} ${a.excerpt} ${a.catLabel}`)
      return {
        a,
        score: words.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0),
      }
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map(({ a }) => src(a.id))

  return {
    text: "",
    sources: ranked,
    followUps: [
      "Quanto costa vivere a Russafa?",
      "Come ottengo il NIE?",
      "Meglio Benimaclet o Ruzafa per lavorare da remoto?",
    ],
  }
}
