var server = require('http').createServer();
var io = require('socket.io')(server);

var PORT = 8080;

var clientCount = 0;
var socketMap = [];

io.on('connection', function(socket) {
  var id = socket.id;
  var index = findWaiting();

  var pair = null;
  if (typeof index === 'number') {
    pair = socketMap[index];
  } else {
    socketMap.push({});
    pair = socketMap[socketMap.length - 1];
  }
  pair[id] = socket;

  var _socket = null; // 当前配对的socket
  var num = 0;
  for (var key in pair) {
    num++;
    if (id !== key) {
      _socket = pair[key];
    }
  }
  if (num < 2) {
    socket.emit('waiting', '正在匹配玩家，请耐心等待...');
  } else {
    if (socket && _socket) {
      socket.emit('start');
      _socket.emit('start');
    }
  }

  bindEvent('init', socket);
  bindEvent('next', socket);
  bindEvent('rotate', socket);
  bindEvent('left', socket);
  bindEvent('right', socket);
  bindEvent('down', socket);
  bindEvent('fall', socket);
  bindEvent('fixed', socket);
  bindEvent('line', socket);
  bindEvent('time', socket);
  bindEvent('loser', socket);
  bindEvent('bottomLine', socket);
  bindEvent('addTailLines', socket);

  socket.on('disconnect', function() {
    var index = findIndexId(id);

    for (var key in socketMap[index]) {
      if (key !== id) {
        socketMap[index][key].emit('leave');
      }
    }
    socketMap.slice(index, 1);
  });
});

server.listen(PORT);
console.log('websocket listening on port ' + PORT);

/**
 * 封装绑定socket事件函数
 * @param {Stiring} event
 * @param {Object} socket
 */
function bindEvent(event, socket) {
  socket.on(event, function(data) {
    var index = findIndexId(socket.id);

    for (var key in socketMap[index]) {
      if (key !== socket.id) {
        socketMap[index][key].emit(event, data);
      }
    }
  });
}
/**
 * 查询socketMap 中的等待配对的链接
 */
function findWaiting() {
  for (var i = 0; i < socketMap.length; i++) {
    var len = 0;
    for (var key in socketMap[i]) {
      len++;
    }
    if (len < 2) return i;
  }
  return false;
}

/**
 * 查找socket.id 对的index
 * @param {ID} id 
 */
function findIndexId(id) {
  for (var i = 0; i < socketMap.length; i++) {
    for (var key in socketMap[i]) {
      if (key === id) return i;
    }
  }
  return false;
}
