class BoardController {
    constructor(cols, rows, leds){
        var spawn = require('child_process').spawn,
            py = spawn('python', ['./driver.py', cols, rows, leds]);
    }

    sendData(data) {
        this.py.stdin.write(JSON.stringify(data));
        this.py.stdin.end();
    }
}

module.exports = BoardController;