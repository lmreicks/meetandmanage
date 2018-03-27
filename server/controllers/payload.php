<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Logic\ModelSerializers\GroupSerializer;
use Logic\ModelSerializers\UserSerializer;
use Logic\ModelSerializers\EventSerializer;

$app->get('/api/payload', function (Request $request, Response $response, array $args) {
    $es = new EventSerializer;
    $gs = new GroupSerializer;
    $user = $request->getAttribute('user');
    $events = $user->events;
    //echo $events;
    $outGroups = $user->group;
    $g = $outGroups;
    if ($outGroups != NULL && count($outGroups) != 0 && $outGroups != []){
        
        $outGroups = $gs->toApiList($g);
        // echo $outGroups;
        if (count($outGroups) > 1){
            foreach ($outGroups as $group) {
                //$group->Events = $group->events;
            }
        } 
        //else $outGroups->Events = $g->events;
        

        // foreach($events as $event) echo $event;
        
        $payload = new payload($es->toApiList($events), $outGroups);//need to be serialized

        $payload = array(
            'Events' => $es->toApiList($events),
            'Groups' => $gs->toApiList($g)
        );
        $response->getBody()->write(json_encode($payload));
        return $response;
    }
    
    $out = array(
        'Events' => $es->toApiList($events),
        'Groups' => array()
    );
    $response->getBody()->write(json_encode($out));
    return $response;

    
});

class payload{

    private $userEvents;
    private $userGroups; 
    private $userGroupEvents;
    public function __construct($events, $groups){
        $this->userEvents = $events;
        $this->userGroups = $groups;
        return array(
            'Events' => $this->userEvents,
            'Groups' => $this->userGroups
        );
    }
}