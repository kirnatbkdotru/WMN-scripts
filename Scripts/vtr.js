/**********************************************************
vtr Mail
**********************************************************/
var name="vtr Mail";
var ver="2012-01-27";
var hostString="vtr.net";

function init(){  
  this.loginData=["http://webmail.vtr.net/","Username","Password"];
  this.dataURL="http://webmail.vtr.net/";
  this.mailURL="http://webmail.vtr.net/";
}
function getCount(aData){
  var fnd=aData.match(/Mensajes[\s\S]+?<td>\d+\s*(:?.+?>(\d+)\s+Sin leer)?/);  
  return fnd?(fnd[2]?fnd[2]:0):-1;
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES: 
    this.mailURL=this.channel.URI.spec;
    var fnd=this.mailURL.match(/(\S+\/)frameset.wssp/);
    if(fnd)this.dataURL=fnd[1]+"hello.wssp";
    break;
  }
  return this.baseProcess(aHttpChannel, aData);  
}
