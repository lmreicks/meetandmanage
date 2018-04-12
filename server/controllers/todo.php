<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use Models\Todo;
use Logic\ModelSerializers\TodoSerializer;

/**
 * @api {get} /todo
 * @apiHeader: {string} authentication a users unique authentication token
 * @apiSuccessExample {json} Success-Response:
 *   [
 *       {
 *           "Title" : "task",
 *           "Description" : "description",
 *           "Date" : "2018-03-20",
 *          "Done": fasle
 *       },
 *       {
 *
 *       }
 *   ]
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
 * @api {post} /todo
 * @apiHeader: {string} authentication a users unique authentication token
 * @apiPeramExample {json} Request-Example: 
 *  {
 *      "Title" : "task",
 *      "Description" : "description",
 *      "Date" : "2018-03-20",
 *      "Done": fasle
 *  }
 * @apiSuccessExample {json} Success-Response:
 *   [
 *       {
 *           "Title" : "task",
 *           "Description" : "description",
 *           "Date" : "2018-03-20",
 *          "Done": fasle
 *       },
 *       {
 *
 *       }
 *   ]
 */
$app->post('/api/todo', function (Request $request, Response $response, array $args) {
    $ts = new TodoSerializer;
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    $id = $user->id;
    $task = $ts->toServer($body);
    $task->save();
    $user->todos()->attach($task);
    $task->save();
    $response->write(json_encode($task));  
    return $response; 
});

/**
 * @api {put} /todo
 * @apiHeader: {string} authentication a users unique authentication token
 * @apiPeramExample {json} Request-Example: 
 *  {
 *      "Title" : "task",
 *      "Description" : "description",
 *      "Date" : "2018-03-20",
 *      "Done": fasle
 *  }
 * @apiSuccessExample {json} Success-Response:
 *   [
 *       {
 *           "Title" : "task",
 *           "Description" : "description",
 *           "Date" : "2018-03-20",
 *          "Done": fasle
 *       },
 *       {
 *
 *       }
 *   ]
 */
$app->put('/api/todo', function (Request $request, Response $response, array $args) {
    $ts = new TodoSerializer;
    $body = json_decode($request->getBody());
    $new = $ts->toServer($body);
    $user = $request->getAttribute('user');
    $existing = Todo::find($new->id);
    $existing->description = $new->description;
    $existing->title = $new->title;
    $existing->is_done = $new->is_done;
    $existing->date = $new->date;
    $existing->save();
    $response->write(json_encode($existing));
    return $response;
});

/**
 * @api {delete} /todo
 * @apiHeader: {string} authentication a users unique authentication token
 * @apiPeramExample {json} Request-Example: 
 *  {
 *      "Title" : "task",
 *      "Description" : "description",
 *      "Date" : "2018-03-20",
 *      "Done": fasle
 *  }
 * @apiSuccessExample {json} Success-Response:
 *   [
 *       {
 *           "Title" : "task",
 *           "Description" : "description",
 *           "Date" : "2018-03-20",
 *          "Done": fasle
 *       },
 *       {
 *
 *       }
 *   ]
 */
$app->delete('/api/todo', function (Request $request, Response $response, array $args) {
    $ts = new TodoSerializer;
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    $todo = $ts->toServer($body);
    $toDelete = Todo::find($todo->id);
    $toDelete->delete();
    
}); 