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

require('./client/js/inventory');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/html/index.html');
});


let game = new Game();

var SOCKET_LIST = {};

var DEBUG = true;


Player.list = {};

Player.onConnect = function (socket, username) {
    let player = new Player(socket.id, socket.socket, username);
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
    "kip": "",
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
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;


    socket.on('signIn', function (data) {
        isValidPassword(data, function (res) {
            if (res) {
                Player.onConnect(socket, data.username);
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
    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
        });
});

var initPack = { player: [] };

setInterval(function () {
    var packs = Player.getFrameUpdateData();
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('init', packs.initPack);
        //socket.emit('update', packs.updatePack);
        //socket.emit('remove', packs.removePack);
    }
    initPack.player = [];
},1000/25);

http.listen(3000, function () {
  console.log('listening on *:3000');
});