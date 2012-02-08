/***********************************************************
AdSense
***********************************************************/
var name="AdSense";
var ver="2011-11-17";
var hostString="gmail.com";
var supportInboxOnly=true;
var supportShowFolders=true;

function init(){
  this.initStage=ST_PRE;
  this.loginData=["https://accounts.google.com/ServiceLoginAuth?service=adsense",
                    "Email","Passwd"];
  this.dataURL="https://www.google.com/adsense/v3/m/home";                      
  this.mailURL="https://www.google.com/adsense/v3/app";
  this.mailDomain=".+?.google.com";    
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://accounts.google.com/ServiceLoginAuth?service=adsense");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/GALX[\s\S]+?value=\"(\S+?)\"/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&GALX="+encodeURIComponent(fnd[1]));
      return false;
    }
    this.onError();
    return true;
  case ST_LOGIN_RES:
    var fnd=aData.match(/<meta.+?url=(?:'|&#39;)(\S+)(?:'|&#39;)/);
    if(fnd){
      fnd=fnd[1].replace(/&amp;/g,"&");
      this.getHtml(fnd);
      return false;
    }
    break;
  case (ST_LOGIN_RES+1):
    this.stage=ST_DATA;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData){
  var fnd=aData.match(/class="metrics-list">[\s\S]+?<span.+?>US(\S+?)</);
  if(fnd){
    this.income=fnd[1];
    return 0;
  }else{
    this.income="";
    return -1;
  }
}
function getDesc(){
  return this.mailCount>=0?this.income:"";
}



