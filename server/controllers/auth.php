<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use logic\userCheck;

$app->post('/api/login', function (Request $request, Response $response, array $args) {

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

