/**********************************************************
Interfree.it
**********************************************************/
var name="Interfree.it";
var ver="2010-02-25";
var hostString="";

function init(){
  this.loginData=["http://webmail.interfree.it/cgi-bin/login.cgi","username","password"];
  this.dataURL="http://webmail.interfree.it/cgi-bin/main.cgi";
  this.mailURL="http://webmail.interfree.it/cgi-bin/main.cgi";
}
function getIconURL(){
  return "http://webmail.interfree.it/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/\((\d+) nuov/);
  if(fnd){
    return fnd[1];
  }else{
    fnd=aData.match(/\(Nessuno nuovo\)/);
    if(fnd)return 0;
    else return -1;
  }
}
