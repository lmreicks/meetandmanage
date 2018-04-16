<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use Models\Group;
use Logic\ModelSerializers\GroupSerializer;
use Logic\ModelSerializers\UserSerializer;

/**
 * @api {post} /group Create
 * @apiGroup Group
 *
 *@apiParam {String} name 
 *@apiParam {User} members
 *@apiParam {String} description
 *@apiDescription Creates a new group
 *@apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    [
 *     {
 *       "Id": 3,
 *       "Name": "my_group",
 *       "Members": [
 *           {
 *           "id": "6",
 *           "email": "anngould@iastate.edu",
 *           "name": "Ann Gould"
 *           }
 *       ]
 *       "Description": "Cool group"
 *     }
 *    ]
 */
$app->post('/api/group', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());    
    $user = $request->getAttribute('user'); 

   
    $members = $body->Members;
 
    $us = new UserSerializer;
    $group_serial = new GroupSerializer;
    $group = $group_serial->toServer($body);
    $group->save();
    $mems = $us->toServerList($members);
    $ids = array();
    foreach($mems as $member) array_push($ids, $member->id);
    $group->users()->attach($ids);
    $group->save();

    $response->write(json_encode($group_serial->toApi($group)));
    return $response;
});

/**
 * @api {get} /group Get All
 * 
 * @apiGroup Group
 *
 * @apiParam {User} user thats logged in
 * @apiDescription Returns all groups a user is associated with
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    [
 *     {
 *       "Id": 8,
 *       "Name": "cool group",
 *       "Members": [
 *           {
 *           "id": "6",
 *           "email": "anngould@iastate.edu",
 *           "name": "Ann Gould"
 *           }
  *          {
 *           "id": "2",
 *           "email": "tlnance@iastate.edu",
 *           "name": "Trevin Nance"
 *           }
 *       ]
 *       "Description": "for class"
 *     }
 * {
 *       "Id": 7,
 *       "Name": "Another cool group",
 *       "Members": [
 *           {
 *           "id": "6",
 *           "email": "anngould@iastate.edu",
 *           "name": "Ann Gould"
 *           }
 *       ]
 *       "Description": "only one person"
 *     }
 *    ]
 */
$app->get('/api/group', function (Request $request, Response $response, array $args) {
    $user = $request->getAttribute('user');
    $groups = $user->groups();
    $group_serial = new GroupSerializer;
    return json_encode($group_serial->toApiList($groups));
});

/**
 * @api {put} /group Update
 * @apiGroup Group
 *
 * @apiDescription Modifies fields of group... No params as no fields are required. Returns modified group
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    [
 *    {
 *       "Id": 7,
 *       "Name": "Another cool group",
 *       "Members": [
 *           {
 *           "id": "6",
 *           "email": "anngould@iastate.edu",
 *           "name": "Ann Gould"
 *           }
 *       ]
 *       "Description": "only one person"
 *     }
 *    ]
 */
$app->put('/api/group', function (Request $request, Response $response, array $args) {    
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');

    $group_serial = new GroupSerializer;
    $group = $group_serial->toServer($body);
    $members = $body->members;
    $group->attach($group_serial->toServerList($members));
    $group->save();

    $output = $group_serial->toApi($group);
    $response->write($output);
    return $response;
});


/**
 * @api {delete} /group Delete
 * @apiGroup Group
 * 
 * @apiParam {User} user Current user logged in
 * @apiParam {int} group-id group id of group to remove
 * @apiDescription Deletes a group based off of user and group id. Returns removed group.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    [
 *    {
 *       "Id": 7,
 *       "Name": "Another cool group",
 *       "Members": [
 *           {
 *           "id": "6",
 *           "email": "anngould@iastate.edu",
 *           "name": "Ann Gould"
 *           }
 *       ]
 *       "Description": "only one person"
 *     }
 *    ]
 */
$app->delete('/api/group', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    $group = $body->group;

    $group_serial = new GroupSerializer; 
    $group = $group_serial->toApi($group);
    $group->delete();

    $output = json_encode($global_serial->toApi($group));
    $response->write($output);
    return $response;
}); 