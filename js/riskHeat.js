var bs = false;
var mosq = new Mosquitto();
var url = 'ws://' + host + ':' + port + '/mqtt';

/************************    设定主题     ****************************/
var topicOutsideClaims = 'C/EBD/RISKHEAT/KPI/ALL/ZX';

var topicGradedRisks = 'C/EBD/RISKHEAT/GRADED_RISK/ALL/ZX';

var topicMapTops = 'C/EBD/RISKHEAT/MAP_RISK/ALL/ZX';

/************************    模拟假数据    ****************************/
var topicData = [
    {   /*  境外（五洲）债权 -KPI  */
        topic: 'C/EBD/RISKHEAT/KPI/ALL/ZX',
        data: {
            'overseas_bank_total': 2645,
            'overseas_parallel_total': 2833,
            'obligationAsia': 682,
            'obligationEurope': 459,
            'obligationAfrica': 352,
            'obligationAmerica': 895,
            'obligationOceania': 257
        }
    }, {    /*  风险等级指标  */
        topic: 'C/EBD/RISKHEAT/GRADED_RISK/ALL/ZX',
        data: {
            'leaveLower': 1047,
            'leaveDown': 729,
            'leaveMedium': 574,
            'leaveHigher': 268,
            'leaveHight': 36
        }
    }, {    /*  境外债权top排行  */
        topic: 'C/EBD/RISKHEAT/TOP12/ALL/ZX',
        data: [
            { name: '阿根廷', value: [-63.61667199999999, -38.416097], num: 10, money: 172, grade: 'medium' },
            { name: '澳大利亚', value: [133.775136, -25.274398], num: 11, money: 133, grade: 'lower' },
            { name: '巴西', value: [-51.92528, -14.235004], num: 9, money: 167, grade: 'down' },
            { name: '加拿大', value: [-106.346771, 56.130366], num: 12, money: 128, grade: 'lower' },
            { name: '肯尼亚', value: [37.906193, -0.023559], num: 6, money: 199, grade: 'medium' },
            { name: '法国', value: [2.213749, 46.227638], num: 5, money: 203, grade: 'lower' },
            { name: '日本', value: [138.252924, 36.204824], num: 2, money: 221, grade: 'lower' },
            { name: '尼日利亚', value: [8.675277, 9.081999], num: 8, money: 143, grade: 'higher' },
            { name: '美国', value: [-95.712891, 37.09024], num: 1, money: 425, grade: 'down' },
            { name: '缅甸', value: [95.956223, 21.913965], num: 7, money: 145, grade: 'medium' },
            { name: '巴基斯坦', value: [69.34511599999999, 30.375321], num: 3, money: 215, grade: 'down' },
            { name: '俄罗斯', value: [27.953389, 53.709807], num: 4, money: 198, grade: 'lower' }
        ]
    }
];

/*************************** 渲染【境外债权TOP12】地图  *********************/
var worldMapChart = echarts.init(document.getElementById("worldMap"));
var getOptionMap_data = mapCharts();
worldMapChart.setOption(getOptionMap_data,true);

/*************************** 判断接口的连接通道  *********************/
if (bs) {
    //正式接口
    connectMq(mosq, url);
    //回调函数
    mosq.onmessage = function (topic, payload, qos) {
        try {
            toMessage(topic, url);
        } catch (err) {

        } finally {

        }
    };
    mosq.ondisconnect = function () {
        setTimeout(connectMq, 30000);
    };
    mosq.onconnect = function () {
        console.log('连接成功！');
    }
} else {
    // 模拟假数据
    topicData.forEach(function (element) {
        toMassage(element.topic, JSON.stringify(element.data));
    });
}

(function () {
    /*时间戳*/
    setDateTime();
    /*当前时间*/
    setInterval(setDateTime, 1000);
    /*整点定时自动刷新*/
    setInterval(autoRefresh, 5000);

})();

/*************************    日期时间   ****************************/
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
    document.querySelector("#dateYear").innerHTML = moment().format("YYYY/MM/DD");
    document.querySelector("#dateTime").innerHTML = moment().format("HH:mm A");
}

