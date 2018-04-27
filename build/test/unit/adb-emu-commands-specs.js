'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _appiumTestSupport = require('appium-test-support');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].use(_chaiAsPromised2['default']);
_chai2['default'].should();

var emulators = [{ udid: 'emulator-5554', state: 'device', port: 5554 }, { udid: 'emulator-5556', state: 'device', port: 5556 }];
var fingerprintId = 1111;

describe('adb emulator commands', function () {
  var adb = new _3['default']();
  describe("emu", function () {
    describe("isEmulatorConnected", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should verify emulators state", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getConnectedEmulators").atLeast(3).returns(emulators);
              adb.curDeviceId = "emulator-5554";
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.isEmulatorConnected());

            case 4:
              context$4$0.sent.should.equal(true);

              adb.curDeviceId = "emulator-5556";
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(adb.isEmulatorConnected());

            case 8:
              context$4$0.sent.should.equal(true);

              adb.curDeviceId = "emulator-5558";
              context$4$0.next = 12;
              return _regeneratorRuntime.awrap(adb.isEmulatorConnected());

            case 12:
              context$4$0.sent.should.equal(false);

              mocks.adb.verify();

            case 14:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("verifyEmulatorConnected", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should throw an exception on emulator not connected", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              adb.curDeviceId = "emulator-5558";
              mocks.adb.expects("isEmulatorConnected").once().returns(false);
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.verifyEmulatorConnected().should.eventually.be.rejected);

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("fingerprint", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should throw exception on undefined fingerprintId", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.fingerprint().should.eventually.be.rejected);

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should throw exception on apiLevel lower than 23", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getApiLevel").once().withExactArgs().returns(21);
              context$4$0.next = 3;
              return _regeneratorRuntime.awrap(adb.fingerprint(fingerprintId).should.eventually.be.rejected);

            case 3:
              mocks.adb.verify();

            case 4:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should call adbExec with the correct args", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("getApiLevel").once().withExactArgs().returns(23);
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "finger", "touch", fingerprintId]).returns();
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.fingerprint(fingerprintId));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("rotate", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should call adbExec with the correct args", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "rotate"]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.rotate());

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("power methods", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should throw exception on invalid power ac state", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.powerAC('dead').should.eventually.be.rejectedWith("Wrong power AC state"));

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set the power ac off", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "power", "ac", adb.POWER_AC_STATES.POWER_AC_OFF]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.powerAC('off'));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set the power ac on", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "power", "ac", adb.POWER_AC_STATES.POWER_AC_ON]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.powerAC('on'));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should throw exception on invalid power battery percent", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.powerCapacity(-1).should.eventually.be.rejectedWith("should be valid integer between 0 and 100"));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.powerCapacity("a").should.eventually.be.rejectedWith("should be valid integer between 0 and 100"));

            case 4:
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.powerCapacity(500).should.eventually.be.rejectedWith("should be valid integer between 0 and 100"));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set the power capacity", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "power", "capacity", 0]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.powerCapacity(0));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should call methods to power off the emulator", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("powerAC").once().withExactArgs('off').returns();
              mocks.adb.expects("powerCapacity").once().withExactArgs(0).returns();
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(adb.powerOFF());

            case 4:
              mocks.adb.verify();

            case 5:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("sendSMS", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should throw exception on invalid message", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.sendSMS("+549341312345678").should.eventually.be.rejectedWith("Sending an SMS requires a message"));

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should throw exception on invalid phoneNumber", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.sendSMS("00549341a312345678", 'Hello Appium').should.eventually.be.rejectedWith("Invalid sendSMS phoneNumber"));

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should call adbExec with the correct args", function callee$3$0() {
        var phoneNumber, message;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              phoneNumber = 4509;
              message = " Hello Appium ";

              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "sms", "send", "4509", "Hello Appium"]).returns();
              context$4$0.next = 7;
              return _regeneratorRuntime.awrap(adb.sendSMS(phoneNumber, message));

            case 7:
              mocks.adb.verify();

            case 8:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("gsm signal method", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should throw exception on invalid strength", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.gsmSignal(5).should.eventually.be.rejectedWith("Invalid signal strength"));

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should call adbExecEmu with the correct args", function callee$3$0() {
        var signalStrength;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              signalStrength = 0;

              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", 'signal-profile', signalStrength]).returns();
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.gsmSignal(signalStrength));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("gsm call methods", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should throw exception on invalid action", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.gsmCall("+549341312345678").should.eventually.be.rejectedWith("Invalid gsm action"));

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should throw exception on invalid phoneNumber", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.gsmCall("+5493413a12345678", "call").should.eventually.be.rejectedWith("Invalid gsmCall phoneNumber"));

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set the correct method for making gsm call", function callee$3$0() {
        var phoneNumber;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              phoneNumber = 4509;

              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", adb.GSM_CALL_ACTIONS.GSM_CALL, "4509"]).returns();
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.gsmCall(phoneNumber, "call"));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set the correct method for accepting gsm call", function callee$3$0() {
        var phoneNumber;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              phoneNumber = 4509;

              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", adb.GSM_CALL_ACTIONS.GSM_ACCEPT, "4509"]).returns();
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.gsmCall(phoneNumber, "accept"));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set the correct method for refusing gsm call", function callee$3$0() {
        var phoneNumber;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              phoneNumber = 4509;

              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", adb.GSM_CALL_ACTIONS.GSM_CANCEL, "4509"]).returns();
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.gsmCall(phoneNumber, "cancel"));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set the correct method for holding gsm call", function callee$3$0() {
        var phoneNumber;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              phoneNumber = 4509;

              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", adb.GSM_CALL_ACTIONS.GSM_HOLD, "4509"]).returns();
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(adb.gsmCall(phoneNumber, "hold"));

            case 6:
              mocks.adb.verify();

            case 7:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
    describe("network speed method", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should throw exception on invalid speed", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.networkSpeed('light').should.eventually.be.rejectedWith("Invalid network speed"));

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function () {
          var _step$value = _slicedToArray(_step.value, 2);

          var key = _step$value[0];
          var value = _step$value[1];

          it('should set network speed(' + key + ') correctly', function callee$4$0() {
            return _regeneratorRuntime.async(function callee$4$0$(context$5$0) {
              while (1) switch (context$5$0.prev = context$5$0.next) {
                case 0:
                  mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
                  mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
                  mocks.adb.expects("adbExec").once().withExactArgs(["emu", "network", "speed", value]).returns();
                  context$5$0.next = 5;
                  return _regeneratorRuntime.awrap(adb.networkSpeed(value));

                case 5:
                  mocks.adb.verify();

                case 6:
                case 'end':
                  return context$5$0.stop();
              }
            }, null, _this);
          });
        };

        for (var _iterator = _getIterator(_lodash2['default'].toPairs(adb.NETWORK_SPEED)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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
    }));
    describe("gsm voice method", (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
      it("should throw exception on invalid strength", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(adb.gsmVoice('weird').should.eventually.be.rejectedWith("Invalid gsm voice state"));

            case 2:
              mocks.adb.verify();

            case 3:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set gsm voice to unregistered", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", "voice", adb.GSM_VOICE_STATES.GSM_VOICE_UNREGISTERED]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.gsmVoice("unregistered"));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set gsm voice to home", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", "voice", adb.GSM_VOICE_STATES.GSM_VOICE_HOME]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.gsmVoice("home"));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set gsm voice to roaming", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", "voice", adb.GSM_VOICE_STATES.GSM_VOICE_ROAMING]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.gsmVoice("roaming"));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set gsm voice to searching", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", "voice", adb.GSM_VOICE_STATES.GSM_VOICE_SEARCHING]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.gsmVoice("searching"));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set gsm voice to denied", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", "voice", adb.GSM_VOICE_STATES.GSM_VOICE_DENIED]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.gsmVoice("denied"));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set gsm voice to off", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", "voice", adb.GSM_VOICE_STATES.GSM_VOICE_OFF]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.gsmVoice("off"));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it("should set gsm voice to on", function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              mocks.adb.expects("isEmulatorConnected").once().withExactArgs().returns(true);
              mocks.adb.expects("resetTelnetAuthToken").once().withExactArgs().returns();
              mocks.adb.expects("adbExec").once().withExactArgs(["emu", "gsm", "voice", adb.GSM_VOICE_STATES.GSM_VOICE_ON]).returns();
              context$4$0.next = 5;
              return _regeneratorRuntime.awrap(adb.gsmVoice("on"));

            case 5:
              mocks.adb.verify();

            case 6:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    }));
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hZGItZW11LWNvbW1hbmRzLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQzdCLE9BQU87Ozs7aUNBQ0cscUJBQXFCOztzQkFDakMsUUFBUTs7OztBQUV0QixrQkFBSyxHQUFHLDZCQUFnQixDQUFDO0FBQ3pCLGtCQUFLLE1BQU0sRUFBRSxDQUFDOztBQUVkLElBQU0sU0FBUyxHQUFHLENBQ2hCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFDdEQsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUN2RCxDQUFDO0FBQ0YsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDOztBQUUzQixRQUFRLENBQUMsdUJBQXVCLEVBQUUsWUFBTTtBQUN0QyxNQUFJLEdBQUcsR0FBRyxtQkFBUyxDQUFDO0FBQ3BCLFVBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBTTtBQUNwQixZQUFRLENBQUMscUJBQXFCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDMUQsUUFBRSxDQUFDLCtCQUErQixFQUFFOzs7O0FBQ2xDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUN2QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ1YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RCLGlCQUFHLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQzs7K0NBQzNCLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRTs7OytCQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTs7QUFDbkQsaUJBQUcsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDOzsrQ0FDM0IsR0FBRyxDQUFDLG1CQUFtQixFQUFFOzs7K0JBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJOztBQUNuRCxpQkFBRyxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7OytDQUMzQixHQUFHLENBQUMsbUJBQW1CLEVBQUU7OzsrQkFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7O0FBQ3BELG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLHlCQUF5QixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzlELFFBQUUsQ0FBQyxxREFBcUQsRUFBRTs7OztBQUN4RCxpQkFBRyxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7QUFDbEMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQ3JDLElBQUksRUFBRSxDQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7K0NBQ1osR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUTs7O0FBQ2pFLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGFBQWEsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNsRCxRQUFFLENBQUMsbURBQW1ELEVBQUU7Ozs7OytDQUNoRCxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUTs7O0FBQ3JELG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxrREFBa0QsRUFBRTs7OztBQUNyRCxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQzdCLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OytDQUNULEdBQUcsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUTs7O0FBQ2xFLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQywyQ0FBMkMsRUFBRTs7OztBQUM5QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQzdCLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUMvRCxPQUFPLEVBQUUsQ0FBQzs7K0NBQ1AsR0FBRyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7OztBQUNwQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxRQUFRLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDN0MsUUFBRSxDQUFDLDJDQUEyQyxFQUFFOzs7O0FBQzlDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUNyQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUN0QyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxFQUFFLENBQUM7QUFDYixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3pCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUN2QyxPQUFPLEVBQUUsQ0FBQzs7K0NBQ1AsR0FBRyxDQUFDLE1BQU0sRUFBRTs7O0FBQ2xCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGVBQWUsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNwRCxRQUFFLENBQUMsa0RBQWtELEVBQUU7Ozs7OytDQUMvQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQzs7O0FBQ25GLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyw2QkFBNkIsRUFBRTs7OztBQUNoQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQzlFLE9BQU8sRUFBRSxDQUFDOzsrQ0FDUCxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzs7O0FBQ3hCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyw0QkFBNEIsRUFBRTs7OztBQUMvQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQzdFLE9BQU8sRUFBRSxDQUFDOzsrQ0FDUCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs7O0FBQ3ZCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyx5REFBeUQsRUFBRTs7Ozs7K0NBQ3RELEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsMkNBQTJDLENBQUM7Ozs7K0NBQ3BHLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLDJDQUEyQyxDQUFDOzs7OytDQUNyRyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQywyQ0FBMkMsQ0FBQzs7O0FBQzNHLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQywrQkFBK0IsRUFBRTs7OztBQUNsQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNyRCxPQUFPLEVBQUUsQ0FBQzs7K0NBQ1AsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OztBQUMxQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7QUFDbEQsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQzNCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUMvQixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQ3ZCLE9BQU8sRUFBRSxDQUFDOzsrQ0FDUCxHQUFHLENBQUMsUUFBUSxFQUFFOzs7QUFDcEIsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixZQUFRLENBQUMsU0FBUyxFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzlDLFFBQUUsQ0FBQywyQ0FBMkMsRUFBRTs7Ozs7K0NBQ3hDLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsbUNBQW1DLENBQUM7OztBQUM1RyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7OytDQUM1QyxHQUFHLENBQUMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQzs7O0FBQ3hILG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQywyQ0FBMkMsRUFBRTtZQUMxQyxXQUFXLEVBQ1gsT0FBTzs7OztBQURQLHlCQUFXLEdBQUcsSUFBSTtBQUNsQixxQkFBTyxHQUFHLGdCQUFnQjs7QUFDOUIsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQ3JDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQ3RDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLEVBQUUsQ0FBQztBQUNiLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDekIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQ3BFLE9BQU8sRUFBRSxDQUFDOzsrQ0FDUCxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7OztBQUN2QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7S0FDSixDQUFDLENBQUMsQ0FBQztBQUNKLFlBQVEsQ0FBQyxtQkFBbUIsRUFBRSxrQ0FBVSxFQUFDLEdBQUcsRUFBSCxHQUFHLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN4RCxRQUFFLENBQUMsNENBQTRDLEVBQUU7Ozs7OytDQUN6QyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyx5QkFBeUIsQ0FBQzs7O0FBQ25GLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtZQUM3QyxjQUFjOzs7O0FBQWQsNEJBQWMsR0FBRyxDQUFDOztBQUN0QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQ3RFLE9BQU8sRUFBRSxDQUFDOzsrQ0FDUCxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQzs7O0FBQ25DLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGtCQUFrQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3ZELFFBQUUsQ0FBQywwQ0FBMEMsRUFBRTs7Ozs7K0NBQ3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUM7OztBQUM3RixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsK0NBQStDLEVBQUU7Ozs7OytDQUM1QyxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQzs7O0FBQy9HLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxtREFBbUQsRUFBRTtZQUNsRCxXQUFXOzs7O0FBQVgseUJBQVcsR0FBRyxJQUFJOztBQUN0QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDM0UsT0FBTyxFQUFFLENBQUM7OytDQUNQLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7O0FBQ3RDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxzREFBc0QsRUFBRTtZQUNyRCxXQUFXOzs7O0FBQVgseUJBQVcsR0FBRyxJQUFJOztBQUN0QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDN0UsT0FBTyxFQUFFLENBQUM7OytDQUNQLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxxREFBcUQsRUFBRTtZQUNwRCxXQUFXOzs7O0FBQVgseUJBQVcsR0FBRyxJQUFJOztBQUN0QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDN0UsT0FBTyxFQUFFLENBQUM7OytDQUNQLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQzs7O0FBQ3hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxvREFBb0QsRUFBRTtZQUNuRCxXQUFXOzs7O0FBQVgseUJBQVcsR0FBRyxJQUFJOztBQUN0QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDM0UsT0FBTyxFQUFFLENBQUM7OytDQUNQLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7O0FBQ3RDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLHNCQUFzQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzNELFFBQUUsQ0FBQyx5Q0FBeUMsRUFBRTs7Ozs7K0NBQ3RDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDOzs7QUFDMUYsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Y0FDTyxHQUFHO2NBQUUsS0FBSzs7QUFDbEIsWUFBRSwrQkFBNkIsR0FBRyxrQkFBZTs7OztBQUMvQyx1QkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQix1QkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsdUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUN4RCxPQUFPLEVBQUUsQ0FBQzs7bURBQ1AsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7OztBQUM3Qix1QkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztXQUNwQixDQUFDLENBQUM7OztBQWJMLDBDQUF5QixvQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyw0R0FBRTs7U0FjdEQ7Ozs7Ozs7Ozs7Ozs7OztLQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ0osWUFBUSxDQUFDLGtCQUFrQixFQUFFLGtDQUFVLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3ZELFFBQUUsQ0FBQyw0Q0FBNEMsRUFBRTs7Ozs7K0NBQ3pDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHlCQUF5QixDQUFDOzs7QUFDeEYsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLHNDQUFzQyxFQUFFOzs7O0FBQ3pDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUNyQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUN0QyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxFQUFFLENBQUM7QUFDYixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3pCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQzFGLE9BQU8sRUFBRSxDQUFDOzsrQ0FDUCxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQzs7O0FBQ2xDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyw4QkFBOEIsRUFBRTs7OztBQUNqQyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FDbEYsT0FBTyxFQUFFLENBQUM7OytDQUNQLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDOzs7QUFDMUIsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLGlDQUFpQyxFQUFFOzs7O0FBQ3BDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUNyQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUN0QyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxFQUFFLENBQUM7QUFDYixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3pCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQ3JGLE9BQU8sRUFBRSxDQUFDOzsrQ0FDUCxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQzs7O0FBQzdCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxtQ0FBbUMsRUFBRTs7OztBQUN0QyxtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FDckMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FDdEMsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQ3RCLE9BQU8sRUFBRSxDQUFDO0FBQ2IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUN6QixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUN2RixPQUFPLEVBQUUsQ0FBQzs7K0NBQ1AsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7OztBQUMvQixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsZ0NBQWdDLEVBQUU7Ozs7QUFDbkMsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQ3JDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQ3RDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLEVBQUUsQ0FBQztBQUNiLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDekIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FDcEYsT0FBTyxFQUFFLENBQUM7OytDQUNQLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDOzs7QUFDNUIsbUJBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7T0FDcEIsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLDZCQUE2QixFQUFFOzs7O0FBQ2hDLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUNyQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUN0QyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDdEIsT0FBTyxFQUFFLENBQUM7QUFDYixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQ3pCLElBQUksRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUNqRixPQUFPLEVBQUUsQ0FBQzs7K0NBQ1AsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7OztBQUN6QixtQkFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztPQUNwQixDQUFDLENBQUM7QUFDSCxRQUFFLENBQUMsNEJBQTRCLEVBQUU7Ozs7QUFDL0IsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQ3JDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsbUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQ3RDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLEVBQUUsQ0FBQztBQUNiLG1CQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDekIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQ2hGLE9BQU8sRUFBRSxDQUFDOzsrQ0FDUCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzs7O0FBQ3hCLG1CQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O09BQ3BCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQyxDQUFDO0dBQ0wsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9hZGItZW11LWNvbW1hbmRzLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFEQiBmcm9tICcuLi8uLic7XHJcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5jaGFpLnNob3VsZCgpO1xyXG5cclxuY29uc3QgZW11bGF0b3JzID0gW1xyXG4gIHsgdWRpZDogJ2VtdWxhdG9yLTU1NTQnLCBzdGF0ZTogJ2RldmljZScsIHBvcnQ6IDU1NTQgfSxcclxuICB7IHVkaWQ6ICdlbXVsYXRvci01NTU2Jywgc3RhdGU6ICdkZXZpY2UnLCBwb3J0OiA1NTU2IH0sXHJcbl07XHJcbmNvbnN0IGZpbmdlcnByaW50SWQgPSAxMTExO1xyXG5cclxuZGVzY3JpYmUoJ2FkYiBlbXVsYXRvciBjb21tYW5kcycsICgpID0+IHtcclxuICBsZXQgYWRiID0gbmV3IEFEQigpO1xyXG4gIGRlc2NyaWJlKFwiZW11XCIsICgpID0+IHtcclxuICAgIGRlc2NyaWJlKFwiaXNFbXVsYXRvckNvbm5lY3RlZFwiLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdChcInNob3VsZCB2ZXJpZnkgZW11bGF0b3JzIHN0YXRlXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldENvbm5lY3RlZEVtdWxhdG9yc1wiKVxyXG4gICAgICAgICAgLmF0TGVhc3QoMylcclxuICAgICAgICAgIC5yZXR1cm5zKGVtdWxhdG9ycyk7XHJcbiAgICAgICAgYWRiLmN1ckRldmljZUlkID0gXCJlbXVsYXRvci01NTU0XCI7XHJcbiAgICAgICAgKGF3YWl0IGFkYi5pc0VtdWxhdG9yQ29ubmVjdGVkKCkpLnNob3VsZC5lcXVhbCh0cnVlKTtcclxuICAgICAgICBhZGIuY3VyRGV2aWNlSWQgPSBcImVtdWxhdG9yLTU1NTZcIjtcclxuICAgICAgICAoYXdhaXQgYWRiLmlzRW11bGF0b3JDb25uZWN0ZWQoKSkuc2hvdWxkLmVxdWFsKHRydWUpO1xyXG4gICAgICAgIGFkYi5jdXJEZXZpY2VJZCA9IFwiZW11bGF0b3ItNTU1OFwiO1xyXG4gICAgICAgIChhd2FpdCBhZGIuaXNFbXVsYXRvckNvbm5lY3RlZCgpKS5zaG91bGQuZXF1YWwoZmFsc2UpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZShcInZlcmlmeUVtdWxhdG9yQ29ubmVjdGVkXCIsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KFwic2hvdWxkIHRocm93IGFuIGV4Y2VwdGlvbiBvbiBlbXVsYXRvciBub3QgY29ubmVjdGVkXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhZGIuY3VyRGV2aWNlSWQgPSBcImVtdWxhdG9yLTU1NThcIjtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImlzRW11bGF0b3JDb25uZWN0ZWRcIilcclxuICAgICAgICAgIC5vbmNlKClcclxuICAgICAgICAgIC5yZXR1cm5zKGZhbHNlKTtcclxuICAgICAgICBhd2FpdCBhZGIudmVyaWZ5RW11bGF0b3JDb25uZWN0ZWQoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoXCJmaW5nZXJwcmludFwiLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdChcInNob3VsZCB0aHJvdyBleGNlcHRpb24gb24gdW5kZWZpbmVkIGZpbmdlcnByaW50SWRcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGFkYi5maW5nZXJwcmludCgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIHRocm93IGV4Y2VwdGlvbiBvbiBhcGlMZXZlbCBsb3dlciB0aGFuIDIzXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoMjEpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5maW5nZXJwcmludChmaW5nZXJwcmludElkKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdChcInNob3VsZCBjYWxsIGFkYkV4ZWMgd2l0aCB0aGUgY29ycmVjdCBhcmdzXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldEFwaUxldmVsXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoMjMpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiaXNFbXVsYXRvckNvbm5lY3RlZFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicmVzZXRUZWxuZXRBdXRoVG9rZW5cIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiYWRiRXhlY1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFtcImVtdVwiLCBcImZpbmdlclwiLCBcInRvdWNoXCIsIGZpbmdlcnByaW50SWRdKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBhd2FpdCBhZGIuZmluZ2VycHJpbnQoZmluZ2VycHJpbnRJZCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKFwicm90YXRlXCIsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KFwic2hvdWxkIGNhbGwgYWRiRXhlYyB3aXRoIHRoZSBjb3JyZWN0IGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiaXNFbXVsYXRvckNvbm5lY3RlZFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicmVzZXRUZWxuZXRBdXRoVG9rZW5cIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiYWRiRXhlY1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFtcImVtdVwiLCBcInJvdGF0ZVwiXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLnJvdGF0ZSgpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZShcInBvd2VyIG1ldGhvZHNcIiwgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcclxuICAgICAgaXQoXCJzaG91bGQgdGhyb3cgZXhjZXB0aW9uIG9uIGludmFsaWQgcG93ZXIgYWMgc3RhdGVcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGFkYi5wb3dlckFDKCdkZWFkJykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKFwiV3JvbmcgcG93ZXIgQUMgc3RhdGVcIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgc2V0IHRoZSBwb3dlciBhYyBvZmZcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiaXNFbXVsYXRvckNvbm5lY3RlZFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicmVzZXRUZWxuZXRBdXRoVG9rZW5cIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiYWRiRXhlY1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFtcImVtdVwiLCBcInBvd2VyXCIsIFwiYWNcIiwgYWRiLlBPV0VSX0FDX1NUQVRFUy5QT1dFUl9BQ19PRkZdKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBhd2FpdCBhZGIucG93ZXJBQygnb2ZmJyk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgc2V0IHRoZSBwb3dlciBhYyBvblwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpc0VtdWxhdG9yQ29ubmVjdGVkXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZXNldFRlbG5ldEF1dGhUb2tlblwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoW1wiZW11XCIsIFwicG93ZXJcIiwgXCJhY1wiLCBhZGIuUE9XRVJfQUNfU1RBVEVTLlBPV0VSX0FDX09OXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLnBvd2VyQUMoJ29uJyk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgdGhyb3cgZXhjZXB0aW9uIG9uIGludmFsaWQgcG93ZXIgYmF0dGVyeSBwZXJjZW50XCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBhZGIucG93ZXJDYXBhY2l0eSgtMSkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKFwic2hvdWxkIGJlIHZhbGlkIGludGVnZXIgYmV0d2VlbiAwIGFuZCAxMDBcIik7XHJcbiAgICAgICAgYXdhaXQgYWRiLnBvd2VyQ2FwYWNpdHkoXCJhXCIpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcInNob3VsZCBiZSB2YWxpZCBpbnRlZ2VyIGJldHdlZW4gMCBhbmQgMTAwXCIpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5wb3dlckNhcGFjaXR5KDUwMCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKFwic2hvdWxkIGJlIHZhbGlkIGludGVnZXIgYmV0d2VlbiAwIGFuZCAxMDBcIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgc2V0IHRoZSBwb3dlciBjYXBhY2l0eVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpc0VtdWxhdG9yQ29ubmVjdGVkXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZXNldFRlbG5ldEF1dGhUb2tlblwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoW1wiZW11XCIsIFwicG93ZXJcIiwgXCJjYXBhY2l0eVwiLCAwXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLnBvd2VyQ2FwYWNpdHkoMCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgY2FsbCBtZXRob2RzIHRvIHBvd2VyIG9mZiB0aGUgZW11bGF0b3JcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicG93ZXJBQ1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdvZmYnKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInBvd2VyQ2FwYWNpdHlcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygwKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBhd2FpdCBhZGIucG93ZXJPRkYoKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoXCJzZW5kU01TXCIsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KFwic2hvdWxkIHRocm93IGV4Y2VwdGlvbiBvbiBpbnZhbGlkIG1lc3NhZ2VcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGFkYi5zZW5kU01TKFwiKzU0OTM0MTMxMjM0NTY3OFwiKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCJTZW5kaW5nIGFuIFNNUyByZXF1aXJlcyBhIG1lc3NhZ2VcIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgdGhyb3cgZXhjZXB0aW9uIG9uIGludmFsaWQgcGhvbmVOdW1iZXJcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGFkYi5zZW5kU01TKFwiMDA1NDkzNDFhMzEyMzQ1Njc4XCIsICdIZWxsbyBBcHBpdW0nKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCJJbnZhbGlkIHNlbmRTTVMgcGhvbmVOdW1iZXJcIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgY2FsbCBhZGJFeGVjIHdpdGggdGhlIGNvcnJlY3QgYXJnc1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHBob25lTnVtYmVyID0gNDUwOTtcclxuICAgICAgICBsZXQgbWVzc2FnZSA9IFwiIEhlbGxvIEFwcGl1bSBcIjtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImlzRW11bGF0b3JDb25uZWN0ZWRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucyh0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJlc2V0VGVsbmV0QXV0aFRva2VuXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJzbXNcIiwgXCJzZW5kXCIsIFwiNDUwOVwiLCBcIkhlbGxvIEFwcGl1bVwiXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLnNlbmRTTVMocGhvbmVOdW1iZXIsIG1lc3NhZ2UpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgICBkZXNjcmliZShcImdzbSBzaWduYWwgbWV0aG9kXCIsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XHJcbiAgICAgIGl0KFwic2hvdWxkIHRocm93IGV4Y2VwdGlvbiBvbiBpbnZhbGlkIHN0cmVuZ3RoXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBhZGIuZ3NtU2lnbmFsKDUpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcIkludmFsaWQgc2lnbmFsIHN0cmVuZ3RoXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIGNhbGwgYWRiRXhlY0VtdSB3aXRoIHRoZSBjb3JyZWN0IGFyZ3NcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGxldCBzaWduYWxTdHJlbmd0aCA9IDA7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpc0VtdWxhdG9yQ29ubmVjdGVkXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZXNldFRlbG5ldEF1dGhUb2tlblwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoW1wiZW11XCIsIFwiZ3NtXCIsICdzaWduYWwtcHJvZmlsZScsIHNpZ25hbFN0cmVuZ3RoXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdzbVNpZ25hbChzaWduYWxTdHJlbmd0aCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKFwiZ3NtIGNhbGwgbWV0aG9kc1wiLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdChcInNob3VsZCB0aHJvdyBleGNlcHRpb24gb24gaW52YWxpZCBhY3Rpb25cIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGFkYi5nc21DYWxsKFwiKzU0OTM0MTMxMjM0NTY3OFwiKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCJJbnZhbGlkIGdzbSBhY3Rpb25cIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgdGhyb3cgZXhjZXB0aW9uIG9uIGludmFsaWQgcGhvbmVOdW1iZXJcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IGFkYi5nc21DYWxsKFwiKzU0OTM0MTNhMTIzNDU2NzhcIiwgXCJjYWxsXCIpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcIkludmFsaWQgZ3NtQ2FsbCBwaG9uZU51bWJlclwiKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdChcInNob3VsZCBzZXQgdGhlIGNvcnJlY3QgbWV0aG9kIGZvciBtYWtpbmcgZ3NtIGNhbGxcIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGxldCBwaG9uZU51bWJlciA9IDQ1MDk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpc0VtdWxhdG9yQ29ubmVjdGVkXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZXNldFRlbG5ldEF1dGhUb2tlblwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoW1wiZW11XCIsIFwiZ3NtXCIsIGFkYi5HU01fQ0FMTF9BQ1RJT05TLkdTTV9DQUxMLCBcIjQ1MDlcIl0pXHJcbiAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5nc21DYWxsKHBob25lTnVtYmVyLCBcImNhbGxcIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgc2V0IHRoZSBjb3JyZWN0IG1ldGhvZCBmb3IgYWNjZXB0aW5nIGdzbSBjYWxsXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBsZXQgcGhvbmVOdW1iZXIgPSA0NTA5O1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiaXNFbXVsYXRvckNvbm5lY3RlZFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicmVzZXRUZWxuZXRBdXRoVG9rZW5cIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiYWRiRXhlY1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFtcImVtdVwiLCBcImdzbVwiLCBhZGIuR1NNX0NBTExfQUNUSU9OUy5HU01fQUNDRVBULCBcIjQ1MDlcIl0pXHJcbiAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5nc21DYWxsKHBob25lTnVtYmVyLCBcImFjY2VwdFwiKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpdChcInNob3VsZCBzZXQgdGhlIGNvcnJlY3QgbWV0aG9kIGZvciByZWZ1c2luZyBnc20gY2FsbFwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHBob25lTnVtYmVyID0gNDUwOTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImlzRW11bGF0b3JDb25uZWN0ZWRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucyh0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJlc2V0VGVsbmV0QXV0aFRva2VuXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJnc21cIiwgYWRiLkdTTV9DQUxMX0FDVElPTlMuR1NNX0NBTkNFTCwgXCI0NTA5XCJdKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBhd2FpdCBhZGIuZ3NtQ2FsbChwaG9uZU51bWJlciwgXCJjYW5jZWxcIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgaXQoXCJzaG91bGQgc2V0IHRoZSBjb3JyZWN0IG1ldGhvZCBmb3IgaG9sZGluZyBnc20gY2FsbFwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHBob25lTnVtYmVyID0gNDUwOTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImlzRW11bGF0b3JDb25uZWN0ZWRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucyh0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJlc2V0VGVsbmV0QXV0aFRva2VuXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJnc21cIiwgYWRiLkdTTV9DQUxMX0FDVElPTlMuR1NNX0hPTEQsIFwiNDUwOVwiXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdzbUNhbGwocGhvbmVOdW1iZXIsIFwiaG9sZFwiKTtcclxuICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgZGVzY3JpYmUoXCJuZXR3b3JrIHNwZWVkIG1ldGhvZFwiLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdChcInNob3VsZCB0aHJvdyBleGNlcHRpb24gb24gaW52YWxpZCBzcGVlZFwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgYWRiLm5ldHdvcmtTcGVlZCgnbGlnaHQnKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoXCJJbnZhbGlkIG5ldHdvcmsgc3BlZWRcIik7XHJcbiAgICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIF8udG9QYWlycyhhZGIuTkVUV09SS19TUEVFRCkpIHtcclxuICAgICAgICBpdChgc2hvdWxkIHNldCBuZXR3b3JrIHNwZWVkKCR7a2V5fSkgY29ycmVjdGx5YCwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpc0VtdWxhdG9yQ29ubmVjdGVkXCIpXHJcbiAgICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZXNldFRlbG5ldEF1dGhUb2tlblwiKVxyXG4gICAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJuZXR3b3JrXCIsIFwic3BlZWRcIiwgdmFsdWVdKVxyXG4gICAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgICAgYXdhaXQgYWRiLm5ldHdvcmtTcGVlZCh2YWx1ZSk7XHJcbiAgICAgICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIGRlc2NyaWJlKFwiZ3NtIHZvaWNlIG1ldGhvZFwiLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgICBpdChcInNob3VsZCB0aHJvdyBleGNlcHRpb24gb24gaW52YWxpZCBzdHJlbmd0aFwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdzbVZvaWNlKCd3ZWlyZCcpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aChcIkludmFsaWQgZ3NtIHZvaWNlIHN0YXRlXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIHNldCBnc20gdm9pY2UgdG8gdW5yZWdpc3RlcmVkXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImlzRW11bGF0b3JDb25uZWN0ZWRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucyh0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJlc2V0VGVsbmV0QXV0aFRva2VuXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJnc21cIiwgXCJ2b2ljZVwiLCBhZGIuR1NNX1ZPSUNFX1NUQVRFUy5HU01fVk9JQ0VfVU5SRUdJU1RFUkVEXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdzbVZvaWNlKFwidW5yZWdpc3RlcmVkXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIHNldCBnc20gdm9pY2UgdG8gaG9tZVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpc0VtdWxhdG9yQ29ubmVjdGVkXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZXNldFRlbG5ldEF1dGhUb2tlblwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoW1wiZW11XCIsIFwiZ3NtXCIsIFwidm9pY2VcIiwgYWRiLkdTTV9WT0lDRV9TVEFURVMuR1NNX1ZPSUNFX0hPTUVdKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBhd2FpdCBhZGIuZ3NtVm9pY2UoXCJob21lXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIHNldCBnc20gdm9pY2UgdG8gcm9hbWluZ1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpc0VtdWxhdG9yQ29ubmVjdGVkXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnModHJ1ZSk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJyZXNldFRlbG5ldEF1dGhUb2tlblwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJhZGJFeGVjXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoW1wiZW11XCIsIFwiZ3NtXCIsIFwidm9pY2VcIiwgYWRiLkdTTV9WT0lDRV9TVEFURVMuR1NNX1ZPSUNFX1JPQU1JTkddKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBhd2FpdCBhZGIuZ3NtVm9pY2UoXCJyb2FtaW5nXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIHNldCBnc20gdm9pY2UgdG8gc2VhcmNoaW5nXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImlzRW11bGF0b3JDb25uZWN0ZWRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucyh0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJlc2V0VGVsbmV0QXV0aFRva2VuXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJnc21cIiwgXCJ2b2ljZVwiLCBhZGIuR1NNX1ZPSUNFX1NUQVRFUy5HU01fVk9JQ0VfU0VBUkNISU5HXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdzbVZvaWNlKFwic2VhcmNoaW5nXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIHNldCBnc20gdm9pY2UgdG8gZGVuaWVkXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImlzRW11bGF0b3JDb25uZWN0ZWRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucyh0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJlc2V0VGVsbmV0QXV0aFRva2VuXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJnc21cIiwgXCJ2b2ljZVwiLCBhZGIuR1NNX1ZPSUNFX1NUQVRFUy5HU01fVk9JQ0VfREVOSUVEXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdzbVZvaWNlKFwiZGVuaWVkXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIHNldCBnc20gdm9pY2UgdG8gb2ZmXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImlzRW11bGF0b3JDb25uZWN0ZWRcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucyh0cnVlKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInJlc2V0VGVsbmV0QXV0aFRva2VuXCIpXHJcbiAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAgICAgLnJldHVybnMoKTtcclxuICAgICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbXCJlbXVcIiwgXCJnc21cIiwgXCJ2b2ljZVwiLCBhZGIuR1NNX1ZPSUNFX1NUQVRFUy5HU01fVk9JQ0VfT0ZGXSlcclxuICAgICAgICAgIC5yZXR1cm5zKCk7XHJcbiAgICAgICAgYXdhaXQgYWRiLmdzbVZvaWNlKFwib2ZmXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGl0KFwic2hvdWxkIHNldCBnc20gdm9pY2UgdG8gb25cIiwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiaXNFbXVsYXRvckNvbm5lY3RlZFwiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgIC5yZXR1cm5zKHRydWUpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwicmVzZXRUZWxuZXRBdXRoVG9rZW5cIilcclxuICAgICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiYWRiRXhlY1wiKVxyXG4gICAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFtcImVtdVwiLCBcImdzbVwiLCBcInZvaWNlXCIsIGFkYi5HU01fVk9JQ0VfU1RBVEVTLkdTTV9WT0lDRV9PTl0pXHJcbiAgICAgICAgICAucmV0dXJucygpO1xyXG4gICAgICAgIGF3YWl0IGFkYi5nc21Wb2ljZShcIm9uXCIpO1xyXG4gICAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
