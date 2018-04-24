<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Logic\ModelSerializers\GroupSerializer;
use Logic\ModelSerializers\UserSerializer;
use Logic\ModelSerializers\EventSerializer;
use Logic\ModelSerializers\TodoSerializer;
use Logic\ModelSerializers\WorkoutSerializer;

/**
* returns the serialized payload which includes all of a users events and groups
* array(
*    'Events' => array(user->events),
*    'Groups' => array(user->groups)
* )
*/
$app->get('/api/payload', function (Request $request, Response $response, array $args) {
    $es = new EventSerializer;
    $gs = new GroupSerializer;
    $ts = new TodoSerializer;
    $ws = new WorkoutSerializer;

    $user = $request->getAttribute('user');
    $events = $user->events;
    $todos = $user->todos;
    $workouts = $user->workouts;

    $out = array(
        'Events' => $es->toApiList($events),
        'Groups' => $gs->toApiList($user->groups),
        'Todos' => $ts->toApiList($todos)
        //'Workouts' => $ws->toApiList($workouts)
    );
    $response->getBody()->write(json_encode($out));
    return $response;

    
});

class payload {

    private $userEvents;
    private $userGroups; 
    private $userGroupEvents;
    private $todo;

    public function __construct($events, $groups, $todos){
        $this->userEvents = $events;
        $this->userGroups = $groups;
        $this->todo = $todos;
        return array(
            'Events' => $this->userEvents,
            'Groups' => $this->userGroups,
            'Todos' => $this->todo
        );
    }
}