'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _libHelpers = require('../../lib/helpers');

var _appiumTestSupport = require('appium-test-support');

var _appiumSupport = require('appium-support');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

describe('helpers', function () {
  describe('getDirectories', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs }, function (mocks) {
    it('should sort the directories', function callee$2$0() {
      var rootPath, directories;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            rootPath = '/path/to/root';
            directories = ['c', 'b', 'a', '1', '2'];

            mocks.fs.expects('readdir').once().withExactArgs(rootPath).returns(directories);
            mocks.fs.expects('lstat').exactly(5).returns(_bluebird2['default'].resolve({ isDirectory: function isDirectory() {
                return true;
              } }));
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap((0, _libHelpers.getDirectories)(rootPath));

          case 6:
            context$3$0.t0 = ['1', '2', 'a', 'b', 'c'];
            context$3$0.sent.should.eql(context$3$0.t0);

            mocks.fs.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('getAndroidPlatformAndPath', (0, _appiumTestSupport.withMocks)({ fs: _appiumSupport.fs }, function (mocks) {
    var oldAndroidHome = undefined;
    var oldResolve = undefined;
    before(function () {
      oldAndroidHome = process.env.ANDROID_HOME;
    });
    after(function () {
      process.env.ANDROID_HOME = oldAndroidHome;
    });
    afterEach(function () {
      if (oldResolve) {
        _path2['default'].resolve = oldResolve;
      }
    });

    it('should return null if no ANDROID_HOME is set', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            delete process.env.ANDROID_HOME;

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _libHelpers.getAndroidPlatformAndPath)().should.eventually.be.rejectedWith(/ANDROID_HOME environment variable was not exported/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
    it('should get the latest available API', function callee$2$0() {
      var count, platformAndPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            process.env.ANDROID_HOME = '/path/to/android/home';

            mocks.fs.expects('exists').exactly(2).onCall(0).returns(false).onCall(1).returns(true);
            // manually mock `path`, to allow system to work
            oldResolve = _path2['default'].resolve;
            count = 0;

            _path2['default'].resolve = function () {
              // ensure that underlying system calls still work
              if (arguments[1] !== 'platforms' && arguments[1].indexOf('android') !== 0) {
                return oldResolve.apply(undefined, arguments);
              }

              switch (count++) {
                case 0:
                  return '/path/to';
                case 1:
                  return '/path/to/apis1';
                case 2:
                  return '/path/to/apis2';
                case 3:
                  return '/error/getting/here';
              }
            };
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap((0, _libHelpers.getAndroidPlatformAndPath)());

          case 7:
            platformAndPath = context$3$0.sent;

            platformAndPath.platform.should.equal('android-24');
            platformAndPath.platformPath.should.equal('/path/to/apis2');
            mocks.fs.verify();
            count.should.eql(3);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));

  describe('isShowingLockscreen', function () {
    it('should return true if mShowingLockscreen is true', function callee$2$0() {
      var dumpsys;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            dumpsys = 'mShowingLockscreen=true mShowingDream=false mDreamingLockscreen=false mTopIsFullscreen=false';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _libHelpers.isShowingLockscreen)(dumpsys));

          case 3:
            context$3$0.sent.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return true if mDreamingLockscreen is true', function callee$2$0() {
      var dumpsys;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            dumpsys = 'mShowingLockscreen=false mShowingDream=false mDreamingLockscreen=true mTopIsFullscreen=false';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _libHelpers.isShowingLockscreen)(dumpsys));

          case 3:
            context$3$0.sent.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return false if mShowingLockscreen and mDreamingLockscreen are false', function callee$2$0() {
      var dumpsys;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            dumpsys = 'mShowingLockscreen=false mShowingDream=false mDreamingLockscreen=false mTopIsFullscreen=false';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _libHelpers.isShowingLockscreen)(dumpsys));

          case 3:
            context$3$0.sent.should.be['false'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should assume that screen is unlocked if can not determine lock state', function callee$2$0() {
      var dumpsys;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            dumpsys = 'mShowingDream=false mTopIsFullscreen=false';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap((0, _libHelpers.isShowingLockscreen)(dumpsys));

          case 3:
            context$3$0.sent.should.be['false'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('buildStartCmd', function () {
    var startOptions = {
      pkg: 'com.something',
      activity: '.SomeActivity'
    };

    it('should parse optionalIntentArguments with single key', function () {
      var cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({ optionalIntentArguments: '-d key' }, startOptions), 20);
      cmd[cmd.length - 2].should.eql('-d');
      cmd[cmd.length - 1].should.eql('key');
    });
    it('should parse optionalIntentArguments with single key/value pair', function () {
      var cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({ optionalIntentArguments: '-d key value' }, startOptions), 20);
      cmd[cmd.length - 3].should.eql('-d');
      cmd[cmd.length - 2].should.eql('key');
      cmd[cmd.length - 1].should.eql('value');
    });
    it('should parse optionalIntentArguments with single key/value pair with spaces', function () {
      var cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({ optionalIntentArguments: '-d key value value2' }, startOptions), 20);
      cmd[cmd.length - 3].should.eql('-d');
      cmd[cmd.length - 2].should.eql('key');
      cmd[cmd.length - 1].should.eql('value value2');
    });
    it('should parse optionalIntentArguments with multiple keys', function () {
      var cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({ optionalIntentArguments: '-d key1 -e key2' }, startOptions), 20);
      cmd[cmd.length - 4].should.eql('-d');
      cmd[cmd.length - 3].should.eql('key1');
      cmd[cmd.length - 2].should.eql('-e');
      cmd[cmd.length - 1].should.eql('key2');
    });
    it('should parse optionalIntentArguments with multiple key/value pairs', function () {
      var cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({ optionalIntentArguments: '-d key1 value1 -e key2 value2' }, startOptions), 20);
      cmd[cmd.length - 6].should.eql('-d');
      cmd[cmd.length - 5].should.eql('key1');
      cmd[cmd.length - 4].should.eql('value1');
      cmd[cmd.length - 3].should.eql('-e');
      cmd[cmd.length - 2].should.eql('key2');
      cmd[cmd.length - 1].should.eql('value2');
    });
    it('should parse optionalIntentArguments with hyphens', function () {
      var arg = 'http://some-url-with-hyphens.com/';
      var cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({ optionalIntentArguments: '-d ' + arg }, startOptions), 20);
      cmd[cmd.length - 2].should.eql('-d');
      cmd[cmd.length - 1].should.eql(arg);
    });
    it('should parse optionalIntentArguments with multiple arguments with hyphens', function () {
      var arg1 = 'http://some-url-with-hyphens.com/';
      var arg2 = 'http://some-other-url-with-hyphens.com/';
      var cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({
        optionalIntentArguments: '-d ' + arg1 + ' -e key ' + arg2
      }, startOptions), 20);
      cmd[cmd.length - 5].should.eql('-d');
      cmd[cmd.length - 4].should.eql(arg1);
      cmd[cmd.length - 3].should.eql('-e');
      cmd[cmd.length - 2].should.eql('key');
      cmd[cmd.length - 1].should.eql(arg2);
    });
    it('should have -S option when stopApp is set', function callee$2$0() {
      var cmd;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({ stopApp: true }, startOptions), 20);

            cmd[cmd.length - 1].should.eql('-S');

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not have -S option when stopApp is not set', function callee$2$0() {
      var cmd;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            cmd = (0, _libHelpers.buildStartCmd)(_lodash2['default'].defaults({ stopApp: false }, startOptions), 20);

            cmd[cmd.length - 1].should.not.eql('-S');

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9oZWxwZXItc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7MEJBQ21ELG1CQUFtQjs7aUNBQzVDLHFCQUFxQjs7NkJBQzVCLGdCQUFnQjs7b0JBQ2xCLE1BQU07Ozs7c0JBQ1QsUUFBUTs7Ozt3QkFDUixVQUFVOzs7O0FBR3hCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBTTtBQUN4QixVQUFRLENBQUMsZ0JBQWdCLEVBQUUsa0NBQVUsRUFBQyxFQUFFLG1CQUFBLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNwRCxNQUFFLENBQUMsNkJBQTZCLEVBQUU7VUFDNUIsUUFBUSxFQUNSLFdBQVc7Ozs7QUFEWCxvQkFBUSxHQUFHLGVBQWU7QUFDMUIsdUJBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7O0FBQzNDLGlCQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FDeEIsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUM5QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEIsaUJBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ1YsT0FBTyxDQUFDLHNCQUFFLE9BQU8sQ0FBQyxFQUFDLFdBQVcsRUFBRSx1QkFBTTtBQUFDLHVCQUFPLElBQUksQ0FBQztlQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7OzZDQUNwRCxnQ0FBZSxRQUFRLENBQUM7Ozs2QkFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7NkJBQXBDLE1BQU0sQ0FBQyxHQUFHOztBQUMzQyxpQkFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUNuQixDQUFDLENBQUM7R0FDSixDQUFDLENB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QUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsU0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxTQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BDLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywyQ0FBMkMsRUFBRTtVQUMxQyxHQUFHOzs7O0FBQUgsZUFBRyxHQUFHLCtCQUFjLG9CQUFFLFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsRUFBRSxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUM7O0FBQ3RFLGVBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7S0FDcEMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG1EQUFtRCxFQUFFO1VBQ2xELEdBQUc7Ozs7QUFBSCxlQUFHLEdBQUcsK0JBQWMsb0JBQUUsUUFBUSxDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQzs7QUFDdkUsZUFBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7S0FDeEMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9oZWxwZXItc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXREaXJlY3RvcmllcywgZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCxcclxuICAgICAgICAgYnVpbGRTdGFydENtZCwgaXNTaG93aW5nTG9ja3NjcmVlbiB9IGZyb20gJy4uLy4uL2xpYi9oZWxwZXJzJztcclxuaW1wb3J0IHsgd2l0aE1vY2tzIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XHJcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xyXG5cclxuXHJcbmRlc2NyaWJlKCdoZWxwZXJzJywgKCkgPT4ge1xyXG4gIGRlc2NyaWJlKCdnZXREaXJlY3RvcmllcycsIHdpdGhNb2Nrcyh7ZnN9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgc29ydCB0aGUgZGlyZWN0b3JpZXMnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCByb290UGF0aCA9ICcvcGF0aC90by9yb290JztcclxuICAgICAgbGV0IGRpcmVjdG9yaWVzID0gWydjJywgJ2InLCAnYScsICcxJywgJzInXTtcclxuICAgICAgbW9ja3MuZnMuZXhwZWN0cygncmVhZGRpcicpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKHJvb3RQYXRoKVxyXG4gICAgICAgIC5yZXR1cm5zKGRpcmVjdG9yaWVzKTtcclxuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnbHN0YXQnKVxyXG4gICAgICAgIC5leGFjdGx5KDUpXHJcbiAgICAgICAgLnJldHVybnMoQi5yZXNvbHZlKHtpc0RpcmVjdG9yeTogKCkgPT4ge3JldHVybiB0cnVlO319KSk7XHJcbiAgICAgIChhd2FpdCBnZXREaXJlY3Rvcmllcyhyb290UGF0aCkpLnNob3VsZC5lcWwoWycxJywgJzInLCAnYScsICdiJywgJ2MnXSk7XHJcbiAgICAgIG1vY2tzLmZzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG5cclxuICBkZXNjcmliZSgnZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCcsIHdpdGhNb2Nrcyh7ZnN9LCAobW9ja3MpID0+IHtcclxuICAgIGxldCBvbGRBbmRyb2lkSG9tZTtcclxuICAgIGxldCBvbGRSZXNvbHZlO1xyXG4gICAgYmVmb3JlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgb2xkQW5kcm9pZEhvbWUgPSBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUU7XHJcbiAgICB9KTtcclxuICAgIGFmdGVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FID0gb2xkQW5kcm9pZEhvbWU7XHJcbiAgICB9KTtcclxuICAgIGFmdGVyRWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChvbGRSZXNvbHZlKSB7XHJcbiAgICAgICAgcGF0aC5yZXNvbHZlID0gb2xkUmVzb2x2ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbnVsbCBpZiBubyBBTkRST0lEX0hPTUUgaXMgc2V0JywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBkZWxldGUgcHJvY2Vzcy5lbnYuQU5EUk9JRF9IT01FO1xyXG5cclxuICAgICAgYXdhaXQgZ2V0QW5kcm9pZFBsYXRmb3JtQW5kUGF0aCgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvQU5EUk9JRF9IT01FIGVudmlyb25tZW50IHZhcmlhYmxlIHdhcyBub3QgZXhwb3J0ZWQvKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGxhdGVzdCBhdmFpbGFibGUgQVBJJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBwcm9jZXNzLmVudi5BTkRST0lEX0hPTUUgPSAnL3BhdGgvdG8vYW5kcm9pZC9ob21lJztcclxuXHJcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ2V4aXN0cycpXHJcbiAgICAgICAgLmV4YWN0bHkoMilcclxuICAgICAgICAub25DYWxsKDApLnJldHVybnMoZmFsc2UpXHJcbiAgICAgICAgLm9uQ2FsbCgxKS5yZXR1cm5zKHRydWUpO1xyXG4gICAgICAvLyBtYW51YWxseSBtb2NrIGBwYXRoYCwgdG8gYWxsb3cgc3lzdGVtIHRvIHdvcmtcclxuICAgICAgb2xkUmVzb2x2ZSA9IHBhdGgucmVzb2x2ZTtcclxuICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgcGF0aC5yZXNvbHZlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB1bmRlcmx5aW5nIHN5c3RlbSBjYWxscyBzdGlsbCB3b3JrXHJcbiAgICAgICAgaWYgKGFyZ3NbMV0gIT09ICdwbGF0Zm9ybXMnICYmIGFyZ3NbMV0uaW5kZXhPZignYW5kcm9pZCcpICE9PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gb2xkUmVzb2x2ZSguLi5hcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAoY291bnQrKykge1xyXG4gICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICByZXR1cm4gJy9wYXRoL3RvJztcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgcmV0dXJuICcvcGF0aC90by9hcGlzMSc7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHJldHVybiAnL3BhdGgvdG8vYXBpczInO1xyXG4gICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICByZXR1cm4gJy9lcnJvci9nZXR0aW5nL2hlcmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgbGV0IHBsYXRmb3JtQW5kUGF0aCA9IGF3YWl0IGdldEFuZHJvaWRQbGF0Zm9ybUFuZFBhdGgoKTtcclxuICAgICAgcGxhdGZvcm1BbmRQYXRoLnBsYXRmb3JtLnNob3VsZC5lcXVhbCgnYW5kcm9pZC0yNCcpO1xyXG4gICAgICBwbGF0Zm9ybUFuZFBhdGgucGxhdGZvcm1QYXRoLnNob3VsZC5lcXVhbCgnL3BhdGgvdG8vYXBpczInKTtcclxuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XHJcbiAgICAgIGNvdW50LnNob3VsZC5lcWwoMyk7XHJcbiAgICB9KTtcclxuICB9KSk7XHJcblxyXG4gIGRlc2NyaWJlKCdpc1Nob3dpbmdMb2Nrc2NyZWVuJywgKCkgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBtU2hvd2luZ0xvY2tzY3JlZW4gaXMgdHJ1ZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGR1bXBzeXMgPSAnbVNob3dpbmdMb2Nrc2NyZWVuPXRydWUgbVNob3dpbmdEcmVhbT1mYWxzZSBtRHJlYW1pbmdMb2Nrc2NyZWVuPWZhbHNlIG1Ub3BJc0Z1bGxzY3JlZW49ZmFsc2UnO1xyXG4gICAgICAoYXdhaXQgaXNTaG93aW5nTG9ja3NjcmVlbihkdW1wc3lzKSkuc2hvdWxkLmJlLnRydWU7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgbURyZWFtaW5nTG9ja3NjcmVlbiBpcyB0cnVlJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBsZXQgZHVtcHN5cyA9ICdtU2hvd2luZ0xvY2tzY3JlZW49ZmFsc2UgbVNob3dpbmdEcmVhbT1mYWxzZSBtRHJlYW1pbmdMb2Nrc2NyZWVuPXRydWUgbVRvcElzRnVsbHNjcmVlbj1mYWxzZSc7XHJcbiAgICAgIChhd2FpdCBpc1Nob3dpbmdMb2Nrc2NyZWVuKGR1bXBzeXMpKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgbVNob3dpbmdMb2Nrc2NyZWVuIGFuZCBtRHJlYW1pbmdMb2Nrc2NyZWVuIGFyZSBmYWxzZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGR1bXBzeXMgPSAnbVNob3dpbmdMb2Nrc2NyZWVuPWZhbHNlIG1TaG93aW5nRHJlYW09ZmFsc2UgbURyZWFtaW5nTG9ja3NjcmVlbj1mYWxzZSBtVG9wSXNGdWxsc2NyZWVuPWZhbHNlJztcclxuICAgICAgKGF3YWl0IGlzU2hvd2luZ0xvY2tzY3JlZW4oZHVtcHN5cykpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBhc3N1bWUgdGhhdCBzY3JlZW4gaXMgdW5sb2NrZWQgaWYgY2FuIG5vdCBkZXRlcm1pbmUgbG9jayBzdGF0ZScsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGR1bXBzeXMgPSAnbVNob3dpbmdEcmVhbT1mYWxzZSBtVG9wSXNGdWxsc2NyZWVuPWZhbHNlJztcclxuICAgICAgKGF3YWl0IGlzU2hvd2luZ0xvY2tzY3JlZW4oZHVtcHN5cykpLnNob3VsZC5iZS5mYWxzZTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBkZXNjcmliZSgnYnVpbGRTdGFydENtZCcsICgpID0+IHtcclxuICAgIGxldCBzdGFydE9wdGlvbnMgPSB7XHJcbiAgICAgIHBrZzogJ2NvbS5zb21ldGhpbmcnLFxyXG4gICAgICBhY3Rpdml0eTogJy5Tb21lQWN0aXZpdHknXHJcbiAgICB9O1xyXG5cclxuICAgIGl0KCdzaG91bGQgcGFyc2Ugb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMgd2l0aCBzaW5nbGUga2V5JywgKCkgPT4ge1xyXG4gICAgICBsZXQgY21kID0gYnVpbGRTdGFydENtZChfLmRlZmF1bHRzKHtvcHRpb25hbEludGVudEFyZ3VtZW50czogJy1kIGtleSd9LCBzdGFydE9wdGlvbnMpLCAyMCk7XHJcbiAgICAgIGNtZFtjbWQubGVuZ3RoLTJdLnNob3VsZC5lcWwoJy1kJyk7XHJcbiAgICAgIGNtZFtjbWQubGVuZ3RoLTFdLnNob3VsZC5lcWwoJ2tleScpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHBhcnNlIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzIHdpdGggc2luZ2xlIGtleS92YWx1ZSBwYWlyJywgKCkgPT4ge1xyXG4gICAgICBsZXQgY21kID0gYnVpbGRTdGFydENtZChfLmRlZmF1bHRzKHtvcHRpb25hbEludGVudEFyZ3VtZW50czogJy1kIGtleSB2YWx1ZSd9LCBzdGFydE9wdGlvbnMpLCAyMCk7XHJcbiAgICAgIGNtZFtjbWQubGVuZ3RoLTNdLnNob3VsZC5lcWwoJy1kJyk7XHJcbiAgICAgIGNtZFtjbWQubGVuZ3RoLTJdLnNob3VsZC5lcWwoJ2tleScpO1xyXG4gICAgICBjbWRbY21kLmxlbmd0aC0xXS5zaG91bGQuZXFsKCd2YWx1ZScpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHBhcnNlIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzIHdpdGggc2luZ2xlIGtleS92YWx1ZSBwYWlyIHdpdGggc3BhY2VzJywgKCkgPT4ge1xyXG4gICAgICBsZXQgY21kID0gYnVpbGRTdGFydENtZChfLmRlZmF1bHRzKHtvcHRpb25hbEludGVudEFyZ3VtZW50czogJy1kIGtleSB2YWx1ZSB2YWx1ZTInfSwgc3RhcnRPcHRpb25zKSwgMjApO1xyXG4gICAgICBjbWRbY21kLmxlbmd0aC0zXS5zaG91bGQuZXFsKCctZCcpO1xyXG4gICAgICBjbWRbY21kLmxlbmd0aC0yXS5zaG91bGQuZXFsKCdrZXknKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtMV0uc2hvdWxkLmVxbCgndmFsdWUgdmFsdWUyJyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcGFyc2Ugb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMgd2l0aCBtdWx0aXBsZSBrZXlzJywgKCkgPT4ge1xyXG4gICAgICBsZXQgY21kID0gYnVpbGRTdGFydENtZChfLmRlZmF1bHRzKHtvcHRpb25hbEludGVudEFyZ3VtZW50czogJy1kIGtleTEgLWUga2V5Mid9LCBzdGFydE9wdGlvbnMpLCAyMCk7XHJcbiAgICAgIGNtZFtjbWQubGVuZ3RoLTRdLnNob3VsZC5lcWwoJy1kJyk7XHJcbiAgICAgIGNtZFtjbWQubGVuZ3RoLTNdLnNob3VsZC5lcWwoJ2tleTEnKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtMl0uc2hvdWxkLmVxbCgnLWUnKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtMV0uc2hvdWxkLmVxbCgna2V5MicpO1xyXG4gICAgfSk7XHJcbiAgICBpdCgnc2hvdWxkIHBhcnNlIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzIHdpdGggbXVsdGlwbGUga2V5L3ZhbHVlIHBhaXJzJywgKCkgPT4ge1xyXG4gICAgICBsZXQgY21kID0gYnVpbGRTdGFydENtZChfLmRlZmF1bHRzKHtvcHRpb25hbEludGVudEFyZ3VtZW50czogJy1kIGtleTEgdmFsdWUxIC1lIGtleTIgdmFsdWUyJ30sIHN0YXJ0T3B0aW9ucyksIDIwKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtNl0uc2hvdWxkLmVxbCgnLWQnKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtNV0uc2hvdWxkLmVxbCgna2V5MScpO1xyXG4gICAgICBjbWRbY21kLmxlbmd0aC00XS5zaG91bGQuZXFsKCd2YWx1ZTEnKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtM10uc2hvdWxkLmVxbCgnLWUnKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtMl0uc2hvdWxkLmVxbCgna2V5MicpO1xyXG4gICAgICBjbWRbY21kLmxlbmd0aC0xXS5zaG91bGQuZXFsKCd2YWx1ZTInKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBvcHRpb25hbEludGVudEFyZ3VtZW50cyB3aXRoIGh5cGhlbnMnLCAoKSA9PiB7XHJcbiAgICAgIGxldCBhcmcgPSAnaHR0cDovL3NvbWUtdXJsLXdpdGgtaHlwaGVucy5jb20vJztcclxuICAgICAgbGV0IGNtZCA9IGJ1aWxkU3RhcnRDbWQoXy5kZWZhdWx0cyh7b3B0aW9uYWxJbnRlbnRBcmd1bWVudHM6IGAtZCAke2FyZ31gfSwgc3RhcnRPcHRpb25zKSwgMjApO1xyXG4gICAgICBjbWRbY21kLmxlbmd0aC0yXS5zaG91bGQuZXFsKCctZCcpO1xyXG4gICAgICBjbWRbY21kLmxlbmd0aC0xXS5zaG91bGQuZXFsKGFyZyk7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgcGFyc2Ugb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMgd2l0aCBtdWx0aXBsZSBhcmd1bWVudHMgd2l0aCBoeXBoZW5zJywgKCkgPT4ge1xyXG4gICAgICBsZXQgYXJnMSA9ICdodHRwOi8vc29tZS11cmwtd2l0aC1oeXBoZW5zLmNvbS8nO1xyXG4gICAgICBsZXQgYXJnMiA9ICdodHRwOi8vc29tZS1vdGhlci11cmwtd2l0aC1oeXBoZW5zLmNvbS8nO1xyXG4gICAgICBsZXQgY21kID0gYnVpbGRTdGFydENtZChfLmRlZmF1bHRzKHtcclxuICAgICAgICBvcHRpb25hbEludGVudEFyZ3VtZW50czogYC1kICR7YXJnMX0gLWUga2V5ICR7YXJnMn1gXHJcbiAgICAgIH0sIHN0YXJ0T3B0aW9ucyksIDIwKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtNV0uc2hvdWxkLmVxbCgnLWQnKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtNF0uc2hvdWxkLmVxbChhcmcxKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtM10uc2hvdWxkLmVxbCgnLWUnKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtMl0uc2hvdWxkLmVxbCgna2V5Jyk7XHJcbiAgICAgIGNtZFtjbWQubGVuZ3RoLTFdLnNob3VsZC5lcWwoYXJnMik7XHJcbiAgICB9KTtcclxuICAgIGl0KCdzaG91bGQgaGF2ZSAtUyBvcHRpb24gd2hlbiBzdG9wQXBwIGlzIHNldCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IGNtZCA9IGJ1aWxkU3RhcnRDbWQoXy5kZWZhdWx0cyh7c3RvcEFwcDogdHJ1ZX0sIHN0YXJ0T3B0aW9ucyksIDIwKTtcclxuICAgICAgY21kW2NtZC5sZW5ndGgtMV0uc2hvdWxkLmVxbCgnLVMnKTtcclxuICAgIH0pO1xyXG4gICAgaXQoJ3Nob3VsZCBub3QgaGF2ZSAtUyBvcHRpb24gd2hlbiBzdG9wQXBwIGlzIG5vdCBzZXQnLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGxldCBjbWQgPSBidWlsZFN0YXJ0Q21kKF8uZGVmYXVsdHMoe3N0b3BBcHA6IGZhbHNlfSwgc3RhcnRPcHRpb25zKSwgMjApO1xyXG4gICAgICBjbWRbY21kLmxlbmd0aC0xXS5zaG91bGQubm90LmVxbCgnLVMnKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
