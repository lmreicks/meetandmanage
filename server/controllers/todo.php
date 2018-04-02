<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use Models\Todo;
use Logic\ModelSerializers\TodoSerializer;

/**
* takes in a user object and returns all of the todo tasks associated with them
*/
$app->get('/api/todo', function (Request $request, Response $response, array $args) {
    $ts = new TodoSerializer;
    $body = json_decode($request->getBody());
    $user = $body->getAttribute('user');
    $events = $user->todos;
    $output = $ts->toApiList($events);
    $response->write(json_encode($output));
    return $response;
});

/**
* takes in a user and a task and adds the task to the user
*/
$app->post('/api/todo', function (Request $request, Response $response, array $args) {
    $ts = new TodoSerializer;
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    $id = $user->id;
    $task = $ts->toServer($body->todo);
    $task->save();
    $user->attach($task);
    $response->write(json_encode($task));  
    return $response; 
});

/**
* takes in a task and a user and updates the existing task associated with the user
*/
$app->put('/api/todo', function (Request $request, Response $response, array $args) {
    
        
});

/**
* takes in a task and a user and deletes the existing task associated with the user
*/
$app->delete('/api/todo', function (Request $request, Response $response, array $args) {
    
        
}); 