const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  // first click
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  // card match?
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

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

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener("click", flipCard));

/* const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  // first click
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  // card match?
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //  we have a match!
    disableCards();
  } else {
    // no match
    unflipCards();
  }

  function disableCards() {
    firstCard.removeEventlistener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classlist.remove("flip");
      secondCard.classlist.remove("flip");

      lockBoard = false;
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();

  cards.forEach(card => card.addEventListener("click", flipCard));
} */
