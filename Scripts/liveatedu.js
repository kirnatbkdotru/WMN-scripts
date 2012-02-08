/***********************************************************
Live@edu
***********************************************************/
var name="Live@edu";
var ver="2010-11-29";

function init(){
  this.initStage=ST_PRE;
  this.loginData=["","login","passwd"];
  this.dataURL="http://mail.live.com/?rru=inbox";
  this.mailURL="http://mail.live.com/?rru=inbox";
  this.mailDomain="mail.live.com";
}
function getIconURL(){
  return "http://login.live.com/favicon.ico";
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("http://mail.live.com");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/srf_uPost=\'([\s\S]+?)\'/);
    if(fnd){
      this.loginData[LOGIN_URL]=fnd[1];
      fnd=aData.match(/PPFT[\s\S]+?value=\"(\S+?)\"/);
      if(fnd){
        this.stage=ST_LOGIN;
        this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&PPFT="+encodeURIComponent(fnd[1]));
        return false;
      }
    }
    this.onError();
    return true;
  case ST_LOGIN_RES:    
    var fnd=aData.match(/replace\([\'\"](\S+?)[\'\"]/);
    if(fnd){
      this.getHtml(fnd[1]);
      return false;
    }
    break;
  case ST_LOGIN_RES+1:
    var fnd=aData.match(/<form.+?action="(.+?)"/);
    if(fnd){
      var re=/<input[^>]+?name\s*=\s*[\"\'](\S+?)[\"\'][^>]+?value\s*=s*[\"\']([\s\S]*?)[\"\']/ig;
      var o;
      var post="";
      while ((o = re.exec(aData)) != null){
        if(post)post+="&";
        post+=o[1]+"="+encodeURIComponent(o[2].replace(/&amp;/g,"&").replace(/&quot;/g,"\""));
      }    
      this.getHtml(fnd[1],post);
      return false;
    }
    break;
  case (ST_LOGIN_RES+2):
    var fnd=aData.match(/<form.+?action="(.+?)"/);
    if(fnd){
      var post=this.getForm(aData);
      this.getHtml(fnd[1],post);
      return false;
    }
    break;
  case ST_LOGIN_RES+3:    
    this.dataURL=aHttpChannel.URI.spec;
    this.mailURL=this.dataURL;
    this.stage=ST_DATA;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData){
  var fnd=aData.match(/<span id="spnFldrNm" fldrNm=.+?>(.+?)<\/a>/);
  if(fnd){
    var f2=fnd[1].match(/\(.+?>(\d+).+?\)/);
    return f2?f2[1]:0;
  }else return -1;
}