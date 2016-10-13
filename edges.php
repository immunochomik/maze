<?php
/**
 * Created by PhpStorm.
 * User: tomek
 * Date: 10/10/16
 * Time: 06:21
 */

$f = fopen('edges.file', 'r');
$arr = [];
while(!feof($f)) {
    $row = array_map('intval', str_split(fgets($f)));
    if(count($row) > 1) {
        $arr [] = $row ;
    }
}
$resp = [
    'data' => $arr,
];
header('Content-Type: application/json');
echo json_encode($resp);