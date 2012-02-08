/**********************************************************
Facebook
**********************************************************/
var name="Facebook";
var ver="2012-01-21";
var supportInboxOnly=true;
var supportShowFolders=true;

function init(){
  this.initStage=ST_PRE;
  this.dataURL="http://www.facebook.com/home.php";
  this.loginData=["https://www.facebook.com/login.php?login_attempt=1","email","pass","persistent=1"];
  this.mailURL="http://www.facebook.com/home.php";
  this.cookieDomain="facebook.com";
}
function getData(aData){
  var obj={};
  var fnd=aData.match(/<span id="messagesCountValue">(\d+)[\s\S]+?<span id="notificationsCountValue">(\d+)</);
  if(fnd){
    this.mailCount=parseInt(fnd[1]);
    var ar=[];
    if(this.showFolders){      
      var n=parseInt(fnd[1]);
      if(n>0){ar.push("Messages");ar.push(n);}
      n=parseInt(fnd[2]);
      if(n>0){ar.push("Notifications");ar.push(n);}
      
    }    
    if(!this.inboxOnly){
      this.mailCount+=parseInt(fnd[2]);
      var re=/<div class="UIImageBlock_Content UIImageBlock_ICON_Content">(.+?)<\/div>.+?<span class="countValue.+?>(\d+)</g;
      var o;
      while ((o = re.exec(aData)) != null){
        var n=parseInt(o[2]);
        this.mailCount+=n;
        if(this.showFolders&&n>0){ar.push(o[1]);ar.push(n);}
      }
    }    
    if(this.showFolders)obj.folders=encodeArray(ar);
  }
  return obj;
}
function getMailURL(aFolder){
  if(aFolder=="Messages"){
    return "http://www.facebook.com/?sk=messages";
  }else if(aFolder=="Notifications"){
    return "http://www.facebook.com/notifications.php";
  }
  return this.mailURL;
}
function checkLogin(aData){
  switch(this.stage){
  case ST_CHECK:
    if(this.cookies&&this.setCookies){//for Chrome & Opera
      this.stage=ST_DATA;
      this.setCookies();      
      return true;
    }else{
      this.getHtml(this.mailURL);
      return false;
    }
  case ST_CHECK+1:
    var post=this.getForm2(aData,"logout_form");
    if(post){
      if(this.browser=="firefox"){
        this.stage=ST_DATA_RES;
        return this.process(null,aData);
      }else{
        this.stage=this.initStage;
        this.getHtml("https://www.facebook.com/logout.php",post);
        return true;
      }
    }else{
      this.stage=this.initStage;
      return this.process(null,aData);
    }
  }
}
function process(aHttpChannel, aData){
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://login.facebook.com/login.php");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/name="lsd"\s+value="(\S*?)"/);
    if(fnd){
      try{
      var ck=this.getCookieString("facebook.com","datr");
      if(ck){
        this.cookieManager.addCookies(aHttpChannel.URI,ck);
      }
      }catch(e){}
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&lsd="+encodeURIComponent(fnd[1]));
      return false;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}

function getForm2(data,name){
  if(name){
    var reg=new RegExp("<form.+?id\\s*=\\s*[\"\']"+name+"[\"\']([\\S\\s]+?)<\/form>","i");
    var s=data.match(reg);
    if(!s)return "";
    data=s[1];
  }
  var re=/<input[^>]+?name\s*=\s*[\"\'](\S+?)[\"\'][^>]+?value\s*=s*[\"\']([\s\S]*?)[\"\']/ig;
  var o;
  var post="";
  while ((o = re.exec(data)) != null){
    if(post)post+="&";
    post+=o[1]+"="+encodeURIComponent(o[2]);
  }
  return post;
}