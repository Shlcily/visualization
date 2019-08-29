var bs = false; //控制页面走的假数据还是mqtt，false是假数据，true是mqtt
var mosq = new Mosquitto()
var url = "wx://" + ":" + port + "/mqtt";

// 银监口径贷款
var topicyinjiankpi = 'C/IFD/CBRC/LOAN_SITUATION/ALL/ZX';
// 银监、人行贷款余额对比
var balancekpi = 'C/IFD/CBRC_PBC/BALANCE_COMPARISON/ALL/ZX';
// 银监、人行户口数对比
var residencekpi = 'C/IFD/CBRC_PBC/HOUSEHOLDS_COMPARISON/ALL/ZX';
// 人行口径贷款
var topicrenhangkpi = 'C/IFD/PBC/LOAN_SITUATION/ALL/ZX';
// 全行余额排行榜
var allhangkpi = 'C/IFD/BALANCE_RANKING/LOAN_SITUATION/ALL/ZX';
// 分组余额排行榜
var fenzuhangkpi = 'C/IFD/BALANCE_RANKING/LOAN_SITUATION/BRANCH/ZX';

// 假数据
var topicData = [
    {
        //银监口径贷款余额和户数
        topic: 'C/IFD/CBRC/LOAN_SITUATION/ALL/ZX',
        data: [
            { time: '05/01', yue: 240, house: 234 },
            { time: '05/02', yue: 346, house: 124 },
            { time: '05/03', yue: 342, house: 234 },
            { time: '05/04', yue: 123, house: 412 },
            { time: '05/05', yue: 234, house: 122 },
            { time: '05/06', yue: 432, house: 325 },
            { time: '05/07', yue: 142, house: 148 },
            { time: '05/08', yue: 124, house: 118 },
            { time: '05/09', yue: 432, house: 421 },
            { time: '05/10', yue: 143, house: 133 },
            { time: '05/11', yue: 124, house: 132 },
            { time: '05/12', yue: 143, house: 489 },
            { time: '05/13', yue: 500, house: 287 },
            { time: '05/14', yue: 342, house: 278 },
            { time: '05/15', yue: 244, house: 367 },
            { time: '05/16', yue: 240, house: 289 },
            { time: '05/17', yue: 240, house: 500 },
            { time: '05/18', yue: 500, house: 189 },
            { time: '05/19', yue: 143, house: 378 },
            { time: '05/20', yue: 245, house: 289 },
            { time: '05/21', yue: 245, house: 467 },
            { time: '05/22', yue: 324, house: 356 },
            { time: '05/23', yue: 459, house: 279 },
            { time: '05/24', yue: 389, house: 198 },
            { time: '05/25', yue: 278, house: 238 },
            { time: '05/26', yue: 467, house: 372 },
            { time: '05/27', yue: 198, house: 187 },
            { time: '05/28', yue: 376, house: 389 },
            { time: '05/29', yue: 500, house: 477 },
            { time: '05/30', yue: 289, house: 265 },
            { time: '05/31', yue: 199, house: 365 }
        ]
    },
    {
        // 银监、人行贷款余额对比
        topic: 'C/IFD/CBRC_PBC/BALANCE_COMPARISON/ALL/ZX',
        data: [
            { id: '0', yue: '2145325', year: '-4231', month: '3324' },
            { id: '1', yue: '34324', year: '-2364', month: '324532' }
        ]
    },
    {
        // 银监、人行户口数对比
        topic: 'C/IFD/CBRC_PBC/HOUSEHOLDS_COMPARISON/ALL/ZX',
        data: [
            { id: '0', house: '234532', year: '-3463', month: '32325' },
            { id: '1', house: '43645', year: '-46463', month: '647643' }
        ]
    },
    {
        // 人行口径贷款余额和户数
        topic: 'C/IFD/PBC/LOAN_SITUATION/ALL/ZX',
        data: [
            { time: '05/01', yue: 240, house: 234 },
            { time: '05/02', yue: 346, house: 124 },
            { time: '05/03', yue: 342, house: 234 },
            { time: '05/04', yue: 123, house: 412 },
            { time: '05/05', yue: 234, house: 122 },
            { time: '05/06', yue: 432, house: 325 },
            { time: '05/07', yue: 142, house: 148 },
            { time: '05/08', yue: 124, house: 118 },
            { time: '05/09', yue: 432, house: 421 },
            { time: '05/10', yue: 143, house: 133 },
            { time: '05/11', yue: 124, house: 132 },
            { time: '05/12', yue: 143, house: 489 },
            { time: '05/13', yue: 500, house: 287 },
            { time: '05/14', yue: 342, house: 278 },
            { time: '05/15', yue: 244, house: 367 },
            { time: '05/16', yue: 240, house: 289 },
            { time: '05/17', yue: 240, house: 500 },
            { time: '05/18', yue: 500, house: 189 },
            { time: '05/19', yue: 143, house: 378 },
            { time: '05/20', yue: 245, house: 289 },
            { time: '05/21', yue: 245, house: 467 },
            { time: '05/22', yue: 324, house: 356 },
            { time: '05/23', yue: 459, house: 279 },
            { time: '05/24', yue: 389, house: 198 },
            { time: '05/25', yue: 278, house: 238 },
            { time: '05/26', yue: 467, house: 372 },
            { time: '05/27', yue: 198, house: 187 },
            { time: '05/28', yue: 376, house: 389 },
            { time: '05/29', yue: 500, house: 477 },
            { time: '05/30', yue: 289, house: 265 },
            { time: '05/31', yue: 199, house: 365 }
        ]
    },
    {
        // 全行余额增量排行榜
        topic: 'C/IFD/BALANCE_RANKING/LOAN_SITUATION/ALL/ZX',
        data: [
            { city: '北京分行', number: '38273974' },
            { city: '上海分行', number: '23383179' },
            { city: '广州分行', number: '73475235' },
            { city: '郑州分行', number: '26857654' },
            { city: '南京分行', number: '345457234' },
            { city: '长沙分行', number: '235456' },
            { city: '福州分行', number: '9877876' },
            { city: '合肥分行', number: '5469345' },
            { city: '苏州分行', number: '54642865' },
            { city: '成都分行', number: '987345' },
            { city: '济南分行', number: '-987643' },
            { city: '济南分行', number: '-987643' },
            { city: '济南分行', number: '-9876493' },
            { city: '济南分行', number: '-9807643' },
            { city: '济南分行', number: '-98721643' },
            { city: '济南分行', number: '-987643' },
            { city: '济南分行', number: '-9876431' },
            { city: '济南分行', number: '-10987643' },
            { city: '济南分行', number: '-987643' },
            { city: '济南分行', number: '-987643' },
            { city: '济南分行', number: '-9871643' },
            { city: '济南分行', number: '12987643' },
            { city: '济南分行', number: '8987643' },
            { city: '济南分行', number: '-987643' },
            { city: '济南分行', number: '95287643' },
            { city: '西安分行', number: '-9834567' },
            { city: '厦门分行', number: '-876543' },
            { city: '深圳分行', number: '-76545332' },
            { city: '青岛分行', number: '-8764532' },
            { city: '重庆分行', number: '-76654322' },
            { city: '武汉分行', number: '57652142' },
            { city: '天津分行', number: '-3357457' },
            { city: '什么分行', number: '2355437' },
            { city: '乌鲁木齐分行', number: '-13468856' }
        ]
    },
    {
        // 分行余额增量排行榜
        topic: 'C/IFD/BALANCE_RANKING/LOAN_SITUATION/BRANCH/ZX',
        data: [
            { id: '0', city: '北京分行', number: '2145653' },
            { id: '0', city: '上海分行', number: '46757445' },
            { id: '0', city: '广州分行', number: '325368' },
            { id: '0', city: '深圳分行', number: '3475656' },
            { id: '0', city: '南京分行', number: '127876' },
            { id: '0', city: '杭州分行', number: '32564757' },
            { id: '1', city: '长沙分行', number: '56313532' },
            { id: '1', city: '郑州分行', number: '-45743532' },
            { id: '1', city: '郑州分行', number: '145743532' },
            { id: '1', city: '郑州分行', number: '51451532' },
            { id: '1', city: '郑州分行', number: '45743532' },
            { id: '1', city: '郑州分行', number: '-459532' },
            { id: '1', city: '郑州分行', number: '574332' },
            { id: '1', city: '郑州分行', number: '4574532' },
            { id: '1', city: '乌鲁木齐分行', number: '543532' },
            { id: '1', city: '郑州分行', number: '5743532' },
            { id: '1', city: '郑州分行', number: '455532' },
            { id: '1', city: '郑州分行', number: '457432' },
            { id: '1', city: '郑州分行', number: '365532' },
            { id: '1', city: '郑州分行', number: '-453532' },
            { id: '1', city: '郑州分行', number: '-4551312' },
            { id: '1', city: '郑州分行', number: '-403532' },
            { id: '1', city: '郑州分行', number: '51743532' },
            { id: '1', city: '合肥分行', number: '552532' },
            { id: '1', city: '福州分行', number: '-553532' },
            { id: '1', city: '苏州分行', number: '513532' },
            { id: '1', city: '成都分行', number: '-511532' },
            { id: '1', city: '石家庄分行', number: '513532' },
            { id: '1', city: '济南分行', number: '513332' },
            { id: '1', city: '西安分行', number: '-5137432' },
            { id: '1', city: '厦门分行', number: '754532' },
            { id: '1', city: '天津分行', number: '-515532' },
            { id: '1', city: '武汉分行', number: '5133532' },
            { id: '1', city: '重庆分行', number: '-541532' },
            { id: '1', city: '青岛分行', number: '513032' },
        ]
    }
]

