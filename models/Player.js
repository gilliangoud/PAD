Player = class Player {
    constructor(socketID,Username) {
        this.id = socketID;
        this.username = Username;
        this.x = 1;
        this.y = 1;
        this.color;
        this.inventory = new Inventory(socketID.socket);
    }

    move(direction) {
        let old_x = this.x;
        let old_y = this.y;

        switch(direction){
            case "up": this.y++; break;
            case "down": this.y--; break;
            case "right": this.x++; break;
            case "left": this.x--; break;
            default: console.log("No direction given " + direction); return;
        }
        console.log("Player moved " + direction);
        global.board.sendLocation(this.x, this.y);
    }
}

module.exports = Player;

