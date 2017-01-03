'use strict';

//	main app object
var orient = {};

//	angle-orientation correspondence
orient.angles = {
	"-90" : "landscape",
	"0" : "portrait",
	"90" : "landscape", 
	"180" : "portrait", 
};

//	colour codes for each browser
orient.colors = {
	'IE' : '56, 88, 132',
	'Edge' : '56, 88, 132',
	'Firefox' : '163, 98, 35',
	'Chrome' : '63, 119, 187',
	'Safari' : '102, 102, 102',
	'Opera' : '129, 35, 35',
	'iOS Safari' : '333',
	'Opera Mini' : '153, 38, 38',
	'Android Browser' : '123, 161, 59',
	'Blackberry Browser' : '17, 17, 17',
	'Opera Mobile' : '153, 38, 38',
	'Chrome for Android' : '63, 119, 187',
	'Firefox for Android' : '163, 98, 35',
	'IE Mobile' : '56, 88, 132',
	'UC Browser for Android' : '255, 102, 0',
	'Samsung Internet' : '151, 83, 255'
};

//	check browser type
var checkBrowser = function() {
	var ua = navigator.userAgent, tem,
	M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])){
		return 'IE';
	}
	if (M[1]=== 'Chrome') {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if (tem !== null) {
			return tem.slice(1)[0].replace('OPR', 'Opera');
		}
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem= ua.match(/version\/(\d+)/i)) !== null) {
		M.splice(1, 1, tem[1]);
	}
	return M[0];
};

//	timed-out function to wait in case multiple rotations occur
var waitingForDeviceOrientation;

//	function to call when device is moved
var deviceOrientationListener = function() {
	clearTimeout(waitingForDeviceOrientation);
	waitingForDeviceOrientation = setTimeout(function() {

		//	check orientation
		var orientation;
		if (typeof window.screen.orientation !== 'undefined') {
			orientation = window.screen.orientation.type.split('-')[0];
		} else if (typeof window.orientation !== 'undefined') {
			orientation = orient.angles[window.orientation.toString()];
		} else {
			console.log('Orientation couldn\'t be detected.');
			orientation = null;
		}

		//	check angle returned by window object against preferred orientation and change backdrop display accordingly
		if (orientation === orient.preferredOrientation) {
			orient.backdrop.style.display = 'none';
		} else {
			orient.backdrop.style.display = 'block';
		}
	}, 300);
};

//	
orient.init = function(preferredOrientation) {
	//	backdrop DOM element
	orient.backdrop = document.createElement('div');
	orient.backdrop.id = 'orientBackdrop';
	orient.backdrop.innerHTML = '<div id="backdropText">This site\'s been optimised for <span id="preferred"></span> view, please hold your device in that position to make the most of our design.</div>';
	document.body.appendChild(orient.backdrop);

	//	set backdrop colour based on browser
	var browser = checkBrowser();
	orient.backdrop.style['background-color'] = 'rgba(' + orient.colors[browser] + ', 0.85)';

	//	set backdrop text based on passed preference of orientation
	document.getElementById('preferred').innerHTML = preferredOrientation;

	//	add preferred orientation to main app object and check orientation
	orient.preferredOrientation = preferredOrientation;
	deviceOrientationListener();								//	checks if orientation is the preferred one
	window.onorientationchange = deviceOrientationListener;		//	checks the same for each change in orientation~
};