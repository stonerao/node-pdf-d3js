var express = require('express');
var router = express.Router();
var d3 = require('d3');
var jsdom = require('jsdom');
const {
  JSDOM
} = jsdom;
var {
  index
} = require("../path.js")

var phantom = require('phantom');
/* GET home page. */


function renderPdf(name) {
  //开始执行
  phantom.create().then(function (ph) {
    //创建一个PDF
    ph.createPage().then(function (page) {
      //打开需要读取页面
      page.open("http://localhost:3000/chart").then(function (status) {
        page.property('viewportSize', {
          width: 595,
          height: 500
        });
        //设置页面为A4大小
        page.property('paperSize', {
          format: 'A4',
        });
        //保存对应位置
        // var url = __dirname + '/' + (+new Date) + 'pdf.pdf'
        var url = index + '/pdf/' + name + '.pdf'
        //开始渲染并且保存
        page.render(url).then(function () {
          //保存成功
          ph.exit();
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
const renderPdfs = (arr) => {
  if (arr.length == 0) {
    return
  }
  setTimeout(x => {
    renderPdf(datasTotal[0])
    datasTotal.splice(0, 1)
    renderPdfs(datasTotal)
  }, 1000)
}
renderPdfs(datasTotal)
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
//生成PDF报表
router.get('/pdf', function (req, res, next) {

});

//抓取该页面
router.get('/chart', function (req, res, next) {
  const dom = new JSDOM(`<!DOCTYPE html>
  <body>  
  <h1>我是PDF2</h1>
  <svg class="svg1"></svg>
  
  <br>
  <h1>我是PDF3</h1>
  <svg class="svg2"></svg>
  
  <br>
  <h1>我是PDF4</h1>
  <svg class="svg3"></svg> 
  <br>
  <h1>我是PDF4</h1>
  <svg class="svg4"></svg>
  <h1 style="position:absolute;bottom:0">我是中文，我不会乱码</h1>
  </body> 
`);
  // console.log(dom.window.document.querySelector("p").textContent);
  var rectHeight = 25;
  
  var svg1 = d3.select(dom.window.document.querySelector(".svg1")).attr('width', 595).attr('height', 600);
  var svg2 = d3.select(dom.window.document.querySelector(".svg2")).attr('width', 595).attr('height', 600);
  var svg3 = d3.select(dom.window.document.querySelector(".svg3")).attr('width', 595).attr('height', 600);
  var svg4 = d3.select(dom.window.document.querySelector(".svg4")).attr('width', 595).attr('height', 600);
  var dataset = [250, 210, 170, 130, 90];
  var dataset1 = [1, 500, 170, 230, 90, 333, 521];
 

  function svgs(SVG) {
    SVG.selectAll("rect")
      .data(dataset1)
      .enter()
      .append("rect")
      .attr("x", 20)
      .attr("y", function (d, i) {
        return i * rectHeight;
      })
      .attr("width", function (d) {
        return d;
      })
      .attr("height", rectHeight - 2)
      .attr("fill", "steelblue");
  }
  svgs(svg1)
  svgs(svg2)
  svgs(svg3)
  svgs(svg4)
  res.send(dom.window.document.body.innerHTML)
});
module.exports = router;