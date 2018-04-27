'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _helpersJs = require('../helpers.js');

var _teen_process = require('teen_process');

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _asyncbox = require('asyncbox');

var _appiumSupport = require('appium-support');

var apkUtilsMethods = {};

/**
 * Check whether the particular package is present on the device under test.
 *
 * @param {string} pkg - The name of the package to check.
 * @return {boolean} True if the package is installed.
 */
apkUtilsMethods.isAppInstalled = function callee$0$0(pkg) {
  var installed, stdout, apkInstalledRgx;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        installed = false;

        _loggerJs2['default'].debug('Getting install status for ' + pkg);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'list', 'packages', pkg]));

      case 5:
        stdout = context$1$0.sent;
        apkInstalledRgx = new RegExp('^package:' + pkg.replace(/(\.)/g, "\\$1") + '$', 'm');

        installed = apkInstalledRgx.test(stdout);
        _loggerJs2['default'].debug('App is' + (!installed ? ' not' : '') + ' installed');
        return context$1$0.abrupt('return', installed);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error finding if app is installed. Original error: ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 12]]);
};

/**
 * Start the particular URI on the device under test.
 *
 * @param {string} uri - The name of URI to start.
 * @param {string} pkg - The name of the package to start the URI with.
 */
apkUtilsMethods.startUri = function callee$0$0(uri, pkg) {
  var args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!uri || !pkg) {
          _loggerJs2['default'].errorAndThrow("URI and package arguments are required");
        }
        context$1$0.prev = 1;
        args = ["am", "start", "-W", "-a", "android.intent.action.VIEW", "-d", uri.replace(/&/g, '\\&'), pkg];
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(args));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error attempting to start URI. Original error: ' + context$1$0.t0);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
};

/**
 * Start the particular package on the device under test.
 *
 * @param {object} startAppOptions [{}] - Startup options mapping.
 *                                        It is mandatory that 'activity' and 'pkg' properties are set.
 *                                        Additional supported properties are: 'retry', 'stopApp', 'waitPkg'
 *                                        and 'waitActivity'.
 * @return {string} The output of the corresponding adb command.
 */
apkUtilsMethods.startApp = function callee$0$0() {
  var startAppOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var apiLevel, cmd, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        if (!startAppOptions.activity || !startAppOptions.pkg) {
          _loggerJs2['default'].errorAndThrow("activity and pkg is required for launching application");
        }
        startAppOptions = _lodash2['default'].clone(startAppOptions);
        startAppOptions.activity = startAppOptions.activity.replace('$', '\\$');

        // initializing defaults
        _lodash2['default'].defaults(startAppOptions, {
          waitPkg: startAppOptions.pkg,
          waitActivity: false,
          retry: true,
          stopApp: true
        });
        // preventing null waitpkg
        startAppOptions.waitPkg = startAppOptions.waitPkg || startAppOptions.pkg;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 8:
        apiLevel = context$1$0.sent;
        cmd = (0, _helpersJs.buildStartCmd)(startAppOptions, apiLevel);
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.shell(cmd));

      case 12:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("Error: Activity class") !== -1 && stdout.indexOf("does not exist") !== -1)) {
          context$1$0.next = 24;
          break;
        }

        if (!(startAppOptions.retry && startAppOptions.activity[0] !== ".")) {
          context$1$0.next = 21;
          break;
        }

        _loggerJs2['default'].debug("We tried to start an activity that doesn't exist, " + "retrying with . prepended to activity");
        startAppOptions.activity = '.' + startAppOptions.activity;
        startAppOptions.retry = false;
        return context$1$0.abrupt('return', this.startApp(startAppOptions));

      case 21:
        _loggerJs2['default'].errorAndThrow("Activity used to start app doesn't exist or cannot be " + "launched! Make sure it exists and is a launchable activity");

      case 22:
        context$1$0.next = 25;
        break;

      case 24:
        if (stdout.indexOf("java.lang.SecurityException") !== -1) {
          // if the app is disabled on a real device it will throw a security exception
          _loggerJs2['default'].errorAndThrow("Permission to start activity denied.");
        }

      case 25:
        if (!startAppOptions.waitActivity) {
          context$1$0.next = 28;
          break;
        }

        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(this.waitForActivity(startAppOptions.waitPkg, startAppOptions.waitActivity, startAppOptions.waitDuration));

      case 28:
        context$1$0.next = 33;
        break;

      case 30:
        context$1$0.prev = 30;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error occured while starting App. Original error: ' + context$1$0.t0.message);

      case 33:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 30]]);
};

/**
 * @typedef {Object} PackageActivityInfo
 * @property {?string} appPackage - The name of application package,
 *                                  for example 'com.acme.app'.
 * @property {?string} appActivity - The name of main application activity.
 */

/**
 * Get the name of currently focused package and activity.
 *
 * @return {PackageActivityInfo} The mapping, where property names are 'appPackage' and 'appActivity'.
 * @throws {Error} If there is an error while parsing the data.
 */
apkUtilsMethods.getFocusedPackageAndActivity = function callee$0$0() {
  var cmd, nullRe, searchRe, stdout, foundNullMatch, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, foundMatch;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Getting focused package and activity");
        cmd = ['dumpsys', 'window', 'windows'];
        nullRe = new RegExp(/mFocusedApp=null/);
        searchRe = new RegExp('mFocusedApp.+Record\\{.*\\s([^\\s\\/\\}]+)' + '\\/([^\\s\\/\\}\\,]+)\\,?(\\s[^\\s\\/\\}]+)*\\}');
        context$1$0.prev = 4;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.shell(cmd));

      case 7:
        stdout = context$1$0.sent;
        foundNullMatch = false;
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 12;
        _iterator = _getIterator(stdout.split("\n"));

      case 14:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 25;
          break;
        }

        line = _step.value;
        foundMatch = searchRe.exec(line);

        if (!foundMatch) {
          context$1$0.next = 21;
          break;
        }

        return context$1$0.abrupt('return', { appPackage: foundMatch[1].trim(), appActivity: foundMatch[2].trim() });

      case 21:
        if (nullRe.test(line)) {
          foundNullMatch = true;
        }

      case 22:
        _iteratorNormalCompletion = true;
        context$1$0.next = 14;
        break;

      case 25:
        context$1$0.next = 31;
        break;

      case 27:
        context$1$0.prev = 27;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 31:
        context$1$0.prev = 31;
        context$1$0.prev = 32;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 34:
        context$1$0.prev = 34;

        if (!_didIteratorError) {
          context$1$0.next = 37;
          break;
        }

        throw _iteratorError;

      case 37:
        return context$1$0.finish(34);

      case 38:
        return context$1$0.finish(31);

      case 39:
        if (!foundNullMatch) {
          context$1$0.next = 43;
          break;
        }

        return context$1$0.abrupt('return', { appPackage: null, appActivity: null });

      case 43:
        _loggerJs2['default'].errorAndThrow("Could not parse activity from dumpsys");

      case 44:
        context$1$0.next = 49;
        break;

      case 46:
        context$1$0.prev = 46;
        context$1$0.t1 = context$1$0['catch'](4);

        _loggerJs2['default'].errorAndThrow('Could not get focusPackageAndActivity. Original error: ' + context$1$0.t1.message);

      case 49:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 46], [12, 27, 31, 39], [32,, 34, 38]]);
};

/**
 * Wait for the given activity to be focused/non-focused.
 *
 * @param {string} pkg - The name of the package to wait for.
 * @param {string} activity - The name of the activity, belonging to that package,
 *                            to wait for.
 * @param {boolean} waitForStop - Whether to wait until the activity is focused (true)
 *                                or is not focused (false).
 * @param {number} waitMs [20000] - Number of milliseconds to wait before timeout occurs.
 * @throws {error} If timeout happens.
 */
apkUtilsMethods.waitForActivityOrNot = function callee$0$0(pkg, activity, waitForStop) {
  var waitMs = arguments.length <= 3 || arguments[3] === undefined ? 20000 : arguments[3];

  var splitNames, allPackages, allActivities, possibleActivityNames, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, oneActivity, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, currentPkg, possibleActivityPatterns, retries;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(!pkg || !activity)) {
          context$1$0.next = 2;
          break;
        }

        throw new Error('Package and activity required.');

      case 2:
        _loggerJs2['default'].debug('Waiting up to ' + waitMs + 'ms for activity matching pkg: \'' + pkg + '\' and ' + ('activity: \'' + activity + '\' to' + (waitForStop ? ' not' : '') + ' be focused'));

        splitNames = function splitNames(names) {
          return names.split(',').map(function (name) {
            return name.trim();
          });
        };

        allPackages = splitNames(pkg);
        allActivities = splitNames(activity);
        possibleActivityNames = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 10;
        _iterator2 = _getIterator(allActivities);

      case 12:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 40;
          break;
        }

        oneActivity = _step2.value;

        if (!oneActivity.startsWith('.')) {
          context$1$0.next = 36;
          break;
        }

        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 18;

        // add the package name if activity is not full qualified
        for (_iterator3 = _getIterator(allPackages); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          currentPkg = _step3.value;

          possibleActivityNames.push(('' + currentPkg + oneActivity).replace(/\.+/g, '.'));
        }
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](18);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError3) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError3;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        context$1$0.next = 37;
        break;

      case 36:
        // accept fully qualified activity name.
        possibleActivityNames.push(oneActivity);

      case 37:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 12;
        break;

      case 40:
        context$1$0.next = 46;
        break;

      case 42:
        context$1$0.prev = 42;
        context$1$0.t1 = context$1$0['catch'](10);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t1;

      case 46:
        context$1$0.prev = 46;
        context$1$0.prev = 47;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 49:
        context$1$0.prev = 49;

        if (!_didIteratorError2) {
          context$1$0.next = 52;
          break;
        }

        throw _iteratorError2;

      case 52:
        return context$1$0.finish(49);

      case 53:
        return context$1$0.finish(46);

      case 54:
        /* jshint ignore:start */
        _loggerJs2['default'].debug('Possible activities, to be checked: ' + possibleActivityNames.map(function (name) {
          return '\'' + name + '\'';
        }).join(', '));
        /* jshint ignore:end */
        possibleActivityPatterns = possibleActivityNames.map(function (possibleActivityName) {
          return new RegExp('^' + possibleActivityName.replace(/\./g, '\\.').replace(/\*/g, '.*?').replace(/\$/g, '\\$') + '$');
        });
        retries = parseInt(waitMs / 750, 10) || 1;

        retries = isNaN(retries) ? 30 : retries;
        context$1$0.next = 60;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(retries, 750, function callee$1$0() {
          var _ref, appPackage, appActivity, _ret;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.getFocusedPackageAndActivity());

              case 2:
                _ref = context$2$0.sent;
                appPackage = _ref.appPackage;
                appActivity = _ref.appActivity;

                if (!(appActivity && appPackage)) {
                  context$2$0.next = 9;
                  break;
                }

                _ret = (function () {
                  var fullyQualifiedActivity = appActivity.startsWith('.') ? '' + appPackage + appActivity : appActivity;
                  _loggerJs2['default'].debug('Found package: \'' + appPackage + '\' and fully qualified activity name : \'' + fullyQualifiedActivity + '\'');
                  var foundAct = _lodash2['default'].includes(allPackages, appPackage) && _lodash2['default'].findIndex(possibleActivityPatterns, function (possiblePattern) {
                    return possiblePattern.test(fullyQualifiedActivity);
                  }) !== -1;
                  if (!waitForStop && foundAct || waitForStop && !foundAct) {
                    return {
                      v: undefined
                    };
                  }
                })();

                if (!(typeof _ret === 'object')) {
                  context$2$0.next = 9;
                  break;
                }

                return context$2$0.abrupt('return', _ret.v);

              case 9:
                _loggerJs2['default'].debug('Incorrect package and activity. Retrying.');
                /* jshint ignore:start */
                throw new Error(possibleActivityNames.map(function (name) {
                  return '\'' + name + '\'';
                }).join(' or ') + ' never ' + (waitForStop ? 'stopped' : 'started'));

              case 11:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        }));

      case 60:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10, 42, 46, 54], [18, 22, 26, 34], [27,, 29, 33], [47,, 49, 53]]);
};

/**
 * Wait for the given activity to be focused
 *
 * @param {string} pkg - The name of the package to wait for.
 * @param {string} activity - The name of the activity, belonging to that package,
 *                            to wait for.
 * @param {number} waitMs [20000] - Number of milliseconds to wait before timeout occurs.
 * @throws {error} If timeout happens.
 */

