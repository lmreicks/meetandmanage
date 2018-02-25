<?php

namespace Logic;

use Models\User;

// this is used before a request that requires the user to be logged in is made
// iff the user is logged in, then a user model is given to the request to make life easier
// if the request is login or user, goes to correct request

class RequestValidator {


    public function __invoke($request, $response, $next) {

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
        
        if (substr($path, 5) === 'login' || substr($path, 5) === 'user') {
            $response = $next($request, $response);
            return $response;
        }
        $response->getBody()->write('not loggeed in');
        return $response;
    }
}