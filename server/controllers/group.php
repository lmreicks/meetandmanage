<?php
include "errors.php";
#include "const_errors.php";
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Models\Group;
use Logic\ModelSerializers\GroupSerializer;


$app->get('/api/group', function (Request $request, Response $response, array $args) {
    $user = $request->getAttribute('user');
    $groups = $user->groups();
    return json_encode(GroupSerializer.toApiList($groups));
});

$app->put('/api/group', function (Request $request, Response $response, array $args) {
    $user = $request->getAttribute('user');
    $body = json_decode($request->getBody());
    $group = $body->group;
    $members = $body->Members;
    $group = GroupSerializer.toServer($group);
    $group->save();
    $out = GroupSerializer.toApi($group);
    $response->write($out);
    return $response;
});

$app->post('/api/group', function (Request $request, Response $response, array $args) {
    $user = $request->getAttribute('user');
    $body = json_decode($request->getBody());
    $group = $body->group;
    $members = $body->Members;
    $group = GroupSerializer.toServer($group);
    foreach($members as $member){
        $group->attach($member->id);
    }
    $group->save;
    $resonse->write(json_encode(GroupSerializer.toApi($group)));
    return $response;
});

$app->delete('/api/group', function (Request $request, Response $response, array $args) {
    $user = $request->getAttribute('user');
    $body = json_decode($request->getBody());
    $group = $body->group;
    $group = GroupSerializer.toApi($group);
    $group->delete();
    $out = json_encode(GroupSerializer.toApi($group));
    $response->write($out);
    return $response;
}); 