/***********************************************************
@YouTube
  @author: Kiryanov Nikolay kirn@bk.ru
***********************************************************/
var name = "YouTube";
var ver	 = "2011-09-08";

function init(){
	this.initStage	= ST_PRE;
	this.dataURL	= "http://www.youtube.com/";
	this.loginData	= ["https://www.google.com/accounts/ServiceLoginAuth",
                    "Email", "Passwd",
					"service=youtube&"+
					"continue=" + encodeURIComponent("http://www.youtube.com/signin?action_handle_signin=true")];
	this.mailURL	= "http://www.youtube.com/inbox#inbox";
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
	this.getHtml("https://www.google.com/accounts/ServiceLoginAuth");
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

function getIconURL(){
  return "http://s.ytimg.com/yt/favicon-vflZlzSbU.ico";
}

function getCount(aData){
	var fnd = aData.match(/<img class="master-sprite.+?(\d+)<\/a>/);
	return fnd?(fnd[1]):0;
	}