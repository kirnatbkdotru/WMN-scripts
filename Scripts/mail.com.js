/***********************************************************
mail.com
***********************************************************/
var name="mail.com";
var ver="2011-10-12";
var hostString="mail.com";
var supportInboxOnly=true;

function init(){
  this.initStage=ST_PRE;
  this.loginData=["https://service.mail.com/login.html","login","password","rdirurl=http%3A%2F%2Fwww.mail.com%2Fint%2F"];
  this.dataURL="http://www.mail.com/";
  this.mailURL="https://service.mail.com/mail.html";
  this.mailDomain="service.mail.com";
  this.logoutURL="http://service.mail.com/logout.html";  
  this.cookieDomain="mail.com";  
}
function getIconURL(){
  return "http://www.mail.com/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/"permanentId":"inbox","read":(\d+),.+?"total":(\d+),"type":"inbox"/);
  if(fnd){
    return parseInt(fnd[2])-parseInt(fnd[1]);
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.stage=ST_LOGIN;
    this.getHtml("http://www.mail.com/");
    return true;
  case ST_LOGIN_RES:
    var fnd=aData.match(/authToken\s+?:\s+?"(\S+?)"[\S\s]+?rms\s+?:\s+?"(\S+?)"/);
    if(fnd){   
      this.dataURL="http://service.mail.com/callgate-"+fnd[2]+"/rms/"+fnd[2]+"/folder/list?X-UI-JSON=javascript&Authorization="+encodeURIComponent(fnd[1])+"&nocache=";
      this.stage=ST_DATA;
    }else break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
