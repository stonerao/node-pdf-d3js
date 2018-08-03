var express = require('express');
var router = express.Router();
var phantom = require('phantom');
var path  = require("../path")
/* GET users listing. */
function phantomJs() {
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
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.render('charts', {
    title: 'get',
    data:JSON.stringify(path.opp)
  }); 
});

module.exports = router;