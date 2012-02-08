/**********************************************************
Abv.bg
**********************************************************/
var name="Abv.bg";
var ver="2010-10-24";

function init(){  
  this.initStage=ST_PRE;
	this.loginData = ["https://passport.abv.bg/acct/passport/login"];
	this.dataURL = "https://passport.abv.bg/api/checkMailService?username="+encodeURIComponent(this.user)+"&password="+encodeURIComponent(this.password);
}
function getIconURL(){
	return "http://img.abv.bg/favicon.ico";
}
function getCount(aData){
	var fnd = aData.match(/<folder id="10" is_def="1" name=".*?">(\d+)<\/folder>/);
	return fnd?(fnd[1]?fnd[1]:0):0;
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("http://www.abv.bg");
    return false; 
  case ST_PRE_RES:
    var fnd=aData.match(/value="(\S+?)"\s+name="host"/);
    if(fnd){
      this.loginData[LOGIN_POST]="username="+encodeURIComponent(this.user)+"&password="+encodeURIComponent(this.password)+"&host="+fnd[1]+"&service=mail";
    }
    this.stage=ST_LOGIN;
    break;
  case ST_LOGIN_RES:  
    var fnd=aData.match(/url=((\S+?:\/\/\S+?\/)\S+?)"/);
    if(fnd){
      if(fnd[2].indexOf("//mail")!=-1)this.mailURL=fnd[2]+"app/j/home.jsp";
      else this.mailURL=fnd[2];
      this.getHtml(fnd[1]);
      return false;
    }
    break;
  case ST_LOGIN_RES+1:
    this.stage=ST_DATA;
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
