<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;

$app->post('/api/login', function (Request $request, Response $response, array $args) {

    $body = $request->getParsedBody();
    #encrypts the inputted password to compare with the stored one
    $email = $body["email"];
    $userPassword = hash('sha256', $body['password']);

    $result = verifyBody($body);
    if ($result != true) return false; //change to bad username or password error

    echo $email;
    echo $userPassword;

    $user = User::where('email', '=', $email)->first();
    
    $userdump = json_encode($user);
    echo var_dump($userdump);

    if ($user->password != $userPassword) {
        return false; //switch to bad username or password error code
    }

    $response->getBody()->write(User::all());

    echo $user("remember_token");
    $token = hash('sha256', random_int(0,10000));
    $user["remember_token"] = $token;
    $user->save();
    echo var_dumpI($user);

    return array(
        "email" => $email,
        "token" => $token
    );
});

function verifyBody($body){
    if ($body["email"] == NULL){
        return false; //return bad email code
    }
    if ($body["password"] == NULL){
        return false; //return bad password code
    }
    return true;
}

