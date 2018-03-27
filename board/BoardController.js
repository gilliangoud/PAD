class BoardController {
    constructor(cols, rows, leds) {
        var PythonShell = require('python-shell');
        var options = {
            mode: 'text',
            scriptPath: __dirname,
            stdio: 'pipe',
            args: [cols, rows, leds]
        };
        this.pyshell = new PythonShell('./driver.py', options);

        this.pyshell.on('message', function (message) {
            console.log("python: " + message);
        });
    }

    sendData(data) {
        console.log("send to python: " + data);
        this.pyshell.send(data);
    }

    sendLocation(xPos, yPos) {
        let data = {
            x: xPos,
            y: yPos
        }
        this.pyshell.send(JSON.stringify(data));
        console.log("send to python: " + JSON.stringify(data));
    }
}

module.exports = BoardController;