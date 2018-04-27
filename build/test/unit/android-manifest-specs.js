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

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);

describe('android-manifest', function () {
  var adb = new _2['default']();
  describe('processFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process }, function (mocks) {
    it('should correctly parse process from manifest', function callee$2$0() {
      var localApk, dummyProcess;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.binaries.aapt = 'dummy_aapt';
            localApk = 'dummyAPK', dummyProcess = 'dummyProcess';

            mocks.adb.expects("initAapt").once().withExactArgs().returns('');
            mocks.teen_process.expects("exec").once().withExactArgs('dummy_aapt', ['dump', 'xmltree', localApk, 'AndroidManifest.xml']).returns({ stdout: ' E: application (line=234)\n                          A: android:process(0x01010011)="' + dummyProcess + '"' });
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.processFromManifest(localApk));

          case 6:
            context$3$0.t0 = dummyProcess;
            context$3$0.sent.should.equal(context$3$0.t0);

            mocks.adb.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('packageAndLaunchActivityFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process }, function (mocks) {
    it('should correctly parse package and activity from manifest', function callee$2$0() {
      var localApk, dummyPackageName, dummyActivityName, _ref, apkPackage, apkActivity;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.binaries.aapt = 'dummy_aapt';
            localApk = 'dummyAPK', dummyPackageName = 'package', dummyActivityName = 'activity';

            mocks.adb.expects("initAapt").once().withExactArgs().returns('');
            mocks.teen_process.expects("exec").once().withExactArgs('dummy_aapt', ['dump', 'badging', localApk]).returns({ stdout: ' package: name=\'' + dummyPackageName + '\'\n                            launchable-activity: name=\'' + dummyActivityName + '\'' });
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.packageAndLaunchActivityFromManifest(localApk));

          case 6:
            _ref = context$3$0.sent;
            apkPackage = _ref.apkPackage;
            apkActivity = _ref.apkActivity;

            apkPackage.should.equal(dummyPackageName);
            apkActivity.should.equal(dummyActivityName);
            mocks.adb.verify();

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('hasInternetPermissionFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb, teen_process: teen_process }, function (mocks) {
    it('should correctly parse internet permission from manifest', function callee$2$0() {
      var localApk;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.binaries.aapt = 'dummy_aapt';
            localApk = 'dummyAPK';

            mocks.adb.expects("initAapt").once().withExactArgs().returns('');
            mocks.teen_process.expects("exec").once().withExactArgs('dummy_aapt', ['dump', 'badging', localApk]).returns({ stdout: ' uses-permission:.*\'android.permission.INTERNET\'' });
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.hasInternetPermissionFromManifest(localApk));

          case 6:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('compileManifest', function () {
    it('should throw an error if no ANDROID_HOME set', function callee$2$0() {
      var oldAndroidHome;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            oldAndroidHome = process.env.ANDROID_HOME;

            delete process.env.ANDROID_HOME;

            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.compileManifest().should.eventually.be.rejectedWith(/ANDROID_HOME environment variable was not exported/));

          case 4:

            process.env.ANDROID_HOME = oldAndroidHome;

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hbmRyb2lkLW1hbmlmZXN0LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUM3QixPQUFPOzs7OzRCQUNPLGNBQWM7O0lBQWhDLFlBQVk7O2lDQUNFLHFCQUFxQjs7QUFHL0Msa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDakMsTUFBSSxHQUFHLEdBQUcsbUJBQVMsQ0FBQztBQUNwQixVQUFRLENBQUMscUJBQXFCLEVBQUUsa0NBQVUsRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLFlBQVksRUFBWixZQUFZLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUN4RSxNQUFFLENBQUMsOENBQThDLEVBQUU7VUFFM0MsUUFBUSxFQUNSLFlBQVk7Ozs7QUFGbEIsZUFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0FBQzNCLG9CQUFRLEdBQUcsVUFBVSxFQUNyQixZQUFZLEdBQUcsY0FBYzs7QUFDbkMsaUJBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUMxQixJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FDaEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JCLGlCQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDL0IsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUMxQyxxQkFBcUIsQ0FBQyxDQUFDLENBQzVDLE9BQU8sQ0FBQyxFQUFDLE1BQU0sNkZBQ29DLFlBQVksTUFBRyxFQUFDLENBQUMsQ0FBQzs7NkNBQ2pFLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUM7Ozs2QkFBZSxZQUFZOzZCQUF6QixNQUFNLENBQUMsS0FBSzs7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QUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsb0RBQW9ELENBQUM7Ozs7QUFFbkgsbUJBQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQzs7Ozs7OztLQUMzQyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC91bml0L2FuZHJvaWQtbWFuaWZlc3Qtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcclxuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xyXG5pbXBvcnQgQURCIGZyb20gJy4uLy4uJztcclxuaW1wb3J0ICogYXMgdGVlbl9wcm9jZXNzIGZyb20gJ3RlZW5fcHJvY2Vzcyc7XHJcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xyXG5cclxuXHJcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcclxuXHJcbmRlc2NyaWJlKCdhbmRyb2lkLW1hbmlmZXN0JywgKCkgPT4ge1xyXG4gIGxldCBhZGIgPSBuZXcgQURCKCk7XHJcbiAgZGVzY3JpYmUoJ3Byb2Nlc3NGcm9tTWFuaWZlc3QnLCB3aXRoTW9ja3Moe2FkYiwgdGVlbl9wcm9jZXNzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBwYXJzZSBwcm9jZXNzIGZyb20gbWFuaWZlc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGFkYi5iaW5hcmllcy5hYXB0ID0gJ2R1bW15X2FhcHQnO1xyXG4gICAgICBjb25zdCBsb2NhbEFwayA9ICdkdW1teUFQSycsXHJcbiAgICAgICAgICAgIGR1bW15UHJvY2VzcyA9ICdkdW1teVByb2Nlc3MnO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImluaXRBYXB0XCIpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZHVtbXlfYWFwdCcsIFsnZHVtcCcsICd4bWx0cmVlJywgbG9jYWxBcGssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBbmRyb2lkTWFuaWZlc3QueG1sJ10pXHJcbiAgICAgICAgLnJldHVybnMoe3N0ZG91dDogYCBFOiBhcHBsaWNhdGlvbiAobGluZT0yMzQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgQTogYW5kcm9pZDpwcm9jZXNzKDB4MDEwMTAwMTEpPVwiJHtkdW1teVByb2Nlc3N9XCJgfSk7XHJcbiAgICAgIChhd2FpdCBhZGIucHJvY2Vzc0Zyb21NYW5pZmVzdChsb2NhbEFwaykpLnNob3VsZC5lcXVhbChkdW1teVByb2Nlc3MpO1xyXG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcbiAgZGVzY3JpYmUoJ3BhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCcsIHdpdGhNb2Nrcyh7YWRiLCB0ZWVuX3Byb2Nlc3N9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHBhcnNlIHBhY2thZ2UgYW5kIGFjdGl2aXR5IGZyb20gbWFuaWZlc3QnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGFkYi5iaW5hcmllcy5hYXB0ID0gJ2R1bW15X2FhcHQnO1xyXG4gICAgICBjb25zdCBsb2NhbEFwayA9ICdkdW1teUFQSycsXHJcbiAgICAgICAgICAgIGR1bW15UGFja2FnZU5hbWUgPSAncGFja2FnZScsXHJcbiAgICAgICAgICAgIGR1bW15QWN0aXZpdHlOYW1lID0gJ2FjdGl2aXR5JztcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoXCJpbml0QWFwdFwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygpXHJcbiAgICAgICAgICAgICAgLnJldHVybnMoJycpO1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoJ2R1bW15X2FhcHQnLCBbJ2R1bXAnLCAnYmFkZ2luZycsIGxvY2FsQXBrXSlcclxuICAgICAgICAucmV0dXJucyh7c3Rkb3V0OiBgIHBhY2thZ2U6IG5hbWU9JyR7ZHVtbXlQYWNrYWdlTmFtZX0nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXVuY2hhYmxlLWFjdGl2aXR5OiBuYW1lPScke2R1bW15QWN0aXZpdHlOYW1lfSdgfSk7XHJcbiAgICAgIGxldCB7YXBrUGFja2FnZSwgYXBrQWN0aXZpdHl9ID0gKGF3YWl0IGFkYi5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QobG9jYWxBcGspKTtcclxuICAgICAgYXBrUGFja2FnZS5zaG91bGQuZXF1YWwoZHVtbXlQYWNrYWdlTmFtZSk7XHJcbiAgICAgIGFwa0FjdGl2aXR5LnNob3VsZC5lcXVhbChkdW1teUFjdGl2aXR5TmFtZSk7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnaGFzSW50ZXJuZXRQZXJtaXNzaW9uRnJvbU1hbmlmZXN0Jywgd2l0aE1vY2tzKHthZGIsIHRlZW5fcHJvY2Vzc30sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgcGFyc2UgaW50ZXJuZXQgcGVybWlzc2lvbiBmcm9tIG1hbmlmZXN0JywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBhZGIuYmluYXJpZXMuYWFwdCA9ICdkdW1teV9hYXB0JztcclxuICAgICAgY29uc3QgbG9jYWxBcGsgPSAnZHVtbXlBUEsnO1xyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cyhcImluaXRBYXB0XCIpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAgICAgICAucmV0dXJucygnJyk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncygnZHVtbXlfYWFwdCcsIFsnZHVtcCcsICdiYWRnaW5nJywgbG9jYWxBcGtdKVxyXG4gICAgICAgIC5yZXR1cm5zKHtzdGRvdXQ6IGAgdXNlcy1wZXJtaXNzaW9uOi4qJ2FuZHJvaWQucGVybWlzc2lvbi5JTlRFUk5FVCdgfSk7XHJcbiAgICAgIChhd2FpdCBhZGIuaGFzSW50ZXJuZXRQZXJtaXNzaW9uRnJvbU1hbmlmZXN0KGxvY2FsQXBrKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuICBkZXNjcmliZSgnY29tcGlsZU1hbmlmZXN0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBubyBBTkRST0lEX0hPTUUgc2V0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgb2xkQW5kcm9pZEhvbWUgPSBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUU7XHJcbiAgICAgIGRlbGV0ZSBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUU7XHJcblxyXG4gICAgICBhd2FpdCBhZGIuY29tcGlsZU1hbmlmZXN0KCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9BTkRST0lEX0hPTUUgZW52aXJvbm1lbnQgdmFyaWFibGUgd2FzIG5vdCBleHBvcnRlZC8pO1xyXG5cclxuICAgICAgcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FID0gb2xkQW5kcm9pZEhvbWU7XHJcbiAgICB9KTtcclxuICB9KTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiLi5cXC4uXFwuLiJ9
