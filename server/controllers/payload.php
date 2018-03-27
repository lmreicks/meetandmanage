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
    $user = $request->getAttribut('user');
    $events = $user->events();
    $groups = $user->groups();
    foreach ($groups as $group) {
        $group->Events = $group->events();
    }
    $payload = new payload($es->toApiList($events), $gs->toApiList($groups));//need to be serialized

    return json_encode($payload);
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