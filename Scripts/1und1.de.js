/**********************************************************
1und1.de
**********************************************************/
var name="1und1.de";
var ver="2010-09-24";

function init(){  
  this.loginData=["https://email.1und1.de/ajax/login?action=login","name","password"];
  this.mailURL="https://email.1und1.de/ox.html"; 
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
      this.dataURL="https://email.1und1.de/ajax/multiple?session="+fnd[1];
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
