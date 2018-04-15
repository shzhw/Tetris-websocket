define(['config','Square'], function(config,Square) {
  var Square1 = function() {
    Square.call(this);
    this.rotates = [
      [[2, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    ];
  };

  Square1.prototype = Square.prototype;

  var Square2 = function() {
    Square.call(this);
    this.rotates = [
      [[2, 2, 0, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 0, 0], [2, 2, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 2, 0, 0], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 0, 0], [2, 2, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]]
    ];
  };

  Square2.prototype = Square.prototype;

  var Square3 = function() {
    Square.call(this);
    this.rotates = [
      [[0, 2, 0, 0], [2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 0, 0], [0, 2, 2, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
      [[0, 0, 0, 0], [2, 2, 2, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]]
    ];
  };

  Square3.prototype = Square.prototype;

  var Square4 = function() {
    Square.call(this);
    this.rotates = [
      [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
      [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]]
    ];
  };

  Square4.prototype = Square.prototype;

  var Square5 = function() {
    Square.call(this);
    this.rotates = [
      [[2, 2, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 0, 0], [0, 2, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0]],
      [[2, 0, 0, 0], [2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 2, 0, 0], [2, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]]
    ];
  };

  Square5.prototype = Square.prototype;

  var Square6 = function() {
    Square.call(this);
    this.rotates = [
      [[2, 2, 2, 0], [2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
      [[0, 0, 2, 0], [2, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 0, 0, 0], [2, 0, 0, 0], [2, 2, 0, 0], [0, 0, 0, 0]]
    ];
  };

  Square6.prototype = Square.prototype;

  var Square7 = function() {
    Square.call(this);
    this.rotates = [
      [[0, 2, 2, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 0, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]],
      [[0, 2, 2, 0], [2, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      [[2, 0, 0, 0], [2, 2, 0, 0], [0, 2, 0, 0], [0, 0, 0, 0]]
    ];
  };

  Square7.prototype = Square.prototype;

  var SquareFactory = function() {};
  SquareFactory.prototype.make = function(index, dir) {
    index += 1;
    try {
      var Factory;
      switch (index) {
        case 1:
          Factory = Square1;
          break;
        case 2:
          Factory = Square2;
          break;
        case 3:
          Factory = Square3;
          break;
        case 4:
          Factory = Square4;
          break;
        case 5:
          Factory = Square5;
          break;
        case 6:
          Factory = Square6;
          break;
        case 7:
          Factory = Square7;
          break;
      }
      var s = new Factory();
      s.origin.x = 0;
      s.origin.y = Math.ceil((config.gameWidth / config.squareWidth - 4) / 2);
      s.rotate(dir);
      return s;
    } catch (e) {
      return null;
    }
  };
  return SquareFactory;
});
