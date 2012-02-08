/**********************************************************
infomaniak.ch
**********************************************************/
var name="infomaniak.ch";
var ver="2011-01-04";

function init(){
  this.loginData=["https://webmail.infomaniak.ch/login.php","mailbox","password","submited=1"];  
  this.dataURL="http://webmail.infomaniak.ch/index.php";
  this.mailURL="https://webmail.infomaniak.ch/index.php";
}
function getCount(aData){
  var fnd=aData.match(/folder=\.">.+?\((\d+)\//);
  return fnd?fnd[1]:-1;
}
