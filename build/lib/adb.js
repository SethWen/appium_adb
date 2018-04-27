'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _toolsIndexJs = require('./tools/index.js');

var _toolsIndexJs2 = _interopRequireDefault(_toolsIndexJs);

var _helpers = require('./helpers');

var DEFAULT_ADB_PORT = 5037;
var JAR_PATH = _path2['default'].resolve(_helpers.rootDir, 'jars');
var DEFAULT_OPTS = {
  sdkRoot: null,
  udid: null,
  appDeviceReadyTimeout: null,
  useKeystore: null,
  keystorePath: null,
  keystorePassword: null,
  keyAlias: null,
  keyPassword: null,
  executable: { path: "adb", defaultArgs: [] },
  tmpDir: _os2['default'].tmpdir(),
  curDeviceId: null,
  emulatorPort: null,
  logcat: null,
  binaries: {},
  instrumentProc: null,
  javaVersion: null,
  suppressKillServer: null,
  jars: {},
  helperJarPath: JAR_PATH,
  adbPort: DEFAULT_ADB_PORT
};

var ADB = (function () {
  function ADB() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ADB);

    opts.sdkRoot = _path2['default'].normalize(_path2['default'].resolve(process.cwd(), 'android')); // added by shawn
    if (typeof opts.sdkRoot === "undefined") {
      opts.sdkRoot = process.env.ANDROID_HOME || '';
    }

    _Object$assign(this, opts);
    _lodash2['default'].defaultsDeep(this, _lodash2['default'].cloneDeep(DEFAULT_OPTS));

    if (opts.remoteAdbHost) {
      this.executable.defaultArgs.push("-H", opts.remoteAdbHost);
    }
    // TODO figure out why we have this option as it does not appear to be
    // used anywhere. Probably deprecate in favor of simple opts.adbPort
    if (opts.remoteAdbPort) {
      this.adbPort = opts.remoteAdbPort;
    }
    this.executable.defaultArgs.push("-P", this.adbPort);

    this.initJars();
  }

  _createClass(ADB, [{
    key: 'initJars',
    value: function initJars() {
      var tempJars = ['move_manifest.jar', 'sign.jar', 'appium_apk_tools.jar', 'unsign.jar', 'verify.jar'];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(tempJars), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var jarName = _step.value;

          this.jars[jarName] = _path2['default'].resolve(JAR_PATH, jarName);
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
    }
  }]);

  return ADB;
})();

ADB.createADB = function callee$0$0(opts) {
  var adb;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        adb = new ADB(opts);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.getAdbWithCorrectAdbPath());

      case 3:
        return context$1$0.abrupt('return', adb);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// add all the methods to the ADB prototype
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = _getIterator(_lodash2['default'].toPairs(_toolsIndexJs2['default'])), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _step2$value = _slicedToArray(_step2.value, 2);

    var fnName = _step2$value[0];
    var fn = _step2$value[1];

    ADB.prototype[fnName] = fn;
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

