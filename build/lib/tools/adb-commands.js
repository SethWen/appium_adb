'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _helpersJs = require('../helpers.js');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumSupport = require('appium-support');

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _logcat = require('../logcat');

var _logcat2 = _interopRequireDefault(_logcat);

var _asyncbox = require('asyncbox');

var _teen_process = require('teen_process');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var SETTINGS_HELPER_ID = 'io.appium.settings';
var WIFI_CONNECTION_SETTING_RECEIVER = SETTINGS_HELPER_ID + '/.receivers.WiFiConnectionSettingReceiver';
var WIFI_CONNECTION_SETTING_ACTION = SETTINGS_HELPER_ID + '.wifi';
var DATA_CONNECTION_SETTING_RECEIVER = SETTINGS_HELPER_ID + '/.receivers.DataConnectionSettingReceiver';
var DATA_CONNECTION_SETTING_ACTION = SETTINGS_HELPER_ID + '.data_connection';
var ANIMATION_SETTING_RECEIVER = SETTINGS_HELPER_ID + '/.receivers.AnimationSettingReceiver';
var ANIMATION_SETTING_ACTION = SETTINGS_HELPER_ID + '.animation';
var LOCALE_SETTING_RECEIVER = SETTINGS_HELPER_ID + '/.receivers.LocaleSettingReceiver';
var LOCALE_SETTING_ACTION = SETTINGS_HELPER_ID + '.locale';
var LOCATION_SERVICE = SETTINGS_HELPER_ID + '/.LocationService';
var MAX_SHELL_BUFFER_LENGTH = 1000;

var methods = {};

/**
 * Get the path to adb executable amd assign it
 * to this.executable.path and this.binaries.adb properties.
 *
 * @return {string} Full path to adb executable.
 */
methods.getAdbWithCorrectAdbPath = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("adb"));

      case 2:
        this.executable.path = context$1$0.sent;

        this.binaries.adb = this.executable.path;
        return context$1$0.abrupt('return', this.adb);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the full path to aapt tool and assign it to
 * this.binaries.aapt property
 */
methods.initAapt = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("aapt"));

      case 2:
        this.binaries.aapt = context$1$0.sent;

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the full path to zipalign tool and assign it to
 * this.binaries.zipalign property
 */
methods.initZipAlign = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSdkBinaryPath("zipalign"));

      case 2:
        this.binaries.zipalign = context$1$0.sent;

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the API level of the device under test.
 *
 * @return {number} The API level as integer number, for example 21 for
 *                  Android Lollipop. The result of this method is cached, so all the further
 * calls return the same value as the first one.
 */
methods.getApiLevel = function callee$0$0() {
  var strOutput;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (_lodash2['default'].isInteger(this._apiLevel)) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getDeviceProperty('ro.build.version.sdk'));

      case 4:
        strOutput = context$1$0.sent;

        this._apiLevel = parseInt(strOutput.trim(), 10);

        if (!isNaN(this._apiLevel)) {
          context$1$0.next = 8;
          break;
        }

        throw new Error('The actual output "' + strOutput + '" cannot be converted to an integer');

      case 8:
        context$1$0.next = 13;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error getting device API level. Original error: ' + context$1$0.t0.message);

      case 13:
        _loggerJs2['default'].debug('Device API level: ' + this._apiLevel);
        return context$1$0.abrupt('return', this._apiLevel);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 10]]);
};

/**
 * Retrieve the platform version of the device under test.
 *
 * @return {string} The platform version as a string, for example '5.0' for
 * Android Lollipop.
 */
methods.getPlatformVersion = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].info("Getting device platform version");
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getDeviceProperty('ro.build.version.release'));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error getting device platform version. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 7]]);
};

/**
 * Verify whether a device is connected.
 *
 * @return {boolean} True if at least one device is visible to adb.
 */
methods.isDeviceConnected = function callee$0$0() {
  var devices;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getConnectedDevices());

      case 2:
        devices = context$1$0.sent;
        return context$1$0.abrupt('return', devices.length > 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Recursively create a new folder on the device under test.
 *
 * @param {string} remotePath - The new path to be created.
 * @return {string} mkdir command output.
 */
methods.mkdir = function callee$0$0(remotePath) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['mkdir', '-p', remotePath]));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Verify whether the given argument is a
 * valid class name.
 *
 * @param {string} classString - The actual class name to be verified.
 * @return {?Array.<Match>} The result of Regexp.exec operation
 *                          or _null_ if no matches are found.
 */
methods.isValidClass = function (classString) {
  // some.package/some.package.Activity
  return new RegExp(/^[a-zA-Z0-9\./_]+$/).exec(classString);
};

/**
 * Force application to stop on the device under test.
 *
 * @param {string} pkg - The package name to be stopped.
 * @return {string} The output of the corresponding adb command.
 */
methods.forceStop = function callee$0$0(pkg) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['am', 'force-stop', pkg]));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Clear the user data of the particular application on the device
 * under test.
 *
 * @param {string} pkg - The package name to be cleared.
 * @return {string} The output of the corresponding adb command.
 */
methods.clear = function callee$0$0(pkg) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'clear', pkg]));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Grant all permissions requested by the particular package.
 * This method is only useful on Android 6.0+ and for applications
 * that support components-based permissions setting.
 *
 * @param {string} pkg - The package name to be processed.
 * @param {string} apk - The path to the actual apk file.
 * @return {string|boolean} The output of the corresponding adb command
 *                          or _false_ if there was an error during command execution.
 */
methods.grantAllPermissions = function callee$0$0(pkg, apk) {
  var apiLevel, targetSdk, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _ret;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 2:
        apiLevel = context$1$0.sent;
        targetSdk = null;
        context$1$0.prev = 4;

        if (apk) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.targetSdkVersionUsingPKG(pkg));

      case 8:
        targetSdk = context$1$0.sent;
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.targetSdkVersionFromManifest(apk));

      case 13:
        targetSdk = context$1$0.sent;

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](4);

        //avoiding logging error stack, as calling library function would have logged
        _loggerJs2['default'].warn('Ran into problem getting target SDK version; ignoring...');

      case 19:
        if (!(apiLevel >= 23 && targetSdk >= 23)) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap((function callee$1$0() {
          var stdout, requestedPermissions, grantedPermissions, permissonsToGrant, cmds, cmdChunk, permission, nextCmd, result, lastError, cmd;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.shell(['pm', 'dump', pkg]));

              case 2:
                stdout = context$2$0.sent;
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(this.getReqPermissions(pkg, stdout));

              case 5:
                requestedPermissions = context$2$0.sent;
                context$2$0.next = 8;
                return _regeneratorRuntime.awrap(this.getGrantedPermissions(pkg, stdout));

              case 8:
                grantedPermissions = context$2$0.sent;
                permissonsToGrant = requestedPermissions.filter(function (x) {
                  return grantedPermissions.indexOf(x) < 0;
                });

                if (permissonsToGrant.length) {
                  context$2$0.next = 13;
                  break;
                }

                _loggerJs2['default'].info(pkg + ' contains no permissions available for granting.');
                return context$2$0.abrupt('return', {
                  v: true
                });

              case 13:
                cmds = [];
                cmdChunk = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$2$0.prev = 18;

                for (_iterator = _getIterator(permissonsToGrant); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  permission = _step.value;
                  nextCmd = ['pm', 'grant', pkg, permission, ';'];

                  if (nextCmd.join(' ').length + cmdChunk.join(' ').length >= MAX_SHELL_BUFFER_LENGTH) {
                    cmds.push(cmdChunk);
                    cmdChunk = [];
                  }
                  cmdChunk = cmdChunk.concat(nextCmd);
                }
                context$2$0.next = 26;
                break;

              case 22:
                context$2$0.prev = 22;
                context$2$0.t0 = context$2$0['catch'](18);
                _didIteratorError = true;
                _iteratorError = context$2$0.t0;

              case 26:
                context$2$0.prev = 26;
                context$2$0.prev = 27;

                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }

              case 29:
                context$2$0.prev = 29;

                if (!_didIteratorError) {
                  context$2$0.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return context$2$0.finish(29);

              case 33:
                return context$2$0.finish(26);

              case 34:
                if (cmdChunk.length) {
                  cmds.push(cmdChunk);
                }
                _loggerJs2['default'].debug('Got the following command chunks to execute: ' + cmds);
                result = true;
                lastError = null;
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                context$2$0.prev = 41;
                _iterator2 = _getIterator(cmds);

              case 43:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  context$2$0.next = 61;
                  break;
                }

                cmd = _step2.value;
                context$2$0.prev = 45;
                context$2$0.next = 48;
                return _regeneratorRuntime.awrap(this.shell(cmd));

              case 48:
                context$2$0.t1 = context$2$0.sent;

                if (!context$2$0.t1) {
                  context$2$0.next = 51;
                  break;
                }

                context$2$0.t1 = result;

              case 51:
                result = context$2$0.t1;
                context$2$0.next = 58;
                break;

              case 54:
                context$2$0.prev = 54;
                context$2$0.t2 = context$2$0['catch'](45);

                // this is to give the method a chance to assign all the requested permissions
                // before to quit in case we'd like to ignore the error on the higher level
                lastError = context$2$0.t2;
                result = false;

              case 58:
                _iteratorNormalCompletion2 = true;
                context$2$0.next = 43;
                break;

              case 61:
                context$2$0.next = 67;
                break;

              case 63:
                context$2$0.prev = 63;
                context$2$0.t3 = context$2$0['catch'](41);
                _didIteratorError2 = true;
                _iteratorError2 = context$2$0.t3;

              case 67:
                context$2$0.prev = 67;
                context$2$0.prev = 68;

                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                  _iterator2['return']();
                }

              case 70:
                context$2$0.prev = 70;

                if (!_didIteratorError2) {
                  context$2$0.next = 73;
                  break;
                }

                throw _iteratorError2;

              case 73:
                return context$2$0.finish(70);

              case 74:
                return context$2$0.finish(67);

              case 75:
                if (!lastError) {
                  context$2$0.next = 77;
                  break;
                }

                throw lastError;

              case 77:
                return context$2$0.abrupt('return', {
                  v: result
                });

              case 78:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[18, 22, 26, 34], [27,, 29, 33], [41, 63, 67, 75], [45, 54], [68,, 70, 74]]);
        })());

      case 22:
        _ret = context$1$0.sent;

        if (!(typeof _ret === 'object')) {
          context$1$0.next = 25;
          break;
        }

        return context$1$0.abrupt('return', _ret.v);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 16]]);
};

/**
 * Grant single permission for the particular package.
 *
 * @param {string} pkg - The package name to be processed.
 * @param {string} permission - The full name of the permission to be granted.
 * @throws {Error} If there was an error while changing permissions.
 */
methods.grantPermission = function callee$0$0(pkg, permission) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'grant', pkg, permission]));

      case 3:
        context$1$0.next = 9;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);

        if (context$1$0.t0.message.includes("not a changeable permission type")) {
          context$1$0.next = 9;
          break;
        }

        throw context$1$0.t0;

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 5]]);
};

/**
 * Revoke single permission from the particular package.
 *
 * @param {string} pkg - The package name to be processed.
 * @param {string} permission - The full name of the permission to be revoked.
 * @throws {Error} If there was an error while changing permissions.
 */
methods.revokePermission = function callee$0$0(pkg, permission) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'revoke', pkg, permission]));

      case 3:
        context$1$0.next = 9;
        break;

      case 5:
        context$1$0.prev = 5;
        context$1$0.t0 = context$1$0['catch'](0);

        if (context$1$0.t0.message.includes("not a changeable permission type")) {
          context$1$0.next = 9;
          break;
        }

        throw context$1$0.t0;

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 5]]);
};

/**
 * Retrieve the list of granted permissions for the particular package.
 *
 * @param {string} pkg - The package name to be processed.
 * @param {string} cmdOutput [null] - Optional parameter containing command output of
 *                                    _pm dump_ command. It speeds this method up
 *                                    if present.
 * @return {array} The list of granted permissions or an empty list.
 * @throws {Error} If there was an error while changing permissions.
 */
methods.getGrantedPermissions = function callee$0$0(pkg) {
  var cmdOutput = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var stdout, match;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.t0 = cmdOutput;

        if (context$1$0.t0) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'dump', pkg]));

      case 4:
        context$1$0.t0 = context$1$0.sent;

      case 5:
        stdout = context$1$0.t0;
        match = new RegExp(/install permissions:([\s\S]*?)DUMP OF SERVICE activity:/g).exec(stdout);

        if (match) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('Unable to get granted permissions');

      case 9:
        return context$1$0.abrupt('return', (match[0].match(/android\.permission\.\w+:\sgranted=true/g) || []).map(function (x) {
          return x.replace(/:\sgranted=true/g, '');
        }));

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the list of denied permissions for the particular package.
 *
 * @param {string} pkg - The package name to be processed.
 * @param {string} cmdOutput [null] - Optional parameter containing command output of
 *                                    _pm dump_ command. It speeds this method up
 *                                    if present.
 * @return {array} The list of denied permissions or an empty list.
 */
methods.getDeniedPermissions = function callee$0$0(pkg) {
  var cmdOutput = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var stdout, match;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.t0 = cmdOutput;

        if (context$1$0.t0) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'dump', pkg]));

      case 4:
        context$1$0.t0 = context$1$0.sent;

      case 5:
        stdout = context$1$0.t0;
        match = new RegExp(/install permissions:([\s\S]*?)DUMP OF SERVICE activity:/g).exec(stdout);

        if (match) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('Unable to get denied permissions');

      case 9:
        return context$1$0.abrupt('return', (match[0].match(/android\.permission\.\w+:\sgranted=false/g) || []).map(function (x) {
          return x.replace(/:\sgranted=false/g, '');
        }));

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the list of requested permissions for the particular package.
 *
 * @param {string} pkg - The package name to be processed.
 * @param {string} cmdOutput [null] - Optional parameter containing command output of
 *                                    _pm dump_ command. It speeds this method up
 *                                    if present.
 * @return {array} The list of requested permissions or an empty list.
 */
methods.getReqPermissions = function callee$0$0(pkg) {
  var cmdOutput = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  var stdout, match;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.t0 = cmdOutput;

        if (context$1$0.t0) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'dump', pkg]));

      case 4:
        context$1$0.t0 = context$1$0.sent;

      case 5:
        stdout = context$1$0.t0;
        match = new RegExp(/requested permissions:([\s\S]*?)install permissions:/g).exec(stdout);

        if (match) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('Unable to get requested permissions');

      case 9:
        return context$1$0.abrupt('return', match[0].match(/android\.permission\.\w+/g) || []);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the list of location providers for the device under test.
 *
 * @return {Array.<String>} The list of available location providers or an empty list.
 */
methods.getLocationProviders = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSetting('secure', 'location_providers_allowed'));

      case 2:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', stdout.trim().split(',').map(function (p) {
          return p.trim();
        }).filter(Boolean));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Toggle the state of GPS location provider.
 *
 * @param {boolean} enabled - Whether to enable (true) or disable (false) the GPS provider.
 */
methods.toggleGPSLocationProvider = function callee$0$0(enabled) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setSetting('secure', 'location_providers_allowed', (enabled ? "+" : "-") + 'gps'));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Stop the particular package if it is running and clears its application data.
 *
 * @param {string} pkg - The package name to be processed.
 */
methods.stopAndClear = function callee$0$0(pkg) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.forceStop(pkg));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.clear(pkg));

      case 5:
        context$1$0.next = 10;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Cannot stop and clear ' + pkg + '. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

/**
 * Retrieve the target SDK version for the particular package.
 *
 * @param {string} pkg - The package name to be processed.
 * @return {string} The parsed SDK version.
 */
methods.getTargetSdkUsingPKG = function callee$0$0(pkg) {
  var stdout, targetSdk;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['pm', 'dump', pkg]));

      case 2:
        stdout = context$1$0.sent;
        targetSdk = new RegExp(/targetSdk=([^\s\s]+)/g).exec(stdout)[1];
        return context$1$0.abrupt('return', targetSdk);

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the list of available input methods (IMEs) for the device under test.
 *
 * @return {Array.<String>} The list of IME names or an empty list.
 */
methods.availableIMEs = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'list', '-a']));

      case 3:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', (0, _helpersJs.getIMEListFromOutput)(context$1$0.t0));

      case 7:
        context$1$0.prev = 7;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting available IME\'s. Original error: ' + context$1$0.t1.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

/**
 * Retrieve the list of enabled input methods (IMEs) for the device under test.
 *
 * @return {Array.<String>} The list of enabled IME names or an empty list.
 */
methods.enabledIMEs = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'list']));

      case 3:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt('return', (0, _helpersJs.getIMEListFromOutput)(context$1$0.t0));

      case 7:
        context$1$0.prev = 7;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting enabled IME\'s. Original error: ' + context$1$0.t1.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

/**
 * Enable the particular input method on the device under test.
 *
 * @param {string} imeId - One of existing IME ids.
 */
methods.enableIME = function callee$0$0(imeId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'enable', imeId]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Disable the particular input method on the device under test.
 *
 * @param {string} imeId - One of existing IME ids.
 */
methods.disableIME = function callee$0$0(imeId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'disable', imeId]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the particular input method on the device under test.
 *
 * @param {string} imeId - One of existing IME ids.
 */
methods.setIME = function callee$0$0(imeId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['ime', 'set', imeId]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the default input method on the device under test.
 *
 * @return {string} The name of the default input method.
 */
methods.defaultIME = function callee$0$0() {
  var engine;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getSetting('secure', 'default_input_method'));

      case 3:
        engine = context$1$0.sent;
        return context$1$0.abrupt('return', engine.trim());

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error getting default IME. Original error: ' + context$1$0.t0.message);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

/**
 * Send the particular keycode to the device under test.
 *
 * @param {string|number} keycode - The actual key code to be sent.
 */
methods.keyevent = function callee$0$0(keycode) {
  var code;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        code = parseInt(keycode, 10);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['input', 'keyevent', code]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Send the particular text to the device under test.
 *
 * @param {string} text - The actual text to be sent.
 */
methods.inputText = function callee$0$0(text) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        /* jshint ignore:start */
        // need to escape whitespace and ( ) < > | ; & * \ ~ " '
        text = text.replace(/\\/g, '\\\\').replace(/\(/g, '\(').replace(/\)/g, '\)').replace(/</g, '\<').replace(/>/g, '\>').replace(/\|/g, '\|').replace(/;/g, '\;').replace(/&/g, '\&').replace(/\*/g, '\*').replace(/~/g, '\~').replace(/"/g, '\"').replace(/'/g, "\'").replace(/ /g, '%s');
        /* jshint ignore:end */
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['input', 'text', text]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Clear the active text field on the device under test by sending
 * special keyevents to it.
 *
 * @param {number} length [100] - The maximum length of the text in the field to be cleared.
 */
methods.clearTextField = function callee$0$0() {
  var length = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
  var args, i;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // assumes that the EditText field already has focus
        _loggerJs2['default'].debug('Clearing up to ' + length + ' characters');

        if (!(length === 0)) {
          context$1$0.next = 3;
          break;
        }

        return context$1$0.abrupt('return');

      case 3:
        args = ['input', 'keyevent'];

        for (i = 0; i < length; i++) {
          // we cannot know where the cursor is in the text field, so delete both before
          // and after so that we get rid of everything
          // https://developer.android.com/reference/android/view/KeyEvent.html#KEYCODE_DEL
          // https://developer.android.com/reference/android/view/KeyEvent.html#KEYCODE_FORWARD_DEL
          args.push('67', '112');
        }
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.shell(args));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Send the special keycode to the device under test in order to lock it.
 */
methods.lock = function callee$0$0() {
  var locked;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.isScreenLocked());

      case 2:
        locked = context$1$0.sent;

        if (locked) {
          context$1$0.next = 11;
          break;
        }

        _loggerJs2['default'].debug("Pressing the KEYCODE_POWER button to lock screen");
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.keyevent(26));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 500, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.isScreenLocked());

              case 2:
                locked = context$2$0.sent;

                if (!locked) {
                  _loggerJs2['default'].errorAndThrow("Waiting for screen to lock.");
                }

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 9:
        context$1$0.next = 12;
        break;

      case 11:
        _loggerJs2['default'].debug("Screen is already locked. Doing nothing.");

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Send the special keycode to the device under test in order to emulate
 * Back button tap.
 */
methods.back = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Pressing the BACK button");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.keyevent(4));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Send the special keycode to the device under test in order to emulate
 * Home button tap.
 */
methods.goToHome = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Pressing the HOME button");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.keyevent(3));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @return {string} the actual path to adb executable.
 */
methods.getAdbPath = function () {
  return this.executable.path;
};

/**
 * Retrieve current screen orientation of the device under test.
 *
 * @return {number} The current orientation encoded as an integer number.
 */
methods.getScreenOrientation = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['dumpsys', 'input']));

      case 2:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', (0, _helpersJs.getSurfaceOrientation)(stdout));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the screen lock state of the device under test.
 *
 * @return {boolean} True if the device is locked.
 */
methods.isScreenLocked = function callee$0$0() {
  var stdout, dumpsysFile;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['dumpsys', 'window']));

      case 2:
        stdout = context$1$0.sent;

        if (!process.env.APPIUM_LOG_DUMPSYS) {
          context$1$0.next = 8;
          break;
        }

        dumpsysFile = _path2['default'].resolve(process.cwd(), "dumpsys.log");

        _loggerJs2['default'].debug('Writing dumpsys output to ' + dumpsysFile);
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(dumpsysFile, stdout));

      case 8:
        return context$1$0.abrupt('return', (0, _helpersJs.isShowingLockscreen)(stdout) || (0, _helpersJs.isCurrentFocusOnKeyguard)(stdout) || !(0, _helpersJs.isScreenOnFully)(stdout));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the state of the software keyboard on the device under test.
 *
 * @return {boolean} True if the software keyboard is present.
 */
