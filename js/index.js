$(document).ready(function () {
    setInterval(()=>{
        let date = new Date(Date.now()),
            Y = date.getFullYear() + '-',
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) + '-': date.getMonth()+1) + '-',
            D = date.getDate() < 10?'0' + date.getDate() + ' ':date.getDate() + ' ',
            h = date.getHours() < 10?'0' + date.getHours() +':':date.getHours() +':',
            m = date.getMinutes() < 10?'0' + date.getMinutes() + ':':date.getMinutes() + ':',
            s = date.getSeconds() <10?'0' + date.getSeconds() +' ':date.getSeconds() +' ';

        let arr=new Array(7);
        arr[0]="星期日";
        arr[1]="星期一";
        arr[2]="星期二";
        arr[3]="星期三";
        arr[4]="星期四";
        arr[5]="星期五";
        arr[6]="星期六";
        let week = arr[date.getDay()];

        let time = Y + M+ D + h + m + s + ' ' + week;
        $('.time').text(time);
    },1000)

    //处方总量占比
    let num1 = 10250,
        num2 = 88852,
        num3 = 34250,
        recipeTotal = num1 + num2 + num3;
    $('.storeRecipeTotal').text(format_number(num1));
    $('.hosRecipeTotal').text(format_number(num2));
    $('.platRecipeTotal').text(format_number(num3));
    let storePercent = num1/recipeTotal*100;
    let hosPercent = num2/recipeTotal*100;
    let platPercent = num3/recipeTotal*100;

    //处方流转总量  今日处方量
    let center_left_num = 0,center_right_num = 0;

    $('#recipeTotal').text(format_number(45460));
    $('#todayTotal').text(format_number(2460));

    //审方问题总量排行数据
    let data = [
        { month: "2月", value: 340 },
        { month: "3月", value: 360 },
        { month: "4月", value: 220 },
        { month: "5月", value: 160 },
        { month: "6月", value: 176 },
        { month: "7月", value: 659 },
        { month: "8月", value: 364 },
        { month: "9月", value: 297 },
        { month: "10月", value: 97 },
        { month: "11月", value: 101 },
        { month: "12月", value: 243 }
    ];

    let left_bottom_data = [30, 50, 210, 90, 180, 200, 160, 95,196,56,94,258];

    //审方问题占比
    let charData = [
        { value: 10, name: '计量范围问题' },
        { value: 5, name: '重复用药问题' },
        { value: 15,  name: '给药途径问题' },
        { value: 25, name: '超多日用量问题' },
        { value: 20,  name: '超医保限制问题' },
        { value: 35, name: '超权用药问题' },
        { value: 35, name: '儿童用药问题' }
    ];



    let mychart = echarts.init(document.getElementById('mychart'));
    echarts.registerMap('重庆', JSON.stringify(mapJson));
    window.addEventListener('resize', function () {
        mychart.resize()
    });
    mychart.on('click', function (e) {
        //处方总量占比
        num1 = Math.random()* 20000 + 500;
        num2 = Math.random()* 90000 + 1000;
        num3 = Math.random()* 50000 + 1000;
        recipeTotal = num1 + num2 + num3;
        $('.storeRecipeTotal').text(format_number(num1));
        $('.hosRecipeTotal').text(format_number(num2));
        $('.platRecipeTotal').text(format_number(num3));

        storePercent = num1*100/recipeTotal;
        hosPercent = num2*100/recipeTotal;
        platPercent = num3*100/recipeTotal;
        storeRecipe(storePercent.toFixed(1));
        hosRecipe(hosPercent.toFixed(1));
        platRecipe(platPercent.toFixed(1));
        
        //处方流转总量  今日处方量
        center_left_num = Math.random()* 90000 + 10000;
        center_right_num = Math.random()* 9000 + 1000;
        $('#recipeTotal').text(format_number(center_left_num));
        $('#todayTotal').text(format_number(center_right_num));

        //审方问题总量排行
        data = [
            { month: "2月", value: Math.random()* 500 },
            { month: "3月", value: Math.random()* 500 },
            { month: "4月", value: Math.random()* 500 },
            { month: "5月", value: Math.random()* 500 },
            { month: "6月", value: Math.random()* 500 },
            { month: "7月", value: Math.random()* 500 },
            { month: "8月", value: Math.random()* 500 },
            { month: "9月", value: Math.random()* 500 },
            { month: "10月", value: Math.random()* 500 },
            { month: "11月", value: Math.random()* 500 },
            { month: "12月", value: Math.random()* 500 }
        ];
        authQuestionRank(data);

        //审方总量趋势
        left_bottom_data = [];
        for (let i = 0;i<12;i++){
            left_bottom_data.push(Math.random()* 300)
        }
        authTotal(left_bottom_data);

        //审方问题占比
        charData = [
            { value: Math.floor(Math.random()* 50 + 1), name: '计量范围问题' },
            { value: Math.floor(Math.random()* 50 + 1), name: '重复用药问题' },
            { value: Math.floor(Math.random()* 50 + 1),  name: '给药途径问题' },
            { value: Math.floor(Math.random()* 50 + 1), name: '超多日用量问题' },
            { value: Math.floor(Math.random()* 50 + 1),  name: '超医保限制问题' },
            { value: Math.floor(Math.random()* 50 + 1), name: '超权用药问题' },
            { value: Math.floor(Math.random()* 50 + 1), name: '儿童用药问题' }
        ];
        authQuestion(charData);

        console.log(e)
    });
    mychart.setOption({
        // 图表主标题
        // title: {
        //     // 文本
        //     text: '重庆',
        //     // 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
        //     top: 25,
        //     // 值: 'left', 'center', 'right' 同上
        //     left: 'center',
        //     // 文本样式
        //     textStyle: {
        //         // 字体大小
        //         fontSize: 25,
        //         // 字体粗细
        //         fontWeight: 650,
        //         // 字体颜色
        //         color: '#fff'
        //     }
        // },
        // 提示框组件
        tooltip: {
            // 触发类型, 数据项图形触发
            trigger: 'item',
            // 使用函数模板，传入的数据值 ——> value: number | Array
            formatter: function (val) {
                return val.data.name + '<br>处方数量: ' + val.data.value
            }
        },
        // 视觉映射组件
        visualMap: {
            // continuous 类型为连续型
            type: 'continuous',
            show: true, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
            // 指定 visualMapContinuous 组件的允许的最小/大值 min/max 必须用户指定
            min: 0,
            // min,max 形成了视觉映射的定义域
            max: 800,
            // 文本样式
            textStyle: {
                // 字体大小
                fontSize: 15,
                // 字体颜色
                color: '#fff'
            },
            // 拖拽时，是否实时更新
            realtime: false,
            // 是否显示拖拽用的手柄
            calculable: true,
            // 定义在选中范围中的视觉元素
            inRange: {
                // 图元的颜色
                color: ['#69DDE9', '#6BBAE8', '#7181E7', '#7A4BE6']
            }
        },
        series: [
            {
                name: '重庆',
                // 类型
                type: 'map',
                // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
                map: '重庆',
                // 地图类型
                mapType: 'province',
                // 是否开启鼠标缩放和平移漫游 默认不开启
                // 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
                roam: false,
                // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
                top: 70,
                // 图形上的文本标签
                label: {
                    show: false // 是否显示对应地名
                },
                // 地图区域的多边形 图形样式
                itemStyle: {
                    // 地图区域的颜色 如果设置了visualMap, 这个属性将不起作用
                    areaColor: '#7B68EE',
                    // 描边线宽 为 0 时无描边
                    borderWidth: 0.5,
                    // 图形的描边颜色 支持的颜色格式同 color
                    borderColor: '#000',
                    // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
                    borderType: 'solid'
                },
                // 高亮状态
                emphasis: {
                    // 文本标签
                    label: {
                        // 是否显示标签
                        show: false,
                        // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
                        color: '#fff'
                    },
                    // 图形样式
                    itemStyle: {
                        // 地图区域的颜色
                        // areaColor: '#FF6347'
                    }
                },
                // 地图系列中的数据内容数组，数组项可以为单个数值
                data: [
                    {name: '巴南区', value: 482},
                    {name: '北碚区', value: 731},
                    {name: '南岸区', value: 655},
                    {name: '江北区', value: 294},
                    {name: '长寿区', value: 380},
                    {name: '綦江区', value: 518},
                    {name: '江津区', value: 359},
                    {name: '合川区', value: 189},
                    {name: '万州区', value: 323},
                    {name: '黔江区', value: 756},
                    {name: '武隆区', value: 78},
                    {name: '璧山区', value: 139},
                    {name: '沙坪坝区', value: 159},
                    {name: '渝北区', value: 128},
                    {name: '渝中区', value: 653},
                    {name: '大渡口区', value: 307},
                    {name: '九龙坡区', value: 288},
                    {name: '涪陵区', value: 438},
                    {name: '南川区', value: 460},
                    {name: '潼南区', value: 132},
                    {name: '彭水苗族土家族自治县', value: 588},
                    {name: '大足区', value: 664},
                    {name: '荣昌区', value: 88},
                    {name: '永川区', value: 537},
                    {name: '铜梁区', value: 298},
                    {name: '垫江县', value: 602},
                    {name: '梁平区', value: 100},
                    {name: '丰都县', value: 185},
                    {name: '石柱土家族自治县', value: 275},
                    {name: '忠县', value: 132},
                    {name: '开州区', value: 886},
                    {name: '云阳县', value: 208},
                    {name: '巫山县', value: 195},
                    {name: '巫溪县', value: 975},
                    {name: '奉节县', value: 699},
                    {name: '城口县', value: 115},
                    {name: '酉阳土家族苗族自治县', value: 381},
                    {name: '秀山土家族苗族自治县', value: 78},
                ]
            }
        ]
    });

    storeRecipe(storePercent.toFixed(1));

    function storeRecipe(val) {

        let storePie = echarts.init(document.getElementById('store-pie'));
        let colors = ['#389af4', '#2A3848']
        storePie.setOption({
            grid: {
                left: '2%',
                right: '4%',
                bottom: '14%',
                top: '16%',
                containLabel: true
            },
            series: [{
                type: 'pie',
                clockWise: false,
                radius: [40, 50],
                hoverAnimation: false,
                data: [{
                    value: val,
                    label: {
                        normal: {
                            formatter: function (params) {
                                return params.value + '%';
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                                color: '#7C94AE'
                            }
                        }
                    },
                    itemStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
                            colorStops: [
                                {
                                    offset: 0.2, color: '#6BDCE9' // 0% 处的颜色
                                },
                                {
                                    offset: 1, color: '#7D46E7' // 100% 处的颜色
                                }],// 缺省为 false
                        }
                    },
                }, {
                    value: 100-val,
                    itemStyle: {
                        normal: {
                            color: '#2A3848'
                        },
                        emphasis: {
                            color: '#2A3848'
                        }
                    }
                }]
            }]
        })
    }

    hosRecipe(hosPercent.toFixed(1));

    function hosRecipe(val) {
        let hosPie = echarts.init(document.getElementById('hos-pie'));
        hosPie.setOption({
            series: [{
                type: 'pie',
                clockWise: false,
                radius: [40, 50],
                hoverAnimation: false,
                data: [{
                    value: val,
                    label: {
                        normal: {
                            formatter: function (params) {
                                return params.value + '%';
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                                color: '#7C94AE'
                            }
                        }
                    },
                    itemStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
                            colorStops: [
                                {
                                    offset: 0.2, color: '#6BDCE9' // 0% 处的颜色
                                },
                                {
                                    offset: 1, color: '#7D46E7' // 100% 处的颜色
                                }],// 缺省为 false
                        }
                    },
                }, {
                    value: 100-val,
                    itemStyle: {
                        normal: {
                            color: '#2A3848'
                        },
                        emphasis: {
                            color: '#2A3848'
                        }
                    }
                }]
            }]
        })
    }

    platRecipe(platPercent.toFixed(1));

    function platRecipe(val) {
        let platPie = echarts.init(document.getElementById('plat-pie'));
        platPie.setOption({
            series: [{
                type: 'pie',
                clockWise: false,
                radius: [40, 50],
                hoverAnimation: false,
                data: [{
                    value: val,
                    label: {
                        normal: {
                            formatter: function (params) {
                                return params.value + '%';
                            },
                            position: 'center',
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold',
                                color: '#7C94AE'
                            }
                        }
                    },
                    itemStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 1, y2: 1,
                            colorStops: [
                                {
                                    offset: 0.2, color: '#6BDCE9' // 0% 处的颜色
                                },
                                {
                                    offset: 1, color: '#7D46E7' // 100% 处的颜色
                                }],// 缺省为 false
                        }
                    },
                }, {
                    value: 100-val,
                    itemStyle: {
                        normal: {
                            color: '#2A3848'
                        },
                        emphasis: {
                            color: '#2A3848'
                        }
                    }
                }]
            }]
        })
    }

    //审方总量趋势
    authTotal(left_bottom_data);
    function authTotal(data) {
        let myChart = echarts.init(document.getElementById('authToal'));
        myChart.setOption({
            grid: {
                left: '2%',
                right: '4%',
                bottom: '2%',
                top: '10%',
                containLabel: true
            },
            tooltip: {
                show: false
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                min: -1,
                max: 12,
                axisLine: {
                    lineStyle: {
                        color: '#4bbbf8',
                        shadowColor: 'rgba(75, 211, 255, 0.5)',
                        shadowBlur: 5
                    }
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 12
                },
                splitLine: {
                    show: false
                },
                data: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01', '07/01', '08/01','09/01','10/01','11/01','12/01']
            },
            yAxis: [{
                // max: 250,
                // min: 0,
                axisLine: {
                    lineStyle: {
                        color: '#4bbbf8',
                        shadowColor: 'rgba(75, 211, 255, 0.5)',
                        shadowBlur: 5
                    }
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 12
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(75, 211, 255, 0.2)',
                        type: 'dashed'
                    }
                }
            }],
            series: [{
                name: '数量',
                type: 'line',//pictorialBar
                // barCategoryGap: '-60%',
                // symbol: 'path://d="M150 0 L75 200 L225 200 Z"',
                // label: {
                //     show: true,
                //     position: 'top',
                //     color: '#1798ff',
                //     fontSize: 14
                // },
                itemStyle: {
                    color: '#fff',//#5238A6
                },
                data: data
            }]
        })
    }

    //审方问题总量排行
    authQuestionRank(data);
    function authQuestionRank(data) {
        let myChart = echarts.init(document.getElementById('question-rank'));

        let xData = [],
            yData = [];
        data.map(function (a, b) {
            xData.push(a.month);
            yData.push(a.value)
        });
        myChart.setOption({
            color: ['#3398DB'],
            // legend: {
            //     data: ['直接访问', '背景'],
            //     show: false
            // },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '15%',
                // height: '85%',
                containLabel: true,
                // z: 22
            },
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'line',
            //         lineStyle: {
            //             opacity: 0
            //         }
            //     },
            //     formatter: function(prams) {
            //         if (prams[0].data === min) {
            //             return "合格率：0%"
            //         } else {
            //             return "合格率：" + prams[0].data + "%"
            //         }
            //     }
            // },
            xAxis: [{
                type: 'category',
                gridIndex: 0,
                data: xData,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: '#0c3b71'
                    }
                },
                axisLabel: {
                    show: true,
                    color: 'rgb(170,170,170)',
                    fontSize: 14,
                    rotate:315
                },
            }],
            yAxis: [{
                type: 'value',
                name: "单位:张",
                nameTextStyle: {
                    color: "#fff"
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                // min: min,
                // max: 100,
                axisLine: {
                    lineStyle: {
                        color: '#0c3b71'
                    }
                },
                axisLabel: {
                    color: '#fff',
                    formatter: '{value}'
                }
            },{
                type: 'value',
                splitNumber: 12,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false,
                }
            }],
            series: [{
                name: '问题数',
                type: 'bar',
                barWidth: '20%',
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                offset: 0,
                                color: '#00feff'
                            },
                                {
                                    offset: 0.5,
                                    color: '#027eff'
                                },
                                {
                                    offset: 1,
                                    color: '#0286ff'
                                }
                            ]
                        )
                    }
                },
                data: yData,
                zlevel: 11

            },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: '30%',
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    barGap: '-135%',
                    data: [100, 100, 100, 100, 100, 100, 100,100,100,100,100],
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,255,0.1)'
                        }
                    },
                    zlevel: 9
                },

            ]
        })
    }

    let chartData = [18,28,15,6,17];
    let chartName = ['NO.1 医师是否注明过敏试验及结果的判定','NO.2 反处方用药与临床诊断的相符性','NO.3 存在不是适应性情况','NO.4 违反医保限制','NO.5 存在不适宜'];
    irregularRecipe(chartData,chartName);
    setInterval(()=>{
        let lastData = chartData.shift(),lastName = chartName.shift();
        chartData = chartData.concat(lastData);
        chartName = chartName.concat(lastName);
        irregularRecipe(chartData,chartName);
    },3000)


    function irregularRecipe(chartData,chartName) {
        let myChart = echarts.init(document.getElementById('irregular-recipe'));


        myChart.setOption({
            grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                top: '2%',
                containLabel: true
            },
            xAxis: [{
                show: false,
            },
                {
                    show: false,
                }
            ],
            yAxis: {
                type: 'category',
                inverse: true,
                show: false
            },

            series: [
                {
                    show: true,
                    type: 'bar',
                    barGap: '-30%',
                    barWidth: '10%',
                    z: 2,
                    itemStyle: {
                        normal: {
                            color: '#5238A6'
                        }
                    },
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         textStyle: {
                    //             color: '#000',
                    //             fontSize: 25,
                    //             fontWeight: 'bold'
                    //         },
                    //         position: 'right',
                    //         formatter: function(data) {
                    //             return (chartData[data.dataIndex]).toFixed(2) + '%';
                    //         }
                    //     }
                    // },
                    data: chartData,
                },
                //年份
                {
                    show: false,
                    type: 'bar',
                    xAxisIndex: 1, //代表使用第二个X轴刻度
                    barGap: '-10%',
                    barWidth: '10%',
                    itemStyle: {
                        normal: {
                            barBorderRadius: 200,
                            color: 'transparent'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: [0, '-20'],
                            textStyle: {
                                fontSize:14,
                                color: '#fff',
                            },
                            formatter: function(data) {
                                return chartName[data.dataIndex];
                            }
                        }
                    },
                    data: chartData
                }
            ]
        })
    }
    
    authQuestion(charData);
    function authQuestion(charData) {
        let myChart = echarts.init(document.getElementById('auth-question'));

        let lengData = [];
        charData.forEach(item =>{
            lengData.push(item.name)
        })
        myChart.setOption({
            color: ["#46A9FF", "#FF5558", "#75FF6B", "#F4A73A", "#9258F3", "#9B0082","#D4DF1A"],
            // grid: {
            //     left: '2%',
            //     right: '2%',
            //     bottom: '14%',
            //     top: '16%',
            //     containLabel: true
            // },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                type: "scroll",
                orient: "lettical",
                // x: "right",
                top: "center",
                right: "5%",
                // bottom: "0%",
                itemWidth: 16,
                itemHeight: 8,
                itemGap: 10,
                textStyle: {
                    color: '#A3E2F4',
                    fontSize: 14,
                    fontWeight: 0
                },
                data: lengData
            },
            polar: {},
            angleAxis: {
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#0B4A6B",
                        width: 1,
                        type: "solid"
                    },
                },
            },
            radiusAxis: {
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#0B3E5E",
                        width: 1,
                        type: "solid"
                    },
                },
            },
            calculable: true,
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '80%'],
                    center: ['30%', '60%'],
                    roseType: 'radius',
                    zlevel:10,
                    label: {
                        normal: {
                            show: true,
                            formatter: "{c}%",
                            textStyle: {
                                fontSize: 12,
                            },
                            position: 'outside'
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 15,
                            length2: 10
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: charData
                }]
        })
    }


    function format_number(n){
        let b = parseInt(n).toString();
        let len = b.length;
        if(len <= 3){ return b;}
        let r = len%3;
        return r > 0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
    }
});

