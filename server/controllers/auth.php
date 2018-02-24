<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;

// takes in 'email', 'password' in $body
// returns 400 error 'Invalid Username or Password' if bad login
// returns authorization token otherwise  

$app->post('/api/login', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    #encrypts the inputted password to compare with the stored one
    $email = $body->email;

    if ($body->password == NULL){
        $response->withStatus(400)->write('Invalid Username or Password'); 
        return $response;       
    } 

    $userPassword = hash('sha256', $body->password);

    if ($email == NULL) {
        $response->withStatus(400)->write('Invalid Username or Password');        
        return $response; 
    }

    $user = User::where('email', '=', $email)->first();

    if ($user->password != $userPassword || $user == NULL) {
        $response->withStatus(400)->write('Invalid Username or Password');
        return $response; 
    }

    $token = hash('sha256', random_int(0,1000000) + $userPassword);//creates a random token to be stored and given to the user
    $user->remember_token = $token;
    $user->save();//saves the newly updated user info to the d

    $UserToken = array(
        "accessToken" => $token,
        "user" => $user
    );

    //$UserToken = json_encode($UserToken);
    $response->write(json_encode($UserToken));

    return $response; #returns a unique token consisting of an email and random token
});

