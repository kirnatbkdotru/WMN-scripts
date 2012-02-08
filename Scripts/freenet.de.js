/**********************************************************
freenet.de
**********************************************************/
var name="freenet.de";
var ver="2010-11-26";

function init(){
  this.loginData=["https://secure.freenet.de/e-tools.freenet.de/login.php3","username","password","callback=http%3A%2F%2Fwww.freenet.de%2Fmitglieder_center%2F"];
  this.dataURL="http://email.freenet.de/Overview/View/Index";
  this.mailURL="http://email.freenet.de/Email/View/Index";  
  this.logoutURL="http://email.freenet.de/login/logoff.html?code=1011";
}

function getCount(aData){
  var fnd=aData.match(/<td class="oNumber">(\d+)<[\s\S]+?Ungelesene/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    this.getHtml("http://email.freenet.de/Overview/View/Index");
    return false;
  case ST_LOGIN_RES+1:
    this.stage=ST_DATA;    
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}