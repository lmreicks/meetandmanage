<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require __DIR__ . '/vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

session_start();

$settings = require __DIR__ . '/settings.php';
$app = new \Slim\App($settings);

$app->get('*', function (Request $request, Response $response, array $args) {
});

// Register routes
require __DIR__ . '/routes/events.php';
require __DIR__ . '/routes/users.php';
require __DIR__ . '/routes/auth.php';

$app->run();

?>
