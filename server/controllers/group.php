<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use Models\Group;
use Logic\ModelSerializers\GroupSerializer;
use Logic\ModelSerializers\GroupMemberSerializer;

/**
 * @api {post} api/group Create
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
    //add members in group member handler instead

    $group_serial = new GroupSerializer;
    $group = $group_serial->toServer($body);
    $group->save();

    $response->write(json_encode($group_serial->toApi($group)));
    return $response;
});

/**
 * @api {get} api/group Get All
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
    $user = new User;
    $user = $request->getAttribute('user');
    $groups = $user->groups;
    $group_serial = new GroupSerializer;
    return json_encode($group_serial->toApiList($groups));
});

/**
 * @api {put} api/group Update
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

    $modify_group = Group::find($group->id);
    //echo ($group->id);
    $response->write($modify_group);
    //echo $modify_group . "group here";
    $modify_group->name = $group->name;
    $modify_group->description = $group->description;

    $modify_group->save();
    //$response->getBody()->write($output);
    return $response;

    //$response->write($output);
});


/**
 * @api {delete} api/group Delete
 * @apiGroup Group
 * 
 * @apiParam {User} user Current user logged in
 * @apiParam {int} group-id group id of group to remove
 * @apiDescription Deletes a group based off of user and group id. Returns removed group.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "true"
 */
$app->delete('/api/group', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $val = "false";
    $group_serial = new GroupSerializer;

    $group = $group_serial->toServer($body);
    $group_del = Group::find($group->id);
    if($group_del != NULL){
        $group_del->delete();
        $val = "true";
    }
    $output = json_encode($val);
    $response->write($output);
    return $response;
}); 