/**********************************************************
163.com
**********************************************************/
var name="163";
var ver="2010-02-04";
var hostString="163.com";

function init(){
  this.dataURL="http://mail.163.com/";
  var ar=this.user.split("@");
  this.loginData=["https://reg.163.com/logins.jsp?type=1&product=mail163&url=http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight%3D1%26verifycookie%3D1%26language%3D-1%26style%3D-1","username","password","user="+encodeURIComponent(ar[0])];
  this.mailURL="http://mail.163.com/";
}

function getCount(aData){
  var fnd=aData.match(/folders\s+:\s+\[{'id':1.+?'unreadMessageCount':(\d+)/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    var fnd=aData.match(/URL=(\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1].replace(/&#(\d+)/g,function(){return String.fromCharCode(RegExp.$1);}));
      return false;
    }else break;
  case ST_LOGIN_RES+1:{
    var fnd=aData.match(/<iframe\s+src="(\S+?)"/);
    if(fnd){
      this.mailURL=this.channel.URI.spec;
      this.dataURL=this.channel.URI.spec.match(/.+\//)+fnd[1];
      this.stage=ST_DATA;
    }
    break;}
  }
  return this.baseProcess(aHttpChannel, aData);
}