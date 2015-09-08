$(function () {  
    
			//mysql
	    $('#mysql_container').highcharts({
		
		    chart: {
		        type: 'gauge',
		        plotBackgroundColor: null,
		        plotBackgroundImage: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        height: 200
		    },
		    
		    title: {
		       text: ''
		    },
		    
		    exporting:{
           enabled: false
        },
        credits: {
           enabled: false
        },
		    
		    pane: {
		    		center: ['50%', '50%'],
						size: '80%',
		        startAngle: -150,
		        endAngle: 150,
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#FFF'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [1, '#FFF']
		                ]
		            },
		            borderWidth: 1,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: '#DDD',
		            borderWidth: 0,
		            outerRadius: '105%',
		            innerRadius: '103%'
		        }]
		    },
		       
		    // the value axis
		    yAxis: {
		        min: 0,
		        max: 100,
		        
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#666',
		
		        tickPixelInterval: 30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#666',
		        labels: {
		            step: 2,
		            rotation: 'auto'
		        },
		        title: {
		            text: '',
                align: 'high'
		        },
		        plotBands: [{
		            from: 0,
		            to: 30,
		            color: '#DF5353' // green
		        }, {
		            from: 30,
		            to: 55,
		            color: '#DDDF0D' // yellow
		        }, {
		            from: 55,
		            to: 100,
		            color: '#55BF3B' // red
		        }]     
		    },
		
		    series: [{
		        name: '健康度',
		        data: [50],
		        tooltip: {
		            valueSuffix: '%'
		        }
		    }]
		
		}, 
		// Add some life
		function (chart) {
			if (!chart.renderer.forExport) {
					$.get("/api/group/avgscore/mysql", function (data){
			    			var point = chart.series[0].points[0];
			        	point.update(data.data);
			    		}, "json");
			    //setInterval(function () {
			    //    $.get("/api/group/avgscore/mysql", function (data){
			    //			var point = chart.series[0].points[0];
			    //   	point.update(data.data);
			    //		}, "json");
					//				
			    //}, 5000);
				
				
			}
		});

		//redis
		$('#redis_container').highcharts({
		
		    chart: {
		        type: 'gauge',
		        plotBackgroundColor: null,
		        plotBackgroundImage: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        height: 200
		    },
		    
		    title: {
		       text: ''
		    },
		    
		    exporting:{
           enabled: false
        },
        credits: {
           enabled: false
        },
        
		    pane: {
		    		center: ['50%', '50%'],
						size: '80%',
		        startAngle: -150,
		        endAngle: 150,
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#FFF'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [1, '#FFF']
		                ]
		            },
		            borderWidth: 1,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: '#DDD',
		            borderWidth: 0,
		            outerRadius: '105%',
		            innerRadius: '103%'
		        }]
		    },
		       
		    // the value axis
		    yAxis: {
		        min: 0,
		        max: 100,
		        
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#666',
		
		        tickPixelInterval: 30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#666',
		        labels: {
		            step: 2,
		            rotation: 'auto'
		        },
		        title: {
		            text: ''
		        },
		        plotBands: [{
		            from: 0,
		            to: 30,
		            color: '#DF5353' // green
		        }, {
		            from: 30,
		            to: 55,
		            color: '#DDDF0D' // yellow
		        }, {
		            from: 55,
		            to: 100,
		            color: '#55BF3B' // red
		        }] 
		    },
		
		    series: [{
		        name: '健康度',
		        data: [50],
		        tooltip: {
		            valueSuffix: '%'
		        }
		    }]
		
		}, 
		// Add some life
		function (chart) {
			if (!chart.renderer.forExport) {
				$.get("/api/group/avgscore/redis", function (data){
			    			var point = chart.series[0].points[0];
			        	point.update(data.data);
			    		}, "json");
			    //setInterval(function () {
			    //		$.get("/api/group/avgscore/redis", function (data){
			    //			var point = chart.series[0].points[0];
			    //    	point.update(data.data);
			    //		}, "json");
			    //}, 5000);
				
				
			}
		});

		//rabbitmq
		$('#rabbitmq_container').highcharts({
		
		    chart: {
		        type: 'gauge',
		        plotBackgroundColor: null,
		        plotBackgroundImage: null,
		        plotBorderWidth: 0,
		        plotShadow: false,
		        height: 200
		    },
		    
		    title: {
		       text: ''
		    },
		    
		    exporting:{
           enabled: false
        },
        credits: {
           enabled: false
        },
		    
		    pane: {
		    		center: ['50%', '50%'],
						size: '80%',
		        startAngle: -150,
		        endAngle: 150,
		        background: [{
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#FFF'],
		                    [1, '#333']
		                ]
		            },
		            borderWidth: 0,
		            outerRadius: '109%'
		        }, {
		            backgroundColor: {
		                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
		                stops: [
		                    [0, '#333'],
		                    [1, '#FFF']
		                ]
		            },
		            borderWidth: 1,
		            outerRadius: '107%'
		        }, {
		            // default background
		        }, {
		            backgroundColor: '#DDD',
		            borderWidth: 0,
		            outerRadius: '105%',
		            innerRadius: '103%'
		        }]
		    },
		       
		    // the value axis
		    yAxis: {
		        min: 0,
		        max: 100,
		        
		        minorTickInterval: 'auto',
		        minorTickWidth: 1,
		        minorTickLength: 10,
		        minorTickPosition: 'inside',
		        minorTickColor: '#666',
		
		        tickPixelInterval: 30,
		        tickWidth: 2,
		        tickPosition: 'inside',
		        tickLength: 10,
		        tickColor: '#666',
		        labels: {
		            step: 2,
		            rotation: 'auto'
		        },
		        title: {
		            text: ''
		        },
		        plotBands: [{
		            from: 0,
		            to: 30,
		            color: '#DF5353' // green
		        }, {
		            from: 30,
		            to: 55,
		            color: '#DDDF0D' // yellow
		        }, {
		            from: 55,
		            to: 100,
		            color: '#55BF3B' // red
		        }]     
		    },
		
		    series: [{
		        name: '健康度',
		        data: [50],
		        tooltip: {
		            valueSuffix: '%'
		        }
		    }]
		
		}, 
		// Add some life
		function (chart) {
			if (!chart.renderer.forExport) {
					$.get("/api/group/avgscore/rabbitmq", function (data){
			    			var point = chart.series[0].points[0];
			        	point.update(data.data);
			    		}, "json");
			   //setInterval(function () {
			   //   $.get("/api/group/avgscore/rabbitmq", function (data){
			   //		var point = chart.series[0].points[0];
			   //  	point.update(data.data);
			   //	}, "json");
				 //
			   // }, 5000);
				
				
			}
		});
		
		require.config({
        paths: {
            echarts: 'static/echarts'
        }
    });    
		// echarts gauge
  	require(
      [
      		'echarts',
          'echarts/chart/gauge'
      ],
      function (ec) {
      	drawMysqlCharts(ec);
      	drawRedisCharts(ec);
      	drawMQCharts(ec);
      }
    );
			  	
});


