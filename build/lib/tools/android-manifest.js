'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _helpersJs = require('../helpers.js');

var _appiumSupport = require('appium-support');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var helperJarPath = _path2['default'].resolve(__dirname, '..', '..', '..', 'jars');
var manifestMethods = {};

// android:process= may be defined in AndroidManifest.xml
// http://developer.android.com/reference/android/R.attr.html#process
// note that the process name when used with ps must be truncated to the last 15 chars
// ps -c com.example.android.apis becomes ps -c le.android.apis
manifestMethods.processFromManifest = function callee$0$0(localApk) {
  var args, _ref, stdout, result, lines, applicationRegex, applicationFound, attributeRegex, processRegex, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, notAttribute, _process;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        _loggerJs2['default'].info("Retrieving process from manifest");
        args = ['dump', 'xmltree', localApk, 'AndroidManifest.xml'];
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 7:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        result = null;
        lines = stdout.split("\n");
        applicationRegex = new RegExp(/\s+E: application \(line=\d+\).*/);
        applicationFound = false;
        attributeRegex = new RegExp(/\s+A: .+/);
        processRegex = new RegExp(/\s+A: android:process\(0x01010011\)="([^"]+).*"/);
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 18;
        _iterator = _getIterator(lines);

      case 20:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 37;
          break;
        }

        line = _step.value;

        if (applicationFound) {
          context$1$0.next = 26;
          break;
        }

        if (applicationRegex.test(line)) {
          applicationFound = true;
        }
        context$1$0.next = 34;
        break;

      case 26:
        notAttribute = !attributeRegex.test(line);

        if (!notAttribute) {
          context$1$0.next = 29;
          break;
        }

        return context$1$0.abrupt('break', 37);

      case 29:
        _process = processRegex.exec(line);

        if (!(_process && _process.length > 1)) {
          context$1$0.next = 34;
          break;
        }

        result = _process[1];
        // must trim to last 15 for android's ps binary
        if (result.length > 15) {
          result = result.substr(result.length - 15);
        }
        return context$1$0.abrupt('break', 37);

      case 34:
        _iteratorNormalCompletion = true;
        context$1$0.next = 20;
        break;

      case 37:
        context$1$0.next = 43;
        break;

      case 39:
        context$1$0.prev = 39;
        context$1$0.t0 = context$1$0['catch'](18);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 43:
        context$1$0.prev = 43;
        context$1$0.prev = 44;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 46:
        context$1$0.prev = 46;

        if (!_didIteratorError) {
          context$1$0.next = 49;
          break;
        }

        throw _iteratorError;

      case 49:
        return context$1$0.finish(46);

      case 50:
        return context$1$0.finish(43);

      case 51:
        return context$1$0.abrupt('return', result);

      case 54:
        context$1$0.prev = 54;
        context$1$0.t1 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('processFromManifest failed. Original error: ' + context$1$0.t1.message);

      case 57:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 54], [18, 39, 43, 51], [44,, 46, 50]]);
};

/**
 * @typedef {Object} APKInfo
 * @property {string} apkPackage - The name of application package, for example 'com.acme.app'.
 * @property {string} apkActivity - The name of main application activity.
 */

/**
 * Extract package and main activity name from application manifest.
 *
 * @param {string} localApk - The full path to application package.
 * @return {APKInfo} The parsed application info.
 * @throws {error} If there was an error while getting the data from the given
 *                 application package.
 */
manifestMethods.packageAndLaunchActivityFromManifest = function callee$0$0(localApk) {
  var args, _ref2, stdout, apkPackage, apkActivity, outputPath, getLaunchActivity, _ref3, _stdout, stderr, act;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        _loggerJs2['default'].info("Extracting package and launch activity from manifest");
        args = ['dump', 'badging', localApk];
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 7:
        _ref2 = context$1$0.sent;
        stdout = _ref2.stdout;
        apkPackage = new RegExp(/package: name='([^']+)'/g).exec(stdout);

        if (apkPackage && apkPackage.length >= 2) {
          apkPackage = apkPackage[1];
        } else {
          _loggerJs2['default'].errorAndThrow('Cannot parse package name from ' + ('\'' + _lodash2['default'].join([this.binaries.aapt, 'dump', 'badging', '"' + localApk + '"'], ' ') + '\' command  output'));
        }
        apkActivity = new RegExp(/launchable-activity: name='([^']+)'/g).exec(stdout);

        if (!(apkActivity && apkActivity.length >= 2)) {
          context$1$0.next = 16;
          break;
        }

        apkActivity = apkActivity[1];
        context$1$0.next = 26;
        break;

      case 16:
        outputPath = _path2['default'].resolve(this.tmpDir, apkPackage);
        getLaunchActivity = ['-jar', this.jars['appium_apk_tools.jar'], 'printLaunchActivity', localApk, outputPath];
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', getLaunchActivity));

      case 20:
        _ref3 = context$1$0.sent;
        _stdout = _ref3.stdout;
        stderr = _ref3.stderr;

        if (stderr) {
          _loggerJs2['default'].errorAndThrow('Cannot parse launchActivity from manifest: ' + stderr);
        }
        act = new RegExp(/Launch activity parsed:([^']+)/g).exec(_stdout);

        if (act && act.length >= 2) {
          apkActivity = act[1];
        }

      case 26:
        _loggerJs2['default'].debug('badging package: ' + apkPackage);
        _loggerJs2['default'].debug('badging act: ' + apkActivity);
        return context$1$0.abrupt('return', { apkPackage: apkPackage, apkActivity: apkActivity });

      case 31:
        context$1$0.prev = 31;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('packageAndLaunchActivityFromManifest failed. Original error: ' + context$1$0.t0.message + (context$1$0.t0.stderr ? '; StdErr: ' + context$1$0.t0.stderr : ''));

      case 34:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 31]]);
};

