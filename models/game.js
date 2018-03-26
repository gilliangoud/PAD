var boardController = require('../board/BoardController.js');

Game = class Game {
    constructor() {
        this.players = [];
        this.objects = [];
    }

    addPlayer(player) {
        this.players.push(player);
        console.log("Player " + player.id + " added to game.");
    }
}

module.exports = Game;