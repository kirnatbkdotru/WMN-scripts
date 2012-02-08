/**********************************************************
Comcast
**********************************************************/
var name="Comcast";
var ver="2010-07-26";
var hostString="comcast.net";

function init(){  
  this.loginData=["https://login.comcast.net/login","user","passwd","s=smartzone"];
}
function getIconURL(){
  return "http://smartzone.mail.comcast.net/zimbra/img/logo/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/"name":"Inbox"(.+?"u":(\d+))?/);
  if(fnd){  
    return fnd[2]?fnd[2]:0;
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    this.dataURL=this.channel.URI.spec;
    this.mailURL=this.dataURL;
    this.stage=ST_DATA_RES;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}