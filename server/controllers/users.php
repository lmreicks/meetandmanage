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


// takes in 'email', 'password', and 'name' in $body
// returns error if any fields in $body are null
// return auth token if user is successfully made
$app->post('/api/user', function (Request $request, Response $response, array $args){
    
    #user must have timezone ID made in table
    $body = $request->getParsedBody();
    $email = $body['email'];
    $name = $body['name'];

    if ($email == NULL || $name == NULL || $body['password'] == NULL){
        $response->withStatus(400)->withHeader('Content-Type', 'text/html')->write('Invalid Name, Email or Password'); 
        return $response;  
    } // return error if any fields are null

    $testUser = User::where('email','=',$email)->first(); // find any user with new email

    if ($testUser != NULL) {
        $response->withStatus(400)->withHeader('Content-Type', 'text/html')->write('Email already exists');
        return $response;
    } // if email is in database return error saying so

    #this line gets the password from args and encrypts it to store inDB
    $userPassword = hash('sha256', $body['password']);
    $user = new User; // create new user
    
    $user['email'] = $email;        // set all required fields of new user
    $user['name'] = $name;          
    $user['password'] = $userPassword;

    $token = hash('sha256', random_int(0,10000)); // creates a random token to be stored and given to the user
    $user["remember_token"] = $token;
    $user->save(); // saves the new user into the Users table

    $UserToken = array(
        "email" => $email,
        "remember_token" => $token
    );

    $UserToken = json_encode($UserToken);
    $response->write($UserToken);

    return $response;
});
