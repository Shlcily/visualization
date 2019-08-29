var bs = false;// 控制页面走的假数据还是mqtt，false是假数据，true是mqtt
var mosq = new Mosquitto();
var url = "ws://" + host + ":" + port + "/mqtt";
var trendData = {};

/*********************************************************设定主题***************************************************************************************/
/*存续规模---KPI*/
var topicSurvivalScaleKPICount = 'C/EBD/SURVIVALSCALE/KPI/ALL/ZX';

/*存续规模---曲线图*/
var topicSurvivalScaleTrend = 'C/EBD/SURVIVALSCALE/TREND/ALL/ZX';

/*存续规模---各渠道规模(非担险)*/
var topicSurvivalScaleEachChannelNonRisk = 'C/EBD/SURVIVALSCALE/EACH_CHANNEL_NON_RISK/ALL/ZX';

/*存续规模---各渠道规模（担险）*/
var topicSurvivalScaleEachChannelRisk = 'C/EBD/SURVIVALSCALE/EACH_CHANNEL_RISK/ALL/ZX';

var nonRiskTrendChart = echarts.init(document.getElementById("nonRiskTrendChart"));
var nonRiskTrend_data = riskTrendFn('非担险理财规模趋势');
nonRiskTrendChart.setOption(nonRiskTrend_data, true);

var riskTrendChart = echarts.init(document.getElementById("riskTrendChart"));
var riskTrend_data = riskTrendFn('担险理财规模趋势');
riskTrendChart.setOption(riskTrend_data, true);

function riskTrendFn(title) {
    return option = {
        title: {
            text: title,
            textStyle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 23
            },
            left: 44,
            top: 4
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            }
        },
        grid: {
            show: true,
            top: '27%',
            left: '1%',
            right: '2%',
            bottom: '5%',
            containLabel: true,
            backgroundColor: "rgba(21,51,89,.5)",
            borderColor: 'transparent'
        },
        xAxis: [
            {
                type: 'category',
                axisLine: { //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: '#6182A7'
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#122742',
                        width: 2
                    }
                },
                boundaryGap: true,
                axisLabel: { //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: '#fff',
                        margin: 15,
                        fontSize: 18
                    },
                },
                axisTick: { show: false, },
                data: [],
            }
        ],
        yAxis: [
            {
                position: 'left',
                name: '亿元',
                nameLocation: 'start',
                nameTextStyle: {
                    color: '#6bd3fe',
                    fontSize: 15,
                },
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#122742',
                        width: 2
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#122742',
                        width: 0
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#6bd3fe',
                        fontSize: 15,
                    },
                    formatter: '{value}'
                },
                axisTick: { show: false, },
            }
        ],
        series: [
            {
                name: '最近一月',
                type: 'line',
                smooth: true, //是否平滑曲线显示
                symbol: 'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 10,
                lineStyle: {
                    normal: {
                        color: '#FFFF4D',   // 线条颜色
                        width: 3,
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#FDE138',
                    }
                },
                areaStyle: { //区域填充样式
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(209,131,88, 0.5)' },
                            { offset: 0.4, color: 'rgba(209,131,88, 0.2)' }
                        ], false),
                        shadowColor: 'rgba(209,131,88, 0.4)',
                        shadowBlur: 20,
                    }
                },
                data: []
            }
        ]
    }
}

(function () {
    /*时间戳*/
    setDateTime();
    setInterval(setDateTime, 1000);
    /*定时自动刷新*/
    setInterval(autoRefresh, 5000);
    $('.btn').on('click', function (e) {
        e.preventDefault();
        var index = $(this).index();
        var idRisk = $(this).parent()[0].id;
        $(this).addClass('selected').siblings().removeClass('selected');
        switchLineCharts(idRisk, index);
    })
})();

