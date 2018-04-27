'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var log = _appiumSupport.logger.getLogger('Logcat');
var MAX_BUFFER_SIZE = 10000;
var LOGCAT_PROC_STARTUP_TIMEOUT = 10000;

var Logcat = (function () {
  function Logcat() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Logcat);

    this.adb = opts.adb;
    this.clearLogs = opts.clearDeviceLogsOnStart || false;
    this.debug = opts.debug;
    this.debugTrace = opts.debugTrace;
    this.maxBufferSize = opts.maxBufferSize || MAX_BUFFER_SIZE;
    this.logs = [];
    this.logIdxSinceLastRequest = 0;
  }

  _createClass(Logcat, [{
    key: 'startCapture',
    value: function startCapture() {
      var _this2 = this;

      var started = false;
      return new _bluebird2['default'](function callee$2$0(_resolve, _reject) {
        var resolve, reject;
        return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
          var _this = this;

          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              resolve = function resolve() {
                started = true;
                _resolve.apply(undefined, arguments);
              };

              reject = function reject() {
                started = true;
                _reject.apply(undefined, arguments);
              };

              if (!this.clearLogs) {
                context$3$0.next = 5;
                break;
              }

              context$3$0.next = 5;
              return _regeneratorRuntime.awrap(this.clear());

            case 5:

              log.debug('Starting logcat capture');
              this.proc = new _teen_process.SubProcess(this.adb.path, this.adb.defaultArgs.concat(['logcat', '-v', 'threadtime']));
              this.proc.on('exit', function (code, signal) {
                log.error('Logcat terminated with code ' + code + ', signal ' + signal);
                _this.proc = null;
                if (!started) {
                  log.warn('Logcat not started. Continuing');
                  resolve();
                }
              });
              this.proc.on('lines-stderr', function (lines) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = _getIterator(lines), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var line = _step.value;

                    if (/execvp\(\)/.test(line)) {
                      log.error('Logcat process failed to start');
                      reject(new Error('Logcat process failed to start. stderr: ' + line));
                    }
                    _this.outputHandler(line, 'STDERR: ');
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                      _iterator['return']();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }

                resolve();
              });
              this.proc.on('lines-stdout', function (lines) {
                resolve();
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = _getIterator(lines), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var line = _step2.value;

                    _this.outputHandler(line);
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                      _iterator2['return']();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              });
              context$3$0.next = 12;
              return _regeneratorRuntime.awrap(this.proc.start(0));

            case 12:
              // resolve after a timeout, even if no output was recorded
              setTimeout(resolve, LOGCAT_PROC_STARTUP_TIMEOUT);

            case 13:
            case 'end':
              return context$3$0.stop();
          }
        }, null, _this2);
      });
    }
  }, {
    key: 'outputHandler',
    value: function outputHandler(output) {
      var prefix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      output = output.trim();
      if (!output) {
        return;
      }

      if (this.logs.length >= this.maxBufferSize) {
        this.logs.shift();
        if (this.logIdxSinceLastRequest > 0) {
          --this.logIdxSinceLastRequest;
        }
      }
      var outputObj = {
        timestamp: Date.now(),
        level: 'ALL',
        message: output
      };
      this.logs.push(outputObj);
      var isTrace = /W\/Trace/.test(output);
      if (this.debug && (!isTrace || this.debugTrace)) {
        log.debug(prefix + output);
      }
    }
  }, {
    key: 'stopCapture',
    value: function stopCapture() {
      return _regeneratorRuntime.async(function stopCapture$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            log.debug("Stopping logcat capture");

            if (!(!this.proc || !this.proc.isRunning)) {
              context$2$0.next = 5;
              break;
            }

            log.debug("Logcat already stopped");
            this.proc = null;
            return context$2$0.abrupt('return');

          case 5:
            this.proc.removeAllListeners('exit');
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.proc.stop());

          case 8:
            this.proc = null;

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'getLogs',
    value: function getLogs() {
      if (this.logIdxSinceLastRequest < this.logs.length) {
        var result = this.logs.slice(this.logIdxSinceLastRequest);
        this.logIdxSinceLastRequest = this.logs.length;
        return result;
      }
      return [];
    }
  }, {
    key: 'getAllLogs',
    value: function getAllLogs() {
      return this.logs;
    }
  }, {
    key: 'clear',
    value: function clear() {
      var args;
      return _regeneratorRuntime.async(function clear$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            log.debug('Clearing logcat logs from device');
            context$2$0.prev = 1;
            args = this.adb.defaultArgs.concat(['logcat', '-c']);

            log.debug('Running \'' + this.adb.path + ' ' + args.join(' ') + '\'');
            context$2$0.next = 6;
            return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.adb.path, args));

          case 6:
            context$2$0.next = 11;
            break;

          case 8:
            context$2$0.prev = 8;
            context$2$0.t0 = context$2$0['catch'](1);

            log.warn('Failed to clear logcat logs: ' + context$2$0.t0.message);

          case 11:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[1, 8]]);
    }
  }]);

  return Logcat;
})();

