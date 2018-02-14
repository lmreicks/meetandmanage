<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use logic\userCheck;

$app->post('/api/login', function (Request $request, Response $response, array $args) {

    $body = $request->getParsedBody();
    #encrypts the inputted password to compare with the stored one
    $email = $body["email"];
    $userPassword = hash('sha256', $body['password']);

    echo $email;
    echo $userPassword;

    $user = User::where('email', '=', $email)->first();
    
    $userdump = json_encode($user);
    echo var_dump($userdump);

    if ($user->password == $userPassword) {
        echo "Success";
    }
    $response->getBody()->write(User::all());

    return $response.json_encode;
});