/**
 * Extract target SDK version from application manifest.
 *
 * @param {string} localApk - The full path to application package.
 * @return {number} The version of the target SDK.
 * @throws {error} If there was an error while getting the data from the given
 *                 application package.
 */
manifestMethods.targetSdkVersionFromManifest = function callee$0$0(localApk) {
  var args, _ref4, stdout, targetSdkVersion;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        _loggerJs2['default'].info("Extracting package and launch activity from manifest");
        args = ['dump', 'badging', localApk];
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 7:
        _ref4 = context$1$0.sent;
        stdout = _ref4.stdout;
        targetSdkVersion = new RegExp(/targetSdkVersion:'([^']+)'/g).exec(stdout);

        if (targetSdkVersion) {
          context$1$0.next = 12;
          break;
        }

        throw new Error('targetSdkVersion is not specified in the application.');

      case 12:
        return context$1$0.abrupt('return', parseInt(targetSdkVersion[1], 10));

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('fetching targetSdkVersion from local APK failed. Original error: ' + context$1$0.t0.message);

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 15]]);
};

/**
 * Extract target SDK version from package information.
 *
 * @param {string} pkg - The class name of the package installed on the device under test.
 * @return {number} The version of the target SDK.
 */
manifestMethods.targetSdkVersionUsingPKG = function callee$0$0(pkg) {
  var stdout, targetSdkVersion;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.shell(['dumpsys', 'package', pkg]));

      case 2:
        stdout = context$1$0.sent;
        targetSdkVersion = new RegExp(/targetSdk=([^\s\s]+)/g).exec(stdout);

        if (targetSdkVersion && targetSdkVersion.length >= 2) {
          targetSdkVersion = targetSdkVersion[1];
        } else {
          // targetSdk not found in the dump, assigning 0 to targetSdkVersion
          targetSdkVersion = 0;
        }
        return context$1$0.abrupt('return', parseInt(targetSdkVersion, 10));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

manifestMethods.compileManifest = function callee$0$0(manifest, manifestPackage, targetPackage) {
  var _ref5, platform, platformPath, args;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Compiling manifest ' + manifest);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _helpersJs.getAndroidPlatformAndPath)());

      case 3:
        _ref5 = context$1$0.sent;
        platform = _ref5.platform;
        platformPath = _ref5.platformPath;

        if (platform) {
          context$1$0.next = 8;
          break;
        }

        throw new Error("Required platform doesn't exist (API level >= 17)");

      case 8:
        _loggerJs2['default'].debug('Compiling manifest.');
        context$1$0.prev = 9;
        args = ['package', '-M', manifest, '--rename-manifest-package', manifestPackage, '--rename-instrumentation-target-package', targetPackage, '-I', _path2['default'].resolve(platformPath, 'android.jar'), '-F', manifest + '.apk', '-f'];
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, args));

      case 13:
        _loggerJs2['default'].debug("Compiled manifest");
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](9);

        _loggerJs2['default'].errorAndThrow('Error compiling manifest. Original error: ' + context$1$0.t0.message);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 16]]);
};

manifestMethods.insertManifest = function callee$0$0(manifest, srcApk, dstApk) {
  var java, args;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Inserting manifest, src: ' + srcApk + ' dst: ' + dstApk);
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _helpersJs.unzipFile)(manifest + '.apk'));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.copyFile(srcApk, dstApk));

      case 6:
        _loggerJs2['default'].debug("Testing new tmp apk");
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap((0, _helpersJs.assertZipArchive)(dstApk));

      case 9:
        _loggerJs2['default'].debug("Moving manifest");

        if (!_appiumSupport.system.isWindows()) {
          context$1$0.next = 17;
          break;
        }

        java = _path2['default'].resolve(process.env.JAVA_HOME, 'bin', 'java');
        args = ['-jar', _path2['default'].resolve(helperJarPath, 'move_manifest.jar'), dstApk, manifest];
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(java, args));

      case 15:
        context$1$0.next = 19;
        break;

      case 17:
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('zip', ['-j', '-m', dstApk, manifest]));

      case 19:
        _loggerJs2['default'].debug("Inserted manifest.");
        context$1$0.next = 25;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('Error inserting manifest. Original error: ' + context$1$0.t0.message);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 22]]);
};

/**
 * Check whether package manifest contains Internet permissions.
 *
 * @param {string} localApk - The full path to application package.
 * @return {boolean} True if the manifest requires Internet access permission.
 */
manifestMethods.hasInternetPermissionFromManifest = function callee$0$0(localApk) {
  var _ref6, stdout;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initAapt());

      case 3:
        _loggerJs2['default'].debug("Checking if has internet permission from manifest");
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.aapt, ['dump', 'badging', localApk]));

      case 6:
        _ref6 = context$1$0.sent;
        stdout = _ref6.stdout;
        return context$1$0.abrupt('return', new RegExp(/uses-permission:.*'android.permission.INTERNET'/).test(stdout));

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](0);

        _loggerJs2['default'].errorAndThrow('Error checking internet permission for manifest. Original error: ' + context$1$0.t0.message);

      case 14:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 11]]);
};

