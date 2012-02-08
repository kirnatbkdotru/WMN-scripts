/**********************************************************
Juno
**********************************************************/
var name="Juno";
var ver="2010-04-23";
var hostString="";

function init() {
  this.dataURL = "http://webmail.juno.com/cgi-bin/login.cgi";
  this.loginData = ["http://my.juno.com/start/login.do","memberId","password","gotoURL=%2Fstart%2Fsp.do&operation=login"];
  this.mailURL = "http://webmail.juno.com/cgi-bin/login.cgi";
}
function getIconURL(){
  return "http://webmaila.uolimg.com/i2/webicon_j.ico";
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    this.getHtml("http://webmail.juno.com/cgi-bin/login.cgi");
    return false;
  case ST_LOGIN_RES+1:    
    var fnd=aData.match(/_jsFileCrc\s*=\s*"(\S+?)"/);
    if(fnd){
      this.cookieManager.addCookies(this.channel.URI,"ajaxSupported=2/"+fnd[1]+"; Domain=juno.com; Expires=Wed, 13-Apr-2050 02:46:42 GMT; Path=/");
      this.getHtml("http://webmail.juno.com/cgi-bin/login.cgi");
      return false;      
    }
    break;
  case ST_LOGIN_RES+2:        
    var fnd=aData.match(/location.replace\('(\S+?)'/);
    if(fnd){
      this.dataURL=fnd[1];
      this.mailURL=this.dataURL;
      this.stage=ST_DATA;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData) {
  var fnd = aData.match(/newMsgsI:\s*"(\d+)"/);
  if(fnd)return fnd[1];  
  else return -1;
}