<?php
	require 'lib/LIB_http.php';
	$action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_SPECIAL_CHARS);
	if($action === "bus_lists")
	{
		$file_name = "../json/bus_list.json";
		if(!file_exists($file_name))
		{
			$files = http_get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2Fbustime.html%22%20and%20xpath%20%3D%20%22%2F%2Ftable%22&format=json&diagnostics=true&callback=", $ref = "");
			$files = $files["FILE"];
			file_put_contents($file_name, $files);
		}
		else
			$files = file_get_contents($file_name);
		echo $files;
	}
	else if($action === "get_estimate_routegroup")
	{
		$file_name = "../json/estimate_routegroup.json";
		if(!file_exists($file_name))
		{
			$files = http_get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2Festimate_routegroup.jsp%22%20and%20xpath%20%3D%20%22%2F%2Fa%22&format=json&diagnostics=true&callback=", $ref = "");
			$files = $files["FILE"];
			file_put_contents($file_name, $files);
		}
		else
			$files = file_get_contents($file_name);
		echo $files;
		
	}
	else if((int)$action >= 101101)
	{
		$file_name = "../json/" . $action . ".json";
		if(!file_exists($file_name))
		{
			$files = http_get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2F" . urlencode("estimate_stop.jsp?rid=" . $action) . "%22%20and%20xpath%20%3D%20%22%2F%2Fa%22&format=json&diagnostics=true&callback=", $ref = "");
			$files = $files["FILE"];
			file_put_contents($file_name, $files);
		}
		else
			$files = file_get_contents($file_name);
		echo $files;
	}
	else if(stristr($action, "estimate_route"))
	{
		$action_arr = explode("?", $action);
		$action_count = count($action_arr);
		$file_name = "../json/" . $action_arr[$action_count - 1] . ".json";
		if(!file_exists($file_name))
		{
			$files = http_get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2Festimate_route.jsp%3F".urlencode($action_arr[$action_count - 1])."%22%20and%20xpath%20%3D%20%22%2F%2Fa%22&format=json&diagnostics=true&callback=", $ref = "");
			$files = $files["FILE"];
			file_put_contents($file_name, $files); 
		}
		else
			$files = file_get_contents($file_name);
		echo $files;
	}
	else if((int)$action >= 101)
	{
		$file_name = "../json/" . $action . ".json";
		if(!file_exists($file_name))
		{
			$files = http_get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%20%3D%20%22http%3A%2F%2F117.56.232.115%2FKLBusWeb%2Fpda%2Fschedule%2F" . ($action) . "%22%20and%20xpath%20%3D%20%22%2F%2Ftd%22&format=json&diagnostics=true&callback=", $ref = "");
			$files = $files["FILE"];
			file_put_contents($file_name, $files);
		}
		else
			$files = file_get_contents($file_name);
		echo $files;
	}
	else
	{
		echo "invalid bus number.";
	}
?>