function switchLineCharts(id, index) {
    if (id == 'nonRisk') {//此时为非担险理财规模
        if (index) {//index===1 此时是最近一年的
            nonRiskTrend_data.series[0].data = trendData.non_risk_year_data_series;
            nonRiskTrend_data.xAxis[0].data = trendData.non_risk_year_data_xAxis;
        } else {//index===1 此时是最近一月的
            nonRiskTrend_data.series[0].data = trendData.non_risk_month_data_series;
            nonRiskTrend_data.xAxis[0].data = trendData.non_risk_month_data_xAxis;
        }
        nonRiskTrendChart.setOption(nonRiskTrend_data, true);
    } else {//此时为担险理财规模
        if (index) {//index===1 此时是最近一年的
            riskTrend_data.series[0].data = trendData.risk_year_data_series;
            riskTrend_data.xAxis[0].data = trendData.risk_year_data_xAxis;
        } else {//index===1 此时是最近一月的
            riskTrend_data.series[0].data = trendData.risk_month_data_series;
            riskTrend_data.xAxis[0].data = trendData.risk_month_data_xAxis;
        }
        riskTrendChart.setOption(riskTrend_data, true);
    }
}

if (bs) {
    connectMq(mosq, url);
    // 回调函数
    mosq.onmessage = function (topic, payload, qos) {
        try {
            toMassage(topic, payload);
        } catch (err) {
            //alert(err);
        } finally {
            //alert('mq返回值:格式错误');
        }
    };
    mosq.ondisconnect = function (rc) {
        setTimeout(connectMq, 30000);//失去连接后，30秒自动在连
    };
    mosq.onconnect = function (rc) {
        console.log("连接mq成功！");
    };
} else {
    /*假数据*/
    topicData.forEach(function (element) {
        toMassage(element.topic, JSON.stringify(element.data));
    });
}
function toMassage(topic, payload) {
    if (payload != undefined) {
        if (empty(eval('(' + payload + ')'))) {
            if (topic == topicSurvivalScaleKPICount) {
                // var jsonData = eval('(' + payload + ')');
                var jsonData = JSON.parse(payload)
                //查看数据
                console.log(jsonData);
                for (var key in jsonData) {
                    if (key == 'non_risk_financial_amount') {//非担险理财规模金额
                        $('#nonRiskFinancial').html(jsonData[key] != '' || jsonData[key] != undefined ? milliFormat(jsonData[key]) : '0');
                    }
                    if (key == 'non_risk_financial_week') {//非担险理财规模----上周
                        var num = false;
                        if (jsonData[key].indexOf('+') != -1) {
                            num = true;
                            $('#lastWeekNon').find("div").eq(1).addClass('add').removeClass('reduce');
                        } else if (jsonData[key].indexOf('-') != -1) {
                            num = true;
                            $('#lastWeekNon').find("div").eq(1).addClass('reduce').removeClass('add');
                        } else {
                            $('#lastWeekNon').find("div").eq(1).removeClass('reduce add');
                        }
                        $('#lastWeekNon').find("div").eq(1).html(jsonData[key] != '' || jsonData[key] != undefined ? `${num ? jsonData[key].slice(0, 1) : ''}${num ? jsonData[key].slice(1) : jsonData[key]} 亿元` : '0');
                    }
                    if (key == 'non_risk_financial_month') {//非担险理财规模----月初
                        var num = false;
                        if (jsonData[key].indexOf('+') != -1) {
                            num = true;
                            $('#lastMonthNon').find("div").eq(1).addClass('add').removeClass('reduce');
                        } else if (jsonData[key].indexOf('-') != -1) {
                            num = true;
                            $('#lastMonthNon').find("div").eq(1).addClass('reduce').removeClass('add');
                        } else {
                            $('#lastMonthNon').find("div").eq(1).removeClass('reduce add');
                        }
                        $('#lastMonthNon').find("div").eq(1).html(jsonData[key] != '' || jsonData[key] != undefined ? `${num ? jsonData[key].slice(0, 1) : ''}${num ? jsonData[key].slice(1) : jsonData[key]} 亿元` : '0');
                    }
                    if (key == 'non_risk_financial_year') {//非担险理财规模----年初
                        var num = false;
                        if (jsonData[key].indexOf('+') != -1) {
                            num = true;
                            $('#lastYearNon').find("div").eq(1).addClass('add').removeClass('reduce');
                        } else if (jsonData[key].indexOf('-') != -1) {
                            num = true;
                            $('#lastYearNon').find("div").eq(1).addClass('reduce').removeClass('add');
                        } else {
                            $('#lastYearNon').find("div").eq(1).removeClass('reduce add');
                        }
                        $('#lastYearNon').find("div").eq(1).html(jsonData[key] != '' || jsonData[key] != undefined ? `${num ? jsonData[key].slice(0, 1) : ''}${num ? jsonData[key].slice(1) : jsonData[key]} 亿元` : '0');
                    }
                    if (key == 'non_risk_financial_amount') {//担险理财规模金额
                        $('#riskFinancial').html(jsonData[key] != '' || jsonData[key] != undefined ? milliFormat(jsonData[key]) : '0');
                    }
                    if (key == 'risk_financial_week') {//担险理财规模----上周
                        var num = false;
                        if (jsonData[key].indexOf('+') != -1) {
                            num = true;
                            $('#lastWeek').find("div").eq(1).addClass('add').removeClass('reduce');
                        } else if (jsonData[key].indexOf('-') != -1) {
                            num = true;
                            $('#lastWeek').find("div").eq(1).addClass('reduce').removeClass('add');
                        } else {
                            $('#lastWeek').find("div").eq(1).removeClass('reduce add');
                        }
                        $('#lastWeek').find("div").eq(1).html(jsonData[key] != '' || jsonData[key] != undefined ? `${num ? jsonData[key].slice(0, 1) : ''}${num ? jsonData[key].slice(1) : jsonData[key]} 亿元` : '0');
                    }
                    if (key == 'risk_financial_month') {//担险理财规模----月初
                        var num = false;
                        if (jsonData[key].indexOf('+') != -1) {
                            num = true;
                            $('#lastMonth').find("div").eq(1).addClass('add').removeClass('reduce');
                        } else if (jsonData[key].indexOf('-') != -1) {
                            num = true;
                            $('#lastMonth').find("div").eq(1).addClass('reduce').removeClass('add');
                        } else {
                            $('#lastMonth').find("div").eq(1).removeClass('reduce add');
                        }
                        $('#lastMonth').find("div").eq(1).html(jsonData[key] != '' || jsonData[key] != undefined ? `${num ? jsonData[key].slice(0, 1) : ''}${num ? jsonData[key].slice(1) : jsonData[key]} 亿元` : '0');
                    }
                    if (key == 'risk_financial_year') {//担险理财规模----年初
                        var num = false;
                        if (jsonData[key].indexOf('+') != -1) {
                            num = true;
                            $('#lastYear').find("div").eq(1).addClass('add').removeClass('reduce');
                        } else if (jsonData[key].indexOf('-') != -1) {
                            num = true;
                            $('#lastYear').find("div").eq(1).addClass('reduce').removeClass('add');
                        } else {
                            $('#lastYear').find("div").eq(1).removeClass('reduce add');
                        }
                        $('#lastYear').find("div").eq(1).html(jsonData[key] != '' || jsonData[key] != undefined ? `${num ? jsonData[key].slice(0, 1) : ''}${num ? jsonData[key].slice(1) : jsonData[key]} 亿元` : '0');
                    }
                }
            }
            if (topic == topicSurvivalScaleTrend) {
                var lineData = eval('(' + payload + ')');
                trendData = dealLineFn(lineData);
                 // 查看数据
                console.log('-----  非担险理财规模 -----',trendData)
                
                var riskNum = $('#risk .btn').index($('#risk .selected'));
                var nonRiskNum = $('#nonRisk .btn').index($('#nonRisk .selected'));
                switchLineCharts('risk', riskNum);
                switchLineCharts('nonRisk', nonRiskNum);
            }
            if (topic == topicSurvivalScaleEachChannelRisk) {
                var jsonData1 = eval('(' + payload + ')');
                var scaleData1 = dealScaleFn(jsonData1);
                var content = '';
                for(var item of scaleData1){
                    content += ` <li>
                                <div class="various_channels_title">${item.name}</div>
                                <div class="various_channels_charts">
                                    <div class="outer">
                                        <div class="inner" style="width:${item.percent}"></div>
                                    </div>
                                </div>
                                <div class="various_channels_num">${item.value}</div>
                                <div class="${item.weekClassName}">${item.comparison_week}</div>
                                <div class="${item.monthClassName}">${item.comparison_month}</div>
                                <div class="${item.yearClassName}">${item.comparison_year}</div>
                            </li>`
                }
                $('#channel_ul_risk').html(content);
            }
            if (topic == topicSurvivalScaleEachChannelNonRisk) {
                var jsonData2 = eval('(' + payload + ')');
                var scaleData2 = dealScaleFn(jsonData2);
                var content1 = '';
                for(var item of scaleData2){
                    content1 += ` <li>
                                <div class="various_channels_title">${item.name}</div>
                                <div class="various_channels_charts">
                                    <div class="outer">
                                        <div class="inner" style="width:${item.percent}"></div>
                                    </div>
                                </div>
                                <div class="various_channels_num">${item.value}</div>
                                <div class="${item.weekClassName}">${item.comparison_week}</div>
                                <div class="${item.monthClassName}">${item.comparison_month}</div>
                                <div class="${item.yearClassName}">${item.comparison_year}</div>
                            </li>`
                }
                $('#channel_ul_nonRisk').html(content1);
            }
        }
    }
}

