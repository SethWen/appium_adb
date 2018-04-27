'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var PHONE_NUMBER_PATTERN = /^[\+]?[(]?[0-9]*[)]?[-\s\.]?[0-9]*[-\s\.]?[0-9]{2,}$/im;

var emuMethods = {};
emuMethods.POWER_AC_STATES = {
  POWER_AC_ON: 'on',
  POWER_AC_OFF: 'off'
};
emuMethods.GSM_CALL_ACTIONS = {
  GSM_CALL: 'call',
  GSM_ACCEPT: 'accept',
  GSM_CANCEL: 'cancel',
  GSM_HOLD: 'hold'
};
emuMethods.GSM_VOICE_STATES = {
  GSM_VOICE_UNREGISTERED: 'unregistered',
  GSM_VOICE_HOME: 'home',
  GSM_VOICE_ROAMING: 'roaming',
  GSM_VOICE_SEARCHING: 'searching',
  GSM_VOICE_DENIED: 'denied',
  GSM_VOICE_OFF: 'off',
  GSM_VOICE_ON: 'on'
};
emuMethods.GSM_SIGNAL_STRENGTHS = [0, 1, 2, 3, 4];

emuMethods.NETWORK_SPEED = {
  GSM: 'gsm', // GSM/CSD (up: 14.4, down: 14.4).
  SCSD: 'scsd', // HSCSD (up: 14.4, down: 57.6).
  GPRS: 'gprs', // GPRS (up: 28.8, down: 57.6).
  EDGE: 'edge', // EDGE/EGPRS (up: 473.6, down: 473.6).
  UMTS: 'umts', // UMTS/3G (up: 384.0, down: 384.0).
  HSDPA: 'hsdpa', // HSDPA (up: 5760.0, down: 13,980.0).
  LTE: 'lte', // LTE (up: 58,000, down: 173,000).
  EVDO: 'evdo', // EVDO (up: 75,000, down: 280,000).
  FULL: 'full' // No limit, the default (up: 0.0, down: 0.0).
};

/**
 * Check the emulator state.
 *
 * @return {boolean} True if Emulator is visible to adb.
 */
emuMethods.isEmulatorConnected = function callee$0$0() {
  var emulators;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getConnectedEmulators());

      case 2:
        emulators = context$1$0.sent;
        return context$1$0.abrupt('return', !!_lodash2['default'].find(emulators, function (x) {
          return x && x.udid === _this.curDeviceId;
        }));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Verify the emulator is connected.
 *
 * @throws {error} If Emulator is not visible to adb.
 */
emuMethods.verifyEmulatorConnected = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.isEmulatorConnected());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        _loggerJs2['default'].errorAndThrow('The emulator "' + this.curDeviceId + '" was unexpectedly disconnected');

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate fingerprint touch event on the connected emulator.
 *
 * @param {string} fingerprintId - The ID of the fingerprint.
 */
emuMethods.fingerprint = function callee$0$0(fingerprintId) {
  var level;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!fingerprintId) {
          _loggerJs2['default'].errorAndThrow('Fingerprint id parameter must be defined');
        }
        // the method used only works for API level 23 and above
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getApiLevel());

      case 3:
        level = context$1$0.sent;

        if (level < 23) {
          _loggerJs2['default'].errorAndThrow('Device API Level must be >= 23. Current Api level \'' + level + '\'');
        }
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['finger', 'touch', fingerprintId]));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Change the display orientation on the connected emulator.
 * The orientation is changed (PI/2 is added) every time
 * this method is called.
 */
emuMethods.rotate = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['rotate']));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate power state change on the connected emulator.
 *
 * @param {string} state ['on'] - Either 'on' or 'off'.
 */
