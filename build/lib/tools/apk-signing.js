'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _teen_process = require('teen_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loggerJs = require('../logger.js');

var _loggerJs2 = _interopRequireDefault(_loggerJs);

var _appiumSupport = require('appium-support');

var _helpersJs = require('../helpers.js');

var DEFAULT_PRIVATE_KEY = _path2['default'].resolve(_helpersJs.rootDir, 'keys', 'testkey.pk8');
var DEFAULT_CERTIFICATE = _path2['default'].resolve(_helpersJs.rootDir, 'keys', 'testkey.x509.pem');

var apkSigningMethods = {};

/**
 * Execute apksigner utility with given arguments. This method
 * also applies the patch, which workarounds
 * '-Djava.ext.dirs is not supported. Use -classpath instead.' error on Windows.
 *
 * @param {?Array<String>} args - The list of tool arguments.
 * @throws {Error} If apksigner binary is not present on the local file system
 *                 or the return code is not equal to zero.
 */
apkSigningMethods.executeApksigner = function callee$0$0() {
  var args = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var apkSigner, originalFolder, isPatched, originalContent, patchedContent;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _helpersJs.getApksignerForOs)(this));

      case 2:
        apkSigner = context$1$0.sent;
        originalFolder = _path2['default'].dirname(apkSigner);
        isPatched = false;
        context$1$0.t0 = _appiumSupport.system.isWindows();

        if (!context$1$0.t0) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(apkSigner));

      case 9:
        context$1$0.t0 = context$1$0.sent;

      case 10:
        if (!context$1$0.t0) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(apkSigner, 'ascii'));

      case 13:
        originalContent = context$1$0.sent;
        patchedContent = originalContent.replace('-Djava.ext.dirs="%frameworkdir%"', '-cp "%frameworkdir%\\*"');

        if (!(patchedContent !== originalContent)) {
          context$1$0.next = 25;
          break;
        }

        _loggerJs2['default'].debug('Patching \'' + apkSigner + '\' for Windows...');
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(_appiumSupport.tempDir.path({ prefix: 'apksigner', suffix: '.bat' }));

      case 19:
        apkSigner = context$1$0.sent;
        context$1$0.next = 22;
        return _regeneratorRuntime.awrap((0, _appiumSupport.mkdirp)(_path2['default'].dirname(apkSigner)));

      case 22:
        context$1$0.next = 24;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.writeFile(apkSigner, patchedContent, 'ascii'));

      case 24:
        isPatched = true;

      case 25:
        _loggerJs2['default'].debug('Starting ' + (isPatched ? 'patched ' : '') + '\'' + apkSigner + '\' with args \'' + args + '\'');
        context$1$0.prev = 26;
        context$1$0.next = 29;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(apkSigner, args, { shell: true, cwd: originalFolder }));

      case 29:
        context$1$0.prev = 29;
        context$1$0.t1 = isPatched;

        if (!context$1$0.t1) {
          context$1$0.next = 35;
          break;
        }

        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(apkSigner));

      case 34:
        context$1$0.t1 = context$1$0.sent;

      case 35:
        if (!context$1$0.t1) {
          context$1$0.next = 38;
          break;
        }

        context$1$0.next = 38;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(apkSigner));

      case 38:
        return context$1$0.finish(29);

      case 39:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[26,, 29, 39]]);
};

/**
 * (Re)sign the given apk file on the local file system with the default certificate.
 *
 * @param {string} apk - The full path to the local apk file.
 * @throws {Error} If signing fails.
 */
apkSigningMethods.signWithDefaultCert = function callee$0$0(apk) {
  var args, java, signPath;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Signing \'' + apk + '\' with default cert');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(apk));

      case 3:
        if (context$1$0.sent) {
          context$1$0.next = 5;
          break;
        }

        throw new Error(apk + ' file doesn\'t exist.');

      case 5:
        context$1$0.prev = 5;
        args = ['sign', '--key', DEFAULT_PRIVATE_KEY, '--cert', DEFAULT_CERTIFICATE, apk];
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.executeApksigner(args));

      case 9:
        context$1$0.next = 25;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](5);

        _loggerJs2['default'].warn('Cannot use apksigner tool for signing. Defaulting to sign.jar. ' + ('Original error: ' + context$1$0.t0.message));
        java = (0, _helpersJs.getJavaForOs)();
        signPath = _path2['default'].resolve(this.helperJarPath, 'sign.jar');

        _loggerJs2['default'].debug("Resigning apk.");
        context$1$0.prev = 17;
        context$1$0.next = 20;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(java, ['-jar', signPath, apk, '--override']));

      case 20:
        context$1$0.next = 25;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t1 = context$1$0['catch'](17);

        _loggerJs2['default'].errorAndThrow('Could not sign with default certificate. Original error ' + context$1$0.t1.message);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[5, 11], [17, 22]]);
};

/**
 * (Re)sign the given apk file on the local file system with a custom certificate.
 *
 * @param {string} apk - The full path to the local apk file.
 * @throws {Error} If signing fails.
 */
apkSigningMethods.signWithCustomCert = function callee$0$0(apk) {
  var args, jarsigner;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Signing \'' + apk + '\' with custom cert');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.keystorePath));

      case 3:
        if (context$1$0.sent) {
          context$1$0.next = 5;
          break;
        }

        throw new Error('Keystore: ' + this.keystorePath + ' doesn\'t exist.');

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(apk));

      case 7:
        if (context$1$0.sent) {
          context$1$0.next = 9;
          break;
        }

        throw new Error('\'' + apk + '\' doesn\'t exist.');

      case 9:
        context$1$0.prev = 9;
        args = ['sign', '--ks', this.keystorePath, '--ks-key-alias', this.keyAlias, '--ks-pass', 'pass:' + this.keystorePassword, '--key-pass', 'pass:' + this.keyPassword, apk];
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.executeApksigner(args));

      case 13:
        context$1$0.next = 31;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](9);

        _loggerJs2['default'].warn('Cannot use apksigner tool for signing. Defaulting to jarsigner. ' + ('Original error: ' + context$1$0.t0.message));
        context$1$0.prev = 18;

        _loggerJs2['default'].debug("Unsigning apk.");
        context$1$0.next = 22;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)((0, _helpersJs.getJavaForOs)(), ['-jar', _path2['default'].resolve(this.helperJarPath, 'unsign.jar'), apk]));

      case 22:
        _loggerJs2['default'].debug("Signing apk.");
        jarsigner = _path2['default'].resolve((0, _helpersJs.getJavaHome)(), 'bin', 'jarsigner' + (_appiumSupport.system.isWindows() ? '.exe' : ''));
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(jarsigner, ['-sigalg', 'MD5withRSA', '-digestalg', 'SHA1', '-keystore', this.keystorePath, '-storepass', this.keystorePassword, '-keypass', this.keyPassword, apk, this.keyAlias]));

      case 26:
        context$1$0.next = 31;
        break;

      case 28:
        context$1$0.prev = 28;
        context$1$0.t1 = context$1$0['catch'](18);

        _loggerJs2['default'].errorAndThrow('Could not sign with custom certificate. Original error ' + context$1$0.t1.message);

      case 31:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[9, 15], [18, 28]]);
};

