/**********************************************************
Clix
**********************************************************/
var name="Clix";
var ver="2011-01-04";
var hostString="clix.pt";

function init(){
  var ar=this.user.split("@");
  this.loginData=["http://auth.clix.pt/login/?request_uri=webmail.clix.pt",,"pass","login="+encodeURIComponent(ar[0])+"&domain="+encodeURIComponent(ar[1])];  
  this.dataURL="http://webmail.clix.pt/mail/showmail.pl?Folder=Inbox&unique=";
  this.mailURL="http://webmail.clix.pt/mail/showmail.pl?Folder=Inbox&unique=";
  this.logoutURL="http://auth.clix.pt/login/?logout=2";
}
function getCount(aData){
  var fnd=aData.match(/<font\s+class="smallbold">\(?(\d*)\)?</);
  return fnd?(fnd[1]?fnd[1]:0):-1;
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES: 
    this.stage=ST_DATA;
    this.getHtml("http://webmail.clix.pt/mail/");
    return true;
  }
  return this.baseProcess(aHttpChannel, aData);  
}
