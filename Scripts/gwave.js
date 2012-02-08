/***********************************************************
Google Wave
***********************************************************/
var name="Google Wave";
var ver="2011-09-13";
var hostString="gmail.com";

function init(){
  this.initStage=ST_PRE;
  this.dataURL=this.inboxOnly?"https://wave.google.com/wave/":"https://wave.google.com/wave/#restored:search";                        
  this.loginData=["https://accounts.google.com/ServiceLoginAuth?service=wave",
                    "Email","Passwd",
                    "continue="+encodeURIComponent(this.dataURL)];
  this.mailURL="https://wave.google.com/wave/";
  this.mailDomain=".+?.google.com";    
}
function getIconURL(){
  return "http://wave.google.com/favicon.ico";
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://accounts.google.com/ServiceLoginAuth?service=reader");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/GALX[\s\S]+?value=\"(\S+?)\"/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&GALX="+encodeURIComponent(fnd[1]));
      return false;
    }
    break;
  case ST_LOGIN_RES:
    var fnd=aData.match(/<meta.+?url=(?:'|&#39;)(\S+)(?:'|&#39;)/);
    if(fnd){
      fnd=fnd[1].replace(/&amp;/g,"&");
      this.getHtml(fnd);
      return false;
    }
    break;
  case (ST_LOGIN_RES+1):
    this.stage=ST_DATA_RES;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData){
  var fnd=aData.match(/"r":"\^d1"(.+?)};/);
  if(fnd){
    var re=/"7":(\d+)/g;
    var o;
    var num=0;
    while ((o = re.exec(fnd[1])) != null){
      num+=parseInt(o[1]);
    }
    return num;
  }else return -1;
}  

