<?php

namespace App;

//error_reporting(E_ALL);
//ini_set('display_errors', '1');

require __DIR__ . '/vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

session_start();

$settings = require __DIR__ . '/settings.php';
$app = new \Slim\App($settings);

$app->add(new \Logic\RequestValidator());

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
    'driver' => 'mysql',
    'host' => 'mysql.cs.iastate.edu',
    'database' => 'db309gk5',
    'username' => 'dbu309gk5',
    'password' => 'WC3DCcb5',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

// Set the event dispatcher used by Eloquent models... (optional)
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
$capsule->setEventDispatcher(new Dispatcher(new Container));

// Make this Capsule instance available globally via static methods... (optional)
$capsule->setAsGlobal();

// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
$capsule->bootEloquent();

// set up depencencies
require __DIR__ . '/dependencies.php';

// Register routes
require __DIR__ . '/controllers/events.php';
require __DIR__ . '/controllers/users.php';
require __DIR__ . '/controllers/auth.php';
require __DIR__ . '/controllers/todo.php';

$app->run();

?>
