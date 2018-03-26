module.exports.start = function (socket, player) {
    socket.on("moveUp", (direction) => {
        console.log(direction);
        player.move(direction);
        console.log(player);
    });
};