/**********************************************************
WEB.DE
**********************************************************/
var name="WEB.DE";
var ver="2012-01-25";
var supportIncludeSpam=true;

function init(){
  this.dataURL="http://freemail.web.de/";
  this.loginData=["https://login.web.de/intern/login/","username","password",
                      "service="+encodeURIComponent("freemail")
                      +"&server="+encodeURIComponent("https://freemail.web.de")
                      ];
  this.mailURL="http://freemail.web.de/";
  
  this.cookieDomain="web.de";
}

function getCount(aData){
  if(this.isNew){
    var fnd=aData.match(/"mailbox_unread_inbox":(\d+)/);
    if(!fnd)return -1;
    var num=parseInt(fnd[1]);
    fnd=aData.match(/"mailbox_unread_unknown":(\d+)/);
    if(fnd)num+=parseInt(fnd[1]);
    return num;
  }else{
    var fnd=aData.match(/>E-Mails:\s*(\d+)/);
    if(!fnd)return -1;
    var num=0;
    var fnd=aData.match(/>(\d+) ungelesene E-Mail/);
    if(fnd)num+=parseInt(fnd[1]);
    fnd=aData.match(/Unbekannt: (\d+)/);
    if(fnd)num+=parseInt(fnd[1]);
    if(this.includeSpam){
      fnd=aData.match(/Spam:\s*(\d+)/);
      if(fnd)num+=parseInt(fnd[1]);
    }
    return num;
  }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    var fnd=aData.match(/<!-- server:\s+?(\S+)/);
    if(fnd){//old version
      var server=fnd[1];
      this.dataURL="https://"+server;
      fnd=aData.match(/<!-- page_template: nologout/);
      if(fnd){//nologout
        fnd=aData.match(/<a href="(\/online\/frame\S+?)"/);
        if(fnd){
          this.getHtml("https://"+server+fnd[1]);
          return false;
        }
      }
    }else{
      fnd=aData.match(/location.replace\('(\S+?)'/);
      if(fnd){
        this.isNew=true;
        if(fnd[1].match(/remindlogout/)){
          this.stage=ST_LOGIN_RES+2;
          this.getHtml(fnd[1]);
          return true;
        }else{
          this.stage=ST_LOGIN_RES+2;
          return this.process(aHttpChannel,aData);
        }
      }
      this.onError();
      return true;
    }
  case (ST_LOGIN_RES+1):  
    var fnd=aData.match(/top.location.href\s*=\s*"(\S+?)"/);
    if(fnd){
      this.mailURL=this.dataURL+fnd[1];
      fnd=aData.match(/<frame src="(\S+?)" name="content"/);
      if(fnd){
        this.dataURL=this.dataURL+fnd[1];      
        this.stage=ST_DATA;
      }
    }
    break;
  case (ST_LOGIN_RES+2):
    var fnd=aData.match(/location.replace\('(\S+?\/show\?(sid=\S+?))'/);
    if(fnd){
      this.dataURL="https://home.navigator.web.de/servicetrinity/data?"+fnd[2];
      this.mailURL=fnd[1];
      this.stage=ST_DATA;
      return this.process(aHttpChannel,aData);
    }
    this.onError();
    return true;
  }
  return this.baseProcess(aHttpChannel, aData);
}