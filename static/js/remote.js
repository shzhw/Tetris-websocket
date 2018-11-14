define(['Game'], function(Game) {
  return function(socket) {
    var game;

    var start = function(type, dir) {
      var doms = {
        gameDiv: document.getElementById('remote_game'),
        nextDiv: document.getElementById('remote_next'),
        scoreDiv: document.getElementById('remote_score'),
        resultDiv: document.getElementById('remote_result')
      };
      game = new Game();
      game.init(doms, type, dir);
    };
    socket.on('init', function(data) {
      start(data.type, data.dir);
    });
    socket.on('next', function(data) {
      game.performNext(data.type, data.dir);
    });
    socket.on('rotate', function() {
      game.rotate();
    });
    socket.on('left', function() {
      game.left();
    });
    socket.on('right', function() {
      game.right();
    });
    socket.on('down', function() {
      game.down();
    });
    socket.on('fall', function() {
      game.fall();
    });
    socket.on('fixed', function() {
      game.fixed();
    });
    socket.on('time', function(data) {
      game.setTime(data);
    });
    socket.on('line', function(data) {
      game.checkClear();
      game.addScore(data);
    });
    socket.on('loser', function(data) {
      game.gameOver(false);
    });
    socket.on('addTailLines', function(data) {
      game.addTailLines(data);
    });
  };
});
