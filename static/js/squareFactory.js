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
    var Factory = window['Square' + index];
    var s = new Factory();
    s.origin.x = 0;
    s.origin.y = 3;
    s.rotate(dir);
    return s;
  } catch (e) {
    return null;
  }
};
