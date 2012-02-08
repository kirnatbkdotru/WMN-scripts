/**********************************************************
libero.it
**********************************************************/
var name="Libero";
var ver="2010-01-06";

function init(){
  var r2 = parseInt(Math.random() * 625 + 1);
	var r = (((r2 -1) %19) + 1);
  this.dataURL="http://wpop"+r+".libero.it/email.php";
  this.loginData=["https://login.libero.it/logincheck.php","LOGINID","PASSWORD","service_id=beta_email"];
  this.mailURL="http://mailbeta.libero.it/cp/WindMailPS.jsp";
}

function getIconURL(){
  return "http://www.libero.it/favicon.ico";
}

function getCount(aData){
  var fnd=aData.match(/<b>Leggi Mail (\d+)/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}