/**********************************************************
FastMail
**********************************************************/
var name="FastMail";
var ver="2010-06-06";

function init(){
  this.initStage=ST_PRE;
  this.loginData=[,"FLN-UserName","FLN-Password","MLS=LN-*"];
  this.mailURL="http://www.fastmail.fm";
}

function getCount(aData){
  var fnd=aData.match(/<title>.+?\(((\d+?)\/)*\d+\).*?<\/title>/);
  if(fnd){
    return fnd[2]?fnd[2]:0;
  }else{
    return -1;
  }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://www.fastmail.fm/");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/ action="(.+?)"/); 
    if(fnd){
      this.loginData[LOGIN_URL]=fnd[1];
      this.stage=ST_LOGIN;
    }
    break;
  case ST_LOGIN_RES:
    var fnd=aData.match(/url=(\S+?)"/);
    if(fnd){
      this.dataURL=fnd[1];
      this.mailURL=this.dataURL;    
      this.stage=ST_DATA;
    }else{
      this.dataURL=this.channel.URI.spec;
      this.mailURL=this.dataURL;    
      this.stage=ST_DATA_RES;    
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}