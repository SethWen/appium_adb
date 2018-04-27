'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _libHelpersJs = require('../../lib/helpers.js');

var helpers = _interopRequireWildcard(_libHelpersJs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumSupport = require('appium-support');

var appiumSupport = _interopRequireWildcard(_appiumSupport);

var _appiumTestSupport = require('appium-test-support');

_chai2['default'].use(_chaiAsPromised2['default']);

var selendroidTestApp = _path2['default'].resolve(helpers.rootDir, 'test', 'fixtures', 'selendroid-test-app.apk'),
    helperJarPath = _path2['default'].resolve(helpers.rootDir, 'jars'),
    keystorePath = _path2['default'].resolve(helpers.rootDir, 'test', 'fixtures', 'appiumtest.keystore'),
    defaultKeyPath = _path2['default'].resolve(helpers.rootDir, 'keys', 'testkey.pk8'),
    defaultCertPath = _path2['default'].resolve(helpers.rootDir, 'keys', 'testkey.x509.pem'),
    keyAlias = 'appiumtest',
    password = 'android',
    selendroidTestAppPackage = 'io.selendroid.testapp',
    javaDummyPath = 'java_dummy_path',
    javaHome = 'java_home',
    apksignerDummyPath = '/path/to/apksigner',
    tempDir = appiumSupport.tempDir,
    fs = appiumSupport.fs;

describe('signing', function () {
  var adb = new _2['default']();
  adb.keystorePath = keystorePath;
  adb.keyAlias = keyAlias;
  adb.keystorePassword = password;
  adb.keyPassword = password;

  describe('signWithDefaultCert', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process, helpers: helpers }, function (mocks) {
    it('should call exec with correct args', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.helpers.expects("getApksignerForOs").returns(apksignerDummyPath);
            mocks.teen_process.expects("exec").once().withExactArgs(apksignerDummyPath, ['sign', '--key', defaultKeyPath, '--cert', defaultCertPath, selendroidTestApp], { shell: true, cwd: _path2['default'].dirname(apksignerDummyPath) }).returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.signWithDefaultCert(selendroidTestApp));

          case 4:
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should fallback to sign.jar if apksigner fails', function callee$2$0() {
      var signPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            signPath = _path2['default'].resolve(helperJarPath, 'sign.jar');

            mocks.helpers.expects("getApksignerForOs").returns(apksignerDummyPath);
            mocks.teen_process.expects("exec").once().withExactArgs(apksignerDummyPath, ['sign', '--key', defaultKeyPath, '--cert', defaultCertPath, selendroidTestApp], { shell: true, cwd: _path2['default'].dirname(apksignerDummyPath) }).throws();
            mocks.helpers.expects("getJavaForOs").returns(javaDummyPath);
            mocks.teen_process.expects("exec").once().withExactArgs(javaDummyPath, ['-jar', signPath, selendroidTestApp, '--override']).returns("");
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(adb.signWithDefaultCert(selendroidTestApp));

          case 7:
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should throw error for invalid file path', function callee$2$0() {
      var dummyPath;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            dummyPath = "dummyPath";
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(adb.signWithDefaultCert(dummyPath).should.eventually.be.rejected);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));

  describe('signWithCustomCert', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process, helpers: helpers }, function (mocks) {
    it('should call exec with correct args', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.useKeystore = true;

            mocks.helpers.expects("getApksignerForOs").returns(apksignerDummyPath);
            mocks.teen_process.expects("exec").withExactArgs(apksignerDummyPath, ['sign', '--ks', keystorePath, '--ks-key-alias', keyAlias, '--ks-pass', 'pass:' + password, '--key-pass', 'pass:' + password, selendroidTestApp], { shell: true, cwd: _path2['default'].dirname(apksignerDummyPath) }).returns("");
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.signWithCustomCert(selendroidTestApp));

          case 5:
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should fallback to jarsigner if apksigner fails', function callee$2$0() {
      var jarsigner;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            jarsigner = _path2['default'].resolve(javaHome, 'bin', 'jarsigner');

            if (appiumSupport.system.isWindows()) {
              jarsigner = jarsigner + '.exe';
            }
            adb.useKeystore = true;

            mocks.helpers.expects("getApksignerForOs").returns(apksignerDummyPath);
            mocks.teen_process.expects("exec").withExactArgs(apksignerDummyPath, ['sign', '--ks', keystorePath, '--ks-key-alias', keyAlias, '--ks-pass', 'pass:' + password, '--key-pass', 'pass:' + password, selendroidTestApp], { shell: true, cwd: _path2['default'].dirname(apksignerDummyPath) }).throws();
            mocks.helpers.expects("getJavaHome").returns(javaHome);
            mocks.helpers.expects("getJavaForOs").returns(javaDummyPath);
            mocks.teen_process.expects("exec").withExactArgs(javaDummyPath, ['-jar', _path2['default'].resolve(helperJarPath, 'unsign.jar'), selendroidTestApp]).returns("");
            mocks.teen_process.expects("exec").withExactArgs(jarsigner, ['-sigalg', 'MD5withRSA', '-digestalg', 'SHA1', '-keystore', keystorePath, '-storepass', password, '-keypass', password, selendroidTestApp, keyAlias]).returns("");
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(adb.signWithCustomCert(selendroidTestApp));

          case 11:
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));

  describe('getKeystoreMd5', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
    it('should call exec with correct args', function callee$2$0() {
      var h, keytool, md5Str, md5;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            h = "a-fA-F0-9";
            keytool = _path2['default'].resolve(javaHome, 'bin', 'keytool');
            md5Str = ['.*MD5.*((?:[', h, ']{2}:){15}[', h, ']{2})'].join('');
            md5 = new RegExp(md5Str, 'mi');

            adb.useKeystore = true;
            mocks.teen_process.expects("exec").once().withExactArgs(keytool, ['-v', '-list', '-alias', keyAlias, '-keystore', keystorePath, '-storepass', password]).returns("");
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.getKeystoreMd5(keytool, md5));

          case 8:
            mocks.teen_process.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));

  // Skipping as unable to mock mkdirp, this case is covered in e2e tests for now.
  // TODO: find ways to mock mkdirp
  describe.skip('zipAlignApk', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process, adb: adb, appiumSupport: appiumSupport, fs: fs, tempDir: tempDir }, function (mocks) {
    it('should call exec with correct args', function callee$2$0() {
      var alignedApk;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            alignedApk = "dummy_path";

            mocks.tempDir.expects('path').once().withExactArgs({ prefix: 'appium', suffix: '.tmp' }).returns(alignedApk);
            mocks.adb.expects('initZipAlign').once().withExactArgs().returns("");
            mocks.appiumSupport.expects('mkdirp').once().withExactArgs(_path2['default'].dirname(alignedApk)).returns("");
            mocks.teen_process.expects("exec").once().withExactArgs(adb.binaries.zipalign, ['-f', '4', selendroidTestApp, alignedApk]);
            mocks.fs.expects("mv").once().withExactArgs(alignedApk, selendroidTestApp, { mkdirp: true }).returns("");
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.zipAlignApk(selendroidTestApp));

          case 8:
            mocks.adb.verify();
            mocks.appiumSupport.verify();
            mocks.teen_process.verify();
            mocks.tempDir.verify();
            mocks.fs.verify();

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));

  describe('checkApkCert', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process, helpers: helpers, adb: adb }, function (mocks) {
    it('should return false for apk not present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(adb.checkApkCert('dummyPath', 'dummyPackage'));

          case 2:
            context$3$0.sent.should.be['false'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should call exec when not using keystore', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.useKeystore = false;

            mocks.helpers.expects("getApksignerForOs").twice().returns(apksignerDummyPath);
            mocks.teen_process.expects("exec").once().withExactArgs(apksignerDummyPath, ['verify', selendroidTestApp], { shell: true, cwd: _path2['default'].dirname(apksignerDummyPath) }).returns("");
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(adb.checkApkCert(selendroidTestApp, selendroidTestAppPackage));

          case 5:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should fallback to verify.jar if apksigner is not found', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.useKeystore = false;

            mocks.helpers.expects("getApksignerForOs").throws();
            mocks.helpers.expects("getJavaForOs").returns(javaDummyPath);
            mocks.teen_process.expects("exec").withExactArgs(javaDummyPath, ['-jar', _path2['default'].resolve(helperJarPath, 'verify.jar'), selendroidTestApp]).returns("");
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.checkApkCert(selendroidTestApp, selendroidTestAppPackage));

          case 6:
            context$3$0.sent.should.be['true'];

            mocks.adb.verify();
            mocks.teen_process.verify();
            mocks.helpers.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should call checkCustomApkCert when using keystore', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            adb.useKeystore = true;

            mocks.adb.expects('checkCustomApkCert').once().withExactArgs(selendroidTestApp, selendroidTestAppPackage).returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(adb.checkApkCert(selendroidTestApp, selendroidTestAppPackage));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  }));
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hcGstc2lnbmluZy1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQzdCLE9BQU87Ozs7NEJBQ0Usc0JBQXNCOztJQUFuQyxPQUFPOztvQkFDRixNQUFNOzs7OzRCQUNPLGNBQWM7O0lBQWhDLFlBQVk7OzZCQUNPLGdCQUFnQjs7SUFBbkMsYUFBYTs7aUNBQ0MscUJBQXFCOztBQUcvQyxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFNLGlCQUFpQixHQUFHLGtCQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUseUJBQXlCLENBQUM7SUFDaEcsYUFBYSxHQUFHLGtCQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNyRCxZQUFZLEdBQUcsa0JBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQztJQUN2RixjQUFjLEdBQUcsa0JBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQztJQUNyRSxlQUFlLEdBQUcsa0JBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixDQUFDO0lBQzNFLFFBQVEsR0FBRyxZQUFZO0lBQ3ZCLFFBQVEsR0FBRyxTQUFTO0lBQ3BCLHdCQUF3QixHQUFHLHVCQUF1QjtJQUNsRCxhQUFhLEdBQUcsaUJBQWlCO0lBQ2pDLFFBQVEsR0FBRyxXQUFXO0lBQ3RCLGtCQUFrQixHQUFHLG9CQUFvQjtJQUN6QyxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU87SUFDL0IsRUFBRSxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7O0FBRTVCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBTTtBQUN4QixNQUFJLEdB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SyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuQixpQkFBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1QixpQkFBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Ozs7OztLQUN4QixDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLG9EQUFvRCxFQUFFOzs7O0FBQ3ZELGVBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOztBQUV2QixpQkFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FDakMsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDLENBQ2pFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzs7NkNBQ1osR0FBRyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSx3QkFBd0IsQ0FBQzs7O0FBQ25FLGlCQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O0tBQ3BCLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQyxDQUFDO0NBQ0wsQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9hcGstc2lnbmluZy1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xyXG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XHJcbmltcG9ydCBBREIgZnJvbSAnLi4vLi4nO1xyXG5pbXBvcnQgKiBhcyBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi9oZWxwZXJzLmpzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIHRlZW5fcHJvY2VzcyBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xyXG5pbXBvcnQgKiBhcyBhcHBpdW1TdXBwb3J0IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcclxuaW1wb3J0IHsgd2l0aE1vY2tzIH0gZnJvbSAnYXBwaXVtLXRlc3Qtc3VwcG9ydCc7XHJcblxyXG5cclxuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xyXG5cclxuY29uc3Qgc2VsZW5kcm9pZFRlc3RBcHAgPSBwYXRoLnJlc29sdmUoaGVscGVycy5yb290RGlyLCAndGVzdCcsICdmaXh0dXJlcycsICdzZWxlbmRyb2lkLXRlc3QtYXBwLmFwaycpLFxyXG4gICAgICBoZWxwZXJKYXJQYXRoID0gcGF0aC5yZXNvbHZlKGhlbHBlcnMucm9vdERpciwgJ2phcnMnKSxcclxuICAgICAga2V5c3RvcmVQYXRoID0gcGF0aC5yZXNvbHZlKGhlbHBlcnMucm9vdERpciwgJ3Rlc3QnLCAnZml4dHVyZXMnLCAnYXBwaXVtdGVzdC5rZXlzdG9yZScpLFxyXG4gICAgICBkZWZhdWx0S2V5UGF0aCA9IHBhdGgucmVzb2x2ZShoZWxwZXJzLnJvb3REaXIsICdrZXlzJywgJ3Rlc3RrZXkucGs4JyksXHJcbiAgICAgIGRlZmF1bHRDZXJ0UGF0aCA9IHBhdGgucmVzb2x2ZShoZWxwZXJzLnJvb3REaXIsICdrZXlzJywgJ3Rlc3RrZXkueDUwOS5wZW0nKSxcclxuICAgICAga2V5QWxpYXMgPSAnYXBwaXVtdGVzdCcsXHJcbiAgICAgIHBhc3N3b3JkID0gJ2FuZHJvaWQnLFxyXG4gICAgICBzZWxlbmRyb2lkVGVzdEFwcFBhY2thZ2UgPSAnaW8uc2VsZW5kcm9pZC50ZXN0YXBwJyxcclxuICAgICAgamF2YUR1bW15UGF0aCA9ICdqYXZhX2R1bW15X3BhdGgnLFxyXG4gICAgICBqYXZhSG9tZSA9ICdqYXZhX2hvbWUnLFxyXG4gICAgICBhcGtzaWduZXJEdW1teVBhdGggPSAnL3BhdGgvdG8vYXBrc2lnbmVyJyxcclxuICAgICAgdGVtcERpciA9IGFwcGl1bVN1cHBvcnQudGVtcERpcixcclxuICAgICAgZnMgPSBhcHBpdW1TdXBwb3J0LmZzO1xyXG5cclxuZGVzY3JpYmUoJ3NpZ25pbmcnLCAoKSA9PiB7XHJcbiAgbGV0IGFkYiA9IG5ldyBBREIoKTtcclxuICBhZGIua2V5c3RvcmVQYXRoID0ga2V5c3RvcmVQYXRoO1xyXG4gIGFkYi5rZXlBbGlhcyA9IGtleUFsaWFzO1xyXG4gIGFkYi5rZXlzdG9yZVBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgYWRiLmtleVBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcblxyXG4gIGRlc2NyaWJlKCdzaWduV2l0aERlZmF1bHRDZXJ0Jywgd2l0aE1vY2tzKHt0ZWVuX3Byb2Nlc3MsIGhlbHBlcnN9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBleGVjIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJnZXRBcGtzaWduZXJGb3JPc1wiKVxyXG4gICAgICAgIC5yZXR1cm5zKGFwa3NpZ25lckR1bW15UGF0aCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhhcGtzaWduZXJEdW1teVBhdGgsIFsnc2lnbicsXHJcbiAgICAgICAgICAnLS1rZXknLCBkZWZhdWx0S2V5UGF0aCwgJy0tY2VydCcsIGRlZmF1bHRDZXJ0UGF0aCwgc2VsZW5kcm9pZFRlc3RBcHBdLFxyXG4gICAgICAgICAge3NoZWxsOiB0cnVlLCBjd2Q6IHBhdGguZGlybmFtZShhcGtzaWduZXJEdW1teVBhdGgpfSlcclxuICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgYXdhaXQgYWRiLnNpZ25XaXRoRGVmYXVsdENlcnQoc2VsZW5kcm9pZFRlc3RBcHApO1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGZhbGxiYWNrIHRvIHNpZ24uamFyIGlmIGFwa3NpZ25lciBmYWlscycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHNpZ25QYXRoID0gcGF0aC5yZXNvbHZlKGhlbHBlckphclBhdGgsICdzaWduLmphcicpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJnZXRBcGtzaWduZXJGb3JPc1wiKVxyXG4gICAgICAgIC5yZXR1cm5zKGFwa3NpZ25lckR1bW15UGF0aCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhhcGtzaWduZXJEdW1teVBhdGgsIFsnc2lnbicsXHJcbiAgICAgICAgICAnLS1rZXknLCBkZWZhdWx0S2V5UGF0aCwgJy0tY2VydCcsIGRlZmF1bHRDZXJ0UGF0aCwgc2VsZW5kcm9pZFRlc3RBcHBdLFxyXG4gICAgICAgICAge3NoZWxsOiB0cnVlLCBjd2Q6IHBhdGguZGlybmFtZShhcGtzaWduZXJEdW1teVBhdGgpfSlcclxuICAgICAgICAudGhyb3dzKCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cyhcImdldEphdmFGb3JPc1wiKVxyXG4gICAgICAgIC5yZXR1cm5zKGphdmFEdW1teVBhdGgpO1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cyhcImV4ZWNcIilcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3MoamF2YUR1bW15UGF0aCwgWyctamFyJywgc2lnblBhdGgsIHNlbGVuZHJvaWRUZXN0QXBwLCAnLS1vdmVycmlkZSddKVxyXG4gICAgICAgIC5yZXR1cm5zKFwiXCIpO1xyXG4gICAgICBhd2FpdCBhZGIuc2lnbldpdGhEZWZhdWx0Q2VydChzZWxlbmRyb2lkVGVzdEFwcCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgZm9yIGludmFsaWQgZmlsZSBwYXRoJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgZHVtbXlQYXRoID0gXCJkdW1teVBhdGhcIjtcclxuICAgICAgYXdhaXQgYWRiLnNpZ25XaXRoRGVmYXVsdENlcnQoZHVtbXlQYXRoKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZDtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuXHJcbiAgZGVzY3JpYmUoJ3NpZ25XaXRoQ3VzdG9tQ2VydCcsIHdpdGhNb2Nrcyh7dGVlbl9wcm9jZXNzLCBoZWxwZXJzfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZXhlYyB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYWRiLnVzZUtleXN0b3JlID0gdHJ1ZTtcclxuXHJcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cyhcImdldEFwa3NpZ25lckZvck9zXCIpXHJcbiAgICAgICAgLnJldHVybnMoYXBrc2lnbmVyRHVtbXlQYXRoKTtcclxuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLmV4cGVjdHMoXCJleGVjXCIpXHJcbiAgICAgICAgLndpdGhFeGFjdEFyZ3MoYXBrc2lnbmVyRHVtbXlQYXRoLCBbJ3NpZ24nLFxyXG4gICAgICAgICAgJy0ta3MnLCBrZXlzdG9yZVBhdGgsXHJcbiAgICAgICAgICAnLS1rcy1rZXktYWxpYXMnLCBrZXlBbGlhcyxcclxuICAgICAgICAgICctLWtzLXBhc3MnLCBgcGFzczoke3Bhc3N3b3JkfWAsXHJcbiAgICAgICAgICAnLS1rZXktcGFzcycsIGBwYXNzOiR7cGFzc3dvcmR9YCxcclxuICAgICAgICAgIHNlbGVuZHJvaWRUZXN0QXBwXSwge3NoZWxsOiB0cnVlLCBjd2Q6IHBhdGguZGlybmFtZShhcGtzaWduZXJEdW1teVBhdGgpfSlcclxuICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgYXdhaXQgYWRiLnNpZ25XaXRoQ3VzdG9tQ2VydChzZWxlbmRyb2lkVGVzdEFwcCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KCdzaG91bGQgZmFsbGJhY2sgdG8gamFyc2lnbmVyIGlmIGFwa3NpZ25lciBmYWlscycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGphcnNpZ25lciA9IHBhdGgucmVzb2x2ZShqYXZhSG9tZSwgJ2JpbicsICdqYXJzaWduZXInKTtcclxuICAgICAgaWYgKGFwcGl1bVN1cHBvcnQuc3lzdGVtLmlzV2luZG93cygpKSB7XHJcbiAgICAgICAgamFyc2lnbmVyID0gamFyc2lnbmVyICsgJy5leGUnO1xyXG4gICAgICB9XHJcbiAgICAgIGFkYi51c2VLZXlzdG9yZSA9IHRydWU7XHJcblxyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJnZXRBcGtzaWduZXJGb3JPc1wiKVxyXG4gICAgICAgIC5yZXR1cm5zKGFwa3NpZ25lckR1bW15UGF0aCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKGFwa3NpZ25lckR1bW15UGF0aCwgWydzaWduJyxcclxuICAgICAgICAgICctLWtzJywga2V5c3RvcmVQYXRoLFxyXG4gICAgICAgICAgJy0ta3Mta2V5LWFsaWFzJywga2V5QWxpYXMsXHJcbiAgICAgICAgICAnLS1rcy1wYXNzJywgYHBhc3M6JHtwYXNzd29yZH1gLFxyXG4gICAgICAgICAgJy0ta2V5LXBhc3MnLCBgcGFzczoke3Bhc3N3b3JkfWAsXHJcbiAgICAgICAgICBzZWxlbmRyb2lkVGVzdEFwcF0sIHtzaGVsbDogdHJ1ZSwgY3dkOiBwYXRoLmRpcm5hbWUoYXBrc2lnbmVyRHVtbXlQYXRoKX0pXHJcbiAgICAgICAgLnRocm93cygpO1xyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJnZXRKYXZhSG9tZVwiKVxyXG4gICAgICAgIC5yZXR1cm5zKGphdmFIb21lKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKFwiZ2V0SmF2YUZvck9zXCIpXHJcbiAgICAgICAgLnJldHVybnMoamF2YUR1bW15UGF0aCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKGphdmFEdW1teVBhdGgsIFsnLWphcicsIHBhdGgucmVzb2x2ZShoZWxwZXJKYXJQYXRoLCAndW5zaWduLmphcicpLCBzZWxlbmRyb2lkVGVzdEFwcF0pXHJcbiAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKGphcnNpZ25lciwgWyctc2lnYWxnJywgJ01ENXdpdGhSU0EnLCAnLWRpZ2VzdGFsZycsICdTSEExJyxcclxuICAgICAgICAgICcta2V5c3RvcmUnLCBrZXlzdG9yZVBhdGgsICctc3RvcmVwYXNzJywgcGFzc3dvcmQsXHJcbiAgICAgICAgICAnLWtleXBhc3MnLCBwYXNzd29yZCwgc2VsZW5kcm9pZFRlc3RBcHAsIGtleUFsaWFzXSlcclxuICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgYXdhaXQgYWRiLnNpZ25XaXRoQ3VzdG9tQ2VydChzZWxlbmRyb2lkVGVzdEFwcCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuXHJcbiAgZGVzY3JpYmUoJ2dldEtleXN0b3JlTWQ1Jywgd2l0aE1vY2tzKHt0ZWVuX3Byb2Nlc3N9LCAobW9ja3MpID0+IHtcclxuICAgIGl0KCdzaG91bGQgY2FsbCBleGVjIHdpdGggY29ycmVjdCBhcmdzJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgaCA9IFwiYS1mQS1GMC05XCI7XHJcbiAgICAgIGxldCBrZXl0b29sID0gcGF0aC5yZXNvbHZlKGphdmFIb21lLCAnYmluJywgJ2tleXRvb2wnKTtcclxuICAgICAgbGV0IG1kNVN0ciA9IFsnLipNRDUuKigoPzpbJywgaCwgJ117Mn06KXsxNX1bJywgaCwgJ117Mn0pJ10uam9pbignJyk7XHJcbiAgICAgIGxldCBtZDUgPSBuZXcgUmVnRXhwKG1kNVN0ciwgJ21pJyk7XHJcbiAgICAgIGFkYi51c2VLZXlzdG9yZSA9IHRydWU7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhrZXl0b29sLCBbJy12JywgJy1saXN0JywgJy1hbGlhcycsIGtleUFsaWFzLFxyXG4gICAgICAgICAgJy1rZXlzdG9yZScsIGtleXN0b3JlUGF0aCwgJy1zdG9yZXBhc3MnLCBwYXNzd29yZF0pXHJcbiAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgIChhd2FpdCBhZGIuZ2V0S2V5c3RvcmVNZDUoa2V5dG9vbCwgbWQ1KSk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy52ZXJpZnkoKTtcclxuICAgIH0pO1xyXG4gIH0pKTtcclxuXHJcbiAgLy8gU2tpcHBpbmcgYXMgdW5hYmxlIHRvIG1vY2sgbWtkaXJwLCB0aGlzIGNhc2UgaXMgY292ZXJlZCBpbiBlMmUgdGVzdHMgZm9yIG5vdy5cclxuICAvLyBUT0RPOiBmaW5kIHdheXMgdG8gbW9jayBta2RpcnBcclxuICBkZXNjcmliZS5za2lwKCd6aXBBbGlnbkFwaycsIHdpdGhNb2Nrcyh7dGVlbl9wcm9jZXNzLCBhZGIsIGFwcGl1bVN1cHBvcnQsIGZzLCB0ZW1wRGlyfSwgKG1vY2tzKSA9PiB7XHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgZXhlYyB3aXRoIGNvcnJlY3QgYXJncycsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IGFsaWduZWRBcGsgPSBcImR1bW15X3BhdGhcIjtcclxuICAgICAgbW9ja3MudGVtcERpci5leHBlY3RzKCdwYXRoJylcclxuICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3Moe3ByZWZpeDogJ2FwcGl1bScsIHN1ZmZpeDogJy50bXAnfSlcclxuICAgICAgICAucmV0dXJucyhhbGlnbmVkQXBrKTtcclxuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luaXRaaXBBbGlnbicpXHJcbiAgICAgICAgLm9uY2UoKS53aXRoRXhhY3RBcmdzKClcclxuICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgbW9ja3MuYXBwaXVtU3VwcG9ydC5leHBlY3RzKCdta2RpcnAnKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhwYXRoLmRpcm5hbWUoYWxpZ25lZEFwaykpXHJcbiAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhhZGIuYmluYXJpZXMuemlwYWxpZ24sIFsnLWYnLCAnNCcsIHNlbGVuZHJvaWRUZXN0QXBwLCBhbGlnbmVkQXBrXSk7XHJcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoXCJtdlwiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhhbGlnbmVkQXBrLCBzZWxlbmRyb2lkVGVzdEFwcCwgeyBta2RpcnA6IHRydWUgfSlcclxuICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgYXdhaXQgYWRiLnppcEFsaWduQXBrKHNlbGVuZHJvaWRUZXN0QXBwKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy5hcHBpdW1TdXBwb3J0LnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLnRlbXBEaXIudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmZzLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG5cclxuICBkZXNjcmliZSgnY2hlY2tBcGtDZXJ0Jywgd2l0aE1vY2tzKHt0ZWVuX3Byb2Nlc3MsIGhlbHBlcnMsIGFkYn0sIChtb2NrcykgPT4ge1xyXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIGFwayBub3QgcHJlc2VudCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgKGF3YWl0IGFkYi5jaGVja0Fwa0NlcnQoJ2R1bW15UGF0aCcsICdkdW1teVBhY2thZ2UnKSkuc2hvdWxkLmJlLmZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoJ3Nob3VsZCBjYWxsIGV4ZWMgd2hlbiBub3QgdXNpbmcga2V5c3RvcmUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGFkYi51c2VLZXlzdG9yZSA9IGZhbHNlO1xyXG5cclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKFwiZ2V0QXBrc2lnbmVyRm9yT3NcIilcclxuICAgICAgICAudHdpY2UoKS5yZXR1cm5zKGFwa3NpZ25lckR1bW15UGF0aCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC5vbmNlKCkud2l0aEV4YWN0QXJncyhhcGtzaWduZXJEdW1teVBhdGgsXHJcbiAgICAgICAgICBbJ3ZlcmlmeScsIHNlbGVuZHJvaWRUZXN0QXBwXSxcclxuICAgICAgICAgIHtzaGVsbDogdHJ1ZSwgY3dkOiBwYXRoLmRpcm5hbWUoYXBrc2lnbmVyRHVtbXlQYXRoKX0pXHJcbiAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgIChhd2FpdCBhZGIuY2hlY2tBcGtDZXJ0KHNlbGVuZHJvaWRUZXN0QXBwLCBzZWxlbmRyb2lkVGVzdEFwcFBhY2thZ2UpKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGZhbGxiYWNrIHRvIHZlcmlmeS5qYXIgaWYgYXBrc2lnbmVyIGlzIG5vdCBmb3VuZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYWRiLnVzZUtleXN0b3JlID0gZmFsc2U7XHJcblxyXG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJnZXRBcGtzaWduZXJGb3JPc1wiKVxyXG4gICAgICAgIC50aHJvd3MoKTtcclxuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKFwiZ2V0SmF2YUZvck9zXCIpXHJcbiAgICAgICAgLnJldHVybnMoamF2YUR1bW15UGF0aCk7XHJcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKFwiZXhlY1wiKVxyXG4gICAgICAgIC53aXRoRXhhY3RBcmdzKGphdmFEdW1teVBhdGgsIFsnLWphcicsIHBhdGgucmVzb2x2ZShoZWxwZXJKYXJQYXRoLCAndmVyaWZ5LmphcicpLCBzZWxlbmRyb2lkVGVzdEFwcF0pXHJcbiAgICAgICAgLnJldHVybnMoXCJcIik7XHJcbiAgICAgIChhd2FpdCBhZGIuY2hlY2tBcGtDZXJ0KHNlbGVuZHJvaWRUZXN0QXBwLCBzZWxlbmRyb2lkVGVzdEFwcFBhY2thZ2UpKS5zaG91bGQuYmUudHJ1ZTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XHJcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdCgnc2hvdWxkIGNhbGwgY2hlY2tDdXN0b21BcGtDZXJ0IHdoZW4gdXNpbmcga2V5c3RvcmUnLCBhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGFkYi51c2VLZXlzdG9yZSA9IHRydWU7XHJcblxyXG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnY2hlY2tDdXN0b21BcGtDZXJ0JylcclxuICAgICAgICAgICAub25jZSgpLndpdGhFeGFjdEFyZ3Moc2VsZW5kcm9pZFRlc3RBcHAsIHNlbGVuZHJvaWRUZXN0QXBwUGFja2FnZSlcclxuICAgICAgICAgICAucmV0dXJucyhcIlwiKTtcclxuICAgICAgYXdhaXQgYWRiLmNoZWNrQXBrQ2VydChzZWxlbmRyb2lkVGVzdEFwcCwgc2VsZW5kcm9pZFRlc3RBcHBQYWNrYWdlKTtcclxuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xyXG4gICAgfSk7XHJcbiAgfSkpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
