var OrientDevice =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vars = __webpack_require__(1);
	
	var _vars2 = _interopRequireDefault(_vars);
	
	var _helpers = __webpack_require__(2);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// objects
	/*
	 *
	 *    Screen Orientation API (www.w3.org/TR/screen-orientation/) is pretty new: 31 Oct 2016
	 *      so first window.screen.orientation.type is used to detect orientation;
	 *        if it's not supported, then window.orientation.
	 *
	 */
	
	var vars = new _vars2.default();
	var helpers = new _helpers2.default();
	
	// global config
	var orient = {};
	var defaultOptions = {
	  prefferedOrient: 'portrait',
	  text: {
	    error: '<p><strong>Whoops</strong> can you please rotate your device back to <span id="preferred"></span> <em> :) </em></p>',
	    color: 'rgba(255, 255, 255, 1)'
	  }
	};
	
	orient.keys = vars.keys;
	orient.angles = vars.angles;
	orient.css = vars.module_css;
	orient.colours = vars.colours;
	
	// plugin now acts as library OrientDevice.init();
	module.exports = {
	  init: function init(config) {
	
	    // if no config object is passed
	    var options = typeof config === 'undefined' ? defaultOptions : config;
	
	    // start if some of the options are passed
	    var preferredOrientation = typeof options.prefferedOrient === 'undefined' ? defaultOptions.prefferedOrient : config.prefferedOrient;
	    var text_error = typeof options.text.error === 'undefined' ? defaultOptions.text.error : config.text.error;
	    var text_color = typeof options.text.color === 'undefined' ? defaultOptions.text.color : config.text.color;
	
	    //  run only if device is mobile
	    if (/Mobi/.test(navigator.userAgent)) {
	      //  backdrop DOM element
	      window.onload = function () {
	
	        var head = document.head || document.getElementsByTagName('head')[0];
	
	        // create style tag
	        var style = document.createElement('style');
	
	        // attribute text/css
	        style.type = 'text/css';
	
	        // more browser support
	        if (style.styleSheet) {
	          style.styleSheet.cssText = orient.css;
	        } else {
	          style.appendChild(document.createTextNode(orient.css));
	        }
	
	        // append style tag with all the css
	        head.appendChild(style);
	
	        orient.backdrop = document.createElement('div');
	        orient.backdrop.id = 'orientBackdrop';
	        orient.backdrop.innerHTML = '<div id="backdropText">' + text_error + '</div>';
	        document.body.appendChild(orient.backdrop);
	
	        //  set backdrop colour based on browser
	        var browser = checkBrowser();
	        if (typeof options.backgroundColor === 'undefined') {
	          orient.backdrop.style['background-color'] = 'rgba(' + orient.colours[browser] + ', 0.95)';
	        } else {
	          console.log(options.backgroundColor);
	          orient.backdrop.style.background = options.backgroundColor;
	        }
	
	        //  set backdrop text based on passed preference of orientation
	        var preferred = document.querySelector('#preferred');
	        if (preferred) {
	          document.getElementById('preferred').innerHTML = preferredOrientation;
	        }
	
	        // apply color to text
	        document.querySelector('#backdropText').style.color = text_color;
	
	        //  add preferred orientation to main app object and check orientation
	        orient.preferredOrientation = preferredOrientation;
	        deviceOrientationListener(); //  checks if orientation is the preferred one
	        window.onorientationchange = deviceOrientationListener; //  checks the same for each change in orientation~
	      };
	    }
	  }
	};
	
	/*
	 ** Core functions below
	 */
	
	//  check browser type
	var checkBrowser = function checkBrowser() {
	  var ua = navigator.userAgent,
	      tem = void 0,
	      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	  if (/trident/i.test(M[1])) {
	    return 'IE';
	  }
	  if (M[1] === 'Chrome') {
	    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
	    if (tem !== null) {
	      return tem.slice(1)[0].replace('OPR', 'Opera');
	    }
	  }
	  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	  if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
	    M.splice(1, 1, tem[1]);
	  }
	  return M[0];
	};
	
	//  timed-out function to wait in case multiple rotations occur
	var waitingForDeviceOrientation = void 0;
	
	//  function to call when device is moved
	var deviceOrientationListener = function deviceOrientationListener() {
	  clearTimeout(waitingForDeviceOrientation);
	  waitingForDeviceOrientation = setTimeout(function () {
	
	    //  check orientation
	    var orientation = void 0;
	    if (typeof window.screen.orientation !== 'undefined') {
	      orientation = window.screen.orientation.type.split('-')[0];
	    } else if (typeof window.orientation !== 'undefined') {
	      orientation = orient.angles[window.orientation.toString()];
	    } else {
	      console.log('Orientation couldn\'t be detected.');
	      orientation = null;
	    }
	
	    //  check angle returned by window object against preferred orientation and change backdrop display accordingly
	    if (orientation === orient.preferredOrientation) {
	      orient.backdrop.style.display = 'none';
	      helpers.enableScroll();
	    } else {
	      orient.backdrop.style.display = 'block';
	      orient.backdrop.style.transform = 'translate(' + window.scrollX + 'px, ' + window.scrollY + 'px)';
	      helpers.disableScroll();
	    }
	  }, 300);
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Vars = function Vars() {
	  _classCallCheck(this, Vars);
	
	  this.module_css = '#orientBackdrop{display:none;position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(51,51,51,.9);text-align:center;z-index:9999999;overflow-x:hidden;overflow-y:hidden}#backdropText{font-family:inherit;position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:4.5vw;color:#fff}';
	
	  this.angles = {
	    "-90": "landscape",
	    "0": "portrait",
	    "90": "landscape",
	    "180": "portrait"
	  };
	
	  this.colours = {
	    'IE': '56, 88, 132',
	    'Edge': '56, 88, 132',
	    'Firefox': '163, 98, 35',
	    'Chrome': '63, 119, 187',
	    'Safari': '102, 102, 102',
	    'Opera': '129, 35, 35',
	    'iOS Safari': '333',
	    'Opera Mini': '153, 38, 38',
	    'Android Browser': '123, 161, 59',
	    'Blackberry Browser': '17, 17, 17',
	    'Opera Mobile': '153, 38, 38',
	    'Chrome for Android': '63, 119, 187',
	    'Firefox for Android': '163, 98, 35',
	    'IE Mobile': '56, 88, 132',
	    'UC Browser for Android': '255, 102, 0',
	    'Samsung Internet': '151, 83, 255'
	  };
	
	  this.keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
	};
	
	exports.default = Vars;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vars = __webpack_require__(1);
	
	var _vars2 = _interopRequireDefault(_vars);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var vars = new _vars2.default();
	
	var Helpers = function Helpers() {
	    _classCallCheck(this, Helpers);
	
	    this.preventDefault = function (e) {
	        e = e || window.event;
	        if (e.preventDefault) e.preventDefault();
	        e.returnValue = false;
	    };
	
	    //  prevent default behaviour for scroll keys
	    this.preventDefaultForScrollKeys = function (e) {
	        if (vars.keys[e.keyCode]) {
	            preventDefault(e);
	            return false;a;
	        }
	    };
	
	    //  function to call to disable scrolling
	    this.disableScroll = function () {
	        if (window.addEventListener) // older FF
	            window.addEventListener('DOMMouseScroll', this.preventDefault, false);
	        window.onwheel = this.preventDefault; // modern standard
	        window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
	        window.ontouchmove = this.preventDefault; // mobile
	        document.onkeydown = this.preventDefaultForScrollKeys;
	    };
	
	    //  this.for reenabling scrolling
	    this.enableScroll = function () {
	        if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
	        window.onmousewheel = document.onmousewheel = null;
	        window.onwheel = null;
	        window.ontouchmove = null;
	        document.onkeydown = null;
	    };
	};
	
	exports.default = Helpers;

/***/ })
/******/ ]);
//# sourceMappingURL=orient.js.map