<?php
include "errors.php";
#include "const_errors.php";
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Logic\ModelSerializers\GroupSerializer;
use Logic\ModelSerializers\UserSerializer;
use Logic\ModelSerializers\EventSerializer;

$app->get('/api/payload', function (Request $request, Response $response, array $args) {
    $user = $request->getAttribut('user');
    $events = $user->events();
    $groups = $user->groups();
    $groupEvents = array();
    foreach ($groups as $group){
        array_push($groupEvents, $group->events());
    }
    $payload = new payload(EventSerializer.toApiList($events), GroupSerializer.toApiList($groups), EventSerializer.toApiList($groupEvents));//need to be serialized

    return json_encode($payload);
});

class payload{

    private $userEvents;
    private $userGroups;
    private $userGroupEvents;
    public function __construct($events, $groups, $groupEvents){
        $this->userEvents = $events;
        $this->userGroups = $groups;
        $this->userGroupEvents = $groupEvents;
        return array(
            'Events' => $this->userEvents,
            'Groups' => $this->userGroups,
            'GroupEvents' => $this->userGroupEvents
        );
    }
}