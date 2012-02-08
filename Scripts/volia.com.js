/**********************************************************
Volia.com
**********************************************************/
var name="Volia.com";
var ver="2010-06-10";

function init() {
  this.dataURL = "http://mail.yandex.ru/for/voliacable.com/";
  this.loginData = ["https://passport.yandex.ru/for/voliacable.com/passport", "login", "passwd", "mode=mdauth&retpath="+encodeURIComponent("http://mail.yandex.ru/for/voliacable.com")];
  this.mailURL = "http://mail.yandex.ru/for/voliacable.com/";
}

function getCount(aData) {
  var fnd = aData.match(/<title>.+?(?:\((?:(\d+)\s*\/\s*)?\d+\))?[^\(]+<\/title>/);
  if(fnd)return fnd[1]?fnd[1]:0;
  else return -1;
}