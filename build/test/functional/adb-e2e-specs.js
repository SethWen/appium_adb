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

var should = _chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('ADB', function () {
  it('should correctly return adb if present', function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(_2['default'].createADB());

        case 2:
          adb = context$2$0.sent;

          should.exist(adb.executable.path);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should correctly return adb from path when ANDROID_HOME is not set', function callee$1$0() {
    var opts, adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          opts = { sdkRoot: '' };
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(_2['default'].createADB(opts));

        case 3:
          adb = context$2$0.sent;

          should.exist(adb.executable.path);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it.skip('should error out if binary not persent', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  // TODO write a negative test
  it('should initialize aapt', function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.initAapt());

        case 3:
          adb.binaries.aapt.should.contain('aapt');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should initialize zipAlign', function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          adb = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(adb.initZipAlign());

        case 3:
          adb.binaries.zipalign.should.contain('zipalign');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hZGItZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDN0IsT0FBTzs7OztBQUV2QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUM3QixrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsS0FBSyxFQUFFLFlBQU07QUFDcEIsSUFBRSxDQUFDLHdDQUF3QyxFQUFFO1FBQ3ZDLEdBQUc7Ozs7OzJDQUFTLGNBQUksU0FBUyxFQUFFOzs7QUFBM0IsYUFBRzs7QUFDUCxnQkFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0dBQ25DLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxvRUFBb0UsRUFBRTtRQUNuRSxJQUFJLEVBQ0osR0FBRzs7OztBQURILGNBQUksR0FBRyxFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUM7OzJDQUNSLGNBQUksU0FBUyxDQUFDLElBQUksQ0FBQzs7O0FBQS9CLGFBQUc7O0FBQ1AsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7OztHQUNuQyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxFQUFFOzs7Ozs7OztHQUVqRCxDQUFDLENBQUM7OztBQUNILElBQUUsQ0FBQyx3QkFBd0IsRUFBRTtRQUN2QixHQUFHOzs7O0FBQUgsYUFBRyxHQUFHLG1CQUFTOzsyQ0FDYixHQUFHLENBQUMsUUFBUSxFQUFFOzs7QUFDcEIsYUFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7OztHQUMxQyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNEJBQTRCLEVBQUU7UUFDM0IsR0FBRzs7OztBQUFILGFBQUcsR0FBRyxtQkFBUzs7MkNBQ2IsR0FBRyxDQUFDLFlBQVksRUFBRTs7O0FBQ3hCLGFBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Ozs7Ozs7R0FDbEQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9hZGItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XHJcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcclxuaW1wb3J0IEFEQiBmcm9tICcuLi8uLic7XHJcblxyXG5jb25zdCBzaG91bGQgPSBjaGFpLnNob3VsZCgpO1xyXG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XHJcblxyXG5kZXNjcmliZSgnQURCJywgKCkgPT4ge1xyXG4gIGl0KCdzaG91bGQgY29ycmVjdGx5IHJldHVybiBhZGIgaWYgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBhZGIgPSBhd2FpdCBBREIuY3JlYXRlQURCKCk7XHJcbiAgICBzaG91bGQuZXhpc3QoYWRiLmV4ZWN1dGFibGUucGF0aCk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcmV0dXJuIGFkYiBmcm9tIHBhdGggd2hlbiBBTkRST0lEX0hPTUUgaXMgbm90IHNldCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBvcHRzID0ge3Nka1Jvb3Q6ICcnfTtcclxuICAgIGxldCBhZGIgPSBhd2FpdCBBREIuY3JlYXRlQURCKG9wdHMpO1xyXG4gICAgc2hvdWxkLmV4aXN0KGFkYi5leGVjdXRhYmxlLnBhdGgpO1xyXG4gIH0pO1xyXG4gIGl0LnNraXAoJ3Nob3VsZCBlcnJvciBvdXQgaWYgYmluYXJ5IG5vdCBwZXJzZW50JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgLy8gVE9ETyB3cml0ZSBhIG5lZ2F0aXZlIHRlc3RcclxuICB9KTtcclxuICBpdCgnc2hvdWxkIGluaXRpYWxpemUgYWFwdCcsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCBhZGIgPSBuZXcgQURCKCk7XHJcbiAgICBhd2FpdCBhZGIuaW5pdEFhcHQoKTtcclxuICAgIGFkYi5iaW5hcmllcy5hYXB0LnNob3VsZC5jb250YWluKCdhYXB0Jyk7XHJcbiAgfSk7XHJcbiAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHppcEFsaWduJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGFkYiA9IG5ldyBBREIoKTtcclxuICAgIGF3YWl0IGFkYi5pbml0WmlwQWxpZ24oKTtcclxuICAgIGFkYi5iaW5hcmllcy56aXBhbGlnbi5zaG91bGQuY29udGFpbignemlwYWxpZ24nKTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
