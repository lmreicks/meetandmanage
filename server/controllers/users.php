<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;

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
    $email = $body['email'];
    $name = $body['name'];
    #this line gets the password from args and encrypts it to store inDB
    $userPassword = hash('sha256', $body['password']);
    $user = new User;
    
    $result = verifyBody($body);
    if ($result != true) return false; //return whatever error is given by vB
    
    $user['email'] = $email;
    $user['name'] = $name;
    $user['password'] = $userPassword;

    $res = $user->save();

    echo var_dump($res);

    return $response;
});

function verifyBody($body){
    if ($body["email"] == NULL){
        return false; //return bad email code
    }
    if ($body["password"] == NULL){
        return false; //return bad password code
    }
    if ($body["name"] == NULL) {
        return false; //return bad name code
    }
    return true;
}