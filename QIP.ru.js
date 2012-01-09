/**********************************************************
@QIP.RU
  @author: Kiryanov Nikolay kirn@bk.ru
**********************************************************/
var name="QIP.RU";
var ver="2010-11-02";

function init() {
  var ar=this.user.split("@");
  if(!ar[1])ar[1]="qip.ru";
 	this.dataURL="http://mail.qip.ru/mailbox/folder/INBOX/?l=1";
	this.loginData=["http://mail.qip.ru/auth/logon","user","pass","&domain="+ ar[1] + "&reason=login"];
	this.mailURL="http://mail.qip.ru";
}
function getCount(aData) {

	fnd = aData.match(/<li class="active ">/);

	if (fnd) return 0;

	fnd = aData.match(/<li class="active unread ">.+?\((\d+).+?<\/li>/);

	return (fnd == null) ? -1 : fnd[1];
}