// 银监口径
var left_top_chart = echarts.init(document.querySelector('.left_top'));
var left_top_chartdt = zxoption();
left_top_chart.setOption(left_top_chartdt, true);
// 人行口径
var left_bottom_chart = echarts.init(document.querySelector('.left_bottom'));
var left_bottom_chartdt = zxoption();
left_bottom_chart.setOption(left_bottom_chartdt);

// 折线图 
function zxoption() {
    var option = {
        color: ['#0af6fd', '#ca02eb'],
        /*  图表的图例配置  */
        legend: {
            show: true,
            right: 140,
            top: 25,
            textStyle: {
                color: '#fff'
            },
            data: ['余额', '户口']
        },
        /* 鼠标划上提示信息 */
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        /* 图表距画布的距离 */
        grid: {
            left: '2%',
            right: '3%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: [],
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '128dff',
                    width: 1
                }
            },
            axisLabel: {
                color: '#c3d9e9',
                interval: 0,
                rotate: 60 //X轴斜体
            },
            // splitarea:{
            //     interval:1
            // }
        }],
        yAxis: [
            {
                type: 'value',
                min: 0,
                max: 500,
                interval: 50,
                name: '余额（亿元）',
                nameLoation: 'end',
                /* 坐标轴名称的文字样式. */
                nameTextStyle: {
                    color: '#fff',
                },
                posiiton: 'left',
                axisLine: {
                    lineStyle: {
                        color: '#128dff',
                        width: 1
                    }
                },
                axisTick: {
                    show: false
                },
                // 分割线
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    color: '#c3d9e9'
                },
            },
            {
                type: 'value',
                name: '户口',
                min: 0,
                max: 500,
                interval: 50,
                nameLoation: 'end',
                /* 坐标轴名称的文字样式. */
                nameTextStyle: {
                    color: '#fff',
                },
                posiiton: 'right',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#c3d9e9'
                },
                axisLine: {
                    lineStyle: {
                        color: '#128dff',
                        width: 1
                    }
                },
                splitLine: {
                    show: false,
                },
            }
        ],
        series: [
            {
                name: '余额',
                type: 'line',
                /* 是否平滑曲线显示 */
                smooth: true,
                /* 是否标记的图形显示 */
                symbol: 'line',
                data: [],
                /* 图表的线条颜色 */
                itemStyle: {
                    color: '#0af6fd',
                    normal: {
                        lineStyle: {
                            color: '#0af6fd',
                            width: 1
                        },
                        /* 区域填充样式. */
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#0af6fd'
                                },
                                {
                                    offset: 1,
                                    color: '#3fbbff0d'
                                }
                            ]),
                            // type: 'default'
                        }
                    }
                }
            },
            {
                name: '户口',
                type: 'line',
                data: [],
                yAxisIndex: 1,
                smooth: true,
                symbol: 'line',
                itemStyle: {
                    color: '#ca02eb',
                    normal: {
                        lineStyle: {
                            color: '#ca02eb',
                            width: 1
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#ca02eb'
                                },
                                {
                                    offset: 1,
                                    color: '#3fbbff0d'
                                }
                            ]),
                            type: 'default'
                        }
                    }
                }
            }
        ]
    }
    return option
}

