/**********************************************************
Comcast
**********************************************************/
var name="OkCupid";
var ver="2011-11-29";
var hostString="";

function init(){  
  this.loginData=["https://www.okcupid.com/login","username","password"];
  this.dataURL="http://www.okcupid.com/messages";
  this.mailURL="http://www.okcupid.com/messages";
}
function getIconURL(){
  return "http://cdn.okcimg.com/media/img/template/favicon3.png";
}
function getCount(aData){
  var fnd=aData.match(/<span class="name">Incoming<\/span>(.+?"count">\(.+?>(\d+)<)?/);
  if(fnd){  
    return fnd[2]?fnd[2]:0;
  }else{
    return -1;
  }
}
