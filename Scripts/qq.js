/**********************************************************
QQ
**********************************************************/
var name="QQ";
var ver="2011-11-05";

function init(){
  this.name="QQ";
  this.initStage=ST_PRE;
  this.dataURL="http://mail.qq.com/";
  this.loginData=["https://mail.qq.com/cgi-bin/login"];
  this.mailURL="http://mail.qq.com/";
}

function getCount(aData){
   var fnd=aData.match(/\u90ae\u4ef6\uff1a<b>.*?(\d+).*?<\/b>/);
   if(fnd){
     return fnd[1];
   }else{
     return -1;
   }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("https://mail.qq.com/cgi-bin/loginpage");
    return false;
  case ST_PRE_RES:
	var ar=this.user.split("@");
    this.stage=ST_LOGIN;
    this.getHtml(this.loginData[LOGIN_URL],
                    "pwd="+encodeURIComponent(this.password)
                      +"&uin="+encodeURIComponent(ar[0])
                      +"&aliastype=%40"+encodeURIComponent(ar[1]))+"&btlogin=+%E7%99%BB%E5%BD%95+";
    return false;
  case ST_LOGIN_RES:
    var fnd=aData.match(/urlHead="(\S+?)"/);
    if(fnd){
      var url=fnd[1];
      fnd=aData.match(/urlHead\s*?\+\s*?"(\S+?)"/);
      if(fnd){
        url+=fnd[1];
        this.dataURL=url.replace("frame_html","today");
        fnd=aData.match(/targetUrl\+="(\S+?)"/);
        if(fnd){
          this.mailURL=url+fnd[1];
          break;
        }
      }
    }
    this.onError();
    return true;
  }
  return this.baseProcess(aHttpChannel, aData);
};
