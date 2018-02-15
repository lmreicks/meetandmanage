<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/api/event/{id}', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("get event");
    return $response;
});

$app->get('/api/event', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("Get all events");
    return $response;
});