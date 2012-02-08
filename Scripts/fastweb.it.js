/**********************************************************
Fastweb.it  
**********************************************************/
var name="Fastweb.it";
var ver="2010-11-24";
var hostString="fastwebnet.it";
var noCookie=true;
function init(){  
  var ar=this.user.split("@");
	this.loginData = ["http://fastmail.fastwebnet.it/cp/ps/Main/login/Authenticate?l=it","userfield","password",
                      "u="+encodeURIComponent(ar[0])+"&d="+encodeURIComponent(ar[1])];
	this.dataURL = "http://fastmail.fastwebnet.it";
	this.mailURL = "http://www.fastweb.it/portale/servizi/fastmail/";  
}
function getIconURL(){
	return "http://fastmail.fastwebnet.it/cp/img/fw_new/favicon.ico";
}
function getCount(aData){
	var fnd = aData.match(/new_nuove_mail.gif[\s\S]+?<b>(\d+)<\/b>/);
	return fnd?fnd[1]:-1;
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
    var fnd=aData.match(/src\s*=\s*"(\/cp\/ps\/Main\/layout\/DashEntry\S+?")/);
    if(fnd){
      this.dataURL="http://fastmail.fastwebnet.it"+fnd[1];
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}
