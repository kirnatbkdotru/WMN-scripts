/**********************************************************
MobileMe
**********************************************************/
var name="MobileMe";
var ver="2011-02-17";
var hostString="me.com";

function init(){
  this.initStage=ST_PRE;
  this.loginData=["https://auth.me.com/authenticate","username","password"];  
  this.dataURL="https://www.me.com/wm/folder";
  this.mailURL="https://www.me.com/mail/";  
  this.xpost='{"jsonrpc":"2.0","id":"0/0","method":"list"}';
}
function getCount(aData){
  var fnd=aData.match(/"CoreMail.Folder",\s*(?:"unread"\s*:\s*(\d+))?[\s\S]+?"guid"\s*:\s*"folder:INBOX"/);
  return fnd?(fnd[1]?fnd[1]:0):-1;
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    var aData=this.getHtml("https://auth.me.com/authenticate?service=mail&ssoNamespace=appleid&formID=loginForm&returnURL=aHR0cHM6Ly93d3cubWUuY29tL21haWwv");
    this.header={"Content-Type":"application/json-rpc; charset=UTF-8","X-Mobileme-Version":"1.0",
    "Accept":"application/json-rpc","Referer":"https://www.me.com/mail/"};
    return false;
  case ST_PRE_RES:
    var post=this.getForm(aData,"loginForm");
    if(post){
      post=post.replace(/&username=&password=/,"");
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&"+post);
      return false;      
    }
    break;
  case ST_LOGIN_RES:  
    this.getHtml("https://www.me.com/wm/preference",this.xpost,this.header);
    return false;
  case ST_LOGIN_RES+1:  
    var isc=this.cookieManager.findCookie("me.com","isc-www.me.com");
    if(isc){
      this.header["X-Mobileme-Isc"]=isc;
      this.stage=ST_DATA;
    }else break;
  case ST_DATA:     
    this.getHtml("https://www.me.com/wm/folder",this.xpost,this.header);
    return false;
  }
  return this.baseProcess(aHttpChannel, aData);
}