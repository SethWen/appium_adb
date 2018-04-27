'use strict';

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _appiumSupport = require('appium-support');

var _helpers = require('../helpers');

var _teen_process = require('teen_process');

var _asyncbox = require('asyncbox');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var systemCallMethods = {};

var DEFAULT_ADB_EXEC_TIMEOUT = 20000; // in milliseconds
var DEFAULT_ADB_REBOOT_RETRIES = 90;

/**
 * Retrieve full path to the given binary.
 *
 * @param {string} binaryName - The name of the binary.
 * @return {string} Full path to the given binary including current SDK root.
 */
systemCallMethods.getSdkBinaryPath = function callee$0$0(binaryName) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].info('Checking whether ' + binaryName + ' is present');

        if (!this.sdkRoot) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getBinaryFromSdkRoot(binaryName));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 5:
        _loggerJs2['default'].warn('The ANDROID_HOME environment variable is not set to the Android SDK ' + 'root directory path. ANDROID_HOME is required for compatibility ' + ('with SDK 23+. Checking along PATH for ' + binaryName + '.'));
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getBinaryFromPath(binaryName));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the name of the tool,
 * which prints full path to the given command shortcut.
 *
 * @return {string} Depending on the current platform this is
 *                  supposed to be either 'which' or 'where'.
 */
systemCallMethods.getCommandForOS = function () {
  return _appiumSupport.system.isWindows() ? 'where' : 'which';
};

/**
 * Retrieve full binary name for the current operating system.
 *
 * @param {string} binaryName - simple binary name, for example 'android'.
 * @return {string} Formatted binary name depending on the current platform,
 *                  for example, 'android.bat' on Windows.
 */
systemCallMethods.getBinaryNameForOS = function (binaryName) {
  if (!_appiumSupport.system.isWindows()) {
    return binaryName;
  }

  if (['android', 'apksigner'].indexOf(binaryName) >= 0 && !binaryName.toLowerCase().endsWith('.bat')) {
    return binaryName + '.bat';
  }
  if (!binaryName.toLowerCase().endsWith('.exe')) {
    return binaryName + '.exe';
  }
  return binaryName;
};

/**
 * Retrieve full path to the given binary.
 *
 * @param {string} binaryName - Simple name of a binary file.
 * @return {string} Full path to the given binary. The method tries
 *                  to enumerate all the known locations where the binary
 *                  might be located and stops the search as soon as the first
 *                  match is found on the local file system.
 * @throws {Error} If the binary with given name is not present at any
 *                 of known locations or Android SDK is not installed on the
 *                 local file system.
 */
systemCallMethods.getBinaryFromSdkRoot = _lodash2['default'].memoize(function callee$0$0(binaryName) {
  var binaryLoc, binaryLocs, buildToolDirs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, versionDir, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, loc;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        binaryLoc = null;

        binaryName = this.getBinaryNameForOS(binaryName);
        binaryLocs = [_path2['default'].resolve(this.sdkRoot, "platform-tools", binaryName), _path2['default'].resolve(this.sdkRoot, "emulator", binaryName), _path2['default'].resolve(this.sdkRoot, "tools", binaryName), _path2['default'].resolve(this.sdkRoot, "tools", "bin", binaryName)];
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _helpers.getDirectories)(_path2['default'].resolve(this.sdkRoot, "build-tools")));

      case 5:
        buildToolDirs = context$1$0.sent;

        // the newest version goes first
        buildToolDirs.sort(_semver2['default'].rcompare);
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 10;
        for (_iterator = _getIterator(buildToolDirs); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          versionDir = _step.value;

          binaryLocs.push(_path2['default'].resolve(this.sdkRoot, "build-tools", versionDir, binaryName));
        }
        context$1$0.next = 18;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](10);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 18:
        context$1$0.prev = 18;
        context$1$0.prev = 19;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 21:
        context$1$0.prev = 21;

        if (!_didIteratorError) {
          context$1$0.next = 24;
          break;
        }

        throw _iteratorError;

      case 24:
        return context$1$0.finish(21);

      case 25:
        return context$1$0.finish(18);

      case 26:
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 29;
        _iterator2 = _getIterator(binaryLocs);

      case 31:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 41;
          break;
        }

        loc = _step2.value;
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(loc));

      case 35:
        if (!context$1$0.sent) {
          context$1$0.next = 38;
          break;
        }

        binaryLoc = loc;
        return context$1$0.abrupt('break', 41);

      case 38:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 31;
        break;

      case 41:
        context$1$0.next = 47;
        break;

      case 43:
        context$1$0.prev = 43;
        context$1$0.t1 = context$1$0['catch'](29);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t1;

      case 47:
        context$1$0.prev = 47;
        context$1$0.prev = 48;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 50:
        context$1$0.prev = 50;

        if (!_didIteratorError2) {
          context$1$0.next = 53;
          break;
        }

        throw _iteratorError2;

      case 53:
        return context$1$0.finish(50);

      case 54:
        return context$1$0.finish(47);

      case 55:
        if (!(binaryLoc === null)) {
          context$1$0.next = 57;
          break;
        }

        throw new Error('Could not find ' + binaryName + ' in ' + binaryLocs + ', ' + ('or supported build-tools under ' + this.sdkRoot + ' ') + 'do you have the Android SDK installed at this location?');

      case 57:
        binaryLoc = binaryLoc.trim();
        _loggerJs2['default'].info('Using ' + binaryName + ' from ' + binaryLoc);
        return context$1$0.abrupt('return', binaryLoc);

      case 60:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10, 14, 18, 26], [19,, 21, 25], [29, 43, 47, 55], [48,, 50, 54]]);
});

/**
 * Retrieve full path to a binary file using the standard system lookup tool.
 *
 * @param {string} binaryName - The name of the binary.
 * @return {string} Full path to the binary received from 'which'/'where'
 *                  output.
 * @throws {Error} If lookup tool returns non-zero return code.
 */
systemCallMethods.getBinaryFromPath = function callee$0$0(binaryName) {
  var binaryLoc, cmd, _ref, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        binaryLoc = null;
        cmd = this.getCommandForOS();
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, [binaryName]));

      case 5:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;

        _loggerJs2['default'].info('Using ' + binaryName + ' from ' + stdout);
        // TODO write a test for binaries with spaces.
        binaryLoc = stdout.trim();
        return context$1$0.abrupt('return', binaryLoc);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].errorAndThrow('Could not find ' + binaryName + ' Please set the ANDROID_HOME ' + 'environment variable with the Android SDK root directory path.');

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 12]]);
};

/**
 * @typedef {Object} Device
 * @property {string} udid - The device udid.
 * @property {string} state - Current device state, as it is visible in
 *                            _adb devices -l_ output.
 */

/**
 * Retrieve the list of devices visible to adb.
 *
 * @return {Array.<Device>} The list of devices or an empty list if
 *                          no devices are connected.
 * @throws {Error} If there was an error while listing devices.
 */
systemCallMethods.getConnectedDevices = function callee$0$0() {
  var _ref2, stdout, startingIndex, devices, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, line, lineInfo;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting connected devices...");
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, this.executable.defaultArgs.concat(['devices'])));

      case 4:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        startingIndex = stdout.indexOf("List of devices");

        if (!(startingIndex === -1)) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('Unexpected output while trying to get devices. output was: ' + stdout);

      case 9:
        // slicing ouput we care about.
        stdout = stdout.slice(startingIndex);
        devices = [];
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 14;

        for (_iterator3 = _getIterator(stdout.split("\n")); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          line = _step3.value;

          if (line.trim() !== "" && line.indexOf("List of devices") === -1 && line.indexOf("adb server") === -1 && line.indexOf("* daemon") === -1 && line.indexOf("offline") === -1) {
            lineInfo = line.split("\t");

            // state is either "device" or "offline", afaict
            devices.push({ udid: lineInfo[0], state: lineInfo[1] });
          }
        }
        context$1$0.next = 22;
        break;

      case 18:
        context$1$0.prev = 18;
        context$1$0.t0 = context$1$0['catch'](14);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 22:
        context$1$0.prev = 22;
        context$1$0.prev = 23;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 25:
        context$1$0.prev = 25;

        if (!_didIteratorError3) {
          context$1$0.next = 28;
          break;
        }

        throw _iteratorError3;

      case 28:
        return context$1$0.finish(25);

      case 29:
        return context$1$0.finish(22);

      case 30:
        _loggerJs2['default'].debug(devices.length + ' device(s) connected');
        return context$1$0.abrupt('return', devices);

      case 34:
        context$1$0.prev = 34;
        context$1$0.t1 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error while getting connected devices. Original error: ' + context$1$0.t1.message);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 34], [14, 18, 22, 30], [23,, 25, 29]]);
};

/**
 * Retrieve the list of devices visible to adb within the given timeout.
 *
 * @param {number} timeoutMs - The maximum number of milliseconds to get at least
 *                             one list item.
 * @return {Array.<Device>} The list of connected devices.
 * @throws {Error} If no connected devices can be detected within the given timeout.
 */
systemCallMethods.getDevicesWithRetry = function callee$0$0() {
  var timeoutMs = arguments.length <= 0 || arguments[0] === undefined ? 20000 : arguments[0];
  var start, getDevices;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        start = Date.now();

        _loggerJs2['default'].debug("Trying to find a connected android device");

        getDevices = function getDevices() {
          var devices;
          return _regeneratorRuntime.async(function getDevices$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                if (!(Date.now() - start > timeoutMs)) {
                  context$2$0.next = 2;
                  break;
                }

                throw new Error("Could not find a connected Android device.");

              case 2:
                context$2$0.prev = 2;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.getConnectedDevices());

              case 5:
                devices = context$2$0.sent;

                if (!(devices.length < 1)) {
                  context$2$0.next = 15;
                  break;
                }

                _loggerJs2['default'].debug("Could not find devices, restarting adb server...");
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 10:
                context$2$0.next = 12;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

              case 12:
                context$2$0.next = 14;
                return _regeneratorRuntime.awrap(getDevices());

              case 14:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 15:
                return context$2$0.abrupt('return', devices);

              case 18:
                context$2$0.prev = 18;
                context$2$0.t0 = context$2$0['catch'](2);

                _loggerJs2['default'].debug("Could not find devices, restarting adb server...");
                context$2$0.next = 23;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 23:
                context$2$0.next = 25;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

              case 25:
                context$2$0.next = 27;
                return _regeneratorRuntime.awrap(getDevices());

              case 27:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 28:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[2, 18]]);
        };

        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(getDevices());

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Restart adb server if _this.suppressKillServer_ property is true.
 */
systemCallMethods.restartAdb = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.suppressKillServer) {
          context$1$0.next = 3;
          break;
        }

        _loggerJs2['default'].debug('Not restarting abd since \'suppressKillServer\' is on');
        return context$1$0.abrupt('return');

      case 3:

        _loggerJs2['default'].debug('Restarting adb');
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.killServer());

      case 7:
        context$1$0.next = 12;
        break;

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0['catch'](4);

        _loggerJs2['default'].error("Error killing ADB server, going to see if it's online anyway");

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 9]]);
};

/**
 * Kill adb server.
 */
systemCallMethods.killServer = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Killing adb server on port ' + this.adbPort);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, [].concat(_toConsumableArray(this.executable.defaultArgs), ['kill-server'])));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Reset Telnet authentication token.
 * @see {@link http://tools.android.com/recent/emulator2516releasenotes} for more details.
 *
 * @returns {boolean} If token reset was successful.
 */
systemCallMethods.resetTelnetAuthToken = _lodash2['default'].memoize(function callee$0$0() {
  var homeFolderPath, dstPath;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        homeFolderPath = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

        if (homeFolderPath) {
          context$1$0.next = 4;
          break;
        }

        _loggerJs2['default'].warn('Cannot find the path to user home folder. Ignoring resetting of emulator\'s telnet authentication token');
        return context$1$0.abrupt('return', false);

      case 4:
        dstPath = _path2['default'].resolve(homeFolderPath, '.emulator_console_auth_token');

        _loggerJs2['default'].debug('Overriding ' + dstPath + ' with an empty string to avoid telnet authentication for emulator commands');
        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(dstPath, ''));

      case 9:
        context$1$0.next = 15;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](6);

        _loggerJs2['default'].warn('Error ' + context$1$0.t0.message + ' while resetting the content of ' + dstPath + '. Ignoring resetting of emulator\'s telnet authentication token');
        return context$1$0.abrupt('return', false);

      case 15:
        return context$1$0.abrupt('return', true);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 11]]);
});

/**
 * Execute the given emulator command using _adb emu_ tool.
 *
 * @param {Array.<string>} cmd - The array of rest command line parameters.
 */
systemCallMethods.adbExecEmu = function callee$0$0(cmd) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.verifyEmulatorConnected());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.resetTelnetAuthToken());

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adbExec(['emu'].concat(_toConsumableArray(cmd))));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Execute the given adb command.
 *
 * @param {Array.<string>} cmd - The array of rest command line parameters
 *                      or a single string parameter.
 * @param {Object} opts - Additional options mapping. See
 *                        {@link https://github.com/appium/node-teen_process}
 *                        for more details.
 * @return {string} - Command's stdout.
 * @throws {Error} If the command returned non-zero exit code.
 */
systemCallMethods.adbExec = function callee$0$0(cmd) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execFunc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (cmd) {
          context$1$0.next = 2;
          break;
        }

        throw new Error("You need to pass in a command to adbExec()");

      case 2:
        // setting default timeout for each command to prevent infinite wait.
        opts.timeout = opts.timeout || DEFAULT_ADB_EXEC_TIMEOUT;

        execFunc = function execFunc() {
          var linkerWarningRe, args, _ref3, stdout, protocolFaultError, deviceNotFoundError;

          return _regeneratorRuntime.async(function execFunc$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                linkerWarningRe = /^WARNING: linker.+$/m;
                context$2$0.prev = 1;

                if (!(cmd instanceof Array)) {
                  cmd = [cmd];
                }
                args = this.executable.defaultArgs.concat(cmd);

                _loggerJs2['default'].debug('Running \'' + this.executable.path + '\' with args: ' + ('' + JSON.stringify(args)));
                context$2$0.next = 7;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, args, opts));

              case 7:
                _ref3 = context$2$0.sent;
                stdout = _ref3.stdout;

                // sometimes ADB prints out weird stdout warnings that we don't want
                // to include in any of the response data, so let's strip it out
                stdout = stdout.replace(linkerWarningRe, '').trim();
                return context$2$0.abrupt('return', stdout);

              case 13:
                context$2$0.prev = 13;
                context$2$0.t0 = context$2$0['catch'](1);
                protocolFaultError = new RegExp("protocol fault \\(no status\\)", "i").test(context$2$0.t0);
                deviceNotFoundError = new RegExp("error: device ('.+' )?not found", "i").test(context$2$0.t0);

                if (!(protocolFaultError || deviceNotFoundError)) {
                  context$2$0.next = 23;
                  break;
                }

                _loggerJs2['default'].info('Error sending command, reconnecting device and retrying: ' + cmd);
                context$2$0.next = 21;
                return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(1000));

              case 21:
                context$2$0.next = 23;
                return _regeneratorRuntime.awrap(this.getDevicesWithRetry());

              case 23:
                if (!(context$2$0.t0.code === 0 && context$2$0.t0.stdout)) {
                  context$2$0.next = 27;
                  break;
                }

                stdout = context$2$0.t0.stdout;

                stdout = stdout.replace(linkerWarningRe, '').trim();
                return context$2$0.abrupt('return', stdout);

              case 27:
                throw new Error('Error executing adbExec. Original error: \'' + context$2$0.t0.message + '\'; ' + ('Stderr: \'' + (context$2$0.t0.stderr || '').trim() + '\'; Code: \'' + context$2$0.t0.code + '\''));

              case 28:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2, [[1, 13]]);
        };

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(2, execFunc));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Execute the given command using _adb shell_ prefix.
 *
 * @param {Array.<string>|string} cmd - The array of rest command line parameters or a single
 *                                      string parameter.
 * @param {Object} opts - Additional options mapping. See
 *                        {@link https://github.com/appium/node-teen_process}
 *                        for more details.
 * @return {string} - Command's stdout.
 * @throws {Error} If the command returned non-zero exit code.
 */
systemCallMethods.shell = function callee$0$0(cmd) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var execCmd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.isDeviceConnected());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        throw new Error('No device connected, cannot run adb shell command \'' + cmd.join(' ') + '\'');

      case 4:
        execCmd = ['shell'];

        if (cmd instanceof Array) {
          execCmd = execCmd.concat(cmd);
        } else {
          execCmd.push(cmd);
        }
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.adbExec(execCmd, opts));

      case 8:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

systemCallMethods.createSubProcess = function () {
  var args = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  // add the default arguments
  args = this.executable.defaultArgs.concat(args);
  _loggerJs2['default'].debug('Creating ADB subprocess with args: ' + JSON.stringify(args));
  return new _teen_process.SubProcess(this.getAdbPath(), args);
};

/**
 * Retrieve the current adb port.
 * @todo can probably deprecate this now that the logic is just to read this.adbPort
 * @return {number} The current adb port number.
 */
systemCallMethods.getAdbServerPort = function () {
  return this.adbPort;
};

/**
 * Retrieve the current emulator port from _adb devives_ output.
 *
 * @return {number} The current emulator port.
 * @throws {Error} If there are no connected devices.
 */
systemCallMethods.getEmulatorPort = function callee$0$0() {
  var devices, port;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting running emulator port");

        if (!(this.emulatorPort !== null)) {
          context$1$0.next = 3;
          break;
        }

        return context$1$0.abrupt('return', this.emulatorPort);

      case 3:
        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 6:
        devices = context$1$0.sent;
        port = this.getPortFromEmulatorString(devices[0].udid);

        if (!port) {
          context$1$0.next = 12;
          break;
        }

        return context$1$0.abrupt('return', port);

      case 12:
        throw new Error('Emulator port not found');

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](3);

        _loggerJs2['default'].errorAndThrow('No devices connected. Original error: ' + context$1$0.t0.message);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 15]]);
};

/**
 * Retrieve the current emulator port by parsing emulator name string.
 *
 * @param {string} emStr - Emulator name string.
 * @return {number|boolean} Either the current emulator port or
 *                          _false_ if port number cannot be parsed.
 */
