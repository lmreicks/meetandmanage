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
    $gs = new GroupSerializer;
    $user = $request->getAttribute('user');
    $groups = $user->groups();
    return json_encode($gs->toApiList($groups));
});

$app->put('/api/group', function (Request $request, Response $response, array $args) {
    $gs = new GroupSerializer;    
    $user = $request->getAttribute('user');
    $body = json_decode($request->getBody());
    $group = $gs->toServer($body);
    $members = $body->Members;
    $group->attach($gs->toServerList($members));
    $group->save();
    $out = $gs->toApi($group);
    $response->write($out);
    return $response;
});

$app->post('/api/group', function (Request $request, Response $response, array $args) {
    $gs = new GroupSerializer;    
    $user = $request->getAttribute('user');
    $body = json_decode($request->getBody());
    $group = $body->group;
    $members = $body->Members;
    $group = $gs->toServer($group);
    $members = $gs->toServerList($members);
    $group->attach($members);
    $group->save;
    $resonse->write(json_encode($gs->toApi($group)));
    return $response;
});

$app->delete('/api/group', function (Request $request, Response $response, array $args) {
    $gs = new GroupSerializer;    
    $user = $request->getAttribute('user');
    $body = json_decode($request->getBody());
    $group = $body->group;
    $group = $gs->toApi($group);
    $group->delete();
    $out = json_encode($gs->toApi($group));
    $response->write($out);
    return $response;
}); 