/* jshint ignore:end */
apkUtilsMethods.waitForActivity = function callee$0$0(pkg, act) {
  var waitMs = arguments.length <= 2 || arguments[2] === undefined ? 20000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.waitForActivityOrNot(pkg, act, false, waitMs));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Wait for the given activity to be non-focused.
 *
 * @param {string} pkg - The name of the package to wait for.
 * @param {string} activity - The name of the activity, belonging to that package,
 *                            to wait for.
 * @param {number} waitMs [20000] - Number of milliseconds to wait before timeout occurs.
 * @throws {error} If timeout happens.
 */
apkUtilsMethods.waitForNotActivity = function callee$0$0(pkg, act) {
  var waitMs = arguments.length <= 2 || arguments[2] === undefined ? 20000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.waitForActivityOrNot(pkg, act, true, waitMs));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Uninstall the given package from the device under test.
 *
 * @param {string} pkg - The name of the package to be uninstalled.
 * @return {boolean} True if the package was found on the device and
 *                   successfully uninstalled.
 */
apkUtilsMethods.uninstallApk = function callee$0$0(pkg) {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Uninstalling ' + pkg);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.isAppInstalled(pkg));

      case 3:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        _loggerJs2['default'].info(pkg + ' was not uninstalled, because it was not present on the device');
        return context$1$0.abrupt('return', false);

      case 6:
        stdout = undefined;
        context$1$0.prev = 7;
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.forceStop(pkg));

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.adbExec(['uninstall', pkg], { timeout: 20000 }));

      case 12:
        stdout = context$1$0.sent;
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](7);

        _loggerJs2['default'].errorAndThrow('Unable to uninstall APK. Original error: ' + context$1$0.t0.message);

      case 18:
        stdout = stdout.trim();
        _loggerJs2['default'].debug('ADB command output: ' + stdout);

        if (!(stdout.indexOf("Success") !== -1)) {
          context$1$0.next = 23;
          break;
        }

        _loggerJs2['default'].info(pkg + ' was successfully uninstalled');
        return context$1$0.abrupt('return', true);

      case 23:
        _loggerJs2['default'].info(pkg + ' was not uninstalled');
        return context$1$0.abrupt('return', false);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 15]]);
};

/**
 * Install the package after it was pushed to the device under test.
 *
 * @param {string} apkPathOnDevice - The full path to the package on the device file system.
 * @param {object} opts [{}] - Additional exec options. See {@link https://github.com/appium/node-teen_process}
 *                             for more details on this parameter.
 * @throws {error} If there was a failure during application install.
 */
apkUtilsMethods.installFromDevicePath = function callee$0$0(apkPathOnDevice) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'install', '-r', apkPathOnDevice], opts));

      case 2:
        stdout = context$1$0.sent;

        if (stdout.indexOf("Failure") !== -1) {
          _loggerJs2['default'].errorAndThrow('Remote install failed: ' + stdout);
        }

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Install the package from the local file system.
 *
 * @param {string} apk - The full path to the local package.
 * @param {boolean} repalce [true] - Whether to replace the package if it
 *                                   already installed. True by default.
 * @param {number} timeout [60000] - The number of milliseconds to wait until
 *                                   installation is completed.
 * @throws {error} If an unexpected error happens during install.
 */
apkUtilsMethods.install = function callee$0$0(apk) {
  var replace = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  var timeout = arguments.length <= 2 || arguments[2] === undefined ? 60000 : arguments[2];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!replace) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['install', '-r', apk], { timeout: timeout }));

      case 3:
        context$1$0.next = 15;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.adbExec(['install', apk], { timeout: timeout }));

      case 8:
        context$1$0.next = 15;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](5);

        if (!(context$1$0.t0.message.indexOf('INSTALL_FAILED_ALREADY_EXISTS') === -1)) {
          context$1$0.next = 14;
          break;
        }

        throw context$1$0.t0;

      case 14:
        _loggerJs2['default'].debug('Application \'' + apk + '\' already installed. Continuing.');

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 10]]);
};

/**
 * Install the package from the local file system of upgrade it if an older
 * version of the same package is already installed.
 *
 * @param {string} apk - The full path to the local package.
 * @param {?string} pkg - The name of the installed package. The method will
 *                        perform faster if it is set.
 * @param {?number} timeout [60000] - The number of milliseconds to wait until
 *                                   installation is completed.
 * @throws {error} If an unexpected error happens during install.
 */
apkUtilsMethods.installOrUpgrade = function callee$0$0(apk) {
  var pkg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var timeout = arguments.length <= 2 || arguments[2] === undefined ? 60000 : arguments[2];
  var apkInfo, pkgInfo, pkgVersionCode, apkVersionCode;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        apkInfo = null;

        if (pkg) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getApkInfo(apk));

      case 4:
        apkInfo = context$1$0.sent;

        pkg = apkInfo.name;

      case 6:
        if (pkg) {
          context$1$0.next = 9;
          break;
        }

        _loggerJs2['default'].warn('Cannot read the package name of ' + apk + '. Assuming correct app version is already installed');
        return context$1$0.abrupt('return');

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.isAppInstalled(pkg));

      case 11:
        if (context$1$0.sent) {
          context$1$0.next = 16;
          break;
        }

        _loggerJs2['default'].debug('App \'' + apk + '\' not installed. Installing');
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.install(apk, false, timeout));

      case 15:
        return context$1$0.abrupt('return');

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.getPackageInfo(pkg));

      case 18:
        pkgInfo = context$1$0.sent;
        pkgVersionCode = pkgInfo.versionCode;

        if (apkInfo) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.getApkInfo(apk));

      case 23:
        apkInfo = context$1$0.sent;

      case 24:
        apkVersionCode = apkInfo.versionCode;

        if (!(_lodash2['default'].isUndefined(apkVersionCode) || _lodash2['default'].isUndefined(pkgVersionCode))) {
          context$1$0.next = 28;
          break;
        }

        _loggerJs2['default'].warn('Cannot read version codes of \'' + apk + '\' and/or \'' + pkg + '\'. Assuming correct app version is already installed');
        return context$1$0.abrupt('return');

      case 28:
        if (!(pkgVersionCode >= apkVersionCode)) {
          context$1$0.next = 31;
          break;
        }

        _loggerJs2['default'].debug('The installed \'' + pkg + '\' package does not require upgrade (' + pkgVersionCode + ' >= ' + apkVersionCode + ')');
        return context$1$0.abrupt('return');

      case 31:
        _loggerJs2['default'].debug('The installed \'' + pkg + '\' package is older than \'' + apk + '\' (' + pkgVersionCode + ' < ' + apkVersionCode + '). ' + 'Executing upgrade');
        context$1$0.prev = 32;
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(this.install(apk, true, timeout));

      case 35:
        context$1$0.next = 46;
        break;

      case 37:
        context$1$0.prev = 37;
        context$1$0.t0 = context$1$0['catch'](32);

        _loggerJs2['default'].warn('Cannot upgrade \'' + pkg + '\' because of \'' + context$1$0.t0.message + '\'. Trying full reinstall');
        context$1$0.next = 42;
        return _regeneratorRuntime.awrap(this.uninstallApk(pkg));

      case 42:
        if (context$1$0.sent) {
          context$1$0.next = 44;
          break;
        }

        _loggerJs2['default'].errorAndThrow('\'' + pkg + '\' package cannot be uninstalled');

      case 44:
        context$1$0.next = 46;
        return _regeneratorRuntime.awrap(this.install(apk, false, timeout));

      case 46:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[32, 37]]);
};

/**
 * Extract string resources from the given package on local file system.
 *
 * @param {string} apk - The full path to the local package.
 * @param {string} language - The name of the language to extract the resources for.
 * @param {string} out - The name of the destination folder on the local file system to
 *                       store the extracted file to.
 * @return {object} A mapping object, where properties are: 'apkStrings', containing
 *                  parsed resource file represented as JSON object, and 'localPath',
 *                  containing the path to the extracted file on the local file system.
 */
apkUtilsMethods.extractStringsFromApk = function callee$0$0(apk, language, out) {
  var stringsJson, localPath, apkTools, args, fileData, apkStrings, msg;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Extracting strings for language: ' + (language || "default"));
        stringsJson = 'strings.json';
        localPath = undefined;

        if (language) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceLanguage());

      case 6:
        language = context$1$0.sent;

      case 7:
        apkTools = this.jars['appium_apk_tools.jar'];
        args = ['-jar', apkTools, 'stringsFromApk', apk, out, language];
        fileData = undefined, apkStrings = undefined;
        context$1$0.prev = 10;
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', args));

      case 13:
        context$1$0.next = 21;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](10);

        _loggerJs2['default'].debug('No strings.xml for language \'' + language + '\', getting default ' + 'strings.xml');
        args.pop();
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', args));

      case 21:
        context$1$0.prev = 21;

        _loggerJs2['default'].debug("Reading strings from converted strings.json");
        localPath = _path2['default'].join(out, stringsJson);
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localPath, 'utf8'));

      case 26:
        fileData = context$1$0.sent;

        apkStrings = JSON.parse(fileData);
        context$1$0.next = 35;
        break;

      case 30:
        context$1$0.prev = 30;
        context$1$0.t1 = context$1$0['catch'](21);

        if (fileData) {
          _loggerJs2['default'].debug('Content started with: ' + fileData.slice(0, 300));
        }
        msg = 'Could not parse strings from strings.json. Original ' + ('error: ' + context$1$0.t1.message);

        _loggerJs2['default'].errorAndThrow(msg);

      case 35:
        return context$1$0.abrupt('return', { apkStrings: apkStrings, localPath: localPath });

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[10, 15], [21, 30]]);
};

/**
 * Get the language name of the device under test.
 *
 * @return {string} The name of device language.
 */
apkUtilsMethods.getDeviceLanguage = function callee$0$0() {
  var language;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        language = undefined;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 3:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.getDeviceSysLanguage());

      case 7:
        language = context$1$0.sent;

        if (language) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.getDeviceProductLanguage());

      case 11:
        language = context$1$0.sent;

      case 12:
        context$1$0.next = 17;
        break;

      case 14:
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.getDeviceLocale());

      case 16:
        language = context$1$0.sent.split("-")[0];

      case 17:
        return context$1$0.abrupt('return', language);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the language name of the device under test.
 *
 * @param {string} language - The name of the new device language.
 */
apkUtilsMethods.setDeviceLanguage = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceSysLanguage(language));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the country name of the device under test.
 *
 * @return {string} The name of device country.
 */
apkUtilsMethods.getDeviceCountry = function callee$0$0() {
  var country;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceSysCountry());

      case 2:
        country = context$1$0.sent;

        if (country) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceProductCountry());

      case 6:
        country = context$1$0.sent;

      case 7:
        return context$1$0.abrupt('return', country);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the country name of the device under test.
 *
 * @param {string} country - The name of the new device country.
 */
apkUtilsMethods.setDeviceCountry = function callee$0$0(country) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceSysCountry(country));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the locale name of the device under test.
 *
 * @return {string} The name of device locale.
 */
apkUtilsMethods.getDeviceLocale = function callee$0$0() {
  var locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceSysLocale());

      case 2:
        locale = context$1$0.sent;

        if (locale) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.getDeviceProductLocale());

      case 6:
        locale = context$1$0.sent;

      case 7:
        return context$1$0.abrupt('return', locale);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the locale name of the device under test and the format of the locale is en-US, for example.
 * This method call setDeviceLanguageCountry, so, please use setDeviceLanguageCountry as possible.
 *
 * @param {string} locale - Names of the device language and the country connected with `-`. e.g. en-US.
 */
apkUtilsMethods.setDeviceLocale = function callee$0$0(locale) {
  var validateLocale, split_locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        validateLocale = new RegExp(/[a-zA-Z]+-[a-zA-Z0-9]+/);

        if (validateLocale.test(locale)) {
          context$1$0.next = 4;
          break;
        }

        _loggerJs2['default'].warn('setDeviceLocale requires the following format: en-US or ja-JP');
        return context$1$0.abrupt('return');

      case 4:
        split_locale = locale.split("-");
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.setDeviceLanguageCountry(split_locale[0], split_locale[1]));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Make sure current device locale is expected or not.
 *
 * @param {string} language - Language. The language field is case insensitive, but Locale always canonicalizes to lower case.
 * @param {string} country - Country. The language field is case insensitive, but Locale always canonicalizes to lower case.
 *
 * @return {boolean} If current locale is language and country as arguments, return true.
 */
