"use strict";
const startbtn = document.querySelector(".start-btn");
const endbtn = document.querySelector(".end-btn");
const startwindow = document.querySelector(".options-screen");

let playing = false;

const posList = [
  document.querySelector(".pos-1"),
  document.querySelector(".pos-2"),
  document.querySelector(".pos-3"),
  document.querySelector(".pos-4"),
  document.querySelector(".pos-5"),
  document.querySelector(".pos-6"),
  document.querySelector(".pos-7"),
  document.querySelector(".pos-8"),
  document.querySelector(".pos-9"),
];

// Here i will create the internal representation of our board

var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

function is_free(position) {
  if (board[position] == " ") {
    return true;
  } else {
    return false;
  }
}

function check_draw() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] == " ") {
      return false;
    }
  }
  return true;
}

function check_win() {
  if (board[0] == board[1] && board[0] == board[2] && board[0] != " ") {
    return true;
  } else if (board[3] == board[4] && board[3] == board[5] && board[3] != " ") {
    return true;
  } else if (board[6] == board[7] && board[6] == board[8] && board[6] != " ") {
    return true;
  } else if (board[0] == board[3] && board[0] == board[6] && board[0] != " ") {
    return true;
  } else if (board[1] == board[4] && board[1] == board[7] && board[1] != " ") {
    return true;
  } else if (board[2] == board[5] && board[2] == board[8] && board[2] != " ") {
    return true;
  } else if (board[0] == board[4] && board[0] == board[8] && board[0] != " ") {
    return true;
  } else if (board[6] == board[4] && board[6] == board[2] && board[6] != " ") {
    return true;
  } else {
    return false;
  }
}

function check_win_mark(mark) {
  if (board[0] == board[1] && board[0] == board[2] && board[0] == mark) {
    return true;
  } else if (board[3] == board[4] && board[3] == board[5] && board[3] == mark) {
    return true;
  } else if (board[6] == board[7] && board[6] == board[8] && board[6] == mark) {
    return true;
  } else if (board[0] == board[3] && board[0] == board[6] && board[0] == mark) {
    return true;
  } else if (board[1] == board[4] && board[1] == board[7] && board[1] == mark) {
    return true;
  } else if (board[2] == board[5] && board[2] == board[8] && board[2]) {
    return true;
  } else if (board[0] == board[4] && board[0] == board[8] && board[0] == mark) {
    return true;
  } else if (board[6] == board[4] && board[6] == board[2] && board[6] == mark) {
    return true;
  } else {
    return false;
  }
}

function insertLetter(letter, position) {
  if (is_free(position)) {
    board[position] = letter;
    posList[position].innerHTML = letter;
    if (check_draw()) {
      console.log("Draw");
    }
    if (check_win()) {
      if (letter == "X") {
        console.log("BOT WINS");
      } else {
        console.log("User wins");
      }
    }
    return;
  } else {
    console.log("That position is not available");
  }
}

const user = "O";
const bot = "X";

//Start listener
startbtn.addEventListener("click", function () {
  startwindow.style.display = "none";
  playing = true;
});

//Exit listener
endbtn.addEventListener("click", function () {
  playing = false;
  location.reload();
});

for (let i = 0; i < posList.length; i++) {
  posList[i].addEventListener("click", function () {
    insertLetter(user, i);
  });
}
