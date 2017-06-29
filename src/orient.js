/*
 *
 *    Screen Orientation API (www.w3.org/TR/screen-orientation/) is pretty new: 31 Oct 2016
 *      so first window.screen.orientation.type is used to detect orientation;
 *        if it's not supported, then window.orientation.
 *
 */

import Vars from './vars.js';
import Helpers from './helpers.js';

// objects
const vars = new Vars();
const helpers = new Helpers();

// global config
let orient = {};
let defaultOptions = {
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
  init: function(config) {

    // if no config object is passed
    let options = typeof config === 'undefined' ? defaultOptions : config;

    // start if some of the options are passed
    let preferredOrientation = typeof options.prefferedOrient === 'undefined' ? defaultOptions.prefferedOrient : config.prefferedOrient;
    let text_error = typeof options.text.error === 'undefined' ? defaultOptions.text.error : config.text.error;
    let text_color = typeof options.text.color === 'undefined' ? defaultOptions.text.color : config.text.color;

    //  run only if device is mobile
    if (/Mobi/.test(navigator.userAgent)) {
      //  backdrop DOM element
      window.onload = function() {

        let head = document.head || document.getElementsByTagName('head')[0];

        // create style tag
        let style = document.createElement('style');

        // attribute text/css
        style.type = 'text/css';

        // more browser support
        if (style.styleSheet){
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
        let browser = checkBrowser();
        if(typeof options.backgroundColor === 'undefined') {
          orient.backdrop.style['background-color'] = 'rgba(' + orient.colours[browser] + ', 0.95)';
        } else {
          console.log(options.backgroundColor);
          orient.backdrop.style.background = options.backgroundColor;
        }

        //  set backdrop text based on passed preference of orientation
        let preferred = document.querySelector('#preferred');
        if(preferred) {
           document.getElementById('preferred').innerHTML = preferredOrientation;
        }
       

        // apply color to text
        document.querySelector('#backdropText').style.color = text_color;

        //  add preferred orientation to main app object and check orientation
        orient.preferredOrientation = preferredOrientation;
        deviceOrientationListener(); //  checks if orientation is the preferred one
        window.onorientationchange = deviceOrientationListener; //  checks the same for each change in orientation~
      }
    }
  }
};

/*
 ** Core functions below
 */

//  check browser type
let checkBrowser = function() {
  let ua = navigator.userAgent,
    tem,
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
let waitingForDeviceOrientation;

//  function to call when device is moved
let deviceOrientationListener = function() {
  clearTimeout(waitingForDeviceOrientation);
  waitingForDeviceOrientation = setTimeout(function() {

    //  check orientation
    let orientation;
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
