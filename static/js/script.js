require.config({
  paths: {
    io: 'socket.io',
    Local: 'local',
    Remote: 'remote',
    Game: 'game',
    SquareFactory: 'squareFactory',
    Square: 'square',
    config: 'config'
  }
});
define(['io', 'Local', 'Remote'], function(io, Local, Remote) {
  var socket;
  var startBtn = document.getElementById('startgame');
  var againBtn = document.getElementById('again');
  startBtn.addEventListener('click', function() {
    startGame();

    this.className = this.className.replace('show', 'hide');
  });

  againBtn.addEventListener('click', function() {
    socket.emit('disconnect');
    startGame();
    this.className = this.className.replace('show', 'hide');
  });

  function startGame() {
    socket = io('ws://hx6zzp.natappfree.cc');

    socket.on('waiting', function(str) {
      document.getElementById('waiting').innerHTML = str;
    });
    var local = new Local(socket);
    var remote = new Remote(socket);
  }
});
