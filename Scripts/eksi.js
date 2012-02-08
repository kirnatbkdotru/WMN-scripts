/**********************************************************
eksisozluk.com
**********************************************************/

var name="eksisozluk.com";
var ver="2011-11-03";

function init(){
	 this.loginData=["http://www.eksisozluk.com/login.asp?ref=%2Fcc%2Easp%3Fsec%3Dma%26n%3Dy","n1","p"];
	 this.dataURL="http://www.eksisozluk.com/show.asp";
	 this.mailURL="http://www.eksisozluk.com/cc.asp?sec=ma&n=y";	 
}

function getIconURL(){
	return "http://static.eksisozluk.com/favicon.ico";
}

function getCount(aData){
	 var fnd=aData.match(/<td class="pmsghi pi">/);
	  if(fnd){
		return 1;}
	  else{
		return 0;}
}	