function dealScaleFn(arr){
    var maxVal = Math.max.apply(Math, arr.map(function(o) {return o.value}));
    //查看数据
    console.log('----- maxVal ----',maxVal);
    for(var item of arr){
        item.percent = toPerceent(item.value / maxVal);
        item.weekClassName = toClassName(item.comparison_week);
        item.monthClassName = toClassName(item.comparison_month);
        item.yearClassName = toClassName(item.comparison_year);
    }
    console.log(arr);
    return arr;
}
function toClassName(value){
    var className = 'various_channels_comparison';
    if(value.indexOf('+') != '-1'){
        className = 'various_channels_comparison comparisonAdd'
    }else if(value.indexOf('-') != '-1'){
        className = 'various_channels_comparison comparisonReduce'
    }else{
        className = 'various_channels_comparison'
    }
    return className;
}
function toPerceent(point){
    var percent = Number(point * 100).toFixed(2);
    percent += "%";
    return percent;
}

function dealLineFn(json) {
    var res = {};
    for (var key in json) {
        var dateData = [], valData = [];
        for (var item of json[key]) {
            dateData.push(item.date);
            valData.push(item.value);
        }
        res[key + '_xAxis'] = dateData;
        res[key + '_series'] = valData;
    }
    return res;
}

function empty(obj) {
    //检验数组
    if (Array.prototype.isPrototypeOf(obj) && obj.length !== 0) {
        return true;
    }
    //检验对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length !== 0) {
        return true;
    }
}

function autoRefresh() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (h == 23 && m == 59 && (s > 55 && s < 59)) {
        location.reload();
    }
}

function setDateTime() {
    document.querySelector("#dateYear").innerHTML = moment().format("YYYY年MM月DD日");
    document.querySelector("#dateTime").innerHTML = moment().format("HH:mm:ss");
}

function connectMq() {
    mosq.connect(url);//连接
    /*连接主题*/
    topicData.forEach(function (element) {
        mosq.subscribe(element.topic, 0)
    });
}