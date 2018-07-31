module.exports = `
<style>
  *{
    margin:0;
    padding:0;
  }
  body{
    width:550px;
    padding:28px;
    margin:0 auto;
  }
  .title{
    color:#4990e1
  }
  .while-c{
    color:#fff;
  }
  .list-head{
    overflow:hidden;
    margin-top:20px;
    margin-bottom:15px;
  }
  .list-head>div{
    width:130px;
    height:50px;
    text-align:center;
    border-radius:3px;
    float:left;
    font-weight: 600;
    margin-right:10px;
    display:inline-block;
  }
  .list-head>div:last-child{
    margin-right:0;
  }

  .list-head--2{
    overflow:hidden;
    margin-top:20px;
   
  }
  .list-head--2>div{ 
    margin-bottom:15px;
    width:176px;
    height:50px;
    text-align:center;
    border-radius:3px;
    float:left;
    font-weight: 600;
    margin-right:10px;
    display:inline-block;
  }
  .list-head--2>div:nth-child(3n){
    margin-right:0;
  }
  .minor-title{
    color:#4990e1;
    line-height:40px;
  }
  .bar-text{
      font-size:12px;
  }
  .border{
      width:100%;
      border-bottom:1px solid #e2effa
  }
  svg{
      margin-bottom:20px;
  }
  .flex-2{
    overflow:hidden;
  }
  .flex-2>div{
    display:inline-block;
    width:50%;
    float:left;
  }
  .tick text{
      font-size:12px;
  }
  .axis path, .axis line{
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
  }
  .tr-lb{
    writing-mode: tb-rl;
    textLength:600
  }
  .tr-lb text{
    writing-mode: tb-rl
  }
  .border-isolation{ 
    border-bottom:17px solid #ebf6fb;
    margin-bottom:40px;
  }
  .color-cs{
    color:#feb236
  }
  .color-hs{
    color:#fe627a
  }
  .color-ls{
    color:#4990e1
  }
  .four-head{
    overflow:hidden;
  }
  .four-head>div{
    display:inline-block;
    float:left;
    margin-top:25px;
    margin-bottom:20px;
  }
  .four-head-grade{
    width:102px;
    height:102px;
    border-radius:4px;
    color:#fff;
    background:#4990e1;
    text-align:center;
    margin-right:20px;
  }
  .four-head-grade-1{
    font-size:52px;
    line-height:75px;
    border-bottom:1px solid #fff;
  }
  .four-head-text{
    line-height:25px;
    font-size:14px;
  }
  .four-head-list{
    font-size:14px;
    line-height:24px;
  }
  .four-head-list>div{
    margin-bottom:3px;
  }
  .m-t-10{
    margin-top:10px;
  }
  .m-b-10{
    margin-top:10px;
  }
</style> 
`