apkUtilsMethods.ensureCurrentLocale = function callee$0$0(language, country) {
  var hasLanguage, hasCountry, lowLanguage, lowCountry, curLanguage, curCountry, curLocale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        hasLanguage = _lodash2['default'].isString(language);
        hasCountry = _lodash2['default'].isString(country);

        if (!(!hasLanguage && !hasCountry)) {
          context$1$0.next = 5;
          break;
        }

        _loggerJs2['default'].warn('ensureCurrentLocale requires language or country');
        return context$1$0.abrupt('return', false);

      case 5:
        lowLanguage = (language || '').toLowerCase();
        lowCountry = (country || '').toLowerCase();
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 9:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 28;
          break;
        }

        curLanguage = undefined, curCountry = undefined;

        if (!hasLanguage) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.getDeviceLanguage());

      case 15:
        curLanguage = context$1$0.sent.toLowerCase();

        if (!(!hasCountry && lowLanguage === curLanguage)) {
          context$1$0.next = 18;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 18:
        if (!hasCountry) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.getDeviceCountry());

      case 21:
        curCountry = context$1$0.sent.toLowerCase();

        if (!(!hasLanguage && lowCountry === curCountry)) {
          context$1$0.next = 24;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 24:
        if (!(lowLanguage === curLanguage && lowCountry === curCountry)) {
          context$1$0.next = 26;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 26:
        context$1$0.next = 33;
        break;

      case 28:
        context$1$0.next = 30;
        return _regeneratorRuntime.awrap(this.getDeviceLocale());

      case 30:
        curLocale = context$1$0.sent.toLowerCase();

        if (!(lowLanguage + '-' + lowCountry === curLocale)) {
          context$1$0.next = 33;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 33:
        return context$1$0.abrupt('return', false);

      case 34:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the locale name of the device under test.
 *
 * @param {string} language - Language. The language field is case insensitive, but Locale always canonicalizes to lower case.
 *                            format: [a-zA-Z]{2,8}. e.g. en, ja : https://developer.android.com/reference/java/util/Locale.html
 * @param {string} country - Country. The country (region) field is case insensitive, but Locale always canonicalizes to upper case.
 *                            format: [a-zA-Z]{2} | [0-9]{3}. e.g. US, JP : https://developer.android.com/reference/java/util/Locale.html
 */
apkUtilsMethods.setDeviceLanguageCountry = function callee$0$0(language, country) {
  var hasLanguage, hasCountry, wasSettingChanged, apiLevel, curLanguage, curCountry, curLocale, locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        hasLanguage = language && _lodash2['default'].isString(language);
        hasCountry = country && _lodash2['default'].isString(country);

        if (!(!hasLanguage && !hasCountry)) {
          context$1$0.next = 6;
          break;
        }

        _loggerJs2['default'].warn('setDeviceLanguageCountry requires language or country.');
        _loggerJs2['default'].warn('Got language: \'' + language + '\' and country: \'' + country + '\'');
        return context$1$0.abrupt('return');

      case 6:
        wasSettingChanged = false;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 9:
        apiLevel = context$1$0.sent;

        language = (language || '').toLowerCase();
        country = (country || '').toUpperCase();

        if (!(apiLevel < 23)) {
          context$1$0.next = 29;
          break;
        }

        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.getDeviceLanguage());

      case 15:
        curLanguage = context$1$0.sent.toLowerCase();
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.getDeviceCountry());

      case 18:
        curCountry = context$1$0.sent.toUpperCase();

        if (!(hasLanguage && language !== curLanguage)) {
          context$1$0.next = 23;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(this.setDeviceLanguage(language));

      case 22:
        wasSettingChanged = true;

      case 23:
        if (!(hasCountry && country !== curCountry)) {
          context$1$0.next = 27;
          break;
        }

        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(this.setDeviceCountry(country));

      case 26:
        wasSettingChanged = true;

      case 27:
        context$1$0.next = 50;
        break;

      case 29:
        context$1$0.next = 31;
        return _regeneratorRuntime.awrap(this.getDeviceLocale());

      case 31:
        curLocale = context$1$0.sent;

        if (!(apiLevel === 23)) {
          context$1$0.next = 42;
          break;
        }

        locale = undefined;

        if (!hasCountry) {
          locale = language;
        } else if (!hasLanguage) {
          locale = country;
        } else {
          locale = language + '-' + country;
        }

        _loggerJs2['default'].debug('Current locale: \'' + curLocale + '\'; requested locale: \'' + locale + '\'');

        if (!(locale.toLowerCase() !== curLocale.toLowerCase())) {
          context$1$0.next = 40;
          break;
        }

        context$1$0.next = 39;
        return _regeneratorRuntime.awrap(this.setDeviceSysLocale(locale));

      case 39:
        wasSettingChanged = true;

      case 40:
        context$1$0.next = 50;
        break;

      case 42:
        if (!(!hasCountry || !hasLanguage)) {
          context$1$0.next = 46;
          break;
        }

        _loggerJs2['default'].warn('setDeviceLanguageCountry requires both language and country to be set for API 24+');
        _loggerJs2['default'].warn('Got language: \'' + language + '\' and country: \'' + country + '\'');
        return context$1$0.abrupt('return');

      case 46:

        _loggerJs2['default'].debug('Current locale: \'' + curLocale + '\'; requested locale: \'' + language + '-' + country + '\'');

        if (!((language + '-' + country).toLowerCase() !== curLocale.toLowerCase())) {
          context$1$0.next = 50;
          break;
        }

        context$1$0.next = 50;
        return _regeneratorRuntime.awrap(this.setDeviceSysLocaleViaSettingApp(language, country));

      case 50:
        if (!wasSettingChanged) {
          context$1$0.next = 54;
          break;
        }

        _loggerJs2['default'].info("Rebooting the device in order to apply new locale via 'setting persist.sys.locale' command.");
        context$1$0.next = 54;
        return _regeneratorRuntime.awrap(this.reboot());

      case 54:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the package name from local apk file.
 *
 * @param {string} apk - The full path to existing .apk package on the local
 *                       file system.
 * @return {string} The parsed package name or _null_ if it cannot be parsed.
 */
apkUtilsMethods.getPackageName = function callee$0$0(apk) {
  var args, _ref2, stdout, apkPackage;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        args = ['dump', 'badging', apk];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 5:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        apkPackage = new RegExp(/package: name='([^']+)'/g).exec(stdout);

        if (apkPackage && apkPackage.length >= 2) {
          apkPackage = apkPackage[1];
        } else {
          apkPackage = null;
        }
        return context$1$0.abrupt('return', apkPackage);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @typedef {Objcet} AppInfo
 * @property {string} name - Package name, for example 'com.acme.app'.
 * @property {number} versionCode - Version code.
 * @property {string} versionName - Version name, for example '1.0'.
 */

/**
 * Get the package info from local apk file.
 *
 * @param {string} apkPath - The full path to existing .apk package on the local
 *                           file system.
 * @return {?AppInfo} The parsed application information.
 */
apkUtilsMethods.getApkInfo = function callee$0$0(apkPath) {
  var _ref3, stdout, matches;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(apkPath));

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        _loggerJs2['default'].errorAndThrow('The file at path ' + apkPath + ' does not exist or is not accessible');

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 6:
        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, ['d', 'badging', apkPath]));

      case 9:
        _ref3 = context$1$0.sent;
        stdout = _ref3.stdout;
        matches = new RegExp(/package: name='([^']+)' versionCode='(\d+)' versionName='([^']+)'/).exec(stdout);

        if (!matches) {
          context$1$0.next = 14;
          break;
        }

        return context$1$0.abrupt('return', {
          name: matches[1],
          versionCode: parseInt(matches[2], 10),
          versionName: matches[3]
        });

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](6);

        _loggerJs2['default'].warn('Error "' + context$1$0.t0.message + '" while getting badging info');

      case 19:
        return context$1$0.abrupt('return', {});

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 16]]);
};

/**
 * Get the package info from the installed application.
 *
 * @param {string} pkg - The name of the installed package.
 * @return {?AppInfo} The parsed application information.
 */
apkUtilsMethods.getPackageInfo = function callee$0$0(pkg) {
  var result, stdout, versionNameMatch, versionCodeMatch;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Getting package info for ' + pkg);
        result = { name: pkg };
        context$1$0.prev = 2;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(['dumpsys', 'package', pkg]));

      case 5:
        stdout = context$1$0.sent;
        versionNameMatch = new RegExp(/versionName=([\d+\.]+)/).exec(stdout);

        if (versionNameMatch) {
          result.versionName = versionNameMatch[1];
        }
        versionCodeMatch = new RegExp(/versionCode=(\d+)/).exec(stdout);

        if (versionCodeMatch) {
          result.versionCode = parseInt(versionCodeMatch[1], 10);
        }
        return context$1$0.abrupt('return', result);

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](2);

        _loggerJs2['default'].warn('Error "' + context$1$0.t0.message + '" while dumping package info');

      case 16:
        return context$1$0.abrupt('return', result);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 13]]);
};

exports['default'] = apkUtilsMethods;
module.exports = exports['default'];
// https://regex101.com/r/xZ8vF7/1

// figure out the number of retries. Try once if waitMs is less that 750
// 30 times if parsing is not possible

// on some systems this will throw an error if the app already
// exists

// this method is only used in API < 23

// this method is only used in API < 23

// this method is only used in API < 23

