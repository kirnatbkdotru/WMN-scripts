/**********************************************************
Lycos
**********************************************************/
var name="Lycos";
var ver="2009-04-15";
var hostString="";

function init(){  
  this.dataURL="http://mail.lycos.com/lycos/Index.lycos";
  this.loginData=["https://registration.lycos.com/login.php?m_PR=27","m_U","m_P","m_CBURL="+encodeURIComponent("http://mail.lycos.com")];
  this.mailURL="http://mail.lycos.com/lycos/Index.lycos";
}
function getCount(aData){
  var fnd=aData.match(/"u":(\d+)[^{]+?"name":"Inbox"/);
  if(fnd){  
    return fnd[1];
  }else{
    fnd=aData.match(/<title>[\s\S]+?(?:\((\d+)\))?[\s]*?<\/title>/);
    if(fnd)return fnd[1]?fnd[1]:0;
    return -1;
  }
}