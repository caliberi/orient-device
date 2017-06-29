import Vars from './vars.js';
const vars = new Vars();

export default class Helpers {
  constructor() {

    this.preventDefault = function(e){
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }

    //  prevent default behaviour for scroll keys
    this.preventDefaultForScrollKeys = function(e) {
        if (vars.keys[e.keyCode]) {
            preventDefault(e);
            return false;a
        }
    }

    //  function to call to disable scrolling
    this.disableScroll= function() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', this.preventDefault, false);
      window.onwheel = this.preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
      window.ontouchmove  = this.preventDefault; // mobile
      document.onkeydown  = this.preventDefaultForScrollKeys;
    }

    //  this.for reenabling scrolling
    this.enableScroll= function() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }
  }
}