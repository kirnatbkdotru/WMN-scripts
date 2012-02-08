/**********************************************************
NetZero
**********************************************************/
var name="NetZero";
var ver="2010-12-07";
var hostString="netzero.net";

function init(){
  this.dataURL="http://webmail.netzero.net/";
  var ar=this.user.split("@");
  this.loginData=["https://webmail.netzero.net/cgi-bin/login.cgi",,"PASSWORD","LOGIN="+encodeURIComponent(ar[0])+"&domain="+encodeURIComponent(ar[1])];  
  this.mailURL="http://webmail.netzero.net/";
}
function getIconURL(){
  return "http://www.netzero.net/static/start/view/img/icon/webicon_n.ico";
}
function getCount(aData){
  var fnd=aData.match(/newMsgsI\s*[:=]\s*"(\d+)"/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES: 
    this.getHtml("http://webmail.netzero.net/");
    return false;
  case ST_LOGIN_RES+1:
    var fnd=aData.match(/_jsFileCrc = "(\S+?)"/);
    if(fnd){
      this.cookieManager.addCookies("http://www.netzero.net","ajaxSupported=2/"+fnd[1]+"; expires=Mon, 01 Feb 2038 00:00:00 GMT; path=/; domain=.netzero.net");      
      this.getHtml("http://webmail.netzero.net/");
      return false;
    }
    break;
  case ST_LOGIN_RES+2:    
    var fnd=aData.match(/url=(\S+?)"/);
    if(fnd){
      this.dataURL=fnd[1];
      this.mailURL=fnd[1];
      this.stage=ST_DATA;
    }
    break;  
  }
  return this.baseProcess(aHttpChannel, aData);  
}
