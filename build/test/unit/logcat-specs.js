'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _libLogcat = require('../../lib/logcat');

var _libLogcat2 = _interopRequireDefault(_libLogcat);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('logcat', function () {
  var adb = { path: 'dummyPath', defaultArgs: [] };
  var logcat = new _libLogcat2['default']({ adb: adb, debug: false, debugTrace: false });

  describe('startCapture', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
    it('should correctly call subprocess and should resolve promise', function callee$2$0() {
      var conn, logs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            conn = new _events2['default'].EventEmitter();

            conn.start = function () {};
            mocks.teen_process.expects("SubProcess").once().withExactArgs('dummyPath', ['logcat', '-v', 'threadtime']).returns(conn);
            setTimeout(function () {
              conn.emit('lines-stdout', ['- beginning of system\r']);
            }, 0);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(logcat.startCapture());

          case 6:
            logs = logcat.getLogs();

            logs.should.have.length.above(0);
            mocks.teen_process.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should correctly call subprocess and should reject promise', function callee$2$0() {
      var conn;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            conn = new _events2['default'].EventEmitter();

            conn.start = function () {};
            mocks.teen_process.expects("SubProcess").once().withExactArgs('dummyPath', ['logcat', '-v', 'threadtime']).returns(conn);
            setTimeout(function () {
              conn.emit('lines-stderr', ['execvp()']);
            }, 0);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(logcat.startCapture().should.eventually.be.rejectedWith('Logcat'));

          case 6:
            mocks.teen_process.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should correctly call subprocess and should resolve promise if it fails on startup', function callee$2$0() {
      var conn;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            conn = new _events2['default'].EventEmitter();

            conn.start = function () {};
            mocks.teen_process.expects("SubProcess").once().withExactArgs('dummyPath', ['logcat', '-v', 'threadtime']).returns(conn);
            setTimeout(function () {
              conn.emit('lines-stderr', ['something']);
            }, 0);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(logcat.startCapture().should.eventually.not.be.rejectedWith('Logcat'));

          case 6:
            mocks.teen_process.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));

  describe('clear', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
    it('should call logcat clear', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.teen_process.expects('exec').once().withExactArgs(adb.path, adb.defaultArgs.concat(['logcat', '-c']));
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(logcat.clear());

          case 3:
            mocks.teen_process.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should not fail if logcat clear fails', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.teen_process.expects('exec').once().withExactArgs(adb.path, adb.defaultArgs.concat(['logcat', '-c'])).throws('Failed to clear');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(logcat.clear().should.eventually.not.be.rejected);

          case 3:
            mocks.teen_process.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9sb2djYXQtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7OzRCQUNmLGNBQWM7O0lBQWhDLFlBQVk7O3NCQUNMLFFBQVE7Ozs7eUJBQ1Isa0JBQWtCOzs7O2lDQUNYLHFCQUFxQjs7QUFHL0Msa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZO0FBQzdCLE1BQUksR0FBRyxHQUFHLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFDLENBQUM7QUFDL0MsTUFBSSxNQUFNLEdBQUcsMkJBQVcsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7O0FBRWhFLFVBQVEsQ0FBQyxjQUFjLEVBQUUsa0NBQVUsRUFBQyxZQUFZLEVBQVosWUFBWSxFQUFDLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDbEUsTUFBRSxDQUFDLDZEQUE2RCxFQUFFO1VBQzVELElBQUksRUFTSixJQUFJOzs7O0FBVEosZ0JBQUksR0FBRyxJQUFJLG9CQUFPLFlBQVksRUFBRTs7QUFDcEMsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsWUFBTSxFQUFHLENBQUM7QUFDdkIsaUJBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUNyQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUNqRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsc0JBQVUsQ0FBQyxZQUFZO0FBQ3JCLGtCQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQzthQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDOzs2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RUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ3hFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzs2Q0FDdkIsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7QUFDdEQsaUJBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDN0IsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2xvZ2NhdC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCAqIGFzIHRlZW5fcHJvY2VzcyBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5pbXBvcnQgZXZlbnRzIGZyb20gJ2V2ZW50cyc7XHJcbmltcG9ydCBMb2djYXQgZnJvbSAnLi4vLi4vbGliL2xvZ2NhdCc7XHJcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xyXG5cclxuXHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdsb2djYXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGFkYiA9IHtwYXRoOiAnZHVtbXlQYXRoJywgZGVmYXVsdEFyZ3M6IFtdfTtcclxuICBsZXQgbG9nY2F0ID0gbmV3IExvZ2NhdCh7YWRiLCBkZWJ1ZzogZmFsc2UsIGRlYnVnVHJhY2U6IGZhbHNlfSk7XHJcblxyXG4gIGRlc2NyaWJlKCdzdGFydENhcHR1cmUnLCB3aXRoTW9ja3Moe3RlZW5fcHJvY2Vzc30sIGZ1bmN0aW9uIChtb2Nrcykge1xyXG4gICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgY2FsbCBzdWJwcm9jZXNzIGFuZCBzaG91bGQgcmVzb2x2ZSBwcm9taXNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgY29ubiA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgIGNvbm4uc3RhcnQgPSAoKSA9PiB7IH07XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiU3ViUHJvY2Vzc1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZHVtbXlQYXRoJywgWydsb2djYXQnLCAnLXYnLCAndGhyZWFkdGltZSddKVxyXG4gICAgICAgIC5yZXR1cm5zKGNvbm4pO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25uLmVtaXQoJ2xpbmVzLXN0ZG91dCcsIFsnLSBiZWdpbm5pbmcgb2Ygc3lzdGVtXFxyJ10pO1xyXG4gICAgICB9LCAwKTtcclxuICAgICAgYXdhaXQgbG9nY2F0LnN0YXJ0Q2FwdHVyZSgpO1xyXG4gICAgICBsZXQgbG9ncyA9IGxvZ2NhdC5nZXRMb2dzKCk7XHJcbiAgICAgIGxvZ3Muc2hvdWxkLmhhdmUubGVuZ3RoLmFib3ZlKDApO1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IGNhbGwgc3VicHJvY2VzcyBhbmQgc2hvdWxkIHJlamVjdCBwcm9taXNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgY29ubiA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgIGNvbm4uc3RhcnQgPSAoKSA9PiB7IH07XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiU3ViUHJvY2Vzc1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZHVtbXlQYXRoJywgWydsb2djYXQnLCAnLXYnLCAndGhyZWFkdGltZSddKVxyXG4gICAgICAgIC5yZXR1cm5zKGNvbm4pO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25uLmVtaXQoJ2xpbmVzLXN0ZGVycicsIFsnZXhlY3ZwKCknXSk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgICBhd2FpdCBsb2djYXQuc3RhcnRDYXB0dXJlKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKCdMb2djYXQnKTtcclxuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBjYWxsIHN1YnByb2Nlc3MgYW5kIHNob3VsZCByZXNvbHZlIHByb21pc2UgaWYgaXQgZmFpbHMgb24gc3RhcnR1cCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGNvbm4gPSBuZXcgZXZlbnRzLkV2ZW50RW1pdHRlcigpO1xyXG4gICAgICBjb25uLnN0YXJ0ID0gKCkgPT4geyB9O1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcIlN1YlByb2Nlc3NcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ2R1bW15UGF0aCcsIFsnbG9nY2F0JywgJy12JywgJ3RocmVhZHRpbWUnXSlcclxuICAgICAgICAucmV0dXJucyhjb25uKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29ubi5lbWl0KCdsaW5lcy1zdGRlcnInLCBbJ3NvbWV0aGluZyddKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICAgIGF3YWl0IGxvZ2NhdC5zdGFydENhcHR1cmUoKS5zaG91bGQuZXZlbnR1YWxseS5ub3QuYmUucmVqZWN0ZWRXaXRoKCdMb2djYXQnKTtcclxuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG5cclxuICBkZXNjcmliZSgnY2xlYXInLCB3aXRoTW9ja3Moe3RlZW5fcHJvY2Vzc30sIGZ1bmN0aW9uIChtb2Nrcykge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGxvZ2NhdCBjbGVhcicsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoJ2V4ZWMnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhhZGIucGF0aCwgYWRiLmRlZmF1bHRBcmdzLmNvbmNhdChbJ2xvZ2NhdCcsICctYyddKSk7XHJcbiAgICAgIGF3YWl0IGxvZ2NhdC5jbGVhcigpO1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IGZhaWwgaWYgbG9nY2F0IGNsZWFyIGZhaWxzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cygnZXhlYycpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKGFkYi5wYXRoLCBhZGIuZGVmYXVsdEFyZ3MuY29uY2F0KFsnbG9nY2F0JywgJy1jJ10pKVxyXG4gICAgICAgIC50aHJvd3MoJ0ZhaWxlZCB0byBjbGVhcicpO1xyXG4gICAgICBhd2FpdCBsb2djYXQuY2xlYXIoKS5zaG91bGQuZXZlbnR1YWxseS5ub3QuYmUucmVqZWN0ZWQ7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
