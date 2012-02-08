/**********************************************************
Comcast
**********************************************************/
var name="Ovi";
var ver="2010-07-13";
var hostString="";

function init(){  
  this.loginData=["https://account.nokia.com/fed/engine/forward.jsp","username","password","initiatesso=1&providerid=http%3A%2F%2Fmail.ovi.com%2FOBAuth"];
  this.dataURL="http://mail.ovi.com/r/mail/listing/INBOX";
  this.mailURL="http://mail.ovi.com/";
}
function getCount(aData){
  var fnd=aData.match(/<span\s+class="unread_count".+?>\((\d+)\)/);
  if(fnd){  
    return fnd[1];
  }else{
    fnd=aData.match(/mailboxform/);
    return fnd?0:-1;
  }
}
