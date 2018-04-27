'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../..');

var _3 = _interopRequireDefault(_2);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumTestSupport = require('appium-test-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].use(_chaiAsPromised2['default']);
var adb = new _3['default']();
adb.executable.path = 'adb_path';
var avdName = 'AVD_NAME';

describe('System calls', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
  it('getConnectedDevices should get all connected devices', function callee$1$0() {
    var devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").once().withExactArgs(adb.executable.path, ['-P', 5037, 'devices']).returns({ stdout: "List of devices attached \n emulator-5554	device" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getConnectedDevices());

        case 3:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);
          mocks.teen_process.verify();

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getConnectedDevices should get all connected devices which have valid udid', function callee$1$0() {
    var stdoutValue, devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          stdoutValue = "List of devices attached \n" + "adb server version (32) doesn't match this client (36); killing...\n" + "* daemon started successfully *\n" + "emulator-5554	device";

          mocks.teen_process.expects("exec").once().withExactArgs(adb.executable.path, ['-P', 5037, 'devices']).returns({ stdout: stdoutValue });

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getConnectedDevices());

        case 4:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);
          mocks.teen_process.verify();

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getConnectedDevices should fail when adb devices returns unexpected output', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").once().withExactArgs(adb.executable.path, ['-P', 5037, 'devices']).returns({ stdout: "foobar" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getConnectedDevices().should.eventually.be.rejectedWith("Unexpected output while trying to get devices"));

        case 3:
          mocks.teen_process.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should fail when there are no connected devices', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(20000);
          mocks.teen_process.expects("exec").atLeast(2).withExactArgs(adb.executable.path, ['-P', 5037, 'devices']).returns({ stdout: "List of devices attached" });
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(1000).should.eventually.be.rejectedWith("Could not find a connected Android device."));

        case 4:
          mocks.teen_process.verify();

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('getDevicesWithRetry should fail when adb devices returns unexpected output', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").atLeast(2).withExactArgs(adb.executable.path, ['-P', 5037, 'devices']).returns({ stdout: "foobar" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(1000).should.eventually.be.rejectedWith("Could not find a connected Android device."));

        case 3:
          mocks.teen_process.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should get all connected devices', function callee$1$0() {
    var devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").once().withExactArgs(adb.executable.path, ['-P', 5037, 'devices']).returns({ stdout: "List of devices attached \n emulator-5554	device" });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(1000));

        case 3:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);
          mocks.teen_process.verify();

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should get all connected devices second time', function callee$1$0() {
    var devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").onCall(0).returns({ stdout: "Foobar" });
          mocks.teen_process.expects("exec").withExactArgs(adb.executable.path, ['-P', 5037, 'devices']).returns({ stdout: "List of devices attached \n emulator-5554	device" });
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(2000));

        case 4:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);
          mocks.teen_process.verify();

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should fail when exec throws an error', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").atLeast(2).throws("Error foobar");
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry(1000).should.eventually.be.rejectedWith("Could not find a connected Android device."));

        case 3:
          mocks.teen_process.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('setDeviceId should set the device id', function () {
    adb.setDeviceId('foobar');
    adb.curDeviceId.should.equal('foobar');
    adb.executable.defaultArgs.should.include('foobar');
  });
  it('setDevice should set the device id and emu port from obj', function () {
    adb.setDevice({ udid: 'emulator-1234' });
    adb.curDeviceId.should.equal('emulator-1234');
    adb.executable.defaultArgs.should.include('emulator-1234');
    adb.emulatorPort.should.equal(1234);
  });
  it('setEmulatorPort should change emulator port', function () {
    adb.setEmulatorPort(5554);
    adb.emulatorPort.should.equal(5554);
  });
  describe('createSubProcess', function () {
    it('should return an instance of SubProcess', function () {
      adb.createSubProcess([]).should.be.an['instanceof'](teen_process.SubProcess);
    });
  });
}));

