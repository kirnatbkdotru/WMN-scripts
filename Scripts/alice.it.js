/**********************************************************
Alice.it
**********************************************************/
var name="Alice.it";
var ver="2012-01-21";
var hostString="alice.it";
var supportIncludeSpam=true;

function init(){
  this.initStage=ST_PRE;
  this.dataURL="http://auth.rossoalice.alice.it/aap/serviceforwarder?sf_dest=mail_webmail";
  this.mailURL="http://portale.rossoalice.alice.it/ps/HomePS.do?area=welcomePage";
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
            //+"&rememberUsernameChk=checkbox"
            +"&twoweeks=true"
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
  return "http://alicemail.rossoalice.alice.it/cp/imgalice/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/INBOX.+?unread:\s*(\d+)/);
  if(fnd){
    var n=parseInt(fnd[1]);
    if(this.includeSpam){
      fnd=aData.match(/Spam.+?unread:\s*(\d+)/);
      if(fnd)n+=parseInt(fnd[1]);
    }
    return n;
  }else{
    return -1;
  }
}

function checkLogin(aData,aHttpChannel){
  switch(this.stage){
  case ST_CHECK:
    this.getHtml(this.mailURL);
    return false;
  case ST_CHECK+1:
    var fnd=aData.match(/id="ANCHOR".+?href="(\S+?SSOLogin)"/);
    if(fnd){//logged in
      this.stage=ST_LOGIN_RES+3;
      return this.process(aHttpChannel,aData);
    }else{
      this.cookieManager.clear();
      this.stage=this.initStage;
      return this.process(null,"");
    }
  }
  this.onError();
  return true;
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_PRE:
    var aData=this.getHtml("http://mail.alice.it/boxlogin/login.html");
    return false;
  case ST_PRE_RES:
    var fnd=aData.match(/ALICE specifici[\s\S]+?WS-PSS/);
    if(fnd){
      this.stage=ST_LOGIN;
      this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]+"&"+this.getForm(fnd[0].replace(/&amp;/g,"&")));
      return false;      
    }
    break;
  case ST_LOGIN_RES:  
  case ST_LOGIN_RES+1:  
  case ST_LOGIN_RES+2:   
  case ST_LOGIN_RES+3:   
    var fnd=aData.match(/href="(\S+?)"/);   
    if(fnd){
      this.getHtml(fnd[1].replace(/&#(\d+);/g,function(){return String.fromCharCode(RegExp.$1);}).replace(/&amp;/g,"&"));
      return false;
    }
    break;    
  case ST_LOGIN_RES+4:
    var fnd=aData.match(/"preLoginFrame"\s+src='(\S+?)'/);
    if(fnd){
      this.getHtml("http://alicemail.rossoalice.alice.it/cp/ps/Main/login/"+fnd[1]); 
      return false;
    }
    break;
  case ST_LOGIN_RES+5:
    var fnd=aData.match(/mailboxstatsURL:\s*'(\S+?)'/);
    if(fnd)this.dataURL="http://alicemail.rossoalice.alice.it"+fnd[1]; 
    this.stage=ST_DATA;
    //break;
  case ST_DATA:
    this.getHtml(this.dataURL,"node=%2F",{"X-Requested-With":"XMLHttpRequest"});
    return false;
  }
  return this.baseProcess(aHttpChannel, aData);
}
