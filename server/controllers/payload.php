<?php
include "errors.php";
#include "const_errors.php";
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;

$app->get('/api/payload', function (Request $request, Response $response, array $args) {
    $user = $request->getAttribut('user');
    $events = $user->events();
    $groups = $user->groups();
    $payload = new payload($events);

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

function getAllGroups($user){
    //waiting on the group lookup table to be made
}

class payload{

    private $userEvents;
    private $userGroups;

    public function __construct($events, $groups){
        $this->userEvents = $events;
        $this->userGroups = $groups;
        return $this->userEvents . ' ' . $this->userGroups;
    }
}