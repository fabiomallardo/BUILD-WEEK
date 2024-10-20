const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

//----------------------- NICOLO ----------------------------
const form = document.getElementById("Form");
const checkbox = document.getElementById("terms");
const submitButton = document.getElementById("btnSub");

if (submitButton) {
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      submitButton.classList.remove('btnOff');
      submitButton.classList.add('btnOn');
      submitButton.disabled = false;

    } else {
      submitButton.classList.remove('btnOn');
      submitButton.classList.add('btnOff');
      submitButton.disabled = true;
    }
  });

  submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    nicoloOff()
  });

}

//Nasconde Nicolò nel DOM e svela Diego + Andrea
function nicoloOff() {
  let nicolo = document.getElementById('nicolo')
  let diego = document.getElementById('diego')
  let andrea = document.getElementById('andrea')
  if (nicolo) nicolo.style.display = 'none'
  if (diego) diego.style.display = 'block'
  if (andrea) andrea.style.display = 'block'
  domandaRandom()
}

//------------------------ ANDREA ---------------------------
let counter = 60;
let timer = null;
let tempo = document.getElementById('tempo'); // Il contatore numerico
let cerchio = document.querySelector('.cerA'); // Seleziona il cerchio animato
let conteggioDomanda = document.getElementById('conteggio_domanda'); // Contatore domande
let nDomanda = 1; // Contatore domande

let circonferenza = 450; // Valore del dasharray e dashoffset iniziali

// Funzione per aggiornare la visualizzazione del cerchio
function progresso(pro) {
  let offset = circonferenza - (pro / 100) * circonferenza;
  cerchio.style.strokeDashoffset = offset;
}

// Funzione per avviare o resettare il timer
function avviaTimer() {
  if (timer !== null) {
    clearInterval(timer); // Ferma il timer precedente
  }

  counter = 10; // Reimposta il contatore a 60 secondi
  tempo.innerHTML = counter; // Aggiorna il contatore numerico
  progresso(100); // Reimposta il cerchio a pieno (100%)

  // Crea un nuovo timer che decrementa il contatore e aggiorna il cerchio
  timer = setInterval(function () {
    if (counter == 0) { // Controlla se il contatore ha raggiunto il valore di 0
      domandaRandom() // Se a zero, passa alla prosima domanda
      noAnswer() // fa partire la funzione che aggiunge in risposte non date
      counter = 10
      aggiorna_footer()
    }
    if (counter > 0) {
      tempo.innerHTML = counter; // Aggiorna il testo del tempo
      let anim = -(counter / 10) * 100; // Calcola la percentuale rimanente
      progresso(anim); // Aggiorna il cerchio in base alla percentuale
      counter -= 1;
    } else {
      clearInterval(timer); // Ferma il timer quando arriva a 0
    }
    // Stop del timer al superamento della
    if (nDomanda > 10) {
      clearInterval(timer)
    }

  }, 1000);
}

function aggiorna_footer() {
  if (nDomanda <= 10) {
    nDomanda += 1
    conteggioDomanda.innerHTML = nDomanda
  }
}

//----------------------- DIEGO ----------------------
document.getElementById('btnProcedi').addEventListener('click', domandaRandom)
document.getElementById('btnProcedi').addEventListener('click', aggiorna_footer)

//funzione che si attiva quando premiamo il "Proceed" della domanda 10. Nasconde Diego, Andrea e svela Fabio
function nascondiDie() {
  document.getElementById('diego').style.display = 'none'
  document.getElementById('andrea').style.display = 'none'
  document.getElementById('fabio').style.display = 'block'
  return fine()
}

let domandeUsate = [] //deposito domande fatte
let scelta = null //memorizzazione della domanda corrente


// array per la gestione dei bottoni nel DOM
let bottoni = [
  document.getElementById('button1'),
  document.getElementById('button2'),
  document.getElementById('button3'),
  document.getElementById('button4')
]

//Funzione Selezione Domande e risposte
function domandaRandom() {
  avviaTimer()

  //In questo modo, ogni volta che riparte la ricerca domanda, i botoni selezionati precedentemente si resettano
  bottoni.forEach(function (btn) {
    btn.classList.remove('selected')
  })

  //Stop scelta domande a test terminato
  if (domandeUsate.length === questions.length) {
    return nascondiDie()
  }

  //Generatore indice casuale per scelta Gruppo QA (Questions and Answer)
  let indiceDomanda = Math.floor(Math.random() * questions.length);

  //Scelta QA e inclusione in deposito usate
  if (domandeUsate.includes(indiceDomanda)) {
    return domandaRandom();
  }
  else {
    domandeUsate.push(indiceDomanda);
    scelta = questions[indiceDomanda];
  }

  // posiziona la domanda scelta casualmente nel DOM
  let domanda = document.getElementById('domande')
  domanda.innerHTML = scelta.question
  // console.log('Domanda:')
  // console.log(scelta.question)
  
    // Creazione array possibili risposte, con rimescolamento
  let opzioni = [...scelta.incorrect_answers, scelta.correct_answer];
  let risposte = dispoRandom(opzioni)
  // let tipo = scelta.type

  /*questa funzione genera un rimescolamento dell'array opzioni. In questo modo la risposta corretta cambierà
  continuamente posizione, evitando di finire sempre sullo stesso pulsante del DOM.
  */
  function dispoRandom(array) {
    for (i = array.length - 1; i > 0; i--) {
      let indiceRandom = Math.floor(Math.random() * (i + 1));
      [array[i], array[indiceRandom]] = [array[indiceRandom], array[i]]
    }
    return array
  }

  for (let i = 0; i < bottoni.length; i++) {
    if (risposte[i] !== undefined) {
      bottoni[i].style.display = 'block';
      bottoni[i].innerHTML = `<button class="button">${risposte[i]}</button>`
    }
    else {
      bottoni[i].style.display = 'none';
    }
  }
}

