/**********************************************************
deviantART
**********************************************************/
var name="deviantART";
var ver="2010-09-20";

function init(){
  this.loginData=["https://www.deviantart.com/users/login","username","password","reusetoken=1"];
  this.dataURL="http://www.deviantart.com/";
  this.mailURL="http://www.deviantart.com/";
}
function getCount(aData){
  var fnd=aData.match(/href="http:\/\/my.deviantart.com\/messages\/">.+?<\/i>\s*&nbsp;(\d+)/);
  return fnd?fnd[1]:-1;
}
