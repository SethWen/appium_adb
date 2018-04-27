'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libHelpersJs = require('../../lib/helpers.js');

var _appiumSupport = require('appium-support');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function getFixture(file) {
  return _path2['default'].resolve(__dirname, '..', '..', '..', 'test', 'fixtures', file);
}

var apkPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager.apk');
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Helpers', function () {
  it('getAndroidPlatformAndPath should return empty object when no ANDROID_HOME is set', function callee$1$0() {
    var android_home;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          android_home = process.env.ANDROID_HOME;

          // temp setting android_home to null.
          delete process.env.ANDROID_HOME;

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap((0, _libHelpersJs.getAndroidPlatformAndPath)().should.eventually.be.rejectedWith(/ANDROID_HOME environment variable was not exported/));

        case 4:

          // resetting ANDROID_HOME
          process.env.ANDROID_HOME = android_home;

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  it('getAndroidPlatformAndPath should return platform and path for android', function callee$1$0() {
    var _ref, platform, platformPath;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _libHelpersJs.getAndroidPlatformAndPath)());

        case 2:
          _ref = context$2$0.sent;
          platform = _ref.platform;
          platformPath = _ref.platformPath;

          platform.should.exist;
          platformPath.should.exist;

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  // TODO make it work on CI
  it.skip('assertZipArchive should assert zip existing', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap((0, _libHelpersJs.assertZipArchive)(apkPath));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  describe('unzipFile', function () {
    it('should unzip a .zip file', function callee$2$0() {
      var temp;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_appiumSupport.tempDir.openDir());

          case 2:
            temp = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.copyFile(getFixture('TestZip.zip'), _path2['default'].resolve(temp, 'TestZip.zip')));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap((0, _libHelpersJs.unzipFile)(_path2['default'].resolve(temp, 'TestZip.zip')));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(_path2['default'].resolve(temp, 'TestZip', 'a.txt'), 'utf8').should.eventually.equal('Hello World'));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(_path2['default'].resolve(temp, 'TestZip', 'b.txt'), 'utf8').should.eventually.equal('Foobar'));

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    it('should unzip a .zip file (force isWindows to be true so we can test the internal zip library)', function callee$2$0() {
      var forceWindows, temp;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            forceWindows = _sinon2['default'].stub(_appiumSupport.system, 'isWindows', function () {
              return true;
            });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumSupport.tempDir.openDir());

          case 3:
            temp = context$3$0.sent;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.copyFile(getFixture('TestZip.zip'), _path2['default'].resolve(temp, 'TestZip.zip')));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap((0, _libHelpersJs.unzipFile)(_path2['default'].resolve(temp, 'TestZip.zip')));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(_path2['default'].resolve(temp, 'TestZip', 'a.txt'), 'utf8').should.eventually.equal('Hello World'));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(_path2['default'].resolve(temp, 'TestZip', 'b.txt'), 'utf8').should.eventually.equal('Foobar'));

          case 12:
            forceWindows.restore();

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzLXNwZWNzLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7NEJBQ21DLHNCQUFzQjs7NkJBQ2xFLGdCQUFnQjs7cUJBQ2xDLE9BQU87Ozs7b0JBQ1IsTUFBTTs7OztBQUV2QixTQUFTLFVBQVUsQ0FBRSxJQUFJLEVBQUU7QUFDekIsU0FBTyxrQkFBSyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3ZDOztBQUdELElBQU0sT0FBTyxHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2hGLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBTTtBQUN4QixJQUFFLENBQUMsa0ZBQWtGLEVBQUU7UUFDakYsWUFBWTs7OztBQUFaLHNCQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZOzs7QUFFM0MsaUJBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7OzsyQ0FFMUIsOENBQTJCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLG9EQUFvRCxDQUFDOzs7OztBQUd6SCxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOzs7Ozs7O0dBQ3pDLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsdUVBQXVFLEVBQUU7Y0FDckUsUUFBUSxFQUFFLFlBQVk7Ozs7OzsyQ0FBVSw4Q0FBMkI7Ozs7QUFBM0Qsa0JBQVEsUUFBUixRQUFRO0FBQUUsc0JBQVksUUFBWixZQUFZOztBQUMzQixrQkFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDdEIsc0JBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0dBQzNCLENBQUMsQ0FBQzs7QUFFSCxJQUFFLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxFQUFFOzs7OzsyQ0FDL0Msb0NBQWlCLE9BQU8sQ0FBQzs7Ozs7OztHQUNoQyxDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFNO0FBQzFCLE1BQUUsQ0FBQywwQkFBMEIsRUFBRTtVQUN2QixJQUFJOzs7Ozs2Q0FBUyx1QkFBUSxPQUFPLEVBQUU7OztBQUE5QixnQkFBSTs7NkNBQ0osa0JBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxrQkFBSyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDOzs7OzZDQUN6RSw2QkFBVSxrQkFBSyxPQUFPLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDOzs7OzZDQUM1QyxrQkFBRyxRQUFRLENBQUMsa0JBQUssT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDOzs7OzZDQUNsRyxrQkFBRyxRQUFRLENBQUMsa0JBQUssT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0tBQ3BHLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsK0ZBQStGLEVBQUU7VUFDNUYsWUFBWSxFQUNaLElBQUk7Ozs7QUFESix3QkFBWSxHQUFHLG1CQUFNLElBQUksd0JBQVMsV0FBVyxFQUFFO3FCQUFNLElBQUk7YUFBQSxDQUFDOzs2Q0FDN0MsdUJBQVEsT0FBTyxFQUFFOzs7QUFBOUIsZ0JBQUk7OzZDQUNKLGtCQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsa0JBQUssT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozs2Q0FDekUsNkJBQVUsa0JBQUssT0FBTyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQzs7Ozs2Q0FDNUMsa0JBQUcsUUFBUSxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQzs7Ozs2Q0FDbEcsa0JBQUcsUUFBUSxDQUFDLGtCQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7O0FBQ25HLHdCQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7Ozs7S0FDeEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBRUosQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9oZWxwZXJzLXNwZWNzLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCB7IGdldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGgsIGFzc2VydFppcEFyY2hpdmUsIHJvb3REaXIsIHVuemlwRmlsZSB9IGZyb20gJy4uLy4uL2xpYi9oZWxwZXJzLmpzJztcclxuaW1wb3J0IHsgZnMsIHRlbXBEaXIsIHN5c3RlbSB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5mdW5jdGlvbiBnZXRGaXh0dXJlIChmaWxlKSB7XHJcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICcuLicsICcuLicsICd0ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsIGZpbGUpO1xyXG59XHJcblxyXG5cclxuY29uc3QgYXBrUGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsICdmaXh0dXJlcycsICdDb250YWN0TWFuYWdlci5hcGsnKTtcclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuZGVzY3JpYmUoJ0hlbHBlcnMnLCAoKSA9PiB7XHJcbiAgaXQoJ2dldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGggc2hvdWxkIHJldHVybiBlbXB0eSBvYmplY3Qgd2hlbiBubyBBTkRST0lEX0hPTUUgaXMgc2V0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGFuZHJvaWRfaG9tZSA9IHByb2Nlc3MuZW52LkFORFJPSURfSE9NRTtcclxuICAgIC8vIHRlbXAgc2V0dGluZyBhbmRyb2lkX2hvbWUgdG8gbnVsbC5cclxuICAgIGRlbGV0ZSBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUU7XHJcblxyXG4gICAgYXdhaXQgZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvQU5EUk9JRF9IT01FIGVudmlyb25tZW50IHZhcmlhYmxlIHdhcyBub3QgZXhwb3J0ZWQvKTtcclxuXHJcbiAgICAvLyByZXNldHRpbmcgQU5EUk9JRF9IT01FXHJcbiAgICBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgPSBhbmRyb2lkX2hvbWU7XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdnZXRBbmRyb2lkUGxhdGZvcm1BbmRQYXRoIHNob3VsZCByZXR1cm4gcGxhdGZvcm0gYW5kIHBhdGggZm9yIGFuZHJvaWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQge3BsYXRmb3JtLCBwbGF0Zm9ybVBhdGh9ID0gYXdhaXQgZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCgpO1xyXG4gICAgcGxhdGZvcm0uc2hvdWxkLmV4aXN0O1xyXG4gICAgcGxhdGZvcm1QYXRoLnNob3VsZC5leGlzdDtcclxuICB9KTtcclxuICAvLyBUT0RPIG1ha2UgaXQgd29yayBvbiBDSVxyXG4gIGl0LnNraXAoJ2Fzc2VydFppcEFyY2hpdmUgc2hvdWxkIGFzc2VydCB6aXAgZXhpc3RpbmcnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCBhc3NlcnRaaXBBcmNoaXZlKGFwa1BhdGgpO1xyXG4gIH0pO1xyXG5cclxuICBkZXNjcmliZSgndW56aXBGaWxlJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCB1bnppcCBhIC56aXAgZmlsZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3QgdGVtcCA9IGF3YWl0IHRlbXBEaXIub3BlbkRpcigpO1xyXG4gICAgICBhd2FpdCBmcy5jb3B5RmlsZShnZXRGaXh0dXJlKCdUZXN0WmlwLnppcCcpLCBwYXRoLnJlc29sdmUodGVtcCwgJ1Rlc3RaaXAuemlwJykpO1xyXG4gICAgICBhd2FpdCB1bnppcEZpbGUocGF0aC5yZXNvbHZlKHRlbXAsICdUZXN0WmlwLnppcCcpKTtcclxuICAgICAgYXdhaXQgZnMucmVhZEZpbGUocGF0aC5yZXNvbHZlKHRlbXAsICdUZXN0WmlwJywgJ2EudHh0JyksICd1dGY4Jykuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ0hlbGxvIFdvcmxkJyk7XHJcbiAgICAgIGF3YWl0IGZzLnJlYWRGaWxlKHBhdGgucmVzb2x2ZSh0ZW1wLCAnVGVzdFppcCcsICdiLnR4dCcpLCAndXRmOCcpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdGb29iYXInKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgdW56aXAgYSAuemlwIGZpbGUgKGZvcmNlIGlzV2luZG93cyB0byBiZSB0cnVlIHNvIHdlIGNhbiB0ZXN0IHRoZSBpbnRlcm5hbCB6aXAgbGlicmFyeSknLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZvcmNlV2luZG93cyA9IHNpbm9uLnN0dWIoc3lzdGVtLCAnaXNXaW5kb3dzJywgKCkgPT4gdHJ1ZSk7XHJcbiAgICAgIGNvbnN0IHRlbXAgPSBhd2FpdCB0ZW1wRGlyLm9wZW5EaXIoKTtcclxuICAgICAgYXdhaXQgZnMuY29weUZpbGUoZ2V0Rml4dHVyZSgnVGVzdFppcC56aXAnKSwgcGF0aC5yZXNvbHZlKHRlbXAsICdUZXN0WmlwLnppcCcpKTtcclxuICAgICAgYXdhaXQgdW56aXBGaWxlKHBhdGgucmVzb2x2ZSh0ZW1wLCAnVGVzdFppcC56aXAnKSk7XHJcbiAgICAgIGF3YWl0IGZzLnJlYWRGaWxlKHBhdGgucmVzb2x2ZSh0ZW1wLCAnVGVzdFppcCcsICdhLnR4dCcpLCAndXRmOCcpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdIZWxsbyBXb3JsZCcpO1xyXG4gICAgICBhd2FpdCBmcy5yZWFkRmlsZShwYXRoLnJlc29sdmUodGVtcCwgJ1Rlc3RaaXAnLCAnYi50eHQnKSwgJ3V0ZjgnKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnRm9vYmFyJyk7XHJcbiAgICAgIGZvcmNlV2luZG93cy5yZXN0b3JlKCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
