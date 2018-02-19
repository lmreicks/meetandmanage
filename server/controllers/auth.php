<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;


$app->post('/api/login', function (Request $request, Response $response, array $args) {

    require "logic/validator.php";
    $body = $request->getParsedBody();
    
    #encrypts the inputted password to compare with the stored one
    $email = $body["email"];

    if ($body['password'] == NULL){
        $response->withStatus(400)->withHeader('Content-Type', 'text/html')->write('Password is empty'); 
        return $response;       
    } 

    $userPassword = hash('sha256', $body['password']);

    if ($email == NULL) {
        $response->withStatus(400)->withHeader('Content-Type', 'text/html')->write('Email is empty');        
        return $response; 
    }

    $user = User::where('email', '=', $email)->first();
    //$userdump = json_encode($user);
    //echo var_dump($userdump);

    if ($user->password != $userPassword) {
        $response->withStatus(400)->withHeader('Content-Type', 'text/html')->write('Invalid Username or Password');
        return $response; //switch to bad username or password error code
    }

    $token = hash('sha256', random_int(0,10000));//creates a random token to be stored and given to the user
    $user["remember_token"] = $token;
    $user->save();//saves the newly updated user info to the db
    //echo var_dump($user);

    echo("success");
    $UserToken = array(
        "email" => $email,
        "remember_token" => $token
    );

    $UserToken = json_encode($UserToken);
    $response->write($UserToken);


    // $testvar = validateUser($UserToken);
    // echo($testvar);
    return $response; #returns a unique token consisting of an email and random token
});