methods.isSoftKeyboardPresent = function callee$0$0() {
  var stdout, isKeyboardShown, canCloseKeyboard, inputShownMatch, isInputViewShownMatch;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['dumpsys', 'input_method']));

      case 3:
        stdout = context$1$0.sent;
        isKeyboardShown = false, canCloseKeyboard = false, inputShownMatch = /mInputShown=\w+/gi.exec(stdout);

        if (inputShownMatch && inputShownMatch[0]) {
          isKeyboardShown = inputShownMatch[0].split('=')[1] === 'true';
          isInputViewShownMatch = /mIsInputViewShown=\w+/gi.exec(stdout);

          if (isInputViewShownMatch && isInputViewShownMatch[0]) {
            canCloseKeyboard = isInputViewShownMatch[0].split('=')[1] === 'true';
          }
        }
        return context$1$0.abrupt('return', { isKeyboardShown: isKeyboardShown, canCloseKeyboard: canCloseKeyboard });

      case 9:
        context$1$0.prev = 9;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error finding softkeyboard. Original error: ' + context$1$0.t0.message);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 9]]);
};

/**
 * Send an arbitrary Telnet command to the device under test.
 *
 * @param {string} command - The command to be sent.
 *
 * @return {string} The actual output of the given command.
 */
methods.sendTelnetCommand = function callee$0$0(command) {
  var port;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Sending telnet command to device: ' + command);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getEmulatorPort());

      case 3:
        port = context$1$0.sent;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(new _bluebird2['default'](function (resolve, reject) {
          var conn = _net2['default'].createConnection(port, 'localhost'),
              connected = false,
              readyRegex = /^OK$/m,
              dataStream = "",
              res = null;
          conn.on('connect', function () {
            _loggerJs2['default'].debug("Socket connection to device created");
          });
          conn.on('data', function (data) {
            data = data.toString('utf8');
            if (!connected) {
              if (readyRegex.test(data)) {
                connected = true;
                _loggerJs2['default'].debug("Socket connection to device ready");
                conn.write(command + '\n');
              }
            } else {
              dataStream += data;
              if (readyRegex.test(data)) {
                res = dataStream.replace(readyRegex, "").trim();
                res = _lodash2['default'].last(res.trim().split('\n'));
                _loggerJs2['default'].debug('Telnet command got response: ' + res);
                conn.write("quit\n");
              }
            }
          });
          conn.on('error', function (err) {
            // eslint-disable-line promise/prefer-await-to-callbacks
            _loggerJs2['default'].debug('Telnet command error: ' + err.message);
            reject(err);
          });
          conn.on('close', function () {
            if (res === null) {
              reject(new Error("Never got a response from command"));
            } else {
              resolve(res);
            }
          });
        }));

      case 6:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Check the state of Airplane mode on the device under test.
 *
 * @return {boolean} True if Airplane mode is enabled.
 */
methods.isAirplaneModeOn = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSetting('global', 'airplane_mode_on'));

      case 2:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', parseInt(stdout, 10) !== 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Change the state of Airplane mode in Settings on the device under test.
 *
 * @param {boolean} on - True to enable the Airplane mode in Settings and false to disable it.
 */
methods.setAirplaneMode = function callee$0$0(on) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setSetting('global', 'airplane_mode_on', on ? 1 : 0));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Broadcast the state of Airplane mode on the device under test.
 * This method should be called after {@link #setAirplaneMode}, otherwise
 * the mode change is not going to be applied for the device.
 *
 * @param {boolean} on - True to broadcast enable and false to broadcast disable.
 */
methods.broadcastAirplaneMode = function callee$0$0(on) {
  var args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        args = ['am', 'broadcast', '-a', 'android.intent.action.AIRPLANE_MODE', '--ez', 'state', on ? 'true' : 'false'];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(args));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Check the state of WiFi on the device under test.
 *
 * @return {boolean} True if WiFi is enabled.
 */
methods.isWifiOn = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSetting('global', 'wifi_on'));

      case 2:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', parseInt(stdout, 10) !== 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Change the state of WiFi on the device under test.
 *
 * @param {boolean} on - True to enable and false to disable it.
 * @param {boolean} isEmulator [false] - Set it to true if the device under test
 *                                       is an emulator rather than a real device.
 */
methods.setWifiState = function callee$0$0(on) {
  var isEmulator = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!isEmulator) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['svc', 'wifi', on ? 'enable' : 'disable']));

      case 3:
        context$1$0.next = 7;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.shell(['am', 'broadcast', '-a', WIFI_CONNECTION_SETTING_ACTION, '-n', WIFI_CONNECTION_SETTING_RECEIVER, '--es', 'setstatus', on ? 'enable' : 'disable']));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Check the state of Data transfer on the device under test.
 *
 * @return {boolean} True if Data transfer is enabled.
 */
methods.isDataOn = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSetting('global', 'mobile_data'));

      case 2:
        stdout = context$1$0.sent;
        return context$1$0.abrupt('return', parseInt(stdout, 10) !== 0);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Change the state of Data transfer on the device under test.
 *
 * @param {boolean} on - True to enable and false to disable it.
 * @param {boolean} isEmulator [false] - Set it to true if the device under test
 *                                       is an emulator rather than a real device.
 */
methods.setDataState = function callee$0$0(on) {
  var isEmulator = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!isEmulator) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['svc', 'data', on ? 'enable' : 'disable']));

      case 3:
        context$1$0.next = 7;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.shell(['am', 'broadcast', '-a', DATA_CONNECTION_SETTING_ACTION, '-n', DATA_CONNECTION_SETTING_RECEIVER, '--es', 'setstatus', on ? 'enable' : 'disable']));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Change the state of WiFi and/or Data transfer on the device under test.
 *
 * @param {boolean} wifi - True to enable and false to disable WiFi.
 * @param {boolean} data - True to enable and false to disable Data transfer.
 * @param {boolean} isEmulator [false] - Set it to true if the device under test
 *                                       is an emulator rather than a real device.
 */
methods.setWifiAndData = function callee$0$0(_ref) {
  var wifi = _ref.wifi;
  var data = _ref.data;
  var isEmulator = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!_lodash2['default'].isUndefined(wifi)) {
          this.setWifiState(wifi, isEmulator);
        }
        if (!_lodash2['default'].isUndefined(data)) {
          this.setDataState(data, isEmulator);
        }

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Change the state of animation on the device under test.
 * Animation on the device is controlled by the following global properties:
 * [ANIMATOR_DURATION_SCALE]{@link https://developer.android.com/reference/android/provider/Settings.Global.html#ANIMATOR_DURATION_SCALE},
 * [TRANSITION_ANIMATION_SCALE]{@link https://developer.android.com/reference/android/provider/Settings.Global.html#TRANSITION_ANIMATION_SCALE},
 * [WINDOW_ANIMATION_SCALE]{@link https://developer.android.com/reference/android/provider/Settings.Global.html#WINDOW_ANIMATION_SCALE}.
 * This method sets all this properties to 0.0 to disable (1.0 to enable) animation.
 *
 * Turning off animation might be useful to improve stability
 * and reduce tests execution time.
 *
 * @param {boolean} on - True to enable and false to disable it.
 */
methods.setAnimationState = function callee$0$0(on) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['am', 'broadcast', '-a', ANIMATION_SETTING_ACTION, '-n', ANIMATION_SETTING_RECEIVER, '--es', 'setstatus', on ? 'enable' : 'disable']));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Check the state of animation on the device under test.
 *
 * @return {boolean} True if at least one of animation scale settings
 *                   is not equal to '0.0'.
 */
methods.isAnimationOn = function callee$0$0() {
  var animator_duration_scale, transition_animation_scale, window_animation_scale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getSetting('global', 'animator_duration_scale'));

      case 2:
        animator_duration_scale = context$1$0.sent;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.getSetting('global', 'transition_animation_scale'));

      case 5:
        transition_animation_scale = context$1$0.sent;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getSetting('global', 'window_animation_scale'));

      case 8:
        window_animation_scale = context$1$0.sent;
        return context$1$0.abrupt('return', _lodash2['default'].some([animator_duration_scale, transition_animation_scale, window_animation_scale], function (setting) {
          return setting !== '0.0';
        }));

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Change the locale on the device under test. Don't need to reboot the device after changing the locale.
 * This method sets an arbitrary locale following:
 *   https://developer.android.com/reference/java/util/Locale.html
 *   https://developer.android.com/reference/java/util/Locale.html#Locale(java.lang.String,%20java.lang.String)
 *
 * @param {string} language - Language. e.g. en, ja
 * @param {string} country - Country. e.g. US, JP
 */
methods.setDeviceSysLocaleViaSettingApp = function callee$0$0(language, country) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['am', 'broadcast', '-a', LOCALE_SETTING_ACTION, '-n', LOCALE_SETTING_RECEIVER, '--es', 'lang', language.toLowerCase(), '--es', 'country', country.toUpperCase()]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @typedef {Object} Location
 * @property {float|string} longitude - Valid longitude value.
 * @property {float|string} latitude - Valid latitude value.
 */

/**
 * Emulate geolocation coordinates on the device under test.
 *
 * @param {Location} location - Location object.
 * @param {boolean} isEmulator [false] - Set it to true if the device under test
 *                                       is an emulator rather than a real device.
 */
methods.setGeoLocation = function callee$0$0(location) {
  var isEmulator = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
  var longitude, latitude;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        longitude = parseFloat(location.longitude);

        if (isNaN(longitude)) {
          _loggerJs2['default'].errorAndThrow('location.longitude is expected to be a valid float number. \'' + location.longitude + '\' is given instead');
        }
        longitude = '' + _lodash2['default'].ceil(longitude, 5);
        latitude = parseFloat(location.latitude);

        if (isNaN(latitude)) {
          _loggerJs2['default'].errorAndThrow('location.latitude is expected to be a valid float number. \'' + location.latitude + '\' is given instead');
        }
        latitude = '' + _lodash2['default'].ceil(latitude, 5);

        if (!isEmulator) {
          context$1$0.next = 12;
          break;
        }

        this.resetTelnetAuthToken();
        this.adbExec(['emu', 'geo', 'fix', longitude, latitude]);
        // A workaround for https://code.google.com/p/android/issues/detail?id=206180
        this.adbExec(['emu', 'geo', 'fix', longitude.replace('.', ','), latitude.replace('.', ',')]);
        context$1$0.next = 15;
        break;

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.shell(['am', 'startservice', '-e', 'longitude', longitude, '-e', 'latitude', latitude, LOCATION_SERVICE]));

      case 14:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Forcefully recursively remove a path on the device under test.
 * Be careful while calling this method.
 *
 * @param {string} path - The path to be removed recursively.
 */
methods.rimraf = function callee$0$0(path) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['rm', '-rf', path]));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Send a file to the device under test.
 *
 * @param {string} localPath - The path to the file on the local file system.
 * @param {string} remotePath - The destination path on the remote device.
 * @param {object} opts - Additional options mapping. See
 *                        https://github.com/appium/node-teen_process,
 *                        _exec_ method options, for more information about available
 *                        options.
 */
methods.push = function callee$0$0(localPath, remotePath, opts) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adbExec(['push', localPath, remotePath], opts));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Receive a file from the device under test.
 *
 * @param {string} remotePath - The source path on the remote device.
 * @param {string} localPath - The destination path to the file on the local file system.
 */
methods.pull = function callee$0$0(remotePath, localPath) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adbExec(['pull', remotePath, localPath], { timeout: 60000 }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Check whether the process with the particular name is running on the device
 * under test.
 *
 * @param {string} processName - The name of the process to be checked.
 * @return {boolean} True if the given process is running.
 * @throws {error} If the given process name is not a valid class name.
 */
methods.processExists = function callee$0$0(processName) {
  var stdout, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, line, pkgColumn;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        if (this.isValidClass(processName)) {
          context$1$0.next = 3;
          break;
        }

        throw new Error('Invalid process name: ' + processName);

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell("ps"));

      case 5:
        stdout = context$1$0.sent;
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 9;
        _iterator3 = _getIterator(stdout.split(/\r?\n/));

      case 11:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 20;
          break;
        }

        line = _step3.value;

        line = line.trim().split(/\s+/);
        pkgColumn = line[line.length - 1];

        if (!(pkgColumn && pkgColumn.indexOf(processName) !== -1)) {
          context$1$0.next = 17;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 17:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 11;
        break;

      case 20:
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](9);
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
        return context$1$0.abrupt('return', false);

      case 37:
        context$1$0.prev = 37;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error finding if process exists. Original error: ' + context$1$0.t1.message);

      case 40:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 37], [9, 22, 26, 34], [27,, 29, 33]]);
};

/**
 * Get TCP port forwarding with adb on the device under test.
 * @return {Array.<String>} The output of the corresponding adb command. An array contains each forwarding line of output
 */
methods.getForwardList = function callee$0$0() {
  var connections;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('List forwarding ports');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['forward', '--list']));

      case 3:
        connections = context$1$0.sent;
        return context$1$0.abrupt('return', connections.split('\n'));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Setup TCP port forwarding with adb on the device under test.
 *
 * @param {string|number} systemPort - The number of the local system port.
 * @param {string|number} devicePort - The number of the remote device port.
 */
methods.forwardPort = function callee$0$0(systemPort, devicePort) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Forwarding system: ' + systemPort + ' to device: ' + devicePort);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['forward', 'tcp:' + systemPort, 'tcp:' + devicePort]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Remove TCP port forwarding with adb on the device under test. The forwarding
 * for the given port should be setup with {@link #forwardPort} first.
 *
 * @param {string|number} systemPort - The number of the local system port
 *                                     to remove forwarding on.
 */
methods.removePortForward = function callee$0$0(systemPort) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Removing forwarded port socket connection: ' + systemPort + ' ');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['forward', '--remove', 'tcp:' + systemPort]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Setup TCP port forwarding with adb on the device under test. The difference
 * between {@link #forwardPort} is that this method does setup for an abstract
 * local port.
 *
 * @param {string|number} systemPort - The number of the local system port.
 * @param {string|number} devicePort - The number of the remote device port.
 */
methods.forwardAbstractPort = function callee$0$0(systemPort, devicePort) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Forwarding system: ' + systemPort + ' to abstract device: ' + devicePort);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExec(['forward', 'tcp:' + systemPort, 'localabstract:' + devicePort]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Execute ping shell command on the device under test.
 *
 * @return {boolean} True if the command output contains 'ping' substring.
 * @throws {error} If there was an error while executing 'ping' command on the
 *                 device under test.
 */
methods.ping = function callee$0$0() {
  var stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(["echo", "ping"]));

      case 2:
        stdout = context$1$0.sent;

        if (!(stdout.indexOf("ping") === 0)) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return', true);

      case 5:
        throw new Error('ADB ping failed, returned ' + stdout);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Restart the device under test using adb commands.
 *
 * @throws {error} If start fails.
 */
methods.restart = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.stopLogcat());

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.restartAdb());

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.waitForDevice(60));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.startLogcat());

      case 9:
        context$1$0.next = 14;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Restart failed. Orginial error: ' + context$1$0.t0.message);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 11]]);
};

/**
 * Start the logcat process to gather logs.
 *
 * @throws {error} If restart fails.
 */
methods.startLogcat = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (this.logcat !== null) {
          _loggerJs2['default'].errorAndThrow("Trying to start logcat capture but it's already started!");
        }
        this.logcat = new _logcat2['default']({
          adb: this.executable,
          debug: false,
          debugTrace: false,
          clearDeviceLogsOnStart: !!this.clearDeviceLogsOnStart
        });
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.logcat.startCapture());

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Stop the active logcat process which gathers logs.
 * The call will be ignored if no logcat process is running.
 */
methods.stopLogcat = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(this.logcat !== null)) {
          context$1$0.next = 4;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.logcat.stopCapture());

      case 3:
        this.logcat = null;

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Retrieve the output from the currently running logcat process.
 * The logcat process should be executed by {2link #startLogcat} method.
 *
 * @return {string} The collected logcat output.
 * @throws {error} If logcat process is not running.
 */
methods.getLogcatLogs = function () {
  if (this.logcat === null) {
    _loggerJs2['default'].errorAndThrow("Can't get logcat logs since logcat hasn't started");
  }
  return this.logcat.getLogs();
};

/**
 * Get the list of process ids for the particular process on the device under test.
 *
 * @param {string} name - The part of process name.
 * @return {Array.<number>} The list of matched process IDs or an empty list.
 */
methods.getPIDsByName = function callee$0$0(name) {
  var stdout, pids, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, line, match;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Getting all processes with ' + name);
        context$1$0.prev = 1;

        // ps <comm> where comm is last 15 characters of package name
        if (name.length > 15) {
          name = name.substr(name.length - 15);
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.shell(["ps"]));

      case 5:
        stdout = context$1$0.sent.trim();
        pids = [];
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 10;
        _iterator4 = _getIterator(stdout.split("\n"));

      case 12:
        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
          context$1$0.next = 24;
          break;
        }

        line = _step4.value;

        if (!(line.indexOf(name) !== -1)) {
          context$1$0.next = 21;
          break;
        }

        match = /[^\t ]+[\t ]+([0-9]+)/.exec(line);

        if (!match) {
          context$1$0.next = 20;
          break;
        }

        pids.push(parseInt(match[1], 10));
        context$1$0.next = 21;
        break;

      case 20:
        throw new Error('Could not extract PID from ps output: ' + line);

      case 21:
        _iteratorNormalCompletion4 = true;
        context$1$0.next = 12;
        break;

      case 24:
        context$1$0.next = 30;
        break;

      case 26:
        context$1$0.prev = 26;
        context$1$0.t0 = context$1$0['catch'](10);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t0;

      case 30:
        context$1$0.prev = 30;
        context$1$0.prev = 31;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 33:
        context$1$0.prev = 33;

        if (!_didIteratorError4) {
          context$1$0.next = 36;
          break;
        }

        throw _iteratorError4;

      case 36:
        return context$1$0.finish(33);

      case 37:
        return context$1$0.finish(30);

      case 38:
        return context$1$0.abrupt('return', pids);

      case 41:
        context$1$0.prev = 41;
        context$1$0.t1 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Unable to get pids for ' + name + '. Orginial error: ' + context$1$0.t1.message);

      case 44:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 41], [10, 26, 30, 38], [31,, 33, 37]]);
};

/**
 * Get the list of process ids for the particular process on the device under test.
 *
 * @param {string} name - The part of process name.
 * @return {Array.<number>} The list of matched process IDs or an empty list.
 */
methods.killProcessesByName = function callee$0$0(name) {
  var pids, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, pid;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        _loggerJs2['default'].debug('Attempting to kill all ' + name + ' processes');
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.getPIDsByName(name));

      case 4:
        pids = context$1$0.sent;

        if (!(pids.length < 1)) {
          context$1$0.next = 8;
          break;
        }

        _loggerJs2['default'].info('No ' + name + ' process found to kill, continuing...');
        return context$1$0.abrupt('return');

      case 8:
        _iteratorNormalCompletion5 = true;
        _didIteratorError5 = false;
        _iteratorError5 = undefined;
        context$1$0.prev = 11;
        _iterator5 = _getIterator(pids);

      case 13:
        if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
          context$1$0.next = 20;
          break;
        }

        pid = _step5.value;
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(this.killProcessByPID(pid));

      case 17:
        _iteratorNormalCompletion5 = true;
        context$1$0.next = 13;
        break;

      case 20:
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](11);
        _didIteratorError5 = true;
        _iteratorError5 = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
          _iterator5['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError5) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError5;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        context$1$0.next = 39;
        break;

      case 36:
        context$1$0.prev = 36;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Unable to kill ' + name + ' processes. Original error: ' + context$1$0.t1.message);

      case 39:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 36], [11, 22, 26, 34], [27,, 29, 33]]);
};

/**
 * Kill the particular process on the device under test.
 *
 * @param {string|number} pid - The ID of the process to be killed.
 * @return {string} Kill command stdout.
 * @throws {Error} If the process with given ID is not present or cannot be killed.
 */
methods.killProcessByPID = function callee$0$0(pid) {
  var timeoutMs, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Attempting to kill process ' + pid);
        // Just to check if the process exists and throw an exception otherwise
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.shell(['kill', '-0', pid]));

      case 3:
        timeoutMs = 1000;
        stdout = undefined;
        context$1$0.prev = 5;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _asyncbox.waitForCondition)(function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.shell(['kill', pid]));

              case 3:
                stdout = context$2$0.sent;
                return context$2$0.abrupt('return', false);

              case 7:
                context$2$0.prev = 7;
                context$2$0.t0 = context$2$0['catch'](0);
                return context$2$0.abrupt('return', true);

              case 10:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3, [[0, 7]]);
        }, { waitMs: timeoutMs, intervalMs: 300 }));

      case 8:
        context$1$0.next = 16;
        break;

      case 10:
        context$1$0.prev = 10;
        context$1$0.t0 = context$1$0['catch'](5);

        _loggerJs2['default'].warn('Cannot kill process ' + pid + ' in ' + timeoutMs + ' ms. Trying to force kill...');
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(this.shell(['kill', '-9', pid]));

      case 15:
        stdout = context$1$0.sent;

      case 16:
        return context$1$0.abrupt('return', stdout);

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 10]]);
};

