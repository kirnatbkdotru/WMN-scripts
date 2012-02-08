/**********************************************************
Rediff
**********************************************************/
var name="Rediff";
var ver="2010-11-20";
var hostString="";

function init(){
  this.loginData=["https://mail.rediff.com/cgi-bin/login.cgi","login","passwd","seclogin=on&FormName=existing"];
  this.dataURL="http://mail.rediff.com/cgi-bin/login.cgi";
  this.mailURL="http://mail.rediff.com/cgi-bin/login.cgi";
}
function getIconURL(){
  return "http://mail.rediff.com/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/'newmessages':'(\d+)'/);
  if(fnd)return fnd[1];
  fnd=aData.match(/newmailcount='(\d+)'/);
  if(fnd){
    return fnd[1];
  }else{
    fnd=aData.match(/\((\d+) new\)/);
    if(fnd){
      return fnd[1];
    }else return -1;
  }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES: 
    var fnd=aData.match(/url=(\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1]);
      return false;
    }
    break;
  case ST_LOGIN_RES+1:
    var fnd=aData.match(/href="(\S+?\/prism\/maillist\S+?)"/);
    if(fnd){
      this.mailURL=fnd[1];
      this.dataURL=this.mailURL;
      this.stage=ST_DATA;
    }else{
      this.mailURL=this.channel.URI.spec;
      this.dataURL=this.mailURL;
      this.stage=ST_DATA_RES;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}