export const C: Record<string, string> = {
  vivere: "#C96A38", scoprire: "#267A70", mangiare: "#A83424",
  eventi: "#8A6500", cultura: "#543280", quartieri: "#1B4E8A",
  guide: "#16502F", storia: "#543280",
};

export const BG: Record<string, string> = {
  vivere: "#FDF2EC", eventi: "#F9F5EC", guide: "#EEF5F0",
  quartieri: "#EEF3FA", cultura: "#F4F0FA", scoprire: "#EEF5F0",
  mangiare: "#FDF2EC", storia: "#F4F0FA",
};

export const CAT_LABELS: Record<string, string> = {
  vivere: "Vivere", scoprire: "Scoprire", mangiare: "Mangiare",
  eventi: "Eventi", cultura: "Cultura", quartieri: "Quartieri", guide: "Guide",
};

export const CAT_DESC: Record<string, string> = {
  vivere: "Tutto quello che serve per trasferirsi, ambientarsi e vivere a Valencia. Documenti, casa, lavoro, sanità e molto altro — spiegati in italiano da chi ci è passato.",
  scoprire: "La Valencia che non ti aspetti: architettura, natura, cultura e angoli nascosti di una città che sa sempre sorprenderti.",
  mangiare: "La cucina valenciana spiegata agli italiani. Dalla paella all'horchata, dai mercati ai ristoranti — un viaggio gastronomico nella città del cibo.",
  eventi: "Il calendario completo degli eventi a Valencia. Feste, concerti, mercatini, festival e tutto quello che succede in città.",
  cultura: "Arte, storia, architettura, musica e persone. La Valencia più profonda, quella che devi conoscere per capire davvero la città.",
  quartieri: "Sei quartieri, sei anime diverse. La guida completa per scegliere dove vivere, cosa visitare e come muoversi tra le diverse realtà di Valencia.",
  guide: "Le guide pratiche di Vivere a Valencia. Strumenti concreti per chi si trasferisce, chi lavora e chi vuole capire come funziona la città.",
};

