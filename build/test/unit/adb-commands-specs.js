'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _libLogcatJs = require('../../lib/logcat.js');

var _libLogcatJs2 = _interopRequireDefault(_libLogcatJs);

var _libLoggerJs = require('../../lib/logger.js');

var _libLoggerJs2 = _interopRequireDefault(_libLoggerJs);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);
var should = _chai2['default'].should();
var apiLevel = 21,
    platformVersion = '4.4.4',
    language = 'en',
    country = 'US',
    locale = 'en-US',
    IME = 'com.android.inputmethod.latin/.LatinIME',
    imeList = 'com.android.inputmethod.latin/.LatinIME:\n  mId=com.android.inputmethod.latin/.LatinIME mSettingsActivityName=com.android\n  mIsDefaultResId=0x7f070000\n  Service:\n    priority=0 preferredOrder=0 match=0x108000 specificIndex=-1 isDefault=false\n    ServiceInfo:\n      name=com.android.inputmethod.latin.LatinIME\n      packageName=com.android.inputmethod.latin\n      labelRes=0x7f0a0037 nonLocalizedLabel=null icon=0x0 banner=0x0\n      enabled=true exported=true processName=com.android.inputmethod.latin\n      permission=android.permission.BIND_INPUT_METHOD\n      flags=0x0',
    psOutput = 'USER     PID   PPID  VSIZE  RSS     WCHAN    PC   NAME\nu0_a101   5078  3129  487404 37044 ffffffff b76ce565 S com.example.android.contactmanager',
    contactManagerPackage = 'com.example.android.contactmanager',
    model = 'Android SDK built for X86_64',
    manufacturer = 'unknown',
    screenSize = '768x1280';

