/**********************************************************
Tiscali.co.uk
**********************************************************/
var name="Tiscali.co.uk";
var ver="2010-04-23";

function init() {
  this.dataURL = "http://www.talktalk.co.uk/mail/?lpos=header-core&lid=My_Mail";
  var ar=this.user.split("@");  
  this.loginData = ["http://webmail.tiscali.co.uk/cp/ps/main/login/Authenticate","email","password","l=en&d="+encodeURIComponent(ar[1])+"&u="+encodeURIComponent(ar[0])+"&screenname="+encodeURIComponent(this.user)+"&fu=http%3A%2F%2Fwww.talktalk.co.uk%2Fmail%2Findex.html&fp=error&sitedomain=info.aol.co.uk&lang=en&siteState=OrigUrl%253Dhttp%253A%252F%252Fwebmail.talktalk.net%252F&locale=gb&entryType=sideDoor"];
  this.mailURL = "http://www.talktalk.co.uk/mail/?lpos=header-core&lid=My_Mail";
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    var fnd=aData.match(/hmAppUrl\["Mail"\]="(\S+?)"/);
    if(fnd){
      this.mailURL="http://webmail.tiscali.co.uk"+fnd[1];
      fnd=aData.match(/<iframe src="(\S+?Counters\S+?)"/);
      if(fnd){
        this.dataURL="http://webmail.tiscali.co.uk"+fnd[1];
        this.stage=ST_DATA;
      }
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData) {
  var fnd = aData.match(/New Mails.+?<a.+?>(\d+)</);
  if(fnd)return fnd[1];  
  else return -1;
}