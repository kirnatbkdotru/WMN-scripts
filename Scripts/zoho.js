/**********************************************************
Zoho
**********************************************************/
var name="Zoho";
var ver="2012-02-12";

function init(){
  this.dataURL="https://zmail.zoho.com/mail/home.do";
  this.loginData=["https://accounts.zoho.com/login","LOGIN_ID","PASSWORD"];
  this.mailURL="https://mail.zoho.com/biz/index.do"; 
  this.logoutURL="https://mail.zoho.com/biz/jsp/logout.jsp";
}
function getIconURL(){
  return "http://www.zoho.com/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/inboxCount:(\d+?)/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}