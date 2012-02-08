/**********************************************************
Tele2
**********************************************************/
var name="Tele2";
var ver="2010-02-11";

function init(){
  this.dataURL="http://webmail.versatel.nl/horde/imp/";
  this.loginData=["http://webmail.versatel.nl/horde/imp/redirect.php",
                  "imapuser",
                  "pass"
                 ];
  this.mailURL="http://webmail.versatel.nl/horde/imp/";
}

function getCount(aData){
  var fnd=aData.match(/<title>E-mail :: Inbox \((\d+)\)<\/title>/);
  if(fnd)
  {
    return fnd[1];     
  }
  else
  {
    var fnd_null = aData.match(/<title>E-mail :: Inbox<\/title>/);
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
