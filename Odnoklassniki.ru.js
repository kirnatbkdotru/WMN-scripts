/**********************************************************
@Odnoklassniki.RU
  @author: Kiryanov Nikolay kirn@bk.ru
**********************************************************/
var name="Odnoklassniki.RU";
var ver="2010-11-26";

function init() {
	
 	this.dataURL="http://www.odnoklassniki.ru";
	this.loginData=["http://www.odnoklassniki.ru/dk?cmd=AnonymLogin","st.email","st.password","st.posted=set"];
	this.mailURL="http://www.odnoklassniki.ru/dk?st.cmd=userMessageIncoming";
}
function getCount(aData) {
	fnd = aData.match(/<div id="data_ToolbarIconConversation" class="hookData">(.+?)<\/div>/);
	
	if (!fnd) return - 1;
	
	var list = eval('(' + fnd[1] + ')').conversations;	
	
	if (list == null || list.length < 1)
	{
		return -1;
	}
	
	unreadItemCount = 0;
	
	for (var i = 0; i < list.length; i++)
	{
		var item = list[i];
			unreadItemCount += item.unreadItemCount;
	}  
	return unreadItemCount;
}