(function () {
    // 时间戳  
    setDateTime();
    setInterval(setDateTime, 1000);
    // 定时自动刷新
    setInterval(autoRefresh, 5000)
})();

// 判断当前数据是真假数据
if (bs) {
    connectMq(mosq, url);
    mosq.onmessage = function (topic, payload, qos) {
        try {
            toMassage(topic, payload);
        } catch (err) {
            //alert(err)
        } finally {
            //alert('mq返回值：格式错误');
        }
    };
    mosq.ondisconnect = function (rc) {
        setTimeout(connectMq, 30000);//失去连接后，30秒自动重连
    };
    mosq.onconnect = function (rc) {
        console.log("连接mq成功");
    };
} else {
    // 假数据
    topicData.forEach(function (element) {
        toMassage(element.topic, JSON.stringify(element.data));
    })
}



// 数据获取处理函数
function toMassage(topic, payload) {
    if (payload != undefined) {
        if (check(eval('(' + payload + ')'))) {
            // 银监口径贷款余额
            if (topic == topicyinjiankpi) {
                var yinjiandata = eval('(' + payload + ')');
                // var yinjiandata = JSON.parse(payload);
                var yinjianchart_dt = dealFnData(yinjiandata);
                console.log(yinjiandata);
                left_top_chartdt.xAxis[0].data = yinjianchart_dt[0];
                left_top_chartdt.series[0].data = yinjianchart_dt[1];
                left_top_chartdt.series[1].data = yinjianchart_dt[2];
                left_top_chart.setOption(left_top_chartdt, true)
            }
            // 银监、人行贷款余额对比
            if (topic == balancekpi) {
                var data = JSON.parse(payload);
                console.log(data);
                var cb_balance_number = document.querySelector('.cb_balance_number');
                var t_yeara = document.querySelector('.t_yeara');
                var t_montha = document.querySelector('.t_montha');
                var people_balance_number = document.querySelector('.people_balance_number');
                var b_yeara = document.querySelector('.b_yeara');
                var b_montha = document.querySelector('.b_montha');
                if (data[0].id == 0) {
                    cb_balance_number.innerText = milliFormat(data[0].yue);
                    if (data[0].year > 0) {
                        t_yeara.style.color = '#1fd77a';
                        t_yeara.style.border = '1px solid #1fd77a';
                        t_montha.style.color = '#1fd77a';
                        t_montha.style.border = '1px solid #1fd77a';
                    } else if (data[0].year < 0) {
                        t_yeara.style.color = '#d8204d';
                        t_yeara.style.border = '1px solid #d8204d';
                        t_montha.style.color = '#d8204d';
                        t_montha.style.border = '1px solid #d8204d';
                    }
                    if (data[0].month > 0) {
                        t_montha.style.color = '#1fd77a';
                        t_montha.style.border = '1px solid #1fd77a';
                    } else if (data[0].month < 0) {
                        t_montha.style.color = '#d8204d';
                        t_montha.style.border = '1px solid #d8204d';
                    }
                    t_yeara.innerText = milliFormat(data[0].year);
                    t_montha.innerText = milliFormat(data[0].month);
                }
                if (data[1].id == 1) {
                    people_balance_number.innerText = milliFormat(data[1].yue);
                    if (data[1].year > 0) {
                        b_yeara.style.color = '#1fd77a';
                        b_yeara.style.border = '1px solid #1fd77a';
                    } else if (data[1].year < 0) {
                        b_yeara.style.color = '#d8204d';
                        b_yeara.style.border = '1px solid #d8204d';
                    }
                    if (data[1].month > 0) {
                        b_montha.style.color = '#1fd77a';
                        b_montha.style.border = '1px solid #1fd77a';
                    } else if (data[1].month < 0) {
                        b_montha.style.color = '#d8204d';
                        b_montha.style.border = '1px solid #d8204d';
                    }
                    b_yeara.innerText = milliFormat(data[1].year);
                    b_montha.innerText = milliFormat(data[1].month);
                }

            }
            // 银监、人行户口数对比
            if (topic == residencekpi) {
                var data = JSON.parse(payload);
                console.log(data);
                var cb_residence_number = document.querySelector('.cb_residence_number');
                var t_yearb = document.querySelector('.t_yearb');
                var t_monthb = document.querySelector('.t_monthb');
                var people_residence_number = document.querySelector('.people_residence_number');
                var b_yearb = document.querySelector('.b_yearb');
                var b_monthb = document.querySelector('.b_monthb');
                if (data[0].id == 0) {
                    cb_residence_number.innerText = milliFormat(data[0].house);
                    if (data[0].year > 0) {
                        t_yearb.style.color = '#1fd77a';
                        t_yearb.style.border = '1px solid #1fd77a';
                    } else if (data[0].year < 0) {
                        t_yearb.style.color = '#d8204d';
                        t_yearb.style.border = '1px solid #d8204d';
                    }
                    if (data[0].month > 0) {
                        t_monthb.style.color = '#1fd77a';
                        t_monthb.style.border = '1px solid #1fd77a';
                    } else if (data[0].month < 0) {
                        t_monthb.style.color = '#d8204d';
                        t_monthb.style.border = '1px solid #d8204d';
                    }
                    t_yearb.innerText = milliFormat(data[0].month);
                    t_monthb.innerText = milliFormat(data[0].month);
                }
                if (data[1].id == 1) {
                    people_residence_number.innerText = milliFormat(data[1].house);
                    if (data[1].year > 0) {
                        b_yearb.style.color = '#1fd77a';
                        b_yearb.style.border = '1px solid #1fd77a';
                    } else if (data[1].year < 0) {
                        b_yearb.style.color = '#d8204d';
                        b_yearb.style.border = '1px solid #d8204d';
                    }
                    if (data[1].month > 0) {
                        b_monthb.style.color = '#1fd77a';
                        b_monthb.style.border = '1px solid #1fd77a';
                    } else if (data[1].month < 0) {
                        b_monthb.style.color = '#d8204d';
                        b_monthb.style.border = '1px solid #d8204d';
                    }
                    b_yearb.innerText = milliFormat(data[1].month);
                    b_monthb.innerText = milliFormat(data[1].month);
                }
            }
            // 人行口径贷款余额
            if (topic == topicrenhangkpi) {
                var renhangdata = eval('(' + payload + ')');
                // var data = JSON.parse(payload);
                // console.log(renhangdata);
                console.log(renhangdata);
                left_bottom_chartdt.xAxis[0].data = linedata(renhangdata).time;
                left_bottom_chartdt.series[0].data = linedata(renhangdata).yue;
                left_bottom_chartdt.series[1].data = linedata(renhangdata).house;
                left_bottom_chart.setOption(left_bottom_chartdt, true)
            }
            // 全行余额增量排行榜
            if (topic == allhangkpi) {
                var data = JSON.parse(payload);
                console.log(data);
                var add = document.querySelector('.add')
                var minus = document.querySelector('.minus')
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i].number)
                    if (i < 3) {
                        var addicon = document.createElement('span');
                        addicon.className = 'addicon clearfix';
                        if (data[i].number > 0) {
                            var adddiv = document.createElement('div');
                            var addnumber = document.createElement('span');
                            var addtitle = document.createElement('span');
                            adddiv.className = 'adddiv'
                            addnumber.className = 'addnumber clearfix';
                            addtitle.className = 'addtitle clearfix';
                            addtitle.innerText = data[i].city;
                            addnumber.innerText = milliFormat(data[i].number);
                            adddiv.append(addicon);
                            adddiv.append(addnumber);
                            adddiv.append(addtitle);
                            add.append(adddiv);
                        }
                    } else if (i >= 3) {
                        if (data[i].number > 0) {
                            var adddiv = document.createElement('div');
                            var addnumber = document.createElement('span');
                            var addtitle = document.createElement('span');
                            adddiv.className = 'adddiv'
                            addnumber.className = 'addnumber clearfix';
                            addtitle.className = 'addtitle clearfix';
                            addtitle.innerText = data[i].city;
                            addnumber.innerText = milliFormat(data[i].number);
                            adddiv.append(addnumber);
                            adddiv.append(addtitle);
                            add.append(adddiv);
                        }
                        if (data[i].number < 0) {
                            var minusdiv = document.createElement('div');
                            var minuscity = document.createElement('span');
                            var minusnumber = document.createElement('span');
                            minusdiv.className = 'minusdiv'
                            minuscity.className = 'minuscity';
                            minusnumber.className = 'minusnumber';
                            minuscity.innerText = data[i].city;
                            minusnumber.innerText = milliFormat(data[i].number);
                            minusdiv.append(minuscity)
                            minusdiv.append(minusnumber);
                            minus.append(minusdiv);
                        }
                    }
                }
            }
            // 分行余额增量排行榜
            if (topic == fenzuhangkpi) {
                var data = JSON.parse(payload);
                console.log(data);
                var point = document.querySelector('.point');
                var pivot = document.querySelector('.pivot');
                for (i = 0; i < data.length; i++) {
                    if (i < 3) {
                        var pointicon = document.createElement('span');
                        pointicon.className = 'pointicon';
                        if (data[i].id == 0) {
                            var pointdiv = document.createElement('div');
                            var pointcity = document.createElement('span');
                            var pointnumber = document.createElement('span');
                            pointcity.className = 'pointcity';
                            pointnumber.className = 'pointnumber';
                            pointdiv.className = 'pointdiv';
                            pointcity.innerText = data[i].city;
                            pointnumber.innerText = milliFormat(data[i].number);
                            pointdiv.append(pointcity);
                            pointdiv.append(pointnumber);
                            pointdiv.append(pointicon);
                            point.append(pointdiv);
                        } else if (data[i].id == 1) {
                            var pivotdiv = document.createElement('div');
                            var pivotcity = document.createElement('span');
                            var pivotnumber = document.createElement('span');
                            pivotcity.className = 'pivotcity';
                            pivotnumber.className = 'pivotnumber';
                            pivotdiv.className = 'pivotdiv';
                            pivotcity.innerText = data[i].city;
                            pivotnumber.innerText = milliFormat(data[i].number);
                            pivotdiv.append(pivotcity);
                            pivotdiv.append(pivotnumber);
                            pivot.append(pivotdiv);
                        }
                    } else if (i >= 3) {
                        if (data[i].id == 0) {
                            var pointdiv = document.createElement('div');
                            var pointcity = document.createElement('span');
                            var pointnumber = document.createElement('span');
                            pointcity.className = 'pointcity';
                            pointnumber.className = 'pointnumber';
                            pointdiv.className = 'pointdiv';
                            pointcity.innerText = data[i].city;
                            pointnumber.innerText = milliFormat(data[i].number);
                            pointdiv.append(pointcity);
                            pointdiv.append(pointnumber);
                            point.append(pointdiv);
                        } else if (data[i].id == 1) {
                            var pivotdiv = document.createElement('div');
                            var pivotcity = document.createElement('span');
                            var pivotnumber = document.createElement('span');
                            pivotcity.className = 'pivotcity';
                            pivotnumber.className = 'pivotnumber';
                            pivotdiv.className = 'pivotdiv';
                            pivotcity.innerText = data[i].city;
                            pivotnumber.innerText = milliFormat(data[i].number);
                            pivotdiv.append(pivotcity);
                            pivotdiv.append(pivotnumber);
                            pivot.append(pivotdiv);
                        }
                    }
                }
            }
        }
    }
}

