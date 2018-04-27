'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this2 = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _appiumSupport = require('appium-support');

var _libHelpersJs = require('../../lib/helpers.js');

// All paths below assume tests run under /build/test/ so paths are relative from
// that directory.
var contactManagerPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager.apk'),
    contactMangerSelendroidPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'ContactManager-selendroid.apk'),
    tmpDir = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'temp'),
    srcManifest = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'selendroid', 'AndroidManifest.xml'),
    serverPath = _path2['default'].resolve(_libHelpersJs.rootDir, 'test', 'fixtures', 'selendroid', 'selendroid.apk');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('Android-manifest', function callee$0$0() {
  var adb;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        adb = undefined;

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
        it('packageAndLaunchActivityFromManifest should parse package and Activity', function callee$1$0() {
          var _ref, apkPackage, apkActivity;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(adb.packageAndLaunchActivityFromManifest(contactManagerPath));

              case 2:
                _ref = context$2$0.sent;
                apkPackage = _ref.apkPackage;
                apkActivity = _ref.apkActivity;

                apkPackage.should.equal('com.example.android.contactmanager');
                apkActivity.should.equal('com.example.android.contactmanager.ContactManager');

              case 7:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('hasInternetPermissionFromManifest should be true', function callee$1$0() {
          var flag;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(adb.hasInternetPermissionFromManifest(contactMangerSelendroidPath));

              case 2:
                flag = context$2$0.sent;

                flag.should.be['true'];

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        it('hasInternetPermissionFromManifest should be false', function callee$1$0() {
          var flag;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(adb.hasInternetPermissionFromManifest(contactManagerPath));

              case 2:
                flag = context$2$0.sent;

                flag.should.be['false'];

              case 4:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        });
        // TODO fix this test
        it.skip('should compile and insert manifest', function callee$1$0() {
          var appPackage, newServerPath, newPackage, dstDir, dstManifest;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                appPackage = 'com.example.android.contactmanager', newServerPath = _path2['default'].resolve(tmpDir, 'selendroid.' + appPackage + '.apk'), newPackage = 'com.example.android.contactmanager.selendroid', dstDir = _path2['default'].resolve(tmpDir, appPackage), dstManifest = _path2['default'].resolve(dstDir, 'AndroidManifest.xml');
                context$2$0.prev = 1;
                context$2$0.next = 4;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(tmpDir));

              case 4:
                context$2$0.next = 9;
                break;

              case 6:
                context$2$0.prev = 6;
                context$2$0.t0 = context$2$0['catch'](1);

                console.log('Unable to delete temp directory. It might not be present. ' + context$2$0.t0.message); // eslint-disable-line no-console

              case 9:
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.mkdir(tmpDir));

              case 11:
                context$2$0.next = 13;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.mkdir(dstDir));

              case 13:
                context$2$0.t1 = _regeneratorRuntime;
                context$2$0.t2 = _appiumSupport.fs;
                context$2$0.t3 = dstManifest;
                context$2$0.next = 18;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(srcManifest, "utf8"));

              case 18:
                context$2$0.t4 = context$2$0.sent;
                context$2$0.t5 = context$2$0.t2.writeFile.call(context$2$0.t2, context$2$0.t3, context$2$0.t4, "utf8");
                context$2$0.next = 22;
                return context$2$0.t1.awrap.call(context$2$0.t1, context$2$0.t5);

              case 22:
                context$2$0.next = 24;
                return _regeneratorRuntime.awrap(adb.compileManifest(dstManifest, newPackage, appPackage));

              case 24:
                context$2$0.next = 26;
                return _regeneratorRuntime.awrap(_appiumSupport.util.fileExists(dstManifest));

              case 26:
                context$2$0.sent.should.be['true'];
                context$2$0.next = 29;
                return _regeneratorRuntime.awrap(adb.insertManifest(dstManifest, serverPath, newServerPath));

              case 29:
                context$2$0.next = 31;
                return _regeneratorRuntime.awrap(_appiumSupport.util.fileExists(newServerPath));

              case 31:
                context$2$0.sent.should.be['true'];
                context$2$0.prev = 32;
                context$2$0.next = 35;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(tmpDir));

              case 35:
                context$2$0.next = 40;
                break;

              case 37:
                context$2$0.prev = 37;
                context$2$0.t6 = context$2$0['catch'](32);

                console.log('Unable to delete temp directory. It might not be present. ' + context$2$0.t6.message); // eslint-disable-line no-console

              case 40:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[1, 6], [32, 37]]);
        });

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this2);
});

