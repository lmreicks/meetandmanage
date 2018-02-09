<?php
//use these credentials for now. Find out whats wrong with previous author credentials
	$dbhost = "mysql.cs.iastate.edu";
	$dbuser = "dbu309gk5";
	$dbpass = "WC3DCcb5";
	$dbname = "db309gk5";
	$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

	if(mysqli_connect_errno()){
		die("database connection failed:"
			. mysqli_connect_error().
		 " (" . mysqli_connect_errno() . ")");
	} 
?>