/**
 * (Re)sign the given apk file on the local file system with either
 * custom or default certificate based on _this.useKeystore_ property value
 * and Zip-aligns it after signing.
 *
 * @param {string} apk - The full path to the local apk file.
 * @throws {Error} If signing fails.
 */
apkSigningMethods.sign = function callee$0$0(apk) {
  var apksignerFound;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        apksignerFound = true;
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _helpersJs.getApksignerForOs)(this));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.zipAlignApk(apk));

      case 6:
        context$1$0.next = 11;
        break;

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](1);

        apksignerFound = false;

      case 11:
        if (!this.useKeystore) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.signWithCustomCert(apk));

      case 14:
        context$1$0.next = 18;
        break;

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.signWithDefaultCert(apk));

      case 18:
        if (apksignerFound) {
          context$1$0.next = 21;
          break;
        }

        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(this.zipAlignApk(apk));

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 8]]);
};

/**
 * Perform zip-aligning to the given local apk file.
 *
 * @param {string} apk - The full path to the local apk file.
 * @throws {Error} If zip-align fails.
 */
apkSigningMethods.zipAlignApk = function callee$0$0(apk) {
  var alignedApk;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Zip-aligning \'' + apk + '\'');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.initZipAlign());

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.tempDir.path({ prefix: 'appium', suffix: '.tmp' }));

      case 5:
        alignedApk = context$1$0.sent;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _appiumSupport.mkdirp)(_path2['default'].dirname(alignedApk)));

      case 8:
        context$1$0.prev = 8;
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(this.binaries.zipalign, ['-f', '4', apk, alignedApk]));

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.mv(alignedApk, apk, { mkdirp: true }));

      case 13:
        context$1$0.next = 23;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](8);
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(alignedApk));

      case 19:
        if (!context$1$0.sent) {
          context$1$0.next = 22;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(alignedApk));

      case 22:
        _loggerJs2['default'].errorAndThrow('zipAlignApk failed. Original error: ' + context$1$0.t0.message + '. Stdout: \'' + context$1$0.t0.stdout + '\'; Stderr: \'' + context$1$0.t0.stderr + '\'');

      case 23:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[8, 15]]);
};

/**
 * Check if the app is already signed.
 *
 * @param {string} apk - The full path to the local apk file.
 * @param {string} pgk - The name of application package.
 * @return {boolean} True if given application is already signed.
 */
apkSigningMethods.checkApkCert = function callee$0$0(apk, pkg) {
  var verificationFunc;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Checking app cert for ' + apk);
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(apk));

      case 3:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        _loggerJs2['default'].debug('\'' + apk + '\' doesn\'t exist');
        return context$1$0.abrupt('return', false);

      case 6:
        if (!this.useKeystore) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.checkCustomApkCert(apk, pkg));

      case 9:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 10:
        verificationFunc = undefined;
        context$1$0.prev = 11;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap((0, _helpersJs.getApksignerForOs)(this));

      case 14:
        verificationFunc = function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(this.executeApksigner(['verify', apk]));

              case 2:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 3:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this);
        };
        context$1$0.next = 20;
        break;

      case 17:
        context$1$0.prev = 17;
        context$1$0.t0 = context$1$0['catch'](11);

        (function () {
          _loggerJs2['default'].warn('Cannot use apksigner tool for signature verification. Defaulting to verify.jar. ' + ('Original error: ' + context$1$0.t0.message));
          var java = (0, _helpersJs.getJavaForOs)();
          verificationFunc = function callee$3$0() {
            return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
              while (1) switch (context$4$0.prev = context$4$0.next) {
                case 0:
                  context$4$0.next = 2;
                  return _regeneratorRuntime.awrap((0, _teen_process.exec)(java, ['-jar', _path2['default'].resolve(this.helperJarPath, 'verify.jar'), apk]));

                case 2:
                  return context$4$0.abrupt('return', context$4$0.sent);

                case 3:
                case 'end':
                  return context$4$0.stop();
              }
            }, null, _this);
          };
        })();

      case 20:
        context$1$0.prev = 20;
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(verificationFunc());

      case 23:
        _loggerJs2['default'].debug('\'' + apk + '\' is already signed.');
        return context$1$0.abrupt('return', true);

      case 27:
        context$1$0.prev = 27;
        context$1$0.t1 = context$1$0['catch'](20);

        _loggerJs2['default'].debug('\'' + apk + '\' is not signed with debug cert.');
        return context$1$0.abrupt('return', false);

      case 31:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[11, 17], [20, 27]]);
};

/**
 * Check if the app is already signed with a custom certificate.
 *
 * @param {string} apk - The full path to the local apk file.
 * @param {string} pgk - The name of application package.
 * @return {boolean} True if given application is already signed with a custom certificate.
 */
