<?php

namespace Logic;

use Models\User;


// this function takes in a user token which is granted during login
// if the token matches the users stored token returns true giving access to 
// restricted areas, else returns false
// !! this should be used before making any restricted http requests such as creating or accessing events
// should route to login if returns false

class RequestValidator {


    public function __invoke($request, $response, $next) {
        #validate user logic
        #if checks out
        #response = next
        #else return error

        $token = $request->getHeader('Authorization');
        $user = User::where('remember_token', '=', $token)->first();
        if ($user !== NULL) {
            $request = $request->withAttribute('user', $user);
            $response = $next($request, $response);
            $body = $response->getBody();
            return $response;
        }
        $uri = $request->getUri();
        $path = $uri->getPath();
        
        if (substr($path, 5) === 'login') {
            $response = $next($request, $response);
            return $response;
        }
        $response->getBody()->write('not loggeed in');
        return $response;
    }
}