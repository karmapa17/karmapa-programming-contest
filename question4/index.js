(function() {

  function Stopwatch(args) {

    args = args || {};

    this.id = args.id;
    this.time = null;
    this.isStarted = false;
    this.records = [];

    this.init();
    this.setButtonState();
  }

  Stopwatch.prototype.init = function() {
    var wrapper = document.getElementById(this.id);
    this.timeScreen = wrapper.getElementsByClassName('time-screen')[0];
    this.buttonSplit = wrapper.getElementsByClassName('button-split')[0];
    this.buttonStart = wrapper.getElementsByClassName('button-start')[0];
    this.recordList = wrapper.getElementsByClassName('records')[0];

    this.buttonSplit.addEventListener('click', this._handleButtonSplitClick.bind(this), false);
    this.buttonStart.addEventListener('click', this._handleButtonStartClick.bind(this), false);
  };

  Stopwatch.prototype.setButtonState = function() {
    this.setSplitButtonState();
    this.setStartButtonState();
  };

  Stopwatch.prototype.canReset = function() {
    return (null !== this.time) && (! this.isStarted);
  };

  Stopwatch.prototype.setSplitButtonState = function() {
    this.buttonSplit.disabled = (null === this.time) && (! this.isStarted);
    this.buttonSplit.textContent = this.canReset() ? '重置' : '分圈';
  };

  Stopwatch.prototype.setStartButtonState = function() {
    this.buttonStart.textContent = this.isStarted ? '停止' : '開始';
  };

  Stopwatch.prototype.start = function() {
    this.isStarted = true;
    this.time = Date.now();
    this.showAnimatingTime();
  };

  Stopwatch.prototype.stop = function() {
    this.isStarted = false;
  };

  Stopwatch.prototype.reset = function() {
    this.time = null;
    this.updateTimeScreen();
    this.clearRecordList();
  };

  Stopwatch.prototype.addRecordToRecordList = function(time) {
    var li = document.createElement('li');
    li.textContent = time;
    this.recordList.appendChild(li);
  };

  Stopwatch.prototype.clearRecordList = function() {
    var recordList = this.recordList;
    while (recordList.firstChild) {
      recordList.removeChild(recordList.firstChild);
    }
  };

  Stopwatch.prototype.addRecord = function() {
    var now = Date.now();
    this.records.push(now);
    this.addRecordToRecordList(getFormattedTimeStr(now - this.time));
  };

  Stopwatch.prototype.updateTimeScreen = function() {
    if (null === this.time) {
      this.timeScreen.textContent = '00:00:00';
    }
    else {
      var duration = Date.now() - this.time;
      this.timeScreen.textContent = getFormattedTimeStr(duration);
    }
  };

  Stopwatch.prototype.showAnimatingTime = function() {

    var self = this;

    (function animLoop() {
      if (self.isStarted) {
        requestAnimationFrame(animLoop);
        self.updateTimeScreen();
      }
    })();
  };

  Stopwatch.prototype._handleButtonSplitClick = function() {
    this.canReset() ? this.reset() : this.addRecord();
    this.setButtonState();
  };

  Stopwatch.prototype._handleButtonStartClick = function() {
    this.isStarted ? this.stop() : this.start();
    this.setButtonState();
  };

  var s1 = new Stopwatch({id: 's1'});

  function pad(num) {
    return (num < 10) ? ('0' + num) : num;
  }

  function getFormattedTimeStr(duration) {

    var h = Math.floor(duration / (60 * 60 * 1000));
    duration = duration % (60 * 60 * 1000);
    var m = Math.floor(duration / (60 * 1000));
    duration = duration % (60 * 1000);
    var s = Math.floor(duration / 1000);
    var ms = Math.floor(duration % 1000 / 10);

    if (h > 0) {
      return [pad(h), pad(m), pad(s), pad(ms)].join(':');
    }
    return [pad(m), pad(s), pad(ms)].join(':');
  }

})();
