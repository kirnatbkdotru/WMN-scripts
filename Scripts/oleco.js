/**********************************************************
Oleco
  @author:Michael Kramer
**********************************************************/
var name="Oleco";
var ver="2010-01-11";

function init(){
  this.dataURL="https://mail.oleco.de/mail/showmail.php?Folder=Inbox";
  this.loginData=["https://mail.oleco.de/mail/atmail.php","username","password","pop3host=oleco.net&NewWindow=0&Language=german&MailType=&LoginType=simple"];
  this.mailURL="https://mail.oleco.de/mail/showmail.php?Folder=Inbox";
}

function getCount(aData){
  var fnd=aData.match(/<font class="smallbold">\((\d+)\)<\/font>/);
  if(fnd)
  {
    return fnd[1];
  }
  else
  {
    var fnd_null=aData.match(/<title>Oleco.*Inbox<\/title>/);
    if (fnd_null)
    {
      return 0;
    }
    else
    {
      return -1;
    }
  }
}

