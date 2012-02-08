/**********************************************************
Twitter
**********************************************************/
var name="Twitter";
var ver="2011-12-19";
var supportInboxOnly=true;
var supportShowFolders=true;
var noCounterReset=true;

function init(){
  this.initStage=ST_LOGIN;
  this.dataURL="http://twitter.com/";
  this.loginData=["https://twitter.com/sessions?phx=1","session%5Busername_or_email%5D","session%5Bpassword%5D"];
  this.mailURL="http://twitter.com/";
}
function getData(aData){
  var obj={};
  this.mailCount=this.calcCount0()+this.countMentions+(this.inboxOnly?0:this.countHome);
  if(this.showFolders)obj.folders=this.getFolders();
  return obj;
}
function getFolders(){
  var ar=[];
  if(!this.inboxOnly&&this.countHome>0){ar.push("Home");ar.push(this.countHome);}
  if(this.countMentions>0){ar.push("Mentions");ar.push(this.countMentions);}
  var cnt=this.calcCount0();
  if(cnt>0){ar.push("Messages");ar.push(cnt);}
  return encodeArray(ar);
}
function checkLogin(aData){
  switch(this.stage){
  case ST_CHECK:
    this.getHtml(this.mailURL);
    return false;
  case ST_CHECK+1:
    var s=aData.match(/<form.+?"signout-form"/);      
    var post;
    if(s){
      var fnd=aData.match(/value='(\S+?)'.+?'authenticity_token'/);    
      if(fnd)post=fnd[1];
    }
    if(post){
      var fnd=aData.match(new RegExp("currentUserScreenName\\s*=\\s*\'"+this.user+"\'"));
      if(fnd){
        this.stage=ST_DATA;
        return this.process(null,aData);        
      }    
      this.stage=this.initStage;
      this.getHtml("http://twitter.com/logout",post);
      return true;
    }else{
      this.stage=this.initStage;
      return this.process(null,aData);
    }
  }    
}
function process(aHttpChannel, aData){
  switch(this.stage){
  case ST_LOGIN_RES:
    var fnd=aData.match(/(https:\/\/api-secure.recaptcha.net\/challenge\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1]);
      return false;
    }
    this.stage=ST_DATA;  
  case ST_LOGIN_RES+1:
    if(this.stage==ST_LOGIN_RES+1&&this.main.openCaptchaDialog){
      var fnd=aData.match(/challenge\s*:\s*'(\S+?)'/);
      if(fnd){
        var rs=this.main.openCaptchaDialog(this.id,this.user,"https://www.google.com/recaptcha/api/image?c="+fnd[1]);
        if(rs){
          var post=this.loginData[LOGIN_POST]+"&authenticity_token="+this.authToken+"&recaptcha_challenge_field="+encodeURIComponent(fnd[1])+"&recaptcha_response_field="+encodeURIComponent(rs);
          this.stage=ST_DATA;
          this.getHtml(this.loginData[LOGIN_URL],post);
          return true;
        }
        this.onError();
        return true;
      }
    }
  case ST_DATA:
    this.stage=ST_DATA_RES+1;
    var latest=this.wuGetVal(2);    
    this.getHtml("https://api.twitter.com/1/direct_messages.json?count=50"+(latest?"&since_id="+latest:""),null,
              {"Accept": "application/json, text/javascript, *\x5C*","X-Requested-With": "XMLHttpRequest","X-PHX": "true"});    
    return true;
  case ST_DATA_RES+1:
    var fnd=aData.match(/"id":\d+/g);
    if(fnd||aData=="[]"){
      var obj=eval(aData);
      this.countMessage=obj.length;
      if(this.countMessage>0){
        this.dataMessage=obj[0].id_str;
      }
      this.stage=ST_DATA_RES+2;
      var latest=this.wuGetVal(0);
      this.getHtml("https://api.twitter.com/1/statuses/mentions.json?"+(latest?"since_id="+latest+"&":"")+"include_entities=1&contributor_details=true",null,
              {"Accept": "application/json, text/javascript, *\x5C*","X-Requested-With": "XMLHttpRequest","X-PHX": "true"});    
      return true;      
    }
    break;  
  case ST_DATA_RES+2:{
    var obj=eval(aData);  
    this.countMentions=obj.length;
    if(this.countMentions>0){
      this.dataMentions=obj[0].id_str;
    }
    if(!this.inboxOnly){
      var latest=this.wuGetVal(1);
      this.getHtml("https://api.twitter.com/1/statuses/home_timeline.json?"+(latest?"since_id="+latest+"&":"")+"include_entities=1&contributor_details=true",null,
              {"Accept": "application/json, text/javascript, *\x5C*","X-Requested-With": "XMLHttpRequest","X-PHX": "true"});    
      return false;
    }else{
      this.stage=ST_DATA_RES;    
    }
    break;}
  case ST_DATA_RES+3:{ 
    var obj=eval(aData);      
    this.countHome=obj.length;
    if(this.countHome>0){
      this.dataHome=obj[0].id_str;
    }  
    this.stage=ST_DATA_RES;
    break;}
  }
  return this.baseProcess(aHttpChannel, aData);  
}
function getMailURL(aFolder){
  if(this.dataMessage){
    this.wuSetVal(2,this.dataMessage);
    delete this.dataMessage;
    this.countMessage=0;
  }
  if(this.dataMentions){
    this.wuSetVal(0,this.dataMentions);
    delete this.dataMentions;
    this.countMentions=0;
  }
  if(this.dataHome){
    this.wuSetVal(1,this.dataHome);
    delete this.dataHome;
    this.countHome=0;
  }  
  if(this.mailCount>0)this.mailCount=0;
  this.mailData.folders=this.getFolders();  
  this.mailData.desc=this.getDesc();    
  this.main.setState(this.main.MSG_MAILDATA,this.ind);

  if(aFolder=="Mentions"){
    return "http://twitter.com/#!/mentions";
  }else if(aFolder=="Messages"){
    return "http://twitter.com/#inbox";
  }  
  return this.mailURL;
}
function calcCount0() {
  var aCount=this.countMessage;  
  if(aCount>=0){
    var count=this.loadCount();
    if(aCount>=count)aCount-=count;
    else{
      this.saveCount(aCount>0?aCount:0)
      aCount=0;
    }      
  }
  return aCount;
}
function calcCount() {
  return this.mailCount<0?-1:(this.calcCount0()+this.countMentions+(this.inboxOnly?0:this.countHome));
}
