/**********************************************************
@MAIL.RU
  @author: butekx // modified  by Kiryanov Nikolay kirn@bk.ru
**********************************************************/
var name="mail.RU";
var ver="2011-07-09";
var hostString="mail.ru";

function init() {
  var ar=this.user.split("@");
  if(!ar[1])ar[1]="mail.ru";
	this.dataURL="http://e.mail.ru/cgi-bin/msglist";
	this.loginData=["http://e.mail.ru/cgi-bin/auth",,"Password","Login="+encodeURIComponent(ar[0])+"&Domain="+encodeURIComponent(ar[1])];
	this.mailURL="http://e.mail.ru/cgi-bin/msglist";
}
function getCount(aData) {
	var fnd = aData.match(/g_mail_events.+?(\d)<\/i>/);
	return fnd?(fnd[1]?fnd[1]:0):-1;
}

function getIconURL(){
  return "http://img.imgsmail.ru/r/ru/favicon.ico?1";
}