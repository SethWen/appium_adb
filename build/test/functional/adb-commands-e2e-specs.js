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

var _setup = require('./setup');

var _appiumSupport = require('appium-support');

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);
var expect = _chai2['default'].expect;

// change according to CI
var IME = 'com.example.android.softkeyboard/.SoftKeyboard',
    defaultIMEs = ['com.android.inputmethod.latin/.LatinIME', 'io.appium.android.ime/.UnicodeIME'],
    contactManagerPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager.apk'),
    pkg = 'com.example.android.contactmanager',
    activity = 'ContactManager';

describe('adb commands', function () {
  var _this = this;

  this.timeout(_setup.MOCHA_TIMEOUT);

  var adb = undefined;
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
  it('getApiLevel should get correct api level', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 2:
          context$2$0.t0 = _setup.apiLevel;
          context$2$0.sent.should.equal(context$2$0.t0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getPlatformVersion should get correct platform version', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getPlatformVersion());

        case 2:
          context$2$0.t0 = _setup.platformVersion;
          context$2$0.sent.should.include(context$2$0.t0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('availableIMEs should get list of available IMEs', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.availableIMEs());

        case 2:
          context$2$0.sent.should.have.length.above(0);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('enabledIMEs should get list of enabled IMEs', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.enabledIMEs());

        case 2:
          context$2$0.sent.should.have.length.above(0);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('defaultIME should get default IME', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = defaultIMEs.should;
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.defaultIME());

        case 3:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.include.call(context$2$0.t0, context$2$0.t1);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('enableIME and disableIME should enable and disble IME', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.disableIME(IME));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.enabledIMEs());

        case 4:
          context$2$0.t0 = IME;
          context$2$0.sent.should.not.include(context$2$0.t0);
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.enableIME(IME));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.enabledIMEs());

        case 10:
          context$2$0.t1 = IME;
          context$2$0.sent.should.include(context$2$0.t1);
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(adb.enabledIMEs());

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('processExists should be able to find ui process', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.processExists('com.android.systemui'));

        case 2:
          context$2$0.sent.should.be['true'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('ping should return true', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.ping());

        case 2:
          context$2$0.sent.should.be['true'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getPIDsByName should return pids', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getPIDsByName('m.android.phone'));

        case 2:
          context$2$0.sent.should.have.length.above(0);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('killProcessesByName should kill process', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: pkg, activity: activity }));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.killProcessesByName(pkg));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.getPIDsByName(pkg));

        case 8:
          context$2$0.sent.should.have.length(0);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('killProcessByPID should kill process', function callee$1$0() {
    var pids;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.install(contactManagerPath));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: pkg, activity: activity }));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getPIDsByName(pkg));

        case 6:
          pids = context$2$0.sent;

          pids.should.have.length.above(0);
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.killProcessByPID(pids[0]));

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(adb.getPIDsByName(pkg));

        case 12:
          context$2$0.sent.length.should.equal(0);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get device language and country', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!(parseInt(_setup.apiLevel, 10) >= 23)) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          if (!process.env.TRAVIS) {
            context$2$0.next = 4;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 4:
          context$2$0.t0 = ['en', 'fr'].should;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.getDeviceSysLanguage());

        case 7:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.contain.call(context$2$0.t0, context$2$0.t1);
          context$2$0.t2 = ['US', 'EN_US', 'EN', 'FR'].should;
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(adb.getDeviceSysCountry());

        case 12:
          context$2$0.t3 = context$2$0.sent;
          context$2$0.t2.contain.call(context$2$0.t2, context$2$0.t3);

        case 14:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should set device language and country', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!(parseInt(_setup.apiLevel, 10) >= 23)) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          if (!process.env.TRAVIS) {
            context$2$0.next = 4;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.setDeviceSysLanguage('fr'));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.setDeviceSysCountry('fr'));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.reboot());

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap(adb.getDeviceSysLanguage().should.eventually.equal('fr'));

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(adb.getDeviceSysCountry().should.eventually.equal('FR'));

        case 14:
          context$2$0.next = 16;
          return _regeneratorRuntime.awrap(adb.setDeviceSysLanguage('en'));

        case 16:
          context$2$0.next = 18;
          return _regeneratorRuntime.awrap(adb.setDeviceSysCountry('us'));

        case 18:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should get device locale', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          if (!(parseInt(_setup.apiLevel, 10) < 23)) {
            context$2$0.next = 2;
            break;
          }

          return context$2$0.abrupt('return', this.skip());

        case 2:
          context$2$0.t0 = ['us', 'en', 'ca_en'].should;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.getDeviceLocale());

        case 5:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.contain.call(context$2$0.t0, context$2$0.t1);

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should forward the port', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.forwardPort(4724, 4724));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should remove forwarded port', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.forwardPort(8200, 6790));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.adbExec(['forward', '--list']));

        case 4:
          context$2$0.sent.should.contain('tcp:8200');
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.removePortForward(8200));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.adbExec(['forward', '--list']));

        case 9:
          context$2$0.sent.should.not.contain('tcp:8200');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start logcat from adb', function callee$1$0() {
    var logs;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.startLogcat());

        case 2:
          logs = adb.logcat.getLogs();

          logs.should.have.length.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.stopLogcat());

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get model', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getModel());

        case 2:
          context$2$0.sent.should.not.be['null'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get manufacturer', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getManufacturer());

        case 2:
          context$2$0.sent.should.not.be['null'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get screen size', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getScreenSize());

        case 2:
          context$2$0.sent.should.not.be['null'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get screen density', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getScreenDensity());

        case 2:
          context$2$0.sent.should.not.be['null'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to toggle gps location provider', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.toggleGPSLocationProvider(true));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getLocationProviders());

        case 4:
          context$2$0.sent.should.include('gps');
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.toggleGPSLocationProvider(false));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.getLocationProviders());

        case 9:
          context$2$0.sent.should.not.include('gps');

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to toogle airplane mode', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.setAirplaneMode(true));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.isAirplaneModeOn());

        case 4:
          context$2$0.sent.should.be['true'];
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.setAirplaneMode(false));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.isAirplaneModeOn());

        case 9:
          context$2$0.sent.should.be['false'];

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to toogle wifi @skip-ci', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.retries(3);

          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.setWifiState(true));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.isWifiOn());

        case 5:
          context$2$0.sent.should.be['true'];
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.setWifiState(false));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(adb.isWifiOn());

        case 10:
          context$2$0.sent.should.be['false'];

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('should be able to turn off animation @skip-ci', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.setAnimationState(false));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.isAnimationOn());

        case 4:
          context$2$0.sent.should.be['false'];

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to turn on animation @skip-ci', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.setAnimationState(true));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.isAnimationOn());

        case 4:
          context$2$0.sent.should.be['true'];

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to set device locale via setting app @skip-ci', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.grantPermission('io.appium.settings', 'android.permission.CHANGE_CONFIGURATION'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.setDeviceSysLocaleViaSettingApp('fr', 'fr'));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getDeviceSysLocale());

        case 6:
          context$2$0.sent.should.equal('fr-FR');
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.setDeviceSysLocaleViaSettingApp('en', 'us'));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(adb.getDeviceSysLocale());

        case 11:
          context$2$0.sent.should.equal('en-US');

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('app permissions', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this2 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          before(function callee$2$0() {
            var deviceApiLevel, isInstalled;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.getApiLevel());

                case 2:
                  deviceApiLevel = context$3$0.sent;

                  if (deviceApiLevel < 23) {
                    //test should skip if the device API < 23
                    this.skip();
                  }
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(adb.isAppInstalled('io.appium.android.apis'));

                case 6:
                  isInstalled = context$3$0.sent;

                  if (!isInstalled) {
                    context$3$0.next = 10;
                    break;
                  }

                  context$3$0.next = 10;
                  return _regeneratorRuntime.awrap(adb.uninstallApk('io.appium.android.apis'));

                case 10:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, this);
          });
          it('should install and grant all permission', function callee$2$0() {
            var apiDemos, requestedPermissions;
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  apiDemos = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ApiDemos-debug.apk');
                  context$3$0.next = 3;
                  return _regeneratorRuntime.awrap(adb.install(apiDemos));

                case 3:
                  context$3$0.next = 5;
                  return _regeneratorRuntime.awrap(adb.isAppInstalled('io.appium.android.apis'));

                case 5:
                  context$3$0.sent.should.be['true'];
                  context$3$0.next = 8;
                  return _regeneratorRuntime.awrap(adb.grantAllPermissions('io.appium.android.apis'));

                case 8:
                  context$3$0.next = 10;
                  return _regeneratorRuntime.awrap(adb.getReqPermissions('io.appium.android.apis'));

                case 10:
                  requestedPermissions = context$3$0.sent;
                  context$3$0.next = 13;
                  return _regeneratorRuntime.awrap(adb.getGrantedPermissions('io.appium.android.apis'));

                case 13:
                  context$3$0.t0 = context$3$0.sent;
                  context$3$0.t1 = requestedPermissions;
                  expect(context$3$0.t0).to.have.members(context$3$0.t1);

                case 16:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });
          it('should revoke permission', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.revokePermission('io.appium.android.apis', 'android.permission.RECEIVE_SMS'));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.getGrantedPermissions('io.appium.android.apis'));

                case 4:
                  context$3$0.t0 = context$3$0.sent;
                  context$3$0.t1 = ['android.permission.RECEIVE_SMS'];
                  expect(context$3$0.t0).to.not.have.members(context$3$0.t1);

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });
          it('should grant permission', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(adb.grantPermission('io.appium.android.apis', 'android.permission.RECEIVE_SMS'));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(adb.getGrantedPermissions('io.appium.android.apis'));

                case 4:
                  context$3$0.t0 = context$3$0.sent;
                  context$3$0.t1 = ['android.permission.RECEIVE_SMS'];
                  expect(context$3$0.t0).to.include.members(context$3$0.t1);

                case 7:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  describe('push file', function () {
    function getRandomDir() {
      return '/data/local/tmp/test' + Math.random();
    }

    var localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.tmp' });
    var tempFile = _temp2['default'].path({ prefix: 'appium', suffix: '.tmp' });
    var stringData = 'random string data ' + Math.random();
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap((0, _appiumSupport.mkdirp)(_path2['default'].dirname(localFile)));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap((0, _appiumSupport.mkdirp)(_path2['default'].dirname(tempFile)));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(localFile, stringData));

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

          case 2:
            if (!context$3$0.sent) {
              context$3$0.next = 5;
              break;
            }

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    afterEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(tempFile));

          case 2:
            if (!context$3$0.sent) {
              context$3$0.next = 5;
              break;
            }

            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(tempFile));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should push file to a valid location', function callee$2$0() {
      var remoteFile, remoteData;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            remoteFile = getRandomDir() + '/remote.txt';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.push(localFile, remoteFile));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.pull(remoteFile, tempFile));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(tempFile));

          case 7:
            remoteData = context$3$0.sent;

            remoteData.toString().should.equal(stringData);

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should throw error if it cannot write to the remote file', function callee$2$0() {
      var remoteFile;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            remoteFile = '/foo/bar/remote.txt';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.push(localFile, remoteFile).should.be.rejectedWith(/\/foo\/bar\/remote.txt/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
// eslint-disable-line curly
// eslint-disable-line curly

// eslint-disable-line curly
// eslint-disable-line curly

// cleanup
// eslint-disable-line curly

// Operation not allowed: java.lang.SecurityException: Package io.appium.settings has not requested permission android.permission.CHANGE_CONFIGURATION
// is shown if the setting apk is not updated.

// get the file and its contents, to check
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hZGItY29tbWFuZHMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7b0JBQ04sTUFBTTs7Ozs0QkFDQyxzQkFBc0I7O3FCQUNXLFNBQVM7OzZCQUN2QyxnQkFBZ0I7O29CQUMxQixNQUFNOzs7O0FBR3ZCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7OztBQUd6QixJQUFNLEdBQUcsR0FBRyxnREFBZ0Q7SUFDdEQsV0FBVyxHQUFHLENBQUMseUNBQXlDLEVBQ3pDLG1DQUFtQyxDQUFDO0lBQ25ELGtCQUFrQixHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUNmLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQztJQUNuRSxHQUFHLEdBQUcsb0NBQW9DO0lBQzFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQzs7QUFFbEMsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZOzs7QUFDbkMsTUFBSSxDQUFDLE9BQU8sc0JBQWUsQ0FBQzs7QUFFNUIsTUFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLFFBQU0sQ0FBQzs7Ozs7MkNBQ08sY0FBSSxTQUFTLEVBQUU7OztBQUEzQixhQUFHOzs7Ozs7O0dBQ0osQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDBDQUEwQyxFQUFFOzs7OzsyQ0FDdEMsR0FBRyxDQUFDLFdBQVcsRUFBRTs7OzsyQkFBRSxNQUFNLENBQUMsS0FBSzs7Ozs7OztHQUN2QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsd0RBQXdELEVBQUU7Ozs7OzJDQUNwRCxHQUFHLENBQUMsa0JBQWtCLEVBQUU7Ozs7MkJBQUUsTUFBTSxDQUFDLE9BQU87Ozs7Ozs7R0FDaEQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLGlEQUFpRCxF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QUFDOzs7Ozs7Ozs7NkNBQ3RCLGtCQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7S0FFN0IsQ0FBQyxDQUFDO0FBQ0gsYUFBUyxDQUFDOzs7Ozs2Q0FDRSxrQkFBRyxNQUFNLENBQUMsUUFBUSxDQUFDOzs7Ozs7Ozs7NkNBQ3JCLGtCQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7S0FFNUIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHNDQUFzQyxFQUFFO1VBQ3JDLFVBQVUsRUFNVixVQUFVOzs7O0FBTlYsc0JBQVUsR0FBTSxZQUFZLEVBQUU7OzZDQUU1QixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7Ozs7NkNBRy9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQzs7Ozs2Q0FDYixrQkFBRyxRQUFRLENBQUMsUUFBUSxDQUFDOzs7QUFBeEMsc0JBQVU7O0FBQ2Qsc0JBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7Ozs7O0tBQ2hELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywwREFBMEQsRUFBRTtVQUN6RCxVQUFVOzs7O0FBQVYsc0JBQVUsR0FBRyxxQkFBcUI7OzZDQUVoQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQzs7Ozs7OztLQUN2RixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2FkYi1jb21tYW5kcy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQURCIGZyb20gJy4uLy4uJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IHJvb3REaXIgfSBmcm9tICcuLi8uLi9saWIvaGVscGVycy5qcyc7XHJcbmltcG9ydCB7IGFwaUxldmVsLCBwbGF0Zm9ybVZlcnNpb24sIE1PQ0hBX1RJTUVPVVQgfSBmcm9tICcuL3NldHVwJztcclxuaW1wb3J0IHsgZnMsIG1rZGlycCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IHRlbXAgZnJvbSAndGVtcCc7XHJcblxyXG5cclxuY2hhaS5zaG91bGQoKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5sZXQgZXhwZWN0ID0gY2hhaS5leHBlY3Q7XHJcblxyXG4vLyBjaGFuZ2UgYWNjb3JkaW5nIHRvIENJXHJcbmNvbnN0IElNRSA9ICdjb20uZXhhbXBsZS5hbmRyb2lkLnNvZnRrZXlib2FyZC8uU29mdEtleWJvYXJkJyxcclxuICAgICAgZGVmYXVsdElNRXMgPSBbJ2NvbS5hbmRyb2lkLmlucHV0bWV0aG9kLmxhdGluLy5MYXRpbklNRScsXHJcbiAgICAgICAgICAgICAgICAgICAgICdpby5hcHBpdW0uYW5kcm9pZC5pbWUvLlVuaWNvZGVJTUUnXSxcclxuICAgICAgY29udGFjdE1hbmFnZXJQYXRoID0gcGF0aC5yZXNvbHZlKHJvb3REaXIsICd0ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsICdDb250YWN0TWFuYWdlci5hcGsnKSxcclxuICAgICAgcGtnID0gJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInLFxyXG4gICAgICBhY3Rpdml0eSA9ICdDb250YWN0TWFuYWdlcic7XHJcblxyXG5kZXNjcmliZSgnYWRiIGNvbW1hbmRzJywgZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMudGltZW91dChNT0NIQV9USU1FT1VUKTtcclxuXHJcbiAgbGV0IGFkYjtcclxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQigpO1xyXG4gIH0pO1xyXG4gIGl0KCdnZXRBcGlMZXZlbCBzaG91bGQgZ2V0IGNvcnJlY3QgYXBpIGxldmVsJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpKS5zaG91bGQuZXF1YWwoYXBpTGV2ZWwpO1xyXG4gIH0pO1xyXG4gIGl0KCdnZXRQbGF0Zm9ybVZlcnNpb24gc2hvdWxkIGdldCBjb3JyZWN0IHBsYXRmb3JtIHZlcnNpb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAoYXdhaXQgYWRiLmdldFBsYXRmb3JtVmVyc2lvbigpKS5zaG91bGQuaW5jbHVkZShwbGF0Zm9ybVZlcnNpb24pO1xyXG4gIH0pO1xyXG4gIGl0KCdhdmFpbGFibGVJTUVzIHNob3VsZCBnZXQgbGlzdCBvZiBhdmFpbGFibGUgSU1FcycsIGFzeW5jICgpID0+IHtcclxuICAgIChhd2FpdCBhZGIuYXZhaWxhYmxlSU1FcygpKS5zaG91bGQuaGF2ZS5sZW5ndGguYWJvdmUoMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ2VuYWJsZWRJTUVzIHNob3VsZCBnZXQgbGlzdCBvZiBlbmFibGVkIElNRXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAoYXdhaXQgYWRiLmVuYWJsZWRJTUVzKCkpLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcclxuICB9KTtcclxuICBpdCgnZGVmYXVsdElNRSBzaG91bGQgZ2V0IGRlZmF1bHQgSU1FJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgZGVmYXVsdElNRXMuc2hvdWxkLmluY2x1ZGUoYXdhaXQgYWRiLmRlZmF1bHRJTUUoKSk7XHJcbiAgfSk7XHJcbiAgaXQoJ2VuYWJsZUlNRSBhbmQgZGlzYWJsZUlNRSBzaG91bGQgZW5hYmxlIGFuZCBkaXNibGUgSU1FJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgYWRiLmRpc2FibGVJTUUoSU1FKTtcclxuICAgIChhd2FpdCBhZGIuZW5hYmxlZElNRXMoKSkuc2hvdWxkLm5vdC5pbmNsdWRlKElNRSk7XHJcbiAgICBhd2FpdCBhZGIuZW5hYmxlSU1FKElNRSk7XHJcbiAgICAoYXdhaXQgYWRiLmVuYWJsZWRJTUVzKCkpLnNob3VsZC5pbmNsdWRlKElNRSk7XHJcbiAgICBhd2FpdCBhZGIuZW5hYmxlZElNRXMoKTtcclxuICB9KTtcclxuICBpdCgncHJvY2Vzc0V4aXN0cyBzaG91bGQgYmUgYWJsZSB0byBmaW5kIHVpIHByb2Nlc3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAoYXdhaXQgYWRiLnByb2Nlc3NFeGlzdHMoJ2NvbS5hbmRyb2lkLnN5c3RlbXVpJykpLnNob3VsZC5iZS50cnVlO1xyXG4gIH0pO1xyXG4gIGl0KCdwaW5nIHNob3VsZCByZXR1cm4gdHJ1ZScsIGFzeW5jICgpID0+IHtcclxuICAgIChhd2FpdCBhZGIucGluZygpKS5zaG91bGQuYmUudHJ1ZTtcclxuICB9KTtcclxuICBpdCgnZ2V0UElEc0J5TmFtZSBzaG91bGQgcmV0dXJuIHBpZHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAoYXdhaXQgYWRiLmdldFBJRHNCeU5hbWUoJ20uYW5kcm9pZC5waG9uZScpKS5zaG91bGQuaGF2ZS5sZW5ndGguYWJvdmUoMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ2tpbGxQcm9jZXNzZXNCeU5hbWUgc2hvdWxkIGtpbGwgcHJvY2VzcycsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGFkYi5pbnN0YWxsKGNvbnRhY3RNYW5hZ2VyUGF0aCk7XHJcbiAgICBhd2FpdCBhZGIuc3RhcnRBcHAoe3BrZywgYWN0aXZpdHl9KTtcclxuICAgIGF3YWl0IGFkYi5raWxsUHJvY2Vzc2VzQnlOYW1lKHBrZyk7XHJcbiAgICAoYXdhaXQgYWRiLmdldFBJRHNCeU5hbWUocGtnKSkuc2hvdWxkLmhhdmUubGVuZ3RoKDApO1xyXG4gIH0pO1xyXG4gIGl0KCdraWxsUHJvY2Vzc0J5UElEIHNob3VsZCBraWxsIHByb2Nlc3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBhZGIuaW5zdGFsbChjb250YWN0TWFuYWdlclBhdGgpO1xyXG4gICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHtwa2csIGFjdGl2aXR5fSk7XHJcbiAgICBsZXQgcGlkcyA9IGF3YWl0IGFkYi5nZXRQSURzQnlOYW1lKHBrZyk7XHJcbiAgICBwaWRzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcclxuICAgIGF3YWl0IGFkYi5raWxsUHJvY2Vzc0J5UElEKHBpZHNbMF0pO1xyXG4gICAgKGF3YWl0IGFkYi5nZXRQSURzQnlOYW1lKHBrZykpLmxlbmd0aC5zaG91bGQuZXF1YWwoMCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlIGxhbmd1YWdlIGFuZCBjb3VudHJ5JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHBhcnNlSW50KGFwaUxldmVsLCAxMCkgPj0gMjMpIHJldHVybiB0aGlzLnNraXAoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjdXJseVxyXG4gICAgaWYgKHByb2Nlc3MuZW52LlRSQVZJUykgcmV0dXJuIHRoaXMuc2tpcCgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XHJcblxyXG4gICAgWydlbicsICdmciddLnNob3VsZC5jb250YWluKGF3YWl0IGFkYi5nZXREZXZpY2VTeXNMYW5ndWFnZSgpKTtcclxuICAgIFsnVVMnLCAnRU5fVVMnLCAnRU4nLCAnRlInXS5zaG91bGQuY29udGFpbihhd2FpdCBhZGIuZ2V0RGV2aWNlU3lzQ291bnRyeSgpKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIHNldCBkZXZpY2UgbGFuZ3VhZ2UgYW5kIGNvdW50cnknLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAocGFyc2VJbnQoYXBpTGV2ZWwsIDEwKSA+PSAyMykgcmV0dXJuIHRoaXMuc2tpcCgpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGN1cmx5XHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuVFJBVklTKSByZXR1cm4gdGhpcy5za2lwKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcclxuXHJcbiAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzTGFuZ3VhZ2UoJ2ZyJyk7XHJcbiAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzQ291bnRyeSgnZnInKTtcclxuICAgIGF3YWl0IGFkYi5yZWJvb3QoKTtcclxuICAgIGF3YWl0IGFkYi5nZXREZXZpY2VTeXNMYW5ndWFnZSgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdmcicpO1xyXG4gICAgYXdhaXQgYWRiLmdldERldmljZVN5c0NvdW50cnkoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnRlInKTtcclxuICAgIC8vIGNsZWFudXBcclxuICAgIGF3YWl0IGFkYi5zZXREZXZpY2VTeXNMYW5ndWFnZSgnZW4nKTtcclxuICAgIGF3YWl0IGFkYi5zZXREZXZpY2VTeXNDb3VudHJ5KCd1cycpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZ2V0IGRldmljZSBsb2NhbGUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAocGFyc2VJbnQoYXBpTGV2ZWwsIDEwKSA8IDIzKSByZXR1cm4gdGhpcy5za2lwKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY3VybHlcclxuXHJcbiAgICBbJ3VzJywgJ2VuJywgJ2NhX2VuJ10uc2hvdWxkLmNvbnRhaW4oYXdhaXQgYWRiLmdldERldmljZUxvY2FsZSgpKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGZvcndhcmQgdGhlIHBvcnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBhZGIuZm9yd2FyZFBvcnQoNDcyNCwgNDcyNCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCByZW1vdmUgZm9yd2FyZGVkIHBvcnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBhZGIuZm9yd2FyZFBvcnQoODIwMCwgNjc5MCk7XHJcbiAgICAoYXdhaXQgYWRiLmFkYkV4ZWMoW2Bmb3J3YXJkYCwgYC0tbGlzdGBdKSkuc2hvdWxkLmNvbnRhaW4oJ3RjcDo4MjAwJyk7XHJcbiAgICBhd2FpdCBhZGIucmVtb3ZlUG9ydEZvcndhcmQoODIwMCk7XHJcbiAgICAoYXdhaXQgYWRiLmFkYkV4ZWMoW2Bmb3J3YXJkYCwgYC0tbGlzdGBdKSkuc2hvdWxkLm5vdC5jb250YWluKCd0Y3A6ODIwMCcpO1xyXG5cclxuICB9KTtcclxuICBpdCgnc2hvdWxkIHN0YXJ0IGxvZ2NhdCBmcm9tIGFkYicsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGFkYi5zdGFydExvZ2NhdCgpO1xyXG4gICAgbGV0IGxvZ3MgPSBhZGIubG9nY2F0LmdldExvZ3MoKTtcclxuICAgIGxvZ3Muc2hvdWxkLmhhdmUubGVuZ3RoLmFib3ZlKDApO1xyXG4gICAgYXdhaXQgYWRiLnN0b3BMb2djYXQoKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGdldCBtb2RlbCcsIGFzeW5jICgpID0+IHtcclxuICAgIChhd2FpdCBhZGIuZ2V0TW9kZWwoKSkuc2hvdWxkLm5vdC5iZS5udWxsO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgZ2V0IG1hbnVmYWN0dXJlcicsIGFzeW5jICgpID0+IHtcclxuICAgIChhd2FpdCBhZGIuZ2V0TWFudWZhY3R1cmVyKCkpLnNob3VsZC5ub3QuYmUubnVsbDtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGdldCBzY3JlZW4gc2l6ZScsIGFzeW5jICgpID0+IHtcclxuICAgIChhd2FpdCBhZGIuZ2V0U2NyZWVuU2l6ZSgpKS5zaG91bGQubm90LmJlLm51bGw7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBnZXQgc2NyZWVuIGRlbnNpdHknLCBhc3luYygpID0+IHtcclxuICAgIChhd2FpdCBhZGIuZ2V0U2NyZWVuRGVuc2l0eSgpKS5zaG91bGQubm90LmJlLm51bGw7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHRvZ2dsZSBncHMgbG9jYXRpb24gcHJvdmlkZXInLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBhZGIudG9nZ2xlR1BTTG9jYXRpb25Qcm92aWRlcih0cnVlKTtcclxuICAgIChhd2FpdCBhZGIuZ2V0TG9jYXRpb25Qcm92aWRlcnMoKSkuc2hvdWxkLmluY2x1ZGUoJ2dwcycpO1xyXG4gICAgYXdhaXQgYWRiLnRvZ2dsZUdQU0xvY2F0aW9uUHJvdmlkZXIoZmFsc2UpO1xyXG4gICAgKGF3YWl0IGFkYi5nZXRMb2NhdGlvblByb3ZpZGVycygpKS5zaG91bGQubm90LmluY2x1ZGUoJ2dwcycpO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byB0b29nbGUgYWlycGxhbmUgbW9kZScsIGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGFkYi5zZXRBaXJwbGFuZU1vZGUodHJ1ZSk7XHJcbiAgICAoYXdhaXQgYWRiLmlzQWlycGxhbmVNb2RlT24oKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICBhd2FpdCBhZGIuc2V0QWlycGxhbmVNb2RlKGZhbHNlKTtcclxuICAgIChhd2FpdCBhZGIuaXNBaXJwbGFuZU1vZGVPbigpKS5zaG91bGQuYmUuZmFsc2U7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHRvb2dsZSB3aWZpIEBza2lwLWNpJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5yZXRyaWVzKDMpO1xyXG5cclxuICAgIGF3YWl0IGFkYi5zZXRXaWZpU3RhdGUodHJ1ZSk7XHJcbiAgICAoYXdhaXQgYWRiLmlzV2lmaU9uKCkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgYXdhaXQgYWRiLnNldFdpZmlTdGF0ZShmYWxzZSk7XHJcbiAgICAoYXdhaXQgYWRiLmlzV2lmaU9uKCkpLnNob3VsZC5iZS5mYWxzZTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gdHVybiBvZmYgYW5pbWF0aW9uIEBza2lwLWNpJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgYWRiLnNldEFuaW1hdGlvblN0YXRlKGZhbHNlKTtcclxuICAgIChhd2FpdCBhZGIuaXNBbmltYXRpb25PbigpKS5zaG91bGQuYmUuZmFsc2U7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHR1cm4gb24gYW5pbWF0aW9uIEBza2lwLWNpJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYXdhaXQgYWRiLnNldEFuaW1hdGlvblN0YXRlKHRydWUpO1xyXG4gICAgKGF3YWl0IGFkYi5pc0FuaW1hdGlvbk9uKCkpLnNob3VsZC5iZS50cnVlO1xyXG4gIH0pO1xyXG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZXQgZGV2aWNlIGxvY2FsZSB2aWEgc2V0dGluZyBhcHAgQHNraXAtY2knLCBhc3luYyAoKSA9PiB7XHJcbiAgICAvLyBPcGVyYXRpb24gbm90IGFsbG93ZWQ6IGphdmEubGFuZy5TZWN1cml0eUV4Y2VwdGlvbjogUGFja2FnZSBpby5hcHBpdW0uc2V0dGluZ3MgaGFzIG5vdCByZXF1ZXN0ZWQgcGVybWlzc2lvbiBhbmRyb2lkLnBlcm1pc3Npb24uQ0hBTkdFX0NPTkZJR1VSQVRJT05cclxuICAgIC8vIGlzIHNob3duIGlmIHRoZSBzZXR0aW5nIGFwayBpcyBub3QgdXBkYXRlZC5cclxuICAgIGF3YWl0IGFkYi5ncmFudFBlcm1pc3Npb24oJ2lvLmFwcGl1bS5zZXR0aW5ncycsICdhbmRyb2lkLnBlcm1pc3Npb24uQ0hBTkdFX0NPTkZJR1VSQVRJT04nKTtcclxuXHJcbiAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzTG9jYWxlVmlhU2V0dGluZ0FwcCgnZnInLCAnZnInKTtcclxuICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlU3lzTG9jYWxlKCkpLnNob3VsZC5lcXVhbCgnZnItRlInKTtcclxuXHJcbiAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzTG9jYWxlVmlhU2V0dGluZ0FwcCgnZW4nLCAndXMnKTtcclxuICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlU3lzTG9jYWxlKCkpLnNob3VsZC5lcXVhbCgnZW4tVVMnKTtcclxuICB9KTtcclxuICBkZXNjcmliZSgnYXBwIHBlcm1pc3Npb25zJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGRldmljZUFwaUxldmVsID0gYXdhaXQgYWRiLmdldEFwaUxldmVsKCk7XHJcbiAgICAgIGlmIChkZXZpY2VBcGlMZXZlbCA8IDIzKSB7XHJcbiAgICAgICAgLy90ZXN0IHNob3VsZCBza2lwIGlmIHRoZSBkZXZpY2UgQVBJIDwgMjNcclxuICAgICAgICB0aGlzLnNraXAoKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgaXNJbnN0YWxsZWQgPSBhd2FpdCBhZGIuaXNBcHBJbnN0YWxsZWQoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnKTtcclxuICAgICAgaWYgKGlzSW5zdGFsbGVkKSB7XHJcbiAgICAgICAgYXdhaXQgYWRiLnVuaW5zdGFsbEFwaygnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgaW5zdGFsbCBhbmQgZ3JhbnQgYWxsIHBlcm1pc3Npb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBhcGlEZW1vcyA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsXHJcbiAgICAgICAgICAnZml4dHVyZXMnLCAnQXBpRGVtb3MtZGVidWcuYXBrJyk7XHJcbiAgICAgIGF3YWl0IGFkYi5pbnN0YWxsKGFwaURlbW9zKTtcclxuICAgICAgKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZCgnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycpKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgYXdhaXQgYWRiLmdyYW50QWxsUGVybWlzc2lvbnMoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnKTtcclxuICAgICAgbGV0IHJlcXVlc3RlZFBlcm1pc3Npb25zID0gYXdhaXQgYWRiLmdldFJlcVBlcm1pc3Npb25zKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyk7XHJcbiAgICAgIGV4cGVjdChhd2FpdCBhZGIuZ2V0R3JhbnRlZFBlcm1pc3Npb25zKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJykpLnRvLmhhdmUubWVtYmVycyhyZXF1ZXN0ZWRQZXJtaXNzaW9ucyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV2b2tlIHBlcm1pc3Npb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGFkYi5yZXZva2VQZXJtaXNzaW9uKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgJ2FuZHJvaWQucGVybWlzc2lvbi5SRUNFSVZFX1NNUycpO1xyXG4gICAgICBleHBlY3QoYXdhaXQgYWRiLmdldEdyYW50ZWRQZXJtaXNzaW9ucygnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycpKS50by5ub3QuaGF2ZS5tZW1iZXJzKFsnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQ0VJVkVfU01TJ10pO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdyYW50IHBlcm1pc3Npb24nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGFkYi5ncmFudFBlcm1pc3Npb24oJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLCAnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQ0VJVkVfU01TJyk7XHJcbiAgICAgIGV4cGVjdChhd2FpdCBhZGIuZ2V0R3JhbnRlZFBlcm1pc3Npb25zKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJykpLnRvLmluY2x1ZGUubWVtYmVycyhbJ2FuZHJvaWQucGVybWlzc2lvbi5SRUNFSVZFX1NNUyddKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBkZXNjcmliZSgncHVzaCBmaWxlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gZ2V0UmFuZG9tRGlyICgpIHtcclxuICAgICAgcmV0dXJuIGAvZGF0YS9sb2NhbC90bXAvdGVzdCR7TWF0aC5yYW5kb20oKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsb2NhbEZpbGUgPSB0ZW1wLnBhdGgoe3ByZWZpeDogJ2FwcGl1bScsIHN1ZmZpeDogJy50bXAnfSk7XHJcbiAgICBsZXQgdGVtcEZpbGUgPSB0ZW1wLnBhdGgoe3ByZWZpeDogJ2FwcGl1bScsIHN1ZmZpeDogJy50bXAnfSk7XHJcbiAgICBjb25zdCBzdHJpbmdEYXRhID0gYHJhbmRvbSBzdHJpbmcgZGF0YSAke01hdGgucmFuZG9tKCl9YDtcclxuICAgIGJlZm9yZShhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF3YWl0IG1rZGlycChwYXRoLmRpcm5hbWUobG9jYWxGaWxlKSk7XHJcbiAgICAgIGF3YWl0IG1rZGlycChwYXRoLmRpcm5hbWUodGVtcEZpbGUpKTtcclxuXHJcbiAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShsb2NhbEZpbGUsIHN0cmluZ0RhdGEpO1xyXG4gICAgfSk7XHJcbiAgICBhZnRlcihhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChhd2FpdCBmcy5leGlzdHMobG9jYWxGaWxlKSkge1xyXG4gICAgICAgIGF3YWl0IGZzLnVubGluayhsb2NhbEZpbGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFmdGVyRWFjaChhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChhd2FpdCBmcy5leGlzdHModGVtcEZpbGUpKSB7XHJcbiAgICAgICAgYXdhaXQgZnMudW5saW5rKHRlbXBGaWxlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHB1c2ggZmlsZSB0byBhIHZhbGlkIGxvY2F0aW9uJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgcmVtb3RlRmlsZSA9IGAke2dldFJhbmRvbURpcigpfS9yZW1vdGUudHh0YDtcclxuXHJcbiAgICAgIGF3YWl0IGFkYi5wdXNoKGxvY2FsRmlsZSwgcmVtb3RlRmlsZSk7XHJcblxyXG4gICAgICAvLyBnZXQgdGhlIGZpbGUgYW5kIGl0cyBjb250ZW50cywgdG8gY2hlY2tcclxuICAgICAgYXdhaXQgYWRiLnB1bGwocmVtb3RlRmlsZSwgdGVtcEZpbGUpO1xyXG4gICAgICBsZXQgcmVtb3RlRGF0YSA9IGF3YWl0IGZzLnJlYWRGaWxlKHRlbXBGaWxlKTtcclxuICAgICAgcmVtb3RlRGF0YS50b1N0cmluZygpLnNob3VsZC5lcXVhbChzdHJpbmdEYXRhKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiBpdCBjYW5ub3Qgd3JpdGUgdG8gdGhlIHJlbW90ZSBmaWxlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgcmVtb3RlRmlsZSA9ICcvZm9vL2Jhci9yZW1vdGUudHh0JztcclxuXHJcbiAgICAgIGF3YWl0IGFkYi5wdXNoKGxvY2FsRmlsZSwgcmVtb3RlRmlsZSkuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvXFwvZm9vXFwvYmFyXFwvcmVtb3RlLnR4dC8pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
