/***************************************************************************
  @author: Ionut Danila
  @e-mail: ionut.danila@asii.ro
****************************************************************************/

var name="InfoIasi Students WebMail";
var versiune="2010-11-02";
var site = "https://webmail-studs.info.uaic.ro";

function init() 
{
  this.dataURL="https://webmail-studs.info.uaic.ro/?_action=plugin.webmail_notifier";
  this.loginData=["https://webmail-studs.info.uaic.ro","_user","_pass","&_task="+encodeURIComponent("mail")+"&_action="+encodeURIComponent("login")+"&_webmail_notifier="+encodeURIComponent("1")+"&_timezone="+encodeURIComponent(new Date().getTimezoneOffset() / -60)];
  this.mailURL=site;
}

function getIconURL()
{
	return "https://webmail-studs.info.uaic.ro/skins/default/images/favicon.ico";
}

function getCount(aData) 
{
  var gaseste=aData.match(/<b>(\d+?)<\/b>/);
  if(gaseste) 
  {
    var numar = gaseste[1];
    return numar;
  }
  else 
  {
    return -1;
  }
}