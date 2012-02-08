/***********************************************************
WMN-forum
  @require lib-update.js
***********************************************************/
var name="WMN-forums";
var ver="2010-02-18";

function init(){
  initUpdateHandler(this);
  this.initStage=ST_LOGIN;
  this.loginData=["http://webmailnotifier.mozdev.org/drupal/forum?destination=forum","name","pass","op=Log+in&form_id=user_login_block"];  
  this.dataURL="http://webmailnotifier.mozdev.org/drupal/forum/";
  this.mailURL=this.dataURL;
  this.mailDomain="webmailnotifier.mozdev.org";
  this.start="<div id=\"forum\">[\\s\\S]+?<tbody>";
  this.end="<\/tbody>";
}
function findString(aData){
  var fnd=aData.match(/<input.+?id="edit-submit"\s+value="Log in"/);
  if(fnd)return null;
  var reg=new RegExp(this.start+"([\\s\\S]+?)"+this.end);
  fnd=aData.match(reg);
  if(fnd){
    fnd=fnd[1].replace(/<td class=\"created\">.+?<\/td>/g,"");
    fnd=fnd.replace(/<td class=\"last-reply\".+?<\/td>/g,"");
    fnd=fnd.replace(/(<td class="topics">\d+)<br.+?(<\/td>)/,"$1$2");
    return fnd;
  }
  return null;
}