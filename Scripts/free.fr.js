/**********************************************************
free.fr
  @author:Nicolas Turcot modified by herr_ober, re-modified by Bruno GUERIN
**********************************************************/
var name="Free";
var ver="2010-01-12";

function init(){
    this.dataURL = "http://imp4.free.fr/imp/mailbox.php?mailbox=INBOX";
    this.loginData = ["http://imp4.free.fr/imp/redirect.php","imapuser","pass"];
    this.mailURL = "http://imp4.free.fr/imp/mailbox.php?mailbox=INBOX";
}

function getCount(aData){
  var fnd=aData.match(/<span dir="ltr">Bo.te de r.ception \((\d+)\)&nbsp;<\/span>/); //nombre de mail non lu
  if(fnd){
    return fnd[1];
  }
  else
  {
    var fnd_aucun =aData.match(/<span dir="ltr">Bo.te de r.ception&nbsp;<\/span>/); //aucun mail non lu
    if (fnd_aucun){
      return 0;
    }else{
      return -1;//affiche message non verifie
    }
  }
}