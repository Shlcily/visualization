var bs = false;
var mosq = new Mosquitto();
var url = 'ws://'+host+':'+port+'/mqtt';

/**
 *  制定主题
 */
var topicStandardChart = '/C/IFD/STANDARD/DELIVERY_PRODUCTS/ALL/ZX';    //标准化产品

var topicNonStandardChart = '/C/IFD/NON_STANDARD/DELIVERY_PRODUCTS/ALL/ZX';     //非标准化产品

var topicOtherChart = '/C/IFD/OTHER/DELIVERY_PRODUCTS/ALL/ZX';      // 其他产品

var topicRankingTop = '/C/IFD/RANKING/DELIVERY_PRODUCTS/ALL/ZX';        // 投放排行榜

/**
 *   渲染图表
 */
/* 标准化产品 */
var standardChart = echarts.init(document.getElementById("standardChart"));
standardChart_data = pieChart({center: ['40%', '50%'],colorList:['#0065b3','#1772c5','#028fd7','#02aae9','#9fcd37','#ffef09','#ffc211','#fba01e','#f15524'],title:'标准化产品'});
standardChart.setOption(standardChart_data,true);

/* 非标准化产品 */
var NonstandardChart = echarts.init(document.getElementById("non_standardChart"));
NonstandardChart_data = pieChart({center: ['40%', '50%'],colorList:['#0065b3','#1772c5','#028fd7','#02aae9','#9fcd37','#ffef09','#ffc211'],title:'非标准化产品'});
NonstandardChart.setOption(NonstandardChart_data,true);

/* 其他产品 */
var otherChart = echarts.init(document.getElementById("otherChart"));
otherChart_data = pieChart({center: ['52%', '50%'],colorList:['#0065b3','#ffef09','#ffc211'],title:'其他产品'});
otherChart.setOption(otherChart_data,true);

/* 投放排行榜 */
var rankingChart = echarts.init(document.getElementById("rankingChart"));
rankingChart_data = barChart();
rankingChart.setOption(rankingChart_data,true);


/**
 *  模拟数据
 */
var topicData = [
    {
        topic:'/C/IFD/STANDARD/DELIVERY_PRODUCTS/ALL/ZX',
        data:[
            {value:310, name:'小微企业低信用风险'},
            {value:234, name:'小微企业标准房产抵押'},
            {value:135, name:'法人房产按揭'},
            {value:1548, name:'标准票据贷'},
            {value:335, name:'银票'},
            {value:310, name:'商票'},
            {value:234, name:'标准保证贷'},
            {value:135, name:'上游供应商贷款'},
            {value:1548, name:'政府采购贷款'}
        ]
    },{
         topic:'/C/IFD/NON_STANDARD/DELIVERY_PRODUCTS/ALL/ZX',
        data:[
            {value:250, name:'非标准足趾房地产抵押贷款'},
            {value:604, name:'非标准法人房产按揭'},
            {value:245, name:'总行准入担保公司担保贷款'},
            {value:1598, name:'政府风险补偿基金贷款'},
            {value:210, name:'总行准入其他供应链贷款'},
            {value:400, name:'其他质押保证或信用类贷款'},
            {value:264, name:'存量续作业务'},
        ]
    },{
         topic:'/C/IFD/OTHER/DELIVERY_PRODUCTS/ALL/ZX',
        data:[
            {value:60, name:'中企云链'},
            {value:40, name:'贴现'},
            {value:50, name:'其他'},
        ]
    },{
        topic:'/C/IFD/RANKING/DELIVERY_PRODUCTS/ALL/ZX',
        data:{
            xAxisList:['北京分行','上海分行','乌鲁木齐分行','南京分行','苏州分行','杭州分行','广州分行','深圳分行','济南分行','厦门分行','上海分行','乌鲁木齐分行','南京分行','苏州分行','杭州分行','石家庄分行','拉萨分行','南京分行','苏州分行','杭州分行','广州分行','深圳分行','济南分行'],
            seriesYear:[25,40,60,85, 115, 150, 170, 200, 239, 265, 289, 309, 330, 359,388,399,420,445,465, 475, 483, 490, 500],
            seriesMouth:[26, 39, 53, 84, 107, 110, 136, 122, 138, 138, 170, 240,213,188,200,235, 164, 177, 280, 190, 270, 200],
            seriesDay:[36, 50, 44, 74, 120, 140, 116, 175, 160, 200, 210, 163,180,193,120,186,304, 238, 270, 203,240,193,368]
        }
    }

];


/**
*  判断接口的链接通道
**/
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

    /* tab自动切换 ---- 每10秒切换  */
    // setInterval(li_timer,10000);  
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
    document.querySelector("#dateYear").innerHTML = moment().format("YYYY年MM月DD日");
    document.querySelector("#dateTime").innerHTML = moment().format("HH:mm:ss");
}

/**
 *  获取数据
 */
