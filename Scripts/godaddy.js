/**********************************************************
GoDaddy
**********************************************************/
var name="GoDaddy";
var ver="2010-08-17";

function init(){  
  this.loginData=["https://login.secureserver.net/index.php?app=wbe","username","password","return_app=wbe"];
}
function getIconURL(){
  return "http://img1.wsimg.com/assets/godaddy.ico";
}
function getCount(aData){
  var fnd=aData.match(/"INBOX",(\d+)/);
  if(fnd){  
    return fnd[1];
  }else{
    return -1;
  }
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    var fnd=aData.match(/location.href\s*=\s*"(\S+?)"/);
    if(fnd){
      this.dataURL=fnd[1].replace(/^https/,"http");
      this.getHtml(this.dataURL);
      return false;
    }
    break;
  case ST_LOGIN_RES+1:
    var fnd=aData.match(/path\s*=\s*"(\S+?)"/);
    if(fnd){
      var server=this.dataURL.match(/http:\/\/[^\/]+/);
      if(server){
        this.mailURL=server+fnd[1];
        this.dataURL=server+"/pajax_call_dispatcher.php?class=AJAXFolderList&method=updateCounts";
        this.stage=ST_DATA;
        return this.process(aHttpChannel, aData);
      }
    }
    break;  
  case ST_DATA:
    this.getHtml(this.dataURL,'{"className": "AJAXFolderList", "method": "updateCounts", "params": null}');
    return false;
  }
  return this.baseProcess(aHttpChannel, aData);
}
