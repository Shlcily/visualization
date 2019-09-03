var bs = false;
var mosq = new Mosquitto();
var url = 'ws://'+host+':'+port+'/mqtt';

/**  制定主题  **/



var listName = ["总行营业部","天津分行","石家庄分行","太原分行","呼和浩特分行","沈阳分行","长春分行","哈尔滨分行","上海分行","南京分行","杭州分行","宁波分行","合肥分行"]

if(bs){
    //正式接口
    connectMq(mosq,url);
    //回调函数
    mosq.onmessage = function(topic,payload,qos){
        try {
            // 正式接口数据
        } catch (err){

        } finally {

        }
    };
    mosq.ondisconnect = function(){
        setTimeout(connectMq,30000);
    };
    mosq.onconnect = function(){
        console.log('连接成功！');
    }
 } else {
    // 模拟假数据
    backBoneFn([
        {"percent":"76","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"26","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"46","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"88","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"90","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"20","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"105","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"55","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"30","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"66","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"88","zxfz":"500","zxvalue":"1000","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"20","zxfz":"40","zxvalue":"3600","bxpercent":"30","bxfz":"400","bxvalue":"800"},
        {"percent":"20","zxfz":"100","zxvalue":"290","bxpercent":"30","bxfz":"400","bxvalue":"800"}
    ]);


    inciOutFn("#internetContent",[
        {name:'网银二中心移动线路',percentTage:36,molecule:72,total:600},
        {name:'网银二中心联通线路备',percentTage:76,molecule:70,total:800},
        {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
        {name:'办公应用互联网出口',percentTage:36,molecule:72,total:600},
        {name:'文化WiFi互联网出口',percentTage:36,molecule:72,total:600},
    ]);


    inciOutFn("#metroContent",[
        {name:'文化专线一',percentTage:26,molecule:32,total:400},
        {name:'文化专线二',percentTage:60,molecule:70,total:800},
        {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
        {name:'办公应用互联网出口',percentTage:36,molecule:72,total:600}
    ]);

    inciOutFn("#outreachContent",[
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600}, {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600},
         {name:'网银一中心移动线路',percentTage:88,molecule:88,total:1000},
        {name:'网银一中心联通线路主',percentTage:20,molecule:30,total:600},
        {name:'网银二中心电信线路',percentTage:66,molecule:400,total:600},
        {name:'分行特色电信线路',percentTage:36,molecule:72,total:600},
        {name:'分行特色联通线路',percentTage:30,molecule:20,total:600}
    ])
 }


(function(){
    setDataTime();
    setInterval(setDataTime,1000);
    /* 定时刷新 */
    setInterval(autoRefresh,5000);
})();

/**  获取当前时间  ***/
function autoRefresh() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (h == 23 && m == 59 && (s > 55 && s < 59)) {
        location.reload();
    }
}
/**  渲染当前时间  ***/
function setDataTime(){ 
    document.querySelector("#dateYear").innerHTML = moment().format("YYYY/MM/DD");
    document.querySelector("#dateTime").innerHTML = moment().format("HH:mm");
    document.querySelector("#period").innerHTML = moment().format("A");
}

function colorProgress(value){
    var val = Number(value).toFixed(2);
    var str = '';
    if (val < 50 ) {
        str = '<div class="progress-bar" style="width:'+val+'%;background-color:#01ff07"></div>';
    } else if (val >= 50 && val <80 ){
        str = '<div class="progress-bar" style="width:'+val+'%;background-color:#ff9f00"></div>';
    } else if (val >=80 ){
        if (val >=100) {
            val = 100;
        }
        str = '<div class="progress-bar" style="width:'+val+'%;background-color:#ff1700"></div>';
    }
    return str;
}

/* 调整百分率颜色 的函数 */
function colorRatio(value) {
    var val = Number(value).toFixed(2);
    var html = '';
     if (val <50 ) {
        html = '<span class="percentage" style="color:#01ff07">'+val+'%</span>';
    } else if (val >= 50 && val <80 ){
        html = '<span class="percentage" style="color:#ff9f00">'+val+'%</span>';
    } else if (val >=80 ){
        if (val >=100) {
            val = 100;
        }
        html = '<span class="percentage" style="color:#ff1700">'+val+'%</span>';
    }
    return html;
}



/**  网络骨干线路 数据处理函数  **/
function backBoneFn(obj){
    var html = '';
    /* 先将自定义的分行名称遍历到数组中 */
    for(var i=0;i<obj.length;i++){
        for(var j=0;j<listName.length;j++){
            obj[i].name = listName[i];
        }
    }

    /* 开始正式数据节点渲染 */
    for(var k=0;k<obj.length;k++){
        html += '<div class="contentList">';
        if (k%2 ==0 ) {
            html += '<div class="boneName nameBG">'+obj[k].name+'</div>';
        } else {
            html += '<div class="boneName">'+obj[k].name+'</div>';
        }
        html += '<div class="boneDev">';
        html += '<span style="float: left;">生产</span>';
        html += '<div class="progress">';
        html += colorProgress(obj[k].percent);
        html += '</div>';
        html += colorRatio(obj[k].percent);
        html += '<span class="ratio"><span class="molecule">'+obj[k].zxfz+'</span>/'+obj[k].zxvalue+'</span>';
        html += '</div>';
        html += '<div class="boneDev">';
        html += '<span style="float: left;">办公</span>';
        html += '<div class="progress">';
        html += colorProgress(obj[k].bxpercent);
        html += '</div>';
        html += colorRatio(obj[k].bxpercent);
        html += '<span class="ratio"><span class="molecule">'+obj[k].bxfz+'</span>/'+obj[k].bxvalue+'</span>';
        html += '</div>';
        html += '</div>';
    }
    $("#backboneContent").html(html);
}


/** 互联网线路、城域网线路、外联线路 数据处理函数 */
function inciOutFn(id,obj){
    var html = '';
    for(var i=0;i<obj.length;i++){
        if (id == "#outreachContent") {
            html += '<div class="lineList" style="margin-bottom:5px;">';
        } else if (id == "#internetContent") {
            html +='<div class="lineList" style="width:116px;">';
        } else {
            html += '<div class="lineList">';
        }
        html += '<div class="listHead">';
        html += '<div class="dots"></div>';
        html += '<div class="listName"><span>'+obj[i].name+'</span></div>';
        html += '</div>';
        html += '<div class="listNum">';
        html += colorRatio(obj[i].percentTage);
        html += '<span class="ratio listNumRatio"><span class="molecule">'+obj[i].molecule+'</span>/'+obj[i].total+'</span>';
        html += '</div>';
        html += '<div class="progress listPro">';
        html += colorProgress(obj[i].percentTage);
        html += '</div>';
        html += '</div>';
    }
    $(id).html(html);
}



/**  检验值是否为空  **/
function empty(obj){
    //检验对象
    if(Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length !==0){
        return true;
    }
    // 检验数组
    if(Array.prototype.isPrototypeOf(obj) && Object.length !==0){
        return true;
    }
}


function connectMq() {
    mosq.connect(url); //连接
    /*连接主题*/
    mosq.subscribe(topic, 0)
}

