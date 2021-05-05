//Goal of major project is to create a Connect 4 style game
//-Make sure each player has a turn
//-Make sure winner is decided when 4 chips are in a row 
//-Make announcement for winner
//-Reset game board through button
// code adapted from: SteamCodeYT 
$(document).ready(function() {
  var player = 1;
  var winner = 0;
  var colors = {};
  colors[-1] = "RED";
  colors[1] = "YELLOW";
  var count = 0;

  // Set each circle to a background color dedecated to a player in order to act as game chips
  $(".circle").each(function() {
    $(this).attr("id", count);
    $(this).attr("data-player", 0);
    count++;

    $(this).click(function() {
      if (isValid($(this).attr("id"))) {
        $(this).css("background-color", colors[player]);
        $(this).attr("data-player", player);
        if (checkWin(player)) {
          alert(colors[player] + " is the WINNER!"); //If a winner is found announce who won
          winner = player;
        }
        player *= -1;
      }
    });
  });

  //Reset the game board when button is clicked

  $("#reset").click(function() {
    clearBoard();
  });


  function clearBoard() {
    $(".circle").each(function() {
      $(this).attr("data-player", 0);
      $(this).css("background-color", "#457FBA");

      winner = 0;
    });
  }

  function isValid(n) {
    var id = parseInt(n);
    if (winner !== 0) {
      return false;
    }
    if ($("#" + id).attr("data-player") === "0") {
      if (id >= 35) {
        return true;
      }
      if ($("#" + (id + 7)).attr("data-player") !== "0") {
        return true;
      }
    }
    return false;
  }

  function checkWin(p) {

    //check rows for 4 chips in a row to decide for a winner
    var chain = 0;
    for (var i = 0; i < 42; i += 7) {
      for (var j = 0; j < 7; j++) {
        var circle = $("#" + (i + j));
        if (circle.attr("data-player") == p) {
          chain++;
        } else {
          chain = 0;
        }

        if (chain >= 4) {
          return true;
        }
      }
      chain = 0;
    }

    //check columns for 4 chips in a row to decide for a winner
    chain = 0;
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 42; j += 7) {
        var circle = $("#" + (i + j));
        if (circle.attr("data-player") == p) {
          chain++;
        } else {
          chain = 0;
        }

        if (chain >= 4) {
          return true;
        }
      }
      chain = 0;
    }

    //check diagonals for 4 chips in a row to decide for a winner
    var topLeft = 0;
    var topRight = topLeft + 3;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if ($("#" + topLeft).attr("data-player") == p &&
          $("#" + (topLeft + 8)).attr("data-player") == p &&
          $("#" + (topLeft + 16)).attr("data-player") == p &&
          $("#" + (topLeft + 24)).attr("data-player") == p) {
          return true;
        }

        if ($("#" + topRight).attr("data-player") == p &&
          $("#" + (topRight + 6)).attr("data-player") == p &&
          $("#" + (topRight + 12)).attr("data-player") == p &&
          $("#" + (topRight + 18)).attr("data-player") == p) {
          return true;
        }

        topLeft++;
        topRight = topLeft + 3;
      }
      topLeft = i * 7 + 7;
      topRight = topLeft + 3;
    }

    return false;
  }
});