//这部分用于插入页面的代码，这里我们来测试下，在页面中显示echarts的实例。
export const ECHARTS_INSERT_JS = `
(function() {
  //先清空页面
  document.body.innerHTML = '';
  var container = document.createElement('div');
  container.setAttribute('id', 'main');
  container.style.width = '600px';
  container.style.height = ' 400px';
  document.body.appendChild(container);
  var head = document.getElementsByTagName('head')[0];
  var js = document.createElement('script');
  js.src = 'https://cdn.jsdelivr.net/npm/echarts@4.6.0/dist/echarts.min.js';
  head.appendChild(js);
  js.onload = function() {
    //进行操作
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(container);
 
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  };
})();


`;
