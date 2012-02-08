/**********************************************************
Hyves
**********************************************************/
var name="Hyves";
var ver="2011-09-29";

function init(){
  this.dataURL="http://www.hyves.nl/";
  this.loginData=["https://secure.hyves.org/?module=authentication&action=login","auth_username","auth_password"];
  this.mailURL="http://www.hyves.nl/berichten/inbox/";
}

function getCount(aData){
  var fnd=aData.match(/<b class="usr-optns-inbox-unread">(\d+)<\/b>/);
  if(fnd)
  {
    return fnd[1];     
  }
  else
  {
    return -1;
  }
}
