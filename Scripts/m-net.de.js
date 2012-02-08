/**********************************************************
M-Net
  @author: Michael Kramer based on script for free.fr
**********************************************************/
var name="M-Net";
var ver="2010-01-15";

function init(){
  this.dataURL="https://webmail.mnet-online.de/horde/imp/mailbox.php";
  this.loginData=["https://webmail.mnet-online.de/horde/imp/redirect.php",
                 "imapuser","pass"];
  this.mailURL="https://webmail.mnet-online.de/horde/index.php";
}
function getIconURL(){
  return "https://webmail.mnet-online.de/horde/imp/themes/graphics/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/<title>Webmail :: Posteingang \((\d+)\)<\/title>/);
  if(fnd)
  {
    return fnd[1];
  }
  else
  {
    var fnd_null=aData.match(/<title>Webmail :: Posteingang<\/title>/);
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

