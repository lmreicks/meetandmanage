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
    if ($result != true) return $result; //change to bad username or password error
// echo $email;
  //  echo $userPassword;

    $user = User::where('email', '=', $email)->first();
    
    //$userdump = json_encode($user);
    //echo var_dump($userdump);

    if ($user->password != $userPassword) {
        $response->withStatus(500)->withHeader('Content-Type', 'text/html')->write('Invalid Username or Password');
        return $respone; //switch to bad username or password error code
    }

    // $response->getBody()->write(User::all());

    // echo $user("remember_token");
    $token = hash('sha256', random_int(0,10000));//creates a random token to be stored and given to the user
    $user["remember_token"] = $token;
    $user->save();//saves the newly updated user info to the db
    echo var_dumpI($user);

    $response->write()->json_encode(array(
        "email" => $email,
        "token" => $token
    ));
    return $response;
});

//checks to make sure all of the necessary fields are filled out
function verifyBody($body){
    if ($body["email"] == NULL){
        return false; //return bad email code
    }
    if ($body["password"] == NULL){
        return false; //return bad password code
    }
    return true;
}