exports['default'] = Logcat;
module.exports = exports['default'];
// eslint-disable-line promise/param-names
//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQyxDQUFDOztBQUMxRCxlQUFHLENBQUMsS0FBSyxnQkFBYSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksU0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFJLENBQUM7OzZDQUNwRCx3QkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUFFL0IsZUFBRyxDQUFDLElBQUksbUNBQWlDLGVBQUksT0FBTyxDQUFHLENBQUM7Ozs7Ozs7S0FFM0Q7OztTQXJIRyxNQUFNOzs7cUJBd0hHLE1BQU0iLCJmaWxlIjoibGliL2xvZ2NhdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YlByb2Nlc3MsIGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XHJcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcclxuXHJcblxyXG5jb25zdCBsb2cgPSBsb2dnZXIuZ2V0TG9nZ2VyKCdMb2djYXQnKTtcclxuY29uc3QgTUFYX0JVRkZFUl9TSVpFID0gMTAwMDA7XHJcbmNvbnN0IExPR0NBVF9QUk9DX1NUQVJUVVBfVElNRU9VVCA9IDEwMDAwO1xyXG5cclxuY2xhc3MgTG9nY2F0IHtcclxuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XHJcbiAgICB0aGlzLmFkYiA9IG9wdHMuYWRiO1xyXG4gICAgdGhpcy5jbGVhckxvZ3MgPSBvcHRzLmNsZWFyRGV2aWNlTG9nc09uU3RhcnQgfHwgZmFsc2U7XHJcbiAgICB0aGlzLmRlYnVnID0gb3B0cy5kZWJ1ZztcclxuICAgIHRoaXMuZGVidWdUcmFjZSA9IG9wdHMuZGVidWdUcmFjZTtcclxuICAgIHRoaXMubWF4QnVmZmVyU2l6ZSA9IG9wdHMubWF4QnVmZmVyU2l6ZSB8fCBNQVhfQlVGRkVSX1NJWkU7XHJcbiAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgIHRoaXMubG9nSWR4U2luY2VMYXN0UmVxdWVzdCA9IDA7XHJcbiAgfVxyXG5cclxuICBzdGFydENhcHR1cmUgKCkge1xyXG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcclxuICAgIHJldHVybiBuZXcgQihhc3luYyAoX3Jlc29sdmUsIF9yZWplY3QpID0+IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcm9taXNlL3BhcmFtLW5hbWVzXHJcbiAgICAgIGNvbnN0IHJlc29sdmUgPSBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIF9yZXNvbHZlKC4uLmFyZ3MpO1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCByZWplY3QgPSBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIF9yZWplY3QoLi4uYXJncyk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodGhpcy5jbGVhckxvZ3MpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLmNsZWFyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxvZy5kZWJ1ZygnU3RhcnRpbmcgbG9nY2F0IGNhcHR1cmUnKTtcclxuICAgICAgdGhpcy5wcm9jID0gbmV3IFN1YlByb2Nlc3ModGhpcy5hZGIucGF0aCwgdGhpcy5hZGIuZGVmYXVsdEFyZ3MuY29uY2F0KFsnbG9nY2F0JywgJy12JywgJ3RocmVhZHRpbWUnXSkpO1xyXG4gICAgICB0aGlzLnByb2Mub24oJ2V4aXQnLCAoY29kZSwgc2lnbmFsKSA9PiB7XHJcbiAgICAgICAgbG9nLmVycm9yKGBMb2djYXQgdGVybWluYXRlZCB3aXRoIGNvZGUgJHtjb2RlfSwgc2lnbmFsICR7c2lnbmFsfWApO1xyXG4gICAgICAgIHRoaXMucHJvYyA9IG51bGw7XHJcbiAgICAgICAgaWYgKCFzdGFydGVkKSB7XHJcbiAgICAgICAgICBsb2cud2FybignTG9nY2F0IG5vdCBzdGFydGVkLiBDb250aW51aW5nJyk7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wcm9jLm9uKCdsaW5lcy1zdGRlcnInLCAobGluZXMpID0+IHtcclxuICAgICAgICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XHJcbiAgICAgICAgICBpZiAoL2V4ZWN2cFxcKFxcKS8udGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICBsb2cuZXJyb3IoJ0xvZ2NhdCBwcm9jZXNzIGZhaWxlZCB0byBzdGFydCcpO1xyXG4gICAgICAgICAgICByZWplY3QobmV3IEVycm9yKGBMb2djYXQgcHJvY2VzcyBmYWlsZWQgdG8gc3RhcnQuIHN0ZGVycjogJHtsaW5lfWApKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMub3V0cHV0SGFuZGxlcihsaW5lLCAnU1RERVJSOiAnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wcm9jLm9uKCdsaW5lcy1zdGRvdXQnLCAobGluZXMpID0+IHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgbGluZSBvZiBsaW5lcykge1xyXG4gICAgICAgICAgdGhpcy5vdXRwdXRIYW5kbGVyKGxpbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGF3YWl0IHRoaXMucHJvYy5zdGFydCgwKTtcclxuICAgICAgLy8gcmVzb2x2ZSBhZnRlciBhIHRpbWVvdXQsIGV2ZW4gaWYgbm8gb3V0cHV0IHdhcyByZWNvcmRlZFxyXG4gICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIExPR0NBVF9QUk9DX1NUQVJUVVBfVElNRU9VVCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG91dHB1dEhhbmRsZXIgKG91dHB1dCwgcHJlZml4ID0gJycpIHtcclxuICAgIG91dHB1dCA9IG91dHB1dC50cmltKCk7XHJcbiAgICBpZiAoIW91dHB1dCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubG9ncy5sZW5ndGggPj0gdGhpcy5tYXhCdWZmZXJTaXplKSB7XHJcbiAgICAgIHRoaXMubG9ncy5zaGlmdCgpO1xyXG4gICAgICBpZiAodGhpcy5sb2dJZHhTaW5jZUxhc3RSZXF1ZXN0ID4gMCkge1xyXG4gICAgICAgIC0tdGhpcy5sb2dJZHhTaW5jZUxhc3RSZXF1ZXN0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBvdXRwdXRPYmogPSB7XHJcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcclxuICAgICAgbGV2ZWw6ICdBTEwnLFxyXG4gICAgICBtZXNzYWdlOiBvdXRwdXQsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5sb2dzLnB1c2gob3V0cHV0T2JqKTtcclxuICAgIGNvbnN0IGlzVHJhY2UgPSAvV1xcL1RyYWNlLy50ZXN0KG91dHB1dCk7XHJcbiAgICBpZiAodGhpcy5kZWJ1ZyAmJiAoIWlzVHJhY2UgfHwgdGhpcy5kZWJ1Z1RyYWNlKSkge1xyXG4gICAgICBsb2cuZGVidWcocHJlZml4ICsgb3V0cHV0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHN0b3BDYXB0dXJlICgpIHtcclxuICAgIGxvZy5kZWJ1ZyhcIlN0b3BwaW5nIGxvZ2NhdCBjYXB0dXJlXCIpO1xyXG4gICAgaWYgKCF0aGlzLnByb2MgfHwgIXRoaXMucHJvYy5pc1J1bm5pbmcpIHtcclxuICAgICAgbG9nLmRlYnVnKFwiTG9nY2F0IGFscmVhZHkgc3RvcHBlZFwiKTtcclxuICAgICAgdGhpcy5wcm9jID0gbnVsbDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wcm9jLnJlbW92ZUFsbExpc3RlbmVycygnZXhpdCcpO1xyXG4gICAgYXdhaXQgdGhpcy5wcm9jLnN0b3AoKTtcclxuICAgIHRoaXMucHJvYyA9IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRMb2dzICgpIHtcclxuICAgIGlmICh0aGlzLmxvZ0lkeFNpbmNlTGFzdFJlcXVlc3QgPCB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMubG9ncy5zbGljZSh0aGlzLmxvZ0lkeFNpbmNlTGFzdFJlcXVlc3QpO1xyXG4gICAgICB0aGlzLmxvZ0lkeFNpbmNlTGFzdFJlcXVlc3QgPSB0aGlzLmxvZ3MubGVuZ3RoO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsTG9ncyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2dzO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY2xlYXIgKCkge1xyXG4gICAgbG9nLmRlYnVnKCdDbGVhcmluZyBsb2djYXQgbG9ncyBmcm9tIGRldmljZScpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYXJncyA9IHRoaXMuYWRiLmRlZmF1bHRBcmdzLmNvbmNhdChbJ2xvZ2NhdCcsICctYyddKTtcclxuICAgICAgbG9nLmRlYnVnKGBSdW5uaW5nICcke3RoaXMuYWRiLnBhdGh9ICR7YXJncy5qb2luKCcgJyl9J2ApO1xyXG4gICAgICBhd2FpdCBleGVjKHRoaXMuYWRiLnBhdGgsIGFyZ3MpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGxvZy53YXJuKGBGYWlsZWQgdG8gY2xlYXIgbG9nY2F0IGxvZ3M6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2djYXQ7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uIn0=
