//监听浏览器窗口改变大小
var winWidth = 1920;
var winHeight = 1080;
$(window).resize(function () {
	resetScale();
});
function getSize() {//获得窗口大小
	if (window.innerWidth)
		winWidth = window.innerWidth;
	else if ((document.body) && (document.body.clientWidth))
		winWidth = document.body.clientWidth;
	//获取窗口高度
	if (window.innerHeight)
		winHeight = window.innerHeight;
	else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;

	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight
		&& document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
}
function resetScale() {//调整缩放
	getSize();
	var db = document.body;
	db.style.transform = "scale(" + winWidth / 1920 + "," + winHeight / 1080 + ")";
	// db.style.transform="scale("+winWidth/2880+","+winHeight/1080+")";
	// db.style.msTransform="scale("+winWidth/2880+","+winHeight/1080+")";
	//	-ms-transform:rotate(7deg); 	/* IE 9 */
	//	-moz-transform:rotate(7deg); 	/* Firefox */
	//	-webkit-transform:rotate(7deg); /* Safari 和 Chrome */
	//	-o-transform:rotate(7deg); 	/* Opera */
	//	db.style..style.webkitTransform = "";
	//	db.style..style.MozTransform = "";
	//	db.style..style.msTransform = "";
	//	db.style..style.OTransform = "";
	//	db.style..style.transform = "";
}
/**
 * 添加千分位
 */
function milliFormat(s) {
	var decimalLen = 2;//小数点后位数
	var _regular = "";
	s = s + "";
	if (s.indexOf(".") >= 0) {
		//如果有小数位 更新decimalLen
		decimalLen = s.length - s.indexOf(".") - 1;
	}
	for (var i = 0; i < decimalLen; i++) {
		_regular += "\\d";
	}
	var original = s;
	var op = "";
	if (s.indexOf("-") == 0) {
		op = "-";
		s = s.substring(1, s.length);
	}

	if (/[^0-9\.\-]/.test(s)) {
		return "invalid value";
	}
	s = s.replace(/^(\d*)$/, "$1.");
	//	s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
	s = (s + "00").replace(eval("/(\\d*\\." + _regular + ")\\d*/"), "$1");
	s = s.replace(".", ",");
	var re = /(\d)(\d{3},)/;
	while (re.test(s)) {
		s = s.replace(re, "$1,$2");
	}
	//	s=s.replace(/,(\d\d)$/,".$1");
	s = s.replace(eval("/,(" + _regular + ")$/"), ".$1");
	s = s.replace(/^\./, "0.");
	s = s.toString();

	if (s.length > (decimalLen + 1)) {
		if (original.length > (decimalLen + 1)) {
			if (s.substring(s.length - (decimalLen + 1), s.length)
				== original.substring(original.length - (decimalLen + 1), original.length)) {
				return op + s;
			}
		}
		if (("0" + s.substring(s.length - (decimalLen + 1), s.length)) - 0 == 0) {
			return op + s.substring(0, s.length - (decimalLen + 1));
		}
	}
	return op + s;
}

