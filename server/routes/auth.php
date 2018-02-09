<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->post('/api/login', function (Request $request, Response $response, array $args) {
    
    require_once('../databases.php');
    $username = $args['username'];
    #encrypts the inputted password to compare with the stored one
    $userPassword = hash('sha256', $args['password']);

    #query which will return user 
    #query which will return stored password
    #$response->getBody()->write($request->getBody());
    return $response;
});

$app->put('/api/newUser', function (Request $request, Response $response, array $args){
    
    require_once('../databases.php');
    $username = $args['username'];
    #this line gets the password from args and encrypts it to store inDB
    $userPassword = hash('sha256', $args['password']);

    #do whatever to place the username in the table
    #do whatever to put encrypted password in DB

});