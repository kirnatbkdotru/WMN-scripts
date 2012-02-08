/**********************************************************
Aruba.it
**********************************************************/
var name="Aruba.it";
var ver="2011-03-16";

function init(){
  this.loginData=["http://webmail.aruba.it/cgi-bin/webmail","LOGIN","PASSWD","Act_Login=1&USEHTMLTPL=1&SG_Lang=it"];  
}
function getIconURL(){
  return "http://www.aruba.it/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/<\/b><\/div>\s*<div.+?>.+?(\d+)/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:  
    var fnd=aData.match(/URL=(\S+?)"/);   
    if(fnd){
      this.dataURL=fnd[1];
      this.mailURL=this.dataURL;
      this.stage=ST_DATA;
    }
    break;    
  }
  return this.baseProcess(aHttpChannel, aData);
}
