/**********************************************************
mixi
**********************************************************/
var name="mixi";
var ver="2010-08-26";

function init(){
  this.loginData=["https://mixi.jp/login.pl?from=login1","email","password","next_url=%2Fhome.pl"];  
  this.dataURL="http://mixi.jp/";
  this.mailURL="http://mixi.jp/";  
  this.logoutURL="http://mixi.jp/logout.pl";
}

function getCount(aData){
  var fnd=aData.match(/<!--\[MixiInfo\]-->([\s\S]+)<div class="sectionHead">/);
  if(fnd){
    fnd=fnd[1].match(/(\d+)\u4ef6/);
    return fnd?fnd[1]:0;
  }else{
    return -1;
  }
}
