(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
  };

	var clickedPile;

  Game.prototype.turn = function () {

  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.run = function () {
    var game = this;
		game.installPileHandles();
    //
    // READER.question("Enter a starting tower: ",function (start) {
    //   var startTowerIdx = parseInt(start);
    //   READER.question("Enter an ending tower: ", function (end) {
    //     var endTowerIdx = parseInt(end);
    //     game.takeTurn(startTowerIdx,endTowerIdx);
    //   });
    // });
  };

  Game.prototype.takeTurn = function (start,end){
    var game = this;


    if (game.move(start,end)) {
      //console.log(game.towers);
    } else {
     // console.log("Invalid move!")
    }

    if (game.isWon()) {
     // console.log("You win!");
     // READER.close();
    } else {
      game.run();
    }
  }

	// Game.prototype.installPileHandles = function() {
// 		var currentGame = this;
// 		$("#pile1").on("click", function() {
// 			if (clickedPile != null && currentGame.isValidMove(clickedPile, $('.pile').index($(this)))) {
// 				console.log(clickedPile);
// 				var lastDiv = $("#pile" + (clickedPile + 1) + " div").last();
// 				currentGame.move(clickedPile, $('.pile').index($(this)));
// 				$(lastDiv).remove();
// 				$(this).append(lastDiv);
// 				clickedPile = null;
// 				if (currentGame.isWon()) {
// 					$('body').append("<img src='success_baby.jpg'>");
// 				}
// 			}
// 			else {
// 				clickedPile = $('.pile').index(this);
// 				console.log(clickedPile);
// 			}
// 		});
// 		$("#pile2").on("click", function() {
// 			if (clickedPile != null && currentGame.isValidMove(clickedPile, $('.pile').index($(this)))) {
// 				console.log(clickedPile);
// 				console.log("successfully in pile2");
// 				var lastDiv = $("#pile" + (clickedPile + 1) + " div").last();
// 				currentGame.move(clickedPile, $('.pile').index($(this)));
// 				$(lastDiv).remove();
// 				$(this).append(lastDiv);
// 				clickedPile = null;
// 				if (currentGame.isWon()) {
// 					$('body').append("<img src='success_baby.jpg'>");
// 				}
// 			}
// 			else {
// 				clickedPile = $('.pile').index(this);
// 			}
// 		});
// 		$("#pile3").on("click", function() {
// 			if (clickedPile != null && currentGame.isValidMove(clickedPile, $('.pile').index($(this)))) {
// 				console.log(clickedPile);
// 				var lastDiv = $("#pile" + (clickedPile + 1) + " div").last();
// 				currentGame.move(clickedPile, $('.pile').index($(this)));
// 				$(lastDiv).remove();
// 				$(this).append(lastDiv);
// 				clickedPile = null;
// 				if (currentGame.isWon()) {
// 					$('body').append("<img src='success_baby.jpg'>");
// 				}
// 			}
// 			else {
// 				clickedPile = $('.pile').index(this);
// 			}
// 		});
// 	}

})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.

//var Game = new this.Hanoi.Game();
//Game.run();