apkSigningMethods.checkCustomApkCert = function callee$0$0(apk, pkg) {
  var h, md5Str, md5, javaHome, keytool, keystoreHash;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug('Checking custom app cert for ' + apk);
        h = "a-fA-F0-9";
        md5Str = ['.*MD5.*((?:[' + h + ']{2}:){15}[' + h + ']{2})'];
        md5 = new RegExp(md5Str, 'mi');
        javaHome = (0, _helpersJs.getJavaHome)();
        keytool = _path2['default'].resolve(javaHome, 'bin', 'keytool' + (_appiumSupport.system.isWindows() ? '.exe' : ''));
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(this.getKeystoreMd5(keytool, md5));

      case 8:
        keystoreHash = context$1$0.sent;
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(this.checkApkKeystoreMatch(keytool, md5, keystoreHash, pkg, apk));

      case 11:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/**
 * Get the MD5 hash of the keystore.
 *
 * @param {string} keytool - The name of the keytool utility.
 * @param {RegExp} md5re - The pattern used to match the result in _keytool_ output.
 * @return {?string} Keystore MD5 hash or _null_ if the hash cannot be parsed.
 * @throws {Error} If getting keystore MD5 hash fails.
 */
apkSigningMethods.getKeystoreMd5 = function callee$0$0(keytool, md5re) {
  var _ref, stdout, keystoreHash;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _loggerJs2['default'].debug("Printing keystore md5.");
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)(keytool, ['-v', '-list', '-alias', this.keyAlias, '-keystore', this.keystorePath, '-storepass', this.keystorePassword]));

      case 4:
        _ref = context$1$0.sent;
        stdout = _ref.stdout;
        keystoreHash = md5re.exec(stdout);

        keystoreHash = keystoreHash ? keystoreHash[1] : null;
        _loggerJs2['default'].debug('Keystore MD5: ' + keystoreHash);
        return context$1$0.abrupt('return', keystoreHash);

      case 12:
        context$1$0.prev = 12;
        context$1$0.t0 = context$1$0['catch'](1);

        _loggerJs2['default'].errorAndThrow('getKeystoreMd5 failed. Original error: ' + context$1$0.t0.message);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 12]]);
};

/**
 * Check if the MD5 hash of the particular application matches to the given hash.
 *
 * @param {string} keytool - The name of the keytool utility.
 * @param {RegExp} md5re - The pattern used to match the result in _keytool_ output.
 * @param {string} keystoreHash - The expected hash value.
 * @param {string} pkg - The name of the installed package.
 * @param {string} apk - The full path to the existing apk file.
 * @return {boolean} True if both hashes are equal.
 * @throws {Error} If getting keystore MD5 hash fails.
 */
apkSigningMethods.checkApkKeystoreMatch = function callee$0$0(keytool, md5re, keystoreHash, pkg, apk) {
  var entryHash, rsa, foundKeystoreMatch;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this2 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        entryHash = null;
        rsa = /^META-INF\/.*\.[rR][sS][aA]$/;
        foundKeystoreMatch = false;
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.zip.readEntries(apk, function callee$1$0(_ref2) {
          var entry = _ref2.entry;
          var extractEntryTo = _ref2.extractEntryTo;

          var entryPath, entryFile, _ref3, stdout, matchesKeystore;

          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                entry = entry.fileName;

                if (rsa.test(entry)) {
                  context$2$0.next = 3;
                  break;
                }

                return context$2$0.abrupt('return');

              case 3:
                _loggerJs2['default'].debug('Entry: ' + entry);
                entryPath = _path2['default'].join(this.tmpDir, pkg, 'cert');

                _loggerJs2['default'].debug('entryPath: ' + entryPath);
                entryFile = _path2['default'].join(entryPath, entry);

                _loggerJs2['default'].debug('entryFile: ' + entryFile);
                // ensure /tmp/pkg/cert/ doesn't exist or extract will fail.
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(_appiumSupport.fs.rimraf(entryPath));

              case 10:
                context$2$0.next = 12;
                return _regeneratorRuntime.awrap(extractEntryTo(entryPath));

              case 12:
                _loggerJs2['default'].debug("extracted!");
                // check for match
                _loggerJs2['default'].debug("Printing apk md5.");
                context$2$0.next = 16;
                return _regeneratorRuntime.awrap((0, _teen_process.exec)(keytool, ['-v', '-printcert', '-file', entryFile]));

              case 16:
                _ref3 = context$2$0.sent;
                stdout = _ref3.stdout;

                entryHash = md5re.exec(stdout);
                entryHash = entryHash ? entryHash[1] : null;
                _loggerJs2['default'].debug('entryHash MD5: ' + entryHash);
                _loggerJs2['default'].debug('keystore MD5: ' + keystoreHash);
                matchesKeystore = entryHash && entryHash === keystoreHash;

                _loggerJs2['default'].debug('Matches keystore? ' + matchesKeystore);

                // If we have a keystore match, stop iterating

                if (!matchesKeystore) {
                  context$2$0.next = 27;
                  break;
                }

                foundKeystoreMatch = true;
                return context$2$0.abrupt('return', false);

              case 27:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this2);
        }));

      case 5:
        return context$1$0.abrupt('return', foundKeystoreMatch);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

exports['default'] = apkSigningMethods;
module.exports = exports['default'];

// we only want to zipalign here if we are using apksigner
// otherwise do it at the end

