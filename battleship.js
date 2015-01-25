/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Ship object (Prototype)

function Ship(numhits, location){

    this.numhits= 0,
    this.location= [
                { locations: [0, 0, 0], hits: ["", "", ""] }
    ],
    this.hit= function(){
        for(var i= 0; i < this.nuumhit.length; i++) {
               if(this.numhits[i] !== 0){
                   numhits++;
               }
        };
    };
    console.log(this.numhit);// testing hit 
};//end of ship object

//making instances of ship object
var ShipOne= new Ship();
var ShipTwo= new Ship();
var ShipThree= new Ship();

function Game(){
        this.Board= new GameBoard();
        this.guesses= 0,
            
	this.displayMessage= function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	this.displayHit= function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	this.displayMiss= function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	};
 
        this.handleFireButton= function() {
                var guessInput = document.getElementById("guessInput");
                var guess = guessInput.value.toUpperCase();

                    Game.processGuess(guess);

	guessInput.value = "";
};

        this.handleKeyPress= function(e) {
                var fireButton = document.getElementById("fireButton");

                // in IE9 and earlier, the event object doesn't get passed
                // to the event handler correctly, so we use window.event instead.
                    e = e || window.event;

                if (e.keyCode === 13) {
                    fireButton.click();
                        return false;
            }
        };
         this.parseGuess= function(guess) {
                var alphabet = ["A", "B", "C", "D", "E", "F", "G","H"];

                if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= Game.boardSize ||
		           column < 0 || column >= Game.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
};
	this.processGuess= function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = Game.fire(location);
			if (hit && Game.shipsSunk === Game.numShips) {
					Game.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	};
};//end of game functon

function GameBoard(){
    
    this.shipLength= [2,3,3,4],
    this.numships= 4;
    this.shipsSunk= 0;
    this.boardSize= 8;
    this.fire= function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if (index >= 0) {
				ship.hits[index] = "hit";
				Game.displayHit(guess);
				Game.displayMessage("HIT!");

				if (this.isSunk(ship)) {
					Game.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		}
		Game.displayMiss(guess);
		Game.displayMessage("You missed.");
		return false;
	},
         
    this.isSunk= function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},
                
    this.generateShipLocations= function() {
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
    this.generateShip= function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}               
    var newShipLocations= [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},
    this.collision= function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	};                       
                
};//end of GameBaord function



window.onload = init;

function init() {
	// Fire! button onclick handler
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;

	// place the ships on the game board
	Game.generateShipLocations();
}

