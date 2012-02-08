/**********************************************************
excite.it
**********************************************************/
var name="excite.it";
var ver="2010-02-08"
var hostString="";

function init(){
  this.initStage=ST_PRE;
  this.loginData=["http://user.excite.it/api/login?pname=mail&targeturl=http://www.excite.it/mail/login&ord="+Math.floor(Math.random() * 10000000000),"login_user","login_psw"];
  this.dataURL="http://mail.excite.it/main.asp";  
  this.mailURL="http://mail.excite.it/main.asp";
}
function getIconURL(){
  return "http://static.excite.it/common/image/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/<b>(\d+)\s+messaggi/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("http://user.excite.it/access/user");
    return false;
  case ST_PRE_RES:
    this.stage=ST_LOGIN;
    this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&emcl_timestamp_cache="+new Date().getTime(),{"X-Requested-With":"XMLHttpRequest"});
    return false;
  case ST_LOGIN_RES:
    this.getHtml("http://www.excite.it/mail/login");
    return false;
  case ST_LOGIN_RES+1:
    this.getHtml("http://mail.excite.it/main.asp");
    return false;    
  case ST_LOGIN_RES+2:
    var fnd=aData.match(/<frame.+?name="main".+?src="(\S+?)"/);
    if(fnd){
      this.dataURL="http://mail.excite.it"+fnd[1];
      this.stage=ST_DATA;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}