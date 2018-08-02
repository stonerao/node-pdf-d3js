var express = require('express');
var router = express.Router();
var d3 = require('d3');
var jsdom = require('jsdom');
const {
  JSDOM
} = jsdom;
const STYLE = require("./style.js")
var {
  index,
  opp
} = require("../path.js")

var phantom = require('phantom');
/* GET home page. */

var l_obj = opp
var pdfHTML = ''

function renderPdf(name) {
  //开始执行
  phantom.create().then(function (ph) {
    //创建一个PDF
    ph.createPage().then(function (page) {
      //打开需要读取页面
      page.open("http://localhost:8083/chart").then(function (status) {
        /*   page.property('viewportSize', {
            width: 750,
            height: 500
          }); */
        //设置页面为A4大小
        page.property('paperSize', {
          format: 'A4',
        });
        //保存对应位置
        // var url = __dirname + '/' + (+new Date) + 'pdf.pdf'
        var url = index + '/public/pdfs/' + name + '.pdf'
        //开始渲染并且保存
        page.render(url).then(function () {
          //保存成功 
          ph.exit();
          // func(url)
        });
      });
    });
  });
}

//根据年获取周
const DateCycle = (time = new Date()) => {
  //获取当前年
  const t_year = time.getFullYear()
  //获取当前月份
  const t_month = time.getMonth();
  //获取当前周 
  //获取一月一号到现在有多少月
  let month = []
  for (let i = 0; i <= t_month; i++) {
    month.push(i)
  }

  //获取一月有多少天
  const getCountDays = month => {
    var countTime = new Date()
    countTime.setMonth(month + 1);
    countTime.setDate(0);
    return countTime.getDate()
  }
  const getCycle = (m) => {
    var cycleNum = 1;
    var cycleArr = []
    m.forEach(x => {
      let days = getCountDays(x)
      for (let i = 1; i <= days; i++) {
        let cycle = new Date(t_year, x, i).getDay()
        if (cycle == 0) {
          cycleArr.push(`${t_year}年第${cycleNum}周`)
          cycleNum++;
        }
      }
    })
    return cycleArr
  }
  return getCycle(month)

}
var datasTotal = DateCycle(new Date())
const renderPdfs = (arr, func) => {
  if (arr.length == 0) {
    return
  }
  //生成PDF
  renderPdf(datasTotal[0], function (data) {
    console.log(data)
    func(data)
  })
  /* setTimeout(x => {
    renderPdf(datasTotal[0])
    datasTotal.splice(0, 1)
    renderPdfs(datasTotal)
  }, 1000) */
}
// renderPdfs(datasTotal)
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.post('/renderHtml', function (req, res, next) {
  //允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let body = req.body;
  if (!pdfHTML) {
    res.json({
      code: -1,
      msg: "请先生成PDF"
    })
    return
  }
  res.send(pdfHTML)
});
//生成PDF报表
router.post('/pdf', function (req, res, next) {
  //保存当前数据

  //允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  let body = req.body;
  l_obj = body
  renderPdfs(datasTotal, function (data) {
    res.sendFile(data)
  })

  // res.json(body)

});

