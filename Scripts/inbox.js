/**********************************************************
Inbox
**********************************************************/
var name="Inbox";
var ver="2011-01-06";
var hostString="inbox.com";

function init(){
  this.loginData=["https://www.inbox.com/login.aspx","l","p","action=login&gdi=on"];
  this.dataURL="http://my.inbox.com";
  this.mailURL="http://my.inbox.com";
}
function getIconURL(){
  return "http://www.inbox.com/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/'Inbox',(\d+)/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:    
    var fnd=aData.match(/url=(\S+?)'/);
    if(fnd){
      this.getHtml(fnd[1]);
      return false;
    }
    break;
  case ST_LOGIN_RES+1:
    this.mailURL=this.channel.URI.spec;
    var fnd=aData.match(/INIT_CU\s+=\s+'(\S+?)'/);    
    if(fnd){
      this.getHtml("http://"+this.channel.URI.host+"/app.aspx?_cu="+fnd[1]);    
      return false;
    }
    break;
  case ST_LOGIN_RES+2:
    var fnd=aData.match(/G_start_URL\s+=\s+'(\S+?)'/);    
    if(fnd){
      this.dataURL="http://"+this.channel.URI.host+fnd[1]+"&MOD=m_em&IFROK=1&SUPHTML=1";
      this.getHtml(this.dataURL);
      return false;
    }  
    break;
  case ST_LOGIN_RES+3:    
    this.stage=ST_DATA_RES;  
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}