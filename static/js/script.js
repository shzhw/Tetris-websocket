var socket;
document.getElementById('startgame') &&
  document.getElementById('startgame').addEventListener('click', function() {
    startGame();
    this.style.display = 'none';
  });
document.getElementById('refresh') &&
  document.getElementById('refresh').addEventListener('click', function() {
    socket.emit('disconnect');
    startGame();
    this.style.display = 'none';
  });
function startGame() {
  var socket = io('ws://localhost:3000');

  socket.on('waiting', function(str) {
    document.getElementById('waiting').innerHTML = str;
  });
  var local = new Local(socket);
  var remote = new Remote(socket);
}