function toMassage(topic,payload){
     if(payload != undefined) {
        if(empty(JSON.parse(payload))) {
            /* 标准化产品 */
            if (topic == topicStandardChart) {
                var data = JSON.parse(payload);
                standardChart_data.series[0].data = data;
                 standardChart_data.legend.data = pieLegend(data);
                standardChart.setOption(standardChart_data,true);
            }
            /* 非标准化产品 */
            if (topic == topicNonStandardChart) {
                var data = JSON.parse(payload);
                NonstandardChart_data.series[0].data = data;
                 NonstandardChart_data.legend.data = pieLegend(data);
                NonstandardChart.setOption(NonstandardChart_data,true);
            }
            /* 其他产品 */
            if (topic == topicOtherChart) {
                 var data = JSON.parse(payload);
                 otherChart_data.series[0].data = data;
                 otherChart_data.legend.data = pieLegend(data);
                 otherChart.setOption(otherChart_data,true);
            }
            /* 投放排行榜 */
            if (topic == topicRankingTop) {
                var rankingData = JSON.parse(payload);
                rankingChart_data.xAxis[0].data = rankingData.xAxisList;
                rankingChart_data.series[0].data = rankingData.seriesYear;
                rankingChart_data.series[1].data = rankingData.seriesMouth;
                rankingChart_data.series[2].data = rankingData.seriesDay;
                rankingChart.setOption(rankingChart_data,true);
            }
        }
    }
}

/**
 *     处理饼图的图例展示函数
 */
function pieLegend(obj){
    var legendName = [];
    for(var i =0; i<obj.length;i++){
        legendName.push(obj[i].name);
    }
    return legendName;
}


/**
 *   饼图配置函数
 */
function pieChart(setting){
    return option = {
        title:{
            text:setting.title,
            left:'center',
            bottom:20,
             textStyle:{
                color:'#3d9bf0'
            }
        },
        tooltip : {
            // trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        /* 图例配置项 */
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 13,
            bottom: 20,
            borderRadius: 5,
            textStyle:{
                color:'#fff'
            },
            data:[]
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center:setting.center,
                data:[],
                /* 图形样式。 */
                itemStyle: {
                    borderWidth:5,
                    shadowBlur: 10,
                    shadowColor:'rgb(0,0,0)',
                    /* 颜色 */
                    normal:{
                        color:function(params){
                            return setting.colorList[params.dataIndex]
                        }
                    }
                },
                /* 饼图图形上的文本标签 */
                label:{
                   normal:{
                        color: '#fff',
                        /* 字符串模板 */
                        formatter:'{c}\n{d}%',
                   }
                },
                /* 标签的视觉引导线样式  */
                labelLine:{
                   normal:{
                        length:10,   //视觉引导线第一段的长度。
                        length2:20,   //视觉引导项第二段的长度。
                        lineStyle:{
                            color:'#fff'
                        }
                   }
                }
            }
        ]
    }
}

/**
 *     柱状图配置函数
 */
function barChart(){
    return option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '8%',
            containLabel: true
        },
        legend: {
            data:['当年投放量','当月投放量','当日投放量'],
            right:15,
            // top:10,
            textStyle:{
                color:'#fff'
            }
        },
        xAxis: [
            {
                type: 'category',
                // boundaryGap: true,//默认true,此时刻度作为分隔线，标签与数据点在两个刻度间显示
                // minInterval: 1,//默认0，设置成1保证坐标轴分割刻度显示成整数。
                data: [],
                axisPointer: {
                    type: 'shadow'
                },
                nameTextStyle:{
                    color:'#fff'
                },
                /* 坐标轴轴线相关设置. */ 
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'#0099ff',
                    }
                },
                /* 坐标轴刻度相关设置. */
                axisTick:{
                show:false,
                
                },
                /* 坐标轴刻度标签的相关设置. */
                axisLabel: {
                    /* 字体倾斜 */
                    interval:0,
                    rotate:320,
                    textStyle: {
                        color: '#fff'
                    }
                },
                /* 坐标轴在 grid 区域中的分隔线 */
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'rgba(237,237,237,.3)'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '金额（亿元）',
                min: 0,
                max: 500,
                interval: 50,
                axisLabel: {
                    formatter: '{value}'
                },
                nameTextStyle:{
                    color:'#fff'
                },
                /* 坐标轴轴线相关设置. */ 
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'#0099ff',
                    }
                },
                /* 坐标轴刻度相关设置. */
                axisTick:{
                show:false,
                
                },
                /* 坐标轴刻度标签的相关设置. */
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                /* 坐标轴在 grid 区域中的分隔线 */
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'rgba(237,237,237,.3)'
                    }
                }
            }
        ],
        series: [
            {
                name:'当年投放量',
                type:'bar',
                //设置柱状图大小
                barWidth : 10,
                /* 颜色渐变 */
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#2be8be'},
                                {offset: 1, color: '#05b8b5'}
                            ]
                        ),
                        //柱形图圆角，初始化效果
                        barBorderRadius:[10, 10, 10, 10],

                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#2be8be'},
                                {offset: 1, color: '#05b8b5'}
                            ]
                        )
                    }
                },
                data:[]
            },
            {
                name:'当月投放量',
                type:'bar',
                //设置柱状图大小
                barWidth : 10,
                /* 颜色渐变 */
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#e96ab7'},
                                {offset: 1, color: '#914bdf'}
                            ]
                        ),
                        //柱形图圆角，初始化效果
                        barBorderRadius:[10, 10, 10, 10],
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#e96ab7'},
                                {offset: 1, color: '#914bdf'}
                            ]
                        )
                    }
                },
                data:[]
            }, {
                name:'当日投放量',
                type:'bar',
                //设置柱状图大小
                barWidth : 10,
                /* 颜色渐变 */
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#f6e190'},
                                {offset: 1, color: '#f8b753'}
                            ]
                        ),
                        //柱形图圆角，初始化效果
                        barBorderRadius:[10, 10, 10, 10],
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: '#f6e190'},
                                {offset: 1, color: '#f8b753'}
                            ]
                        )
                    }
                },
                data:[]
            }
        ]
    };
}


/**
*    检验值是否为空
*/

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
    topicData.forEach(function (element) {
        mosq.subscribe(element.topic, 0)
    });
}
