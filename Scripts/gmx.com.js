/**********************************************************
GMX.COM
**********************************************************/
var name="GMX.COM";
var ver="2011-08-18";

function init(){
  this.initStage=ST_PRE;
  this.dataURL="http://www.gmx.com/";
  this.loginData=["https://www.gmx.com","TextfieldEmail","TextfieldPassword","RadioLoginType=BROWSER&ButtonLogin=1"];
  this.mailURL="https://www.gmx.com/mail.html";
  this.logoutURL="http://www.gmx.com/logout.html";
}
function getIconURL(){
  return "http://www.gmx.com/resources/com.unitedinternet.gmx.pages.PageBase/PageBase/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/"permanentId":"inbox","read":(\d+),.+?"total":(\d+),"type":"inbox"/);
  if(fnd){
    return parseInt(fnd[2])-parseInt(fnd[1]);
  }else{
    return -1;
  }
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    this.getHtml("http://www.gmx.com/");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/wicketSubmitFormById\('\S+?',\s*?'(\S+?)'/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.getHtml("https://www.gmx.com/"+fnd[1].replace(/&amp;/g,"&")+"&random="+Math.random()+"&time="+new Date().getTime(),
                this.loginData[LOGIN_POST],
                {"Wicket-Ajax":"true"});
      return false;
    }
    break;
  case ST_LOGIN_RES: 
    this.getHtml("https://www.gmx.com/mail.html");
    return false;  
  case ST_LOGIN_RES+1:  
    var fnd=aData.match(/authToken\s+?:\s+?"(\S+?)"[\S\s]+?rms\s+?:\s+?"(\S+?)"/);
    if(fnd){   
      this.dataURL="http://www.gmx.com/callgate-"+fnd[2]+"/rms/"+fnd[2]+"/folder/list?X-UI-JSON=javascript&Authorization="+encodeURIComponent(fnd[1])+"&nocache=";
      this.stage=ST_DATA;
    }else break;
  case ST_DATA:
    this.getHtml(this.dataURL+new Date().getTime(),"{}",{"Content-Type":"application/json; charset=UTF-8"});
    return false;  
  }
  return this.baseProcess(aHttpChannel, aData);
}