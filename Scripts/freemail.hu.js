/**********************************************************
freemail.hu
**********************************************************/
var name="freemail.hu";
var ver="2010-09-20";
var hostString="freemail.hu";

function init(){
  this.loginData=["https://belepes.t-online.hu:443/auth.html","user","pass",
                     ".formId=commands.PlusAuth&backurl=http%3A%2F%2Fwww.freemail.hu%2Fmail%2Fmain.fm%3Fcheckuser%3D1&cmd=plusauth&remoteform=1"];
  this.dataURL="http://freemail.hu/szimpla/";
  this.mailURL="http://www.freemail.hu/mail/main.fm#fm";
}
function getIconURL(){
  return "http://www.freemail.hu/gfx/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/value="\xE9rkezett".+?\((\d+)/);
  return fnd?fnd[1]:-1
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    this.getHtml("http://freemail.hu/szimpla/");
    return false;
  case ST_LOGIN_RES+1:
    var fnd=aData.match(/URL=(\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1]);
      return false;
    }
    break;
  case ST_LOGIN_RES+2:
    var fnd=aData.match(/url=(\S+?)"/);
    if(fnd){
      this.dataURL=fnd[1];
      this.stage=ST_DATA;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