export interface Article {
  id: string;
  cat: string;
  catLabel: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  img: string;
  body: string[];
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "trasferirsi-valencia",
    cat: "guide", catLabel: "Guida completa",
    title: "Trasferirsi a Valencia: tutto quello che devi sapere prima di partire",
    excerpt: "Quartieri, documenti, costo della vita, lavoro e consigli pratici di chi ci vive. La guida più completa in italiano.",
    author: "Marco Ferretti", date: "15 Agosto 2026", readTime: "12 min",
    img: "https://images.unsplash.com/photo-1759250453212-be3b0f40da72?w=1400&h=800&fit=crop&auto=format",
    featured: true,
    body: [
      "Ogni anno migliaia di italiani scelgono Valencia come nuova casa. La terza città della Spagna offre una qualità della vita difficile da trovare altrove: clima quasi perfetto per tutto l'anno, mare a pochi chilometri, cibo straordinario e un ritmo di vita che sa essere vivace senza diventare frenetico.",
      "Prima di partire, però, è necessario capire bene come funziona il sistema spagnolo. Il primo documento da richiedere è il NIE — Número de Identidad de Extranjero — senza il quale è impossibile aprire un conto corrente, firmare un contratto d'affitto o avviare qualsiasi procedura burocratica.",
      "Per i cittadini europei, il processo è relativamente semplice: basta prendere appuntamento al Consolato spagnolo più vicino già dall'Italia oppure, una volta arrivati a Valencia, all'Oficina de Extranjería. I documenti necessari sono la domanda compilata (modulo EX-18), il passaporto in corso di validità, la giustificazione del motivo della richiesta e il pagamento della tassa consolare.",
      "Sul fronte dell'alloggio, il mercato immobiliare valenciano è ancora accessibile rispetto alle altre grandi città spagnole. Ruzafa e El Carmen sono i quartieri più richiesti dagli expat, con affitti che oscillano tra 800 e 1.400 euro al mese per un bilocale. Benimaclet e Cabanyal offrono prezzi più contenuti mantenendo un'ottima qualità della vita.",
      "Per quanto riguarda il lavoro, le opportunità principali riguardano il settore tecnologico, il turismo, l'insegnamento delle lingue e il freelance/remote working. Valencia conta una comunità di nomadi digitali in forte crescita, con numerosi coworking concentrati soprattutto a Ruzafa e nel centro città.",
      "Il sistema sanitario pubblico spagnolo è considerato tra i migliori d'Europa. Per accedervi come residente europeo è necessario iscriversi al centro de salud del proprio quartiere, portando il passaporto, la tessera europea di assicurazione malattia e il certificato di residenza.",
      "Infine, un consiglio pratico: iscrivetevi subito all'AIRE (Anagrafe degli Italiani Residenti all'Estero) tramite il Consolato italiano di Valencia. È gratuito, semplifica molte procedure burocratiche e mantiene attivi i vostri diritti come cittadini italiani.",
    ],
  },
  {
    id: "nie-guida-passo-passo",
    cat: "vivere", catLabel: "Documenti",
    title: "Come ottenere il NIE: la guida passo per passo per italiani",
    excerpt: "Il Número de Identidad de Extranjero è il primo documento da richiedere. Ecco la procedura completa, aggiornata al 2026.",
    author: "Marco Ferretti", date: "15 Agosto 2026", readTime: "8 min",
    img: "https://images.unsplash.com/photo-1759244567408-9bc3ed2f4af6?w=1400&h=800&fit=crop&auto=format",
    body: [
      "Il NIE (Número de Identidad de Extranjero) è il codice fiscale spagnolo per i cittadini stranieri. È indispensabile per qualsiasi operazione legale, fiscale o amministrativa in Spagna: aprire un conto corrente, firmare un contratto, acquistare un'auto, avviare un'attività.",
      "Per i cittadini europei che si trasferiscono in Spagna, esistono due strade: richiedere il NIE in Italia presso il Consolato spagnolo competente per residenza, oppure farlo direttamente a Valencia dopo l'arrivo.",
      "La seconda opzione è generalmente più rapida. L'Oficina de Extranjería di Valencia si trova in Calle Navarro Reverter 2. È necessario prenotare un appuntamento online tramite il portale del Ministerio del Interior.",
      "I documenti richiesti sono: modulo EX-18 compilato (scaricabile dal sito del Ministerio), passaporto originale e fotocopia, justificante del motivo della richiesta (contratto di lavoro, contratto d'affitto, dichiarazione scritta), modulo Tasa 790 Código 012 con pagamento effettuato.",
      "Il pagamento della tassa (circa 10 euro) va effettuato presso qualsiasi banca spagnola prima dell'appuntamento. Molti sportelli bancomat permettono anche il pagamento diretto.",
      "Il NIE viene rilasciato generalmente il giorno stesso dell'appuntamento. Attenzione: il documento rilasciato è un certificato cartaceo, non una carta fisica. Conservatelo con cura — ne avrete bisogno spesso.",
    ],
  },
  {
    id: "quartieri-dove-vivere",
    cat: "vivere", catLabel: "Alloggio",
    title: "I migliori quartieri dove vivere a Valencia nel 2026",
    excerpt: "Ruzafa, El Carmen, Benimaclet o Ensanche? Un confronto onesto tra i quartieri più ambiti dagli expat italiani.",
    author: "Chiara Conti", date: "28 Luglio 2026", readTime: "10 min",
    img: "https://images.unsplash.com/photo-1759244569220-3cee1243cbb2?w=1400&h=800&fit=crop&auto=format",
    body: [
      "Scegliere il quartiere giusto è forse la decisione più importante quando ci si trasferisce a Valencia. Ogni zona ha un carattere ben definito, prezzi diversi e una qualità di vita che cambia sensibilmente da un isolato all'altro.",
      "Ruzafa è il quartiere preferito dalla comunità di expat europei. Bohémien e internazionale, è pieno di bar speciality coffee, gallerie d'arte, mercato coperto e ristoranti di qualità. Gli affitti sono aumentati notevolmente negli ultimi anni: un bilocale costa mediamente tra 900 e 1.400 euro al mese.",
      "El Carmen è il cuore storico della città. Mura romane, chiese barocche, street art e una vita notturna intensa. È il quartiere degli artisti, degli studenti e di chi vuole essere sempre al centro di tutto. I prezzi sono simili a Ruzafa, ma gli appartamenti sono spesso più datati e con meno servizi.",
      "Benimaclet è la scelta di chi cerca una Valencia più autentica. Vicino all'università, con mercatini del weekend e una forte comunità locale. Affitti ancora accessibili: 650-950 euro per un bilocale.",
      "Cabanyal è il quartiere in fase di rinascita. Ex quartiere dei pescatori, con case colorate, murales e una spiaggia raggiungibile a piedi. I prezzi stanno salendo rapidamente, ma è ancora possibile trovare buoni affitti.",
      "L'Ensanche — o Eixample — è il quartiere dei grandi viali e dei palazzi liberty. Più residenziale e quieto, con i migliori ristoranti e le boutique di Valencia. Prezzi più alti, ma qualità della vita eccellente.",
    ],
  },
  {
    id: "costo-vita-valencia",
    cat: "vivere", catLabel: "Economia",
    title: "Costo della vita a Valencia: quanto si spende davvero nel 2026",
    excerpt: "Affitti, spesa al supermercato, trasporti, ristoranti e svago. Una stima realistica per chi si vuole trasferire.",
    author: "Luca Barbieri", date: "20 Luglio 2026", readTime: "7 min",
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=800&fit=crop&auto=format",
    body: [
      "Valencia è spesso citata come una delle città europee con il miglior rapporto qualità/prezzo. Ma quanto costa davvero viverci? Abbiamo raccolto dati aggiornati al 2026 per darvi una stima realistica.",
      "L'affitto è la voce di spesa principale. Un monolocale nel centro storico o a Ruzafa costa tra 700 e 1.000 euro al mese. Un bilocale tra 900 e 1.400 euro. Nei quartieri più periferici come Patraix o Benimaclet si trovano affitti più contenuti, tra 550 e 800 euro.",
      "La spesa alimentare è sensibilmente più bassa che in Italia. Al Mercado Central o nei supermercati locali (Mercadona, Consum), una coppia spende mediamente 200-280 euro al mese per la spesa di casa.",
      "I trasporti pubblici sono efficienti e convenienti. L'abbonamento mensile illimitato per metro, bus e tram costa 40 euro. In bici si raggiunge quasi tutto il centro in 15-20 minuti.",
      "Al ristorante, un menù del giorno (primo, secondo, dessert e vino inclusi) costa tra 10 e 14 euro. Una cena in un locale di qualità va dai 25 ai 45 euro a persona.",
      "In sintesi: una persona singola con uno stile di vita normale può vivere bene a Valencia con 1.800-2.200 euro al mese. Una coppia con 2.800-3.400 euro. Cifre significativamente inferiori a Milano, Roma o qualsiasi grande città italiana.",
    ],
  },
  {
    id: "paella-vera-ricetta",
    cat: "mangiare", catLabel: "Gastronomia",
    title: "La vera paella valenciana: storia, ingredienti e dove mangiarla",
    excerpt: "Pollo, coniglio, fagioli e riso bomba. La guida definitiva alla paella autentica, lontano dai cliché turistici.",
    author: "Elena Russo", date: "10 Agosto 2026", readTime: "9 min",
    img: "https://images.unsplash.com/photo-1588276552401-30058a0fe57b?w=1400&h=800&fit=crop&auto=format",
    body: [
      "La paella è il piatto più frainteso della gastronomia spagnola. Fuori dalla Spagna — e spesso anche fuori da Valencia — viene servita in versioni che non hanno nulla a che fare con il piatto originale. La paella valenciana vera è qualcosa di preciso, codificato e profondamente radicato nella cultura locale.",
      "La ricetta originale prevede: riso bomba, pollo, coniglio, bajoqueta (fagiolini piatti), garrofó (fagioli bianchi secchi), pomodoro, paprika dolce, olio d'oliva, zafferano, rosmarino e sale. Niente pesce, niente frutti di mare, niente chorizo.",
      "La paella si cuoce all'aperto, su un fuoco di legna di arancio — che conferisce un aroma unico impossibile da replicare in cucina. Il segreto è il socarrat: la sottile crosticina croccante che si forma sul fondo della padella negli ultimi minuti di cottura.",
      "A Valencia, la paella si mangia tradizionalmente a pranzo la domenica, in famiglia. Non è un piatto da ristorante serale — chi ve la propone la sera probabilmente la usa da congelatore.",
      "I migliori ristoranti per la paella autentica si trovano nella zona del lago Albufera, a circa 15 km dal centro: La Pepica (storica, frequentata da Hemingway), El Palmar e La Matandeta sono riferimenti assoluti.",
      "In città, El Racó de la Paella a Ruzafa e Casa Carmela sul Paseo Marítimo sono le scelte più affidabili. Budget: tra 20 e 30 euro a persona per una paella vera.",
    ],
  },
  {
    id: "horchata-fartons-alboraya",
    cat: "mangiare", catLabel: "Bevande",
    title: "Horchata e fartons: la colazione valenciana che non ti aspetti",
    excerpt: "La bevanda di chufa è un rito mattutino locale. Dove berla ad Alboraya, la capitale dell'horchata, e perché è diversa da qualsiasi cosa tu abbia assaggiato.",
    author: "Sofia Bertini", date: "5 Agosto 2026", readTime: "6 min",
    img: "https://images.unsplash.com/photo-1603803721487-97009eb7f8db?w=1400&h=800&fit=crop&auto=format",
    body: [
      "L'horchata de chufa è una delle bevande più particolari del Mediterraneo. Prodotta dai tuberi della cyperus esculentus — la chufa, o tigre nut — è una bevanda vegetale bianca, dolce e cremosa, completamente diversa dall'orzata italiana con cui spesso viene confusa.",
      "Il comune di Alboraya, a pochi chilometri a nord di Valencia, è la capitale mondiale dell'horchata autentica. Qui le horchaterías sono istituzioni: locali con tavoli all'aperto, frigo pieni di chufa fresca e file di fartons — i biscotti allungati, morbidi e glassati di zucchero con cui si inzuppa la bevanda.",
      "La migliore horchata si beve fresca, non fredda. La temperatura ideale è intorno ai 10-12 gradi. Le horchaterías storiche di Alboraya — come Daniel e El Tío Che — la preparano ancora con chufa DOP coltivata nei campi del paese.",
      "A Valencia città, l'Horchatería Santa Catalina in Plaza de Santa Catalina è il riferimento storico: aperta dal 1836, con interni di ceramica valenciana e una produzione artigianale. Prezzi: un bicchiere di horchata costa tra 2,50 e 3,50 euro.",
      "Il consiglio è di visitare Alboraya almeno una volta, soprattutto d'estate. La Festa de la Chufa si tiene ogni anno a luglio: tre giorni di degustazioni, musica e celebrazione di questo prodotto unico al mondo.",
    ],
  },
  {
    id: "mercado-central-guida",
    cat: "mangiare", catLabel: "Mercati",
    title: "Mercado Central: fare la spesa come un valenciano",
    excerpt: "Uno dei mercati coperti più belli d'Europa, nel cuore della città. Come orientarsi, cosa comprare e quando andare.",
    author: "Lucia Mancini", date: "1 Agosto 2026", readTime: "5 min",
    img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=800&fit=crop&auto=format",
    body: [
      "Il Mercado Central di Valencia è uno dei mercati coperti più grandi e belli d'Europa. Inaugurato nel 1928, occupa una superficie di quasi 8.000 metri quadrati ed è ospitato in uno splendido edificio modernista con cupole in vetro colorato.",
      "Dentro trovate tutto: verdure dell'huerta valenciana, pesce freschissimo del Mediterraneo, carne, formaggi, frutta, spezie, olive e prodotti tipici locali. I prezzi sono competitivi rispetto ai supermercati, la qualità incomparabilmente superiore.",
      "L'orario migliore per andare è la mattina presto, tra le 8 e le 10. Troverete i banchi più forniti, i produttori più disponibili a fare due chiacchiere e l'atmosfera autentica del mercato che si sveglia.",
      "Tra i prodotti da non perdere: la pera valenciana (la migliore varietà si chiama limonera), i pomodori dell'huerta, le olive aliñadas, il bacalà (merluzzo sotto sale) e naturalmente il riso bomba per la paella.",
      "Il banco di Daniel, al centro del mercato, è una delle tapas bar più frequentate della città: si mangia in piedi, gomito a gomito con lavoratori e turisti, con un bicchiere di vino della casa. Budget 5-8 euro.",
    ],
  },
  {
    id: "calatrava-ciudad-artes",
    cat: "cultura", catLabel: "Architettura",
    title: "La Città delle Arti e delle Scienze: come Calatrava ha reinventato Valencia",
    excerpt: "Il complesso futuristico che trasformò una città industriale in una capitale culturale mediterranea.",
    author: "Marco Ferretti", date: "12 Agosto 2026", readTime: "8 min",
    img: "https://images.unsplash.com/photo-1719401542194-95139aed215c?w=1400&h=800&fit=crop&auto=format",
    body: [
      "Negli anni '90, Valencia era una città industriale in cerca di identità. La decisione di costruire la Città delle Arti e delle Scienze sul vecchio letto del fiume Turia cambiò tutto — e il nome di Santiago Calatrava divenne sinonimo di questa trasformazione.",
      "Il complesso si estende per quasi due chilometri nel Parco del Turia e comprende sei edifici principali. L'Hemisféric — l'occhio gigante che si riflette nell'acqua — ospita un cinema IMAX e un planetario. Il Palau de les Arts Reina Sofia è la sede dell'Opera di Valencia.",
      "Il Museu de les Ciències Príncipe Felipe, con la sua struttura che ricorda lo scheletro di un dinosauro, è dedicato alla scienza interattiva e alla divulgazione. L'Umbracle è un giardino pensile passeggiabile con un'installazione d'arte permanente.",
      "L'Oceanogràfic — progettato dall'architetto Félix Candela — è il più grande acquario d'Europa: 45.000 animali di 500 specie diverse, in dodici ambienti che replicano gli ecosistemi marini del pianeta.",
      "L'impatto sulla città è stato immenso. Valencia ha attirato investimenti, turismo e attenzione internazionale. Il costo complessivo dell'opera — circa 1,3 miliardi di euro — è stato al centro di controversie politiche, ma oggi nessuno mette in dubbio la sua capacità di trasformare l'identità urbana.",
    ],
  },
  {
    id: "el-carmen-quartiere",
    cat: "cultura", catLabel: "Quartieri",
    title: "El Carmen: il quartiere medievale che vive di notte",
    excerpt: "Mura romane, chiese barocche, arte di strada e il cuore bohémien di Valencia. Una guida completa.",
    author: "Sofia Bertini", date: "5 Agosto 2026", readTime: "7 min",
    img: "https://images.unsplash.com/photo-1698141825633-a34c5f129225?w=1400&h=800&fit=crop&auto=format",
    body: [
      "El Carmen è il più antico dei quartieri di Valencia. Racchiuso tra le torres de Serranos a nord e le torres de Quart a ovest — due porte medievali della cinta muraria del 1400 — conserva una stratificazione urbana unica: strade romane, edifici arabi, chiese gotiche e barocche, corti rinascimentali.",
      "Di giorno è un museo a cielo aperto. La Plaça del Tossal, la Plaça de Sant Jaume e l'IVAM — il museo di arte moderna affacciato sul Jardines del Turia — sono i punti di riferimento. I murales sui portoni e sulle facciate sono un museo di street art permanente.",
      "Di notte El Carmen si trasforma. I bar del Carrer de la Bolseria e del Carrer del Pintor Salvador Abril si riempiono fino alle 2 di notte. La scena è eterogenea: studenti, artisti, expat, turisti e valenciani storici convivono in uno spazio che sa rimanere autentico nonostante la pressione turistica.",
      "I prezzi sono in linea con Ruzafa — non è più il quartiere economico che era dieci anni fa. Ma l'esperienza di vivere circondati da duemila anni di storia è difficile da trovare altrove.",
    ],
  },
  {
    id: "fallas-2027-guida",
    cat: "eventi", catLabel: "Feste",
    title: "Las Fallas 2027: la guida definitiva per italiani",
    excerpt: "Patrimonio UNESCO dal 2016, nessun italiano dovrebbe perderle. Date, riti e come sopravvivere alle Mascletà.",
    author: "Giovanni Rizzo", date: "1 Agosto 2026", readTime: "11 min",
    img: "https://images.unsplash.com/photo-1647693680683-2283c3e386b6?w=1400&h=800&fit=crop&auto=format",
    body: [
      "Las Fallas è la festa più straordinaria che abbiate mai visto. Per cinque giorni — dal 15 al 19 marzo — Valencia si trasforma in un palcoscenico a cielo aperto dove arte, fuoco e tradizione si mescolano in modo irripetibile.",
      "L'origine della festa è medievale: i falegnami bruciavano ogni anno i pali di legno usati per reggere le candele durante l'inverno. Nel tempo, i pali si trasformarono in sculture, le sculture in monumenti alti anche 20 metri, e la festa in un evento di portata mondiale. Dal 2016 le Fallas sono Patrimonio Immateriale dell'Umanità UNESCO.",
      "La Mascletà è il cuore rumoroso della festa: ogni giorno alle 14:00 precise, in Plaza del Ayuntamiento, viene sparata una sequenza di esplosioni di fuochi d'artificio che dura circa cinque minuti. Non è uno spettacolo visivo — è un'esperienza fisica. Il rumore è assordante, le vibrazioni si sentono nel petto. Portate i tappi per le orecchie.",
      "Le Fallas vere sono le sculture: ogni anno oltre 700 installazioni vengono costruite nei quartieri da artisti specializzati (i falleros), esposte dal 1 al 19 marzo e poi bruciate la notte della Cremà. Alcune costano centinaia di migliaia di euro. Bruciano tutte.",
      "La Nit del Foc (la notte del fuoco) del 18 marzo è lo spettacolo pirotecnico più grande d'Europa: 90 minuti di fuochi d'artificio sparati dal Turia. La Cremà del 19 marzo è il momento più emozionante: all'una di notte precisa, tutte le Fallas vengono incendiate simultaneamente in tutta la città.",
    ],
  },
  {
    id: "tapas-bar-migliori",
    cat: "mangiare", catLabel: "Tapas",
    title: "I migliori tapas bar di Valencia: la mappa definitiva",
    excerpt: "Dai pintxos del centro ai bar storici del Cabanyal, una selezione dei posti dove si mangia davvero bene in piedi.",
    author: "Elena Russo", date: "3 Agosto 2026", readTime: "6 min",
    img: "https://images.unsplash.com/photo-1780639026821-f680fae0d99d?w=1400&h=800&fit=crop&auto=format",
    body: [
      "A Valencia la cultura delle tapas è diversa da quella di Madrid o Barcellona. Qui si preferiscono le porciones — porzioni singole servite su piccoli piatti — e i bocadillos. Il tutto accompagnato rigorosamente da vino della casa o birra fresca.",
      "La Calle del Mossén Femades, nel quartiere del Carmen, è la strada delle tapas per eccellenza. In 200 metri troverete una decina di bar dove ogni bicchiere di vino viene accompagnato da una tapa gratuita.",
      "Bar Pilar, in Calle del Mossén Femades 13, è il tempio dei clóchinas (cozze valenciane al vapore): aperto dal 1917, ha ancora le piastrelle originali e le botti di vino in bella vista. Una tapa di clóchinas costa 3 euro.",
      "Ruzafa ha la scena più moderna. Tandem Gastronomy Bar in Calle de Cadis è il riferimento per i pintxos creativi: abbinamenti inusuali, ingredienti stagionali e una selezione di vini naturali.",
      "Per il pesce fritto — il fritto misto valenciano, il pescado frito — la zona del Cabanyal e del Paseo Marítimo è insostituibile. La Pepica, aperta dal 1898, serve ancora oggi la migliore frittura di calamari della città.",
    ],
  },
  {
    id: "lavorare-valencia",
    cat: "guide", catLabel: "Lavoro",
    title: "Lavorare a Valencia: opportunità, contratti e partita IVA spagnola",
    excerpt: "Come trovare lavoro, come aprire una partita IVA autonomo, dove fare networking. La guida pratica per italiani.",
    author: "Andrea Moretti", date: "22 Luglio 2026", readTime: "9 min",
    img: "https://images.unsplash.com/photo-1529437971227-3344caa48ce2?w=1400&h=800&fit=crop&auto=format",
    body: [
      "Valencia è una città con un mercato del lavoro in evoluzione. Negli ultimi cinque anni ha attratto numerose aziende tecnologiche, startup e studi di design, diventando un'alternativa credibile a Barcellona per il settore digitale.",
      "I settori con più opportunità per italiani sono il turismo e l'hospitality, l'insegnamento (italiano e inglese sono molto richiesti), il settore tech (sviluppatori, designer UX, growth marketer), il retail di lusso e la gastronomia.",
      "Per i lavoratori dipendenti, il contratto spagnolo (contrato de trabajo) funziona in modo simile a quello italiano. Il salario minimo interprofessionale (SMI) nel 2026 è di 1.184 euro al mese. I contratti collettivi di settore possono prevedere condizioni migliori.",
      "Per i lavoratori autonomi, la scelta principale è diventare autónomo — l'equivalente spagnolo del libero professionista. La quota fissa mensile all'RETA (il sistema previdenziale degli autonomi) dipende dal reddito: parte da circa 80 euro al mese per i primi anni di attività.",
      "Il networking a Valencia è facilitato da numerosi eventi: le Startup Valencia Meetup, gli eventi di Lanzadera (l'acceleratore di Juan Roig), i coworking di Ruzafa come Impact Hub e The Makers. La comunità italiana è attiva: cercate il gruppo Telegram 'Italiani a Valencia' con oltre 4.000 iscritti.",
    ],
  },
];

