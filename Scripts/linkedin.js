/**********************************************************
LinkedIn
**********************************************************/
var name="LinkedIn";
var ver="2012-01-28";

function init(){
  this.initStage=ST_PRE;
  this.loginData=["https://www.linkedin.com/uas/login-submit","session_key","session_password","session_login=Sign+In"];
  this.dataURL="http://www.linkedin.com/";
  this.mailURL="http://www.linkedin.com/inbox/messages/received";
}
function getCount(aData) {
  var fnd=aData.match(/<li id="nav-primary-inbox"[\S\s]+?(?:<span id="nav-primary-inbox-item-total"[\S\s]*?>\s*?(\d+)\s*?<\/span>\s+?)?<\/span>/);
  if(fnd) {
    return fnd[1]?fnd[1]:0;
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    if(this.getCookieString){
      var ck=this.getCookieString("linkedin.com","bcookie");
      if(ck){      
        this.cookieManager.addCookies("http://www.linkedin.com",ck);
      }  
    }
    this.getHtml("http://www.linkedin.com");
    return false;
  case ST_PRE_RES:
    this.stage=ST_LOGIN;
    break;
  case ST_LOGIN_RES:  
    var fnd=aData.match(/<input.+?type="hidden".+?name="csrfToken".+?value="(.+?)"/);
    if(fnd){
      this.post=this.getForm(aData,"login");
      var fnd2=aData.match(/(https:\/\/api-secure.recaptcha.net\/challenge\S+?)"/);
      if(fnd2){
        this.getHtml(fnd2[1]);
        return false;
      }      
    }
    break;
  case ST_LOGIN_RES+1:  
    if(this.main.openCaptchaDialog){  
      var fnd=aData.match(/challenge\s*:\s*'(\S+?)'/);
      if(fnd){
        var rs=this.main.openCaptchaDialog(this.id,this.user,"https://www.google.com/recaptcha/api/image?c="+fnd[1]);
        if(rs){
          this.post+="&recaptcha_challenge_field="+encodeURIComponent(fnd[1])+"&recaptcha_response_field="+encodeURIComponent(rs);
          this.getHtml(this.loginData[LOGIN_URL],this.post);
          delete this.post;
          return false;
        }
        this.onError();
        return true;
      }
    }
    this.stage=ST_DATA;
    break;
  case (ST_LOGIN_RES+2):
    this.stage=ST_DATA;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
