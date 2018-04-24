var initPack = { player: [], };
var selfId = {};


Player = class Player {

    constructor(socketID, socket, username) {
        
        this.id = socketID;
        this.number = "" + Math.floor(10 * Math.random());
        this.username = username;
        this.x = 1;
        this.y = 1;
        this.color;
        this.inventory = new Inventory(socket, true);

        this.getInitPack = function () {
            return {
                id: this.id,
                username: this.username,
                color: this.color,
                number:this.number,
            }
        }

        Player.list[this.id] = this;
        
        initPack.player.push(this.getInitPack());
        return this; 

        myInit();

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

function myInit(){
    socket.emit('init', 
        selfId = socket.id,
        player = Player.getAllInitPack(),
    ); 
}

Player.getFrameUpdateData= function () {
    var pack = {
        initPack: {
            player: initPack.player,
        },
        // removePack: {
        //     player: removePack.player,
        // },
        // updatePack: {
        //     player: updatePack.player,
        // }
    };
    initPack.player = [];
    //removePack.player = [];
    return pack;
}

Player.getAllInitPack = function(){
	var players = [];
	for(var i in Player.list)
		players.push(Player.list[i].getInitPack());
	return players;
}

module.exports = Player;