//抓取该页面
router.get('/chart', function (req, res, next) {
  //解析数据
  // l_obj
  //安全事件

  var data_attack = opp['attack']
  // var data_attack = l_obj['attack']
  //信息
  var data_head = [{
    name: "资产告警共",
    number: data_attack.total
  }, {
    name: "一般性网络恶意行",
    number: data_attack.normal
  }, {
    name: "较重网络攻击场景",
    number: data_attack.medium
  }, {
    name: "严重疑似高级持续威胁",
    number: data_attack.high
  }]
  //饼状图数据~
  var pie_attatck = [{
    name: "恶意行为",
    number: data_attack.normal
  }, {
    name: "攻击场景",
    number: data_attack.medium
  }, {
    name: "高级持续威胁",
    number: data_attack.high
  }]
  //安全事件攻击源
  var attack_source = data_attack['top_src_area'].map(x => {
    return {
      name: x.name,
      number: x.count
    }
  })
  //被攻击最多的IP排名
  var top_tar_ip = data_attack['top_tar_ip'].map(x => {
    return {
      name: x.name,
      number: x.count
    }
  })
  //双折线图
  var attack_current = data_attack['current'].map(x => {
    return [x.name, x.value]
  })
  var attack_last = data_attack['last'].map(x => {
    return [x.name, x.value]
  })
  var attack_line = [{
    country: "current",
    gdp: attack_current
  }, {
    country: "current",
    gdp: attack_last
  }]


  //资产告警
  var data_alarm = opp['asset_alarm']
  var alarm_head = [{
    name: "资产告警共",
    number: data_alarm.total
  }, {
    name: "一般告警",
    number: data_alarm.normal
  }, {
    name: "较重告警",
    number: data_alarm.medium
  }, {
    name: "严重告警",
    number: data_alarm.high
  }]
  //饼状图信息
  var pie_alarm = [{
    name: "一般告警",
    number: data_alarm.normal
  }, {
    name: "较重告警",
    number: data_alarm.medium
  }, {
    name: "严重告警",
    number: data_alarm.high
  }]
  //双折线图
  var alarm_current = data_alarm['current'].map(x => {
    return [x.name, x.value]
  })

  var alarm_line = [{
    country: "current",
    gdp: alarm_current
  }]
  var alarm_top_ip = data_alarm['top_ip'].map(x => {
    return {
      name: x.name,
      number: x.count
    }
  })
  //综合
  //资产告警
  var data_index = opp['index']
  //双折线图
  var index_current = data_index['current'].map(x => {
    return [x.name, x.value]
  })
  var index_total = data_index['current'].map(x => x.value)
  //最高分
  var index_max_num = d3.max(index_total)
  //最低分
  var index_min_num = d3.min(index_total)
  //平均分

  var index_total_num = index_total.reduce(function (prev, curr) {
    return prev + curr;
  });
  var inde_p_num = (index_total_num / index_total.length).toFixed(2)
  var index_line = [{
    country: "current",
    gdp: index_current
  }]
  //head
  const titleRender = (name, list = []) => {
    let html = '';
    if (list.length != 0) {
      html += "<div class='list-head'>"
      const color = ["#4990e1", "#87d9fa", "#ffc364", "#fe627a"]
      list.forEach((x, i) => {
        html += `
          <div style="background:${color[i]}" class="while-c">
            <div style="font-size:12px;line-height:24px;">${x.name}</div>
            <div>
              <span style="font-size:14px" >${x.number}</span>
              <span style="font-size:12px">起</span>
            </div>
          </div>
        `
      })
      html += "</div>"
    }
    return `
      <div> 
        <h1 class="title">${name}</h1> 
        ${html}
      </div> 
      `
  }
  const titleRender_1 = (name, list = []) => {
    let html = '';

    if (list.length != 0) {
      html += "<div class='list-head--2'>"
      const color = ["#4990e1", "#87d9fa", "#d6a9ff", "#ffc364", "#fa627a", "#aeaeae"]
      list.forEach((x, i) => {
        html += `
          <div style="background:${color[i]}" class="while-c">
            <div style="font-size:12px;line-height:24px;">${x.name}</div>
            <div>
              <span style="font-size:14px">10058</span>
              <span style="font-size:12px">起</span>
            </div>
          </div>
        `
      })
      html += "</div>"
    }
    return `
      <div> 
        <h1 class="title">${name}</h1> 
        ${html}
      </div> 
      `
  }
  const four_head = (max, min, ping) => {
    /**
     * @param max 最大值
     * @param min 最小值
     * @param ping 平均值
     */
    return `
      <div class="four-head">
        <div class="four-head-grade">
          <div class="four-head-grade-1">
            ${ping>=8?'优'?ping<8||ping>=6:'量':'危'}
          </div>
          <div class="four-head-text">
            安全评估等级
          </div>
        </div>
        <div class="four-head-list">
          <div>本周</div>
          <div>安全指数最高<span class="color-cs">${max}分（2018.07.16）</span></div>
          <div>最低<span class="color-hs">${min}分（2018.7.17）</span></div>
          <div>平均分<span class="color-ls">${ping}分</span></div>
        </div>
      </div>
    `
  }
  //cSS.
  const style = STYLE
  const barHTML = (id = 0) => {
    return {
      dom: `
      <svg id="bar${id}"></svg>
      `,
      id: `bar${id}`
    }
  }
  let oneList = [{
    name: "资产告警共",
    number: 100
  }, {
    name: "一般性网络恶意行",
    number: 1001
  }, {
    name: "较重网络攻击场景",
    number: 120
  }, {
    name: "严重疑似高级持续威胁",
    number: 103
  }]
  let twoList = [{
    name: "安全事件",
    number: 100
  }, {
    name: "一般告警",
    number: 1001
  }, {
    name: "较重告警",
    number: 120
  }, {
    name: "严重告警",
    number: 103
  }]
  let threeList = [{
    name: "漏洞共",
    number: 100
  }, {
    name: "格式化文档漏洞",
    number: 1001
  }, {
    name: "操纵系统漏洞",
    number: 120
  }, {
    name: "Web漏洞",
    number: 103
  }, {
    name: "数据库漏洞",
    number: 103
  }, {
    name: "其他类型",
    number: 103
  }]
  const dom = new JSDOM(`<!DOCTYPE html>
  <body>   
    ${style}
    <div class="one">
      ${titleRender('一、安全事件',data_head)}
      <div class="border-isolation">
        <div>
          <div class="minor-title">安全事件构成图：</div> 
          <svg id="one-bar"></svg>
        </div>
        <div  class="border"></div>
      
         <div  class="m-t-10">
           <div class="minor-title">安全事件攻击源排名：</div> 
           <svg id="one-two"></svg>
         </div>
         <div  class="border"></div>
         <div  class="m-t-10">
           <div class="minor-title">本周被攻击最多的IP：</div> 
           <svg id="one-three"></svg>
         </div>
       
        <div  class="border"></div>
        <div>
          <div class="minor-title">安全事件数量日线走势与安全事件同：</div> 
          <svg id="one-four"></svg>
        </div>
      </div> 
    </div>
    <div class="two">
      ${titleRender('二、资产告警',alarm_head)}
      <div class="border-isolation">
        <div>
          <div class="minor-title">资产告警构成图：</div> 
          <svg id="two-bar"></svg>
        </div>
        <div  class="border"></div>
        
          <div class="m-t-10">
            <div class="minor-title">本周告警最多的IP：</div> 
            <svg id="two-two"></svg>
          </div>
          <div  class="border"></div>
          <div class="m-t-10">
            <div class="minor-title">资产告警事件数量日线走势图：</div> 
            <svg id="two-three"></svg>
          </div>
        
      </div>
    </div>
    <div class="three">
      ${titleRender_1('三、漏洞检测',threeList)}
      <div class="border-isolation">
        <div>
          <div class="minor-title">安全事件构成图：</div> 
          <svg id="three-bar"></svg>
        </div>
        <div  class="border"></div>
        <div class="flex-2">
          <div>
            <div class="minor-title">漏洞最多的IP：</div> 
            <svg id="three-two"></svg>
          </div> 
        </div>
        <div  class="border"></div>
        <div>
          <div class="minor-title">漏洞数量同比</div> 
          <svg id="three-three"></svg>
        </div>
      </div>
    <div class="four">
      ${titleRender_1('四、量化评估',[])}
      ${four_head(index_max_num,index_min_num,inde_p_num)}
      <div> 
        <div  class="border"></div>
        <div>
          <div class="minor-title">资产告警事件数量日线走势图</div> 
          <svg id="four-three"></svg>
        </div>
      </div>
    </div>
    
  </body> 
  `);
  // console.log(dom.window.document.querySelector("p").textContent);
  //主题宽度
  const bodyWidth = 550;
  var color = d3.scale.category20();
  //第一版面饼状图 
  const pieOneRender = (list = [], id) => {

    let height = 160;
    var svg = d3.select(dom.window.document.querySelector(id)).attr("width", bodyWidth).attr("height", height)
    //2.转换数据
    var pie = d3.layout.pie().value(function (d) {
      return d[1];
    });
    //1.确定初始数据
    var dataset = list.map(x => {
      return [x.name, x.number]
    })

    var piedata = pie(dataset);
    var fontsize = 14;

    //外半径和内半径
    var outerRadius = height / 2.8;
    var innerRadius = 0;

    //创建弧生成器
    var arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);



    //添加对应数目的弧组，即<g>元素
    var arcs = svg.append("g").selectAll("g")
      .data(piedata) //绑定转换后的数据piedata
      .enter()
      .append("g")
      .attr("transform", "translate(" + (bodyWidth / 2) + "," + (height / 2) + ")");

    //绘制弧
    arcs.append("path")
      .attr("fill", function (d, i) {
        return color(i); //设定弧的颜色
      })
      .attr("d", function (d) {
        return arc(d); //使用弧生成器
      });
    var leftList = svg.append("g").selectAll("g")
      .data(piedata) //绑定转换后的数据piedata
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(" + 40 + "," + (50 + (16 * i)) + ")"
      });
    leftList.append("rect")
      .attr("width", 20)
      .attr("height", 12)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", function (d, i) {
        return color(i)
      })
    leftList.append("text").text(function (d) {
      return "11"
    }).attr('y', 11).attr("x", 22).attr("class", "bar-text").text(function (d) {
      return d.data[0];
    })

    //绘制连接弧外文字的直线
    arcs.append("line")
      .style("stroke", "black")
      .attr("x1", function (d) {
        return arc.centroid(d)[0] * 2;
      })
      .attr("y1", function (d) {
        return arc.centroid(d)[1] * 2;
      })
      .attr("x2", function (d) {
        return arc.centroid(d)[0] * 2.2;
      })
      .attr("y2", function (d) {
        return arc.centroid(d)[1] * 2.2;
      });

    //绘制连接弧外文字的直线
    arcs.append("line")
      .attr("fill", "#888")
      .style("stroke", "black")
      .each(function (d) {
        d.textLine = {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        };
      })
      .attr("x1", function (d) {
        d.textLine.x1 = arc.centroid(d)[0] * 2.2;
        return d.textLine.x1;
      })
      .attr("y1", function (d) {
        d.textLine.y1 = arc.centroid(d)[1] * 2.2;
        return d.textLine.y1;
      })
      .attr("x2", function (d) {
        // var strLen = getPixelLength(d.data[0], fontsize) * 1.5;
        var strLen = 90;
        var bx = arc.centroid(d)[0] * 2.2;
        d.textLine.x2 = bx >= 0 ? bx + strLen : bx - strLen;
        return d.textLine.x2;
      })
      .attr("y2", function (d) {
        d.textLine.y2 = arc.centroid(d)[1] * 2.2;
        return d.textLine.y2;
      });

    //绘制弧外文字
    arcs.append("text")
      .attr("fill", "#888")
      .attr("transform", function (d) {
        var x = 0;
        var y = 0;
        x = (d.textLine.x1 + d.textLine.x2) / 2;
        y = d.textLine.y1;
        y = y > 0 ? y + fontsize * 1.1 : y - fontsize * 0.4;
        return "translate(" + x + "," + y + ")";
      })
      .style("text-anchor", "middle")
      .style("font-size", fontsize)
      .text(function (d) {
        //计算市场份额的百分比
        var percent = Number(d.value) / d3.sum(dataset, function (d) {
          return d[1];
        }) * 100;
        //保留1位小数点，末尾加一个百分号返回 
        if (percent) {
          return percent.toFixed(1) + "%";
        }
        return "空"

      });




  }

  //第一版面柱状图
  const barOneRender = (list = []) => {

    let height = 210;
    let width = bodyWidth - 20
    var svg = d3.select(dom.window.document.querySelector("#one-two")).attr("width", width).attr("height", height)
    let all_number = list.map(x => {
      return x.number;
    })
    //求得最值和最小值
    let num_max = d3.max(all_number)
    let num_min = d3.min(all_number)
    var padding = {
      top: 0,
      right: 30,
      bottom: 80,
      left: 40
    };
    //x轴宽度
    var xAxisWidth = width - padding.left;

    //y轴宽度
    var yAxisWidth = height - padding.bottom;

    //x轴比例尺
    var xScale = d3.scale.ordinal()
      .domain(d3.range(list.length))
      .rangeRoundBands([0, xAxisWidth], 0.2);

    //y轴比例尺
    var yScale = d3.scale.linear()
      .domain([0, num_max])
      .range([0, yAxisWidth]);
    var rect = svg.append("g").selectAll("rect")
      .data(list) //绑定数据
      .enter() //获取enter部分
      .append("rect") //添加rect元素，使其与绑定数组的长度一致
      .attr("fill", function (d, i) {
        // return color(i)
        return "#8AC0fe"
      }) //设置颜色为steelblue
      .attr("x", function (d, i) { //设置矩形的x坐标
        return padding.left + xScale(i);
      })
      .attr("y", function (d) { //设置矩形的y坐标
        return height - padding.bottom - yScale(d.number);
      })
      .attr("width", xScale.rangeBand()) //设置矩形的宽度
      .attr("height", function (d) { //设置矩形的高度
        return yScale(d.number);
      })
    var text = svg.append("g").selectAll("text")
      .data(list) //绑定数据
      .enter() //获取enter部分
      .append("text") //添加text元素，使其与绑定数组的长度一致
      //  .attr("fill", "white")
      .attr("font-size", "14px")
      .attr("text-anchor", "inherit")
      .attr("textLength", 45)
      .classed("tr-lb", true)
      .attr("x", function (d, i) {
        return padding.left + xScale(i);
      })
      .attr("y", function (d) {
        return height - padding.bottom - 5;
      })
      .attr("dx", xScale.rangeBand() / 2)
      .attr("dy", "1em")
      .text(function (d) {
        return d.name;
      });
    var commasFormatter = d3.format(",.0f")
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat(function (d) {
        // return list[d].name;
        return ""
      })
      .orient("bottom")

    yScale.range([yAxisWidth, 0]);

    var yAxis = d3.svg.axis()
      .scale(yScale)

      .orient("left")

    svg.append("g")
      .attr("class", "tr-lb axis")
      .attr('text-anchor', 'middle')
      .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
      .call(xAxis)

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom - yAxisWidth) + ")")
      .call(yAxis);

  }
  //横状图
  const barHerRender = (list = [], id) => {

    let height = 210;
    let width = bodyWidth - 30
    var svg = d3.select(dom.window.document.querySelector(id)).attr("width", width).attr("height", height)
    let all_number = list.map(x => {
      return x.number;
    })
    //求得最值和最小值
    let num_max = d3.max(all_number)
    let num_min = d3.min(all_number)
    var padding = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 70
    };
    //x轴宽度
    var xAxisWidth = width - padding.left;

    //y轴宽度
    var yAxisWidth = height - padding.left;
    var yScale = d3.scale.ordinal()
      .domain(d3.range(list.length))
      .rangeRoundBands([0, height - 80], 0.2);

    //x轴比例尺
    var xScale = d3.scale.linear()
      .domain([0, num_max])
      .range([0, xAxisWidth]);
    //矩形
    var rect = svg.append("g").selectAll("rect").data(list)
      .enter().append("rect")
      .attr("x", padding.left)
      .attr("y", function (d, i) {
        return yScale(i)
      }).attr("fill", function (d, i) {
        // return color(i)
        return "#eeb693"
      }).attr("width", function (d, i) {
        return xScale(d.number)
      }).attr("height", yScale.rangeBand())
    //横标记
    var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat(function (d, i) {
        // return list[i].name;
        return d
      })
      .orient("bottom")
    svg.append("g")
      .attr("class", "axis")
      .attr('text-anchor', 'middle')

      .attr("transform", "translate(" + padding.left + "," + (height - 80) + ")")
      .call(xAxis)

    // yScale.range([yAxisWidth-10, 0]);

    var yAxis = d3.svg.axis()
      .scale(yScale).tickFormat(function (d, i) {
        // return list[i].name;
        return list[i].name
      })
      .orient("left")

    svg.append("g")
      .attr("class", "axis yaxis")
      .attr("transform", "translate(" + padding.left + "," + (0) + ")")
      .call(yAxis);
    svg.selectAll(".yaxis").selectAll("text").attr('textLength', 60)
  }

  const lineRender = (list = [], id, width = bodyWidth) => {
    let height = 150;
    /* list = [{
        name: "one",
        data: [120, 30, 10, 205]
      },
      {
        name: "two",
        data: [12, 35, 233, 205]
      }
    ]
    let height = 105;
    let width = bodyWidth;
    var svg = d3.select(dom.window.document.querySelector(id)).attr("width", width).attr("height", height)
    //求得最大值
    let all_arr = [];
    list.forEach(x => {
      x.data.forEach(y => {
        all_arr.forEach(y)
      })
    })
    //x轴宽度
    var xAxisWidth = width - 30;
    //y轴宽度
    var yAxisWidth = height - padding.bottom;
      //x轴比例尺
    var xScale = d3.select.linear().domain(d3.range(list.length))
      .rangeRoundBands([0, xAxisWidth], 0.2);
      //y轴比例尺
    var yScale = d3.scale.linear()
    .domain([0, num_max])
    .range([0, yAxisWidth]);

     */
    var svg = d3.select(dom.window.document.querySelector(id)).attr("width", width).attr("height", height)
    var dataset = list
    var lengthMax = d3.max(dataset.map(x => x.gdp.length))
    //外边框
    var padding = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 80
    }
    var max = 0;
    //求得最大值
    for (var i = 0; i < dataset.length; i++) {
      var currGdp = d3.max(dataset[i].gdp, function (d) {
        return d[1]
      })
      if (currGdp > max) {
        max = currGdp
      }
    }
    //x
    var xScale = d3.scale.linear().domain([0, lengthMax - 1]).range([0, width - padding.left - padding.right])
    var yScale = d3.scale.linear().domain([0, max * 1.1]).range([height - padding.top - padding.bottom, 0])
    //直线生成器
    var linePath = d3.svg.line().x(function (d, i) {
      return xScale(i)
    }).y(function (d) {
      return yScale(d[1])
    })
    svg.append("g").selectAll("path").data(dataset)
      .enter()
      .append("path")
      .attr("transform", `translate(${padding.left},${padding.top})`)
      .attr("d", function (d) {
        return linePath(d.gdp)
      })
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr("stroke", function (d, i) {
        return color(i)
      })
    dataset.forEach((x, i) => {
      svg.append("g").selectAll("circle")
        .data(x.gdp)
        .enter()
        .append("circle")
        .attr("r", 2)
        .attr("cx", (d, i) => xScale(d[0]))
        .attr("cy", d => yScale(d[1]))
        .attr("transform", `translate(${padding.left},${padding.top})`)
        .append("text")
        .attr("fill", "while")
        .attr("stroke-width", 1)
        .attr("stroke", function (d) {
          return color(i)
        })
    })

    var xAxis = d3.svg.axis().scale(xScale).ticks(5).tickFormat(d3.format("d")).orient("bottom")
    var yAxis = d3.svg.axis().scale(yScale).orient("left")
    svg.append("g").attr("class", "axis")
      .attr("transform", `translate(${padding.left},${height-padding.bottom})`)
      .call(xAxis)
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${padding.left},${padding.top})`)
      .call(yAxis)
  }
  //第一版面饼状图
  pieOneRender(pie_attatck, "#one-bar")
  //第一版面柱状图
  barOneRender(attack_source, "#one-two")
  //第一版面恒状图
  barHerRender(top_tar_ip, "#one-three")
  //第一版折线图
  lineRender(attack_line, "#one-four")

  // 第二版
  //饼状图
  pieOneRender(pie_alarm, "#two-bar")
  //横状图
  barHerRender(alarm_top_ip, "#two-two")
  //折线图
  lineRender(alarm_line, "#two-three", bodyWidth)

  //第三版
  //饼状图
  pieOneRender([], "#three-bar")
  //横状图
  barHerRender([], "#three-two")
  //折线图
  lineRender([], "#three-three")


  //第四版
  lineRender(index_line, "#four-three")
  pdfHTML = dom.window.document.body.innerHTML
  console.log(dom.window.document.body.innerHTML)
  res.send(dom.window.document.body.innerHTML)
});
module.exports = router;