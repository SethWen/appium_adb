'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _setup = require('./setup');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('System calls', function () {
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
  it('getConnectedDevices should get devices', function callee$1$0() {
    var devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getConnectedDevices());

        case 2:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getDevicesWithRetry should get devices', function callee$1$0() {
    var devices;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getDevicesWithRetry());

        case 2:
          devices = context$2$0.sent;

          devices.should.have.length.above(0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('adbExec should get devices when with devices', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.adbExec("devices"));

        case 2:
          context$2$0.sent.should.contain("List of devices attached");

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('isDeviceConnected should be true', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.isDeviceConnected());

        case 2:
          context$2$0.sent.should.be['true'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('shell should execute command in adb shell ', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.shell(['getprop', 'ro.build.version.sdk']));

        case 2:
          context$2$0.t0 = '' + _setup.apiLevel;
          context$2$0.sent.should.equal(context$2$0.t0);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getConnectedEmulators should get all connected emulators', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getConnectedEmulators());

        case 2:
          context$2$0.sent.length.should.be.above(0);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getRunningAVD should get all connected avd', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getRunningAVD(_setup.avdName));

        case 2:
          context$2$0.sent.should.not.be['null'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('getRunningAVDWithRetry should get all connected avds', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.getRunningAVDWithRetry(_setup.avdName));

        case 2:
          context$2$0.sent.should.not.be['null'];

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  // Skipping for now. Will unskip depending on how it behaves on CI
  it.skip('launchAVD should get all connected avds', function callee$1$0() {
    var proc;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(_setup.MOCHA_LONG_TIMEOUT);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.launchAVD(_setup.avdName));

        case 3:
          proc = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getConnectedEmulators());

        case 6:
          context$2$0.sent.length.should.be.above(0);

          proc.stop();

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('waitForDevice should get all connected avds', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.waitForDevice(2));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('reboot should reboot the device', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          this.timeout(_setup.MOCHA_LONG_TIMEOUT);
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.reboot(process.env.TRAVIS ? 200 : undefined));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.ping());

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('fileExists should detect when files do and do not exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.fileExists('/foo/bar/baz.zip'));

        case 2:
          context$2$0.sent.should.be['false'];
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.fileExists('/system/'));

        case 5:
          context$2$0.sent.should.be['true'];

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('ls should list files', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.ls('/foo/bar'));

        case 2:
          context$2$0.t0 = [];
          context$2$0.sent.should.eql(context$2$0.t0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.ls('/system/'));

        case 6:
          context$2$0.sent.should.contain('etc');

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9zeXNjYWxscy1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDN0IsT0FBTzs7OztxQkFDOEMsU0FBUzs7QUFHOUUsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZOzs7QUFDbkMsTUFBSSxDQUFDLE9BQU8sc0JBQWUsQ0FBQzs7QUFFNUIsTUFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLFFBQU0sQ0FBQzs7Ozs7MkNBQ08sY0FBSSxTQUFTLEVBQUU7OztBQUEzQixhQUFHOzs7Ozs7O0dBQ0osQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBQ3ZDLE9BQU87Ozs7OzJDQUFTLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRTs7O0FBQXpDLGlCQUFPOztBQUNYLGlCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0dBQ3JDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtRQUN2QyxPQUFPOzs7OzsyQ0FBUyxHQUFHLENBQUMsbUJBQW1CLEVBQUU7OztBQUF6QyxpQkFBTzs7QUFDWCxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztHQUNyQyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsOENBQThDLEVBQUU7Ozs7OzJDQUMxQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzs7OzJCQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQTBCOzs7Ozs7O0dBQ3pFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxrQ0FBa0MsRUFBRTs7Ozs7MkNBQzlCLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRTs7OzJCQUFFLE1BQU0sQ0FBQyxFQUFFOzs7Ozs7O0dBQzFDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw0Q0FBNEMsRUFBRTs7Ozs7MkNBQ3hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsc0JBQXNCLENBQUMsQ0FBQzs7OzsyQkFBRSxNQUFNLENBQUMsS0FBSzs7Ozs7OztHQUNwRSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMERBQTBELEVBQUU7Ozs7OzJDQUN0RCxHQUFHLENBQUMscUJBQXFCLEVBQUU7OzsyQkFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7OztHQUM3RCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNENBQTRDLEVBQUU7Ozs7OzJDQUN4QyxHQUFHLENBQUMsYUFBYSxnQkFBUzs7OzJCQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTs7Ozs7OztHQUNqRCxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsc0RBQXNELEVBQUU7Ozs7OzJDQUNsRCxHQUFHLENBQUMsc0JBQXNCLGdCQUFTOzs7MkJBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs7Ozs7O0dBQzFELENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxFQUFFO1FBRTdDLElBQUk7Ozs7QUFEUixjQUFJLENBQUMsT0FBTywyQkFBb0IsQ0FBQzs7MkNBQ2hCLEdBQUcsQ0FBQyxTQUFTLGdCQUFTOzs7QUFBbkMsY0FBSTs7MkNBQ0QsR0FBRyxDQUFDLHFCQUFxQixFQUFFOzs7MkJBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBQzVELGNBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7OztHQUNiLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw2Q0FBNkMsRUFBRTs7Ozs7MkNBQzFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0dBQzNCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxpQ0FBaUMsRUFBRTs7OztBQUNwQyxjQUFJLENBQUMsT0FBTywyQkFBb0IsQ0FBQzs7MkNBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQzs7OzsyQ0FDaEQsR0FBRyxDQUFDLElBQUksRUFBRTs7Ozs7OztHQUNqQixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMseURBQXlELEVBQUU7Ozs7OzJDQUNyRCxHQUFHLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDOzs7MkJBQUUsTUFBTSxDQUFDLEVBQUU7OzJDQUM3QyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQzs7OzJCQUFFLE1BQU0sQ0FBQyxFQUFFOzs7Ozs7O0dBQzdDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxzQkFBc0IsRUFBRTs7Ozs7MkNBQ2xCLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDOzs7MkJBQWEsRUFBRTsyQkFBYixNQUFNLENBQUMsR0FBRzs7MkNBQzlCLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDOzs7MkJBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLOzs7Ozs7O0dBQ2hELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvc3lzY2FsbHMtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFEQiBmcm9tICcuLi8uLic7XHJcbmltcG9ydCB7IGFwaUxldmVsLCBhdmROYW1lLCBNT0NIQV9USU1FT1VULCBNT0NIQV9MT05HX1RJTUVPVVQgfSBmcm9tICcuL3NldHVwJztcclxuXHJcblxyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5kZXNjcmliZSgnU3lzdGVtIGNhbGxzJywgZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMudGltZW91dChNT0NIQV9USU1FT1VUKTtcclxuXHJcbiAgbGV0IGFkYjtcclxuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xyXG4gICAgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQigpO1xyXG4gIH0pO1xyXG4gIGl0KCdnZXRDb25uZWN0ZWREZXZpY2VzIHNob3VsZCBnZXQgZGV2aWNlcycsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBkZXZpY2VzID0gYXdhaXQgYWRiLmdldENvbm5lY3RlZERldmljZXMoKTtcclxuICAgIGRldmljZXMuc2hvdWxkLmhhdmUubGVuZ3RoLmFib3ZlKDApO1xyXG4gIH0pO1xyXG4gIGl0KCdnZXREZXZpY2VzV2l0aFJldHJ5IHNob3VsZCBnZXQgZGV2aWNlcycsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBkZXZpY2VzID0gYXdhaXQgYWRiLmdldERldmljZXNXaXRoUmV0cnkoKTtcclxuICAgIGRldmljZXMuc2hvdWxkLmhhdmUubGVuZ3RoLmFib3ZlKDApO1xyXG4gIH0pO1xyXG4gIGl0KCdhZGJFeGVjIHNob3VsZCBnZXQgZGV2aWNlcyB3aGVuIHdpdGggZGV2aWNlcycsIGFzeW5jICgpID0+IHtcclxuICAgIChhd2FpdCBhZGIuYWRiRXhlYyhcImRldmljZXNcIikpLnNob3VsZC5jb250YWluKFwiTGlzdCBvZiBkZXZpY2VzIGF0dGFjaGVkXCIpO1xyXG4gIH0pO1xyXG4gIGl0KCdpc0RldmljZUNvbm5lY3RlZCBzaG91bGQgYmUgdHJ1ZScsIGFzeW5jICgpID0+IHtcclxuICAgIChhd2FpdCBhZGIuaXNEZXZpY2VDb25uZWN0ZWQoKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgfSk7XHJcbiAgaXQoJ3NoZWxsIHNob3VsZCBleGVjdXRlIGNvbW1hbmQgaW4gYWRiIHNoZWxsICcsIGFzeW5jICgpID0+IHtcclxuICAgIChhd2FpdCBhZGIuc2hlbGwoWydnZXRwcm9wJywgJ3JvLmJ1aWxkLnZlcnNpb24uc2RrJ10pKS5zaG91bGQuZXF1YWwoYCR7YXBpTGV2ZWx9YCk7XHJcbiAgfSk7XHJcbiAgaXQoJ2dldENvbm5lY3RlZEVtdWxhdG9ycyBzaG91bGQgZ2V0IGFsbCBjb25uZWN0ZWQgZW11bGF0b3JzJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgKGF3YWl0IGFkYi5nZXRDb25uZWN0ZWRFbXVsYXRvcnMoKSkubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgwKTtcclxuICB9KTtcclxuICBpdCgnZ2V0UnVubmluZ0FWRCBzaG91bGQgZ2V0IGFsbCBjb25uZWN0ZWQgYXZkJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgKGF3YWl0IGFkYi5nZXRSdW5uaW5nQVZEKGF2ZE5hbWUpKS5zaG91bGQubm90LmJlLm51bGw7XHJcbiAgfSk7XHJcbiAgaXQoJ2dldFJ1bm5pbmdBVkRXaXRoUmV0cnkgc2hvdWxkIGdldCBhbGwgY29ubmVjdGVkIGF2ZHMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAoYXdhaXQgYWRiLmdldFJ1bm5pbmdBVkRXaXRoUmV0cnkoYXZkTmFtZSkpLnNob3VsZC5ub3QuYmUubnVsbDtcclxuICB9KTtcclxuICAvLyBTa2lwcGluZyBmb3Igbm93LiBXaWxsIHVuc2tpcCBkZXBlbmRpbmcgb24gaG93IGl0IGJlaGF2ZXMgb24gQ0lcclxuICBpdC5za2lwKCdsYXVuY2hBVkQgc2hvdWxkIGdldCBhbGwgY29ubmVjdGVkIGF2ZHMnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnRpbWVvdXQoTU9DSEFfTE9OR19USU1FT1VUKTtcclxuICAgIGxldCBwcm9jID0gYXdhaXQgYWRiLmxhdW5jaEFWRChhdmROYW1lKTtcclxuICAgIChhd2FpdCBhZGIuZ2V0Q29ubmVjdGVkRW11bGF0b3JzKCkpLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMCk7XHJcbiAgICBwcm9jLnN0b3AoKTtcclxuICB9KTtcclxuICBpdCgnd2FpdEZvckRldmljZSBzaG91bGQgZ2V0IGFsbCBjb25uZWN0ZWQgYXZkcycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGF3YWl0IGFkYi53YWl0Rm9yRGV2aWNlKDIpO1xyXG4gIH0pO1xyXG4gIGl0KCdyZWJvb3Qgc2hvdWxkIHJlYm9vdCB0aGUgZGV2aWNlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy50aW1lb3V0KE1PQ0hBX0xPTkdfVElNRU9VVCk7XHJcbiAgICBhd2FpdCBhZGIucmVib290KHByb2Nlc3MuZW52LlRSQVZJUyA/IDIwMCA6IHVuZGVmaW5lZCk7XHJcbiAgICBhd2FpdCBhZGIucGluZygpO1xyXG4gIH0pO1xyXG4gIGl0KCdmaWxlRXhpc3RzIHNob3VsZCBkZXRlY3Qgd2hlbiBmaWxlcyBkbyBhbmQgZG8gbm90IGV4aXN0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgKGF3YWl0IGFkYi5maWxlRXhpc3RzKCcvZm9vL2Jhci9iYXouemlwJykpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgIChhd2FpdCBhZGIuZmlsZUV4aXN0cygnL3N5c3RlbS8nKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgfSk7XHJcbiAgaXQoJ2xzIHNob3VsZCBsaXN0IGZpbGVzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgKGF3YWl0IGFkYi5scygnL2Zvby9iYXInKSkuc2hvdWxkLmVxbChbXSk7XHJcbiAgICAoYXdhaXQgYWRiLmxzKCcvc3lzdGVtLycpKS5zaG91bGQuY29udGFpbignZXRjJyk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