function drawMysqlCharts(ec){
	$.get("/api/endpoints/mysql-cluster", function(data){
	  for(var i=0; i<data.data.length; i++){
	  	var cluster_group = data.data[i];
	  	
	  	//mysql=cluster
	  	//第一行
	  	$("#mysql_container").after("<div id='mysql_iter_" + i + "_1' class='cf big_stats'></div>");
	  	var mysql_iter_1_str = "";
	    mysql_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>集群</i><div style='height:70px' class='value odometer' id='mysql_iter_" + i + "_1_1'></div></div>";
	    mysql_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>内存</i><div style='height:70px' class='value odometer' id='mysql_iter_" + i + "_1_2'></div></div>";
	    mysql_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>硬盘</i><div style='height:70px' class='value odometer' id='mysql_iter_" + i + "_1_3'></div></div>";
	    $("#mysql_iter_" + i + "_1").append(mysql_iter_1_str);
	    
	    //第二行
	    $("#mysql_iter_" + i + "_1").after("<div id='mysql_iter_" + i + "_2' class='cf big_stats'></div>");
			var mysql_iter_2_str = "";
			mysql_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标1</i><div style='height:70px' class='value odometer' id='mysql_iter_" + i +"_2_1'></div></div>";
			mysql_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标2</i><div style='height:70px' class='value odometer' id='mysql_iter_" + i +"_2_2'></div></div>";
			mysql_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标3</i><div style='height:70px' class='value odometer' id='mysql_iter_" + i +"_2_3'></div></div>";
	    $("#mysql_iter_" + i + "_2").append(mysql_iter_2_str);

			// 基于准备好的dom，初始化echarts图表
		  var agentItem = ["groupscore", "memscore", "dfscore"];
		  for(var k = 1; k<4; k++){
		  	var did = "mysql_iter_" + i +"_1_" + k;
		  	var myChart = ec.init(document.getElementById(did));
		  	var option = {
			    tooltip : {
			        formatter: "{a} {b} : {c}%",
			        textStyle: {
			        	fontSize: 10
			        }
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
			        {
			            name:'健康度',
			            type:'gauge',
			            startAngle: 180,
			            endAngle: 0,
			            center : ['50%', '90%'],    // 默认全局居中
			            splitNumber: 5,   
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10         // 属性length控制线长
			            },
			            radius : 55,
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                		color: [[0.2, '#DF5353'],[0.6, '#DDDF0D'],[1, '#55BF3B']], 
			                    width: 35
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 5,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                margin: 0,
			                clickable: true,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'gray',
			                    fontSize: 10,
			                    align: 'right',
			                    baseline: 'bottom'
			                }
			            },
			            pointer: {
			                width:12,
			                length: '90%',
			                color: 'rgba(255, 255, 255, 0.7)'
			            },
			            title : {
			                show : true,
			                offsetCenter: [0, '-40%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: '#fff',
			                    fontSize: 12
			                }
			            },
			            detail : {
			                show : true,
			                backgroundColor: 'rgba(0,0,0,0)',
			                borderWidth: 0,
			                borderColor: '#ccc',
			                width: 80,
			                height: 30,
			                offsetCenter: [0, -20],       // x, y，单位px
			                formatter:'{value}%',
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                			color: '#000',
				                    fontSize : 14
				                }
				            },
				            data:[{value: 50, name: ''}]
				        }
				    ]
				};
				$.ajax({
          type : "GET",  
          url : "/api/endpoints/" + agentItem[k-1] + "/" + cluster_group, 
          dataType: "json",
          async : false,  
          success : function(data){  
            option.series[0].data[0].value = data.data[0];
					  myChart.setOption(option,true);
          }  
        });
			        
		  }
  
			var p = ["Qcache_free_memory/port=", "Aborted_connects/port=", "Com_alter_user/port="];
			//业务指标 score
			for(var j=0; j<p.length; j++){
				var ct = p[j];
		  	var cid = "mysql_iter_" + i +"_2_" + (j+1);
		  	var myChart = ec.init(document.getElementById(cid));
		  	var option2 = {
			    tooltip : {
			        //formatter: "{a} <br/>{b} : {c}%"
			        formatter: null
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
			        {
			            name:'健康度',
			            type:'gauge',
			            startAngle: 180,
			            endAngle: 0,
			            center : ['50%', '90%'],    // 默认全局居中
			            splitNumber: 5,   
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10         // 属性length控制线长
			            },
			            radius : 55,
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                		color: [[0.2, '#DF5353'],[0.6, '#DDDF0D'],[1, '#55BF3B']], 
			                    width: 35
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 5,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                margin: 0,
			                clickable: true,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'gray',
			                    fontSize: 10,
			                    align: 'right',
			                    baseline: 'bottom'
			                }
			            },
			            pointer: {
			                width:12,
			                length: '90%',
			                color: 'rgba(255, 255, 255, 0.7)'
			            },
			            title : {
			                show : true,
			                offsetCenter: [0, '-50%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: '#fff',
			                    fontSize: 10
			                }
			            },
			            detail : {
			                show : true,
			                backgroundColor: 'rgba(0,0,0,0)',
			                borderWidth: 0,
			                borderColor: '#ccc',
			                width: 80,
			                height: 30,
			                offsetCenter: [0, -20],       // x, y，单位px
			                formatter:'{value}%',
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                			color: '#000',
				                    fontSize : 14
				                }
				            },
				            data:[{value: 50, name: ''}]
				        }
				    ]
				};
				
				$.ajax({
          type : "POST",  
          url : "/api/endpoints/counterscore",  
          data : {
          	"cluster": cluster_group, 
          	"counter": ct
          },
          dataType: "json",
          async : false,  
          success : function(data){  
            option.series[0].data[0].value = data.data[0];
					  myChart.setOption(option,true);
          }  
        });
			}
	    
	  }
	}, "json");
  
          
}