systemCallMethods.getPortFromEmulatorString = function (emStr) {
  var portPattern = /emulator-(\d+)/;
  if (portPattern.test(emStr)) {
    return parseInt(portPattern.exec(emStr)[1], 10);
  }
  return false;
};

/**
 * Retrieve the list of currently connected emulators.
 *
 * @return {Array.<Device>} The list of connected devices.
 */
systemCallMethods.getConnectedEmulators = function callee$0$0() {
  var devices, emulators, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, device, port;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug("Getting connected emulators");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 4:
        devices = context$1$0.sent;
        emulators = [];
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 9;

        for (_iterator4 = _getIterator(devices); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          device = _step4.value;
          port = this.getPortFromEmulatorString(device.udid);

          if (port) {
            device.port = port;
            emulators.push(device);
          }
        }
        context$1$0.next = 17;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](9);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t0;

      case 17:
        context$1$0.prev = 17;
        context$1$0.prev = 18;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 20:
        context$1$0.prev = 20;

        if (!_didIteratorError4) {
          context$1$0.next = 23;
          break;
        }

        throw _iteratorError4;

      case 23:
        return context$1$0.finish(20);

      case 24:
        return context$1$0.finish(17);

      case 25:
        _loggerJs2['default'].debug(emulators.length + ' emulator(s) connected');
        return context$1$0.abrupt('return', emulators);

      case 29:
        context$1$0.prev = 29;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting emulators. Original error: ' + context$1$0.t1.message);

      case 32:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 29], [9, 13, 17, 25], [18,, 20, 24]]);
};

/**
 * Set _emulatorPort_ property of the current class.
 *
 * @param {number} emPort - The emulator port to be set.
 */
systemCallMethods.setEmulatorPort = function (emPort) {
  this.emulatorPort = emPort;
};

/**
 * Set the identifier of the current device (_this.curDeviceId_).
 *
 * @param {string} - The device identifier.
 */
systemCallMethods.setDeviceId = function (deviceId) {
  _loggerJs2['default'].debug('Setting device id to ' + deviceId);
  this.curDeviceId = deviceId;
  var argsHasDevice = this.executable.defaultArgs.indexOf('-s');
  if (argsHasDevice !== -1) {
    // remove the old device id from the arguments
    this.executable.defaultArgs.splice(argsHasDevice, 2);
  }
  this.executable.defaultArgs.push('-s', deviceId);
};

/**
 * Set the the current device object.
 *
 * @param {Device} deviceObj - The device object to be set.
 */
systemCallMethods.setDevice = function (deviceObj) {
  var deviceId = deviceObj.udid;
  var emPort = this.getPortFromEmulatorString(deviceId);
  this.setEmulatorPort(emPort);
  this.setDeviceId(deviceId);
};

/**
 * Get the object for the currently running emulator.
 *
 * @param {string} avdName - Emulator name.
 * @return {?Device} Currently running emulator or _null_.
 */
systemCallMethods.getRunningAVD = function callee$0$0(avdName) {
  var emulators, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, emulator, runningAVDName;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug('Trying to find ' + avdName + ' emulator');
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getConnectedEmulators());

      case 4:
        emulators = context$1$0.sent;
        _iteratorNormalCompletion5 = true;
        _didIteratorError5 = false;
        _iteratorError5 = undefined;
        context$1$0.prev = 8;
        _iterator5 = _getIterator(emulators);

      case 10:
        if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
          context$1$0.next = 23;
          break;
        }

        emulator = _step5.value;

        this.setEmulatorPort(emulator.port);
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.sendTelnetCommand("avd name"));

      case 15:
        runningAVDName = context$1$0.sent;

        if (!(avdName === runningAVDName)) {
          context$1$0.next = 20;
          break;
        }

        _loggerJs2['default'].debug('Found emulator ' + avdName + ' in port ' + emulator.port);
        this.setDeviceId(emulator.udid);
        return context$1$0.abrupt('return', emulator);

      case 20:
        _iteratorNormalCompletion5 = true;
        context$1$0.next = 10;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t0 = context$1$0['catch'](8);
        _didIteratorError5 = true;
        _iteratorError5 = context$1$0.t0;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
          _iterator5['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError5) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError5;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
        _loggerJs2['default'].debug('Emulator ' + avdName + ' not running');
        return context$1$0.abrupt('return', null);

      case 41:
        context$1$0.prev = 41;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting AVD. Original error: ' + context$1$0.t1.message);

      case 44:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 41], [8, 25, 29, 37], [30,, 32, 36]]);
};

/**
 * Get the object for the currently running emulator.
 *
 * @param {string} avdName - Emulator name.
 * @param {number} timeoutMs [20000] - The maximum number of milliseconds
 *                                     to wait until at least one running AVD object
 *                                     is detected.
 * @return {?Device} Currently running emulator or _null_.
 * @throws {Error} If no device has been detected within the timeout.
 */
systemCallMethods.getRunningAVDWithRetry = function callee$0$0(avdName) {
  var timeoutMs = arguments.length <= 1 || arguments[1] === undefined ? 20000 : arguments[1];
  var start, runningAVD;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        start = Date.now();

      case 2:
        if (!(Date.now() - start < timeoutMs)) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getRunningAVD(avdName.replace('@', '')));

      case 6:
        runningAVD = context$1$0.sent;

        if (!runningAVD) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt('return', runningAVD);

      case 9:
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](3);

        // Do nothing.
        _loggerJs2['default'].info('Couldn\'t get running AVD, will retry. Error was: ' + context$1$0.t0.message);

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(200));

      case 16:
        context$1$0.next = 2;
        break;

      case 18:
        _loggerJs2['default'].errorAndThrow('Could not find ' + avdName + ' emulator.');
        context$1$0.next = 24;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting AVD with retry. Original error: ' + context$1$0.t1.message);

      case 24:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 21], [3, 11]]);
};

/**
 * Shutdown all running emulators by killing their processes.
 *
 * @throws {Error} If killing tool returned non-zero return code.
 */
systemCallMethods.killAllEmulators = function callee$0$0() {
  var cmd, args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = undefined, args = undefined;

        if (_appiumSupport.system.isWindows()) {
          cmd = 'TASKKILL';
          args = ['TASKKILL', '/IM', 'emulator.exe'];
        } else {
          cmd = '/usr/bin/killall';
          args = ['-m', 'emulator*'];
        }
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, args));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].errorAndThrow('Error killing emulators. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 7]]);
};

/**
 * Kill emulator with the given name. No error
 * is thrown is given avd does not exist/is not running.
 *
 * @param {string} avdName - The name of the emulator to be killed.
 */
systemCallMethods.killEmulator = function callee$0$0(avdName) {
  var device;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('killing avd \'' + avdName + '\'');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getRunningAVD(avdName));

      case 3:
        device = context$1$0.sent;

        if (!device) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adbExec(['emu', 'kill']));

      case 7:
        _loggerJs2['default'].info('successfully killed emulator \'' + avdName + '\'');
        context$1$0.next = 11;
        break;

      case 10:
        _loggerJs2['default'].info('no avd with name \'' + avdName + '\' running. skipping kill step.');

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Start an emulator with given parameters and wait until it is full stared.
 *
 * @param {string} avdName - The name of an existing emulator.
 * @param {Array.<string>|string} avdArgs - Additional emulator command line argument.
 * @param {?string} language - Emulator system language.
 * @param {?contry} country - Emulator system country.
 * @param {number} avdLaunchTimeout [60000] - Emulator startup timeout in milliseconds.
 * @param {number} retryTimes [1] - The maximum number of startup retries.
 * @throws {Error} If the emulator fails to start within the given timeout.
 */
systemCallMethods.launchAVD = function callee$0$0(avdName, avdArgs, language, country) {
  var avdLaunchTimeout = arguments.length <= 4 || arguments[4] === undefined ? 60000 : arguments[4];
  var avdReadyTimeout = arguments.length <= 5 || arguments[5] === undefined ? 60000 : arguments[5];
  var retryTimes = arguments.length <= 6 || arguments[6] === undefined ? 1 : arguments[6];
  var emulatorBinaryPath, launchArgs, locale, proc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Launching Emulator with AVD ' + avdName + ', launchTimeout' + (avdLaunchTimeout + ' ms and readyTimeout ' + avdReadyTimeout + ' ms'));
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("emulator"));

      case 3:
        emulatorBinaryPath = context$1$0.sent;

        if (avdName[0] === "@") {
          avdName = avdName.substr(1);
        }
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.checkAvdExist(avdName));

      case 7:
        launchArgs = ["-avd", avdName];

        if (typeof language === "string") {
          _loggerJs2['default'].debug('Setting Android Device Language to ' + language);
          launchArgs.push("-prop", 'persist.sys.language=' + language.toLowerCase());
        }
        if (typeof country === "string") {
          _loggerJs2['default'].debug('Setting Android Device Country to ' + country);
          launchArgs.push("-prop", 'persist.sys.country=' + country.toUpperCase());
        }
        locale = undefined;

        if (typeof language === "string" && typeof country === "string") {
          locale = language.toLowerCase() + "-" + country.toUpperCase();
        } else if (typeof language === "string") {
          locale = language.toLowerCase();
        } else if (typeof country === "string") {
          locale = country;
        }
        if (typeof locale === "string") {
          _loggerJs2['default'].debug('Setting Android Device Locale to ' + locale);
          launchArgs.push("-prop", 'persist.sys.locale=' + locale);
        }
        if (typeof avdArgs === "string") {
          avdArgs = avdArgs.split(" ");
          launchArgs = launchArgs.concat(avdArgs);
        }
        _loggerJs2['default'].debug('Running \'' + emulatorBinaryPath + '\' with args: ' + JSON.stringify(launchArgs));
        proc = new _teen_process.SubProcess(emulatorBinaryPath, launchArgs);
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(proc.start(0));

      case 18:
        proc.on('output', function (stdout, stderr) {
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = _getIterator((stdout || stderr || '').split('\n').filter(Boolean)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var line = _step6.value;

              _loggerJs2['default'].info('[AVD OUTPUT] ' + line);
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                _iterator6['return']();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        });
        proc.on('exit', function (code, signal) {
          if (code !== 0) {
            _loggerJs2['default'].errorAndThrow('Emulator avd ' + avdName + ' exit with code ' + code + ', signal ' + signal);
          }
        });
        context$1$0.next = 22;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(retryTimes, this.getRunningAVDWithRetry.bind(this), avdName, avdLaunchTimeout));

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(this.waitForEmulatorReady(avdReadyTimeout));

      case 24:
        return context$1$0.abrupt('return', proc);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @typedef {Object} ADBVersion
 * @property {string} versionString - ADB version as a string.
 * @property {float} versionFloat - Version number as float value (useful for comparison).
 * @property {number} major - Major version number.
 * @property {number} minor - Minor version number.
 * @property {number} patch - Patch version number.
 */

/**
 * Get the adb version. The result of this method is cached.
 *
 * @return {ADBVersion} The current adb version.
 * @throws {Error} If it is not possible to parse adb version.
 */
systemCallMethods.getAdbVersion = _lodash2['default'].memoize(function callee$0$0() {
  var adbVersion, parts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec('version'));

      case 3:
        adbVersion = context$1$0.sent.replace(/Android\sDebug\sBridge\sversion\s([\d\.]*)[\s\w\-]*/, "$1");
        parts = adbVersion.split('.');
        return context$1$0.abrupt('return', {
          versionString: adbVersion,
          versionFloat: parseFloat(adbVersion),
          major: parseInt(parts[0], 10),
          minor: parseInt(parts[1], 10),
          patch: parts[2] ? parseInt(parts[2], 10) : undefined
        });

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting adb version. Original error: \'' + context$1$0.t0.message + '\'; ' + ('Stderr: \'' + (context$1$0.t0.stderr || '').trim() + '\'; Code: \'' + context$1$0.t0.code + '\''));

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 8]]);
});

/**
 * Check if given emulator exists in the list of available avds.
 *
 * @param {string} avdName - The name of emulator to verify for existence.
 * @throws {Error} If the emulator with given name does not exist.
 */
systemCallMethods.checkAvdExist = function callee$0$0(avdName) {
  var cmd, result, unknownOptionError, sdkVersion, binaryName, existings;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cmd = undefined, result = undefined;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath('emulator'));

      case 4:
        cmd = context$1$0.sent;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, ['-list-avds']));

      case 7:
        result = context$1$0.sent;
        context$1$0.next = 25;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](1);
        unknownOptionError = new RegExp("unknown option: -list-avds", "i").test(context$1$0.t0.stderr);

        if (!unknownOptionError) {
          _loggerJs2['default'].errorAndThrow('Error executing checkAvdExist. Original error: \'' + context$1$0.t0.message + '\'; ' + ('Stderr: \'' + (context$1$0.t0.stderr || '').trim() + '\'; Code: \'' + context$1$0.t0.code + '\''));
        }
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap((0, _helpers.getSdkToolsVersion)());

      case 16:
        sdkVersion = context$1$0.sent;
        binaryName = 'android';

        if (sdkVersion) {
          if (sdkVersion.major >= 25) {
            binaryName = 'avdmanager';
          }
        } else {
          _loggerJs2['default'].warn('Defaulting binary name to \'' + binaryName + '\', because SDK version cannot be parsed');
        }
        // If -list-avds option is not available, use android command as an alternative
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath(binaryName));

      case 21:
        cmd = context$1$0.sent;
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(cmd, ['list', 'avd', '-c']));

      case 24:
        result = context$1$0.sent;

      case 25:
        if (result.stdout.indexOf(avdName) === -1) {
          existings = '(' + result.stdout.trim().replace(/[\n]/g, '), (') + ')';

          _loggerJs2['default'].errorAndThrow('Avd \'' + avdName + '\' is not available. please select your avd name from one of these: \'' + existings + '\'');
        }

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 10]]);
};

/**
 * Check if the current emulator is ready to accept further commands (booting completed).
 *
 * @param {number} timeoutMs [20000] - The maximum number of milliseconds to wait.
 * @throws {Error} If the emulator is not ready within the given timeout.
 */
systemCallMethods.waitForEmulatorReady = function callee$0$0() {
  var timeoutMs = arguments.length <= 0 || arguments[0] === undefined ? 20000 : arguments[0];
  var start, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        start = Date.now();

        _loggerJs2['default'].debug("Waiting until emulator is ready");

      case 2:
        if (!(Date.now() - start < timeoutMs)) {
          context$1$0.next = 17;
          break;
        }

        context$1$0.prev = 3;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.shell(["getprop", "init.svc.bootanim"]));

      case 6:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf('stopped') > -1)) {
          context$1$0.next = 9;
          break;
        }

        return context$1$0.abrupt('return');

      case 9:
        context$1$0.next = 13;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](3);

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(3000));

      case 15:
        context$1$0.next = 2;
        break;

      case 17:
        _loggerJs2['default'].errorAndThrow('Emulator not ready');

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 11]]);
};

/**
 * Check if the current device is ready to accept further commands (booting completed).
 *
 * @param {number} appDeviceReadyTimeout [30] - The maximum number of seconds to wait.
 * @throws {Error} If the device is not ready within the given timeout.
 */
systemCallMethods.waitForDevice = function callee$0$0() {
  var appDeviceReadyTimeout = arguments.length <= 0 || arguments[0] === undefined ? 30 : arguments[0];
  var retries, timeout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.appDeviceReadyTimeout = appDeviceReadyTimeout;
        retries = 3;
        timeout = parseInt(this.appDeviceReadyTimeout, 10) / retries * 1000;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(retries, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.adbExec('wait-for-device', { timeout: timeout }));

              case 3:
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.ping());

              case 5:
                context$2$0.next = 14;
                break;

              case 7:
                context$2$0.prev = 7;
                context$2$0.t0 = context$2$0['catch'](0);
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(this.restartAdb());

              case 11:
                context$2$0.next = 13;
                return _regeneratorRuntime.awrap(this.getConnectedDevices());

              case 13:
                _loggerJs2['default'].errorAndThrow('Error in waiting for device. Original error: \'' + context$2$0.t0.message + '\'. ' + 'Retrying by restarting ADB');

              case 14:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3, [[0, 7]]);
        }));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Reboot the current device and wait until it is completed.
 *
 * @param {number} retries [DEFAULT_ADB_REBOOT_RETRIES] - The maximum number of reboot retries.
 * @throws {Error} If the device failed to reboot and number of retries is exceeded.
 */
systemCallMethods.reboot = function callee$0$0() {
  var retries = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_ADB_REBOOT_RETRIES : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this4 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['stop']));

      case 4:
        context$1$0.next = 15;
        break;

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](1);

        if (!(context$1$0.t0.message.indexOf('must be root') === -1)) {
          context$1$0.next = 10;
          break;
        }

        throw context$1$0.t0;

      case 10:
        // this device needs adb to be running as root to stop.
        // so try to restart the daemon
        _loggerJs2['default'].debug('Device requires adb to be running as root in order to reboot. Restarting daemon');
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.root());

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.shell(['stop']));

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(2000));

      case 17:
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(this.setDeviceProperty('sys.boot_completed', 0));

      case 19:
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.shell(['start']));

      case 21:
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(retries, 1000, function callee$1$0() {
          var booted, msg;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.getDeviceProperty('sys.boot_completed'));

              case 2:
                booted = context$2$0.sent;

                if (!(booted === '1')) {
                  context$2$0.next = 7;
                  break;
                }

                return context$2$0.abrupt('return');

              case 7:
                msg = 'Waiting for reboot. This takes time';

                _loggerJs2['default'].debug(msg);
                throw new Error(msg);

              case 10:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4);
        }));

      case 23:
        context$1$0.prev = 23;

        this.unroot();
        return context$1$0.finish(23);

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0,, 23, 26], [1, 6]]);
};

/**
 * Switch adb server to root mode.
 *
 * @return {boolean} True of the switch was successful or false
 *                   if the switch failed.
 */
systemCallMethods.root = function callee$0$0() {
  var _ref4, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['root']));

      case 3:
        _ref4 = context$1$0.sent;
        stdout = _ref4.stdout;

        if (!(stdout && stdout.indexOf('adbd cannot run as root') !== -1)) {
          context$1$0.next = 7;
          break;
        }

        throw new Error(stdout.trim());

      case 7:
        return context$1$0.abrupt('return', true);

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].warn('Unable to root adb daemon: \'' + context$1$0.t0.message + '\'. Continuing');
        return context$1$0.abrupt('return', false);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 10]]);
};

