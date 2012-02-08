/**********************************************************
Urban Rivals
**********************************************************/
var name="Urban Rivals";
var ver="2011-01-20";

function init(){
	this.loginData=["http://www.urban-rivals.com/player/signin.php","login","password","action=ident"];
	this.dataURL="http://www.urban-rivals.com/";
	this.mailURL="http://www.urban-rivals.com/player/message.php";
}

function getCount(aData){
  var fnd=aData.match(/message.php(.+?)id="playerMenuCustomBG"/);
  if(!fnd)return -1;
  fnd=fnd[1].match(/message.php">(\d+)?<\/a>/);
  return fnd?fnd[1]:0;
}