function drawRedisCharts(ec){
	$.get("/api/endpoints/redis-cluster", function(data){
	  for(var i=0; i<data.data.length; i++){
	  	var cluster_group = data.data[i];
	  	
	  	//mysql=cluster
	  	//第一行
	  	$("#redis_container").after("<div id='redis_iter_" + i + "_1' class='cf big_stats'></div>");
	  	var redis_iter_1_str = "";
	    redis_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>集群</i><div style='height:70px' class='value odometer' id='redis_iter_" + i + "_1_1'></div></div>";
	    redis_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>内存</i><div style='height:70px' class='value odometer' id='redis_iter_" + i + "_1_2'></div></div>";
	    redis_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>硬盘</i><div style='height:70px' class='value odometer' id='redis_iter_" + i + "_1_3'></div></div>";
	    $("#redis_iter_" + i + "_1").append(redis_iter_1_str);
	    
	    //第二行
	    $("#redis_iter_" + i + "_1").after("<div id='redis_iter_" + i + "_2' class='cf big_stats'></div>");
			var redis_iter_2_str = "";
			redis_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标1</i><div style='height:70px' class='value odometer' id='redis_iter_" + i +"_2_1'></div></div>";
			redis_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标2</i><div style='height:70px' class='value odometer' id='redis_iter_" + i +"_2_2'></div></div>";
			redis_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标3</i><div style='height:70px' class='value odometer' id='redis_iter_" + i +"_2_3'></div></div>";
	    $("#redis_iter_" + i + "_2").append(redis_iter_2_str);
	    

			// 基于准备好的dom，初始化echarts图表
		  var agentItem = ["groupscore", "memscore", "dfscore"];
		  for(var k = 1; k<4; k++){
		  	var did = "redis_iter_" + i +"_1_" + k;
		  	var myChart = ec.init(document.getElementById(did));
		  	var option = {
			    tooltip : {
			        formatter: "{a} {b} : {c}%",
			        textStyle: {
			        	fontSize: 10
			        }
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
			        {
			            name:'健康度',
			            type:'gauge',
			            startAngle: 180,
			            endAngle: 0,
			            center : ['50%', '90%'],    // 默认全局居中
			            splitNumber: 5,   
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10         // 属性length控制线长
			            },
			            radius : 55,
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                		color: [[0.2, '#DF5353'],[0.6, '#DDDF0D'],[1, '#55BF3B']], 
			                    width: 35
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 5,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                margin: 0,
			                clickable: true,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'gray',
			                    fontSize: 10,
			                    align: 'right',
			                    baseline: 'bottom'
			                }
			            },
			            pointer: {
			                width:12,
			                length: '90%',
			                color: 'rgba(255, 255, 255, 0.7)'
			            },
			            title : {
			                show : true,
			                offsetCenter: [0, '-40%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: '#fff',
			                    fontSize: 12
			                }
			            },
			            detail : {
			                show : true,
			                backgroundColor: 'rgba(0,0,0,0)',
			                borderWidth: 0,
			                borderColor: '#ccc',
			                width: 80,
			                height: 30,
			                offsetCenter: [0, -20],       // x, y，单位px
			                formatter:'{value}%',
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                			color: '#000',
				                    fontSize : 14
				                }
				            },
				            data:[{value: 50, name: ''}]
				        }
				    ]
				};
				$.ajax({
          type : "GET",  
          url : "/api/endpoints/" + agentItem[k-1] + "/" + cluster_group, 
          dataType: "json",
          async : false,  
          success : function(data){  
            option.series[0].data[0].value = data.data[0];
					  myChart.setOption(option,true);
          }  
        });
			        
		  }
  
			var p = ["redis.used_memory/port=", "redis.keyspace_hit_ratio/port=", "redis.rejected_connections/port="];
			//业务指标 score
			for(var j=0; j<p.length; j++){
				var ct = p[j];
		  	var cid = "redis_iter_" + i +"_2_" + (j+1);
		  	var myChart = ec.init(document.getElementById(cid));
		  	var option2 = {
			    tooltip : {
			        //formatter: "{a} <br/>{b} : {c}%"
			        formatter: null
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
			        {
			            name:'健康度',
			            type:'gauge',
			            startAngle: 180,
			            endAngle: 0,
			            center : ['50%', '90%'],    // 默认全局居中
			            splitNumber: 5,   
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10         // 属性length控制线长
			            },
			            radius : 55,
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                		color: [[0.2, '#DF5353'],[0.6, '#DDDF0D'],[1, '#55BF3B']], 
			                    width: 35
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 5,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                margin: 0,
			                clickable: true,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'gray',
			                    fontSize: 10,
			                    align: 'right',
			                    baseline: 'bottom'
			                }
			            },
			            pointer: {
			                width:12,
			                length: '90%',
			                color: 'rgba(255, 255, 255, 0.7)'
			            },
			            title : {
			                show : true,
			                offsetCenter: [0, '-50%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: '#fff',
			                    fontSize: 10
			                }
			            },
			            detail : {
			                show : true,
			                backgroundColor: 'rgba(0,0,0,0)',
			                borderWidth: 0,
			                borderColor: '#ccc',
			                width: 80,
			                height: 30,
			                offsetCenter: [0, -20],       // x, y，单位px
			                formatter:'{value}%',
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                			color: '#000',
				                    fontSize : 14
				                }
				            },
				            data:[{value: 50, name: ''}]
				        }
				    ]
				};
				
				$.ajax({
          type : "POST",  
          url : "/api/endpoints/counterscore",  
          data : {
          	"cluster": cluster_group, 
          	"counter": ct
          },
          dataType: "json",
          async : false,  
          success : function(data){  
            option.series[0].data[0].value = data.data[0];
					  myChart.setOption(option,true);
          }  
        });
			}
	    
	  }
	}, "json");
  
          
}