emuMethods.powerAC = function callee$0$0() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'on' : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (_lodash2['default'].values(emuMethods.POWER_AC_STATES).indexOf(state) === -1) {
          _loggerJs2['default'].errorAndThrow('Wrong power AC state sent \'' + state + '\'. Supported values: ' + _lodash2['default'].values(emuMethods.POWER_AC_STATES) + ']');
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['power', 'ac', state]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate power capacity change on the connected emulator.
 *
 * @param {string|number} percent [100] - Percentage value in range [0, 100].
 */
emuMethods.powerCapacity = function callee$0$0() {
  var percent = arguments.length <= 0 || arguments[0] === undefined ? 100 : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        percent = parseInt(percent, 10);
        if (isNaN(percent) || percent < 0 || percent > 100) {
          _loggerJs2['default'].errorAndThrow('The percentage value should be valid integer between 0 and 100');
        }
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['power', 'capacity', percent]));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate power off event on the connected emulator.
 */
emuMethods.powerOFF = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.powerAC(emuMethods.POWER_AC_STATES.POWER_AC_OFF));

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.powerCapacity(0));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate send SMS event on the connected emulator.
 *
 * @param {string|number} phoneNumber - The phone number of message sender.
 * @param {string} message [''] - The message content.
 * @throws {error} If phone number has invalid format.
 */
emuMethods.sendSMS = function callee$0$0(phoneNumber) {
  var message = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        message = message.trim();
        if (message === "") {
          _loggerJs2['default'].errorAndThrow('Sending an SMS requires a message');
        }
        phoneNumber = ('' + phoneNumber).replace(/\s*/, "");
        if (!PHONE_NUMBER_PATTERN.test(phoneNumber)) {
          _loggerJs2['default'].errorAndThrow('Invalid sendSMS phoneNumber param ' + phoneNumber);
        }
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['sms', 'send', phoneNumber, message]));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate GSM call event on the connected emulator.
 *
 * @param {string|number} phoneNumber - The phone number of the caller.
 * @param {string} action [''] - One of available GSM call actions.
 * @throws {error} If phone number has invalid format.
 * @throws {error} If _action_ value is invalid.
 */
emuMethods.gsmCall = function callee$0$0(phoneNumber) {
  var action = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (_lodash2['default'].values(emuMethods.GSM_CALL_ACTIONS).indexOf(action) === -1) {
          _loggerJs2['default'].errorAndThrow('Invalid gsm action param ' + action + '. Supported values: ' + _lodash2['default'].values(emuMethods.GSM_CALL_ACTIONS));
        }
        phoneNumber = ('' + phoneNumber).replace(/\s*/, "");
        if (!PHONE_NUMBER_PATTERN.test(phoneNumber)) {
          _loggerJs2['default'].errorAndThrow('Invalid gsmCall phoneNumber param ' + phoneNumber);
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['gsm', action, phoneNumber]));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate GSM signal strength change event on the connected emulator.
 *
 * @param {string|number} strength [4] - A number in range [0, 4];
 * @throws {error} If _strength_ value is invalid.
 */
emuMethods.gsmSignal = function callee$0$0() {
  var strength = arguments.length <= 0 || arguments[0] === undefined ? 4 : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        strength = parseInt(strength, 10);
        if (emuMethods.GSM_SIGNAL_STRENGTHS.indexOf(strength) === -1) {
          _loggerJs2['default'].errorAndThrow('Invalid signal strength param ' + strength + '. Supported values: ' + _lodash2['default'].values(emuMethods.GSM_SIGNAL_STRENGTHS));
        }
        _loggerJs2['default'].info('gsm signal-profile <strength> changes the reported strength on next (15s) update.');
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['gsm', 'signal-profile', strength]));

      case 5:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate GSM voice event on the connected emulator.
 *
 * @param {string} state ['on'] - Either 'on' or 'off'.
 * @throws {error} If _state_ value is invalid.
 */
