let cards = undefined;

let hasFlippedCard = false;
let lockBoard = false;
var firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.time === secondCard.dataset.time;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  //firstCard.classList.add("disable");
  //secondCard.classList.add("disable");

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * cards.length);
  });
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
}

function domReady(fn) {
  // If we're early to the party
  document.addEventListener("DOMContentLoaded", fn);
  // If late; I mean on time.
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    fn();
  }
}

/*
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    try {
      navigator.serviceWorker.register("serviceWorker.js");
      console.log("Service Worker Registered");
    } catch (error) {
      console.log("Service Worker Registration Failed");
    }
  }
});
*/

var Time = function(nome, rotulo) {
  this.nome = nome;
  this.rotulo = rotulo;
};

var times = [];
times.push(new Time("Ceará", "ceara"));
times.push(new Time("Chapecoense", "chapecoense"));
times.push(new Time("Cruzeiro", "cruzeiro"));
times.push(new Time("Flamengo", "flamengo"));
times.push(new Time("Fluminense", "fluminense"));
times.push(new Time("Goiás", "goias"));
times.push(new Time("Grêmio Football Portoalegrense", "gremio"));
times.push(new Time("Íbis", "ibis"));
times.push(new Time("Internacional", "internacional"));
times.push(new Time("Palmeiras", "palmeiras"));
//times.push(new Time("Vasco", "vasco"));
times.push(new Time("Santos", "santos"));
times.push(new Time("Athletico Paranaense", "atletico-paranaense"));
times.push(new Time("Botafogo", "botafogo"));
times.push(new Time("São Paulo", "sao-paulo"));

domReady(function() {
  let memoryGame = document.querySelector(".memory-game");

  shuffleArray(times);
  let tamanho = 20;
  let controle = 0;
  for (time of times) {
    if (controle == tamanho) break;

    let memoryCard = document.createElement("div");
    memoryCard.className = "memory-card";
    memoryCard.dataset.time = time.rotulo;

    let frontFace = document.createElement("img");
    frontFace.className = "front-face";
    frontFace.src = "assets/images/" + time.rotulo + ".svg";
    frontFace.alt = time.nome;

    memoryCard.appendChild(frontFace);

    let backFace = document.createElement("img");
    backFace.className = "back-face";
    backFace.src = "assets/images/cbf.svg";
    backFace.alt = "Confederação Brasileira de Futebol";

    memoryCard.appendChild(backFace);

    memoryGame.appendChild(memoryCard);
    controle++;
    memoryGame.appendChild(memoryCard.cloneNode(true)); //duas vezes ;)
    controle++;
  }

  cards = document.querySelectorAll(".memory-card");
  cards.forEach(card => card.addEventListener("click", flipCard));

  shuffle();

  //cards.forEach(card => card.classList.add("flip")); //teste
});
