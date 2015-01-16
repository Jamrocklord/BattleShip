
var Ships = {
	numShips: "3",
	shipLength: "3",
	shipsSunk: "0",
	boardSize: "7",
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],//Need to change the lengths of ships 

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if (index >= 0) {
				ship.hits[index] = "hit";
				Game.view.displayHit(guess);
				Game.view.displayMessage("HIT!");

				if (this.isSunk(ship)) {
                                            Game.view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		Game.view.displayMiss(guess);
                Game.view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}console.log(newShipLocations);//For testing to see if the ships are being made
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
}; 


var Game = {
    
   
    boardController:function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var row = alphabet.indexOf(guess.charAt(0));
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= Ships.boardSize ||
		           column < 0 || column >= Ships.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
},

        guesses: "0",
        
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = Ships.fire(location);
			if (hit && Ships.shipsSunk === Ships.numShips) {
					Game.view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
        }
},
        
        
    view: {
                displayMessage: function(msg) {
                    var messageArea = document.getElementById("messageArea");
                        messageArea.innerHTML = msg;
	},

                displayHit: function(location) {
                    var cell = document.getElementById(location);
                        cell.setAttribute("class", "hit");
	},

                displayMiss: function(location) {
                    var cell = document.getElementById(location);
                        cell.setAttribute("class", "miss");
	}
        
   },
   
    

    handleFireButton: function() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();

	Game.processGuess(guess);
	guessInput.value = "";
        },
    
    handleKeyPress: function(e) {
	var fireButton = document.getElementById("fireButton");

	// in IE9 and earlier, the event object doesn't get passed
	// to the event handler correctly, so we use window.event instead.
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false // testing with true.
        }
    }
};
window.onload = init;

function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = Game.handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = Game.handleKeyPress;

	// place the ships on the game board
	Ships.generateShipLocations();
};

// for the flee function. possible use random math to calculate the spaces in which to move by after being hit. 
// conflicts with flee and collsion functions. after a collsion is show by the ship the can or cannot move over the same spot the collsion happened.