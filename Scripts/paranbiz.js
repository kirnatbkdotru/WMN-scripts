/**********************************************************
ParanBiz
**********************************************************/
var name="ParanBiz";
var ver="2010-01-06";
 
function init(){
  var ar=this.user.split("@");
  this.dataURL="http://openmail.paran.com/"+ar[1];
  this.loginData=["http://openmail.paran.com/auth/login_x.php","","passwd","id="+encodeURIComponent(ar[0])+"&domain="+encodeURIComponent(ar[1])];
  this.mailURL="http://openmail.paran.com/"+ar[1];
}

function process(aHttpChannel, aData){
  switch(this.stage){
    case ST_LOGIN_RES:
      this.getHtml(this.dataURL);
      return false;
    case (ST_LOGIN_RES+1):
      var fnd=aData.match(/location.href=[\'\"](\S+?)\?(\S+?)[\'\"]/);
      if(fnd){
        this.dataURL=fnd[1]+"main/";
        this.mailURL=this.dataURL;
      }
      this.stage=ST_DATA;
      break;
  }
  return this.baseProcess(aHttpChannel, aData);
}

function getCount(aData){
  var fnd=aData.match(/\uc548 \uc77d\uc740 \ud3b8\uc9c0.+?(\d+)\ud1b5/); //find mail count
  if(fnd) {
    return fnd[1];
  }else{
    return -1;
  }
}