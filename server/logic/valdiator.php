<?php

use Models\User;

function validateUser ($token){

    $token = json_decode($token);
    $user = User::where('email', '=', $token("email"))->first();
    if ($token["remember_token"] == $user["remember_token"]){
        return true;
    }
    return false;

}