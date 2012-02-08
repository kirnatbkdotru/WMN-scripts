/**********************************************************
hanafos
**********************************************************/
var name="hanafos";
var ver="2010-01-06";

function init(){
  this.hostString="";
  this.loginData=["https://xlogons.hanafos.com/signup/proc.asp","userid","passwd","redir=http%3A%2F%2Fwww.hanafos.com%Fdefault.asp&isencrypted=no"];
  this.dataURL="http://mail.hanafos.com/";
  this.mailURL="http://mail.hanafos.com/";
}
function getIconURL(){
  return "http://www.hanafos.com/favicon.ico";
}
function getCount(aData) {
  var fnd=aData.match(/\uc548\uc77d\uc740 \uba54\uc77c.+?(\d+)\ud1b5/);
  if(fnd) {
    return fnd[1];
  }else{
    return -1;
  }
}