describe('System calls', (0, _appiumTestSupport.withMocks)({ adb: adb, B: _bluebird2['default'], teen_process: teen_process }, function (mocks) {
  it('should return adb version', function callee$1$0() {
    var adbVersion;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("adbExec").once().withExactArgs('version').returns("Android Debug Bridge version 1.0.39\nRevision 5943271ace17-android");
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.getAdbVersion());

        case 3:
          adbVersion = context$2$0.sent;

          adbVersion.versionString.should.equal("1.0.39");
          adbVersion.versionFloat.should.be.within(1.0, 1.0);
          adbVersion.major.should.equal(1);
          adbVersion.minor.should.equal(0);
          adbVersion.patch.should.equal(39);
          mocks.adb.verify();

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should cache adb results', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb.getAdbVersion.cache = new _lodash2['default'].memoize.Cache();
          mocks.adb.expects("adbExec").once().withExactArgs('version').returns("Android Debug Bridge version 1.0.39\nRevision 5943271ace17-android");
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getAdbVersion());

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getAdbVersion());

        case 6:
          mocks.adb.verify();

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('fileExists should return true for if ls returns', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("ls").once().withExactArgs('foo').returns(['bar']);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.fileExists("foo").should.eventually.equal(true));

        case 3:
          mocks.adb.verify();

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('ls should return list', function callee$1$0() {
    var list;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("shell").once().withExactArgs(['ls', 'foo']).returns('bar');
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.ls("foo"));

        case 3:
          list = context$2$0.sent;

          list.should.deep.equal(['bar']);
          mocks.adb.verify();

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('fileSize should return the file size when digit is after permissions', function callee$1$0() {
    var remotePath, size;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          remotePath = '/sdcard/test.mp4';

          mocks.adb.expects('shell').once().withExactArgs(['ls', '-la', remotePath]).returns('-rw-rw---- 1 root sdcard_rw 39571 2017-06-23 07:33 ' + remotePath);
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.fileSize(remotePath));

        case 4:
          size = context$2$0.sent;

          size.should.eql(39571);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('fileSize should return the file size when digit is not after permissions', function callee$1$0() {
    var remotePath, size;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          remotePath = '/sdcard/test.mp4';

          mocks.adb.expects('shell').once().withExactArgs(['ls', '-la', remotePath]).returns('-rw-rw---- root sdcard_rw 39571 2017-06-23 07:33 ' + remotePath);
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.fileSize(remotePath));

        case 4:
          size = context$2$0.sent;

          size.should.eql(39571);

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('reboot should call stop and start using shell', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("shell").once().withExactArgs(['stop']);
          mocks.adb.expects("setDeviceProperty").once().withExactArgs('sys.boot_completed', 0);
          mocks.adb.expects("shell").once().withExactArgs(['start']);
          mocks.adb.expects("getDeviceProperty").once().withExactArgs('sys.boot_completed').returns('1');
          mocks.B.expects("delay").once().withExactArgs(2000);
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.reboot().should.eventually.not.be.rejected);

        case 7:
          mocks.adb.verify();
          mocks.B.verify();

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('reboot should restart adbd as root if necessary', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.teen_process.expects("exec").once().withExactArgs(adb.executable.path, ['root']).returns(false);
          mocks.adb.expects("shell").twice().withExactArgs(['stop']).onFirstCall().throws(new Error('Error executing adbExec. Original error: \'Command \'adb shell stop\' exited with code 1\'; Stderr: \'stop: must be root\'; Code: \'1\'')).onSecondCall().returns();
          mocks.adb.expects("setDeviceProperty").once().withExactArgs('sys.boot_completed', 0);
          mocks.adb.expects("shell").once().withExactArgs(['start']);
          mocks.adb.expects("getDeviceProperty").once().withExactArgs('sys.boot_completed').returns('1');
          mocks.B.expects("delay").once().withExactArgs(2000);
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(adb.reboot().should.eventually.not.be.rejected);

        case 8:
          mocks.adb.verify();
          mocks.B.verify();

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getRunningAVD should get connected avd', function callee$1$0() {
    var udid, port, emulator;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          udid = 'emulator-5554';
          port = 5554;
          emulator = { udid: udid, port: port };

          mocks.adb.expects("getConnectedEmulators").once().withExactArgs().returns([emulator]);
          mocks.adb.expects("setEmulatorPort").once().withExactArgs(port);
          mocks.adb.expects("sendTelnetCommand").once().withExactArgs("avd name").returns(avdName);
          mocks.adb.expects("setDeviceId").once().withExactArgs(udid);
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

        case 9:
          context$2$0.t0 = emulator;
          context$2$0.sent.should.equal(context$2$0.t0);

          mocks.adb.verify();

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getRunningAVD should return null when expected avd is not connected', function callee$1$0() {
    var udid, port, emulator;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          udid = 'emulator-5554';
          port = 5554;
          emulator = { udid: udid, port: port };

          mocks.adb.expects("getConnectedEmulators").once().withExactArgs().returns([emulator]);
          mocks.adb.expects("setEmulatorPort").once().withExactArgs(port);
          mocks.adb.expects("sendTelnetCommand").once().withExactArgs("avd name").returns('OTHER_AVD');
          context$2$0.t0 = _chai2['default'];
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

        case 9:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.expect.call(context$2$0.t0, context$2$0.t1).to.be['null'];

          mocks.adb.verify();

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getRunningAVD should return null when no avd is connected', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          mocks.adb.expects("getConnectedEmulators").once().withExactArgs().returns([]);
          context$2$0.t0 = _chai2['default'];
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

        case 4:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.expect.call(context$2$0.t0, context$2$0.t1).to.be['null'];

          mocks.adb.verify();

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
}));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9zeXNjYWxscy1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztpQkFDN0IsT0FBTzs7Ozs0QkFDTyxjQUFjOztJQUFoQyxZQUFZOztpQ0FDRSxxQkFBcUI7O3dCQUNqQyxVQUFVOzs7O3NCQUNWLFFBQVE7Ozs7QUFHdEIsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQztBQUN6QixJQUFNLEdBQUcsR0FBRyxtQkFBUyxDQUFDO0FBQ3RCLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUNqQyxJQUFNLE9BQU8sR0FBRyxVQUFVLENBQUM7O0FBRTNCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsa0NBQVUsRUFBQyxZQUFZLEVBQVosWUFBWSxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDNUQsSUFBRSxDQUFDLHNEQUFzRCxFQUFFO1FBSXJELE9BQU87Ozs7QUFIWCxlQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDL0IsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUNsRSxPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUMsa0RBQWtELEVBQUMsQ0FBQyxDQUFDOzsyQ0FDcEQsR0FBRyxDQUFDLG1CQUFtQixFQUFFOzs7QUFBekMsaUJBQU87O0FBQ1gsaUJBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEMsZUFBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNEVBQTRFLEVBQUU7UUFDM0UsV0FBVyxFQVFYLE9BQU87Ozs7QUFSUCxxQkFBVyxH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QyxDQUNqQyxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDOUIsZUFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FDbkMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUNoQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7OzsyQ0FDTixHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzs7Ozt5QkFBdkMsTUFBTSxzQ0FBbUMsRUFBRSxDQUFDLEVBQUU7O0FBQ25ELGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7R0FDcEIsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDJEQUEyRCxFQUFFOzs7O0FBQzlELGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQ3ZDLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUN0QixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7OzsyQ0FDRyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzs7Ozt5QkFBdkMsTUFBTSxzQ0FBbUMsRUFBRSxDQUFDLEVBQUU7O0FBQ25ELGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7R0FDcEIsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L3N5c2NhbGxzLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFEQiBmcm9tICcuLi8uLic7XHJcbmltcG9ydCAqIGFzIHRlZW5fcHJvY2VzcyBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcclxuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuXHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuY29uc3QgYWRiID0gbmV3IEFEQigpO1xyXG5hZGIuZXhlY3V0YWJsZS5wYXRoID0gJ2FkYl9wYXRoJztcclxuY29uc3QgYXZkTmFtZSA9ICdBVkRfTkFNRSc7XHJcblxyXG5kZXNjcmliZSgnU3lzdGVtIGNhbGxzJywgd2l0aE1vY2tzKHt0ZWVuX3Byb2Nlc3N9LCAobW9ja3MpID0+IHtcclxuICBpdCgnZ2V0Q29ubmVjdGVkRGV2aWNlcyBzaG91bGQgZ2V0IGFsbCBjb25uZWN0ZWQgZGV2aWNlcycsIGFzeW5jICgpID0+IHtcclxuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoYWRiLmV4ZWN1dGFibGUucGF0aCwgWyctUCcsIDUwMzcsICdkZXZpY2VzJ10pXHJcbiAgICAgIC5yZXR1cm5zKHtzdGRvdXQ6XCJMaXN0IG9mIGRldmljZXMgYXR0YWNoZWQgXFxuIGVtdWxhdG9yLTU1NTRcdGRldmljZVwifSk7XHJcbiAgICBsZXQgZGV2aWNlcyA9IGF3YWl0IGFkYi5nZXRDb25uZWN0ZWREZXZpY2VzKCk7XHJcbiAgICBkZXZpY2VzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgwKTtcclxuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICB9KTtcclxuICBpdCgnZ2V0Q29ubmVjdGVkRGV2aWNlcyBzaG91bGQgZ2V0IGFsbCBjb25uZWN0ZWQgZGV2aWNlcyB3aGljaCBoYXZlIHZhbGlkIHVkaWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgc3Rkb3V0VmFsdWUgPSBcIkxpc3Qgb2YgZGV2aWNlcyBhdHRhY2hlZCBcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImFkYiBzZXJ2ZXIgdmVyc2lvbiAoMzIpIGRvZXNuJ3QgbWF0Y2ggdGhpcyBjbGllbnQgKDM2KTsga2lsbGluZy4uLlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgIFwiKiBkYWVtb24gc3RhcnRlZCBzdWNjZXNzZnVsbHkgKlxcblwiICtcclxuICAgICAgICAgICAgICAgICAgICAgIFwiZW11bGF0b3ItNTU1NFx0ZGV2aWNlXCI7XHJcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKGFkYi5leGVjdXRhYmxlLnBhdGgsIFsnLVAnLCA1MDM3LCAnZGV2aWNlcyddKVxyXG4gICAgICAucmV0dXJucyh7c3Rkb3V0OnN0ZG91dFZhbHVlfSk7XHJcblxyXG4gICAgbGV0IGRldmljZXMgPSBhd2FpdCBhZGIuZ2V0Q29ubmVjdGVkRGV2aWNlcygpO1xyXG4gICAgZGV2aWNlcy5zaG91bGQuaGF2ZS5sZW5ndGguYWJvdmUoMCk7XHJcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ2dldENvbm5lY3RlZERldmljZXMgc2hvdWxkIGZhaWwgd2hlbiBhZGIgZGV2aWNlcyByZXR1cm5zIHVuZXhwZWN0ZWQgb3V0cHV0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoXCJleGVjXCIpXHJcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhhZGIuZXhlY3V0YWJsZS5wYXRoLCBbJy1QJywgNTAzNywgJ2RldmljZXMnXSlcclxuICAgICAgLnJldHVybnMoe3N0ZG91dDpcImZvb2JhclwifSk7XHJcbiAgICBhd2FpdCBhZGIuZ2V0Q29ubmVjdGVkRGV2aWNlcygpLnNob3VsZC5ldmVudHVhbGx5LmJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlamVjdGVkV2l0aChcIlVuZXhwZWN0ZWQgb3V0cHV0IHdoaWxlIHRyeWluZyB0byBnZXQgZGV2aWNlc1wiKTtcclxuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICB9KTtcclxuICBpdCgnZ2V0RGV2aWNlc1dpdGhSZXRyeSBzaG91bGQgZmFpbCB3aGVuIHRoZXJlIGFyZSBubyBjb25uZWN0ZWQgZGV2aWNlcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudGltZW91dCgyMDAwMCk7XHJcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcclxuICAgICAgLmF0TGVhc3QoMikud2l0aEV4YWN0QXJncyhhZGIuZXhlY3V0YWJsZS5wYXRoLCBbJy1QJywgNTAzNywgJ2RldmljZXMnXSlcclxuICAgICAgLnJldHVybnMoe3N0ZG91dDpcIkxpc3Qgb2YgZGV2aWNlcyBhdHRhY2hlZFwifSk7XHJcbiAgICBhd2FpdCBhZGIuZ2V0RGV2aWNlc1dpdGhSZXRyeSgxMDAwKS5zaG91bGQuZXZlbnR1YWxseS5iZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVqZWN0ZWRXaXRoKFwiQ291bGQgbm90IGZpbmQgYSBjb25uZWN0ZWQgQW5kcm9pZCBkZXZpY2UuXCIpO1xyXG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xyXG4gIH0pO1xyXG4gIGl0KCdnZXREZXZpY2VzV2l0aFJldHJ5IHNob3VsZCBmYWlsIHdoZW4gYWRiIGRldmljZXMgcmV0dXJucyB1bmV4cGVjdGVkIG91dHB1dCcsIGFzeW5jICgpID0+IHtcclxuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAuYXRMZWFzdCgyKS53aXRoRXhhY3RBcmdzKGFkYi5leGVjdXRhYmxlLnBhdGgsIFsnLVAnLCA1MDM3LCAnZGV2aWNlcyddKVxyXG4gICAgICAucmV0dXJucyh7c3Rkb3V0OlwiZm9vYmFyXCJ9KTtcclxuICAgIGF3YWl0IGFkYi5nZXREZXZpY2VzV2l0aFJldHJ5KDEwMDApLnNob3VsZC5ldmVudHVhbGx5LmJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWplY3RlZFdpdGgoXCJDb3VsZCBub3QgZmluZCBhIGNvbm5lY3RlZCBBbmRyb2lkIGRldmljZS5cIik7XHJcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ2dldERldmljZXNXaXRoUmV0cnkgc2hvdWxkIGdldCBhbGwgY29ubmVjdGVkIGRldmljZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKGFkYi5leGVjdXRhYmxlLnBhdGgsIFsnLVAnLCA1MDM3LCAnZGV2aWNlcyddKVxyXG4gICAgICAucmV0dXJucyh7c3Rkb3V0OlwiTGlzdCBvZiBkZXZpY2VzIGF0dGFjaGVkIFxcbiBlbXVsYXRvci01NTU0XHRkZXZpY2VcIn0pO1xyXG4gICAgbGV0IGRldmljZXMgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlc1dpdGhSZXRyeSgxMDAwKTtcclxuICAgIGRldmljZXMuc2hvdWxkLmhhdmUubGVuZ3RoLmFib3ZlKDApO1xyXG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xyXG4gIH0pO1xyXG4gIGl0KCdnZXREZXZpY2VzV2l0aFJldHJ5IHNob3VsZCBnZXQgYWxsIGNvbm5lY3RlZCBkZXZpY2VzIHNlY29uZCB0aW1lJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoXCJleGVjXCIpXHJcbiAgICAgIC5vbkNhbGwoMClcclxuICAgICAgLnJldHVybnMoe3N0ZG91dDpcIkZvb2JhclwifSk7XHJcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcclxuICAgICAgLndpdGhFeGFjdEFyZ3MoYWRiLmV4ZWN1dGFibGUucGF0aCwgWyctUCcsIDUwMzcsICdkZXZpY2VzJ10pXHJcbiAgICAgIC5yZXR1cm5zKHtzdGRvdXQ6XCJMaXN0IG9mIGRldmljZXMgYXR0YWNoZWQgXFxuIGVtdWxhdG9yLTU1NTRcdGRldmljZVwifSk7XHJcbiAgICBsZXQgZGV2aWNlcyA9IGF3YWl0IGFkYi5nZXREZXZpY2VzV2l0aFJldHJ5KDIwMDApO1xyXG4gICAgZGV2aWNlcy5zaG91bGQuaGF2ZS5sZW5ndGguYWJvdmUoMCk7XHJcbiAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ2dldERldmljZXNXaXRoUmV0cnkgc2hvdWxkIGZhaWwgd2hlbiBleGVjIHRocm93cyBhbiBlcnJvcicsIGFzeW5jICgpID0+IHtcclxuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAuYXRMZWFzdCgyKVxyXG4gICAgICAudGhyb3dzKFwiRXJyb3IgZm9vYmFyXCIpO1xyXG4gICAgYXdhaXQgYWRiLmdldERldmljZXNXaXRoUmV0cnkoMTAwMCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlamVjdGVkV2l0aChcIkNvdWxkIG5vdCBmaW5kIGEgY29ubmVjdGVkIEFuZHJvaWQgZGV2aWNlLlwiKTtcclxuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICB9KTtcclxuICBpdCgnc2V0RGV2aWNlSWQgc2hvdWxkIHNldCB0aGUgZGV2aWNlIGlkJywgKCkgPT4ge1xyXG4gICAgYWRiLnNldERldmljZUlkKCdmb29iYXInKTtcclxuICAgIGFkYi5jdXJEZXZpY2VJZC5zaG91bGQuZXF1YWwoJ2Zvb2JhcicpO1xyXG4gICAgYWRiLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3Muc2hvdWxkLmluY2x1ZGUoJ2Zvb2JhcicpO1xyXG4gIH0pO1xyXG4gIGl0KCdzZXREZXZpY2Ugc2hvdWxkIHNldCB0aGUgZGV2aWNlIGlkIGFuZCBlbXUgcG9ydCBmcm9tIG9iaicsICgpID0+IHtcclxuICAgIGFkYi5zZXREZXZpY2Uoe3VkaWQ6ICdlbXVsYXRvci0xMjM0J30pO1xyXG4gICAgYWRiLmN1ckRldmljZUlkLnNob3VsZC5lcXVhbCgnZW11bGF0b3ItMTIzNCcpO1xyXG4gICAgYWRiLmV4ZWN1dGFibGUuZGVmYXVsdEFyZ3Muc2hvdWxkLmluY2x1ZGUoJ2VtdWxhdG9yLTEyMzQnKTtcclxuICAgIGFkYi5lbXVsYXRvclBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xyXG4gIH0pO1xyXG4gIGl0KCdzZXRFbXVsYXRvclBvcnQgc2hvdWxkIGNoYW5nZSBlbXVsYXRvciBwb3J0JywgKCkgPT4ge1xyXG4gICAgYWRiLnNldEVtdWxhdG9yUG9ydCg1NTU0KTtcclxuICAgIGFkYi5lbXVsYXRvclBvcnQuc2hvdWxkLmVxdWFsKDU1NTQpO1xyXG4gIH0pO1xyXG4gIGRlc2NyaWJlKCdjcmVhdGVTdWJQcm9jZXNzJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gYW4gaW5zdGFuY2Ugb2YgU3ViUHJvY2VzcycsICgpID0+IHtcclxuICAgICAgYWRiLmNyZWF0ZVN1YlByb2Nlc3MoW10pLnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKHRlZW5fcHJvY2Vzcy5TdWJQcm9jZXNzKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KSk7XHJcblxyXG5kZXNjcmliZSgnU3lzdGVtIGNhbGxzJywgIHdpdGhNb2Nrcyh7YWRiLCBCLCB0ZWVuX3Byb2Nlc3N9LCAobW9ja3MpID0+IHtcclxuICBpdCgnc2hvdWxkIHJldHVybiBhZGIgdmVyc2lvbicsIGFzeW5jICgpID0+IHtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiYWRiRXhlY1wiKVxyXG4gICAgICAub25jZSgpXHJcbiAgICAgIC53aXRoRXhhY3RBcmdzKCd2ZXJzaW9uJylcclxuICAgICAgLnJldHVybnMoXCJBbmRyb2lkIERlYnVnIEJyaWRnZSB2ZXJzaW9uIDEuMC4zOVxcblJldmlzaW9uIDU5NDMyNzFhY2UxNy1hbmRyb2lkXCIpO1xyXG4gICAgbGV0IGFkYlZlcnNpb24gPSBhd2FpdCBhZGIuZ2V0QWRiVmVyc2lvbigpO1xyXG4gICAgYWRiVmVyc2lvbi52ZXJzaW9uU3RyaW5nLnNob3VsZC5lcXVhbChcIjEuMC4zOVwiKTtcclxuICAgIGFkYlZlcnNpb24udmVyc2lvbkZsb2F0LnNob3VsZC5iZS53aXRoaW4oMS4wLCAxLjApO1xyXG4gICAgYWRiVmVyc2lvbi5tYWpvci5zaG91bGQuZXF1YWwoMSk7XHJcbiAgICBhZGJWZXJzaW9uLm1pbm9yLnNob3VsZC5lcXVhbCgwKTtcclxuICAgIGFkYlZlcnNpb24ucGF0Y2guc2hvdWxkLmVxdWFsKDM5KTtcclxuICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGNhY2hlIGFkYiByZXN1bHRzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgYWRiLmdldEFkYlZlcnNpb24uY2FjaGUgPSBuZXcgXy5tZW1vaXplLkNhY2hlKCk7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImFkYkV4ZWNcIilcclxuICAgICAgLm9uY2UoKVxyXG4gICAgICAud2l0aEV4YWN0QXJncygndmVyc2lvbicpXHJcbiAgICAgIC5yZXR1cm5zKFwiQW5kcm9pZCBEZWJ1ZyBCcmlkZ2UgdmVyc2lvbiAxLjAuMzlcXG5SZXZpc2lvbiA1OTQzMjcxYWNlMTctYW5kcm9pZFwiKTtcclxuICAgIGF3YWl0IGFkYi5nZXRBZGJWZXJzaW9uKCk7XHJcbiAgICBhd2FpdCBhZGIuZ2V0QWRiVmVyc2lvbigpO1xyXG4gICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gIH0pO1xyXG4gIGl0KCdmaWxlRXhpc3RzIHNob3VsZCByZXR1cm4gdHJ1ZSBmb3IgaWYgbHMgcmV0dXJucycsIGFzeW5jICgpID0+IHtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwibHNcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdmb28nKVxyXG4gICAgICAucmV0dXJucyhbJ2JhciddKTtcclxuICAgIGF3YWl0IGFkYi5maWxlRXhpc3RzKFwiZm9vXCIpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKHRydWUpO1xyXG4gICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gIH0pO1xyXG4gIGl0KCdscyBzaG91bGQgcmV0dXJuIGxpc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNoZWxsXCIpXHJcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhbJ2xzJywgJ2ZvbyddKVxyXG4gICAgICAucmV0dXJucygnYmFyJyk7XHJcbiAgICBsZXQgbGlzdCA9IGF3YWl0IGFkYi5scyhcImZvb1wiKTtcclxuICAgIGxpc3Quc2hvdWxkLmRlZXAuZXF1YWwoWydiYXInXSk7XHJcbiAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ2ZpbGVTaXplIHNob3VsZCByZXR1cm4gdGhlIGZpbGUgc2l6ZSB3aGVuIGRpZ2l0IGlzIGFmdGVyIHBlcm1pc3Npb25zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHJlbW90ZVBhdGggPSAnL3NkY2FyZC90ZXN0Lm1wNCc7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydscycsICctbGEnLCByZW1vdGVQYXRoXSlcclxuICAgICAgLnJldHVybnMoYC1ydy1ydy0tLS0gMSByb290IHNkY2FyZF9ydyAzOTU3MSAyMDE3LTA2LTIzIDA3OjMzICR7cmVtb3RlUGF0aH1gKTtcclxuICAgIGxldCBzaXplID0gYXdhaXQgYWRiLmZpbGVTaXplKHJlbW90ZVBhdGgpO1xyXG4gICAgc2l6ZS5zaG91bGQuZXFsKDM5NTcxKTtcclxuICB9KTtcclxuICBpdCgnZmlsZVNpemUgc2hvdWxkIHJldHVybiB0aGUgZmlsZSBzaXplIHdoZW4gZGlnaXQgaXMgbm90IGFmdGVyIHBlcm1pc3Npb25zJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHJlbW90ZVBhdGggPSAnL3NkY2FyZC90ZXN0Lm1wNCc7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydscycsICctbGEnLCByZW1vdGVQYXRoXSlcclxuICAgICAgLnJldHVybnMoYC1ydy1ydy0tLS0gcm9vdCBzZGNhcmRfcncgMzk1NzEgMjAxNy0wNi0yMyAwNzozMyAke3JlbW90ZVBhdGh9YCk7XHJcbiAgICBsZXQgc2l6ZSA9IGF3YWl0IGFkYi5maWxlU2l6ZShyZW1vdGVQYXRoKTtcclxuICAgIHNpemUuc2hvdWxkLmVxbCgzOTU3MSk7XHJcbiAgfSk7XHJcbiAgaXQoJ3JlYm9vdCBzaG91bGQgY2FsbCBzdG9wIGFuZCBzdGFydCB1c2luZyBzaGVsbCcsIGFzeW5jICgpID0+IHtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc3RvcCddKTtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2V0RGV2aWNlUHJvcGVydHlcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdzeXMuYm9vdF9jb21wbGV0ZWQnLCAwKTtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFsnc3RhcnQnXSk7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldERldmljZVByb3BlcnR5XCIpXHJcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnc3lzLmJvb3RfY29tcGxldGVkJylcclxuICAgICAgLnJldHVybnMoJzEnKTtcclxuICAgIG1vY2tzLkIuZXhwZWN0cyhcImRlbGF5XCIpXHJcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygyMDAwKTtcclxuICAgIGF3YWl0IGFkYi5yZWJvb3QoKS5zaG91bGQuZXZlbnR1YWxseS5ub3QuYmUucmVqZWN0ZWQ7XHJcbiAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICBtb2Nrcy5CLnZlcmlmeSgpO1xyXG4gIH0pO1xyXG4gIGl0KCdyZWJvb3Qgc2hvdWxkIHJlc3RhcnQgYWRiZCBhcyByb290IGlmIG5lY2Vzc2FyeScsIGFzeW5jICgpID0+IHtcclxuICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoYWRiLmV4ZWN1dGFibGUucGF0aCwgWydyb290J10pXHJcbiAgICAgIC5yZXR1cm5zKGZhbHNlKTtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2hlbGxcIilcclxuICAgICAgLnR3aWNlKCkud2l0aEV4YWN0QXJncyhbJ3N0b3AnXSlcclxuICAgICAgLm9uRmlyc3RDYWxsKClcclxuICAgICAgICAudGhyb3dzKG5ldyBFcnJvcihgRXJyb3IgZXhlY3V0aW5nIGFkYkV4ZWMuIE9yaWdpbmFsIGVycm9yOiAnQ29tbWFuZCAnYWRiIHNoZWxsIHN0b3AnIGV4aXRlZCB3aXRoIGNvZGUgMSc7IFN0ZGVycjogJ3N0b3A6IG11c3QgYmUgcm9vdCc7IENvZGU6ICcxJ2ApKVxyXG4gICAgICAub25TZWNvbmRDYWxsKCkucmV0dXJucygpO1xyXG4gICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzZXREZXZpY2VQcm9wZXJ0eVwiKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ3N5cy5ib290X2NvbXBsZXRlZCcsIDApO1xyXG4gICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJzaGVsbFwiKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoWydzdGFydCddKTtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwiZ2V0RGV2aWNlUHJvcGVydHlcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKCdzeXMuYm9vdF9jb21wbGV0ZWQnKVxyXG4gICAgICAucmV0dXJucygnMScpO1xyXG4gICAgbW9ja3MuQi5leHBlY3RzKFwiZGVsYXlcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKDIwMDApO1xyXG4gICAgYXdhaXQgYWRiLnJlYm9vdCgpLnNob3VsZC5ldmVudHVhbGx5Lm5vdC5iZS5yZWplY3RlZDtcclxuICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIG1vY2tzLkIudmVyaWZ5KCk7XHJcbiAgfSk7XHJcbiAgaXQoJ2dldFJ1bm5pbmdBVkQgc2hvdWxkIGdldCBjb25uZWN0ZWQgYXZkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IHVkaWQgPSAnZW11bGF0b3ItNTU1NCc7XHJcbiAgICBsZXQgcG9ydCA9IDU1NTQ7XHJcbiAgICBsZXQgZW11bGF0b3IgPSB7dWRpZCwgcG9ydH07XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldENvbm5lY3RlZEVtdWxhdG9yc1wiKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAucmV0dXJucyhbZW11bGF0b3JdKTtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2V0RW11bGF0b3JQb3J0XCIpXHJcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwb3J0KTtcclxuICAgIG1vY2tzLmFkYi5leHBlY3RzKFwic2VuZFRlbG5ldENvbW1hbmRcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKFwiYXZkIG5hbWVcIilcclxuICAgICAgLnJldHVybnMoYXZkTmFtZSk7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNldERldmljZUlkXCIpXHJcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyh1ZGlkKTtcclxuICAgIChhd2FpdCBhZGIuZ2V0UnVubmluZ0FWRChhdmROYW1lKSkuc2hvdWxkLmVxdWFsKGVtdWxhdG9yKTtcclxuICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICB9KTtcclxuICBpdCgnZ2V0UnVubmluZ0FWRCBzaG91bGQgcmV0dXJuIG51bGwgd2hlbiBleHBlY3RlZCBhdmQgaXMgbm90IGNvbm5lY3RlZCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCB1ZGlkID0gJ2VtdWxhdG9yLTU1NTQnO1xyXG4gICAgbGV0IHBvcnQgPSA1NTU0O1xyXG4gICAgbGV0IGVtdWxhdG9yID0ge3VkaWQsIHBvcnR9O1xyXG4gICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJnZXRDb25uZWN0ZWRFbXVsYXRvcnNcIilcclxuICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgLnJldHVybnMoW2VtdWxhdG9yXSk7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNldEVtdWxhdG9yUG9ydFwiKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MocG9ydCk7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcInNlbmRUZWxuZXRDb21tYW5kXCIpXHJcbiAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhcImF2ZCBuYW1lXCIpXHJcbiAgICAgIC5yZXR1cm5zKCdPVEhFUl9BVkQnKTtcclxuICAgIGNoYWkuZXhwZWN0KGF3YWl0IGFkYi5nZXRSdW5uaW5nQVZEKGF2ZE5hbWUpKS50by5iZS5udWxsO1xyXG4gICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gIH0pO1xyXG4gIGl0KCdnZXRSdW5uaW5nQVZEIHNob3VsZCByZXR1cm4gbnVsbCB3aGVuIG5vIGF2ZCBpcyBjb25uZWN0ZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImdldENvbm5lY3RlZEVtdWxhdG9yc1wiKVxyXG4gICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoKVxyXG4gICAgICAucmV0dXJucyhbXSk7XHJcbiAgICBjaGFpLmV4cGVjdChhd2FpdCBhZGIuZ2V0UnVubmluZ0FWRChhdmROYW1lKSkudG8uYmUubnVsbDtcclxuICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICB9KTtcclxufSkpO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
