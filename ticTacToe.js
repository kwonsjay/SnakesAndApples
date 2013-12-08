(function (root) {

  var TTT = root.TTT = (root.TTT || {});

  var Game = TTT.Game = function TT() {
    this.player = Game.marks[0];
    this.board = this.makeBoard();
  }

  Game.marks = ["x", "o"];

  Game.prototype.diagonalWinner = function () {
    var game = this;

    var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
    var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

    var winner = null;
    _(Game.marks).each(function (mark) {
      function didWinDiagonal (diagonalPositions) {
        return _.every(diagonalPositions, function (pos) {
          return game.board[pos[0]][pos[1]] === mark;
        });
      }

      var won = _.any(
        [diagonalPositions1, diagonalPositions2],
        didWinDiagonal
      );

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.isEmptyPos = function (pos) {
    return (this.board[pos[0]][pos[1]] === null);
  };

  Game.prototype.horizontalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (i) {
        return _(indices).every(function (j) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.makeBoard = function () {
    return _.times(3, function (i) {
      return _.times(3, function (j) {
        return null;
      });
    });
  };

  Game.prototype.move = function (pos) {
    if (!this.isEmptyPos(pos)) {
      return false;
    }

    this.placeMark(pos);
    this.switchPlayer();
    return true;
  };

  Game.prototype.placeMark = function (pos) {
    this.board[pos[0]][pos[1]] = this.player;
  };

  Game.prototype.switchPlayer = function () {
    if (this.player === Game.marks[0]) {
      this.player = Game.marks[1];
    } else {
      this.player = Game.marks[0];
    }
  };

  Game.prototype.valid = function (pos) {
    function isInRange (pos) {
      return (0 <= pos) && (pos < 3);
    }

    return _(pos).all(isInRange) && _.isNull(this.board[pos[0]][pos[1]]);
  };

  Game.prototype.verticalWinner = function () {
    var game = this;

    var winner = null;
    _(Game.marks).each(function (mark) {
      var indices = _.range(0, 3);

      var won = _(indices).any(function (j) {
        return _(indices).every(function (i) {
          return game.board[i][j] === mark;
        });
      });

      if (won) {
        winner = mark;
      }
    });

    return winner;
  };

  Game.prototype.winner = function () {
		that = this;
     if( this.diagonalWinner() ) {
			 $("#win-status").append("Winner: " + that.diagonalWinner());
     }
     if( this.horizontalWinner() ) {
			 $("#win-status").append("Winner: " + that.horizontalWinner());
     }
     if( this.verticalWinner() ) {
			 $("#win-status").append("Winner: " + that.verticalWinner());
     }
  };

  Game.prototype.run = function () {
    var game = this;
		game.installTileHandler();
  }

  Game.prototype.turn = function (callback) {
    var game = this;
  }

	Game.prototype.installTileHandler = function() {
// 		tiles = $('.tile');
	currentGame = this;
// 		for (var index = 0; index < 9; ++index) {
// 				row = Math.floor(index / 3);
// 				col = index % 3;
// 				console.log(row);
// 				console.log(col);
// 				$(tiles[index]).on("click", function () {
// 					if (currentGame.valid([row,col])) {
// 						console.log("test");
// 						currentGame.markCurrentPlayersTile(this);
// 						currentGame.move([row,col]);
// 						currentGame.winner();
// 					}
// 				});
// 		}
//   }
			//
			// for (var row = 0; row < 3; row++) {
			// 	for (var col = 0; col < 3; col++) {
			// 		var divName = "#row" + row + "col" + col;
			// 		console.log(divName);
			//
			// 		$(divName).on("click", function() {
			// 			console.log("inside handler");
			// 			console.log(currentGame.valid([row,col]));
			// 			console.log([row,col]);
			// 			if (currentGame.valid([row,col])) {
			// 				console.log(this);
			// 				currentGame.markCurrentPlayersTile(this);
			// 				currentGame.move([row,col]);
			// 				currentGame.winner();
			// 			}
			// 		});
			// 	}
			// }

			$("#row1col1").on("click", function() {
				if (currentGame.valid([0,0])) {
				  currentGame.markCurrentPlayersTile(this);
					currentGame.move([0,0]);
					currentGame.winner();
			  }
			});
			$( "#row1col2" ).on("click", function() {
					if (currentGame.valid([0,1])) {
			   currentGame.markCurrentPlayersTile(this);
				 currentGame.move([0,1]);
				 currentGame.winner();
				 }
			});
			$( "#row1col3" ).on("click", function() {
					if (currentGame.valid([0,2])) {
			   currentGame.markCurrentPlayersTile(this);
				 currentGame.move([0,2]);
				 currentGame.winner();
				 }
			});
			$( "#row2col1" ).on("click", function() {
					if (currentGame.valid([1,0])) {
			   currentGame.markCurrentPlayersTile(this);
				 currentGame.move([1,0]);
				 currentGame.winner();
				 }
			});
			$( "#row2col2" ).on("click", function() {
					if (currentGame.valid([1,1])) {
			   currentGame.markCurrentPlayersTile(this);
				 currentGame.move([1,1]);
				 currentGame.winner();
				 }
			});
			$( "#row2col3" ).on("click", function() {
					if (currentGame.valid([1,2])) {
			   currentGame.markCurrentPlayersTile(this);
				 currentGame.move([1,2]);
				 currentGame.winner();
				 }
			});
			$( "#row3col1" ).on("click", function() {
					if (currentGame.valid([2,0])) {
			   currentGame.markCurrentPlayersTile(this);
				 currentGame.move([2,0]);
				 currentGame.winner();
				 }
			});
			$( "#row3col2" ).on("click", function() {
					if (currentGame.valid([2,1])) {
			  currentGame.markCurrentPlayersTile(this);
				currentGame.move([2,1]);
				currentGame.winner();
				}
			});
			$( "#row3col3" ).on("click", function() {
					if (currentGame.valid([2,2])) {
			   currentGame.markCurrentPlayersTile(this);
				 currentGame.move([2,2]);
				 currentGame.winner();
			 }
			});
	 };

	Game.prototype.markCurrentPlayersTile = function(that) {
		var currentGame = this;
		$(that).append('<p>' + currentGame.player + '</p>')

	};
})(this);