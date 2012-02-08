/**
 *  WebMail Notifier for Sina
 *  by: http://hi.baidu.com/matrix286/
*/

var name = "Sina";
var ver="2010-10-31";

function init()
{
  var ar = this.user.split("@");

  if (ar[1].toLowerCase() == "sina.com" || typeof ar[1] == "undefined" )
  {
    this.loginData = ["http://mail.sina.com.cn/cgi-bin/login.cgi","u","psw"];
    this.mailURL = "http://mail.sina.com.cn/cgi-bin/login.cgi";
  }
  // else if (ar[1].toLowerCase() == "sina.cn")
  else
  {
    this.loginData = ["http://mail.sina.com.cn/cgi-bin/cnlogin.php","u","psw"];
    this.mailURL = "http://mail.sina.com.cn/cgi-bin/cnlogin.php";
  }

	WebMailNotifier.prototype.getMailURL = function(aID,aUser,aFolder) 
	{
		var obj=this.getHandler(aID,aUser);
		if(obj)
		{
			if(this.multiSession&&!this.isDefault(aID,aUser))
			{
				var ar2=[];       
				var ar=obj.cookieManager.cookies;
				for each(a in ar)ar2.push(a);
				obj.cookieManager2.cookies=ar2;
			}
			else 
			{
				obj.cookieManager.setCookieToBrowser();
			}
			if(this.newMailsOnly)
			{
				var url=obj.getMailURL(aFolder);
				var pref="accounts."+aID+"."+aUser+".count";
				try{
					this.prefBranch.getIntPref(pref);//set only if this exists
					this.prefBranch.setIntPref(pref,obj.mailCount>0?obj.mailCount:0);
				}catch(e){}
				obj.mailData.desc=obj.getDesc();
				this.setState(MSG_MAILDATA,obj.ind);
				return url;
			}
			else 
			{
				return obj.getMailURL(aFolder);
			}
		}
		else 
		{
			return null;
		}
	}
	
}
function onRedirect(aOldChannel, aNewChannel)
{
  var ar = this.user.split("@");
  var referer = aOldChannel.getResponseHeader("Location");

  if (referer.length < 8 )
  {
    return;
  }
  if (referer.substring(0, 7).toLowerCase() != "http://")
  {
    return;
  }
  var i = referer.indexOf("//");
  var dataURL = referer.substring(0, referer.indexOf("/", i + 2));
  dataURL = dataURL + "/classic/folderlist.php";
  this.dataURL = dataURL;
}

function getIconURL()
{
  return "http://www.sina.com.cn/favicon.ico";
}

function getCount(aData)
{
  var count = 0;

  var ar = this.user.split("@");

  if (ar[1].toLowerCase() == "sina.com" || typeof ar[1] == "undefined" )
  {
  count = getCOMCount(aData) ;
  }
  // else if (ar[1].toLowerCase() == "sina.cn")
  else
  {
  count = getCNCount(aData);
  }

  return count;
};

// Sina.COM
function getCOMCount(aData)
{
  var count = 0;
  var info = eval('(' + aData + ')');

  // old sina.COM
  if (typeof info.folderlist != "undefined")
  {
  var ar = info.folderlist;
  var obj = ar[0];
  count = obj.unread;
  return count;
  }

  // new sina.COM
  if (typeof info.data != "undefined")
  {
  var ar = info.data;
  var obj = ar[0];
  count = obj.unread;
  return count;
  }
  return count;
}

// Sina.CN
function getCNCount(aData)
{
  var count = 0;
  var info = eval('(' + aData + ')');

  if (typeof info.data != "undefined")
  {
  var ar = info.data;
  var obj = ar[0];
  count = obj.unread;
  return count;
  }

  return count;
}