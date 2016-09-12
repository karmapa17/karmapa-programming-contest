(function() {

  var CLASS_ON = 'on';
  var CLASS_OPENED = 'opened';
  var CLASS_WALKING = 'walking';
  var CLASS_NO_TRANSITION = 'no-transition';

  var DIRECTION_UP = 'up';
  var DIRECTION_DOWN = 'down';

  var MIN_DURATION = 1400;
  var MAX_DURATION = 1800;
  var DOOR_OPEN_DELAY = 500;

  function TransitionHelper() {
    this.transitionCallbacks = [];
  }

  TransitionHelper.prototype.onTransitionEnd = function(cb) {
    this.transitionCallbacks.push(cb);
  };

  TransitionHelper.prototype._handleTransitionEnd = function(cb) {
    do {
      var cb = this.transitionCallbacks.shift();
      if (cb) {
        cb();
      }
    }
    while (this.transitionCallbacks.length > 0);
  };

  function Passenger() {
    this.init();
  }

  Passenger.prototype = new TransitionHelper();

  Passenger.prototype.init = function() {
    TransitionHelper.call(this);
    this.elem = document.querySelector('[data-passenger]');
    this.elem.addEventListener('transitionend', this._handleTransitionEnd.bind(this), false);
  };

  Passenger.prototype.walk = function() {
    var self = this;
    var elem = self.elem;
    return new Promise(function(resolve, reject) {
      elem.classList.add(CLASS_WALKING);
      self.onTransitionEnd(resolve);
    });
  };

  Passenger.prototype.putBack = function() {
    var elem = this.elem;
    return new Promise(function(resolve, reject) {
      elem.classList.add(CLASS_NO_TRANSITION);
      elem.classList.remove(CLASS_WALKING);
      elem.offsetHeight;    // trigger reflow
      elem.classList.remove(CLASS_NO_TRANSITION);
      resolve();
    });
  };

  function Elevator(args) {

    args = args || {};
    this.id = args.id;
    this.passenger = args.passenger;
    this.currentFloor = 1;
    this.container = null;
    this.buttons = [];
    this.door = null;
    this.pad = null;
    this.isMoving = false;
    this.direction = null;    // null, DIRECTION_UP, DIRECTION_DOWN
    TransitionHelper.call(this);

    this.init(this.id);
  }

  Elevator.prototype = new TransitionHelper();

  Elevator.prototype.init = function(id) {

    this.container = document.getElementById(id);
    this.door = this.container.querySelector('[data-door]');
    this.screen = this.container.querySelector('[data-screen]');
    this.pad = this.container.querySelector('[data-pad]');
    this.pad.addEventListener('click', this._handlePadClick.bind(this), false);
    this.door.addEventListener('transitionend', this._handleTransitionEnd.bind(this), false);

    this.buttons = Array.prototype.slice.call(this.container.querySelectorAll('[data-floor]'))
      .map(withRow)
      .sort(byFloor);


    this.updateScreen();
    this.transitionCallbacks = [];

    function withRow(elem) {
      return {
        floor: parseInt(elem.getAttribute('data-floor'), 10),
        on: false,
        elem: elem
      };
    }

    function byFloor(row1, row2) {
      return row1.floor - row2.floor;
    }
  };

  Elevator.prototype.isGoingUp = function() {
    return DIRECTION_UP === this.direction;
  };

  Elevator.prototype.isGoingDown = function() {
    return DIRECTION_DOWN === this.direction;
  };

  Elevator.prototype.findNextFloor = function() {

    var currentFloor = this.currentFloor;
    var buttons = this.buttons;

    if (this.isGoingUp()) {
      return buttons.find(function(row) {
        return row.on && (row.floor > currentFloor);
      });
    }
    return buttons.slice(0)
      .reverse()
      .find(function(row) {
        return row.on && (row.floor < currentFloor);
      });
  };

  Elevator.prototype.getButtonByFloor = function(floor) {
    return this.buttons.find(function(row) {
      return row.floor === floor;
    });
  };

  Elevator.prototype.move = function() {

    var self = this;
    var nextFloorButton = self.findNextFloor();


    function next(nextFloor, nextFloorButton) {
      self.currentFloor = nextFloor;
      self.updateScreen();

      if (self.checkArrival(nextFloorButton.floor)) {
        self.arrive(self.currentFloor)
          .then(self.move.bind(self));
      }
      else {
        self.move();
      }
    }

    if (nextFloorButton) {

      self.isMoving = true;
      var duration = random(MIN_DURATION, MAX_DURATION);

      setTimeout(function() {

        nextFloorButton = self.findNextFloor();

        if (self.isGoingUp() && nextFloorButton) {
          next(self.currentFloor + 1, nextFloorButton);
        }
        else if (self.isGoingDown() && nextFloorButton) {
          next(self.currentFloor - 1, nextFloorButton);
        }

      }, duration);
    }
    else if (self.hasFloorsToGo()) {
      self.changeDirection();
      self.move();
    }
    else {
      self.isMoving = false;
      self.direction = null;
    }
  };

  Elevator.prototype.openDoor = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.onTransitionEnd(resolve);
      self.door.classList.add(CLASS_OPENED);
    });
  };

  Elevator.prototype.closeDoor = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.onTransitionEnd(resolve);
      self.door.classList.remove(CLASS_OPENED);
    });
  };

  Elevator.prototype.hasFloorsToGo = function() {
    return this.buttons.filter(function(row) {
      return row.on;
    }).length > 0;
  };

  Elevator.prototype.idle = function(ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, ms);
    });
  };

  Elevator.prototype.changeDirection = function() {
    this.direction = (DIRECTION_UP === this.direction) ? DIRECTION_DOWN : DIRECTION_UP;
  };

  Elevator.prototype.arrive = function(floor) {
    return new Promise(function(resolve, reject) {
      this.setButtonStatus(floor, false);
      this.updateButtonClass();
      this.openDoor()
        .then(this.idle.bind(this, DOOR_OPEN_DELAY))
        .then(this.passenger.walk.bind(this.passenger))
        .then(this.closeDoor.bind(this))
        .then(this.passenger.putBack.bind(this.passenger))
        .then(resolve);
    }.bind(this));
  };

  Elevator.prototype.checkArrival = function(floor) {
    return (this.currentFloor === floor);
  };

  Elevator.prototype.updateButtonClass = function() {
    this.buttons.forEach(function(row) {
      var func = row.on ? 'add' : 'remove';
      row.elem.classList[func](CLASS_ON);
    });
  };

  Elevator.prototype.updateScreen = function() {
    this.screen.textContent = this.currentFloor;
  };

  Elevator.prototype.setButtonStatus = function(floor, status) {
    var clickedButton = this.getButtonByFloor(floor);
    if (clickedButton) {
      clickedButton.on = status;
    }
  };

  Elevator.prototype._handlePadClick = function(event) {
    var clickedFloorStr = event.target.getAttribute('data-floor');
    if (null === clickedFloorStr) {
      return;
    }
    var clickedFloor = parseInt(clickedFloorStr, 10);
    if (this.currentFloor !== clickedFloor) {
      this.setButtonStatus(clickedFloor, true);

      if (null === this.direction) {
        this.direction = (clickedFloor - this.currentFloor) > 0 ? DIRECTION_UP : DIRECTION_DOWN;
      }

      this.updateButtonClass();
      if (! this.isMoving) {
        this.move();
      }
    }
  };

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var passenger = new Passenger();
  var elevator = new Elevator({
    id: 'elevator',
    passenger: passenger
  });

})();
