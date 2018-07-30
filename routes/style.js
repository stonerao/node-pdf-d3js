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
    writing-mode: tb-rl
  }
  .tr-lb text{
    writing-mode: tb-rl
  }
</style> 
`