/**
 * Switch adb server to non-root mode.
 *
 * @return {boolean} True of the switch was successful or false
 *                   if the switch failed.
 */
systemCallMethods.unroot = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.executable.path, ['unroot']));

      case 3:
        return context$1$0.abrupt('return', true);

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].warn('Unable to unroot adb daemon: \'' + context$1$0.t0.message + '\'. Continuing');
        return context$1$0.abrupt('return', false);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6]]);
};

/**
 * Verify whether a remote path exists on the device under test.
 *
 * @param {string} remotePath - The remote path to verify.
 * @return {boolean} True if the given path exists on the device.
 */
systemCallMethods.fileExists = function callee$0$0(remotePath) {
  var files;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.ls(remotePath));

      case 2:
        files = context$1$0.sent;
        return context$1$0.abrupt('return', files.length > 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the output of _ls_ command on the device under test.
 *
 * @param {string} remotePath - The remote path (the first argument to the _ls_ command).
 * @param {Array.<String>} opts [[]] - Additional _ls_ options.
 * @return {Array.<String>} The _ls_ output as an array of split lines.
 *                          An empty array is returned of the given _remotePath_
 *                          does not exist.
 */
systemCallMethods.ls = function callee$0$0(remotePath) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var args, stdout, lines;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        args = ['ls'].concat(_toConsumableArray(opts), [remotePath]);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(args));

      case 4:
        stdout = context$1$0.sent;
        lines = stdout.split("\n");
        return context$1$0.abrupt('return', lines.map(function (l) {
          return l.trim();
        }).filter(Boolean).filter(function (l) {
          return l.indexOf("No such file") === -1;
        }));

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0['catch'](0);

        if (!(context$1$0.t0.message.indexOf('No such file or directory') === -1)) {
          context$1$0.next = 13;
          break;
        }

        throw context$1$0.t0;

      case 13:
        return context$1$0.abrupt('return', []);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 9]]);
};

/**
 * Get the size of the particular file located on the device under test.
 *
 * @param {string} remotePath - The remote path to the file.
 * @return {number} File size in bytes.
 * @throws {Error} If there was an error while getting the size of the given file.
 */
systemCallMethods.fileSize = function callee$0$0(remotePath) {
  var files, match;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.ls(remotePath, ['-la']));

      case 3:
        files = context$1$0.sent;

        if (!(files.length !== 1)) {
          context$1$0.next = 6;
          break;
        }

        throw new Error('Remote path is not a file');

      case 6:
        match = /\s(\d+)\s+\d{4}-\d{2}-\d{2}/.exec(files[0]);

        if (!(!match || _lodash2['default'].isNaN(parseInt(match[1], 10)))) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('Unable to parse size from list output: \'' + files[0] + '\'');

      case 9:
        return context$1$0.abrupt('return', parseInt(match[1], 10));

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Unable to get file size for \'' + remotePath + '\': ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 12]]);
};

exports['default'] = systemCallMethods;
module.exports = exports['default'];

// get subpaths for currently installed build tool directories

// expecting adb devices to return output as
// List of devices attached
// emulator-5554	device

// cool down

// cool down

// The methods is used to remove telnet auth token
//

// cool down

// do nothing
// let the emu finish stopping;

// we don't want the stack trace, so no log.errorAndThrow

// on real devices in some situations we get an error in the stdout

