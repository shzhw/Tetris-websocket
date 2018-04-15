var Game = function() {
  var gameDiv;
  var nextDiv;
  var timeDiv;
  var scoreDiv;
  var resultDiv;
  var gameDivs = [];
  var nextDivs = [];
  var next;
  var cur;
  var score = 0;
  var gameData = [];
  // 初始化 data
  for (var i = 0; i < gameHeight / squareWidth; i++) {
    gameData.push([]);
    for (var j = 0; j < gameWidth / squareWidth; j++) {
      gameData[i].push(0);
    }
  }

  function initDiv(container, data, divs) {
    container.innerHTML = '';
    for (var r = 0; r < data.length; r++) {
      var arr = [];
      for (var c = 0; c < data[0].length; c++) {
        var div = document.createElement('div');
        div.className = 'none';
        div.style.top = r * squareWidth + 'px';
        div.style.left = c * squareWidth + 'px';
        container.appendChild(div); 
        arr.push(div);
      }
      divs.push(arr);
    }
  }

  function refreshDiv(data, divs) {
    for (var r = 0; r < data.length; r++) {
      for (var c = 0; c < data[0].length; c++) {
        switch (data[r][c]) {
          case 0:
            divs[r][c].className = 'none';
            break;
          case 1:
            divs[r][c].className = 'done';
            break;
          case 2:
            divs[r][c].className = 'current';
            break;
        }
      }
    }
  }
  function setTime(time) {
    timeDiv.innerHTML = time;
  }
  function init(doms, type, dir) {
    next = SquareFactory.prototype.make(type, dir);
    gameDiv = doms.gameDiv;
    nextDiv = doms.nextDiv;
    timeDiv = doms.timeDiv;
    scoreDiv = doms.scoreDiv;
    resultDiv = doms.resultDiv;
    initDiv(gameDiv, gameData, gameDivs);
    initDiv(nextDiv, next.data, nextDivs);
  }

  function isValid(pos, data) {
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[0].length; j++) {
        if (data[i][j] !== 0) {
          if (!check(pos, i, j)) return false;
        }
      }
    }
    return true;
  }

  function check(pos, x, y) {
    if (pos.x + x < 0) {
      return false;
    } else if (pos.x + x >= gameData.length) {
      return false;
    } else if (pos.y + y < 0) {
      return false;
    } else if (pos.y + y >= gameData[0].length) {
      return false;
    } else if (gameData[pos.x + x][pos.y + y] === 1) {
      return false;
    }
    return true;
  }

  function clearData() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j))
          gameData[cur.origin.x + i][cur.origin.y + j] = 0;
      }
    }
  }

  function setData() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j))
          gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
      }
    }
  }

  function down() {
    if (cur.canDown(isValid)) {
      clearData();
      cur.down();
      setData();
      refreshDiv(gameData, gameDivs);
      return true;
    } else {
      return false;
    }
  }
  function left() {
    if (cur.canLeft(isValid)) {
      clearData();
      cur.left();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  function right() {
    if (cur.canRight(isValid)) {
      clearData();
      cur.right();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  function rotate() {
    if (cur.canRotate(isValid)) {
      clearData();
      cur.rotate();
      setData();
      refreshDiv(gameData, gameDivs);
    }
  }
  function fixed() {
    for (var i = 0; i < cur.data.length; i++) {
      for (var j = 0; j < cur.data[0].length; j++) {
        if (check(cur.origin, i, j)) {
          if (gameData[cur.origin.x + i][cur.origin.y + j] === 2) {
            gameData[cur.origin.x + i][cur.origin.y + j] = 1;
          }
        }
      }
    }
    refreshDiv(gameData, gameDivs);
  }
  function performNext(index, dir) {
    cur = next;
    next = SquareFactory.prototype.make(index, dir);
    setData();
    refreshDiv(gameData, gameDivs);
    refreshDiv(next.data, nextDivs);
  }
  function checkClear() {
    var line = 0;
    for (var i = gameData.length - 1; i >= 0; i--) {
      var clear = true;
      var l = gameData[0].length;
      for (var j = 0; j < l; j++) {
        if (gameData[i][j] !== 1) {
          clear = false;
        }
      }
      if (clear) {
        line++;
        for (var m = i; m > 0; m--) {
          for (var n = 0; n < l; n++) {
            gameData[m][n] = gameData[m - 1][n];
          }
        }
        for (var n = 0; n < l; n++) {
          gameData[0][n] = 0;
        }
        i++;
      }
    }
    return line;
  }
  function checkGameOver() {
    var l = gameData[0].length;
    for (var i = 0; i < l; i++) {
      if (gameData[1][i] === 1) return true;
    }
    return false;
  }
  function addScore(line) {
    line = Math.min(4, line);
    var s = Math.pow(line, 2) * 10;
    score += s;
    scoreDiv.innerHTML = score;
  }
  function gameOver(win) {
    resultDiv.innerHTML = win ? '你赢了' : '你输了';
  }
  function addTailLines(lines) {
    for (var i = 0; i < gameData.length - lines.length; i++) {
      gameData[i] = gameData[i + lines.length];
    }
    for (var i = 0; i < lines.length; i++) {
      gameData[gameData.length - lines.length + i] = lines[i];
    }
    cur.origin.x = Math.max(cur.origin.x - lines.length, 0);
    refreshDiv(gameData, gameDivs);
  }
  this.setTime = setTime;
  this.init = init;
  this.down = down;
  this.left = left;
  this.right = right;
  this.rotate = rotate;
  this.fixed = fixed;
  this.performNext = performNext;
  this.checkClear = checkClear;
  this.checkGameOver = checkGameOver;
  this.addScore = addScore;
  this.gameOver = gameOver;
  this.addTailLines = addTailLines;
  this.fall = function() {
    while (down());
  };
};
