<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use logic\userCheck;

$app->post('/api/login', function (Request $request, Response $response, array $args) {
    
    require_once('./logic/dbconnect.php');
    $body = $request->getParsedBody();
    #encrypts the inputted password to compare with the stored one
    $username = $body["username"];
    $userPassword = hash('sha256', $body['password']);

    echo $username;
    echo $userPassword;

    $user = User::where('name', '=', $username)->first();

    if ($user->password == $userPassword) {
        echo "Success";
    }
    $response->getBody()->write(User::all());

    #query which will return user 
    #query which will return stored password
    #$response->getBody()->write($request->getBody());

    return $response;
});

$app->post('/api/user', function (Request $request, Response $response, array $args){
    
    require_once('./logic/dbconnect.php');
    $body = $request->getParsedBody();
    $username = $body['username'];
    #this line gets the password from args and encrypts it to store inDB
    $userPassword = hash('sha256', $body['password']);
    $user = new User;

    $val = $user->validate($body);

    $res = $user->save();
    echo var_dump($val);
    echo var_dump($res);

    #do whatever to place the username in the table
    #do whatever to put encrypted password in DB
    #i changed someting
    return $response;
});