/**********************************************************
Atlas.cz
**********************************************************/
var name="Atlas.cz";
var ver="2011-01-20";

function init(){
	this.loginData=["https://auser.centrum.cz/","ego_user","ego_secret","ego_domain=atlas.cz"];
	this.dataURL="http://amail.centrum.cz/index.php?m=hp&op=load&qabook=0";
	this.mailURL="http://amail.centrum.cz/";
}
function getIconURL(){
  return "http://i0.cz/6/gm526/s2/favicon.gif";
}
function getCount(aData){
  var fnd=aData.match(/"id":"0".+?"totalUnread":"(\d+)"/);
  return fnd?fnd[1]:-1;
}

