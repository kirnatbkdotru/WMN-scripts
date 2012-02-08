/**********************************************************
@vkontakte.ru
@author: Kiryanov Nikolay kirn@bk.ru
**********************************************************/
var name="vkontakte.ru";
var ver="2011-07-09";

function init() {
	this.loginData=["http://login.vk.com/?act=login","email","pass"];
	this.mailURL="http://vkontakte.ru/mail.php";
 	this.dataURL="http://vkontakte.ru/"; 	
}
function getCount(aData) {
	var fnd = aData.match(/l_msg.+?((\d).+?)*<\/span>/);
	return fnd?(fnd[1]?fnd[1]:0):-1;
}

