/**********************************************************
NetEase
**********************************************************/
var name="\u7F51\u6613";
var ver="2010-02-04";

function init(){
  this.loginData=["https://reg.163.com/logins.jsp","username","password"];
  var ar=this.user.split("@");  
  if(ar[1]=="126.com"){
    this.dataURL="http://entry.mail.126.com/cgi/ntesdoor?funcid=getusrnewmsgcnt&fid=1&addSubFdrs=1&language=0&style=0&template=newmsgres_urs_2008.htm&username="+this.user;
    this.mailURL="http://entry.mail.126.com/cgi/ntesdoor?verifycookie=1&lightweight=1";
    this.loginData[3]="type=1&product=mail126";
  }else if (ar[1]=="yeah.net"){
    this.dataURL="http://entry.yeah.net/cgi/ntesdoor?funcid=getusrnewmsgcnt&fid=1&addSubFdrs=1&language=0&style=0&template=newmsgres_urs_2008.htm&username="+this.user;
    this.mailURL="http://entry.yeah.net/cgi/ntesdoor?verifycookie=1&lightweight=1";
    this.loginData[3]="type=1&product=mailyeah";
  }else{
    this.dataURL="http://fm163.163.com/coremail/fcg/ntesdoor2?funcid=getusrnewmsgcnt&fid=1&addSubFdrs=1&language=0&style=0&template=newmsgres_urs_2008.htm&username="+this.user;
    this.mailURL="http://fm163.163.com/coremail/fcg/ntesdoor2?verifycookie=1&lightweight=1";  
    this.loginData[3]="type=1&product=mail163";
  }
}

function getCount(aData){
  var fnd=aData.match(/var\s+res\s+=\s+(\d+);/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:{
    var fnd=aData.match(/URL=(\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1].replace(/&#(\d+)/g,function(){return String.fromCharCode(RegExp.$1);}));
      return false;
    }else break;}
  case ST_LOGIN_RES+1:{
    var fnd=aData.match(/URL=(\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1].replace(/&#(\d+)/g,function(){return String.fromCharCode(RegExp.$1);}));
      return false;
    }else{
      this.stage=ST_DATA;    
      break;
    }
    }    
  case ST_LOGIN_RES+2:
      this.stage=ST_DATA;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}