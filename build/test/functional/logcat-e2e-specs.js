'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libAdb = require('../../lib/adb');

var _libAdb2 = _interopRequireDefault(_libAdb);

var _libLogcat = require('../../lib/logcat');

var _libLogcat2 = _interopRequireDefault(_libLogcat);

var _setup = require('./setup');

_chai2['default'].use(_chaiAsPromised2['default']);
_chai2['default'].should();

describe('logcat', function () {
  var _this = this;

  this.timeout(_setup.MOCHA_TIMEOUT);

  function runClearDeviceLogTest(adb, logcat) {
    var clear = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
    var logs, newLogs;
    return _regeneratorRuntime.async(function runClearDeviceLogTest$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.adbExec(['logcat', '-d']));

        case 2:
          logs = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(logcat.startCapture());

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(logcat.stopCapture());

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.adbExec(['logcat', '-d']));

        case 9:
          newLogs = context$2$0.sent;

          if (clear) {
            newLogs.should.not.include(logs);
          } else {
            newLogs.should.include(logs);
          }

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  var adb = undefined;
  var logcat = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_libAdb2['default'].createADB());

        case 2:
          adb = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!logcat) {
            context$2$0.next = 3;
            break;
          }

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(logcat.stopCapture());

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  describe('clearDeviceLogsOnStart = false', function () {
    var _this2 = this;

    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logcat = new _libLogcat2['default']({
              adb: adb.executable,
              debug: false,
              debugTrace: false
            });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('getLogs should return logs', function callee$2$0() {
      var logs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(logcat.startCapture());

          case 2:
            logs = logcat.getLogs();

            logs.should.have.length.above(0);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('getAllLogs should return all logs', function callee$2$0() {
      var logs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(logcat.startCapture());

          case 2:
            logs = logcat.getAllLogs();

            logs.should.have.length.above(0);

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should not affect device logs', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(runClearDeviceLogTest(adb, logcat, false));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('clearDeviceLogsOnStart = true', function () {
    var _this3 = this;

    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            logcat = new _libLogcat2['default']({
              adb: adb.executable,
              debug: false,
              debugTrace: false,
              clearDeviceLogsOnStart: true
            });

          case 1:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should clear the logs before starting capture', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(runClearDeviceLogTest(adb, logcat, true));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9sb2djYXQtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQzdCLGVBQWU7Ozs7eUJBQ1osa0JBQWtCOzs7O3FCQUNQLFNBQVM7O0FBR3ZDLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7QUFDekIsa0JBQUssTUFBTSxFQUFFLENBQUM7O0FBRWQsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZOzs7QUFDN0IsTUFBSSxDQUFDLE9BQU8sc0JBQWUsQ0FBQzs7QUFFNUIsV0FBZSxxQkFBcUIsQ0FBRSxHQUFHLEVBQUUsTUFBTTtRQUFFLEtBQUsseURBQUcsSUFBSTtRQUN6RCxJQUFJLEVBR0osT0FBTzs7Ozs7MkNBSE0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBQTFDLGNBQUk7OzJDQUNGLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Ozs7MkNBQ3JCLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Ozs7MkNBQ04sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBQTdDLGlCQUFPOztBQUNYLGNBQUksS0FBSyxFQUFFO0FBQ1QsbUJBQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztXQUNsQyxNQUFNO0FBQ0wsbUJBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1dBQzlCOzs7Ozs7O0dBQ0Y7O0FBRUQsTUFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLE1BQUksTUFBTSxZQUFBLENBQUM7QUFDWCxRQUFNLENBQUM7Ozs7OzJDQUNPLG9CQUFJLFNBQVMsRUFBRTs7O0FBQTNCLGFBQUc7Ozs7Ozs7R0FDSixDQUFDLENBQUM7QUFDSCxXQUFTLENBQUM7Ozs7ZUFDSixNQUFNOzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLFdBQVcsRUFBRTs7Ozs7OztHQUU3QixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsZ0NBQWdDLEVBQUUsWUFBWTs7O0FBQ3JELFVBQU0sQ0FBQzs7OztBQUNMLGtCQUFNLEdBQUcsMkJBQVc7QUFDbEIsaUJBQUcsRUFBRSxHQUFHLENBQUMsVUFBVTtBQUNuQixtQkFBSyxFQUFFLEtBQUs7QUFDWix3QkFBVSxFQUFFLEtBQUs7YUFDbEIsQ0FBQyxDQUFDOzs7Ozs7O0tBQ0osQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDRCQUE0QixFQUFFO1VBRTNCLElBQUk7Ozs7OzZDQURGLE1BQU0sQ0FBQyxZQUFZLEVBQUU7OztBQUN2QixnQkFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLEVBQUU7O0FBQzNCLGdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0tBQ2xDLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxtQ0FBbUMsRUFBRTtVQUVsQyxJQUFJOzs7Ozs2Q0FERixNQUFNLENBQUMsWUFBWSxFQUFFOzs7QUFDdkIsZ0JBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFOztBQUM5QixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUNsQyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0JBQStCLEVBQUU7Ozs7OzZDQUM1QixxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQzs7Ozs7OztLQUNoRCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsK0JBQStCLEVBQUUsWUFBWTs7O0FBQ3BELFVBQU0sQ0FBQzs7OztBQUNMLGtCQUFNLEdBQUcsMkJBQVc7QUFDbEIsaUJBQUcsRUFBRSxHQUFHLENBQUMsVUFBVTtBQUNuQixtQkFBSyxFQUFFLEtBQUs7QUFDWix3QkFBVSxFQUFFLEtBQUs7QUFDakIsb0NBQXNCLEVBQUUsSUFBSTthQUM3QixDQUFDLENBQUM7Ozs7Ozs7S0FDSixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7OzZDQUM1QyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQzs7Ozs7OztLQUMvQyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2xvZ2NhdC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQURCIGZyb20gJy4uLy4uL2xpYi9hZGInO1xyXG5pbXBvcnQgTG9nY2F0IGZyb20gJy4uLy4uL2xpYi9sb2djYXQnO1xyXG5pbXBvcnQgeyBNT0NIQV9USU1FT1VUIH0gZnJvbSAnLi9zZXR1cCc7XHJcblxyXG5cclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5jaGFpLnNob3VsZCgpO1xyXG5cclxuZGVzY3JpYmUoJ2xvZ2NhdCcsIGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLnRpbWVvdXQoTU9DSEFfVElNRU9VVCk7XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIHJ1bkNsZWFyRGV2aWNlTG9nVGVzdCAoYWRiLCBsb2djYXQsIGNsZWFyID0gdHJ1ZSkge1xyXG4gICAgbGV0IGxvZ3MgPSBhd2FpdCBhZGIuYWRiRXhlYyhbJ2xvZ2NhdCcsICctZCddKTtcclxuICAgIGF3YWl0IGxvZ2NhdC5zdGFydENhcHR1cmUoKTtcclxuICAgIGF3YWl0IGxvZ2NhdC5zdG9wQ2FwdHVyZSgpO1xyXG4gICAgbGV0IG5ld0xvZ3MgPSBhd2FpdCBhZGIuYWRiRXhlYyhbJ2xvZ2NhdCcsICctZCddKTtcclxuICAgIGlmIChjbGVhcikge1xyXG4gICAgICBuZXdMb2dzLnNob3VsZC5ub3QuaW5jbHVkZShsb2dzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5ld0xvZ3Muc2hvdWxkLmluY2x1ZGUobG9ncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsZXQgYWRiO1xyXG4gIGxldCBsb2djYXQ7XHJcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgIGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoKTtcclxuICB9KTtcclxuICBhZnRlckVhY2goYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKGxvZ2NhdCkge1xyXG4gICAgICBhd2FpdCBsb2djYXQuc3RvcENhcHR1cmUoKTtcclxuICAgIH1cclxuICB9KTtcclxuICBkZXNjcmliZSgnY2xlYXJEZXZpY2VMb2dzT25TdGFydCA9IGZhbHNlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgICAgbG9nY2F0ID0gbmV3IExvZ2NhdCh7XHJcbiAgICAgICAgYWRiOiBhZGIuZXhlY3V0YWJsZSxcclxuICAgICAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICAgICAgZGVidWdUcmFjZTogZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnZ2V0TG9ncyBzaG91bGQgcmV0dXJuIGxvZ3MnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IGxvZ2NhdC5zdGFydENhcHR1cmUoKTtcclxuICAgICAgbGV0IGxvZ3MgPSBsb2djYXQuZ2V0TG9ncygpO1xyXG4gICAgICBsb2dzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ2dldEFsbExvZ3Mgc2hvdWxkIHJldHVybiBhbGwgbG9ncycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYXdhaXQgbG9nY2F0LnN0YXJ0Q2FwdHVyZSgpO1xyXG4gICAgICBsZXQgbG9ncyA9IGxvZ2NhdC5nZXRBbGxMb2dzKCk7XHJcbiAgICAgIGxvZ3Muc2hvdWxkLmhhdmUubGVuZ3RoLmFib3ZlKDApO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCBhZmZlY3QgZGV2aWNlIGxvZ3MnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IHJ1bkNsZWFyRGV2aWNlTG9nVGVzdChhZGIsIGxvZ2NhdCwgZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ2NsZWFyRGV2aWNlTG9nc09uU3RhcnQgPSB0cnVlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgICAgbG9nY2F0ID0gbmV3IExvZ2NhdCh7XHJcbiAgICAgICAgYWRiOiBhZGIuZXhlY3V0YWJsZSxcclxuICAgICAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICAgICAgZGVidWdUcmFjZTogZmFsc2UsXHJcbiAgICAgICAgY2xlYXJEZXZpY2VMb2dzT25TdGFydDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2xlYXIgdGhlIGxvZ3MgYmVmb3JlIHN0YXJ0aW5nIGNhcHR1cmUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IHJ1bkNsZWFyRGV2aWNlTG9nVGVzdChhZGIsIGxvZ2NhdCwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
