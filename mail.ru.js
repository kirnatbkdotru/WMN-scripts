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
	this.dataURL="http://win.mail.ru/cgi-bin/auth";
	this.loginData=["http://win.mail.ru/cgi-bin/auth",,"Password","Login="+encodeURIComponent(ar[0])+"&Domain="+encodeURIComponent(ar[1])];
	this.mailURL="http://win.mail.ru/cgi-bin/msglist?folder=0&4347803";
}
function getCount(aData) {
	var fnd = aData.match(/g_mail_events.+?(\d)\D+?<\/i>/);
	return fnd?(fnd[1]?fnd[1]:0):-1;
}

function getIconURL(){
  return "http://img.imgsmail.ru/r/ru/favicon.ico?1";
}