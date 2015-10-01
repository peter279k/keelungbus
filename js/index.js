$(function() {
	//busTime
	var res = "";
	var count = 1;
	var link = "";
	var bus_number = "";
	var lists = "";
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2Fbustime.html%22&format=json&diagnostics=true&callback=", function(response) {
		//if(response === "")the service is unavailable
		res = response["query"]["results"]["body"]["div"][1]["table"]["tbody"]["tr"];
		for (; count < res.length; count++) {
			link = res[count]["td"]["a"]["href"];
			bus_number = res[count]["td"]["a"]["content"];
			lists += "<li><a href='#' onclick='handle_bus("+bus_number+")'>" + bus_number + "</a></li>";
		}

		$("#bus-time-list").append(lists);
	});
});

function handle_bus(bus_number) {
/*
https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22==your-encode-url==%22&format=json&diagnostics=true&callback=
*/
	$.getJSON("");
}