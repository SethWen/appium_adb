'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumSupport = require('appium-support');

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);
var should = _chai2['default'].should(),
    pkg = 'com.example.android.contactmanager',
    uri = 'content://contacts/people/1',
    act = '.ContactManager',
    startAppOptions = { stopApp: true, action: 'action', category: 'cat',
  flags: 'flags', pkg: 'pkg', activity: 'act',
  optionalIntentArguments: '-x options -y option argument -z option arg with spaces' },
    cmd = ['am', 'start', '-W', '-n', 'pkg/act', '-S', '-a', 'action', '-c', 'cat', '-f', 'flags', '-x', 'options', '-y', 'option', 'argument', '-z', 'option', 'arg with spaces'],
    language = 'en',
    country = 'US',
    locale = 'en-US';

describe('Apk-utils', function () {
  var adb = new _2['default']();
  describe('isAppInstalled', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should parse correctly and return true', function callee$2$0() {
      var pkg;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            pkg = 'dummy.package';

            mocks.adb.expects('shell').once().withExactArgs(['pm', 'list', 'packages', pkg]).returns('package:' + pkg);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(pkg));

          case 4:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should parse correctly and return false', function callee$2$0() {
      var pkg;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            pkg = 'dummy.package';

            mocks.adb.expects('shell').once().withExactArgs(['pm', 'list', 'packages', pkg]).returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(pkg));

          case 4:
            context$3$0.sent.should.be['false'];

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getFocusedPackageAndActivity', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should parse correctly and return package and activity', function callee$2$0() {
      var _ref, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/' + act + ' t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

          case 3:
            _ref = context$3$0.sent;
            appPackage = _ref.appPackage;
            appActivity = _ref.appActivity;

            appPackage.should.equal(pkg);
            appActivity.should.equal(act);
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should parse correctly and return package and activity when a comma is present', function callee$2$0() {
      var _ref2, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{20fe217e token=Token{21878739 ' + ('ActivityRecord{16425300 u0 ' + pkg + '/' + act + ', isShadow:false t10}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

          case 3:
            _ref2 = context$3$0.sent;
            appPackage = _ref2.appPackage;
            appActivity = _ref2.appActivity;

            appPackage.should.equal(pkg);
            appActivity.should.equal(act);
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should parse correctly and return null', function callee$2$0() {
      var _ref3, appPackage, appActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=null');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

          case 3:
            _ref3 = context$3$0.sent;
            appPackage = _ref3.appPackage;
            appActivity = _ref3.appActivity;

            should.not.exist(appPackage);
            should.not.exist(appActivity);
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('waitForActivityOrNot', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell once and should return', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/' + act + ' t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, act, false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell multiple times and return', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').onCall(0).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2c7c4318 u0 foo/bar t181}}}');
            mocks.adb.expects('shell').returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2c7c4318 u0 com.example.android.contactmanager/.ContactManager t181}}}');

            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, act, false));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell once return for not', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{c 0 foo/bar t181}}}');

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, act, true));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell multiple times and return for not', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').onCall(0).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/' + act + ' t181}}}'));
            mocks.adb.expects('shell').returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2c7c4318 u0 foo/bar t181}}}');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, act, true));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get first of a comma-separated list of activities', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.ContactManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '.ContactManager, .OtherManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get second of a comma-separated list of activities', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.OtherManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '.ContactManager, .OtherManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if no activity in a comma-separated list is available', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').atLeast(1).withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/' + act + ' t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '.SuperManager, .OtherManager', false, 1000).should.eventually.be.rejected);

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to match activities if waitActivity is a wildcard', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.ContactManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '*', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to match activities if waitActivity is shortened and contains a whildcard', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.ContactManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '.*Manager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to match activities if waitActivity contains a wildcard alternative to activity', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.ContactManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, pkg + '.*', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to match activities if waitActivity contains a wildcard on head', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.ContactManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '*.contactmanager.ContactManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to match activities if waitActivity contains a wildcard across a pkg name and an activity name', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.ContactManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, 'com.*Manager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to match activities if waitActivity contains wildcards in both a pkg name and an activity name', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.ContactManager t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, 'com.*.contactmanager.*Manager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if activity not to match from regexp activities', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').atLeast(1).withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2 u com.example.android.supermanager/.SuperManager t181}}}');

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot('com.example.android.supermanager', pkg + '.*', false, 1000).should.eventually.be.rejected);

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get an activity that is an inner class', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + ('ActivityRecord{2 u ' + pkg + '/.Settings$AppDrawOverlaySettingsActivity t181}}}'));

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot(pkg, '.Settings$AppDrawOverlaySettingsActivity', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get first activity from first package in a comma-separated list of packages + activities', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2 u com.android.settings/.ContactManager t181}}}');

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot('com.android.settings,com.example.android.supermanager', '.ContactManager,.OtherManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get first activity from second package in a comma-separated list of packages + activities', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2 u com.example.android.supermanager/.ContactManager t181}}}');

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot('com.android.settings,com.example.android.supermanager', '.ContactManager,.OtherManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get second activity from first package in a comma-separated list of packages + activities', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2 u com.android.settings/.OtherManager t181}}}');

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot('com.android.settings,com.example.android.supermanager', '.ContactManager,.OtherManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should be able to get second activity from second package in a comma-separated list of packages', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2 u com.example.android.supermanager/.OtherManager t181}}}');

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot('com.android.settings,com.example.android.supermanager', '.ContactManager,.OtherManager', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail to get activity when focused activity matches none of the provided list of packages', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').atLeast(1).withExactArgs(['dumpsys', 'window', 'windows']).returns('mFocusedApp=AppWindowToken{38600b56 token=Token{9ea1171 ' + 'ActivityRecord{2 u com.otherpackage/.ContactManager t181}}}');

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivityOrNot('com.android.settings,com.example.android.supermanager', '.ContactManager, .OtherManager', false, 1000).should.eventually.be.rejected);

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('waitForActivity', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call waitForActivityOrNot with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('waitForActivityOrNot').once().withExactArgs(pkg, act, false, 20000).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForActivity(pkg, act));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('waitForNotActivity', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call waitForActivityOrNot with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('waitForActivityOrNot').once().withExactArgs(pkg, act, true, 20000).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.waitForNotActivity(pkg, act));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('uninstallApk', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call forceStop and adbExec with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isAppInstalled').once().withExactArgs(pkg).returns(true);
            mocks.adb.expects('forceStop').once().withExactArgs(pkg).returns('');
            mocks.adb.expects('adbExec').once().withExactArgs(['uninstall', pkg], { timeout: 20000 }).returns('Success');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.uninstallApk(pkg));

          case 5:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not call forceStop and adbExec if app not installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isAppInstalled').once().withExactArgs(pkg).returns(false);
            mocks.adb.expects('forceStop').never();
            mocks.adb.expects('adbExec').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.uninstallApk(pkg));

          case 5:
            context$3$0.sent.should.be['false'];

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('installFromDevicePath', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call forceStop and adbExec with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['pm', 'install', '-r', 'foo'], {}).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.installFromDevicePath('foo'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('install', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call forceStop and adbExec with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('adbExec').once().withExactArgs(['install', '-r', 'foo'], { timeout: 60000 }).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.install('foo'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call forceStop and adbExec with correct arguments when not replacing', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('adbExec').once().withExactArgs(['install', 'foo'], { timeout: 60000 }).returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.install('foo', false));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('startUri', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should fail if uri or pkg are not provided', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.startUri().should.eventually.be.rejectedWith(/arguments are required/));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.startUri('foo').should.eventually.be.rejectedWith(/arguments are required/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should build a call to a VIEW intent with the uri', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['am', 'start', '-W', '-a', 'android.intent.action.VIEW', '-d', uri, pkg]);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.startUri(uri, pkg));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('startApp', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call getApiLevel and shell with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').once().withExactArgs().returns(17);
            mocks.adb.expects('shell').once().withExactArgs(cmd).returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.startApp(startAppOptions));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call getApiLevel and shell with correct arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').twice().returns(17);
            mocks.adb.expects('shell').onCall(0).returns('Error: Activity class foo does not exist');
            mocks.adb.expects('shell').returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.startApp(startAppOptions));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call getApiLevel and shell with correct arguments when activity is inner class', function callee$2$0() {
      var startAppOptionsWithInnerClass, cmdWithInnerClass;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            startAppOptionsWithInnerClass = { pkg: 'pkg', activity: 'act$InnerAct' }, cmdWithInnerClass = ['am', 'start', '-W', '-n', 'pkg/act\\$InnerAct', '-S'];

            mocks.adb.expects('getApiLevel').once().withExactArgs().returns(17);
            mocks.adb.expects('shell').once().withExactArgs(cmdWithInnerClass).returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.startApp(startAppOptionsWithInnerClass));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getDeviceLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args and return language when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").returns(18);
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.language']).returns(language);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

          case 4:
            context$3$0.t0 = language;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell two times with correct args and return language when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").returns(18);
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.language']).returns('');
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale.language']).returns(language);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

          case 5:
            context$3$0.t0 = language;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell one time with correct args and return language when API = 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").returns(23);
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns(locale);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

          case 4:
            context$3$0.t0 = language;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell two times with correct args and return language when API = 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").returns(23);
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns('');
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale']).returns(locale);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

          case 5:
            context$3$0.t0 = language;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setDeviceLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").once().returns(21);
            mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.language', language]).returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguage(language));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getDeviceCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args and return country', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.country']).returns(country);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getDeviceCountry());

          case 3:
            context$3$0.t0 = country;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell two times with correct args and return country', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.country']).returns('');
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale.region']).returns(country);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getDeviceCountry());

          case 4:
            context$3$0.t0 = country;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setDeviceCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").once().returns(21);
            mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.country', country]).returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.setDeviceCountry(country));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getDeviceLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell one time with correct args and return locale', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns(locale);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getDeviceLocale());

          case 3:
            context$3$0.t0 = locale;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call shell two times with correct args and return locale', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns('');
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale']).returns(locale);
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.getDeviceLocale());

          case 4:
            context$3$0.t0 = locale;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('ensureCurrentLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return false if no arguments', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.ensureCurrentLocale());

          case 2:
            context$3$0.sent.should.be['false'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return true when API 22 and only language', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(22);
            mocks.adb.expects("getDeviceLanguage").withExactArgs().once().returns("fr");
            mocks.adb.expects("getDeviceCountry").withExactArgs().never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.ensureCurrentLocale("fr", null));

          case 5:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return true when API 22 and only country', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(22);
            mocks.adb.expects("getDeviceCountry").withExactArgs().once().returns("FR");
            mocks.adb.expects("getDeviceLanguage").withExactArgs().never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.ensureCurrentLocale(null, "FR"));

          case 5:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return true when API 22', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(22);
            mocks.adb.expects("getDeviceLanguage").withExactArgs().once().returns("fr");
            mocks.adb.expects("getDeviceCountry").withExactArgs().once().returns("FR");
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.ensureCurrentLocale('FR', 'fr'));

          case 5:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return false when API 22', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(22);
            mocks.adb.expects("getDeviceLanguage").withExactArgs().once().returns("");
            mocks.adb.expects("getDeviceCountry").withExactArgs().once().returns("FR");
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.ensureCurrentLocale('en', 'US'));

          case 5:
            context$3$0.sent.should.be['false'];

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return true when API 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(23);
            mocks.adb.expects("getDeviceLocale").withExactArgs().once().returns("fr-FR");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.ensureCurrentLocale('fr', 'fr'));

          case 4:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return false when API 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(23);
            mocks.adb.expects("getDeviceLocale").withExactArgs().once().returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.ensureCurrentLocale('en', 'us'));

          case 4:
            context$3$0.sent.should.be['false'];

            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setDeviceLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should not call setDeviceLanguageCountry because of empty', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('setDeviceLanguageCountry').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setDeviceLocale());

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not call setDeviceLanguageCountry because of invalid format no -', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('setDeviceLanguageCountry').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setDeviceLocale('jp'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not call setDeviceLanguageCountry because of invalid format /', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('setDeviceLanguageCountry').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setDeviceLocale('en/US'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call setDeviceLanguageCountry', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('setDeviceLanguageCountry').withExactArgs(language, country).once().returns("");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setDeviceLocale('en-US'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call setDeviceLanguageCountry with degits for country', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('setDeviceLanguageCountry').withExactArgs(language, country + "0").once().returns("");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setDeviceLocale('en-US0'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setDeviceLanguageCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return if language and country are not passed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getDeviceLanguage').never();
            mocks.adb.expects('getDeviceCountry').never();
            mocks.adb.expects('getDeviceLocale').never();
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry());

          case 9:
            mocks.adb.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set language, country and reboot the device when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(22);
            mocks.adb.expects("getDeviceLanguage").withExactArgs().once().returns("fr");
            mocks.adb.expects("getDeviceCountry").withExactArgs().once().returns("");
            mocks.adb.expects("setDeviceLanguage").withExactArgs(language).once().returns("");
            mocks.adb.expects("setDeviceCountry").withExactArgs(country).once().returns("");
            mocks.adb.expects("reboot").once().returns("");
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(language, country));

          case 8:
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set language and country if it does not change when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(22);
            mocks.adb.expects('getDeviceLanguage').once().returns('en');
            mocks.adb.expects('getDeviceCountry').once().returns('US');
            mocks.adb.expects('getDeviceLocale').never();
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(language.toLowerCase(), country.toLowerCase()));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set locale when API is 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(23);
            mocks.adb.expects("getDeviceLocale").withExactArgs().once().returns('fr-FR');
            mocks.adb.expects("setDeviceSysLocale").withExactArgs(locale).once().returns('fr-FR');
            mocks.adb.expects("reboot").once().returns("");
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(language, country));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set language and country if it does not change when API is 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(23);
            mocks.adb.expects("getDeviceLocale").withExactArgs().once().returns(locale);
            mocks.adb.expects('setDeviceSysLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(language, country));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call set locale via setting app when API 24+', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(24);
            mocks.adb.expects("getDeviceLocale").withExactArgs().once().returns('fr-FR');
            mocks.adb.expects("setDeviceSysLocaleViaSettingApp").withExactArgs(language, country).once().returns("");
            mocks.adb.expects('reboot').never();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(language, country));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set language and country if it does not change when API 24+', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(24);
            mocks.adb.expects("getDeviceLocale").withExactArgs().once().returns(locale);
            mocks.adb.expects("setDeviceSysLocaleViaSettingApp").never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(language, country));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set language and country if no language when API 24+', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(24);
            mocks.adb.expects("getDeviceLocale").withExactArgs().once().returns(locale);
            mocks.adb.expects("setDeviceSysLocaleViaSettingApp").never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(country));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set language and country if no country when API 24+', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("getApiLevel").withExactArgs().once().returns(24);
            mocks.adb.expects("getDeviceLocale").withExactArgs().once().returns(locale);
            mocks.adb.expects("setDeviceSysLocaleViaSettingApp").never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.setDeviceLanguageCountry(language));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getApkInfo', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process, fs: _appiumSupport.fs }, function (mocks) {
    it('should properly parse apk info', function callee$2$0() {
      var result, _arr, _i, _arr$_i, _name, value;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('exists').once().returns(true);
            mocks.adb.expects('initAapt').once().returns(true);
            mocks.teen_process.expects('exec').once().returns({ stdout: 'package: name=\'io.appium.settings\' versionCode=\'2\' versionName=\'1.1\' platformBuildVersionName=\'6.0-2166767\'\n      sdkVersion:\'17\'\n      targetSdkVersion:\'23\'\n      uses-permission: name=\'android.permission.INTERNET\'\n      uses-permission: name=\'android.permission.CHANGE_NETWORK_STATE\'\n      uses-permission: name=\'android.permission.ACCESS_NETWORK_STATE\'\n      uses-permission: name=\'android.permission.READ_PHONE_STATE\'\n      uses-permission: name=\'android.permission.WRITE_SETTINGS\'\n      uses-permission: name=\'android.permission.CHANGE_WIFI_STATE\'\n      uses-permission: name=\'android.permission.ACCESS_WIFI_STATE\'\n      uses-permission: name=\'android.permission.ACCESS_FINE_LOCATION\'\n      uses-permission: name=\'android.permission.ACCESS_COARSE_LOCATION\'\n      uses-permission: name=\'android.permission.ACCESS_MOCK_LOCATION\'\n      application-label:\'Appium Settings\'\n      application-icon-120:\'res/drawable-ldpi-v4/ic_launcher.png\'\n      application-icon-160:\'res/drawable-mdpi-v4/ic_launcher.png\'\n      application-icon-240:\'res/drawable-hdpi-v4/ic_launcher.png\'\n      application-icon-320:\'res/drawable-xhdpi-v4/ic_launcher.png\'\n      application: label=\'Appium Settings\' icon=\'res/drawable-mdpi-v4/ic_launcher.png\'\n      application-debuggable\n      launchable-activity: name=\'io.appium.settings.Settings\'  label=\'Appium Settings\' icon=\'\'\n      feature-group: label=\'\'\n        uses-feature: name=\'android.hardware.wifi\'\n        uses-feature: name=\'android.hardware.location\'\n        uses-implied-feature: name=\'android.hardware.location\' reason=\'requested android.permission.ACCESS_COARSE_LOCATION permission, requested android.permission.ACCESS_FINE_LOCATION permission, and requested android.permission.ACCESS_MOCK_LOCATION permission\'\n        uses-feature: name=\'android.hardware.location.gps\'\n        uses-implied-feature: name=\'android.hardware.location.gps\' reason=\'requested android.permission.ACCESS_FINE_LOCATION permission\'\n        uses-feature: name=\'android.hardware.location.network\'\n        uses-implied-feature: name=\'android.hardware.location.network\' reason=\'requested android.permission.ACCESS_COARSE_LOCATION permission\'\n        uses-feature: name=\'android.hardware.touchscreen\'\n        uses-implied-feature: name=\'android.hardware.touchscreen\' reason=\'default feature for all apps\'\n      main\n      other-receivers\n      other-services\n      supports-screens: \'small\' \'normal\' \'large\' \'xlarge\'\n      supports-any-density: \'true\'\n      locales: \'--_--\'\n      densities: \'120\' \'160\' \'240\' \'320\'' });
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.getApkInfo('/some/folder/path.apk'));

          case 5:
            result = context$3$0.sent;
            _arr = [['name', 'io.appium.settings'], ['versionCode', 2], ['versionName', '1.1']];

            for (_i = 0; _i < _arr.length; _i++) {
              _arr$_i = _slicedToArray(_arr[_i], 2);
              _name = _arr$_i[0];
              value = _arr$_i[1];

              result.should.have.property(_name, value);
            }

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getPackageInfo', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should properly parse installed package info', function callee$2$0() {
      var result, _arr2, _i2, _arr2$_i2, _name2, value;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().returns('Packages:\n      Package [com.example.testapp.first] (2036fd1):\n        userId=10225\n        pkg=Package{42e7a36 com.example.testapp.first}\n        codePath=/data/app/com.example.testapp.first-1\n        resourcePath=/data/app/com.example.testapp.first-1\n        legacyNativeLibraryDir=/data/app/com.example.testapp.first-1/lib\n        primaryCpuAbi=null\n        secondaryCpuAbi=null\n        versionCode=1 minSdk=21 targetSdk=24\n        versionName=1.0\n        splits=[base]\n        apkSigningVersion=1\n        applicationInfo=ApplicationInfo{29cb2a4 com.example.testapp.first}\n        flags=[ HAS_CODE ALLOW_CLEAR_USER_DATA ALLOW_BACKUP ]\n        privateFlags=[ RESIZEABLE_ACTIVITIES ]\n        dataDir=/data/user/0/com.example.testapp.first\n        supportsScreens=[small, medium, large, xlarge, resizeable, anyDensity]\n        timeStamp=2016-11-03 01:12:08\n        firstInstallTime=2016-11-03 01:12:09\n        lastUpdateTime=2016-11-03 01:12:09\n        signatures=PackageSignatures{9fe380d [53ea108d]}\n        installPermissionsFixed=true installStatus=1\n        pkgFlags=[ HAS_CODE ALLOW_CLEAR_USER_DATA ALLOW_BACKUP ]\n        User 0: ceDataInode=474317 installed=true hidden=false suspended=false stopped=true notLaunched=true enabled=0\n          runtime permissions:');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getPackageInfo('com.example.testapp.first'));

          case 3:
            result = context$3$0.sent;
            _arr2 = [['name', 'com.example.testapp.first'], ['versionCode', 1], ['versionName', '1.0']];

            for (_i2 = 0; _i2 < _arr2.length; _i2++) {
              _arr2$_i2 = _slicedToArray(_arr2[_i2], 2);
              _name2 = _arr2$_i2[0];
              value = _arr2$_i2[1];

              result.should.have.property(_name2, value);
            }

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('installOrUpgrade', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    var pkgId = 'io.appium.settings';
    var apkPath = '/path/to/my.apk';

    it('should execute install if the package is not present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              name: pkgId
            });
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(false);
            mocks.adb.expects('install').withArgs(apkPath, false).once().returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return if the same package version is already installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              versionCode: 1
            });
            mocks.adb.expects('getPackageInfo').once().returns({
              versionCode: 1
            });
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath, pkgId));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return if newer package version is already installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              name: pkgId,
              versionCode: 1
            });
            mocks.adb.expects('getPackageInfo').once().returns({
              versionCode: 2
            });
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not throw an error if apk version code cannot be read', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              name: pkgId
            });
            mocks.adb.expects('getPackageInfo').once().returns({
              versionCode: 2
            });
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not throw an error if pkg version code cannot be read', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              name: pkgId,
              versionCode: 1
            });
            mocks.adb.expects('getPackageInfo').once().returns({});
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(true);
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 5:
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not throw an error if pkg id cannot be read', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({});
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should perform upgrade if older package version is installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              name: pkgId,
              versionCode: 2
            });
            mocks.adb.expects('getPackageInfo').once().returns({
              versionCode: 1
            });
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(true);
            mocks.adb.expects('install').withArgs(apkPath, true).once().returns(true);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should uninstall and re-install if older package version is installed and upgrade fails', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              name: pkgId,
              versionCode: 2
            });
            mocks.adb.expects('getPackageInfo').once().returns({
              versionCode: 1
            });
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(true);
            mocks.adb.expects('install').withArgs(apkPath, true).once().throws();
            mocks.adb.expects('uninstallApk').withExactArgs(pkgId).once().returns(true);
            mocks.adb.expects('install').withArgs(apkPath, false).once().returns(true);
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 8:
            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an exception if upgrade and reinstall fail', function callee$2$0() {
      var isExceptionThrown;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              name: pkgId,
              versionCode: 2
            });
            mocks.adb.expects('getPackageInfo').once().returns({
              versionCode: 1
            });
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(true);
            mocks.adb.expects('uninstallApk').withExactArgs(pkgId).once().returns(true);
            mocks.adb.expects('install').withArgs(apkPath).twice().throws();
            isExceptionThrown = false;
            context$3$0.prev = 6;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 9:
            context$3$0.next = 14;
            break;

          case 11:
            context$3$0.prev = 11;
            context$3$0.t0 = context$3$0['catch'](6);

            isExceptionThrown = true;

          case 14:
            isExceptionThrown.should.be['true'];
            mocks.adb.verify();

          case 16:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[6, 11]]);
    });
    it('should throw an exception if upgrade and uninstall fail', function callee$2$0() {
      var isExceptionThrown;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApkInfo').withExactArgs(apkPath).once().returns({
              name: pkgId,
              versionCode: 2
            });
            mocks.adb.expects('getPackageInfo').once().returns({
              versionCode: 1
            });
            mocks.adb.expects('isAppInstalled').withExactArgs(pkgId).once().returns(true);
            mocks.adb.expects('uninstallApk').withExactArgs(pkgId).once().returns(false);
            mocks.adb.expects('install').withArgs(apkPath, true).once().throws();
            isExceptionThrown = false;
            context$3$0.prev = 6;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(adb.installOrUpgrade(apkPath));

          case 9:
            context$3$0.next = 14;
            break;

          case 11:
            context$3$0.prev = 11;
            context$3$0.t0 = context$3$0['catch'](6);

            isExceptionThrown = true;

          case 14:
            isExceptionThrown.should.be['true'];
            mocks.adb.verify();

          case 16:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[6, 11]]);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hcGstdXRpbHMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7Ozs0QkFDZixjQUFjOztJQUFoQyxZQUFZOzs2QkFDTCxnQkFBZ0I7O2dCQUNuQixPQUFPOzs7O2lDQUNHLHFCQUFxQjs7QUFHL0Msa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUU7SUFDdEIsR0FBRyxHQUFHLG9DQUFvQztJQUMxQyxHQUFHLEdBQUcsNkJBQTZCO0lBQ25DLEdBQUcsR0FBRyxpQkFBaUI7SUFDdkIsZUFBZSxHQUFHLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLO0FBQ2hELE9BQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSztBQUMzQyx5QkFBdUIsRUFBRSx5REFBeUQsRUFBQztJQUN0RyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQ3ZFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFDMUQsSUFBSSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQztJQUN6QyxRQUFRLEdBQUcsSUFBSTtJQUNmLE9BQU8sR0FBRyxJQUFJO0lBQ2QsTUFBTSxHQUFHLE9BQU8sQ0FBQzs7QUFFdkIsUUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFNO0FBQzFCLE1BQUksR0FBRyxHQUFHLG1CQUFTLENBQUM7QUFDcEIsVUFBUSxDQUFDLGdCQUFnQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcs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QUFFLENBQUM7YUFDZixDQUFDLENBQUM7QUFDSCxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlFLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdFLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2pFLDZCQUFpQixHQUFHLEtBQUs7Ozs2Q0FFckIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7OztBQUVuQyw2QkFBaUIsR0FBRyxJQUFJLENBQUM7OztBQUUzQiw2QkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7QUFDakMsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2Fway11dGlscy1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCAqIGFzIHRlZW5fcHJvY2VzcyBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IEFEQiBmcm9tICcuLi8uLic7XHJcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xyXG5cclxuXHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKSxcclxuICAgICAgcGtnID0gJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInLFxyXG4gICAgICB1cmkgPSAnY29udGVudDovL2NvbnRhY3RzL3Blb3BsZS8xJyxcclxuICAgICAgYWN0ID0gJy5Db250YWN0TWFuYWdlcicsXHJcbiAgICAgIHN0YXJ0QXBwT3B0aW9ucyA9IHtzdG9wQXBwOiB0cnVlLCBhY3Rpb246ICdhY3Rpb24nLCBjYXRlZ29yeTogJ2NhdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnczogJ2ZsYWdzJywgcGtnOiAncGtnJywgYWN0aXZpdHk6ICdhY3QnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHM6ICcteCBvcHRpb25zIC15IG9wdGlvbiBhcmd1bWVudCAteiBvcHRpb24gYXJnIHdpdGggc3BhY2VzJ30sXHJcbiAgICAgIGNtZCA9IFsnYW0nLCAnc3RhcnQnLCAnLVcnLCAnLW4nLCAncGtnL2FjdCcsICctUycsICctYScsICdhY3Rpb24nLCAnLWMnLCAnY2F0JyxcclxuICAgICAgICAgICAgICctZicsICdmbGFncycsICcteCcsICdvcHRpb25zJywgJy15JywgJ29wdGlvbicsICdhcmd1bWVudCcsXHJcbiAgICAgICAgICAgICAnLXonLCAnb3B0aW9uJywgJ2FyZyB3aXRoIHNwYWNlcyddLFxyXG4gICAgICBsYW5ndWFnZSA9ICdlbicsXHJcbiAgICAgIGNvdW50cnkgPSAnVVMnLFxyXG4gICAgICBsb2NhbGUgPSAnZW4tVVMnO1xyXG5cclxuZGVzY3JpYmUoJ0Fway11dGlscycsICgpID0+IHtcclxuICBsZXQgYWRiID0gbmV3IEFEQigpO1xyXG4gIGRlc2NyaWJlKCdpc0FwcEluc3RhbGxlZCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHBhcnNlIGNvcnJlY3RseSBhbmQgcmV0dXJuIHRydWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHBrZyA9ICdkdW1teS5wYWNrYWdlJztcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydwbScsICdsaXN0JywgJ3BhY2thZ2VzJywgcGtnXSlcclxuICAgICAgICAucmV0dXJucyhgcGFja2FnZToke3BrZ31gKTtcclxuICAgICAgKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChwa2cpKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHBhcnNlIGNvcnJlY3RseSBhbmQgcmV0dXJuIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBwa2cgPSAnZHVtbXkucGFja2FnZSc7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsncG0nLCAnbGlzdCcsICdwYWNrYWdlcycsIHBrZ10pXHJcbiAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgIChhd2FpdCBhZGIuaXNBcHBJbnN0YWxsZWQocGtnKSkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ2dldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHknLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBjb3JyZWN0bHkgYW5kIHJldHVybiBwYWNrYWdlIGFuZCBhY3Rpdml0eScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXHJcbiAgICAgICAgICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezIgdSAke3BrZ30vJHthY3R9IHQxODF9fX1gKTtcclxuXHJcbiAgICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwocGtnKTtcclxuICAgICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKGFjdCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBjb3JyZWN0bHkgYW5kIHJldHVybiBwYWNrYWdlIGFuZCBhY3Rpdml0eSB3aGVuIGEgY29tbWEgaXMgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezIwZmUyMTdlIHRva2VuPVRva2VuezIxODc4NzM5IGAgK1xyXG4gICAgICAgICAgICAgICAgIGBBY3Rpdml0eVJlY29yZHsxNjQyNTMwMCB1MCAke3BrZ30vJHthY3R9LCBpc1NoYWRvdzpmYWxzZSB0MTB9fX1gKTtcclxuXHJcbiAgICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwocGtnKTtcclxuICAgICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKGFjdCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBjb3JyZWN0bHkgYW5kIHJldHVybiBudWxsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSlcclxuICAgICAgICAucmV0dXJucygnbUZvY3VzZWRBcHA9bnVsbCcpO1xyXG4gICAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XHJcbiAgICAgIHNob3VsZC5ub3QuZXhpc3QoYXBwUGFja2FnZSk7XHJcbiAgICAgIHNob3VsZC5ub3QuZXhpc3QoYXBwQWN0aXZpdHkpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3dhaXRGb3JBY3Rpdml0eU9yTm90Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCBvbmNlIGFuZCBzaG91bGQgcmV0dXJuJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSlcclxuICAgICAgICAucmV0dXJucyhgbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSBgICtcclxuICAgICAgICAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1ICR7cGtnfS8ke2FjdH0gdDE4MX19fWApO1xyXG5cclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgYWN0LCBmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG11bHRpcGxlIHRpbWVzIGFuZCByZXR1cm4nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uQ2FsbCgwKVxyXG4gICAgICAgIC5yZXR1cm5zKCdtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxICcgK1xyXG4gICAgICAgICAgICAgICAgICdBY3Rpdml0eVJlY29yZHsyYzdjNDMxOCB1MCBmb28vYmFyIHQxODF9fX0nKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAucmV0dXJucygnbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSAnICtcclxuICAgICAgICAgICAgICAgICAnQWN0aXZpdHlSZWNvcmR7MmM3YzQzMTggdTAgY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlci8uQ29udGFjdE1hbmFnZXIgdDE4MX19fScpO1xyXG5cclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgYWN0LCBmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG9uY2UgcmV0dXJuIGZvciBub3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxyXG4gICAgICAgIC5yZXR1cm5zKCdtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxICcgK1xyXG4gICAgICAgICAgICAgICAgICdBY3Rpdml0eVJlY29yZHtjIDAgZm9vL2JhciB0MTgxfX19Jyk7XHJcblxyXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCBhY3QsIHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCBtdWx0aXBsZSB0aW1lcyBhbmQgcmV0dXJuIGZvciBub3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uQ2FsbCgwKVxyXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xyXG4gICAgICAgICAgICAgICAgIGBBY3Rpdml0eVJlY29yZHsyIHUgJHtwa2d9LyR7YWN0fSB0MTgxfX19YCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLnJldHVybnMoJ21Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgJyArXHJcbiAgICAgICAgICAgICAgICAgJ0FjdGl2aXR5UmVjb3JkezJjN2M0MzE4IHUwIGZvby9iYXIgdDE4MX19fScpO1xyXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCBhY3QsIHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgZmlyc3Qgb2YgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBhY3Rpdml0aWVzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSlcclxuICAgICAgICAucmV0dXJucyhgbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSBgICtcclxuICAgICAgICAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1ICR7cGtnfS8uQ29udGFjdE1hbmFnZXIgdDE4MX19fWApO1xyXG5cclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgJy5Db250YWN0TWFuYWdlciwgLk90aGVyTWFuYWdlcicsIGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IHNlY29uZCBvZiBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIGFjdGl2aXRpZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxyXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xyXG4gICAgICAgICAgICAgICAgIGBBY3Rpdml0eVJlY29yZHsyIHUgJHtwa2d9Ly5PdGhlck1hbmFnZXIgdDE4MX19fWApO1xyXG5cclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgJy5Db250YWN0TWFuYWdlciwgLk90aGVyTWFuYWdlcicsIGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGZhaWwgaWYgbm8gYWN0aXZpdHkgaW4gYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBpcyBhdmFpbGFibGUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLmF0TGVhc3QoMSlcclxuICAgICAgICAud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSlcclxuICAgICAgICAucmV0dXJucyhgbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSBgICtcclxuICAgICAgICAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1ICR7cGtnfS8ke2FjdH0gdDE4MX19fWApO1xyXG5cclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgJy5TdXBlck1hbmFnZXIsIC5PdGhlck1hbmFnZXInLCBmYWxzZSwgMTAwMClcclxuICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIG1hdGNoIGFjdGl2aXRpZXMgaWYgd2FpdEFjdGl2aXR5IGlzIGEgd2lsZGNhcmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxyXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xyXG4gICAgICAgICAgICAgICAgIGBBY3Rpdml0eVJlY29yZHsyIHUgJHtwa2d9Ly5Db250YWN0TWFuYWdlciB0MTgxfX19YCk7XHJcblxyXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCBgKmAsIGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbWF0Y2ggYWN0aXZpdGllcyBpZiB3YWl0QWN0aXZpdHkgaXMgc2hvcnRlbmVkIGFuZCBjb250YWlucyBhIHdoaWxkY2FyZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXHJcbiAgICAgICAgICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezIgdSAke3BrZ30vLkNvbnRhY3RNYW5hZ2VyIHQxODF9fX1gKTtcclxuXHJcbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yQWN0aXZpdHlPck5vdChwa2csIGAuKk1hbmFnZXJgLCBmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIG1hdGNoIGFjdGl2aXRpZXMgaWYgd2FpdEFjdGl2aXR5IGNvbnRhaW5zIGEgd2lsZGNhcmQgYWx0ZXJuYXRpdmUgdG8gYWN0aXZpdHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxyXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xyXG4gICAgICAgICAgICAgICAgIGBBY3Rpdml0eVJlY29yZHsyIHUgJHtwa2d9Ly5Db250YWN0TWFuYWdlciB0MTgxfX19YCk7XHJcblxyXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCBgJHtwa2d9LipgLCBmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIG1hdGNoIGFjdGl2aXRpZXMgaWYgd2FpdEFjdGl2aXR5IGNvbnRhaW5zIGEgd2lsZGNhcmQgb24gaGVhZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXHJcbiAgICAgICAgICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezIgdSAke3BrZ30vLkNvbnRhY3RNYW5hZ2VyIHQxODF9fX1gKTtcclxuXHJcbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yQWN0aXZpdHlPck5vdChwa2csIGAqLmNvbnRhY3RtYW5hZ2VyLkNvbnRhY3RNYW5hZ2VyYCwgZmFsc2UpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBtYXRjaCBhY3Rpdml0aWVzIGlmIHdhaXRBY3Rpdml0eSBjb250YWlucyBhIHdpbGRjYXJkIGFjcm9zcyBhIHBrZyBuYW1lIGFuZCBhbiBhY3Rpdml0eSBuYW1lJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSlcclxuICAgICAgICAucmV0dXJucyhgbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSBgICtcclxuICAgICAgICAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1ICR7cGtnfS8uQ29udGFjdE1hbmFnZXIgdDE4MX19fWApO1xyXG5cclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KHBrZywgYGNvbS4qTWFuYWdlcmAsIGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbWF0Y2ggYWN0aXZpdGllcyBpZiB3YWl0QWN0aXZpdHkgY29udGFpbnMgd2lsZGNhcmRzIGluIGJvdGggYSBwa2cgbmFtZSBhbmQgYW4gYWN0aXZpdHkgbmFtZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXHJcbiAgICAgICAgICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezIgdSAke3BrZ30vLkNvbnRhY3RNYW5hZ2VyIHQxODF9fX1gKTtcclxuXHJcbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yQWN0aXZpdHlPck5vdChwa2csIGBjb20uKi5jb250YWN0bWFuYWdlci4qTWFuYWdlcmAsIGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGZhaWwgaWYgYWN0aXZpdHkgbm90IHRvIG1hdGNoIGZyb20gcmVnZXhwIGFjdGl2aXRpZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLmF0TGVhc3QoMSkud2l0aEV4YWN0QXJncyhbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSlcclxuICAgICAgICAucmV0dXJucyhgbUZvY3VzZWRBcHA9QXBwV2luZG93VG9rZW57Mzg2MDBiNTYgdG9rZW49VG9rZW57OWVhMTE3MSBgICtcclxuICAgICAgICAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1IGNvbS5leGFtcGxlLmFuZHJvaWQuc3VwZXJtYW5hZ2VyLy5TdXBlck1hbmFnZXIgdDE4MX19fWApO1xyXG5cclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KCdjb20uZXhhbXBsZS5hbmRyb2lkLnN1cGVybWFuYWdlcicsIGAke3BrZ30uKmAsIGZhbHNlLCAxMDAwKVxyXG4gICAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IGFuIGFjdGl2aXR5IHRoYXQgaXMgYW4gaW5uZXIgY2xhc3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxyXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xyXG4gICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezIgdSAke3BrZ30vLlNldHRpbmdzJEFwcERyYXdPdmVybGF5U2V0dGluZ3NBY3Rpdml0eSB0MTgxfX19YCk7XHJcblxyXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QocGtnLCAnLlNldHRpbmdzJEFwcERyYXdPdmVybGF5U2V0dGluZ3NBY3Rpdml0eScsIGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IGZpcnN0IGFjdGl2aXR5IGZyb20gZmlyc3QgcGFja2FnZSBpbiBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIHBhY2thZ2VzICsgYWN0aXZpdGllcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXHJcbiAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1IGNvbS5hbmRyb2lkLnNldHRpbmdzLy5Db250YWN0TWFuYWdlciB0MTgxfX19YCk7XHJcblxyXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QoJ2NvbS5hbmRyb2lkLnNldHRpbmdzLGNvbS5leGFtcGxlLmFuZHJvaWQuc3VwZXJtYW5hZ2VyJywgJy5Db250YWN0TWFuYWdlciwuT3RoZXJNYW5hZ2VyJywgZmFsc2UpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgZmlyc3QgYWN0aXZpdHkgZnJvbSBzZWNvbmQgcGFja2FnZSBpbiBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIHBhY2thZ2VzICsgYWN0aXZpdGllcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXHJcbiAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1IGNvbS5leGFtcGxlLmFuZHJvaWQuc3VwZXJtYW5hZ2VyLy5Db250YWN0TWFuYWdlciB0MTgxfX19YCk7XHJcblxyXG4gICAgICBhd2FpdCBhZGIud2FpdEZvckFjdGl2aXR5T3JOb3QoJ2NvbS5hbmRyb2lkLnNldHRpbmdzLGNvbS5leGFtcGxlLmFuZHJvaWQuc3VwZXJtYW5hZ2VyJywgJy5Db250YWN0TWFuYWdlciwuT3RoZXJNYW5hZ2VyJywgZmFsc2UpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgc2Vjb25kIGFjdGl2aXR5IGZyb20gZmlyc3QgcGFja2FnZSBpbiBhIGNvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIHBhY2thZ2VzICsgYWN0aXZpdGllcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXHJcbiAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1IGNvbS5hbmRyb2lkLnNldHRpbmdzLy5PdGhlck1hbmFnZXIgdDE4MX19fWApO1xyXG5cclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JBY3Rpdml0eU9yTm90KCdjb20uYW5kcm9pZC5zZXR0aW5ncyxjb20uZXhhbXBsZS5hbmRyb2lkLnN1cGVybWFuYWdlcicsICcuQ29udGFjdE1hbmFnZXIsLk90aGVyTWFuYWdlcicsIGZhbHNlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IHNlY29uZCBhY3Rpdml0eSBmcm9tIHNlY29uZCBwYWNrYWdlIGluIGEgY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgcGFja2FnZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICd3aW5kb3cnLCAnd2luZG93cyddKVxyXG4gICAgICAgIC5yZXR1cm5zKGBtRm9jdXNlZEFwcD1BcHBXaW5kb3dUb2tlbnszODYwMGI1NiB0b2tlbj1Ub2tlbns5ZWExMTcxIGAgK1xyXG4gICAgICAgICAgYEFjdGl2aXR5UmVjb3JkezIgdSBjb20uZXhhbXBsZS5hbmRyb2lkLnN1cGVybWFuYWdlci8uT3RoZXJNYW5hZ2VyIHQxODF9fX1gKTtcclxuXHJcbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yQWN0aXZpdHlPck5vdCgnY29tLmFuZHJvaWQuc2V0dGluZ3MsY29tLmV4YW1wbGUuYW5kcm9pZC5zdXBlcm1hbmFnZXInLCAnLkNvbnRhY3RNYW5hZ2VyLC5PdGhlck1hbmFnZXInLCBmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBmYWlsIHRvIGdldCBhY3Rpdml0eSB3aGVuIGZvY3VzZWQgYWN0aXZpdHkgbWF0Y2hlcyBub25lIG9mIHRoZSBwcm92aWRlZCBsaXN0IG9mIHBhY2thZ2VzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAgIC5hdExlYXN0KDEpLndpdGhFeGFjdEFyZ3MoWydkdW1wc3lzJywgJ3dpbmRvdycsICd3aW5kb3dzJ10pXHJcbiAgICAgICAgLnJldHVybnMoYG1Gb2N1c2VkQXBwPUFwcFdpbmRvd1Rva2VuezM4NjAwYjU2IHRva2VuPVRva2VuezllYTExNzEgYCArXHJcbiAgICAgICAgICBgQWN0aXZpdHlSZWNvcmR7MiB1IGNvbS5vdGhlcnBhY2thZ2UvLkNvbnRhY3RNYW5hZ2VyIHQxODF9fX1gKTtcclxuXHJcbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yQWN0aXZpdHlPck5vdCgnY29tLmFuZHJvaWQuc2V0dGluZ3MsY29tLmV4YW1wbGUuYW5kcm9pZC5zdXBlcm1hbmFnZXInLCAnLkNvbnRhY3RNYW5hZ2VyLCAuT3RoZXJNYW5hZ2VyJywgZmFsc2UsIDEwMDApXHJcbiAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3dhaXRGb3JBY3Rpdml0eScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgd2FpdEZvckFjdGl2aXR5T3JOb3Qgd2l0aCBjb3JyZWN0IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3dhaXRGb3JBY3Rpdml0eU9yTm90JylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocGtnLCBhY3QsIGZhbHNlLCAyMDAwMClcclxuICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIGF3YWl0IGFkYi53YWl0Rm9yQWN0aXZpdHkocGtnLCBhY3QpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3dhaXRGb3JOb3RBY3Rpdml0eScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgd2FpdEZvckFjdGl2aXR5T3JOb3Qgd2l0aCBjb3JyZWN0IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3dhaXRGb3JBY3Rpdml0eU9yTm90JylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocGtnLCBhY3QsIHRydWUsIDIwMDAwKVxyXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgYXdhaXQgYWRiLndhaXRGb3JOb3RBY3Rpdml0eShwa2csIGFjdCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgndW5pbnN0YWxsQXBrJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBmb3JjZVN0b3AgYW5kIGFkYkV4ZWMgd2l0aCBjb3JyZWN0IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzQXBwSW5zdGFsbGVkJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocGtnKVxyXG4gICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZm9yY2VTdG9wJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocGtnKVxyXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2FkYkV4ZWMnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3VuaW5zdGFsbCcsIHBrZ10sIHt0aW1lb3V0OiAyMDAwMH0pXHJcbiAgICAgICAgLnJldHVybnMoJ1N1Y2Nlc3MnKTtcclxuICAgICAgKGF3YWl0IGFkYi51bmluc3RhbGxBcGsocGtnKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBmb3JjZVN0b3AgYW5kIGFkYkV4ZWMgaWYgYXBwIG5vdCBpbnN0YWxsZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc0FwcEluc3RhbGxlZCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKHBrZylcclxuICAgICAgICAucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmb3JjZVN0b3AnKVxyXG4gICAgICAgIC5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnYWRiRXhlYycpXHJcbiAgICAgICAgLm5ldmVyKCk7XHJcbiAgICAgIChhd2FpdCBhZGIudW5pbnN0YWxsQXBrKHBrZykpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdpbnN0YWxsRnJvbURldmljZVBhdGgnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGZvcmNlU3RvcCBhbmQgYWRiRXhlYyB3aXRoIGNvcnJlY3QgYXJndW1lbnRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3BtJywgJ2luc3RhbGwnLCAnLXInLCAnZm9vJ10sIHt9KVxyXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgKGF3YWl0IGFkYi5pbnN0YWxsRnJvbURldmljZVBhdGgoJ2ZvbycpKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdpbnN0YWxsJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBmb3JjZVN0b3AgYW5kIGFkYkV4ZWMgd2l0aCBjb3JyZWN0IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2FkYkV4ZWMnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2luc3RhbGwnLCAnLXInLCAnZm9vJ10sIHt0aW1lb3V0OiA2MDAwMH0pXHJcbiAgICAgICAgLnJldHVybnMoJycpO1xyXG4gICAgICAoYXdhaXQgYWRiLmluc3RhbGwoJ2ZvbycpKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZm9yY2VTdG9wIGFuZCBhZGJFeGVjIHdpdGggY29ycmVjdCBhcmd1bWVudHMgd2hlbiBub3QgcmVwbGFjaW5nJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnYWRiRXhlYycpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnaW5zdGFsbCcsICdmb28nXSwge3RpbWVvdXQ6IDYwMDAwfSlcclxuICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIChhd2FpdCBhZGIuaW5zdGFsbCgnZm9vJywgZmFsc2UpKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdzdGFydFVyaScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdXJpIG9yIHBrZyBhcmUgbm90IHByb3ZpZGVkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBhZGIuc3RhcnRVcmkoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2FyZ3VtZW50cyBhcmUgcmVxdWlyZWQvKTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0VXJpKCdmb28nKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2FyZ3VtZW50cyBhcmUgcmVxdWlyZWQvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBidWlsZCBhIGNhbGwgdG8gYSBWSUVXIGludGVudCB3aXRoIHRoZSB1cmknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnYW0nLCAnc3RhcnQnLCAnLVcnLCAnLWEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQuaW50ZW50LmFjdGlvbi5WSUVXJywgJy1kJywgdXJpLCBwa2ddKTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0VXJpKHVyaSwgcGtnKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdzdGFydEFwcCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0QXBpTGV2ZWwgYW5kIHNoZWxsIHdpdGggY29ycmVjdCBhcmd1bWVudHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAucmV0dXJucygxNyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKGNtZClcclxuICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIChhd2FpdCBhZGIuc3RhcnRBcHAoc3RhcnRBcHBPcHRpb25zKSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGdldEFwaUxldmVsIGFuZCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJndW1lbnRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKVxyXG4gICAgICAgIC50d2ljZSgpXHJcbiAgICAgICAgLnJldHVybnMoMTcpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAgIC5vbkNhbGwoMClcclxuICAgICAgICAucmV0dXJucygnRXJyb3I6IEFjdGl2aXR5IGNsYXNzIGZvbyBkb2VzIG5vdCBleGlzdCcpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgKGF3YWl0IGFkYi5zdGFydEFwcChzdGFydEFwcE9wdGlvbnMpKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZ2V0QXBpTGV2ZWwgYW5kIHNoZWxsIHdpdGggY29ycmVjdCBhcmd1bWVudHMgd2hlbiBhY3Rpdml0eSBpcyBpbm5lciBjbGFzcycsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnRBcHBPcHRpb25zV2l0aElubmVyQ2xhc3MgPSB7IHBrZzogJ3BrZycsIGFjdGl2aXR5OiAnYWN0JElubmVyQWN0J30sXHJcbiAgICAgICAgICAgIGNtZFdpdGhJbm5lckNsYXNzID0gWydhbScsICdzdGFydCcsICctVycsICctbicsICdwa2cvYWN0XFxcXCRJbm5lckFjdCcsICctUyddO1xyXG5cclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgIC5yZXR1cm5zKDE3KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoY21kV2l0aElubmVyQ2xhc3MpXHJcbiAgICAgICAgLnJldHVybnMoJycpO1xyXG4gICAgICAoYXdhaXQgYWRiLnN0YXJ0QXBwKHN0YXJ0QXBwT3B0aW9uc1dpdGhJbm5lckNsYXNzKSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnZ2V0RGV2aWNlTGFuZ3VhZ2UnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG9uZSB0aW1lIHdpdGggY29ycmVjdCBhcmdzIGFuZCByZXR1cm4gbGFuZ3VhZ2Ugd2hlbiBBUEkgPCAyMycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS5yZXR1cm5zKDE4KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncGVyc2lzdC5zeXMubGFuZ3VhZ2UnXSlcclxuICAgICAgICAucmV0dXJucyhsYW5ndWFnZSk7XHJcbiAgICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlTGFuZ3VhZ2UoKSkuc2hvdWxkLmVxdWFsKGxhbmd1YWdlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgdHdvIHRpbWVzIHdpdGggY29ycmVjdCBhcmdzIGFuZCByZXR1cm4gbGFuZ3VhZ2Ugd2hlbiBBUEkgPCAyMycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS5yZXR1cm5zKDE4KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncGVyc2lzdC5zeXMubGFuZ3VhZ2UnXSlcclxuICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlLmxhbmd1YWdlJ10pXHJcbiAgICAgICAgLnJldHVybnMobGFuZ3VhZ2UpO1xyXG4gICAgICAoYXdhaXQgYWRiLmdldERldmljZUxhbmd1YWdlKCkpLnNob3VsZC5lcXVhbChsYW5ndWFnZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG9uZSB0aW1lIHdpdGggY29ycmVjdCBhcmdzIGFuZCByZXR1cm4gbGFuZ3VhZ2Ugd2hlbiBBUEkgPSAyMycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS5yZXR1cm5zKDIzKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncGVyc2lzdC5zeXMubG9jYWxlJ10pXHJcbiAgICAgICAgLnJldHVybnMobG9jYWxlKTtcclxuICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VMYW5ndWFnZSgpKS5zaG91bGQuZXF1YWwobGFuZ3VhZ2UpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB0d28gdGltZXMgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHJldHVybiBsYW5ndWFnZSB3aGVuIEFQSSA9IDIzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpLnJldHVybnMoMjMpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sb2NhbGUnXSlcclxuICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlJ10pXHJcbiAgICAgICAgLnJldHVybnMobG9jYWxlKTtcclxuICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VMYW5ndWFnZSgpKS5zaG91bGQuZXF1YWwobGFuZ3VhZ2UpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3NldERldmljZUxhbmd1YWdlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCBvbmUgdGltZSB3aXRoIGNvcnJlY3QgYXJncyB3aGVuIEFQSSA8IDIzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpXHJcbiAgICAgICAgLm9uY2UoKS5yZXR1cm5zKDIxKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3NldHByb3AnLCAncGVyc2lzdC5zeXMubGFuZ3VhZ2UnLCBsYW5ndWFnZV0pXHJcbiAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VMYW5ndWFnZShsYW5ndWFnZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnZ2V0RGV2aWNlQ291bnRyeScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgb25lIHRpbWUgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHJldHVybiBjb3VudHJ5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5jb3VudHJ5J10pXHJcbiAgICAgICAgLnJldHVybnMoY291bnRyeSk7XHJcbiAgICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlQ291bnRyeSgpKS5zaG91bGQuZXF1YWwoY291bnRyeSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHR3byB0aW1lcyB3aXRoIGNvcnJlY3QgYXJncyBhbmQgcmV0dXJuIGNvdW50cnknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmNvdW50cnknXSlcclxuICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlLnJlZ2lvbiddKVxyXG4gICAgICAgIC5yZXR1cm5zKGNvdW50cnkpO1xyXG4gICAgICAoYXdhaXQgYWRiLmdldERldmljZUNvdW50cnkoKSkuc2hvdWxkLmVxdWFsKGNvdW50cnkpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3NldERldmljZUNvdW50cnknLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG9uZSB0aW1lIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpXHJcbiAgICAgICAgLm9uY2UoKS5yZXR1cm5zKDIxKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3NldHByb3AnLCAncGVyc2lzdC5zeXMuY291bnRyeScsIGNvdW50cnldKVxyXG4gICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlQ291bnRyeShjb3VudHJ5KTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdnZXREZXZpY2VMb2NhbGUnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIG9uZSB0aW1lIHdpdGggY29ycmVjdCBhcmdzIGFuZCByZXR1cm4gbG9jYWxlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sb2NhbGUnXSlcclxuICAgICAgICAucmV0dXJucyhsb2NhbGUpO1xyXG4gICAgICAoYXdhaXQgYWRiLmdldERldmljZUxvY2FsZSgpKS5zaG91bGQuZXF1YWwobG9jYWxlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgdHdvIHRpbWVzIHdpdGggY29ycmVjdCBhcmdzIGFuZCByZXR1cm4gbG9jYWxlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sb2NhbGUnXSlcclxuICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlJ10pXHJcbiAgICAgICAgLnJldHVybnMobG9jYWxlKTtcclxuICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VMb2NhbGUoKSkuc2hvdWxkLmVxdWFsKGxvY2FsZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnZW5zdXJlQ3VycmVudExvY2FsZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBubyBhcmd1bWVudHMnLCBhc3luYygpID0+IHtcclxuICAgICAgKGF3YWl0IGFkYi5lbnN1cmVDdXJyZW50TG9jYWxlKCkpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIEFQSSAyMiBhbmQgb25seSBsYW5ndWFnZScsIGFzeW5jKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpLndpdGhFeGFjdEFyZ3MoKS5vbmNlKCkucmV0dXJucygyMik7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RGV2aWNlTGFuZ3VhZ2VcIikud2l0aEV4YWN0QXJncygpLm9uY2UoKS5yZXR1cm5zKFwiZnJcIik7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RGV2aWNlQ291bnRyeVwiKS53aXRoRXhhY3RBcmdzKCkubmV2ZXIoKTtcclxuICAgICAgKGF3YWl0IGFkYi5lbnN1cmVDdXJyZW50TG9jYWxlKFwiZnJcIiwgbnVsbCkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBBUEkgMjIgYW5kIG9ubHkgY291bnRyeScsIGFzeW5jKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpLndpdGhFeGFjdEFyZ3MoKS5vbmNlKCkucmV0dXJucygyMik7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RGV2aWNlQ291bnRyeVwiKS53aXRoRXhhY3RBcmdzKCkub25jZSgpLnJldHVybnMoXCJGUlwiKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXREZXZpY2VMYW5ndWFnZVwiKS53aXRoRXhhY3RBcmdzKCkubmV2ZXIoKTtcclxuICAgICAgKGF3YWl0IGFkYi5lbnN1cmVDdXJyZW50TG9jYWxlKG51bGwsIFwiRlJcIikpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgd2hlbiBBUEkgMjInLCBhc3luYygpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS53aXRoRXhhY3RBcmdzKCkub25jZSgpLnJldHVybnMoMjIpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZUxhbmd1YWdlXCIpLndpdGhFeGFjdEFyZ3MoKS5vbmNlKCkucmV0dXJucyhcImZyXCIpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZUNvdW50cnlcIikud2l0aEV4YWN0QXJncygpLm9uY2UoKS5yZXR1cm5zKFwiRlJcIik7XHJcbiAgICAgIChhd2FpdCBhZGIuZW5zdXJlQ3VycmVudExvY2FsZSgnRlInLCAnZnInKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBBUEkgMjInLCBhc3luYygpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS53aXRoRXhhY3RBcmdzKCkub25jZSgpLnJldHVybnMoMjIpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZUxhbmd1YWdlXCIpLndpdGhFeGFjdEFyZ3MoKS5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXREZXZpY2VDb3VudHJ5XCIpLndpdGhFeGFjdEFyZ3MoKS5vbmNlKCkucmV0dXJucyhcIkZSXCIpO1xyXG4gICAgICAoYXdhaXQgYWRiLmVuc3VyZUN1cnJlbnRMb2NhbGUoJ2VuJywgJ1VTJykpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gQVBJIDIzJywgYXN5bmMoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0QXBpTGV2ZWxcIikud2l0aEV4YWN0QXJncygpLm9uY2UoKS5yZXR1cm5zKDIzKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXREZXZpY2VMb2NhbGVcIikud2l0aEV4YWN0QXJncygpLm9uY2UoKS5yZXR1cm5zKFwiZnItRlJcIik7XHJcbiAgICAgIChhd2FpdCBhZGIuZW5zdXJlQ3VycmVudExvY2FsZSgnZnInLCAnZnInKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugd2hlbiBBUEkgMjMnLCBhc3luYygpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS53aXRoRXhhY3RBcmdzKCkub25jZSgpLnJldHVybnMoMjMpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZUxvY2FsZVwiKS53aXRoRXhhY3RBcmdzKCkub25jZSgpLnJldHVybnMoXCJcIik7XHJcbiAgICAgIChhd2FpdCBhZGIuZW5zdXJlQ3VycmVudExvY2FsZSgnZW4nLCAndXMnKSkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3NldERldmljZUxvY2FsZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCBjYWxsIHNldERldmljZUxhbmd1YWdlQ291bnRyeSBiZWNhdXNlIG9mIGVtcHR5JywgYXN5bmMoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZUNvdW50cnknKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTG9jYWxlKCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgY2FsbCBzZXREZXZpY2VMYW5ndWFnZUNvdW50cnkgYmVjYXVzZSBvZiBpbnZhbGlkIGZvcm1hdCBubyAtJywgYXN5bmMoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZUNvdW50cnknKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTG9jYWxlKCdqcCcpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IGNhbGwgc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5IGJlY2F1c2Ugb2YgaW52YWxpZCBmb3JtYXQgLycsIGFzeW5jKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5JykubmV2ZXIoKTtcclxuICAgICAgYXdhaXQgYWRiLnNldERldmljZUxvY2FsZSgnZW4vVVMnKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5JywgYXN5bmMoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZUNvdW50cnknKS53aXRoRXhhY3RBcmdzKGxhbmd1YWdlLCBjb3VudHJ5KVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTG9jYWxlKCdlbi1VUycpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzZXREZXZpY2VMYW5ndWFnZUNvdW50cnkgd2l0aCBkZWdpdHMgZm9yIGNvdW50cnknLCBhc3luYygpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxhbmd1YWdlQ291bnRyeScpLndpdGhFeGFjdEFyZ3MobGFuZ3VhZ2UsIGNvdW50cnkgKyBcIjBcIilcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgYXdhaXQgYWRiLnNldERldmljZUxvY2FsZSgnZW4tVVMwJyk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGlmIGxhbmd1YWdlIGFuZCBjb3VudHJ5IGFyZSBub3QgcGFzc2VkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykubmV2ZXIoKTtcclxuICAgICAgYXdhaXQgYWRiLnNldERldmljZUxhbmd1YWdlQ291bnRyeSgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc2V0IGxhbmd1YWdlLCBjb3VudHJ5IGFuZCByZWJvb3QgdGhlIGRldmljZSB3aGVuIEFQSSA8IDIzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKDIyKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXREZXZpY2VMYW5ndWFnZVwiKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyhcImZyXCIpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZUNvdW50cnlcIikud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAub25jZSgpLnJldHVybnMoXCJcIik7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2V0RGV2aWNlTGFuZ3VhZ2VcIikud2l0aEV4YWN0QXJncyhsYW5ndWFnZSlcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzZXREZXZpY2VDb3VudHJ5XCIpLndpdGhFeGFjdEFyZ3MoY291bnRyeSlcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZWJvb3RcIilcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgYXdhaXQgYWRiLnNldERldmljZUxhbmd1YWdlQ291bnRyeShsYW5ndWFnZSwgY291bnRyeSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3Qgc2V0IGxhbmd1YWdlIGFuZCBjb3VudHJ5IGlmIGl0IGRvZXMgbm90IGNoYW5nZSB3aGVuIEFQSSA8IDIzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKDIyKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxhbmd1YWdlJykub25jZSgpLnJldHVybnMoJ2VuJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VDb3VudHJ5Jykub25jZSgpLnJldHVybnMoJ1VTJyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykubmV2ZXIoKTtcclxuICAgICAgYXdhaXQgYWRiLnNldERldmljZUxhbmd1YWdlQ291bnRyeShsYW5ndWFnZS50b0xvd2VyQ2FzZSgpLCBjb3VudHJ5LnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc2V0IGxvY2FsZSB3aGVuIEFQSSBpcyAyMycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucygyMyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RGV2aWNlTG9jYWxlXCIpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKCdmci1GUicpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNldERldmljZVN5c0xvY2FsZVwiKS53aXRoRXhhY3RBcmdzKGxvY2FsZSlcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucygnZnItRlInKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZWJvb3RcIilcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgYXdhaXQgYWRiLnNldERldmljZUxhbmd1YWdlQ291bnRyeShsYW5ndWFnZSwgY291bnRyeSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3Qgc2V0IGxhbmd1YWdlIGFuZCBjb3VudHJ5IGlmIGl0IGRvZXMgbm90IGNoYW5nZSB3aGVuIEFQSSBpcyAyMycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucygyMyk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RGV2aWNlTG9jYWxlXCIpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKGxvY2FsZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VTeXNMb2NhbGUnKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykubmV2ZXIoKTtcclxuICAgICAgYXdhaXQgYWRiLnNldERldmljZUxhbmd1YWdlQ291bnRyeShsYW5ndWFnZSwgY291bnRyeSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIHNldCBsb2NhbGUgdmlhIHNldHRpbmcgYXBwIHdoZW4gQVBJIDI0KycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucygyNCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RGV2aWNlTG9jYWxlXCIpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKCdmci1GUicpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNldERldmljZVN5c0xvY2FsZVZpYVNldHRpbmdBcHBcIikud2l0aEV4YWN0QXJncyhsYW5ndWFnZSwgY291bnRyeSlcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JlYm9vdCcpLm5ldmVyKCk7XHJcbiAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VMYW5ndWFnZUNvdW50cnkobGFuZ3VhZ2UsIGNvdW50cnkpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHNldCBsYW5ndWFnZSBhbmQgY291bnRyeSBpZiBpdCBkb2VzIG5vdCBjaGFuZ2Ugd2hlbiBBUEkgMjQrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKDI0KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXREZXZpY2VMb2NhbGVcIikud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAub25jZSgpLnJldHVybnMobG9jYWxlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzZXREZXZpY2VTeXNMb2NhbGVWaWFTZXR0aW5nQXBwXCIpLm5ldmVyKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdyZWJvb3QnKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5KGxhbmd1YWdlLCBjb3VudHJ5KTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIG5vdCBzZXQgbGFuZ3VhZ2UgYW5kIGNvdW50cnkgaWYgbm8gbGFuZ3VhZ2Ugd2hlbiBBUEkgMjQrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKDI0KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXREZXZpY2VMb2NhbGVcIikud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAub25jZSgpLnJldHVybnMobG9jYWxlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzZXREZXZpY2VTeXNMb2NhbGVWaWFTZXR0aW5nQXBwXCIpLm5ldmVyKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdyZWJvb3QnKS5uZXZlcigpO1xyXG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTGFuZ3VhZ2VDb3VudHJ5KGNvdW50cnkpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHNldCBsYW5ndWFnZSBhbmQgY291bnRyeSBpZiBubyBjb3VudHJ5IHdoZW4gQVBJIDI0KycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucygyNCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RGV2aWNlTG9jYWxlXCIpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKGxvY2FsZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2V0RGV2aWNlU3lzTG9jYWxlVmlhU2V0dGluZ0FwcFwiKS5uZXZlcigpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykubmV2ZXIoKTtcclxuICAgICAgYXdhaXQgYWRiLnNldERldmljZUxhbmd1YWdlQ291bnRyeShsYW5ndWFnZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnZ2V0QXBrSW5mbycsIHdpdGhNb2Nrcyh7YWRiLCB0ZWVuX3Byb2Nlc3MsIGZzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHByb3Blcmx5IHBhcnNlIGFwayBpbmZvJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdleGlzdHMnKS5vbmNlKCkucmV0dXJucyh0cnVlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luaXRBYXB0Jykub25jZSgpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKCdleGVjJykub25jZSgpLnJldHVybnMoe3N0ZG91dDogYHBhY2thZ2U6IG5hbWU9J2lvLmFwcGl1bS5zZXR0aW5ncycgdmVyc2lvbkNvZGU9JzInIHZlcnNpb25OYW1lPScxLjEnIHBsYXRmb3JtQnVpbGRWZXJzaW9uTmFtZT0nNi4wLTIxNjY3NjcnXHJcbiAgICAgIHNka1ZlcnNpb246JzE3J1xyXG4gICAgICB0YXJnZXRTZGtWZXJzaW9uOicyMydcclxuICAgICAgdXNlcy1wZXJtaXNzaW9uOiBuYW1lPSdhbmRyb2lkLnBlcm1pc3Npb24uSU5URVJORVQnXHJcbiAgICAgIHVzZXMtcGVybWlzc2lvbjogbmFtZT0nYW5kcm9pZC5wZXJtaXNzaW9uLkNIQU5HRV9ORVRXT1JLX1NUQVRFJ1xyXG4gICAgICB1c2VzLXBlcm1pc3Npb246IG5hbWU9J2FuZHJvaWQucGVybWlzc2lvbi5BQ0NFU1NfTkVUV09SS19TVEFURSdcclxuICAgICAgdXNlcy1wZXJtaXNzaW9uOiBuYW1lPSdhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9QSE9ORV9TVEFURSdcclxuICAgICAgdXNlcy1wZXJtaXNzaW9uOiBuYW1lPSdhbmRyb2lkLnBlcm1pc3Npb24uV1JJVEVfU0VUVElOR1MnXHJcbiAgICAgIHVzZXMtcGVybWlzc2lvbjogbmFtZT0nYW5kcm9pZC5wZXJtaXNzaW9uLkNIQU5HRV9XSUZJX1NUQVRFJ1xyXG4gICAgICB1c2VzLXBlcm1pc3Npb246IG5hbWU9J2FuZHJvaWQucGVybWlzc2lvbi5BQ0NFU1NfV0lGSV9TVEFURSdcclxuICAgICAgdXNlcy1wZXJtaXNzaW9uOiBuYW1lPSdhbmRyb2lkLnBlcm1pc3Npb24uQUNDRVNTX0ZJTkVfTE9DQVRJT04nXHJcbiAgICAgIHVzZXMtcGVybWlzc2lvbjogbmFtZT0nYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19DT0FSU0VfTE9DQVRJT04nXHJcbiAgICAgIHVzZXMtcGVybWlzc2lvbjogbmFtZT0nYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19NT0NLX0xPQ0FUSU9OJ1xyXG4gICAgICBhcHBsaWNhdGlvbi1sYWJlbDonQXBwaXVtIFNldHRpbmdzJ1xyXG4gICAgICBhcHBsaWNhdGlvbi1pY29uLTEyMDoncmVzL2RyYXdhYmxlLWxkcGktdjQvaWNfbGF1bmNoZXIucG5nJ1xyXG4gICAgICBhcHBsaWNhdGlvbi1pY29uLTE2MDoncmVzL2RyYXdhYmxlLW1kcGktdjQvaWNfbGF1bmNoZXIucG5nJ1xyXG4gICAgICBhcHBsaWNhdGlvbi1pY29uLTI0MDoncmVzL2RyYXdhYmxlLWhkcGktdjQvaWNfbGF1bmNoZXIucG5nJ1xyXG4gICAgICBhcHBsaWNhdGlvbi1pY29uLTMyMDoncmVzL2RyYXdhYmxlLXhoZHBpLXY0L2ljX2xhdW5jaGVyLnBuZydcclxuICAgICAgYXBwbGljYXRpb246IGxhYmVsPSdBcHBpdW0gU2V0dGluZ3MnIGljb249J3Jlcy9kcmF3YWJsZS1tZHBpLXY0L2ljX2xhdW5jaGVyLnBuZydcclxuICAgICAgYXBwbGljYXRpb24tZGVidWdnYWJsZVxyXG4gICAgICBsYXVuY2hhYmxlLWFjdGl2aXR5OiBuYW1lPSdpby5hcHBpdW0uc2V0dGluZ3MuU2V0dGluZ3MnICBsYWJlbD0nQXBwaXVtIFNldHRpbmdzJyBpY29uPScnXHJcbiAgICAgIGZlYXR1cmUtZ3JvdXA6IGxhYmVsPScnXHJcbiAgICAgICAgdXNlcy1mZWF0dXJlOiBuYW1lPSdhbmRyb2lkLmhhcmR3YXJlLndpZmknXHJcbiAgICAgICAgdXNlcy1mZWF0dXJlOiBuYW1lPSdhbmRyb2lkLmhhcmR3YXJlLmxvY2F0aW9uJ1xyXG4gICAgICAgIHVzZXMtaW1wbGllZC1mZWF0dXJlOiBuYW1lPSdhbmRyb2lkLmhhcmR3YXJlLmxvY2F0aW9uJyByZWFzb249J3JlcXVlc3RlZCBhbmRyb2lkLnBlcm1pc3Npb24uQUNDRVNTX0NPQVJTRV9MT0NBVElPTiBwZXJtaXNzaW9uLCByZXF1ZXN0ZWQgYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19GSU5FX0xPQ0FUSU9OIHBlcm1pc3Npb24sIGFuZCByZXF1ZXN0ZWQgYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19NT0NLX0xPQ0FUSU9OIHBlcm1pc3Npb24nXHJcbiAgICAgICAgdXNlcy1mZWF0dXJlOiBuYW1lPSdhbmRyb2lkLmhhcmR3YXJlLmxvY2F0aW9uLmdwcydcclxuICAgICAgICB1c2VzLWltcGxpZWQtZmVhdHVyZTogbmFtZT0nYW5kcm9pZC5oYXJkd2FyZS5sb2NhdGlvbi5ncHMnIHJlYXNvbj0ncmVxdWVzdGVkIGFuZHJvaWQucGVybWlzc2lvbi5BQ0NFU1NfRklORV9MT0NBVElPTiBwZXJtaXNzaW9uJ1xyXG4gICAgICAgIHVzZXMtZmVhdHVyZTogbmFtZT0nYW5kcm9pZC5oYXJkd2FyZS5sb2NhdGlvbi5uZXR3b3JrJ1xyXG4gICAgICAgIHVzZXMtaW1wbGllZC1mZWF0dXJlOiBuYW1lPSdhbmRyb2lkLmhhcmR3YXJlLmxvY2F0aW9uLm5ldHdvcmsnIHJlYXNvbj0ncmVxdWVzdGVkIGFuZHJvaWQucGVybWlzc2lvbi5BQ0NFU1NfQ09BUlNFX0xPQ0FUSU9OIHBlcm1pc3Npb24nXHJcbiAgICAgICAgdXNlcy1mZWF0dXJlOiBuYW1lPSdhbmRyb2lkLmhhcmR3YXJlLnRvdWNoc2NyZWVuJ1xyXG4gICAgICAgIHVzZXMtaW1wbGllZC1mZWF0dXJlOiBuYW1lPSdhbmRyb2lkLmhhcmR3YXJlLnRvdWNoc2NyZWVuJyByZWFzb249J2RlZmF1bHQgZmVhdHVyZSBmb3IgYWxsIGFwcHMnXHJcbiAgICAgIG1haW5cclxuICAgICAgb3RoZXItcmVjZWl2ZXJzXHJcbiAgICAgIG90aGVyLXNlcnZpY2VzXHJcbiAgICAgIHN1cHBvcnRzLXNjcmVlbnM6ICdzbWFsbCcgJ25vcm1hbCcgJ2xhcmdlJyAneGxhcmdlJ1xyXG4gICAgICBzdXBwb3J0cy1hbnktZGVuc2l0eTogJ3RydWUnXHJcbiAgICAgIGxvY2FsZXM6ICctLV8tLSdcclxuICAgICAgZGVuc2l0aWVzOiAnMTIwJyAnMTYwJyAnMjQwJyAnMzIwJ2B9KTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWRiLmdldEFwa0luZm8oJy9zb21lL2ZvbGRlci9wYXRoLmFwaycpO1xyXG4gICAgICBmb3IgKGxldCBbbmFtZSwgdmFsdWVdIG9mIFtbJ25hbWUnLCAnaW8uYXBwaXVtLnNldHRpbmdzJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsndmVyc2lvbkNvZGUnLCAyXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyd2ZXJzaW9uTmFtZScsICcxLjEnXV0pIHtcclxuICAgICAgICByZXN1bHQuc2hvdWxkLmhhdmUucHJvcGVydHkobmFtZSwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ2dldFBhY2thZ2VJbmZvJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgcHJvcGVybHkgcGFyc2UgaW5zdGFsbGVkIHBhY2thZ2UgaW5mbycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25jZSgpLnJldHVybnMoYFBhY2thZ2VzOlxyXG4gICAgICBQYWNrYWdlIFtjb20uZXhhbXBsZS50ZXN0YXBwLmZpcnN0XSAoMjAzNmZkMSk6XHJcbiAgICAgICAgdXNlcklkPTEwMjI1XHJcbiAgICAgICAgcGtnPVBhY2thZ2V7NDJlN2EzNiBjb20uZXhhbXBsZS50ZXN0YXBwLmZpcnN0fVxyXG4gICAgICAgIGNvZGVQYXRoPS9kYXRhL2FwcC9jb20uZXhhbXBsZS50ZXN0YXBwLmZpcnN0LTFcclxuICAgICAgICByZXNvdXJjZVBhdGg9L2RhdGEvYXBwL2NvbS5leGFtcGxlLnRlc3RhcHAuZmlyc3QtMVxyXG4gICAgICAgIGxlZ2FjeU5hdGl2ZUxpYnJhcnlEaXI9L2RhdGEvYXBwL2NvbS5leGFtcGxlLnRlc3RhcHAuZmlyc3QtMS9saWJcclxuICAgICAgICBwcmltYXJ5Q3B1QWJpPW51bGxcclxuICAgICAgICBzZWNvbmRhcnlDcHVBYmk9bnVsbFxyXG4gICAgICAgIHZlcnNpb25Db2RlPTEgbWluU2RrPTIxIHRhcmdldFNkaz0yNFxyXG4gICAgICAgIHZlcnNpb25OYW1lPTEuMFxyXG4gICAgICAgIHNwbGl0cz1bYmFzZV1cclxuICAgICAgICBhcGtTaWduaW5nVmVyc2lvbj0xXHJcbiAgICAgICAgYXBwbGljYXRpb25JbmZvPUFwcGxpY2F0aW9uSW5mb3syOWNiMmE0IGNvbS5leGFtcGxlLnRlc3RhcHAuZmlyc3R9XHJcbiAgICAgICAgZmxhZ3M9WyBIQVNfQ09ERSBBTExPV19DTEVBUl9VU0VSX0RBVEEgQUxMT1dfQkFDS1VQIF1cclxuICAgICAgICBwcml2YXRlRmxhZ3M9WyBSRVNJWkVBQkxFX0FDVElWSVRJRVMgXVxyXG4gICAgICAgIGRhdGFEaXI9L2RhdGEvdXNlci8wL2NvbS5leGFtcGxlLnRlc3RhcHAuZmlyc3RcclxuICAgICAgICBzdXBwb3J0c1NjcmVlbnM9W3NtYWxsLCBtZWRpdW0sIGxhcmdlLCB4bGFyZ2UsIHJlc2l6ZWFibGUsIGFueURlbnNpdHldXHJcbiAgICAgICAgdGltZVN0YW1wPTIwMTYtMTEtMDMgMDE6MTI6MDhcclxuICAgICAgICBmaXJzdEluc3RhbGxUaW1lPTIwMTYtMTEtMDMgMDE6MTI6MDlcclxuICAgICAgICBsYXN0VXBkYXRlVGltZT0yMDE2LTExLTAzIDAxOjEyOjA5XHJcbiAgICAgICAgc2lnbmF0dXJlcz1QYWNrYWdlU2lnbmF0dXJlc3s5ZmUzODBkIFs1M2VhMTA4ZF19XHJcbiAgICAgICAgaW5zdGFsbFBlcm1pc3Npb25zRml4ZWQ9dHJ1ZSBpbnN0YWxsU3RhdHVzPTFcclxuICAgICAgICBwa2dGbGFncz1bIEhBU19DT0RFIEFMTE9XX0NMRUFSX1VTRVJfREFUQSBBTExPV19CQUNLVVAgXVxyXG4gICAgICAgIFVzZXIgMDogY2VEYXRhSW5vZGU9NDc0MzE3IGluc3RhbGxlZD10cnVlIGhpZGRlbj1mYWxzZSBzdXNwZW5kZWQ9ZmFsc2Ugc3RvcHBlZD10cnVlIG5vdExhdW5jaGVkPXRydWUgZW5hYmxlZD0wXHJcbiAgICAgICAgICBydW50aW1lIHBlcm1pc3Npb25zOmApO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhZGIuZ2V0UGFja2FnZUluZm8oJ2NvbS5leGFtcGxlLnRlc3RhcHAuZmlyc3QnKTtcclxuICAgICAgZm9yIChsZXQgW25hbWUsIHZhbHVlXSBvZiBbWyduYW1lJywgJ2NvbS5leGFtcGxlLnRlc3RhcHAuZmlyc3QnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWyd2ZXJzaW9uQ29kZScsIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbJ3ZlcnNpb25OYW1lJywgJzEuMCddXSkge1xyXG4gICAgICAgIHJlc3VsdC5zaG91bGQuaGF2ZS5wcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnaW5zdGFsbE9yVXBncmFkZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBjb25zdCBwa2dJZCA9ICdpby5hcHBpdW0uc2V0dGluZ3MnO1xyXG4gICAgY29uc3QgYXBrUGF0aCA9ICcvcGF0aC90by9teS5hcGsnO1xyXG5cclxuICAgIGl0KCdzaG91bGQgZXhlY3V0ZSBpbnN0YWxsIGlmIHRoZSBwYWNrYWdlIGlzIG5vdCBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBrSW5mbycpLndpdGhFeGFjdEFyZ3MoYXBrUGF0aCkub25jZSgpLnJldHVybnMoe1xyXG4gICAgICAgIG5hbWU6IHBrZ0lkXHJcbiAgICAgIH0pO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNBcHBJbnN0YWxsZWQnKS53aXRoRXhhY3RBcmdzKHBrZ0lkKS5vbmNlKCkucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsJykud2l0aEFyZ3MoYXBrUGF0aCwgZmFsc2UpLm9uY2UoKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBhd2FpdCBhZGIuaW5zdGFsbE9yVXBncmFkZShhcGtQYXRoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBpZiB0aGUgc2FtZSBwYWNrYWdlIHZlcnNpb24gaXMgYWxyZWFkeSBpbnN0YWxsZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGtJbmZvJykud2l0aEV4YWN0QXJncyhhcGtQYXRoKS5vbmNlKCkucmV0dXJucyh7XHJcbiAgICAgICAgdmVyc2lvbkNvZGU6IDFcclxuICAgICAgfSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRQYWNrYWdlSW5mbycpLm9uY2UoKS5yZXR1cm5zKHtcclxuICAgICAgICB2ZXJzaW9uQ29kZTogMVxyXG4gICAgICB9KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzQXBwSW5zdGFsbGVkJykud2l0aEV4YWN0QXJncyhwa2dJZCkub25jZSgpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsT3JVcGdyYWRlKGFwa1BhdGgsIHBrZ0lkKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldHVybiBpZiBuZXdlciBwYWNrYWdlIHZlcnNpb24gaXMgYWxyZWFkeSBpbnN0YWxsZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGtJbmZvJykud2l0aEV4YWN0QXJncyhhcGtQYXRoKS5vbmNlKCkucmV0dXJucyh7XHJcbiAgICAgICAgbmFtZTogcGtnSWQsXHJcbiAgICAgICAgdmVyc2lvbkNvZGU6IDFcclxuICAgICAgfSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRQYWNrYWdlSW5mbycpLm9uY2UoKS5yZXR1cm5zKHtcclxuICAgICAgICB2ZXJzaW9uQ29kZTogMlxyXG4gICAgICB9KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzQXBwSW5zdGFsbGVkJykud2l0aEV4YWN0QXJncyhwa2dJZCkub25jZSgpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsT3JVcGdyYWRlKGFwa1BhdGgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHRocm93IGFuIGVycm9yIGlmIGFwayB2ZXJzaW9uIGNvZGUgY2Fubm90IGJlIHJlYWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGtJbmZvJykud2l0aEV4YWN0QXJncyhhcGtQYXRoKS5vbmNlKCkucmV0dXJucyh7XHJcbiAgICAgICAgbmFtZTogcGtnSWRcclxuICAgICAgfSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRQYWNrYWdlSW5mbycpLm9uY2UoKS5yZXR1cm5zKHtcclxuICAgICAgICB2ZXJzaW9uQ29kZTogMlxyXG4gICAgICB9KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzQXBwSW5zdGFsbGVkJykud2l0aEV4YWN0QXJncyhwa2dJZCkub25jZSgpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsT3JVcGdyYWRlKGFwa1BhdGgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHRocm93IGFuIGVycm9yIGlmIHBrZyB2ZXJzaW9uIGNvZGUgY2Fubm90IGJlIHJlYWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGtJbmZvJykud2l0aEV4YWN0QXJncyhhcGtQYXRoKS5vbmNlKCkucmV0dXJucyh7XHJcbiAgICAgICAgbmFtZTogcGtnSWQsXHJcbiAgICAgICAgdmVyc2lvbkNvZGU6IDFcclxuICAgICAgfSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRQYWNrYWdlSW5mbycpLm9uY2UoKS5yZXR1cm5zKHt9KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzQXBwSW5zdGFsbGVkJykud2l0aEV4YWN0QXJncyhwa2dJZCkub25jZSgpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsT3JVcGdyYWRlKGFwa1BhdGgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgbm90IHRocm93IGFuIGVycm9yIGlmIHBrZyBpZCBjYW5ub3QgYmUgcmVhZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwa0luZm8nKS53aXRoRXhhY3RBcmdzKGFwa1BhdGgpLm9uY2UoKS5yZXR1cm5zKHt9KTtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGxPclVwZ3JhZGUoYXBrUGF0aCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwZXJmb3JtIHVwZ3JhZGUgaWYgb2xkZXIgcGFja2FnZSB2ZXJzaW9uIGlzIGluc3RhbGxlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwa0luZm8nKS53aXRoRXhhY3RBcmdzKGFwa1BhdGgpLm9uY2UoKS5yZXR1cm5zKHtcclxuICAgICAgICBuYW1lOiBwa2dJZCxcclxuICAgICAgICB2ZXJzaW9uQ29kZTogMlxyXG4gICAgICB9KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldFBhY2thZ2VJbmZvJykub25jZSgpLnJldHVybnMoe1xyXG4gICAgICAgIHZlcnNpb25Db2RlOiAxXHJcbiAgICAgIH0pO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNBcHBJbnN0YWxsZWQnKS53aXRoRXhhY3RBcmdzKHBrZ0lkKS5vbmNlKCkucmV0dXJucyh0cnVlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGwnKS53aXRoQXJncyhhcGtQYXRoLCB0cnVlKS5vbmNlKCkucmV0dXJucyh0cnVlKTtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGxPclVwZ3JhZGUoYXBrUGF0aCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB1bmluc3RhbGwgYW5kIHJlLWluc3RhbGwgaWYgb2xkZXIgcGFja2FnZSB2ZXJzaW9uIGlzIGluc3RhbGxlZCBhbmQgdXBncmFkZSBmYWlscycsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwa0luZm8nKS53aXRoRXhhY3RBcmdzKGFwa1BhdGgpLm9uY2UoKS5yZXR1cm5zKHtcclxuICAgICAgICBuYW1lOiBwa2dJZCxcclxuICAgICAgICB2ZXJzaW9uQ29kZTogMlxyXG4gICAgICB9KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldFBhY2thZ2VJbmZvJykub25jZSgpLnJldHVybnMoe1xyXG4gICAgICAgIHZlcnNpb25Db2RlOiAxXHJcbiAgICAgIH0pO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNBcHBJbnN0YWxsZWQnKS53aXRoRXhhY3RBcmdzKHBrZ0lkKS5vbmNlKCkucmV0dXJucyh0cnVlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGwnKS53aXRoQXJncyhhcGtQYXRoLCB0cnVlKS5vbmNlKCkudGhyb3dzKCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCd1bmluc3RhbGxBcGsnKS53aXRoRXhhY3RBcmdzKHBrZ0lkKS5vbmNlKCkucmV0dXJucyh0cnVlKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGwnKS53aXRoQXJncyhhcGtQYXRoLCBmYWxzZSkub25jZSgpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsT3JVcGdyYWRlKGFwa1BhdGgpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIHVwZ3JhZGUgYW5kIHJlaW5zdGFsbCBmYWlsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBrSW5mbycpLndpdGhFeGFjdEFyZ3MoYXBrUGF0aCkub25jZSgpLnJldHVybnMoe1xyXG4gICAgICAgIG5hbWU6IHBrZ0lkLFxyXG4gICAgICAgIHZlcnNpb25Db2RlOiAyXHJcbiAgICAgIH0pO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0UGFja2FnZUluZm8nKS5vbmNlKCkucmV0dXJucyh7XHJcbiAgICAgICAgdmVyc2lvbkNvZGU6IDFcclxuICAgICAgfSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc0FwcEluc3RhbGxlZCcpLndpdGhFeGFjdEFyZ3MocGtnSWQpLm9uY2UoKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygndW5pbnN0YWxsQXBrJykud2l0aEV4YWN0QXJncyhwa2dJZCkub25jZSgpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsJykud2l0aEFyZ3MoYXBrUGF0aCkudHdpY2UoKS50aHJvd3MoKTtcclxuICAgICAgbGV0IGlzRXhjZXB0aW9uVGhyb3duID0gZmFsc2U7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgYWRiLmluc3RhbGxPclVwZ3JhZGUoYXBrUGF0aCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBpc0V4Y2VwdGlvblRocm93biA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgaXNFeGNlcHRpb25UaHJvd24uc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBleGNlcHRpb24gaWYgdXBncmFkZSBhbmQgdW5pbnN0YWxsIGZhaWwnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGtJbmZvJykud2l0aEV4YWN0QXJncyhhcGtQYXRoKS5vbmNlKCkucmV0dXJucyh7XHJcbiAgICAgICAgbmFtZTogcGtnSWQsXHJcbiAgICAgICAgdmVyc2lvbkNvZGU6IDJcclxuICAgICAgfSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRQYWNrYWdlSW5mbycpLm9uY2UoKS5yZXR1cm5zKHtcclxuICAgICAgICB2ZXJzaW9uQ29kZTogMVxyXG4gICAgICB9KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzQXBwSW5zdGFsbGVkJykud2l0aEV4YWN0QXJncyhwa2dJZCkub25jZSgpLnJldHVybnModHJ1ZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCd1bmluc3RhbGxBcGsnKS53aXRoRXhhY3RBcmdzKHBrZ0lkKS5vbmNlKCkucmV0dXJucyhmYWxzZSk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsJykud2l0aEFyZ3MoYXBrUGF0aCwgdHJ1ZSkub25jZSgpLnRocm93cygpO1xyXG4gICAgICBsZXQgaXNFeGNlcHRpb25UaHJvd24gPSBmYWxzZTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBhZGIuaW5zdGFsbE9yVXBncmFkZShhcGtQYXRoKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGlzRXhjZXB0aW9uVGhyb3duID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICBpc0V4Y2VwdGlvblRocm93bi5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
