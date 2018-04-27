'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var _loggerJs = require('./logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _teen_process = require('teen_process');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var rootDir = _path2['default'].resolve(__dirname, process.env.NO_PRECOMPILE ? '..' : '../..');
var androidPlatforms = ['android-4.2', 'android-17', 'android-4.3', 'android-18', 'android-4.4', 'android-19', 'android-L', 'android-20', 'android-5.0', 'android-21', 'android-22', 'android-MNC', 'android-23', 'android-6.0', 'android-N', 'android-24', 'android-25'];

function getDirectories(rootPath) {
  var files, dirs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, pathString;

  return _regeneratorRuntime.async(function getDirectories$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readdir(rootPath));

      case 2:
        files = context$1$0.sent;
        dirs = [];
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 7;
        _iterator = _getIterator(files);

      case 9:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 19;
          break;
        }

        file = _step.value;
        pathString = _path2['default'].resolve(rootPath, file);
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.lstat(pathString));

      case 14:
        if (!context$1$0.sent.isDirectory()) {
          context$1$0.next = 16;
          break;
        }

        dirs.push(file);

      case 16:
        _iteratorNormalCompletion = true;
        context$1$0.next = 9;
        break;

      case 19:
        context$1$0.next = 25;
        break;

      case 21:
        context$1$0.prev = 21;
        context$1$0.t0 = context$1$0['catch'](7);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 25:
        context$1$0.prev = 25;
        context$1$0.prev = 26;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 28:
        context$1$0.prev = 28;

        if (!_didIteratorError) {
          context$1$0.next = 31;
          break;
        }

        throw _iteratorError;

      case 31:
        return context$1$0.finish(28);

      case 32:
        return context$1$0.finish(25);

      case 33:
        return context$1$0.abrupt('return', dirs.sort());

      case 34:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[7, 21, 25, 33], [26,, 28, 32]]);
}

function getAndroidPlatformAndPath() {
  var androidHome, platforms, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, platform, platformPath;

  return _regeneratorRuntime.async(function getAndroidPlatformAndPath$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        androidHome = process.env.ANDROID_HOME;

        if (!_lodash2['default'].isString(androidHome)) {
          _loggerJs2['default'].errorAndThrow("ANDROID_HOME environment variable was not exported");
        }

        // get the latest platform and path
        platforms = _path2['default'].resolve(androidHome, 'platforms');
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 6;
        _iterator2 = _getIterator(_lodash2['default'].clone(androidPlatforms).reverse());

      case 8:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 18;
          break;
        }

        platform = _step2.value;
        platformPath = _path2['default'].resolve(platforms, platform);
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(platformPath));

      case 13:
        if (!context$1$0.sent) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('return', { platform: platform, platformPath: platformPath });

      case 15:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 8;
        break;

      case 18:
        context$1$0.next = 24;
        break;

      case 20:
        context$1$0.prev = 20;
        context$1$0.t0 = context$1$0['catch'](6);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 24:
        context$1$0.prev = 24;
        context$1$0.prev = 25;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 27:
        context$1$0.prev = 27;

        if (!_didIteratorError2) {
          context$1$0.next = 30;
          break;
        }

        throw _iteratorError2;

      case 30:
        return context$1$0.finish(27);

      case 31:
        return context$1$0.finish(24);

      case 32:
        return context$1$0.abrupt('return', { platform: null, platformPath: null });

      case 33:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 20, 24, 32], [25,, 27, 31]]);
}

function unzipFile(zipPath) {
  return _regeneratorRuntime.async(function unzipFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Unzipping ' + zipPath);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(assertZipArchive(zipPath));

      case 4:
        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_appiumSupport.zip.extractAllTo(zipPath, _path2['default'].dirname(zipPath)));

      case 7:
        _loggerJs2['default'].debug("Unzip successful");
        context$1$0.next = 13;
        break;

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('unzip', ['-o', zipPath], { cwd: _path2['default'].dirname(zipPath) }));

      case 12:
        _loggerJs2['default'].debug("Unzip successful");

      case 13:
        context$1$0.next = 18;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](1);
        throw new Error('Error occurred while unzipping. Original error: ' + context$1$0.t0.message);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 15]]);
}

function assertZipArchive(zipPath) {
  var execOpts;
  return _regeneratorRuntime.async(function assertZipArchive$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Testing zip archive: \'' + zipPath + '\'');

        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(zipPath));

      case 4:
        if (!context$1$0.sent) {
          context$1$0.next = 8;
          break;
        }

        _loggerJs2['default'].debug("Zip archive tested clean");
        context$1$0.next = 9;
        break;

      case 8:
        throw new Error('Zip archive not present at ' + zipPath);

      case 9:
        context$1$0.next = 22;
        break;

      case 11:
        execOpts = { cwd: _path2['default'].dirname(zipPath) };
        context$1$0.prev = 12;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('unzip', ['-tqv', zipPath], execOpts));

      case 15:
        context$1$0.next = 22;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](12);

        if (!(context$1$0.t0.message.indexOf('code 2') === -1)) {
          context$1$0.next = 21;
          break;
        }

        throw context$1$0.t0;

      case 21:
        _loggerJs2['default'].warn('Test failed with recoverable error. Continuing.');

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 17]]);
}

