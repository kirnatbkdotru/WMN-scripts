/**********************************************************
SFR.fr
**********************************************************/
var name="SFR.fr";
var ver="2012-01-25";

function init(){  
  this.initStage=ST_PRE;
	this.loginData=["https://www.sfr.fr/cas/login?domain=webmessagerie","username","password","_eventId=submit&remember-me=on"];
	this.dataURL="http://messagerie.sfr.fr/webmail/xml/getFolderList.xml";
  this.mailURL="http://messagerie.sfr.fr/";
}
function getIconURL(){
	return "http://img.s-sfr.fr/elements/favicon.ico";
}
function getCount(aData){
	var fnd = aData.match(/<unreadMessage>(\d+)<\/unreadMessage>/);
	return fnd?fnd[1]:-1;
}
function checkLogin(aData,aHttpChannel){
  switch(this.stage){
  case ST_CHECK:
    this.getHtml("http://messagerie.sfr.fr/");
    return false;
  case ST_CHECK+1:
    var fnd=aData.match(/id="loginForm"/);
    if(!fnd){//logged in
      this.stage=ST_LOGIN_RES+1;
      return this.process(aHttpChannel,aData);
    }else{
      this.cookieManager.clear();
      this.stage=this.initStage;
      return this.process(null,"");
    }
  }
  this.onError();
  return true;
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://www.sfr.fr/cas/login");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/name="lt"\s+value="(\S+?)"/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&lt="+encodeURIComponent(fnd[1]));
      return false;
    }
    break;
  case ST_LOGIN_RES:  
    this.getHtml("http://messagerie.sfr.fr/");
    return false;
  case ST_LOGIN_RES+1:  
    this.mailURL="http://"+this.channel.URI.host+"/";
    this.dataURL=this.mailURL+"webmail/xml/getFolderList.xml";
    this.stage=ST_DATA;
    break;    
  }
  return this.baseProcess(aHttpChannel, aData);
}
