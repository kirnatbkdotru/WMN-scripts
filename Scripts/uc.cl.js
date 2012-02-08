/***********************************************************
uc.cl(Gmail)
***********************************************************/
var name="uc.cl";
var ver="2012-01-10";
var supportInboxOnly=true;
var supportShowFolders=true;
var hostString="";

function init(){
  this.initStage=ST_PRE;
  this.dataURL="https://mail.google.com/mail/";
  this.mailURL="https://mail.google.com/mail/";//used in below process!
  this.mailDomain=".+?.google.com";                          
  this.loginData=["https://webaccess.uc.cl/simplesaml/module.php/core/loginuserpass.php?","username","password"];
}
function getIconURL(){
  return "https://webaccess.uc.cl/simplesaml/resources/img/favicon.ico";
}
function getIconPage(){
  return "https://webaccess.uc.cl/";
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://webaccess.uc.cl/simplesaml/");
    return false;
  case ST_PRE_RES:
    this.stage=ST_LOGIN;
    this.getHtml("http://mail.google.com/a/uc.cl");  
    return true;
  case ST_LOGIN:
    var post=this.getForm2(aData);
    post=post.replace(/username=&password=/,this.loginData[LOGIN_POST]);      
    this.getHtml(this.loginData[LOGIN_URL],post);    
    return false;
  case ST_LOGIN_RES:    
    var post=this.getForm3(aData);    
    this.getHtml("https://www.google.com/a/uc.cl/acs",post);    
    return false;    
  case ST_LOGIN_RES+1:
  case ST_LOGIN_RES+2:    
    var fnd=aData.match(/<meta.+?url=(?:&#39;)?(\S+)"/);
    if(fnd){
      fnd=fnd[1].replace(/&amp;/g,"&");
      this.getHtml(fnd);
      return false;
    }
    break;
  case ST_LOGIN_RES+3:
    var fnd=aData.match(/GLOBALS=\[(?:(.*?),){10}/);
    if(fnd){
      fnd=fnd[1].replace(/\"/g,"");
      this.dataURL=this.mailURL+"?ui=2&ik="+fnd+"&view=tl&start=0&num=25&rt=h&as_has=is%3Aunread&as_subset="+(this.inboxOnly?"inbox":"all")+"&search=adv";
      this.newUI=true;
    }else{
      this.dataURL=this.mailURL+"?ui=1&view=tl&search=query&start=0&q=is%3Aunread"+(this.inboxOnly?"%20in%3Ainbox":"");
      this.newUI=false;
    }
    this.stage=ST_DATA;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData){
  var fnd;
  if(this.newUI){
    if(this.inboxOnly)fnd=aData.match(/"ld",\[\["\^ig?",(\d+)/);
    else fnd=aData.match(/D\(\["ti",.+?,(\d+)/);
  }else{
    if(this.inboxOnly)fnd=aData.match(/"ds",\[\["inbox",(\d+)/);
    else fnd=aData.match(/D\(\["ts",\d*,\d*,(\d+)/);
  }  
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}
function getDesc(){
  var n=this.calcCount();
  if(this.inboxOnly)return n>0?n:"";
  else return n>=100?"~"+n:(n>0?n:"");
}
function getMailURL(aFolder){
  if(aFolder){
    if(this.newUI)return this.mailURL+"#label/"+encodeURIComponent(aFolder);
    else return this.mailURL+"?s=l&l="+encodeURIComponent(aFolder);
  }
  return this.mailURL;  
}
function getData(aData){
  var obj={};
  if(!this.showFolders)return obj;
  var fnd;
  if(this.newUI)fnd=aData.match(/\["ld"\s*,\s*\[(?:,?\[.+?\]\n)+\]\n,\[((?:,?\[.+?\]\n)+)\]\n/);
  else fnd=aData.match(/\["ct"\s*,\s*\[([\s\S]*?)\]\n\]\n\)/);
  if(fnd){
    var re=/\[\"(.+)\"\s*,\s*(\d+)/g;
    var o;
    var ar=[];
    while ((o = re.exec(fnd[1])) != null){
      if(parseInt(o[2])>0){
        ar.push(o[1]);
        ar.push(o[2]);
      }
    }
    if(ar)obj.folders=ar;
  }
  return obj;
}
function getForm2(data){
  var re=/<input[^>]+?value\s*=s*[\"\']([\s\S]*?)[\"\'][^>]+?name\s*=\s*[\"\'](\S+?)[\"\']/ig;
  var o;
  var post="";
  while ((o = re.exec(data)) != null){
    if(post)post+="&";
    post+=o[2]+"="+encodeURIComponent(o[1]);
  }
  return post;
}
function getForm3(data){
  var re=/<input[^>]+?name\s*=\s*[\"\'](\S+?)[\"\'][^>]+?value\s*=s*[\"\']([\s\S]*?)[\"\']/ig;
  var o;
  var post="";
  while ((o = re.exec(data)) != null){
    if(post)post+="&";
    post+=o[1]+"="+encodeURIComponent(o[2].replace(/&amp;/g,"&"));
  }
  return post;
}
