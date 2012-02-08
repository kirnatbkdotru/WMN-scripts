var name="ReverbNation";
var ver="2011-03-24";
function init(){
  this.dataURL="http://www.reverbnation.com/";
  this.loginData=["http://www.reverbnation.com/user/login_from_dialog?message_region=become_fan_login_popup_message",
                      "user[login]","user[password]"];
  this.mailURL="http://www.reverbnation.com/";
}

function getCount(aData){
  var lin=aData.match(/Logged\s+In:/);
  var fnd=aData.match(/subnav=account_messages\">Messages/);
  if(lin && fnd){
    fnd=aData.match(/subnav=account_messages\">Messages (d+)<\/a>/);
    if(fnd){
      return parseInt(fnd[1]);
    }else{
      return 0;
    }
  }else{
    return -1;
  }
}
