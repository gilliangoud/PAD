#!/usr/bin/env node

var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gameserver = require('./gameserver.js');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => gameserver.start(socket));

http.listen(3000, function(){
  console.log('listening on *:3000');
});