function dealFnData(arr) {
    if (arr && arr.length) {
        var time = [], yue = [], house = [];
        for (let item of arr) {
            time.push(item.time);
            yue.push(item.yue);
            house.push(item.house);
        }
        return [time, yue, house];
    } else {
        return [[], [], []];
    }
}

// 折线图数据处理函数
function linedata(arr) {
    var result = { time: [], yue: [], house: [] };
    for (var i = 0; i < arr.length; i++) {
        result.time.push(arr[i].time);
        result.yue.push(arr[i].yue);
        result.house.push(arr[i].house);
    }
    return result;
}
// 判断数据值是否为空
function check(obj) {
    // 检测数组
    if (Array.prototype.isPrototypeOf(obj) && obj.length !== 0) {
        return true;
    }
    // 检测对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length !== 0) {
        return true;
    }
}
// 当前时间戳函数
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
    document.getElementById("dateYear").innerHTML = moment().format("YYYY年MM月DD日");
    document.getElementById("dateTime").innerHTML = moment().format("HH:mm:ss");
}

// 连接主题函数
function connectMq() {
    mosq.connect(url);//连接
    // 连接主题
    topicData.forEach(function (element) {
        mosq.subscribe(element.topic, 0)
    })
}

// 轮播图效果
var timer = null;
var index = 0;
var pics = document.getElementsByClassName('banner_slide');
var lis = document.getElementsByTagName('li');

function byid(id) {
    return typeof (id) === "string" ? document.getElementById(id) : id;
}

function slideimg() {

    var main = byid("main");
    var banner = byid("banner");

    main.onmouseover = function () {
        stopautoplay()
    }

    main.onmouseout = function () {
        startautoplay()
    }

    main.onmouseout();

    for (var i = 0; i < pics.length; i++) {
        lis[i].id = i;
        lis[i].onclick = function () {
            index = this.id;
            changecolor();
        }
    }
}

// 开始轮播图
function startautoplay() {
    timer = setInterval(function () {
        index++;
        if (index > 1) {
            index = 0;
        }
        changecolor();
    }, 5000)
}

// 暂停轮播图
function stopautoplay() {
    if (timer) {
        clearInterval(timer)
    }
}

// 改变轮播图
function changecolor() {
    for (var i = 0; i < pics.length; i++) {
        pics[i].style.display = 'none';
        lis[i].className = '';
    }
    pics[index].style.display = 'block';
    lis[index].className = 'changecolor'
}
slideimg();