//刷屏计时器开始
var mcount = 2;//预计跑100次
//id 按位数数值逐渐增加~ N秒跑完，可以跑M次
var nc = 0;
function digitalScrollFun(data, obj, willlen, decimal) {
	var divId = "newAddDeposit";
	if (obj) {
		divId = obj.id;
	}
	if (willlen == null) willlen = 0;
	var notFinanceCnt = Math.round(data);
	if (decimal) {
		//		decimal = 0;
		notFinanceCnt = (data - 0).toFixed(decimal);//修改成 支持小数的代码
	}
	if (notFinanceCnt < 0) {
		notFinanceCnt = Math.abs(notFinanceCnt) + "-" + milliFormat(Math.abs(notFinanceCnt));
		//		console.log(notFinanceCnt);
	} else {
		notFinanceCnt = "" + notFinanceCnt;
		if (notFinanceCnt.length < willlen) {
			var llen = notFinanceCnt.length;
			for (var i = 0; i < (willlen - llen); i++) {
				notFinanceCnt = "0" + notFinanceCnt;
			}
		}
		//		console.log(notFinanceCnt,milliFormat(notFinanceCnt));
		notFinanceCnt = milliFormat(notFinanceCnt);
	}
	var cnt = notFinanceCnt;
	var len = cnt.length;
	var oldspans = $("#" + divId + " span");
	var oldspansVal = [];
	for (var i = 0; i < oldspans.length; i++) {
		oldspansVal.push($(oldspans[i]).html());
	}
	$('#' + divId).html("");
	for (var i = 0; i < len; i++) {
		$("<span id='value" + i + "' class='cntStyle'>").appendTo($('#' + divId));
	}
	var spans = $("#" + divId + " span");
	var arr = [];
	var fopacity = true;
	for (var i = 0; i < cnt.length; i++) {
		ss = (cnt.substr(i, 1));
		arr.push(ss);
		if (ss == "0") {
			if (fopacity) {
				$(spans[i]).css({ opacity: .5 });//把首位补0操作出现的0010.00的第一等等，增加透明度
			}
		} else {
			fopacity = false;
		}
		if (!oldspansVal[i] ? true : (oldspansVal[i] != arr[i])) {//循环所有id*=value的span，如果和上次不相等，就变化
			addCount($(spans[i]), arr[i], 0);
		} else {
			$(spans[i]).html(arr[i]);
		}
	}

	//	setTimeout(function(){
	//	for ( var i = 0; i < cnt.length; i++) {
	//		if($(spans[i]).html()=="0"){
	//			$(spans[i]).css({ opacity:.5});
	//		}else{
	//			break;
	//		}
	//	}}
	//	,2500
	//	);
}
function addCount(obj, orderValue, runcount) {
	if (orderValue == ",") {
		obj.html(" , ");
		obj.css({ "display": "inline-block", "width": "30px", "text-align": "center" });
		//		obj.html("<i style='height:100%;opacity:0;'></i>");
		return;
	} else if (orderValue == ".") {
		obj.html(".");
		return;
	} else if (orderValue == "-") {
		obj.html("-");
		return;
	}
	_orderValue = Number(orderValue)
	var _val = Number(obj.html());
	if (!isNaN(_val)) {
		var tempnum = _val - (-1);
		if (tempnum == 10) {
			obj.html(0);
		} else {
			obj.html(tempnum);
		}
		runcount++;
		if (runcount >= mcount) {
			if (_orderValue == Number(obj.html())) {
				return;
			}
		}
		setTimeout(function () {
			addCount(obj, orderValue, runcount);
		}, 150 * Math.random());
	} else {
		return;
	}
}

/**************      翻牌数据多次翻牌      ****************/
function delayedReFresh(data, obj, willlen, decimal) {
	var arr = grouping(data, obj);
	if (!arr) {
		return;
	}
	var n = 0;
	digitalScrollFun(arr[0],obj,willlen,decimal);
	var timer = setInterval(function(){
		n++;
		digitalScrollFun(arr[n],obj,willlen,decimal);
		if (n + 1 == obj.num) {
			// console.log(n);
			clearInterval(timer);
		}
	},obj.time / obj.num);
}

function grouping(data,obj) {
	var result = [];
	/* 获取旧数据*/
	var oldspans = $("#"+ obj.id + "span");
	var oldspansVal = "";
	if (oldspans.length) {
		for (var i =0;i< oldspans;i++) {
			if (!($.trim($(oldspans[i]).html()) === ",")) {
				oldspansVal += $.trim($(oldspans[i]).html());
			}
		}
	} else {
		oldspansVal = 0;
	}
	oldspansVal = Number(oldspansVal);
	if (oldspansVal == data) {
		return false;
	}
	if (oldspansVal > data || data == 0) {
		$("#" + obj.id).html("<span>" + milliFormat(data) + "</span>");
		return false;
	}
	var step = (Number(data) - Number(oldspansVal)) / obj.num ;
	for (var i=0;i< obj.num - 1;i++) {
		oldspansVal += step ;
		oldspansVal = Math.round(oldspansVal);
		if (oldspansVal >= data) {
			result.push(data);
		} else {
			result.push(oldspansVal);
		}
	}
	result.push(data);
	return result;
}