/**
 * Broadcast process killing on the device under test.
 *
 * @param {string} intent - The name of the intent to broadcast to.
 * @param {string} processName - The name of the killed process.
 * @throws {error} If the process was not killed.
 */
methods.broadcastProcessEnd = function callee$0$0(intent, processName) {
  var start, timeoutMs;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // start the broadcast without waiting for it to finish.
        this.broadcast(intent);
        // wait for the process to end
        start = Date.now();
        timeoutMs = 40000;
        context$1$0.prev = 3;

      case 4:
        if (!(Date.now() - start < timeoutMs)) {
          context$1$0.next = 14;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.processExists(processName));

      case 7:
        if (!context$1$0.sent) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(400));

      case 10:
        return context$1$0.abrupt('continue', 4);

      case 11:
        return context$1$0.abrupt('return');

      case 14:
        throw new Error('Process never died within ' + timeoutMs + ' ms');

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](3);

        _loggerJs2['default'].errorAndThrow('Unable to broadcast process end. Original error: ' + context$1$0.t0.message);

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 17]]);
};

/**
 * Broadcast a message to the given intent.
 *
 * @param {string} intent - The name of the intent to broadcast to.
 * @throws {error} If intent name is not a valid class name.
 */
methods.broadcast = function callee$0$0(intent) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isValidClass(intent)) {
          _loggerJs2['default'].errorAndThrow('Invalid intent ' + intent);
        }
        _loggerJs2['default'].debug('Broadcasting: ' + intent);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['am', 'broadcast', '-a', intent]));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Kill Android instruments if they are currently running.
 */
methods.endAndroidCoverage = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(this.instrumentProc && this.instrumentProc.isRunning)) {
          context$1$0.next = 3;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.instrumentProc.stop());

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Instrument the particular activity.
 *
 * @param {string} pkg - The name of the package to be instrumented.
 * @param {string} activity - The name of the main activity in this package.
 * @param {string} instrumentWith - The name of the package to instrument
 *                                  the activity with.
 * @throws {error} If any exception is reported by adb shell.
 */
methods.instrument = function callee$0$0(pkg, activity, instrumentWith) {
  var pkgActivity, stdout;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (activity[0] !== ".") {
          pkg = "";
        }
        pkgActivity = (pkg + activity).replace(/\.+/g, '.');
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.shell(['am', 'instrument', '-e', 'main_activity', pkgActivity, instrumentWith]));

      case 4:
        stdout = context$1$0.sent;

        if (stdout.indexOf("Exception") !== -1) {
          _loggerJs2['default'].errorAndThrow('Unknown exception during instrumentation. ' + ('Original error ' + stdout.split("\n")[0]));
        }

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Collect Android coverage by instrumenting the particular activity.
 *
 * @param {string} instrumentClass - The name of the instrumentation class.
 * @param {string} waitPkg - The name of the package to be instrumented.
 * @param {string} waitActivity - The name of the main activity in this package.
 *
 * @return {promise} The promise is successfully resolved if the instrumentation starts
 *                   without errors.
 */
methods.androidCoverage = function callee$0$0(instrumentClass, waitPkg, waitActivity) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this4 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isValidClass(instrumentClass)) {
          _loggerJs2['default'].errorAndThrow('Invalid class ' + instrumentClass);
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(new _bluebird2['default'](function callee$1$0(resolve, reject) {
          var args;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                args = this.executable.defaultArgs.concat(['shell', 'am', 'instrument', '-e', 'coverage', 'true', '-w']).concat([instrumentClass]);

                _loggerJs2['default'].debug('Collecting coverage data with: ' + [this.executable.path].concat(args).join(' '));
                context$2$0.prev = 2;

                // am instrument runs for the life of the app process.
                this.instrumentProc = new _teen_process.SubProcess(this.executable.path, args);
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(this.instrumentProc.start(0));

              case 6:
                this.instrumentProc.on('output', function (stdout, stderr) {
                  if (stderr) {
                    reject(new Error('Failed to run instrumentation. Original error: ' + stderr));
                  }
                });
                context$2$0.next = 9;
                return _regeneratorRuntime.awrap(this.waitForActivity(waitPkg, waitActivity));

              case 9:
                resolve();
                context$2$0.next = 15;
                break;

              case 12:
                context$2$0.prev = 12;
                context$2$0.t0 = context$2$0['catch'](2);

                reject(new Error('Android coverage failed. Original error: ' + context$2$0.t0.message));

              case 15:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this4, [[2, 12]]);
        }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the particular property of the device under test.
 *
 * @param {string} property - The name of the property. This name should
 *                            be known to _adb shell getprop_ tool.
 *
 * @return {string} The value of the given property.
 */
methods.getDeviceProperty = function callee$0$0(property) {
  var stdout, val;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['getprop', property]));

      case 2:
        stdout = context$1$0.sent;
        val = stdout.trim();

        _loggerJs2['default'].debug('Current device property \'' + property + '\': ' + val);
        return context$1$0.abrupt('return', val);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the particular property of the device under test.
 *
 * @param {string} property - The name of the property. This name should
 *                            be known to _adb shell setprop_ tool.
 * @param {string} val - The new property value.
 *
 * @throws {error} If _setprop_ utility fails to change property value.
 */
methods.setDeviceProperty = function callee$0$0(prop, val) {
  var apiLevel, err;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 2:
        apiLevel = context$1$0.sent;

        if (!(apiLevel >= 26)) {
          context$1$0.next = 7;
          break;
        }

        _loggerJs2['default'].debug('Running adb root, Android O needs adb to be rooted to setDeviceProperty');
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.root());

      case 7:
        _loggerJs2['default'].debug('Setting device property \'' + prop + '\' to \'' + val + '\'');
        err = undefined;
        context$1$0.prev = 9;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.shell(['setprop', prop, val]));

      case 12:
        context$1$0.next = 17;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](9);

        err = context$1$0.t0;

      case 17:
        if (!(apiLevel >= 26)) {
          context$1$0.next = 21;
          break;
        }

        _loggerJs2['default'].debug('Removing adb root for setDeviceProperty');
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.unroot());

      case 21:
        if (!err) {
          context$1$0.next = 23;
          break;
        }

        throw err;

      case 23:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 14]]);
};

/**
 * @return {string} Current system language on the device under test.
 */
// eslint-disable-line curly
methods.getDeviceSysLanguage = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("persist.sys.language"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the new system language on the device under test.
 *
 * @param {string} language - The new language value.
 */
methods.setDeviceSysLanguage = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceProperty("persist.sys.language", language.toLowerCase()));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @return {string} Current country name on the device under test.
 */
methods.getDeviceSysCountry = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("persist.sys.country"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the new system country on the device under test.
 *
 * @param {string} country - The new country value.
 */
methods.setDeviceSysCountry = function callee$0$0(country) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceProperty("persist.sys.country", country.toUpperCase()));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @return {string} Current system locale name on the device under test.
 */
methods.getDeviceSysLocale = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("persist.sys.locale"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set the new system locale on the device under test.
 *
 * @param {string} locale - The new locale value.
 */
methods.setDeviceSysLocale = function callee$0$0(locale) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setDeviceProperty("persist.sys.locale", locale));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @return {string} Current product language name on the device under test.
 */
methods.getDeviceProductLanguage = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("ro.product.locale.language"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @return {string} Current product country name on the device under test.
 */
methods.getDeviceProductCountry = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("ro.product.locale.region"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @return {string} Current product locale name on the device under test.
 */
methods.getDeviceProductLocale = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("ro.product.locale"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @return {string} The model name of the device under test.
 */
methods.getModel = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("ro.product.model"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * @return {string} The manufacturer name of the device under test.
 */
methods.getManufacturer = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getDeviceProperty("ro.product.manufacturer"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the current screen size.
 *
 * @return {string} Device screen size as string in format 'WxH' or
 *                  _null_ if it cannot be determined.
 */
methods.getScreenSize = function callee$0$0() {
  var stdout, size;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['wm', 'size']));

      case 2:
        stdout = context$1$0.sent;
        size = new RegExp(/Physical size: ([^\r?\n]+)*/g).exec(stdout);

        if (!(size && size.length >= 2)) {
          context$1$0.next = 6;
          break;
        }

        return context$1$0.abrupt('return', size[1].trim());

      case 6:
        return context$1$0.abrupt('return', null);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the current screen density in dpi
 *
 * @return {?number} Device screen density as a number or _null_ if it
 *                  cannot be determined
 */
methods.getScreenDensity = function callee$0$0() {
  var stdout, density, densityNumber;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['wm', 'density']));

      case 2:
        stdout = context$1$0.sent;
        density = new RegExp(/Physical density: ([^\r?\n]+)*/g).exec(stdout);

        if (!(density && density.length >= 2)) {
          context$1$0.next = 7;
          break;
        }

        densityNumber = parseInt(density[1].trim(), 10);
        return context$1$0.abrupt('return', isNaN(densityNumber) ? null : densityNumber);

      case 7:
        return context$1$0.abrupt('return', null);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Setup HTTP proxy in device settings.
 *
 * @param {string} proxyHost - The host name of the proxy.
 * @param {string|number} proxyPort - The port number to be set.
 */
methods.setHttpProxy = function callee$0$0(proxyHost, proxyPort) {
  var proxy;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        proxy = proxyHost + ':' + proxyPort;

        if (_lodash2['default'].isUndefined(proxyHost)) {
          _loggerJs2['default'].errorAndThrow('Call to setHttpProxy method with undefined proxy_host: ' + proxy);
        }
        if (_lodash2['default'].isUndefined(proxyPort)) {
          _loggerJs2['default'].errorAndThrow('Call to setHttpProxy method with undefined proxy_port ' + proxy);
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.setSetting('global', 'http_proxy', proxy));

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.setSetting('secure', 'http_proxy', proxy));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.setSetting('system', 'http_proxy', proxy));

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.setSetting('system', 'global_http_proxy_host', proxyHost));

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.setSetting('system', 'global_http_proxy_port', proxyPort));

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Set device property.
 * [android.provider.Settings]{@link https://developer.android.com/reference/android/provider/Settings.html}
 *
 * @param {string} namespace - one of {system, secure, global}, case-insensitive.
 * @param {string} setting - property name.
 * @param {string|number} value - property value.
 * @return {string} command output.
 */
methods.setSetting = function callee$0$0(namespace, setting, value) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['settings', 'put', namespace, setting, value]));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get device property.
 * [android.provider.Settings]{@link https://developer.android.com/reference/android/provider/Settings.html}
 *
 * @param {string} namespace - one of {system, secure, global}, case-insensitive.
 * @param {string} setting - property name.
 * @return {string} property value.
 */
methods.getSetting = function callee$0$0(namespace, setting) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['settings', 'get', namespace, setting]));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = methods;
module.exports = exports['default'];

/**
 * If apk not provided, considering apk already installed on the device
 * and fetching targetSdk using package name.
 */

/**
 * If the device is running Android 6.0(API 23) or higher, and your app's target SDK is 23 or higher:
 * The app has to list the permissions in the manifest.
 * refer: https://developer.android.com/training/permissions/requesting.html
 */

// As it consumes more time for granting each permission,
// trying to grant all permission by forming equivalent command.
// Also, it is necessary to split long commands into chunks, since the maximum length of
// adb shell buffer is limited

// keycode must be an int.

// wait for the screen to lock

// optional debugging
// if the method is not working, turn it on and send us the output

// pull folder can take more time, increasing time out to 60 secs

// kill returns non-zero code if the process is already killed

