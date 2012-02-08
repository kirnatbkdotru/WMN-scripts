/**********************************************************
zimbra.free.fr
  @author:Nicolas Turcot modified by by herr_ober
  modified by Didier Courtaud for zimbra
**********************************************************/
var name="Free Zimbra";
var ver="2010-01-06";

function init(){
  this.dataURL="http://zimbra.free.fr/zimbra/?client=standard";
  this.loginData=["http://zimbra.free.fr/zimbra.pl","login","password"];
  this.mailURL="http://zimbra.free.fr/zimbra";
}
function getCount(aData){
  var fnd=aData.match(/Zimbra: Inbox \((\d+?)\)/); //nombre de mail non lu
  if(fnd)
  {
    return fnd[1];
  }
  else
  {
    var fnd_aucun =aData.match(/Zimbra: Inbox/); //aucun mail non lu
    if (fnd_aucun)
    {
      return 0;
    }
    else
    {
      return -1;//affiche message non verifie
    }
  }
}