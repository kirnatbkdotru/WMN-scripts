/***********************************************************
@Google+
  @author: Kiryanov Nikolay kirn@bk.ru
***********************************************************/
var name = "Google+";
var ver	 = "2011-09-10";

function init(){
	this.initStage=ST_PRE;
	this.dataURL	= "https://plus.google.com/u/0/_/n/guc";
	this.loginData	= ["https://accounts.google.com/accounts/ServiceLoginAuth",
                    "Email", "Passwd",
                    "continue=" + encodeURIComponent(this.dataURL)];
	this.mailURL	= "https://plus.google.com/u/0/notifications/all";
}

function getIconURL(){
  return "http://ssl.gstatic.com/s2/oz/images/favicon.ico";
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
	this.getHtml("https://accounts.google.com/accounts/ServiceLoginAuth");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/GALX[\s\S]+?value=\"(\S+?)\"/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&GALX="+encodeURIComponent(fnd[1]));
      return false;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}

function getCount(aData){
	return JSON.parse(aData.substr(4))[1];
}