emuMethods.gsmVoice = function callee$0$0() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'on' : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // gsm voice <state> allows you to change the state of your GPRS connection
        if (_lodash2['default'].values(emuMethods.GSM_VOICE_STATES).indexOf(state) === -1) {
          _loggerJs2['default'].errorAndThrow('Invalid gsm voice state param ' + state + '. Supported values: ' + _lodash2['default'].values(emuMethods.GSM_VOICE_STATES));
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['gsm', 'voice', state]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Emulate network speed change event on the connected emulator.
 *
 * @param {string} speed ['full'] - One of possible NETWORK_SPEED values.
 * @throws {error} If _speed_ value is invalid.
 */
emuMethods.networkSpeed = function callee$0$0() {
  var speed = arguments.length <= 0 || arguments[0] === undefined ? 'full' : arguments[0];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // network speed <speed> allows you to set the network speed emulation.
        if (_lodash2['default'].values(emuMethods.NETWORK_SPEED).indexOf(speed) === -1) {
          _loggerJs2['default'].errorAndThrow('Invalid network speed param ' + speed + '. Supported values: ' + _lodash2['default'].values(emuMethods.NETWORK_SPEED));
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adbExecEmu(['network', 'speed', speed]));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = emuMethods;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hZGItZW11LWNvbW1hbmRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7d0JBQWdCLGNBQWM7Ozs7c0JBQ2hCLFFBQVE7Ozs7QUFFdEIsSUFBTSxvQkFBb0IsR0FBRyx3REFBd0QsQ0FBQzs7QUFFdEYsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFVBQVUsQ0FBQyxlQUFlLEdBQUc7QUFDM0IsYUFBVyxFQUFFLElBQUk7QUFDakIsY0FBWSxFQUFFLEtBQUs7Q0FDcEIsQ0FBQztBQUNGLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRztBQUM1QixVQUFRLEVBQUcsTUFBTTtBQUNqQixZQUFVLEVBQUUsUUFBUTtBQUNwQixZQUFVLEVBQUUsUUFBUTtBQUNwQixVQUFRLEVBQUUsTUFBTTtDQUNqQixDQUFDO0FBQ0YsVUFBVSxDQUFDLGdCQUFnQixHQUFHO0FBQzVCLHdCQUFzQixFQUFFLGNBQWM7QUFDdEMsZ0JBQWMsRUFBRSxNQUFNO0FBQ3RCLG1CQUFpQixFQUFFLFNBQVM7QUFDNUIscUJBQW1CLEVBQUUsV0FBVztBQUNoQyxrQkFBZ0IsRUFBRSxRQUFRO0FBQzFCLGVBQWEsRUFBRSxLQUFLO0FBQ3BCLGNBQVksRUFBRSxJQUFJO0NBQ25CLENBQUM7QUFDRixVQUFVLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRWxELFVBQVUsQ0FBQyxhQUFhLEdBQUc7QUFDekIsS0FBRyxFQUFFLEtBQUs7QUFDVixNQUFJLEVBQUUsTUFBTTtBQUNaLE1BQUksRUFBRSxNQUFNO0FBQ1osTUFBSSxFQUFFLE1BQU07QUFDWixNQUFJLEVBQUUsTUFBTTtBQUNaLE9BQUssRUFBRSxPQUFPO0FBQ2QsS0FBRyxFQUFFLEtBQUs7QUFDVixNQUFJLEVBQUUsTUFBTTtBQUNaLE1BQUksRUFBRSxNQUFNO0NBQ2IsQ0FBQzs7Ozs7OztBQU9GLFVB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ImltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyLmpzJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmNvbnN0IFBIT05FX05VTUJFUl9QQVRURVJOID0gL15bXFwrXT9bKF0/WzAtOV0qWyldP1stXFxzXFwuXT9bMC05XSpbLVxcc1xcLl0/WzAtOV17Mix9JC9pbTtcclxuXHJcbmxldCBlbXVNZXRob2RzID0ge307XHJcbmVtdU1ldGhvZHMuUE9XRVJfQUNfU1RBVEVTID0ge1xyXG4gIFBPV0VSX0FDX09OOiAnb24nLFxyXG4gIFBPV0VSX0FDX09GRjogJ29mZidcclxufTtcclxuZW11TWV0aG9kcy5HU01fQ0FMTF9BQ1RJT05TID0ge1xyXG4gIEdTTV9DQUxMIDogJ2NhbGwnLFxyXG4gIEdTTV9BQ0NFUFQ6ICdhY2NlcHQnLFxyXG4gIEdTTV9DQU5DRUw6ICdjYW5jZWwnLFxyXG4gIEdTTV9IT0xEOiAnaG9sZCdcclxufTtcclxuZW11TWV0aG9kcy5HU01fVk9JQ0VfU1RBVEVTID0ge1xyXG4gIEdTTV9WT0lDRV9VTlJFR0lTVEVSRUQ6ICd1bnJlZ2lzdGVyZWQnLFxyXG4gIEdTTV9WT0lDRV9IT01FOiAnaG9tZScsXHJcbiAgR1NNX1ZPSUNFX1JPQU1JTkc6ICdyb2FtaW5nJyxcclxuICBHU01fVk9JQ0VfU0VBUkNISU5HOiAnc2VhcmNoaW5nJyxcclxuICBHU01fVk9JQ0VfREVOSUVEOiAnZGVuaWVkJyxcclxuICBHU01fVk9JQ0VfT0ZGOiAnb2ZmJyxcclxuICBHU01fVk9JQ0VfT046ICdvbidcclxufTtcclxuZW11TWV0aG9kcy5HU01fU0lHTkFMX1NUUkVOR1RIUyA9IFswLCAxLCAyLCAzLCA0XTtcclxuXHJcbmVtdU1ldGhvZHMuTkVUV09SS19TUEVFRCA9IHtcclxuICBHU006ICdnc20nLCAvLyBHU00vQ1NEICh1cDogMTQuNCwgZG93bjogMTQuNCkuXHJcbiAgU0NTRDogJ3Njc2QnLCAvLyBIU0NTRCAodXA6IDE0LjQsIGRvd246IDU3LjYpLlxyXG4gIEdQUlM6ICdncHJzJywgLy8gR1BSUyAodXA6IDI4LjgsIGRvd246IDU3LjYpLlxyXG4gIEVER0U6ICdlZGdlJywgLy8gRURHRS9FR1BSUyAodXA6IDQ3My42LCBkb3duOiA0NzMuNikuXHJcbiAgVU1UUzogJ3VtdHMnLCAvLyBVTVRTLzNHICh1cDogMzg0LjAsIGRvd246IDM4NC4wKS5cclxuICBIU0RQQTogJ2hzZHBhJywgLy8gSFNEUEEgKHVwOiA1NzYwLjAsIGRvd246IDEzLDk4MC4wKS5cclxuICBMVEU6ICdsdGUnLCAvLyBMVEUgKHVwOiA1OCwwMDAsIGRvd246IDE3MywwMDApLlxyXG4gIEVWRE86ICdldmRvJywgLy8gRVZETyAodXA6IDc1LDAwMCwgZG93bjogMjgwLDAwMCkuXHJcbiAgRlVMTDogJ2Z1bGwnIC8vIE5vIGxpbWl0LCB0aGUgZGVmYXVsdCAodXA6IDAuMCwgZG93bjogMC4wKS5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayB0aGUgZW11bGF0b3Igc3RhdGUuXHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgRW11bGF0b3IgaXMgdmlzaWJsZSB0byBhZGIuXHJcbiAqL1xyXG5lbXVNZXRob2RzLmlzRW11bGF0b3JDb25uZWN0ZWQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGVtdWxhdG9ycyA9IGF3YWl0IHRoaXMuZ2V0Q29ubmVjdGVkRW11bGF0b3JzKCk7XHJcbiAgcmV0dXJuICEhXy5maW5kKGVtdWxhdG9ycywgKHgpID0+IHggJiYgeC51ZGlkID09PSB0aGlzLmN1ckRldmljZUlkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWZXJpZnkgdGhlIGVtdWxhdG9yIGlzIGNvbm5lY3RlZC5cclxuICpcclxuICogQHRocm93cyB7ZXJyb3J9IElmIEVtdWxhdG9yIGlzIG5vdCB2aXNpYmxlIHRvIGFkYi5cclxuICovXHJcbmVtdU1ldGhvZHMudmVyaWZ5RW11bGF0b3JDb25uZWN0ZWQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKCEoYXdhaXQgdGhpcy5pc0VtdWxhdG9yQ29ubmVjdGVkKCkpKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgVGhlIGVtdWxhdG9yIFwiJHt0aGlzLmN1ckRldmljZUlkfVwiIHdhcyB1bmV4cGVjdGVkbHkgZGlzY29ubmVjdGVkYCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtdWxhdGUgZmluZ2VycHJpbnQgdG91Y2ggZXZlbnQgb24gdGhlIGNvbm5lY3RlZCBlbXVsYXRvci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGZpbmdlcnByaW50SWQgLSBUaGUgSUQgb2YgdGhlIGZpbmdlcnByaW50LlxyXG4gKi9cclxuZW11TWV0aG9kcy5maW5nZXJwcmludCA9IGFzeW5jIGZ1bmN0aW9uIChmaW5nZXJwcmludElkKSB7XHJcbiAgaWYgKCFmaW5nZXJwcmludElkKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdygnRmluZ2VycHJpbnQgaWQgcGFyYW1ldGVyIG11c3QgYmUgZGVmaW5lZCcpO1xyXG4gIH1cclxuICAvLyB0aGUgbWV0aG9kIHVzZWQgb25seSB3b3JrcyBmb3IgQVBJIGxldmVsIDIzIGFuZCBhYm92ZVxyXG4gIGxldCBsZXZlbCA9IGF3YWl0IHRoaXMuZ2V0QXBpTGV2ZWwoKTtcclxuICBpZiAobGV2ZWwgPCAyMykge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYERldmljZSBBUEkgTGV2ZWwgbXVzdCBiZSA+PSAyMy4gQ3VycmVudCBBcGkgbGV2ZWwgJyR7bGV2ZWx9J2ApO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmFkYkV4ZWNFbXUoWydmaW5nZXInLCAndG91Y2gnLCBmaW5nZXJwcmludElkXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hhbmdlIHRoZSBkaXNwbGF5IG9yaWVudGF0aW9uIG9uIHRoZSBjb25uZWN0ZWQgZW11bGF0b3IuXHJcbiAqIFRoZSBvcmllbnRhdGlvbiBpcyBjaGFuZ2VkIChQSS8yIGlzIGFkZGVkKSBldmVyeSB0aW1lXHJcbiAqIHRoaXMgbWV0aG9kIGlzIGNhbGxlZC5cclxuICovXHJcbmVtdU1ldGhvZHMucm90YXRlID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIGF3YWl0IHRoaXMuYWRiRXhlY0VtdShbJ3JvdGF0ZSddKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbXVsYXRlIHBvd2VyIHN0YXRlIGNoYW5nZSBvbiB0aGUgY29ubmVjdGVkIGVtdWxhdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhdGUgWydvbiddIC0gRWl0aGVyICdvbicgb3IgJ29mZicuXHJcbiAqL1xyXG5lbXVNZXRob2RzLnBvd2VyQUMgPSBhc3luYyBmdW5jdGlvbiAoc3RhdGUgPSAnb24nKSB7XHJcbiAgaWYgKF8udmFsdWVzKGVtdU1ldGhvZHMuUE9XRVJfQUNfU1RBVEVTKS5pbmRleE9mKHN0YXRlKSA9PT0gLTEpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBXcm9uZyBwb3dlciBBQyBzdGF0ZSBzZW50ICcke3N0YXRlfScuIFN1cHBvcnRlZCB2YWx1ZXM6ICR7Xy52YWx1ZXMoZW11TWV0aG9kcy5QT1dFUl9BQ19TVEFURVMpfV1gKTtcclxuICB9XHJcbiAgYXdhaXQgdGhpcy5hZGJFeGVjRW11KFsncG93ZXInLCAnYWMnLCBzdGF0ZV0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtdWxhdGUgcG93ZXIgY2FwYWNpdHkgY2hhbmdlIG9uIHRoZSBjb25uZWN0ZWQgZW11bGF0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gcGVyY2VudCBbMTAwXSAtIFBlcmNlbnRhZ2UgdmFsdWUgaW4gcmFuZ2UgWzAsIDEwMF0uXHJcbiAqL1xyXG5lbXVNZXRob2RzLnBvd2VyQ2FwYWNpdHkgPSBhc3luYyBmdW5jdGlvbiAocGVyY2VudCA9IDEwMCkge1xyXG4gIHBlcmNlbnQgPSBwYXJzZUludChwZXJjZW50LCAxMCk7XHJcbiAgaWYgKGlzTmFOKHBlcmNlbnQpIHx8IHBlcmNlbnQgPCAwIHx8IHBlcmNlbnQgPiAxMDApIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBUaGUgcGVyY2VudGFnZSB2YWx1ZSBzaG91bGQgYmUgdmFsaWQgaW50ZWdlciBiZXR3ZWVuIDAgYW5kIDEwMGApO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmFkYkV4ZWNFbXUoWydwb3dlcicsICdjYXBhY2l0eScsIHBlcmNlbnRdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbXVsYXRlIHBvd2VyIG9mZiBldmVudCBvbiB0aGUgY29ubmVjdGVkIGVtdWxhdG9yLlxyXG4gKi9cclxuZW11TWV0aG9kcy5wb3dlck9GRiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBhd2FpdCB0aGlzLnBvd2VyQUMoZW11TWV0aG9kcy5QT1dFUl9BQ19TVEFURVMuUE9XRVJfQUNfT0ZGKTtcclxuICBhd2FpdCB0aGlzLnBvd2VyQ2FwYWNpdHkoMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRW11bGF0ZSBzZW5kIFNNUyBldmVudCBvbiB0aGUgY29ubmVjdGVkIGVtdWxhdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHBob25lTnVtYmVyIC0gVGhlIHBob25lIG51bWJlciBvZiBtZXNzYWdlIHNlbmRlci5cclxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgWycnXSAtIFRoZSBtZXNzYWdlIGNvbnRlbnQuXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiBwaG9uZSBudW1iZXIgaGFzIGludmFsaWQgZm9ybWF0LlxyXG4gKi9cclxuZW11TWV0aG9kcy5zZW5kU01TID0gYXN5bmMgZnVuY3Rpb24gKHBob25lTnVtYmVyLCBtZXNzYWdlID0gJycpIHtcclxuICBtZXNzYWdlID0gbWVzc2FnZS50cmltKCk7XHJcbiAgaWYgKG1lc3NhZ2UgPT09IFwiXCIpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KCdTZW5kaW5nIGFuIFNNUyByZXF1aXJlcyBhIG1lc3NhZ2UnKTtcclxuICB9XHJcbiAgcGhvbmVOdW1iZXIgPSBgJHtwaG9uZU51bWJlcn1gLnJlcGxhY2UoL1xccyovLCBcIlwiKTtcclxuICBpZiAoIVBIT05FX05VTUJFUl9QQVRURVJOLnRlc3QocGhvbmVOdW1iZXIpKSB7XHJcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgSW52YWxpZCBzZW5kU01TIHBob25lTnVtYmVyIHBhcmFtICR7cGhvbmVOdW1iZXJ9YCk7XHJcbiAgfVxyXG4gIGF3YWl0IHRoaXMuYWRiRXhlY0VtdShbJ3NtcycsICdzZW5kJywgcGhvbmVOdW1iZXIsIG1lc3NhZ2VdKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbXVsYXRlIEdTTSBjYWxsIGV2ZW50IG9uIHRoZSBjb25uZWN0ZWQgZW11bGF0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gcGhvbmVOdW1iZXIgLSBUaGUgcGhvbmUgbnVtYmVyIG9mIHRoZSBjYWxsZXIuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24gWycnXSAtIE9uZSBvZiBhdmFpbGFibGUgR1NNIGNhbGwgYWN0aW9ucy5cclxuICogQHRocm93cyB7ZXJyb3J9IElmIHBob25lIG51bWJlciBoYXMgaW52YWxpZCBmb3JtYXQuXHJcbiAqIEB0aHJvd3Mge2Vycm9yfSBJZiBfYWN0aW9uXyB2YWx1ZSBpcyBpbnZhbGlkLlxyXG4gKi9cclxuZW11TWV0aG9kcy5nc21DYWxsID0gYXN5bmMgZnVuY3Rpb24gKHBob25lTnVtYmVyLCBhY3Rpb24gPSAnJykge1xyXG4gIGlmIChfLnZhbHVlcyhlbXVNZXRob2RzLkdTTV9DQUxMX0FDVElPTlMpLmluZGV4T2YoYWN0aW9uKSA9PT0gLTEpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBJbnZhbGlkIGdzbSBhY3Rpb24gcGFyYW0gJHthY3Rpb259LiBTdXBwb3J0ZWQgdmFsdWVzOiAke18udmFsdWVzKGVtdU1ldGhvZHMuR1NNX0NBTExfQUNUSU9OUyl9YCk7XHJcbiAgfVxyXG4gIHBob25lTnVtYmVyID0gYCR7cGhvbmVOdW1iZXJ9YC5yZXBsYWNlKC9cXHMqLywgXCJcIik7XHJcbiAgaWYgKCFQSE9ORV9OVU1CRVJfUEFUVEVSTi50ZXN0KHBob25lTnVtYmVyKSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEludmFsaWQgZ3NtQ2FsbCBwaG9uZU51bWJlciBwYXJhbSAke3Bob25lTnVtYmVyfWApO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmFkYkV4ZWNFbXUoWydnc20nLCBhY3Rpb24sIHBob25lTnVtYmVyXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRW11bGF0ZSBHU00gc2lnbmFsIHN0cmVuZ3RoIGNoYW5nZSBldmVudCBvbiB0aGUgY29ubmVjdGVkIGVtdWxhdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHN0cmVuZ3RoIFs0XSAtIEEgbnVtYmVyIGluIHJhbmdlIFswLCA0XTtcclxuICogQHRocm93cyB7ZXJyb3J9IElmIF9zdHJlbmd0aF8gdmFsdWUgaXMgaW52YWxpZC5cclxuICovXHJcbmVtdU1ldGhvZHMuZ3NtU2lnbmFsID0gYXN5bmMgZnVuY3Rpb24gKHN0cmVuZ3RoID0gNCkge1xyXG4gIHN0cmVuZ3RoID0gcGFyc2VJbnQoc3RyZW5ndGgsIDEwKTtcclxuICBpZiAoZW11TWV0aG9kcy5HU01fU0lHTkFMX1NUUkVOR1RIUy5pbmRleE9mKHN0cmVuZ3RoKSA9PT0gLTEpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBJbnZhbGlkIHNpZ25hbCBzdHJlbmd0aCBwYXJhbSAke3N0cmVuZ3RofS4gU3VwcG9ydGVkIHZhbHVlczogJHtfLnZhbHVlcyhlbXVNZXRob2RzLkdTTV9TSUdOQUxfU1RSRU5HVEhTKX1gKTtcclxuICB9XHJcbiAgbG9nLmluZm8oJ2dzbSBzaWduYWwtcHJvZmlsZSA8c3RyZW5ndGg+IGNoYW5nZXMgdGhlIHJlcG9ydGVkIHN0cmVuZ3RoIG9uIG5leHQgKDE1cykgdXBkYXRlLicpO1xyXG4gIGF3YWl0IHRoaXMuYWRiRXhlY0VtdShbJ2dzbScsICdzaWduYWwtcHJvZmlsZScsIHN0cmVuZ3RoXSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRW11bGF0ZSBHU00gdm9pY2UgZXZlbnQgb24gdGhlIGNvbm5lY3RlZCBlbXVsYXRvci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlIFsnb24nXSAtIEVpdGhlciAnb24nIG9yICdvZmYnLlxyXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgX3N0YXRlXyB2YWx1ZSBpcyBpbnZhbGlkLlxyXG4gKi9cclxuZW11TWV0aG9kcy5nc21Wb2ljZSA9IGFzeW5jIGZ1bmN0aW9uIChzdGF0ZSA9ICdvbicpIHtcclxuICAvLyBnc20gdm9pY2UgPHN0YXRlPiBhbGxvd3MgeW91IHRvIGNoYW5nZSB0aGUgc3RhdGUgb2YgeW91ciBHUFJTIGNvbm5lY3Rpb25cclxuICBpZiAoXy52YWx1ZXMoZW11TWV0aG9kcy5HU01fVk9JQ0VfU1RBVEVTKS5pbmRleE9mKHN0YXRlKSA9PT0gLTEpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBJbnZhbGlkIGdzbSB2b2ljZSBzdGF0ZSBwYXJhbSAke3N0YXRlfS4gU3VwcG9ydGVkIHZhbHVlczogJHtfLnZhbHVlcyhlbXVNZXRob2RzLkdTTV9WT0lDRV9TVEFURVMpfWApO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmFkYkV4ZWNFbXUoWydnc20nLCAndm9pY2UnLCBzdGF0ZV0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtdWxhdGUgbmV0d29yayBzcGVlZCBjaGFuZ2UgZXZlbnQgb24gdGhlIGNvbm5lY3RlZCBlbXVsYXRvci5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNwZWVkIFsnZnVsbCddIC0gT25lIG9mIHBvc3NpYmxlIE5FVFdPUktfU1BFRUQgdmFsdWVzLlxyXG4gKiBAdGhyb3dzIHtlcnJvcn0gSWYgX3NwZWVkXyB2YWx1ZSBpcyBpbnZhbGlkLlxyXG4gKi9cclxuZW11TWV0aG9kcy5uZXR3b3JrU3BlZWQgPSBhc3luYyBmdW5jdGlvbiAoc3BlZWQgPSAnZnVsbCcpIHtcclxuICAvLyBuZXR3b3JrIHNwZWVkIDxzcGVlZD4gYWxsb3dzIHlvdSB0byBzZXQgdGhlIG5ldHdvcmsgc3BlZWQgZW11bGF0aW9uLlxyXG4gIGlmIChfLnZhbHVlcyhlbXVNZXRob2RzLk5FVFdPUktfU1BFRUQpLmluZGV4T2Yoc3BlZWQpID09PSAtMSkge1xyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYEludmFsaWQgbmV0d29yayBzcGVlZCBwYXJhbSAke3NwZWVkfS4gU3VwcG9ydGVkIHZhbHVlczogJHtfLnZhbHVlcyhlbXVNZXRob2RzLk5FVFdPUktfU1BFRUQpfWApO1xyXG4gIH1cclxuICBhd2FpdCB0aGlzLmFkYkV4ZWNFbXUoWyduZXR3b3JrJywgJ3NwZWVkJywgc3BlZWRdKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVtdU1ldGhvZHM7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
