'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

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

_chai2['default'].use(_chaiAsPromised2['default']);
_chai2['default'].should();

var fingerprintPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'Fingerprint.apk');
var pkg = 'com.example.fingerprint';
var activity = '.MainActivity';
var secretActivity = '.SecretActivity';

describe('adb emu commands', function () {
  var adb = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_2['default'].createADB());

        case 2:
          adb = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 5:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0 = context$2$0.t1 < 23;

          if (context$2$0.t0) {
            context$2$0.next = 9;
            break;
          }

          context$2$0.t0 = !process.env.REAL_DEVICE;

        case 9:
          if (!context$2$0.t0) {
            context$2$0.next = 11;
            break;
          }

          this.skip();

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });
  it('fingerprint should open the secret activity on emitted valid finger touch event', function callee$1$0() {
    var app;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(adb.isAppInstalled(pkg));

        case 2:
          if (!context$2$0.sent) {
            context$2$0.next = 7;
            break;
          }

          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(adb.forceStop(pkg));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(adb.uninstallApk(pkg));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(adb.install(fingerprintPath));

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(adb.startApp({ pkg: pkg, activity: activity }));

        case 11:
          context$2$0.next = 13;
          return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(500));

        case 13:
          context$2$0.next = 15;
          return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

        case 15:
          app = context$2$0.sent;

          app.appActivity.should.equal(activity);
          context$2$0.next = 19;
          return _regeneratorRuntime.awrap(adb.fingerprint(1111));

        case 19:
          context$2$0.next = 21;
          return _regeneratorRuntime.awrap((0, _asyncbox.sleep)(2500));

        case 21:
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(adb.getFocusedPackageAndActivity());

        case 23:
          app = context$2$0.sent;

          app.appActivity.should.equal(secretActivity);

        case 25:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// the test here only works if we have API level 23 or above
// it will also fail on emulators
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hZGItZW11LWNvbW1hbmRzLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7b0JBQ04sTUFBTTs7Ozs0QkFDQyxzQkFBc0I7O3dCQUN4QixVQUFVOztBQUdoQyxrQkFBSyxHQUFHLDZCQUFnQixDQUFDO0FBQ3pCLGtCQUFLLE1BQU0sRUFBRSxDQUFDOztBQUVkLElBQU0sZUFBZSxHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JGLElBQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDO0FBQ3RDLElBQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQztBQUNqQyxJQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQzs7QUFFekMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakMsTUFBSSxHQUFHLFlBQUEsQ0FBQztBQUNSLFFBQU0sQ0FBQzs7Ozs7MkNBQ08sY0FBSSxTQUFTLEVBQUU7OztBQUEzQixhQUFHOzsyQ0FJTyxHQUFHLENBQUMsV0FBVyxFQUFFOzs7OzRDQUFHLEVBQUU7Ozs7Ozs7MkJBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVc7Ozs7Ozs7O0FBQzFELGNBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7OztHQUVmLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxpRkFBaUYsRUFBRTtRQVNoRixHQUFHOzs7OzsyQ0FSRyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQzs7Ozs7Ozs7OzJDQUN6QixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQzs7OzsyQ0FDbEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7Ozs7MkNBRXZCLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDOzs7OzJDQUM1QixHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFDLENBQUM7Ozs7MkNBQzdCLHFCQUFNLEdBQUcsQ0FBQzs7OzsyQ0FFQSxHQUFHLENBQUMsNEJBQTRCLEVBQUU7OztBQUE5QyxhQUFHOztBQUNQLGFBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzs7MkNBQ2pDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNyQixxQkFBTSxJQUFJLENBQUM7Ozs7MkNBRUwsR0FBRyxDQUFDLDRCQUE0QixFQUFFOzs7QUFBOUMsYUFBRzs7QUFDSCxhQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7Ozs7R0FDOUMsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9hZGItZW11LWNvbW1hbmRzLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBREIgZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgcm9vdERpciB9IGZyb20gJy4uLy4uL2xpYi9oZWxwZXJzLmpzJztcclxuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICdhc3luY2JveCc7XHJcblxyXG5cclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5jaGFpLnNob3VsZCgpO1xyXG5cclxuY29uc3QgZmluZ2VycHJpbnRQYXRoID0gcGF0aC5yZXNvbHZlKHJvb3REaXIsICd0ZXN0JywgJ2ZpeHR1cmVzJywgJ0ZpbmdlcnByaW50LmFwaycpO1xyXG5jb25zdCBwa2cgPSAnY29tLmV4YW1wbGUuZmluZ2VycHJpbnQnO1xyXG5jb25zdCBhY3Rpdml0eSA9ICcuTWFpbkFjdGl2aXR5JztcclxuY29uc3Qgc2VjcmV0QWN0aXZpdHkgPSAnLlNlY3JldEFjdGl2aXR5JztcclxuXHJcbmRlc2NyaWJlKCdhZGIgZW11IGNvbW1hbmRzJywgKCkgPT4ge1xyXG4gIGxldCBhZGI7XHJcbiAgYmVmb3JlKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgIGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoKTtcclxuXHJcbiAgICAvLyB0aGUgdGVzdCBoZXJlIG9ubHkgd29ya3MgaWYgd2UgaGF2ZSBBUEkgbGV2ZWwgMjMgb3IgYWJvdmVcclxuICAgIC8vIGl0IHdpbGwgYWxzbyBmYWlsIG9uIGVtdWxhdG9yc1xyXG4gICAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpIDwgMjMgfHwgIXByb2Nlc3MuZW52LlJFQUxfREVWSUNFKSB7XHJcbiAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGl0KCdmaW5nZXJwcmludCBzaG91bGQgb3BlbiB0aGUgc2VjcmV0IGFjdGl2aXR5IG9uIGVtaXR0ZWQgdmFsaWQgZmluZ2VyIHRvdWNoIGV2ZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChwa2cpKSB7XHJcbiAgICAgIGF3YWl0IGFkYi5mb3JjZVN0b3AocGtnKTtcclxuICAgICAgYXdhaXQgYWRiLnVuaW5zdGFsbEFwayhwa2cpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgYWRiLmluc3RhbGwoZmluZ2VycHJpbnRQYXRoKTtcclxuICAgIGF3YWl0IGFkYi5zdGFydEFwcCh7cGtnLCBhY3Rpdml0eX0pO1xyXG4gICAgYXdhaXQgc2xlZXAoNTAwKTtcclxuXHJcbiAgICBsZXQgYXBwID0gYXdhaXQgYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgIGFwcC5hcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoYWN0aXZpdHkpO1xyXG4gICAgYXdhaXQgYWRiLmZpbmdlcnByaW50KDExMTEpO1xyXG4gICAgYXdhaXQgc2xlZXAoMjUwMCk7XHJcblxyXG4gICAgYXBwID0gYXdhaXQgYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcclxuICAgIGFwcC5hcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoc2VjcmV0QWN0aXZpdHkpO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
