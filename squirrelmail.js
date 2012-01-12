/**********************************************************
SquirrelMail
  * Enable Unread Message Notification in Folder Preferences
**********************************************************/
var name="Squirrel";
var ver="2011-01-04";
var needServer=true;

function init(){
  this.server = "https://webmail.xtramediaservices.nl"
  this.loginData=[this.server+"/src/redirect.php","login_username", "secretkey",];
  this.dataURL=this.server+"/src/left_main.php";
  this.mailURL=this.server+"/src/webmail.php";
}

function getCount(aData) {
  var fnd=aData.match(/INBOX<.+?\((\d+)\)</);
  return fnd?(fnd[1]?fnd[1]:0):0;
}