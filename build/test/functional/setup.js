// https://developer.android.com/guide/topics/manifest/uses-sdk-element.html
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var API_LEVEL_MAP = {
  '4.1': '16',
  '4.2': '17',
  '4.3': '18',
  '4.4': '19',
  '5': '21',
  '5.1': '22',
  '6': '23',
  '7': '24',
  '7.1': '25'
};

var avdName = process.env.ANDROID_AVD || 'NEXUS_S_18_X86';
var platformVersion = process.env.PLATFORM_VERSION || '4.3';

var apiLevel = process.env.API_LEVEL || API_LEVEL_MAP[parseFloat(platformVersion).toString()];
exports.apiLevel = apiLevel = parseInt(apiLevel, 10);

var MOCHA_TIMEOUT = process.env.TRAVIS ? 240000 : 60000;
var MOCHA_LONG_TIMEOUT = MOCHA_TIMEOUT * 10;

exports.apiLevel = apiLevel;
exports.platformVersion = platformVersion;
exports.avdName = avdName;
exports.MOCHA_TIMEOUT = MOCHA_TIMEOUT;
exports.MOCHA_LONG_TIMEOUT = MOCHA_LONG_TIMEOUT;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9zZXR1cC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFNLGFBQWEsR0FBRztBQUNwQixPQUFLLEVBQUUsSUFBSTtBQUNYLE9BQUssRUFBRSxJQUFJO0FBQ1gsT0FBSyxFQUFFLElBQUk7QUFDWCxPQUFLLEVBQUUsSUFBSTtBQUNYLEtBQUcsRUFBRSxJQUFJO0FBQ1QsT0FBSyxFQUFFLElBQUk7QUFDWCxLQUFHLEVBQUUsSUFBSTtBQUNULEtBQUcsRUFBRSxJQUFJO0FBQ1QsT0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDOztBQUVGLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLGdCQUFnQixDQUFDO0FBQzVELElBQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksS0FBSyxDQUFDOztBQUU5RCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFDckIsYUFBYSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3JFLFFBS1MsUUFBUSxHQUxqQixRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFbEMsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUN4RCxJQUFJLGtCQUFrQixHQUFHLGFBQWEsR0FBRyxFQUFFLENBQUM7O1FBRW5DLFFBQVEsR0FBUixRQUFRO1FBQUUsZUFBZSxHQUFmLGVBQWU7UUFBRSxPQUFPLEdBQVAsT0FBTztRQUFFLGFBQWEsR0FBYixhQUFhO1FBQUUsa0JBQWtCLEdBQWxCLGtCQUFrQiIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvc2V0dXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9ndWlkZS90b3BpY3MvbWFuaWZlc3QvdXNlcy1zZGstZWxlbWVudC5odG1sXHJcbmNvbnN0IEFQSV9MRVZFTF9NQVAgPSB7XHJcbiAgJzQuMSc6ICcxNicsXHJcbiAgJzQuMic6ICcxNycsXHJcbiAgJzQuMyc6ICcxOCcsXHJcbiAgJzQuNCc6ICcxOScsXHJcbiAgJzUnOiAnMjEnLFxyXG4gICc1LjEnOiAnMjInLFxyXG4gICc2JzogJzIzJyxcclxuICAnNyc6ICcyNCcsXHJcbiAgJzcuMSc6ICcyNScsXHJcbn07XHJcblxyXG5jb25zdCBhdmROYW1lID0gcHJvY2Vzcy5lbnYuQU5EUk9JRF9BVkQgfHwgJ05FWFVTX1NfMThfWDg2JztcclxuY29uc3QgcGxhdGZvcm1WZXJzaW9uID0gcHJvY2Vzcy5lbnYuUExBVEZPUk1fVkVSU0lPTiB8fCAnNC4zJztcclxuXHJcbmxldCBhcGlMZXZlbCA9IHByb2Nlc3MuZW52LkFQSV9MRVZFTCB8fFxyXG4gICAgICAgICAgICAgICBBUElfTEVWRUxfTUFQW3BhcnNlRmxvYXQocGxhdGZvcm1WZXJzaW9uKS50b1N0cmluZygpXTtcclxuYXBpTGV2ZWwgPSBwYXJzZUludChhcGlMZXZlbCwgMTApO1xyXG5cclxubGV0IE1PQ0hBX1RJTUVPVVQgPSBwcm9jZXNzLmVudi5UUkFWSVMgPyAyNDAwMDAgOiA2MDAwMDtcclxubGV0IE1PQ0hBX0xPTkdfVElNRU9VVCA9IE1PQ0hBX1RJTUVPVVQgKiAxMDtcclxuXHJcbmV4cG9ydCB7IGFwaUxldmVsLCBwbGF0Zm9ybVZlcnNpb24sIGF2ZE5hbWUsIE1PQ0hBX1RJTUVPVVQsIE1PQ0hBX0xPTkdfVElNRU9VVCB9O1xyXG4iXSwic291cmNlUm9vdCI6Ii4uXFwuLlxcLi4ifQ==
