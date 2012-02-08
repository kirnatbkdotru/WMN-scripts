/**********************************************************
Hushmail
 - Only for Free Account 
 - Automatic login does not work
**********************************************************/
var name="Hushmail";
var ver="2010-09-20";

function init(){
  this.loginData=["https://mailserver1.hushmail.com/hushmail/index.php","hush_username",,"hush_exitpage=https%3A%2F%2Fwww.hushmail.com%2Fsignout&hush_exitmethod=POST"];
  this.dataURL="http://www.hushmail.com/";
  this.mailURL="http://www.hushmail.com/";
}
function getCount(aData){
  var fnd=aData.match(/selectFolder\('INBOX'\).+?(?:<b>(\d+)<\/b>\))?<\/A>/);
  return fnd?(fnd[1]?fnd[1]:0):-1;
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    var post=this.getForm(aData,"freeserver");
    if(post){
      this.getHtml("https://www.hushmail.com/choose/",post);
      return false;
    }
    break;
  case ST_LOGIN_RES+1:
    var post=this.getForm(aData,"hushmail_choose_free");
    if(post){
      this.mailURL="https://mailserver1.hushmail.com/hushmail/index.php?"+post;
      this.getHtml("https://mailserver1.hushmail.com/hushmail/index.php",post);
      return false;
    }
    break;
  case ST_LOGIN_RES+2:
    var fnd=aData.match(/(showLogin.+?)"/);
    if(fnd){
      this.getHtml("https://mailserver1.hushmail.com/hushmail/"+fnd[1],"timezoneoffset="+(new Date().getTimezoneOffset())+"&passphrase="+encodeURIComponent(this.password));
      return false;
    }
    break;
  case ST_LOGIN_RES+3:
    var fnd=aData.match(/(\?PHPSESSID.+?)"/);
    if(fnd){
      this.dataURL="https://mailserver1.hushmail.com/hushmail/folderlist/showFolderListPane.php"+fnd[1];
      this.stage=ST_DATA;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}

