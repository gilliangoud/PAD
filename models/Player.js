Player = class Player {
    constructor (socketID){
        this.id = socketID;
        this.x = 1;
        this.y = 1;
        this.color;
    }

    move(direction) {
        let old_x = this.x;
        let old_y = this.y;

        switch(direction){
            case "UP": this.y++; break;
            case "DOWN": this.y--; break;
            case "RIGHT": this.x++; break;
            case "LEFT": this.x--; break;
            default: console.log("No direction given");
        }
        global.board.sendData();
    }
}

module.exports = Player;