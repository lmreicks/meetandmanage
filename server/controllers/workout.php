<?php

use Models\Workout;
use Models\User;
use Logic\ModelSerializers\WorkoutSerializer;
use Slim\Http\Request;
use Slim\Http\Response;
use Logic\ErrorList;
use Logic\Errors\ErrorResponse;
use Logic\Errors\StatusCodes;

$app->get('/api/workout', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    $workouts = $user->workouts;
    if ($workouts == null || count($workouts) == 0) 
        goto end;
    $ws = new WorkoutSerializer;
    $response->write(json_encode($ws->toApiList($workouts)));
    return $response;
    end:
    $response->write(json_encode(array()));
    return $response;
});

$app->put('/api/workout', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    $ws = new WorkoutSerializer;
    $er = new ErrorResponse;
    $workout = $ws->toServer($body);
    if ($workout->name == null)
        return $er($response, StatusCodes::HTTP_BAD_REQUEST, "Workout name null");
    if ($workout->date == null)
        return $er($response, StatusCodes::HTTP_BAD_REQUEST, "Workout date null");
    $existing = Workout::Find($workout->id);
    $existing->name = $workout->name;
    $existing->reps = $workout->reps;
    $existing->sets = $workout->sets;
    $existing->weight = $workout->weight;
    $existing->save();
    $response->write(json_encode($ws->toApi($workout)));
    return $response;
});

$app->post('/api/workout', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user'); 
    $ws = new WorkoutSerializer;
    $er = new ErrorResponse;
    $workout = $ws->toServer($body);
    if ($workout->name == null)
        return $er($response, StatusCodes::HTTP_BAD_REQUEST, "Workout name null");
    if ($workout->date == null)
        return $er($response, StatusCodes::HTTP_BAD_REQUEST, "Workout date null");
    $workout->user_id = $user->id;
    $workout->save();

});

$app->delete('/api/workout', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');  
    $ws = new WorkoutSerializer;
    $er = new ErrorResponse;
    $workout = $ws->toServer($body);
    $existing = Workout::Find($workout->id);
    if ($existing != null) {
        $existing->delete();
        return;
    }
    return $er($response, StatusCodes::HTTP_BAD_REQUEST, "Workout not found");
});
