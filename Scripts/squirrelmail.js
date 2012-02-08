/**********************************************************
SquirrelMail
  * Enable Unread Message Notification in Folder Preferences
**********************************************************/
var name="Squirrel";
var ver="2011-01-04";
var needServer=true;

function init(){
  if(this.server){
    if(this.server.indexOf("http")!=0)this.server="http://"+this.server;
    if(this.server.charAt(this.server.length-1)=="/")this.server=this.server.substring(0,this.server.length-1);
  }else if(this.user.indexOf("@")!=-1)this.server="http://mail."+this.user.split("@")[1];
  this.loginData=[this.server+"/src/redirect.php","login_username", "secretkey",];
  this.dataURL=this.server+"/src/left_main.php";
  this.mailURL=this.server+"/src/webmail.php";
}

function getCount(aData) {
  var fnd=aData.match(/left_main.php\?fold=INBOX.+?(?:<small>.*?\((\d+)(?:\/\d+)?\).*?<\/small>)?<\/span>/);
  if(fnd) {
    return fnd[1]?fnd[1]:0;
  }
  fnd=aData.match(/mailbox=INBOX".+?(?:<small>.*?\((\d+)(?:\/\d+)?\).*?<\/small>)?<\/span>/);
  if(fnd) {
    return fnd[1]?fnd[1]:0;
  }else{
    return -1;
  }
}