// ----------------------------- ELIA VERFICA e RACCOLTA risposte ------------------------------------
let corrette = [];
let sbagliate = [];
let nessunaRisposta = [];
let rispostaCliccata = null;

// Funzione per verificare la risposta
function verificaRisposta(event) {
  let rispostaCliccata = event.target.innerText;

  if (!scelta) {
    return; //in assenza di una domanda scelta, interrompe.
  }

  if (rispostaCliccata === scelta.correct_answer) {
    corrette.push(scelta.question);
  } else {
    sbagliate.push(scelta.question);
  }
}
// Aggiungi gli event listener ai pulsanti
bottoni.forEach(function (button) {
  button.addEventListener('click', verificaRisposta);
});

// risposte non date alla scadenza del tempo
function noAnswer() {
  if (scelta && !corrette.includes(scelta.question) && !sbagliate.includes(scelta.question)) {
    nessunaRisposta.push(scelta.question)
  }
}

//------------- Colora Bottone Scelto ----------------------

for (let i = 0; i < bottoni.length; i++) {
  bottoni[i].addEventListener('click', function () {
    bottoni.forEach(function (btn) {
      btn.classList.remove('selected')
    })
    // Verifica se il bottone cliccato è già selezionato
    if (bottoni[i].classList.contains('selected')) {
      // Deseleziona il bottone
      bottoni[i].classList.remove('selected');

    } else {
      bottoni[i].classList.add('selected');

    }
  });
}

//-------------------------- FABIO Pagina RISULTATI ----------------------------

let risultatiDiv = document.getElementById("mostraRisultati");
let dettagliDiv = document.getElementById("ulterioridettagli");
let primoH2 = document.getElementById("esito");
let span2 = document.getElementById("percentuale");
let span3 = document.getElementById("numeroDomande");
let primoH = document.getElementById("primo");
let secondoH = document.getElementById("secondo");
let terzoH = document.getElementById("terzo");
let quartoH = document.getElementById("quarto");

// let risposteGiuste = corrette.length; // Cambia questo valore in base alle risposte
// let totaleDomande = 10; // Totale delle domande
// let sogliaPromozione = 6; // Soglia per essere promossi

function fine() {
  let risposteGiuste = corrette.length; // Cambia questo valore in base alle risposte
  let totaleDomande = domandeUsate.length; // Totale delle domande
  let sogliaPromozione = 6; // Soglia per essere promossi

  if (risposteGiuste >= sogliaPromozione) {
    primoH2.textContent = "Superato";
  } else {
    primoH2.textContent = "Non Superato";
  }
  let percentuale = (risposteGiuste / totaleDomande) * 100;
  span2.textContent = "Percentuale: " + percentuale.toFixed(2) + "%";
  span3.textContent = risposteGiuste + " / " + totaleDomande + " domande ";

  primoH.textContent = risposteGiuste; // Risposte corrette
  secondoH.textContent = totaleDomande - risposteGiuste; // Risposte errate
  terzoH.textContent = nessunaRisposta.length; // Risposte vuote
  quartoH.textContent = totaleDomande; // Totale domande

  risultatiDiv.style.display = "block"; // Mostra il contenitore dei risultati
  dettagliDiv.style.display = "flex"; // Mostra i dettagli sotto il grafico
  // bottone.style.display = "none"; // Nascondi il bottone dopo il click

  animaCerchio(percentuale);
}

function animaCerchio(punteggio) {
  let cerchio = document.querySelector('.cer');
  let cerchioPerimetro = cerchio.getTotalLength();
  cerchio.style.strokeDasharray = cerchioPerimetro;
  cerchio.style.strokeDashoffset = cerchioPerimetro;
  let dashOffset = cerchioPerimetro * (1 - punteggio / 100);
  cerchio.style.transition = "stroke-dashoffset 3s ease-in-out";
  cerchio.style.strokeDashoffset = dashOffset;

  let DOM = document.getElementById("percentuale");
  let tempoAttuale = 0;
  let durata = 3000;
  let incremento = punteggio / (durata / 100);
  let intervallo = setInterval(() => {
    if (tempoAttuale < punteggio) {
      tempoAttuale += incremento;
      DOM.innerHTML = Math.floor(tempoAttuale) + "%";
    } else {
      clearInterval(intervallo);
      DOM.innerHTML = punteggio + "%";
    }
  }, 100);
}

// console.log('Tipo:')
// console.log(tipo)
// console.log('')
// console.log('verifica inserimento in Usate:')
// console.log(domandeUsate)
// console.log('Opzioni mescolate:')
// console.log(risposte)
// console.log('Opzioni originali')
// console.log(opzioni)
// console.log(`Pulsante 1: ${button1}, Pulsante 2: ${button2}`)
// console.log(`Pulsante 3: ${button3}, Pulsante 4: ${button4}`)
console.log('Giuste')
console.log(corrette)
console.log('Sbagliate')
console.log(sbagliate)
console.log('no Answer')
console.log(nessunaRisposta)
// console.log('Selezionata: ' + rispostaCliccata)
