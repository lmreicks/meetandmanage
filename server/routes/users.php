<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/api/user/{id}', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("get user");
    return $response;
});

$app->get('/api/user', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("get all users");
    return $response;
});

$app->post('/api/user', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("get all users");
    return $response;
});