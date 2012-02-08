/***********************************************************
Google Reader
***********************************************************/
var name="Google Reader";
var ver="2011-09-13";
var hostString="gmail.com";
var supportShowFolders=true;

function init(){
  this.initStage=ST_PRE;
  this.dataURL="https://www.google.com/reader/view/";                        
  this.loginData=["https://accounts.google.com/ServiceLoginAuth?service=reader",
                    "Email","Passwd",
                    "continue="+encodeURIComponent(this.dataURL)];
  this.mailURL="https://www.google.com/reader/view/";
  this.mailDomain=".+?.google.com";    
}
function getIconURL(){
  return "http://www.google.com/reader/ui/favicon.ico";
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://accounts.google.com/ServiceLoginAuth?service=reader");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/GALX[\s\S]+?value=\"(\S+?)\"/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&GALX="+encodeURIComponent(fnd[1]));
      return false;
    }
    break;
  case ST_LOGIN_RES:
    var fnd=aData.match(/<meta.+?url=(?:'|&#39;)(\S+)(?:'|&#39;)/);
    if(fnd){
      fnd=fnd[1].replace(/&amp;/g,"&");
      this.getHtml(fnd);
      return false;
    }
    break;
  case (ST_LOGIN_RES+1):
    this.stage=ST_DATA_RES;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
function getCount(aData){
  return -1;
}
function getMailURL(aFolder){
  if(aFolder){
    return this.mailURL+this.folders[aFolder];
  }
  return this.mailURL;  
}
function getData(aData){
  var obj={};
  if(!this.showFolders)return obj;
  var fnd=aData.match(/unreadcounts:\[([\s\S]*?)\]}/);
  if(fnd){
    this.mailCount=0;
    if(fnd[1]){
      this.folders={};      
      var re=/id:"(.+?)"\s*,\s*count:(\d+)/g;
      var o;
      var ar0=[];
      while ((o = re.exec(fnd[1])) != null){
        if(o[1].indexOf("user/")==0)continue;
        if(parseInt(o[2])>0){
          this.mailCount+=parseInt(o[2]);
          var t={}
          t.id=o[1];
          t.num=o[2];
          ar0.push(t);
        }
      }
      if(ar0){
        fnd=aData.match(/subscriptions:\[([\s\S]*?)\]}/);
        if(fnd&&fnd[1]){
          for(var i=0;i<ar0.length;i++){
            var reg=new RegExp(ar0[i].id.replace(/[?\\]/g,"\\$&")+"\"\\s*,\\s*title:\"(.+?)\"[\\s\\S]+?sortid:\"(\\S+?)\"");
            var f=fnd[1].match(reg);
            if(f){
              this.folders[f[1]]=ar0[i].id;    
              ar0[i].id=f[1];
              ar0[i].sortid=f[2];
            }
          }
        }
        if(aData.match(/\\"ssa\\":\\"false\\"/)){
          fnd=aData.match(/id:"subscription-ordering"\s*,\s*value:"(\S+?)"/);
          if(fnd){
            var ar1={}
            for(var i=0;i<ar0.length;i++){
              ar1[ar0[i].sortid]=ar0[i];
            }
            ar0=[];          
            var s=fnd[1];
            for(var i=0;i<=s.length-8;i+=8){
              var t=s.substring(i,i+8);
              if(ar1[t])ar0.push(ar1[t]);
            }
          }
        }else ar0.sort(this.sortFunc);
        var ar=[];
        for(var i=0;i<ar0.length;i++){
          ar.push(ar0[i].id);
          ar.push(ar0[i].num);
        }
        obj.folders=encodeArray(ar);
      }
    }
  }else this.mailCount=-1;
  return obj;
}
function sortFunc(a,b) {
  if(a.id<b.id)return -1;
  else if(a.id==b.id)return 0;
  else return 1;
}