describe.skip('Android-manifest To be implemented methods', function () {
  it('should return correct processFromManifest', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
});

// deleting temp directory if present

// deleting temp directory
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hbmRyb2lkLW1hbmlmZXN0LWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7b0JBQ04sTUFBTTs7Ozs2QkFDRSxnQkFBZ0I7OzRCQUNqQixzQkFBc0I7Ozs7QUFLOUMsSUFBTSxrQkFBa0IsR0FBRyxrQkFBSyxPQUFPLHdCQUFVLE1BQU0sRUFDZixVQUFVLEVBQUUsb0JBQW9CLENBQUM7SUFDbkUsMkJBQTJCLEdBQUcsa0JBQUssT0FBTyx3QkFBVSxNQUFNLEVBQ2YsVUFBVSxFQUFFLCtCQUErQixDQUFDO0lBQ3ZGLE1BQU0sR0FBRyxrQkFBSyxPQUFPLHdCQUFVLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDOUMsV0FBVyxHQUFHLGtCQUFLLE9BQU8sd0JBQVUsTUFBTSxFQUFFLFVBQVUsRUFDM0IsWUFBWSxFQUFFLHFCQUFxQixDQUFDO0lBQy9ELFVBQVUsR0FBRyxrQkFBSyxPQUFPLHdCQUFVLE1BQU0sRUFBRSxVQUFVLEVBQzNCLFlBQVksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztBQUVoRSxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsa0JBQWtCLEVBQUU7TUFDdkIsR0FBRzs7Ozs7O0FBQUgsV0FBRzs7QUFDUCxjQUFNLENBQUM7Ozs7O2lEQUNPLGNBQUksU0FBUyxFQUFFOzs7QUFBM0IsbUJBQUc7Ozs7Ozs7U0FDSixDQUFDLENBQUM7QUFDSCxVQUFFLENBQUMsd0VBQXdFLEVBQUU7b0JBQ3RFLFVBQVUsRUFBRSxXQUFXOzs7Ozs7aURBQVUsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLGtCQUFrQixDQUFDOzs7O0FBQTdGLDBCQUFVLFFBQVYsVUFBVTtBQUFFLDJCQUFXLFFBQVgsV0FBVzs7QUFDNUIsMEJBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7QUFDOUQsMkJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7Ozs7Ozs7U0FDL0UsQ0FBQyxDQUFDO0FBQ0gsVUFBRSxDQUFDLGtEQUFrRCxFQUFFO2NBQ2pELElBQUk7Ozs7O2lEQUFTLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQywyQkFBMkIsQ0FBQzs7O0FBQS9FLG9CQUFJOztBQUNSLG9CQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDOzs7Ozs7O1NBQ3JCLENBQUMsQ0FBQztBQUNILFVBQUUsQ0FBQyxtREFBbUQsRUFBRTtjQUNsRCxJQUFJOzs7OztpREFBUyxHQUFHLENBQUMsaUNBQWlDLENBQUMsa0JBQWtCLENBQUM7OztBQUF0RSxvQkFBSTs7QUFDUixvQkFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQU0sQ0FBQzs7Ozs7OztTQUN0QixDQUFDLENBQUM7O0FBRUgsVUFBRSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRTtjQUN4QyxVQUFVLEVBQ1YsYUFBYSxFQUNiLFVBQVUsRUFDVixNQUFNLEVBQ04sV0FBVzs7OztBQUpYLDBCQUFVLEdBQUcsb0NBQW9DLEVBQ2pELGFBQWEsR0FBRyxrQkFBSyxPQUFPLENBQUMsTUFBTSxrQkFBZ0IsVUFBVSxVQUFPLEVBQ3BFLFVBQVUsR0FBRywrQ0FBK0MsRUFDNUQsTUFBTSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQ3pDLFdBQVcsR0FBRyxrQkFBSyxPQUFPLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDOzs7aURBR3JELGtCQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7Ozs7QUFFdkIsdUJBQU8sQ0FBQyxHQUFHLGdFQUE4RCxlQUFFLE9BQU8sQ0FBRyxDQUFDOzs7O2lEQUVsRixrQkFBRyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7O2lEQUNoQixrQkFBRyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7OztpQ0FDSCxXQUFXOztpREFBUSxrQkFBRyxRQUFRLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7OztnREFBN0QsU0FBUyxzREFBc0QsTUFBTTs7Ozs7O2lEQUN4RSxHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDOzs7O2lEQUN2RCxvQkFBSyxVQUFVLENBQUMsV0FBVyxDQUFDOzs7aUNBQUUsTUFBTSxDQUFDLEVBQUU7O2lEQUN4QyxHQUFHLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDOzs7O2lEQUN6RCxvQkFBSyxVQUFVLENBQUMsYUFBYSxDQUFDOzs7aUNBQUUsTUFBTSxDQUFDLEVBQUU7OztpREFHeEMsa0JBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQUV2Qix1QkFBTyxDQUFDLEdBQUcsZ0VBQThELGVBQUUsT0FBTyxDQUFHLENBQUM7Ozs7Ozs7U0FFekYsQ0FBQyxDQUFDOzs7Ozs7O0NBQ0osQ0FBQyxDQUFDOztBQUVILFFBQVEsQ0FBQyxJQUFJLENBQUMsNENBQTRDLEVBQUUsWUFBTTtBQUNoRSxJQUFFLENBQUMsMkNBQTJDLEVBQUU7Ozs7Ozs7O0dBQWUsQ0FBQyxDQUFDO0NBQ2xFLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvYW5kcm9pZC1tYW5pZmVzdC1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQURCIGZyb20gJy4uLy4uJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGZzLCB1dGlsIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xyXG5pbXBvcnQgeyByb290RGlyIH0gZnJvbSAnLi4vLi4vbGliL2hlbHBlcnMuanMnO1xyXG5cclxuXHJcbi8vIEFsbCBwYXRocyBiZWxvdyBhc3N1bWUgdGVzdHMgcnVuIHVuZGVyIC9idWlsZC90ZXN0LyBzbyBwYXRocyBhcmUgcmVsYXRpdmUgZnJvbVxyXG4vLyB0aGF0IGRpcmVjdG9yeS5cclxuY29uc3QgY29udGFjdE1hbmFnZXJQYXRoID0gcGF0aC5yZXNvbHZlKHJvb3REaXIsICd0ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsICdDb250YWN0TWFuYWdlci5hcGsnKSxcclxuICAgICAgY29udGFjdE1hbmdlclNlbGVuZHJvaWRQYXRoID0gcGF0aC5yZXNvbHZlKHJvb3REaXIsICd0ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdmaXh0dXJlcycsICdDb250YWN0TWFuYWdlci1zZWxlbmRyb2lkLmFwaycpLFxyXG4gICAgICB0bXBEaXIgPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ3Rlc3QnLCAndGVtcCcpLFxyXG4gICAgICBzcmNNYW5pZmVzdCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsICdmaXh0dXJlcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZWxlbmRyb2lkJywgJ0FuZHJvaWRNYW5pZmVzdC54bWwnKSxcclxuICAgICAgc2VydmVyUGF0aCA9IHBhdGgucmVzb2x2ZShyb290RGlyLCAndGVzdCcsICdmaXh0dXJlcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlbGVuZHJvaWQnLCAnc2VsZW5kcm9pZC5hcGsnKTtcclxuXHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdBbmRyb2lkLW1hbmlmZXN0JywgYXN5bmMgKCkgPT4ge1xyXG4gIGxldCBhZGI7XHJcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcclxuICAgIGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoKTtcclxuICB9KTtcclxuICBpdCgncGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0IHNob3VsZCBwYXJzZSBwYWNrYWdlIGFuZCBBY3Rpdml0eScsIGFzeW5jICgpID0+IHtcclxuICAgIGxldCB7YXBrUGFja2FnZSwgYXBrQWN0aXZpdHl9ID0gYXdhaXQgYWRiLnBhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdChjb250YWN0TWFuYWdlclBhdGgpO1xyXG4gICAgYXBrUGFja2FnZS5zaG91bGQuZXF1YWwoJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXInKTtcclxuICAgIGFwa0FjdGl2aXR5LnNob3VsZC5lcXVhbCgnY29tLmV4YW1wbGUuYW5kcm9pZC5jb250YWN0bWFuYWdlci5Db250YWN0TWFuYWdlcicpO1xyXG4gIH0pO1xyXG4gIGl0KCdoYXNJbnRlcm5ldFBlcm1pc3Npb25Gcm9tTWFuaWZlc3Qgc2hvdWxkIGJlIHRydWUnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgZmxhZyA9IGF3YWl0IGFkYi5oYXNJbnRlcm5ldFBlcm1pc3Npb25Gcm9tTWFuaWZlc3QoY29udGFjdE1hbmdlclNlbGVuZHJvaWRQYXRoKTtcclxuICAgIGZsYWcuc2hvdWxkLmJlLnRydWU7XHJcbiAgfSk7XHJcbiAgaXQoJ2hhc0ludGVybmV0UGVybWlzc2lvbkZyb21NYW5pZmVzdCBzaG91bGQgYmUgZmFsc2UnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgZmxhZyA9IGF3YWl0IGFkYi5oYXNJbnRlcm5ldFBlcm1pc3Npb25Gcm9tTWFuaWZlc3QoY29udGFjdE1hbmFnZXJQYXRoKTtcclxuICAgIGZsYWcuc2hvdWxkLmJlLmZhbHNlO1xyXG4gIH0pO1xyXG4gIC8vIFRPRE8gZml4IHRoaXMgdGVzdFxyXG4gIGl0LnNraXAoJ3Nob3VsZCBjb21waWxlIGFuZCBpbnNlcnQgbWFuaWZlc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICBsZXQgYXBwUGFja2FnZSA9ICdjb20uZXhhbXBsZS5hbmRyb2lkLmNvbnRhY3RtYW5hZ2VyJyxcclxuICAgICAgICBuZXdTZXJ2ZXJQYXRoID0gcGF0aC5yZXNvbHZlKHRtcERpciwgYHNlbGVuZHJvaWQuJHthcHBQYWNrYWdlfS5hcGtgKSxcclxuICAgICAgICBuZXdQYWNrYWdlID0gJ2NvbS5leGFtcGxlLmFuZHJvaWQuY29udGFjdG1hbmFnZXIuc2VsZW5kcm9pZCcsXHJcbiAgICAgICAgZHN0RGlyID0gcGF0aC5yZXNvbHZlKHRtcERpciwgYXBwUGFja2FnZSksXHJcbiAgICAgICAgZHN0TWFuaWZlc3QgPSBwYXRoLnJlc29sdmUoZHN0RGlyLCAnQW5kcm9pZE1hbmlmZXN0LnhtbCcpO1xyXG4gICAgLy8gZGVsZXRpbmcgdGVtcCBkaXJlY3RvcnkgaWYgcHJlc2VudFxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgZnMucmltcmFmKHRtcERpcik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBVbmFibGUgdG8gZGVsZXRlIHRlbXAgZGlyZWN0b3J5LiBJdCBtaWdodCBub3QgYmUgcHJlc2VudC4gJHtlLm1lc3NhZ2V9YCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxyXG4gICAgfVxyXG4gICAgYXdhaXQgZnMubWtkaXIodG1wRGlyKTtcclxuICAgIGF3YWl0IGZzLm1rZGlyKGRzdERpcik7XHJcbiAgICBhd2FpdCBmcy53cml0ZUZpbGUoZHN0TWFuaWZlc3QsIGF3YWl0IGZzLnJlYWRGaWxlKHNyY01hbmlmZXN0LCBcInV0ZjhcIiksIFwidXRmOFwiKTtcclxuICAgIGF3YWl0IGFkYi5jb21waWxlTWFuaWZlc3QoZHN0TWFuaWZlc3QsIG5ld1BhY2thZ2UsIGFwcFBhY2thZ2UpO1xyXG4gICAgKGF3YWl0IHV0aWwuZmlsZUV4aXN0cyhkc3RNYW5pZmVzdCkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgYXdhaXQgYWRiLmluc2VydE1hbmlmZXN0KGRzdE1hbmlmZXN0LCBzZXJ2ZXJQYXRoLCBuZXdTZXJ2ZXJQYXRoKTtcclxuICAgIChhd2FpdCB1dGlsLmZpbGVFeGlzdHMobmV3U2VydmVyUGF0aCkpLnNob3VsZC5iZS50cnVlO1xyXG4gICAgLy8gZGVsZXRpbmcgdGVtcCBkaXJlY3RvcnlcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGZzLnJpbXJhZih0bXBEaXIpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhgVW5hYmxlIHRvIGRlbGV0ZSB0ZW1wIGRpcmVjdG9yeS4gSXQgbWlnaHQgbm90IGJlIHByZXNlbnQuICR7ZS5tZXNzYWdlfWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5kZXNjcmliZS5za2lwKCdBbmRyb2lkLW1hbmlmZXN0IFRvIGJlIGltcGxlbWVudGVkIG1ldGhvZHMnLCAoKSA9PiB7XHJcbiAgaXQoJ3Nob3VsZCByZXR1cm4gY29ycmVjdCBwcm9jZXNzRnJvbU1hbmlmZXN0JywgYXN5bmMgKCkgPT4geyB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
