/**********************************************************
studenti.uniroma1.it  <jacopo.jl@gmail.com>
**********************************************************/

//to debug this script change this to true and check the Error Console
var hordeDebug=false;

//other Horde IMP installations may need "/horde/login.php" instead
var hordeLoginFormAction="/horde/imp/redirect.php";

//other Horde IMP installations may need "horde_user" or "user" instead
var hordeUserFieldName="imapuser";

//other Horde IMP installations may need "horde_pass" instead
var hordePassFieldName="pass";


var name="studenti.uniroma1.it";
var ver="2010-08-25";
if(hordeDebug) var consoleService=Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);

function init(){
  this.server="https://webmail.studenti.uniroma1.it";
  this.loginData=[this.server+hordeLoginFormAction,hordeUserFieldName,hordePassFieldName];
  this.dataURL=this.server+"/horde/services/portal/sidebar.php";
  this.mailURL=this.server+"/horde/";
}

function getIconURL(){
  return this.server+"/horde/themes/graphics/favicon.ico";
}

function getCount(aData){
  if(hordeDebug)consoleService.logStringMessage("aData from "+this.dataURL+" :\n\n"+aData);
  var fnd=aData.match(/n_horde_menu.+['"]imp['"].+['"]label['"].+['"]<strong>.+<\\?\/strong> \((\d+)\)['"]/);
  if(fnd){  
    if(hordeDebug)consoleService.logStringMessage(this.server+" : unread messages found");
    return fnd[1];
  }else{
    var fnd=aData.match(/n_horde_menu.+['"]imp['"].+['"]label['"].+['"].+['"]/);
    if(fnd){
      if(hordeDebug)consoleService.logStringMessage(this.server+" : no unread messages found");
      return 0;
    }else{
      if(hordeDebug)consoleService.logStringMessage(this.server+" : could not match anything in aData");
      return -1;
    }
  }
}