// this method is only used in API >= 23
// API >= 24
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hcGstdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3lCQUE4QixlQUFlOzs0QkFDeEIsY0FBYzs7d0JBQ25CLGNBQWM7Ozs7b0JBQ2IsTUFBTTs7OztzQkFDVCxRQUFROzs7O3dCQUNRLFVBQVU7OzZCQUNyQixnQkFBZ0I7O0FBR25DLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFRekIsZUFBZSxDQUFDLGNBQWMsR0FBRyxvQkFBZ0IsR0FBRztNQUU1QyxTQUFTLEVBRVQsTUFBTSxFQUNOLGVBQWU7Ozs7O0FBSGYsaUJBQVMsR0FBRyxLQUFLOztBQUNyQiw4QkFBSSxLQUFLLGlDQUErQixHQUFHLENBQUcsQ0FBQzs7eUNBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0FBQTFELGNBQU07QUFDTix1QkFBZSxHQUFHLElBQUksTUFBTSxlQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFLLEdBQUcsQ0FBQzs7QUFDbEYsaUJBQVMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLDhCQUFJLEtBQUssYUFBVSxDQUFDLFNBQVMsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFBLGdCQUFhLENBQUM7NENBQ2xELFNBQVM7Ozs7OztBQUVoQiw4QkFBSSxhQUFhLHlEQUF1RCxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRXhGLENBQUM7Ozs7Ozs7O0FBUUYsZUFBZSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsR0FBRyxFQUFFLEdBQUc7TUFLM0MsSUFBSTs7OztBQUpWLFlBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDaEIsZ0NBQUksYUFBYSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7U0FDN0Q7O0FBRUssWUFBSSxHQUFHLENB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QUksSUFBSSxhQUFXLGVBQUksT0FBTyxrQ0FBK0IsQ0FBQzs7OzRDQUV6RCxNQUFNOzs7Ozs7O0NBQ2QsQ0FBQzs7cUJBRWEsZUFBZSIsImZpbGUiOiJsaWIvdG9vbHMvYXBrLXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYnVpbGRTdGFydENtZCB9IGZyb20gJy4uL2hlbHBlcnMuanMnO1xyXG5pbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcclxuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXIuanMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcclxuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XHJcblxyXG5cclxubGV0IGFwa1V0aWxzTWV0aG9kcyA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIHdoZXRoZXIgdGhlIHBhcnRpY3VsYXIgcGFja2FnZSBpcyBwcmVzZW50IG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBuYW1lIG9mIHRoZSBwYWNrYWdlIHRvIGNoZWNrLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYWNrYWdlIGlzIGluc3RhbGxlZC5cclxuICovXHJcbmFwa1V0aWxzTWV0aG9kcy5pc0FwcEluc3RhbGxlZCA9IGFzeW5jIGZ1bmN0aW9uIChwa2cpIHtcclxuICB0cnkge1xyXG4gICAgbGV0IGluc3RhbGxlZCA9IGZhbHNlO1xyXG4gICAgbG9nLmRlYnVnKGBHZXR0aW5nIGluc3RhbGwgc3RhdHVzIGZvciAke3BrZ31gKTtcclxuICAgIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsncG0nLCAnbGlzdCcsICdwYWNrYWdlcycsIHBrZ10pO1xyXG4gICAgbGV0IGFwa0luc3RhbGxlZFJneCA9IG5ldyBSZWdFeHAoYF5wYWNrYWdlOiR7cGtnLnJlcGxhY2UoLyhcXC4pL2csIFwiXFxcXCQxXCIpfSRgLCAnbScpO1xyXG4gICAgaW5zdGFsbGVkID0gYXBrSW5zdGFsbGVkUmd4LnRlc3Qoc3Rkb3V0KTtcclxuICAgIGxvZy5kZWJ1ZyhgQXBwIGlzJHshaW5zdGFsbGVkID8gJyBub3QnIDogJyd9IGluc3RhbGxlZGApO1xyXG4gICAgcmV0dXJuIGluc3RhbGxlZDtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZmluZGluZyBpZiBhcHAgaXMgaW5zdGFsbGVkLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0YXJ0IHRoZSBwYXJ0aWN1bGFyIFVSSSBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmkgLSBUaGUgbmFtZSBvZiBVUkkgdG8gc3RhcnQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwa2cgLSBUaGUgbmFtZSBvZiB0aGUgcGFja2FnZSB0byBzdGFydCB0aGUgVVJJIHdpdGguXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuc3RhcnRVcmkgPSBhc3luYyBmdW5jdGlvbiAodXJpLCBwa2cpIHtcclxuICBpZiAoIXVyaSB8fCAhcGtnKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIlVSSSBhbmQgcGFja2FnZSBhcmd1bWVudHMgYXJlIHJlcXVpcmVkXCIpO1xyXG4gIH1cclxuICB0cnkge1xyXG4gICAgbGV0IGFyZ3MgPSBbXCJhbVwiLCBcInN0YXJ0XCIsIFwiLVdcIiwgXCItYVwiLCBcImFuZHJvaWQuaW50ZW50LmFjdGlvbi5WSUVXXCIsIFwiLWRcIixcclxuICAgICAgICAgICAgICAgIHVyaS5yZXBsYWNlKC8mL2csICdcXFxcJicpLCBwa2ddO1xyXG4gICAgYXdhaXQgdGhpcy5zaGVsbChhcmdzKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgYXR0ZW1wdGluZyB0byBzdGFydCBVUkkuIE9yaWdpbmFsIGVycm9yOiAke2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN0YXJ0IHRoZSBwYXJ0aWN1bGFyIHBhY2thZ2Ugb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge29iamVjdH0gc3RhcnRBcHBPcHRpb25zIFt7fV0gLSBTdGFydHVwIG9wdGlvbnMgbWFwcGluZy5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXQgaXMgbWFuZGF0b3J5IHRoYXQgJ2FjdGl2aXR5JyBhbmQgJ3BrZycgcHJvcGVydGllcyBhcmUgc2V0LlxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGRpdGlvbmFsIHN1cHBvcnRlZCBwcm9wZXJ0aWVzIGFyZTogJ3JldHJ5JywgJ3N0b3BBcHAnLCAnd2FpdFBrZydcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kICd3YWl0QWN0aXZpdHknLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBvdXRwdXQgb2YgdGhlIGNvcnJlc3BvbmRpbmcgYWRiIGNvbW1hbmQuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuc3RhcnRBcHAgPSBhc3luYyBmdW5jdGlvbiAoc3RhcnRBcHBPcHRpb25zID0ge30pIHtcclxuICB0cnkge1xyXG4gICAgaWYgKCFzdGFydEFwcE9wdGlvbnMuYWN0aXZpdHkgfHwgIXN0YXJ0QXBwT3B0aW9ucy5wa2cpIHtcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coXCJhY3Rpdml0eSBhbmQgcGtnIGlzIHJlcXVpcmVkIGZvciBsYXVuY2hpbmcgYXBwbGljYXRpb25cIik7XHJcbiAgICB9XHJcbiAgICBzdGFydEFwcE9wdGlvbnMgPSBfLmNsb25lKHN0YXJ0QXBwT3B0aW9ucyk7XHJcbiAgICBzdGFydEFwcE9wdGlvbnMuYWN0aXZpdHkgPSBzdGFydEFwcE9wdGlvbnMuYWN0aXZpdHkucmVwbGFjZSgnJCcsICdcXFxcJCcpO1xyXG5cclxuICAgIC8vIGluaXRpYWxpemluZyBkZWZhdWx0c1xyXG4gICAgXy5kZWZhdWx0cyhzdGFydEFwcE9wdGlvbnMsIHtcclxuICAgICAgd2FpdFBrZzogc3RhcnRBcHBPcHRpb25zLnBrZyxcclxuICAgICAgd2FpdEFjdGl2aXR5OiBmYWxzZSxcclxuICAgICAgcmV0cnk6IHRydWUsXHJcbiAgICAgIHN0b3BBcHA6IHRydWVcclxuICAgIH0pO1xyXG4gICAgLy8gcHJldmVudGluZyBudWxsIHdhaXRwa2dcclxuICAgIHN0YXJ0QXBwT3B0aW9ucy53YWl0UGtnID0gc3RhcnRBcHBPcHRpb25zLndhaXRQa2cgfHwgc3RhcnRBcHBPcHRpb25zLnBrZztcclxuICAgIGxldCBhcGlMZXZlbCA9IGF3YWl0IHRoaXMuZ2V0QXBpTGV2ZWwoKTtcclxuICAgIGxldCBjbWQgPSBidWlsZFN0YXJ0Q21kKHN0YXJ0QXBwT3B0aW9ucywgYXBpTGV2ZWwpO1xyXG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoY21kKTtcclxuICAgIGlmIChzdGRvdXQuaW5kZXhPZihcIkVycm9yOiBBY3Rpdml0eSBjbGFzc1wiKSAhPT0gLTEgJiZcclxuICAgICAgICBzdGRvdXQuaW5kZXhPZihcImRvZXMgbm90IGV4aXN0XCIpICE9PSAtMSkge1xyXG4gICAgICBpZiAoc3RhcnRBcHBPcHRpb25zLnJldHJ5ICYmIHN0YXJ0QXBwT3B0aW9ucy5hY3Rpdml0eVswXSAhPT0gXCIuXCIpIHtcclxuICAgICAgICBsb2cuZGVidWcoXCJXZSB0cmllZCB0byBzdGFydCBhbiBhY3Rpdml0eSB0aGF0IGRvZXNuJ3QgZXhpc3QsIFwiICtcclxuICAgICAgICAgICAgICAgICAgXCJyZXRyeWluZyB3aXRoIC4gcHJlcGVuZGVkIHRvIGFjdGl2aXR5XCIpO1xyXG4gICAgICAgIHN0YXJ0QXBwT3B0aW9ucy5hY3Rpdml0eSA9IGAuJHtzdGFydEFwcE9wdGlvbnMuYWN0aXZpdHl9YDtcclxuICAgICAgICBzdGFydEFwcE9wdGlvbnMucmV0cnkgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydEFwcChzdGFydEFwcE9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvZy5lcnJvckFuZFRocm93KFwiQWN0aXZpdHkgdXNlZCB0byBzdGFydCBhcHAgZG9lc24ndCBleGlzdCBvciBjYW5ub3QgYmUgXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwibGF1bmNoZWQhIE1ha2Ugc3VyZSBpdCBleGlzdHMgYW5kIGlzIGEgbGF1bmNoYWJsZSBhY3Rpdml0eVwiKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzdGRvdXQuaW5kZXhPZihcImphdmEubGFuZy5TZWN1cml0eUV4Y2VwdGlvblwiKSAhPT0gLTEpIHtcclxuICAgICAgLy8gaWYgdGhlIGFwcCBpcyBkaXNhYmxlZCBvbiBhIHJlYWwgZGV2aWNlIGl0IHdpbGwgdGhyb3cgYSBzZWN1cml0eSBleGNlcHRpb25cclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coXCJQZXJtaXNzaW9uIHRvIHN0YXJ0IGFjdGl2aXR5IGRlbmllZC5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RhcnRBcHBPcHRpb25zLndhaXRBY3Rpdml0eSkge1xyXG4gICAgICBhd2FpdCB0aGlzLndhaXRGb3JBY3Rpdml0eShzdGFydEFwcE9wdGlvbnMud2FpdFBrZywgc3RhcnRBcHBPcHRpb25zLndhaXRBY3Rpdml0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBcHBPcHRpb25zLndhaXREdXJhdGlvbik7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIG9jY3VyZWQgd2hpbGUgc3RhcnRpbmcgQXBwLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhY2thZ2VBY3Rpdml0eUluZm9cclxuICogQHByb3BlcnR5IHs/c3RyaW5nfSBhcHBQYWNrYWdlIC0gVGhlIG5hbWUgb2YgYXBwbGljYXRpb24gcGFja2FnZSxcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGV4YW1wbGUgJ2NvbS5hY21lLmFwcCcuXHJcbiAqIEBwcm9wZXJ0eSB7P3N0cmluZ30gYXBwQWN0aXZpdHkgLSBUaGUgbmFtZSBvZiBtYWluIGFwcGxpY2F0aW9uIGFjdGl2aXR5LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5hbWUgb2YgY3VycmVudGx5IGZvY3VzZWQgcGFja2FnZSBhbmQgYWN0aXZpdHkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge1BhY2thZ2VBY3Rpdml0eUluZm99IFRoZSBtYXBwaW5nLCB3aGVyZSBwcm9wZXJ0eSBuYW1lcyBhcmUgJ2FwcFBhY2thZ2UnIGFuZCAnYXBwQWN0aXZpdHknLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgaXMgYW4gZXJyb3Igd2hpbGUgcGFyc2luZyB0aGUgZGF0YS5cclxuICovXHJcbmFwa1V0aWxzTWV0aG9kcy5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGxvZy5kZWJ1ZyhcIkdldHRpbmcgZm9jdXNlZCBwYWNrYWdlIGFuZCBhY3Rpdml0eVwiKTtcclxuICBsZXQgY21kID0gWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ107XHJcbiAgbGV0IG51bGxSZSA9IG5ldyBSZWdFeHAoL21Gb2N1c2VkQXBwPW51bGwvKTtcclxuICBsZXQgc2VhcmNoUmUgPSBuZXcgUmVnRXhwKCdtRm9jdXNlZEFwcC4rUmVjb3JkXFxcXHsuKlxcXFxzKFteXFxcXHNcXFxcL1xcXFx9XSspJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnXFxcXC8oW15cXFxcc1xcXFwvXFxcXH1cXFxcLF0rKVxcXFwsPyhcXFxcc1teXFxcXHNcXFxcL1xcXFx9XSspKlxcXFx9Jyk7IC8vIGh0dHBzOi8vcmVnZXgxMDEuY29tL3IveFo4dkY3LzFcclxuICB0cnkge1xyXG4gICAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoY21kKTtcclxuICAgIGxldCBmb3VuZE51bGxNYXRjaCA9IGZhbHNlO1xyXG4gICAgZm9yIChsZXQgbGluZSBvZiBzdGRvdXQuc3BsaXQoXCJcXG5cIikpIHtcclxuICAgICAgbGV0IGZvdW5kTWF0Y2ggPSBzZWFyY2hSZS5leGVjKGxpbmUpO1xyXG4gICAgICBpZiAoZm91bmRNYXRjaCkge1xyXG4gICAgICAgIHJldHVybiB7YXBwUGFja2FnZTogZm91bmRNYXRjaFsxXS50cmltKCksIGFwcEFjdGl2aXR5OiBmb3VuZE1hdGNoWzJdLnRyaW0oKX07XHJcbiAgICAgIH0gZWxzZSBpZiAobnVsbFJlLnRlc3QobGluZSkpIHtcclxuICAgICAgICBmb3VuZE51bGxNYXRjaCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChmb3VuZE51bGxNYXRjaCkge1xyXG4gICAgICByZXR1cm4ge2FwcFBhY2thZ2U6IG51bGwsIGFwcEFjdGl2aXR5OiBudWxsfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KFwiQ291bGQgbm90IHBhcnNlIGFjdGl2aXR5IGZyb20gZHVtcHN5c1wiKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGdldCBmb2N1c1BhY2thZ2VBbmRBY3Rpdml0eS4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBXYWl0IGZvciB0aGUgZ2l2ZW4gYWN0aXZpdHkgdG8gYmUgZm9jdXNlZC9ub24tZm9jdXNlZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBuYW1lIG9mIHRoZSBwYWNrYWdlIHRvIHdhaXQgZm9yLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aXZpdHkgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aXZpdHksIGJlbG9uZ2luZyB0byB0aGF0IHBhY2thZ2UsXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHdhaXQgZm9yLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHdhaXRGb3JTdG9wIC0gV2hldGhlciB0byB3YWl0IHVudGlsIHRoZSBhY3Rpdml0eSBpcyBmb2N1c2VkICh0cnVlKVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgaXMgbm90IGZvY3VzZWQgKGZhbHNlKS5cclxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXRNcyBbMjAwMDBdIC0gTnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSB0aW1lb3V0IG9jY3Vycy5cclxuICogQHRocm93cyB7ZXJyb3J9IElmIHRpbWVvdXQgaGFwcGVucy5cclxuICovXHJcbmFwa1V0aWxzTWV0aG9kcy53YWl0Rm9yQWN0aXZpdHlPck5vdCA9IGFzeW5jIGZ1bmN0aW9uIChwa2csIGFjdGl2aXR5LCB3YWl0Rm9yU3RvcCwgd2FpdE1zID0gMjAwMDApIHtcclxuICBpZiAoIXBrZyB8fCAhYWN0aXZpdHkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignUGFja2FnZSBhbmQgYWN0aXZpdHkgcmVxdWlyZWQuJyk7XHJcbiAgfVxyXG4gIGxvZy5kZWJ1ZyhgV2FpdGluZyB1cCB0byAke3dhaXRNc31tcyBmb3IgYWN0aXZpdHkgbWF0Y2hpbmcgcGtnOiAnJHtwa2d9JyBhbmQgYCArXHJcbiAgICAgICAgICAgIGBhY3Rpdml0eTogJyR7YWN0aXZpdHl9JyB0byR7d2FpdEZvclN0b3AgPyAnIG5vdCcgOiAnJ30gYmUgZm9jdXNlZGApO1xyXG5cclxuICBjb25zdCBzcGxpdE5hbWVzID0gKG5hbWVzKSA9PiBuYW1lcy5zcGxpdCgnLCcpLm1hcCgobmFtZSkgPT4gbmFtZS50cmltKCkpO1xyXG5cclxuICBjb25zdCBhbGxQYWNrYWdlcyA9IHNwbGl0TmFtZXMocGtnKTtcclxuICBjb25zdCBhbGxBY3Rpdml0aWVzID0gc3BsaXROYW1lcyhhY3Rpdml0eSk7XHJcblxyXG4gIGxldCBwb3NzaWJsZUFjdGl2aXR5TmFtZXMgPSBbXTtcclxuICBmb3IgKGxldCBvbmVBY3Rpdml0eSBvZiBhbGxBY3Rpdml0aWVzKSB7XHJcbiAgICBpZiAob25lQWN0aXZpdHkuc3RhcnRzV2l0aCgnLicpKSB7XHJcbiAgICAgIC8vIGFkZCB0aGUgcGFja2FnZSBuYW1lIGlmIGFjdGl2aXR5IGlzIG5vdCBmdWxsIHF1YWxpZmllZFxyXG4gICAgICBmb3IgKGxldCBjdXJyZW50UGtnIG9mIGFsbFBhY2thZ2VzKSB7XHJcbiAgICAgICAgcG9zc2libGVBY3Rpdml0eU5hbWVzLnB1c2goYCR7Y3VycmVudFBrZ30ke29uZUFjdGl2aXR5fWAucmVwbGFjZSgvXFwuKy9nLCAnLicpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gYWNjZXB0IGZ1bGx5IHF1YWxpZmllZCBhY3Rpdml0eSBuYW1lLlxyXG4gICAgICBwb3NzaWJsZUFjdGl2aXR5TmFtZXMucHVzaChvbmVBY3Rpdml0eSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cclxuICBsb2cuZGVidWcoYFBvc3NpYmxlIGFjdGl2aXRpZXMsIHRvIGJlIGNoZWNrZWQ6ICR7cG9zc2libGVBY3Rpdml0eU5hbWVzLm1hcCgobmFtZSkgPT4gYCcke25hbWV9J2ApLmpvaW4oJywgJyl9YCk7XHJcbiAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuICBsZXQgcG9zc2libGVBY3Rpdml0eVBhdHRlcm5zID0gcG9zc2libGVBY3Rpdml0eU5hbWVzLm1hcCgocG9zc2libGVBY3Rpdml0eU5hbWUpID0+XHJcbiAgICBuZXcgUmVnRXhwKGBeJHtwb3NzaWJsZUFjdGl2aXR5TmFtZS5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuJykucmVwbGFjZSgvXFwqL2csICcuKj8nKS5yZXBsYWNlKC9cXCQvZywgJ1xcXFwkJyl9JGApXHJcbiAgKTtcclxuXHJcbiAgLy8gZmlndXJlIG91dCB0aGUgbnVtYmVyIG9mIHJldHJpZXMuIFRyeSBvbmNlIGlmIHdhaXRNcyBpcyBsZXNzIHRoYXQgNzUwXHJcbiAgLy8gMzAgdGltZXMgaWYgcGFyc2luZyBpcyBub3QgcG9zc2libGVcclxuICBsZXQgcmV0cmllcyA9IHBhcnNlSW50KHdhaXRNcyAvIDc1MCwgMTApIHx8IDE7XHJcbiAgcmV0cmllcyA9IGlzTmFOKHJldHJpZXMpID8gMzAgOiByZXRyaWVzO1xyXG4gIGF3YWl0IHJldHJ5SW50ZXJ2YWwocmV0cmllcywgNzUwLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IHRoaXMuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xyXG4gICAgaWYgKGFwcEFjdGl2aXR5ICYmIGFwcFBhY2thZ2UpIHtcclxuICAgICAgbGV0IGZ1bGx5UXVhbGlmaWVkQWN0aXZpdHkgPSBhcHBBY3Rpdml0eS5zdGFydHNXaXRoKCcuJykgPyBgJHthcHBQYWNrYWdlfSR7YXBwQWN0aXZpdHl9YCA6IGFwcEFjdGl2aXR5O1xyXG4gICAgICBsb2cuZGVidWcoYEZvdW5kIHBhY2thZ2U6ICcke2FwcFBhY2thZ2V9JyBhbmQgZnVsbHkgcXVhbGlmaWVkIGFjdGl2aXR5IG5hbWUgOiAnJHtmdWxseVF1YWxpZmllZEFjdGl2aXR5fSdgKTtcclxuICAgICAgbGV0IGZvdW5kQWN0ID0gKF8uaW5jbHVkZXMoYWxsUGFja2FnZXMsIGFwcFBhY2thZ2UpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICBfLmZpbmRJbmRleChwb3NzaWJsZUFjdGl2aXR5UGF0dGVybnMsIChwb3NzaWJsZVBhdHRlcm4pID0+IHBvc3NpYmxlUGF0dGVybi50ZXN0KGZ1bGx5UXVhbGlmaWVkQWN0aXZpdHkpKSAhPT0gLTEpO1xyXG4gICAgICBpZiAoKCF3YWl0Rm9yU3RvcCAmJiBmb3VuZEFjdCkgfHwgKHdhaXRGb3JTdG9wICYmICFmb3VuZEFjdCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxvZy5kZWJ1ZygnSW5jb3JyZWN0IHBhY2thZ2UgYW5kIGFjdGl2aXR5LiBSZXRyeWluZy4nKTtcclxuICAgIC8qIGpzaGludCBpZ25vcmU6c3RhcnQgKi9cclxuICAgIHRocm93IG5ldyBFcnJvcihgJHtwb3NzaWJsZUFjdGl2aXR5TmFtZXMubWFwKChuYW1lKSA9PiBgJyR7bmFtZX0nYCkuam9pbignIG9yICcpfSBuZXZlciAke3dhaXRGb3JTdG9wID8gJ3N0b3BwZWQnIDogJ3N0YXJ0ZWQnfWApO1xyXG4gICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXYWl0IGZvciB0aGUgZ2l2ZW4gYWN0aXZpdHkgdG8gYmUgZm9jdXNlZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIG5hbWUgb2YgdGhlIHBhY2thZ2UgdG8gd2FpdCBmb3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpdml0eSAtIFRoZSBuYW1lIG9mIHRoZSBhY3Rpdml0eSwgYmVsb25naW5nIHRvIHRoYXQgcGFja2FnZSxcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gd2FpdCBmb3IuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3YWl0TXMgWzIwMDAwXSAtIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgdGltZW91dCBvY2N1cnMuXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiB0aW1lb3V0IGhhcHBlbnMuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMud2FpdEZvckFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKHBrZywgYWN0LCB3YWl0TXMgPSAyMDAwMCkge1xyXG4gIGF3YWl0IHRoaXMud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCBhY3QsIGZhbHNlLCB3YWl0TXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdhaXQgZm9yIHRoZSBnaXZlbiBhY3Rpdml0eSB0byBiZSBub24tZm9jdXNlZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBuYW1lIG9mIHRoZSBwYWNrYWdlIHRvIHdhaXQgZm9yLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aXZpdHkgLSBUaGUgbmFtZSBvZiB0aGUgYWN0aXZpdHksIGJlbG9uZ2luZyB0byB0aGF0IHBhY2thZ2UsXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHdhaXQgZm9yLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdE1zIFsyMDAwMF0gLSBOdW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIHRpbWVvdXQgb2NjdXJzLlxyXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgdGltZW91dCBoYXBwZW5zLlxyXG4gKi9cclxuYXBrVXRpbHNNZXRob2RzLndhaXRGb3JOb3RBY3Rpdml0eSA9IGFzeW5jIGZ1bmN0aW9uIChwa2csIGFjdCwgd2FpdE1zID0gMjAwMDApIHtcclxuICBhd2FpdCB0aGlzLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgYWN0LCB0cnVlLCB3YWl0TXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVuaW5zdGFsbCB0aGUgZ2l2ZW4gcGFja2FnZSBmcm9tIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBuYW1lIG9mIHRoZSBwYWNrYWdlIHRvIGJlIHVuaW5zdGFsbGVkLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYWNrYWdlIHdhcyBmb3VuZCBvbiB0aGUgZGV2aWNlIGFuZFxyXG4gKiAgICAgICAgICAgICAgICAgICBzdWNjZXNzZnVsbHkgdW5pbnN0YWxsZWQuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMudW5pbnN0YWxsQXBrID0gYXN5bmMgZnVuY3Rpb24gKHBrZykge1xyXG4gIGxvZy5kZWJ1ZyhgVW5pbnN0YWxsaW5nICR7cGtnfWApO1xyXG4gIGlmICghYXdhaXQgdGhpcy5pc0FwcEluc3RhbGxlZChwa2cpKSB7XHJcbiAgICBsb2cuaW5mbyhgJHtwa2d9IHdhcyBub3QgdW5pbnN0YWxsZWQsIGJlY2F1c2UgaXQgd2FzIG5vdCBwcmVzZW50IG9uIHRoZSBkZXZpY2VgKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgbGV0IHN0ZG91dDtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgdGhpcy5mb3JjZVN0b3AocGtnKTtcclxuICAgIHN0ZG91dCA9IGF3YWl0IHRoaXMuYWRiRXhlYyhbJ3VuaW5zdGFsbCcsIHBrZ10sIHt0aW1lb3V0OiAyMDAwMH0pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8gdW5pbnN0YWxsIEFQSy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxuICBzdGRvdXQgPSBzdGRvdXQudHJpbSgpO1xyXG4gIGxvZy5kZWJ1ZyhgQURCIGNvbW1hbmQgb3V0cHV0OiAke3N0ZG91dH1gKTtcclxuICBpZiAoc3Rkb3V0LmluZGV4T2YoXCJTdWNjZXNzXCIpICE9PSAtMSkge1xyXG4gICAgbG9nLmluZm8oYCR7cGtnfSB3YXMgc3VjY2Vzc2Z1bGx5IHVuaW5zdGFsbGVkYCk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgbG9nLmluZm8oYCR7cGtnfSB3YXMgbm90IHVuaW5zdGFsbGVkYCk7XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluc3RhbGwgdGhlIHBhY2thZ2UgYWZ0ZXIgaXQgd2FzIHB1c2hlZCB0byB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcGtQYXRoT25EZXZpY2UgLSBUaGUgZnVsbCBwYXRoIHRvIHRoZSBwYWNrYWdlIG9uIHRoZSBkZXZpY2UgZmlsZSBzeXN0ZW0uXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzIFt7fV0gLSBBZGRpdGlvbmFsIGV4ZWMgb3B0aW9ucy4gU2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vYXBwaXVtL25vZGUtdGVlbl9wcm9jZXNzfVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIG1vcmUgZGV0YWlscyBvbiB0aGlzIHBhcmFtZXRlci5cclxuICogQHRocm93cyB7ZXJyb3J9IElmIHRoZXJlIHdhcyBhIGZhaWx1cmUgZHVyaW5nIGFwcGxpY2F0aW9uIGluc3RhbGwuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuaW5zdGFsbEZyb21EZXZpY2VQYXRoID0gYXN5bmMgZnVuY3Rpb24gKGFwa1BhdGhPbkRldmljZSwgb3B0cyA9IHt9KSB7XHJcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoWydwbScsICdpbnN0YWxsJywgJy1yJywgYXBrUGF0aE9uRGV2aWNlXSwgb3B0cyk7XHJcbiAgaWYgKHN0ZG91dC5pbmRleE9mKFwiRmFpbHVyZVwiKSAhPT0gLTEpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBSZW1vdGUgaW5zdGFsbCBmYWlsZWQ6ICR7c3Rkb3V0fWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbnN0YWxsIHRoZSBwYWNrYWdlIGZyb20gdGhlIGxvY2FsIGZpbGUgc3lzdGVtLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBrIC0gVGhlIGZ1bGwgcGF0aCB0byB0aGUgbG9jYWwgcGFja2FnZS5cclxuICogQHBhcmFtIHtib29sZWFufSByZXBhbGNlIFt0cnVlXSAtIFdoZXRoZXIgdG8gcmVwbGFjZSB0aGUgcGFja2FnZSBpZiBpdFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxyZWFkeSBpbnN0YWxsZWQuIFRydWUgYnkgZGVmYXVsdC5cclxuICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXQgWzYwMDAwXSAtIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgdW50aWxcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbGxhdGlvbiBpcyBjb21wbGV0ZWQuXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiBhbiB1bmV4cGVjdGVkIGVycm9yIGhhcHBlbnMgZHVyaW5nIGluc3RhbGwuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuaW5zdGFsbCA9IGFzeW5jIGZ1bmN0aW9uIChhcGssIHJlcGxhY2UgPSB0cnVlLCB0aW1lb3V0ID0gNjAwMDApIHtcclxuICBpZiAocmVwbGFjZSkge1xyXG4gICAgYXdhaXQgdGhpcy5hZGJFeGVjKFsnaW5zdGFsbCcsICctcicsIGFwa10sIHt0aW1lb3V0fSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuYWRiRXhlYyhbJ2luc3RhbGwnLCBhcGtdLCB7dGltZW91dH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIC8vIG9uIHNvbWUgc3lzdGVtcyB0aGlzIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGFwcCBhbHJlYWR5XHJcbiAgICAgIC8vIGV4aXN0c1xyXG4gICAgICBpZiAoZXJyLm1lc3NhZ2UuaW5kZXhPZignSU5TVEFMTF9GQUlMRURfQUxSRUFEWV9FWElTVFMnKSA9PT0gLTEpIHtcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH1cclxuICAgICAgbG9nLmRlYnVnKGBBcHBsaWNhdGlvbiAnJHthcGt9JyBhbHJlYWR5IGluc3RhbGxlZC4gQ29udGludWluZy5gKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSW5zdGFsbCB0aGUgcGFja2FnZSBmcm9tIHRoZSBsb2NhbCBmaWxlIHN5c3RlbSBvZiB1cGdyYWRlIGl0IGlmIGFuIG9sZGVyXHJcbiAqIHZlcnNpb24gb2YgdGhlIHNhbWUgcGFja2FnZSBpcyBhbHJlYWR5IGluc3RhbGxlZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGxvY2FsIHBhY2thZ2UuXHJcbiAqIEBwYXJhbSB7P3N0cmluZ30gcGtnIC0gVGhlIG5hbWUgb2YgdGhlIGluc3RhbGxlZCBwYWNrYWdlLiBUaGUgbWV0aG9kIHdpbGxcclxuICogICAgICAgICAgICAgICAgICAgICAgICBwZXJmb3JtIGZhc3RlciBpZiBpdCBpcyBzZXQuXHJcbiAqIEBwYXJhbSB7P251bWJlcn0gdGltZW91dCBbNjAwMDBdIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCB1bnRpbFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFsbGF0aW9uIGlzIGNvbXBsZXRlZC5cclxuICogQHRocm93cyB7ZXJyb3J9IElmIGFuIHVuZXhwZWN0ZWQgZXJyb3IgaGFwcGVucyBkdXJpbmcgaW5zdGFsbC5cclxuICovXHJcbmFwa1V0aWxzTWV0aG9kcy5pbnN0YWxsT3JVcGdyYWRlID0gYXN5bmMgZnVuY3Rpb24gKGFwaywgcGtnID0gbnVsbCwgdGltZW91dCA9IDYwMDAwKSB7XHJcbiAgbGV0IGFwa0luZm8gPSBudWxsO1xyXG4gIGlmICghcGtnKSB7XHJcbiAgICBhcGtJbmZvID0gYXdhaXQgdGhpcy5nZXRBcGtJbmZvKGFwayk7XHJcbiAgICBwa2cgPSBhcGtJbmZvLm5hbWU7XHJcbiAgfVxyXG4gIGlmICghcGtnKSB7XHJcbiAgICBsb2cud2FybihgQ2Fubm90IHJlYWQgdGhlIHBhY2thZ2UgbmFtZSBvZiAke2Fwa30uIEFzc3VtaW5nIGNvcnJlY3QgYXBwIHZlcnNpb24gaXMgYWxyZWFkeSBpbnN0YWxsZWRgKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmICghYXdhaXQgdGhpcy5pc0FwcEluc3RhbGxlZChwa2cpKSB7XHJcbiAgICBsb2cuZGVidWcoYEFwcCAnJHthcGt9JyBub3QgaW5zdGFsbGVkLiBJbnN0YWxsaW5nYCk7XHJcbiAgICBhd2FpdCB0aGlzLmluc3RhbGwoYXBrLCBmYWxzZSwgdGltZW91dCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBwa2dJbmZvID0gYXdhaXQgdGhpcy5nZXRQYWNrYWdlSW5mbyhwa2cpO1xyXG4gIGNvbnN0IHBrZ1ZlcnNpb25Db2RlID0gcGtnSW5mby52ZXJzaW9uQ29kZTtcclxuICBpZiAoIWFwa0luZm8pIHtcclxuICAgIGFwa0luZm8gPSBhd2FpdCB0aGlzLmdldEFwa0luZm8oYXBrKTtcclxuICB9XHJcbiAgY29uc3QgYXBrVmVyc2lvbkNvZGUgPSBhcGtJbmZvLnZlcnNpb25Db2RlO1xyXG5cclxuICBpZiAoXy5pc1VuZGVmaW5lZChhcGtWZXJzaW9uQ29kZSkgfHwgXy5pc1VuZGVmaW5lZChwa2dWZXJzaW9uQ29kZSkpIHtcclxuICAgIGxvZy53YXJuKGBDYW5ub3QgcmVhZCB2ZXJzaW9uIGNvZGVzIG9mICcke2Fwa30nIGFuZC9vciAnJHtwa2d9Jy4gQXNzdW1pbmcgY29ycmVjdCBhcHAgdmVyc2lvbiBpcyBhbHJlYWR5IGluc3RhbGxlZGApO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBpZiAocGtnVmVyc2lvbkNvZGUgPj0gYXBrVmVyc2lvbkNvZGUpIHtcclxuICAgIGxvZy5kZWJ1ZyhgVGhlIGluc3RhbGxlZCAnJHtwa2d9JyBwYWNrYWdlIGRvZXMgbm90IHJlcXVpcmUgdXBncmFkZSAoJHtwa2dWZXJzaW9uQ29kZX0gPj0gJHthcGtWZXJzaW9uQ29kZX0pYCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGxvZy5kZWJ1ZyhgVGhlIGluc3RhbGxlZCAnJHtwa2d9JyBwYWNrYWdlIGlzIG9sZGVyIHRoYW4gJyR7YXBrfScgKCR7cGtnVmVyc2lvbkNvZGV9IDwgJHthcGtWZXJzaW9uQ29kZX0pLiBgICtcclxuICAgICAgICAgICAgYEV4ZWN1dGluZyB1cGdyYWRlYCk7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHRoaXMuaW5zdGFsbChhcGssIHRydWUsIHRpbWVvdXQpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbG9nLndhcm4oYENhbm5vdCB1cGdyYWRlICcke3BrZ30nIGJlY2F1c2Ugb2YgJyR7ZXJyLm1lc3NhZ2V9Jy4gVHJ5aW5nIGZ1bGwgcmVpbnN0YWxsYCk7XHJcbiAgICBpZiAoIWF3YWl0IHRoaXMudW5pbnN0YWxsQXBrKHBrZykpIHtcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYCcke3BrZ30nIHBhY2thZ2UgY2Fubm90IGJlIHVuaW5zdGFsbGVkYCk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLmluc3RhbGwoYXBrLCBmYWxzZSwgdGltZW91dCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3Qgc3RyaW5nIHJlc291cmNlcyBmcm9tIHRoZSBnaXZlbiBwYWNrYWdlIG9uIGxvY2FsIGZpbGUgc3lzdGVtLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBrIC0gVGhlIGZ1bGwgcGF0aCB0byB0aGUgbG9jYWwgcGFja2FnZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIC0gVGhlIG5hbWUgb2YgdGhlIGxhbmd1YWdlIHRvIGV4dHJhY3QgdGhlIHJlc291cmNlcyBmb3IuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBvdXQgLSBUaGUgbmFtZSBvZiB0aGUgZGVzdGluYXRpb24gZm9sZGVyIG9uIHRoZSBsb2NhbCBmaWxlIHN5c3RlbSB0b1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUgdGhlIGV4dHJhY3RlZCBmaWxlIHRvLlxyXG4gKiBAcmV0dXJuIHtvYmplY3R9IEEgbWFwcGluZyBvYmplY3QsIHdoZXJlIHByb3BlcnRpZXMgYXJlOiAnYXBrU3RyaW5ncycsIGNvbnRhaW5pbmdcclxuICogICAgICAgICAgICAgICAgICBwYXJzZWQgcmVzb3VyY2UgZmlsZSByZXByZXNlbnRlZCBhcyBKU09OIG9iamVjdCwgYW5kICdsb2NhbFBhdGgnLFxyXG4gKiAgICAgICAgICAgICAgICAgIGNvbnRhaW5pbmcgdGhlIHBhdGggdG8gdGhlIGV4dHJhY3RlZCBmaWxlIG9uIHRoZSBsb2NhbCBmaWxlIHN5c3RlbS5cclxuICovXHJcbmFwa1V0aWxzTWV0aG9kcy5leHRyYWN0U3RyaW5nc0Zyb21BcGsgPSBhc3luYyBmdW5jdGlvbiAoYXBrLCBsYW5ndWFnZSwgb3V0KSB7XHJcbiAgbG9nLmRlYnVnKGBFeHRyYWN0aW5nIHN0cmluZ3MgZm9yIGxhbmd1YWdlOiAke2xhbmd1YWdlIHx8IFwiZGVmYXVsdFwifWApO1xyXG4gIGxldCBzdHJpbmdzSnNvbiA9ICdzdHJpbmdzLmpzb24nO1xyXG4gIGxldCBsb2NhbFBhdGg7XHJcbiAgaWYgKCFsYW5ndWFnZSkge1xyXG4gICAgbGFuZ3VhZ2UgPSBhd2FpdCB0aGlzLmdldERldmljZUxhbmd1YWdlKCk7XHJcbiAgfVxyXG4gIGxldCBhcGtUb29scyA9IHRoaXMuamFyc1snYXBwaXVtX2Fwa190b29scy5qYXInXTtcclxuICBsZXQgYXJncyA9IFsnLWphcicsIGFwa1Rvb2xzLCAnc3RyaW5nc0Zyb21BcGsnLCBhcGssIG91dCwgbGFuZ3VhZ2VdO1xyXG4gIGxldCBmaWxlRGF0YSwgYXBrU3RyaW5ncztcclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXhlYygnamF2YScsIGFyZ3MpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5kZWJ1ZyhgTm8gc3RyaW5ncy54bWwgZm9yIGxhbmd1YWdlICcke2xhbmd1YWdlfScsIGdldHRpbmcgZGVmYXVsdCBgICtcclxuICAgICAgICAgICAgICBgc3RyaW5ncy54bWxgKTtcclxuICAgIGFyZ3MucG9wKCk7XHJcbiAgICBhd2FpdCBleGVjKCdqYXZhJywgYXJncyk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgbG9nLmRlYnVnKFwiUmVhZGluZyBzdHJpbmdzIGZyb20gY29udmVydGVkIHN0cmluZ3MuanNvblwiKTtcclxuICAgIGxvY2FsUGF0aCA9IHBhdGguam9pbihvdXQsIHN0cmluZ3NKc29uKTtcclxuICAgIGZpbGVEYXRhID0gYXdhaXQgZnMucmVhZEZpbGUobG9jYWxQYXRoLCAndXRmOCcpO1xyXG4gICAgYXBrU3RyaW5ncyA9IEpTT04ucGFyc2UoZmlsZURhdGEpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGlmIChmaWxlRGF0YSkge1xyXG4gICAgICBsb2cuZGVidWcoYENvbnRlbnQgc3RhcnRlZCB3aXRoOiAke2ZpbGVEYXRhLnNsaWNlKDAsIDMwMCl9YCk7XHJcbiAgICB9XHJcbiAgICBsZXQgbXNnID0gYENvdWxkIG5vdCBwYXJzZSBzdHJpbmdzIGZyb20gc3RyaW5ncy5qc29uLiBPcmlnaW5hbCBgICtcclxuICAgICAgICAgICAgICBgZXJyb3I6ICR7ZS5tZXNzYWdlfWA7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhtc2cpO1xyXG4gIH1cclxuICByZXR1cm4ge2Fwa1N0cmluZ3MsIGxvY2FsUGF0aH07XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBsYW5ndWFnZSBuYW1lIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgbmFtZSBvZiBkZXZpY2UgbGFuZ3VhZ2UuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuZ2V0RGV2aWNlTGFuZ3VhZ2UgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGxhbmd1YWdlO1xyXG4gIGlmIChhd2FpdCB0aGlzLmdldEFwaUxldmVsKCkgPCAyMykge1xyXG4gICAgbGFuZ3VhZ2UgPSBhd2FpdCB0aGlzLmdldERldmljZVN5c0xhbmd1YWdlKCk7XHJcbiAgICBpZiAoIWxhbmd1YWdlKSB7XHJcbiAgICAgIGxhbmd1YWdlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9kdWN0TGFuZ3VhZ2UoKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgbGFuZ3VhZ2UgPSAoYXdhaXQgdGhpcy5nZXREZXZpY2VMb2NhbGUoKSkuc3BsaXQoXCItXCIpWzBdO1xyXG4gIH1cclxuICByZXR1cm4gbGFuZ3VhZ2U7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBsYW5ndWFnZSBuYW1lIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIC0gVGhlIG5hbWUgb2YgdGhlIG5ldyBkZXZpY2UgbGFuZ3VhZ2UuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuc2V0RGV2aWNlTGFuZ3VhZ2UgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcclxuICAvLyB0aGlzIG1ldGhvZCBpcyBvbmx5IHVzZWQgaW4gQVBJIDwgMjNcclxuICBhd2FpdCB0aGlzLnNldERldmljZVN5c0xhbmd1YWdlKGxhbmd1YWdlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGNvdW50cnkgbmFtZSBvZiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIG5hbWUgb2YgZGV2aWNlIGNvdW50cnkuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuZ2V0RGV2aWNlQ291bnRyeSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAvLyB0aGlzIG1ldGhvZCBpcyBvbmx5IHVzZWQgaW4gQVBJIDwgMjNcclxuICBsZXQgY291bnRyeSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlU3lzQ291bnRyeSgpO1xyXG4gIGlmICghY291bnRyeSkge1xyXG4gICAgY291bnRyeSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvZHVjdENvdW50cnkoKTtcclxuICB9XHJcbiAgcmV0dXJuIGNvdW50cnk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBjb3VudHJ5IG5hbWUgb2YgdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY291bnRyeSAtIFRoZSBuYW1lIG9mIHRoZSBuZXcgZGV2aWNlIGNvdW50cnkuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuc2V0RGV2aWNlQ291bnRyeSA9IGFzeW5jIGZ1bmN0aW9uIChjb3VudHJ5KSB7XHJcbiAgLy8gdGhpcyBtZXRob2QgaXMgb25seSB1c2VkIGluIEFQSSA8IDIzXHJcbiAgYXdhaXQgdGhpcy5zZXREZXZpY2VTeXNDb3VudHJ5KGNvdW50cnkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbG9jYWxlIG5hbWUgb2YgdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBuYW1lIG9mIGRldmljZSBsb2NhbGUuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuZ2V0RGV2aWNlTG9jYWxlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIC8vIHRoaXMgbWV0aG9kIGlzIG9ubHkgdXNlZCBpbiBBUEkgPj0gMjNcclxuICBsZXQgbG9jYWxlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VTeXNMb2NhbGUoKTtcclxuICBpZiAoIWxvY2FsZSkge1xyXG4gICAgbG9jYWxlID0gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9kdWN0TG9jYWxlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBsb2NhbGU7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBsb2NhbGUgbmFtZSBvZiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QgYW5kIHRoZSBmb3JtYXQgb2YgdGhlIGxvY2FsZSBpcyBlbi1VUywgZm9yIGV4YW1wbGUuXHJcbiAqIFRoaXMgbWV0aG9kIGNhbGwgc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5LCBzbywgcGxlYXNlIHVzZSBzZXREZXZpY2VMYW5ndWFnZUNvdW50cnkgYXMgcG9zc2libGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGUgLSBOYW1lcyBvZiB0aGUgZGV2aWNlIGxhbmd1YWdlIGFuZCB0aGUgY291bnRyeSBjb25uZWN0ZWQgd2l0aCBgLWAuIGUuZy4gZW4tVVMuXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuc2V0RGV2aWNlTG9jYWxlID0gYXN5bmMgZnVuY3Rpb24gKGxvY2FsZSkge1xyXG4gIGNvbnN0IHZhbGlkYXRlTG9jYWxlID0gbmV3IFJlZ0V4cCgvW2EtekEtWl0rLVthLXpBLVowLTldKy8pO1xyXG4gIGlmICghdmFsaWRhdGVMb2NhbGUudGVzdChsb2NhbGUpKSB7XHJcbiAgICBsb2cud2Fybihgc2V0RGV2aWNlTG9jYWxlIHJlcXVpcmVzIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiBlbi1VUyBvciBqYS1KUGApO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgbGV0IHNwbGl0X2xvY2FsZSA9IGxvY2FsZS5zcGxpdChcIi1cIik7XHJcbiAgYXdhaXQgdGhpcy5zZXREZXZpY2VMYW5ndWFnZUNvdW50cnkoc3BsaXRfbG9jYWxlWzBdLCBzcGxpdF9sb2NhbGVbMV0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1ha2Ugc3VyZSBjdXJyZW50IGRldmljZSBsb2NhbGUgaXMgZXhwZWN0ZWQgb3Igbm90LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgLSBMYW5ndWFnZS4gVGhlIGxhbmd1YWdlIGZpZWxkIGlzIGNhc2UgaW5zZW5zaXRpdmUsIGJ1dCBMb2NhbGUgYWx3YXlzIGNhbm9uaWNhbGl6ZXMgdG8gbG93ZXIgY2FzZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50cnkgLSBDb3VudHJ5LiBUaGUgbGFuZ3VhZ2UgZmllbGQgaXMgY2FzZSBpbnNlbnNpdGl2ZSwgYnV0IExvY2FsZSBhbHdheXMgY2Fub25pY2FsaXplcyB0byBsb3dlciBjYXNlLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBJZiBjdXJyZW50IGxvY2FsZSBpcyBsYW5ndWFnZSBhbmQgY291bnRyeSBhcyBhcmd1bWVudHMsIHJldHVybiB0cnVlLlxyXG4gKi9cclxuYXBrVXRpbHNNZXRob2RzLmVuc3VyZUN1cnJlbnRMb2NhbGUgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UsIGNvdW50cnkpIHtcclxuICBsZXQgaGFzTGFuZ3VhZ2UgPSBfLmlzU3RyaW5nKGxhbmd1YWdlKTtcclxuICBsZXQgaGFzQ291bnRyeSA9IF8uaXNTdHJpbmcoY291bnRyeSk7XHJcblxyXG4gIGlmICghaGFzTGFuZ3VhZ2UgJiYgIWhhc0NvdW50cnkpIHtcclxuICAgIGxvZy53YXJuKCdlbnN1cmVDdXJyZW50TG9jYWxlIHJlcXVpcmVzIGxhbmd1YWdlIG9yIGNvdW50cnknKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxvd0xhbmd1YWdlID0gKGxhbmd1YWdlIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGxvd0NvdW50cnkgPSAoY291bnRyeSB8fCAnJykudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgaWYgKGF3YWl0IHRoaXMuZ2V0QXBpTGV2ZWwoKSA8IDIzKSB7XHJcbiAgICBsZXQgY3VyTGFuZ3VhZ2UsIGN1ckNvdW50cnk7XHJcbiAgICBpZiAoaGFzTGFuZ3VhZ2UpIHtcclxuICAgICAgY3VyTGFuZ3VhZ2UgPSAoYXdhaXQgdGhpcy5nZXREZXZpY2VMYW5ndWFnZSgpKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBpZiAoIWhhc0NvdW50cnkgJiYgbG93TGFuZ3VhZ2UgPT09IGN1ckxhbmd1YWdlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChoYXNDb3VudHJ5KSB7XHJcbiAgICAgIGN1ckNvdW50cnkgPSAoYXdhaXQgdGhpcy5nZXREZXZpY2VDb3VudHJ5KCkpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGlmICghaGFzTGFuZ3VhZ2UgJiYgbG93Q291bnRyeSA9PT0gY3VyQ291bnRyeSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobG93TGFuZ3VhZ2UgPT09IGN1ckxhbmd1YWdlICYmIGxvd0NvdW50cnkgPT09IGN1ckNvdW50cnkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IGN1ckxvY2FsZSA9IChhd2FpdCB0aGlzLmdldERldmljZUxvY2FsZSgpKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKGAke2xvd0xhbmd1YWdlfS0ke2xvd0NvdW50cnl9YCA9PT0gY3VyTG9jYWxlKSAge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbG9jYWxlIG5hbWUgb2YgdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgLSBMYW5ndWFnZS4gVGhlIGxhbmd1YWdlIGZpZWxkIGlzIGNhc2UgaW5zZW5zaXRpdmUsIGJ1dCBMb2NhbGUgYWx3YXlzIGNhbm9uaWNhbGl6ZXMgdG8gbG93ZXIgY2FzZS5cclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBbYS16QS1aXXsyLDh9LiBlLmcuIGVuLCBqYSA6IGh0dHBzOi8vZGV2ZWxvcGVyLmFuZHJvaWQuY29tL3JlZmVyZW5jZS9qYXZhL3V0aWwvTG9jYWxlLmh0bWxcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50cnkgLSBDb3VudHJ5LiBUaGUgY291bnRyeSAocmVnaW9uKSBmaWVsZCBpcyBjYXNlIGluc2Vuc2l0aXZlLCBidXQgTG9jYWxlIGFsd2F5cyBjYW5vbmljYWxpemVzIHRvIHVwcGVyIGNhc2UuXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogW2EtekEtWl17Mn0gfCBbMC05XXszfS4gZS5nLiBVUywgSlAgOiBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvamF2YS91dGlsL0xvY2FsZS5odG1sXHJcbiAqL1xyXG5hcGtVdGlsc01ldGhvZHMuc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5ID0gYXN5bmMgZnVuY3Rpb24gKGxhbmd1YWdlLCBjb3VudHJ5KSB7XHJcbiAgbGV0IGhhc0xhbmd1YWdlID0gbGFuZ3VhZ2UgJiYgXy5pc1N0cmluZyhsYW5ndWFnZSk7XHJcbiAgbGV0IGhhc0NvdW50cnkgPSBjb3VudHJ5ICYmIF8uaXNTdHJpbmcoY291bnRyeSk7XHJcbiAgaWYgKCFoYXNMYW5ndWFnZSAmJiAhaGFzQ291bnRyeSkge1xyXG4gICAgbG9nLndhcm4oYHNldERldmljZUxhbmd1YWdlQ291bnRyeSByZXF1aXJlcyBsYW5ndWFnZSBvciBjb3VudHJ5LmApO1xyXG4gICAgbG9nLndhcm4oYEdvdCBsYW5ndWFnZTogJyR7bGFuZ3VhZ2V9JyBhbmQgY291bnRyeTogJyR7Y291bnRyeX0nYCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGxldCB3YXNTZXR0aW5nQ2hhbmdlZCA9IGZhbHNlO1xyXG4gIGxldCBhcGlMZXZlbCA9IGF3YWl0IHRoaXMuZ2V0QXBpTGV2ZWwoKTtcclxuXHJcbiAgbGFuZ3VhZ2UgPSAobGFuZ3VhZ2UgfHwgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY291bnRyeSA9IChjb3VudHJ5IHx8ICcnKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICBpZiAoYXBpTGV2ZWwgPCAyMykge1xyXG4gICAgbGV0IGN1ckxhbmd1YWdlID0gKGF3YWl0IHRoaXMuZ2V0RGV2aWNlTGFuZ3VhZ2UoKSkudG9Mb3dlckNhc2UoKTtcclxuICAgIGxldCBjdXJDb3VudHJ5ID0gKGF3YWl0IHRoaXMuZ2V0RGV2aWNlQ291bnRyeSgpKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgaWYgKGhhc0xhbmd1YWdlICYmIGxhbmd1YWdlICE9PSBjdXJMYW5ndWFnZSkge1xyXG4gICAgICBhd2FpdCB0aGlzLnNldERldmljZUxhbmd1YWdlKGxhbmd1YWdlKTtcclxuICAgICAgd2FzU2V0dGluZ0NoYW5nZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGhhc0NvdW50cnkgJiYgY291bnRyeSAhPT0gY3VyQ291bnRyeSkge1xyXG4gICAgICBhd2FpdCB0aGlzLnNldERldmljZUNvdW50cnkoY291bnRyeSk7XHJcbiAgICAgIHdhc1NldHRpbmdDaGFuZ2VkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGN1ckxvY2FsZSA9IGF3YWl0IHRoaXMuZ2V0RGV2aWNlTG9jYWxlKCk7XHJcblxyXG4gICAgaWYgKGFwaUxldmVsID09PSAyMykge1xyXG4gICAgICBsZXQgbG9jYWxlO1xyXG4gICAgICBpZiAoIWhhc0NvdW50cnkpIHtcclxuICAgICAgICBsb2NhbGUgPSBsYW5ndWFnZTtcclxuICAgICAgfSBlbHNlIGlmICghaGFzTGFuZ3VhZ2UpIHtcclxuICAgICAgICBsb2NhbGUgPSBjb3VudHJ5O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxvY2FsZSA9IGAke2xhbmd1YWdlfS0ke2NvdW50cnl9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG9nLmRlYnVnKGBDdXJyZW50IGxvY2FsZTogJyR7Y3VyTG9jYWxlfSc7IHJlcXVlc3RlZCBsb2NhbGU6ICcke2xvY2FsZX0nYCk7XHJcbiAgICAgIGlmIChsb2NhbGUudG9Mb3dlckNhc2UoKSAhPT0gY3VyTG9jYWxlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldERldmljZVN5c0xvY2FsZShsb2NhbGUpO1xyXG4gICAgICAgIHdhc1NldHRpbmdDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHsgLy8gQVBJID49IDI0XHJcbiAgICAgIGlmICghaGFzQ291bnRyeSB8fCAhaGFzTGFuZ3VhZ2UpIHtcclxuICAgICAgICBsb2cud2Fybihgc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5IHJlcXVpcmVzIGJvdGggbGFuZ3VhZ2UgYW5kIGNvdW50cnkgdG8gYmUgc2V0IGZvciBBUEkgMjQrYCk7XHJcbiAgICAgICAgbG9nLndhcm4oYEdvdCBsYW5ndWFnZTogJyR7bGFuZ3VhZ2V9JyBhbmQgY291bnRyeTogJyR7Y291bnRyeX0nYCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsb2cuZGVidWcoYEN1cnJlbnQgbG9jYWxlOiAnJHtjdXJMb2NhbGV9JzsgcmVxdWVzdGVkIGxvY2FsZTogJyR7bGFuZ3VhZ2V9LSR7Y291bnRyeX0nYCk7XHJcbiAgICAgIGlmIChgJHtsYW5ndWFnZX0tJHtjb3VudHJ5fWAudG9Mb3dlckNhc2UoKSAhPT0gY3VyTG9jYWxlLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnNldERldmljZVN5c0xvY2FsZVZpYVNldHRpbmdBcHAobGFuZ3VhZ2UsIGNvdW50cnkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAod2FzU2V0dGluZ0NoYW5nZWQpIHtcclxuICAgIGxvZy5pbmZvKFwiUmVib290aW5nIHRoZSBkZXZpY2UgaW4gb3JkZXIgdG8gYXBwbHkgbmV3IGxvY2FsZSB2aWEgJ3NldHRpbmcgcGVyc2lzdC5zeXMubG9jYWxlJyBjb21tYW5kLlwiKTtcclxuICAgIGF3YWl0IHRoaXMucmVib290KCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgcGFja2FnZSBuYW1lIGZyb20gbG9jYWwgYXBrIGZpbGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhcGsgLSBUaGUgZnVsbCBwYXRoIHRvIGV4aXN0aW5nIC5hcGsgcGFja2FnZSBvbiB0aGUgbG9jYWxcclxuICogICAgICAgICAgICAgICAgICAgICAgIGZpbGUgc3lzdGVtLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwYXJzZWQgcGFja2FnZSBuYW1lIG9yIF9udWxsXyBpZiBpdCBjYW5ub3QgYmUgcGFyc2VkLlxyXG4gKi9cclxuYXBrVXRpbHNNZXRob2RzLmdldFBhY2thZ2VOYW1lID0gYXN5bmMgZnVuY3Rpb24gKGFwaykge1xyXG4gIGxldCBhcmdzID0gWydkdW1wJywgJ2JhZGdpbmcnLCBhcGtdO1xyXG4gIGF3YWl0IHRoaXMuaW5pdEFhcHQoKTtcclxuICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKHRoaXMuYmluYXJpZXMuYWFwdCwgYXJncyk7XHJcbiAgbGV0IGFwa1BhY2thZ2UgPSBuZXcgUmVnRXhwKC9wYWNrYWdlOiBuYW1lPScoW14nXSspJy9nKS5leGVjKHN0ZG91dCk7XHJcbiAgaWYgKGFwa1BhY2thZ2UgJiYgYXBrUGFja2FnZS5sZW5ndGggPj0gMikge1xyXG4gICAgYXBrUGFja2FnZSA9IGFwa1BhY2thZ2VbMV07XHJcbiAgfSBlbHNlIHtcclxuICAgIGFwa1BhY2thZ2UgPSBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gYXBrUGFja2FnZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7T2JqY2V0fSBBcHBJbmZvXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lIC0gUGFja2FnZSBuYW1lLCBmb3IgZXhhbXBsZSAnY29tLmFjbWUuYXBwJy5cclxuICogQHByb3BlcnR5IHtudW1iZXJ9IHZlcnNpb25Db2RlIC0gVmVyc2lvbiBjb2RlLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdmVyc2lvbk5hbWUgLSBWZXJzaW9uIG5hbWUsIGZvciBleGFtcGxlICcxLjAnLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBhY2thZ2UgaW5mbyBmcm9tIGxvY2FsIGFwayBmaWxlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBrUGF0aCAtIFRoZSBmdWxsIHBhdGggdG8gZXhpc3RpbmcgLmFwayBwYWNrYWdlIG9uIHRoZSBsb2NhbFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUgc3lzdGVtLlxyXG4gKiBAcmV0dXJuIHs/QXBwSW5mb30gVGhlIHBhcnNlZCBhcHBsaWNhdGlvbiBpbmZvcm1hdGlvbi5cclxuICovXHJcbmFwa1V0aWxzTWV0aG9kcy5nZXRBcGtJbmZvID0gYXN5bmMgZnVuY3Rpb24gKGFwa1BhdGgpIHtcclxuICBpZiAoIWF3YWl0IGZzLmV4aXN0cyhhcGtQYXRoKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFRoZSBmaWxlIGF0IHBhdGggJHthcGtQYXRofSBkb2VzIG5vdCBleGlzdCBvciBpcyBub3QgYWNjZXNzaWJsZWApO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmluaXRBYXB0KCk7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmJpbmFyaWVzLmFhcHQsIFsnZCcsICdiYWRnaW5nJywgYXBrUGF0aF0pO1xyXG4gICAgY29uc3QgbWF0Y2hlcyA9IG5ldyBSZWdFeHAoL3BhY2thZ2U6IG5hbWU9JyhbXiddKyknIHZlcnNpb25Db2RlPScoXFxkKyknIHZlcnNpb25OYW1lPScoW14nXSspJy8pLmV4ZWMoc3Rkb3V0KTtcclxuICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogbWF0Y2hlc1sxXSxcclxuICAgICAgICB2ZXJzaW9uQ29kZTogcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApLFxyXG4gICAgICAgIHZlcnNpb25OYW1lOiBtYXRjaGVzWzNdXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBsb2cud2FybihgRXJyb3IgXCIke2Vyci5tZXNzYWdlfVwiIHdoaWxlIGdldHRpbmcgYmFkZ2luZyBpbmZvYCk7XHJcbiAgfVxyXG4gIHJldHVybiB7fTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBhY2thZ2UgaW5mbyBmcm9tIHRoZSBpbnN0YWxsZWQgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwa2cgLSBUaGUgbmFtZSBvZiB0aGUgaW5zdGFsbGVkIHBhY2thZ2UuXHJcbiAqIEByZXR1cm4gez9BcHBJbmZvfSBUaGUgcGFyc2VkIGFwcGxpY2F0aW9uIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuYXBrVXRpbHNNZXRob2RzLmdldFBhY2thZ2VJbmZvID0gYXN5bmMgZnVuY3Rpb24gKHBrZykge1xyXG4gIGxvZy5kZWJ1ZyhgR2V0dGluZyBwYWNrYWdlIGluZm8gZm9yICR7cGtnfWApO1xyXG4gIGxldCByZXN1bHQgPSB7bmFtZTogcGtnfTtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ2R1bXBzeXMnLCAncGFja2FnZScsIHBrZ10pO1xyXG4gICAgY29uc3QgdmVyc2lvbk5hbWVNYXRjaCA9IG5ldyBSZWdFeHAoL3ZlcnNpb25OYW1lPShbXFxkK1xcLl0rKS8pLmV4ZWMoc3Rkb3V0KTtcclxuICAgIGlmICh2ZXJzaW9uTmFtZU1hdGNoKSB7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uTmFtZSA9IHZlcnNpb25OYW1lTWF0Y2hbMV07XHJcbiAgICB9XHJcbiAgICBjb25zdCB2ZXJzaW9uQ29kZU1hdGNoID0gbmV3IFJlZ0V4cCgvdmVyc2lvbkNvZGU9KFxcZCspLykuZXhlYyhzdGRvdXQpO1xyXG4gICAgaWYgKHZlcnNpb25Db2RlTWF0Y2gpIHtcclxuICAgICAgcmVzdWx0LnZlcnNpb25Db2RlID0gcGFyc2VJbnQodmVyc2lvbkNvZGVNYXRjaFsxXSwgMTApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZy53YXJuKGBFcnJvciBcIiR7ZXJyLm1lc3NhZ2V9XCIgd2hpbGUgZHVtcGluZyBwYWNrYWdlIGluZm9gKTtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwa1V0aWxzTWV0aG9kcztcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
