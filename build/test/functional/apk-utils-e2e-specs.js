'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _libHelpersJs = require('../../lib/helpers.js');

var _asyncbox = require('asyncbox');

var _setup = require('./setup');

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('apk utils', function () {
  var _this = this;

  this.timeout(_setup.MOCHA_TIMEOUT);

  var adb = undefined;
  var contactManagerPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager.apk');
  var deviceTempPath = '/data/local/tmp/';
  var assertPackageAndActivity = function assertPackageAndActivity() {
    var _ref, appPackage, appActivity;

    return _regeneratorRuntime.async(function assertPackageAndActivity$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

        case 2:
          _ref = context$2$0.sent;
          appPackage = _ref.appPackage;
          appActivity = _ref.appActivity;

          appPackage.should.equal('com.example.android.contactmanager');
          appActivity.should.equal('.ContactManager');

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  };

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_2['default'].createADB());

        case 2:
          adb = context$2$0.sent;

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to check status of third party app', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.android.phone'));

        case 2:
          context$2$0.sent.should.be['true'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to install/remove app and detect its status', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('foo'));

        case 2:
          context$2$0.sent.should.be['false'];
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.example.android.contactmanager'));

        case 7:
          context$2$0.sent.should.be['true'];
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.uninstallApk('com.example.android.contactmanager'));

        case 10:
          context$2$0.sent.should.be['true'];
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap(adb.isAppInstalled('com.example.android.contactmanager'));

        case 13:
          context$2$0.sent.should.be['false'];
          context$2$0.next = 16;
          return _regeneratorRuntime.awrap(adb.uninstallApk('com.example.android.contactmanager'));

        case 16:
          context$2$0.sent.should.be['false'];
          context$2$0.next = 19;
          return _regeneratorRuntime.awrap(adb.rimraf(deviceTempPath + 'ContactManager.apk'));

        case 19:
          context$2$0.next = 21;
          return _regeneratorRuntime.awrap(adb.push(contactManagerPath, deviceTempPath));

        case 21:
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(adb.installFromDevicePath(deviceTempPath + 'ContactManager.apk'));

        case 23:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('startUri', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this3 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          it('should be able to start a uri', function callee$2$0() {
            var res;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              var _this2 = this;

              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.goToHome());

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

                case 4:
                  res = context$3$0.sent;

                  res.appPackage.should.not.equal('com.android.contacts');
                  context$3$0.next = 8;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 8:
                  context$3$0.next = 10;
                  return _regeneratorRuntime.awrap(adb.startUri('content://contacts/people', 'com.android.contacts'));

                case 10:
                  context$3$0.next = 12;
                  return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 500, function callee$3$0() {
                    var focusRe1, focusRe2;
                    return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                      while (1) switch (context$4$0.prev = context$4$0.next) {
                        case 0:
                          context$4$0.next = 2;
                          return _regeneratorRuntime.awrap(adb.shell(['dumpsys', 'window', 'windows']));

                        case 2:
                          res = context$4$0.sent;
                          focusRe1 = '(mCurrentFocus.+\\.PeopleActivity)';
                          focusRe2 = '(mFocusedApp.+\\.PeopleActivity)';

                          res.should.match(new RegExp(focusRe1 + '|' + focusRe2));

                        case 6:
                        case 'end':
                          return context$4$0.stop();
                      }
                    }, null, _this2);
                  }));

                case 12:
                  context$3$0.next = 14;
                  return _regeneratorRuntime.awrap(adb.goToHome());

                case 14:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this3);
          });

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('startApp', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this4 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          it('should be able to start', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager' }));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(assertPackageAndActivity());

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should throw error for wrong activity', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManage' }).should.eventually.be.rejectedWith('Activity'));

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should throw error for wrong wait activity', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager',
                    waitActivity: 'foo',
                    waitDuration: 1000 }).should.eventually.be.rejectedWith('foo'));

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should start activity with wait activity', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager',
                    waitActivity: '.ContactManager' }));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(assertPackageAndActivity());

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should start activity when wait activity is a wildcard', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager',
                    waitActivity: '*' }));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(assertPackageAndActivity());

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should start activity when wait activity contains a wildcard', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager',
                    waitActivity: '*.ContactManager' }));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(assertPackageAndActivity());

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should throw error for wrong activity when wait activity contains a wildcard', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'SuperManager',
                    waitActivity: '*.ContactManager' }).should.eventually.be.rejectedWith('Activity'));

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should throw error for wrong wait activity which contains wildcard', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    activity: 'ContactManager',
                    waitActivity: '*.SuperManager' }).should.eventually.be.rejectedWith('SuperManager'));

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should start activity with comma separated wait packages list', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    waitPkg: 'com.android.settings, com.example.android.contactmanager',
                    activity: 'ContactManager',
                    waitActivity: '.ContactManager' }));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(assertPackageAndActivity());

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });
          it('should throw error for wrong activity when packages provided as comma separated list', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
                    waitPkg: 'com.android.settings, com.example.somethingelse',
                    activity: 'SuperManager',
                    waitActivity: '*.ContactManager' }).should.eventually.be.rejectedWith('Activity'));

                case 4:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this4);
          });

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start activity when start activity is an inner class', function callee$1$0() {
    var _ref2, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.android.settings',
            activity: '.Settings$NotificationAppListActivity' }));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

        case 6:
          _ref2 = context$2$0.sent;
          appPackage = _ref2.appPackage;
          appActivity = _ref2.appActivity;

          appPackage.should.equal('com.android.settings');
          appActivity.should.equal('.Settings$NotificationAppListActivity');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getFocusedPackageAndActivity should be able get package and activity', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: 'com.example.android.contactmanager',
            activity: 'ContactManager' }));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(assertPackageAndActivity());

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('extractStringsFromApk should get strings for default language', function callee$1$0() {
    var _ref3, apkStrings;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.extractStringsFromApk(contactManagerPath, null, '/tmp'));

        case 2:
          _ref3 = context$2$0.sent;
          apkStrings = _ref3.apkStrings;

          apkStrings.save.should.equal('Save');

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// depending on apilevel, app might show up as active in one of these
// two dumpsys output formats
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hcGstdXRpbHMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7b0JBQ04sTUFBTTs7Ozs0QkFDQyxzQkFBc0I7O3dCQUNoQixVQUFVOztxQkFDVixTQUFTOztBQUV2QyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWTs7O0FBQ2hDLE1BQUksQ0FBQyxPQUFPLHNCQUFlLENBQUM7O0FBRTVCLE1BQUksR0FBRyxZQUFBLENBQUM7QUFDUixNQUFNLGtCQUFrQixHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUNmLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFFLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDO0FBQzFDLE1BQU0sd0JBQXdCLEdBQUcsU0FBM0Isd0JBQXdCO2NBQ3ZCLFVBQVUsRUFBRSxXQUFXOzs7Ozs7MkNBQVUsR0FBRyxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQW5FLG9CQUFVLFFBQVYsVUFBVTtBQUFFLHFCQUFXLFFBQVgsV0FBVzs7QUFDNUIsb0JBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7QUFDOUQscUJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Ozs7Ozs7R0FDN0MsQ0FBQzs7QUFFRixRQUFNLENBQUM7Ozs7OzJDQUNPLGNBQUksU0FBUyxFQUFFOzs7QUFBM0IsYUFBRzs7Ozs7OztHQUNKLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxtREFBbUQsRUFBRTs7Ozs7MkNBQy9DLEdBQUcsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUM7OzsyQkFBRSxNQUFNLENBQUMsRUFBRTs7Ozs7OztHQUMxRCxDQUFDLENB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QUN0QyxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2Fway11dGlscy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQURCIGZyb20gJy4uLy4uJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IHJvb3REaXIgfSBmcm9tICcuLi8uLi9saWIvaGVscGVycy5qcyc7XHJcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XHJcbmltcG9ydCB7IE1PQ0hBX1RJTUVPVVQgfSBmcm9tICcuL3NldHVwJztcclxuXHJcbmNoYWkuc2hvdWxkKCk7XHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdhcGsgdXRpbHMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy50aW1lb3V0KE1PQ0hBX1RJTUVPVVQpO1xyXG5cclxuICBsZXQgYWRiO1xyXG4gIGNvbnN0IGNvbnRhY3RNYW5hZ2VyUGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsICdDb250YWN0TWFuYWdlci5hcGsnKTtcclxuICBjb25zdCBkZXZpY2VUZW1wUGF0aCA9ICcvZGF0YS9sb2NhbC90bXAvJztcclxuICBjb25zdCBhc3NlcnRQYWNrYWdlQW5kQWN0aXZpdHkgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XHJcbiAgICBhcHBQYWNrYWdlLnNob3VsZC5lcXVhbCgnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicpO1xyXG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKCcuQ29udGFjdE1hbmFnZXInKTtcclxuICB9O1xyXG5cclxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQigpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBjaGVjayBzdGF0dXMgb2YgdGhpcmQgcGFydHkgYXBwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZCgnY29tLmFuZHJvaWQucGhvbmUnKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGluc3RhbGwvcmVtb3ZlIGFwcCBhbmQgZGV0ZWN0IGl0cyBzdGF0dXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAoYXdhaXQgYWRiLmlzQXBwSW5zdGFsbGVkKCdmb28nKSkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgIChhd2FpdCBhZGIuaXNBcHBJbnN0YWxsZWQoJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAoYXdhaXQgYWRiLnVuaW5zdGFsbEFwaygnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicpKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIChhd2FpdCBhZGIuaXNBcHBJbnN0YWxsZWQoJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInKSkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgKGF3YWl0IGFkYi51bmluc3RhbGxBcGsoJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInKSkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgYXdhaXQgYWRiLnJpbXJhZihkZXZpY2VUZW1wUGF0aCArICdDb250YWN0TWFuYWdlci5hcGsnKTtcclxuICAgIGF3YWl0IGFkYi5wdXNoKGNvbnRhY3RNYW5hZ2VyUGF0aCwgZGV2aWNlVGVtcFBhdGgpO1xyXG4gICAgYXdhaXQgYWRiLmluc3RhbGxGcm9tRGV2aWNlUGF0aChkZXZpY2VUZW1wUGF0aCArICdDb250YWN0TWFuYWdlci5hcGsnKTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnc3RhcnRVcmknLCBhc3luYyAoKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc3RhcnQgYSB1cmknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGFkYi5nb1RvSG9tZSgpO1xyXG4gICAgICBsZXQgcmVzID0gYXdhaXQgYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgICAgcmVzLmFwcFBhY2thZ2Uuc2hvdWxkLm5vdC5lcXVhbCgnY29tLmFuZHJvaWQuY29udGFjdHMnKTtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0VXJpKCdjb250ZW50Oi8vY29udGFjdHMvcGVvcGxlJywgJ2NvbS5hbmRyb2lkLmNvbnRhY3RzJyk7XHJcbiAgICAgIGF3YWl0IHJldHJ5SW50ZXJ2YWwoMTAsIDUwMCwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIHJlcyA9IGF3YWl0IGFkYi5zaGVsbChbJ2R1bXBzeXMnLCAnd2luZG93JywgJ3dpbmRvd3MnXSk7XHJcbiAgICAgICAgLy8gZGVwZW5kaW5nIG9uIGFwaWxldmVsLCBhcHAgbWlnaHQgc2hvdyB1cCBhcyBhY3RpdmUgaW4gb25lIG9mIHRoZXNlXHJcbiAgICAgICAgLy8gdHdvIGR1bXBzeXMgb3V0cHV0IGZvcm1hdHNcclxuICAgICAgICBsZXQgZm9jdXNSZTEgPSAnKG1DdXJyZW50Rm9jdXMuK1xcXFwuUGVvcGxlQWN0aXZpdHkpJztcclxuICAgICAgICBsZXQgZm9jdXNSZTIgPSAnKG1Gb2N1c2VkQXBwLitcXFxcLlBlb3BsZUFjdGl2aXR5KSc7XHJcbiAgICAgICAgcmVzLnNob3VsZC5tYXRjaChuZXcgUmVnRXhwKGAke2ZvY3VzUmUxfXwke2ZvY3VzUmUyfWApKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGF3YWl0IGFkYi5nb1RvSG9tZSgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3N0YXJ0QXBwJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHN0YXJ0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBhZGIuaW5zdGFsbChjb250YWN0TWFuYWdlclBhdGgpO1xyXG4gICAgICBhd2FpdCBhZGIuc3RhcnRBcHAoe3BrZzogJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5OiAnQ29udGFjdE1hbmFnZXInfSk7XHJcbiAgICAgIGF3YWl0IGFzc2VydFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmb3Igd3JvbmcgYWN0aXZpdHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsKGNvbnRhY3RNYW5hZ2VyUGF0aCk7XHJcbiAgICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7cGtnOiAnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6ICdDb250YWN0TWFuYWdlJ30pLnNob3VsZC5ldmVudHVhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJlLnJlamVjdGVkV2l0aCgnQWN0aXZpdHknKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmb3Igd3Jvbmcgd2FpdCBhY3Rpdml0eScsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHtwa2c6ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ0NvbnRhY3RNYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0QWN0aXZpdHk6ICdmb28nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXREdXJhdGlvbjogMTAwMH0pLnNob3VsZC5ldmVudHVhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYmUucmVqZWN0ZWRXaXRoKCdmb28nKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzdGFydCBhY3Rpdml0eSB3aXRoIHdhaXQgYWN0aXZpdHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsKGNvbnRhY3RNYW5hZ2VyUGF0aCk7XHJcbiAgICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7cGtnOiAnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6ICdDb250YWN0TWFuYWdlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2FpdEFjdGl2aXR5OiAnLkNvbnRhY3RNYW5hZ2VyJ30pO1xyXG4gICAgICBhd2FpdCBhc3NlcnRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzdGFydCBhY3Rpdml0eSB3aGVuIHdhaXQgYWN0aXZpdHkgaXMgYSB3aWxkY2FyZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHtwa2c6ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ0NvbnRhY3RNYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0QWN0aXZpdHk6ICcqJ30pO1xyXG4gICAgICBhd2FpdCBhc3NlcnRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBzdGFydCBhY3Rpdml0eSB3aGVuIHdhaXQgYWN0aXZpdHkgY29udGFpbnMgYSB3aWxkY2FyZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHtwa2c6ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ0NvbnRhY3RNYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0QWN0aXZpdHk6ICcqLkNvbnRhY3RNYW5hZ2VyJ30pO1xyXG4gICAgICBhd2FpdCBhc3NlcnRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmb3Igd3JvbmcgYWN0aXZpdHkgd2hlbiB3YWl0IGFjdGl2aXR5IGNvbnRhaW5zIGEgd2lsZGNhcmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsKGNvbnRhY3RNYW5hZ2VyUGF0aCk7XHJcbiAgICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7cGtnOiAnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHk6ICdTdXBlck1hbmFnZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRBY3Rpdml0eTogJyouQ29udGFjdE1hbmFnZXInfSkuc2hvdWxkLmV2ZW50dWFsbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJlLnJlamVjdGVkV2l0aCgnQWN0aXZpdHknKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmb3Igd3Jvbmcgd2FpdCBhY3Rpdml0eSB3aGljaCBjb250YWlucyB3aWxkY2FyZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHtwa2c6ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eTogJ0NvbnRhY3RNYW5hZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0QWN0aXZpdHk6ICcqLlN1cGVyTWFuYWdlcid9KS5zaG91bGQuZXZlbnR1YWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmJlLnJlamVjdGVkV2l0aCgnU3VwZXJNYW5hZ2VyJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgc3RhcnQgYWN0aXZpdHkgd2l0aCBjb21tYSBzZXBhcmF0ZWQgd2FpdCBwYWNrYWdlcyBsaXN0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBhZGIuaW5zdGFsbChjb250YWN0TWFuYWdlclBhdGgpO1xyXG4gICAgICBhd2FpdCBhZGIuc3RhcnRBcHAoe3BrZzogJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInLFxyXG4gICAgICAgIHdhaXRQa2c6ICdjb20uYW5kcm9pZC5zZXR0aW5ncywgY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXHJcbiAgICAgICAgYWN0aXZpdHk6ICdDb250YWN0TWFuYWdlcicsXHJcbiAgICAgICAgd2FpdEFjdGl2aXR5OiAnLkNvbnRhY3RNYW5hZ2VyJ30pO1xyXG4gICAgICBhd2FpdCBhc3NlcnRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBmb3Igd3JvbmcgYWN0aXZpdHkgd2hlbiBwYWNrYWdlcyBwcm92aWRlZCBhcyBjb21tYSBzZXBhcmF0ZWQgbGlzdCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHtwa2c6ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcclxuICAgICAgICB3YWl0UGtnOiAnY29tLmFuZHJvaWQuc2V0dGluZ3MsIGNvbS5leGFtcGxlLnNvbWV0aGluZ2Vsc2UnLFxyXG4gICAgICAgIGFjdGl2aXR5OiAnU3VwZXJNYW5hZ2VyJyxcclxuICAgICAgICB3YWl0QWN0aXZpdHk6ICcqLkNvbnRhY3RNYW5hZ2VyJ30pLnNob3VsZC5ldmVudHVhbGx5XHJcbiAgICAgICAgLmJlLnJlamVjdGVkV2l0aCgnQWN0aXZpdHknKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgc3RhcnQgYWN0aXZpdHkgd2hlbiBzdGFydCBhY3Rpdml0eSBpcyBhbiBpbm5lciBjbGFzcycsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGFkYi5pbnN0YWxsKGNvbnRhY3RNYW5hZ2VyUGF0aCk7XHJcbiAgICBhd2FpdCBhZGIuc3RhcnRBcHAoe3BrZzogJ2NvbS5hbmRyb2lkLnNldHRpbmdzJyxcclxuICAgICAgYWN0aXZpdHk6ICcuU2V0dGluZ3MkTm90aWZpY2F0aW9uQXBwTGlzdEFjdGl2aXR5J30pO1xyXG5cclxuICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKCdjb20uYW5kcm9pZC5zZXR0aW5ncycpO1xyXG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKCcuU2V0dGluZ3MkTm90aWZpY2F0aW9uQXBwTGlzdEFjdGl2aXR5Jyk7XHJcbiAgfSk7XHJcbiAgaXQoJ2dldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkgc2hvdWxkIGJlIGFibGUgZ2V0IHBhY2thZ2UgYW5kIGFjdGl2aXR5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgYWRiLmluc3RhbGwoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7cGtnOiAnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5OiAnQ29udGFjdE1hbmFnZXInfSk7XHJcbiAgICBhd2FpdCBhc3NlcnRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICB9KTtcclxuICBpdCgnZXh0cmFjdFN0cmluZ3NGcm9tQXBrIHNob3VsZCBnZXQgc3RyaW5ncyBmb3IgZGVmYXVsdCBsYW5ndWFnZScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCB7YXBrU3RyaW5nc30gPSBhd2FpdCBhZGIuZXh0cmFjdFN0cmluZ3NGcm9tQXBrKGNvbnRhY3RNYW5hZ2VyUGF0aCwgbnVsbCwgJy90bXAnKTtcclxuICAgIGFwa1N0cmluZ3Muc2F2ZS5zaG91bGQuZXF1YWwoJ1NhdmUnKTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
