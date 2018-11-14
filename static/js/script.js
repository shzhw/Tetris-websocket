require.config({
  paths: {
    io: 'socket.io',
    Local: 'local',
    Remote: 'remote',
    Game: 'game',
    SquareFactory: 'SquareFactory',
    Square: 'Square',
    config: 'config'
  }
});
define(['io', 'Local', 'Remote'], function(io, Local, Remote) {
  var socket;
  var startBtn = document.getElementById('startgame');
  var againBtn = document.getElementById('again');
  // 测试ws start
  var ws = document.location.href.split('?')[1];
  if (ws) {
    var _arr = ws.split('&');
    _arr.forEach(function(item) {
      var param = item.split('=');
      if (param[0] === 'ws') {
        ws = param[1];
      } else {
        ws = '';
      }
    });
  }
  // end
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
    if (!ws) {
      alert('没有设置websocket服务器');
      return;
    }
    socket = io(ws);

    socket.on('waiting', function(str) {
      document.getElementById('waiting').innerHTML = str;
    });
    var local = new Local(socket);
    var remote = new Remote(socket);
  }
});
