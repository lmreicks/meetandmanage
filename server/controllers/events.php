<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;

$app->get('/api/event/{id}', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("get event");
    return $response;
});

$app->get('/api/event', function (Request $request, Response $response, array $args) {
    // require "logic/validator.php";

    echo var_dump($request->getHeaders());
    $token = $request->headers->get('HTTP-AUTHORIZATION');
    //echo var_dump($headers);
    echo $token;
    $email = $request->headers->get('HTTP-EMAIL');
    echo $userEmail;
    $user = User::where('email','=',$userEmail);
    $id = $user->id;
    $events = Event::where('id','=',$id);
    //$events = Event::all();
    $response->getBody()->write(json_encode($events));
    return $response;
});

$app->post('/api/event', function (Request $request, Response $response, array $args) {
    require "logic/validator.php";

    $body = json_decode($request->getBody());
    
    $event = new Event;

    $event->Title = $body->Title;
    $event->OwnerId = $body->OwnerId;
    $event->StartTime = substr($body->StartTime, 0, 8);
    $event->EndTime = substr($body->EndTime, 0, 8);
    $event->StartDate = substr($body->StartDate, 0, 10);
    $event->EndDate = substr($body->EndDate, 0, 10);
    $event->Notes = $body->Notes;
    $event->Location = $body->Location;
    $event->Members = $body->Members;

    
    $event->save();

    $response->getBody()->write(json_encode($event));

    #need to query add the event
    return $response;
});