/***********************************************************
GloboMail http://mail.globo.com
Version 1.0
***********************************************************/
var name="GloboMail";
var ver="2012-01-04";
var supportInboxOnly=true;
var supportShowFolders=true;
var supportIncludeSpam=true;

function init(){
  this.initStage=ST_PRE;

  var ar=this.user.split("@");
  this.baseURL="https://login.globo.com/login/1";
  this.loginData=[this.baseURL,"login-passaporte","senha-passaporte",
                    "botaoacessar=acessar&usar-sso=true&urlRetorno="+encodeURIComponent("http://www.globo.com/")];

  this.mailDomain="^mail.globo.com";
  this.dataURL=this.baseURL;
  this.mailURL=this.baseURL;
}
function getIconURL(){
  return "https://login.globo.com/favicon.ico";
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.stage=ST_LOGIN;
    var st="ST_PRE";
    this.getHtml(this.baseURL); // set cookie
    return true;
  case ST_LOGIN:
    this.stage=ST_LOGIN_RES;
    var st="ST_LOGIN";
    this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]);
    return true;
  case ST_LOGIN_RES:
    var st="ST_LOGIN_RES";
    var fnd=aData.match(/(name="SAMLResponse")/);
    if(fnd){
      var fnd2=aData.match(/form\s+action="(\S+?)"/);
      var post=getForm2(aData,"redir");
      if(fnd2)this.loginData[LOGIN_URL]=fnd2[1];
      if(post){
        this.stage=ST_LOGIN_RES+1;
        this.getHtml(this.loginData[LOGIN_URL],post);
	this.loginData[LOGIN_URL]=this.baseURL;
      }
      return true;
    }
    this.onError();
    return true;
  case (ST_LOGIN_RES+1):
    var st="ST_LOGIN_RES+1";
    this.stage=ST_LOGIN_RES+2;
    var fnd=aData.match(/["']\d+;url\s*?=\s*?(\S+?)['"]/);
    if(fnd) {
      fnd=fnd[1].replace(/&amp;/ig,"&");
      this.getHtml(fnd);
    }
    return true;
  case (ST_LOGIN_RES+2):
    var st="ST_LOGIN_RES+2";
    var fnd=aData.match(/GLOBALS=\[(?:(.*?),){10}/);
    if(fnd){
      fnd=fnd[1].replace(/\"/g,"");
      var fnd2=aData.match(/"application-url"\s+content="(\S+?)"/);
      if(fnd2)this.mailURL=fnd2[1]+"/";
      else this.mailURL=this.baseURL;
      this.dataURL=this.mailURL+"?ui=2&ik="+fnd+"&view=tl&start=0&num=25&rt=h&as_has=is%3Aunread&as_subset="+(this.inboxOnly?"inbox":"all")+"&search=adv";
      this.UI=2;
    }else{
      fnd=aData.match(/<base href="(\S+?)">/);
      if(fnd){
        this.mailURL=fnd[1];
        this.dataURL=fnd[1]+"?s=q&q=is%3Aunread"+(this.inboxOnly?"+in%3Ainbox":"");
        this.UI=0;
      }else{
        this.mailURL=this.baseURL;
        this.dataURL=this.baseURL+"?ui=1&view=tl&search=query&start=0&q=is%3Aunread"+(this.inboxOnly?"%20in%3Ainbox":"");
        this.UI=1;
      }
    }
    this.stage=ST_DATA;
    break;
  case (ST_LOGIN_RES+3):
    var post=this.getForm(aData,"hiddenpost");
    if(post){
      this.stage=ST_LOGIN_RES;
      this.getHtml("https://accounts.google.com/ServiceLoginAuth",post.replace(/&nojssubmit=\S+/,""));
      return true;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData){
  var fnd;
  if(this.UI==2){
    if(this.inboxOnly)fnd=aData.match(/"ld",\[\["\^ig?",(\d+)/);
    else fnd=aData.match(/D\(\["ti",.+?,(\d+)/);
    if(fnd){
      if(this.includeSpam){
        var fnd2=aData.match(/"ld",\[\[[\S\s]+?"\^s",(\d+)/);
        if(fnd2){
          var spam=parseInt(fnd2[1]);
          if(spam>0){
            this.spam=spam;
            return parseInt(fnd[1])+this.spam;
          }
        }
      }
      return fnd[1];
    }else return -1;
  }else if(this.UI==0){
    var spam=0;
    if(this.includeSpam){
      fnd=aData.match(/<a href="\?s=m"\s*\S+?\((\d+)\)/);
      if(fnd){
        spam=parseInt(fnd[1]);
        if(spam>0)this.spam=spam;
      }
    }
    if(this.inboxOnly){
      fnd=aData.match(/<\/h2>\s*<tr>\s*<td[\s\S]+?<a[\s\S]+?>.+?(?:&nbsp;\s*\(\s*(\d+)\s*\))?\s*</);
      return fnd?((fnd[1]?parseInt(fnd[1]):0)+spam):-1;
    }else{
      fnd=aData.match(/nvp_bbu_go[\s\S]+?<\/td>([\s\S]+?)<\/table>/);
      if(fnd){
        var n=0;
        var fnd2=fnd[1].match(/<b>(\S+)<\/b>(.+?)<b>(\d+)<\/b>(.+?)<b>(\S+)<\/b>/);
        if(fnd2){
          if(fnd2[2].indexOf("-")!=-1)n=isNaN(parseInt(fnd2[5]))?200:fnd2[5];
          else if(fnd2[4].indexOf("-")!=-1)n=isNaN(parseInt(fnd2[1]))?200:fnd2[1];
        }
        return parseInt(n)+spam;
      }else return -1;
    }
  }else{
    if(this.inboxOnly)fnd=aData.match(/"ds",\[\["inbox",(\d+)/);
    else fnd=aData.match(/D\(\["ts",\d*,\d*,(\d+)/);
    return fnd?fnd[1]:-1;
  }
}
function getDesc(){
  var n=this.calcCount();
  if(this.inboxOnly)return n>0?n:"";
  else return n>=100?"~"+n:(n>0?n:"");
}
function getMailURL(aFolder){
  if(aFolder){
    if(aFolder=="Spam"){
      if(this.UI==2)return this.mailURL+"#spam";
      else return this.mailURL+"?s=m";    
    }
    if(this.UI==2)return this.mailURL+"#label/"+encodeURIComponent(aFolder);
    else return this.mailURL+"?s=l&l="+encodeURIComponent(aFolder);
  }
  return this.mailURL;
}
function getData(aData){
  var obj={};
  if(!this.showFolders)return obj;
  var ar=[];
  var fnd;
  if(this.UI==0){
    fnd=aData.match(/<td class="?lb"?>([\s\S]+?)<a class="ml"/);
    if(fnd){
      var re=/<a href="(\S+?)">\s*<font[\s\S]+?>(.+?)(?:&nbsp;\s*\(\s*(\d+)\s*\))?\s*</g;
      var o;
      while ((o = re.exec(fnd[1])) != null){
        if(parseInt(o[3])>0){
          ar.push(o[2]);
          ar.push(o[3]);
        }
      }      
    }
  }else{
    if(this.UI==2)fnd=aData.match(/\["ld"\s*,\s*\[(?:,?\[.+?\]\n)+\]\n,\[((?:,?\[.+?\]\n)+)\]\n/);
    else fnd=aData.match(/\["ct"\s*,\s*\[([\s\S]*?)\]\n\]\n\)/);
    if(fnd){
      var re=/\[\"(.+)\"\s*,\s*(\d+)/g;
      var o;
      while ((o = re.exec(fnd[1])) != null){
        if(parseInt(o[2])>0){
          ar.push(o[1]);
          ar.push(o[2]);
        }
      }
    }
  }
  if(this.spam!=null){
    ar.push("Spam");
    ar.push(this.spam);
    delete this.spam;
  }      
  if(ar)obj.folders=ar;  
  return obj;
}
function getForm2(data,name){
  var st="getForm2";
  if(name){
    var reg=new RegExp("<form.+?name\\s*=\\s*[\"\']"+name+"[\"\']([\\S\\s]+?)<\/form>","i");
    var s=data.match(reg);
    if(!s)return "";
    data=s[1];
  }
  var re=/<textarea.+?name\s*=\s*['"](\S+?)['"].*?>([\s\S]+?)<\/textarea>/ig;
  var o;
  var post="";
  while ((o = re.exec(data)) != null){
    if(post)post+="&";
    o[2]=o[2].replace(/&amp;/ig,"&");
    post+=o[1]+"="+encodeURIComponent(o[2]);
  }
  return post;
}