export interface Quartiere {
  id: string;
  name: string;
  tag: string;
  tagLabel: string;
  desc: string;
  longDesc: string;
  img: string;
  gallery: string[];
  stats: { label: string; value: string }[];
}

export const quartieri: Quartiere[] = [
  {
    id: "ruzafa",
    name: "Ruzafa",
    tag: "vivere",
    tagLabel: "Trendy",
    desc: "Bar, gallerie, mercato coperto. Il quartiere più internazionale di Valencia.",
    longDesc: "Ruzafa è il quartiere-simbolo della Valencia contemporanea. In pochi anni si è trasformato da zona operaia a epicentro della vita creativa cittadina. Le strade sono piene di specialty coffee, gallerie d'arte indipendenti, ristoranti fusion e boutique di designer locali. La comunità di expat europei è numerosa e ben integrata. Il Mercado de Ruzafa — aperto il sabato mattina — è uno dei momenti migliori per sentire il polso autentico del quartiere.",
    img: "https://images.unsplash.com/photo-1694347592859-6879e6b70d2c?w=1200&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1759244569220-3cee1243cbb2?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1780639026821-f680fae0d99d?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1647693629037-0f153313aeb1?w=800&h=600&fit=crop&auto=format",
    ],
    stats: [
      { label: "Affitto bilocale", value: "900–1.400€" },
      { label: "Atmosfera", value: "Internazionale" },
      { label: "Vita notturna", value: "Alta" },
      { label: "Verde urbano", value: "Media" },
    ],
  },
  {
    id: "elcarmen",
    name: "El Carmen",
    tag: "cultura",
    tagLabel: "Medievale",
    desc: "Mura romane, chiese barocche, la scena alternativa e la nightlife valenciana.",
    longDesc: "El Carmen è il quartiere più antico di Valencia, racchiuso tra le torri medievali di Serranos e Quart. Camminare per le sue strade significa attraversare duemila anni di storia: pavimentazioni romane, archi arabi, chiese gotiche e barocche, cortili rinascimentali. Di giorno è un museo a cielo aperto; di notte la scena dei bar e dei locali alternativi prende vita. L'IVAM — il museo di arte moderna — si affaccia sui Jardines del Turia ed è uno dei migliori musei della Spagna.",
    img: "https://images.unsplash.com/photo-1698141825633-a34c5f129225?w=1200&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1719401542194-95139aed215c?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1605792457949-cba6fe61be3d?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1759244569220-3cee1243cbb2?w=800&h=600&fit=crop&auto=format",
    ],
    stats: [
      { label: "Affitto bilocale", value: "850–1.300€" },
      { label: "Atmosfera", value: "Artistica" },
      { label: "Vita notturna", value: "Molto alta" },
      { label: "Verde urbano", value: "Bassa" },
    ],
  },
  {
    id: "cabanyal",
    name: "Cabanyal",
    tag: "scoprire",
    tagLabel: "Sul mare",
    desc: "Antico quartiere dei pescatori, case colorate, spiaggia a pochi passi.",
    longDesc: "Il Cabanyal è uno dei quartieri più affascinanti e in trasformazione di Valencia. Ex quartiere dei pescatori, con le sue case colorate, i murales e i portali decorati in stile modernista valenciano, sta vivendo una rinascita lenta ma costante dopo decenni di abbandono e una controversa proposta di demolizione per aprire un viale verso il mare (poi bloccata). La spiaggia è raggiungibile a piedi in cinque minuti. I prezzi sono ancora più accessibili rispetto a Ruzafa.",
    img: "https://images.unsplash.com/photo-1746183383248-eff19af180c0?w=1200&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1529437971227-3344caa48ce2?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1759244567408-9bc3ed2f4af6?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1603803721487-97009eb7f8db?w=800&h=600&fit=crop&auto=format",
    ],
    stats: [
      { label: "Affitto bilocale", value: "700–1.100€" },
      { label: "Atmosfera", value: "Autentica" },
      { label: "Vita notturna", value: "Media" },
      { label: "Verde urbano", value: "Alta (spiaggia)" },
    ],
  },
  {
    id: "benimaclet",
    name: "Benimaclet",
    tag: "guide",
    tagLabel: "Alternativo",
    desc: "Università, huerta, mercatini bohémien e la Valencia più autentica.",
    longDesc: "Benimaclet è il quartiere degli studenti e degli alternativi. Vicino all'Università Politecnica, ha una vita culturale intensa: cinema d'essai, librerie indipendenti, mercatini del weekend all'aperto e bar dove si suona musica dal vivo. Il confine con la huerta — la pianura agricola che circonda Valencia — è a pochi minuti a piedi: in bici si raggiungono i campi coltivati e i canali d'irrigazione storici. I prezzi degli affitti sono tra i più accessibili delle zone centrali.",
    img: "https://images.unsplash.com/photo-1605792457949-cba6fe61be3d?w=1200&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1694347592859-6879e6b70d2c?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1698141825633-a34c5f129225?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1746183383248-eff19af180c0?w=800&h=600&fit=crop&auto=format",
    ],
    stats: [
      { label: "Affitto bilocale", value: "650–950€" },
      { label: "Atmosfera", value: "Universitaria" },
      { label: "Vita notturna", value: "Media" },
      { label: "Verde urbano", value: "Alta" },
    ],
  },
  {
    id: "patacona",
    name: "Patacona",
    tag: "quartieri",
    tagLabel: "Spiaggia",
    desc: "Lungomare tranquillo, perfetto per famiglie. Nord della città, affitti competitivi.",
    longDesc: "La Patacona è la zona balneare a nord di Valencia, oltre il Cabanyal. Un lungo lungomare tranquillo, con spiagge più larghe e meno affollate di quelle del centro, perfetto per famiglie e per chi vuole vivere a due passi dal mare. Il quartiere è servito dalla metro (linea 2) e in estate si anima con chiringuitos e ristoranti di pesce lungo il paseo marítimo. I prezzi degli affitti sono competitivi nonostante la posizione privilegiata.",
    img: "https://images.unsplash.com/photo-1746183383145-a31b98b563b7?w=1200&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1759244569220-3cee1243cbb2?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1588276552401-30058a0fe57b?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1780639026821-f680fae0d99d?w=800&h=600&fit=crop&auto=format",
    ],
    stats: [
      { label: "Affitto bilocale", value: "750–1.100€" },
      { label: "Atmosfera", value: "Balneare" },
      { label: "Vita notturna", value: "Bassa" },
      { label: "Verde urbano", value: "Spiaggia" },
    ],
  },
  {
    id: "ensanche",
    name: "Ensanche",
    tag: "vivere",
    tagLabel: "Moderno",
    desc: "Grandi viali, palazzi liberty, i migliori ristoranti e le boutique di Valencia.",
    longDesc: "L'Ensanche — o Eixample — è il quartiere borghese per eccellenza di Valencia. Pianificato nell'Ottocento sul modello barcellonese, con grandi viali alberati e palazzi in stile modernista, è oggi la zona dei ristoranti di livello, delle boutique di design e degli appartamenti più eleganti. Il Mercado de Colón — un'altra perla del modernismo valenciano — è il punto di riferimento per brunch e aperitivi di qualità. Gli affitti sono i più alti della città, ma la qualità della vita è eccellente.",
    img: "https://images.unsplash.com/photo-1529437971227-3344caa48ce2?w=1200&h=800&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1719401542194-95139aed215c?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1647693629037-0f153313aeb1?w=800&h=600&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1698141825633-a34c5f129225?w=800&h=600&fit=crop&auto=format",
    ],
    stats: [
      { label: "Affitto bilocale", value: "1.100–1.800€" },
      { label: "Atmosfera", value: "Residenziale" },
      { label: "Vita notturna", value: "Media" },
      { label: "Verde urbano", value: "Alta" },
    ],
  },
];

