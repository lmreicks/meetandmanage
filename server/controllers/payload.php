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

    $user = $request->getAttribute('user');
    $events = $user->events;
    //echo $events;
    $outGroups = $user->group;
    $g = $outGroups;
    $todos = $user->todos;
    if ($outGroups != NULL && count($outGroups) != 0 && $outGroups != []){
        
        $outGroups = $gs->toApiList($g);
        // echo $outGroups;
        if (count($outGroups) > 1){
            foreach ($outGroups as $group) {
                //$group->Events = $group->events;
            }
        } 
        
        $payload = new payload($es->toApiList($events), $outGroups, $ts->toApiList($todos));//need to be serialized

        $response->getBody()->write(json_encode($payload));
        return $response;
    }
    
    $out = array(
        'Events' => $es->toApiList($events),
        'Groups' => array(),
        'Todos' => $ts->toApiList($todos)
    );
    $response->getBody()->write(json_encode($out));
    return $response;

    
});

class payload{

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