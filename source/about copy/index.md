---
typora-root-url: 留言板
title: 留言板
date: 2020-04-04 17:57:25
layout: true
---

<html>

<body>
<div id="maindddd" style="width:100%;height:400px;"></div>

 <script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
<script>
		setTimeout(function(){
			(function(){
					var myChart = echarts.init(document.getElementById('maindddd'));
				var option = {
					title : {
						text: '',
						subtext: '',
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: '{a}<br/>{b} : {c} ({d}%)'
					},
					legend: {
						x : 'center',
						y : 'bottom',
						data:['HTML','CSS','Javascript','Node','vue','react','Webpack','Gulp','Python']
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {
								show: true,
								type: ['pie', 'funnel']
							},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					calculable : true,
						series: [{
						name:'熟练度',
						type:'pie',
						radius : [30, 110],
						center : ['50%', '50%'],
						roseType : 'area',
						data:[
							{value:80, name:'HTML'},
							{value:80, name:'CSS'},
							{value:80, name:'Javascript'},
							{value:70, name:'Node'},
							{value:80, name:'vue'},
							{value:30, name:'react'},
							{value:60, name:'Webpack'},
							{value:60, name:'Gulp'},
							{value:20, name:'Python'}
						]
					}]
				};
				myChart.setOption(option);
				})();
		},0)
</script>
</body>
</html>

> 评论出问题可以发邮箱: 1549469775@qq.com！抱歉！