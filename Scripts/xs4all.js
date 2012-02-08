/**********************************************************
XS4ALL
**********************************************************/
var name="XS4ALL";
var ver="2010-08-06";
var hostString="";

function init(){  
  this.loginData=["https://webmail.xs4all.nl/src/redirect.php","login_username","secretkey","js_autodetect_results=1&just_logged_in=1"];
  this.dataURL="https://webmail.xs4all.nl/src/left_main.php";
  this.mailURL="https://webmail.xs4all.nl/src/webmail.php";
}
function getIconURL(){
  return "http://www.xs4all.nl/images/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/INBOX<\/a>(?:.+?\((\d+)\).+?)?<\/span>/);
  if(fnd){  
    return fnd[1]?fnd[1]:0;
  }else{
    return -1;
  }
}