//for (let entry of entries) {
// META-INF/CERT.RSA
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi90b29scy9hcGstc2lnbmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzRCQUFxQixjQUFjOztvQkFDbEIsTUFBTTs7Ozt3QkFDUCxjQUFjOzs7OzZCQUNtQixnQkFBZ0I7O3lCQUNLLGVBQWU7O0FBRXJGLElBQU0sbUJBQW1CLEdBQUcsa0JBQUssT0FBTyxxQkFBVSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDekUsSUFBTSxtQkFBbUIsR0FBRyxrQkFBSyxPQUFPLHFCQUFVLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDOztBQUU5RSxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7QUFXM0IsaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUc7TUFBZ0IsSUFBSSx5REFBRyxFQUFFO01BQ3hELFNBQVMsRUFDUCxjQUFjLEVBQ2hCLFNBQVMsRUFFTCxlQUFlLEVBQ2YsY0FBYzs7Ozs7eUNBTEEsa0NBQWtCLElBQUksQ0FBQzs7O0FBQXpDLGlCQUFTO0FBQ1Asc0JBQWMsR0FBRyxrQkFBSyxPQUFPLENBQUMsU0FBUyxDQUFDO0FBQzFDLGlCQUFTLEdBQUcsS0FBSzt5QkFDakIsc0JBQU8sU0FBUyxFQUFFOzs7Ozs7Ozt5Q0FBVSxrQkFBRyxNQUFNLENBQUMsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7eUNBQ3BCLGtCQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDOzs7QUFBdkQsdUJBQWU7QUFDZixzQkFBYyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLEVBQy9FLHlCQUF5QixDQUFDOztjQUN4QixjQUFjLEtBQUssZUFBZSxDQUFBOzs7OztBQUNwQyw4QkFBSSxLQUFLLGlCQUFjLFNBQVMsdUJBQW1CLENBQUM7O3lDQUNsQyx1QkFBUSxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQzs7O0FBQXJFLGlCQUFTOzt5Q0FDSCwyQkFB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LEtBQUs7Ozs7Ozs7U0FFZixDQUFDOzs7NENBQ0ssa0JBQWtCOzs7Ozs7O0NBQzFCLENBQUM7O3FCQUVhLGlCQUFpQiIsImZpbGUiOiJsaWIvdG9vbHMvYXBrLXNpZ25pbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBleGVjIH0gZnJvbSAndGVlbl9wcm9jZXNzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyLmpzJztcclxuaW1wb3J0IHsgdGVtcERpciwgc3lzdGVtLCBta2RpcnAsIGZzLCB6aXAgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XHJcbmltcG9ydCB7IGdldEphdmFGb3JPcywgZ2V0QXBrc2lnbmVyRm9yT3MsIGdldEphdmFIb21lLCByb290RGlyIH0gZnJvbSAnLi4vaGVscGVycy5qcyc7XHJcblxyXG5jb25zdCBERUZBVUxUX1BSSVZBVEVfS0VZID0gcGF0aC5yZXNvbHZlKHJvb3REaXIsICdrZXlzJywgJ3Rlc3RrZXkucGs4Jyk7XHJcbmNvbnN0IERFRkFVTFRfQ0VSVElGSUNBVEUgPSBwYXRoLnJlc29sdmUocm9vdERpciwgJ2tleXMnLCAndGVzdGtleS54NTA5LnBlbScpO1xyXG5cclxubGV0IGFwa1NpZ25pbmdNZXRob2RzID0ge307XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSBhcGtzaWduZXIgdXRpbGl0eSB3aXRoIGdpdmVuIGFyZ3VtZW50cy4gVGhpcyBtZXRob2RcclxuICogYWxzbyBhcHBsaWVzIHRoZSBwYXRjaCwgd2hpY2ggd29ya2Fyb3VuZHNcclxuICogJy1EamF2YS5leHQuZGlycyBpcyBub3Qgc3VwcG9ydGVkLiBVc2UgLWNsYXNzcGF0aCBpbnN0ZWFkLicgZXJyb3Igb24gV2luZG93cy5cclxuICpcclxuICogQHBhcmFtIHs/QXJyYXk8U3RyaW5nPn0gYXJncyAtIFRoZSBsaXN0IG9mIHRvb2wgYXJndW1lbnRzLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgYXBrc2lnbmVyIGJpbmFyeSBpcyBub3QgcHJlc2VudCBvbiB0aGUgbG9jYWwgZmlsZSBzeXN0ZW1cclxuICogICAgICAgICAgICAgICAgIG9yIHRoZSByZXR1cm4gY29kZSBpcyBub3QgZXF1YWwgdG8gemVyby5cclxuICovXHJcbmFwa1NpZ25pbmdNZXRob2RzLmV4ZWN1dGVBcGtzaWduZXIgPSBhc3luYyBmdW5jdGlvbiAoYXJncyA9IFtdKSB7XHJcbiAgbGV0IGFwa1NpZ25lciA9IGF3YWl0IGdldEFwa3NpZ25lckZvck9zKHRoaXMpO1xyXG4gIGNvbnN0IG9yaWdpbmFsRm9sZGVyID0gcGF0aC5kaXJuYW1lKGFwa1NpZ25lcik7XHJcbiAgbGV0IGlzUGF0Y2hlZCA9IGZhbHNlO1xyXG4gIGlmIChzeXN0ZW0uaXNXaW5kb3dzKCkgJiYgYXdhaXQgZnMuZXhpc3RzKGFwa1NpZ25lcikpIHtcclxuICAgIGNvbnN0IG9yaWdpbmFsQ29udGVudCA9IGF3YWl0IGZzLnJlYWRGaWxlKGFwa1NpZ25lciwgJ2FzY2lpJyk7XHJcbiAgICBjb25zdCBwYXRjaGVkQ29udGVudCA9IG9yaWdpbmFsQ29udGVudC5yZXBsYWNlKCctRGphdmEuZXh0LmRpcnM9XCIlZnJhbWV3b3JrZGlyJVwiJyxcclxuICAgICAgJy1jcCBcIiVmcmFtZXdvcmtkaXIlXFxcXCpcIicpO1xyXG4gICAgaWYgKHBhdGNoZWRDb250ZW50ICE9PSBvcmlnaW5hbENvbnRlbnQpIHtcclxuICAgICAgbG9nLmRlYnVnKGBQYXRjaGluZyAnJHthcGtTaWduZXJ9JyBmb3IgV2luZG93cy4uLmApO1xyXG4gICAgICBhcGtTaWduZXIgPSBhd2FpdCB0ZW1wRGlyLnBhdGgoe3ByZWZpeDogJ2Fwa3NpZ25lcicsIHN1ZmZpeDogJy5iYXQnfSk7XHJcbiAgICAgIGF3YWl0IG1rZGlycChwYXRoLmRpcm5hbWUoYXBrU2lnbmVyKSk7XHJcbiAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShhcGtTaWduZXIsIHBhdGNoZWRDb250ZW50LCAnYXNjaWknKTtcclxuICAgICAgaXNQYXRjaGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgbG9nLmRlYnVnKGBTdGFydGluZyAke2lzUGF0Y2hlZCA/ICdwYXRjaGVkICcgOiAnJ30nJHthcGtTaWduZXJ9JyB3aXRoIGFyZ3MgJyR7YXJnc30nYCk7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGV4ZWMoYXBrU2lnbmVyLCBhcmdzLCB7c2hlbGw6IHRydWUsIGN3ZDogb3JpZ2luYWxGb2xkZXJ9KTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgaWYgKGlzUGF0Y2hlZCAmJiBhd2FpdCBmcy5leGlzdHMoYXBrU2lnbmVyKSkge1xyXG4gICAgICBhd2FpdCBmcy51bmxpbmsoYXBrU2lnbmVyKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogKFJlKXNpZ24gdGhlIGdpdmVuIGFwayBmaWxlIG9uIHRoZSBsb2NhbCBmaWxlIHN5c3RlbSB3aXRoIHRoZSBkZWZhdWx0IGNlcnRpZmljYXRlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBrIC0gVGhlIGZ1bGwgcGF0aCB0byB0aGUgbG9jYWwgYXBrIGZpbGUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBzaWduaW5nIGZhaWxzLlxyXG4gKi9cclxuYXBrU2lnbmluZ01ldGhvZHMuc2lnbldpdGhEZWZhdWx0Q2VydCA9IGFzeW5jIGZ1bmN0aW9uIChhcGspIHtcclxuICBsb2cuZGVidWcoYFNpZ25pbmcgJyR7YXBrfScgd2l0aCBkZWZhdWx0IGNlcnRgKTtcclxuICBpZiAoIShhd2FpdCBmcy5leGlzdHMoYXBrKSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgJHthcGt9IGZpbGUgZG9lc24ndCBleGlzdC5gKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBhcmdzID0gWydzaWduJyxcclxuICAgICAgJy0ta2V5JywgREVGQVVMVF9QUklWQVRFX0tFWSxcclxuICAgICAgJy0tY2VydCcsIERFRkFVTFRfQ0VSVElGSUNBVEUsXHJcbiAgICAgIGFwa107XHJcbiAgICBhd2FpdCB0aGlzLmV4ZWN1dGVBcGtzaWduZXIoYXJncyk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBsb2cud2FybihgQ2Fubm90IHVzZSBhcGtzaWduZXIgdG9vbCBmb3Igc2lnbmluZy4gRGVmYXVsdGluZyB0byBzaWduLmphci4gYCArXHJcbiAgICAgICAgICAgICBgT3JpZ2luYWwgZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgICBjb25zdCBqYXZhID0gZ2V0SmF2YUZvck9zKCk7XHJcbiAgICBjb25zdCBzaWduUGF0aCA9IHBhdGgucmVzb2x2ZSh0aGlzLmhlbHBlckphclBhdGgsICdzaWduLmphcicpO1xyXG4gICAgbG9nLmRlYnVnKFwiUmVzaWduaW5nIGFway5cIik7XHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCBleGVjKGphdmEsIFsnLWphcicsIHNpZ25QYXRoLCBhcGssICctLW92ZXJyaWRlJ10pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IHNpZ24gd2l0aCBkZWZhdWx0IGNlcnRpZmljYXRlLiBPcmlnaW5hbCBlcnJvciAke2UubWVzc2FnZX1gKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogKFJlKXNpZ24gdGhlIGdpdmVuIGFwayBmaWxlIG9uIHRoZSBsb2NhbCBmaWxlIHN5c3RlbSB3aXRoIGEgY3VzdG9tIGNlcnRpZmljYXRlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBrIC0gVGhlIGZ1bGwgcGF0aCB0byB0aGUgbG9jYWwgYXBrIGZpbGUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBzaWduaW5nIGZhaWxzLlxyXG4gKi9cclxuYXBrU2lnbmluZ01ldGhvZHMuc2lnbldpdGhDdXN0b21DZXJ0ID0gYXN5bmMgZnVuY3Rpb24gKGFwaykge1xyXG4gIGxvZy5kZWJ1ZyhgU2lnbmluZyAnJHthcGt9JyB3aXRoIGN1c3RvbSBjZXJ0YCk7XHJcbiAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzKHRoaXMua2V5c3RvcmVQYXRoKSkpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihgS2V5c3RvcmU6ICR7dGhpcy5rZXlzdG9yZVBhdGh9IGRvZXNuJ3QgZXhpc3QuYCk7XHJcbiAgfVxyXG4gIGlmICghKGF3YWl0IGZzLmV4aXN0cyhhcGspKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGAnJHthcGt9JyBkb2Vzbid0IGV4aXN0LmApO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGFyZ3MgPSBbJ3NpZ24nLFxyXG4gICAgICAnLS1rcycsIHRoaXMua2V5c3RvcmVQYXRoLFxyXG4gICAgICAnLS1rcy1rZXktYWxpYXMnLCB0aGlzLmtleUFsaWFzLFxyXG4gICAgICAnLS1rcy1wYXNzJywgYHBhc3M6JHt0aGlzLmtleXN0b3JlUGFzc3dvcmR9YCxcclxuICAgICAgJy0ta2V5LXBhc3MnLCBgcGFzczoke3RoaXMua2V5UGFzc3dvcmR9YCxcclxuICAgICAgYXBrXTtcclxuICAgIGF3YWl0IHRoaXMuZXhlY3V0ZUFwa3NpZ25lcihhcmdzKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGxvZy53YXJuKGBDYW5ub3QgdXNlIGFwa3NpZ25lciB0b29sIGZvciBzaWduaW5nLiBEZWZhdWx0aW5nIHRvIGphcnNpZ25lci4gYCArXHJcbiAgICAgICAgICAgICBgT3JpZ2luYWwgZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBsb2cuZGVidWcoXCJVbnNpZ25pbmcgYXBrLlwiKTtcclxuICAgICAgYXdhaXQgZXhlYyhnZXRKYXZhRm9yT3MoKSwgWyctamFyJywgcGF0aC5yZXNvbHZlKHRoaXMuaGVscGVySmFyUGF0aCwgJ3Vuc2lnbi5qYXInKSwgYXBrXSk7XHJcbiAgICAgIGxvZy5kZWJ1ZyhcIlNpZ25pbmcgYXBrLlwiKTtcclxuICAgICAgY29uc3QgamFyc2lnbmVyID0gcGF0aC5yZXNvbHZlKGdldEphdmFIb21lKCksICdiaW4nLCBgamFyc2lnbmVyJHtzeXN0ZW0uaXNXaW5kb3dzKCkgPyAnLmV4ZScgOiAnJ31gKTtcclxuICAgICAgYXdhaXQgZXhlYyhqYXJzaWduZXIsIFsnLXNpZ2FsZycsICdNRDV3aXRoUlNBJywgJy1kaWdlc3RhbGcnLCAnU0hBMScsXHJcbiAgICAgICAgJy1rZXlzdG9yZScsIHRoaXMua2V5c3RvcmVQYXRoLCAnLXN0b3JlcGFzcycsIHRoaXMua2V5c3RvcmVQYXNzd29yZCxcclxuICAgICAgICAnLWtleXBhc3MnLCB0aGlzLmtleVBhc3N3b3JkLCBhcGssIHRoaXMua2V5QWxpYXNdKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBzaWduIHdpdGggY3VzdG9tIGNlcnRpZmljYXRlLiBPcmlnaW5hbCBlcnJvciAke2UubWVzc2FnZX1gKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogKFJlKXNpZ24gdGhlIGdpdmVuIGFwayBmaWxlIG9uIHRoZSBsb2NhbCBmaWxlIHN5c3RlbSB3aXRoIGVpdGhlclxyXG4gKiBjdXN0b20gb3IgZGVmYXVsdCBjZXJ0aWZpY2F0ZSBiYXNlZCBvbiBfdGhpcy51c2VLZXlzdG9yZV8gcHJvcGVydHkgdmFsdWVcclxuICogYW5kIFppcC1hbGlnbnMgaXQgYWZ0ZXIgc2lnbmluZy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGxvY2FsIGFwayBmaWxlLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn0gSWYgc2lnbmluZyBmYWlscy5cclxuICovXHJcbmFwa1NpZ25pbmdNZXRob2RzLnNpZ24gPSBhc3luYyBmdW5jdGlvbiAoYXBrKSB7XHJcbiAgbGV0IGFwa3NpZ25lckZvdW5kID0gdHJ1ZTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgZ2V0QXBrc2lnbmVyRm9yT3ModGhpcyk7XHJcbiAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gemlwYWxpZ24gaGVyZSBpZiB3ZSBhcmUgdXNpbmcgYXBrc2lnbmVyXHJcbiAgICAvLyBvdGhlcndpc2UgZG8gaXQgYXQgdGhlIGVuZFxyXG4gICAgYXdhaXQgdGhpcy56aXBBbGlnbkFwayhhcGspO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgYXBrc2lnbmVyRm91bmQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICh0aGlzLnVzZUtleXN0b3JlKSB7XHJcbiAgICBhd2FpdCB0aGlzLnNpZ25XaXRoQ3VzdG9tQ2VydChhcGspO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhd2FpdCB0aGlzLnNpZ25XaXRoRGVmYXVsdENlcnQoYXBrKTtcclxuICB9XHJcblxyXG4gIGlmICghYXBrc2lnbmVyRm91bmQpIHtcclxuICAgIGF3YWl0IHRoaXMuemlwQWxpZ25BcGsoYXBrKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUGVyZm9ybSB6aXAtYWxpZ25pbmcgdG8gdGhlIGdpdmVuIGxvY2FsIGFwayBmaWxlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gYXBrIC0gVGhlIGZ1bGwgcGF0aCB0byB0aGUgbG9jYWwgYXBrIGZpbGUuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiB6aXAtYWxpZ24gZmFpbHMuXHJcbiAqL1xyXG5hcGtTaWduaW5nTWV0aG9kcy56aXBBbGlnbkFwayA9IGFzeW5jIGZ1bmN0aW9uIChhcGspIHtcclxuICBsb2cuZGVidWcoYFppcC1hbGlnbmluZyAnJHthcGt9J2ApO1xyXG4gIGF3YWl0IHRoaXMuaW5pdFppcEFsaWduKCk7XHJcbiAgbGV0IGFsaWduZWRBcGsgPSBhd2FpdCB0ZW1wRGlyLnBhdGgoe3ByZWZpeDogJ2FwcGl1bScsIHN1ZmZpeDogJy50bXAnfSk7XHJcbiAgYXdhaXQgbWtkaXJwKHBhdGguZGlybmFtZShhbGlnbmVkQXBrKSk7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGV4ZWModGhpcy5iaW5hcmllcy56aXBhbGlnbiwgWyctZicsICc0JywgYXBrLCBhbGlnbmVkQXBrXSk7XHJcbiAgICBhd2FpdCBmcy5tdihhbGlnbmVkQXBrLCBhcGssIHsgbWtkaXJwOiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGlmIChhd2FpdCBmcy5leGlzdHMoYWxpZ25lZEFwaykpIHtcclxuICAgICAgYXdhaXQgZnMudW5saW5rKGFsaWduZWRBcGspO1xyXG4gICAgfVxyXG4gICAgbG9nLmVycm9yQW5kVGhyb3coYHppcEFsaWduQXBrIGZhaWxlZC4gT3JpZ2luYWwgZXJyb3I6ICR7ZS5tZXNzYWdlfS4gU3Rkb3V0OiAnJHtlLnN0ZG91dH0nOyBTdGRlcnI6ICcke2Uuc3RkZXJyfSdgKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIGFwcCBpcyBhbHJlYWR5IHNpZ25lZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGxvY2FsIGFwayBmaWxlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGdrIC0gVGhlIG5hbWUgb2YgYXBwbGljYXRpb24gcGFja2FnZS5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBnaXZlbiBhcHBsaWNhdGlvbiBpcyBhbHJlYWR5IHNpZ25lZC5cclxuICovXHJcbmFwa1NpZ25pbmdNZXRob2RzLmNoZWNrQXBrQ2VydCA9IGFzeW5jIGZ1bmN0aW9uIChhcGssIHBrZykge1xyXG4gIGxvZy5kZWJ1ZyhgQ2hlY2tpbmcgYXBwIGNlcnQgZm9yICR7YXBrfWApO1xyXG4gIGlmICghYXdhaXQgZnMuZXhpc3RzKGFwaykpIHtcclxuICAgIGxvZy5kZWJ1ZyhgJyR7YXBrfScgZG9lc24ndCBleGlzdGApO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZiAodGhpcy51c2VLZXlzdG9yZSkge1xyXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY2hlY2tDdXN0b21BcGtDZXJ0KGFwaywgcGtnKTtcclxuICB9XHJcblxyXG4gIGxldCB2ZXJpZmljYXRpb25GdW5jO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBnZXRBcGtzaWduZXJGb3JPcyh0aGlzKTtcclxuICAgIHZlcmlmaWNhdGlvbkZ1bmMgPSBhc3luYyAoKSA9PiBhd2FpdCB0aGlzLmV4ZWN1dGVBcGtzaWduZXIoWyd2ZXJpZnknLCBhcGtdKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBsb2cud2FybihgQ2Fubm90IHVzZSBhcGtzaWduZXIgdG9vbCBmb3Igc2lnbmF0dXJlIHZlcmlmaWNhdGlvbi4gRGVmYXVsdGluZyB0byB2ZXJpZnkuamFyLiBgICtcclxuICAgICAgYE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICAgIGNvbnN0IGphdmEgPSBnZXRKYXZhRm9yT3MoKTtcclxuICAgIHZlcmlmaWNhdGlvbkZ1bmMgPSBhc3luYyAoKSA9PiBhd2FpdCBleGVjKGphdmEsIFsnLWphcicsIHBhdGgucmVzb2x2ZSh0aGlzLmhlbHBlckphclBhdGgsICd2ZXJpZnkuamFyJyksIGFwa10pO1xyXG4gIH1cclxuICB0cnkge1xyXG4gICAgYXdhaXQgdmVyaWZpY2F0aW9uRnVuYygpO1xyXG4gICAgbG9nLmRlYnVnKGAnJHthcGt9JyBpcyBhbHJlYWR5IHNpZ25lZC5gKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5kZWJ1ZyhgJyR7YXBrfScgaXMgbm90IHNpZ25lZCB3aXRoIGRlYnVnIGNlcnQuYCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBhcHAgaXMgYWxyZWFkeSBzaWduZWQgd2l0aCBhIGN1c3RvbSBjZXJ0aWZpY2F0ZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGxvY2FsIGFwayBmaWxlLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGdrIC0gVGhlIG5hbWUgb2YgYXBwbGljYXRpb24gcGFja2FnZS5cclxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBnaXZlbiBhcHBsaWNhdGlvbiBpcyBhbHJlYWR5IHNpZ25lZCB3aXRoIGEgY3VzdG9tIGNlcnRpZmljYXRlLlxyXG4gKi9cclxuYXBrU2lnbmluZ01ldGhvZHMuY2hlY2tDdXN0b21BcGtDZXJ0ID0gYXN5bmMgZnVuY3Rpb24gKGFwaywgcGtnKSB7XHJcbiAgbG9nLmRlYnVnKGBDaGVja2luZyBjdXN0b20gYXBwIGNlcnQgZm9yICR7YXBrfWApO1xyXG4gIGxldCBoID0gXCJhLWZBLUYwLTlcIjtcclxuICBsZXQgbWQ1U3RyID0gW2AuKk1ENS4qKCg/Olske2h9XXsyfTopezE1fVske2h9XXsyfSlgXTtcclxuICBsZXQgbWQ1ID0gbmV3IFJlZ0V4cChtZDVTdHIsICdtaScpO1xyXG4gIGxldCBqYXZhSG9tZSA9IGdldEphdmFIb21lKCk7XHJcbiAgbGV0IGtleXRvb2wgPSBwYXRoLnJlc29sdmUoamF2YUhvbWUsICdiaW4nLCBga2V5dG9vbCR7c3lzdGVtLmlzV2luZG93cygpID8gJy5leGUnIDogJyd9YCk7XHJcbiAgbGV0IGtleXN0b3JlSGFzaCA9IGF3YWl0IHRoaXMuZ2V0S2V5c3RvcmVNZDUoa2V5dG9vbCwgbWQ1KTtcclxuICByZXR1cm4gYXdhaXQgdGhpcy5jaGVja0Fwa0tleXN0b3JlTWF0Y2goa2V5dG9vbCwgbWQ1LCBrZXlzdG9yZUhhc2gsIHBrZywgYXBrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE1ENSBoYXNoIG9mIHRoZSBrZXlzdG9yZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleXRvb2wgLSBUaGUgbmFtZSBvZiB0aGUga2V5dG9vbCB1dGlsaXR5LlxyXG4gKiBAcGFyYW0ge1JlZ0V4cH0gbWQ1cmUgLSBUaGUgcGF0dGVybiB1c2VkIHRvIG1hdGNoIHRoZSByZXN1bHQgaW4gX2tleXRvb2xfIG91dHB1dC5cclxuICogQHJldHVybiB7P3N0cmluZ30gS2V5c3RvcmUgTUQ1IGhhc2ggb3IgX251bGxfIGlmIHRoZSBoYXNoIGNhbm5vdCBiZSBwYXJzZWQuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBnZXR0aW5nIGtleXN0b3JlIE1ENSBoYXNoIGZhaWxzLlxyXG4gKi9cclxuYXBrU2lnbmluZ01ldGhvZHMuZ2V0S2V5c3RvcmVNZDUgPSBhc3luYyBmdW5jdGlvbiAoa2V5dG9vbCwgbWQ1cmUpIHtcclxuICBsb2cuZGVidWcoXCJQcmludGluZyBrZXlzdG9yZSBtZDUuXCIpO1xyXG4gIHRyeSB7XHJcbiAgICBsZXQge3N0ZG91dH0gPSBhd2FpdCBleGVjKGtleXRvb2wsIFsnLXYnLCAnLWxpc3QnLFxyXG4gICAgICAnLWFsaWFzJywgdGhpcy5rZXlBbGlhcyxcclxuICAgICAgJy1rZXlzdG9yZScsIHRoaXMua2V5c3RvcmVQYXRoLFxyXG4gICAgICAnLXN0b3JlcGFzcycsIHRoaXMua2V5c3RvcmVQYXNzd29yZF0pO1xyXG4gICAgbGV0IGtleXN0b3JlSGFzaCA9IG1kNXJlLmV4ZWMoc3Rkb3V0KTtcclxuICAgIGtleXN0b3JlSGFzaCA9IGtleXN0b3JlSGFzaCA/IGtleXN0b3JlSGFzaFsxXSA6IG51bGw7XHJcbiAgICBsb2cuZGVidWcoYEtleXN0b3JlIE1ENTogJHtrZXlzdG9yZUhhc2h9YCk7XHJcbiAgICByZXR1cm4ga2V5c3RvcmVIYXNoO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGxvZy5lcnJvckFuZFRocm93KGBnZXRLZXlzdG9yZU1kNSBmYWlsZWQuIE9yaWdpbmFsIGVycm9yOiAke2UubWVzc2FnZX1gKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIE1ENSBoYXNoIG9mIHRoZSBwYXJ0aWN1bGFyIGFwcGxpY2F0aW9uIG1hdGNoZXMgdG8gdGhlIGdpdmVuIGhhc2guXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXl0b29sIC0gVGhlIG5hbWUgb2YgdGhlIGtleXRvb2wgdXRpbGl0eS5cclxuICogQHBhcmFtIHtSZWdFeHB9IG1kNXJlIC0gVGhlIHBhdHRlcm4gdXNlZCB0byBtYXRjaCB0aGUgcmVzdWx0IGluIF9rZXl0b29sXyBvdXRwdXQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlzdG9yZUhhc2ggLSBUaGUgZXhwZWN0ZWQgaGFzaCB2YWx1ZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHBrZyAtIFRoZSBuYW1lIG9mIHRoZSBpbnN0YWxsZWQgcGFja2FnZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IGFwayAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGV4aXN0aW5nIGFwayBmaWxlLlxyXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGJvdGggaGFzaGVzIGFyZSBlcXVhbC5cclxuICogQHRocm93cyB7RXJyb3J9IElmIGdldHRpbmcga2V5c3RvcmUgTUQ1IGhhc2ggZmFpbHMuXHJcbiAqL1xyXG5hcGtTaWduaW5nTWV0aG9kcy5jaGVja0Fwa0tleXN0b3JlTWF0Y2ggPSBhc3luYyBmdW5jdGlvbiAoa2V5dG9vbCwgbWQ1cmUsIGtleXN0b3JlSGFzaCxcclxuICAgIHBrZywgYXBrKSB7XHJcbiAgbGV0IGVudHJ5SGFzaCA9IG51bGw7XHJcbiAgbGV0IHJzYSA9IC9eTUVUQS1JTkZcXC8uKlxcLltyUl1bc1NdW2FBXSQvO1xyXG4gIGxldCBmb3VuZEtleXN0b3JlTWF0Y2ggPSBmYWxzZTtcclxuXHJcbiAgLy9mb3IgKGxldCBlbnRyeSBvZiBlbnRyaWVzKSB7XHJcbiAgYXdhaXQgemlwLnJlYWRFbnRyaWVzKGFwaywgYXN5bmMgKHtlbnRyeSwgZXh0cmFjdEVudHJ5VG99KSA9PiB7XHJcbiAgICBlbnRyeSA9IGVudHJ5LmZpbGVOYW1lO1xyXG4gICAgaWYgKCFyc2EudGVzdChlbnRyeSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbG9nLmRlYnVnKGBFbnRyeTogJHtlbnRyeX1gKTtcclxuICAgIGxldCBlbnRyeVBhdGggPSBwYXRoLmpvaW4odGhpcy50bXBEaXIsIHBrZywgJ2NlcnQnKTtcclxuICAgIGxvZy5kZWJ1ZyhgZW50cnlQYXRoOiAke2VudHJ5UGF0aH1gKTtcclxuICAgIGxldCBlbnRyeUZpbGUgPSBwYXRoLmpvaW4oZW50cnlQYXRoLCBlbnRyeSk7XHJcbiAgICBsb2cuZGVidWcoYGVudHJ5RmlsZTogJHtlbnRyeUZpbGV9YCk7XHJcbiAgICAvLyBlbnN1cmUgL3RtcC9wa2cvY2VydC8gZG9lc24ndCBleGlzdCBvciBleHRyYWN0IHdpbGwgZmFpbC5cclxuICAgIGF3YWl0IGZzLnJpbXJhZihlbnRyeVBhdGgpO1xyXG4gICAgLy8gTUVUQS1JTkYvQ0VSVC5SU0FcclxuICAgIGF3YWl0IGV4dHJhY3RFbnRyeVRvKGVudHJ5UGF0aCk7XHJcbiAgICBsb2cuZGVidWcoXCJleHRyYWN0ZWQhXCIpO1xyXG4gICAgLy8gY2hlY2sgZm9yIG1hdGNoXHJcbiAgICBsb2cuZGVidWcoXCJQcmludGluZyBhcGsgbWQ1LlwiKTtcclxuICAgIGxldCB7c3Rkb3V0fSA9IGF3YWl0IGV4ZWMoa2V5dG9vbCwgWyctdicsICctcHJpbnRjZXJ0JywgJy1maWxlJywgZW50cnlGaWxlXSk7XHJcbiAgICBlbnRyeUhhc2ggPSBtZDVyZS5leGVjKHN0ZG91dCk7XHJcbiAgICBlbnRyeUhhc2ggPSBlbnRyeUhhc2ggPyBlbnRyeUhhc2hbMV0gOiBudWxsO1xyXG4gICAgbG9nLmRlYnVnKGBlbnRyeUhhc2ggTUQ1OiAke2VudHJ5SGFzaH1gKTtcclxuICAgIGxvZy5kZWJ1Zyhga2V5c3RvcmUgTUQ1OiAke2tleXN0b3JlSGFzaH1gKTtcclxuICAgIGxldCBtYXRjaGVzS2V5c3RvcmUgPSBlbnRyeUhhc2ggJiYgZW50cnlIYXNoID09PSBrZXlzdG9yZUhhc2g7XHJcbiAgICBsb2cuZGVidWcoYE1hdGNoZXMga2V5c3RvcmU/ICR7bWF0Y2hlc0tleXN0b3JlfWApO1xyXG5cclxuICAgIC8vIElmIHdlIGhhdmUgYSBrZXlzdG9yZSBtYXRjaCwgc3RvcCBpdGVyYXRpbmdcclxuICAgIGlmIChtYXRjaGVzS2V5c3RvcmUpIHtcclxuICAgICAgZm91bmRLZXlzdG9yZU1hdGNoID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBmb3VuZEtleXN0b3JlTWF0Y2g7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcGtTaWduaW5nTWV0aG9kcztcclxuIl0sInNvdXJjZVJvb3QiOiIuLlxcLi5cXC4uIn0=
