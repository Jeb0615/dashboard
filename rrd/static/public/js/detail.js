var counters = new Array();
$(document).ready(function(){
  var type = getType();
  $("#type-nav").text(type);
	
  //核心指标
	if(type=="mysql"){
		counters = ["port", "memory", "df", "connect_timeout/port=", "Connection_errors_internal/port=", "Max_used_connections/port="];
	}else if(type=="redis"){
		counters = ["port", "memory", "df", "redis.used_memory/port=", "redis.keyspace_hit_ratio/port=", "redis.rejected_connections/port="];
	}else{
		counters = ["port", "memory", "df", "rabbitmq.node.mem_used/name=rabbit@MQ03", "rabbitmq.node.mem_used/name=rabbit@MQ236", "rabbitmq.node.disk_free/name=rabbit@MQ236"];
	}
  //查询集群
  $.get("/api/clusters/"+type, function(data){
  	for(var k=0; k<data.data.length; k++){
  		var cluster_group = data.data[k];
  		var str = "<div class='span12'>";
  		str += "<div id='general-info-widget-" + k + "' class='widget'>";
  		str += "<div class='widget-header'><i class='icon-th'></i> <h3 id='general-info-type-" + k + "'></h3><div id='refresh-type' class='js-refresh-info' title=''></div></div>";
  		str += "<div class='widget-content' style='padding-bottom:-15px;'>";
  		str += "<div class='big-stats-container'>";
  		str += "<div class='widget-content'><div id='big_stats_iter_" + k + "' class='cf big_stats'></div></div>";
  		str += "</div></div></div></div>";
  		$("#row_iter").append(str);
  		
  		$("#general-info-type-" + k).text(cluster_group + "各节点健康度");
  		
  		$.ajax({
        url: "/api/endpoints/group/" + cluster_group,
        type: 'GET',
        async: false,
        dataType: "json",
        success: function (data) {
			    for(var i=0; i<data.data.length; i++){
	            var host = data.data[i];
	            var hostper = "host_"+ k + "_" + i + "_per";
	            var strinner = "<div class='stat'><i class='icon-#'><a onclick='fn_show_charts(\"" + host + "\", \"h\")' title='查看近期数据'>" + host + "</a></i><div id='host_" + k + "_" + i +"_container' width='400px'></div><span class='value odometer' style='font-size:14px' id='"+ hostper +"'></span></div>";
					    $("#big_stats_iter_" + k).append(strinner);
					}
					for(var i=0; i<data.data.length; i++){
							var host = data.data[i];
	            var hostper = "host_"+ k + "_" + i + "_per";
					    $("#host_" + k + "_" + i +"_container").highcharts({
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
	              	$.get("/api/endpoint/avgscore/" + host, function (data){
					    			var point = chart.series[0].points[0];
					        	point.update(data.data);
					    		}, "json");
	              	//var point = chart.series[0].points[0];
	                //point.update(Math.random().toFixed(2)*100);
	              }
	          	});
	            
		    			//显示核心指标值
		    			var cdata = {
		    				endpoint: host,
		    				q: counters,
		    				type: type
		    			};
							$.ajax({
		            url: "/api/endpoint/detail",
		            type: 'POST',
		            data: cdata,
		            async: false,
		            dataType: "json",
		            contentType:"application/x-www-form-urlencoded; charset=UTF-8",
		            success: function (data) {
		            	if(data.ok == true){
		            		$("#" + hostper).empty();
			            	for(var j=0; j<data.data.length; j++){
								    	var rdata = data.data[j];
								    	if(rdata[0] == "port"){
								    		$("#" + hostper).append(rdata[0] + ":" + (rdata[1]==1?"连接正常":"连接失败") + "<br/>");
								    	}else if(rdata[0] == "df"){
								    		for(var t=1; t<rdata.length; t++){
								    			var tdata = rdata[t];
								    			$("#" + hostper).append(tdata[0] + ":" + tdata[1] + "<br/>");
								    		}
								    	}else{
								    		$("#" + hostper).append(rdata[0] + ":" + rdata[1] + "<br/>");
								    	}
								    }
		            	}
		            }
		        	});
	          }
        }
    	});
  		
  	}
  }, "json");
	

});

function fn_show_charts(endpoint, graph_type){
		$.ajax({
      url: "/api/endpoint/detail/charts",
      type: 'POST',
      data: {
	  		endpoint: endpoint,
	  		counters: counters,
	  		graph_type: graph_type,
	  		type: getType()
	  	},
      async: true,
      dataType: "json",
      contentType:"application/x-www-form-urlencoded; charset=UTF-8",
      success: function (data) {
    		if (data.ok) {
            setTimeout(function(){window.open().location="/charts?id="+data.id+"&graph_type="+graph_type;}, 0);
        }else {
            alert("请求出错了");
        }
      }
  	});
	}



