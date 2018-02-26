<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;


$app->get('/api/event', function (Request $request, Response $response, array $args) {

    #have to go through event mappings, and get all events which the user is included in and add
    #them to the array of events to be returned to lexi
    $user = $request->getAttribute('user');
    $events = getAllEvents($user);
    $return = json_encode($events);
    $response->getBody()->write($return);
    return $response;
});

function getAllEvents($user){
    $email = $user->email;
    $eventIds = EventLookup::where('Email','=',$email)->get();// $eventIds <-- all eventIds where the user email is the email
    $events = array(); 
    echo $eventsIds;
    foreach ($eventIds as $eventId){
        $eventId = $eventId->EventId;
        $event = Event::where('Id','=',$eventId)->first();
        if ($event != null){
            if (!in_array($event, $events)){
                array_push($events, $event);
            }
        }
    }
    return $events;
}

$app->post('/api/event', function (Request $request, Response $response, array $args) {
    
    # need to parse through list of members given in the $request body
    # if the email is in the database, add it to the table mapping events with all of it's members
    # at some point down the road we will add an email api to this to include non members into all of the "fun"

    $body = json_decode($request->getBody());
    $user = $body->getAttributes('user');
    $event = new Event;


    if ($body->OwnerId == NULL) {
        $response->write('no ownerId');
        return $response;
    }
    if ($user->id != $body->OwnerId){
        $resonse->write('user id does not match ownerId');
        return $response;
    }
    if ($body->Title == NULL || $body->Title == '') {
        $response->write('no Title');
        return $response;
    }

    $event->Title = $body->Title;
    $event->OwnerId = $body->OwnerId;
    $event->StartTime = date("H:i", strtotime(substr($body->StartTime, 0, 8)));
    $event->EndTime = substr($body->EndTime, 0, 8);
    $event->StartDate = substr($body->StartDate, 0, 10);
    $event->EndDate = substr($body->EndDate, 0, 10);
    $event->Notes = $body->Notes;
    $event->Location = $body->Location;

    $event->save();
    $eventId = $event->Id;
    $membersArray = $body->members;
    foreach($membersArray as $email){
        $eventLookup = new EventLookup;
        $eventLookup->Email = $email;
        $eventLookup->EventId = $eventId;
        $eventLookup->save();
    }
    $response->getBody()->write(json_encode($event));
    return $response;
});

$app->delete('/api/event/{id}', function (Request $request, Response $response, array $args){

    $user = $request->getAttribute('user');
    $eventID = $args['id'];
    $event = Event::where('id','=',$eventID)->first();
    if ($event == NULL) {
        $response->write("Event not found");
        return $response;
    }
    $ownerId = $event->ownerId;
    $userId = $user->id;
    if ($ownerId === $id){
        $event = Event::where('id','=',$eventID)->delete();
        EventLookup::where('EventId','=',$eventID)->delete();
        $response->write(json_encode($event));
        return $response;
    }
    $response->write("Not your event to delete");
    return $response; //switch to error for not owner of event
});