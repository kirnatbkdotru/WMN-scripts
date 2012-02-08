/**********************************************************
META.UA
**********************************************************/
var name="META.UA";
var ver="2011-01-20";

function init(){
	this.loginData=["https://passport.meta.ua/","login","password"];
	this.dataURL="http://webmail.meta.ua/index.php";
	this.mailURL="http://webmail.meta.ua/index.php";
}

function getCount(aData){
  var fnd=aData.match(/<title>.+?\/\S+?-(\d+)\)<\/title>/);
  return fnd?fnd[1]:-1;
}

