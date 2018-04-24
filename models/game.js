var boardController = require('../board/BoardController.js');
Game = class Game {
    constructor() {
        this.players = [];
        this.objects = [];
		this.currentPlayerIndex = 0;
    }

    addPlayer(player) {
        this.players.push(player);
		console.log("Player " + player.id + " added to game.");
	}
	
	actionHandler() {
		console.log("action: " + this.players[this.currentPlayerIndex].actionPoints)
		if (this.players[this.currentPlayerIndex].actionPoints == 1){
			this.players[this.currentPlayerIndex].actionPoints--;
			this.switchTurn();
		}
		else{
			this.players[this.currentPlayerIndex].actionPoints--;
		}
	}




	
	switchTurn(){
		console.log("Player " + this.players[this.currentPlayerIndex].actionPoints + " is klaar");
		this.players[this.currentPlayerIndex].activeTurn = false;
		this.players[this.currentPlayerIndex].socket.emit("turnStart", this.players[this.currentPlayerIndex].activeTurn);
		if(this.currentPlayerIndex == (this.players.length-1)){
				this.currentPlayerIndex = 0;
			}
		else{
				this.currentPlayerIndex++;
			}
		this.players[this.currentPlayerIndex].activeTurn = true;
		this.players[this.currentPlayerIndex].actionPoints = 2;
		this.players[this.currentPlayerIndex].socket.emit("turnStart", this.players[this.currentPlayerIndex].activeTurn);
		console.log("Player " + this.players[this.currentPlayerIndex].actionPoints + " is nu aan de beurt");
	}

	startTurn(){
		console.log("Player " + this.players[this.currentPlayerIndex] + " is nu aan de beurt");
		this.players[this.currentPlayerIndex].actionPoints = 2;
		this.players[this.currentPlayerIndex].activeTurn = true;
	}


}

module.exports = Game;