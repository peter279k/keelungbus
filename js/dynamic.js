var inter_val = "";
var href_arr = new Array();
$(function() {
	var res = "";
	show_bus_list();
	$(".row").html("");
	$("#dynamic-list").html("");
	$("#show-bus-list").click(function(event) {
		event.preventDefault();
		clearInterval(inter_val);
		show_bus_list();
	});
	
});

function show_bus_list() {
	$("#filterBtn").show();
	$("#filterStop").hide();
	var res = "";
	var bus_arr = new Array();
	$(".row").html("");
	$("#dynamic-list").html("");
	//use ajax async
	$.ajaxSetup({
		async: true
	});
	$.getJSON("../php/get_bus_list.php?action=get_estimate_routegroup", function(response) {
		res = response["query"]["results"]["a"];
		for(var res_count=2;res_count<res.length;res_count++) {
			bus_arr.push(res[res_count]["href"]);
		}

		for(var i=0;i<bus_arr.length;i++) {
			$.getJSON("../php/get_bus_list.php?action=estimate_route_" + bus_arr[i], function(response) {
				res = response["query"]["results"]["a"];
				var temp = '<div class="col-xs-12 col-sm-6 col-md-4"><div class="box">';
				var count = 0;
				for(var res_count=2;res_count<res.length;res_count++) {
					temp += '<button onclick="get_dynamic_info('+ "'" +res[res_count]["href"] + "'" + "," + "'" + res[res_count]["content"] + "'" +')" class="ui-btn"><i class="zmdi zmdi-directions-bus ui-pull-left"></i>'+res[res_count]["content"]+'</button>';
					count += 1;
					if(count % 6 == 0) {
						temp += "</div></div>";
						$(".row").append(temp);
						temp = '<div class="col-xs-12 col-sm-6 col-md-4"><div class="box">';
						count = 0;
					}
					if(res_count == res.length-1 && count % 6 !== 0) {
						temp += "</div></div>";
						$(".row").append(temp);
					}
				}
			});
		}
	});
}

function get_dynamic_info(link, link_content) {
	//即時公車資料(real-time)
	//use ajax sync
	$.ajaxSetup({
		async: false
	});
	$("#filterBtn").hide();
	$("#filterStop").show();
	$(".row").html("");
	//toast
	new $.nd2Toast( {
		// The 'new' keyword is important, otherwise you would overwrite the current toast instance
		message : "載入資料中...", // Required
		action : { // Optional (Defines the action button on the right)
			title : "", // Title of the action button
			link : "", // optional (either link or fn or both must be set to define an action)
			fn : function() { // function that will be triggered when action clicked
				console.log("Action Button clicked'");
			},
			color : "lime" // optional color of the button (default: 'lime')
		},
		ttl : 3000 // optional, time-to-live in ms (default: 3000)
	});
	
	href_arr = new Array();
	$("#dynamic-list").append('<li data-role="list-divider">即時公車動態--' + link_content + '</li>');
	var temp_arr = link.split("=");
	$.getJSON("../php/get_bus_list.php?action=" + temp_arr[1], function(response) {
		res = response["query"]["results"]["a"];
		for(var res_count=2;res_count<res.length;res_count++) {
			if(res_count % 2 == 1)
				continue;
			href_arr.push(res[res_count]["href"]);
			var temp = '<li class="ui-li-static ui-body-inherit">';
			temp += "<h2 id='"+res[res_count]["href"].replace(".", "").replace("&", "").replace("?", "").replace(/=/g, "")+"'>" + res[res_count]["content"] + "</h2>";
			temp += "</li>";
			$("#dynamic-list").append(temp);
		}
		$("#dynamic-list").listview("refresh");
	});
	
	dynamic_info(href_arr);
}

function dynamic_info(href_arr) {
	//toast
	$.ajaxSetup({
		async: true
	});
	setInterval(function() {
		$("h3").remove(".clr-deep-orange");
		new $.nd2Toast( {
			// The 'new' keyword is important, otherwise you would overwrite the current toast instance
			message : "載入資料中...", // Required
			action : { // Optional (Defines the action button on the right)
				title : "", // Title of the action button
				link : "", // optional (either link or fn or both must be set to define an action)
				fn : function() { // function that will be triggered when action clicked
					console.log("Action Button clicked'");
				},
				color : "lime" // optional color of the button (default: 'lime')
			},
			ttl : 3000 // optional, time-to-live in ms (default: 3000)
		});

		for(var res_count=0;res_count<href_arr.length;res_count++) {
			$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2Festimate_result.jsp%3Frid%3D103101%26sid%3D112%22%20and%20xpath%20%3D%20%22%2F%2Ftd%22&format=json&diagnostics=true&callback=", 
				(function(dy_info) {
					return function(response) {
						if(response == null) {
								alert("即時服務暫時無法使用");
						}
						else {
							res = response["query"]["results"]["td"];
							var temp = "<h3 class='clr-deep-orange'>--" + res[2]["content"] + "</h3>";
							$("#" + dy_info.replace(".", "").replace("&", "").replace("?", "").replace(/=/g, "")).append(temp);
							$("#dynamic-list").listview("refresh");
							// create a new closure on the parameter dy_info
							// which will hold the correct value at invocation time
						}
					};
				}(href_arr[res_count])) // calling the function with the current value
			);
		}
	}, 80000);
}
