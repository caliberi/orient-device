var OrientDevice=function(e){function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}var t={};return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},o.p="",o(o.s=1)}([function(e,o,t){"use strict";function n(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var r=function e(){n(this,e),this.module_css="#orientBackdrop{display:none;position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(51,51,51,.9);text-align:center;z-index:9999999;overflow-x:hidden;overflow-y:hidden}#backdropText{font-family:inherit;position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:4.5vw;color:#fff}",this.angles={"-90":"landscape",0:"portrait",90:"landscape",180:"portrait"},this.colours={IE:"56, 88, 132",Edge:"56, 88, 132",Firefox:"163, 98, 35",Chrome:"63, 119, 187",Safari:"102, 102, 102",Opera:"129, 35, 35","iOS Safari":"333","Opera Mini":"153, 38, 38","Android Browser":"123, 161, 59","Blackberry Browser":"17, 17, 17","Opera Mobile":"153, 38, 38","Chrome for Android":"63, 119, 187","Firefox for Android":"163, 98, 35","IE Mobile":"56, 88, 132","UC Browser for Android":"255, 102, 0","Samsung Internet":"151, 83, 255"},this.keys={37:1,38:1,39:1,40:1}};o.default=r},function(e,o,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}var r=t(0),i=n(r),a=t(2),l=n(a),d=new i.default,s=new l.default,c={},u=void 0,f={prefferedOrient:"portrait",text:{error:'<p><strong>Whoops</strong> can you please rotate your device back to <span id="preferred"></span> <em> :) </em></p>',color:"rgba(255, 255, 255, 1)"}};c.keys=d.keys,c.angles=d.angles,c.css=d.module_css,c.colours=d.colours,e.exports={init:function(e){u=void 0===e?f:e;var o=void 0===u.prefferedOrient?f.prefferedOrient:e.prefferedOrient,t=void 0===u.text.error?f.text.error:e.text.error,n=void 0===u.text.color?f.text.color:e.text.color;/Mobi/.test(navigator.userAgent)&&(window.onload=function(){var e=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",r.styleSheet?r.styleSheet.cssText=c.css:r.appendChild(document.createTextNode(c.css)),e.appendChild(r),c.backdrop=document.createElement("div"),c.backdrop.id="orientBackdrop",c.backdrop.innerHTML='<div id="backdropText">'+t+"</div>",document.body.appendChild(c.backdrop);var i=p();void 0===u.backgroundColor?c.backdrop.style["background-color"]="rgba("+c.colours[i]+", 0.95)":(console.log(u.backgroundColor),c.backdrop.style.background=u.backgroundColor),document.querySelector("#preferred")&&(document.getElementById("preferred").innerHTML=o),document.querySelector("#backdropText").style.color=n,c.preferredOrientation=o,v(),window.onorientationchange=v})}};var p=function(){var e=navigator.userAgent,o=void 0,t=e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return/trident/i.test(t[1])?"IE":"Chrome"===t[1]&&null!==(o=e.match(/\b(OPR|Edge)\/(\d+)/))?o.slice(1)[0].replace("OPR","Opera"):(t=t[2]?[t[1],t[2]]:[navigator.appName,navigator.appVersion,"-?"],null!==(o=e.match(/version\/(\d+)/i))&&t.splice(1,1,o[1]),t[0])},w=void 0,v=function(){clearTimeout(w),w=setTimeout(function(){var e=void 0;void 0!==window.screen.orientation?e=window.screen.orientation.type.split("-")[0]:void 0!==window.orientation?e=c.angles[window.orientation.toString()]:(console.log("Orientation couldn't be detected."),e=null),"undefined"===u.onRotate&&"function"==typeof u.onRotate||u.onRotate(),e===c.preferredOrientation?(c.backdrop.style.display="none",s.enableScroll()):(c.backdrop.style.display="block",c.backdrop.style.transform="translate("+window.scrollX+"px, "+window.scrollY+"px)",s.disableScroll(),"undefined"===u.onError&&"function"==typeof u.onError||u.onError())},300)}},function(e,o,t){"use strict";function n(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var r=t(0),i=function(e){return e&&e.__esModule?e:{default:e}}(r),a=new i.default,l=function e(){n(this,e),this.preventDefault=function(e){e=e||window.event,e.preventDefault&&e.preventDefault(),e.returnValue=!1},this.preventDefaultForScrollKeys=function(e){if(a.keys[e.keyCode])return preventDefault(e),!1},this.disableScroll=function(){window.addEventListener&&window.addEventListener("DOMMouseScroll",this.preventDefault,!1),window.onwheel=this.preventDefault,window.onmousewheel=document.onmousewheel=this.preventDefault,window.ontouchmove=this.preventDefault,document.onkeydown=this.preventDefaultForScrollKeys},this.enableScroll=function(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",this.preventDefault,!1),window.onmousewheel=document.onmousewheel=null,window.onwheel=null,window.ontouchmove=null,document.onkeydown=null}};o.default=l}]);