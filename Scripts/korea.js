/**********************************************************
KOREA.COM
**********************************************************/
var name="KOREA.COM";
var ver="2011-07-29";

function init() {
  this.hostString="";
  this.dataURL="http://mail.korea.com/";
  this.loginData=["https://id.korea.com/ca.php","user","password","target="+encodeURIComponent("http://mail.korea.com/")+"&ssl=on"];
  this.mailURL="http://mail.korea.com/";
}
function getIconURL(){
  return "http://www.korea.com/favicon.ico";
}
function getCount(aData) {
  var fnd=aData.match(/\uC548 \uC77D\uC74C.+?>(\d+)/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    this.getHtml(this.dataURL);
    return false;
  case (ST_LOGIN_RES+1):    
    var fnd=aData.match(/<form.+?action=\"(\S+?)\"/);
    if(fnd){
      this.dataURL=fnd[1];    
      this.getHtml(this.dataURL);
      return false;
    }
    break;
  case (ST_LOGIN_RES+2):        
    var fnd=aData.match(/location.href=\"(\S+?)\"/);  
    if(fnd){
      this.dataURL=fnd[1];        
      this.stage=ST_DATA;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}