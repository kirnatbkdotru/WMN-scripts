/***********************************************************
Tistory
***********************************************************/
var name="Tistory";
var ver="2010-02-24";
var needServer=true;

function init(){
  initUpdateHandler(this);
  this.initStage=ST_LOGIN;
  this.loginData=["http://"+this.server+"/login?requestURI=http%3A%2F%2F"+this.server+"%2Fowner%2Fcenter%2Fdashboard",
                      "loginid","password","requestURI=http%3A%2F%2F"+this.server+"%2Fowner%2Fcenter%2Fdashboard&goDaum=false"];

  this.dataURL="http://"+this.server+"/owner/center/dashboard";
  this.mailURL="http://"+this.server+"/admin";

  this.start="<table class=\"comment\">";
  this.end="<!-- new end -->";
}
function getIconURL(){
  return "http://www.tistory.com/favicon.ico";
}

