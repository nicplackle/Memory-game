const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
// Variable to lock the board when player is flipping the cards
let lockBoard = false;
let firstCard;
let secondCard;

// Access the <ul> element for the star rating section and then the <li> elements within it
// const star = document.getElementById("star-rating").querySelectorAll(".star");
// Variable to keep track of how many stars are left
// let starCount = 3;

// Select the class moves-counter and change it's HTML
const movesCount = document.querySelector(".moves-counter");
// Create variable for moves counter, start the count at zero
let moves = 0;
// end moves test

// Access the reset button
const reset = document.querySelector(".reset-btn");

// Span tag for the timer
const timeCounter = document.querySelector(".timer");
let time;
let minutes = 0;
let seconds = 0;
let timeStart = false;

// Reset
document.getElementById("reset").onclick = function() {
  window.location.reload();
};

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
  movesCounter();
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

// timer test
function timer() {
  // Update the count every 1 second
  if (timeStart) {
    return;
  }
  timeStart = true;
  time = setInterval(function() {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    // Update the timer in HTML with the time it takes the user to play the game
    timeCounter.innerHTML =
      "<i class='fa fa-clock'></i>" +
      " Timer: " +
      minutes +
      " Mins " +
      seconds +
      " Secs";
  }, 1000);
}

// end timer test

cards.forEach(card => card.addEventListener("click", flipCard));
cards.forEach(card => card.addEventListener("click", timer));
