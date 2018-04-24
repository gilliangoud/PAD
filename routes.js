module.exports.start = function (socket, player) {
    socket.on("move", (direction) => {
        player.move(direction);
    });

   
};