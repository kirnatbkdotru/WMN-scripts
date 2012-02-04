/**********************************************************
@Odnoklassniki.RU
  @author: Kiryanov Nikolay kirn@bk.ru
**********************************************************/
var name="Odnoklassniki.RU";
var ver="2012-02-05";

function init() {
	this.loginData=["http://www.odnoklassniki.ru/dk?cmd=AnonymLogin","st.email","st.password","st.posted=set"];
	this.mailURL="http://www.odnoklassniki.ru";
	this.dataURL="http://www.odnoklassniki.ru/browserToolbarGetData?v=2";
}
function getCount(aData) {
  var fnd=aData.match(/\d+<\/b>/g);
  var count = 0;
	for (var i = 0; i < fnd.length; i++)
	{
		count += parseInt(fnd[i]); 
	}
	return count;
}