/**********************************************************
webmail.muenster.de (webmail.versatel.de/muenster)
**********************************************************/
var name="muenster.de";
var ver="2010-10-30";

function init(){  
  this.loginData=["https://webmail.versatel.de/ajax/login?action=login","name","password"];
  this.mailURL="https://webmail.versatel.de/muenster/ox.html"; 
}
function getCount(aData){
  var fnd=aData.match(/"unread":(\d+)/);
  return fnd?fnd[1]:-1
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:  
    var fnd=aData.match(/"session":"(\S+?)"/);
    if(fnd){
      this.dataURL="https://webmail.versatel.de/ajax/multiple?session="+fnd[1];
      this.stage=ST_DATA;
    }
  case ST_DATA:  
    this.getHtml(this.dataURL,
      '[{"module":"folder","action":"get","id":"default0/INBOX","folder":"default0/INBOX","columns":"1,311"}]',
      {"Content-Type":"text/javascript; charset=UTF-8"},"PUT"); 
    return false;
  }
  return this.baseProcess(aHttpChannel, aData);
}
