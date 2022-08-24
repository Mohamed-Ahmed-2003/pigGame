"use strict";
const dice = document.querySelector(".dice");
let checkWin = -1,
  playing = true,
  playerNumber = 0, // 0 || 1
  player_1 = {
    player: document.querySelector(".player--0"),
    score: 0,
    current_score: 0,
    setCurrentScore: function () {
      document.getElementById("current--0").textContent = this.current_score;
    },
    holdScore: function () {
      document.getElementById("score--0").textContent = this.score;
    },
  },
  player_2 = {
    player: document.querySelector(".player--1"),
    score: 0,
    current_score: 0,

    setCurrentScore: function () {
      document.getElementById("current--1").textContent = this.current_score;
    },
    holdScore: function () {
      document.getElementById("score--1").textContent = this.score;
    },
  },
  players = [player_1, player_2];
const hideTheDice = function () {
  dice.classList.add("hidden");
};
const showTheDice = function () {
  dice.classList.remove("hidden");
};
// set names
document.getElementById("name--0").textContent = prompt(
  "What is the name of player 1 ? "
).slice(0, 7);
document.getElementById("name--1").textContent = prompt(
  "What is the name of player 2 ? "
).slice(0, 7);

const statuePlayers = function () {
  players[playerNumber].player.classList.remove("player--active");
  players[playerNumber].current_score = 0;
  players[playerNumber].setCurrentScore();
  playerNumber = playerNumber === 0 ? 1 : 0;
  players[playerNumber].player.classList.add("player--active");
};
hideTheDice();

// new game button
document.querySelector(".btn--new").addEventListener("click", function () {
  if (checkWin !== -1)
    players[checkWin].player.classList.remove("player--winner");
  playerNumber = 1;
  statuePlayers();
  playing = true;
  for (let i = 0; i < players.length; i++) {
    players[i].current_score = 0;
    players[i].score = 0;
    players[i].setCurrentScore();
    players[i].holdScore();
  }
});

// roll-button event
document.querySelector(".btn--roll").addEventListener("click", function () {
  if (playing) {
    if (dice.classList.contains("hidden")) showTheDice();

    const randomDice = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${randomDice}.png`;
    if (randomDice !== 1) players[playerNumber].current_score += randomDice;
    else {
      players[playerNumber].current_score = 0;
      statuePlayers();
    }
    players[playerNumber].setCurrentScore();
  }
});

// hold-button event
document.querySelector(".btn--hold").addEventListener("click", function () {
  if (playing) {
    if (players[playerNumber].current_score !== 0) {
      players[playerNumber].score += players[playerNumber].current_score;
      players[playerNumber].holdScore();
    }
    if (players[playerNumber].score >= 100) {
      players[playerNumber].player.classList.add("player--winner");
      hideTheDice();
      checkWin = playerNumber;
      playing = false;
    }
    statuePlayers();
  }
});
