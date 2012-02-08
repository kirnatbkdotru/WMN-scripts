/**********************************************************
Hacettepe University Webmail for undergraduates
  * Enable Unread Message Notification in Folder Preferences
  * Author: Ahmet COSKUN
**********************************************************/
var name="Hacettepe University";
var ver="2011-12-13";

function init()
{
  var server = "http://mmp2.hacettepe.edu.tr";
  this.dataURL=server+"/uwc/webmail/mbox.msc?sid=&mbox=INBOX&start=0&count=20&date=true&sortorder=R&sortby=recv&headerv=Content-type&lang=en&srch=ALL%20NOT%20deleted&rev=3&security=false&lang=en&popupLevel=undefined&cal=1";
  this.loginData=[server+"/uwc/auth","username", "password",];  
  this.mailURL=server+"/uwc/webmail/en/mail.html?lang=en&laurel=on&cal=1";
}

function getCount(aData)
{
  var fnd=aData.match(/seen=.*/);	
  var fnd2=aData.match(/size=.*/);
  fnd = fnd[0];
  fnd2 = fnd2[0];
  var seen = 0;
  var size = 0;
  var i = 5;
  while(fnd[i])
  {
	seen = seen + fnd[i];
	i = i + 1;
  }
  i=5;
  while(fnd2[i])
  {
	size = size + fnd2[i]
	i = i + 1;
  }

  if(fnd)
  {
    return size - seen;
  }
  else
  {
    return 0;
  }
}
