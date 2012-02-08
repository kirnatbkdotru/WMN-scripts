/**********************************************************
Virgilio
**********************************************************/
var name="Virgilio";
var ver="2010-02-23";
var hostString="virgilio.it";

function init(){
  this.initStage=ST_PRE;
  this.dataURL="http://mail.virgilio.it/";
  this.mailURL="http://mail.virgilio.it/";
  var ar=this.user.split("@");
  var domainIndex=0;
  if(ar[1]=="tin.it")domainIndex=1;
  else if(ar[1]=="alice.it")domainIndex=2;
  else if(ar[1]=="tim.it")domainIndex=3;
  
  var validationHrefMatrix = [
				"https://aaacsc.alice.it/piattaformaAAA/aapm/amI",
				"https://aaacsc.alice.it/piattaformaAAA/aapm/amI",
                                "https://authsrs.alice.it/aap/validatecredential",
				"http://ibox.tim.it/login"
			   ];  
  var domainValues = [
        "",
        "tin.it",
        "virgilio.it",
        ""
         ];         
  var post="usernameDisplay="+encodeURIComponent(ar[0])
            +"&dominio="+encodeURIComponent("@"+ar[1])
            +"&password="+encodeURIComponent(this.password)
            +"&login="+encodeURIComponent(this.user)
            +"&pwd="+encodeURIComponent(this.password)
            +"&msisdn="+encodeURIComponent(ar[0])
            +"&username="+encodeURIComponent(this.user)
            +"&user="+encodeURIComponent(this.user)
            +"&DOMAIN="+encodeURIComponent(domainValues[domainIndex])
            +"&PASS="+encodeURIComponent(this.password)
            +"&a3l="+encodeURIComponent(this.user)
            +"&a3p="+encodeURIComponent(this.password)
  this.loginData=[validationHrefMatrix[domainIndex],,,post];  
}
function getIconURL(){
  return "http://webmailvtin.alice.it/cp/imgvirgilio/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/<b>(\d+) mail<\/b>/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}

function getForm(data){
  var re=/<input[^>]+?name\s*=\s*[\"\'](\S+?)[\"\'][^>]+?value\s*=s*[\"\'](\S+?)[\"\']/g;
  var o;
  var post="";
  while ((o = re.exec(data)) != null){
    if(post)post+="&";
    post+=o[1]+"="+encodeURIComponent(o[2]);
  }
  return post;
}
function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    var aData=this.getHtml("http://mail.virgilio.it/common/iframe_mail/pf/Vlogin.html");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/ALICE specifici[\s\S]+?WS-PSS/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.loginData[LOGIN_POST]+="&"+getForm(fnd[0].replace(/&amp;/g,"&"));
    }
    break;
  case ST_LOGIN_RES:  
    var fnd=aData.match(/href="(\S+?)"/);
    if(fnd){
      this.getHtml(fnd[1].replace(/&#(\d+);/g,function(){return String.fromCharCode(RegExp.$1);}).replace(/&amp;/g,"&"));
      return false;
    }
    break;
  case ST_LOGIN_RES+1:
    var fnd=aData.match(/href="(\S+?)"/);
    if(fnd){
      this.mailURL=fnd[1].replace(/&#(\d+);/g,function(){return String.fromCharCode(RegExp.$1);}).replace(/&amp;/g,"&");
      this.dataURL=this.mailURL;
      this.stage=ST_DATA;
    }else break;
  case ST_DATA:
    this.stage=ST_DATA_RES+1;
    this.getHtml(this.dataURL);
    return true;
  case ST_DATA_RES+1:
    var fnd=aData.match(/preLoginFrame.+?src='(\S+?)'/);
    if(fnd){
      var u=this.channel.URI.spec;
      u=u.substring(0,u.lastIndexOf("/")+1);
      this.stage=ST_DATA_RES;
      this.getHtml(u+fnd[1]);
      return true;
    }
    break;
  }
  return this.baseProcess(aHttpChannel, aData);
}