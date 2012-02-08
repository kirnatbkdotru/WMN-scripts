var name="Myspace";
var ver="2011-03-24";
function init(){
  //var hash="";
  //hash=hash+"MIGcBgkrBgEEAYI3WAOggY4wgYsGCisGAQQBgjdYAwGgfTB7Ag";
  //hash=hash+"MCAAECAmYDAgIAwAQIrc90KC+zpikEELLvqHzzeunQYQAowAjr";
  //hash=hash+"GLIEUNYART5BYV2TGaDzbcBarCVNeNN7Jq83LZiPQww24Qasub";
  //hash=hash+"1sahrDbbqnUDsGDbCnnLXYbwUsw6fZUFQFw+kxN0EbgrRUNlyn";
  //hash=hash+"x22eTN7Za1PX";
  
  this.dataURL="http://www.myspace.com/my/mail/inbox";
  this.loginData=["https://www.myspace.com/auth/login",
                      "Email","Password",
                      "formLocation="+encodeURIComponent("standalone"),
                      //"hash="+encodeURIComponent(hash),
                      "SMSVerifiedCookieToken",
                      "NextPage="+encodeURIComponent(""),
                      "js="+encodeURIComponent(0),
                      "fbtoken="+encodeURIComponent("")];
  this.mailURL="http://www.myspace.com/my/mail/inbox";
}

function getCount(aData){
  var fnd=aData.match(/My Inbox\s+<span\s+class=\"newCount\s+inboxCountNav\">(\d+)<\/span>/);
  if(fnd){
     return parseInt(fnd[1]);
  }else{
    fnd=aData.match(/<a href=\"\/my\/mail\/inbox\">My Inbox\s+<\/a>/);
    if(fnd){
      return 0;
    }else{
      return -1;
    }
  }
}
