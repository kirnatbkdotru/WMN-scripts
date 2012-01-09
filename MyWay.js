/**********************************************************
@MyWay
  @author: Kiryanov Nikolay kirn@bk.ru
**********************************************************/
var name="MyWay";
var ver="2011-10-05";

function init() {
	this.initStage=ST_PRE; 
	this.loginData=["http://registration.myway.com/login_process.jsp","membername",,"jerror=none&perm=1&permchk=1&gofer=Sign+In%21"];
	this.mailURL="http://my.myway.com/email_redir.jsp";
}
function getCount(aData) {
	return JSON.parse(aData).data.f[0].n;
}

function process(aHttpChannel, aData) {
	switch(this.stage){
		case ST_PRE:

			var ldate = new Date ();
			this.LoadTime = ldate.getTime();
		  
			this.getHtml("http://registration.myway.com/login.jsp");
			return false;
	
		case ST_PRE_RES:
			var fnd=aData.match(/snonce.+?value=\"(\S+?)\"/);
			if(fnd){
				this.snonce = fnd[1];
			}
    
			fnd=aData.match(/stime.+?value=\"(\S+?)\"/);
			if(fnd){
				this.stime = fnd[1];
			}
			
			if (this.snonce && this.stime){
				this.Jauth();
				this.stage=ST_LOGIN;	
				this.getHtml(this.loginData[LOGIN_URL],this.loginData[LOGIN_POST]
				+"&snonce="+encodeURIComponent(this.snonce)
				+"&stime="+encodeURIComponent(this.stime)
				+"&timeskew="+encodeURIComponent(this.timeskew)
				+"&crep="+encodeURIComponent(this.crep)
				);
				return false;
			}
			break;
	
		case ST_LOGIN_RES:  
			this.getHtml("http://my.myway.com/email_redir.jsp");
			
		return false;
	
		case ST_LOGIN_RES + 1:  
	    
		var fnd=aData.match(/sid=\w+/);

			if(fnd)
			{
				this.dataURL = "http://webmail.myway.com/cgi-bin/emailGetFolderTree.fcg?unm=" + this.user + ".myway&" + fnd + "&gds=1&format=json";
				this.stage 		= ST_DATA;
            }
	}
  return this.baseProcess(aHttpChannel, aData);
}

function getIconURL(){
  return "http://www.myway.com/favicon.ico";
}

function Jauth()
{

function TimeSkew(LoadTime) {
	var diff;
	var tdate = new Date ();
	var CurrTime = tdate.getTime();
	diff = Math.round((Math.abs(CurrTime - LoadTime)) * 0.001);
return diff;
}

function integer(n) {
    return n % (0xffffffff + 1);
}
function shr(a, b) {
    a = integer(a);
    b = integer(b);
    if (a - 0x80000000 >= 0) {
        a = a % 0x80000000;
        a >>= b;
        a += 0x40000000 >> (b - 1);
    } else 
    {
        a >>= b;
    }
    return a;
}
function shl1(a) {
    a = a % 0x80000000;
    if (a & 0x40000000 == 0x40000000) {
        a -= 0x40000000;
        a *= 2;
        a += 0x80000000;
    } 
    else 
    {
        a *= 2;
    }
    return a;
}
function shl(a, b) {
    a = integer(a);
    b = integer(b);
    for (var i = 0; i < b; i++) 
    {
        a = shl1(a);
    }
    return a;
}
function and(a, b) {
    a = integer(a);
    b = integer(b);
    var t1 = (a - 0x80000000);
    var t2 = (b - 0x80000000);
    if (t1 >= 0) {
        if (t2 >= 0) {
            return ((t1 & t2) + 0x80000000);
        } 
        else 
        {
            return (t1 & b);
        }
    } else 
    {
        if (t2 >= 0) 
        {
            return (a & t2);
        } 
        else 
        {
            return (a & b);
        }
    }
}
function or(a, b) {
    a = integer(a);
    b = integer(b);
    var t1 = (a - 0x80000000);
    var t2 = (b - 0x80000000);
    if (t1 >= 0) {
        if (t2 >= 0) {
            return ((t1 | t2) + 0x80000000);
        } 
        else 
        {
            return ((t1 | b) + 0x80000000);
        }
    } 
    else 
    {
        if (t2 >= 0) 
        {
            return ((a | t2) + 0x80000000);
        } 
        else 
        {
            return (a | b);
        }
    }
}
function xor(a, b) {
    a = integer(a);
    b = integer(b);
    var t1 = (a - 0x80000000);
    var t2 = (b - 0x80000000);
    if (t1 >= 0) {
        if (t2 >= 0) {
            return (t1 ^ t2);
        } 
        else 
        {
            return ((t1 ^ b) + 0x80000000);
        }
    } 
    else 
    {
        if (t2 >= 0) 
        {
            return ((a ^ t2) + 0x80000000);
        } 
        else 
        {
            return (a ^ b);
        }
    }
}
function not(a) {
    a = integer(a);
    return (0xffffffff - a);
}
function EncodeBase64(pInBuf) 
{
    var bpos = 0;
    var base64bits = 6;
    var pszAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var sOut = "";
    var nMod3 = pInBuf.length % 3;
    for (var i = 0; i < pInBuf.length * 8; i += base64bits) 
    {
        var cnum = 0;
        var hashbytenum = 0;
        var hashbyte;
        var hashbyteval;
        var test;
        for (var b = 0; b < base64bits; b++) 
        {
            hashbytenum = shr(i + b, 3);
            // remember to zero pad last byte
            if (hashbytenum < pInBuf.length) 
            {
                hashbyte = pInBuf[hashbytenum];
            } 
            else 
            {
                hashbyte = 0;
            }
            cnum = shl1(cnum)
            if (and(hashbyte, shl(1, (7 - ((i + b) % 8)))) != 0) 
            {
                cnum = or(cnum, 1);
            }
        }
        sOut += pszAlphabet.charAt(cnum);
    }
    if (nMod3 == 1)
        sOut += "==";
    else if (nMod3 == 2)
        sOut += "=";
    return sOut;
}
function array(n) 
{
    var i;
    for (i = 0; i < n; i++)
        this[i] = 0;
    this.length = n;
}
function clone(src) 
{
    var i;
    var dst = new array(src.length);
    for (i = 0; i < src.length; i++) 
    {
        dst[i] = src[i];
    }
    return dst;
}
var state = new array(4);
var count = new array(2);
count[0] = 0;
count[1] = 0;
var buffer = new array(64);
var transformBuffer = new array(16);
var digestBits = new array(16);
var S11 = 7;
var S12 = 12;
var S13 = 17;
var S14 = 22;
var S21 = 5;
var S22 = 9;
var S23 = 14;
var S24 = 20;
var S31 = 4;
var S32 = 11;
var S33 = 16;
var S34 = 23;
var S41 = 6;
var S42 = 10;
var S43 = 15;
var S44 = 21;
function F(x, y, z) {
    return or(and(x, y), and(not(x), z));
}
function G(x, y, z) 
{
    return or(and(x, z), and(y, not(z)))
}
function H(x, y, z) 
{
    return xor(xor(x, y), z);
}
function I(x, y, z) 
{
    return xor(y, or(x, not(z)));
}
function rotateLeft(a, n) 
{
    return or(shl(a, n), shr(a, (32 - n)));
}
function FF(a, b, c, d, x, s, ac) 
{
    a = a + F(b, c, d) + x + ac;
    a = rotateLeft(a, s);
    a = a + b;
    return a;
}
function GG(a, b, c, d, x, s, ac) 
{
    a = a + G(b, c, d) + x + ac;
    a = rotateLeft(a, s);
    a = a + b;
    return a;
}
function HH(a, b, c, d, x, s, ac) 
{
    a = a + H(b, c, d) + x + ac;
    a = rotateLeft(a, s);
    a = a + b;
    return a;
}
function II(a, b, c, d, x, s, ac) 
{
    a = a + I(b, c, d) + x + ac;
    a = rotateLeft(a, s);
    a = a + b;
    return a;
}
function transform(buf, offset) 
{
    var i;
    var a = 0, b = 0, c = 0, d = 0;
    var x = transformBuffer;
    a = state[0];
    b = state[1];
    c = state[2];
    d = state[3];
    for (i = 0; i < 16; i++) 
    {
        x[i] = buf[i * 4 + offset] & 0xff;
        for (j = 1; j < 4; j++) 
        {
            x[i] += shl(and(buf[i * 4 + j + offset], 0xff), (j * 8));
        }
    }
    /* Round 1 */
    a = FF(a, b, c, d, x[0], S11, 0xd76aa478); /* 1 */
    d = FF(d, a, b, c, x[1], S12, 0xe8c7b756); /* 2 */
    c = FF(c, d, a, b, x[2], S13, 0x242070db); /* 3 */
    b = FF(b, c, d, a, x[3], S14, 0xc1bdceee); /* 4 */
    a = FF(a, b, c, d, x[4], S11, 0xf57c0faf); /* 5 */
    d = FF(d, a, b, c, x[5], S12, 0x4787c62a); /* 6 */
    c = FF(c, d, a, b, x[6], S13, 0xa8304613); /* 7 */
    b = FF(b, c, d, a, x[7], S14, 0xfd469501); /* 8 */
    a = FF(a, b, c, d, x[8], S11, 0x698098d8); /* 9 */
    d = FF(d, a, b, c, x[9], S12, 0x8b44f7af); /* 10 */
    c = FF(c, d, a, b, x[10], S13, 0xffff5bb1); /* 11 */
    b = FF(b, c, d, a, x[11], S14, 0x895cd7be); /* 12 */
    a = FF(a, b, c, d, x[12], S11, 0x6b901122); /* 13 */
    d = FF(d, a, b, c, x[13], S12, 0xfd987193); /* 14 */
    c = FF(c, d, a, b, x[14], S13, 0xa679438e); /* 15 */
    b = FF(b, c, d, a, x[15], S14, 0x49b40821); /* 16 */
    /* Round 2 */
    a = GG(a, b, c, d, x[1], S21, 0xf61e2562); /* 17 */
    d = GG(d, a, b, c, x[6], S22, 0xc040b340); /* 18 */
    c = GG(c, d, a, b, x[11], S23, 0x265e5a51); /* 19 */
    b = GG(b, c, d, a, x[0], S24, 0xe9b6c7aa); /* 20 */
    a = GG(a, b, c, d, x[5], S21, 0xd62f105d); /* 21 */
    d = GG(d, a, b, c, x[10], S22, 0x2441453); /* 22 */
    c = GG(c, d, a, b, x[15], S23, 0xd8a1e681); /* 23 */
    b = GG(b, c, d, a, x[4], S24, 0xe7d3fbc8); /* 24 */
    a = GG(a, b, c, d, x[9], S21, 0x21e1cde6); /* 25 */
    d = GG(d, a, b, c, x[14], S22, 0xc33707d6); /* 26 */
    c = GG(c, d, a, b, x[3], S23, 0xf4d50d87); /* 27 */
    b = GG(b, c, d, a, x[8], S24, 0x455a14ed); /* 28 */
    a = GG(a, b, c, d, x[13], S21, 0xa9e3e905); /* 29 */
    d = GG(d, a, b, c, x[2], S22, 0xfcefa3f8); /* 30 */
    c = GG(c, d, a, b, x[7], S23, 0x676f02d9); /* 31 */
    b = GG(b, c, d, a, x[12], S24, 0x8d2a4c8a); /* 32 */
    /* Round 3 */
    a = HH(a, b, c, d, x[5], S31, 0xfffa3942); /* 33 */
    d = HH(d, a, b, c, x[8], S32, 0x8771f681); /* 34 */
    c = HH(c, d, a, b, x[11], S33, 0x6d9d6122); /* 35 */
    b = HH(b, c, d, a, x[14], S34, 0xfde5380c); /* 36 */
    a = HH(a, b, c, d, x[1], S31, 0xa4beea44); /* 37 */
    d = HH(d, a, b, c, x[4], S32, 0x4bdecfa9); /* 38 */
    c = HH(c, d, a, b, x[7], S33, 0xf6bb4b60); /* 39 */
    b = HH(b, c, d, a, x[10], S34, 0xbebfbc70); /* 40 */
    a = HH(a, b, c, d, x[13], S31, 0x289b7ec6); /* 41 */
    d = HH(d, a, b, c, x[0], S32, 0xeaa127fa); /* 42 */
    c = HH(c, d, a, b, x[3], S33, 0xd4ef3085); /* 43 */
    b = HH(b, c, d, a, x[6], S34, 0x4881d05); /* 44 */
    a = HH(a, b, c, d, x[9], S31, 0xd9d4d039); /* 45 */
    d = HH(d, a, b, c, x[12], S32, 0xe6db99e5); /* 46 */
    c = HH(c, d, a, b, x[15], S33, 0x1fa27cf8); /* 47 */
    b = HH(b, c, d, a, x[2], S34, 0xc4ac5665); /* 48 */
    /* Round 4 */
    a = II(a, b, c, d, x[0], S41, 0xf4292244); /* 49 */
    d = II(d, a, b, c, x[7], S42, 0x432aff97); /* 50 */
    c = II(c, d, a, b, x[14], S43, 0xab9423a7); /* 51 */
    b = II(b, c, d, a, x[5], S44, 0xfc93a039); /* 52 */
    a = II(a, b, c, d, x[12], S41, 0x655b59c3); /* 53 */
    d = II(d, a, b, c, x[3], S42, 0x8f0ccc92); /* 54 */
    c = II(c, d, a, b, x[10], S43, 0xffeff47d); /* 55 */
    b = II(b, c, d, a, x[1], S44, 0x85845dd1); /* 56 */
    a = II(a, b, c, d, x[8], S41, 0x6fa87e4f); /* 57 */
    d = II(d, a, b, c, x[15], S42, 0xfe2ce6e0); /* 58 */
    c = II(c, d, a, b, x[6], S43, 0xa3014314); /* 59 */
    b = II(b, c, d, a, x[13], S44, 0x4e0811a1); /* 60 */
    a = II(a, b, c, d, x[4], S41, 0xf7537e82); /* 61 */
    d = II(d, a, b, c, x[11], S42, 0xbd3af235); /* 62 */
    c = II(c, d, a, b, x[2], S43, 0x2ad7d2bb); /* 63 */
    b = II(b, c, d, a, x[9], S44, 0xeb86d391); /* 64 */
    state[0] += a;
    state[1] += b;
    state[2] += c;
    state[3] += d;
}
function init() 
{
    var i;
    count[0] = count[1] = 0;
    state[0] = 0x67452301;
    state[1] = 0xefcdab89;
    state[2] = 0x98badcfe;
    state[3] = 0x10325476;
    for (i = 0; i < digestBits.length; i++)
        digestBits[i] = 0;
}
function update(b) 
{
    var index, i;
    index = and(shr(count[0], 3), 0x3f);
    if (count[0] < 0xffffffff - 7)
        count[0] += 8;
    else 
    {
        count[1]++;
        count[0] -= 0xffffffff + 1;
        count[0] += 8;
    }
    buffer[index] = and(b, 0xff);
    if (index >= 63) 
    {
        transform(buffer, 0);
    }
}
function finish() 
{
    var bits = new array(8);
    var padding;
    var i = 0, index = 0, padLen = 0;
    var j = 0;
    for (i = 0; i < 4; i++) 
    {
        bits[i] = and(shr(count[0], (i * 8)), 0xff);
    }
    for (i = 0; i < 4; i++) 
    {
        bits[i + 4] = and(shr(count[1], (i * 8)), 0xff);
    }
    index = and(shr(count[0], 3), 0x3f);
    padLen = (index < 56) ? (56 - index) : (120 - index);
    padding = new array(64);
    padding[0] = 0x80;
    for (i = 0; i < padLen; i++)
        update(padding[i]);
    for (i = 0; i < 8; i++)
        update(bits[i]);
    for (i = 0; i < 4; i++) 
    {
        for (j = 0; j < 4; j++) 
        {
            digestBits[i * 4 + j] = and(shr(state[i], (j * 8)), 0xff);
        }
    }
}
var ascii = "01234567890123456789012345678901" + 
" !\"#i%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
"[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
function MD5(entree) 
{
    var ch1, k;
    init();
    for (k = 0; k < entree.length; k++) 
    {
        ch1 = entree.charAt(k);
        // absurd code because we have to avoid explicit dollar sign character
        if ((ch1 > '#') && (ch1 < '%')) 
        {
            update(36);
        } 
        else 
        {
            update(ascii.lastIndexOf(ch1));
        }
    }
    finish();
    return clone(digestBits);
}
function HmacMD5(Key, Data, DataLen) 
{
    var DigestSize = 16;
    var BlockSize = 64;
    var ch;
    Key = MD5(Key.toLowerCase());
    var Kipad = new array(BlockSize);
    var Kopad = new array(BlockSize);
    var i = 0;
    for (i = 0; i < BlockSize; i++) 
    {
        Kipad[i] = xor(((i < DigestSize) ? Key[i] : 0), 0x36);
        Kopad[i] = xor(((i < DigestSize) ? Key[i] : 0), 0x5c);
    }
    init();
    for (i = 0; i < BlockSize; i++) 
    {
        update(Kipad[i]);
    }
    for (i = 0; i < DataLen; i++) 
    {
        ch = Data.charAt(i);
        // absurd code because we have to avoid explicit dollar sign character
        if ((ch > '#') && (ch < '%')) 
        {
            update(36);
        } 
        else 
        {
            update(ascii.lastIndexOf(ch));
        }
    }
    finish();
    var InnerDigest = clone(digestBits);
    init();
    for (i = 0; i < BlockSize; i++) 
    {
        update(Kopad[i]);
    }
    for (i = 0; i < DigestSize; i++) 
    {
        update(InnerDigest[i]);
    }
    finish();
    var temp = clone(digestBits);
    init();
    return temp;
}
function HmacMD5_B64(Key, Data, DataLen) 
{
    var res = HmacMD5(Key, Data, DataLen);
    var temp = EncodeBase64(res);
    return temp;
}
function Jauth() 
{
    var RawRes, Res, Temp, i, Skew, iPasswordLen;
    var Data, Password;
    var sOrigButtonText = document.loginbox.gofer.value;
    if (JauthStarted == 0) {
        JauthStarted = 1;
        document.loginbox.gofer.value = "Wait...";
    } else {
        return false;
    }
    Skew = "" + TimeSkew();
    Data = Skew + document.loginbox.snonce.value;
    Password = document.loginbox.password.value;
    iPasswordLen = Password.length;
    RawRes = HmacMD5(Password, Data, Data.length);
    Temp = new array((RawRes.length - 6));
    for (i = 6; i < RawRes.length; i++) 
    {
        Temp[i - 6] = RawRes[i];
    }
    Res = EncodeBase64(Temp);
    var dummyPassword = '';
    for (i = 0; i < iPasswordLen; i++)
        dummyPassword = dummyPassword + 'x';
    document.loginbox.timeskew.value = Skew;
    document.loginbox.crep.value = Res;
    document.loginbox.password.value = dummyPassword;
    document.loginbox.gofer.value = sOrigButtonText;
    return true;
}

var RawRes, Res, Temp, i, Skew, iPasswordLen;
var Data, Password;

Skew = "" + TimeSkew(this.LoadTime);
Data = Skew + this.snonce;
Password = this.password;
iPasswordLen = Password.length;
RawRes = HmacMD5(Password, Data, Data.length);
Temp = new array((RawRes.length - 6));
for(i=6;i<RawRes.length;i++)
{
Temp[i-6] = RawRes[i];
}
Res = EncodeBase64(Temp);
var dummyPassword = '';
for (i = 0; i < iPasswordLen; i++)
   dummyPassword = dummyPassword + 'x';
this.timeskew = Skew;
this.crep = Res;
this.dummyPassword = dummyPassword;

}