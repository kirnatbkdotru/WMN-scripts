/**********************************************************
Atlas.cz
**********************************************************/
var name="Centrum.cz";
var ver="2011-02-23";

function init(){
	this.loginData=["https://user.centrum.cz/","ego_user","ego_secret","ego_domain=centrum.cz"];
	this.dataURL="http://mail.centrum.cz/index.php?m=hp&op=load&qabook=0";
	this.mailURL="http://mail.centrum.cz/";
}
function getIconURL(){
  return "http://i0.cz/mypage/auto/33.16.33.1257/icentrum/images/multimail/provider-default.gif";
}
function getCount(aData){
  var fnd=aData.match(/"id":"0".+?"totalUnread":"(\d+)"/);
  return fnd?fnd[1]:-1;
}

