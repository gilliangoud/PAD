#!/usr/bin/env node

var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gameRoutes = require('./routes.js');
var gameController = require('./models/Game.js');
var PlayerController = require('./models/Player.js');
//var boardController = require('./board/BoardController.js');
const COLLUMNS = 3;
const ROWS = 3;
const MAX_LEDS = 9;
//global.board = new boardController(COLLUMNS, ROWS, MAX_LEDS);

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/html/index.html');
});

let game = new Game();

var SOCKET_LIST = {};

Player.list = new Player();
Player.onConnect = function (socket) {
    let player = new Player(socket.id);
    game.addPlayer(player);
    gameRoutes.start(socket, player);
}
Player.onDisconnect = function (socket) {
    delete Player.list[socket.id];
}


var USERS = {
    //username:password
    "Siebe": "403",
    "bob2": "bob",
    "bob3": "ttt",
}

var isValidPassword = function (data, cb) {
    setTimeout(function () {
        cb(USERS[data.username] === data.gamecode);
    }, 10);
}
var isUsernameTaken = function (data, cb) {
    setTimeout(function () {
        cb(USERS[data.username]);
    }, 10);
}
var addUser = function (data, cb) {
    setTimeout(function () {
        USERS[data.username] = data.gamecode;
        cb();
    }, 10);
};

io.sockets.on('connection', function (socket) {
    let player = new Player(socket.id);
    socket.id = Math.random();


    socket.on('signIn', function (data) {
        isValidPassword(data, function (res) {
            if (res) {
                Player.onConnect(socket);
                socket.emit('signInResponse', { success: true });
            } else {
                socket.emit('signInResponse', { success: false });
            }
        });
    });
    socket.on('signUp', function (data) {
        isUsernameTaken(data, function (res) {
            if (res) {
                socket.emit('signUpResponse', { success: false });
            } else {
                addUser(data, function () {
                    socket.emit('signUpResponse', { success: true });
                });
            }
        });
    });

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});