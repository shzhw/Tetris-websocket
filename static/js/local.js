define(['Game'], function(Game) {
  var Local = function(socket) {
    var game;
    var INTERVAL = 500;
    var timer = null;

    var timeCount = 1;
    var time = 0;

    function bindKeyEvent() {
      document.onkeydown = function(e) {
        if (e.keyCode === 38) {
          // up
          game.rotate();
          socket.emit('rotate');
        } else if (e.keyCode === 37) {
          //lf
          game.left();
          socket.emit('left');
        } else if (e.keyCode === 39) {
          //rt
          game.right();
          socket.emit('right');
        } else if (e.keyCode === 40) {
          // down
          game.down();
          socket.emit('down');
        } else if (e.keyCode === 32) {
          //space
          game.fall();
          socket.emit('fall');
        }
        e.stopPropagation();
        e.preventDefault();
      };
    }
    function timeFunc() {
      timeCount += 1;
      if (timeCount === 1000 / INTERVAL) {
        timeCount = 0;
        time += 1;
        game.setTime(time);
        socket.emit('time', time);
      }
    }
    function move() {
      timeFunc();
      if (!game.down()) {
        game.fixed();
        socket.emit('fixed');
        var line = game.checkClear();
        if (line > 0) {
          game.addScore(line);
          socket.emit('line', line);
          if (line > 1) {
            var bottomLines = generateBottomLine(line);
            socket.emit('bottomLine', bottomLines);
          }
        }

        if (game.checkGameOver()) {
          stop();
          game.gameOver();
          document.getElementById('remote_result').innerHTML = '你赢了';
          socket.emit('loser');
        } else {
          var _t2 = generateType();
          var _d2 = generateDir();
          game.performNext(_t2, _d2);
          socket.emit('next', { type: _t2, dir: _d2 });
        }
      } else {
        socket.emit('down');
      }
    }
    function generateBottomLine(lineNum) {
      var lines = [];
      for (var i = 0; i < lineNum; i++) {
        var line = [];
        for (var j = 0; j < 10; j++) {
          line.push(Math.random() > 0.5 ? 1 : 0);
        }
        lines.push(line);
      }
      return lines;
    }
    function generateType() {
      return Math.ceil(Math.random() * 7) - 1;
    }
    function generateDir() {
      return Math.ceil(Math.random() * 4) - 1;
    }
    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      document.onkeydown = null;
      var btn = document.getElementById('again')
      btn.className = btn.className.replace('hide', 'show');
    }
    function start() {
      var doms = {
        gameDiv: document.getElementById('local_game'),
        nextDiv: document.getElementById('local_next'),
        timeDiv: document.getElementById('local_time'),
        scoreDiv: document.getElementById('local_score'),
        resultDiv: document.getElementById('local_result')
      };
      game = new Game();
      var _t1 = generateType();
      var _d1 = generateDir();
      game.init(doms, _t1, _d1);
      socket.emit('init', { type: _t1, dir: _d1 });
      var _t2 = generateType();
      var _d2 = generateDir();
      game.performNext(_t2, _d2);
      socket.emit('next', { type: _t2, dir: _d2 });
      bindKeyEvent();
      timer = setInterval(move, INTERVAL);
    }
    socket.on('start', function() {
      document.getElementById('waiting').innerHTML = '';
      start();
    });
    socket.on('loser', function() {
      document.getElementById('remote_result').innerHTML = '你输了';
      game.gameOver(true);
      stop();
    });
    socket.on('leave', function() {
      document.getElementById('local_result').innerHTML = '对方掉线';
      document.getElementById('remote_result').innerHTML = '已掉线';
      stop();
    });
    socket.on('bottomLine', function(data) {
      game.addTailLines(data);
      socket.emit('addTailLines', data);
    });
  };

  return Local;
});
