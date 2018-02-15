<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/api/user/{id}', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("get user");
    return $response;
});

$app->get('/api/user', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("get all users");
    return $response;
});

$app->post('/api/user', function (Request $request, Response $response, array $args){
    
    #user must have timezone ID made in table
    $body = $request->getParsedBody();
    $username = $body['username'];
    #this line gets the password from args and encrypts it to store inDB
    $userPassword = hash('sha256', $body['password']);
    $user = new User;


    $res = $user->save();
    echo var_dump($val);
    echo var_dump($res);

    #do whatever to place the username in the table
    #do whatever to put encrypted password in DB
    #i changed someting
    return $response;
});
