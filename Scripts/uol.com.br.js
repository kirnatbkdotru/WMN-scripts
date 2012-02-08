/**********************************************************
UOL
**********************************************************/
var name="uol.com.br";
var ver="2010-04-09";
var hostString="uol.com.br";

function init(){
  this.loginData=["https://acesso.uol.com.br/login.html?skin=webmail","user","pass"];
  this.dataURL="http://mail.uol.com.br/main";
  this.mailURL="http://mail.uol.com.br/main";
}
function getIconURL(){
  return "http://h.imguol.com/favicon.ico";
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    var fnd=aData.match(/href="(\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1]);
      return false;
    }
    break;
  case (ST_LOGIN_RES+1):
    this.stage=ST_DATA;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData) {
  var fnd=aData.match(/unreadMessages\s*=\s*"(\d+)"/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}