exports['default'] = ADB;
exports.DEFAULT_ADB_PORT = DEFAULT_ADB_PORT;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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R0FBRyxDQUFDLElBQUksQ0FBQzs7eUNBQ2pCLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRTs7OzRDQUM3QixHQUFHOzs7Ozs7O0NBQ1gsQ0FBQzs7Ozs7Ozs7QUFHRixxQ0FBeUIsb0JBQUUsT0FBTywyQkFBUyxpSEFBRTs7O1FBQW5DLE1BQU07UUFBRSxFQUFFOztBQUNsQixPQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztHQUM1Qjs7Ozs7Ozs7Ozs7Ozs7OztxQkFFYyxHQUFHO1FBQ1QsZ0JBQWdCLEdBQWhCLGdCQUFnQiIsImZpbGUiOiJsaWIvYWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IG9zIGZyb20gJ29zJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBtZXRob2RzIGZyb20gJy4vdG9vbHMvaW5kZXguanMnO1xyXG5pbXBvcnQgeyByb290RGlyIH0gZnJvbSAnLi9oZWxwZXJzJztcclxuXHJcbmNvbnN0IERFRkFVTFRfQURCX1BPUlQgPSA1MDM3O1xyXG5jb25zdCBKQVJfUEFUSCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAnamFycycpO1xyXG5jb25zdCBERUZBVUxUX09QVFMgPSB7XHJcbiAgc2RrUm9vdDogbnVsbCxcclxuICB1ZGlkOiBudWxsLFxyXG4gIGFwcERldmljZVJlYWR5VGltZW91dDogbnVsbCxcclxuICB1c2VLZXlzdG9yZTogbnVsbCxcclxuICBrZXlzdG9yZVBhdGg6IG51bGwsXHJcbiAga2V5c3RvcmVQYXNzd29yZDogbnVsbCxcclxuICBrZXlBbGlhczogbnVsbCxcclxuICBrZXlQYXNzd29yZDogbnVsbCxcclxuICBleGVjdXRhYmxlOiB7cGF0aDogXCJhZGJcIiwgZGVmYXVsdEFyZ3M6IFtdfSxcclxuICB0bXBEaXI6IG9zLnRtcGRpcigpLFxyXG4gIGN1ckRldmljZUlkOiBudWxsLFxyXG4gIGVtdWxhdG9yUG9ydCA6IG51bGwsXHJcbiAgbG9nY2F0OiBudWxsLFxyXG4gIGJpbmFyaWVzOiB7fSxcclxuICBpbnN0cnVtZW50UHJvYzogbnVsbCxcclxuICBqYXZhVmVyc2lvbjogbnVsbCxcclxuICBzdXBwcmVzc0tpbGxTZXJ2ZXI6IG51bGwsXHJcbiAgamFyczoge30sXHJcbiAgaGVscGVySmFyUGF0aDogSkFSX1BBVEgsXHJcbiAgYWRiUG9ydDogREVGQVVMVF9BREJfUE9SVFxyXG59O1xyXG5cclxuY2xhc3MgQURCIHtcclxuICBjb25zdHJ1Y3RvciAob3B0cyA9IHt9KSB7XHJcblx0b3B0cy5zZGtSb290ID0gcGF0aC5ub3JtYWxpemUocGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdhbmRyb2lkJykpOyAvLyBhZGRlZCBieSBzaGF3blxyXG4gICAgaWYgKHR5cGVvZiBvcHRzLnNka1Jvb3QgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgb3B0cy5zZGtSb290ID0gcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0cyk7XHJcbiAgICBfLmRlZmF1bHRzRGVlcCh0aGlzLCBfLmNsb25lRGVlcChERUZBVUxUX09QVFMpKTtcclxuXHJcbiAgICBpZiAob3B0cy5yZW1vdGVBZGJIb3N0KSB7XHJcbiAgICAgIHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5wdXNoKFwiLUhcIiwgb3B0cy5yZW1vdGVBZGJIb3N0KTtcclxuICAgIH1cclxuICAgIC8vIFRPRE8gZmlndXJlIG91dCB3aHkgd2UgaGF2ZSB0aGlzIG9wdGlvbiBhcyBpdCBkb2VzIG5vdCBhcHBlYXIgdG8gYmVcclxuICAgIC8vIHVzZWQgYW55d2hlcmUuIFByb2JhYmx5IGRlcHJlY2F0ZSBpbiBmYXZvciBvZiBzaW1wbGUgb3B0cy5hZGJQb3J0XHJcbiAgICBpZiAob3B0cy5yZW1vdGVBZGJQb3J0KSB7XHJcbiAgICAgIHRoaXMuYWRiUG9ydCA9IG9wdHMucmVtb3RlQWRiUG9ydDtcclxuICAgIH1cclxuICAgIHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5wdXNoKFwiLVBcIiwgdGhpcy5hZGJQb3J0KTtcclxuXHJcbiAgICB0aGlzLmluaXRKYXJzKCk7XHJcbiAgfVxyXG5cclxuICBpbml0SmFycyAoKSB7XHJcbiAgICBsZXQgdGVtcEphcnMgPSBbJ21vdmVfbWFuaWZlc3QuamFyJywgJ3NpZ24uamFyJywgJ2FwcGl1bV9hcGtfdG9vbHMuamFyJyxcclxuICAgICAgICAgICAgICAgICAgICAndW5zaWduLmphcicsICd2ZXJpZnkuamFyJ107XHJcbiAgICBmb3IgKGxldCBqYXJOYW1lIG9mIHRlbXBKYXJzKSB7XHJcbiAgICAgIHRoaXMuamFyc1tqYXJOYW1lXSA9IHBhdGgucmVzb2x2ZShKQVJfUEFUSCwgamFyTmFtZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5BREIuY3JlYXRlQURCID0gYXN5bmMgZnVuY3Rpb24gKG9wdHMpIHtcclxuICBsZXQgYWRiID0gbmV3IEFEQihvcHRzKTtcclxuICBhd2FpdCBhZGIuZ2V0QWRiV2l0aENvcnJlY3RBZGJQYXRoKCk7XHJcbiAgcmV0dXJuIGFkYjtcclxufTtcclxuXHJcbi8vIGFkZCBhbGwgdGhlIG1ldGhvZHMgdG8gdGhlIEFEQiBwcm90b3R5cGVcclxuZm9yIChsZXQgW2ZuTmFtZSwgZm5dIG9mIF8udG9QYWlycyhtZXRob2RzKSkge1xyXG4gIEFEQi5wcm90b3R5cGVbZm5OYW1lXSA9IGZuO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBREI7XHJcbmV4cG9ydCB7IERFRkFVTFRfQURCX1BPUlQgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi4ifQ==
