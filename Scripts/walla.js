/**********************************************************
Walla
**********************************************************/
var name="Walla";
var ver="2010-09-26";

function init(){  
  this.initStage=ST_PRE;
  this.loginData=["https://friends.walla.co.il/ts.cgi","username","password",
                    "w=%2F%40login.commit&ReturnURL=http%3A%2F%2Fnewmail.walla.co.il%2Fts.cgi"];
  this.dataURL="http://newmail.walla.co.il/ts.cgi";
  this.mailURL="http://newmail.walla.co.il/ts.cgi"; 
}
function getCount(aData){
  var fnd=aData.match(/"id"\s*:\s*"-1000".+?"unreadItems"\s*:\s*"(\d*)"/);
  return fnd?(fnd[1]?fnd[1]:0):-1
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("http://friends.walla.co.il/?w=/@login&theme=&ReturnURL=http%3A%2F%2Fnewmail.walla.co.il%2Fts.cgi");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/SRC="(\S+?)"\s+name="walla_ad_top"/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.getHtml(fnd[1]);
      return true;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);  
}