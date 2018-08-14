var express = require('express');
var router = express.Router();
var phantom = require('phantom');
var path = require("../path")
// 转为unicode 编码
function encodeUnicode(str) {
  var res = [];
  for (var i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
}
/* GET users listing. */
function phantomJs() {
  console.log(phantom)
  phantom.create().then(function (ph) {
    //创建一个PDF
    ph.createPage().then(function (page) {
      //打开需要读取页面
   
      page.open("http://localhost:8083/users").then(function (status) {

        //设置页面为A4大小
        page.property('paperSize', {
          format: 'A4',
        });
        //保存对应位置
        var url = __dirname + '/' + (1) + 'pdf.pdf'
        //开始渲染并且保存 
        console.log(1)
        page.render(url).then(function () {
          //保存成功  
          ph.exit();
        }); 
      });
    });
  });
}
phantomJs()
router.get('/', function (req, res, next) {
  res.render('charts', {
    title: 'get',
    data: encodeUnicode(JSON.stringify(path.opp)),
    attack: [{
        name: "恶意行为",
        value: 1
      },
      {
        name: "攻击场景",
        value: 2
      },
      {
        name: "高级持续威胁",
        value: 3
      }
    ]
  });

});

module.exports = router;