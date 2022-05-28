"use strict";
const startbtn = document.querySelector(".start-btn");
const endbtn = document.querySelector(".end-btn");
const startwindow = document.querySelector(".options-screen");

const user = "O";
const bot = "X";

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

var board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

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
botMove();

for (let i = 0; i < posList.length; i++) {
  posList[i].addEventListener("click", function () {
    insertLetter(user, i);
    botMove();
  });
}

// Here i will create the internal representation of our board

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
    console.log("That space is not avaialble");
    return;
  }
}

function botMove() {
  var best_score = -800;
  var best_move = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i] == " ") {
      board[i] = bot;
      var score = minimax(board, 0, false);
      board[i] = " ";
      if (score > best_score) {
        best_score = score;
        best_move = i;
      }
    }
  }
  console.log(score);
  console.log(best_move);
  console.log(board);
  insertLetter("bot", best_move); // Here we inster the final move
  return;
}

function minimax(board, depth, is_maximizing) {
  if (check_win_mark(bot)) {
    return 1;
  } else if (check_win_mark(user)) {
    return -1;
  } else if (check_draw()) {
    return 0;
  }

  if (is_maximizing) {
    var best_score = -800;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == " ") {
        board[i] = bot;
        var score = minimax(board, 0, false);
        board[i] = " ";
        if (score > best_score) {
          best_score = score;
        }
      }
    }
    return best_score;
  } else {
    best_score = 800;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == " ") {
        board[i] = user;
        score = minimax(board, 0, true);
        board[i] = " ";
        if (score < best_score) {
          best_score = score;
        }
      }
    }
    return best_score;
  }
}

while (playing) {}
