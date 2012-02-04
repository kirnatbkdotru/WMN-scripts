/**********************************************************
@Odnoklassniki.RU
  @author: Kiryanov Nikolay kirn@bk.ru
**********************************************************/
var name="Odnoklassniki.RU";
var ver="2012-01-23";

function init() {
	this.loginData=["http://www.odnoklassniki.ru/dk?cmd=AnonymLogin","st.email","st.password","st.posted=set"];
	this.mailURL="http://www.odnoklassniki.ru";
}
function getCount(aData) {
	return JSON.parse(aData.substr(83, aData.length - 2 - 83)).data.ok_cnt; 
}

function process(aHttpChannel, aData) {
  switch(this.stage){
  case ST_LOGIN_RES:
	re = "(http://ok.mail.ru.+)'";
	var fnd = aData.match(re);
	if (fnd) {
		this.getHtml(fnd[1]);
		return false;
	}
	break
		
  case ST_LOGIN_RES + 1:  
	var self=this;
	  chrome.cookies.getAll({domain:".mail.ru", name:"odklmapi"},
		function(cookies){
		  self.cookies = cookies;
		})
		
	if (this.cookies){
		var odklmapi = this.cookies[0].value;
		this.stage = ST_DATA;
		this.dataURL = "http://odnoklassniki.ru/mapi/getCounters?query=%7B%22jsonPrefix%22%3A%22PortalHeadlineOkJSONPCallback%22%2C%22odklmapi%22%3A%22"
		+ encodeURIComponent(odklmapi) + "%22%7D";
    }
    break;
	
  case ST_DATA:
	this.getHtml(this.dataURL, "" , {"Referer": "http://mail.ru/"});
	return false;
	break
	
  }
  return this.baseProcess(aHttpChannel, aData);
}