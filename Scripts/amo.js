/**********************************************************
AMO
  username : addon name
  password : addon number

  @require:lib-update.js
**********************************************************/
var name="AMO";
var ver="2010-02-09";

function init(){
  initUpdateHandler(this);
  this.period=this.main.timerDelay*3;  
  this.dataURL="https://addons.mozilla.org/en-US/firefox/addon/"+this.password;
  this.mailURL=this.dataURL;
  this.cache=2;
  this.start="id=\"reviews\"";
  this.end="role=\"secondary\"";
}
