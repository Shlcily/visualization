var bs = false;
var mosq = new Mosquitto();
var url = 'ws://'+host+':'+port+'/mqtt';

/***********************  设定主题  *******************************/
/* 交易账户 -KPI */
var topicTransactionCount = 'C/EBD/MARKET/TRANSCATION/KPI/ALL/ZX';
/*  银行账户 */
var topicBankAccounts = 'C/EDB/MARKET_BANK/ACCOUNTS/ALL/ZX';
/*  消息推送 */
var topicInfoCount = 'C/EBD/MARKET_BANK/INFO/ALL/ZX';

/***********************  模拟假数据 ***************************/
var topicData = [{
    //  限额总览 -KPI
    topic:'C/EBD/MARKET/TRANSCATION/KPI/ALL/ZX',
    data:{
        // 交易账户--银行集团-KPI
        group_bond_count:366.2,
        group_limit_count:400,
        group_change_count:'+0.1',
        group_limit_ratio:56,
        // 交易账户--法人-KPI
        corporate_bond_count:501.6,
        corporate_limit_count:500,
        corporate_change_count:'-1.2',
        corporate_limit_ratio:40
    }
},{
    topic:'C/EDB/MARKET_BANK/ACCOUNTS/ALL/ZX',
    data:{
        // 银行账户--债券投资-KPI
        account_bond_count:3.02,
        account_limit_count:4.00,
        account_change_count:'+0.1',
        account_limit_ratio:47,
        account_creditBond_count:501.6,
        account_creditLimit_count:500,
        account_creditChange_count:'-1.2',
        account_creditLimit_ratio:68,
        // 银行账户--基金投资-KPI
        account_fundBond_count:120.5,
        account_fundLimit_count:400,
        account_fundChange_count:'+0.6',
        account_fundLimit_ratio:76,
        account_moneyBond_count:273.8,
        account_moneyLimit_count:320,
        account_moneyChange_count:'+1.1',
        account_moneyLimit_ratio:85
    }
},{
    //  消息推送 
    topic:'C/EBD/MARKET_BANK/INFO/ALL/ZX',
    data:[{
        id:0,
        name:"东野先生的信箱i",
        desc:"小孩子都懂得道理，我们大人却做不到。"
    },{
        id:1,
        name:"标题标题短句标题",
        desc:"你会对生命中那些过客逐渐习惯的  或早 或晚。"
    },{
        id:2,
        name:"东野先生",
        desc:"小孩子都懂得道理"
    }]
}];

/*************************** 渲染图表 ***********************************/
/* 交易账户 --- 银行集团 */
var tradegroupChart = echarts.init(document.getElementById("tradegroupChart"));
var tradegroupChart_data = gaugeRate({center:['45%','50%']});
tradegroupChart.setOption(tradegroupChart_data,true);
/** 交易账户 */
var tradelegalchart = echarts.init(document.getElementById("tradelegalchart"));
var tradelegalchart_data = gaugeRate({center:['55%','50%']});
tradelegalchart.setOption(tradelegalchart_data,true);

/* 银行债券 */
var bankBondscharts = echarts.init(document.getElementById("bankBondscharts"));
var bankBondscharts_data =gaugeRate({center:['45%','52%']});
bankBondscharts.setOption(bankBondscharts_data,true);
/* 银行债券 -- 信用债券 */
var bankCreditcharts = echarts.init(document.getElementById("bankCreditcharts"));
var bankCreditcharts_data = gaugeRate({center:['44%','55%']});
bankCreditcharts.setOption(bankCreditcharts_data,true);

/* 银行债券 -- 基金 */
var bankFundcharts = echarts.init(document.getElementById("bankFundcharts"));
var bankFundcharts_data = gaugeRate({center:['52%','52%']});
bankFundcharts.setOption(bankFundcharts_data,true);

/* 银行债券  -- 货币 */
var bankCurrencycharts = echarts.init(document.getElementById("bankCurrencycharts"));
var bankCurrencycharts_data = gaugeRate({center:['52%','55%']});
bankCurrencycharts.setOption(bankCurrencycharts_data,true);

