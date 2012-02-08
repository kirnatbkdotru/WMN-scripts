/**********************************************************
UNI.de Script by Proximity
**********************************************************/
var name="UNI.de";
var ver="2010-11-03";

function init(){
  this.dataURL="https://uni.de/email";
  this.loginData=["https://uni.de/login","user[login]","user[password]","submitLogin="];
}

function getIconURL(){
  return "http://uni.de/images/fav.ico";
}

function getCount(aData){
  var cid;
  var count;
	cid="0";
	count=0;
  var fnd1=aData.match(/1\.\s+<\/td>\s+<td class=\"account\">\s+\S+@uni.de\s+<\/td>\s+<td class=\"leftB\">\[<\/td>\s+<td class=\"new\">\s+<a target=.*?href=\"\/email\/open\/id\/(\d+)\"\>(\d+)\&nbsp\;neue Nachrichten<\/a>/);
  if(fnd1){
  	if (fnd1[2]!="0") {if (cid=="0") {cid=fnd1[1];}else{cid="list";}}
    count+=parseInt(fnd1[2]);
  }
  var fnd2=aData.match(/2\.\s+<\/td>\s+<td class=\"account\">\s+\S+@uni.de\s+<\/td>\s+<td class=\"leftB\">\[<\/td>\s+<td class=\"new\">\s+<a target=.*?href=\"\/email\/open\/id\/(\d+)\"\>(\d+)\&nbsp\;neue Nachrichten<\/a>/);
  if(fnd2){
  	if (fnd2[2]!="0") {if (cid=="0") {cid=fnd2[1];}else{cid="list";}}
    count+=parseInt(fnd2[2]);
  }
  var fnd3=aData.match(/3\.\s+<\/td>\s+<td class=\"account\">\s+\S+@uni.de\s+<\/td>\s+<td class=\"leftB\">\[<\/td>\s+<td class=\"new\">\s+<a target=.*?href=\"\/email\/open\/id\/(\d+)\"\>(\d+)\&nbsp\;neue Nachrichten<\/a>/);
  if(fnd3){
  	if (fnd3[2]!="0") {if (cid=="0") {cid=fnd3[1];}else{cid="list";}}
    count+=parseInt(fnd3[2]);
  }
  var fnd4=aData.match(/4\.\s+<\/td>\s+<td class=\"account\">\s+\S+@uni.de\s+<\/td>\s+<td class=\"leftB\">\[<\/td>\s+<td class=\"new\">\s+<a target=.*?href=\"\/email\/open\/id\/(\d+)\"\>(\d+)\&nbsp\;neue Nachrichten<\/a>/);
  if(fnd4){
  	if (fnd4[2]!="0") {if (cid=="0") {cid=fnd4[1];}else{cid="list";}}
    count+=parseInt(fnd4[2]);
  }
  var fnd5=aData.match(/5\.\s+<\/td>\s+<td class=\"account\">\s+\S+@uni.de\s+<\/td>\s+<td class=\"leftB\">\[<\/td>\s+<td class=\"new\">\s+<a target=.*?href=\"\/email\/open\/id\/(\d+)\"\>(\d+)\&nbsp\;neue Nachrichten<\/a>/);
  if(fnd5){
  	if (fnd5[2]!="0") {if (cid=="0") {cid=fnd5[1];}else{cid="list";}}
    count+=parseInt(fnd5[2]);
  }
  var fnd6=aData.match(/6\.\s+<\/td>\s+<td class=\"account\">\s+\S+@uni.de\s+<\/td>\s+<td class=\"leftB\">\[<\/td>\s+<td class=\"new\">\s+<a target=.*?href=\"\/email\/open\/id\/(\d+)\"\>(\d+)\&nbsp\;neue Nachrichten<\/a>/);
  if(fnd6){
  	if (fnd6[2]!="0") {if (cid=="0") {cid=fnd6[1];}else{cid="list";}}
    count+=parseInt(fnd6[2]);
  }	
  if (count!=0){
   	if (cid=="list"){
  		this.mailURL="https://uni.de/email";
		}else{
  		this.mailURL="https://uni.de/email/open/id/"+cid;
		}
  	return count;
  	}else{
  	if (count==0){
   		this.mailURL="https://uni.de/email";
    	return 0;
  }else{
    this.mailURL="https://uni.de/email";
    return -1;
  }
 }
}