<?php

use Models\User;


// this function takes in a user token which is granted during login
// if the token matches the users stored token returns true giving access to 
// restricted areas, else returns false
// !! this should be used before making any restricted http requests such as creating or accessing events
// should route to login if returns false
function validateUser ($token){

    $token = (array) json_decode($token);
    $email = $token['email'];
    
    $user = User::where('email', '=', $email)->first();
    if ($token["remember_token"] == $user["remember_token"]){
        return true;
    }
    return false;

}