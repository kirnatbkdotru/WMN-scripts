/**********************************************************
KabelBW
  @author: Vittorio Iozzolino based on script for M-Net
**********************************************************/
var name="KabelBW";
var ver="2010-02-04";

function init(){
  this.dataURL="https://webmail.kabelbw.de/do/mail/folder/view?l=de-DE&v=kabelbw";
  this.loginData=["https://webmail.kabelbw.de/?l=de-DE&v=kabelbw",
                 "account","password"];
  this.mailURL="https://webmail.kabelbw.de/do/mail/folder/view?l=de-DE&v=kabelbw";
}
function getIconURL(){
  return "https://www.kabelbw.de/kabelbw/export/sites/default/images/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/\'Posteingang - (\d+) Nachrichten, (\d+) unread\'/);
  if(fnd)
  {
    return fnd[2];
  }
  else
  {
    var fnd_null=aData.match(/\'Posteingang - Keine Nachrichten\'/);
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