describe('adb commands', function () {
  var adb = new _2['default']();
  var logcat = new _libLogcatJs2['default']({
    adb: adb.executable,
    debug: false,
    debugTrace: false
  });
  describe('shell', function () {
    describe('getApiLevel', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getDeviceProperty").once().withExactArgs('ro.build.version.sdk').returns('' + apiLevel);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getApiLevel());

            case 3:
              context$4$0.t0 = apiLevel;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getPlatformVersion', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getDeviceProperty").once().withExactArgs('ro.build.version.release').returns(platformVersion);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getPlatformVersion());

            case 3:
              context$4$0.t0 = platformVersion;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceSysLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.language']).returns(language);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceSysLanguage());

            case 3:
              context$4$0.t0 = language;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDeviceSysLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.language', language]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDeviceSysLanguage(language));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceSysCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.country']).returns(country);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceSysCountry());

            case 3:
              context$4$0.t0 = country;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getLocationProviders', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and return empty location_providers_allowed', function callee$3$0() {
        var providers;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('secure', 'location_providers_allowed').returns('');
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getLocationProviders());

            case 3:
              providers = context$4$0.sent;

              providers.should.be.an('array');
              providers.length.should.equal(0);
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should return one location_providers_allowed', function callee$3$0() {
        var providers;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('secure', 'location_providers_allowed').returns('gps');
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getLocationProviders());

            case 3:
              providers = context$4$0.sent;

              providers.should.be.an('array');
              providers.length.should.equal(1);
              providers.should.include('gps');
              mocks.adb.verify();

            case 8:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should return both location_providers_allowed', function callee$3$0() {
        var providers;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('secure', 'location_providers_allowed').returns('gps ,wifi');
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getLocationProviders());

            case 3:
              providers = context$4$0.sent;

              providers.should.be.an('array');
              providers.length.should.equal(2);
              providers.should.include('gps');
              providers.should.include('wifi');
              mocks.adb.verify();

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('toggleGPSLocationProvider', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args on gps enabled', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("setSetting").withExactArgs('secure', 'location_providers_allowed', '+gps');
              mocks.adb.expects("setSetting").withExactArgs('secure', 'location_providers_allowed', '-gps');
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.toggleGPSLocationProvider(true));

            case 4:
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.toggleGPSLocationProvider(false));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDeviceSysCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.country', country]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDeviceSysCountry(country));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceSysLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'persist.sys.locale']).returns(locale);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceSysLocale());

            case 3:
              context$4$0.t0 = locale;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDeviceSysLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['setprop', 'persist.sys.locale', locale]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDeviceSysLocale(locale));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceProductLanguage', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale.language']).returns(language);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceProductLanguage());

            case 3:
              context$4$0.t0 = language;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceProductCountry', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale.region']).returns(country);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceProductCountry());

            case 3:
              context$4$0.t0 = country;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getDeviceProductLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.locale']).returns(locale);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getDeviceProductLocale());

            case 3:
              context$4$0.t0 = locale;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDeviceProperty', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call setprop with correct args without root', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getApiLevel").once().returns(21);
              mocks.adb.expects("shell").withExactArgs(['setprop', 'persist.sys.locale', locale]).returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.setDeviceProperty('persist.sys.locale', locale));

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call setprop with correct args with root', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getApiLevel").once().returns(26);
              mocks.adb.expects("root").once().returns("");
              mocks.adb.expects("shell").withExactArgs(['setprop', 'persist.sys.locale', locale]).returns("");
              mocks.adb.expects("unroot").once().returns("");
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.setDeviceProperty('persist.sys.locale', locale));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('availableIMEs', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ime', 'list', '-a']).returns(imeList);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.availableIMEs());

            case 3:
              context$4$0.sent.should.have.length.above(0);

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('enabledIMEs', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ime', 'list']).returns(imeList);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.enabledIMEs());

            case 3:
              context$4$0.sent.should.have.length.above(0);

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('defaultIME', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var defaultIME = 'com.android.inputmethod.latin/.LatinIME';
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('secure', 'default_input_method').returns(defaultIME);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.defaultIME());

            case 3:
              context$4$0.t0 = defaultIME;
              context$4$0.sent.should.equal(context$4$0.t0);

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('disableIME', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ime', 'disable', IME]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.disableIME(IME));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('enableIME', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ime', 'enable', IME]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.enableIME(IME));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('keyevent', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        var keycode, code;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              keycode = '29';
              code = parseInt(keycode, 10);

              mocks.adb.expects("shell").once().withExactArgs(['input', 'keyevent', code]).returns("");
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.keyevent(keycode));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('inputText', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        var text, expectedText;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              text = 'some text with spaces';
              expectedText = 'some%stext%swith%sspaces';

              mocks.adb.expects("shell").once().withExactArgs(['input', 'text', expectedText]).returns("");
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.inputText(text));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('clearTextField', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['input', 'keyevent', '67', '112', '67', '112', '67', '112', '67', '112']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.clearTextField(4));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('lock', (0, _appiumTestSupport.withMocks)({ adb: adb, log: _libLoggerJs2['default'] }, function (mocks) {
      it('should call isScreenLocked, keyevent and errorAndThrow', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isScreenLocked").atLeast(2).returns(false);
              mocks.adb.expects("keyevent").once().withExactArgs(26).returns("");
              mocks.log.expects("errorAndThrow").once().returns("");
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.lock());

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('back', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call keyevent with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("keyevent").once().withExactArgs(4).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.back());

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('goToHome', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call keyevent with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("keyevent").once().withExactArgs(3).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.goToHome());

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe.skip('isScreenLocked', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call keyevent with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("keyevent").once().withExactArgs(3).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.goToHome());

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isSoftKeyboardPresent', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should return false', function callee$3$0() {
        var _ref, isKeyboardShown, canCloseKeyboard;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['dumpsys', 'input_method']).returns("mInputShown=false");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isSoftKeyboardPresent());

            case 3:
              _ref = context$4$0.sent;
              isKeyboardShown = _ref.isKeyboardShown;
              canCloseKeyboard = _ref.canCloseKeyboard;

              canCloseKeyboard.should.be['false'];
              isKeyboardShown.should.be['false'];
              mocks.adb.verify();

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should return true', function callee$3$0() {
        var _ref2, isKeyboardShown, canCloseKeyboard;

        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['dumpsys', 'input_method']).returns("mInputShown=true mIsInputViewShown=true");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isSoftKeyboardPresent());

            case 3:
              _ref2 = context$4$0.sent;
              isKeyboardShown = _ref2.isKeyboardShown;
              canCloseKeyboard = _ref2.canCloseKeyboard;

              isKeyboardShown.should.be['true'];
              canCloseKeyboard.should.be['true'];
              mocks.adb.verify();

            case 9:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isAirplaneModeOn', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should be true', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'airplane_mode_on').returns("1");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isAirplaneModeOn());

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should be false', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'airplane_mode_on').returns("0");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isAirplaneModeOn());

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setAirplaneMode', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("setSetting").once().withExactArgs('global', 'airplane_mode_on', 1).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setAirplaneMode(1));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('broadcastAirplaneMode', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', 'android.intent.action.AIRPLANE_MODE', '--ez', 'state', 'true']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.broadcastAirplaneMode(true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isWifiOn', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should be true', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'wifi_on').returns("1");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isWifiOn());

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should be false', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'wifi_on').returns("0");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isWifiOn());

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setWifiState', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args for real device', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', 'io.appium.settings.wifi', '-n', 'io.appium.settings/.receivers.WiFiConnectionSettingReceiver', '--es', 'setstatus', 'enable']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiState(true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args for emulator', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['svc', 'wifi', 'disable']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiState(false, true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isDataOn', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should be true', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'mobile_data').returns("1");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isDataOn());

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should be false', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'mobile_data').returns("0");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.isDataOn());

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDataState', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args for real device', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', 'io.appium.settings.data_connection', '-n', 'io.appium.settings/.receivers.DataConnectionSettingReceiver', '--es', 'setstatus', 'disable']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDataState(false));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args for emulator', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['svc', 'data', 'enable']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDataState(true, true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setWifiAndData', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args when turning only wifi on for real device', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', 'io.appium.settings.wifi', '-n', 'io.appium.settings/.receivers.WiFiConnectionSettingReceiver', '--es', 'setstatus', 'enable']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ wifi: true }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning only wifi off for emulator', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['svc', 'wifi', 'disable']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ wifi: false }, true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning only data on for emulator', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['svc', 'data', 'enable']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ data: true }, true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning only data off for real device', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', 'io.appium.settings.data_connection', '-n', 'io.appium.settings/.receivers.DataConnectionSettingReceiver', '--es', 'setstatus', 'disable']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ data: false }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning both wifi and data on for real device', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").twice().returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ wifi: true, data: true }));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args when turning both wifi and data off for emulator', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").twice().returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setWifiAndData({ wifi: false, data: false }, true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setAnimationState', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var adbArgs = ['am', 'broadcast', '-a', 'io.appium.settings.animation', '-n', 'io.appium.settings/.receivers.AnimationSettingReceiver', '--es', 'setstatus'];
      it('should call shell with correct args to enable animation', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(adbArgs.concat('enable'));
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setAnimationState(true));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args to disable animation', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(adbArgs.concat('disable'));
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setAnimationState(false));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('isAnimationOn', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var mockSetting = function mockSetting(duration_scale, transition_scale, window_scale) {
        return _regeneratorRuntime.async(function mockSetting$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'animator_duration_scale').returns(duration_scale);
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'transition_animation_scale').returns(transition_scale);
              mocks.adb.expects("getSetting").once().withExactArgs('global', 'window_animation_scale').returns(window_scale);

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, this);
      };
      it('should return false if all animation settings are equal to zero', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(mockSetting("0.0", "0.0", "0.0"));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.isAnimationOn());

            case 4:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should return true if animator_duration_scale setting is NOT equal to zero', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(mockSetting("0.5", "0.0", "0.0"));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.isAnimationOn());

            case 4:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should return true if transition_animation_scale setting is NOT equal to zero', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(mockSetting("0.0", "0.5", "0.0"));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.isAnimationOn());

            case 4:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should return true if window_animation_scale setting is NOT equal to zero', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(mockSetting("0.0", "0.0", "0.5"));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.isAnimationOn());

            case 4:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setDeviceSysLocaleViaSettingApp', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var adbArgs = ['am', 'broadcast', '-a', 'io.appium.settings.locale', '-n', 'io.appium.settings/.receivers.LocaleSettingReceiver', '--es', 'lang', 'en', '--es', 'country', 'US'];
      it('should call shell with locale settings', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(adbArgs);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setDeviceSysLocaleViaSettingApp('en', 'US'));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('setGeoLocation', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var location = { longitude: '50.5',
        latitude: '50.1' };

      it('should call shell with correct args for real device', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['am', 'startservice', '-e', 'longitude', location.longitude, '-e', 'latitude', location.latitude, 'io.appium.settings/.LocationService']).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.setGeoLocation(location));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call adb with correct args for emulator', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("resetTelnetAuthToken").once().returns(true);
              mocks.adb.expects("adbExec").once().withExactArgs(['emu', 'geo', 'fix', location.longitude, location.latitude]).returns("");
              // A workaround for https://code.google.com/p/android/issues/detail?id=206180
              mocks.adb.expects("adbExec").once().withExactArgs(['emu', 'geo', 'fix', location.longitude.replace('.', ','), location.latitude.replace('.', ',')]).returns("");
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.setGeoLocation(location, true));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('processExists', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should find process', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs("ps").returns(psOutput);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.processExists(contactManagerPackage));

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should call shell with correct args and should not find process', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs("ps").returns("foo");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.processExists(contactManagerPackage));

            case 3:
              context$4$0.sent.should.be['false'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('forwardPort', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var sysPort = 12345,
          devicePort = 54321;
      it('forwardPort should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("adbExec").once().withExactArgs(['forward', 'tcp:' + sysPort, 'tcp:' + devicePort]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.forwardPort(sysPort, devicePort));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('forwardAbstractPort should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("adbExec").once().withExactArgs(['forward', 'tcp:' + sysPort, 'localabstract:' + devicePort]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.forwardAbstractPort(sysPort, devicePort));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('removePortForward should call shell with correct args', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("adbExec").once().withExactArgs(['forward', '--remove', 'tcp:' + sysPort]).returns("");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.removePortForward(sysPort, devicePort));

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('ping', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct args and should return true', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(["echo", "ping"]).returns("ping");
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.ping());

            case 3:
              context$4$0.sent.should.be['true'];

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('restart', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call adb in correct order', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("stopLogcat").once().returns("");
              mocks.adb.expects("restartAdb").once().returns("");
              mocks.adb.expects("waitForDevice").once().returns("");
              mocks.adb.expects("startLogcat").once().returns("");
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.restart());

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('stopLogcat', (0, _appiumTestSupport.withMocks)({ logcat: logcat }, function (mocks) {
      it('should call stopCapture', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              adb.logcat = logcat;
              mocks.logcat.expects("stopCapture").once().returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.stopLogcat());

            case 4:
              mocks.logcat.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getLogcatLogs', (0, _appiumTestSupport.withMocks)({ logcat: logcat }, function (mocks) {
      it('should call getLogs', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              adb.logcat = logcat;
              mocks.logcat.expects("getLogs").once().returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.getLogcatLogs());

            case 4:
              mocks.logcat.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('getPIDsByName', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell and parse pids correctly', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['ps']).returns(psOutput);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.getPIDsByName(contactManagerPackage));

            case 3:
              context$4$0.sent[0].should.equal(5078);

              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('killProcessesByName', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call getPIDsByName and kill process correctly', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getPIDsByName").once().withExactArgs(contactManagerPackage).returns([5078]);
              mocks.adb.expects("killProcessByPID").once().withExactArgs(5078).returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.killProcessesByName(contactManagerPackage));

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('killProcessByPID', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      var pid = 5078;

      it('should call kill process correctly', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['kill', '-0', pid]).returns('');
              mocks.adb.expects("shell").withExactArgs(['kill', pid]).onCall(0).returns('');
              mocks.adb.expects("shell").withExactArgs(['kill', pid]).onCall(1).throws();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.killProcessByPID(pid));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should force kill process if normal kill fails', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['kill', '-0', pid]).returns('');
              mocks.adb.expects("shell").atLeast(2).withExactArgs(['kill', pid]).returns('');
              mocks.adb.expects("shell").once().withExactArgs(['kill', '-9', pid]).returns('');
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.killProcessByPID(pid));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should throw an error if a process with given ID does not exist', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("shell").once().withExactArgs(['kill', '-0', pid]).throws();
              adb.killProcessByPID(pid).should.eventually.be.rejected;
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('broadcastProcessEnd', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should broadcast process end', function callee$3$0() {
        var intent, processName;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              intent = 'intent', processName = 'processName';

              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', intent]).returns("");
              mocks.adb.expects("processExists").once().withExactArgs(processName).returns(false);
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.broadcastProcessEnd(intent, processName));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('broadcast', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should broadcast intent', function callee$3$0() {
        var intent;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              intent = 'intent';

              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', intent]).returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.broadcast(intent));

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('instrument', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it('should call shell with correct arguments', function callee$3$0() {
        var intent;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              intent = 'intent';

              mocks.adb.expects("shell").once().withExactArgs(['am', 'broadcast', '-a', intent]).returns("");
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.broadcast(intent));

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe('androidCoverage', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process }, function (mocks) {
      it('should call shell with correct arguments', function callee$3$0() {
        var conn, instrumentClass, waitPkg, waitActivity, args;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              adb.executable.defaultArgs = [];
              adb.executable.path = "dummy_adb_path";
              conn = new _events2['default'].EventEmitter();

              conn.start = function () {}; // do nothing
              instrumentClass = 'instrumentClass', waitPkg = 'waitPkg', waitActivity = 'waitActivity';
              args = adb.executable.defaultArgs.concat(['shell', 'am', 'instrument', '-e', 'coverage', 'true', '-w']).concat([instrumentClass]);

              mocks.teen_process.expects("SubProcess").once().withExactArgs('dummy_adb_path', args).returns(conn);
              mocks.adb.expects("waitForActivity").once().withExactArgs(waitPkg, waitActivity).returns("");
              context$4$0.next = 10;
              return _regeneratorRuntime.awrap(adb.androidCoverage(instrumentClass, waitPkg, waitActivity));

            case 10:
              mocks.teen_process.verify();
              mocks.adb.verify();

            case 12:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
  });
  describe('device info', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should get device model', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.model']).returns(model);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getModel());

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get device manufacturer', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['getprop', 'ro.product.manufacturer']).returns(manufacturer);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getManufacturer());

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get device screen size', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['wm', 'size']).returns(screenSize);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getScreenSize());

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get device screen density', function callee$2$0() {
      var density;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['wm', 'density']).returns("Physical density: 420");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getScreenDensity());

          case 3:
            density = context$3$0.sent;

            density.should.equal(420);
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return null for invalid screen density', function callee$2$0() {
      var density;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withExactArgs(['wm', 'density']).returns("Physical density: unknown");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getScreenDensity());

          case 3:
            density = context$3$0.sent;

            should.equal(density, null);
            mocks.adb.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('app permission', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    var dumpedOutput = '\n          declared permissions:\n            com.xxx.permission.C2D_MESSAGE: prot=signature, INSTALLED\n            com.xxx.permission.C2D_MESSAGE: prot=signature\n          requested permissions:\n            android.permission.ACCESS_NETWORK_STATE\n            android.permission.WRITE_EXTERNAL_STORAGE\n            android.permission.INTERNET\n            android.permission.READ_CONTACTS\n            android.permission.RECORD_AUDIO\n            android.permission.VIBRATE\n            android.permission.CAMERA\n            android.permission.FLASHLIGHT\n            android.permission.READ_PHONE_STATE\n            android.permission.MODIFY_AUDIO_SETTINGS\n            android.permission.BLUETOOTH\n            android.permission.WAKE_LOCK\n            com.google.android.c2dm.permission.RECEIVE\n            com.xxx.permission.C2D_MESSAGE\n            android.permission.ACCESS_FINE_LOCATION\n            android.permission.READ_EXTERNAL_STORAGE\n            android.permission.RECEIVE_BOOT_COMPLETED\n            .permission.C2D_MESSAGE\n          install permissions:\n            com.google.android.c2dm.permission.RECEIVE: granted=true\n            android.permission.MODIFY_AUDIO_SETTINGS: granted=true\n            android.permission.RECEIVE_BOOT_COMPLETED: granted=true\n            android.permission.BLUETOOTH: granted=true\n            android.permission.INTERNET: granted=true\n            com.xxx.permission.C2D_MESSAGE: granted=true\n            android.permission.FLASHLIGHT: granted=true\n            android.permission.ACCESS_NETWORK_STATE: granted=true\n            android.permission.VIBRATE: granted=true\n            android.permission.WAKE_LOCK: granted=true\n          User 0: ceDataInode=1504712 installed=true hidden=false suspended=false stopped=false notLaunched=false enabled=0\n            gids=[3002, 3003]\n            runtime permissions:\n              android.permission.ACCESS_FINE_LOCATION: granted=true\n              android.permission.READ_EXTERNAL_STORAGE: granted=true\n              android.permission.READ_PHONE_STATE: granted=true\n              android.permission.CAMERA: granted=false, flags=[ USER_SET ]\n              android.permission.WRITE_EXTERNAL_STORAGE: granted=true\n              android.permission.RECORD_AUDIO: granted=true\n              android.permission.READ_CONTACTS: granted=false, flags=[ USER_SET ]\n\n\n      Dexopt state:\n        [com.xxx]\n          Instruction Set: arm\n            path: /data/app/com.xxx-1/base.apk\n            status: /data/app/com.xxxa-1/oat/arm/base.odex [compilation_filter=interpret-only, status=kOatUpToDate]\n\n\n      Compiler stats:\n        [com.xxx]\n           base.apk - 8264\n\n    DUMP OF SERVICE activity:\n      ACTIVITY MANAGER PENDING INTENTS (dumpsys activity intents)\n        (nothing)';

    it('should grant requested permission', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withArgs(['pm', 'grant', 'io.appium.android.apis', 'android.permission.READ_EXTERNAL_STORAGE']);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.grantPermission('io.appium.android.apis', 'android.permission.READ_EXTERNAL_STORAGE'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should revoke requested permission', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().withArgs(['pm', 'revoke', 'io.appium.android.apis', 'android.permission.READ_EXTERNAL_STORAGE']);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.revokePermission('io.appium.android.apis', 'android.permission.READ_EXTERNAL_STORAGE'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should properly list requested permissions', function callee$2$0() {
      var result, _arr, _i, perm;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().returns(dumpedOutput);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getReqPermissions('io.appium.android'));

          case 3:
            result = context$3$0.sent;
            _arr = ['android.permission.ACCESS_NETWORK_STATE', 'android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.INTERNET', 'android.permission.READ_CONTACTS', 'android.permission.RECORD_AUDIO', 'android.permission.VIBRATE', 'android.permission.CAMERA', 'android.permission.FLASHLIGHT', 'android.permission.READ_PHONE_STATE', 'android.permission.MODIFY_AUDIO_SETTINGS', 'android.permission.BLUETOOTH', 'android.permission.WAKE_LOCK', 'android.permission.ACCESS_FINE_LOCATION', 'android.permission.READ_EXTERNAL_STORAGE', 'android.permission.RECEIVE_BOOT_COMPLETED'];

            for (_i = 0; _i < _arr.length; _i++) {
              perm = _arr[_i];

              result.should.include(perm);
            }

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should properly list granted permissions', function callee$2$0() {
      var result, _arr2, _i2, perm, _arr3, _i3;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().returns(dumpedOutput);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getGrantedPermissions('io.appium.android'));

          case 3:
            result = context$3$0.sent;
            _arr2 = ['android.permission.MODIFY_AUDIO_SETTINGS', 'android.permission.RECEIVE_BOOT_COMPLETED', 'android.permission.BLUETOOTH', 'android.permission.INTERNET', 'android.permission.FLASHLIGHT', 'android.permission.ACCESS_NETWORK_STATE', 'android.permission.VIBRATE', 'android.permission.WAKE_LOCK', 'android.permission.ACCESS_FINE_LOCATION', 'android.permission.READ_EXTERNAL_STORAGE', 'android.permission.READ_PHONE_STATE', 'android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.RECORD_AUDIO'];

            for (_i2 = 0; _i2 < _arr2.length; _i2++) {
              perm = _arr2[_i2];

              result.should.include(perm);
            }
            _arr3 = ['android.permission.READ_CONTACTS', 'android.permission.CAMERA'];
            for (_i3 = 0; _i3 < _arr3.length; _i3++) {
              perm = _arr3[_i3];

              result.should.not.include(perm);
            }

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should properly list denied permissions', function callee$2$0() {
      var result, _arr4, _i4, perm, _arr5, _i5;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects("shell").once().returns(dumpedOutput);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getDeniedPermissions('io.appium.android'));

          case 3:
            result = context$3$0.sent;
            _arr4 = ['android.permission.MODIFY_AUDIO_SETTINGS', 'android.permission.RECEIVE_BOOT_COMPLETED', 'android.permission.BLUETOOTH', 'android.permission.INTERNET', 'android.permission.FLASHLIGHT', 'android.permission.ACCESS_NETWORK_STATE', 'android.permission.VIBRATE', 'android.permission.WAKE_LOCK', 'android.permission.ACCESS_FINE_LOCATION', 'android.permission.READ_EXTERNAL_STORAGE', 'android.permission.READ_PHONE_STATE', 'android.permission.WRITE_EXTERNAL_STORAGE', 'android.permission.RECORD_AUDIO'];

            for (_i4 = 0; _i4 < _arr4.length; _i4++) {
              perm = _arr4[_i4];

              result.should.not.include(perm);
            }
            _arr5 = ['android.permission.READ_CONTACTS', 'android.permission.CAMERA'];
            for (_i5 = 0; _i5 < _arr5.length; _i5++) {
              perm = _arr5[_i5];

              result.should.include(perm);
            }

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('sendTelnetCommand', (0, _appiumTestSupport.withMocks)({ adb: adb, net: _net2['default'] }, function (mocks) {
    it('should call shell with correct args', function callee$2$0() {
      var port, conn, commands, p;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            port = 54321;
            conn = new _events2['default'].EventEmitter();
            commands = [];

            conn.write = function (command) {
              commands.push(command);
            };
            mocks.adb.expects("getEmulatorPort").once().withExactArgs().returns(port);
            mocks.net.expects("createConnection").once().withExactArgs(port, 'localhost').returns(conn);
            p = adb.sendTelnetCommand('avd name');

            setTimeout(function () {
              conn.emit('connect');
              conn.emit('data', 'OK');
              conn.emit('data', 'OK');
              conn.emit('close');
            }, 0);
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(p);

          case 10:
            commands[0].should.equal("avd name\n");
            commands[1].should.equal("quit\n");
            mocks.adb.verify();
            mocks.net.verify();

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return the last line of the output only', function callee$2$0() {
      var port, conn, commands, expected, p, actual;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            port = 54321;
            conn = new _events2['default'].EventEmitter();
            commands = [];
            expected = "desired_command_output";

            conn.write = function (command) {
              commands.push(command);
            };
            mocks.adb.expects("getEmulatorPort").once().withExactArgs().returns(port);
            mocks.net.expects("createConnection").once().withExactArgs(port, 'localhost').returns(conn);
            p = adb.sendTelnetCommand('avd name');

            setTimeout(function () {
              conn.emit('connect');
              conn.emit('data', 'OK');
              conn.emit('data', 'OK\nunwanted_echo_output\n' + expected);
              conn.emit('close');
            }, 0);
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(p);

          case 11:
            actual = context$3$0.sent;

            actual.should.equal(expected);

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if network connection errors', function callee$2$0() {
      var port, conn, commands, expected, p;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            port = 54321;
            conn = new _events2['default'].EventEmitter();
            commands = [];
            expected = "desired_command_output";

            conn.write = function (command) {
              commands.push(command);
            };
            mocks.adb.expects("getEmulatorPort").once().withExactArgs().returns(port);
            mocks.net.expects("createConnection").once().withExactArgs(port, 'localhost').returns(conn);
            p = adb.sendTelnetCommand('avd name');

            setTimeout(function () {
              conn.emit('connect');
              conn.emit('data', 'OK');
              conn.emit('data', 'OK\nunwanted_echo_output\n' + expected);
              conn.emit('error', new Error('ouch!'));
            }, 0);
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(p.should.eventually.be.rejectedWith(/ouch/));

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  it('isValidClass should correctly validate class names', function () {
    adb.isValidClass('some.package/some.package.Activity').index.should.equal(0);
    should.not.exist(adb.isValidClass('illegalPackage#/adsasd'));
  });
  it('getAdbPath should correctly return adbPath', function () {
    adb.getAdbPath().should.equal(adb.executable.path);
  });
  describe('setHttpProxy', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should throw an error on undefined proxy_host', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.setHttpProxy().should.eventually.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error on undefined proxy_port', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.setHttpProxy("http://localhost").should.eventually.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should call setSetting method with correct args', function callee$2$0() {
      var proxyHost, proxyPort;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            proxyHost = "http://localhost";
            proxyPort = 4723;

            mocks.adb.expects('setSetting').once().withExactArgs('global', 'http_proxy', proxyHost + ':' + proxyPort);
            mocks.adb.expects('setSetting').once().withExactArgs('secure', 'http_proxy', proxyHost + ':' + proxyPort);
            mocks.adb.expects('setSetting').once().withExactArgs('system', 'http_proxy', proxyHost + ':' + proxyPort);
            mocks.adb.expects('setSetting').once().withExactArgs('system', 'global_http_proxy_host', proxyHost);
            mocks.adb.expects('setSetting').once().withExactArgs('system', 'global_http_proxy_port', proxyPort);
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(adb.setHttpProxy(proxyHost, proxyPort));

          case 9:
            mocks.adb.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('setSetting', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell settings put', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['settings', 'put', 'namespace', 'setting', 'value']);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.setSetting('namespace', 'setting', 'value'));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getSetting', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should call shell settings get', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('shell').once().withExactArgs(['settings', 'get', 'namespace', 'setting']).returns('value');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.getSetting('namespace', 'setting'));

          case 3:
            context$3$0.sent.should.be.equal('value');

            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hZGItY29tbWFuZHMtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7bUJBQ1AsS0FBSzs7OztzQkFDRixRQUFROzs7OzJCQUNSLHFCQUFxQjs7OzsyQkFDeEIscUJBQXFCOzs7OzRCQUNQLGNBQWM7O0lBQWhDLFlBQVk7O2lDQUNFLHFCQUFxQjs7QUFHL0Msa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUM3QixJQUFNLFFBQVEsR0FBRyxFQUFFO0lBQ2IsZUFBZSxHQUFHLE9BQU87SUFDekIsUUFBUSxHQUFHLElBQUk7SUFDZixPQUFPLEdBQUcsSUFBSTtJQUNkLE1BQU0sR0FBRyxPQUFPO0lBQ2hCLEdBQUcsR0FBRyx5Q0FBeUM7SUFDL0MsT0FBTyx5a0JBV0c7SUFDVixRQUFRLHNKQUM0RTtJQUNwRixxQkFBcUIsR0FBRyxvQ0FBb0M7SUFDNUQsS0FBSyxpQ0FBaUM7SUFDdEMsWUFBWSxZQUFZO0lBQ3hCLFVBQVUsYUFBYSxDQUFDOztBQUU5QixRQUFRLENBQUMsY0FBYyxFQUFFLFlBQU07QUFDN0IsTUFBSSxHQUFHLEdBQUcsbUJBQVMsQ0FBQztBQUNwQixNQUFJLE1BQU0sR0FBRyw2QkFBVztBQUN0QixPQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVU7QUFDbkIsU0FBSyxFQUFFLEtBQUs7QUFDWixjQUFVLEVBQUUsS0FBSztHQUNsQixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDdEIsWUFBUSxDQUFDLGFBQWEsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNsRCxRQUFFLENBQUMscUNBQXFDLEVBQUU7Ozs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQ25DLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUM1QyxPQUFPLE1BQUksUUFBUSxDQUFHLENBQUM7OytDQUNuQixHQUFHLENBQUMsV0FBVyxFQUFFOzs7K0JBQWUsUUFBUTsrQkFBckIsTUFBTSxDQUFDLEtBQUs7O0FBQ3RDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLG9CQUFvQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3pELFFBQUUsQ0FBQyxxQ0FBcUMsRUFBRTs7OztBQUN4QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FDbkMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQ2hELE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzs7K0NBQ3JCLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTs7OytCQUFlLGVBQWU7K0JBQTVCLE1BQU0sQ0FBQyxLQUFLOztBQUM3QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxzQkFBc0IsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUMzRCxRQUFFLENBQUMscUNBQXFDLEVBQUU7Ozs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxDQUN6RCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7OytDQUNkLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTs7OytCQUFlLFFBQVE7K0JBQXJCLE1BQU0sQ0FBQyxLQUFLOztBQUMvQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxzQkFBc0IsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUMzRCxRQUFFLENBQUMscUNBQXFDLEVBQUU7Ozs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FDbkUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDOzs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMscUJBQXFCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDMUQsUUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUMsQ0FDeEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzsrQ0FDYixHQUFHLENBQUMsbUJBQW1CLEVBQUU7OzsrQkFBZSxPQUFPOytCQUFwQixNQUFNLENBQUMsS0FBSzs7QUFDOUMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsc0JBQXNCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDM0QsUUFBRSxDQUFDLGlGQUFpRixFQUFFO1lBSWhGLFNBQVM7Ozs7QUFIYixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQzVCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsQ0FDNUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDTyxHQUFHLENBQUMsb0JBQW9CLEVBQUU7OztBQUE1Qyx1QkFBUzs7QUFDYix1QkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLHVCQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLDhDQUE4QyxFQUFFO1lBSTdDLFNBQVM7Ozs7QUFIYixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQzVCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsQ0FDNUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzsrQ0FDSSxHQUFHLENBQUMsb0JBQW9CLEVBQUU7OztBQUE1Qyx1QkFBUzs7QUFDYix1QkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLHVCQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsdUJBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQywrQ0FBK0MsRUFBRTtZQUk5QyxTQUFTOzs7O0FBSGIsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUM1QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLDRCQUE0QixDQUFDLENBQzVELE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQzs7K0NBQ0YsR0FBRyxDQUFDLG9CQUFvQixFQUFFOzs7QUFBNUMsdUJBQVM7O0FBQ2IsdUJBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyx1QkFBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLHVCQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyx1QkFBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDakMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsMkJBQTJCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDaEUsUUFBRSxDQUFDLG9EQUFvRCxFQUFFOzs7O0FBQ3ZELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FDNUIsYUFBYSxDQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNqRSxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQzVCLGFBQWEsQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLENBQUM7OytDQUMzRCxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDOzs7OytDQUNuQyxHQUFHLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDOzs7QUFDMUMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMscUJBQXFCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDMUQsUUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQ2pFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQzs7O0FBQ3RDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLG9CQUFvQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3pELFFBQUUsQ0FBQyxxQ0FBcUMsRUFBRTs7OztBQUN4QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQ3ZELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7K0NBQ1osR0FBRyxDQUFDLGtCQUFrQixFQUFFOzs7K0JBQWUsTUFBTTsrQkFBbkIsTUFBTSxDQUFDLEtBQUs7O0FBQzdDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLG9CQUFvQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3pELFFBQUUsQ0FBQyxxQ0FBcUMsRUFBRTs7OztBQUN4QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUMvRCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7OztBQUNwQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQywwQkFBMEIsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUMvRCxRQUFFLENBQUMscUNBQXFDLEVBQUU7Ozs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUMvRCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7OytDQUNkLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRTs7OytCQUFlLFFBQVE7K0JBQXJCLE1BQU0sQ0FBQyxLQUFLOztBQUNuRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyx5QkFBeUIsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUM5RCxRQUFFLENBQUMscUNBQXFDLEVBQUU7Ozs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyxDQUM3RCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7OytDQUNiLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRTs7OytCQUFlLE9BQU87K0JBQXBCLE1BQU0sQ0FBQyxLQUFLOztBQUNsRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyx3QkFBd0IsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUM3RCxRQUFFLENBQUMscUNBQXFDLEVBQUU7Ozs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUN0RCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7OytDQUNaLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRTs7OytCQUFlLE1BQU07K0JBQW5CLE1BQU0sQ0FBQyxLQUFLOztBQUNqRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxtQkFBbUIsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN4RCxRQUFFLENBQUMsb0RBQW9ELEVBQUU7Ozs7QUFDdkQsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUM3QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEIsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDeEQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsaUJBQWlCLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDOzs7QUFDekQsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGlEQUFpRCxFQUFFOzs7O0FBQ3BELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FDN0IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDdEIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQ3hELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNmLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FDeEIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDaEIsR0FBRyxDQUFDLGlCQUFpQixDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQzs7O0FBQ3pELG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGVBQWUsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNwRCxRQUFFLENBQUMscUNBQXFDLEVBQUU7Ozs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQzNDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7K0NBQ2IsR0FBRyxDQUFDLGFBQWEsRUFBRTs7OytCQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUN0RCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxhQUFhLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDbEQsUUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7K0NBQ2IsR0FBRyxDQUFDLFdBQVcsRUFBRTs7OytCQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUNwRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxZQUFZLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDakQsVUFBSSxVQUFVLEdBQUcseUNBQXlDLENBQUM7QUFDM0QsUUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FDNUIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQyxDQUN0RCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7OytDQUNoQixHQUFHLENBQUMsVUFBVSxFQUFFOzs7K0JBQWUsVUFBVTsrQkFBdkIsTUFBTSxDQUFDLEtBQUs7O0FBQ3JDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLFlBQVksRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNqRCxRQUFFLENBQUMscUNBQXFDLEVBQUU7Ozs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQzdDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7OztBQUN6QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxXQUFXLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDaEQsUUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUM1QyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDOzs7QUFDeEIsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsVUFBVSxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQy9DLFFBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtZQUNwQyxPQUFPLEVBQ1AsSUFBSTs7OztBQURKLHFCQUFPLEdBQUcsSUFBSTtBQUNkLGtCQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7O0FBQ2hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUNqRCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDOzs7QUFDM0IsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsV0FBVyxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ2hELFFBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtZQUNwQyxJQUFJLEVBQ0osWUFBWTs7OztBQURaLGtCQUFJLEdBQUcsdUJBQXVCO0FBQzlCLDBCQUFZLEdBQUcsMEJBQTBCOztBQUM3QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FDckQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7O0FBQ3pCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGdCQUFnQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3JELFFBQUUsQ0FBQyxxQ0FBcUMsRUFBRTs7OztBQUN4QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQy9GLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OztBQUMzQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxNQUFNLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLEdBQUcsMEJBQUEsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ2hELFFBQUUsQ0FBQyx3REFBd0QsRUFBRTs7OztBQUMzRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FDeEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUMvQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNoQixHQUFHLENBQUMsSUFBSSxFQUFFOzs7QUFDaEIsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsTUFBTSxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzNDLFFBQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7OztBQUMzQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FDdkIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsSUFBSSxFQUFFOzs7QUFDaEIsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsVUFBVSxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQy9DLFFBQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7OztBQUMzQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FDdkIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsUUFBUSxFQUFFOzs7QUFDcEIsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzFELFFBQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7OztBQUMzQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQzFCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FDdkIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsUUFBUSxFQUFFOzs7QUFDcEIsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsdUJBQXVCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDNUQsUUFBRSxDQUFDLDZEQUE2RCxFQUFFO2tCQUkzRCxlQUFlLEVBQUUsZ0JBQWdCOzs7OztBQUh0QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUNqRCxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7K0NBQ2dCLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRTs7OztBQUF0RSw2QkFBZSxRQUFmLGVBQWU7QUFBRSw4QkFBZ0IsUUFBaEIsZ0JBQWdCOztBQUN0Qyw4QkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFNLENBQUM7QUFDakMsNkJBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFNLENBQUM7QUFDaEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLDREQUE0RCxFQUFFO21CQUkxRCxlQUFlLEVBQUUsZ0JBQWdCOzs7OztBQUh0QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUNqRCxPQUFPLENBQUMseUNBQXlDLENBQUMsQ0FBQzs7K0NBQ04sR0FBRyxDQUFDLHFCQUFxQixFQUFFOzs7O0FBQXRFLDZCQUFlLFNBQWYsZUFBZTtBQUFFLDhCQUFnQixTQUFoQixnQkFBZ0I7O0FBQ3RDLDZCQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDO0FBQy9CLDhCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQztBQUNoQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxrQkFBa0IsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN2RCxRQUFFLENBQUMsd0RBQXdELEVBQUU7Ozs7QUFDM0QsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUM1QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLGdCQUFnQixFQUFFOzs7K0JBQUUsTUFBTSxDQUFDLEVBQUU7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyx5REFBeUQsRUFBRTs7OztBQUM1RCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQzVCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7OzsrQkFBRSxNQUFNLENBQUMsRUFBRTs7QUFDeEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsaUJBQWlCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDdEQsUUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FDNUIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FDckQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7O0FBQzVCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLHVCQUF1QixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzVELFFBQUUsQ0FBQyxxQ0FBcUMsRUFBRTs7OztBQUN4QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDL0csT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDOzs7QUFDckMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsVUFBVSxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQy9DLFFBQUUsQ0FBQyx3REFBd0QsRUFBRTs7OztBQUMzRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQzVCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLFFBQVEsRUFBRTs7OytCQUFFLE1BQU0sQ0FBQyxFQUFFOztBQUNoQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMseURBQXlELEVBQUU7Ozs7QUFDNUQsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUM1QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxRQUFRLEVBQUU7OzsrQkFBRSxNQUFNLENBQUMsRUFBRTs7QUFDaEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsY0FBYyxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ25ELFFBQUUsQ0FBQyxxREFBcUQsRUFBRTs7OztBQUN4RCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUN2RSxJQUFJLEVBQUUsNkRBQTZELEVBQ25FLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FDaEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQzs7O0FBQzVCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxrREFBa0QsRUFBRTs7OztBQUNyRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FDaEQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7OztBQUNuQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxVQUFVLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDL0MsUUFBRSxDQUFDLHdEQUF3RCxFQUFFOzs7O0FBQzNELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FDNUIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsUUFBUSxFQUFFOzs7K0JBQUUsTUFBTSxDQUFDLEVBQUU7O0FBQ2hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyx5REFBeUQsRUFBRTs7OztBQUM1RCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQzVCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLFFBQVEsRUFBRTs7OytCQUFFLE1BQU0sQ0FBQyxFQUFFOztBQUNoQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxjQUFjLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDbkQsUUFBRSxDQUFDLHFEQUFxRCxFQUFFOzs7O0FBQ3hELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsb0NBQW9DLEVBQ2xGLElBQUksRUFBRSw2REFBNkQsRUFDbkUsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUNqQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDOzs7QUFDN0IsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGtEQUFrRCxFQUFFOzs7O0FBQ3JELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUMvQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzs7O0FBQ2xDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGdCQUFnQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3JELFFBQUUsQ0FBQywrRUFBK0UsRUFBRTs7OztBQUNsRixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUN2RSxJQUFJLEVBQUUsNkRBQTZELEVBQ25FLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FDaEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDOzs7QUFDdEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLDZFQUE2RSxFQUFFOzs7O0FBQ2hGLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUNoRCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLEVBQUUsSUFBSSxDQUFDOzs7QUFDN0MsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLDRFQUE0RSxFQUFFOzs7O0FBQy9FLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUMvQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsSUFBSSxDQUFDOzs7QUFDNUMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGdGQUFnRixFQUFFOzs7O0FBQ25GLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsb0NBQW9DLEVBQ2xGLElBQUksRUFBRSw2REFBNkQsRUFDbkUsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUNqQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7OztBQUN2QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsd0ZBQXdGLEVBQUU7Ozs7QUFDM0YsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ3pDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQzs7O0FBQ2xELG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxzRkFBc0YsRUFBRTs7OztBQUN6RixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDekMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxFQUFFLElBQUksQ0FBQzs7O0FBQzFELG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLG1CQUFtQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3hELFVBQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQ3hELElBQUksRUFBRSx3REFBd0QsRUFDOUQsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLFFBQUUsQ0FBQyx5REFBeUQsRUFBRTs7OztBQUM1RCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7K0NBQ3BFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7OztBQUNqQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsMERBQTBELEVBQUU7Ozs7QUFDN0QsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7OytDQUNyRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDOzs7QUFDbEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsZUFBZSxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3BELFVBQU0sV0FBVyxHQUFHLFNBQWQsV0FBVyxDQUFtQixjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWTs7OztBQUNoRixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUN0RixPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDM0IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsQ0FDekYsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDN0IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLENBQUMsQ0FDckYsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7Ozs7O09BQzFCLENBQUM7QUFDRixRQUFFLENBQUMsaUVBQWlFLEVBQUU7Ozs7OytDQUM5RCxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Ozs7K0NBQy9CLEdBQUcsQ0FBQyxhQUFhLEVBQUU7OzsrQkFBRSxNQUFNLENBQUMsRUFBRTs7QUFDckMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLDRFQUE0RSxFQUFFOzs7OzsrQ0FDekUsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDOzs7OytDQUMvQixHQUFHLENBQUMsYUFBYSxFQUFFOzs7K0JBQUUsTUFBTSxDQUFDLEVBQUU7O0FBQ3JDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQywrRUFBK0UsRUFBRTs7Ozs7K0NBQzVFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQzs7OzsrQ0FDL0IsR0FBRyxDQUFDLGFBQWEsRUFBRTs7OytCQUFFLE1BQU0sQ0FBQyxFQUFFOztBQUNyQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsMkVBQTJFLEVBQUU7Ozs7OytDQUN4RSxXQUFXLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Ozs7K0NBQy9CLEdBQUcsQ0FBQyxhQUFhLEVBQUU7OzsrQkFBRSxNQUFNLENBQUMsRUFBRTs7QUFDckMsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsaUNBQWlDLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDdEUsVUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFDbkUsSUFBSSxFQUFFLHFEQUFxRCxFQUMzRCxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2pELFFBQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7OztBQUMzQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzsrQ0FDbkQsR0FBRyxDQUFDLCtCQUErQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7OztBQUNyRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNyRCxVQUFNLFFBQVEsR0FBRyxFQUFDLFNBQVMsRUFBRSxNQUFNO0FBQ2pCLGdCQUFRLEVBQUUsTUFBTSxFQUFDLENBQUM7O0FBRXBDLFFBQUUsQ0FBQyxxREFBcUQsRUFBRTs7OztBQUN4RCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsU0FBUyxFQUMzRCxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxRQUFRLHdDQUF3QyxDQUFDLENBQ2xHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7OztBQUNsQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsZ0RBQWdELEVBQUU7Ozs7QUFDbkQsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQ3RDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3pCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ2xGLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7QUFFZixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3pCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUN0SCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGVBQWUsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNwRCxRQUFFLENBQUMsNkRBQTZELEVBQUU7Ozs7QUFDaEUsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQzFCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7K0NBQ2QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQzs7OytCQUFFLE1BQU0sQ0FBQyxFQUFFOztBQUMxRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsaUVBQWlFLEVBQUU7Ozs7QUFDcEUsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7K0NBQ1gsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQzs7OytCQUFFLE1BQU0sQ0FBQyxFQUFFOztBQUMxRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxhQUFhLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDbEQsVUFBTSxPQUFPLEdBQUcsS0FBSztVQUNmLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDekIsUUFBRSxDQUFDLGlEQUFpRCxFQUFFOzs7O0FBQ3BELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDekIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxXQUFTLE9BQU8sV0FBVyxVQUFVLENBQUcsQ0FBQyxDQUN4RSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQzs7O0FBQzFDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyx5REFBeUQsRUFBRTs7OztBQUM1RCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3pCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsV0FBUyxPQUFPLHFCQUFxQixVQUFVLENBQUcsQ0FBQyxDQUNsRixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDOzs7QUFDbEQsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLHVEQUF1RCxFQUFFOzs7O0FBQzFELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyx1QkFBcUIsT0FBTyxDQUFHLENBQUMsQ0FDL0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDWCxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQzs7O0FBQ2hELG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLE1BQU0sRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUMzQyxRQUFFLENBQUMsNERBQTRELEVBQUU7Ozs7QUFDL0QsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDdEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzsrQ0FDWixHQUFHLENBQUMsSUFBSSxFQUFFOzs7K0JBQUUsTUFBTSxDQUFDLEVBQUU7O0FBQzVCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLFNBQVMsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUM5QyxRQUFFLENBQUMsa0NBQWtDLEVBQUU7Ozs7QUFDckMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNuRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDdEQsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQzlDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7OztBQUNuQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxZQUFZLEVBQUUsa0NBQVUsRUFBQyxNQUFNLEVBQU4sTUFBTSxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDcEQsUUFBRSxDQUFDLHlCQUF5QixFQUFFOzs7O0FBQzVCLGlCQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNwQixtQkFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDakQsR0FBRyxDQUFDLFVBQVUsRUFBRTs7O0FBQ3RCLG1CQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3ZCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGVBQWUsRUFBRSxrQ0FBVSxFQUFDLE1BQU0sRUFBTixNQUFNLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN2RCxRQUFFLENBQUMscUJBQXFCLEVBQUU7Ozs7QUFDeEIsaUJBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3BCLG1CQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUM3QyxHQUFHLENBQUMsYUFBYSxFQUFFOzs7QUFDekIsbUJBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDdkIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsZUFBZSxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3BELFFBQUUsQ0FBQyw0Q0FBNEMsRUFBRTs7OztBQUMvQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzVCLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7K0NBQ2QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQzs7OytCQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUk7O0FBQ3JFLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLHFCQUFxQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzFELFFBQUUsQ0FBQyxzREFBc0QsRUFBRTs7OztBQUN6RCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQy9CLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUMzQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ25CLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUNsQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQzFCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLG1CQUFtQixDQUFDLHFCQUFxQixDQUFDOzs7QUFDcEQsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsa0JBQWtCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDdkQsVUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDOztBQUVqQixRQUFFLENBQUMsb0NBQW9DLEVBQUU7Ozs7QUFDdkMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQ3pDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNmLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQzVCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDVCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ1QsTUFBTSxFQUFFLENBQUM7OytDQUNOLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7OztBQUMvQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7O0FBRUgsUUFBRSxDQUFDLGdEQUFnRCxFQUFFOzs7O0FBQ25ELG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUN6QyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FDdkMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQ3pDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQzs7O0FBQy9CLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQzs7QUFFSCxRQUFFLENBQUMsaUVBQWlFLEVBQUU7Ozs7QUFDcEUsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN2QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQ3pDLE1BQU0sRUFBRSxDQUFDO0FBQ1osaUJBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7QUFDeEQsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMscUJBQXFCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDMUQsUUFBRSxDQUFDLDhCQUE4QixFQUFFO1lBQzdCLE1BQU0sRUFDTixXQUFXOzs7O0FBRFgsb0JBQU0sR0FBRyxRQUFRLEVBQ2pCLFdBQVcsR0FBRyxhQUFhOztBQUMvQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQ3ZELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNmLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FDL0IsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7OytDQUNaLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDOzs7QUFDbEQsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsV0FBVyxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ2hELFFBQUUsQ0FBQyx5QkFBeUIsRUFBRTtZQUN4QixNQUFNOzs7O0FBQU4sb0JBQU0sR0FBRyxRQUFROztBQUNyQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ3ZCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQ3ZELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7OztBQUMzQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxZQUFZLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDakQsUUFBRSxDQUFDLDBDQUEwQyxFQUFFO1lBQ3pDLE1BQU07Ozs7QUFBTixvQkFBTSxHQUFHLFFBQVE7O0FBQ3JCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDdkIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDdkQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzsrQ0FDVCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQzs7O0FBQzNCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGlCQUFpQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBRSxZQUFZLEVBQVosWUFBWSxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDcEUsUUFBRSxDQUFDLDBDQUEwQyxFQUFFO1lBR3pDLElBQUksRUFFRixlQUFlLEVBQ2YsT0FBTyxFQUNQLFlBQVksRUFDZCxJQUFJOzs7O0FBUFIsaUJBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNoQyxpQkFBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7QUFDbkMsa0JBQUksR0FBRyxJQUFJLG9CQUFPLFlBQVksRUFBRTs7QUFDcEMsa0JBQUksQ0FBQyxLQUFLLEdBQUcsWUFBTSxFQUFHLENBQUM7QUFDakIsNkJBQWUsR0FBRyxpQkFBaUIsRUFDbkMsT0FBTyxHQUFHLFNBQVMsRUFDbkIsWUFBWSxHQUFHLGNBQWM7QUFDL0Isa0JBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FDbEMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FDckUsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBQzVCLG1CQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQ2pDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQzNDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7K0NBQ1QsR0FBRyxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQzs7O0FBQ2pFLG1CQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzVCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0dBQ0wsQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLGFBQWEsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNsRCxNQUFFLENBQUMseUJBQXlCLEVBQUU7Ozs7QUFDNUIsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUNyQixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUNyRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7OzZDQUNkLEdBQUcsQ0FBQyxRQUFRLEVBQUU7OztBQUNwQixpQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUNwQixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsZ0NBQWdDLEVBQUU7Ozs7QUFDbkMsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUNyQixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUM1RCxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7OzZDQUNyQixHQUFHLENBQUMsZUFBZSxFQUFFOzs7QUFDM0IsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLCtCQUErQixFQUFFOzs7O0FBQ2xDLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDckIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQ3BDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7NkNBQ25CLEdBQUcsQ0FBQyxhQUFhLEVBQUU7OztBQUN6QixpQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUNwQixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsa0NBQWtDLEVBQUU7VUFJakMsT0FBTzs7OztBQUhYLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDckIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQ3ZDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOzs2Q0FDbEIsR0FBRyxDQUFDLGdCQUFnQixFQUFFOzs7QUFBdEMsbUJBQU87O0FBQ1gsbUJBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLGlCQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O0tBQ3BCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywrQ0FBK0MsRUFBRTtVQUk5QyxPQUFPOzs7O0FBSFgsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUNyQixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FDdkMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7OzZDQUN0QixHQUFHLENBQUMsZ0JBQWdCLEVBQUU7OztBQUF0QyxtQkFBTzs7QUFDWCxrQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUIsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixVQUFRLENBQUMsZ0JBQWdCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDckQsUUFBTSxZQUFZLDR2RkEyREosQ0FBQzs7QUFFZixNQUFFLENBQUMsbUNBQW1DLEVBQUU7Ozs7QUFDdEMsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUNyQixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLDBDQUEwQyxDQUFDLENBQUMsQ0FBQzs7NkNBQ3RHLEdBQUcsQ0FBQyxlQUFlLENBQUMsd0JBQXdCLEVBQUUsMENBQTBDLENBQUM7OztBQUMvRixpQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUNwQixDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsb0NBQW9DLEVBQUU7Ozs7QUFDdkMsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUNyQixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFLDBDQUEwQyxDQUFDLENBQUMsQ0FBQzs7NkNBQ3ZHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsRUFBRSwwQ0FBMEMsQ0FBQzs7O0FBQ2hHLGlCQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O0tBQ3BCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyw0Q0FBNEMsRUFBRTtVQUV6QyxNQUFNLFlBQ0gsSUFBSTs7Ozs7QUFGYixpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs2Q0FDbkMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDOzs7QUFBekQsa0JBQU07bUJBQ0ssQ0FBQyx5Q0FBeUMsRUFDekMsMkNBQTJDLEVBQzNDLDZCQUE2QixFQUM3QixrQ0FBa0MsRUFDbEMsaUNBQWlDLEVBQ2pDLDRCQUE0QixFQUM1QiwyQkFBMkIsRUFDM0IsK0JBQStCLEVBQy9CLHFDQUFxQyxFQUNyQywwQ0FBMEMsRUFDMUMsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qix5Q0FBeUMsRUFDekMsMENBQTBDLEVBQzFDLDJDQUEyQyxDQUFDOztBQWQ5RCxpREFjZ0U7QUFkdkQsa0JBQUk7O0FBZVgsb0JBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCOzs7Ozs7O0tBQ0YsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDBDQUEwQyxFQUFFO1VBRXZDLE1BQU0sY0FnQkgsSUFBSTs7Ozs7QUFqQmIsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7NkNBQ25DLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQzs7O0FBQTdELGtCQUFNO29CQUNLLENBQUMsMENBQTBDLEVBQzFDLDJDQUEyQyxFQUMzQyw4QkFBOEIsRUFDOUIsNkJBQTZCLEVBQzdCLCtCQUErQixFQUMvQix5Q0FBeUMsRUFDekMsNEJBQTRCLEVBQzVCLDhCQUE4QixFQUM5Qix5Q0FBeUMsRUFDekMsMENBQTBDLEVBQzFDLHFDQUFxQyxFQUNyQywyQ0FBMkMsRUFDM0MsaUNBQWlDLENBQUM7O0FBWnBELHFEQVlzRDtBQVo3QyxrQkFBSTs7QUFhWCxvQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7b0JBQ2dCLENBQUMsa0NBQWtDLEVBQ2xDLDJCQUEyQixDQUFDO0FBRDlDLHFEQUNnRDtBQUR2QyxrQkFBSTs7QUFFWCxvQkFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDOzs7Ozs7O0tBQ0YsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHlDQUF5QyxFQUFFO1VBRXRDLE1BQU0sY0FnQkgsSUFBSTs7Ozs7QUFqQmIsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzs7NkNBQ25DLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQzs7O0FBQTVELGtCQUFNO29CQUNLLENBQUMsMENBQTBDLEVBQzFDLDJDQUEyQyxFQUMzQyw4QkFBOEIsRUFDOUIsNkJBQTZCLEVBQzdCLCtCQUErQixFQUMvQix5Q0FBeUMsRUFDekMsNEJBQTRCLEVBQzVCLDhCQUE4QixFQUM5Qix5Q0FBeUMsRUFDekMsMENBQTBDLEVBQzFDLHFDQUFxQyxFQUNyQywyQ0FBMkMsRUFDM0MsaUNBQWlDLENBQUM7O0FBWnBELHFEQVlzRDtBQVo3QyxrQkFBSTs7QUFhWCxvQkFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO29CQUNnQixDQUFDLGtDQUFrQyxFQUNsQywyQkFBMkIsQ0FBQztBQUQ5QyxxREFDZ0Q7QUFEdkMsa0JBQUk7O0FBRVgsb0JBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCOzs7Ozs7O0tBQ0YsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixVQUFRLENBQUMsbUJBQW1CLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLEdBQUcsa0JBQUEsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzdELE1BQUUsQ0FBQyxxQ0FBcUMsRUFBRTtVQUNsQyxJQUFJLEVBQ04sSUFBSSxFQUNKLFFBQVEsRUFVUixDQUFDOzs7O0FBWkMsZ0JBQUksR0FBRyxLQUFLO0FBQ2QsZ0JBQUksR0FBRyxJQUFJLG9CQUFPLFlBQVksRUFBRTtBQUNoQyxvQkFBUSxHQUFHLEVBQUU7O0FBQ2pCLGdCQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsT0FBTyxFQUFFO0FBQzlCLHNCQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hCLENBQUM7QUFDRixpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FDakMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FDbEMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2IsYUFBQyxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7O0FBQ3pDLHNCQUFVLENBQUMsWUFBWTtBQUNyQixrQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyQixrQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEIsa0JBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hCLGtCQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUM7OzZDQUNBLENBQUM7OztBQUNQLG9CQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QyxvQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkMsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbkIsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGdEQUFnRCxFQUFFO1VBQzdDLElBQUksRUFDTixJQUFJLEVBQ0osUUFBUSxFQUNSLFFBQVEsRUFVUixDQUFDLEVBT0QsTUFBTTs7OztBQXBCSixnQkFBSSxHQUFHLEtBQUs7QUFDZCxnQkFBSSxHQUFHLElBQUksb0JBQU8sWUFBWSxFQUFFO0FBQ2hDLG9CQUFRLEdBQUcsRUFBRTtBQUNiLG9CQUFRLEdBQUcsd0JBQXdCOztBQUN2QyxnQkFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLE9BQU8sRUFBRTtBQUM5QixzQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QixDQUFDO0FBQ0YsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQ2pDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQ2xDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNiLGFBQUMsR0FBRyxHQUFHLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDOztBQUN6QyxzQkFBVSxDQUFDLFlBQVk7QUFDckIsa0JBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckIsa0JBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hCLGtCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSw0QkFBNEIsR0FBRyxRQUFRLENBQUMsQ0FBQztBQUMzRCxrQkFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDOzs2Q0FDYSxDQUFDOzs7QUFBaEIsa0JBQU07O0FBQ1YsQUFBQyxrQkFBTSxDQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7Ozs7S0FDakMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGlEQUFpRCxFQUFFO1VBQzlDLElBQUksRUFDTixJQUFJLEVBQ0osUUFBUSxFQUNSLFFBQVEsRUFVUixDQUFDOzs7O0FBYkMsZ0JBQUksR0FBRyxLQUFLO0FBQ2QsZ0JBQUksR0FBRyxJQUFJLG9CQUFPLFlBQVksRUFBRTtBQUNoQyxvQkFBUSxHQUFHLEVBQUU7QUFDYixvQkFBUSxHQUFHLHdCQUF3Qjs7QUFDdkMsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxPQUFPLEVBQUU7QUFDOUIsc0JBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEIsQ0FBQztBQUNGLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUNqQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pCLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUNsQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDYixhQUFDLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQzs7QUFDekMsc0JBQVUsQ0FBQyxZQUFZO0FBQ3JCLGtCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JCLGtCQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4QixrQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsNEJBQTRCLEdBQUcsUUFBUSxDQUFDLENBQUM7QUFDM0Qsa0JBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7NkNBQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7S0FDbEQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixJQUFFLENBQUMsb0RBQW9ELEVBQUUsWUFBTTtBQUM3RCxPQUFHLENBQUMsWUFBWSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0UsVUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7R0FDOUQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDRDQUE0QyxFQUFFLFlBQU07QUFDckQsT0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNwRCxDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsY0FBYyxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ25ELE1BQUUsQ0FBQywrQ0FBK0MsRUFBRTs7Ozs7NkNBQzVDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0tBQ3ZELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywrQ0FBK0MsRUFBRTs7Ozs7NkNBQzVDLEdBQUcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0tBQ3pFLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxpREFBaUQsRUFBRTtVQUNoRCxTQUFTLEVBQ1QsU0FBUzs7OztBQURULHFCQUFTLEdBQUcsa0JBQWtCO0FBQzlCLHFCQUFTLEdBQUcsSUFBSTs7QUFDcEIsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFLLFNBQVMsU0FBSSxTQUFTLENBQUcsQ0FBQztBQUMxRyxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUssU0FBUyxTQUFJLFNBQVMsQ0FBRyxDQUFDO0FBQzFHLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBSyxTQUFTLFNBQUksU0FBUyxDQUFHLENBQUM7QUFDMUcsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDcEcsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUM7OzZDQUM5RixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7OztBQUM1QyxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUNwQixDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFVBQVEsQ0FBQyxZQUFZLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDakQsTUFBRSxDQUFDLGdDQUFnQyxFQUFFOzs7O0FBQ25DLGlCQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FDOUIsYUFBYSxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7OzZDQUNqRSxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDOzs7QUFDckQsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixVQUFRLENBQUMsWUFBWSxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ2pELE1BQUUsQ0FBQyxnQ0FBZ0MsRUFBRTs7OztBQUNuQyxpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQzlCLGFBQWEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQzFELE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7NkNBQ2IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDOzs7NkJBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTzs7QUFDdEUsaUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDcEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7Q0FDTCxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2FkYi1jb21tYW5kcy1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBREIgZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgbmV0IGZyb20gJ25ldCc7XHJcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IExvZ2NhdCBmcm9tICcuLi8uLi9saWIvbG9nY2F0LmpzJztcclxuaW1wb3J0IGxvZyBmcm9tICcuLi8uLi9saWIvbG9nZ2VyLmpzJztcclxuaW1wb3J0ICogYXMgdGVlbl9wcm9jZXNzIGZyb20gJ3RlZW5fcHJvY2Vzcyc7XHJcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xyXG5cclxuXHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcclxuY29uc3QgYXBpTGV2ZWwgPSAyMSxcclxuICAgICAgcGxhdGZvcm1WZXJzaW9uID0gJzQuNC40JyxcclxuICAgICAgbGFuZ3VhZ2UgPSAnZW4nLFxyXG4gICAgICBjb3VudHJ5ID0gJ1VTJyxcclxuICAgICAgbG9jYWxlID0gJ2VuLVVTJyxcclxuICAgICAgSU1FID0gJ2NvbS5hbmRyb2lkLmlucHV0bWV0aG9kLmxhdGluLy5MYXRpbklNRScsXHJcbiAgICAgIGltZUxpc3QgPSBgY29tLmFuZHJvaWQuaW5wdXRtZXRob2QubGF0aW4vLkxhdGluSU1FOlxyXG4gIG1JZD1jb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpbi8uTGF0aW5JTUUgbVNldHRpbmdzQWN0aXZpdHlOYW1lPWNvbS5hbmRyb2lkXHJcbiAgbUlzRGVmYXVsdFJlc0lkPTB4N2YwNzAwMDBcclxuICBTZXJ2aWNlOlxyXG4gICAgcHJpb3JpdHk9MCBwcmVmZXJyZWRPcmRlcj0wIG1hdGNoPTB4MTA4MDAwIHNwZWNpZmljSW5kZXg9LTEgaXNEZWZhdWx0PWZhbHNlXHJcbiAgICBTZXJ2aWNlSW5mbzpcclxuICAgICAgbmFtZT1jb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpbi5MYXRpbklNRVxyXG4gICAgICBwYWNrYWdlTmFtZT1jb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpblxyXG4gICAgICBsYWJlbFJlcz0weDdmMGEwMDM3IG5vbkxvY2FsaXplZExhYmVsPW51bGwgaWNvbj0weDAgYmFubmVyPTB4MFxyXG4gICAgICBlbmFibGVkPXRydWUgZXhwb3J0ZWQ9dHJ1ZSBwcm9jZXNzTmFtZT1jb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpblxyXG4gICAgICBwZXJtaXNzaW9uPWFuZHJvaWQucGVybWlzc2lvbi5CSU5EX0lOUFVUX01FVEhPRFxyXG4gICAgICBmbGFncz0weDBgLFxyXG4gICAgICBwc091dHB1dCA9IGBVU0VSICAgICBQSUQgICBQUElEICBWU0laRSAgUlNTICAgICBXQ0hBTiAgICBQQyAgIE5BTUVcclxudTBfYTEwMSAgIDUwNzggIDMxMjkgIDQ4NzQwNCAzNzA0NCBmZmZmZmZmZiBiNzZjZTU2NSBTIGNvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXJgLFxyXG4gICAgICBjb250YWN0TWFuYWdlclBhY2thZ2UgPSAnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlcicsXHJcbiAgICAgIG1vZGVsID0gYEFuZHJvaWQgU0RLIGJ1aWx0IGZvciBYODZfNjRgLFxyXG4gICAgICBtYW51ZmFjdHVyZXIgPSBgdW5rbm93bmAsXHJcbiAgICAgIHNjcmVlblNpemUgPSBgNzY4eDEyODBgO1xyXG5cclxuZGVzY3JpYmUoJ2FkYiBjb21tYW5kcycsICgpID0+IHtcclxuICBsZXQgYWRiID0gbmV3IEFEQigpO1xyXG4gIGxldCBsb2djYXQgPSBuZXcgTG9nY2F0KHtcclxuICAgIGFkYjogYWRiLmV4ZWN1dGFibGUsXHJcbiAgICBkZWJ1ZzogZmFsc2UsXHJcbiAgICBkZWJ1Z1RyYWNlOiBmYWxzZVxyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdzaGVsbCcsICgpID0+IHtcclxuICAgIGRlc2NyaWJlKCdnZXRBcGlMZXZlbCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZVByb3BlcnR5XCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ3JvLmJ1aWxkLnZlcnNpb24uc2RrJylcclxuICAgICAgICAgIC5yZXR1cm5zKGAke2FwaUxldmVsfWApO1xyXG4gICAgICAgIChhd2FpdCBhZGIuZ2V0QXBpTGV2ZWwoKSkuc2hvdWxkLmVxdWFsKGFwaUxldmVsKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ2dldFBsYXRmb3JtVmVyc2lvbicsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZVByb3BlcnR5XCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ3JvLmJ1aWxkLnZlcnNpb24ucmVsZWFzZScpXHJcbiAgICAgICAgICAucmV0dXJucyhwbGF0Zm9ybVZlcnNpb24pO1xyXG4gICAgICAgIChhd2FpdCBhZGIuZ2V0UGxhdGZvcm1WZXJzaW9uKCkpLnNob3VsZC5lcXVhbChwbGF0Zm9ybVZlcnNpb24pO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnZ2V0RGV2aWNlU3lzTGFuZ3VhZ2UnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdwZXJzaXN0LnN5cy5sYW5ndWFnZSddKVxyXG4gICAgICAgICAgLnJldHVybnMobGFuZ3VhZ2UpO1xyXG4gICAgICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlU3lzTGFuZ3VhZ2UoKSkuc2hvdWxkLmVxdWFsKGxhbmd1YWdlKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ3NldERldmljZVN5c0xhbmd1YWdlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3NldHByb3AnLCAncGVyc2lzdC5zeXMubGFuZ3VhZ2UnLCBsYW5ndWFnZV0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzTGFuZ3VhZ2UobGFuZ3VhZ2UpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnZ2V0RGV2aWNlU3lzQ291bnRyeScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmNvdW50cnknXSlcclxuICAgICAgICAgIC5yZXR1cm5zKGNvdW50cnkpO1xyXG4gICAgICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlU3lzQ291bnRyeSgpKS5zaG91bGQuZXF1YWwoY291bnRyeSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdnZXRMb2NhdGlvblByb3ZpZGVycycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgcmV0dXJuIGVtcHR5IGxvY2F0aW9uX3Byb3ZpZGVyc19hbGxvd2VkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0U2V0dGluZ1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdzZWN1cmUnLCAnbG9jYXRpb25fcHJvdmlkZXJzX2FsbG93ZWQnKVxyXG4gICAgICAgICAgLnJldHVybnMoJycpO1xyXG4gICAgICAgIGxldCBwcm92aWRlcnMgPSBhd2FpdCBhZGIuZ2V0TG9jYXRpb25Qcm92aWRlcnMoKTtcclxuICAgICAgICBwcm92aWRlcnMuc2hvdWxkLmJlLmFuKCdhcnJheScpO1xyXG4gICAgICAgIHByb3ZpZGVycy5sZW5ndGguc2hvdWxkLmVxdWFsKDApO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIG9uZSBsb2NhdGlvbl9wcm92aWRlcnNfYWxsb3dlZCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldFNldHRpbmdcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnc2VjdXJlJywgJ2xvY2F0aW9uX3Byb3ZpZGVyc19hbGxvd2VkJylcclxuICAgICAgICAgIC5yZXR1cm5zKCdncHMnKTtcclxuICAgICAgICBsZXQgcHJvdmlkZXJzID0gYXdhaXQgYWRiLmdldExvY2F0aW9uUHJvdmlkZXJzKCk7XHJcbiAgICAgICAgcHJvdmlkZXJzLnNob3VsZC5iZS5hbignYXJyYXknKTtcclxuICAgICAgICBwcm92aWRlcnMubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcclxuICAgICAgICBwcm92aWRlcnMuc2hvdWxkLmluY2x1ZGUoJ2dwcycpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGJvdGggbG9jYXRpb25fcHJvdmlkZXJzX2FsbG93ZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRTZXR0aW5nXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ3NlY3VyZScsICdsb2NhdGlvbl9wcm92aWRlcnNfYWxsb3dlZCcpXHJcbiAgICAgICAgICAucmV0dXJucygnZ3BzICx3aWZpJyk7XHJcbiAgICAgICAgbGV0IHByb3ZpZGVycyA9IGF3YWl0IGFkYi5nZXRMb2NhdGlvblByb3ZpZGVycygpO1xyXG4gICAgICAgIHByb3ZpZGVycy5zaG91bGQuYmUuYW4oJ2FycmF5Jyk7XHJcbiAgICAgICAgcHJvdmlkZXJzLmxlbmd0aC5zaG91bGQuZXF1YWwoMik7XHJcbiAgICAgICAgcHJvdmlkZXJzLnNob3VsZC5pbmNsdWRlKCdncHMnKTtcclxuICAgICAgICBwcm92aWRlcnMuc2hvdWxkLmluY2x1ZGUoJ3dpZmknKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZUdQU0xvY2F0aW9uUHJvdmlkZXInLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3Mgb24gZ3BzIGVuYWJsZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzZXRTZXR0aW5nXCIpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncygnc2VjdXJlJywgJ2xvY2F0aW9uX3Byb3ZpZGVyc19hbGxvd2VkJywgJytncHMnKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNldFNldHRpbmdcIilcclxuICAgICAgICAgIC53aXRoRXhhY3RBcmdzKCdzZWN1cmUnLCAnbG9jYXRpb25fcHJvdmlkZXJzX2FsbG93ZWQnLCAnLWdwcycpO1xyXG4gICAgICAgIGF3YWl0IGFkYi50b2dnbGVHUFNMb2NhdGlvblByb3ZpZGVyKHRydWUpO1xyXG4gICAgICAgIGF3YWl0IGFkYi50b2dnbGVHUFNMb2NhdGlvblByb3ZpZGVyKGZhbHNlKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ3NldERldmljZVN5c0NvdW50cnknLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc2V0cHJvcCcsICdwZXJzaXN0LnN5cy5jb3VudHJ5JywgY291bnRyeV0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzQ291bnRyeShjb3VudHJ5KTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ2dldERldmljZVN5c0xvY2FsZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmxvY2FsZSddKVxyXG4gICAgICAgICAgLnJldHVybnMobG9jYWxlKTtcclxuICAgICAgICAoYXdhaXQgYWRiLmdldERldmljZVN5c0xvY2FsZSgpKS5zaG91bGQuZXF1YWwobG9jYWxlKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ3NldERldmljZVN5c0xvY2FsZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydzZXRwcm9wJywgJ3BlcnNpc3Quc3lzLmxvY2FsZScsIGxvY2FsZV0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzTG9jYWxlKGxvY2FsZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdnZXREZXZpY2VQcm9kdWN0TGFuZ3VhZ2UnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZ2V0cHJvcCcsICdyby5wcm9kdWN0LmxvY2FsZS5sYW5ndWFnZSddKVxyXG4gICAgICAgICAgLnJldHVybnMobGFuZ3VhZ2UpO1xyXG4gICAgICAgIChhd2FpdCBhZGIuZ2V0RGV2aWNlUHJvZHVjdExhbmd1YWdlKCkpLnNob3VsZC5lcXVhbChsYW5ndWFnZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdnZXREZXZpY2VQcm9kdWN0Q291bnRyeScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubG9jYWxlLnJlZ2lvbiddKVxyXG4gICAgICAgICAgLnJldHVybnMoY291bnRyeSk7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VQcm9kdWN0Q291bnRyeSgpKS5zaG91bGQuZXF1YWwoY291bnRyeSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdnZXREZXZpY2VQcm9kdWN0TG9jYWxlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncm8ucHJvZHVjdC5sb2NhbGUnXSlcclxuICAgICAgICAgIC5yZXR1cm5zKGxvY2FsZSk7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5nZXREZXZpY2VQcm9kdWN0TG9jYWxlKCkpLnNob3VsZC5lcXVhbChsb2NhbGUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnc2V0RGV2aWNlUHJvcGVydHknLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2V0cHJvcCB3aXRoIGNvcnJlY3QgYXJncyB3aXRob3V0IHJvb3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKDIxKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhbJ3NldHByb3AnLCAncGVyc2lzdC5zeXMubG9jYWxlJywgbG9jYWxlXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VQcm9wZXJ0eSgncGVyc2lzdC5zeXMubG9jYWxlJywgbG9jYWxlKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2V0cHJvcCB3aXRoIGNvcnJlY3QgYXJncyB3aXRoIHJvb3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRBcGlMZXZlbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKDI2KTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJvb3RcIilcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhbJ3NldHByb3AnLCAncGVyc2lzdC5zeXMubG9jYWxlJywgbG9jYWxlXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwidW5yb290XCIpXHJcbiAgICAgICAgICAub25jZSgpLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLnNldERldmljZVByb3BlcnR5KCdwZXJzaXN0LnN5cy5sb2NhbGUnLCBsb2NhbGUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnYXZhaWxhYmxlSU1FcycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydpbWUnLCAnbGlzdCcsICctYSddKVxyXG4gICAgICAgICAgLnJldHVybnMoaW1lTGlzdCk7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5hdmFpbGFibGVJTUVzKCkpLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ2VuYWJsZWRJTUVzJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2ltZScsICdsaXN0J10pXHJcbiAgICAgICAgICAucmV0dXJucyhpbWVMaXN0KTtcclxuICAgICAgICAoYXdhaXQgYWRiLmVuYWJsZWRJTUVzKCkpLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ2RlZmF1bHRJTUUnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBsZXQgZGVmYXVsdElNRSA9ICdjb20uYW5kcm9pZC5pbnB1dG1ldGhvZC5sYXRpbi8uTGF0aW5JTUUnO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRTZXR0aW5nXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ3NlY3VyZScsICdkZWZhdWx0X2lucHV0X21ldGhvZCcpXHJcbiAgICAgICAgICAucmV0dXJucyhkZWZhdWx0SU1FKTtcclxuICAgICAgICAoYXdhaXQgYWRiLmRlZmF1bHRJTUUoKSkuc2hvdWxkLmVxdWFsKGRlZmF1bHRJTUUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnZGlzYWJsZUlNRScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydpbWUnLCAnZGlzYWJsZScsIElNRV0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuZGlzYWJsZUlNRShJTUUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnZW5hYmxlSU1FJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2ltZScsICdlbmFibGUnLCBJTUVdKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLmVuYWJsZUlNRShJTUUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgna2V5ZXZlbnQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGtleWNvZGUgPSAnMjknO1xyXG4gICAgICAgIGxldCBjb2RlID0gcGFyc2VJbnQoa2V5Y29kZSwgMTApO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2lucHV0JywgJ2tleWV2ZW50JywgY29kZV0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIua2V5ZXZlbnQoa2V5Y29kZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdpbnB1dFRleHQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHRleHQgPSAnc29tZSB0ZXh0IHdpdGggc3BhY2VzJztcclxuICAgICAgICBsZXQgZXhwZWN0ZWRUZXh0ID0gJ3NvbWUlc3RleHQlc3dpdGglc3NwYWNlcyc7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnaW5wdXQnLCAndGV4dCcsIGV4cGVjdGVkVGV4dF0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuaW5wdXRUZXh0KHRleHQpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnY2xlYXJUZXh0RmllbGQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnaW5wdXQnLCAna2V5ZXZlbnQnLCAnNjcnLCAnMTEyJywgJzY3JywgJzExMicsICc2NycsICcxMTInLCAnNjcnLCAnMTEyJ10pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuY2xlYXJUZXh0RmllbGQoNCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdsb2NrJywgd2l0aE1vY2tzKHthZGIsIGxvZ30sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgaXNTY3JlZW5Mb2NrZWQsIGtleWV2ZW50IGFuZCBlcnJvckFuZFRocm93JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiaXNTY3JlZW5Mb2NrZWRcIilcclxuICAgICAgICAgIC5hdExlYXN0KDIpLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwia2V5ZXZlbnRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygyNilcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIG1vY2tzLmxvZy5leHBlY3RzKFwiZXJyb3JBbmRUaHJvd1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5sb2NrKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdiYWNrJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGtleWV2ZW50IHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwia2V5ZXZlbnRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyg0KVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLmJhY2soKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ2dvVG9Ib21lJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGtleWV2ZW50IHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwia2V5ZXZlbnRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygzKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdvVG9Ib21lKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlLnNraXAoJ2lzU2NyZWVuTG9ja2VkJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGtleWV2ZW50IHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwia2V5ZXZlbnRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygzKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdvVG9Ib21lKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdpc1NvZnRLZXlib2FyZFByZXNlbnQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCByZXR1cm4gZmFsc2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICdpbnB1dF9tZXRob2QnXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwibUlucHV0U2hvd249ZmFsc2VcIik7XHJcbiAgICAgICAgbGV0IHtpc0tleWJvYXJkU2hvd24sIGNhbkNsb3NlS2V5Ym9hcmR9ID0gYXdhaXQgYWRiLmlzU29mdEtleWJvYXJkUHJlc2VudCgpO1xyXG4gICAgICAgIGNhbkNsb3NlS2V5Ym9hcmQuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgICAgIGlzS2V5Ym9hcmRTaG93bi5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIGFuZCBzaG91bGQgcmV0dXJuIHRydWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZHVtcHN5cycsICdpbnB1dF9tZXRob2QnXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwibUlucHV0U2hvd249dHJ1ZSBtSXNJbnB1dFZpZXdTaG93bj10cnVlXCIpO1xyXG4gICAgICAgIGxldCB7aXNLZXlib2FyZFNob3duLCBjYW5DbG9zZUtleWJvYXJkfSA9IGF3YWl0IGFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQoKTtcclxuICAgICAgICBpc0tleWJvYXJkU2hvd24uc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgICAgY2FuQ2xvc2VLZXlib2FyZC5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ2lzQWlycGxhbmVNb2RlT24nLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCBiZSB0cnVlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0U2V0dGluZ1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdnbG9iYWwnLCAnYWlycGxhbmVfbW9kZV9vbicpXHJcbiAgICAgICAgICAucmV0dXJucyhcIjFcIik7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5pc0FpcnBsYW5lTW9kZU9uKCkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIGJlIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0U2V0dGluZ1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdnbG9iYWwnLCAnYWlycGxhbmVfbW9kZV9vbicpXHJcbiAgICAgICAgICAucmV0dXJucyhcIjBcIik7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5pc0FpcnBsYW5lTW9kZU9uKCkpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ3NldEFpcnBsYW5lTW9kZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNldFNldHRpbmdcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZ2xvYmFsJywgJ2FpcnBsYW5lX21vZGVfb24nLCAxKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLnNldEFpcnBsYW5lTW9kZSgxKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ2Jyb2FkY2FzdEFpcnBsYW5lTW9kZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCAnYW5kcm9pZC5pbnRlbnQuYWN0aW9uLkFJUlBMQU5FX01PREUnLCAnLS1leicsICdzdGF0ZScsICd0cnVlJ10pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuYnJvYWRjYXN0QWlycGxhbmVNb2RlKHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnaXNXaWZpT24nLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCBiZSB0cnVlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0U2V0dGluZ1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdnbG9iYWwnLCAnd2lmaV9vbicpXHJcbiAgICAgICAgICAucmV0dXJucyhcIjFcIik7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5pc1dpZmlPbigpKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCBiZSBmYWxzZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldFNldHRpbmdcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZ2xvYmFsJywgJ3dpZmlfb24nKVxyXG4gICAgICAgICAgLnJldHVybnMoXCIwXCIpO1xyXG4gICAgICAgIChhd2FpdCBhZGIuaXNXaWZpT24oKSkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnc2V0V2lmaVN0YXRlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIGZvciByZWFsIGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCAnaW8uYXBwaXVtLnNldHRpbmdzLndpZmknLFxyXG4gICAgICAgICAgICAnLW4nLCAnaW8uYXBwaXVtLnNldHRpbmdzLy5yZWNlaXZlcnMuV2lGaUNvbm5lY3Rpb25TZXR0aW5nUmVjZWl2ZXInLFxyXG4gICAgICAgICAgICAnLS1lcycsICdzZXRzdGF0dXMnLCAnZW5hYmxlJ10pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0V2lmaVN0YXRlKHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBmb3IgZW11bGF0b3InLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc3ZjJywgJ3dpZmknLCAnZGlzYWJsZSddKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLnNldFdpZmlTdGF0ZShmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdpc0RhdGFPbicsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIGJlIHRydWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRTZXR0aW5nXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ2dsb2JhbCcsICdtb2JpbGVfZGF0YScpXHJcbiAgICAgICAgICAucmV0dXJucyhcIjFcIik7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5pc0RhdGFPbigpKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCBiZSBmYWxzZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldFNldHRpbmdcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZ2xvYmFsJywgJ21vYmlsZV9kYXRhJylcclxuICAgICAgICAgIC5yZXR1cm5zKFwiMFwiKTtcclxuICAgICAgICAoYXdhaXQgYWRiLmlzRGF0YU9uKCkpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ3NldERhdGFTdGF0ZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBmb3IgcmVhbCBkZXZpY2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnYW0nLCAnYnJvYWRjYXN0JywgJy1hJywgJ2lvLmFwcGl1bS5zZXR0aW5ncy5kYXRhX2Nvbm5lY3Rpb24nLFxyXG4gICAgICAgICAgICAnLW4nLCAnaW8uYXBwaXVtLnNldHRpbmdzLy5yZWNlaXZlcnMuRGF0YUNvbm5lY3Rpb25TZXR0aW5nUmVjZWl2ZXInLFxyXG4gICAgICAgICAgICAnLS1lcycsICdzZXRzdGF0dXMnLCAnZGlzYWJsZSddKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLnNldERhdGFTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIGZvciBlbXVsYXRvcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydzdmMnLCAnZGF0YScsICdlbmFibGUnXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5zZXREYXRhU3RhdGUodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdzZXRXaWZpQW5kRGF0YScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyB3aGVuIHR1cm5pbmcgb25seSB3aWZpIG9uIGZvciByZWFsIGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCAnaW8uYXBwaXVtLnNldHRpbmdzLndpZmknLFxyXG4gICAgICAgICAgICAnLW4nLCAnaW8uYXBwaXVtLnNldHRpbmdzLy5yZWNlaXZlcnMuV2lGaUNvbm5lY3Rpb25TZXR0aW5nUmVjZWl2ZXInLFxyXG4gICAgICAgICAgICAnLS1lcycsICdzZXRzdGF0dXMnLCAnZW5hYmxlJ10pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0V2lmaUFuZERhdGEoe3dpZmk6IHRydWV9KTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3Mgd2hlbiB0dXJuaW5nIG9ubHkgd2lmaSBvZmYgZm9yIGVtdWxhdG9yJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3N2YycsICd3aWZpJywgJ2Rpc2FibGUnXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5zZXRXaWZpQW5kRGF0YSh7d2lmaTogZmFsc2V9LCB0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3Mgd2hlbiB0dXJuaW5nIG9ubHkgZGF0YSBvbiBmb3IgZW11bGF0b3InLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc3ZjJywgJ2RhdGEnLCAnZW5hYmxlJ10pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0V2lmaUFuZERhdGEoe2RhdGE6IHRydWV9LCB0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3Mgd2hlbiB0dXJuaW5nIG9ubHkgZGF0YSBvZmYgZm9yIHJlYWwgZGV2aWNlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2FtJywgJ2Jyb2FkY2FzdCcsICctYScsICdpby5hcHBpdW0uc2V0dGluZ3MuZGF0YV9jb25uZWN0aW9uJyxcclxuICAgICAgICAgICAgJy1uJywgJ2lvLmFwcGl1bS5zZXR0aW5ncy8ucmVjZWl2ZXJzLkRhdGFDb25uZWN0aW9uU2V0dGluZ1JlY2VpdmVyJyxcclxuICAgICAgICAgICAgJy0tZXMnLCAnc2V0c3RhdHVzJywgJ2Rpc2FibGUnXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5zZXRXaWZpQW5kRGF0YSh7ZGF0YTogZmFsc2V9KTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3Mgd2hlbiB0dXJuaW5nIGJvdGggd2lmaSBhbmQgZGF0YSBvbiBmb3IgcmVhbCBkZXZpY2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKS50d2ljZSgpLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLnNldFdpZmlBbmREYXRhKHt3aWZpOiB0cnVlLCBkYXRhOiB0cnVlfSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIHdoZW4gdHVybmluZyBib3RoIHdpZmkgYW5kIGRhdGEgb2ZmIGZvciBlbXVsYXRvcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpLnR3aWNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0V2lmaUFuZERhdGEoe3dpZmk6IGZhbHNlLCBkYXRhOiBmYWxzZX0sIHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnc2V0QW5pbWF0aW9uU3RhdGUnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBjb25zdCBhZGJBcmdzID0gWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCAnaW8uYXBwaXVtLnNldHRpbmdzLmFuaW1hdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAnLW4nLCAnaW8uYXBwaXVtLnNldHRpbmdzLy5yZWNlaXZlcnMuQW5pbWF0aW9uU2V0dGluZ1JlY2VpdmVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICctLWVzJywgJ3NldHN0YXR1cyddO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgdG8gZW5hYmxlIGFuaW1hdGlvbicsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpLm9uY2UoKS53aXRoRXhhY3RBcmdzKGFkYkFyZ3MuY29uY2F0KCdlbmFibGUnKSk7XHJcbiAgICAgICAgYXdhaXQgYWRiLnNldEFuaW1hdGlvblN0YXRlKHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyB0byBkaXNhYmxlIGFuaW1hdGlvbicsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpLm9uY2UoKS53aXRoRXhhY3RBcmdzKGFkYkFyZ3MuY29uY2F0KCdkaXNhYmxlJykpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5zZXRBbmltYXRpb25TdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdpc0FuaW1hdGlvbk9uJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgY29uc3QgbW9ja1NldHRpbmcgPSBhc3luYyBmdW5jdGlvbiAoZHVyYXRpb25fc2NhbGUsIHRyYW5zaXRpb25fc2NhbGUsIHdpbmRvd19zY2FsZSkge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0U2V0dGluZ1wiKS5vbmNlKCkud2l0aEV4YWN0QXJncygnZ2xvYmFsJywgJ2FuaW1hdG9yX2R1cmF0aW9uX3NjYWxlJylcclxuICAgICAgICAgIC5yZXR1cm5zKGR1cmF0aW9uX3NjYWxlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldFNldHRpbmdcIikub25jZSgpLndpdGhFeGFjdEFyZ3MoJ2dsb2JhbCcsICd0cmFuc2l0aW9uX2FuaW1hdGlvbl9zY2FsZScpXHJcbiAgICAgICAgICAucmV0dXJucyh0cmFuc2l0aW9uX3NjYWxlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldFNldHRpbmdcIikub25jZSgpLndpdGhFeGFjdEFyZ3MoJ2dsb2JhbCcsICd3aW5kb3dfYW5pbWF0aW9uX3NjYWxlJylcclxuICAgICAgICAgIC5yZXR1cm5zKHdpbmRvd19zY2FsZSk7XHJcbiAgICAgIH07XHJcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGFsbCBhbmltYXRpb24gc2V0dGluZ3MgYXJlIGVxdWFsIHRvIHplcm8nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgbW9ja1NldHRpbmcoXCIwLjBcIiwgXCIwLjBcIiwgXCIwLjBcIik7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5pc0FuaW1hdGlvbk9uKCkpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGFuaW1hdG9yX2R1cmF0aW9uX3NjYWxlIHNldHRpbmcgaXMgTk9UIGVxdWFsIHRvIHplcm8nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgbW9ja1NldHRpbmcoXCIwLjVcIiwgXCIwLjBcIiwgXCIwLjBcIik7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5pc0FuaW1hdGlvbk9uKCkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgdHJhbnNpdGlvbl9hbmltYXRpb25fc2NhbGUgc2V0dGluZyBpcyBOT1QgZXF1YWwgdG8gemVybycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBtb2NrU2V0dGluZyhcIjAuMFwiLCBcIjAuNVwiLCBcIjAuMFwiKTtcclxuICAgICAgICAoYXdhaXQgYWRiLmlzQW5pbWF0aW9uT24oKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiB3aW5kb3dfYW5pbWF0aW9uX3NjYWxlIHNldHRpbmcgaXMgTk9UIGVxdWFsIHRvIHplcm8nLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgbW9ja1NldHRpbmcoXCIwLjBcIiwgXCIwLjBcIiwgXCIwLjVcIik7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5pc0FuaW1hdGlvbk9uKCkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnc2V0RGV2aWNlU3lzTG9jYWxlVmlhU2V0dGluZ0FwcCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGFkYkFyZ3MgPSBbJ2FtJywgJ2Jyb2FkY2FzdCcsICctYScsICdpby5hcHBpdW0uc2V0dGluZ3MubG9jYWxlJyxcclxuICAgICAgICAnLW4nLCAnaW8uYXBwaXVtLnNldHRpbmdzLy5yZWNlaXZlcnMuTG9jYWxlU2V0dGluZ1JlY2VpdmVyJyxcclxuICAgICAgICAnLS1lcycsICdsYW5nJywgJ2VuJywgJy0tZXMnLCAnY291bnRyeScsICdVUyddO1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBsb2NhbGUgc2V0dGluZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKS5vbmNlKCkud2l0aEV4YWN0QXJncyhhZGJBcmdzKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlU3lzTG9jYWxlVmlhU2V0dGluZ0FwcCgnZW4nLCAnVVMnKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ3NldEdlb0xvY2F0aW9uJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgY29uc3QgbG9jYXRpb24gPSB7bG9uZ2l0dWRlOiAnNTAuNScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiAnNTAuMSd9O1xyXG5cclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIGZvciByZWFsIGRldmljZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdzdGFydHNlcnZpY2UnLCAnLWUnLCAnbG9uZ2l0dWRlJywgbG9jYXRpb24ubG9uZ2l0dWRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLWUnLCAnbGF0aXR1ZGUnLCBsb2NhdGlvbi5sYXRpdHVkZSwgYGlvLmFwcGl1bS5zZXR0aW5ncy8uTG9jYXRpb25TZXJ2aWNlYF0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc2V0R2VvTG9jYXRpb24obG9jYXRpb24pO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBhZGIgd2l0aCBjb3JyZWN0IGFyZ3MgZm9yIGVtdWxhdG9yJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicmVzZXRUZWxuZXRBdXRoVG9rZW5cIilcclxuICAgICAgICAgIC5vbmNlKCkucmV0dXJucyh0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2VtdScsICdnZW8nLCAnZml4JywgbG9jYXRpb24ubG9uZ2l0dWRlLCBsb2NhdGlvbi5sYXRpdHVkZV0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICAvLyBBIHdvcmthcm91bmQgZm9yIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvYW5kcm9pZC9pc3N1ZXMvZGV0YWlsP2lkPTIwNjE4MFxyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiYWRiRXhlY1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnZW11JywgJ2dlbycsICdmaXgnLCBsb2NhdGlvbi5sb25naXR1ZGUucmVwbGFjZSgnLicsICcsJyksIGxvY2F0aW9uLmxhdGl0dWRlLnJlcGxhY2UoJy4nLCAnLCcpXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5zZXRHZW9Mb2NhdGlvbihsb2NhdGlvbiwgdHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdwcm9jZXNzRXhpc3RzJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzIGFuZCBzaG91bGQgZmluZCBwcm9jZXNzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhcInBzXCIpXHJcbiAgICAgICAgICAucmV0dXJucyhwc091dHB1dCk7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5wcm9jZXNzRXhpc3RzKGNvbnRhY3RNYW5hZ2VyUGFja2FnZSkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJncyBhbmQgc2hvdWxkIG5vdCBmaW5kIHByb2Nlc3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFwicHNcIilcclxuICAgICAgICAgIC5yZXR1cm5zKFwiZm9vXCIpO1xyXG4gICAgICAgIChhd2FpdCBhZGIucHJvY2Vzc0V4aXN0cyhjb250YWN0TWFuYWdlclBhY2thZ2UpKS5zaG91bGQuYmUuZmFsc2U7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdmb3J3YXJkUG9ydCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN5c1BvcnQgPSAxMjM0NSxcclxuICAgICAgICAgICAgZGV2aWNlUG9ydCA9IDU0MzIxO1xyXG4gICAgICBpdCgnZm9yd2FyZFBvcnQgc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydmb3J3YXJkJywgYHRjcDoke3N5c1BvcnR9YCwgYHRjcDoke2RldmljZVBvcnR9YF0pXHJcbiAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuZm9yd2FyZFBvcnQoc3lzUG9ydCwgZGV2aWNlUG9ydCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ2ZvcndhcmRBYnN0cmFjdFBvcnQgc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydmb3J3YXJkJywgYHRjcDoke3N5c1BvcnR9YCwgYGxvY2FsYWJzdHJhY3Q6JHtkZXZpY2VQb3J0fWBdKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLmZvcndhcmRBYnN0cmFjdFBvcnQoc3lzUG9ydCwgZGV2aWNlUG9ydCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoJ3JlbW92ZVBvcnRGb3J3YXJkIHNob3VsZCBjYWxsIHNoZWxsIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiYWRiRXhlY1wiKVxyXG4gICAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydmb3J3YXJkJywgYC0tcmVtb3ZlYCwgYHRjcDoke3N5c1BvcnR9YF0pXHJcbiAgICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5yZW1vdmVQb3J0Rm9yd2FyZChzeXNQb3J0LCBkZXZpY2VQb3J0KTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ3BpbmcnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MgYW5kIHNob3VsZCByZXR1cm4gdHJ1ZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoW1wiZWNob1wiLCBcInBpbmdcIl0pXHJcbiAgICAgICAgICAucmV0dXJucyhcInBpbmdcIik7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5waW5nKCkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgncmVzdGFydCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBhZGIgaW4gY29ycmVjdCBvcmRlcicsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInN0b3BMb2djYXRcIikub25jZSgpLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZXN0YXJ0QWRiXCIpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwid2FpdEZvckRldmljZVwiKS5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInN0YXJ0TG9nY2F0XCIpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5yZXN0YXJ0KCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdzdG9wTG9nY2F0Jywgd2l0aE1vY2tzKHtsb2djYXR9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHN0b3BDYXB0dXJlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGFkYi5sb2djYXQgPSBsb2djYXQ7XHJcbiAgICAgICAgbW9ja3MubG9nY2F0LmV4cGVjdHMoXCJzdG9wQ2FwdHVyZVwiKS5vbmNlKCkucmV0dXJucyhcIlwiKTtcclxuICAgICAgICBhd2FpdCBhZGIuc3RvcExvZ2NhdCgpO1xyXG4gICAgICAgIG1vY2tzLmxvZ2NhdC52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnZ2V0TG9nY2F0TG9ncycsIHdpdGhNb2Nrcyh7bG9nY2F0fSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBnZXRMb2dzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGFkYi5sb2djYXQgPSBsb2djYXQ7XHJcbiAgICAgICAgbW9ja3MubG9nY2F0LmV4cGVjdHMoXCJnZXRMb2dzXCIpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5nZXRMb2djYXRMb2dzKCk7XHJcbiAgICAgICAgbW9ja3MubG9nY2F0LnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdnZXRQSURzQnlOYW1lJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIHNoZWxsIGFuZCBwYXJzZSBwaWRzIGNvcnJlY3RseScsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydwcyddKVxyXG4gICAgICAgICAgLnJldHVybnMocHNPdXRwdXQpO1xyXG4gICAgICAgIChhd2FpdCBhZGIuZ2V0UElEc0J5TmFtZShjb250YWN0TWFuYWdlclBhY2thZ2UpKVswXS5zaG91bGQuZXF1YWwoNTA3OCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdraWxsUHJvY2Vzc2VzQnlOYW1lJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGdldFBJRHNCeU5hbWUgYW5kIGtpbGwgcHJvY2VzcyBjb3JyZWN0bHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRQSURzQnlOYW1lXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoY29udGFjdE1hbmFnZXJQYWNrYWdlKVxyXG4gICAgICAgICAgLnJldHVybnMoWzUwNzhdKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImtpbGxQcm9jZXNzQnlQSURcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyg1MDc4KVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLmtpbGxQcm9jZXNzZXNCeU5hbWUoY29udGFjdE1hbmFnZXJQYWNrYWdlKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoJ2tpbGxQcm9jZXNzQnlQSUQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBjb25zdCBwaWQgPSA1MDc4O1xyXG5cclxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIGtpbGwgcHJvY2VzcyBjb3JyZWN0bHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsna2lsbCcsICctMCcsIHBpZF0pXHJcbiAgICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLndpdGhFeGFjdEFyZ3MoWydraWxsJywgcGlkXSlcclxuICAgICAgICAgIC5vbkNhbGwoMClcclxuICAgICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAud2l0aEV4YWN0QXJncyhbJ2tpbGwnLCBwaWRdKVxyXG4gICAgICAgICAgLm9uQ2FsbCgxKVxyXG4gICAgICAgICAgLnRocm93cygpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5raWxsUHJvY2Vzc0J5UElEKHBpZCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0KCdzaG91bGQgZm9yY2Uga2lsbCBwcm9jZXNzIGlmIG5vcm1hbCBraWxsIGZhaWxzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2tpbGwnLCAnLTAnLCBwaWRdKVxyXG4gICAgICAgICAgLnJldHVybnMoJycpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5hdExlYXN0KDIpLndpdGhFeGFjdEFyZ3MoWydraWxsJywgcGlkXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydraWxsJywgJy05JywgcGlkXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCcnKTtcclxuICAgICAgICBhd2FpdCBhZGIua2lsbFByb2Nlc3NCeVBJRChwaWQpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIGEgcHJvY2VzcyB3aXRoIGdpdmVuIElEIGRvZXMgbm90IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2tpbGwnLCAnLTAnLCBwaWRdKVxyXG4gICAgICAgICAgLnRocm93cygpO1xyXG4gICAgICAgIGFkYi5raWxsUHJvY2Vzc0J5UElEKHBpZCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKCdicm9hZGNhc3RQcm9jZXNzRW5kJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBicm9hZGNhc3QgcHJvY2VzcyBlbmQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGludGVudCA9ICdpbnRlbnQnLFxyXG4gICAgICAgICAgICBwcm9jZXNzTmFtZSA9ICdwcm9jZXNzTmFtZSc7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnYW0nLCAnYnJvYWRjYXN0JywgJy1hJywgaW50ZW50XSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicHJvY2Vzc0V4aXN0c1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKHByb2Nlc3NOYW1lKVxyXG4gICAgICAgICAgLnJldHVybnMoZmFsc2UpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5icm9hZGNhc3RQcm9jZXNzRW5kKGludGVudCwgcHJvY2Vzc05hbWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnYnJvYWRjYXN0Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoJ3Nob3VsZCBicm9hZGNhc3QgaW50ZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGxldCBpbnRlbnQgPSAnaW50ZW50JztcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCBpbnRlbnRdKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLmJyb2FkY2FzdChpbnRlbnQpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnaW5zdHJ1bWVudCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCB3aXRoIGNvcnJlY3QgYXJndW1lbnRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGxldCBpbnRlbnQgPSAnaW50ZW50JztcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydhbScsICdicm9hZGNhc3QnLCAnLWEnLCBpbnRlbnRdKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLmJyb2FkY2FzdChpbnRlbnQpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZSgnYW5kcm9pZENvdmVyYWdlJywgd2l0aE1vY2tzKHthZGIsIHRlZW5fcHJvY2Vzc30sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3VtZW50cycsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhZGIuZXhlY3V0YWJsZS5kZWZhdWx0QXJncyA9IFtdO1xyXG4gICAgICAgIGFkYi5leGVjdXRhYmxlLnBhdGggPSBcImR1bW15X2FkYl9wYXRoXCI7XHJcbiAgICAgICAgbGV0IGNvbm4gPSBuZXcgZXZlbnRzLkV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIGNvbm4uc3RhcnQgPSAoKSA9PiB7IH07IC8vIGRvIG5vdGhpbmdcclxuICAgICAgICBjb25zdCBpbnN0cnVtZW50Q2xhc3MgPSAnaW5zdHJ1bWVudENsYXNzJyxcclxuICAgICAgICAgICAgICB3YWl0UGtnID0gJ3dhaXRQa2cnLFxyXG4gICAgICAgICAgICAgIHdhaXRBY3Rpdml0eSA9ICd3YWl0QWN0aXZpdHknO1xyXG4gICAgICAgIGxldCBhcmdzID0gYWRiLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3NcclxuICAgICAgICAgIC5jb25jYXQoWydzaGVsbCcsICdhbScsICdpbnN0cnVtZW50JywgJy1lJywgJ2NvdmVyYWdlJywgJ3RydWUnLCAnLXcnXSlcclxuICAgICAgICAgIC5jb25jYXQoW2luc3RydW1lbnRDbGFzc10pO1xyXG4gICAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiU3ViUHJvY2Vzc1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdkdW1teV9hZGJfcGF0aCcsIGFyZ3MpXHJcbiAgICAgICAgICAucmV0dXJucyhjb25uKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcIndhaXRGb3JBY3Rpdml0eVwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKHdhaXRQa2csIHdhaXRBY3Rpdml0eSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5hbmRyb2lkQ292ZXJhZ2UoaW5zdHJ1bWVudENsYXNzLCB3YWl0UGtnLCB3YWl0QWN0aXZpdHkpO1xyXG4gICAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdkZXZpY2UgaW5mbycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2UgbW9kZWwnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2dldHByb3AnLCAncm8ucHJvZHVjdC5tb2RlbCddKVxyXG4gICAgICAgICAgLnJldHVybnMobW9kZWwpO1xyXG4gICAgICBhd2FpdCBhZGIuZ2V0TW9kZWwoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2UgbWFudWZhY3R1cmVyJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydnZXRwcm9wJywgJ3JvLnByb2R1Y3QubWFudWZhY3R1cmVyJ10pXHJcbiAgICAgICAgICAucmV0dXJucyhtYW51ZmFjdHVyZXIpO1xyXG4gICAgICBhd2FpdCBhZGIuZ2V0TWFudWZhY3R1cmVyKCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlIHNjcmVlbiBzaXplJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWyd3bScsICdzaXplJ10pXHJcbiAgICAgICAgICAucmV0dXJucyhzY3JlZW5TaXplKTtcclxuICAgICAgYXdhaXQgYWRiLmdldFNjcmVlblNpemUoKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2Ugc2NyZWVuIGRlbnNpdHknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ3dtJywgJ2RlbnNpdHknXSlcclxuICAgICAgICAgIC5yZXR1cm5zKFwiUGh5c2ljYWwgZGVuc2l0eTogNDIwXCIpO1xyXG4gICAgICBsZXQgZGVuc2l0eSA9IGF3YWl0IGFkYi5nZXRTY3JlZW5EZW5zaXR5KCk7XHJcbiAgICAgIGRlbnNpdHkuc2hvdWxkLmVxdWFsKDQyMCk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbnVsbCBmb3IgaW52YWxpZCBzY3JlZW4gZGVuc2l0eScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnd20nLCAnZGVuc2l0eSddKVxyXG4gICAgICAgICAgLnJldHVybnMoXCJQaHlzaWNhbCBkZW5zaXR5OiB1bmtub3duXCIpO1xyXG4gICAgICBsZXQgZGVuc2l0eSA9IGF3YWl0IGFkYi5nZXRTY3JlZW5EZW5zaXR5KCk7XHJcbiAgICAgIHNob3VsZC5lcXVhbChkZW5zaXR5LCBudWxsKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdhcHAgcGVybWlzc2lvbicsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBjb25zdCBkdW1wZWRPdXRwdXQgPSBgXHJcbiAgICAgICAgICBkZWNsYXJlZCBwZXJtaXNzaW9uczpcclxuICAgICAgICAgICAgY29tLnh4eC5wZXJtaXNzaW9uLkMyRF9NRVNTQUdFOiBwcm90PXNpZ25hdHVyZSwgSU5TVEFMTEVEXHJcbiAgICAgICAgICAgIGNvbS54eHgucGVybWlzc2lvbi5DMkRfTUVTU0FHRTogcHJvdD1zaWduYXR1cmVcclxuICAgICAgICAgIHJlcXVlc3RlZCBwZXJtaXNzaW9uczpcclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19ORVRXT1JLX1NUQVRFXHJcbiAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5XUklURV9FWFRFUk5BTF9TVE9SQUdFXHJcbiAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5JTlRFUk5FVFxyXG4gICAgICAgICAgICBhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9DT05UQUNUU1xyXG4gICAgICAgICAgICBhbmRyb2lkLnBlcm1pc3Npb24uUkVDT1JEX0FVRElPXHJcbiAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5WSUJSQVRFXHJcbiAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5DQU1FUkFcclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLkZMQVNITElHSFRcclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLlJFQURfUEhPTkVfU1RBVEVcclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLk1PRElGWV9BVURJT19TRVRUSU5HU1xyXG4gICAgICAgICAgICBhbmRyb2lkLnBlcm1pc3Npb24uQkxVRVRPT1RIXHJcbiAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5XQUtFX0xPQ0tcclxuICAgICAgICAgICAgY29tLmdvb2dsZS5hbmRyb2lkLmMyZG0ucGVybWlzc2lvbi5SRUNFSVZFXHJcbiAgICAgICAgICAgIGNvbS54eHgucGVybWlzc2lvbi5DMkRfTUVTU0FHRVxyXG4gICAgICAgICAgICBhbmRyb2lkLnBlcm1pc3Npb24uQUNDRVNTX0ZJTkVfTE9DQVRJT05cclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLlJFQURfRVhURVJOQUxfU1RPUkFHRVxyXG4gICAgICAgICAgICBhbmRyb2lkLnBlcm1pc3Npb24uUkVDRUlWRV9CT09UX0NPTVBMRVRFRFxyXG4gICAgICAgICAgICAucGVybWlzc2lvbi5DMkRfTUVTU0FHRVxyXG4gICAgICAgICAgaW5zdGFsbCBwZXJtaXNzaW9uczpcclxuICAgICAgICAgICAgY29tLmdvb2dsZS5hbmRyb2lkLmMyZG0ucGVybWlzc2lvbi5SRUNFSVZFOiBncmFudGVkPXRydWVcclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLk1PRElGWV9BVURJT19TRVRUSU5HUzogZ3JhbnRlZD10cnVlXHJcbiAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5SRUNFSVZFX0JPT1RfQ09NUExFVEVEOiBncmFudGVkPXRydWVcclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLkJMVUVUT09USDogZ3JhbnRlZD10cnVlXHJcbiAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5JTlRFUk5FVDogZ3JhbnRlZD10cnVlXHJcbiAgICAgICAgICAgIGNvbS54eHgucGVybWlzc2lvbi5DMkRfTUVTU0FHRTogZ3JhbnRlZD10cnVlXHJcbiAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5GTEFTSExJR0hUOiBncmFudGVkPXRydWVcclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19ORVRXT1JLX1NUQVRFOiBncmFudGVkPXRydWVcclxuICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLlZJQlJBVEU6IGdyYW50ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICBhbmRyb2lkLnBlcm1pc3Npb24uV0FLRV9MT0NLOiBncmFudGVkPXRydWVcclxuICAgICAgICAgIFVzZXIgMDogY2VEYXRhSW5vZGU9MTUwNDcxMiBpbnN0YWxsZWQ9dHJ1ZSBoaWRkZW49ZmFsc2Ugc3VzcGVuZGVkPWZhbHNlIHN0b3BwZWQ9ZmFsc2Ugbm90TGF1bmNoZWQ9ZmFsc2UgZW5hYmxlZD0wXHJcbiAgICAgICAgICAgIGdpZHM9WzMwMDIsIDMwMDNdXHJcbiAgICAgICAgICAgIHJ1bnRpbWUgcGVybWlzc2lvbnM6XHJcbiAgICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19GSU5FX0xPQ0FUSU9OOiBncmFudGVkPXRydWVcclxuICAgICAgICAgICAgICBhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9FWFRFUk5BTF9TVE9SQUdFOiBncmFudGVkPXRydWVcclxuICAgICAgICAgICAgICBhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9QSE9ORV9TVEFURTogZ3JhbnRlZD10cnVlXHJcbiAgICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLkNBTUVSQTogZ3JhbnRlZD1mYWxzZSwgZmxhZ3M9WyBVU0VSX1NFVCBdXHJcbiAgICAgICAgICAgICAgYW5kcm9pZC5wZXJtaXNzaW9uLldSSVRFX0VYVEVSTkFMX1NUT1JBR0U6IGdyYW50ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5SRUNPUkRfQVVESU86IGdyYW50ZWQ9dHJ1ZVxyXG4gICAgICAgICAgICAgIGFuZHJvaWQucGVybWlzc2lvbi5SRUFEX0NPTlRBQ1RTOiBncmFudGVkPWZhbHNlLCBmbGFncz1bIFVTRVJfU0VUIF1cclxuXHJcblxyXG4gICAgICBEZXhvcHQgc3RhdGU6XHJcbiAgICAgICAgW2NvbS54eHhdXHJcbiAgICAgICAgICBJbnN0cnVjdGlvbiBTZXQ6IGFybVxyXG4gICAgICAgICAgICBwYXRoOiAvZGF0YS9hcHAvY29tLnh4eC0xL2Jhc2UuYXBrXHJcbiAgICAgICAgICAgIHN0YXR1czogL2RhdGEvYXBwL2NvbS54eHhhLTEvb2F0L2FybS9iYXNlLm9kZXggW2NvbXBpbGF0aW9uX2ZpbHRlcj1pbnRlcnByZXQtb25seSwgc3RhdHVzPWtPYXRVcFRvRGF0ZV1cclxuXHJcblxyXG4gICAgICBDb21waWxlciBzdGF0czpcclxuICAgICAgICBbY29tLnh4eF1cclxuICAgICAgICAgICBiYXNlLmFwayAtIDgyNjRcclxuXHJcbiAgICBEVU1QIE9GIFNFUlZJQ0UgYWN0aXZpdHk6XHJcbiAgICAgIEFDVElWSVRZIE1BTkFHRVIgUEVORElORyBJTlRFTlRTIChkdW1wc3lzIGFjdGl2aXR5IGludGVudHMpXHJcbiAgICAgICAgKG5vdGhpbmcpYDtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGdyYW50IHJlcXVlc3RlZCBwZXJtaXNzaW9uJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhBcmdzKFsncG0nLCAnZ3JhbnQnLCAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsICdhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9FWFRFUk5BTF9TVE9SQUdFJ10pO1xyXG4gICAgICBhd2FpdCBhZGIuZ3JhbnRQZXJtaXNzaW9uKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgJ2FuZHJvaWQucGVybWlzc2lvbi5SRUFEX0VYVEVSTkFMX1NUT1JBR0UnKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHJldm9rZSByZXF1ZXN0ZWQgcGVybWlzc2lvbicsIGFzeW5jICgpID0+IHtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoQXJncyhbJ3BtJywgJ3Jldm9rZScsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgJ2FuZHJvaWQucGVybWlzc2lvbi5SRUFEX0VYVEVSTkFMX1NUT1JBR0UnXSk7XHJcbiAgICAgIGF3YWl0IGFkYi5yZXZva2VQZXJtaXNzaW9uKCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgJ2FuZHJvaWQucGVybWlzc2lvbi5SRUFEX0VYVEVSTkFMX1NUT1JBR0UnKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHByb3Blcmx5IGxpc3QgcmVxdWVzdGVkIHBlcm1pc3Npb25zJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpLm9uY2UoKS5yZXR1cm5zKGR1bXBlZE91dHB1dCk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFkYi5nZXRSZXFQZXJtaXNzaW9ucygnaW8uYXBwaXVtLmFuZHJvaWQnKTtcclxuICAgICAgZm9yIChsZXQgcGVybSBvZiBbJ2FuZHJvaWQucGVybWlzc2lvbi5BQ0NFU1NfTkVUV09SS19TVEFURScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uV1JJVEVfRVhURVJOQUxfU1RPUkFHRScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uSU5URVJORVQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQURfQ09OVEFDVFMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQ09SRF9BVURJTycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uVklCUkFURScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uQ0FNRVJBJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5GTEFTSExJR0hUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5SRUFEX1BIT05FX1NUQVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5NT0RJRllfQVVESU9fU0VUVElOR1MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLkJMVUVUT09USCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uV0FLRV9MT0NLJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5BQ0NFU1NfRklORV9MT0NBVElPTicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9FWFRFUk5BTF9TVE9SQUdFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5SRUNFSVZFX0JPT1RfQ09NUExFVEVEJ10pIHtcclxuICAgICAgICByZXN1bHQuc2hvdWxkLmluY2x1ZGUocGVybSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwcm9wZXJseSBsaXN0IGdyYW50ZWQgcGVybWlzc2lvbnMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIikub25jZSgpLnJldHVybnMoZHVtcGVkT3V0cHV0KTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWRiLmdldEdyYW50ZWRQZXJtaXNzaW9ucygnaW8uYXBwaXVtLmFuZHJvaWQnKTtcclxuICAgICAgZm9yIChsZXQgcGVybSBvZiBbJ2FuZHJvaWQucGVybWlzc2lvbi5NT0RJRllfQVVESU9fU0VUVElOR1MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQ0VJVkVfQk9PVF9DT01QTEVURUQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLkJMVUVUT09USCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uSU5URVJORVQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLkZMQVNITElHSFQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19ORVRXT1JLX1NUQVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5WSUJSQVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5XQUtFX0xPQ0snLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLkFDQ0VTU19GSU5FX0xPQ0FUSU9OJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5SRUFEX0VYVEVSTkFMX1NUT1JBR0UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQURfUEhPTkVfU1RBVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLldSSVRFX0VYVEVSTkFMX1NUT1JBR0UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQ09SRF9BVURJTyddKSB7XHJcbiAgICAgICAgcmVzdWx0LnNob3VsZC5pbmNsdWRlKHBlcm0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IHBlcm0gb2YgWydhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9DT05UQUNUUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uQ0FNRVJBJ10pIHtcclxuICAgICAgICByZXN1bHQuc2hvdWxkLm5vdC5pbmNsdWRlKHBlcm0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcHJvcGVybHkgbGlzdCBkZW5pZWQgcGVybWlzc2lvbnMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIikub25jZSgpLnJldHVybnMoZHVtcGVkT3V0cHV0KTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWRiLmdldERlbmllZFBlcm1pc3Npb25zKCdpby5hcHBpdW0uYW5kcm9pZCcpO1xyXG4gICAgICBmb3IgKGxldCBwZXJtIG9mIFsnYW5kcm9pZC5wZXJtaXNzaW9uLk1PRElGWV9BVURJT19TRVRUSU5HUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uUkVDRUlWRV9CT09UX0NPTVBMRVRFRCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uQkxVRVRPT1RIJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2FuZHJvaWQucGVybWlzc2lvbi5JTlRFUk5FVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uRkxBU0hMSUdIVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uQUNDRVNTX05FVFdPUktfU1RBVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLlZJQlJBVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLldBS0VfTE9DSycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uQUNDRVNTX0ZJTkVfTE9DQVRJT04nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnYW5kcm9pZC5wZXJtaXNzaW9uLlJFQURfRVhURVJOQUxfU1RPUkFHRScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9QSE9ORV9TVEFURScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uV1JJVEVfRVhURVJOQUxfU1RPUkFHRScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uUkVDT1JEX0FVRElPJ10pIHtcclxuICAgICAgICByZXN1bHQuc2hvdWxkLm5vdC5pbmNsdWRlKHBlcm0pO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IHBlcm0gb2YgWydhbmRyb2lkLnBlcm1pc3Npb24uUkVBRF9DT05UQUNUUycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbmRyb2lkLnBlcm1pc3Npb24uQ0FNRVJBJ10pIHtcclxuICAgICAgICByZXN1bHQuc2hvdWxkLmluY2x1ZGUocGVybSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnc2VuZFRlbG5ldENvbW1hbmQnLCB3aXRoTW9ja3Moe2FkYiwgbmV0fSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2hlbGwgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHBvcnQgPSA1NDMyMTtcclxuICAgICAgbGV0IGNvbm4gPSBuZXcgZXZlbnRzLkV2ZW50RW1pdHRlcigpO1xyXG4gICAgICBsZXQgY29tbWFuZHMgPSBbXTtcclxuICAgICAgY29ubi53cml0ZSA9IGZ1bmN0aW9uIChjb21tYW5kKSB7XHJcbiAgICAgICAgY29tbWFuZHMucHVzaChjb21tYW5kKTtcclxuICAgICAgfTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRFbXVsYXRvclBvcnRcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgIC5yZXR1cm5zKHBvcnQpO1xyXG4gICAgICBtb2Nrcy5uZXQuZXhwZWN0cyhcImNyZWF0ZUNvbm5lY3Rpb25cIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocG9ydCwgJ2xvY2FsaG9zdCcpXHJcbiAgICAgICAgLnJldHVybnMoY29ubik7XHJcbiAgICAgIGxldCBwID0gYWRiLnNlbmRUZWxuZXRDb21tYW5kKCdhdmQgbmFtZScpO1xyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25uLmVtaXQoJ2Nvbm5lY3QnKTtcclxuICAgICAgICBjb25uLmVtaXQoJ2RhdGEnLCAnT0snKTtcclxuICAgICAgICBjb25uLmVtaXQoJ2RhdGEnLCAnT0snKTtcclxuICAgICAgICBjb25uLmVtaXQoJ2Nsb3NlJyk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgICBhd2FpdCBwO1xyXG4gICAgICBjb21tYW5kc1swXS5zaG91bGQuZXF1YWwoXCJhdmQgbmFtZVxcblwiKTtcclxuICAgICAgY29tbWFuZHNbMV0uc2hvdWxkLmVxdWFsKFwicXVpdFxcblwiKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5uZXQudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRoZSBsYXN0IGxpbmUgb2YgdGhlIG91dHB1dCBvbmx5JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBwb3J0ID0gNTQzMjE7XHJcbiAgICAgIGxldCBjb25uID0gbmV3IGV2ZW50cy5FdmVudEVtaXR0ZXIoKTtcclxuICAgICAgbGV0IGNvbW1hbmRzID0gW107XHJcbiAgICAgIGxldCBleHBlY3RlZCA9IFwiZGVzaXJlZF9jb21tYW5kX291dHB1dFwiO1xyXG4gICAgICBjb25uLndyaXRlID0gZnVuY3Rpb24gKGNvbW1hbmQpIHtcclxuICAgICAgICBjb21tYW5kcy5wdXNoKGNvbW1hbmQpO1xyXG4gICAgICB9O1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEVtdWxhdG9yUG9ydFwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgLnJldHVybnMocG9ydCk7XHJcbiAgICAgIG1vY2tzLm5ldC5leHBlY3RzKFwiY3JlYXRlQ29ubmVjdGlvblwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwb3J0LCAnbG9jYWxob3N0JylcclxuICAgICAgICAucmV0dXJucyhjb25uKTtcclxuICAgICAgbGV0IHAgPSBhZGIuc2VuZFRlbG5ldENvbW1hbmQoJ2F2ZCBuYW1lJyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbm4uZW1pdCgnY29ubmVjdCcpO1xyXG4gICAgICAgIGNvbm4uZW1pdCgnZGF0YScsICdPSycpO1xyXG4gICAgICAgIGNvbm4uZW1pdCgnZGF0YScsICdPS1xcbnVud2FudGVkX2VjaG9fb3V0cHV0XFxuJyArIGV4cGVjdGVkKTtcclxuICAgICAgICBjb25uLmVtaXQoJ2Nsb3NlJyk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgICBsZXQgYWN0dWFsID0gYXdhaXQgcDtcclxuICAgICAgKGFjdHVhbCkuc2hvdWxkLmVxdWFsKGV4cGVjdGVkKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiBuZXR3b3JrIGNvbm5lY3Rpb24gZXJyb3JzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBwb3J0ID0gNTQzMjE7XHJcbiAgICAgIGxldCBjb25uID0gbmV3IGV2ZW50cy5FdmVudEVtaXR0ZXIoKTtcclxuICAgICAgbGV0IGNvbW1hbmRzID0gW107XHJcbiAgICAgIGxldCBleHBlY3RlZCA9IFwiZGVzaXJlZF9jb21tYW5kX291dHB1dFwiO1xyXG4gICAgICBjb25uLndyaXRlID0gZnVuY3Rpb24gKGNvbW1hbmQpIHtcclxuICAgICAgICBjb21tYW5kcy5wdXNoKGNvbW1hbmQpO1xyXG4gICAgICB9O1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEVtdWxhdG9yUG9ydFwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgLnJldHVybnMocG9ydCk7XHJcbiAgICAgIG1vY2tzLm5ldC5leHBlY3RzKFwiY3JlYXRlQ29ubmVjdGlvblwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwb3J0LCAnbG9jYWxob3N0JylcclxuICAgICAgICAucmV0dXJucyhjb25uKTtcclxuICAgICAgbGV0IHAgPSBhZGIuc2VuZFRlbG5ldENvbW1hbmQoJ2F2ZCBuYW1lJyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbm4uZW1pdCgnY29ubmVjdCcpO1xyXG4gICAgICAgIGNvbm4uZW1pdCgnZGF0YScsICdPSycpO1xyXG4gICAgICAgIGNvbm4uZW1pdCgnZGF0YScsICdPS1xcbnVud2FudGVkX2VjaG9fb3V0cHV0XFxuJyArIGV4cGVjdGVkKTtcclxuICAgICAgICBjb25uLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKCdvdWNoIScpKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICAgIGF3YWl0IHAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9vdWNoLyk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgaXQoJ2lzVmFsaWRDbGFzcyBzaG91bGQgY29ycmVjdGx5IHZhbGlkYXRlIGNsYXNzIG5hbWVzJywgKCkgPT4ge1xyXG4gICAgYWRiLmlzVmFsaWRDbGFzcygnc29tZS5wYWNrYWdlL3NvbWUucGFja2FnZS5BY3Rpdml0eScpLmluZGV4LnNob3VsZC5lcXVhbCgwKTtcclxuICAgIHNob3VsZC5ub3QuZXhpc3QoYWRiLmlzVmFsaWRDbGFzcygnaWxsZWdhbFBhY2thZ2UjL2Fkc2FzZCcpKTtcclxuICB9KTtcclxuICBpdCgnZ2V0QWRiUGF0aCBzaG91bGQgY29ycmVjdGx5IHJldHVybiBhZGJQYXRoJywgKCkgPT4ge1xyXG4gICAgYWRiLmdldEFkYlBhdGgoKS5zaG91bGQuZXF1YWwoYWRiLmV4ZWN1dGFibGUucGF0aCk7XHJcbiAgfSk7XHJcbiAgZGVzY3JpYmUoJ3NldEh0dHBQcm94eScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIG9uIHVuZGVmaW5lZCBwcm94eV9ob3N0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhd2FpdCBhZGIuc2V0SHR0cFByb3h5KCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3Igb24gdW5kZWZpbmVkIHByb3h5X3BvcnQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGF3YWl0IGFkYi5zZXRIdHRwUHJveHkoXCJodHRwOi8vbG9jYWxob3N0XCIpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgc2V0U2V0dGluZyBtZXRob2Qgd2l0aCBjb3JyZWN0IGFyZ3MnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBwcm94eUhvc3QgPSBcImh0dHA6Ly9sb2NhbGhvc3RcIjtcclxuICAgICAgbGV0IHByb3h5UG9ydCA9IDQ3MjM7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXRTZXR0aW5nJykub25jZSgpLndpdGhFeGFjdEFyZ3MoJ2dsb2JhbCcsICdodHRwX3Byb3h5JywgYCR7cHJveHlIb3N0fToke3Byb3h5UG9ydH1gKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldFNldHRpbmcnKS5vbmNlKCkud2l0aEV4YWN0QXJncygnc2VjdXJlJywgJ2h0dHBfcHJveHknLCBgJHtwcm94eUhvc3R9OiR7cHJveHlQb3J0fWApO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0U2V0dGluZycpLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdzeXN0ZW0nLCAnaHR0cF9wcm94eScsIGAke3Byb3h5SG9zdH06JHtwcm94eVBvcnR9YCk7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXRTZXR0aW5nJykub25jZSgpLndpdGhFeGFjdEFyZ3MoJ3N5c3RlbScsICdnbG9iYWxfaHR0cF9wcm94eV9ob3N0JywgcHJveHlIb3N0KTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldFNldHRpbmcnKS5vbmNlKCkud2l0aEV4YWN0QXJncygnc3lzdGVtJywgJ2dsb2JhbF9odHRwX3Byb3h5X3BvcnQnLCBwcm94eVBvcnQpO1xyXG4gICAgICBhd2FpdCBhZGIuc2V0SHR0cFByb3h5KHByb3h5SG9zdCwgcHJveHlQb3J0KTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdzZXRTZXR0aW5nJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCBzZXR0aW5ncyBwdXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uY2UoKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKFsnc2V0dGluZ3MnLCAncHV0JywgJ25hbWVzcGFjZScsICdzZXR0aW5nJywgJ3ZhbHVlJ10pO1xyXG4gICAgICBhd2FpdCBhZGIuc2V0U2V0dGluZygnbmFtZXNwYWNlJywgJ3NldHRpbmcnLCAndmFsdWUnKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG4gIGRlc2NyaWJlKCdnZXRTZXR0aW5nJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBzaGVsbCBzZXR0aW5ncyBnZXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uY2UoKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKFsnc2V0dGluZ3MnLCAnZ2V0JywgJ25hbWVzcGFjZScsICdzZXR0aW5nJ10pXHJcbiAgICAgICAgLnJldHVybnMoJ3ZhbHVlJyk7XHJcbiAgICAgIChhd2FpdCBhZGIuZ2V0U2V0dGluZygnbmFtZXNwYWNlJywgJ3NldHRpbmcnKSkuc2hvdWxkLmJlLmVxdWFsKCd2YWx1ZScpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