/*************************    数据获取   ****************************/
function toMassage(topic, data) {
    if (data != undefined) {
        if (empty(JSON.parse(data))) {
            /*  境外债权 -KPI  */
            if (topic == topicOutsideClaims) {
                var data = JSON.parse(data);
                for (key in data) {
                    if (key == 'overseas_bank_total') {
                        data[key]?delayedReFresh(data[key],{id:"totalBank",time:24000,num:5}) : 0
                        // $("#totalBank").html(data[key] != '' || data[key] != undefined ? milliFormat(data[key]) : 0);
                    }
                    if (key == 'overseas_parallel_total') {
                         data[key]?delayedReFresh(data[key],{id:"totalTable",time:24000,num:5}) : 0
                        // $("#totalTable").html(data[key] != '' || data[key] != undefined ? milliFormat(data[key]) : 0);
                    }
                    if (key == 'obligationAsia') {
                        $("#Asia").html(data[key] != '' || data[key] != undefined ? milliFormat(data[key]) : 0);
                    }
                    if (key == 'obligationEurope') {
                        $("#Europe").html(data[key] != '' || data[key] != undefined ? milliFormat(data[key]) : 0);
                    }
                    if (key == 'obligationAfrica') {
                        $("#Africa").html(data[key] != '' || data[key] != undefined ? milliFormat(data[key]) : 0);
                    }
                    if (key == 'obligationAmerica') {
                        $("#America").html(data[key] != '' || data[key] != undefined ? milliFormat(data[key]) : 0);
                    }
                    if (key == 'obligationOceania') {
                        $("#Oceania").html(data[key] != '' || data[key] != undefined ? milliFormat(data[key]) : 0);
                    }
                }
            }
            /*  风险等级指标  */
            if (topic == topicGradedRisks) {
                var data = JSON.parse(data);
                for (key in data) {
                    if (key == 'leaveLower') {
                        $("#leaveLower").html(data[key] != '' || data[key] != undefined ? data[key] : 0);
                    }
                    if (key == 'leaveDown') {
                        $("#leaveDown").html(data[key] != '' || data[key] != undefined ? data[key] : 0);
                    }
                    if (key == 'leaveMedium') {
                        $("#leaveMedium").html(data[key] != '' || data[key] != undefined ? data[key] : 0);
                    }
                    if (key == 'leaveHigher') {
                        $("#leaveHigher").html(data[key] != '' || data[key] != undefined ? data[key] : 0);
                    }
                    if (key == 'leaveHight') {
                        $("#leaveHight").html(data[key] != '' || data[key] != undefined ? data[key] : 0);
                    }
                }
            }
            /*  境外债权排行 TOP12  */
            if (topic == topicMapTops) {
                var data = JSON.parse(data);
                // console.log(data);
                mapCharts.series[0].data = data;
                worldMapChart.setOption(getOptionMap_data,true);
            }
        }
    }
}

/*************************    世界地图配置函数   ****************************/
function mapCharts(){
    return  option = {
        // backgroundColor: '#152c55',
        geo: {
            /*  地图的类型  */
            map: 'world',
            /*  是否不响应和触发鼠标事件  */
            silent: true,
            /*  是否开启鼠标缩放和平移漫游  */
            roam: true,
            /* 设置地图的缩放比例  */
            zoom: 1.3,
        },
        series: [
            {
                /*实心圆点，无波纹*/
                // type: 'scatter',
                /*  有波纹  */
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbolSize: 10,
                data: [0],
                activeOpacity: 1,
                label: {
                    normal: {
                        show: true,
                        formatter: function (params) {
                            var name = params.data.name,
                                money = params.data.money,
                                num = params.data.num,
                                moneyTitle = '亿元';
                            return  '{c|'+name+'}' + '\n' +'{num|'+num+'}'+ '{a|' + money + '}' + '{b|' + moneyTitle + '}'
                        },
                        position: 'right',
                        // borderWidth: 1,
                        borderRadius: 4,
                        borderColor: '#aaa',
                        lineHeight: 24,
                        padding: [2, 5],
                        /* 地区的主体颜色  */
                        color: '#f8f9fe',
                        /* 文字距离圆点的距离 */
                        distance: 15,
                        /* 背景图片 */
                        backgroundColor:{
                            image:'./image/mapBanner.png'
                        },
                        rich: {
                            a: {
                                color: '#f9f241',
                                fontSize: 18,
                                fontWeight: 'bolder',
                                padding:[0,0,0,18]
                            },
                            b: {
                                color: '#f9f241',
                                padding: [0, 0,0,5],
                                // fontWeight:'bold',
                                // fontSize:11
                            },
                            c:{
                                fontSize:16,
                                color:'#fff',
                                padding:[0,0,0,40]
                            },
                            num:{
                                fontSize:18,
                                fontWeight: 'bolder',
                                color:'#89c6ff',
                                padding:[22,0,0,7]
                            }
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                showEffectOn: 'render',
                rippleEffect: {
                    borderWidth: 8,
                    borderColor: 'rgba(120,140,180,.8)',
                    color: 'rgba(120,140,180,.3)',
                    brushType: 'stroke',
                },
                zlevel: 1,
                /* 设置圆点的大小 */
                symbolSize: 15,
                /* 设置坐标圆点 */
                itemStyle: {
                    normal: {
                        // borderColor: '#fecc2f',
                        color: '#fecc2f',
                    }
                }
            }
        ]
    };
}

/*************************    检验值是否为空   ****************************/
function empty(obj) {
    //检验对象
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length !== 0) {
        return true;
    }
    // 检验数组
    if (Array.prototype.isPrototypeOf(obj) && Object.length !== 0) {
        return true;
    }
}

/*************************    建立MQ连接   ****************************/
function connectMq() {
    mosq.connect(url);//连接
    /*连接主题*/
    topicData.forEach(function (element) {
        mosq.subscribe(element.topic, 0)
    });
}