function selectChange(val) {
    console.log($('#testSelect')[0].value);
    let selectVal = $('#testSelect')[0].value,html = '';
    if(selectVal == '2'){
        html = `<div class="rank-item">
                        <div class="point"></div>
                        <div class="hos-name">
                            <span>智慧药房</span>
                            <span>216</span>
                        </div>
                        <div class="item-after">
                            <div class="arrow-down"></div>
                            <span>36.5</span>
                        </div>

                    </div>`

    }else if(selectVal == '1'){
        html = `<div class="rank-item">
                    <div class="point"></div>
                    <div class="hos-name">
                        <span>重庆市第七人民医院</span>
                        <span>6696</span>
                    </div>
                    <div class="item-after">
                        <div class="arrow-down"></div>
                        <span>79.9</span>
                    </div>

                </div>
                <div class="rank-item">
                    <div class="point"></div>
                    <div class="hos-name">
                        <span>重庆市精卫</span>
                        <span>6696</span>
                    </div>
                    <div class="item-after">
                        <div class="arrow-down"></div>
                        <span>69.9</span>
                    </div>
                </div>
                <div class="rank-item">
                    <div class="point"></div>
                    <div class="hos-name">
                        <span>重庆市第六人民医院</span>
                        <span>6696</span>
                    </div>
                    <div class="item-after">
                        <div class="arrow-down"></div>
                        <span>59.7</span>
                    </div>

                </div>`
    }
    $('.recipe-rank').html(html)
}