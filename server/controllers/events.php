<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;


$app->get('/api/event', function (Request $request, Response $response, array $args) {
    // require "logic/validator.php";

    $token = $request->getHeader('Authorization');
    echo var_dump($token);
    $id = $request->getHeader('Cookie');
    echo 
    $arr = explode(";",$id[0]);
    $id = $arr[0];
    echo var_dump($arr);
    $events = Event::where('OwnerId','=',$id);
    //$events = Event::all();
    //go from 24 hour to 12 hour here
    //$time_in_12_hour_format  = date("g:i a", strtotime("13:30"));
    $return = json_encode($events);
    $response->getBody()->write($return);
    return $response;
});

$app->post('/api/event', function (Request $request, Response $response, array $args) {
    //require "logic/validator.php";

    $body = json_decode($request->getBody());
    
    $event = new Event;

    $event->Title = $body->Title;
    $event->OwnerId = $body->OwnerId;
    //write in logic here to convert potentially from varchar to date time... if needed.
    //$time_in_24_hour_format  = date("H:i", strtotime("1:30 PM"));
    $event->StartTime = date("H:i", strtotime(substr($body->StartTime, 0, 8)));
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