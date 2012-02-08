/**********************************************************
eBay

server to 'ebay.co.uk' if you want to use www.ebay.co.uk
**********************************************************/
var name="eBay";
var ver="2011-01-20";
var needServer=true;

function init(){
  this.initStage=ST_PRE;
  if(!this.server)this.domain="ebay.com";
  else{
    var n=this.server.indexOf("://");
    if(n!=-1)this.server=this.server.substring(n+3);
    n=this.server.indexOf("www.");
    if(n!=-1)this.server=this.server.substring(n+4);    
    this.domain=this.server;
  }

  this.loginData=["https://signin."+this.domain+"/ws/eBayISAPI.dll?co_partnerId=2&siteid=0&UsingSSL=1","userid","pass"];
  this.dataURL="http://my."+this.domain+"/ws/eBayISAPI.dll?MyMessagesFolderView&&FClassic=true&ssPageName=STRK:ME:MMX&CurrentPage=MyeBayMyMessages";
  this.mailURL=this.dataURL;
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://signin."+this.domain+"/ws/eBayISAPI.dll?SignIn");
    return false;
  case ST_PRE_RES:
    var post=this.getForm(aData,"SignInForm");
    if(post){
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],post+"&"+this.loginData[LOGIN_POST]);
      return false;
    }
    break;    
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData) {
  var fnd=aData.match(/id="count".*?(?:\((\d+)\))?<\/span>/);
  if(fnd){
    return fnd[1]?fnd[1]:0;
  }else{
    return -1;
  }
}