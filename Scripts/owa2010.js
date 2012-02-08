/**********************************************************
Outlook Web Access 2010
**********************************************************/
var name="OWA2010";
var ver="2010-11-21";
var needServer=true;

function init(){  
  if(this.server){
    if(this.server.indexOf("http")!=0)this.server="https://"+this.server;
    if(this.server.charAt(this.server.length-1)=="/")this.server=this.server.substring(0,this.server.length-1);
  }
  this.dataURL=this.server+"/owa/";
  this.loginData=[this.server+"/owa/auth/owaauth.dll","username","password","destination="+encodeURIComponent(this.dataURL)];
  this.mailURL=this.server+"/owa/";
}
function getCount(aData){
	var fnd=aData.match(/sprites-inbox-png.+?\(\<span id=spnCV\>(\d+)\<\/span\>\)/);
	if (fnd) 
		return fnd[1]?fnd[1]:0;
	else {
		fnd=aData.match(/sprites-inbox-png/);
		return fnd?0:-1;
	}
}


