const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

// stars test
// Access the <ul> element for the star rating section and then the <li> elements within it
const star = document.getElementById("star-rating").querySelectorAll(".star");
// Variable to keep track of how many stars are left
let starCount = 3;
// end stars test

// Select the class moves-counter and change it's HTML
const movesCount = document.querySelector(".moves-counter");
// Create variable for moves counter, start the count at zero
let moves = 0;
// end moves test

// Access the reset button
const reset = document.querySelector(".reset-btn");

// reset
document.getElementById("reset").onclick = function() {
  window.location.reload();
};
// reset

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

  // moves counter
  movesCounter();

  // stars test
  starRating();
  // end stars test
}

// moves counter
function movesCounter() {
  movesCount.innerHTML++;
  moves++;
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

// stars test
/*
Update the star rating.  Depending on the number of
moves the user completes the game, the stars will decrease
with the more moves the user takes.
*/
function starRating() {
  if (moves === 8) {
    // First element child is the <i> within the <li>
    star[2].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
  if (moves === 12) {
    star[1].firstElementChild.classList.remove("fa-star");
    starCount--;
  }
}
// stars test

cards.forEach(card => card.addEventListener("click", flipCard));
