/***********************************************************
  UTANET script for Webmail Notifier Firefox Extension
  by Rainer Schuler
***********************************************************/
var name="UTANet";
var ver="2010-10-27";

function init(){
  this.dataURL="http://pwebmail6.utanet.at/src/right_main.php?PG_SHOWALL=0&sort=0&mailbox=INBOX";
  this.loginData=["http://pwebmail6.utanet.at/src/redirect.php",
                      "login_username","secretkey"];
  this.mailURL="http://pwebmail6.utanet.at/src/webmail.php";
}
function getCount(aData){ //aData is a html source in dataURL
	var fnd=aData.match(/\((\d+) ungelesen\)/); //retrieve mail count
	return fnd?(fnd[1]?fnd[1]:0):-1;
}
