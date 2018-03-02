<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use Models\todoTask;

$app->get('/api/todo', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $body->getAttribute('user');
    $id = $user->id;
    $tasks = todoTask::where('id','=',$id);
    $date = $body->date;
    $output = Array();
    foreach($tasks as $task){
        if ($task->date == $date){
            array_push($output, $task);
        }
    }
    $response->write(json_encode($output));
    return $response;
});

$app->post('/api/todo', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $body->getAttribute('user');
    $id = $user->id;
    $task = new todoTask;
    $task->date = $body->date;
    $task->description = $body->description;
    $task->done = false;
    $task->save();
    $response->write(json_encode($task));
    return $response; 
});

$app->put('/api/todo', function (Request $request, Response $response, array $args) {
    
        
});

$app->delete('/api/todo', function (Request $request, Response $response, array $args) {
    
        
});