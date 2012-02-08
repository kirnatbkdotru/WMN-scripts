/**********************************************************
Yandex
**********************************************************/
var name="Yandex";
var ver="2011-02-05";

function init() {
  this.loginData = ["https://passport.yandex.ru/passport?mode=auth", "login", "passwd", "retpath="+encodeURIComponent("http://mail.yandex.ru")];
  this.dataURL = "http://mail.yandex.ru/neo2/handlers/handlers.jsx";
  this.mailURL = "http://mail.yandex.ru/";
}

function getCount(aData) {
  var fnd = aData.match(/<symbol>inbox<\/symbol>[\s\S]+?<new>(\d+)/);
  return fnd?fnd[1]:-1;  
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    this.stage=ST_DATA; 
  case ST_DATA:
    this.getHtml(this.dataURL,"color-scheme=blue&_handlers=toolbar%2Cfolders%2Cmessages%2Clabels%2Csettings%2Csettings-color-schemes%2Csettings-color-schemes-text%2Caccount-information%2Cinformer-news%2Cdb-ro-status%2Clenta-counter&_locale=ru",{"X-Requested-With":"XMLHttpRequest"});  
    return false;
  }
  return this.baseProcess(aHttpChannel, aData);
}
