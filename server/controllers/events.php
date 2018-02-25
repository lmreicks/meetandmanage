<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;

$app->get('/api/event/{id}', function (Request $request, Response $response, array $args) {
    $response->getBody()->write("get event");
    return $response;
});

$app->get('/api/event', function (Request $request, Response $response, array $args) {
   $response->getBody()->write("Get all events");
   $user = $response->getAttribute('user');
   return $response;
});

$app->post('/api/event', function (Request $request, Response $response, array $args) {

    $body = $request->getParsedBody();

    require_once "Models/event.model.php";

    $email = $body["email"];
    $Title = $body["Title"];
    $ownerId = $body["ownerId"];
    $start_time = $body["start_time"];
    $end_time = $body["end_time"];
    $Start_Date = $body["Start_Date"];
    $End_Date = $body["End_Date"];
    $repeat = $body["repeat"];
    $notes = $body["notes"];
    $Location = $body["Location"];
    $members = $body["members"];

    $event = new Event;

    $event->email = $email;
    $event->Title = $Title;
    $event->ownerId = $ownerId;
    $event->start_time = $start_time;
    $event->end_time = $end_time;
    $event->Start_Date = $Start_Date;
    $event->End_Date = $End_Date;
    $event->repeat = $repeat;
    $event->notes = $notes;
    $event->Location = $Location;
    $event->members = $members;

    $res = $event->save();

    //echo var_dump($val);
    echo var_dump($res);

    return $response;
});