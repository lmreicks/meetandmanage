<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/api/events', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("Hello, World");
    echo file_get_contents(__DIR__ . '/index.html');
    return $response;
});

$app->get('/api', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("Hello, World");
    return $response;
});
