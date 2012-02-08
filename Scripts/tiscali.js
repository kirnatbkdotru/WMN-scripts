/**********************************************************
Tiscali
**********************************************************/
var name="Tiscali";
var ver="2011-01-06";
var hostString="";

function init(){
  this.dataURL="http://mail.tiscali.it";
  var ar=this.user.split("@");
  this.loginData=["http://mail.tiscali.it/cp/ps/main/login/Authenticate","u","password","d=tiscali.it"];  
  this.mailURL="http://mail.tiscali.it";
}
function getIconURL(){
  return "http://servizi-media.tiscali.it/cp/images/default/en/main/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/INBOX.+?name="unreadMessages">(\d+)/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES: 
    var fnd=aData.match(/action="(\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1],"d=tiscali.it&u="+encodeURIComponent(this.user));
      return false;
    }
    this.onError();
    return true;
  case ST_LOGIN_RES+1:    
    var fnd=aData.match(/loadChildrenBasePath:"(\S+?)"/);
    if(fnd){
      this.dataURL="http://mail.tiscali.it"+fnd[1]+"&folderPath=";
      fnd=aData.match(/syncFolderBasePath:"(\S+?)"/);
      if(fnd){
        this.syncURL="http://mail.tiscali.it"+fnd[1];
        this.stage=ST_DATA;
        return this.process(aHttpChannel, aData);
      }
    }
    break;
  case ST_DATA:
    this.stage=ST_DATA_RES+1;
    this.getHtml(this.syncURL,"folderPath=INBOX&listPosition=1&sortColumn=&sortDirection=Desc&anotherSearch=false");
    return true;
  case ST_DATA_RES+1:
    this.stage=ST_DATA_RES;
    this.getHtml(this.dataURL);
    return true;    
  }
  return this.baseProcess(aHttpChannel, aData);  
}
