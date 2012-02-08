/**********************************************************
@UKR.NET
  @author: butekx // modified  by petrAB
**********************************************************/
var name="UKR.NET";
var ver="2011-03-09";
var hostString="ukr.net";

function init() {
  var ar=this.user.split("@");
  if(!ar[1])ar[1]="ukr.net";
	this.dataURL="http://freemail.ukr.net/2011030044/q/start#msglist";
	this.loginData=["http://freemail.ukr.net/2011030044/q/start#msglist",,"Password","Login="+encodeURIComponent(ar[0])+"&Domain="+encodeURIComponent(ar[1])];
	this.mailURL="http://freemail.ukr.net/2011030044/q/start#msglist";
}
function getCount(aData) {
	var fnd=aData.match(/<title>(.+)@(.+)\/title>/);
	if (fnd == null) return -1;
	
	var fnd=aData.match(/\u043c:&nbsp;<b>(\d+?)<\/b>/);
	return (fnd == null) ? 0 : fnd[1];
}