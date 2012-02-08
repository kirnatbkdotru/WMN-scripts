/**********************************************************
Yandex
**********************************************************/
var name="Rambler";
var ver="2010-04-14";
var hostString="rambler.ru";

function init() {
  this.dataURL = "http://mail.rambler.ru/mail/startpage";
  var ar=this.user.split("@");  
  this.loginData = ["https://id.rambler.ru/script/auth.cgi",,"passw","login="+encodeURIComponent(ar[0])+"&domain="+encodeURIComponent(ar[1])];
  this.mailURL = "http://mail.rambler.ru/mail/startpage";
}

function getCount(aData) {
  var fnd = aData.match(/<title>\s*(?:\((\d+)\))?[\s\S]+?<\/title>/);
  if(fnd)return fnd[1]?fnd[1]:0;  
  else return -1;
}