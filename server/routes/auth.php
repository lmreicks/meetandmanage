<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->post('/api/login', function (Request $request, Response $response, array $args) {
    $response->getBody()->write($request->getBody());
    return $response;
});