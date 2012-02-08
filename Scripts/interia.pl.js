/**********************************************************
INTERIA.PL
**********************************************************/
var name="INTERIA.PL";
var ver="2010-11-12";

function init(){
  this.initStage=ST_PRE;
  this.loginData=["https://logowanie.interia.pl/poczta/zaloguj","email","pass"];
  this.dataURL="http://poczta.interia.pl/poczta/";  
  this.mailURL="http://poczta.interia.pl/poczta/";
  this.mailDomain="poczta.interia.pl";
}

function getCount(aData){
  var fnd=aData.match(/\"folders\":\[{\"id\":1.+?\"unread\":(\d+)/);
  if(fnd){
    return fnd[1];
  }else{
    fnd=aData.match(/Odebrane<\/a>.+?\((?:(\d+)\/)?\d+?\)/);
    if(fnd)return fnd[1]?fnd[1]:0;
    else return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.stage=ST_LOGIN;
    this.getHtml("http://poczta.interia.pl/");
    return true;
  }
  return this.baseProcess(aHttpChannel, aData);
}  