function drawMQCharts(ec){
	$.get("/api/endpoints/rabbitmq-cluster", function(data){
	  for(var i=0; i<data.data.length; i++){
	  	var cluster_group = data.data[i];
	  	
	  	//rabbitmq-cluster
	  	//第一行
	  	$("#rabbitmq_container").after("<div id='rabbitmq_iter_" + i + "_1' class='cf big_stats'></div>");
	  	var rabbitmq_iter_1_str = "";
	    rabbitmq_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>集群</i><div style='height:70px' class='value odometer' id='rabbitmq_iter_" + i + "_1_1'></div></div>";
	    rabbitmq_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>内存</i><div style='height:70px' class='value odometer' id='rabbitmq_iter_" + i + "_1_2'></div></div>";
	    rabbitmq_iter_1_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>硬盘</i><div style='height:70px' class='value odometer' id='rabbitmq_iter_" + i + "_1_3'></div></div>";
	    $("#rabbitmq_iter_" + i + "_1").append(rabbitmq_iter_1_str);
	    
	    //第二行
	    $("#rabbitmq_iter_" + i + "_1").after("<div id='rabbitmq_iter_" + i + "_2' class='cf big_stats'></div>");
			var rabbitmq_iter_2_str = "";
			rabbitmq_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标1</i><div style='height:70px' class='value odometer' id='rabbitmq_iter_" + i +"_2_1'></div></div>";
			rabbitmq_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标2</i><div style='height:70px' class='value odometer' id='rabbitmq_iter_" + i +"_2_2'></div></div>";
			rabbitmq_iter_2_str += "<div class='stat'><i class='icon-#' style='font-size:14px;'>指标3</i><div style='height:70px' class='value odometer' id='rabbitmq_iter_" + i +"_2_3'></div></div>";
	    $("#rabbitmq_iter_" + i + "_2").append(rabbitmq_iter_2_str);

			// 基于准备好的dom，初始化echarts图表
		  var agentItem = ["groupscore", "memscore", "dfscore"];
		  for(var k = 1; k<4; k++){
		  	var did = "rabbitmq_iter_" + i +"_1_" + k;
		  	var myChart = ec.init(document.getElementById(did));
		  	var option = {
			    tooltip : {
			        formatter: "{a} {b} : {c}%",
			        textStyle: {
			        	fontSize: 10
			        }
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
			        {
			            name:'健康度',
			            type:'gauge',
			            startAngle: 180,
			            endAngle: 0,
			            center : ['50%', '90%'],    // 默认全局居中
			            splitNumber: 5,   
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10         // 属性length控制线长
			            },
			            radius : 55,
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                		color: [[0.2, '#DF5353'],[0.6, '#DDDF0D'],[1, '#55BF3B']], 
			                    width: 35
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 5,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                margin: 0,
			                clickable: true,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'gray',
			                    fontSize: 10,
			                    align: 'right',
			                    baseline: 'bottom'
			                }
			            },
			            pointer: {
			                width:12,
			                length: '90%',
			                color: 'rgba(255, 255, 255, 0.7)'
			            },
			            title : {
			                show : true,
			                offsetCenter: [0, '-40%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: '#fff',
			                    fontSize: 12
			                }
			            },
			            detail : {
			                show : true,
			                backgroundColor: 'rgba(0,0,0,0)',
			                borderWidth: 0,
			                borderColor: '#ccc',
			                width: 80,
			                height: 30,
			                offsetCenter: [0, -20],       // x, y，单位px
			                formatter:'{value}%',
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                			color: '#000',
				                    fontSize : 14
				                }
				            },
				            data:[{value: 50, name: ''}]
				        }
				    ]
				};
				$.ajax({
          type : "GET",  
          url : "/api/endpoints/" + agentItem[k-1] + "/" + cluster_group, 
          dataType: "json",
          async : false,  
          success : function(data){  
            option.series[0].data[0].value = data.data[0];
					  myChart.setOption(option,true);
          }
        });
			        
		  }
  		
  		var p = ["rabbitmq.node.mem_used/name=rabbit@MQ03", "rabbitmq.node.mem_used/name=rabbit@MQ236", "rabbitmq.node.disk_free/name=rabbit@MQ236"];
			//业务指标 score
			for(var j=0; j<p.length; j++){
				var ct = p[j];
		  	var cid = "rabbitmq_iter_" + i +"_2_" + (j+1);
		  	var myChart = ec.init(document.getElementById(cid));
		  	var option2 = {
			    tooltip : {
			        //formatter: "{a} <br/>{b} : {c}%"
			        formatter: null
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
			        {
			            name:'健康度',
			            type:'gauge',
			            startAngle: 180,
			            endAngle: 0,
			            center : ['50%', '90%'],    // 默认全局居中
			            splitNumber: 5,   
			            splitLine: {           // 分隔线
			                show: true,        // 默认显示，属性show控制显示与否
			                length :10         // 属性length控制线长
			            },
			            radius : 55,
			            axisLine: {            // 坐标轴线
			                lineStyle: {       // 属性lineStyle控制线条样式
			                		color: [[0.2, '#DF5353'],[0.6, '#DDDF0D'],[1, '#55BF3B']], 
			                    width: 35
			                }
			            },
			            axisTick: {            // 坐标轴小标记
			                splitNumber: 5,   // 每份split细分多少段
			                length :5,        // 属性length控制线长
			            },
			            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
			                margin: 0,
			                clickable: true,
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: 'gray',
			                    fontSize: 10,
			                    align: 'right',
			                    baseline: 'bottom'
			                }
			            },
			            pointer: {
			                width:12,
			                length: '90%',
			                color: 'rgba(255, 255, 255, 0.7)'
			            },
			            title : {
			                show : true,
			                offsetCenter: [0, '-50%'],       // x, y，单位px
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                    color: '#fff',
			                    fontSize: 10
			                }
			            },
			            detail : {
			                show : true,
			                backgroundColor: 'rgba(0,0,0,0)',
			                borderWidth: 0,
			                borderColor: '#ccc',
			                width: 80,
			                height: 30,
			                offsetCenter: [0, -20],       // x, y，单位px
			                formatter:'{value}%',
			                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
			                			color: '#000',
				                    fontSize : 14
				                }
				            },
				            data:[{value: 50, name: ''}]
				        }
				    ]
				};
				
				$.ajax({
          type : "POST",  
          url : "/api/endpoints/counterscoreNp",  
          data : {
          	"cluster": cluster_group, 
          	"counter": ct
          },
          dataType: "json",
          async : false,  
          success : function(data){  
            option.series[0].data[0].value = data.data[0];
					  myChart.setOption(option,true);
          }  
        });
			}
			
	    
	  }
	}, "json");
  
          
}