function getIMEListFromOutput(stdout) {
  var engines = [];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(stdout.split('\n')), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var line = _step3.value;

      if (line.length > 0 && line[0] !== ' ') {
        // remove newline and trailing colon, and add to the list
        engines.push(line.trim().replace(/:$/, ''));
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return engines;
}

var getJavaForOs = _lodash2['default'].memoize(function () {
  return _path2['default'].resolve(getJavaHome(), 'bin', 'java' + (_appiumSupport.system.isWindows() ? '.exe' : ''));
});

function getJavaHome() {
  if (process.env.JAVA_HOME) {
    return process.env.JAVA_HOME;
  }
  throw new Error("JAVA_HOME is not set currently. Please set JAVA_HOME.");
}

/**
 * Get the absolute path to apksigner tool
 *
 * @param {Object} sysHelpers - An instance containing systemCallMethods helper methods
 * @returns {string} An absolute path to apksigner tool.
 * @throws {Error} If the tool is not present on the local file system.
 */
function getApksignerForOs(sysHelpers) {
  return _regeneratorRuntime.async(function getApksignerForOs$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(sysHelpers.getBinaryFromSdkRoot('apksigner'));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/**
 * Checks mShowingLockscreen or mDreamingLockscreen in dumpsys output to determine
 * if lock screen is showing
 *
 * @param {string} dumpsys - The output of dumpsys window command.
 * @return {boolean} True if lock screen is showing.
 */
function isShowingLockscreen(dumpsys) {
  return (/(mShowingLockscreen=true|mDreamingLockscreen=true)/gi.test(dumpsys)
  );
}

/*
 * Checks mCurrentFocus in dumpsys output to determine if Keyguard is activated
 */
function isCurrentFocusOnKeyguard(dumpsys) {
  var m = /mCurrentFocus.+Keyguard/gi.exec(dumpsys);
  return m && m.length && m[0] ? true : false;
}

/*
 * Reads SurfaceOrientation in dumpsys output
 */
function getSurfaceOrientation(dumpsys) {
  var m = /SurfaceOrientation: \d/gi.exec(dumpsys);
  return m && parseInt(m[0].split(':')[1], 10);
}

/*
 * Checks mScreenOnFully in dumpsys output to determine if screen is showing
 * Default is true
 */
function isScreenOnFully(dumpsys) {
  var m = /mScreenOnFully=\w+/gi.exec(dumpsys);
  return !m || // if information is missing we assume screen is fully on
  m && m.length > 0 && m[0].split('=')[1] === 'true' || false;
}

function buildStartCmd(startAppOptions, apiLevel) {
  var cmd = ['am', 'start', '-W', '-n', startAppOptions.pkg + '/' + startAppOptions.activity];
  if (startAppOptions.stopApp && apiLevel >= 15) {
    cmd.push('-S');
  }
  if (startAppOptions.action) {
    cmd.push('-a', startAppOptions.action);
  }
  if (startAppOptions.category) {
    cmd.push('-c', startAppOptions.category);
  }
  if (startAppOptions.flags) {
    cmd.push('-f', startAppOptions.flags);
  }
  if (startAppOptions.optionalIntentArguments) {
    // expect optionalIntentArguments to be a single string of the form:
    //     "-flag key"
    //     "-flag key value"
    // or a combination of these (e.g., "-flag1 key1 -flag2 key2 value2")

    // take a string and parse out the part before any spaces, and anything after
    // the first space
    var parseKeyValue = function parseKeyValue(str) {
      str = str.trim();
      var space = str.indexOf(' ');
      if (space === -1) {
        return str.length ? [str] : [];
      } else {
        return [str.substring(0, space).trim(), str.substring(space + 1).trim()];
      }
    };

    // cycle through the optionalIntentArguments and pull out the arguments
    // add a space initially so flags can be distinguished from arguments that
    // have internal hyphens
    var optionalIntentArguments = ' ' + startAppOptions.optionalIntentArguments;
    var re = / (-[^\s]+) (.+)/;
    while (true) {
      // eslint-disable-line no-constant-condition
      var args = re.exec(optionalIntentArguments);
      if (!args) {
        if (optionalIntentArguments.length) {
          // no more flags, so the remainder can be treated as 'key' or 'key value'
          cmd.push.apply(cmd, parseKeyValue(optionalIntentArguments));
        }
        // we are done
        break;
      }

      // take the flag and see if it is at the beginning of the string
      // if it is not, then it means we have been through already, and
      // what is before the flag is the argument for the previous flag
      var flag = args[1];
      var flagPos = optionalIntentArguments.indexOf(flag);
      if (flagPos !== 0) {
        var prevArgs = optionalIntentArguments.substring(0, flagPos);
        cmd.push.apply(cmd, parseKeyValue(prevArgs));
      }

      // add the flag, as there are no more earlier arguments
      cmd.push(flag);

      // make optionalIntentArguments hold the remainder
      optionalIntentArguments = args[2];
    }
  }
  return cmd;
}

var getSdkToolsVersion = _lodash2['default'].memoize(function getSdkToolsVersion() {
  var androidHome, propertiesPath, propertiesContent, versionMatcher, match;
  return _regeneratorRuntime.async(function getSdkToolsVersion$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        androidHome = process.env.ANDROID_HOME;

        if (!androidHome) {
          _loggerJs2['default'].errorAndThrow('ANDROID_HOME environment varibale is expected to be set');
        }
        propertiesPath = _path2['default'].resolve(androidHome, 'tools', 'source.properties');
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(propertiesPath));

      case 5:
        if (context$1$0.sent) {
          context$1$0.next = 8;
          break;
        }

        _loggerJs2['default'].warn('Cannot find ' + propertiesPath + ' file to read SDK version from');
        return context$1$0.abrupt('return');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(propertiesPath, 'utf8'));

      case 10:
        propertiesContent = context$1$0.sent;
        versionMatcher = new RegExp(/Pkg\.Revision=(\d+)\.?(\d+)?\.?(\d+)?/);
        match = versionMatcher.exec(propertiesContent);

        if (!match) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('return', { major: parseInt(match[1], 10),
          minor: match[2] ? parseInt(match[2], 10) : 0,
          build: match[3] ? parseInt(match[3], 10) : 0 });

      case 15:
        _loggerJs2['default'].warn('Cannot parse "Pkg.Revision" value from ' + propertiesPath);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});

exports.getDirectories = getDirectories;
exports.getAndroidPlatformAndPath = getAndroidPlatformAndPath;
exports.unzipFile = unzipFile;
exports.assertZipArchive = assertZipArchive;
exports.getIMEListFromOutput = getIMEListFromOutput;
exports.getJavaForOs = getJavaForOs;
exports.isShowingLockscreen = isShowingLockscreen;
exports.isCurrentFocusOnKeyguard = isCurrentFocusOnKeyguard;
exports.getSurfaceOrientation = getSurfaceOrientation;
exports.isScreenOnFully = isScreenOnFully;
exports.buildStartCmd = buildStartCmd;
exports.getJavaHome = getJavaHome;
exports.rootDir = rootDir;
exports.androidPlatforms = androidPlatforms;
exports.getSdkToolsVersion = getSdkToolsVersion;
exports.getApksignerForOs = getApksignerForOs;

// It is not a clean way to sort it, but in this case would work fine because
// we have numerics and alphanumeric
// will return some thing like this
// ["17.0.0", "18.0.1", "19.0.0", "19.0.1", "19.1.0", "20.0.0",
//  "android-4.2.2", "android-4.3", "android-4.4"]
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFDOzs7QUFFdkQsOEJBQUksSUFBSSw2Q0FBMkMsY0FBYyxDQUFHLENBQUM7Ozs7Ozs7Q0FDdEUsQ0FBQyxDQUFDOztRQUVNLGNBQWMsR0FBZCxjQUFjO1FBQUUseUJBQXlCLEdBQXpCLHlCQUF5QjtRQUFFLFNBQVMsR0FBVCxTQUFTO1FBQUUsZ0JBQWdCLEdBQWhCLGdCQUFnQjtRQUN0RSxvQkFBb0IsR0FBcEIsb0JBQW9CO1FBQUUsWUFBWSxHQUFaLFlBQVk7UUFBRSxtQkFBbUIsR0FBbkIsbUJBQW1CO1FBQUUsd0JBQXdCLEdBQXhCLHdCQUF3QjtRQUNqRixxQkFBcUIsR0FBckIscUJBQXFCO1FBQUUsZUFBZSxHQUFmLGVBQWU7UUFBRSxhQUFhLEdBQWIsYUFBYTtRQUFFLFdBQVcsR0FBWCxXQUFXO1FBQ2xFLE9BQU8sR0FBUCxPQUFPO1FBQUUsZ0JBQWdCLEdBQWhCLGdCQUFnQjtRQUFFLGtCQUFrQixHQUFsQixrQkFBa0I7UUFBRSxpQkFBaUIsR0FBakIsaUJBQWlCIiwiZmlsZSI6ImxpYi9oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IHN5c3RlbSwgZnMsIHppcCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlci5qcyc7XHJcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuXHJcbmNvbnN0IHJvb3REaXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBwcm9jZXNzLmVudi5OT19QUkVDT01QSUxFID8gJy4uJyA6ICcuLi8uLicpO1xyXG5jb25zdCBhbmRyb2lkUGxhdGZvcm1zID0gWydhbmRyb2lkLTQuMicsICdhbmRyb2lkLTE3JywgJ2FuZHJvaWQtNC4zJywgJ2FuZHJvaWQtMTgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLTQuNCcsICdhbmRyb2lkLTE5JywgJ2FuZHJvaWQtTCcsICdhbmRyb2lkLTIwJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC01LjAnLCAnYW5kcm9pZC0yMScsICdhbmRyb2lkLTIyJywgJ2FuZHJvaWQtTU5DJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC0yMycsICdhbmRyb2lkLTYuMCcsICdhbmRyb2lkLU4nLCAnYW5kcm9pZC0yNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQtMjUnXTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldERpcmVjdG9yaWVzIChyb290UGF0aCkge1xyXG4gIGxldCBmaWxlcyA9IGF3YWl0IGZzLnJlYWRkaXIocm9vdFBhdGgpO1xyXG4gIGxldCBkaXJzID0gW107XHJcbiAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xyXG4gICAgbGV0IHBhdGhTdHJpbmcgPSBwYXRoLnJlc29sdmUocm9vdFBhdGgsIGZpbGUpO1xyXG4gICAgaWYgKChhd2FpdCBmcy5sc3RhdChwYXRoU3RyaW5nKSkuaXNEaXJlY3RvcnkoKSkge1xyXG4gICAgICBkaXJzLnB1c2goZmlsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIEl0IGlzIG5vdCBhIGNsZWFuIHdheSB0byBzb3J0IGl0LCBidXQgaW4gdGhpcyBjYXNlIHdvdWxkIHdvcmsgZmluZSBiZWNhdXNlXHJcbiAgLy8gd2UgaGF2ZSBudW1lcmljcyBhbmQgYWxwaGFudW1lcmljXHJcbiAgLy8gd2lsbCByZXR1cm4gc29tZSB0aGluZyBsaWtlIHRoaXNcclxuICAvLyBbXCIxNy4wLjBcIiwgXCIxOC4wLjFcIiwgXCIxOS4wLjBcIiwgXCIxOS4wLjFcIiwgXCIxOS4xLjBcIiwgXCIyMC4wLjBcIixcclxuICAvLyAgXCJhbmRyb2lkLTQuMi4yXCIsIFwiYW5kcm9pZC00LjNcIiwgXCJhbmRyb2lkLTQuNFwiXVxyXG4gIHJldHVybiBkaXJzLnNvcnQoKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCAoKSB7XHJcbiAgY29uc3QgYW5kcm9pZEhvbWUgPSBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUU7XHJcbiAgaWYgKCFfLmlzU3RyaW5nKGFuZHJvaWRIb21lKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coXCJBTkRST0lEX0hPTUUgZW52aXJvbm1lbnQgdmFyaWFibGUgd2FzIG5vdCBleHBvcnRlZFwiKTtcclxuICB9XHJcblxyXG4gIC8vIGdldCB0aGUgbGF0ZXN0IHBsYXRmb3JtIGFuZCBwYXRoXHJcbiAgbGV0IHBsYXRmb3JtcyA9IHBhdGgucmVzb2x2ZShhbmRyb2lkSG9tZSwgJ3BsYXRmb3JtcycpO1xyXG4gIGZvciAobGV0IHBsYXRmb3JtIG9mIF8uY2xvbmUoYW5kcm9pZFBsYXRmb3JtcykucmV2ZXJzZSgpKSB7XHJcbiAgICBsZXQgcGxhdGZvcm1QYXRoID0gcGF0aC5yZXNvbHZlKHBsYXRmb3JtcywgcGxhdGZvcm0pO1xyXG4gICAgaWYgKGF3YWl0IGZzLmV4aXN0cyhwbGF0Zm9ybVBhdGgpKSB7XHJcbiAgICAgIHJldHVybiB7cGxhdGZvcm0sIHBsYXRmb3JtUGF0aH07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB7cGxhdGZvcm06IG51bGwsIHBsYXRmb3JtUGF0aDogbnVsbH07XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHVuemlwRmlsZSAoemlwUGF0aCkge1xyXG4gIGxvZy5kZWJ1ZyhgVW56aXBwaW5nICR7emlwUGF0aH1gKTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgYXNzZXJ0WmlwQXJjaGl2ZSh6aXBQYXRoKTtcclxuICAgIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcclxuICAgICAgYXdhaXQgemlwLmV4dHJhY3RBbGxUbyh6aXBQYXRoLCBwYXRoLmRpcm5hbWUoemlwUGF0aCkpO1xyXG4gICAgICBsb2cuZGVidWcoXCJVbnppcCBzdWNjZXNzZnVsXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXdhaXQgZXhlYygndW56aXAnLCBbJy1vJywgemlwUGF0aF0sIHtjd2Q6IHBhdGguZGlybmFtZSh6aXBQYXRoKX0pO1xyXG4gICAgICBsb2cuZGVidWcoXCJVbnppcCBzdWNjZXNzZnVsXCIpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igb2NjdXJyZWQgd2hpbGUgdW56aXBwaW5nLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBhc3NlcnRaaXBBcmNoaXZlICh6aXBQYXRoKSB7XHJcbiAgbG9nLmRlYnVnKGBUZXN0aW5nIHppcCBhcmNoaXZlOiAnJHt6aXBQYXRofSdgKTtcclxuICBpZiAoc3lzdGVtLmlzV2luZG93cygpKSB7XHJcbiAgICBpZiAoYXdhaXQgZnMuZXhpc3RzKHppcFBhdGgpKSB7XHJcbiAgICAgIGxvZy5kZWJ1ZyhcIlppcCBhcmNoaXZlIHRlc3RlZCBjbGVhblwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWmlwIGFyY2hpdmUgbm90IHByZXNlbnQgYXQgJHt6aXBQYXRofWApO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgZXhlY09wdHMgPSB7Y3dkOiBwYXRoLmRpcm5hbWUoemlwUGF0aCl9O1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgZXhlYygndW56aXAnLCBbJy10cXYnLCB6aXBQYXRoXSwgZXhlY09wdHMpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGlmIChlcnIubWVzc2FnZS5pbmRleE9mKCdjb2RlIDInKSA9PT0gLTEpIHtcclxuICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgIH1cclxuICAgICAgbG9nLndhcm4oYFRlc3QgZmFpbGVkIHdpdGggcmVjb3ZlcmFibGUgZXJyb3IuIENvbnRpbnVpbmcuYCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRJTUVMaXN0RnJvbU91dHB1dCAoc3Rkb3V0KSB7XHJcbiAgbGV0IGVuZ2luZXMgPSBbXTtcclxuICBmb3IgKGxldCBsaW5lIG9mIHN0ZG91dC5zcGxpdCgnXFxuJykpIHtcclxuICAgIGlmIChsaW5lLmxlbmd0aCA+IDAgJiYgbGluZVswXSAhPT0gJyAnKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBuZXdsaW5lIGFuZCB0cmFpbGluZyBjb2xvbiwgYW5kIGFkZCB0byB0aGUgbGlzdFxyXG4gICAgICBlbmdpbmVzLnB1c2gobGluZS50cmltKCkucmVwbGFjZSgvOiQvLCAnJykpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZW5naW5lcztcclxufVxyXG5cclxuY29uc3QgZ2V0SmF2YUZvck9zID0gXy5tZW1vaXplKCgpID0+IHtcclxuICByZXR1cm4gcGF0aC5yZXNvbHZlKGdldEphdmFIb21lKCksICdiaW4nLCBgamF2YSR7c3lzdGVtLmlzV2luZG93cygpID8gJy5leGUnIDogJyd9YCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZ2V0SmF2YUhvbWUgKCkge1xyXG4gIGlmIChwcm9jZXNzLmVudi5KQVZBX0hPTUUpIHtcclxuICAgIHJldHVybiBwcm9jZXNzLmVudi5KQVZBX0hPTUU7XHJcbiAgfVxyXG4gIHRocm93IG5ldyBFcnJvcihcIkpBVkFfSE9NRSBpcyBub3Qgc2V0IGN1cnJlbnRseS4gUGxlYXNlIHNldCBKQVZBX0hPTUUuXCIpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBhYnNvbHV0ZSBwYXRoIHRvIGFwa3NpZ25lciB0b29sXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzeXNIZWxwZXJzIC0gQW4gaW5zdGFuY2UgY29udGFpbmluZyBzeXN0ZW1DYWxsTWV0aG9kcyBoZWxwZXIgbWV0aG9kc1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBhYnNvbHV0ZSBwYXRoIHRvIGFwa3NpZ25lciB0b29sLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgdGhlIHRvb2wgaXMgbm90IHByZXNlbnQgb24gdGhlIGxvY2FsIGZpbGUgc3lzdGVtLlxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZ2V0QXBrc2lnbmVyRm9yT3MgKHN5c0hlbHBlcnMpIHtcclxuICByZXR1cm4gYXdhaXQgc3lzSGVscGVycy5nZXRCaW5hcnlGcm9tU2RrUm9vdCgnYXBrc2lnbmVyJyk7XHJcbn1cclxuXHJcbiAvKipcclxuICAqIENoZWNrcyBtU2hvd2luZ0xvY2tzY3JlZW4gb3IgbURyZWFtaW5nTG9ja3NjcmVlbiBpbiBkdW1wc3lzIG91dHB1dCB0byBkZXRlcm1pbmVcclxuICAqIGlmIGxvY2sgc2NyZWVuIGlzIHNob3dpbmdcclxuICAqXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gZHVtcHN5cyAtIFRoZSBvdXRwdXQgb2YgZHVtcHN5cyB3aW5kb3cgY29tbWFuZC5cclxuICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbG9jayBzY3JlZW4gaXMgc2hvd2luZy5cclxuICAqL1xyXG5mdW5jdGlvbiBpc1Nob3dpbmdMb2Nrc2NyZWVuIChkdW1wc3lzKSB7XHJcbiAgcmV0dXJuIC8obVNob3dpbmdMb2Nrc2NyZWVuPXRydWV8bURyZWFtaW5nTG9ja3NjcmVlbj10cnVlKS9naS50ZXN0KGR1bXBzeXMpO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDaGVja3MgbUN1cnJlbnRGb2N1cyBpbiBkdW1wc3lzIG91dHB1dCB0byBkZXRlcm1pbmUgaWYgS2V5Z3VhcmQgaXMgYWN0aXZhdGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0N1cnJlbnRGb2N1c09uS2V5Z3VhcmQgKGR1bXBzeXMpIHtcclxuICBsZXQgbSA9IC9tQ3VycmVudEZvY3VzLitLZXlndWFyZC9naS5leGVjKGR1bXBzeXMpO1xyXG4gIHJldHVybiAobSAmJiBtLmxlbmd0aCAmJiBtWzBdKSA/IHRydWUgOiBmYWxzZTtcclxufVxyXG5cclxuLypcclxuICogUmVhZHMgU3VyZmFjZU9yaWVudGF0aW9uIGluIGR1bXBzeXMgb3V0cHV0XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRTdXJmYWNlT3JpZW50YXRpb24gKGR1bXBzeXMpIHtcclxuICBsZXQgbSA9IC9TdXJmYWNlT3JpZW50YXRpb246IFxcZC9naS5leGVjKGR1bXBzeXMpO1xyXG4gIHJldHVybiBtICYmIHBhcnNlSW50KG1bMF0uc3BsaXQoJzonKVsxXSwgMTApO1xyXG59XHJcblxyXG4vKlxyXG4gKiBDaGVja3MgbVNjcmVlbk9uRnVsbHkgaW4gZHVtcHN5cyBvdXRwdXQgdG8gZGV0ZXJtaW5lIGlmIHNjcmVlbiBpcyBzaG93aW5nXHJcbiAqIERlZmF1bHQgaXMgdHJ1ZVxyXG4gKi9cclxuZnVuY3Rpb24gaXNTY3JlZW5PbkZ1bGx5IChkdW1wc3lzKSB7XHJcbiAgbGV0IG0gPSAvbVNjcmVlbk9uRnVsbHk9XFx3Ky9naS5leGVjKGR1bXBzeXMpO1xyXG4gIHJldHVybiAhbSB8fCAvLyBpZiBpbmZvcm1hdGlvbiBpcyBtaXNzaW5nIHdlIGFzc3VtZSBzY3JlZW4gaXMgZnVsbHkgb25cclxuICAgICAgICAgKG0gJiYgbS5sZW5ndGggPiAwICYmIG1bMF0uc3BsaXQoJz0nKVsxXSA9PT0gJ3RydWUnKSB8fCBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVpbGRTdGFydENtZCAoc3RhcnRBcHBPcHRpb25zLCBhcGlMZXZlbCkge1xyXG4gIGxldCBjbWQgPSBbJ2FtJywgJ3N0YXJ0JywgJy1XJywgJy1uJywgYCR7c3RhcnRBcHBPcHRpb25zLnBrZ30vJHtzdGFydEFwcE9wdGlvbnMuYWN0aXZpdHl9YF07XHJcbiAgaWYgKHN0YXJ0QXBwT3B0aW9ucy5zdG9wQXBwICYmIGFwaUxldmVsID49IDE1KSB7XHJcbiAgICBjbWQucHVzaCgnLVMnKTtcclxuICB9XHJcbiAgaWYgKHN0YXJ0QXBwT3B0aW9ucy5hY3Rpb24pIHtcclxuICAgIGNtZC5wdXNoKCctYScsIHN0YXJ0QXBwT3B0aW9ucy5hY3Rpb24pO1xyXG4gIH1cclxuICBpZiAoc3RhcnRBcHBPcHRpb25zLmNhdGVnb3J5KSB7XHJcbiAgICBjbWQucHVzaCgnLWMnLCBzdGFydEFwcE9wdGlvbnMuY2F0ZWdvcnkpO1xyXG4gIH1cclxuICBpZiAoc3RhcnRBcHBPcHRpb25zLmZsYWdzKSB7XHJcbiAgICBjbWQucHVzaCgnLWYnLCBzdGFydEFwcE9wdGlvbnMuZmxhZ3MpO1xyXG4gIH1cclxuICBpZiAoc3RhcnRBcHBPcHRpb25zLm9wdGlvbmFsSW50ZW50QXJndW1lbnRzKSB7XHJcbiAgICAvLyBleHBlY3Qgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMgdG8gYmUgYSBzaW5nbGUgc3RyaW5nIG9mIHRoZSBmb3JtOlxyXG4gICAgLy8gICAgIFwiLWZsYWcga2V5XCJcclxuICAgIC8vICAgICBcIi1mbGFnIGtleSB2YWx1ZVwiXHJcbiAgICAvLyBvciBhIGNvbWJpbmF0aW9uIG9mIHRoZXNlIChlLmcuLCBcIi1mbGFnMSBrZXkxIC1mbGFnMiBrZXkyIHZhbHVlMlwiKVxyXG5cclxuICAgIC8vIHRha2UgYSBzdHJpbmcgYW5kIHBhcnNlIG91dCB0aGUgcGFydCBiZWZvcmUgYW55IHNwYWNlcywgYW5kIGFueXRoaW5nIGFmdGVyXHJcbiAgICAvLyB0aGUgZmlyc3Qgc3BhY2VcclxuICAgIGxldCBwYXJzZUtleVZhbHVlID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICBzdHIgPSBzdHIudHJpbSgpO1xyXG4gICAgICBsZXQgc3BhY2UgPSBzdHIuaW5kZXhPZignICcpO1xyXG4gICAgICBpZiAoc3BhY2UgPT09IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5sZW5ndGggPyBbc3RyXSA6IFtdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBbc3RyLnN1YnN0cmluZygwLCBzcGFjZSkudHJpbSgpLCBzdHIuc3Vic3RyaW5nKHNwYWNlICsgMSkudHJpbSgpXTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBjeWNsZSB0aHJvdWdoIHRoZSBvcHRpb25hbEludGVudEFyZ3VtZW50cyBhbmQgcHVsbCBvdXQgdGhlIGFyZ3VtZW50c1xyXG4gICAgLy8gYWRkIGEgc3BhY2UgaW5pdGlhbGx5IHNvIGZsYWdzIGNhbiBiZSBkaXN0aW5ndWlzaGVkIGZyb20gYXJndW1lbnRzIHRoYXRcclxuICAgIC8vIGhhdmUgaW50ZXJuYWwgaHlwaGVuc1xyXG4gICAgbGV0IG9wdGlvbmFsSW50ZW50QXJndW1lbnRzID0gYCAke3N0YXJ0QXBwT3B0aW9ucy5vcHRpb25hbEludGVudEFyZ3VtZW50c31gO1xyXG4gICAgbGV0IHJlID0gLyAoLVteXFxzXSspICguKykvO1xyXG4gICAgd2hpbGUgKHRydWUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cclxuICAgICAgbGV0IGFyZ3MgPSByZS5leGVjKG9wdGlvbmFsSW50ZW50QXJndW1lbnRzKTtcclxuICAgICAgaWYgKCFhcmdzKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbmFsSW50ZW50QXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgLy8gbm8gbW9yZSBmbGFncywgc28gdGhlIHJlbWFpbmRlciBjYW4gYmUgdHJlYXRlZCBhcyAna2V5JyBvciAna2V5IHZhbHVlJ1xyXG4gICAgICAgICAgY21kLnB1c2guYXBwbHkoY21kLCBwYXJzZUtleVZhbHVlKG9wdGlvbmFsSW50ZW50QXJndW1lbnRzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHdlIGFyZSBkb25lXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHRha2UgdGhlIGZsYWcgYW5kIHNlZSBpZiBpdCBpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcclxuICAgICAgLy8gaWYgaXQgaXMgbm90LCB0aGVuIGl0IG1lYW5zIHdlIGhhdmUgYmVlbiB0aHJvdWdoIGFscmVhZHksIGFuZFxyXG4gICAgICAvLyB3aGF0IGlzIGJlZm9yZSB0aGUgZmxhZyBpcyB0aGUgYXJndW1lbnQgZm9yIHRoZSBwcmV2aW91cyBmbGFnXHJcbiAgICAgIGxldCBmbGFnID0gYXJnc1sxXTtcclxuICAgICAgbGV0IGZsYWdQb3MgPSBvcHRpb25hbEludGVudEFyZ3VtZW50cy5pbmRleE9mKGZsYWcpO1xyXG4gICAgICBpZiAoZmxhZ1BvcyAhPT0gMCkge1xyXG4gICAgICAgIGxldCBwcmV2QXJncyA9IG9wdGlvbmFsSW50ZW50QXJndW1lbnRzLnN1YnN0cmluZygwLCBmbGFnUG9zKTtcclxuICAgICAgICBjbWQucHVzaC5hcHBseShjbWQsIHBhcnNlS2V5VmFsdWUocHJldkFyZ3MpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gYWRkIHRoZSBmbGFnLCBhcyB0aGVyZSBhcmUgbm8gbW9yZSBlYXJsaWVyIGFyZ3VtZW50c1xyXG4gICAgICBjbWQucHVzaChmbGFnKTtcclxuXHJcbiAgICAgIC8vIG1ha2Ugb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMgaG9sZCB0aGUgcmVtYWluZGVyXHJcbiAgICAgIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzID0gYXJnc1syXTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNtZDtcclxufVxyXG5cclxuY29uc3QgZ2V0U2RrVG9vbHNWZXJzaW9uID0gXy5tZW1vaXplKGFzeW5jIGZ1bmN0aW9uIGdldFNka1Rvb2xzVmVyc2lvbiAoKSB7XHJcbiAgY29uc3QgYW5kcm9pZEhvbWUgPSBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUU7XHJcbiAgaWYgKCFhbmRyb2lkSG9tZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coJ0FORFJPSURfSE9NRSBlbnZpcm9ubWVudCB2YXJpYmFsZSBpcyBleHBlY3RlZCB0byBiZSBzZXQnKTtcclxuICB9XHJcbiAgY29uc3QgcHJvcGVydGllc1BhdGggPSBwYXRoLnJlc29sdmUoYW5kcm9pZEhvbWUsICd0b29scycsICdzb3VyY2UucHJvcGVydGllcycpO1xyXG4gIGlmICghYXdhaXQgZnMuZXhpc3RzKHByb3BlcnRpZXNQYXRoKSkge1xyXG4gICAgbG9nLndhcm4oYENhbm5vdCBmaW5kICR7cHJvcGVydGllc1BhdGh9IGZpbGUgdG8gcmVhZCBTREsgdmVyc2lvbiBmcm9tYCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNvbnN0IHByb3BlcnRpZXNDb250ZW50ID0gYXdhaXQgZnMucmVhZEZpbGUocHJvcGVydGllc1BhdGgsICd1dGY4Jyk7XHJcbiAgY29uc3QgdmVyc2lvbk1hdGNoZXIgPSBuZXcgUmVnRXhwKC9Qa2dcXC5SZXZpc2lvbj0oXFxkKylcXC4/KFxcZCspP1xcLj8oXFxkKyk/Lyk7XHJcbiAgY29uc3QgbWF0Y2ggPSB2ZXJzaW9uTWF0Y2hlci5leGVjKHByb3BlcnRpZXNDb250ZW50KTtcclxuICBpZiAobWF0Y2gpIHtcclxuICAgIHJldHVybiB7bWFqb3I6IHBhcnNlSW50KG1hdGNoWzFdLCAxMCksXHJcbiAgICAgICAgICAgIG1pbm9yOiBtYXRjaFsyXSA/IHBhcnNlSW50KG1hdGNoWzJdLCAxMCkgOiAwLFxyXG4gICAgICAgICAgICBidWlsZDogbWF0Y2hbM10gPyBwYXJzZUludChtYXRjaFszXSwgMTApIDogMH07XHJcbiAgfVxyXG4gIGxvZy53YXJuKGBDYW5ub3QgcGFyc2UgXCJQa2cuUmV2aXNpb25cIiB2YWx1ZSBmcm9tICR7cHJvcGVydGllc1BhdGh9YCk7XHJcbn0pO1xyXG5cclxuZXhwb3J0IHsgZ2V0RGlyZWN0b3JpZXMsIGdldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGgsIHVuemlwRmlsZSwgYXNzZXJ0WmlwQXJjaGl2ZSxcclxuICAgICAgICAgZ2V0SU1FTGlzdEZyb21PdXRwdXQsIGdldEphdmFGb3JPcywgaXNTaG93aW5nTG9ja3NjcmVlbiwgaXNDdXJyZW50Rm9jdXNPbktleWd1YXJkLFxyXG4gICAgICAgICBnZXRTdXJmYWNlT3JpZW50YXRpb24sIGlzU2NyZWVuT25GdWxseSwgYnVpbGRTdGFydENtZCwgZ2V0SmF2YUhvbWUsXHJcbiAgICAgICAgIHJvb3REaXIsIGFuZHJvaWRQbGF0Zm9ybXMsIGdldFNka1Rvb2xzVmVyc2lvbiwgZ2V0QXBrc2lnbmVyRm9yT3MgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi4ifQ==
