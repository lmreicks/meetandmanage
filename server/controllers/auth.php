<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use Logic\Errors\ErrorResponse;
use Logic\Errors\StatusCodes;

/** takes in 'email', 'password' in $body
* returns 400 error 'Invalid Username or Password' if bad login
* returns authorization token otherwise  
*/
$app->post('/api/login', function (Request $request, Response $response, array $args) {
    $er = new ErrorResponse;
    $body = json_decode($request->getBody());
    $email = $body->email;

    if ($body->password == NULL){
        $response = $er($response, StatusCodes::HTTP_BAD_REQUEST, "Null password");
        return $response;       
    } 

    $userPassword = hash('sha256', $body->password);

    if ($email == NULL) {
        $response = $er($response, StatusCodes::HTTP_BAD_REQUEST, "Null Email");    
        return $response; 
    }

    $user = User::where('email', '=', $email)->first();

    if ($user->password != $userPassword || $user == NULL) {
        $response= $er($response, StatusCodes::HTTP_BAD_REQUEST, "Incorrect email or passsword");
        return $response; 
    }

    $token = hash('sha256', random_int(0,1000000) + $userPassword);//creates a random token to be stored and given to the user
    $user->remember_token = $token;
    $user->save();

    $UserToken = array(
        "accessToken" => $token,
        "user" => $user
    );

    $response->write(json_encode($UserToken));

    return $response; #returns a unique token consisting of an email and random token
});