// cool down
// Fix pkg..activity error
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hZGItY29tbWFuZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3dCQUFnQixjQUFjOzs7O3lCQUV5QixlQUFlOztvQkFDckQsTUFBTTs7OztzQkFDVCxRQUFROzs7OzZCQUNILGdCQUFnQjs7bUJBQ25CLEtBQUs7Ozs7c0JBQ0YsV0FBVzs7Ozt3QkFDeUIsVUFBVTs7NEJBQ3RDLGNBQWM7O3dCQUMzQixVQUFVOzs7O0FBRXhCLElBQU0sa0JBQWtCLEdBQUcsb0JBQW9CLENBQUM7QUFDaEQsSUFBTSxnQ0FBZ0MsR0FBTSxrQkFBa0IsOENBQTJDLENBQUM7QUFDMUcsSUFBTSw4QkFBOEIsR0FBTSxrQkFBa0IsVUFBTyxDQUFDO0FBQ3BFLElBQU0sZ0NBQWdDLEdBQU0sa0JBQWtCLDhDQUEyQyxDQUFDO0FBQzFHLElBQU0sOEJBQThCLEdBQU0sa0JBQWtCLHFCQUFrQixDQUFDO0FBQy9FLElBQU0sMEJBQTBCLEdBQU0sa0JBQWtCLHlDQUFzQyxDQUFDO0FBQy9GLElBQU0sd0JBQXdCLEdBQU0sa0JBQWtCLGVBQVksQ0FBQztBQUNuRSxJQUFNLHVCQUF1QixHQUFNLGtCQUFrQixzQ0FBbUMsQ0FBQztBQUN6RixJQUFNLHFCQUFxQixHQUFNLGtCQUFrQixZQUFTLENBQUM7QUFDN0QsSUFBTSxnQkFBZ0IsR0FBTSxrQkFBa0Isc0JBQW1CLENBQUM7QUFDbEUsSUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUM7O0FBRXJDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7QUFRakIsT0FBTyxDQUFDLHdCQUF3QixHQUFHOzs7Ozt5Q0FDSixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDOzs7QUFBekQsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJOztBQUNwQixZQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzs0Q0FDbEMsSUFBSSxDQUFDLEdBQUc7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b0JBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQzVCLGdDQUFJLGFBQWEsNkRBQTJELEtBQUssQ0FBRyxDQUFDO1NBQ3RGO0FBQ0QsWUFBSSxvQkFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7QUFDNUIsZ0NBQUksYUFBYSw0REFBMEQsS0FBSyxDQUFHLENBQUM7U0FDckY7O3lDQUNLLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUM7Ozs7eUNBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUM7Ozs7eUNBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUM7Ozs7eUNBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLHdCQUF3QixFQUFFLFNBQVMsQ0FBQzs7Ozt5Q0FDOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxDQUFDOzs7Ozs7O0NBQ3JFLENBQUM7Ozs7Ozs7Ozs7O0FBV0YsT0FBTyxDQUFDLFVBQVUsR0FBRyxvQkFBZ0IsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLOzs7Ozt5Q0FDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7OztDQUN4RSxDQUFDOzs7Ozs7Ozs7O0FBVUYsT0FBTyxDQUFDLFVBQVUsR0FBRyxvQkFBZ0IsU0FBUyxFQUFFLE9BQU87Ozs7O3lDQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDakUsQ0FBQzs7cUJBRWEsT0FBTyIsImZpbGUiOiJsaWIvdG9vbHMvYWRiLWNvbW1hbmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXIuanMnO1xyXG5pbXBvcnQgeyBnZXRJTUVMaXN0RnJvbU91dHB1dCwgaXNTaG93aW5nTG9ja3NjcmVlbiwgaXNDdXJyZW50Rm9jdXNPbktleWd1YXJkLFxyXG4gICAgICAgICBnZXRTdXJmYWNlT3JpZW50YXRpb24sIGlzU2NyZWVuT25GdWxseSB9IGZyb20gJy4uL2hlbHBlcnMuanMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XHJcbmltcG9ydCBuZXQgZnJvbSAnbmV0JztcclxuaW1wb3J0IExvZ2NhdCBmcm9tICcuLi9sb2djYXQnO1xyXG5pbXBvcnQgeyBzbGVlcCwgcmV0cnlJbnRlcnZhbCwgd2FpdEZvckNvbmRpdGlvbiB9IGZyb20gJ2FzeW5jYm94JztcclxuaW1wb3J0IHsgU3ViUHJvY2VzcyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XHJcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcclxuXHJcbmNvbnN0IFNFVFRJTkdTX0hFTFBFUl9JRCA9ICdpby5hcHBpdW0uc2V0dGluZ3MnO1xyXG5jb25zdCBXSUZJX0NPTk5FQ1RJT05fU0VUVElOR19SRUNFSVZFUiA9IGAke1NFVFRJTkdTX0hFTFBFUl9JRH0vLnJlY2VpdmVycy5XaUZpQ29ubmVjdGlvblNldHRpbmdSZWNlaXZlcmA7XHJcbmNvbnN0IFdJRklfQ09OTkVDVElPTl9TRVRUSU5HX0FDVElPTiA9IGAke1NFVFRJTkdTX0hFTFBFUl9JRH0ud2lmaWA7XHJcbmNvbnN0IERBVEFfQ09OTkVDVElPTl9TRVRUSU5HX1JFQ0VJVkVSID0gYCR7U0VUVElOR1NfSEVMUEVSX0lEfS8ucmVjZWl2ZXJzLkRhdGFDb25uZWN0aW9uU2V0dGluZ1JlY2VpdmVyYDtcclxuY29uc3QgREFUQV9DT05ORUNUSU9OX1NFVFRJTkdfQUNUSU9OID0gYCR7U0VUVElOR1NfSEVMUEVSX0lEfS5kYXRhX2Nvbm5lY3Rpb25gO1xyXG5jb25zdCBBTklNQVRJT05fU0VUVElOR19SRUNFSVZFUiA9IGAke1NFVFRJTkdTX0hFTFBFUl9JRH0vLnJlY2VpdmVycy5BbmltYXRpb25TZXR0aW5nUmVjZWl2ZXJgO1xyXG5jb25zdCBBTklNQVRJT05fU0VUVElOR19BQ1RJT04gPSBgJHtTRVRUSU5HU19IRUxQRVJfSUR9LmFuaW1hdGlvbmA7XHJcbmNvbnN0IExPQ0FMRV9TRVRUSU5HX1JFQ0VJVkVSID0gYCR7U0VUVElOR1NfSEVMUEVSX0lEfS8ucmVjZWl2ZXJzLkxvY2FsZVNldHRpbmdSZWNlaXZlcmA7XHJcbmNvbnN0IExPQ0FMRV9TRVRUSU5HX0FDVElPTiA9IGAke1NFVFRJTkdTX0hFTFBFUl9JRH0ubG9jYWxlYDtcclxuY29uc3QgTE9DQVRJT05fU0VSVklDRSA9IGAke1NFVFRJTkdTX0hFTFBFUl9JRH0vLkxvY2F0aW9uU2VydmljZWA7XHJcbmNvbnN0IE1BWF9TSEVMTF9CVUZGRVJfTEVOR1RIID0gMTAwMDtcclxuXHJcbmxldCBtZXRob2RzID0ge307XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBwYXRoIHRvIGFkYiBleGVjdXRhYmxlIGFtZCBhc3NpZ24gaXRcclxuICogdG8gdGhpcy5leGVjdXRhYmxlLnBhdGggYW5kIHRoaXMuYmluYXJpZXMuYWRiIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gRnVsbCBwYXRoIHRvIGFkYiBleGVjdXRhYmxlLlxyXG4gKi9cclxubWV0aG9kcy5nZXRBZGJXaXRoQ29ycmVjdEFkYlBhdGggPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5leGVjdXRhYmxlLnBhdGggPSBhd2FpdCB0aGlzLmdldFNka0JpbmFyeVBhdGgoXCJhZGJcIik7XHJcbiAgdGhpcy5iaW5hcmllcy5hZGIgPSB0aGlzLmV4ZWN1dGFibGUucGF0aDtcclxuICByZXR1cm4gdGhpcy5hZGI7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBmdWxsIHBhdGggdG8gYWFwdCB0b29sIGFuZCBhc3NpZ24gaXQgdG9cclxuICogdGhpcy5iaW5hcmllcy5hYXB0IHByb3BlcnR5XHJcbiAqL1xyXG5tZXRob2RzLmluaXRBYXB0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuYmluYXJpZXMuYWFwdCA9IGF3YWl0IHRoaXMuZ2V0U2RrQmluYXJ5UGF0aChcImFhcHRcIik7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBmdWxsIHBhdGggdG8gemlwYWxpZ24gdG9vbCBhbmQgYXNzaWduIGl0IHRvXHJcbiAqIHRoaXMuYmluYXJpZXMuemlwYWxpZ24gcHJvcGVydHlcclxuICovXHJcbm1ldGhvZHMuaW5pdFppcEFsaWduID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuYmluYXJpZXMuemlwYWxpZ24gPSBhd2FpdCB0aGlzLmdldFNka0JpbmFyeVBhdGgoXCJ6aXBhbGlnblwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSB0aGUgQVBJIGxldmVsIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgQVBJIGxldmVsIGFzIGludGVnZXIgbnVtYmVyLCBmb3IgZXhhbXBsZSAyMSBmb3JcclxuICogICAgICAgICAgICAgICAgICBBbmRyb2lkIExvbGxpcG9wLiBUaGUgcmVzdWx0IG9mIHRoaXMgbWV0aG9kIGlzIGNhY2hlZCwgc28gYWxsIHRoZSBmdXJ0aGVyXHJcbiAqIGNhbGxzIHJldHVybiB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgZmlyc3Qgb25lLlxyXG4gKi9cclxubWV0aG9kcy5nZXRBcGlMZXZlbCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBpZiAoIV8uaXNJbnRlZ2VyKHRoaXMuX2FwaUxldmVsKSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3RyT3V0cHV0ID0gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9wZXJ0eSgncm8uYnVpbGQudmVyc2lvbi5zZGsnKTtcclxuICAgICAgdGhpcy5fYXBpTGV2ZWwgPSBwYXJzZUludChzdHJPdXRwdXQudHJpbSgpLCAxMCk7XHJcbiAgICAgIGlmIChpc05hTih0aGlzLl9hcGlMZXZlbCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBhY3R1YWwgb3V0cHV0IFwiJHtzdHJPdXRwdXR9XCIgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhbiBpbnRlZ2VyYCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgZGV2aWNlIEFQSSBsZXZlbC4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gICAgfVxyXG4gIH1cclxuICBsb2cuZGVidWcoYERldmljZSBBUEkgbGV2ZWw6ICR7dGhpcy5fYXBpTGV2ZWx9YCk7XHJcbiAgcmV0dXJuIHRoaXMuX2FwaUxldmVsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBwbGF0Zm9ybSB2ZXJzaW9uIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgcGxhdGZvcm0gdmVyc2lvbiBhcyBhIHN0cmluZywgZm9yIGV4YW1wbGUgJzUuMCcgZm9yXHJcbiAqIEFuZHJvaWQgTG9sbGlwb3AuXHJcbiAqL1xyXG5tZXRob2RzLmdldFBsYXRmb3JtVmVyc2lvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsb2cuaW5mbyhcIkdldHRpbmcgZGV2aWNlIHBsYXRmb3JtIHZlcnNpb25cIik7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBhd2FpdCB0aGlzLmdldERldmljZVByb3BlcnR5KCdyby5idWlsZC52ZXJzaW9uLnJlbGVhc2UnKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZ2V0dGluZyBkZXZpY2UgcGxhdGZvcm0gdmVyc2lvbi4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBWZXJpZnkgd2hldGhlciBhIGRldmljZSBpcyBjb25uZWN0ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYXQgbGVhc3Qgb25lIGRldmljZSBpcyB2aXNpYmxlIHRvIGFkYi5cclxuICovXHJcbm1ldGhvZHMuaXNEZXZpY2VDb25uZWN0ZWQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGRldmljZXMgPSBhd2FpdCB0aGlzLmdldENvbm5lY3RlZERldmljZXMoKTtcclxuICByZXR1cm4gZGV2aWNlcy5sZW5ndGggPiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIG5ldyBmb2xkZXIgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVtb3RlUGF0aCAtIFRoZSBuZXcgcGF0aCB0byBiZSBjcmVhdGVkLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IG1rZGlyIGNvbW1hbmQgb3V0cHV0LlxyXG4gKi9cclxubWV0aG9kcy5ta2RpciA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlbGwoWydta2RpcicsICctcCcsIHJlbW90ZVBhdGhdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWZXJpZnkgd2hldGhlciB0aGUgZ2l2ZW4gYXJndW1lbnQgaXMgYVxyXG4gKiB2YWxpZCBjbGFzcyBuYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NTdHJpbmcgLSBUaGUgYWN0dWFsIGNsYXNzIG5hbWUgdG8gYmUgdmVyaWZpZWQuXHJcbiAqIEByZXR1cm4gez9BcnJheS48TWF0Y2g+fSBUaGUgcmVzdWx0IG9mIFJlZ2V4cC5leGVjIG9wZXJhdGlvblxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgX251bGxfIGlmIG5vIG1hdGNoZXMgYXJlIGZvdW5kLlxyXG4gKi9cclxubWV0aG9kcy5pc1ZhbGlkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NTdHJpbmcpIHtcclxuICAvLyBzb21lLnBhY2thZ2Uvc29tZS5wYWNrYWdlLkFjdGl2aXR5XHJcbiAgcmV0dXJuIG5ldyBSZWdFeHAoL15bYS16QS1aMC05XFwuL19dKyQvKS5leGVjKGNsYXNzU3RyaW5nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGb3JjZSBhcHBsaWNhdGlvbiB0byBzdG9wIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBwYWNrYWdlIG5hbWUgdG8gYmUgc3RvcHBlZC5cclxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgb3V0cHV0IG9mIHRoZSBjb3JyZXNwb25kaW5nIGFkYiBjb21tYW5kLlxyXG4gKi9cclxubWV0aG9kcy5mb3JjZVN0b3AgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlbGwoWydhbScsICdmb3JjZS1zdG9wJywgcGtnXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYXIgdGhlIHVzZXIgZGF0YSBvZiB0aGUgcGFydGljdWxhciBhcHBsaWNhdGlvbiBvbiB0aGUgZGV2aWNlXHJcbiAqIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwa2cgLSBUaGUgcGFja2FnZSBuYW1lIHRvIGJlIGNsZWFyZWQuXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIG91dHB1dCBvZiB0aGUgY29ycmVzcG9uZGluZyBhZGIgY29tbWFuZC5cclxuICovXHJcbm1ldGhvZHMuY2xlYXIgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlbGwoWydwbScsICdjbGVhcicsIHBrZ10pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdyYW50IGFsbCBwZXJtaXNzaW9ucyByZXF1ZXN0ZWQgYnkgdGhlIHBhcnRpY3VsYXIgcGFja2FnZS5cclxuICogVGhpcyBtZXRob2QgaXMgb25seSB1c2VmdWwgb24gQW5kcm9pZCA2LjArIGFuZCBmb3IgYXBwbGljYXRpb25zXHJcbiAqIHRoYXQgc3VwcG9ydCBjb21wb25lbnRzLWJhc2VkIHBlcm1pc3Npb25zIHNldHRpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwa2cgLSBUaGUgcGFja2FnZSBuYW1lIHRvIGJlIHByb2Nlc3NlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBwYXRoIHRvIHRoZSBhY3R1YWwgYXBrIGZpbGUuXHJcbiAqIEByZXR1cm4ge3N0cmluZ3xib29sZWFufSBUaGUgb3V0cHV0IG9mIHRoZSBjb3JyZXNwb25kaW5nIGFkYiBjb21tYW5kXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBvciBfZmFsc2VfIGlmIHRoZXJlIHdhcyBhbiBlcnJvciBkdXJpbmcgY29tbWFuZCBleGVjdXRpb24uXHJcbiAqL1xyXG5tZXRob2RzLmdyYW50QWxsUGVybWlzc2lvbnMgPSBhc3luYyBmdW5jdGlvbiAocGtnLCBhcGspIHtcclxuICBsZXQgYXBpTGV2ZWwgPSBhd2FpdCB0aGlzLmdldEFwaUxldmVsKCk7XHJcbiAgbGV0IHRhcmdldFNkayA9IG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIGlmICghYXBrKSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBJZiBhcGsgbm90IHByb3ZpZGVkLCBjb25zaWRlcmluZyBhcGsgYWxyZWFkeSBpbnN0YWxsZWQgb24gdGhlIGRldmljZVxyXG4gICAgICAgKiBhbmQgZmV0Y2hpbmcgdGFyZ2V0U2RrIHVzaW5nIHBhY2thZ2UgbmFtZS5cclxuICAgICAgICovXHJcbiAgICAgIHRhcmdldFNkayA9IGF3YWl0IHRoaXMudGFyZ2V0U2RrVmVyc2lvblVzaW5nUEtHKHBrZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0YXJnZXRTZGsgPSBhd2FpdCB0aGlzLnRhcmdldFNka1ZlcnNpb25Gcm9tTWFuaWZlc3QoYXBrKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICAvL2F2b2lkaW5nIGxvZ2dpbmcgZXJyb3Igc3RhY2ssIGFzIGNhbGxpbmcgbGlicmFyeSBmdW5jdGlvbiB3b3VsZCBoYXZlIGxvZ2dlZFxyXG4gICAgbG9nLndhcm4oYFJhbiBpbnRvIHByb2JsZW0gZ2V0dGluZyB0YXJnZXQgU0RLIHZlcnNpb247IGlnbm9yaW5nLi4uYCk7XHJcbiAgfVxyXG4gIGlmIChhcGlMZXZlbCA+PSAyMyAmJiB0YXJnZXRTZGsgPj0gMjMpIHtcclxuICAgIC8qKlxyXG4gICAgICogSWYgdGhlIGRldmljZSBpcyBydW5uaW5nIEFuZHJvaWQgNi4wKEFQSSAyMykgb3IgaGlnaGVyLCBhbmQgeW91ciBhcHAncyB0YXJnZXQgU0RLIGlzIDIzIG9yIGhpZ2hlcjpcclxuICAgICAqIFRoZSBhcHAgaGFzIHRvIGxpc3QgdGhlIHBlcm1pc3Npb25zIGluIHRoZSBtYW5pZmVzdC5cclxuICAgICAqIHJlZmVyOiBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS90cmFpbmluZy9wZXJtaXNzaW9ucy9yZXF1ZXN0aW5nLmh0bWxcclxuICAgICAqL1xyXG4gICAgY29uc3Qgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ3BtJywgJ2R1bXAnLCBwa2ddKTtcclxuICAgIGNvbnN0IHJlcXVlc3RlZFBlcm1pc3Npb25zID0gYXdhaXQgdGhpcy5nZXRSZXFQZXJtaXNzaW9ucyhwa2csIHN0ZG91dCk7XHJcbiAgICBjb25zdCBncmFudGVkUGVybWlzc2lvbnMgPSBhd2FpdCB0aGlzLmdldEdyYW50ZWRQZXJtaXNzaW9ucyhwa2csIHN0ZG91dCk7XHJcbiAgICBjb25zdCBwZXJtaXNzb25zVG9HcmFudCA9IHJlcXVlc3RlZFBlcm1pc3Npb25zLmZpbHRlcigoeCkgPT4gZ3JhbnRlZFBlcm1pc3Npb25zLmluZGV4T2YoeCkgPCAwKTtcclxuICAgIGlmICghcGVybWlzc29uc1RvR3JhbnQubGVuZ3RoKSB7XHJcbiAgICAgIGxvZy5pbmZvKGAke3BrZ30gY29udGFpbnMgbm8gcGVybWlzc2lvbnMgYXZhaWxhYmxlIGZvciBncmFudGluZy5gKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyBBcyBpdCBjb25zdW1lcyBtb3JlIHRpbWUgZm9yIGdyYW50aW5nIGVhY2ggcGVybWlzc2lvbixcclxuICAgIC8vIHRyeWluZyB0byBncmFudCBhbGwgcGVybWlzc2lvbiBieSBmb3JtaW5nIGVxdWl2YWxlbnQgY29tbWFuZC5cclxuICAgIC8vIEFsc28sIGl0IGlzIG5lY2Vzc2FyeSB0byBzcGxpdCBsb25nIGNvbW1hbmRzIGludG8gY2h1bmtzLCBzaW5jZSB0aGUgbWF4aW11bSBsZW5ndGggb2ZcclxuICAgIC8vIGFkYiBzaGVsbCBidWZmZXIgaXMgbGltaXRlZFxyXG4gICAgbGV0IGNtZHMgPSBbXTtcclxuICAgIGxldCBjbWRDaHVuayA9IFtdO1xyXG4gICAgZm9yIChsZXQgcGVybWlzc2lvbiBvZiBwZXJtaXNzb25zVG9HcmFudCkge1xyXG4gICAgICBjb25zdCBuZXh0Q21kID0gWydwbScsICdncmFudCcsIHBrZywgcGVybWlzc2lvbiwgJzsnXTtcclxuICAgICAgaWYgKG5leHRDbWQuam9pbignICcpLmxlbmd0aCArIGNtZENodW5rLmpvaW4oJyAnKS5sZW5ndGggPj0gTUFYX1NIRUxMX0JVRkZFUl9MRU5HVEgpIHtcclxuICAgICAgICBjbWRzLnB1c2goY21kQ2h1bmspO1xyXG4gICAgICAgIGNtZENodW5rID0gW107XHJcbiAgICAgIH1cclxuICAgICAgY21kQ2h1bmsgPSBjbWRDaHVuay5jb25jYXQobmV4dENtZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY21kQ2h1bmsubGVuZ3RoKSB7XHJcbiAgICAgIGNtZHMucHVzaChjbWRDaHVuayk7XHJcbiAgICB9XHJcbiAgICBsb2cuZGVidWcoYEdvdCB0aGUgZm9sbG93aW5nIGNvbW1hbmQgY2h1bmtzIHRvIGV4ZWN1dGU6ICR7Y21kc31gKTtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgbGV0IGxhc3RFcnJvciA9IG51bGw7XHJcbiAgICBmb3IgKGxldCBjbWQgb2YgY21kcykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuc2hlbGwoY21kKSAmJiByZXN1bHQ7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyB0aGlzIGlzIHRvIGdpdmUgdGhlIG1ldGhvZCBhIGNoYW5jZSB0byBhc3NpZ24gYWxsIHRoZSByZXF1ZXN0ZWQgcGVybWlzc2lvbnNcclxuICAgICAgICAvLyBiZWZvcmUgdG8gcXVpdCBpbiBjYXNlIHdlJ2QgbGlrZSB0byBpZ25vcmUgdGhlIGVycm9yIG9uIHRoZSBoaWdoZXIgbGV2ZWxcclxuICAgICAgICBsYXN0RXJyb3IgPSBlO1xyXG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobGFzdEVycm9yKSB7XHJcbiAgICAgIHRocm93IGxhc3RFcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdyYW50IHNpbmdsZSBwZXJtaXNzaW9uIGZvciB0aGUgcGFydGljdWxhciBwYWNrYWdlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIHBhY2thZ2UgbmFtZSB0byBiZSBwcm9jZXNzZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwZXJtaXNzaW9uIC0gVGhlIGZ1bGwgbmFtZSBvZiB0aGUgcGVybWlzc2lvbiB0byBiZSBncmFudGVkLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGNoYW5naW5nIHBlcm1pc3Npb25zLlxyXG4gKi9cclxubWV0aG9kcy5ncmFudFBlcm1pc3Npb24gPSBhc3luYyBmdW5jdGlvbiAocGtnLCBwZXJtaXNzaW9uKSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHRoaXMuc2hlbGwoWydwbScsICdncmFudCcsIHBrZywgcGVybWlzc2lvbl0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBpZiAoIWVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJub3QgYSBjaGFuZ2VhYmxlIHBlcm1pc3Npb24gdHlwZVwiKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV2b2tlIHNpbmdsZSBwZXJtaXNzaW9uIGZyb20gdGhlIHBhcnRpY3VsYXIgcGFja2FnZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBwYWNrYWdlIG5hbWUgdG8gYmUgcHJvY2Vzc2VkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGVybWlzc2lvbiAtIFRoZSBmdWxsIG5hbWUgb2YgdGhlIHBlcm1pc3Npb24gdG8gYmUgcmV2b2tlZC5cclxuICogQHRocm93cyB7RXJyb3J9IElmIHRoZXJlIHdhcyBhbiBlcnJvciB3aGlsZSBjaGFuZ2luZyBwZXJtaXNzaW9ucy5cclxuICovXHJcbm1ldGhvZHMucmV2b2tlUGVybWlzc2lvbiA9IGFzeW5jIGZ1bmN0aW9uIChwa2csIHBlcm1pc3Npb24pIHtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgdGhpcy5zaGVsbChbJ3BtJywgJ3Jldm9rZScsIHBrZywgcGVybWlzc2lvbl0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBpZiAoIWVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJub3QgYSBjaGFuZ2VhYmxlIHBlcm1pc3Npb24gdHlwZVwiKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIGxpc3Qgb2YgZ3JhbnRlZCBwZXJtaXNzaW9ucyBmb3IgdGhlIHBhcnRpY3VsYXIgcGFja2FnZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBwYWNrYWdlIG5hbWUgdG8gYmUgcHJvY2Vzc2VkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY21kT3V0cHV0IFtudWxsXSAtIE9wdGlvbmFsIHBhcmFtZXRlciBjb250YWluaW5nIGNvbW1hbmQgb3V0cHV0IG9mXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BtIGR1bXBfIGNvbW1hbmQuIEl0IHNwZWVkcyB0aGlzIG1ldGhvZCB1cFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHByZXNlbnQuXHJcbiAqIEByZXR1cm4ge2FycmF5fSBUaGUgbGlzdCBvZiBncmFudGVkIHBlcm1pc3Npb25zIG9yIGFuIGVtcHR5IGxpc3QuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGVyZSB3YXMgYW4gZXJyb3Igd2hpbGUgY2hhbmdpbmcgcGVybWlzc2lvbnMuXHJcbiAqL1xyXG5tZXRob2RzLmdldEdyYW50ZWRQZXJtaXNzaW9ucyA9IGFzeW5jIGZ1bmN0aW9uIChwa2csIGNtZE91dHB1dCA9IG51bGwpIHtcclxuICBsZXQgc3Rkb3V0ID0gY21kT3V0cHV0IHx8IGF3YWl0IHRoaXMuc2hlbGwoWydwbScsICdkdW1wJywgcGtnXSk7XHJcbiAgbGV0IG1hdGNoID0gbmV3IFJlZ0V4cCgvaW5zdGFsbCBwZXJtaXNzaW9uczooW1xcc1xcU10qPylEVU1QIE9GIFNFUlZJQ0UgYWN0aXZpdHk6L2cpLmV4ZWMoc3Rkb3V0KTtcclxuICBpZiAoIW1hdGNoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgZ3JhbnRlZCBwZXJtaXNzaW9ucycpO1xyXG4gIH1cclxuICByZXR1cm4gKG1hdGNoWzBdLm1hdGNoKC9hbmRyb2lkXFwucGVybWlzc2lvblxcLlxcdys6XFxzZ3JhbnRlZD10cnVlL2cpIHx8IFtdKVxyXG4gICAgLm1hcCgoeCkgPT4geC5yZXBsYWNlKC86XFxzZ3JhbnRlZD10cnVlL2csICcnKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIGxpc3Qgb2YgZGVuaWVkIHBlcm1pc3Npb25zIGZvciB0aGUgcGFydGljdWxhciBwYWNrYWdlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIHBhY2thZ2UgbmFtZSB0byBiZSBwcm9jZXNzZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbWRPdXRwdXQgW251bGxdIC0gT3B0aW9uYWwgcGFyYW1ldGVyIGNvbnRhaW5pbmcgY29tbWFuZCBvdXRwdXQgb2ZcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcG0gZHVtcF8gY29tbWFuZC4gSXQgc3BlZWRzIHRoaXMgbWV0aG9kIHVwXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcHJlc2VudC5cclxuICogQHJldHVybiB7YXJyYXl9IFRoZSBsaXN0IG9mIGRlbmllZCBwZXJtaXNzaW9ucyBvciBhbiBlbXB0eSBsaXN0LlxyXG4gKi9cclxubWV0aG9kcy5nZXREZW5pZWRQZXJtaXNzaW9ucyA9IGFzeW5jIGZ1bmN0aW9uIChwa2csIGNtZE91dHB1dCA9IG51bGwpIHtcclxuICBsZXQgc3Rkb3V0ID0gY21kT3V0cHV0IHx8IGF3YWl0IHRoaXMuc2hlbGwoWydwbScsICdkdW1wJywgcGtnXSk7XHJcbiAgbGV0IG1hdGNoID0gbmV3IFJlZ0V4cCgvaW5zdGFsbCBwZXJtaXNzaW9uczooW1xcc1xcU10qPylEVU1QIE9GIFNFUlZJQ0UgYWN0aXZpdHk6L2cpLmV4ZWMoc3Rkb3V0KTtcclxuICBpZiAoIW1hdGNoKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgZGVuaWVkIHBlcm1pc3Npb25zJyk7XHJcbiAgfVxyXG4gIHJldHVybiAobWF0Y2hbMF0ubWF0Y2goL2FuZHJvaWRcXC5wZXJtaXNzaW9uXFwuXFx3KzpcXHNncmFudGVkPWZhbHNlL2cpIHx8IFtdKVxyXG4gICAgLm1hcCgoeCkgPT4geC5yZXBsYWNlKC86XFxzZ3JhbnRlZD1mYWxzZS9nLCAnJykpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBsaXN0IG9mIHJlcXVlc3RlZCBwZXJtaXNzaW9ucyBmb3IgdGhlIHBhcnRpY3VsYXIgcGFja2FnZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBwYWNrYWdlIG5hbWUgdG8gYmUgcHJvY2Vzc2VkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY21kT3V0cHV0IFtudWxsXSAtIE9wdGlvbmFsIHBhcmFtZXRlciBjb250YWluaW5nIGNvbW1hbmQgb3V0cHV0IG9mXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3BtIGR1bXBfIGNvbW1hbmQuIEl0IHNwZWVkcyB0aGlzIG1ldGhvZCB1cFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHByZXNlbnQuXHJcbiAqIEByZXR1cm4ge2FycmF5fSBUaGUgbGlzdCBvZiByZXF1ZXN0ZWQgcGVybWlzc2lvbnMgb3IgYW4gZW1wdHkgbGlzdC5cclxuICovXHJcbm1ldGhvZHMuZ2V0UmVxUGVybWlzc2lvbnMgPSBhc3luYyBmdW5jdGlvbiAocGtnLCBjbWRPdXRwdXQgPSBudWxsKSB7XHJcbiAgbGV0IHN0ZG91dCA9IGNtZE91dHB1dCB8fCBhd2FpdCB0aGlzLnNoZWxsKFsncG0nLCAnZHVtcCcsIHBrZ10pO1xyXG4gIGxldCBtYXRjaCA9IG5ldyBSZWdFeHAoL3JlcXVlc3RlZCBwZXJtaXNzaW9uczooW1xcc1xcU10qPylpbnN0YWxsIHBlcm1pc3Npb25zOi9nKS5leGVjKHN0ZG91dCk7XHJcbiAgaWYgKCFtYXRjaCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2V0IHJlcXVlc3RlZCBwZXJtaXNzaW9ucycpO1xyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hbMF0ubWF0Y2goL2FuZHJvaWRcXC5wZXJtaXNzaW9uXFwuXFx3Ky9nKSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSB0aGUgbGlzdCBvZiBsb2NhdGlvbiBwcm92aWRlcnMgZm9yIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHJldHVybiB7QXJyYXkuPFN0cmluZz59IFRoZSBsaXN0IG9mIGF2YWlsYWJsZSBsb2NhdGlvbiBwcm92aWRlcnMgb3IgYW4gZW1wdHkgbGlzdC5cclxuICovXHJcbm1ldGhvZHMuZ2V0TG9jYXRpb25Qcm92aWRlcnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuZ2V0U2V0dGluZygnc2VjdXJlJywgJ2xvY2F0aW9uX3Byb3ZpZGVyc19hbGxvd2VkJyk7XHJcbiAgcmV0dXJuIHN0ZG91dC50cmltKCkuc3BsaXQoJywnKVxyXG4gICAgLm1hcCgocCkgPT4gcC50cmltKCkpXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZSB0aGUgc3RhdGUgb2YgR1BTIGxvY2F0aW9uIHByb3ZpZGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZWQgLSBXaGV0aGVyIHRvIGVuYWJsZSAodHJ1ZSkgb3IgZGlzYWJsZSAoZmFsc2UpIHRoZSBHUFMgcHJvdmlkZXIuXHJcbiAqL1xyXG5tZXRob2RzLnRvZ2dsZUdQU0xvY2F0aW9uUHJvdmlkZXIgPSBhc3luYyBmdW5jdGlvbiAoZW5hYmxlZCkge1xyXG4gIGF3YWl0IHRoaXMuc2V0U2V0dGluZygnc2VjdXJlJywgJ2xvY2F0aW9uX3Byb3ZpZGVyc19hbGxvd2VkJywgYCR7ZW5hYmxlZCA/IFwiK1wiIDogXCItXCJ9Z3BzYCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcCB0aGUgcGFydGljdWxhciBwYWNrYWdlIGlmIGl0IGlzIHJ1bm5pbmcgYW5kIGNsZWFycyBpdHMgYXBwbGljYXRpb24gZGF0YS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBwYWNrYWdlIG5hbWUgdG8gYmUgcHJvY2Vzc2VkLlxyXG4gKi9cclxubWV0aG9kcy5zdG9wQW5kQ2xlYXIgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHRoaXMuZm9yY2VTdG9wKHBrZyk7XHJcbiAgICBhd2FpdCB0aGlzLmNsZWFyKHBrZyk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENhbm5vdCBzdG9wIGFuZCBjbGVhciAke3BrZ30uIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIHRhcmdldCBTREsgdmVyc2lvbiBmb3IgdGhlIHBhcnRpY3VsYXIgcGFja2FnZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBwYWNrYWdlIG5hbWUgdG8gYmUgcHJvY2Vzc2VkLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBwYXJzZWQgU0RLIHZlcnNpb24uXHJcbiAqL1xyXG5tZXRob2RzLmdldFRhcmdldFNka1VzaW5nUEtHID0gYXN5bmMgZnVuY3Rpb24gKHBrZykge1xyXG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsncG0nLCAnZHVtcCcsIHBrZ10pO1xyXG4gIGxldCB0YXJnZXRTZGsgPSBuZXcgUmVnRXhwKC90YXJnZXRTZGs9KFteXFxzXFxzXSspL2cpLmV4ZWMoc3Rkb3V0KVsxXTtcclxuICByZXR1cm4gdGFyZ2V0U2RrO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBsaXN0IG9mIGF2YWlsYWJsZSBpbnB1dCBtZXRob2RzIChJTUVzKSBmb3IgdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheS48U3RyaW5nPn0gVGhlIGxpc3Qgb2YgSU1FIG5hbWVzIG9yIGFuIGVtcHR5IGxpc3QuXHJcbiAqL1xyXG5tZXRob2RzLmF2YWlsYWJsZUlNRXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBnZXRJTUVMaXN0RnJvbU91dHB1dChhd2FpdCB0aGlzLnNoZWxsKFsnaW1lJywgJ2xpc3QnLCAnLWEnXSkpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBnZXR0aW5nIGF2YWlsYWJsZSBJTUUncy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSB0aGUgbGlzdCBvZiBlbmFibGVkIGlucHV0IG1ldGhvZHMgKElNRXMpIGZvciB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge0FycmF5LjxTdHJpbmc+fSBUaGUgbGlzdCBvZiBlbmFibGVkIElNRSBuYW1lcyBvciBhbiBlbXB0eSBsaXN0LlxyXG4gKi9cclxubWV0aG9kcy5lbmFibGVkSU1FcyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGdldElNRUxpc3RGcm9tT3V0cHV0KGF3YWl0IHRoaXMuc2hlbGwoWydpbWUnLCAnbGlzdCddKSk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgZW5hYmxlZCBJTUUncy4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbmFibGUgdGhlIHBhcnRpY3VsYXIgaW5wdXQgbWV0aG9kIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGltZUlkIC0gT25lIG9mIGV4aXN0aW5nIElNRSBpZHMuXHJcbiAqL1xyXG5tZXRob2RzLmVuYWJsZUlNRSA9IGFzeW5jIGZ1bmN0aW9uIChpbWVJZCkge1xyXG4gIGF3YWl0IHRoaXMuc2hlbGwoWydpbWUnLCAnZW5hYmxlJywgaW1lSWRdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNhYmxlIHRoZSBwYXJ0aWN1bGFyIGlucHV0IG1ldGhvZCBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbWVJZCAtIE9uZSBvZiBleGlzdGluZyBJTUUgaWRzLlxyXG4gKi9cclxubWV0aG9kcy5kaXNhYmxlSU1FID0gYXN5bmMgZnVuY3Rpb24gKGltZUlkKSB7XHJcbiAgYXdhaXQgdGhpcy5zaGVsbChbJ2ltZScsICdkaXNhYmxlJywgaW1lSWRdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHBhcnRpY3VsYXIgaW5wdXQgbWV0aG9kIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGltZUlkIC0gT25lIG9mIGV4aXN0aW5nIElNRSBpZHMuXHJcbiAqL1xyXG5tZXRob2RzLnNldElNRSA9IGFzeW5jIGZ1bmN0aW9uIChpbWVJZCkge1xyXG4gIGF3YWl0IHRoaXMuc2hlbGwoWydpbWUnLCAnc2V0JywgaW1lSWRdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGRlZmF1bHQgaW5wdXQgbWV0aG9kIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgbmFtZSBvZiB0aGUgZGVmYXVsdCBpbnB1dCBtZXRob2QuXHJcbiAqL1xyXG5tZXRob2RzLmRlZmF1bHRJTUUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBlbmdpbmUgPSBhd2FpdCB0aGlzLmdldFNldHRpbmcoJ3NlY3VyZScsICdkZWZhdWx0X2lucHV0X21ldGhvZCcpO1xyXG4gICAgcmV0dXJuIGVuZ2luZS50cmltKCk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGdldHRpbmcgZGVmYXVsdCBJTUUuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2VuZCB0aGUgcGFydGljdWxhciBrZXljb2RlIHRvIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBrZXljb2RlIC0gVGhlIGFjdHVhbCBrZXkgY29kZSB0byBiZSBzZW50LlxyXG4gKi9cclxubWV0aG9kcy5rZXlldmVudCA9IGFzeW5jIGZ1bmN0aW9uIChrZXljb2RlKSB7XHJcbiAgLy8ga2V5Y29kZSBtdXN0IGJlIGFuIGludC5cclxuICBsZXQgY29kZSA9IHBhcnNlSW50KGtleWNvZGUsIDEwKTtcclxuICBhd2FpdCB0aGlzLnNoZWxsKFsnaW5wdXQnLCAna2V5ZXZlbnQnLCBjb2RlXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2VuZCB0aGUgcGFydGljdWxhciB0ZXh0IHRvIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBUaGUgYWN0dWFsIHRleHQgdG8gYmUgc2VudC5cclxuICovXHJcbm1ldGhvZHMuaW5wdXRUZXh0ID0gYXN5bmMgZnVuY3Rpb24gKHRleHQpIHtcclxuICAvKiBqc2hpbnQgaWdub3JlOnN0YXJ0ICovXHJcbiAgLy8gbmVlZCB0byBlc2NhcGUgd2hpdGVzcGFjZSBhbmQgKCApIDwgPiB8IDsgJiAqIFxcIH4gXCIgJ1xyXG4gIHRleHQgPSB0ZXh0XHJcbiAgICAgICAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnXFwoJylcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXCkvZywgJ1xcKScpXHJcbiAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnXFw8JylcclxuICAgICAgICAgIC5yZXBsYWNlKC8+L2csICdcXD4nKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL1xcfC9nLCAnXFx8JylcclxuICAgICAgICAgIC5yZXBsYWNlKC87L2csICdcXDsnKVxyXG4gICAgICAgICAgLnJlcGxhY2UoLyYvZywgJ1xcJicpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFwqL2csICdcXConKVxyXG4gICAgICAgICAgLnJlcGxhY2UoL34vZywgJ1xcficpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXCInKVxyXG4gICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXCdcIilcclxuICAgICAgICAgIC5yZXBsYWNlKC8gL2csICclcycpO1xyXG4gIC8qIGpzaGludCBpZ25vcmU6ZW5kICovXHJcbiAgYXdhaXQgdGhpcy5zaGVsbChbJ2lucHV0JywgJ3RleHQnLCB0ZXh0XSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYXIgdGhlIGFjdGl2ZSB0ZXh0IGZpZWxkIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdCBieSBzZW5kaW5nXHJcbiAqIHNwZWNpYWwga2V5ZXZlbnRzIHRvIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIFsxMDBdIC0gVGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSB0ZXh0IGluIHRoZSBmaWVsZCB0byBiZSBjbGVhcmVkLlxyXG4gKi9cclxubWV0aG9kcy5jbGVhclRleHRGaWVsZCA9IGFzeW5jIGZ1bmN0aW9uIChsZW5ndGggPSAxMDApIHtcclxuICAvLyBhc3N1bWVzIHRoYXQgdGhlIEVkaXRUZXh0IGZpZWxkIGFscmVhZHkgaGFzIGZvY3VzXHJcbiAgbG9nLmRlYnVnKGBDbGVhcmluZyB1cCB0byAke2xlbmd0aH0gY2hhcmFjdGVyc2ApO1xyXG4gIGlmIChsZW5ndGggPT09IDApIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgbGV0IGFyZ3MgPSBbJ2lucHV0JywgJ2tleWV2ZW50J107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgLy8gd2UgY2Fubm90IGtub3cgd2hlcmUgdGhlIGN1cnNvciBpcyBpbiB0aGUgdGV4dCBmaWVsZCwgc28gZGVsZXRlIGJvdGggYmVmb3JlXHJcbiAgICAvLyBhbmQgYWZ0ZXIgc28gdGhhdCB3ZSBnZXQgcmlkIG9mIGV2ZXJ5dGhpbmdcclxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmFuZHJvaWQuY29tL3JlZmVyZW5jZS9hbmRyb2lkL3ZpZXcvS2V5RXZlbnQuaHRtbCNLRVlDT0RFX0RFTFxyXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYW5kcm9pZC5jb20vcmVmZXJlbmNlL2FuZHJvaWQvdmlldy9LZXlFdmVudC5odG1sI0tFWUNPREVfRk9SV0FSRF9ERUxcclxuICAgIGFyZ3MucHVzaCgnNjcnLCAnMTEyJyk7XHJcbiAgfVxyXG4gIGF3YWl0IHRoaXMuc2hlbGwoYXJncyk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2VuZCB0aGUgc3BlY2lhbCBrZXljb2RlIHRvIHRoZSBkZXZpY2UgdW5kZXIgdGVzdCBpbiBvcmRlciB0byBsb2NrIGl0LlxyXG4gKi9cclxubWV0aG9kcy5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBsb2NrZWQgPSBhd2FpdCB0aGlzLmlzU2NyZWVuTG9ja2VkKCk7XHJcbiAgaWYgKCFsb2NrZWQpIHtcclxuICAgIGxvZy5kZWJ1ZyhcIlByZXNzaW5nIHRoZSBLRVlDT0RFX1BPV0VSIGJ1dHRvbiB0byBsb2NrIHNjcmVlblwiKTtcclxuICAgIGF3YWl0IHRoaXMua2V5ZXZlbnQoMjYpO1xyXG5cclxuICAgIC8vIHdhaXQgZm9yIHRoZSBzY3JlZW4gdG8gbG9ja1xyXG4gICAgYXdhaXQgcmV0cnlJbnRlcnZhbCgxMCwgNTAwLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxvY2tlZCA9IGF3YWl0IHRoaXMuaXNTY3JlZW5Mb2NrZWQoKTtcclxuICAgICAgaWYgKCFsb2NrZWQpIHtcclxuICAgICAgICBsb2cuZXJyb3JBbmRUaHJvdyhcIldhaXRpbmcgZm9yIHNjcmVlbiB0byBsb2NrLlwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGxvZy5kZWJ1ZyhcIlNjcmVlbiBpcyBhbHJlYWR5IGxvY2tlZC4gRG9pbmcgbm90aGluZy5cIik7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlbmQgdGhlIHNwZWNpYWwga2V5Y29kZSB0byB0aGUgZGV2aWNlIHVuZGVyIHRlc3QgaW4gb3JkZXIgdG8gZW11bGF0ZVxyXG4gKiBCYWNrIGJ1dHRvbiB0YXAuXHJcbiAqL1xyXG5tZXRob2RzLmJhY2sgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbG9nLmRlYnVnKFwiUHJlc3NpbmcgdGhlIEJBQ0sgYnV0dG9uXCIpO1xyXG4gIGF3YWl0IHRoaXMua2V5ZXZlbnQoNCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2VuZCB0aGUgc3BlY2lhbCBrZXljb2RlIHRvIHRoZSBkZXZpY2UgdW5kZXIgdGVzdCBpbiBvcmRlciB0byBlbXVsYXRlXHJcbiAqIEhvbWUgYnV0dG9uIHRhcC5cclxuICovXHJcbm1ldGhvZHMuZ29Ub0hvbWUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbG9nLmRlYnVnKFwiUHJlc3NpbmcgdGhlIEhPTUUgYnV0dG9uXCIpO1xyXG4gIGF3YWl0IHRoaXMua2V5ZXZlbnQoMyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgYWN0dWFsIHBhdGggdG8gYWRiIGV4ZWN1dGFibGUuXHJcbiAqL1xyXG5tZXRob2RzLmdldEFkYlBhdGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIHRoaXMuZXhlY3V0YWJsZS5wYXRoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGN1cnJlbnQgc2NyZWVuIG9yaWVudGF0aW9uIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgY3VycmVudCBvcmllbnRhdGlvbiBlbmNvZGVkIGFzIGFuIGludGVnZXIgbnVtYmVyLlxyXG4gKi9cclxubWV0aG9kcy5nZXRTY3JlZW5PcmllbnRhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ2R1bXBzeXMnLCAnaW5wdXQnXSk7XHJcbiAgcmV0dXJuIGdldFN1cmZhY2VPcmllbnRhdGlvbihzdGRvdXQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBzY3JlZW4gbG9jayBzdGF0ZSBvZiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGRldmljZSBpcyBsb2NrZWQuXHJcbiAqL1xyXG5tZXRob2RzLmlzU2NyZWVuTG9ja2VkID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsnZHVtcHN5cycsICd3aW5kb3cnXSk7XHJcbiAgaWYgKHByb2Nlc3MuZW52LkFQUElVTV9MT0dfRFVNUFNZUykge1xyXG4gICAgLy8gb3B0aW9uYWwgZGVidWdnaW5nXHJcbiAgICAvLyBpZiB0aGUgbWV0aG9kIGlzIG5vdCB3b3JraW5nLCB0dXJuIGl0IG9uIGFuZCBzZW5kIHVzIHRoZSBvdXRwdXRcclxuICAgIGxldCBkdW1wc3lzRmlsZSA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcImR1bXBzeXMubG9nXCIpO1xyXG4gICAgbG9nLmRlYnVnKGBXcml0aW5nIGR1bXBzeXMgb3V0cHV0IHRvICR7ZHVtcHN5c0ZpbGV9YCk7XHJcbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoZHVtcHN5c0ZpbGUsIHN0ZG91dCk7XHJcbiAgfVxyXG4gIHJldHVybiAoaXNTaG93aW5nTG9ja3NjcmVlbihzdGRvdXQpIHx8IGlzQ3VycmVudEZvY3VzT25LZXlndWFyZChzdGRvdXQpIHx8XHJcbiAgICAgICAgICAhaXNTY3JlZW5PbkZ1bGx5KHN0ZG91dCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBzdGF0ZSBvZiB0aGUgc29mdHdhcmUga2V5Ym9hcmQgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBzb2Z0d2FyZSBrZXlib2FyZCBpcyBwcmVzZW50LlxyXG4gKi9cclxubWV0aG9kcy5pc1NvZnRLZXlib2FyZFByZXNlbnQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsnZHVtcHN5cycsICdpbnB1dF9tZXRob2QnXSk7XHJcbiAgICBsZXQgaXNLZXlib2FyZFNob3duID0gZmFsc2UsXHJcbiAgICAgICAgY2FuQ2xvc2VLZXlib2FyZCA9IGZhbHNlLFxyXG4gICAgICAgIGlucHV0U2hvd25NYXRjaCA9IC9tSW5wdXRTaG93bj1cXHcrL2dpLmV4ZWMoc3Rkb3V0KTtcclxuICAgIGlmIChpbnB1dFNob3duTWF0Y2ggJiYgaW5wdXRTaG93bk1hdGNoWzBdKSB7XHJcbiAgICAgIGlzS2V5Ym9hcmRTaG93biA9IGlucHV0U2hvd25NYXRjaFswXS5zcGxpdCgnPScpWzFdID09PSAndHJ1ZSc7XHJcbiAgICAgIGxldCBpc0lucHV0Vmlld1Nob3duTWF0Y2ggPSAvbUlzSW5wdXRWaWV3U2hvd249XFx3Ky9naS5leGVjKHN0ZG91dCk7XHJcbiAgICAgIGlmIChpc0lucHV0Vmlld1Nob3duTWF0Y2ggJiYgaXNJbnB1dFZpZXdTaG93bk1hdGNoWzBdKSB7XHJcbiAgICAgICAgY2FuQ2xvc2VLZXlib2FyZCA9IGlzSW5wdXRWaWV3U2hvd25NYXRjaFswXS5zcGxpdCgnPScpWzFdID09PSAndHJ1ZSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB7aXNLZXlib2FyZFNob3duLCBjYW5DbG9zZUtleWJvYXJkfTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgZmluZGluZyBzb2Z0a2V5Ym9hcmQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2VuZCBhbiBhcmJpdHJhcnkgVGVsbmV0IGNvbW1hbmQgdG8gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZCAtIFRoZSBjb21tYW5kIHRvIGJlIHNlbnQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGFjdHVhbCBvdXRwdXQgb2YgdGhlIGdpdmVuIGNvbW1hbmQuXHJcbiAqL1xyXG5tZXRob2RzLnNlbmRUZWxuZXRDb21tYW5kID0gYXN5bmMgZnVuY3Rpb24gKGNvbW1hbmQpIHtcclxuICBsb2cuZGVidWcoYFNlbmRpbmcgdGVsbmV0IGNvbW1hbmQgdG8gZGV2aWNlOiAke2NvbW1hbmR9YCk7XHJcbiAgbGV0IHBvcnQgPSBhd2FpdCB0aGlzLmdldEVtdWxhdG9yUG9ydCgpO1xyXG4gIHJldHVybiBhd2FpdCBuZXcgQigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBsZXQgY29ubiA9IG5ldC5jcmVhdGVDb25uZWN0aW9uKHBvcnQsICdsb2NhbGhvc3QnKSxcclxuICAgICAgICBjb25uZWN0ZWQgPSBmYWxzZSxcclxuICAgICAgICByZWFkeVJlZ2V4ID0gL15PSyQvbSxcclxuICAgICAgICBkYXRhU3RyZWFtID0gXCJcIixcclxuICAgICAgICByZXMgPSBudWxsO1xyXG4gICAgY29ubi5vbignY29ubmVjdCcsICgpID0+IHtcclxuICAgICAgbG9nLmRlYnVnKFwiU29ja2V0IGNvbm5lY3Rpb24gdG8gZGV2aWNlIGNyZWF0ZWRcIik7XHJcbiAgICB9KTtcclxuICAgIGNvbm4ub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xyXG4gICAgICBkYXRhID0gZGF0YS50b1N0cmluZygndXRmOCcpO1xyXG4gICAgICBpZiAoIWNvbm5lY3RlZCkge1xyXG4gICAgICAgIGlmIChyZWFkeVJlZ2V4LnRlc3QoZGF0YSkpIHtcclxuICAgICAgICAgIGNvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICBsb2cuZGVidWcoXCJTb2NrZXQgY29ubmVjdGlvbiB0byBkZXZpY2UgcmVhZHlcIik7XHJcbiAgICAgICAgICBjb25uLndyaXRlKGAke2NvbW1hbmR9XFxuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGFTdHJlYW0gKz0gZGF0YTtcclxuICAgICAgICBpZiAocmVhZHlSZWdleC50ZXN0KGRhdGEpKSB7XHJcbiAgICAgICAgICByZXMgPSBkYXRhU3RyZWFtLnJlcGxhY2UocmVhZHlSZWdleCwgXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgcmVzID0gXy5sYXN0KHJlcy50cmltKCkuc3BsaXQoJ1xcbicpKTtcclxuICAgICAgICAgIGxvZy5kZWJ1ZyhgVGVsbmV0IGNvbW1hbmQgZ290IHJlc3BvbnNlOiAke3Jlc31gKTtcclxuICAgICAgICAgIGNvbm4ud3JpdGUoXCJxdWl0XFxuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25uLm9uKCdlcnJvcicsIChlcnIpID0+IHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcm9taXNlL3ByZWZlci1hd2FpdC10by1jYWxsYmFja3NcclxuICAgICAgbG9nLmRlYnVnKGBUZWxuZXQgY29tbWFuZCBlcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcclxuICAgICAgcmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuICAgIGNvbm4ub24oJ2Nsb3NlJywgKCkgPT4ge1xyXG4gICAgICBpZiAocmVzID09PSBudWxsKSB7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIk5ldmVyIGdvdCBhIHJlc3BvbnNlIGZyb20gY29tbWFuZFwiKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayB0aGUgc3RhdGUgb2YgQWlycGxhbmUgbW9kZSBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgQWlycGxhbmUgbW9kZSBpcyBlbmFibGVkLlxyXG4gKi9cclxubWV0aG9kcy5pc0FpcnBsYW5lTW9kZU9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLmdldFNldHRpbmcoJ2dsb2JhbCcsICdhaXJwbGFuZV9tb2RlX29uJyk7XHJcbiAgcmV0dXJuIHBhcnNlSW50KHN0ZG91dCwgMTApICE9PSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgc3RhdGUgb2YgQWlycGxhbmUgbW9kZSBpbiBTZXR0aW5ncyBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb24gLSBUcnVlIHRvIGVuYWJsZSB0aGUgQWlycGxhbmUgbW9kZSBpbiBTZXR0aW5ncyBhbmQgZmFsc2UgdG8gZGlzYWJsZSBpdC5cclxuICovXHJcbm1ldGhvZHMuc2V0QWlycGxhbmVNb2RlID0gYXN5bmMgZnVuY3Rpb24gKG9uKSB7XHJcbiAgYXdhaXQgdGhpcy5zZXRTZXR0aW5nKCdnbG9iYWwnLCAnYWlycGxhbmVfbW9kZV9vbicsIG9uID8gMSA6IDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEJyb2FkY2FzdCB0aGUgc3RhdGUgb2YgQWlycGxhbmUgbW9kZSBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBjYWxsZWQgYWZ0ZXIge0BsaW5rICNzZXRBaXJwbGFuZU1vZGV9LCBvdGhlcndpc2VcclxuICogdGhlIG1vZGUgY2hhbmdlIGlzIG5vdCBnb2luZyB0byBiZSBhcHBsaWVkIGZvciB0aGUgZGV2aWNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9uIC0gVHJ1ZSB0byBicm9hZGNhc3QgZW5hYmxlIGFuZCBmYWxzZSB0byBicm9hZGNhc3QgZGlzYWJsZS5cclxuICovXHJcbm1ldGhvZHMuYnJvYWRjYXN0QWlycGxhbmVNb2RlID0gYXN5bmMgZnVuY3Rpb24gKG9uKSB7XHJcbiAgbGV0IGFyZ3MgPSBbJ2FtJywgJ2Jyb2FkY2FzdCcsICctYScsICdhbmRyb2lkLmludGVudC5hY3Rpb24uQUlSUExBTkVfTU9ERScsXHJcbiAgICAgICAgICAgICAgJy0tZXonLCAnc3RhdGUnLCBvbiA/ICd0cnVlJyA6ICdmYWxzZSddO1xyXG4gIGF3YWl0IHRoaXMuc2hlbGwoYXJncyk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgdGhlIHN0YXRlIG9mIFdpRmkgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIFdpRmkgaXMgZW5hYmxlZC5cclxuICovXHJcbm1ldGhvZHMuaXNXaWZpT24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuZ2V0U2V0dGluZygnZ2xvYmFsJywgJ3dpZmlfb24nKTtcclxuICByZXR1cm4gKHBhcnNlSW50KHN0ZG91dCwgMTApICE9PSAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgdGhlIHN0YXRlIG9mIFdpRmkgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9uIC0gVHJ1ZSB0byBlbmFibGUgYW5kIGZhbHNlIHRvIGRpc2FibGUgaXQuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNFbXVsYXRvciBbZmFsc2VdIC0gU2V0IGl0IHRvIHRydWUgaWYgdGhlIGRldmljZSB1bmRlciB0ZXN0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgYW4gZW11bGF0b3IgcmF0aGVyIHRoYW4gYSByZWFsIGRldmljZS5cclxuICovXHJcbm1ldGhvZHMuc2V0V2lmaVN0YXRlID0gYXN5bmMgZnVuY3Rpb24gKG9uLCBpc0VtdWxhdG9yID0gZmFsc2UpIHtcclxuICBpZiAoaXNFbXVsYXRvcikge1xyXG4gICAgYXdhaXQgdGhpcy5zaGVsbChbJ3N2YycsICd3aWZpJywgb24gPyAnZW5hYmxlJyA6ICdkaXNhYmxlJ10pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhd2FpdCB0aGlzLnNoZWxsKFsnYW0nLCAnYnJvYWRjYXN0JywgJy1hJywgV0lGSV9DT05ORUNUSU9OX1NFVFRJTkdfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgICAgJy1uJywgV0lGSV9DT05ORUNUSU9OX1NFVFRJTkdfUkVDRUlWRVIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnLS1lcycsICdzZXRzdGF0dXMnLCBvbiA/ICdlbmFibGUnIDogJ2Rpc2FibGUnXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIHRoZSBzdGF0ZSBvZiBEYXRhIHRyYW5zZmVyIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBEYXRhIHRyYW5zZmVyIGlzIGVuYWJsZWQuXHJcbiAqL1xyXG5tZXRob2RzLmlzRGF0YU9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLmdldFNldHRpbmcoJ2dsb2JhbCcsICdtb2JpbGVfZGF0YScpO1xyXG4gIHJldHVybiAocGFyc2VJbnQoc3Rkb3V0LCAxMCkgIT09IDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgc3RhdGUgb2YgRGF0YSB0cmFuc2ZlciBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb24gLSBUcnVlIHRvIGVuYWJsZSBhbmQgZmFsc2UgdG8gZGlzYWJsZSBpdC5cclxuICogQHBhcmFtIHtib29sZWFufSBpc0VtdWxhdG9yIFtmYWxzZV0gLSBTZXQgaXQgdG8gdHJ1ZSBpZiB0aGUgZGV2aWNlIHVuZGVyIHRlc3RcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBhbiBlbXVsYXRvciByYXRoZXIgdGhhbiBhIHJlYWwgZGV2aWNlLlxyXG4gKi9cclxubWV0aG9kcy5zZXREYXRhU3RhdGUgPSBhc3luYyBmdW5jdGlvbiAob24sIGlzRW11bGF0b3IgPSBmYWxzZSkge1xyXG4gIGlmIChpc0VtdWxhdG9yKSB7XHJcbiAgICBhd2FpdCB0aGlzLnNoZWxsKFsnc3ZjJywgJ2RhdGEnLCBvbiA/ICdlbmFibGUnIDogJ2Rpc2FibGUnXSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGF3YWl0IHRoaXMuc2hlbGwoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCBEQVRBX0NPTk5FQ1RJT05fU0VUVElOR19BQ1RJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgICAnLW4nLCBEQVRBX0NPTk5FQ1RJT05fU0VUVElOR19SRUNFSVZFUixcclxuICAgICAgICAgICAgICAgICAgICAgICctLWVzJywgJ3NldHN0YXR1cycsIG9uID8gJ2VuYWJsZScgOiAnZGlzYWJsZSddKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hhbmdlIHRoZSBzdGF0ZSBvZiBXaUZpIGFuZC9vciBEYXRhIHRyYW5zZmVyIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtib29sZWFufSB3aWZpIC0gVHJ1ZSB0byBlbmFibGUgYW5kIGZhbHNlIHRvIGRpc2FibGUgV2lGaS5cclxuICogQHBhcmFtIHtib29sZWFufSBkYXRhIC0gVHJ1ZSB0byBlbmFibGUgYW5kIGZhbHNlIHRvIGRpc2FibGUgRGF0YSB0cmFuc2Zlci5cclxuICogQHBhcmFtIHtib29sZWFufSBpc0VtdWxhdG9yIFtmYWxzZV0gLSBTZXQgaXQgdG8gdHJ1ZSBpZiB0aGUgZGV2aWNlIHVuZGVyIHRlc3RcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBhbiBlbXVsYXRvciByYXRoZXIgdGhhbiBhIHJlYWwgZGV2aWNlLlxyXG4gKi9cclxubWV0aG9kcy5zZXRXaWZpQW5kRGF0YSA9IGFzeW5jIGZ1bmN0aW9uICh7d2lmaSwgZGF0YX0sIGlzRW11bGF0b3IgPSBmYWxzZSkge1xyXG4gIGlmICghXy5pc1VuZGVmaW5lZCh3aWZpKSkge1xyXG4gICAgdGhpcy5zZXRXaWZpU3RhdGUod2lmaSwgaXNFbXVsYXRvcik7XHJcbiAgfVxyXG4gIGlmICghXy5pc1VuZGVmaW5lZChkYXRhKSkge1xyXG4gICAgdGhpcy5zZXREYXRhU3RhdGUoZGF0YSwgaXNFbXVsYXRvcik7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgc3RhdGUgb2YgYW5pbWF0aW9uIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICogQW5pbWF0aW9uIG9uIHRoZSBkZXZpY2UgaXMgY29udHJvbGxlZCBieSB0aGUgZm9sbG93aW5nIGdsb2JhbCBwcm9wZXJ0aWVzOlxyXG4gKiBbQU5JTUFUT1JfRFVSQVRJT05fU0NBTEVde0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLmFuZHJvaWQuY29tL3JlZmVyZW5jZS9hbmRyb2lkL3Byb3ZpZGVyL1NldHRpbmdzLkdsb2JhbC5odG1sI0FOSU1BVE9SX0RVUkFUSU9OX1NDQUxFfSxcclxuICogW1RSQU5TSVRJT05fQU5JTUFUSU9OX1NDQUxFXXtAbGluayBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvYW5kcm9pZC9wcm92aWRlci9TZXR0aW5ncy5HbG9iYWwuaHRtbCNUUkFOU0lUSU9OX0FOSU1BVElPTl9TQ0FMRX0sXHJcbiAqIFtXSU5ET1dfQU5JTUFUSU9OX1NDQUxFXXtAbGluayBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvYW5kcm9pZC9wcm92aWRlci9TZXR0aW5ncy5HbG9iYWwuaHRtbCNXSU5ET1dfQU5JTUFUSU9OX1NDQUxFfS5cclxuICogVGhpcyBtZXRob2Qgc2V0cyBhbGwgdGhpcyBwcm9wZXJ0aWVzIHRvIDAuMCB0byBkaXNhYmxlICgxLjAgdG8gZW5hYmxlKSBhbmltYXRpb24uXHJcbiAqXHJcbiAqIFR1cm5pbmcgb2ZmIGFuaW1hdGlvbiBtaWdodCBiZSB1c2VmdWwgdG8gaW1wcm92ZSBzdGFiaWxpdHlcclxuICogYW5kIHJlZHVjZSB0ZXN0cyBleGVjdXRpb24gdGltZS5cclxuICpcclxuICogQHBhcmFtIHtib29sZWFufSBvbiAtIFRydWUgdG8gZW5hYmxlIGFuZCBmYWxzZSB0byBkaXNhYmxlIGl0LlxyXG4gKi9cclxubWV0aG9kcy5zZXRBbmltYXRpb25TdGF0ZSA9IGFzeW5jIGZ1bmN0aW9uIChvbikge1xyXG4gIGF3YWl0IHRoaXMuc2hlbGwoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCBBTklNQVRJT05fU0VUVElOR19BQ1RJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgJy1uJywgQU5JTUFUSU9OX1NFVFRJTkdfUkVDRUlWRVIsXHJcbiAgICAgICAgICAgICAgICAgICAgJy0tZXMnLCAnc2V0c3RhdHVzJywgb24gPyAnZW5hYmxlJyA6ICdkaXNhYmxlJ10pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIHRoZSBzdGF0ZSBvZiBhbmltYXRpb24gb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGF0IGxlYXN0IG9uZSBvZiBhbmltYXRpb24gc2NhbGUgc2V0dGluZ3NcclxuICogICAgICAgICAgICAgICAgICAgaXMgbm90IGVxdWFsIHRvICcwLjAnLlxyXG4gKi9cclxubWV0aG9kcy5pc0FuaW1hdGlvbk9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBhbmltYXRvcl9kdXJhdGlvbl9zY2FsZSA9IGF3YWl0IHRoaXMuZ2V0U2V0dGluZygnZ2xvYmFsJywgJ2FuaW1hdG9yX2R1cmF0aW9uX3NjYWxlJyk7XHJcbiAgbGV0IHRyYW5zaXRpb25fYW5pbWF0aW9uX3NjYWxlID0gYXdhaXQgdGhpcy5nZXRTZXR0aW5nKCdnbG9iYWwnLCAndHJhbnNpdGlvbl9hbmltYXRpb25fc2NhbGUnKTtcclxuICBsZXQgd2luZG93X2FuaW1hdGlvbl9zY2FsZSA9IGF3YWl0IHRoaXMuZ2V0U2V0dGluZygnZ2xvYmFsJywgJ3dpbmRvd19hbmltYXRpb25fc2NhbGUnKTtcclxuICByZXR1cm4gXy5zb21lKFthbmltYXRvcl9kdXJhdGlvbl9zY2FsZSwgdHJhbnNpdGlvbl9hbmltYXRpb25fc2NhbGUsIHdpbmRvd19hbmltYXRpb25fc2NhbGVdLFxyXG4gICAgICAgICAgICAgICAgKHNldHRpbmcpID0+IHNldHRpbmcgIT09ICcwLjAnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgdGhlIGxvY2FsZSBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuIERvbid0IG5lZWQgdG8gcmVib290IHRoZSBkZXZpY2UgYWZ0ZXIgY2hhbmdpbmcgdGhlIGxvY2FsZS5cclxuICogVGhpcyBtZXRob2Qgc2V0cyBhbiBhcmJpdHJhcnkgbG9jYWxlIGZvbGxvd2luZzpcclxuICogICBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvamF2YS91dGlsL0xvY2FsZS5odG1sXHJcbiAqICAgaHR0cHM6Ly9kZXZlbG9wZXIuYW5kcm9pZC5jb20vcmVmZXJlbmNlL2phdmEvdXRpbC9Mb2NhbGUuaHRtbCNMb2NhbGUoamF2YS5sYW5nLlN0cmluZywlMjBqYXZhLmxhbmcuU3RyaW5nKVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2UgLSBMYW5ndWFnZS4gZS5nLiBlbiwgamFcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvdW50cnkgLSBDb3VudHJ5LiBlLmcuIFVTLCBKUFxyXG4gKi9cclxubWV0aG9kcy5zZXREZXZpY2VTeXNMb2NhbGVWaWFTZXR0aW5nQXBwID0gYXN5bmMgZnVuY3Rpb24gKGxhbmd1YWdlLCBjb3VudHJ5KSB7XHJcbiAgYXdhaXQgdGhpcy5zaGVsbChbJ2FtJywgJ2Jyb2FkY2FzdCcsICctYScsIExPQ0FMRV9TRVRUSU5HX0FDVElPTixcclxuICAgICctbicsIExPQ0FMRV9TRVRUSU5HX1JFQ0VJVkVSLFxyXG4gICAgJy0tZXMnLCAnbGFuZycsIGxhbmd1YWdlLnRvTG93ZXJDYXNlKCksXHJcbiAgICAnLS1lcycsICdjb3VudHJ5JywgY291bnRyeS50b1VwcGVyQ2FzZSgpXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHR5cGVkZWYge09iamVjdH0gTG9jYXRpb25cclxuICogQHByb3BlcnR5IHtmbG9hdHxzdHJpbmd9IGxvbmdpdHVkZSAtIFZhbGlkIGxvbmdpdHVkZSB2YWx1ZS5cclxuICogQHByb3BlcnR5IHtmbG9hdHxzdHJpbmd9IGxhdGl0dWRlIC0gVmFsaWQgbGF0aXR1ZGUgdmFsdWUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEVtdWxhdGUgZ2VvbG9jYXRpb24gY29vcmRpbmF0ZXMgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge0xvY2F0aW9ufSBsb2NhdGlvbiAtIExvY2F0aW9uIG9iamVjdC5cclxuICogQHBhcmFtIHtib29sZWFufSBpc0VtdWxhdG9yIFtmYWxzZV0gLSBTZXQgaXQgdG8gdHJ1ZSBpZiB0aGUgZGV2aWNlIHVuZGVyIHRlc3RcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcyBhbiBlbXVsYXRvciByYXRoZXIgdGhhbiBhIHJlYWwgZGV2aWNlLlxyXG4gKi9cclxubWV0aG9kcy5zZXRHZW9Mb2NhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhdGlvbiwgaXNFbXVsYXRvciA9IGZhbHNlKSB7XHJcbiAgbGV0IGxvbmdpdHVkZSA9IHBhcnNlRmxvYXQobG9jYXRpb24ubG9uZ2l0dWRlKTtcclxuICBpZiAoaXNOYU4obG9uZ2l0dWRlKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYGxvY2F0aW9uLmxvbmdpdHVkZSBpcyBleHBlY3RlZCB0byBiZSBhIHZhbGlkIGZsb2F0IG51bWJlci4gJyR7bG9jYXRpb24ubG9uZ2l0dWRlfScgaXMgZ2l2ZW4gaW5zdGVhZGApO1xyXG4gIH1cclxuICBsb25naXR1ZGUgPSBgJHtfLmNlaWwobG9uZ2l0dWRlLCA1KX1gO1xyXG4gIGxldCBsYXRpdHVkZSA9IHBhcnNlRmxvYXQobG9jYXRpb24ubGF0aXR1ZGUpO1xyXG4gIGlmIChpc05hTihsYXRpdHVkZSkpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBsb2NhdGlvbi5sYXRpdHVkZSBpcyBleHBlY3RlZCB0byBiZSBhIHZhbGlkIGZsb2F0IG51bWJlci4gJyR7bG9jYXRpb24ubGF0aXR1ZGV9JyBpcyBnaXZlbiBpbnN0ZWFkYCk7XHJcbiAgfVxyXG4gIGxhdGl0dWRlID0gYCR7Xy5jZWlsKGxhdGl0dWRlLCA1KX1gO1xyXG4gIGlmIChpc0VtdWxhdG9yKSB7XHJcbiAgICB0aGlzLnJlc2V0VGVsbmV0QXV0aFRva2VuKCk7XHJcbiAgICB0aGlzLmFkYkV4ZWMoWydlbXUnLCAnZ2VvJywgJ2ZpeCcsIGxvbmdpdHVkZSwgbGF0aXR1ZGVdKTtcclxuICAgIC8vIEEgd29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9hbmRyb2lkL2lzc3Vlcy9kZXRhaWw/aWQ9MjA2MTgwXHJcbiAgICB0aGlzLmFkYkV4ZWMoWydlbXUnLCAnZ2VvJywgJ2ZpeCcsIGxvbmdpdHVkZS5yZXBsYWNlKCcuJywgJywnKSwgbGF0aXR1ZGUucmVwbGFjZSgnLicsICcsJyldKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hlbGwoWydhbScsICdzdGFydHNlcnZpY2UnLCAnLWUnLCAnbG9uZ2l0dWRlJywgbG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICctZScsICdsYXRpdHVkZScsIGxhdGl0dWRlLCBMT0NBVElPTl9TRVJWSUNFXSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZvcmNlZnVsbHkgcmVjdXJzaXZlbHkgcmVtb3ZlIGEgcGF0aCBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqIEJlIGNhcmVmdWwgd2hpbGUgY2FsbGluZyB0aGlzIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBUaGUgcGF0aCB0byBiZSByZW1vdmVkIHJlY3Vyc2l2ZWx5LlxyXG4gKi9cclxubWV0aG9kcy5yaW1yYWYgPSBhc3luYyBmdW5jdGlvbiAocGF0aCkge1xyXG4gIGF3YWl0IHRoaXMuc2hlbGwoWydybScsICctcmYnLCBwYXRoXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2VuZCBhIGZpbGUgdG8gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxQYXRoIC0gVGhlIHBhdGggdG8gdGhlIGZpbGUgb24gdGhlIGxvY2FsIGZpbGUgc3lzdGVtLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVtb3RlUGF0aCAtIFRoZSBkZXN0aW5hdGlvbiBwYXRoIG9uIHRoZSByZW1vdGUgZGV2aWNlLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0cyAtIEFkZGl0aW9uYWwgb3B0aW9ucyBtYXBwaW5nLiBTZWVcclxuICogICAgICAgICAgICAgICAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vYXBwaXVtL25vZGUtdGVlbl9wcm9jZXNzLFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIF9leGVjXyBtZXRob2Qgb3B0aW9ucywgZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgYXZhaWxhYmxlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5cclxuICovXHJcbm1ldGhvZHMucHVzaCA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhbFBhdGgsIHJlbW90ZVBhdGgsIG9wdHMpIHtcclxuICBhd2FpdCB0aGlzLmFkYkV4ZWMoWydwdXNoJywgbG9jYWxQYXRoLCByZW1vdGVQYXRoXSwgb3B0cyk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVjZWl2ZSBhIGZpbGUgZnJvbSB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZW1vdGVQYXRoIC0gVGhlIHNvdXJjZSBwYXRoIG9uIHRoZSByZW1vdGUgZGV2aWNlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxQYXRoIC0gVGhlIGRlc3RpbmF0aW9uIHBhdGggdG8gdGhlIGZpbGUgb24gdGhlIGxvY2FsIGZpbGUgc3lzdGVtLlxyXG4gKi9cclxubWV0aG9kcy5wdWxsID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgsIGxvY2FsUGF0aCkge1xyXG4gIC8vIHB1bGwgZm9sZGVyIGNhbiB0YWtlIG1vcmUgdGltZSwgaW5jcmVhc2luZyB0aW1lIG91dCB0byA2MCBzZWNzXHJcbiAgYXdhaXQgdGhpcy5hZGJFeGVjKFsncHVsbCcsIHJlbW90ZVBhdGgsIGxvY2FsUGF0aF0sIHt0aW1lb3V0OiA2MDAwMH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIHdoZXRoZXIgdGhlIHByb2Nlc3Mgd2l0aCB0aGUgcGFydGljdWxhciBuYW1lIGlzIHJ1bm5pbmcgb24gdGhlIGRldmljZVxyXG4gKiB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvY2Vzc05hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvY2VzcyB0byBiZSBjaGVja2VkLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBnaXZlbiBwcm9jZXNzIGlzIHJ1bm5pbmcuXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiB0aGUgZ2l2ZW4gcHJvY2VzcyBuYW1lIGlzIG5vdCBhIHZhbGlkIGNsYXNzIG5hbWUuXHJcbiAqL1xyXG5tZXRob2RzLnByb2Nlc3NFeGlzdHMgPSBhc3luYyBmdW5jdGlvbiAocHJvY2Vzc05hbWUpIHtcclxuICB0cnkge1xyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRDbGFzcyhwcm9jZXNzTmFtZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHByb2Nlc3MgbmFtZTogJHtwcm9jZXNzTmFtZX1gKTtcclxuICAgIH1cclxuICAgIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFwicHNcIik7XHJcbiAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdCgvXFxyP1xcbi8pKSB7XHJcbiAgICAgIGxpbmUgPSBsaW5lLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xyXG4gICAgICBsZXQgcGtnQ29sdW1uID0gbGluZVtsaW5lLmxlbmd0aCAtIDFdO1xyXG4gICAgICBpZiAocGtnQ29sdW1uICYmIHBrZ0NvbHVtbi5pbmRleE9mKHByb2Nlc3NOYW1lKSAhPT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBmaW5kaW5nIGlmIHByb2Nlc3MgZXhpc3RzLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBUQ1AgcG9ydCBmb3J3YXJkaW5nIHdpdGggYWRiIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICogQHJldHVybiB7QXJyYXkuPFN0cmluZz59IFRoZSBvdXRwdXQgb2YgdGhlIGNvcnJlc3BvbmRpbmcgYWRiIGNvbW1hbmQuIEFuIGFycmF5IGNvbnRhaW5zIGVhY2ggZm9yd2FyZGluZyBsaW5lIG9mIG91dHB1dFxyXG4gKi9cclxubWV0aG9kcy5nZXRGb3J3YXJkTGlzdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsb2cuZGVidWcoYExpc3QgZm9yd2FyZGluZyBwb3J0c2ApO1xyXG4gIGxldCBjb25uZWN0aW9ucyA9IGF3YWl0IHRoaXMuYWRiRXhlYyhbJ2ZvcndhcmQnLCAnLS1saXN0J10pO1xyXG4gIHJldHVybiBjb25uZWN0aW9ucy5zcGxpdCgnXFxuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0dXAgVENQIHBvcnQgZm9yd2FyZGluZyB3aXRoIGFkYiBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gc3lzdGVtUG9ydCAtIFRoZSBudW1iZXIgb2YgdGhlIGxvY2FsIHN5c3RlbSBwb3J0LlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGRldmljZVBvcnQgLSBUaGUgbnVtYmVyIG9mIHRoZSByZW1vdGUgZGV2aWNlIHBvcnQuXHJcbiAqL1xyXG5tZXRob2RzLmZvcndhcmRQb3J0ID0gYXN5bmMgZnVuY3Rpb24gKHN5c3RlbVBvcnQsIGRldmljZVBvcnQpIHtcclxuICBsb2cuZGVidWcoYEZvcndhcmRpbmcgc3lzdGVtOiAke3N5c3RlbVBvcnR9IHRvIGRldmljZTogJHtkZXZpY2VQb3J0fWApO1xyXG4gIGF3YWl0IHRoaXMuYWRiRXhlYyhbJ2ZvcndhcmQnLCBgdGNwOiR7c3lzdGVtUG9ydH1gLCBgdGNwOiR7ZGV2aWNlUG9ydH1gXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIFRDUCBwb3J0IGZvcndhcmRpbmcgd2l0aCBhZGIgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LiBUaGUgZm9yd2FyZGluZ1xyXG4gKiBmb3IgdGhlIGdpdmVuIHBvcnQgc2hvdWxkIGJlIHNldHVwIHdpdGgge0BsaW5rICNmb3J3YXJkUG9ydH0gZmlyc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gc3lzdGVtUG9ydCAtIFRoZSBudW1iZXIgb2YgdGhlIGxvY2FsIHN5c3RlbSBwb3J0XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHJlbW92ZSBmb3J3YXJkaW5nIG9uLlxyXG4gKi9cclxubWV0aG9kcy5yZW1vdmVQb3J0Rm9yd2FyZCA9IGFzeW5jIGZ1bmN0aW9uIChzeXN0ZW1Qb3J0KSB7XHJcbiAgbG9nLmRlYnVnKGBSZW1vdmluZyBmb3J3YXJkZWQgcG9ydCBzb2NrZXQgY29ubmVjdGlvbjogJHtzeXN0ZW1Qb3J0fSBgKTtcclxuICBhd2FpdCB0aGlzLmFkYkV4ZWMoWydmb3J3YXJkJywgYC0tcmVtb3ZlYCwgYHRjcDoke3N5c3RlbVBvcnR9YF0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHVwIFRDUCBwb3J0IGZvcndhcmRpbmcgd2l0aCBhZGIgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LiBUaGUgZGlmZmVyZW5jZVxyXG4gKiBiZXR3ZWVuIHtAbGluayAjZm9yd2FyZFBvcnR9IGlzIHRoYXQgdGhpcyBtZXRob2QgZG9lcyBzZXR1cCBmb3IgYW4gYWJzdHJhY3RcclxuICogbG9jYWwgcG9ydC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBzeXN0ZW1Qb3J0IC0gVGhlIG51bWJlciBvZiB0aGUgbG9jYWwgc3lzdGVtIHBvcnQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gZGV2aWNlUG9ydCAtIFRoZSBudW1iZXIgb2YgdGhlIHJlbW90ZSBkZXZpY2UgcG9ydC5cclxuICovXHJcbm1ldGhvZHMuZm9yd2FyZEFic3RyYWN0UG9ydCA9IGFzeW5jIGZ1bmN0aW9uIChzeXN0ZW1Qb3J0LCBkZXZpY2VQb3J0KSB7XHJcbiAgbG9nLmRlYnVnKGBGb3J3YXJkaW5nIHN5c3RlbTogJHtzeXN0ZW1Qb3J0fSB0byBhYnN0cmFjdCBkZXZpY2U6ICR7ZGV2aWNlUG9ydH1gKTtcclxuICBhd2FpdCB0aGlzLmFkYkV4ZWMoWydmb3J3YXJkJywgYHRjcDoke3N5c3RlbVBvcnR9YCwgYGxvY2FsYWJzdHJhY3Q6JHtkZXZpY2VQb3J0fWBdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIHBpbmcgc2hlbGwgY29tbWFuZCBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbW1hbmQgb3V0cHV0IGNvbnRhaW5zICdwaW5nJyBzdWJzdHJpbmcuXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiB0aGVyZSB3YXMgYW4gZXJyb3Igd2hpbGUgZXhlY3V0aW5nICdwaW5nJyBjb21tYW5kIG9uIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqL1xyXG5tZXRob2RzLnBpbmcgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoW1wiZWNob1wiLCBcInBpbmdcIl0pO1xyXG4gIGlmIChzdGRvdXQuaW5kZXhPZihcInBpbmdcIikgPT09IDApIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICB0aHJvdyBuZXcgRXJyb3IoYEFEQiBwaW5nIGZhaWxlZCwgcmV0dXJuZWQgJHtzdGRvdXR9YCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVzdGFydCB0aGUgZGV2aWNlIHVuZGVyIHRlc3QgdXNpbmcgYWRiIGNvbW1hbmRzLlxyXG4gKlxyXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgc3RhcnQgZmFpbHMuXHJcbiAqL1xyXG5tZXRob2RzLnJlc3RhcnQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHRoaXMuc3RvcExvZ2NhdCgpO1xyXG4gICAgYXdhaXQgdGhpcy5yZXN0YXJ0QWRiKCk7XHJcbiAgICBhd2FpdCB0aGlzLndhaXRGb3JEZXZpY2UoNjApO1xyXG4gICAgYXdhaXQgdGhpcy5zdGFydExvZ2NhdCgpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBSZXN0YXJ0IGZhaWxlZC4gT3JnaW5pYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTdGFydCB0aGUgbG9nY2F0IHByb2Nlc3MgdG8gZ2F0aGVyIGxvZ3MuXHJcbiAqXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiByZXN0YXJ0IGZhaWxzLlxyXG4gKi9cclxubWV0aG9kcy5zdGFydExvZ2NhdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5sb2djYXQgIT09IG51bGwpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KFwiVHJ5aW5nIHRvIHN0YXJ0IGxvZ2NhdCBjYXB0dXJlIGJ1dCBpdCdzIGFscmVhZHkgc3RhcnRlZCFcIik7XHJcbiAgfVxyXG4gIHRoaXMubG9nY2F0ID0gbmV3IExvZ2NhdCh7XHJcbiAgICBhZGI6IHRoaXMuZXhlY3V0YWJsZSxcclxuICAgIGRlYnVnOiBmYWxzZSxcclxuICAgIGRlYnVnVHJhY2U6IGZhbHNlLFxyXG4gICAgY2xlYXJEZXZpY2VMb2dzT25TdGFydDogISF0aGlzLmNsZWFyRGV2aWNlTG9nc09uU3RhcnQsXHJcbiAgfSk7XHJcbiAgYXdhaXQgdGhpcy5sb2djYXQuc3RhcnRDYXB0dXJlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU3RvcCB0aGUgYWN0aXZlIGxvZ2NhdCBwcm9jZXNzIHdoaWNoIGdhdGhlcnMgbG9ncy5cclxuICogVGhlIGNhbGwgd2lsbCBiZSBpZ25vcmVkIGlmIG5vIGxvZ2NhdCBwcm9jZXNzIGlzIHJ1bm5pbmcuXHJcbiAqL1xyXG5tZXRob2RzLnN0b3BMb2djYXQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMubG9nY2F0ICE9PSBudWxsKSB7XHJcbiAgICBhd2FpdCB0aGlzLmxvZ2NhdC5zdG9wQ2FwdHVyZSgpO1xyXG4gICAgdGhpcy5sb2djYXQgPSBudWxsO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSB0aGUgb3V0cHV0IGZyb20gdGhlIGN1cnJlbnRseSBydW5uaW5nIGxvZ2NhdCBwcm9jZXNzLlxyXG4gKiBUaGUgbG9nY2F0IHByb2Nlc3Mgc2hvdWxkIGJlIGV4ZWN1dGVkIGJ5IHsybGluayAjc3RhcnRMb2djYXR9IG1ldGhvZC5cclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgY29sbGVjdGVkIGxvZ2NhdCBvdXRwdXQuXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiBsb2djYXQgcHJvY2VzcyBpcyBub3QgcnVubmluZy5cclxuICovXHJcbm1ldGhvZHMuZ2V0TG9nY2F0TG9ncyA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5sb2djYXQgPT09IG51bGwpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KFwiQ2FuJ3QgZ2V0IGxvZ2NhdCBsb2dzIHNpbmNlIGxvZ2NhdCBoYXNuJ3Qgc3RhcnRlZFwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMubG9nY2F0LmdldExvZ3MoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGxpc3Qgb2YgcHJvY2VzcyBpZHMgZm9yIHRoZSBwYXJ0aWN1bGFyIHByb2Nlc3Mgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBwYXJ0IG9mIHByb2Nlc3MgbmFtZS5cclxuICogQHJldHVybiB7QXJyYXkuPG51bWJlcj59IFRoZSBsaXN0IG9mIG1hdGNoZWQgcHJvY2VzcyBJRHMgb3IgYW4gZW1wdHkgbGlzdC5cclxuICovXHJcbm1ldGhvZHMuZ2V0UElEc0J5TmFtZSA9IGFzeW5jIGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgbG9nLmRlYnVnKGBHZXR0aW5nIGFsbCBwcm9jZXNzZXMgd2l0aCAke25hbWV9YCk7XHJcbiAgdHJ5IHtcclxuICAgIC8vIHBzIDxjb21tPiB3aGVyZSBjb21tIGlzIGxhc3QgMTUgY2hhcmFjdGVycyBvZiBwYWNrYWdlIG5hbWVcclxuICAgIGlmIChuYW1lLmxlbmd0aCA+IDE1KSB7XHJcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cihuYW1lLmxlbmd0aCAtIDE1KTtcclxuICAgIH1cclxuICAgIGxldCBzdGRvdXQgPSAoYXdhaXQgdGhpcy5zaGVsbChbXCJwc1wiXSkpLnRyaW0oKTtcclxuICAgIGxldCBwaWRzID0gW107XHJcbiAgICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdChcIlxcblwiKSkge1xyXG4gICAgICBpZiAobGluZS5pbmRleE9mKG5hbWUpICE9PSAtMSkge1xyXG4gICAgICAgIGxldCBtYXRjaCA9IC9bXlxcdCBdK1tcXHQgXSsoWzAtOV0rKS8uZXhlYyhsaW5lKTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgIHBpZHMucHVzaChwYXJzZUludChtYXRjaFsxXSwgMTApKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZXh0cmFjdCBQSUQgZnJvbSBwcyBvdXRwdXQ6ICR7bGluZX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBwaWRzO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBVbmFibGUgdG8gZ2V0IHBpZHMgZm9yICR7bmFtZX0uIE9yZ2luaWFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBsaXN0IG9mIHByb2Nlc3MgaWRzIGZvciB0aGUgcGFydGljdWxhciBwcm9jZXNzIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgcGFydCBvZiBwcm9jZXNzIG5hbWUuXHJcbiAqIEByZXR1cm4ge0FycmF5LjxudW1iZXI+fSBUaGUgbGlzdCBvZiBtYXRjaGVkIHByb2Nlc3MgSURzIG9yIGFuIGVtcHR5IGxpc3QuXHJcbiAqL1xyXG5tZXRob2RzLmtpbGxQcm9jZXNzZXNCeU5hbWUgPSBhc3luYyBmdW5jdGlvbiAobmFtZSkge1xyXG4gIHRyeSB7XHJcbiAgICBsb2cuZGVidWcoYEF0dGVtcHRpbmcgdG8ga2lsbCBhbGwgJHtuYW1lfSBwcm9jZXNzZXNgKTtcclxuICAgIGxldCBwaWRzID0gYXdhaXQgdGhpcy5nZXRQSURzQnlOYW1lKG5hbWUpO1xyXG4gICAgaWYgKHBpZHMubGVuZ3RoIDwgMSkge1xyXG4gICAgICBsb2cuaW5mbyhgTm8gJHtuYW1lfSBwcm9jZXNzIGZvdW5kIHRvIGtpbGwsIGNvbnRpbnVpbmcuLi5gKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgcGlkIG9mIHBpZHMpIHtcclxuICAgICAgYXdhaXQgdGhpcy5raWxsUHJvY2Vzc0J5UElEKHBpZCk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFVuYWJsZSB0byBraWxsICR7bmFtZX0gcHJvY2Vzc2VzLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEtpbGwgdGhlIHBhcnRpY3VsYXIgcHJvY2VzcyBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gcGlkIC0gVGhlIElEIG9mIHRoZSBwcm9jZXNzIHRvIGJlIGtpbGxlZC5cclxuICogQHJldHVybiB7c3RyaW5nfSBLaWxsIGNvbW1hbmQgc3Rkb3V0LlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHByb2Nlc3Mgd2l0aCBnaXZlbiBJRCBpcyBub3QgcHJlc2VudCBvciBjYW5ub3QgYmUga2lsbGVkLlxyXG4gKi9cclxubWV0aG9kcy5raWxsUHJvY2Vzc0J5UElEID0gYXN5bmMgZnVuY3Rpb24gKHBpZCkge1xyXG4gIGxvZy5kZWJ1ZyhgQXR0ZW1wdGluZyB0byBraWxsIHByb2Nlc3MgJHtwaWR9YCk7XHJcbiAgLy8gSnVzdCB0byBjaGVjayBpZiB0aGUgcHJvY2VzcyBleGlzdHMgYW5kIHRocm93IGFuIGV4Y2VwdGlvbiBvdGhlcndpc2VcclxuICBhd2FpdCB0aGlzLnNoZWxsKFsna2lsbCcsICctMCcsIHBpZF0pO1xyXG4gIGNvbnN0IHRpbWVvdXRNcyA9IDEwMDA7XHJcbiAgbGV0IHN0ZG91dDtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgd2FpdEZvckNvbmRpdGlvbihhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgc3Rkb3V0ID0gYXdhaXQgdGhpcy5zaGVsbChbJ2tpbGwnLCBwaWRdKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBraWxsIHJldHVybnMgbm9uLXplcm8gY29kZSBpZiB0aGUgcHJvY2VzcyBpcyBhbHJlYWR5IGtpbGxlZFxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9LCB7d2FpdE1zOiB0aW1lb3V0TXMsIGludGVydmFsTXM6IDMwMH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbG9nLndhcm4oYENhbm5vdCBraWxsIHByb2Nlc3MgJHtwaWR9IGluICR7dGltZW91dE1zfSBtcy4gVHJ5aW5nIHRvIGZvcmNlIGtpbGwuLi5gKTtcclxuICAgIHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoWydraWxsJywgJy05JywgcGlkXSk7XHJcbiAgfVxyXG4gIHJldHVybiBzdGRvdXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQnJvYWRjYXN0IHByb2Nlc3Mga2lsbGluZyBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnRlbnQgLSBUaGUgbmFtZSBvZiB0aGUgaW50ZW50IHRvIGJyb2FkY2FzdCB0by5cclxuICogQHBhcmFtIHtzdHJpbmd9IHByb2Nlc3NOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIGtpbGxlZCBwcm9jZXNzLlxyXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgdGhlIHByb2Nlc3Mgd2FzIG5vdCBraWxsZWQuXHJcbiAqL1xyXG5tZXRob2RzLmJyb2FkY2FzdFByb2Nlc3NFbmQgPSBhc3luYyBmdW5jdGlvbiAoaW50ZW50LCBwcm9jZXNzTmFtZSkge1xyXG4gIC8vIHN0YXJ0IHRoZSBicm9hZGNhc3Qgd2l0aG91dCB3YWl0aW5nIGZvciBpdCB0byBmaW5pc2guXHJcbiAgdGhpcy5icm9hZGNhc3QoaW50ZW50KTtcclxuICAvLyB3YWl0IGZvciB0aGUgcHJvY2VzcyB0byBlbmRcclxuICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xyXG4gIGxldCB0aW1lb3V0TXMgPSA0MDAwMDtcclxuICB0cnkge1xyXG4gICAgd2hpbGUgKChEYXRlLm5vdygpIC0gc3RhcnQpIDwgdGltZW91dE1zKSB7XHJcbiAgICAgIGlmIChhd2FpdCB0aGlzLnByb2Nlc3NFeGlzdHMocHJvY2Vzc05hbWUpKSB7XHJcbiAgICAgICAgLy8gY29vbCBkb3duXHJcbiAgICAgICAgYXdhaXQgc2xlZXAoNDAwKTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFByb2Nlc3MgbmV2ZXIgZGllZCB3aXRoaW4gJHt0aW1lb3V0TXN9IG1zYCk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFVuYWJsZSB0byBicm9hZGNhc3QgcHJvY2VzcyBlbmQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQnJvYWRjYXN0IGEgbWVzc2FnZSB0byB0aGUgZ2l2ZW4gaW50ZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaW50ZW50IC0gVGhlIG5hbWUgb2YgdGhlIGludGVudCB0byBicm9hZGNhc3QgdG8uXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiBpbnRlbnQgbmFtZSBpcyBub3QgYSB2YWxpZCBjbGFzcyBuYW1lLlxyXG4gKi9cclxubWV0aG9kcy5icm9hZGNhc3QgPSBhc3luYyBmdW5jdGlvbiAoaW50ZW50KSB7XHJcbiAgaWYgKCF0aGlzLmlzVmFsaWRDbGFzcyhpbnRlbnQpKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgSW52YWxpZCBpbnRlbnQgJHtpbnRlbnR9YCk7XHJcbiAgfVxyXG4gIGxvZy5kZWJ1ZyhgQnJvYWRjYXN0aW5nOiAke2ludGVudH1gKTtcclxuICBhd2FpdCB0aGlzLnNoZWxsKFsnYW0nLCAnYnJvYWRjYXN0JywgJy1hJywgaW50ZW50XSk7XHJcbn07XHJcblxyXG4vKipcclxuICogS2lsbCBBbmRyb2lkIGluc3RydW1lbnRzIGlmIHRoZXkgYXJlIGN1cnJlbnRseSBydW5uaW5nLlxyXG4gKi9cclxubWV0aG9kcy5lbmRBbmRyb2lkQ292ZXJhZ2UgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuaW5zdHJ1bWVudFByb2MgJiYgdGhpcy5pbnN0cnVtZW50UHJvYy5pc1J1bm5pbmcpIHtcclxuICAgIGF3YWl0IHRoaXMuaW5zdHJ1bWVudFByb2Muc3RvcCgpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbnN0cnVtZW50IHRoZSBwYXJ0aWN1bGFyIGFjdGl2aXR5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIG5hbWUgb2YgdGhlIHBhY2thZ2UgdG8gYmUgaW5zdHJ1bWVudGVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aXZpdHkgLSBUaGUgbmFtZSBvZiB0aGUgbWFpbiBhY3Rpdml0eSBpbiB0aGlzIHBhY2thZ2UuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnN0cnVtZW50V2l0aCAtIFRoZSBuYW1lIG9mIHRoZSBwYWNrYWdlIHRvIGluc3RydW1lbnRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGFjdGl2aXR5IHdpdGguXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiBhbnkgZXhjZXB0aW9uIGlzIHJlcG9ydGVkIGJ5IGFkYiBzaGVsbC5cclxuICovXHJcbm1ldGhvZHMuaW5zdHJ1bWVudCA9IGFzeW5jIGZ1bmN0aW9uIChwa2csIGFjdGl2aXR5LCBpbnN0cnVtZW50V2l0aCkge1xyXG4gIGlmIChhY3Rpdml0eVswXSAhPT0gXCIuXCIpIHtcclxuICAgIHBrZyA9IFwiXCI7XHJcbiAgfVxyXG4gIGxldCBwa2dBY3Rpdml0eSA9IChwa2cgKyBhY3Rpdml0eSkucmVwbGFjZSgvXFwuKy9nLCAnLicpOyAvLyBGaXggcGtnLi5hY3Rpdml0eSBlcnJvclxyXG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsnYW0nLCAnaW5zdHJ1bWVudCcsICctZScsICdtYWluX2FjdGl2aXR5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGtnQWN0aXZpdHksIGluc3RydW1lbnRXaXRoXSk7XHJcbiAgaWYgKHN0ZG91dC5pbmRleE9mKFwiRXhjZXB0aW9uXCIpICE9PSAtMSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYFVua25vd24gZXhjZXB0aW9uIGR1cmluZyBpbnN0cnVtZW50YXRpb24uIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgYE9yaWdpbmFsIGVycm9yICR7c3Rkb3V0LnNwbGl0KFwiXFxuXCIpWzBdfWApO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb2xsZWN0IEFuZHJvaWQgY292ZXJhZ2UgYnkgaW5zdHJ1bWVudGluZyB0aGUgcGFydGljdWxhciBhY3Rpdml0eS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGluc3RydW1lbnRDbGFzcyAtIFRoZSBuYW1lIG9mIHRoZSBpbnN0cnVtZW50YXRpb24gY2xhc3MuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB3YWl0UGtnIC0gVGhlIG5hbWUgb2YgdGhlIHBhY2thZ2UgdG8gYmUgaW5zdHJ1bWVudGVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gd2FpdEFjdGl2aXR5IC0gVGhlIG5hbWUgb2YgdGhlIG1haW4gYWN0aXZpdHkgaW4gdGhpcyBwYWNrYWdlLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtwcm9taXNlfSBUaGUgcHJvbWlzZSBpcyBzdWNjZXNzZnVsbHkgcmVzb2x2ZWQgaWYgdGhlIGluc3RydW1lbnRhdGlvbiBzdGFydHNcclxuICogICAgICAgICAgICAgICAgICAgd2l0aG91dCBlcnJvcnMuXHJcbiAqL1xyXG5tZXRob2RzLmFuZHJvaWRDb3ZlcmFnZSA9IGFzeW5jIGZ1bmN0aW9uIChpbnN0cnVtZW50Q2xhc3MsIHdhaXRQa2csIHdhaXRBY3Rpdml0eSkge1xyXG4gIGlmICghdGhpcy5pc1ZhbGlkQ2xhc3MoaW5zdHJ1bWVudENsYXNzKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEludmFsaWQgY2xhc3MgJHtpbnN0cnVtZW50Q2xhc3N9YCk7XHJcbiAgfVxyXG4gIHJldHVybiBhd2FpdCBuZXcgQihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBsZXQgYXJncyA9IHRoaXMuZXhlY3V0YWJsZS5kZWZhdWx0QXJnc1xyXG4gICAgICAuY29uY2F0KFsnc2hlbGwnLCAnYW0nLCAnaW5zdHJ1bWVudCcsICctZScsICdjb3ZlcmFnZScsICd0cnVlJywgJy13J10pXHJcbiAgICAgIC5jb25jYXQoW2luc3RydW1lbnRDbGFzc10pO1xyXG4gICAgbG9nLmRlYnVnKGBDb2xsZWN0aW5nIGNvdmVyYWdlIGRhdGEgd2l0aDogJHtbdGhpcy5leGVjdXRhYmxlLnBhdGhdLmNvbmNhdChhcmdzKS5qb2luKCcgJyl9YCk7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBhbSBpbnN0cnVtZW50IHJ1bnMgZm9yIHRoZSBsaWZlIG9mIHRoZSBhcHAgcHJvY2Vzcy5cclxuICAgICAgdGhpcy5pbnN0cnVtZW50UHJvYyA9IG5ldyBTdWJQcm9jZXNzKHRoaXMuZXhlY3V0YWJsZS5wYXRoLCBhcmdzKTtcclxuICAgICAgYXdhaXQgdGhpcy5pbnN0cnVtZW50UHJvYy5zdGFydCgwKTtcclxuICAgICAgdGhpcy5pbnN0cnVtZW50UHJvYy5vbignb3V0cHV0JywgKHN0ZG91dCwgc3RkZXJyKSA9PiB7XHJcbiAgICAgICAgaWYgKHN0ZGVycikge1xyXG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgRmFpbGVkIHRvIHJ1biBpbnN0cnVtZW50YXRpb24uIE9yaWdpbmFsIGVycm9yOiAke3N0ZGVycn1gKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgYXdhaXQgdGhpcy53YWl0Rm9yQWN0aXZpdHkod2FpdFBrZywgd2FpdEFjdGl2aXR5KTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZWplY3QobmV3IEVycm9yKGBBbmRyb2lkIGNvdmVyYWdlIGZhaWxlZC4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfWApKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBhcnRpY3VsYXIgcHJvcGVydHkgb2YgdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgLSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkuIFRoaXMgbmFtZSBzaG91bGRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUga25vd24gdG8gX2FkYiBzaGVsbCBnZXRwcm9wXyB0b29sLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gcHJvcGVydHkuXHJcbiAqL1xyXG5tZXRob2RzLmdldERldmljZVByb3BlcnR5ID0gYXN5bmMgZnVuY3Rpb24gKHByb3BlcnR5KSB7XHJcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoWydnZXRwcm9wJywgcHJvcGVydHldKTtcclxuICBsZXQgdmFsID0gc3Rkb3V0LnRyaW0oKTtcclxuICBsb2cuZGVidWcoYEN1cnJlbnQgZGV2aWNlIHByb3BlcnR5ICcke3Byb3BlcnR5fSc6ICR7dmFsfWApO1xyXG4gIHJldHVybiB2YWw7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBwYXJ0aWN1bGFyIHByb3BlcnR5IG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IC0gVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5LiBUaGlzIG5hbWUgc2hvdWxkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGtub3duIHRvIF9hZGIgc2hlbGwgc2V0cHJvcF8gdG9vbC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCAtIFRoZSBuZXcgcHJvcGVydHkgdmFsdWUuXHJcbiAqXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiBfc2V0cHJvcF8gdXRpbGl0eSBmYWlscyB0byBjaGFuZ2UgcHJvcGVydHkgdmFsdWUuXHJcbiAqL1xyXG5tZXRob2RzLnNldERldmljZVByb3BlcnR5ID0gYXN5bmMgZnVuY3Rpb24gKHByb3AsIHZhbCkge1xyXG4gIGxldCBhcGlMZXZlbCA9IGF3YWl0IHRoaXMuZ2V0QXBpTGV2ZWwoKTtcclxuICBpZiAoYXBpTGV2ZWwgPj0gMjYpIHtcclxuICAgIGxvZy5kZWJ1ZyhgUnVubmluZyBhZGIgcm9vdCwgQW5kcm9pZCBPIG5lZWRzIGFkYiB0byBiZSByb290ZWQgdG8gc2V0RGV2aWNlUHJvcGVydHlgKTtcclxuICAgIGF3YWl0IHRoaXMucm9vdCgpO1xyXG4gIH1cclxuICBsb2cuZGVidWcoYFNldHRpbmcgZGV2aWNlIHByb3BlcnR5ICcke3Byb3B9JyB0byAnJHt2YWx9J2ApO1xyXG4gIGxldCBlcnI7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IHRoaXMuc2hlbGwoWydzZXRwcm9wJywgcHJvcCwgdmFsXSk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgZXJyID0gZTtcclxuICB9XHJcbiAgaWYgKGFwaUxldmVsID49IDI2KSB7XHJcbiAgICBsb2cuZGVidWcoYFJlbW92aW5nIGFkYiByb290IGZvciBzZXREZXZpY2VQcm9wZXJ0eWApO1xyXG4gICAgYXdhaXQgdGhpcy51bnJvb3QoKTtcclxuICB9XHJcbiAgaWYgKGVycikgdGhyb3cgZXJyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XHJcbn07XHJcblxyXG4vKipcclxuICogQHJldHVybiB7c3RyaW5nfSBDdXJyZW50IHN5c3RlbSBsYW5ndWFnZSBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqL1xyXG5tZXRob2RzLmdldERldmljZVN5c0xhbmd1YWdlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmdldERldmljZVByb3BlcnR5KFwicGVyc2lzdC5zeXMubGFuZ3VhZ2VcIik7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBuZXcgc3lzdGVtIGxhbmd1YWdlIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIC0gVGhlIG5ldyBsYW5ndWFnZSB2YWx1ZS5cclxuICovXHJcbm1ldGhvZHMuc2V0RGV2aWNlU3lzTGFuZ3VhZ2UgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5zZXREZXZpY2VQcm9wZXJ0eShcInBlcnNpc3Quc3lzLmxhbmd1YWdlXCIsIGxhbmd1YWdlLnRvTG93ZXJDYXNlKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gQ3VycmVudCBjb3VudHJ5IG5hbWUgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKi9cclxubWV0aG9kcy5nZXREZXZpY2VTeXNDb3VudHJ5ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmdldERldmljZVByb3BlcnR5KFwicGVyc2lzdC5zeXMuY291bnRyeVwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIG5ldyBzeXN0ZW0gY291bnRyeSBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudHJ5IC0gVGhlIG5ldyBjb3VudHJ5IHZhbHVlLlxyXG4gKi9cclxubWV0aG9kcy5zZXREZXZpY2VTeXNDb3VudHJ5ID0gYXN5bmMgZnVuY3Rpb24gKGNvdW50cnkpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5zZXREZXZpY2VQcm9wZXJ0eShcInBlcnNpc3Quc3lzLmNvdW50cnlcIiwgY291bnRyeS50b1VwcGVyQ2FzZSgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEN1cnJlbnQgc3lzdGVtIGxvY2FsZSBuYW1lIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICovXHJcbm1ldGhvZHMuZ2V0RGV2aWNlU3lzTG9jYWxlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmdldERldmljZVByb3BlcnR5KFwicGVyc2lzdC5zeXMubG9jYWxlXCIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgbmV3IHN5c3RlbSBsb2NhbGUgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlIC0gVGhlIG5ldyBsb2NhbGUgdmFsdWUuXHJcbiAqL1xyXG5tZXRob2RzLnNldERldmljZVN5c0xvY2FsZSA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhbGUpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5zZXREZXZpY2VQcm9wZXJ0eShcInBlcnNpc3Quc3lzLmxvY2FsZVwiLCBsb2NhbGUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gQ3VycmVudCBwcm9kdWN0IGxhbmd1YWdlIG5hbWUgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKi9cclxubWV0aG9kcy5nZXREZXZpY2VQcm9kdWN0TGFuZ3VhZ2UgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvcGVydHkoXCJyby5wcm9kdWN0LmxvY2FsZS5sYW5ndWFnZVwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEN1cnJlbnQgcHJvZHVjdCBjb3VudHJ5IG5hbWUgb24gdGhlIGRldmljZSB1bmRlciB0ZXN0LlxyXG4gKi9cclxubWV0aG9kcy5nZXREZXZpY2VQcm9kdWN0Q291bnRyeSA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5nZXREZXZpY2VQcm9wZXJ0eShcInJvLnByb2R1Y3QubG9jYWxlLnJlZ2lvblwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEN1cnJlbnQgcHJvZHVjdCBsb2NhbGUgbmFtZSBvbiB0aGUgZGV2aWNlIHVuZGVyIHRlc3QuXHJcbiAqL1xyXG5tZXRob2RzLmdldERldmljZVByb2R1Y3RMb2NhbGUgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvcGVydHkoXCJyby5wcm9kdWN0LmxvY2FsZVwiKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBtb2RlbCBuYW1lIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICovXHJcbm1ldGhvZHMuZ2V0TW9kZWwgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0RGV2aWNlUHJvcGVydHkoXCJyby5wcm9kdWN0Lm1vZGVsXCIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIG1hbnVmYWN0dXJlciBuYW1lIG9mIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICovXHJcbm1ldGhvZHMuZ2V0TWFudWZhY3R1cmVyID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIHJldHVybiBhd2FpdCB0aGlzLmdldERldmljZVByb3BlcnR5KFwicm8ucHJvZHVjdC5tYW51ZmFjdHVyZXJcIik7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjdXJyZW50IHNjcmVlbiBzaXplLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IERldmljZSBzY3JlZW4gc2l6ZSBhcyBzdHJpbmcgaW4gZm9ybWF0ICdXeEgnIG9yXHJcbiAqICAgICAgICAgICAgICAgICAgX251bGxfIGlmIGl0IGNhbm5vdCBiZSBkZXRlcm1pbmVkLlxyXG4gKi9cclxubWV0aG9kcy5nZXRTY3JlZW5TaXplID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGxldCBzdGRvdXQgPSBhd2FpdCB0aGlzLnNoZWxsKFsnd20nLCAnc2l6ZSddKTtcclxuICBsZXQgc2l6ZSA9IG5ldyBSZWdFeHAoL1BoeXNpY2FsIHNpemU6IChbXlxccj9cXG5dKykqL2cpLmV4ZWMoc3Rkb3V0KTtcclxuICBpZiAoc2l6ZSAmJiBzaXplLmxlbmd0aCA+PSAyKSB7XHJcbiAgICByZXR1cm4gc2l6ZVsxXS50cmltKCk7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudCBzY3JlZW4gZGVuc2l0eSBpbiBkcGlcclxuICpcclxuICogQHJldHVybiB7P251bWJlcn0gRGV2aWNlIHNjcmVlbiBkZW5zaXR5IGFzIGEgbnVtYmVyIG9yIF9udWxsXyBpZiBpdFxyXG4gKiAgICAgICAgICAgICAgICAgIGNhbm5vdCBiZSBkZXRlcm1pbmVkXHJcbiAqL1xyXG5tZXRob2RzLmdldFNjcmVlbkRlbnNpdHkgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IHN0ZG91dCA9IGF3YWl0IHRoaXMuc2hlbGwoWyd3bScsICdkZW5zaXR5J10pO1xyXG4gIGxldCBkZW5zaXR5ID0gbmV3IFJlZ0V4cCgvUGh5c2ljYWwgZGVuc2l0eTogKFteXFxyP1xcbl0rKSovZykuZXhlYyhzdGRvdXQpO1xyXG4gIGlmIChkZW5zaXR5ICYmIGRlbnNpdHkubGVuZ3RoID49IDIpIHtcclxuICAgIGxldCBkZW5zaXR5TnVtYmVyID0gcGFyc2VJbnQoZGVuc2l0eVsxXS50cmltKCksIDEwKTtcclxuICAgIHJldHVybiBpc05hTihkZW5zaXR5TnVtYmVyKSA/IG51bGwgOiBkZW5zaXR5TnVtYmVyO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXR1cCBIVFRQIHByb3h5IGluIGRldmljZSBzZXR0aW5ncy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5SG9zdCAtIFRoZSBob3N0IG5hbWUgb2YgdGhlIHByb3h5LlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHByb3h5UG9ydCAtIFRoZSBwb3J0IG51bWJlciB0byBiZSBzZXQuXHJcbiAqL1xyXG5tZXRob2RzLnNldEh0dHBQcm94eSA9IGFzeW5jIGZ1bmN0aW9uIChwcm94eUhvc3QsIHByb3h5UG9ydCkge1xyXG4gIGxldCBwcm94eSA9IGAke3Byb3h5SG9zdH06JHtwcm94eVBvcnR9YDtcclxuICBpZiAoXy5pc1VuZGVmaW5lZChwcm94eUhvc3QpKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ2FsbCB0byBzZXRIdHRwUHJveHkgbWV0aG9kIHdpdGggdW5kZWZpbmVkIHByb3h5X2hvc3Q6ICR7cHJveHl9YCk7XHJcbiAgfVxyXG4gIGlmIChfLmlzVW5kZWZpbmVkKHByb3h5UG9ydCkpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBDYWxsIHRvIHNldEh0dHBQcm94eSBtZXRob2Qgd2l0aCB1bmRlZmluZWQgcHJveHlfcG9ydCAke3Byb3h5fWApO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLnNldFNldHRpbmcoJ2dsb2JhbCcsICdodHRwX3Byb3h5JywgcHJveHkpO1xyXG4gIGF3YWl0IHRoaXMuc2V0U2V0dGluZygnc2VjdXJlJywgJ2h0dHBfcHJveHknLCBwcm94eSk7XHJcbiAgYXdhaXQgdGhpcy5zZXRTZXR0aW5nKCdzeXN0ZW0nLCAnaHR0cF9wcm94eScsIHByb3h5KTtcclxuICBhd2FpdCB0aGlzLnNldFNldHRpbmcoJ3N5c3RlbScsICdnbG9iYWxfaHR0cF9wcm94eV9ob3N0JywgcHJveHlIb3N0KTtcclxuICBhd2FpdCB0aGlzLnNldFNldHRpbmcoJ3N5c3RlbScsICdnbG9iYWxfaHR0cF9wcm94eV9wb3J0JywgcHJveHlQb3J0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgZGV2aWNlIHByb3BlcnR5LlxyXG4gKiBbYW5kcm9pZC5wcm92aWRlci5TZXR0aW5nc117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYW5kcm9pZC5jb20vcmVmZXJlbmNlL2FuZHJvaWQvcHJvdmlkZXIvU2V0dGluZ3MuaHRtbH1cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSAtIG9uZSBvZiB7c3lzdGVtLCBzZWN1cmUsIGdsb2JhbH0sIGNhc2UtaW5zZW5zaXRpdmUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZXR0aW5nIC0gcHJvcGVydHkgbmFtZS5cclxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB2YWx1ZSAtIHByb3BlcnR5IHZhbHVlLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IGNvbW1hbmQgb3V0cHV0LlxyXG4gKi9cclxubWV0aG9kcy5zZXRTZXR0aW5nID0gYXN5bmMgZnVuY3Rpb24gKG5hbWVzcGFjZSwgc2V0dGluZywgdmFsdWUpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5zaGVsbChbJ3NldHRpbmdzJywgJ3B1dCcsIG5hbWVzcGFjZSwgc2V0dGluZywgdmFsdWVdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgZGV2aWNlIHByb3BlcnR5LlxyXG4gKiBbYW5kcm9pZC5wcm92aWRlci5TZXR0aW5nc117QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIuYW5kcm9pZC5jb20vcmVmZXJlbmNlL2FuZHJvaWQvcHJvdmlkZXIvU2V0dGluZ3MuaHRtbH1cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSAtIG9uZSBvZiB7c3lzdGVtLCBzZWN1cmUsIGdsb2JhbH0sIGNhc2UtaW5zZW5zaXRpdmUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZXR0aW5nIC0gcHJvcGVydHkgbmFtZS5cclxuICogQHJldHVybiB7c3RyaW5nfSBwcm9wZXJ0eSB2YWx1ZS5cclxuICovXHJcbm1ldGhvZHMuZ2V0U2V0dGluZyA9IGFzeW5jIGZ1bmN0aW9uIChuYW1lc3BhY2UsIHNldHRpbmcpIHtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5zaGVsbChbJ3NldHRpbmdzJywgJ2dldCcsIG5hbWVzcGFjZSwgc2V0dGluZ10pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWV0aG9kcztcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
