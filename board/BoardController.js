class BoardController {
    constructor(cols, rows, leds) {
        var PythonShell = require('python-shell');
        var options = {
            mode: 'json',
            scriptPath: __dirname,
            args: [cols, rows, leds]
        };
        this.pyshell = new PythonShell('./driver.py', options);

        this.pyshell.on('message', function (message) {
            console.log(message);
        });
    }

    sendData(data) {
        console.log("send to python: " + data);
        this.pyshell.send(data);
    }

    sendLocation(x, y) {
        let data = [{
            'x': x,
            'y': y
        }]
        this.pyshell.send(data);
        console.log("send to python: " + data);
    }
}

module.exports = BoardController;