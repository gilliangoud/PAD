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
  res.sendFile(__dirname + '/index.html');
});

 global.game = new Game();

io.on('connection', (socket) => {
  let player = new Player(socket.id,socket);
  game.addPlayer(player);
  game.startTurn();
  gameRoutes.start(socket, player);
});


http.listen(3000, function () {
  console.log('listening on *:3000');
});