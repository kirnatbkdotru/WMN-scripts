/**********************************************************
GMX
**********************************************************/
var name="GMX";
var ver="2010-12-30";
var multi=true;

function init(){
  this.dataURL="http://www.gmx.net/";
  this.loginData=["https://service.gmx.net/de/cgi/login","id","p","AREA=1&jsenabled=true"];
  this.mailURL="http://www.gmx.net/";
}
function getIconURL(){
  return "http://images.gmx.net/images/gmx/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/<a\s+href=\S+?>\s*(\S+?) ungelesene(?:n*) E-Mail(?:s*)<\/a>/);
  if(fnd){
    fnd=fnd[1].match(/<strong>(\d+)<\/strong>/);
    if(fnd)return fnd[1];
    else return 0;
  }else{
    return -1;
  }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    fnd=aData.match(/com.unitedinternet.mailclassic.mcgibase\s*=\s*"(\S+?)"[\s\S]+?com.unitedinternet.mailclassic.optlink\s*=\s*"(\S+?)"/);
    if(fnd){    
      this.mailURL=fnd[1]+"g.fcgi/application/navigator?"+fnd[2];
    }    
    var fnd=aData.match(/="(http\S+?startpage\?sid=\S+?)"/);
    if(fnd){
      this.dataURL=fnd[1].replace(/&amp;/g,"&");         
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}