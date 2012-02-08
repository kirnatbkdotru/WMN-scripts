/**********************************************************
Arcor
  @author:Michael Kramer
**********************************************************/
var name="Arcor";
var ver="2010-01-14";

function init(){
  this.dataURL="https://www.arcor.de/ums/ums_titel.jsp";
  this.loginData=["https://www.arcor.de/login/login.jsp","user_name","password","usessl="+encodeURIComponent("true")+"&protocol="+encodeURIComponent("http")];
  this.mailURL="https://www.arcor.de/ums/ums_titel.jsp";
}

function getCount(aData){
  var fnd=aData.match(/<title>Arcor UMS Titel[\s\S]+?(\d+)[\s\S]+?neue Nachricht/);
  if(fnd)
  {
    return fnd[1];
  }
  else
  {
    return -1;
  }
}

