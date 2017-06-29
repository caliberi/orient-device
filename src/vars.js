export default class Vars {
  constructor() {
    this.module_css = '#orientBackdrop{display:none;position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(51,51,51,.9);text-align:center;z-index:9999999;overflow-x:hidden;overflow-y:hidden}#backdropText{font-family:inherit;position:absolute;top:50%;left:50%;-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);font-size:4.5vw;color:#fff}'
    
    this.angles = {
      "-90" : "landscape",
      "0" : "portrait",
      "90" : "landscape", 
      "180" : "portrait", 
    }

    this.colours = {
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
    }

    this.keys = {37: 1, 38: 1, 39: 1, 40: 1}
  }
}