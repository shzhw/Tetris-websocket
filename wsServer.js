var server = require('http').createServer();
var io = require('socket.io')(server);

var PORT = 3000;

var clientCount = 0;
var socketMap = {};

function bindEvent(event, socket) {
  socket.on(event, function(data) {
    if (socket.clientNum % 2 === 0) {
      if (socketMap[socket.clientNum - 1])
        socketMap[socket.clientNum - 1].emit(event, data);
    } else {
      if (socketMap[socket.clientNum + 1])
        socketMap[socket.clientNum + 1].emit(event, data);
    }
  });
}

io.on('connection', function(socket) {
  clientCount += 1;
  socket.clientNum = clientCount;
  socketMap[clientCount] = socket;
  if (clientCount % 2 !== 0) {
    socket.emit('waiting', 'waiting for another person');
  } else {
    socket.emit('start');
    socketMap[socket.clientNum - 1].emit('start');
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
    if (socket.clientNum % 2 === 0) {
      if (socketMap[socket.clientNum - 1])
        socketMap[socket.clientNum - 1].emit('leave');
    } else {
      if (socketMap[socket.clientNum + 1])
        socketMap[socket.clientNum + 1].emit('leave');
    }
    delete socketMap[socket.clientNum];
  });
});

server.listen(PORT);
console.log('websocket listening on port ' + PORT);
