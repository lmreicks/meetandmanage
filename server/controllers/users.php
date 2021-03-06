<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use Logic\ErrorList;
use Logic\ModelSerializers\UserSerializer;
use Logic\Errors\ErrorResponse;
use Logic\Errors\StatusCodes;

// /**
// * will return the user associated with the given id
// */
// $app->get('/api/user/{id}', function (Request $request, Response $response, array $args) {
//     $response->getBody()->write("get user");
//     return $response;
// });

/**
* will return all users
*/
$app->get('/api/user', function (Request $request, Response $response, array $args) {
    $users = User::all();
    $serializer = new UserSerializer;

    $apiUsers = $serializer->toApiList($users);

    $response->getBody()->write(json_encode($apiUsers));

    return $response;
});
 

/** takes in 'email', 'password', and 'name' in $body
* returns error if any fields in $body are null
* return auth token if user is successfully made
*/
$app->post('/api/user', function (Request $request, Response $response, array $args){
    $er = new ErrorResponse;
    #user must have timezone ID made in table
    $body = $request->getParsedBody();
    $email = $body['email'];
    $name = $body['name'];

    if ($email == NULL || $name == NULL || $body['password'] == NULL){
        $response = $er($response, StatusCodes::HTTP_BAD_REQUEST, "Invalid username, email or password"); 
        return $response;  
    } // return error if any fields are null

    $testUser = User::where('email','=',$email)->first(); // find any user with new email

    if ($testUser != NULL) {
        $response = $er($response, StatusCodes::HTTP_BAD_REQUEST, "Email already exists");
        return $response;
    } // if email is in database return error saying so

    #this line gets the password from args and encrypts it to store inDB
    $userPassword = hash('sha256', $body['password']);
    $user = new User; // create new user
    
    $user->email = $email;        // set all required fields of new user
    $user->name = $name;          
    $user->password = $userPassword;

    $token = hash('sha256', random_int(0,10000)); // creates a random token to be stored and given to the user
    $user->remember_token = $token;
    $user->save(); // saves the new user into the Users table

    $UserToken = array(
        "accessToken" => $token,
        "User" => $user
    );
    
    $response->write(json_encode($UserToken));

    return $response;
});
