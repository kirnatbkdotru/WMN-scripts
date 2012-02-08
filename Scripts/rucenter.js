/**********************************************************
RU-CENTER
**********************************************************/
var name="RU-CENTER";
var ver="2010-09-09";

function init() {
	this.loginData=["https://mail.nic.ru/", "username", "password"];
}

function getIconURL() {
	return "http://www.mail.nic.ru/favicon.ico";
}

function getCount(aData) {
	var regexp;
	switch(this.ui_kind) {
	case 1:	// Default,
		regexp=/<TD\s+bgcolor=#FFFFFF>&nbsp;<FONT\s+COLOR=red><B>(\d+)<\/B><\/FONT>&nbsp;<\/TD>\s+<\/TR>/;
		break;
	case 2:	// Golden Fleece,
		regexp=/,"INBOX","mailbox\.wssp","mailbox\.wssp\?Mailbox=INBOX&",\d+,\d+,\d+,\d+,\d+,\d+,"\d+[KM]?","\d+","\d+","(\d+)"\);/;
		break;
	case 3:	// XChange.
		regexp=/<img\s+src="\/SkinFiles\/[a-zA-Z0-9_\.\/\-]+\/XChange\/UnreadLetter\.gif"\s+border=0/g;
		break;
	default:
		return -1;
	}
	var fnd=aData.match(regexp);
	if (fnd)
		return this.ui_kind==3?fnd.length:(fnd[1]?fnd[1]:0);

	switch(this.ui_kind) {
	case 1:
		fnd=aData.match(/<script>\s+calcp\(\d+,\d+\);\s+<\/script>/g);
		return fnd.length<6?-1:0;
	case 3:
		fnd=aData.match(/<td\s+width="95%"\s+align="center"\s+nowrap\s+class="FixedTextSmall">\d+\-\d+/);;
		if (!fnd)
			return -1;
		fnd=aData.match(/<script\s+type="text\/javascript">setTimeout\("window\.location\s+=\s+'Mailbox\.wssp\?Mailbox=INBOX'",\s+[0-9\*]+\);<\/script>/);;
		return fnd?0:-1;
	}
	return -1;
}

function process(aHttpChannel, aData) {
	switch(this.stage){
	case ST_LOGIN_RES:
		var sz=this.channel.URI.spec;
		this.mailURL=sz;
		var i=sz.lastIndexOf('/'),sz2=sz.substr(i);
		sz=sz.substr(0,i);
		switch(sz2) {
		case '/Mailboxes.wssp':	// Default,
			this.ui_kind=1;
			this.dataURL=sz+'/Mailboxes.wssp';
			break;
		case '/Hello.wssp?':		// Golden Fleece,
			this.ui_kind=2;
			this.dataURL=sz+'/mailboxes.wssp?MessageText=1&';
			break;
		case '/frameset.wssp?':	// XChange.
			this.ui_kind=3;
			this.dataURL=sz+'/Mailbox.wssp?Mailbox=INBOX';
			break;
		default:
			Components.utils.reportError(this.user + ': Unknown URL suffix "'+sz2+'". ');
			return false;
		}
	}
	return this.baseProcess(aHttpChannel, aData);
}