export const events = [
  { id: "cinema-marina", day: "23", month: "Ago", title: "Cinema d'estate alla Marina", place: "Marina de Valencia", cat: "eventi", catLabel: "Cultura" },
  { id: "mercatino-ruzafa", day: "24", month: "Ago", title: "Mercatino artigianale di Ruzafa", place: "Plaza del Mercado", cat: "vivere", catLabel: "Mercati" },
  { id: "jazz-cabecera", day: "25", month: "Ago", title: "Concerti Jazz al Parque de Cabecera", place: "Parque de Cabecera", cat: "cultura", catLabel: "Musica" },
  { id: "sagra-horchata", day: "26", month: "Ago", title: "Sagra dell'horchata ad Alboraya", place: "Alboraya", cat: "mangiare", catLabel: "Gastronomia" },
  { id: "tour-elcarmen", day: "28", month: "Ago", title: "Tour notturno di El Carmen", place: "Barrio El Carmen", cat: "quartieri", catLabel: "Tour" },
  { id: "festival-palau", day: "30", month: "Ago", title: "Festival indie al Palau de la Música", place: "Palau de la Música", cat: "cultura", catLabel: "Musica" },
];

export const navItems = [
  { id: "vivere", label: "Vivere" }, { id: "scoprire", label: "Scoprire" },
  { id: "mangiare", label: "Mangiare" }, { id: "eventi", label: "Eventi" },
  { id: "cultura", label: "Cultura" }, { id: "quartieri", label: "Quartieri" },
  { id: "guide", label: "Guide" },
];

export const meta: React.CSSProperties = {
  fontFamily: "Inter", fontSize: ".57rem", fontWeight: 500,
  letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#AAA",
};

export const excerpt: React.CSSProperties = {
  fontFamily: "Inter", fontWeight: 400, fontSize: ".9rem", lineHeight: 1.75, color: "#555",
};
