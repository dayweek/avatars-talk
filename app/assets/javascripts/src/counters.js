// Modified https://github.com/mrdoob/stats.js/blob/master/src/Stats.js
var Counter = function r() {
  var _time = Date.now(), _start_time = _time, _timeLastFrame = _time, _timeLastSecond = _time, _frames = 0, _mozPaintCount = window.mozPaintCount, _second = 1;
  var _history = [], _msMax = 0, _msMin = 1000;
  return {
    update: function () {
      _time = Date.now();
      var ms = _time - _timeLastFrame;
      _msMin = Math.min( _msMin, ms );
      _msMax = Math.max( _msMax, ms );
      _timeLastFrame = _time;
      _frames ++;
      /*
      if ( _time > _timeLastSecond + 1000 ) {
        var mozPaintCount = window.mozPaintCount;
        _history.push({second: _second, frame: _frames, ms: _time - _timeLastSecond, mozPaintCount: mozPaintCount - _mozPaintCount});
        _second ++;
        _timeLastSecond = _time;
        _mozPaintCount = mozPaintCount;
        _frames = 0;

      }
      */

    },
    //getHistory: function () { return _history; },
    //appendHistoryTo: function (selector) { $(CreateTableView(JSON.stringify(_history))).appendTo(selector); },
    getMsMax: function () { return _msMax; },
    getMsMin: function () { return _msMin; },
    getFrames: function () { return _frames; },
    getTotalTime: function () { return _time - _start_time; },
    getMozPaintCount: function () { return window.mozPaintCount - _mozPaintCount; }

  };
};

function Timer() {
var _times = [new Date().getTime()];
var _pause = null;
var _pauselength = 0;

this.push = function () {
  _times.push(new Date().getTime() - _pauselength);
};

this.pause = function () {
  _pause = new Date().getTime();
};

this.cont = function () {
  _pauselength += new Date().getTime() - _pause;
};

this.toJSON = function () {
  var times = [];
  for(var i = 1,n = _times.length; i < n; i++) {
    times.push(_times[i] - _times[i-1]);
   }
   times.push(_times[_times.length - 1] - _times[0]);
   return times;
};

this.print = function () {
  for(var i = 1,n = _times.length; i < n; i++) {
    console.log(_times[i] - _times[i-1]);
  }
  console.log(_times[_times.length - 1] - _times[0]);
};

this.dump = function () {
  dump(_times[_times.length - 1] - _times[0]);
};
}
