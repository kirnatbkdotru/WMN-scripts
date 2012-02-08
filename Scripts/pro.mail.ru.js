/**********************************************************
@MAIL.RU
  @author: butekx // modified  by petrAB
**********************************************************/
var name="pro.mail.RU";
var ver="2011-03-09";
var hostString="mail.ru";

function init() {
  var ar=this.user.split("@");
  if(!ar[1])ar[1]="mail.ru";
	this.dataURL="http://pro.mail.ru/cgi-bin/mailbox";
	this.loginData=["http://pro.mail.ru/cgi-bin/mailbox",,"Password","Login="+encodeURIComponent(ar[0])+"&Domain="+encodeURIComponent(ar[1])];
	this.mailURL="http://pro.mail.ru/cgi-bin/mailbox";
}
function getCount(aData) {
	var fnd=aData.match(/<title>(.+)@(.+)\/title>/);
	if (fnd == null) return -1;
	
	var fnd=aData.match(/\u043c:&nbsp;<b>(\d+?)<\/b>/);
	return (fnd == null) ? 0 : fnd[1];
}