/**********************************************************
Bilkent University Webmail for undergraduates
  * Enable Unread Message Notification in Folder Preferences
  * Author: Ender Demirkaya
**********************************************************/
var name="Bilkent University";
var ver="2010-08-29";

function init(){
  var server = "https://webmail.bilkent.edu.tr/ug";
  this.loginData=[server+"/src/redirect.php","login_username", "secretkey",];
  this.dataURL=server+"/src/left_main.php";
  this.mailURL=server+"/src/webmail.php";
}

function getCount(aData) {
  var fnd=aData.match(/mailbox=INBOX\".+?<small>.*?<\/small>/);
  if(fnd) {
	fnd = fnd[0];
	var count = fnd.substring(fnd.indexOf("<small>(")+8,fnd.indexOf(")</small>"));
    return count?count:0;
  }else{
    return 0;
  }
}