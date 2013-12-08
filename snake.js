(function (window) {
  var Snakes = window.Snakes = (window.Snakes || {});

	var Snake = Snakes.Snake = function(dimX, dimY) {
		this.directions = ["N", "E", "S", "W"];
		this.currentDirection = ["N"];
    this.bounds = [dimX, dimY];
		this.segments = [new Coord(dimX / 2, dimY / 2), new Coord(dimX / 2 + 1, dimY / 2)];
    this.remove = new Coord(0,0);
    this.crashed = false;
    this.turned = false;
	};

  Snake.prototype.wrap = function(coord) {
    if (coord.row < 0) {
      coord.row += this.bounds[0];
    }
    else if (coord.row >= this.bounds[0]) {
      coord.row -= this.bounds[0];
    }
    if (coord.col < 0) {
      coord.col += this.bounds[1];
    }
    else if (coord.col >= this.bounds[1]) {
      coord.col -= this.bounds[1];
    }
    return coord;
  };
  
  
	Snake.prototype.move = function() {
    var that = this;
		var currentHead = this.segments[0];
    var newHead = this.wrap(currentHead.plus(this.currentDirection));
    this.remove = this.segments.pop();
    this.segments.forEach(function(segment){
      if (newHead.eql(segment)) {
        that.crashed = true;
      }
    });
		this.segments.unshift(newHead);
    this.turned = false;
	};

	Snake.prototype.turn = function(direction) {
		this.currentDirection = direction;
    this.turned = true;
	};

	var Coord = Snakes.Coord = function(row, col) {
		this.row = row;
		this.col = col;
	};

	Coord.prototype.plus = function(direction) {
		var row = this.row;
		var col = this.col;
		if (direction == "N") {
			row -= 1;
		}
		else if (direction == "E") {
			col += 1;
		}
		else if (direction == "S") {
			row += 1;
		}
		else {
			col -= 1;
		}
		return new Coord(row, col);
	};
  
  Coord.prototype.minus = function(direction) {
		var row = this.row;
		var col = this.col;
		if (direction == "N") {
			row += 1;
		}
		else if (direction == "E") {
			col -= 1;
		}
		else if (direction == "S") {
			row -= 1;
		}
		else {
			col += 1;
		}
		return new Coord(row, col);
  };
  
  Coord.prototype.eql = function(coord) {
    if (coord.row == this.row && coord.col == this.col) {
      return true;
    }
    return false;
  };

	var Board = Snakes.Board = function(dimX, dimY) {
		this.snake = new Snake(dimX, dimY);
    this.apples = [];
		this.dimX = dimX;
		this.dimY = dimY;
		this.grid = new Array(dimX);
		for (var i = 0; i < dimX; i++) {
			this.grid[i] = new Array(dimY);
			for (var j = 0; j < dimY; j++) {
				this.grid[i][j] = ".";
			}
		}
	};
  
  Board.prototype.default = function(coord) {
    this.grid[coord.row][coord.col] = ".";
    var $stile = $(".tile[data-row='" + coord.row + "'][data-col='" + coord.col + "']");
    $stile.css({"background": "white"});
  };
  
  Board.prototype.full = function() {
    for (var i = 0; i < this.dimX; i++) {
      for (var j = 0; j < this.dimY; j++) {
        if (this.grid[i][j] == ".") {
          return false;
        }
      }
    }
    return true;
  };

	Board.prototype.render = function() {
    var that = this;
    this.default(this.snake.remove);
		this.snake.segments.forEach( function(element, index, array) {
			that.grid[element.row][element.col] = "S";
      var $stile = $(".tile[data-row='" + element.row + "'][data-col='" + element.col + "']");
      if (index == 0) {
        $stile.css({"background": "#57ad68"});
      }
      else {
        $stile.css({"background": "#9cd5a7"});
      }
		});
    if (this.apples.length > 0) {
  		this.apples.forEach( function(element, index, array) {
  			that.grid[element.row][element.col] = "A";
        var $stile = $(".tile[data-row='" + element.row + "'][data-col='" + element.col + "']");
        $stile.css({"background": "ff7777"});
  		});
    }
	};
  
  Board.prototype.makeApple = function() {
    var that = this;
    var arow = Math.floor(Math.random() * this.dimX);
    var acol = Math.floor(Math.random() * this.dimY);
    var apple = new Coord(arow, acol);
    var conflict = true;
    while (conflict) {
      this.snake.segments.forEach(function(segment){
        if (apple.eql(segment)) {
          arow = Math.floor(Math.random() * that.dimX);
          acol = Math.floor(Math.random() * that.dimY);
          apple = new Coord(arow, acol);
          conflict = true;
        }
      });
      if (this.apples.length > 0) {
        that.apples.forEach(function(app){
          if (apple.eql(app)) {
            arow = Math.floor(Math.random() * that.dimX);
            acol = Math.floor(Math.random() * that.dimY);
            apple = new Coord(arow, acol);
            conflict = true;
          }
        });
      }
      conflict = false;
    }
    this.apples.push(apple);
  };
  
  Board.prototype.increment = function() {
    var that = this;
    this.apples.forEach(function(apple, index){
      if (apple.eql(that.snake.segments[0])) {
        var eaten = that.apples.splice(index, 1)[0];
        that.default(eaten);
        var $atile = $(".tile[data-row='" + eaten.row + "'][data-col='" + eaten.col + "']");
        $atile.css({"background": "white"});
        that.snake.segments.push(that.snake.wrap(that.snake.segments.slice(-1)[0].minus(that.snake.currentDirection)));
      }
    });
    var prob = Math.floor(Math.random() * this.dimX);
    this.snake.move();
    if (prob == 0) {
      this.makeApple();
    }
  };

  var Game = Snakes.Game = function($html) {
    this.$el = $html;
    this.board = new Board(30, 30);
    for(var i = 0; i < this.board.dimX; i++) {
      var divrow = $("<div class='row'></div>");
      for (var j = 0; j < this.board.dimY; j++) {
        var newdiv = "<div class='tile' data-row='" + i.toString() +  "' data-col='" + j.toString() + "'></div>";
        divrow.append(newdiv);
      }
      this.$el.append(divrow);
    }
    $(".tile").css({
      "width": (100 / j).toString() + "%",
      "height": (100 / i).toString() + "%"
    });
  };

  Game.prototype.check = function() {
    if (this.board.snake.crashed) {
      this.stop();
      alert("Game Over!");
    }
    if (this.board.full()) {
      this.stop();
      alert("You Win!");
    }
  };
  
  Game.prototype.step = function() {
    this.board.increment();
    this.check();
    this.board.render();
  };
  
  Game.prototype.stop = function() {
    window.clearInterval(intervalId);
  };

  Game.prototype.start = function() {
    var that = this;
    key('up', function() { 
      if (that.board.snake.currentDirection != "S" && !that.board.snake.turned){
        that.board.snake.turn("N");
      }
    });
    key('down', function() {
      if (that.board.snake.currentDirection != "N" && !that.board.snake.turned){
        that.board.snake.turn("S");
      }
    });
    key('left', function() {
      if (that.board.snake.currentDirection != "E" && !that.board.snake.turned){
        that.board.snake.turn("W");
      }
    });
    key('right', function() {
      if (that.board.snake.currentDirection != "W" && !that.board.snake.turned){
        that.board.snake.turn("E");
      }
    });
    this.board.render();
    intervalId = setInterval(that.step.bind(that), 100);
  };

})(this);