exports['default'] = manifestMethods;
module.exports = exports['default'];

// process must be an attribute after application.

// this is an application attribute process.

// Insert compiled manifest into /tmp/appPackage.clean.apk
// -j = keep only the file, not the dirs
// -m = move manifest into target apk.
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hbmRyb2lkLW1hbmlmZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs0QkFBcUIsY0FBYzs7d0JBQ25CLGNBQWM7Ozs7eUJBQ3lDLGVBQWU7OzZCQUMzRCxnQkFBZ0I7O3NCQUM3QixRQUFROzs7O29CQUNMLE1BQU07Ozs7QUFFdkIsSUFBTSxhQUFhLEdBQUcsa0JBQUssT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4RSxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7Ozs7OztBQU16QixlQUFlLENBQUMsbUJBQW1CLEdBQUcsb0JBQWdCLFFBQVE7TUFJdEQsSUFBSSxRQUNILE1BQU0sRUFDUCxNQUFNLEVBQ04sS0FBSyxFQUNMLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLFlBQVksa0ZBQ1AsSUFBSSxFQU1MLFlBQVksRUFLWixRQUFPOzs7Ozs7O3lDQXJCVCxJQUFJLENBQUMsUUFBUSxFQUFFOzs7QUFDckIsOEJBQUksSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDekMsWUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLENBQUM7O3lDQUMxQyx3QkFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7QUFBOUMsY0FBTSxRQUFOLE1BQU07QUFDUCxjQUFNLEdBQUcsSUFBSTtBQUNiLGFBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUMxQix3QkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQztBQUNqRSx3QkFBZ0IsR0FBRyxLQUFLO0FBQ3hCLHNCQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3ZDLG9CQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsaURBQWlELENBQUM7Ozs7O2lDQUMvRCxLQUFLOzs7Ozs7OztBQUFiLFlBQUk7O1lBQ04sZ0JBQWdCOzs7OztBQUNuQixZQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMvQiwwQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDekI7Ozs7O0FBRUcsb0JBQVksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzthQUV6QyxZQUFZOzs7Ozs7OztBQUdaLGdCQUFPLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O2NBRWpDLFFBQU8sSUFBSSxRQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTs7Ozs7QUFDL0IsY0FBTSxHQUFHLFFBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFcEIsWUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRTtBQUN0QixnQkFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztTQUM1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0Q0FLQSxNQUFNOzs7Ozs7QUFFYiw4QkFBSSxhQUFhLGtEQUFnRCxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRWpGLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkYsZUFBZSxDQUFDLG9DQUFvQyxHQUFHLG9CQUFnQixRQUFRO01BSXZFLElBQUksU0FDSCxNQUFNLEVBQ1AsVUFBVSxFQU9WLFdBQVcsRUFJVCxVQUFVLEVBQ1YsaUJBQWlCLFNBR2hCLE9BQU0sRUFBRSxNQUFNLEVBSWYsR0FBRzs7Ozs7Ozt5Q0F2QkgsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O0FBQ3JCLDhCQUFJLElBQUksQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0FBQzdELFlBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDOzt5Q0FDbkIsd0JBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7O0FBQTlDLGNBQU0sU0FBTixNQUFNO0FBQ1Asa0JBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBQ3BFLFlBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ3hDLG9CQUFVLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCLE1BQU07QUFDTCxnQ0FBSSxhQUFhLENBQUMsNENBQ1osb0JBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyx3QkFBbUIsQ0FBQyxDQUFDO1NBQ3RHO0FBQ0csbUJBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O2NBQzdFLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQTs7Ozs7QUFDeEMsbUJBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0FBRXpCLGtCQUFVLEdBQUcsa0JBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO0FBQ2xELHlCQUFpQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFDekMscUJBQXFCLEVBQUUsUUFBUSxFQUMvQixVQUFVLENBQUM7O3lDQUNQLHdCQUFLLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQzs7OztBQUF2RCxlQUFNLFNBQU4sTUFBTTtBQUFFLGNBQU0sU0FBTixNQUFNOztBQUNuQixZQUFJLE1BQU0sRUFBRTtBQUNWLGdDQUFJLGFBQWEsaURBQStDLE1BQU0sQ0FBRyxDQUFDO1NBQzNFO0FBQ0csV0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU0sQ0FBQzs7QUFDcEUsWUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7QUFDMUIscUJBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7OztBQUVILDhCQUFJLEtBQUssdUJBQXFCLFVBQVUsQ0FBRyxDQUFDO0FBQzVDLDhCQUFJLEtBQUssbUJBQWlCLFdBQVcsQ0FBRyxDQUFDOzRDQUNsQyxFQUFDLFVBQVUsRUFBVixVQUFVLEVBQUUsV0FBVyxFQUFYLFdBQVcsRUFBQzs7Ozs7O0FBRWhDLDhCQUFJLGFBQWEsQ0FBQyxrRUFBZ0UsZUFBRSxPQUFPLElBQ3hFLGVBQUUsTUFBTSxrQkFBZ0IsZUFBRSxNQUFNLEdBQUssRUFBRSxDQUFBLEFBQUMsQ0FBQyxDQUFDOzs7Ozs7O0NBRWhFLENBQUM7Ozs7Ozs7Ozs7QUFVRixlQUFlLENBQUMsNEJBQTRCLEdBQUcsb0JBQWdCLFFBQVE7TUFJL0QsSUFBSSxTQUNILE1BQU0sRUFDUCxnQkFBZ0I7Ozs7Ozs7eUNBSmQsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O0FBQ3JCLDhCQUFJLElBQUksQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO0FBQzdELFlBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDOzt5Q0FDbkIsd0JBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7O0FBQTlDLGNBQU0sU0FBTixNQUFNO0FBQ1Asd0JBQWdCLEdBQUcsSUFBSSxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztZQUN4RSxnQkFBZ0I7Ozs7O2NBQ2IsSUFBSSxLQUFLLHlEQUF5RDs7OzRDQUVuRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDOzs7Ozs7QUFFeEMsOEJBQUksYUFBYSx1RUFBcUUsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUV0RyxDQUFDOzs7Ozs7OztBQVFGLGVBQWUsQ0FBQyx3QkFBd0IsR0FBRyxvQkFBZ0IsR0FBRztNQUN4RCxNQUFNLEVBQ04sZ0JBQWdCOzs7Ozt5Q0FEQSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0FBQXZELGNBQU07QUFDTix3QkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBQ3ZFLFlBQUksZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUNwRCwwQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4QyxNQUFNOztBQUVMLDBCQUFnQixHQUFHLENBQUMsQ0FBQztTQUN0Qjs0Q0FDTSxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDOzs7Ozs7O0NBQ3RDLENBQUM7O0FBRUYsZUFBZSxDQUFDLGVBQWUsR0FBRyxvQkFBZ0IsUUFBUSxFQUFFLGVBQWUsRUFBRSxhQUFhO2FBRW5GLFFBQVEsRUFBRSxZQUFZLEVBTXJCLElBQUk7Ozs7O0FBUFYsOEJBQUksS0FBSyx5QkFBdUIsUUFBUSxDQUFHLENBQUM7O3lDQUNQLDJDQUEyQjs7OztBQUEzRCxnQkFBUSxTQUFSLFFBQVE7QUFBRSxvQkFBWSxTQUFaLFlBQVk7O1lBQ3RCLFFBQVE7Ozs7O2NBQ0wsSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUM7OztBQUV0RSw4QkFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzs7QUFFM0IsWUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsMkJBQTJCLEVBQ3RELGVBQWUsRUFBRSx5Q0FBeUMsRUFDMUQsYUFBYSxFQUFFLElBQUksRUFBRSxrQkFBSyxPQUFPLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxFQUM5RCxJQUFJLEVBQUUsUUFBUSxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUM7O3lDQUNwQyx3QkFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7OztBQUNwQyw4QkFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7Ozs7Ozs7QUFFL0IsOEJBQUksYUFBYSxnREFBOEMsZUFBSSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUVqRixDQUFDOztBQUVGLGVBQWUsQ0FBQyxjQUFjLEdBQUcsb0JBQWdCLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTTtNQVMvRCxJQUFJLEVBQ0osSUFBSTs7OztBQVRaLDhCQUFJLEtBQUssK0JBQTZCLE1BQU0sY0FBUyxNQUFNLENBQUcsQ0FBQzs7O3lDQUV2RCwwQkFBYSxRQUFRLFVBQU87Ozs7eUNBQzVCLGtCQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOzs7QUFDakMsOEJBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7O3lDQUMzQixpQ0FBaUIsTUFBTSxDQUFDOzs7QUFDOUIsOEJBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7O2FBQ3pCLHNCQUFPLFNBQVMsRUFBRTs7Ozs7QUFDaEIsWUFBSSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO0FBQ3pELFlBQUksR0FBRyxDQUFDLE1BQU0sRUFBRyxrQkFBSyxPQUFPLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLEVBQ3pELE1BQU0sRUFBRSxRQUFRLENBQUM7O3lDQUN2Qix3QkFBSyxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7Ozs7Ozt5Q0FLaEIsd0JBQUssS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7OztBQUVuRCw4QkFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7Ozs7Ozs7QUFFaEMsOEJBQUksYUFBYSxnREFBOEMsZUFBRSxPQUFPLENBQUcsQ0FBQzs7Ozs7OztDQUUvRSxDQUFDOzs7Ozs7OztBQVFGLGVBQWUsQ0FBQyxpQ0FBaUMsR0FBRyxvQkFBZ0IsUUFBUTthQUluRSxNQUFNOzs7Ozs7O3lDQUZMLElBQUksQ0FBQyxRQUFRLEVBQUU7OztBQUNyQiw4QkFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQzs7eUNBQzFDLHdCQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzs7OztBQUF2RSxjQUFNLFNBQU4sTUFBTTs0Q0FDSixJQUFJLE1BQU0sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7OztBQUVqRiw4QkFBSSxhQUFhLHVFQUFxRSxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7Ozs7O0NBRXRHLENBQUM7O3FCQUdhLGVBQWUiLCJmaWxlIjoibGliL3Rvb2xzL2FuZHJvaWQtbWFuaWZlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcclxuaW1wb3J0IGxvZyBmcm9tICcuLi9sb2dnZXIuanMnO1xyXG5pbXBvcnQgeyBnZXRBbmRyb2lkUGxhdGZvcm1BbmRQYXRoLCB1bnppcEZpbGUsIGFzc2VydFppcEFyY2hpdmUgfSBmcm9tICcuLi9oZWxwZXJzLmpzJztcclxuaW1wb3J0IHsgc3lzdGVtLCBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5jb25zdCBoZWxwZXJKYXJQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJy4uJywgJ2phcnMnKTtcclxubGV0IG1hbmlmZXN0TWV0aG9kcyA9IHt9O1xyXG5cclxuLy8gYW5kcm9pZDpwcm9jZXNzPSBtYXkgYmUgZGVmaW5lZCBpbiBBbmRyb2lkTWFuaWZlc3QueG1sXHJcbi8vIGh0dHA6Ly9kZXZlbG9wZXIuYW5kcm9pZC5jb20vcmVmZXJlbmNlL2FuZHJvaWQvUi5hdHRyLmh0bWwjcHJvY2Vzc1xyXG4vLyBub3RlIHRoYXQgdGhlIHByb2Nlc3MgbmFtZSB3aGVuIHVzZWQgd2l0aCBwcyBtdXN0IGJlIHRydW5jYXRlZCB0byB0aGUgbGFzdCAxNSBjaGFyc1xyXG4vLyBwcyAtYyBjb20uZXhhbXBsZS5hbmRyb2lkLmFwaXMgYmVjb21lcyBwcyAtYyBsZS5hbmRyb2lkLmFwaXNcclxubWFuaWZlc3RNZXRob2RzLnByb2Nlc3NGcm9tTWFuaWZlc3QgPSBhc3luYyBmdW5jdGlvbiAobG9jYWxBcGspIHtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgdGhpcy5pbml0QWFwdCgpO1xyXG4gICAgbG9nLmluZm8oXCJSZXRyaWV2aW5nIHByb2Nlc3MgZnJvbSBtYW5pZmVzdFwiKTtcclxuICAgIGxldCBhcmdzID0gWydkdW1wJywgJ3htbHRyZWUnLCBsb2NhbEFwaywgJ0FuZHJvaWRNYW5pZmVzdC54bWwnXTtcclxuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWModGhpcy5iaW5hcmllcy5hYXB0LCBhcmdzKTtcclxuICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG4gICAgbGV0IGxpbmVzID0gc3Rkb3V0LnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgbGV0IGFwcGxpY2F0aW9uUmVnZXggPSBuZXcgUmVnRXhwKC9cXHMrRTogYXBwbGljYXRpb24gXFwobGluZT1cXGQrXFwpLiovKTtcclxuICAgIGxldCBhcHBsaWNhdGlvbkZvdW5kID0gZmFsc2U7XHJcbiAgICBsZXQgYXR0cmlidXRlUmVnZXggPSBuZXcgUmVnRXhwKC9cXHMrQTogLisvKTtcclxuICAgIGxldCBwcm9jZXNzUmVnZXggPSBuZXcgUmVnRXhwKC9cXHMrQTogYW5kcm9pZDpwcm9jZXNzXFwoMHgwMTAxMDAxMVxcKT1cIihbXlwiXSspLipcIi8pO1xyXG4gICAgZm9yIChsZXQgbGluZSBvZiBsaW5lcykge1xyXG4gICAgICBpZiAoIWFwcGxpY2F0aW9uRm91bmQpIHtcclxuICAgICAgICBpZiAoYXBwbGljYXRpb25SZWdleC50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICBhcHBsaWNhdGlvbkZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IG5vdEF0dHJpYnV0ZSA9ICFhdHRyaWJ1dGVSZWdleC50ZXN0KGxpbmUpO1xyXG4gICAgICAgIC8vIHByb2Nlc3MgbXVzdCBiZSBhbiBhdHRyaWJ1dGUgYWZ0ZXIgYXBwbGljYXRpb24uXHJcbiAgICAgICAgaWYgKG5vdEF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcm9jZXNzID0gcHJvY2Vzc1JlZ2V4LmV4ZWMobGluZSk7XHJcbiAgICAgICAgLy8gdGhpcyBpcyBhbiBhcHBsaWNhdGlvbiBhdHRyaWJ1dGUgcHJvY2Vzcy5cclxuICAgICAgICBpZiAocHJvY2VzcyAmJiBwcm9jZXNzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHByb2Nlc3NbMV07XHJcbiAgICAgICAgICAvLyBtdXN0IHRyaW0gdG8gbGFzdCAxNSBmb3IgYW5kcm9pZCdzIHBzIGJpbmFyeVxyXG4gICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxNSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuc3Vic3RyKHJlc3VsdC5sZW5ndGggLSAxNSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYHByb2Nlc3NGcm9tTWFuaWZlc3QgZmFpbGVkLiBPcmlnaW5hbCBlcnJvcjogJHtlLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEFQS0luZm9cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwa1BhY2thZ2UgLSBUaGUgbmFtZSBvZiBhcHBsaWNhdGlvbiBwYWNrYWdlLCBmb3IgZXhhbXBsZSAnY29tLmFjbWUuYXBwJy5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGFwa0FjdGl2aXR5IC0gVGhlIG5hbWUgb2YgbWFpbiBhcHBsaWNhdGlvbiBhY3Rpdml0eS5cclxuICovXHJcblxyXG4vKipcclxuICogRXh0cmFjdCBwYWNrYWdlIGFuZCBtYWluIGFjdGl2aXR5IG5hbWUgZnJvbSBhcHBsaWNhdGlvbiBtYW5pZmVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsQXBrIC0gVGhlIGZ1bGwgcGF0aCB0byBhcHBsaWNhdGlvbiBwYWNrYWdlLlxyXG4gKiBAcmV0dXJuIHtBUEtJbmZvfSBUaGUgcGFyc2VkIGFwcGxpY2F0aW9uIGluZm8uXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiB0aGVyZSB3YXMgYW4gZXJyb3Igd2hpbGUgZ2V0dGluZyB0aGUgZGF0YSBmcm9tIHRoZSBnaXZlblxyXG4gKiAgICAgICAgICAgICAgICAgYXBwbGljYXRpb24gcGFja2FnZS5cclxuICovXHJcbm1hbmlmZXN0TWV0aG9kcy5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QgPSBhc3luYyBmdW5jdGlvbiAobG9jYWxBcGspIHtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgdGhpcy5pbml0QWFwdCgpO1xyXG4gICAgbG9nLmluZm8oXCJFeHRyYWN0aW5nIHBhY2thZ2UgYW5kIGxhdW5jaCBhY3Rpdml0eSBmcm9tIG1hbmlmZXN0XCIpO1xyXG4gICAgbGV0IGFyZ3MgPSBbJ2R1bXAnLCAnYmFkZ2luZycsIGxvY2FsQXBrXTtcclxuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWModGhpcy5iaW5hcmllcy5hYXB0LCBhcmdzKTtcclxuICAgIGxldCBhcGtQYWNrYWdlID0gbmV3IFJlZ0V4cCgvcGFja2FnZTogbmFtZT0nKFteJ10rKScvZykuZXhlYyhzdGRvdXQpO1xyXG4gICAgaWYgKGFwa1BhY2thZ2UgJiYgYXBrUGFja2FnZS5sZW5ndGggPj0gMikge1xyXG4gICAgICBhcGtQYWNrYWdlID0gYXBrUGFja2FnZVsxXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGBDYW5ub3QgcGFyc2UgcGFja2FnZSBuYW1lIGZyb20gYCArXHJcbiAgICAgICAgYCcke18uam9pbihbdGhpcy5iaW5hcmllcy5hYXB0LCAnZHVtcCcsICdiYWRnaW5nJywgJ1wiJyArIGxvY2FsQXBrICsgJ1wiJ10sICcgJyl9JyBjb21tYW5kICBvdXRwdXRgKTtcclxuICAgIH1cclxuICAgIGxldCBhcGtBY3Rpdml0eSA9IG5ldyBSZWdFeHAoL2xhdW5jaGFibGUtYWN0aXZpdHk6IG5hbWU9JyhbXiddKyknL2cpLmV4ZWMoc3Rkb3V0KTtcclxuICAgIGlmIChhcGtBY3Rpdml0eSAmJiBhcGtBY3Rpdml0eS5sZW5ndGggPj0gMikge1xyXG4gICAgICBhcGtBY3Rpdml0eSA9IGFwa0FjdGl2aXR5WzFdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IG91dHB1dFBhdGggPSBwYXRoLnJlc29sdmUodGhpcy50bXBEaXIsIGFwa1BhY2thZ2UpO1xyXG4gICAgICBsZXQgZ2V0TGF1bmNoQWN0aXZpdHkgPSBbJy1qYXInLCB0aGlzLmphcnNbJ2FwcGl1bV9hcGtfdG9vbHMuamFyJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHJpbnRMYXVuY2hBY3Rpdml0eScsIGxvY2FsQXBrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0UGF0aF07XHJcbiAgICAgIGxldCB7c3Rkb3V0LCBzdGRlcnJ9ID0gYXdhaXQgZXhlYygnamF2YScsIGdldExhdW5jaEFjdGl2aXR5KTtcclxuICAgICAgaWYgKHN0ZGVycikge1xyXG4gICAgICAgIGxvZy5lcnJvckFuZFRocm93KGBDYW5ub3QgcGFyc2UgbGF1bmNoQWN0aXZpdHkgZnJvbSBtYW5pZmVzdDogJHtzdGRlcnJ9YCk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IGFjdCA9IG5ldyBSZWdFeHAoL0xhdW5jaCBhY3Rpdml0eSBwYXJzZWQ6KFteJ10rKS9nKS5leGVjKHN0ZG91dCk7XHJcbiAgICAgIGlmIChhY3QgJiYgYWN0Lmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgYXBrQWN0aXZpdHkgPSBhY3RbMV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxvZy5kZWJ1ZyhgYmFkZ2luZyBwYWNrYWdlOiAke2Fwa1BhY2thZ2V9YCk7XHJcbiAgICBsb2cuZGVidWcoYGJhZGdpbmcgYWN0OiAke2Fwa0FjdGl2aXR5fWApO1xyXG4gICAgcmV0dXJuIHthcGtQYWNrYWdlLCBhcGtBY3Rpdml0eX07XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYHBhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCBmYWlsZWQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gICtcclxuICAgICAgICAgICAgICAgICAgICAgIChlLnN0ZGVyciA/IGA7IFN0ZEVycjogJHtlLnN0ZGVycn1gIDogJycpKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogRXh0cmFjdCB0YXJnZXQgU0RLIHZlcnNpb24gZnJvbSBhcHBsaWNhdGlvbiBtYW5pZmVzdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2FsQXBrIC0gVGhlIGZ1bGwgcGF0aCB0byBhcHBsaWNhdGlvbiBwYWNrYWdlLlxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSB2ZXJzaW9uIG9mIHRoZSB0YXJnZXQgU0RLLlxyXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgdGhlcmUgd2FzIGFuIGVycm9yIHdoaWxlIGdldHRpbmcgdGhlIGRhdGEgZnJvbSB0aGUgZ2l2ZW5cclxuICogICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uIHBhY2thZ2UuXHJcbiAqL1xyXG5tYW5pZmVzdE1ldGhvZHMudGFyZ2V0U2RrVmVyc2lvbkZyb21NYW5pZmVzdCA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhbEFwaykge1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCB0aGlzLmluaXRBYXB0KCk7XHJcbiAgICBsb2cuaW5mbyhcIkV4dHJhY3RpbmcgcGFja2FnZSBhbmQgbGF1bmNoIGFjdGl2aXR5IGZyb20gbWFuaWZlc3RcIik7XHJcbiAgICBsZXQgYXJncyA9IFsnZHVtcCcsICdiYWRnaW5nJywgbG9jYWxBcGtdO1xyXG4gICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmJpbmFyaWVzLmFhcHQsIGFyZ3MpO1xyXG4gICAgbGV0IHRhcmdldFNka1ZlcnNpb24gPSBuZXcgUmVnRXhwKC90YXJnZXRTZGtWZXJzaW9uOicoW14nXSspJy9nKS5leGVjKHN0ZG91dCk7XHJcbiAgICBpZiAoIXRhcmdldFNka1ZlcnNpb24pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0YXJnZXRTZGtWZXJzaW9uIGlzIG5vdCBzcGVjaWZpZWQgaW4gdGhlIGFwcGxpY2F0aW9uLmApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhcnNlSW50KHRhcmdldFNka1ZlcnNpb25bMV0sIDEwKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgZmV0Y2hpbmcgdGFyZ2V0U2RrVmVyc2lvbiBmcm9tIGxvY2FsIEFQSyBmYWlsZWQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogRXh0cmFjdCB0YXJnZXQgU0RLIHZlcnNpb24gZnJvbSBwYWNrYWdlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGtnIC0gVGhlIGNsYXNzIG5hbWUgb2YgdGhlIHBhY2thZ2UgaW5zdGFsbGVkIG9uIHRoZSBkZXZpY2UgdW5kZXIgdGVzdC5cclxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmVyc2lvbiBvZiB0aGUgdGFyZ2V0IFNESy5cclxuICovXHJcbm1hbmlmZXN0TWV0aG9kcy50YXJnZXRTZGtWZXJzaW9uVXNpbmdQS0cgPSBhc3luYyBmdW5jdGlvbiAocGtnKSB7XHJcbiAgbGV0IHN0ZG91dCA9ICBhd2FpdCB0aGlzLnNoZWxsKFsnZHVtcHN5cycsICdwYWNrYWdlJywgcGtnXSk7XHJcbiAgbGV0IHRhcmdldFNka1ZlcnNpb24gPSBuZXcgUmVnRXhwKC90YXJnZXRTZGs9KFteXFxzXFxzXSspL2cpLmV4ZWMoc3Rkb3V0KTtcclxuICBpZiAodGFyZ2V0U2RrVmVyc2lvbiAmJiB0YXJnZXRTZGtWZXJzaW9uLmxlbmd0aCA+PSAyKSB7XHJcbiAgICB0YXJnZXRTZGtWZXJzaW9uID0gdGFyZ2V0U2RrVmVyc2lvblsxXTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gdGFyZ2V0U2RrIG5vdCBmb3VuZCBpbiB0aGUgZHVtcCwgYXNzaWduaW5nIDAgdG8gdGFyZ2V0U2RrVmVyc2lvblxyXG4gICAgdGFyZ2V0U2RrVmVyc2lvbiA9IDA7XHJcbiAgfVxyXG4gIHJldHVybiBwYXJzZUludCh0YXJnZXRTZGtWZXJzaW9uLCAxMCk7XHJcbn07XHJcblxyXG5tYW5pZmVzdE1ldGhvZHMuY29tcGlsZU1hbmlmZXN0ID0gYXN5bmMgZnVuY3Rpb24gKG1hbmlmZXN0LCBtYW5pZmVzdFBhY2thZ2UsIHRhcmdldFBhY2thZ2UpIHtcclxuICBsb2cuZGVidWcoYENvbXBpbGluZyBtYW5pZmVzdCAke21hbmlmZXN0fWApO1xyXG4gIGxldCB7cGxhdGZvcm0sIHBsYXRmb3JtUGF0aH0gPSBhd2FpdCBnZXRBbmRyb2lkUGxhdGZvcm1BbmRQYXRoKCk7XHJcbiAgaWYgKCFwbGF0Zm9ybSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUmVxdWlyZWQgcGxhdGZvcm0gZG9lc24ndCBleGlzdCAoQVBJIGxldmVsID49IDE3KVwiKTtcclxuICB9XHJcbiAgbG9nLmRlYnVnKCdDb21waWxpbmcgbWFuaWZlc3QuJyk7XHJcbiAgdHJ5IHtcclxuICAgIGxldCBhcmdzID0gWydwYWNrYWdlJywgJy1NJywgbWFuaWZlc3QsICctLXJlbmFtZS1tYW5pZmVzdC1wYWNrYWdlJyxcclxuICAgICAgICAgICAgICAgIG1hbmlmZXN0UGFja2FnZSwgJy0tcmVuYW1lLWluc3RydW1lbnRhdGlvbi10YXJnZXQtcGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQYWNrYWdlLCAnLUknLCBwYXRoLnJlc29sdmUocGxhdGZvcm1QYXRoLCAnYW5kcm9pZC5qYXInKSxcclxuICAgICAgICAgICAgICAgICctRicsIG1hbmlmZXN0ICsgJy5hcGsnLCAnLWYnXTtcclxuICAgIGF3YWl0IGV4ZWModGhpcy5iaW5hcmllcy5hYXB0LCBhcmdzKTtcclxuICAgIGxvZy5kZWJ1ZyhcIkNvbXBpbGVkIG1hbmlmZXN0XCIpO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEVycm9yIGNvbXBpbGluZyBtYW5pZmVzdC4gT3JpZ2luYWwgZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxubWFuaWZlc3RNZXRob2RzLmluc2VydE1hbmlmZXN0ID0gYXN5bmMgZnVuY3Rpb24gKG1hbmlmZXN0LCBzcmNBcGssIGRzdEFwaykge1xyXG4gIGxvZy5kZWJ1ZyhgSW5zZXJ0aW5nIG1hbmlmZXN0LCBzcmM6ICR7c3JjQXBrfSBkc3Q6ICR7ZHN0QXBrfWApO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCB1bnppcEZpbGUoYCR7bWFuaWZlc3R9LmFwa2ApO1xyXG4gICAgYXdhaXQgZnMuY29weUZpbGUoc3JjQXBrLCBkc3RBcGspO1xyXG4gICAgbG9nLmRlYnVnKFwiVGVzdGluZyBuZXcgdG1wIGFwa1wiKTtcclxuICAgIGF3YWl0IGFzc2VydFppcEFyY2hpdmUoZHN0QXBrKTtcclxuICAgIGxvZy5kZWJ1ZyhcIk1vdmluZyBtYW5pZmVzdFwiKTtcclxuICAgIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkpIHtcclxuICAgICAgbGV0IGphdmEgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5lbnYuSkFWQV9IT01FLCAnYmluJywgJ2phdmEnKTtcclxuICAgICAgbGV0IGFyZ3MgPSBbJy1qYXInLCAgcGF0aC5yZXNvbHZlKGhlbHBlckphclBhdGgsICdtb3ZlX21hbmlmZXN0LmphcicpLFxyXG4gICAgICAgICAgICAgICAgICBkc3RBcGssIG1hbmlmZXN0XTtcclxuICAgICAgYXdhaXQgZXhlYyhqYXZhLCBhcmdzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEluc2VydCBjb21waWxlZCBtYW5pZmVzdCBpbnRvIC90bXAvYXBwUGFja2FnZS5jbGVhbi5hcGtcclxuICAgICAgLy8gLWogPSBrZWVwIG9ubHkgdGhlIGZpbGUsIG5vdCB0aGUgZGlyc1xyXG4gICAgICAvLyAtbSA9IG1vdmUgbWFuaWZlc3QgaW50byB0YXJnZXQgYXBrLlxyXG4gICAgICBhd2FpdCBleGVjKCd6aXAnLCBbJy1qJywgJy1tJywgZHN0QXBrLCBtYW5pZmVzdF0pO1xyXG4gICAgfVxyXG4gICAgbG9nLmRlYnVnKFwiSW5zZXJ0ZWQgbWFuaWZlc3QuXCIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBFcnJvciBpbnNlcnRpbmcgbWFuaWZlc3QuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgd2hldGhlciBwYWNrYWdlIG1hbmlmZXN0IGNvbnRhaW5zIEludGVybmV0IHBlcm1pc3Npb25zLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxBcGsgLSBUaGUgZnVsbCBwYXRoIHRvIGFwcGxpY2F0aW9uIHBhY2thZ2UuXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG1hbmlmZXN0IHJlcXVpcmVzIEludGVybmV0IGFjY2VzcyBwZXJtaXNzaW9uLlxyXG4gKi9cclxubWFuaWZlc3RNZXRob2RzLmhhc0ludGVybmV0UGVybWlzc2lvbkZyb21NYW5pZmVzdCA9IGFzeW5jIGZ1bmN0aW9uIChsb2NhbEFwaykge1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCB0aGlzLmluaXRBYXB0KCk7XHJcbiAgICBsb2cuZGVidWcoXCJDaGVja2luZyBpZiBoYXMgaW50ZXJuZXQgcGVybWlzc2lvbiBmcm9tIG1hbmlmZXN0XCIpO1xyXG4gICAgbGV0IHtzdGRvdXR9ID0gYXdhaXQgZXhlYyh0aGlzLmJpbmFyaWVzLmFhcHQsIFsnZHVtcCcsICdiYWRnaW5nJywgbG9jYWxBcGtdKTtcclxuICAgIHJldHVybiBuZXcgUmVnRXhwKC91c2VzLXBlcm1pc3Npb246LionYW5kcm9pZC5wZXJtaXNzaW9uLklOVEVSTkVUJy8pLnRlc3Qoc3Rkb3V0KTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgRXJyb3IgY2hlY2tpbmcgaW50ZXJuZXQgcGVybWlzc2lvbiBmb3IgbWFuaWZlc3QuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFuaWZlc3RNZXRob2RzO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
