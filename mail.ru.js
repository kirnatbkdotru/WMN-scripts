/**********************************************************
    @MAIL.RU
    @author: butekx // modified  by Kiryanov Nikolay kirn@bk.ru
**********************************************************/
var name="Mail.RU";
var ver="2011-11-30";
var hostString="mail.ru";

function init() {
    var ar=this.user.split("@");
    if(!ar[1])ar[1]="mail.ru";
    this.dataURL="http://swa.mail.ru/cgi-bin/counters";
    this.loginData=["https://e.mail.ru/cgi-bin/auth",,"Password","Login="+encodeURIComponent(ar[0])+"&Domain="+encodeURIComponent(ar[1])];
    this.mailURL="http://e.mail.ru/cgi-bin/msglist";
}
function getCount(aData) {
	var jdata = JSON.parse(aData);
	if (jdata.status == "ok") return jdata.data.mail_cnt;
	return -1;
}

function getIconURL(){
	return "http://img.imgsmail.ru/r/ru/favicon.ico?1";
}
