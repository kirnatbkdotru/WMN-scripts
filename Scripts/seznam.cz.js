/**********************************************************
Seznam
**********************************************************/
var name="Seznam.cz";
var ver="2010-11-03";
var hostString="seznam.cz";
function init(){  
  var ar=this.user.split("@");
	this.loginData=["https://login.szn.cz/loginProcess",null,null,
                    "username="+encodeURIComponent(ar[0])+"&domain="+encodeURIComponent(ar[1])+"&password="+encodeURIComponent(this.password)+"&serviceId=email"];
	this.dataURL="http://email.seznam.cz/folderScreen?sessionId=&js=1&welcome=1";
  this.mailURL="http://email.seznam.cz";
}
function getIconURL(){
	return "http://email.seznam.cz/img/favicon.ico";
}
function getCount(aData){
	var fnd=aData.match(/addListEvents.+?'inbox',\d+,.+?,(\d+)/);
	return fnd?fnd[1]:-1;
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:  
    var fnd=aData.match(/<meta.+?url=(\S+)"/);
    if(fnd){
      fnd=fnd[1].replace(/&amp;/g,"&");
      this.stage=ST_DATA;
      this.getHtml(fnd);
      return true;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