/*************************** 判断接口的连接通道  *********************/
if(bs){
    //正式接口
    connectMq(mosq,url);
    //回调函数
    mosq.onmessage = function(topic,payload,qos){
        try {
            toMessage(topic,url);
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
    topicData.forEach(function (element) {
        toMassage(element.topic, JSON.stringify(element.data));
    });
 }


(function(){
    setDataTime();
    setInterval(setDataTime,1000);

    /* 定时刷新 */
    setInterval(autoRefresh,5000);

})();
/**
*   获取当前时间
*/
function autoRefresh() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (h == 23 && m == 59 && (s > 55 && s < 59)) {
        location.reload();
    }
}
function setDataTime(){ 
    document.querySelector("#dateYear").innerHTML = moment().format("YYYY/MM/DD");
    document.querySelector("#dateTime").innerHTML = moment().format("HH:mm A");
}

/*********************     数据获取      *************************/

function toMassage(topic,payload){
    if(payload != undefined) {
        if(empty(JSON.parse(payload))) {
            /* 交易账户 */
            if(topic == topicTransactionCount) {
                var data = JSON.parse(payload);
                for(var key in data){
                    /*********************************  交易账户--银行集团层级  *********************************/
                    if(key == 'group_bond_count'){
                        $("#groundBond").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'group_limit_count'){
                        $("#groupLimit").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0)
                    }
                    if(key == 'group_change_count'){
                        var num = false;
                        if (data[key].indexOf('+') != -1) {
                            num = true;
                            $('#grounptoggle').find("span").eq(0).addClass('add').removeClass('reduce');
                        } else if (data[key].indexOf('-') != -1) {
                            num = true;
                            $('#grounptoggle').find("span").eq(0).addClass('reduce').removeClass('add');
                        } else {
                            $('#grounptoggle').find("span").eq(0).removeClass('reduce add');
                        }
                        $("#grounpChange").html(data[key]!=''||data[key]!=undefined?data[key]:0);
                    }
                    if(key == 'group_limit_ratio'){
                        tradegroupChart_data.series[0].data[0] = data[key]!=''||data[key]!=undefined?data[key]:0;
                        tradegroupChart.setOption(tradegroupChart_data,true);
                    }
                    /*********************************  交易账户--本行法人层级  *********************************/
                    if(key == 'corporate_bond_count'){
                        $("#corporateBond").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'corporate_limit_count'){
                        $("#corporateLimit").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0)
                    }
                    if(key == 'corporate_change_count'){
                        var num = false;
                        if (data[key].indexOf('+') != -1) {
                            num = true;
                            $('#corporatetoggle').find("span").eq(0).addClass('add').removeClass('reduce');
                        } else if (data[key].indexOf('-') != -1) {
                            num = true;
                            $('#corporatetoggle').find("span").eq(0).addClass('reduce').removeClass('add');
                        } else {
                            $('#corporatetoggle').find("span").eq(0).removeClass('reduce add');
                        }
                        $("#corporateChange").html(data[key]!=''||data[key]!=undefined?data[key]:0);
                    }
                    if(key == 'corporate_limit_ratio'){
                        tradelegalchart_data.series[0].data[0] = data[key]!=''||data[key]!=undefined?data[key]:0;
                        tradelegalchart.setOption(tradelegalchart_data,true);
                    }

                }
            }
            /* 银行账户 */
            if(topic == topicBankAccounts){
                var data = JSON.parse(payload);
                for(var key in data){
                    /*********************************     银行账户 -- 债券投资      ****************************/
                    if(key == 'account_bond_count'){
                        $("#accountBond").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'account_limit_count'){
                        $("#accountLimit").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
    
                    if(key == 'account_creditBond_count'){
                        $("#creditBond").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'account_creditLimit_count'){
                        $("#creditLimit").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'account_change_count'){
                        var num = false;
                        if (data[key].indexOf('+') != -1) {
                            num = true;
                            $('#accounttoggle').find("span").eq(0).addClass('add').removeClass('reduce');
                        } else if (data[key].indexOf('-') != -1) {
                            num = true;
                            $('#accounttoggle').find("span").eq(0).addClass('reduce').removeClass('add');
                        } else {
                            $('#accounttoggle').find("span").eq(0).removeClass('reduce add');
                        }
                        $("#accountChange").html(data[key]!=''||data[key]!=undefined?data[key]:0);
                    }
                    if(key == 'account_creditChange_count'){
                        var num = false;
                        if (data[key].indexOf('+') != -1) {
                            num = true;
                            $('#creditChangeToggle').find("span").eq(0).addClass('add').removeClass('reduce');
                        } else if (data[key].indexOf('-') != -1) {
                            num = true;
                            $('#creditChangeToggle').find("span").eq(0).addClass('reduce').removeClass('add');
                        } else {
                            $('#creditChangeToggle').find("span").eq(0).removeClass('reduce add');
                        }
                        $("#creditChange").html(data[key]!=''||data[key]!=undefined?data[key]:0);
                    }
                    if(key == 'account_limit_ratio'){
                        bankBondscharts_data.series[0].data[0] = data[key]!=''||data[key]!=undefined?data[key]:0;
                        bankBondscharts.setOption(bankBondscharts_data,true);
                    }
                    if(key == 'account_creditLimit_ratio'){
                        bankCreditcharts_data.series[0].data[0] = data[key]!=''||data[key]!=undefined?data[key]:0;
                        bankCreditcharts.setOption(bankCreditcharts_data,true);
                    }    

                    /*********************************     银行账户 -- 基金/货币投资      ****************************/
                    if(key == 'account_fundBond_count'){
                        $("#fundBond").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'account_fundLimit_count'){
                        $("#fundLimit").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'account_moneyBond_count'){
                        $("#moneyBond").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'account_moneyLimit_count'){
                        $("#moneyLimit").html(data[key]!=''||data[key]!=undefined?milliFormat(data[key]):0);
                    }
                    if(key == 'account_fundChange_count'){
                        var num = false;
                        if (data[key].indexOf('+') != -1) {
                            num = true;
                            $('#fundChangeToggle').find("span").eq(0).addClass('add').removeClass('reduce');
                        } else if (data[key].indexOf('-') != -1) {
                            num = true;
                            $('#fundChangeToggle').find("span").eq(0).addClass('reduce').removeClass('add');
                        } else {
                            $('#fundChangeToggle').find("span").eq(0).removeClass('reduce add');
                        }
                        $("#fundChange").html(data[key]!=''||data[key]!=undefined?data[key]:0);
                    }
                    if(key == 'account_moneyChange_count'){
                        var num = false;
                        if (data[key].indexOf('+') != -1) {
                            num = true;
                            $('#moneyChangeToggle').find("span").eq(0).addClass('add').removeClass('reduce');
                        } else if (data[key].indexOf('-') != -1) {
                            num = true;
                            $('#moneyChangeToggle').find("span").eq(0).addClass('reduce').removeClass('add');
                        } else {
                            $('#moneyChangeToggle').find("span").eq(0).removeClass('reduce add');
                        }
                        $("#moneyChange").html(data[key]!=''||data[key]!=undefined?data[key]:0);
                    }
                    if(key == 'account_fundLimit_ratio'){
                        bankFundcharts_data.series[0].data[0] = data[key]!=''||data[key]!=undefined?data[key]:0;
                        bankFundcharts.setOption(bankFundcharts_data,true);
                    }
                    if(key == 'account_moneyLimit_ratio'){
                        bankCurrencycharts_data.series[0].data[0] = data[key]!=''||data[key]!=undefined?data[key]:0;
                        bankCurrencycharts.setOption(bankCurrencycharts_data,true);
                    } 
                }
            }
            /* 消息推送 */
            if(topic == topicInfoCount){
                var data = JSON.parse(payload);
                var len = data.length;
                console.log(data);
                var html = '';
                for(var item of data){
                    html +=`
                        <div class="message_content">
                            <div class="message_title">推送${item.id+1}</div>
                            <div class="message_subtitle">${item.name}</div>
                            <div class="message_desc">
                                <div class="desc">${item.desc}</div>
                                <div class="detail_info">详情</div>
                            </div>
                        </div>`
                }
                $("#message_box").html(html);

                /************************   判断如果数据不足四组，则剩余的显示【暂无数据】   ******************** */
                var noData = '';
                if(len<4){
                    var step = 4-len;
                    for(var i=0;i<step;i++){
                        noData+='<div class="message_content noData">暂无数据</div>'
                    }
                    $("#message_box").append(noData);
                }
            }
        }
    }
}