// https://regex101.com/r/fOs4P4/3
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9zeXN0ZW0tY2FsbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7d0JBQ1AsY0FBYzs7Ozt3QkFDaEIsVUFBVTs7Ozs2QkFDRyxnQkFBZ0I7O3VCQUNRLFlBQVk7OzRCQUM5QixjQUFjOzt3QkFDSCxVQUFVOztzQkFDeEMsUUFBUTs7OztzQkFDSCxRQUFROzs7O0FBRzNCLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDOztBQUUzQixJQUFNLHdCQUF3QixHQUFHLEtBQUssQ0FBQztBQUN2QyxJQUFNLDBCQUEwQixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFRdEMsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsb0JBQWdCLFVBQVU7Ozs7QUFDN0QsOEJBQUksSUFBSSx1QkFBcUIsVUFBVSxpQkFBYyxDQUFDOzthQUNsRCxJQUFJLENBQUMsT0FBTzs7Ozs7O3lDQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7Ozs7OztBQUVwRCw4QkFBSSxJQUFJLENBQUMsMklBQ2tFLCtDQUN6QixVQUFVLE9BQUcsQ0FBQyxDQUFDOzt5Q0FDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQzs7Ozs7Ozs7OztDQUNoRCxDQUFDOzs7Ozs7Ozs7QUFTRixpQkFBaUIsQ0FBQyxlQUFlLEdBQUcsWUFBWTtBQUM5QyxTQUFPLHNCQUFPLFNBQVMsRUFBRSxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDL0MsQ0FBQzs7Ozs7Ozs7O0FBU0YsaUJBQWlCLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxVQUFVLEVBQUU7QUFDM0QsTUFBSSxDQUFDLHNCQUFPLFNBQVMsRUFBRSxFQUFFO0FBQ3ZCLFdBQU8sVUFBVSxDQUFDO0dBQ25COztBQUVELE1BQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFDakQsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzlDLFdBQVUsVUFBVSxVQUFPO0dBQzVCO0FBQ0QsTUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDOUMsV0FBVSxVQUFVLFVBQU87R0FDNUI7QUFDRCxTQUFPLFVBQVUsQ0FBQztDQUNuQixDQUFDOzs7Ozs7Ozs7Ozs7OztBQWNGLGlCQUFpQixDQUFDLG9CQUFvQixHQUFHLG9CQUFFLE9BQU8sQ0FBQyxvQkFBZ0IsVUFBVTtNQUN2RSxTQUFTLEVBRVQsVUFBVSxFQUtWLGFBQWEsa0ZBR1IsVUFBVSx1RkFHVixHQUFHOzs7OztBQWJSLGlCQUFTLEdBQUcsSUFBSTs7QUFDcEIsa0JBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0Msa0JBQVUsR0FBRyxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxFQUN4RCxrQkFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQ2xELGtCQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsRUFDL0Msa0JBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQzs7eUNBRS9DLDZCQUFlLGtCQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDOzs7QUFBL0UscUJBQWE7OztBQUVqQixxQkFBYSxDQUFDLElBQUksQ0FBQyxvQkFBTyxRQUFRLENBQUMsQ0FBQzs7Ozs7QUFDcEMsc0NBQXVCLGFBQWEscUdBQUU7QUFBN0Isb0JBQVU7O0FBQ2pCLG9CQUFVLENBQUMsSUFBSSxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUNwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUNlLFVBQVU7Ozs7Ozs7O0FBQWpCLFdBQUc7O3lDQUNBLGtCQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7O0FBQ3RCLGlCQUFTLEdBQUcsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2NBSWhCLFNBQVMsS0FBSyxJQUFJLENBQUE7Ozs7O2NBQ2QsSUFBSSxLQUFLLENBQUMsb0JBQWtCLFVBQVUsWUFBTyxVQUFVLCtDQUNYLElBQUksQ0FBQyxPQUFPLE9BQUcsNERBQ1EsQ0FBQzs7O0FBRTVFLGlCQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzdCLDhCQUFJLElBQUksWUFBVSxVQUFVLGNBQVMsU0FBUyxDQUFHLENBQUM7NENBQzNDLFNBQVM7Ozs7Ozs7Q0FDakIsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FBVUgsaUJBQWlCLENBQUMsaUJBQWlCLEdBQUcsb0JBQWdCLFVBQVU7TUFDMUQsU0FBUyxFQUNULEdBQUcsUUFFQSxNQUFNOzs7OztBQUhULGlCQUFTLEdBQUcsSUFBSTtBQUNoQixXQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTs7O3lDQUVULHdCQUFLLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7O0FBQXZDLGNBQU0sUUFBTixNQUFNOztBQUNYLDhCQUFJLElBQUksWUFBVSxVQUFVLGNBQVMsTUFBTSxDQUFHLENBQUM7O0FBRS9DLGlCQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDOzRDQUNuQixTQUFTOzs7Ozs7QUFFaEIsOEJBQUksYUFBYSxDQUFDLG9CQUFrQixVQUFVLHFHQUM0QixDQUFDLENBQUM7Ozs7Ozs7Q0FFL0UsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCRixpQkFBaUIsQ0FBQyxtQkFBbUIsR0FBRzthQUcvQixNQUFNLEVBSVAsYUFBYSxFQU1iLE9BQU8sdUZBQ0YsSUFBSSxFQU1MLFFBQVE7Ozs7O0FBbkJsQiw4QkFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQzs7O3lDQUVuQix3QkFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7O0FBQTNGLGNBQU0sU0FBTixNQUFNO0FBSVAscUJBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDOztjQUNqRCxhQUFhLEtBQUssQ0FBQyxDQUFDLENBQUE7Ozs7O2NBQ2hCLElBQUksS0FBSyxpRUFBK0QsTUFBTSxDQUFHOzs7O0FBR3pGLGNBQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2pDLGVBQU8sR0FBRyxFQUFFOzs7Ozs7QUFDaEIsdUNBQWlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHlHQUFFO0FBQTVCLGNBQUk7O0FBQ1gsY0FBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDOUIsb0JBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7O0FBRS9CLG1CQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztXQUN2RDtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNELDhCQUFJLEtBQUssQ0FBSSxPQUFPLENBQUMsTUFBTSwwQkFBdUIsQ0FBQzs0Q0FDNUMsT0FBTzs7Ozs7O0FBRWQsOEJBQUksYUFBYSw2REFBMkQsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUU1RixDQUFDOzs7Ozs7Ozs7O0FBVUYsaUJBQWlCLENBQUMsbUJBQW1CLEdBQUc7TUFBZ0IsU0FBUyx5REFBRyxLQUFLO01BQ25FLEtBQUssRUFFTCxVQUFVOzs7Ozs7QUFGVixhQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTs7QUFDdEIsOEJBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7O0FBQ25ELGtCQUFVLEdBQUcsU0FBYixVQUFVO2NBS04sT0FBTzs7OztzQkFKVCxBQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUksU0FBUyxDQUFBOzs7OztzQkFDNUIsSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUM7Ozs7O2lEQUd6QyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7OztBQUExQyx1QkFBTzs7c0JBQ1AsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7Ozs7O0FBQ3BCLHNDQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDOztpREFDeEQsSUFBSSxDQUFDLFVBQVUsRUFBRTs7OztpREFFakIscUJBQU0sR0FBRyxDQUFDOzs7O2lEQUNILFVBQVUsRUFBRTs7Ozs7O29EQUVwQixPQUFPOzs7Ozs7QUFFZCxzQ0FBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQzs7aURBQ3hELElBQUksQ0FBQyxVQUFVLEVBQUU7Ozs7aURBRWpCLHFCQUFNLEdBQUcsQ0FBQzs7OztpREFDSCxVQUFVLEVBQUU7Ozs7Ozs7Ozs7U0FFNUI7Ozt5Q0FDWSxVQUFVLEVBQUU7Ozs7Ozs7Ozs7Q0FDMUIsQ0FBQzs7Ozs7QUFLRixpQkFBaUIsQ0FBQyxVQUFVLEdBQUc7Ozs7YUFDekIsSUFBSSxDQUFDLGtCQUFrQjs7Ozs7QUFDekIsOEJBQUksS0FBSyx5REFBdUQsQ0FBQzs7Ozs7QUFJbkUsOEJBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Ozt5Q0FFcEIsSUFBSSxDQUFDLFVBQVUsRUFBRTs7Ozs7Ozs7OztBQUV2Qiw4QkFBSSxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQzs7Ozs7OztDQUU3RSxDQUFDOzs7OztBQUtGLGlCQUFpQixDQUFDLFVBQVUsR0FBRzs7OztBQUM3Qiw4QkFBSSxLQUFLLGlDQUErQixJQUFJLENBQUMsT0FBTyxDQUFHLENBQUM7O3lDQUNsRCx3QkFBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksK0JBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLElBQUUsYUFBYSxHQUFFOzs7Ozs7O0NBQ2xGLENBQUM7Ozs7Ozs7O0FBUUYsaUJBQWlCLENBQUMsb0JBQW9CLEdBQUcsb0JBQUUsT0FBTyxDQUFDO01BRzNDLGNBQWMsRUFLZCxPQUFPOzs7O0FBTFAsc0JBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEFBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEdBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQzs7WUFDdEYsY0FBYzs7Ozs7QUFDakIsOEJBQUksSUFBSSxDQUFDLHlHQUF5RyxDQUFDLENBQUM7NENBQzdHLEtBQUs7OztBQUVSLGVBQU8sR0FBRyxrQkFBSyxPQUFPLENBQUMsY0FBYyxFQUFFLDhCQUE4QixDQUFDOztBQUM1RSw4QkFBSSxLQUFLLGlCQUFlLE9BQU8sZ0ZBQTZFLENBQUM7Ozt5Q0FFckcsa0JBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7Ozs7Ozs7Ozs7QUFFL0IsOEJBQUksSUFBSSxZQUFVLGVBQUUsT0FBTyx3Q0FBbUMsT0FBTyxxRUFBa0UsQ0FBQzs0Q0FDakksS0FBSzs7OzRDQUVQLElBQUk7Ozs7Ozs7Q0FDWixDQUFDLENBQUM7Ozs7Ozs7QUFPSCxpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLEdBQUc7Ozs7O3lDQUMxQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7Ozs7eUNBQzlCLElBQUksQ0FBQyxvQkFBb0IsRUFBRTs7Ozt5Q0FDM0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLDRCQUFLLEdBQUcsR0FBRTs7Ozs7OztDQUNwQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBYUYsaUJBQWlCLENBQUMsT0FBTyxHQUFHLG9CQUFnQixHQUFHO01BQUUsSUFBSSx5REFBRyxFQUFFO01BTXBELFFBQVE7Ozs7OztZQUxQLEdBQUc7Ozs7O2NBQ0EsSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUM7Ozs7QUFHL0QsWUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLHdCQUF3QixDQUFDOztBQUNwRCxnQkFBUSxHQUFHLFNBQVgsUUFBUTtjQUNOLGVBQWUsRUFLYixJQUFJLFNBa0JGLE1BQU0sRUFUUixrQkFBa0IsRUFDbEIsbUJBQW1COzs7OztBQWZyQiwrQkFBZSxHQUFHLHNCQUFzQjs7O0FBRTFDLG9CQUFJLEVBQUUsR0FBRyxZQUFZLEtBQUssQ0FBQSxBQUFDLEVBQUU7QUFDM0IscUJBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO0FBQ0csb0JBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDOztBQUNsRCxzQ0FBSSxLQUFLLENBQUMsZUFBWSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksNEJBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQyxDQUFDOztpREFDaEIsd0JBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQzs7OztBQUF0RCxzQkFBTSxTQUFOLE1BQU07Ozs7QUFHWCxzQkFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29EQUM3QyxNQUFNOzs7OztBQUVULGtDQUFrQixHQUFHLElBQUksTUFBTSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksZ0JBQUc7QUFDOUUsbUNBQW1CLEdBQUcsSUFBSSxNQUFNLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxnQkFBRzs7c0JBQ2hGLGtCQUFrQixJQUFJLG1CQUFtQixDQUFBOzs7OztBQUMzQyxzQ0FBSSxJQUFJLCtEQUE2RCxHQUFHLENBQUcsQ0FBQzs7aURBQ3RFLHFCQUFNLElBQUksQ0FBQzs7OztpREFDWCxJQUFJLENBQUMsbUJBQW1CLEVBQUU7OztzQkFHOUIsZUFBRSxJQUFJLEtBQUssQ0FBQyxJQUFJLGVBQUUsTUFBTSxDQUFBOzs7OztBQUN0QixzQkFBTSxHQUFHLGVBQUUsTUFBTTs7QUFDckIsc0JBQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvREFDN0MsTUFBTTs7O3NCQUdULElBQUksS0FBSyxDQUFDLGdEQUE2QyxlQUFFLE9BQU8sNEJBQ3hDLENBQUMsZUFBRSxNQUFNLElBQUksRUFBRSxDQUFBLENBQUUsSUFBSSxFQUFFLG9CQUFhLGVBQUUsSUFBSSxRQUFHLENBQUM7Ozs7Ozs7U0FFL0U7Ozt5Q0FDWSxxQkFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDOzs7Ozs7Ozs7O0NBQ2hDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhRixpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsb0JBQWdCLEdBQUc7TUFBRSxJQUFJLHlEQUFHLEVBQUU7TUFJbEQsT0FBTzs7Ozs7eUNBSEEsSUFBSSxDQUFDLGlCQUFpQixFQUFFOzs7Ozs7OztjQUMzQixJQUFJLEtBQUssMERBQXVELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQUk7OztBQUVyRixlQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7O0FBQ3ZCLFlBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtBQUN4QixpQkFBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0IsTUFBTTtBQUNMLGlCQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25COzt5Q0FDWSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Q0FDekMsQ0FBQzs7QUFFRixpQkFBaUIsQ0FBQyxnQkFBZ0IsR0FBRyxZQUFxQjtNQUFYLElBQUkseURBQUcsRUFBRTs7O0FBRXRELE1BQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsd0JBQUksS0FBSyx5Q0FBdUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBRyxDQUFDO0FBQ3hFLFNBQU8sNkJBQWUsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2hELENBQUM7Ozs7Ozs7QUFPRixpQkFBaUIsQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZO0FBQy9DLFNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztDQUNyQixDQUFDOzs7Ozs7OztBQVFGLGlCQUFpQixDQUFDLGVBQWUsR0FBRztNQU01QixPQUFPLEVBQ1AsSUFBSTs7OztBQU5WLDhCQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDOztjQUN2QyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQTs7Ozs7NENBQ3JCLElBQUksQ0FBQyxZQUFZOzs7Ozt5Q0FHSixJQUFJLENBQUMsbUJBQW1CLEVBQUU7OztBQUExQyxlQUFPO0FBQ1AsWUFBSSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzthQUN0RCxJQUFJOzs7Ozs0Q0FDQyxJQUFJOzs7Y0FFTCxJQUFJLEtBQUssMkJBQTJCOzs7Ozs7Ozs7O0FBRzVDLDhCQUFJLGFBQWEsNENBQTBDLGVBQUUsT0FBTyxDQUFHLENBQUM7Ozs7Ozs7Q0FFM0UsQ0FBQzs7Ozs7Ozs7O0FBU0YsaUJBQWlCLENBQUMseUJBQXlCLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDN0QsTUFBSSxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7QUFDbkMsTUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzNCLFdBQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDakQ7QUFDRCxTQUFPLEtBQUssQ0FBQztDQUNkLENBQUM7Ozs7Ozs7QUFPRixpQkFBaUIsQ0FBQyxxQkFBcUIsR0FBRztNQUdsQyxPQUFPLEVBQ1AsU0FBUyx1RkFDSixNQUFNLEVBQ1QsSUFBSTs7Ozs7OztBQUpWLDhCQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOzt5Q0FDckIsSUFBSSxDQUFDLG1CQUFtQixFQUFFOzs7QUFBMUMsZUFBTztBQUNQLGlCQUFTLEdBQUcsRUFBRTs7Ozs7O0FBQ2xCLHVDQUFtQixPQUFPLHlHQUFFO0FBQW5CLGdCQUFNO0FBQ1QsY0FBSSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDOztBQUN0RCxjQUFJLElBQUksRUFBRTtBQUNSLGtCQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNuQixxQkFBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUN4QjtTQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNELDhCQUFJLEtBQUssQ0FBSSxTQUFTLENBQUMsTUFBTSw0QkFBeUIsQ0FBQzs0Q0FDaEQsU0FBUzs7Ozs7O0FBRWhCLDhCQUFJLGFBQWEsK0NBQTZDLGVBQUUsT0FBTyxDQUFHLENBQUM7Ozs7Ozs7Q0FFOUUsQ0FBQzs7Ozs7OztBQU9GLGlCQUFpQixDQUFDLGVBQWUsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUNwRCxNQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztDQUM1QixDQUFDOzs7Ozs7O0FBT0YsaUJBQWlCLENBQUMsV0FBVyxHQUFHLFVBQVUsUUFBUSxFQUFFO0FBQ2xELHdCQUFJLEtBQUssMkJBQXlCLFFBQVEsQ0FBRyxDQUFDO0FBQzlDLE1BQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO0FBQzVCLE1BQUksYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RCxNQUFJLGFBQWEsS0FBSyxDQUFDLENBQUMsRUFBRTs7QUFFeEIsUUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUN0RDtBQUNELE1BQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDbEQsQ0FBQzs7Ozs7OztBQU9GLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxVQUFVLFNBQVMsRUFBRTtBQUNqRCxNQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQzlCLE1BQUksTUFBTSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0RCxNQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLE1BQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDNUIsQ0FBQzs7Ozs7Ozs7QUFRRixpQkFBaUIsQ0FBQyxhQUFhLEdBQUcsb0JBQWdCLE9BQU87TUFHakQsU0FBUyx1RkFDSixRQUFRLEVBRVgsY0FBYzs7Ozs7OztBQUpwQiw4QkFBSSxLQUFLLHFCQUFtQixPQUFPLGVBQVksQ0FBQzs7eUNBQzFCLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs7O0FBQTlDLGlCQUFTOzs7OztrQ0FDUSxTQUFTOzs7Ozs7OztBQUFyQixnQkFBUTs7QUFDZixZQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7eUNBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQzs7O0FBQXpELHNCQUFjOztjQUNkLE9BQU8sS0FBSyxjQUFjLENBQUE7Ozs7O0FBQzVCLDhCQUFJLEtBQUsscUJBQW1CLE9BQU8saUJBQVksUUFBUSxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQ2hFLFlBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzRDQUN6QixRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHbkIsOEJBQUksS0FBSyxlQUFhLE9BQU8sa0JBQWUsQ0FBQzs0Q0FDdEMsSUFBSTs7Ozs7O0FBRVgsOEJBQUksYUFBYSx5Q0FBdUMsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUV4RSxDQUFDOzs7Ozs7Ozs7Ozs7QUFZRixpQkFBaUIsQ0FBQyxzQkFBc0IsR0FBRyxvQkFBZ0IsT0FBTztNQUFFLFNBQVMseURBQUcsS0FBSztNQUU3RSxLQUFLLEVBR0QsVUFBVTs7Ozs7QUFIZCxhQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTs7O2NBQ2YsQUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFJLFNBQVMsQ0FBQTs7Ozs7Ozt5Q0FFWixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7QUFBL0Qsa0JBQVU7O2FBQ1YsVUFBVTs7Ozs7NENBQ0wsVUFBVTs7Ozs7Ozs7Ozs7QUFJbkIsOEJBQUksSUFBSSx3REFBcUQsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozt5Q0FHdEUscUJBQU0sR0FBRyxDQUFDOzs7Ozs7O0FBRWxCLDhCQUFJLGFBQWEscUJBQW1CLE9BQU8sZ0JBQWEsQ0FBQzs7Ozs7Ozs7QUFFekQsOEJBQUksYUFBYSxvREFBa0QsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUVuRixDQUFDOzs7Ozs7O0FBT0YsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUc7TUFDL0IsR0FBRyxFQUFFLElBQUk7Ozs7QUFBVCxXQUFHLGNBQUUsSUFBSTs7QUFDYixZQUFJLHNCQUFPLFNBQVMsRUFBRSxFQUFFO0FBQ3RCLGFBQUcsR0FBRyxVQUFVLENBQUM7QUFDakIsY0FBSSxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsQ0FBQztTQUM1QyxNQUFNO0FBQ0wsYUFBRyxHQUFHLGtCQUFrQixDQUFDO0FBQ3pCLGNBQUksR0FBRyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztTQUM1Qjs7O3lDQUVPLHdCQUFLLEdBQUcsRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7QUFFckIsOEJBQUksYUFBYSwrQ0FBNkMsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUU5RSxDQUFDOzs7Ozs7OztBQVFGLGlCQUFpQixDQUFDLFlBQVksR0FBRyxvQkFBZ0IsT0FBTztNQUVsRCxNQUFNOzs7O0FBRFYsOEJBQUksS0FBSyxvQkFBaUIsT0FBTyxRQUFJLENBQUM7O3lDQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzs7O0FBQTFDLGNBQU07O2FBQ04sTUFBTTs7Ozs7O3lDQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7OztBQUNuQyw4QkFBSSxJQUFJLHFDQUFrQyxPQUFPLFFBQUksQ0FBQzs7Ozs7QUFFdEQsOEJBQUksSUFBSSx5QkFBc0IsT0FBTyxxQ0FBaUMsQ0FBQzs7Ozs7OztDQUUxRSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBYUYsaUJBQWlCLENBQUMsU0FBUyxHQUFHLG9CQUFnQixPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPO01BQy9FLGdCQUFnQix5REFBRyxLQUFLO01BQUUsZUFBZSx5REFBRyxLQUFLO01BQUUsVUFBVSx5REFBRyxDQUFDO01BRzdELGtCQUFrQixFQUtsQixVQUFVLEVBU1YsTUFBTSxFQWlCTixJQUFJOzs7O0FBakNSLDhCQUFJLEtBQUssQ0FBQyxpQ0FBK0IsT0FBTyx3QkFDbkMsZ0JBQWdCLDZCQUF3QixlQUFlLFNBQUssQ0FBQyxDQUFDOzt5Q0FDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzs7O0FBQTVELDBCQUFrQjs7QUFDdEIsWUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO0FBQ3RCLGlCQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3Qjs7eUNBQ0ssSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7OztBQUM3QixrQkFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzs7QUFDbEMsWUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7QUFDaEMsZ0NBQUksS0FBSyx5Q0FBdUMsUUFBUSxDQUFHLENBQUM7QUFDNUQsb0JBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyw0QkFBMEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFHLENBQUM7U0FDNUU7QUFDRCxZQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUMvQixnQ0FBSSxLQUFLLHdDQUFzQyxPQUFPLENBQUcsQ0FBQztBQUMxRCxvQkFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLDJCQUF5QixPQUFPLENBQUMsV0FBVyxFQUFFLENBQUcsQ0FBQztTQUMxRTtBQUNHLGNBQU07O0FBQ1YsWUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQy9ELGdCQUFNLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDL0QsTUFBTSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtBQUN2QyxnQkFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQyxNQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQ3RDLGdCQUFNLEdBQUcsT0FBTyxDQUFDO1NBQ2xCO0FBQ0QsWUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7QUFDOUIsZ0NBQUksS0FBSyx1Q0FBcUMsTUFBTSxDQUFHLENBQUM7QUFDeEQsb0JBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTywwQkFBd0IsTUFBTSxDQUFHLENBQUM7U0FDMUQ7QUFDRCxZQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUMvQixpQkFBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0Isb0JBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0FBQ0QsOEJBQUksS0FBSyxnQkFBYSxrQkFBa0Isc0JBQWdCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUcsQ0FBQztBQUNsRixZQUFJLEdBQUcsNkJBQWUsa0JBQWtCLEVBQUUsVUFBVSxDQUFDOzt5Q0FDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OztBQUNuQixZQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUs7Ozs7OztBQUNwQywrQ0FBaUIsQ0FBQyxNQUFNLElBQUksTUFBTSxJQUFJLEVBQUUsQ0FBQSxDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGlIQUFFO2tCQUE5RCxJQUFJOztBQUNYLG9DQUFJLElBQUksbUJBQWlCLElBQUksQ0FBRyxDQUFDO2FBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7U0FDRixDQUFDLENBQUM7QUFDSCxZQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLElBQUksRUFBRSxNQUFNLEVBQUs7QUFDaEMsY0FBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ2Qsa0NBQUksYUFBYSxtQkFBaUIsT0FBTyx3QkFBbUIsSUFBSSxpQkFBWSxNQUFNLENBQUcsQ0FBQztXQUN2RjtTQUNGLENBQUMsQ0FBQzs7eUNBQ0cscUJBQU0sVUFBVSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixDQUFDOzs7O3lDQUNwRixJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDOzs7NENBQ3pDLElBQUk7Ozs7Ozs7Q0FDWixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCRixpQkFBaUIsQ0FBQyxhQUFhLEdBQUcsb0JBQUUsT0FBTyxDQUFDO01BRXBDLFVBQVUsRUFFVixLQUFLOzs7Ozs7eUNBRmUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7OztBQUEzQyxrQkFBVSxvQkFDWCxPQUFPLENBQUMscURBQXFELEVBQUUsSUFBSTtBQUNsRSxhQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7NENBQzFCO0FBQ0wsdUJBQWEsRUFBRSxVQUFVO0FBQ3pCLHNCQUFZLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQztBQUNwQyxlQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDN0IsZUFBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQzdCLGVBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxTQUFTO1NBQ3JEOzs7Ozs7QUFFRCw4QkFBSSxhQUFhLENBQUMsa0RBQStDLGVBQUUsT0FBTyw0QkFDMUMsQ0FBQyxlQUFFLE1BQU0sSUFBSSxFQUFFLENBQUEsQ0FBRSxJQUFJLEVBQUUsb0JBQWEsZUFBRSxJQUFJLFFBQUcsQ0FBQyxDQUFDOzs7Ozs7O0NBRWxGLENBQUMsQ0FBQzs7Ozs7Ozs7QUFRSCxpQkFBaUIsQ0FBQyxhQUFhLEdBQUcsb0JBQWdCLE9BQU87TUFDbkQsR0FBRyxFQUFFLE1BQU0sRUFLVCxrQkFBa0IsRUFNaEIsVUFBVSxFQUNaLFVBQVUsRUFhVixTQUFTOzs7O0FBekJYLFdBQUcsY0FBRSxNQUFNOzs7eUNBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzs7O0FBQTdDLFdBQUc7O3lDQUNZLHdCQUFLLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7QUFBeEMsY0FBTTs7Ozs7OztBQUVGLDBCQUFrQixHQUFHLElBQUksTUFBTSxDQUFDLDRCQUE0QixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFFLE1BQU0sQ0FBQzs7QUFDckYsWUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQ3ZCLGdDQUFJLGFBQWEsQ0FBQyxzREFBbUQsZUFBRSxPQUFPLDRCQUNoRCxDQUFDLGVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQSxDQUFFLElBQUksRUFBRSxvQkFBYSxlQUFFLElBQUksUUFBRyxDQUFDLENBQUM7U0FFOUU7O3lDQUN3QixrQ0FBb0I7OztBQUF2QyxrQkFBVTtBQUNaLGtCQUFVLEdBQUcsU0FBUzs7QUFDMUIsWUFBSSxVQUFVLEVBQUU7QUFDZCxjQUFJLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFO0FBQzFCLHNCQUFVLEdBQUcsWUFBWSxDQUFDO1dBQzNCO1NBQ0YsTUFBTTtBQUNMLGdDQUFJLElBQUksa0NBQStCLFVBQVUsOENBQTBDLENBQUM7U0FDN0Y7Ozt5Q0FFVyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDOzs7QUFBN0MsV0FBRzs7eUNBQ1ksd0JBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBQS9DLGNBQU07OztBQUVSLFlBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDckMsbUJBQVMsU0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOztBQUNqRSxnQ0FBSSxhQUFhLFlBQVMsT0FBTyw4RUFBdUUsU0FBUyxRQUFJLENBQUM7U0FDdkg7Ozs7Ozs7Q0FDRixDQUFDOzs7Ozs7OztBQVFGLGlCQUFpQixDQUFDLG9CQUFvQixHQUFHO01BQWdCLFNBQVMseURBQUcsS0FBSztNQUNwRSxLQUFLLEVBSUQsTUFBTTs7OztBQUpWLGFBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOztBQUN0Qiw4QkFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7O2NBQ3RDLEFBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBSSxTQUFTLENBQUE7Ozs7Ozs7eUNBRWhCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzs7O0FBQTNELGNBQU07O2NBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7eUNBTTlCLHFCQUFNLElBQUksQ0FBQzs7Ozs7OztBQUVuQiw4QkFBSSxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7Ozs7OztDQUN6QyxDQUFDOzs7Ozs7OztBQVFGLGlCQUFpQixDQUFDLGFBQWEsR0FBRztNQUFnQixxQkFBcUIseURBQUcsRUFBRTtNQUVwRSxPQUFPLEVBQ1AsT0FBTzs7Ozs7O0FBRmIsWUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO0FBQzdDLGVBQU8sR0FBRyxDQUFDO0FBQ1gsZUFBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRSxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUk7O3lDQUNuRSxxQkFBTSxPQUFPLEVBQUU7Ozs7OztpREFFWCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBQyxDQUFDOzs7O2lEQUMxQyxJQUFJLENBQUMsSUFBSSxFQUFFOzs7Ozs7Ozs7O2lEQUVYLElBQUksQ0FBQyxVQUFVLEVBQUU7Ozs7aURBQ2pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRTs7O0FBQ2hDLHNDQUFJLGFBQWEsQ0FBQyxvREFBaUQsZUFBRSxPQUFPLHdDQUM3QixDQUFDLENBQUM7Ozs7Ozs7U0FFcEQsQ0FBQzs7Ozs7OztDQUNILENBQUM7Ozs7Ozs7O0FBUUYsaUJBQWlCLENBQUMsTUFBTSxHQUFHO01BQWdCLE9BQU8seURBQUcsMEJBQTBCOzs7Ozs7Ozs7eUNBR25FLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7OztjQUV0QixlQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7Ozs7Ozs7Ozs7QUFLOUMsOEJBQUksS0FBSyxDQUFDLGlGQUFpRixDQUFDLENBQUM7O3lDQUN2RixJQUFJLENBQUMsSUFBSSxFQUFFOzs7O3lDQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozt5Q0FFdEIsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozt5Q0FDYixJQUFJLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDOzs7O3lDQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7eUNBQ3JCLDZCQUFjLE9BQU8sRUFBRSxJQUFJLEVBQUU7Y0FDN0IsTUFBTSxFQUtKLEdBQUc7Ozs7O2lEQUxVLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQzs7O0FBQTNELHNCQUFNOztzQkFDTixNQUFNLEtBQUssR0FBRyxDQUFBOzs7Ozs7OztBQUlaLG1CQUFHLEdBQUcscUNBQXFDOztBQUMvQyxzQ0FBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7c0JBQ1QsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDOzs7Ozs7O1NBRXZCLENBQUM7Ozs7O0FBRUYsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7OztDQUVqQixDQUFDOzs7Ozs7OztBQVFGLGlCQUFpQixDQUFDLElBQUksR0FBRzthQUVoQixNQUFNOzs7Ozs7O3lDQUFVLHdCQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7QUFBcEQsY0FBTSxTQUFOLE1BQU07O2NBR1AsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTs7Ozs7Y0FDdEQsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDOzs7NENBR3pCLElBQUk7Ozs7OztBQUVYLDhCQUFJLElBQUksbUNBQWdDLGVBQUksT0FBTyxvQkFBZ0IsQ0FBQzs0Q0FDN0QsS0FBSzs7Ozs7OztDQUVmLENBQUM7Ozs7Ozs7O0FBUUYsaUJBQWlCLENBQUMsTUFBTSxHQUFHOzs7Ozs7eUNBRWpCLHdCQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs0Q0FDckMsSUFBSTs7Ozs7O0FBRVgsOEJBQUksSUFBSSxxQ0FBa0MsZUFBSSxPQUFPLG9CQUFnQixDQUFDOzRDQUMvRCxLQUFLOzs7Ozs7O0NBRWYsQ0FBQzs7Ozs7Ozs7QUFRRixpQkFBaUIsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLFVBQVU7TUFDbkQsS0FBSzs7Ozs7eUNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7OztBQUFqQyxhQUFLOzRDQUNGLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7Ozs7OztDQUN4QixDQUFDOzs7Ozs7Ozs7OztBQVdGLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxvQkFBZ0IsVUFBVTtNQUFFLElBQUkseURBQUcsRUFBRTtNQUVwRCxJQUFJLEVBQ0osTUFBTSxFQUNOLEtBQUs7Ozs7O0FBRkwsWUFBSSxJQUFJLElBQUksNEJBQUssSUFBSSxJQUFFLFVBQVU7O3lDQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7O0FBQS9CLGNBQU07QUFDTixhQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7NENBQ3ZCLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO2lCQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUU7U0FBQSxDQUFDLENBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDZixNQUFNLENBQUMsVUFBQyxDQUFDO2lCQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQUEsQ0FBQzs7Ozs7O2NBRTlDLGVBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBOzs7Ozs7Ozs0Q0FHcEQsRUFBRTs7Ozs7OztDQUVaLENBQUM7Ozs7Ozs7OztBQVNGLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsVUFBVTtNQUUvQyxLQUFLLEVBS0wsS0FBSzs7Ozs7O3lDQUxTLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7OztBQUExQyxhQUFLOztjQUNMLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFBOzs7OztjQUNkLElBQUksS0FBSyw2QkFBNkI7OztBQUcxQyxhQUFLLEdBQUcsNkJBQTZCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Y0FDcEQsQ0FBQyxLQUFLLElBQUksb0JBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTs7Ozs7Y0FDckMsSUFBSSxLQUFLLCtDQUE0QyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQUk7Ozs0Q0FFbEUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Ozs7OztBQUU3Qiw4QkFBSSxhQUFhLG9DQUFpQyxVQUFVLFlBQU0sZUFBSSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUVwRixDQUFDOztxQkFFYSxpQkFBaUIiLCJmaWxlIjoibGliL3Rvb2xzL3N5c3RlbS1jYWxscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlci5qcyc7XHJcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcclxuaW1wb3J0IHsgc3lzdGVtLCBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IHsgZ2V0RGlyZWN0b3JpZXMsIGdldFNka1Rvb2xzVmVyc2lvbiB9IGZyb20gJy4uL2hlbHBlcnMnO1xyXG5pbXBvcnQgeyBleGVjLCBTdWJQcm9jZXNzIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcclxuaW1wb3J0IHsgc2xlZXAsIHJldHJ5LCByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcic7XHJcblxyXG5cclxubGV0IHN5c3RlbUNhbGxNZXRob2RzID0ge307XHJcblxyXG5jb25zdCBERUZBVUxUX0FEQl9FWEVDX1RJTUVPVVQgPSAyMDAwMDsgLy8gaW4gbWlsbGlzZWNvbmRzXHJcbmNvbnN0IERFRkFVTFRfQURCX1JFQk9PVF9SRVRSSUVTID0gOTA7XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgZnVsbCBwYXRoIHRvIHRoZSBnaXZlbiBiaW5hcnkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBiaW5hcnlOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGJpbmFyeS5cclxuICogQHJldHVybiB7c3RyaW5nfSBGdWxsIHBhdGggdG8gdGhlIGdpdmVuIGJpbmFyeSBpbmNsdWRpbmcgY3VycmVudCBTREsgcm9vdC5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmdldFNka0JpbmFyeVBhdGggPSBhc3luYyBmdW5jdGlvbiAoYmluYXJ5TmFtZSkge1xyXG4gIGxvZy5pbmZvKGBDaGVja2luZyB3aGV0aGVyICR7YmluYXJ5TmFtZX0gaXMgcHJlc2VudGApO1xyXG4gIGlmICh0aGlzLnNka1Jvb3QpIHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmdldEJpbmFyeUZyb21TZGtSb290KGJpbmFyeU5hbWUpO1xyXG4gIH1cclxuICBsb2cud2FybihgVGhlIEFORFJPSURfSE9NRSBlbnZpcm9ubWVudCB2YXJpYWJsZSBpcyBub3Qgc2V0IHRvIHRoZSBBbmRyb2lkIFNESyBgICtcclxuICAgICAgICAgICBgcm9vdCBkaXJlY3RvcnkgcGF0aC4gQU5EUk9JRF9IT01FIGlzIHJlcXVpcmVkIGZvciBjb21wYXRpYmlsaXR5IGAgK1xyXG4gICAgICAgICAgIGB3aXRoIFNESyAyMysuIENoZWNraW5nIGFsb25nIFBBVEggZm9yICR7YmluYXJ5TmFtZX0uYCk7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QmluYXJ5RnJvbVBhdGgoYmluYXJ5TmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIG5hbWUgb2YgdGhlIHRvb2wsXHJcbiAqIHdoaWNoIHByaW50cyBmdWxsIHBhdGggdG8gdGhlIGdpdmVuIGNvbW1hbmQgc2hvcnRjdXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gRGVwZW5kaW5nIG9uIHRoZSBjdXJyZW50IHBsYXRmb3JtIHRoaXMgaXNcclxuICogICAgICAgICAgICAgICAgICBzdXBwb3NlZCB0byBiZSBlaXRoZXIgJ3doaWNoJyBvciAnd2hlcmUnLlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0Q29tbWFuZEZvck9TID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBzeXN0ZW0uaXNXaW5kb3dzKCkgPyAnd2hlcmUnIDogJ3doaWNoJztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBmdWxsIGJpbmFyeSBuYW1lIGZvciB0aGUgY3VycmVudCBvcGVyYXRpbmcgc3lzdGVtLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYmluYXJ5TmFtZSAtIHNpbXBsZSBiaW5hcnkgbmFtZSwgZm9yIGV4YW1wbGUgJ2FuZHJvaWQnLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEZvcm1hdHRlZCBiaW5hcnkgbmFtZSBkZXBlbmRpbmcgb24gdGhlIGN1cnJlbnQgcGxhdGZvcm0sXHJcbiAqICAgICAgICAgICAgICAgICAgZm9yIGV4YW1wbGUsICdhbmRyb2lkLmJhdCcgb24gV2luZG93cy5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmdldEJpbmFyeU5hbWVGb3JPUyA9IGZ1bmN0aW9uIChiaW5hcnlOYW1lKSB7XHJcbiAgaWYgKCFzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcclxuICAgIHJldHVybiBiaW5hcnlOYW1lO1xyXG4gIH1cclxuXHJcbiAgaWYgKFsnYW5kcm9pZCcsICdhcGtzaWduZXInXS5pbmRleE9mKGJpbmFyeU5hbWUpID49IDAgJiZcclxuICAgICAgIWJpbmFyeU5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aCgnLmJhdCcpKSB7XHJcbiAgICByZXR1cm4gYCR7YmluYXJ5TmFtZX0uYmF0YDtcclxuICB9XHJcbiAgaWYgKCFiaW5hcnlOYW1lLnRvTG93ZXJDYXNlKCkuZW5kc1dpdGgoJy5leGUnKSkge1xyXG4gICAgcmV0dXJuIGAke2JpbmFyeU5hbWV9LmV4ZWA7XHJcbiAgfVxyXG4gIHJldHVybiBiaW5hcnlOYW1lO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGZ1bGwgcGF0aCB0byB0aGUgZ2l2ZW4gYmluYXJ5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYmluYXJ5TmFtZSAtIFNpbXBsZSBuYW1lIG9mIGEgYmluYXJ5IGZpbGUuXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gRnVsbCBwYXRoIHRvIHRoZSBnaXZlbiBiaW5hcnkuIFRoZSBtZXRob2QgdHJpZXNcclxuICogICAgICAgICAgICAgICAgICB0byBlbnVtZXJhdGUgYWxsIHRoZSBrbm93biBsb2NhdGlvbnMgd2hlcmUgdGhlIGJpbmFyeVxyXG4gKiAgICAgICAgICAgICAgICAgIG1pZ2h0IGJlIGxvY2F0ZWQgYW5kIHN0b3BzIHRoZSBzZWFyY2ggYXMgc29vbiBhcyB0aGUgZmlyc3RcclxuICogICAgICAgICAgICAgICAgICBtYXRjaCBpcyBmb3VuZCBvbiB0aGUgbG9jYWwgZmlsZSBzeXN0ZW0uXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgYmluYXJ5IHdpdGggZ2l2ZW4gbmFtZSBpcyBub3QgcHJlc2VudCBhdCBhbnlcclxuICogICAgICAgICAgICAgICAgIG9mIGtub3duIGxvY2F0aW9ucyBvciBBbmRyb2lkIFNESyBpcyBub3QgaW5zdGFsbGVkIG9uIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgbG9jYWwgZmlsZSBzeXN0ZW0uXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRCaW5hcnlGcm9tU2RrUm9vdCA9IF8ubWVtb2l6ZShhc3luYyBmdW5jdGlvbiAoYmluYXJ5TmFtZSkge1xyXG4gIGxldCBiaW5hcnlMb2MgPSBudWxsO1xyXG4gIGJpbmFyeU5hbWUgPSB0aGlzLmdldEJpbmFyeU5hbWVGb3JPUyhiaW5hcnlOYW1lKTtcclxuICBsZXQgYmluYXJ5TG9jcyA9IFtwYXRoLnJlc29sdmUodGhpcy5zZGtSb290LCBcInBsYXRmb3JtLXRvb2xzXCIsIGJpbmFyeU5hbWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGgucmVzb2x2ZSh0aGlzLnNka1Jvb3QsIFwiZW11bGF0b3JcIiwgYmluYXJ5TmFtZSksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5yZXNvbHZlKHRoaXMuc2RrUm9vdCwgXCJ0b29sc1wiLCBiaW5hcnlOYW1lKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLnJlc29sdmUodGhpcy5zZGtSb290LCBcInRvb2xzXCIsIFwiYmluXCIsIGJpbmFyeU5hbWUpXTtcclxuICAvLyBnZXQgc3VicGF0aHMgZm9yIGN1cnJlbnRseSBpbnN0YWxsZWQgYnVpbGQgdG9vbCBkaXJlY3Rvcmllc1xyXG4gIGxldCBidWlsZFRvb2xEaXJzID0gYXdhaXQgZ2V0RGlyZWN0b3JpZXMocGF0aC5yZXNvbHZlKHRoaXMuc2RrUm9vdCwgXCJidWlsZC10b29sc1wiKSk7XHJcbiAgLy8gdGhlIG5ld2VzdCB2ZXJzaW9uIGdvZXMgZmlyc3RcclxuICBidWlsZFRvb2xEaXJzLnNvcnQoc2VtdmVyLnJjb21wYXJlKTtcclxuICBmb3IgKGxldCB2ZXJzaW9uRGlyIG9mIGJ1aWxkVG9vbERpcnMpIHtcclxuICAgIGJpbmFyeUxvY3MucHVzaChwYXRoLnJlc29sdmUodGhpcy5zZGtSb290LCBcImJ1aWxkLXRvb2xzXCIsIHZlcnNpb25EaXIsIGJpbmFyeU5hbWUpKTtcclxuICB9XHJcbiAgZm9yIChsZXQgbG9jIG9mIGJpbmFyeUxvY3MpIHtcclxuICAgIGlmIChhd2FpdCBmcy5leGlzdHMobG9jKSkge1xyXG4gICAgICBiaW5hcnlMb2MgPSBsb2M7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoYmluYXJ5TG9jID09PSBudWxsKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kICR7YmluYXJ5TmFtZX0gaW4gJHtiaW5hcnlMb2NzfSwgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYG9yIHN1cHBvcnRlZCBidWlsZC10b29scyB1bmRlciAke3RoaXMuc2RrUm9vdH0gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYGRvIHlvdSBoYXZlIHRoZSBBbmRyb2lkIFNESyBpbnN0YWxsZWQgYXQgdGhpcyBsb2NhdGlvbj9gKTtcclxuICB9XHJcbiAgYmluYXJ5TG9jID0gYmluYXJ5TG9jLnRyaW0oKTtcclxuICBsb2cuaW5mbyhgVXNpbmcgJHtiaW5hcnlOYW1lfSBmcm9tICR7YmluYXJ5TG9jfWApO1xyXG4gIHJldHVybiBiaW5hcnlMb2M7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGZ1bGwgcGF0aCB0byBhIGJpbmFyeSBmaWxlIHVzaW5nIHRoZSBzdGFuZGFyZCBzeXN0ZW0gbG9va3VwIHRvb2wuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBiaW5hcnlOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGJpbmFyeS5cclxuICogQHJldHVybiB7c3RyaW5nfSBGdWxsIHBhdGggdG8gdGhlIGJpbmFyeSByZWNlaXZlZCBmcm9tICd3aGljaCcvJ3doZXJlJ1xyXG4gKiAgICAgICAgICAgICAgICAgIG91dHB1dC5cclxuICogQHRocm93cyB7RXJyb3J9IElmIGxvb2t1cCB0b29sIHJldHVybnMgbm9uLXplcm8gcmV0dXJuIGNvZGUuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRCaW5hcnlGcm9tUGF0aCA9IGFzeW5jIGZ1bmN0aW9uIChiaW5hcnlOYW1lKSB7XHJcbiAgbGV0IGJpbmFyeUxvYyA9IG51bGw7XHJcbiAgbGV0IGNtZCA9IHRoaXMuZ2V0Q29tbWFuZEZvck9TKCk7XHJcbiAgdHJ5IHtcclxuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoY21kLCBbYmluYXJ5TmFtZV0pO1xyXG4gICAgbG9nLmluZm8oYFVzaW5nICR7YmluYXJ5TmFtZX0gZnJvbSAke3N0ZG91dH1gKTtcclxuICAgIC8vIFRPRE8gd3JpdGUgYSB0ZXN0IGZvciBiaW5hcmllcyB3aXRoIHNwYWNlcy5cclxuICAgIGJpbmFyeUxvYyA9IHN0ZG91dC50cmltKCk7XHJcbiAgICByZXR1cm4gYmluYXJ5TG9jO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCAke2JpbmFyeU5hbWV9IFBsZWFzZSBzZXQgdGhlIEFORFJPSURfSE9NRSBgICtcclxuICAgICAgICAgICAgICBgZW52aXJvbm1lbnQgdmFyaWFibGUgd2l0aCB0aGUgQW5kcm9pZCBTREsgcm9vdCBkaXJlY3RvcnkgcGF0aC5gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQHR5cGVkZWYge09iamVjdH0gRGV2aWNlXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB1ZGlkIC0gVGhlIGRldmljZSB1ZGlkLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc3RhdGUgLSBDdXJyZW50IGRldmljZSBzdGF0ZSwgYXMgaXQgaXMgdmlzaWJsZSBpblxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYWRiIGRldmljZXMgLWxfIG91dHB1dC5cclxuICovXHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIGxpc3Qgb2YgZGV2aWNlcyB2aXNpYmxlIHRvIGFkYi5cclxuICpcclxuICogQHJldHVybiB7QXJyYXkuPERldmljZT59IFRoZSBsaXN0IG9mIGRldmljZXMgb3IgYW4gZW1wdHkgbGlzdCBpZlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgbm8gZGV2aWNlcyBhcmUgY29ubmVjdGVkLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGxpc3RpbmcgZGV2aWNlcy5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmdldENvbm5lY3RlZERldmljZXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbG9nLmRlYnVnKFwiR2V0dGluZyBjb25uZWN0ZWQgZGV2aWNlcy4uLlwiKTtcclxuICB0cnkge1xyXG4gICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmV4ZWN1dGFibGUucGF0aCwgdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLmNvbmNhdChbJ2RldmljZXMnXSkpO1xyXG4gICAgLy8gZXhwZWN0aW5nIGFkYiBkZXZpY2VzIHRvIHJldHVybiBvdXRwdXQgYXNcclxuICAgIC8vIExpc3Qgb2YgZGV2aWNlcyBhdHRhY2hlZFxyXG4gICAgLy8gZW11bGF0b3ItNTU1NFx0ZGV2aWNlXHJcbiAgICBsZXQgc3RhcnRpbmdJbmRleCA9IHN0ZG91dC5pbmRleE9mKFwiTGlzdCBvZiBkZXZpY2VzXCIpO1xyXG4gICAgaWYgKHN0YXJ0aW5nSW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBvdXRwdXQgd2hpbGUgdHJ5aW5nIHRvIGdldCBkZXZpY2VzLiBvdXRwdXQgd2FzOiAke3N0ZG91dH1gKTtcclxuICAgIH1cclxuICAgIC8vIHNsaWNpbmcgb3VwdXQgd2UgY2FyZSBhYm91dC5cclxuICAgIHN0ZG91dCA9IHN0ZG91dC5zbGljZShzdGFydGluZ0luZGV4KTtcclxuICAgIGxldCBkZXZpY2VzID0gW107XHJcbiAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdChcIlxcblwiKSkge1xyXG4gICAgICBpZiAobGluZS50cmltKCkgIT09IFwiXCIgJiZcclxuICAgICAgICAgIGxpbmUuaW5kZXhPZihcIkxpc3Qgb2YgZGV2aWNlc1wiKSA9PT0gLTEgJiZcclxuICAgICAgICAgIGxpbmUuaW5kZXhPZihcImFkYiBzZXJ2ZXJcIikgPT09IC0xICYmXHJcbiAgICAgICAgICBsaW5lLmluZGV4T2YoXCIqIGRhZW1vblwiKSA9PT0gLTEgJiZcclxuICAgICAgICAgIGxpbmUuaW5kZXhPZihcIm9mZmxpbmVcIikgPT09IC0xKSB7XHJcbiAgICAgICAgbGV0IGxpbmVJbmZvID0gbGluZS5zcGxpdChcIlxcdFwiKTtcclxuICAgICAgICAvLyBzdGF0ZSBpcyBlaXRoZXIgXCJkZXZpY2VcIiBvciBcIm9mZmxpbmVcIiwgYWZhaWN0XHJcbiAgICAgICAgZGV2aWNlcy5wdXNoKHt1ZGlkOiBsaW5lSW5mb1swXSwgc3RhdGU6IGxpbmVJbmZvWzFdfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxvZy5kZWJ1ZyhgJHtkZXZpY2VzLmxlbmd0aH0gZGV2aWNlKHMpIGNvbm5lY3RlZGApO1xyXG4gICAgcmV0dXJuIGRldmljZXM7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIHdoaWxlIGdldHRpbmcgY29ubmVjdGVkIGRldmljZXMuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIGxpc3Qgb2YgZGV2aWNlcyB2aXNpYmxlIHRvIGFkYiB3aXRoaW4gdGhlIGdpdmVuIHRpbWVvdXQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0TXMgLSBUaGUgbWF4aW11bSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGdldCBhdCBsZWFzdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25lIGxpc3QgaXRlbS5cclxuICogQHJldHVybiB7QXJyYXkuPERldmljZT59IFRoZSBsaXN0IG9mIGNvbm5lY3RlZCBkZXZpY2VzLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgbm8gY29ubmVjdGVkIGRldmljZXMgY2FuIGJlIGRldGVjdGVkIHdpdGhpbiB0aGUgZ2l2ZW4gdGltZW91dC5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmdldERldmljZXNXaXRoUmV0cnkgPSBhc3luYyBmdW5jdGlvbiAodGltZW91dE1zID0gMjAwMDApIHtcclxuICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xyXG4gIGxvZy5kZWJ1ZyhcIlRyeWluZyB0byBmaW5kIGEgY29ubmVjdGVkIGFuZHJvaWQgZGV2aWNlXCIpO1xyXG4gIGxldCBnZXREZXZpY2VzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKChEYXRlLm5vdygpIC0gc3RhcnQpID4gdGltZW91dE1zKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGEgY29ubmVjdGVkIEFuZHJvaWQgZGV2aWNlLlwiKTtcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBkZXZpY2VzID0gYXdhaXQgdGhpcy5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XHJcbiAgICAgIGlmIChkZXZpY2VzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICBsb2cuZGVidWcoXCJDb3VsZCBub3QgZmluZCBkZXZpY2VzLCByZXN0YXJ0aW5nIGFkYiBzZXJ2ZXIuLi5cIik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5yZXN0YXJ0QWRiKCk7XHJcbiAgICAgICAgLy8gY29vbCBkb3duXHJcbiAgICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0RGV2aWNlcygpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBkZXZpY2VzO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBsb2cuZGVidWcoXCJDb3VsZCBub3QgZmluZCBkZXZpY2VzLCByZXN0YXJ0aW5nIGFkYiBzZXJ2ZXIuLi5cIik7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzdGFydEFkYigpO1xyXG4gICAgICAvLyBjb29sIGRvd25cclxuICAgICAgYXdhaXQgc2xlZXAoMjAwKTtcclxuICAgICAgcmV0dXJuIGF3YWl0IGdldERldmljZXMoKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiBhd2FpdCBnZXREZXZpY2VzKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzdGFydCBhZGIgc2VydmVyIGlmIF90aGlzLnN1cHByZXNzS2lsbFNlcnZlcl8gcHJvcGVydHkgaXMgdHJ1ZS5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLnJlc3RhcnRBZGIgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuc3VwcHJlc3NLaWxsU2VydmVyKSB7XHJcbiAgICBsb2cuZGVidWcoYE5vdCByZXN0YXJ0aW5nIGFiZCBzaW5jZSAnc3VwcHJlc3NLaWxsU2VydmVyJyBpcyBvbmApO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbG9nLmRlYnVnKCdSZXN0YXJ0aW5nIGFkYicpO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCB0aGlzLmtpbGxTZXJ2ZXIoKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3IoXCJFcnJvciBraWxsaW5nIEFEQiBzZXJ2ZXIsIGdvaW5nIHRvIHNlZSBpZiBpdCdzIG9ubGluZSBhbnl3YXlcIik7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEtpbGwgYWRiIHNlcnZlci5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmtpbGxTZXJ2ZXIgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbG9nLmRlYnVnKGBLaWxsaW5nIGFkYiBzZXJ2ZXIgb24gcG9ydCAke3RoaXMuYWRiUG9ydH1gKTtcclxuICBhd2FpdCBleGVjKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCBbLi4udGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLCAna2lsbC1zZXJ2ZXInXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzZXQgVGVsbmV0IGF1dGhlbnRpY2F0aW9uIHRva2VuLlxyXG4gKiBAc2VlIHtAbGluayBodHRwOi8vdG9vbHMuYW5kcm9pZC5jb20vcmVjZW50L2VtdWxhdG9yMjUxNnJlbGVhc2Vub3Rlc30gZm9yIG1vcmUgZGV0YWlscy5cclxuICpcclxuICogQHJldHVybnMge2Jvb2xlYW59IElmIHRva2VuIHJlc2V0IHdhcyBzdWNjZXNzZnVsLlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMucmVzZXRUZWxuZXRBdXRoVG9rZW4gPSBfLm1lbW9pemUoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIC8vIFRoZSBtZXRob2RzIGlzIHVzZWQgdG8gcmVtb3ZlIHRlbG5ldCBhdXRoIHRva2VuXHJcbiAgLy9cclxuICBjb25zdCBob21lRm9sZGVyUGF0aCA9IHByb2Nlc3MuZW52Wyhwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSA/ICdVU0VSUFJPRklMRScgOiAnSE9NRSddO1xyXG4gIGlmICghaG9tZUZvbGRlclBhdGgpIHtcclxuICAgIGxvZy53YXJuKCdDYW5ub3QgZmluZCB0aGUgcGF0aCB0byB1c2VyIGhvbWUgZm9sZGVyLiBJZ25vcmluZyByZXNldHRpbmcgb2YgZW11bGF0b3JcXCdzIHRlbG5ldCBhdXRoZW50aWNhdGlvbiB0b2tlbicpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBjb25zdCBkc3RQYXRoID0gcGF0aC5yZXNvbHZlKGhvbWVGb2xkZXJQYXRoLCAnLmVtdWxhdG9yX2NvbnNvbGVfYXV0aF90b2tlbicpO1xyXG4gIGxvZy5kZWJ1ZyhgT3ZlcnJpZGluZyAke2RzdFBhdGh9IHdpdGggYW4gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHRlbG5ldCBhdXRoZW50aWNhdGlvbiBmb3IgZW11bGF0b3IgY29tbWFuZHNgKTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgZnMud3JpdGVGaWxlKGRzdFBhdGgsICcnKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cud2FybihgRXJyb3IgJHtlLm1lc3NhZ2V9IHdoaWxlIHJlc2V0dGluZyB0aGUgY29udGVudCBvZiAke2RzdFBhdGh9LiBJZ25vcmluZyByZXNldHRpbmcgb2YgZW11bGF0b3JcXCdzIHRlbG5ldCBhdXRoZW50aWNhdGlvbiB0b2tlbmApO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSB0aGUgZ2l2ZW4gZW11bGF0b3IgY29tbWFuZCB1c2luZyBfYWRiIGVtdV8gdG9vbC5cclxuICpcclxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gY21kIC0gVGhlIGFycmF5IG9mIHJlc3QgY29tbWFuZCBsaW5lIHBhcmFtZXRlcnMuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5hZGJFeGVjRW11ID0gYXN5bmMgZnVuY3Rpb24gKGNtZCkge1xyXG4gIGF3YWl0IHRoaXMudmVyaWZ5RW11bGF0b3JDb25uZWN0ZWQoKTtcclxuICBhd2FpdCB0aGlzLnJlc2V0VGVsbmV0QXV0aFRva2VuKCk7XHJcbiAgYXdhaXQgdGhpcy5hZGJFeGVjKFsnZW11JywgLi4uY21kXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSB0aGUgZ2l2ZW4gYWRiIGNvbW1hbmQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGNtZCAtIFRoZSBhcnJheSBvZiByZXN0IGNvbW1hbmQgbGluZSBwYXJhbWV0ZXJzXHJcbiAqICAgICAgICAgICAgICAgICAgICAgIG9yIGEgc2luZ2xlIHN0cmluZyBwYXJhbWV0ZXIuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gQWRkaXRpb25hbCBvcHRpb25zIG1hcHBpbmcuIFNlZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vYXBwaXVtL25vZGUtdGVlbl9wcm9jZXNzfVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGZvciBtb3JlIGRldGFpbHMuXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gLSBDb21tYW5kJ3Mgc3Rkb3V0LlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGNvbW1hbmQgcmV0dXJuZWQgbm9uLXplcm8gZXhpdCBjb2RlLlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMuYWRiRXhlYyA9IGFzeW5jIGZ1bmN0aW9uIChjbWQsIG9wdHMgPSB7fSkge1xyXG4gIGlmICghY21kKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJZb3UgbmVlZCB0byBwYXNzIGluIGEgY29tbWFuZCB0byBhZGJFeGVjKClcIik7XHJcbiAgfVxyXG4gIC8vIHNldHRpbmcgZGVmYXVsdCB0aW1lb3V0IGZvciBlYWNoIGNvbW1hbmQgdG8gcHJldmVudCBpbmZpbml0ZSB3YWl0LlxyXG4gIG9wdHMudGltZW91dCA9IG9wdHMudGltZW91dCB8fCBERUZBVUxUX0FEQl9FWEVDX1RJTUVPVVQ7XHJcbiAgbGV0IGV4ZWNGdW5jID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGxpbmtlcldhcm5pbmdSZSA9IC9eV0FSTklORzogbGlua2VyLiskL207XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoIShjbWQgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgICBjbWQgPSBbY21kXTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgYXJncyA9IHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5jb25jYXQoY21kKTtcclxuICAgICAgbG9nLmRlYnVnKGBSdW5uaW5nICcke3RoaXMuZXhlY3V0YWJsZS5wYXRofScgd2l0aCBhcmdzOiBgICtcclxuICAgICAgICAgICAgICAgIGAke0pTT04uc3RyaW5naWZ5KGFyZ3MpfWApO1xyXG4gICAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCBhcmdzLCBvcHRzKTtcclxuICAgICAgLy8gc29tZXRpbWVzIEFEQiBwcmludHMgb3V0IHdlaXJkIHN0ZG91dCB3YXJuaW5ncyB0aGF0IHdlIGRvbid0IHdhbnRcclxuICAgICAgLy8gdG8gaW5jbHVkZSBpbiBhbnkgb2YgdGhlIHJlc3BvbnNlIGRhdGEsIHNvIGxldCdzIHN0cmlwIGl0IG91dFxyXG4gICAgICBzdGRvdXQgPSBzdGRvdXQucmVwbGFjZShsaW5rZXJXYXJuaW5nUmUsICcnKS50cmltKCk7XHJcbiAgICAgIHJldHVybiBzdGRvdXQ7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGxldCBwcm90b2NvbEZhdWx0RXJyb3IgPSBuZXcgUmVnRXhwKFwicHJvdG9jb2wgZmF1bHQgXFxcXChubyBzdGF0dXNcXFxcKVwiLCBcImlcIikudGVzdChlKTtcclxuICAgICAgbGV0IGRldmljZU5vdEZvdW5kRXJyb3IgPSBuZXcgUmVnRXhwKFwiZXJyb3I6IGRldmljZSAoJy4rJyApP25vdCBmb3VuZFwiLCBcImlcIikudGVzdChlKTtcclxuICAgICAgaWYgKHByb3RvY29sRmF1bHRFcnJvciB8fCBkZXZpY2VOb3RGb3VuZEVycm9yKSB7XHJcbiAgICAgICAgbG9nLmluZm8oYEVycm9yIHNlbmRpbmcgY29tbWFuZCwgcmVjb25uZWN0aW5nIGRldmljZSBhbmQgcmV0cnlpbmc6ICR7Y21kfWApO1xyXG4gICAgICAgIGF3YWl0IHNsZWVwKDEwMDApO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0RGV2aWNlc1dpdGhSZXRyeSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZS5jb2RlID09PSAwICYmIGUuc3Rkb3V0KSB7XHJcbiAgICAgICAgbGV0IHN0ZG91dCA9IGUuc3Rkb3V0O1xyXG4gICAgICAgIHN0ZG91dCA9IHN0ZG91dC5yZXBsYWNlKGxpbmtlcldhcm5pbmdSZSwgJycpLnRyaW0oKTtcclxuICAgICAgICByZXR1cm4gc3Rkb3V0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIGV4ZWN1dGluZyBhZGJFeGVjLiBPcmlnaW5hbCBlcnJvcjogJyR7ZS5tZXNzYWdlfSc7IGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgU3RkZXJyOiAnJHsoZS5zdGRlcnIgfHwgJycpLnRyaW0oKX0nOyBDb2RlOiAnJHtlLmNvZGV9J2ApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIGF3YWl0IHJldHJ5KDIsIGV4ZWNGdW5jKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIHRoZSBnaXZlbiBjb21tYW5kIHVzaW5nIF9hZGIgc2hlbGxfIHByZWZpeC5cclxuICpcclxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPnxzdHJpbmd9IGNtZCAtIFRoZSBhcnJheSBvZiByZXN0IGNvbW1hbmQgbGluZSBwYXJhbWV0ZXJzIG9yIGEgc2luZ2xlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmcgcGFyYW1ldGVyLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIEFkZGl0aW9uYWwgb3B0aW9ucyBtYXBwaW5nLiBTZWVcclxuICogICAgICAgICAgICAgICAgICAgICAgICB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2FwcGl1bS9ub2RlLXRlZW5fcHJvY2Vzc31cclxuICogICAgICAgICAgICAgICAgICAgICAgICBmb3IgbW9yZSBkZXRhaWxzLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gQ29tbWFuZCdzIHN0ZG91dC5cclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBjb21tYW5kIHJldHVybmVkIG5vbi16ZXJvIGV4aXQgY29kZS5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLnNoZWxsID0gYXN5bmMgZnVuY3Rpb24gKGNtZCwgb3B0cyA9IHt9KSB7XHJcbiAgaWYgKCFhd2FpdCB0aGlzLmlzRGV2aWNlQ29ubmVjdGVkKCkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgTm8gZGV2aWNlIGNvbm5lY3RlZCwgY2Fubm90IHJ1biBhZGIgc2hlbGwgY29tbWFuZCAnJHtjbWQuam9pbignICcpfSdgKTtcclxuICB9XHJcbiAgbGV0IGV4ZWNDbWQgPSBbJ3NoZWxsJ107XHJcbiAgaWYgKGNtZCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICBleGVjQ21kID0gZXhlY0NtZC5jb25jYXQoY21kKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZXhlY0NtZC5wdXNoKGNtZCk7XHJcbiAgfVxyXG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYkV4ZWMoZXhlY0NtZCwgb3B0cyk7XHJcbn07XHJcblxyXG5zeXN0ZW1DYWxsTWV0aG9kcy5jcmVhdGVTdWJQcm9jZXNzID0gZnVuY3Rpb24gKGFyZ3MgPSBbXSkge1xyXG4gIC8vIGFkZCB0aGUgZGVmYXVsdCBhcmd1bWVudHNcclxuICBhcmdzID0gdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLmNvbmNhdChhcmdzKTtcclxuICBsb2cuZGVidWcoYENyZWF0aW5nIEFEQiBzdWJwcm9jZXNzIHdpdGggYXJnczogJHtKU09OLnN0cmluZ2lmeShhcmdzKX1gKTtcclxuICByZXR1cm4gbmV3IFN1YlByb2Nlc3ModGhpcy5nZXRBZGJQYXRoKCksIGFyZ3MpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBjdXJyZW50IGFkYiBwb3J0LlxyXG4gKiBAdG9kbyBjYW4gcHJvYmFibHkgZGVwcmVjYXRlIHRoaXMgbm93IHRoYXQgdGhlIGxvZ2ljIGlzIGp1c3QgdG8gcmVhZCB0aGlzLmFkYlBvcnRcclxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgY3VycmVudCBhZGIgcG9ydCBudW1iZXIuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRBZGJTZXJ2ZXJQb3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiB0aGlzLmFkYlBvcnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIGN1cnJlbnQgZW11bGF0b3IgcG9ydCBmcm9tIF9hZGIgZGV2aXZlc18gb3V0cHV0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBjdXJyZW50IGVtdWxhdG9yIHBvcnQuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGVyZSBhcmUgbm8gY29ubmVjdGVkIGRldmljZXMuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5nZXRFbXVsYXRvclBvcnQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbG9nLmRlYnVnKFwiR2V0dGluZyBydW5uaW5nIGVtdWxhdG9yIHBvcnRcIik7XHJcbiAgaWYgKHRoaXMuZW11bGF0b3JQb3J0ICE9PSBudWxsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbXVsYXRvclBvcnQ7XHJcbiAgfVxyXG4gIHRyeSB7XHJcbiAgICBsZXQgZGV2aWNlcyA9IGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRGV2aWNlcygpO1xyXG4gICAgbGV0IHBvcnQgPSB0aGlzLmdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmcoZGV2aWNlc1swXS51ZGlkKTtcclxuICAgIGlmIChwb3J0KSB7XHJcbiAgICAgIHJldHVybiBwb3J0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFbXVsYXRvciBwb3J0IG5vdCBmb3VuZGApO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBObyBkZXZpY2VzIGNvbm5lY3RlZC4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSB0aGUgY3VycmVudCBlbXVsYXRvciBwb3J0IGJ5IHBhcnNpbmcgZW11bGF0b3IgbmFtZSBzdHJpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbVN0ciAtIEVtdWxhdG9yIG5hbWUgc3RyaW5nLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ8Ym9vbGVhbn0gRWl0aGVyIHRoZSBjdXJyZW50IGVtdWxhdG9yIHBvcnQgb3JcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgIF9mYWxzZV8gaWYgcG9ydCBudW1iZXIgY2Fubm90IGJlIHBhcnNlZC5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmcgPSBmdW5jdGlvbiAoZW1TdHIpIHtcclxuICBsZXQgcG9ydFBhdHRlcm4gPSAvZW11bGF0b3ItKFxcZCspLztcclxuICBpZiAocG9ydFBhdHRlcm4udGVzdChlbVN0cikpIHtcclxuICAgIHJldHVybiBwYXJzZUludChwb3J0UGF0dGVybi5leGVjKGVtU3RyKVsxXSwgMTApO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIGxpc3Qgb2YgY3VycmVudGx5IGNvbm5lY3RlZCBlbXVsYXRvcnMuXHJcbiAqXHJcbiAqIEByZXR1cm4ge0FycmF5LjxEZXZpY2U+fSBUaGUgbGlzdCBvZiBjb25uZWN0ZWQgZGV2aWNlcy5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmdldENvbm5lY3RlZEVtdWxhdG9ycyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICB0cnkge1xyXG4gICAgbG9nLmRlYnVnKFwiR2V0dGluZyBjb25uZWN0ZWQgZW11bGF0b3JzXCIpO1xyXG4gICAgbGV0IGRldmljZXMgPSBhd2FpdCB0aGlzLmdldENvbm5lY3RlZERldmljZXMoKTtcclxuICAgIGxldCBlbXVsYXRvcnMgPSBbXTtcclxuICAgIGZvciAobGV0IGRldmljZSBvZiBkZXZpY2VzKSB7XHJcbiAgICAgIGxldCBwb3J0ID0gdGhpcy5nZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nKGRldmljZS51ZGlkKTtcclxuICAgICAgaWYgKHBvcnQpIHtcclxuICAgICAgICBkZXZpY2UucG9ydCA9IHBvcnQ7XHJcbiAgICAgICAgZW11bGF0b3JzLnB1c2goZGV2aWNlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbG9nLmRlYnVnKGAke2VtdWxhdG9ycy5sZW5ndGh9IGVtdWxhdG9yKHMpIGNvbm5lY3RlZGApO1xyXG4gICAgcmV0dXJuIGVtdWxhdG9ycztcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZ2V0dGluZyBlbXVsYXRvcnMuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IF9lbXVsYXRvclBvcnRfIHByb3BlcnR5IG9mIHRoZSBjdXJyZW50IGNsYXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZW1Qb3J0IC0gVGhlIGVtdWxhdG9yIHBvcnQgdG8gYmUgc2V0LlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMuc2V0RW11bGF0b3JQb3J0ID0gZnVuY3Rpb24gKGVtUG9ydCkge1xyXG4gIHRoaXMuZW11bGF0b3JQb3J0ID0gZW1Qb3J0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgaWRlbnRpZmllciBvZiB0aGUgY3VycmVudCBkZXZpY2UgKF90aGlzLmN1ckRldmljZUlkXykuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSAtIFRoZSBkZXZpY2UgaWRlbnRpZmllci5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLnNldERldmljZUlkID0gZnVuY3Rpb24gKGRldmljZUlkKSB7XHJcbiAgbG9nLmRlYnVnKGBTZXR0aW5nIGRldmljZSBpZCB0byAke2RldmljZUlkfWApO1xyXG4gIHRoaXMuY3VyRGV2aWNlSWQgPSBkZXZpY2VJZDtcclxuICBsZXQgYXJnc0hhc0RldmljZSA9IHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJncy5pbmRleE9mKCctcycpO1xyXG4gIGlmIChhcmdzSGFzRGV2aWNlICE9PSAtMSkge1xyXG4gICAgLy8gcmVtb3ZlIHRoZSBvbGQgZGV2aWNlIGlkIGZyb20gdGhlIGFyZ3VtZW50c1xyXG4gICAgdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLnNwbGljZShhcmdzSGFzRGV2aWNlLCAyKTtcclxuICB9XHJcbiAgdGhpcy5leGVjdXRhYmxlLmRlZmF1bHRBcmdzLnB1c2goJy1zJywgZGV2aWNlSWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdGhlIGN1cnJlbnQgZGV2aWNlIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtEZXZpY2V9IGRldmljZU9iaiAtIFRoZSBkZXZpY2Ugb2JqZWN0IHRvIGJlIHNldC5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLnNldERldmljZSA9IGZ1bmN0aW9uIChkZXZpY2VPYmopIHtcclxuICBsZXQgZGV2aWNlSWQgPSBkZXZpY2VPYmoudWRpZDtcclxuICBsZXQgZW1Qb3J0ID0gdGhpcy5nZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nKGRldmljZUlkKTtcclxuICB0aGlzLnNldEVtdWxhdG9yUG9ydChlbVBvcnQpO1xyXG4gIHRoaXMuc2V0RGV2aWNlSWQoZGV2aWNlSWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgb2JqZWN0IGZvciB0aGUgY3VycmVudGx5IHJ1bm5pbmcgZW11bGF0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdmROYW1lIC0gRW11bGF0b3IgbmFtZS5cclxuICogQHJldHVybiB7P0RldmljZX0gQ3VycmVudGx5IHJ1bm5pbmcgZW11bGF0b3Igb3IgX251bGxfLlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0UnVubmluZ0FWRCA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lKSB7XHJcbiAgdHJ5IHtcclxuICAgIGxvZy5kZWJ1ZyhgVHJ5aW5nIHRvIGZpbmQgJHthdmROYW1lfSBlbXVsYXRvcmApO1xyXG4gICAgbGV0IGVtdWxhdG9ycyA9IGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRW11bGF0b3JzKCk7XHJcbiAgICBmb3IgKGxldCBlbXVsYXRvciBvZiBlbXVsYXRvcnMpIHtcclxuICAgICAgdGhpcy5zZXRFbXVsYXRvclBvcnQoZW11bGF0b3IucG9ydCk7XHJcbiAgICAgIGxldCBydW5uaW5nQVZETmFtZSA9IGF3YWl0IHRoaXMuc2VuZFRlbG5ldENvbW1hbmQoXCJhdmQgbmFtZVwiKTtcclxuICAgICAgaWYgKGF2ZE5hbWUgPT09IHJ1bm5pbmdBVkROYW1lKSB7XHJcbiAgICAgICAgbG9nLmRlYnVnKGBGb3VuZCBlbXVsYXRvciAke2F2ZE5hbWV9IGluIHBvcnQgJHtlbXVsYXRvci5wb3J0fWApO1xyXG4gICAgICAgIHRoaXMuc2V0RGV2aWNlSWQoZW11bGF0b3IudWRpZCk7XHJcbiAgICAgICAgcmV0dXJuIGVtdWxhdG9yO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsb2cuZGVidWcoYEVtdWxhdG9yICR7YXZkTmFtZX0gbm90IHJ1bm5pbmdgKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBnZXR0aW5nIEFWRC4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG9iamVjdCBmb3IgdGhlIGN1cnJlbnRseSBydW5uaW5nIGVtdWxhdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXZkTmFtZSAtIEVtdWxhdG9yIG5hbWUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0TXMgWzIwMDAwXSAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBtaWxsaXNlY29uZHNcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gd2FpdCB1bnRpbCBhdCBsZWFzdCBvbmUgcnVubmluZyBBVkQgb2JqZWN0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIGRldGVjdGVkLlxyXG4gKiBAcmV0dXJuIHs/RGV2aWNlfSBDdXJyZW50bHkgcnVubmluZyBlbXVsYXRvciBvciBfbnVsbF8uXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBubyBkZXZpY2UgaGFzIGJlZW4gZGV0ZWN0ZWQgd2l0aGluIHRoZSB0aW1lb3V0LlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMuZ2V0UnVubmluZ0FWRFdpdGhSZXRyeSA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lLCB0aW1lb3V0TXMgPSAyMDAwMCkge1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xyXG4gICAgd2hpbGUgKChEYXRlLm5vdygpIC0gc3RhcnQpIDwgdGltZW91dE1zKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHJ1bm5pbmdBVkQgPSBhd2FpdCB0aGlzLmdldFJ1bm5pbmdBVkQoYXZkTmFtZS5yZXBsYWNlKCdAJywgJycpKTtcclxuICAgICAgICBpZiAocnVubmluZ0FWRCkge1xyXG4gICAgICAgICAgcmV0dXJuIHJ1bm5pbmdBVkQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gRG8gbm90aGluZy5cclxuICAgICAgICBsb2cuaW5mbyhgQ291bGRuJ3QgZ2V0IHJ1bm5pbmcgQVZELCB3aWxsIHJldHJ5LiBFcnJvciB3YXM6ICR7ZS5tZXNzYWdlfWApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvb2wgZG93blxyXG4gICAgICBhd2FpdCBzbGVlcCgyMDApO1xyXG4gICAgfVxyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBmaW5kICR7YXZkTmFtZX0gZW11bGF0b3IuYCk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgQVZEIHdpdGggcmV0cnkuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2h1dGRvd24gYWxsIHJ1bm5pbmcgZW11bGF0b3JzIGJ5IGtpbGxpbmcgdGhlaXIgcHJvY2Vzc2VzLlxyXG4gKlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYga2lsbGluZyB0b29sIHJldHVybmVkIG5vbi16ZXJvIHJldHVybiBjb2RlLlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMua2lsbEFsbEVtdWxhdG9ycyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgY21kLCBhcmdzO1xyXG4gIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcclxuICAgIGNtZCA9ICdUQVNLS0lMTCc7XHJcbiAgICBhcmdzID0gWydUQVNLS0lMTCcsICcvSU0nLCAnZW11bGF0b3IuZXhlJ107XHJcbiAgfSBlbHNlIHtcclxuICAgIGNtZCA9ICcvdXNyL2Jpbi9raWxsYWxsJztcclxuICAgIGFyZ3MgPSBbJy1tJywgJ2VtdWxhdG9yKiddO1xyXG4gIH1cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXhlYyhjbWQsIGFyZ3MpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBraWxsaW5nIGVtdWxhdG9ycy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBLaWxsIGVtdWxhdG9yIHdpdGggdGhlIGdpdmVuIG5hbWUuIE5vIGVycm9yXHJcbiAqIGlzIHRocm93biBpcyBnaXZlbiBhdmQgZG9lcyBub3QgZXhpc3QvaXMgbm90IHJ1bm5pbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdmROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGVtdWxhdG9yIHRvIGJlIGtpbGxlZC5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmtpbGxFbXVsYXRvciA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lKSB7XHJcbiAgbG9nLmRlYnVnKGBraWxsaW5nIGF2ZCAnJHthdmROYW1lfSdgKTtcclxuICBsZXQgZGV2aWNlID0gYXdhaXQgdGhpcy5nZXRSdW5uaW5nQVZEKGF2ZE5hbWUpO1xyXG4gIGlmIChkZXZpY2UpIHtcclxuICAgIGF3YWl0IHRoaXMuYWRiRXhlYyhbJ2VtdScsICdraWxsJ10pO1xyXG4gICAgbG9nLmluZm8oYHN1Y2Nlc3NmdWxseSBraWxsZWQgZW11bGF0b3IgJyR7YXZkTmFtZX0nYCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxvZy5pbmZvKGBubyBhdmQgd2l0aCBuYW1lICcke2F2ZE5hbWV9JyBydW5uaW5nLiBza2lwcGluZyBraWxsIHN0ZXAuYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0YXJ0IGFuIGVtdWxhdG9yIHdpdGggZ2l2ZW4gcGFyYW1ldGVycyBhbmQgd2FpdCB1bnRpbCBpdCBpcyBmdWxsIHN0YXJlZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGF2ZE5hbWUgLSBUaGUgbmFtZSBvZiBhbiBleGlzdGluZyBlbXVsYXRvci5cclxuICogQHBhcmFtIHtBcnJheS48c3RyaW5nPnxzdHJpbmd9IGF2ZEFyZ3MgLSBBZGRpdGlvbmFsIGVtdWxhdG9yIGNvbW1hbmQgbGluZSBhcmd1bWVudC5cclxuICogQHBhcmFtIHs/c3RyaW5nfSBsYW5ndWFnZSAtIEVtdWxhdG9yIHN5c3RlbSBsYW5ndWFnZS5cclxuICogQHBhcmFtIHs/Y29udHJ5fSBjb3VudHJ5IC0gRW11bGF0b3Igc3lzdGVtIGNvdW50cnkuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhdmRMYXVuY2hUaW1lb3V0IFs2MDAwMF0gLSBFbXVsYXRvciBzdGFydHVwIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gcmV0cnlUaW1lcyBbMV0gLSBUaGUgbWF4aW11bSBudW1iZXIgb2Ygc3RhcnR1cCByZXRyaWVzLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIGVtdWxhdG9yIGZhaWxzIHRvIHN0YXJ0IHdpdGhpbiB0aGUgZ2l2ZW4gdGltZW91dC5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmxhdW5jaEFWRCA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lLCBhdmRBcmdzLCBsYW5ndWFnZSwgY291bnRyeSxcclxuICBhdmRMYXVuY2hUaW1lb3V0ID0gNjAwMDAsIGF2ZFJlYWR5VGltZW91dCA9IDYwMDAwLCByZXRyeVRpbWVzID0gMSkge1xyXG4gIGxvZy5kZWJ1ZyhgTGF1bmNoaW5nIEVtdWxhdG9yIHdpdGggQVZEICR7YXZkTmFtZX0sIGxhdW5jaFRpbWVvdXRgICtcclxuICAgICAgICAgICAgYCR7YXZkTGF1bmNoVGltZW91dH0gbXMgYW5kIHJlYWR5VGltZW91dCAke2F2ZFJlYWR5VGltZW91dH0gbXNgKTtcclxuICBsZXQgZW11bGF0b3JCaW5hcnlQYXRoID0gYXdhaXQgdGhpcy5nZXRTZGtCaW5hcnlQYXRoKFwiZW11bGF0b3JcIik7XHJcbiAgaWYgKGF2ZE5hbWVbMF0gPT09IFwiQFwiKSB7XHJcbiAgICBhdmROYW1lID0gYXZkTmFtZS5zdWJzdHIoMSk7XHJcbiAgfVxyXG4gIGF3YWl0IHRoaXMuY2hlY2tBdmRFeGlzdChhdmROYW1lKTtcclxuICBsZXQgbGF1bmNoQXJncyA9IFtcIi1hdmRcIiwgYXZkTmFtZV07XHJcbiAgaWYgKHR5cGVvZiBsYW5ndWFnZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgbG9nLmRlYnVnKGBTZXR0aW5nIEFuZHJvaWQgRGV2aWNlIExhbmd1YWdlIHRvICR7bGFuZ3VhZ2V9YCk7XHJcbiAgICBsYXVuY2hBcmdzLnB1c2goXCItcHJvcFwiLCBgcGVyc2lzdC5zeXMubGFuZ3VhZ2U9JHtsYW5ndWFnZS50b0xvd2VyQ2FzZSgpfWApO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGNvdW50cnkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGxvZy5kZWJ1ZyhgU2V0dGluZyBBbmRyb2lkIERldmljZSBDb3VudHJ5IHRvICR7Y291bnRyeX1gKTtcclxuICAgIGxhdW5jaEFyZ3MucHVzaChcIi1wcm9wXCIsIGBwZXJzaXN0LnN5cy5jb3VudHJ5PSR7Y291bnRyeS50b1VwcGVyQ2FzZSgpfWApO1xyXG4gIH1cclxuICBsZXQgbG9jYWxlO1xyXG4gIGlmICh0eXBlb2YgbGFuZ3VhZ2UgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGNvdW50cnkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgIGxvY2FsZSA9IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCkgKyBcIi1cIiArIGNvdW50cnkudG9VcHBlckNhc2UoKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBsYW5ndWFnZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgbG9jYWxlID0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBjb3VudHJ5ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBsb2NhbGUgPSBjb3VudHJ5O1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGxvY2FsZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgbG9nLmRlYnVnKGBTZXR0aW5nIEFuZHJvaWQgRGV2aWNlIExvY2FsZSB0byAke2xvY2FsZX1gKTtcclxuICAgIGxhdW5jaEFyZ3MucHVzaChcIi1wcm9wXCIsIGBwZXJzaXN0LnN5cy5sb2NhbGU9JHtsb2NhbGV9YCk7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgYXZkQXJncyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgYXZkQXJncyA9IGF2ZEFyZ3Muc3BsaXQoXCIgXCIpO1xyXG4gICAgbGF1bmNoQXJncyA9IGxhdW5jaEFyZ3MuY29uY2F0KGF2ZEFyZ3MpO1xyXG4gIH1cclxuICBsb2cuZGVidWcoYFJ1bm5pbmcgJyR7ZW11bGF0b3JCaW5hcnlQYXRofScgd2l0aCBhcmdzOiAke0pTT04uc3RyaW5naWZ5KGxhdW5jaEFyZ3MpfWApO1xyXG4gIGxldCBwcm9jID0gbmV3IFN1YlByb2Nlc3MoZW11bGF0b3JCaW5hcnlQYXRoLCBsYXVuY2hBcmdzKTtcclxuICBhd2FpdCBwcm9jLnN0YXJ0KDApO1xyXG4gIHByb2Mub24oJ291dHB1dCcsIChzdGRvdXQsIHN0ZGVycikgPT4ge1xyXG4gICAgZm9yIChsZXQgbGluZSBvZiAoc3Rkb3V0IHx8IHN0ZGVyciB8fCAnJykuc3BsaXQoJ1xcbicpLmZpbHRlcihCb29sZWFuKSkge1xyXG4gICAgICBsb2cuaW5mbyhgW0FWRCBPVVRQVVRdICR7bGluZX1gKTtcclxuICAgIH1cclxuICB9KTtcclxuICBwcm9jLm9uKCdleGl0JywgKGNvZGUsIHNpZ25hbCkgPT4ge1xyXG4gICAgaWYgKGNvZGUgIT09IDApIHtcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYEVtdWxhdG9yIGF2ZCAke2F2ZE5hbWV9IGV4aXQgd2l0aCBjb2RlICR7Y29kZX0sIHNpZ25hbCAke3NpZ25hbH1gKTtcclxuICAgIH1cclxuICB9KTtcclxuICBhd2FpdCByZXRyeShyZXRyeVRpbWVzLCB0aGlzLmdldFJ1bm5pbmdBVkRXaXRoUmV0cnkuYmluZCh0aGlzKSwgYXZkTmFtZSwgYXZkTGF1bmNoVGltZW91dCk7XHJcbiAgYXdhaXQgdGhpcy53YWl0Rm9yRW11bGF0b3JSZWFkeShhdmRSZWFkeVRpbWVvdXQpO1xyXG4gIHJldHVybiBwcm9jO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEFEQlZlcnNpb25cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IHZlcnNpb25TdHJpbmcgLSBBREIgdmVyc2lvbiBhcyBhIHN0cmluZy5cclxuICogQHByb3BlcnR5IHtmbG9hdH0gdmVyc2lvbkZsb2F0IC0gVmVyc2lvbiBudW1iZXIgYXMgZmxvYXQgdmFsdWUgKHVzZWZ1bCBmb3IgY29tcGFyaXNvbikuXHJcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtYWpvciAtIE1ham9yIHZlcnNpb24gbnVtYmVyLlxyXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWlub3IgLSBNaW5vciB2ZXJzaW9uIG51bWJlci5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHBhdGNoIC0gUGF0Y2ggdmVyc2lvbiBudW1iZXIuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgYWRiIHZlcnNpb24uIFRoZSByZXN1bHQgb2YgdGhpcyBtZXRob2QgaXMgY2FjaGVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBREJWZXJzaW9ufSBUaGUgY3VycmVudCBhZGIgdmVyc2lvbi5cclxuICogQHRocm93cyB7RXJyb3J9IElmIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBwYXJzZSBhZGIgdmVyc2lvbi5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLmdldEFkYlZlcnNpb24gPSBfLm1lbW9pemUoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgYWRiVmVyc2lvbiA9IChhd2FpdCB0aGlzLmFkYkV4ZWMoJ3ZlcnNpb24nKSlcclxuICAgICAgLnJlcGxhY2UoL0FuZHJvaWRcXHNEZWJ1Z1xcc0JyaWRnZVxcc3ZlcnNpb25cXHMoW1xcZFxcLl0qKVtcXHNcXHdcXC1dKi8sIFwiJDFcIik7XHJcbiAgICBsZXQgcGFydHMgPSBhZGJWZXJzaW9uLnNwbGl0KCcuJyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2ZXJzaW9uU3RyaW5nOiBhZGJWZXJzaW9uLFxyXG4gICAgICB2ZXJzaW9uRmxvYXQ6IHBhcnNlRmxvYXQoYWRiVmVyc2lvbiksXHJcbiAgICAgIG1ham9yOiBwYXJzZUludChwYXJ0c1swXSwgMTApLFxyXG4gICAgICBtaW5vcjogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcclxuICAgICAgcGF0Y2g6IHBhcnRzWzJdID8gcGFyc2VJbnQocGFydHNbMl0sIDEwKSA6IHVuZGVmaW5lZCxcclxuICAgIH07XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgYWRiIHZlcnNpb24uIE9yaWdpbmFsIGVycm9yOiAnJHtlLm1lc3NhZ2V9JzsgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBTdGRlcnI6ICckeyhlLnN0ZGVyciB8fCAnJykudHJpbSgpfSc7IENvZGU6ICcke2UuY29kZX0nYCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBnaXZlbiBlbXVsYXRvciBleGlzdHMgaW4gdGhlIGxpc3Qgb2YgYXZhaWxhYmxlIGF2ZHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdmROYW1lIC0gVGhlIG5hbWUgb2YgZW11bGF0b3IgdG8gdmVyaWZ5IGZvciBleGlzdGVuY2UuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgZW11bGF0b3Igd2l0aCBnaXZlbiBuYW1lIGRvZXMgbm90IGV4aXN0LlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMuY2hlY2tBdmRFeGlzdCA9IGFzeW5jIGZ1bmN0aW9uIChhdmROYW1lKSB7XHJcbiAgbGV0IGNtZCwgcmVzdWx0O1xyXG4gIHRyeSB7XHJcbiAgICBjbWQgPSBhd2FpdCB0aGlzLmdldFNka0JpbmFyeVBhdGgoJ2VtdWxhdG9yJyk7XHJcbiAgICByZXN1bHQgPSBhd2FpdCBleGVjKGNtZCwgWyctbGlzdC1hdmRzJ10pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxldCB1bmtub3duT3B0aW9uRXJyb3IgPSBuZXcgUmVnRXhwKFwidW5rbm93biBvcHRpb246IC1saXN0LWF2ZHNcIiwgXCJpXCIpLnRlc3QoZS5zdGRlcnIpO1xyXG4gICAgaWYgKCF1bmtub3duT3B0aW9uRXJyb3IpIHtcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGV4ZWN1dGluZyBjaGVja0F2ZEV4aXN0LiBPcmlnaW5hbCBlcnJvcjogJyR7ZS5tZXNzYWdlfSc7IGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgU3RkZXJyOiAnJHsoZS5zdGRlcnIgfHwgJycpLnRyaW0oKX0nOyBDb2RlOiAnJHtlLmNvZGV9J2ApO1xyXG5cclxuICAgIH1cclxuICAgIGNvbnN0IHNka1ZlcnNpb24gPSBhd2FpdCBnZXRTZGtUb29sc1ZlcnNpb24oKTtcclxuICAgIGxldCBiaW5hcnlOYW1lID0gJ2FuZHJvaWQnO1xyXG4gICAgaWYgKHNka1ZlcnNpb24pIHtcclxuICAgICAgaWYgKHNka1ZlcnNpb24ubWFqb3IgPj0gMjUpIHtcclxuICAgICAgICBiaW5hcnlOYW1lID0gJ2F2ZG1hbmFnZXInO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsb2cud2FybihgRGVmYXVsdGluZyBiaW5hcnkgbmFtZSB0byAnJHtiaW5hcnlOYW1lfScsIGJlY2F1c2UgU0RLIHZlcnNpb24gY2Fubm90IGJlIHBhcnNlZGApO1xyXG4gICAgfVxyXG4gICAgLy8gSWYgLWxpc3QtYXZkcyBvcHRpb24gaXMgbm90IGF2YWlsYWJsZSwgdXNlIGFuZHJvaWQgY29tbWFuZCBhcyBhbiBhbHRlcm5hdGl2ZVxyXG4gICAgY21kID0gYXdhaXQgdGhpcy5nZXRTZGtCaW5hcnlQYXRoKGJpbmFyeU5hbWUpO1xyXG4gICAgcmVzdWx0ID0gYXdhaXQgZXhlYyhjbWQsIFsnbGlzdCcsICdhdmQnLCAnLWMnXSk7XHJcbiAgfVxyXG4gIGlmIChyZXN1bHQuc3Rkb3V0LmluZGV4T2YoYXZkTmFtZSkgPT09IC0xKSB7XHJcbiAgICBsZXQgZXhpc3RpbmdzID0gYCgke3Jlc3VsdC5zdGRvdXQudHJpbSgpLnJlcGxhY2UoL1tcXG5dL2csICcpLCAoJyl9KWA7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQXZkICcke2F2ZE5hbWV9JyBpcyBub3QgYXZhaWxhYmxlLiBwbGVhc2Ugc2VsZWN0IHlvdXIgYXZkIG5hbWUgZnJvbSBvbmUgb2YgdGhlc2U6ICcke2V4aXN0aW5nc30nYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBjdXJyZW50IGVtdWxhdG9yIGlzIHJlYWR5IHRvIGFjY2VwdCBmdXJ0aGVyIGNvbW1hbmRzIChib290aW5nIGNvbXBsZXRlZCkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0TXMgWzIwMDAwXSAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdC5cclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBlbXVsYXRvciBpcyBub3QgcmVhZHkgd2l0aGluIHRoZSBnaXZlbiB0aW1lb3V0LlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMud2FpdEZvckVtdWxhdG9yUmVhZHkgPSBhc3luYyBmdW5jdGlvbiAodGltZW91dE1zID0gMjAwMDApIHtcclxuICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xyXG4gIGxvZy5kZWJ1ZyhcIldhaXRpbmcgdW50aWwgZW11bGF0b3IgaXMgcmVhZHlcIik7XHJcbiAgd2hpbGUgKChEYXRlLm5vdygpIC0gc3RhcnQpIDwgdGltZW91dE1zKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbXCJnZXRwcm9wXCIsIFwiaW5pdC5zdmMuYm9vdGFuaW1cIl0pO1xyXG4gICAgICBpZiAoc3Rkb3V0LmluZGV4T2YoJ3N0b3BwZWQnKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuICAgIGF3YWl0IHNsZWVwKDMwMDApO1xyXG4gIH1cclxuICBsb2cuZXJyb3JBbmRUaHJvdygnRW11bGF0b3Igbm90IHJlYWR5Jyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIGN1cnJlbnQgZGV2aWNlIGlzIHJlYWR5IHRvIGFjY2VwdCBmdXJ0aGVyIGNvbW1hbmRzIChib290aW5nIGNvbXBsZXRlZCkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhcHBEZXZpY2VSZWFkeVRpbWVvdXQgWzMwXSAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiBzZWNvbmRzIHRvIHdhaXQuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgZGV2aWNlIGlzIG5vdCByZWFkeSB3aXRoaW4gdGhlIGdpdmVuIHRpbWVvdXQuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy53YWl0Rm9yRGV2aWNlID0gYXN5bmMgZnVuY3Rpb24gKGFwcERldmljZVJlYWR5VGltZW91dCA9IDMwKSB7XHJcbiAgdGhpcy5hcHBEZXZpY2VSZWFkeVRpbWVvdXQgPSBhcHBEZXZpY2VSZWFkeVRpbWVvdXQ7XHJcbiAgY29uc3QgcmV0cmllcyA9IDM7XHJcbiAgY29uc3QgdGltZW91dCA9IHBhcnNlSW50KHRoaXMuYXBwRGV2aWNlUmVhZHlUaW1lb3V0LCAxMCkgLyByZXRyaWVzICogMTAwMDtcclxuICBhd2FpdCByZXRyeShyZXRyaWVzLCBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmFkYkV4ZWMoJ3dhaXQtZm9yLWRldmljZScsIHt0aW1lb3V0fSk7XHJcbiAgICAgIGF3YWl0IHRoaXMucGluZygpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc3RhcnRBZGIoKTtcclxuICAgICAgYXdhaXQgdGhpcy5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XHJcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBpbiB3YWl0aW5nIGZvciBkZXZpY2UuIE9yaWdpbmFsIGVycm9yOiAnJHtlLm1lc3NhZ2V9Jy4gYCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBgUmV0cnlpbmcgYnkgcmVzdGFydGluZyBBREJgKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWJvb3QgdGhlIGN1cnJlbnQgZGV2aWNlIGFuZCB3YWl0IHVudGlsIGl0IGlzIGNvbXBsZXRlZC5cclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHJldHJpZXMgW0RFRkFVTFRfQURCX1JFQk9PVF9SRVRSSUVTXSAtIFRoZSBtYXhpbXVtIG51bWJlciBvZiByZWJvb3QgcmV0cmllcy5cclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBkZXZpY2UgZmFpbGVkIHRvIHJlYm9vdCBhbmQgbnVtYmVyIG9mIHJldHJpZXMgaXMgZXhjZWVkZWQuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5yZWJvb3QgPSBhc3luYyBmdW5jdGlvbiAocmV0cmllcyA9IERFRkFVTFRfQURCX1JFQk9PVF9SRVRSSUVTKSB7XHJcbiAgdHJ5IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuc2hlbGwoWydzdG9wJ10pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGlmIChlcnIubWVzc2FnZS5pbmRleE9mKCdtdXN0IGJlIHJvb3QnKSA9PT0gLTEpIHtcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGhpcyBkZXZpY2UgbmVlZHMgYWRiIHRvIGJlIHJ1bm5pbmcgYXMgcm9vdCB0byBzdG9wLlxyXG4gICAgICAvLyBzbyB0cnkgdG8gcmVzdGFydCB0aGUgZGFlbW9uXHJcbiAgICAgIGxvZy5kZWJ1ZygnRGV2aWNlIHJlcXVpcmVzIGFkYiB0byBiZSBydW5uaW5nIGFzIHJvb3QgaW4gb3JkZXIgdG8gcmVib290LiBSZXN0YXJ0aW5nIGRhZW1vbicpO1xyXG4gICAgICBhd2FpdCB0aGlzLnJvb3QoKTtcclxuICAgICAgYXdhaXQgdGhpcy5zaGVsbChbJ3N0b3AnXSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCBCLmRlbGF5KDIwMDApOyAvLyBsZXQgdGhlIGVtdSBmaW5pc2ggc3RvcHBpbmc7XHJcbiAgICBhd2FpdCB0aGlzLnNldERldmljZVByb3BlcnR5KCdzeXMuYm9vdF9jb21wbGV0ZWQnLCAwKTtcclxuICAgIGF3YWl0IHRoaXMuc2hlbGwoWydzdGFydCddKTtcclxuICAgIGF3YWl0IHJldHJ5SW50ZXJ2YWwocmV0cmllcywgMTAwMCwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgYm9vdGVkID0gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9wZXJ0eSgnc3lzLmJvb3RfY29tcGxldGVkJyk7XHJcbiAgICAgIGlmIChib290ZWQgPT09ICcxJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRoZSBzdGFjayB0cmFjZSwgc28gbm8gbG9nLmVycm9yQW5kVGhyb3dcclxuICAgICAgICBsZXQgbXNnID0gJ1dhaXRpbmcgZm9yIHJlYm9vdC4gVGhpcyB0YWtlcyB0aW1lJztcclxuICAgICAgICBsb2cuZGVidWcobXNnKTtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHRoaXMudW5yb290KCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN3aXRjaCBhZGIgc2VydmVyIHRvIHJvb3QgbW9kZS5cclxuICpcclxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBvZiB0aGUgc3dpdGNoIHdhcyBzdWNjZXNzZnVsIG9yIGZhbHNlXHJcbiAqICAgICAgICAgICAgICAgICAgIGlmIHRoZSBzd2l0Y2ggZmFpbGVkLlxyXG4gKi9cclxuc3lzdGVtQ2FsbE1ldGhvZHMucm9vdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICB0cnkge1xyXG4gICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmV4ZWN1dGFibGUucGF0aCwgWydyb290J10pO1xyXG5cclxuICAgIC8vIG9uIHJlYWwgZGV2aWNlcyBpbiBzb21lIHNpdHVhdGlvbnMgd2UgZ2V0IGFuIGVycm9yIGluIHRoZSBzdGRvdXRcclxuICAgIGlmIChzdGRvdXQgJiYgc3Rkb3V0LmluZGV4T2YoJ2FkYmQgY2Fubm90IHJ1biBhcyByb290JykgIT09IC0xKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihzdGRvdXQudHJpbSgpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZy53YXJuKGBVbmFibGUgdG8gcm9vdCBhZGIgZGFlbW9uOiAnJHtlcnIubWVzc2FnZX0nLiBDb250aW51aW5nYCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN3aXRjaCBhZGIgc2VydmVyIHRvIG5vbi1yb290IG1vZGUuXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgb2YgdGhlIHN3aXRjaCB3YXMgc3VjY2Vzc2Z1bCBvciBmYWxzZVxyXG4gKiAgICAgICAgICAgICAgICAgICBpZiB0aGUgc3dpdGNoIGZhaWxlZC5cclxuICovXHJcbnN5c3RlbUNhbGxNZXRob2RzLnVucm9vdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXhlYyh0aGlzLmV4ZWN1dGFibGUucGF0aCwgWyd1bnJvb3QnXSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZy53YXJuKGBVbmFibGUgdG8gdW5yb290IGFkYiBkYWVtb246ICcke2Vyci5tZXNzYWdlfScuIENvbnRpbnVpbmdgKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogVmVyaWZ5IHdoZXRoZXIgYSByZW1vdGUgcGF0aCBleGlzdHMgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVtb3RlUGF0aCAtIFRoZSByZW1vdGUgcGF0aCB0byB2ZXJpZnkuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGdpdmVuIHBhdGggZXhpc3RzIG9uIHRoZSBkZXZpY2UuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5maWxlRXhpc3RzID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgpIHtcclxuICBsZXQgZmlsZXMgPSBhd2FpdCB0aGlzLmxzKHJlbW90ZVBhdGgpO1xyXG4gIHJldHVybiBmaWxlcy5sZW5ndGggPiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgb3V0cHV0IG9mIF9sc18gY29tbWFuZCBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZW1vdGVQYXRoIC0gVGhlIHJlbW90ZSBwYXRoICh0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlIF9sc18gY29tbWFuZCkuXHJcbiAqIEBwYXJhbSB7QXJyYXkuPFN0cmluZz59IG9wdHMgW1tdXSAtIEFkZGl0aW9uYWwgX2xzXyBvcHRpb25zLlxyXG4gKiBAcmV0dXJuIHtBcnJheS48U3RyaW5nPn0gVGhlIF9sc18gb3V0cHV0IGFzIGFuIGFycmF5IG9mIHNwbGl0IGxpbmVzLlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgQW4gZW1wdHkgYXJyYXkgaXMgcmV0dXJuZWQgb2YgdGhlIGdpdmVuIF9yZW1vdGVQYXRoX1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgZG9lcyBub3QgZXhpc3QuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5scyA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoLCBvcHRzID0gW10pIHtcclxuICB0cnkge1xyXG4gICAgbGV0IGFyZ3MgPSBbJ2xzJywgLi4ub3B0cywgcmVtb3RlUGF0aF07XHJcbiAgICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChhcmdzKTtcclxuICAgIGxldCBsaW5lcyA9IHN0ZG91dC5zcGxpdChcIlxcblwiKTtcclxuICAgIHJldHVybiBsaW5lcy5tYXAoKGwpID0+IGwudHJpbSgpKVxyXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICAgIC5maWx0ZXIoKGwpID0+IGwuaW5kZXhPZihcIk5vIHN1Y2ggZmlsZVwiKSA9PT0gLTEpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgaWYgKGVyci5tZXNzYWdlLmluZGV4T2YoJ05vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnknKSA9PT0gLTEpIHtcclxuICAgICAgdGhyb3cgZXJyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHNpemUgb2YgdGhlIHBhcnRpY3VsYXIgZmlsZSBsb2NhdGVkIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlbW90ZVBhdGggLSBUaGUgcmVtb3RlIHBhdGggdG8gdGhlIGZpbGUuXHJcbiAqIEByZXR1cm4ge251bWJlcn0gRmlsZSBzaXplIGluIGJ5dGVzLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGdldHRpbmcgdGhlIHNpemUgb2YgdGhlIGdpdmVuIGZpbGUuXHJcbiAqL1xyXG5zeXN0ZW1DYWxsTWV0aG9kcy5maWxlU2l6ZSA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBmaWxlcyA9IGF3YWl0IHRoaXMubHMocmVtb3RlUGF0aCwgWyctbGEnXSk7XHJcbiAgICBpZiAoZmlsZXMubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUmVtb3RlIHBhdGggaXMgbm90IGEgZmlsZWApO1xyXG4gICAgfVxyXG4gICAgLy8gaHR0cHM6Ly9yZWdleDEwMS5jb20vci9mT3M0UDQvM1xyXG4gICAgbGV0IG1hdGNoID0gL1xccyhcXGQrKVxccytcXGR7NH0tXFxkezJ9LVxcZHsyfS8uZXhlYyhmaWxlc1swXSk7XHJcbiAgICBpZiAoIW1hdGNoIHx8IF8uaXNOYU4ocGFyc2VJbnQobWF0Y2hbMV0sIDEwKSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gcGFyc2Ugc2l6ZSBmcm9tIGxpc3Qgb3V0cHV0OiAnJHtmaWxlc1swXX0nYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8gZ2V0IGZpbGUgc2l6ZSBmb3IgJyR7cmVtb3RlUGF0aH0nOiAke2Vyci5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN5c3RlbUNhbGxNZXRob2RzO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
