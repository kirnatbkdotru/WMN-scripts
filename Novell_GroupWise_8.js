/****************************************************************************
Novell GroupWise 8
Author: Kiryanov Nikolay, kirn@bk.ru

Note:
Server string should be similar to: https://webmail.domain.com/gw/webacc
*****************************************************************************/

var name	= "Novell GroupWise 8";
var ver		= "2011-07-09";

var needServer	= true;
var queryCount 	= "20"; //TOP 20 messages to analyse

function init(){
	//this.server 		= "https://webmail.domain.com/gw/webacc"
	if(this.server){
		this.loginData=[this.server, "User.id","User.password","merge=webacc&action=User.Login"];
	}
}

function getCount(aData) {
	
	var count = 0; 
	var list = eval('(' + aData + ')').items;
	
	if (list == null || list.length < 1)
	{
		return 0;
	}
	
	for (var i = 0; i < list.length; i++)
	{
		var item = list[i];
		if (item.read == false)
		{
			count++;
		}
	}  
	return count;

}

function getFolderID(aData) {

	var Folder_ID = -1;
	var list = eval('(' + aData + ')').folders;

	if (list == null || list.length < 1)
	{
		return Folder_ID;
	}

	for (var i = 0; i < list.length; i++)
	{
		var item = list[i];
		if (item.type == "Folder.UNIVERSAL")
		{
			Folder_ID = item.id;
			
			return Folder_ID 
		}
	}  

	return Folder_ID 
	
	
	
}


function process(aHttpChannel, aData) {
	switch(this.stage){
	case ST_LOGIN_RES:  
	    
		var fnd=aData.match(/User.context=\w+/);

	    if(fnd)
		{
		this.serverRequest = this.server + "?" + fnd; 
		this.getHtml(this.serverRequest + "&action=Folder.Expand&merge=jfolders");
		this.stage = ST_LOGIN_RES + 1;
		}

	case ST_LOGIN_RES + 1:  
		
		//it's not a mistake there's just no other simple way to get folders
		this.getHtml(this.serverRequest + "&action=Folder.Expand&merge=jfolders");
		this.stage = ST_LOGIN_RES + 2;
		
	case ST_LOGIN_RES + 2:

		var folderID 	= this.getFolderID(aData); 
		this.mailURL	= this.serverRequest + "&merge=webacc";
		this.dataURL	= this.serverRequest + "&action=VMLFolder.Open&merge=jmsglist&Folder.queryCount=" + this.queryCount + "&Folder.id=" + folderID;
		this.stage 		= ST_DATA;
		
	  }
  return this.baseProcess(aHttpChannel, aData);
}

function getIconURL(){
  return "http://www.novell.com/favicon.ico";
}