/**********************************************************
eRepublik
**********************************************************/
var name="eRepublik";
var ver="2012-01-28";
var supportInboxOnly=true;

function init(){  
  this.loginData=["http://www.erepublik.com/en/login","citizen_email","citizen_password"];
  this.dataURL="http://www.erepublik.com/en";
  this.mailURL="http://www.erepublik.com/en/main/messages-inbox";
}
function getCount(aData){
  var fnd=aData.match(/\/messages-inbox"\stitle="(\d+)[\s\S]+?\/messages\/alerts.+?title="(\d+)/);
  if(!fnd)return -1;  
  if(this.inboxOnly)return fnd[1];
  else return parseInt(fnd[1])+parseInt(fnd[2]);
}
