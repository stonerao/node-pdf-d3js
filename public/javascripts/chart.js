function renderPie(id, data, color = ["#87d9fa", "#ffc36c", "#fe627a"]) {
    //生成饼状图
    var names = data.map(x => x.name);
    data.forEach((x, i) => {
        x.itemStyle = {
            color: color[i]
        };
    });
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        animation: false,
        legend: {
            orient: "vertical",
            x: "left",
            top: "center",
            data: names
        },
        grid: {
            left: "0",
            right: "0",
            bottom: "10%",
            top: "10%",
            containLabel: true
        },
        series: [{
            name: "一天的信息来源",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            data: data,
            label: {
                normal: {
                    formatter: "{d}%"
                }
            }
        }]
    };
    myChart.setOption(option);
     
}

function renderBar(id, data) {
    //竖柱状图
    var xAxis = data.map(x => x.name);
    var yAxis = data.map(x => x.value);
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        animation: false,
        color: ["#3398DB"],
        backgroundColor: "#FFFFFF",
        grid: {
            left: "0",
            right: "0",
            bottom: "10%",
            top: "5%",
            containLabel: true
        },
        xAxis: [{
            type: "category",
            data: xAxis,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                rotate: -45,
                margin: 10,
                align: "left"
            },
            axisLine: {
                lineStyle: {
                    color: "#747474"
                }
            }
        }],
        yAxis: {
            type: "value",
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#747474"
                }
            }
        },
        series: [{
            type: "bar",
            barWidth: "10",
            data: yAxis,
            itemStyle: {
                normal: {
                    color: "#8ac1fd"
                }
            }
        }]
    };
    myChart.setOption(option);
}

function renderColor(i) {
    var color = [
        "#4a90e2",
        "#87d8fb",
        "#9ee3c1",
        "#e8a8ff",
        "#a0aefe",
        "#ff617b",
        "#fdc775",
        "#ff8f66",
        "#bbbbbb"
    ];
    return color[i];
}

function renderBarHeng(id, data) {
    //横状图
    var xAxis = data.map(x => x.name);
    var yAxis = data.map(x => x.value);
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        animation: false,
        grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            top: "5%",
            containLabel: true
        },
        xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#747474"
                }
            }
        },
        yAxis: {
            type: "category",
            data: xAxis,
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#747474"
                }
            }
        },
        series: [{
            name: "2011年",
            type: "bar",
            data: yAxis,
            barWidth: "10",
            itemStyle: {
                normal: {
                    color: "#eeb793"
                }
            }
        }]
    };
    myChart.setOption(option);
}

function renderLine(id, data, meta) {
    var serises = [];
    var color = ["#4c93e2", "#fd7386"];
    const nameRend = str => {
        if (str == "current") {
            return meta.type == 3 ?
                "本周" :
                meta.type == 2 ? "本月" : "本年";
        } else if (str == "last") {
            return meta.type == 3 ?
                "上周" :
                meta.type == 2 ? "上月" : "去年";
        } else {
            return str;
        }
    };

    data.forEach((x, i) => {
        let data = x.data.map(x => x.value);
        serises.push({
            name: nameRend(x.name),
            data: data,
            type: "line",
            itemStyle: {
                normal: {
                    color: color[i]
                }
            }
        });
    });
    var legend = serises.map(x => x.name);
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        animation: false,
        xAxis: {
            type: "category",
            axisLine: {
                lineStyle: {
                    color: "#747474"
                }
            }
            //   data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        legend: {
            data: legend
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "10%",
            top: "20%",
            containLabel: true
        },
        yAxis: {
            type: "value",
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#fff"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#747474"
                }
            }
        },
        series: serises
    };
    myChart.setOption(option);
}

function $str(id, str) {
    var doms = document.querySelectorAll(id)
    for (var i = 0; i < doms.length; i++) {
        doms[i].innerHTML = str
    }
}

function addNumber(arr) {
    var num = 0;
    for (var i = 0; i < arr.length; i++) {
        if (typeof parseInt(arr[i]) != 'number' && isNaN(parseInt(arr[i]))) {
            continue
        }
        num += arr[i]
    }
    return num
}