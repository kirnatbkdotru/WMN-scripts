/**********************************************************
DreamWiz
  @author:holycall(mod by smile,tobwithu)
**********************************************************/
var name="DreamWiz";
var ver="2010-01-06";

function init() {
  this.hostString="";
  this.dataURL="http://mail.dreamwiz.com/";
  this.loginData=["https://login.dreamwiz.com/BIN/login.cgi","id","pw","url="+encodeURIComponent("::GET::http://mail.dreamwiz.com/")+"&url_home="+encodeURIComponent("http://www.dreamwiz.com/")+"&url_premium="+encodeURIComponent("http://mail.dreamwiz.com/AUTH/mail.cgi?c=T&rnd=488ec6733dee18f")+"&secure=2"];
  this.mailURL="http://mail.dreamwiz.com/";
}
function getIconURL(){
  return "http://i.dreamwiz.com/img/dreamwiz.ico";
}
function getCount(aData) {
  var fnd_status=aData.match(/http:\/\/i.dreamwiz.com\/img\/m\/global_out.gif/); //login status
  var login_status = false;
  if(fnd_status) login_status = true;
  var fnd=aData.match(/\"inbox_newcnt\">(\d+)/);
  if(fnd) {
    return fnd[1];
  }else{
    if(login_status)return 0;
    else return -1;
  }
}