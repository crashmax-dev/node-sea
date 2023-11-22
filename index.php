<?php

$user_id = $_GET["id"] ?? "1";
$output = shell_exec("./bin $user_id");
echo "<h1>$output</h1>";