/*********************     消息推送-滚动动画     *************************/








/** 仪表盘 视图配置*/
function gaugeRate(settingObj){  // settingObj:其他配置
    return option = {
        series : [
            {
                name:'速度',
                type:'gauge',
                min:0,
                max:100,
                startAngle:220,
                endAngle:-42,
                splitNumber:2,
                radius: '64%',
                center:settingObj.center,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color:[[1,new echarts.graphic.LinearGradient(0,0,1,0,[{
                                offset:0,
                                 color:'#FD7B2F'
                            },{
                                offset:0.45,
                                color:'#DDF94D'
                            },{
                                offset:1,
                                color:'#49F44D'
                            }]
                        )]],
                        width: 4,
                    }
                },
                axisTick:{   // 坐标轴配置
                    length:10,
                    lineStyle:{
                        color:'auto',
                        width:3
                    }
                },
                axisLabel:{ // 坐标轴文本配置
                    color:'#9FCCE8',
                    fontSize:12,
                },
                splitLine:{ // 分割线配置
                    show:false
                },
                pointer:{
                    length:'80%',
                    width:4
                },
                itemStyle:{ // 指针的配置
                    normal:{
                        color:"#C0D0F6"
                    }
                },
                
                markPoint:{
                    symbol:'circle',
                    symbolSize:13,
                    data:[
                        //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                        {x:settingObj.center[0],y:settingObj.center[1],itemStyle:{color:'#C0D0F6'},label:{normal:{show:false}}} 
                    ]
                },
                detail:{
                    formatter:'{value}%',
                    borderColor:'#204196',
                    color:'#78FEB8',
                    fontSize:28,
                    padding:[8,8,4,75],
                    borderRadius:5,
                    offsetCenter:[0,'95%'],
                },
                data:[0]
            }
           
        ]
    }
}

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
    mosq.connect(url);//连接
    /*连接主题*/
    topicData.forEach(function (element) {
        mosq.subscribe(element.topic, 0)
    });
}