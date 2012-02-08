/**********************************************************
Numbericable.fr
**********************************************************/
var name="Numbericable.fr";
var ver="2010-09-20";

function init(){  
  var ar=this.user.split("@");
  this.loginData=["http://webmail.numericable.fr/ncn/auth/ident.php",,"pwd",
                    "login="+encodeURIComponent(ar[0])+"&domain="+encodeURIComponent(ar[1])];
  this.dataURL="http://webmail.numericable.fr/ncn/auth/home.php";
  this.mailURL="http://webmail.numericable.fr/ncn/auth/main.php"; 
}
function getIconURL(){
  return "http://www.numericable.fr/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/"newmsg">(\d+)\s/);
  return fnd?fnd[1]:-1
}
