/**********************************************************
LaPoste
**********************************************************/
var name="LaPoste";
var ver="2010-08-14";

function init(){
  this.loginData=["https://compte.laposte.net/login.do","login","password"];
  this.dataURL="http://webmail.laposte.net/webmail/fr_FR/inbox.html";
  this.mailURL="http://webmail.laposte.net/webmail/fr_FR/inbox.html";
}
function getIconURL(){
  return "http://www.laposte.net/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/LEFT_INBOX.+?'unreadMails'>(?:\[(\d+)\])?</);
  return fnd?(fnd[1]?fnd[1]:0):-1;
}