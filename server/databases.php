
<?php 
	//query
	$query = "SELECT * FROM `users`";
	//$query .= "WHERE id = 2";
	//returns as a "collection"
	$result = mysqli_query($connection, $query);
	if(!$result){
		die("database query failed");
	}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Database Call</title>
	</head>
	<body>
		<?php
			//while bring back and assign
			//array ptrs, may to increment
			while($row = mysqli_fetch_row($result)){
				var_dump($row);
				echo "<br>";
			}
		?>
		<?php
		mysqli_free_result($result);
		?>
	</body>
</html>

<?php
	mysqli_close($connection);
?>