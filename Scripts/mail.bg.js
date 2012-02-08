/**********************************************************
Mail.bg
**********************************************************/
var name="Mail.BG";
var ver="2011-01-04";

function init(){
	this.loginData=["http://mail.bg/auth/login","user","pass"];
	this.dataURL="http://mail.bg/";
	this.mailURL="http://mail.bg/#mailbox/inbox";
}

function getCount(aData){
  var fnd=aData.match(/"widgets_unread_mails"[\S\s]+?"left">\s*(\d*)/)
  return fnd?(fnd[1]?fnd[1]:0):-1;
}

