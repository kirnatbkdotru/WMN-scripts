/**********************************************************
Clix
**********************************************************/
var name="I.UA";
var ver="2011-03-14";
var hostString="i.ua";

function init(){
  var ar=this.user.split("@");
  this.loginData=["http://i.ua/lin.php",,"pass","_subm=lform&login="+encodeURIComponent(ar[0])+"&domn="+encodeURIComponent(ar[1])];  
  this.dataURL="http://mbox.i.ua";
  this.mailURL="http://mbox.i.ua";
  this.logoutURL="http://i.ua/logout.php";
}
function getIconURL(){
  return "http://i3.i.ua/css/i2/favicon_16.ico";
}
function getCount(aData){
  var fnd=aData.match(/title=".+?,.+?:\s*(\d+).+?INBOX/);
  return fnd?fnd[1]:-1;
}
