$(function() {
	//busTime
	var res = "";
	var bus_number = "";
	var temp_str = "";
	var res_table = "";
	var temp_table = "";
	var url = "";
	var bus_arr = new Array();
	$("#borders").html("");
	$.getJSON("php/get_bus_list.php?action=bus_lists", function(response) {
		//if(response === "")the service is unavailable
		res = response["query"]["results"]["table"]["tbody"]["tr"];
		for (var i = 1;i< res.length;i++) {
			bus_number = res[i]["td"]["a"]["content"] + ".html";
			bus_arr.push(bus_number);
		}
		
		//101
		url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2Fschedule%2F" + (bus_arr[0]) + "%22%20and%20xpath%20%3D%20%22%2F%2Ftd%22&format=json&diagnostics=true&callback=";
		$.getJSON("php/get_bus_list.php?action=" + bus_arr[0], function(response) {
			res = response["query"]["results"]["td"];
			res_table = res;
			temp_str = '<div data-role="collapsible" data-filtertext="'+res_table[1]+'" data-inset="false">';
			temp_str += "<h4>"+res_table[1]+"</h4>";
			for(var res_count = 0;res_count < res_table.length;res_count++) {
				if(res_count == 3 || res_count == 8) {
					temp_table = res_table[res_count]["table"]["tbody"]["tr"];
					for(var temp_count = 0;temp_count < temp_table.length;temp_count++) {
						temp_str += "<p class='clr-brown'>" + temp_table[temp_count]["td"] + "</p>";
					}
				}
				else
					temp_str += "<p class='clr-brown'>" + res_table[res_count] + "</p>";
			}
			
			temp_str += "</div></ul></div>";
			$("#borders").append(temp_str);
		});
		
		for(var i=1;i<bus_arr.length;i++) {
			url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2Fschedule%2F" + (bus_arr[i]) + "%22%20and%20xpath%20%3D%20%22%2F%2Ftd%22&format=json&diagnostics=true&callback=";
			$.getJSON("php/get_bus_list.php?action=" + bus_arr[i], function(response) {
				res = response["query"]["results"]["td"];
				temp_str = '<div data-role="collapsible" data-filtertext="'+res[1]["content"]+'" data-inset="false">';
				temp_str += "<h4>"+res[1]["content"]+"</h4>";
				if(i == 0) {
					
				}
				else {
					for(var count = 0;count < res.length;count++) {
						if(res[count]["content"] != undefined) {
							temp_str += "<p class='clr-brown'>" + res[count]["content"] + "</p>";
						}
						else {
							res_table = res[count]["table"]["tbody"]["tr"];
							for(var res_count = 0;res_count < res_table.length;res_count++) {
								temp_str += "<p class='clr-brown'>" + res_table[res_count]["td"]["content"] + "</p>";
							}
						}
					}
				}

				temp_str += "</div></ul></div>";
				$("#borders").append(temp_str);
				$("#borders").collapsibleset('refresh');
			});
		}
	});
});