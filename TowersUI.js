(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});
  //var Game = Hanoi.Game = function () {};

	Hanoi.Game.prototype.installPileHandles = function() {
		var currentGame = this;
		$("#pile1").on("click", function() {
			if (Hanoi.clickedPile != null && currentGame.isValidMove(Hanoi.clickedPile, $('.pile').index($(this)))) {
				console.log(Hanoi.clickedPile);
				var lastDiv = $("#pile" + (Hanoi.clickedPile + 1) + " div").last();
				currentGame.move(Hanoi.clickedPile, $('.pile').index($(this)));
				$(lastDiv).remove();
				$(this).append(lastDiv);
				Hanoi.clickedPile = null;
				if (currentGame.isWon()) {
					$('body').append("<img src='success_baby.jpg'>");
				}
			}
			else {
				Hanoi.clickedPile = $('.pile').index(this);
				console.log(Hanoi.clickedPile);
			}
		});
		$("#pile2").on("click", function() {
			if (Hanoi.clickedPile != null && currentGame.isValidMove(Hanoi.clickedPile, $('.pile').index($(this)))) {
				console.log(Hanoi.clickedPile);
				console.log("successfully in pile2");
				var lastDiv = $("#pile" + (Hanoi.clickedPile + 1) + " div").last();
				currentGame.move(Hanoi.clickedPile, $('.pile').index($(this)));
				$(lastDiv).remove();
				$(this).append(lastDiv);
				Hanoi.clickedPile = null;
				if (currentGame.isWon()) {
					$('body').append("<img src='success_baby.jpg'>");
				}
			}
			else {
				Hanoi.clickedPile = $('.pile').index(this);
			}
		});
		$("#pile3").on("click", function() {
			if (Hanoi.clickedPile != null && currentGame.isValidMove(Hanoi.clickedPile, $('.pile').index($(this)))) {
				console.log(Hanoi.clickedPile);
				var lastDiv = $("#pile" + (Hanoi.clickedPile + 1) + " div").last();
				currentGame.move(Hanoi.clickedPile, $('.pile').index($(this)));
				$(lastDiv).remove();
				$(this).append(lastDiv);
				Hanoi.clickedPile = null;
				if (currentGame.isWon()) {
					$('body').append("<img src='success_baby.jpg'>");
				}
			}
			else {
				Hanoi.clickedPile = $('.pile').index(this);
			}
		});
	}

})(this);