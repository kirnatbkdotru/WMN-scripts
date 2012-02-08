/**********************************************************
@MAIL.UA
  @author: butekx // modified  by petrAB
**********************************************************/
var name="mail.UA";
var ver="2011-03-09";
var hostString="mail.ua";

function init() {
  var ar=this.user.split("@");
  if(!ar[1])ar[1]="mail.ua";
	this.dataURL="http://mail.ua/main/#mail";
	this.loginData=["http://mail.ua/main/#mail",,"Password","Login="+encodeURIComponent(ar[0])+"&Domain="+encodeURIComponent(ar[1])];
	this.mailURL="http://mail.ua/main/#mail";
}
function getCount(aData) {
	var fnd=aData.match(/<title>(.+)@(.+)\/title>/);
	if (fnd == null) return -1;
	
	var fnd=aData.match(/\u043c:&nbsp;<b>(\d+?)<\/b>/);
	return (fnd == null) ? 0 : fnd[1];
}