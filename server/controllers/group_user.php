<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\Group;
use Logic\ModelSerializers\GroupMemberSerializer;

//outputs all users and their permissions based off of group_id
/**
 * @api {get} /roles/{id}
 * @apiParam {id} group_id id of group to modify
 * @apiParam {User} User that's logged in
 * @apiDescription Outputs all users in a group and their permissions
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
 *           "name": "Ann Gould",
 *           "permission": 2
 *           }
 *       ]
 *       "Description": ""
 *     }
 *    ]
 */
$app->get('/api/group/{id}/member', function (Request $request, Response $response, array $args) {
    $group_id = $args['id'];
    $group = Group::find($group_id);
    $group_users = $group->users();
    $gm_serial = new GroupMemberSerializer;
    $response->write(json_encode($gm_serial->toApiList($group_users)));
    return $response;
});

/**
 * @api {get} /roles/{id}/member/{member_id}
 * @apiParam {id} group_id id of group to modify
 * @apiParam {User} User that's logged in
 * @apiDescription Outputs all users in a group and their permissions
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
 *           "name": "Ann Gould",
 *           "permission": 2
 *           }
 *       ]
 *       "Description": ""
 *     }
 *    ]
 */
$app->get('/api/group/{id}/member/{member_id}', function (Request $request, Response $response,array $args) {
    $group_id = $args['id'];
    $user_id = $args['member_id'];
    $group = Group::find($group_id);
    $group_users = $group->users();
    //returns specific user... returns w pivot
    $gm_serial = new GroupMemberSerializer;
    $response->write(json_encode($gm_serial->toApiList($group)));
    return $response;
});

/**
 * @api {put} /roles/{id}/member/{member_id}
 * @apiParam {int} permission permission id to change of user
 * @apiParam {int} id id of group to modify
 * @apiParam {int} member_id id of member to change 
 * @apiDescription Outputs changed permission accociated with user
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
 *           "name": "Ann Gould",
 *           "permission": 1
 *           }
 *       ]
 *       "Description": ""
 *     }
 *    ]
 */
$app->put('/api/group/{id}/member/{member_id}', function (Request $request, Response $response, array $args) {
    $group_id = $args['id'];
    $user_id = $args['member_id'];
    $body = json_decode($request->getBody());
    $permission = $body->Permission;
    $group = Group::find($group_id);
    $group->users()->updateExistingPivot($user_id, [permission => $permission]);
    $group_users = $group->users();
    $gm_serial = new GroupMemberSerializer;
    $response->write(json_encode($gm_serial->toApiList($group_users))); 
    return $repsonse;
});

/**
 * @api {post} /group/{id}/member/
 * @apiParam {int} permission permission id to add to user
 * @apiParam {int} id id of group to modify
 * @apiParam {int} member_id id of member to change 
 * @apiDescription Adds user to group by adding an entry in the lookup table
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
 *           "name": "Ann Gould",
 *           "permission": 1
 *           }
 *       ]
 *       "Description": ""
 *     }
 *    ]
 */
$app->post('/api/group/{id}/member', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $permission = $body->Permission;
    $user_id = $body->User_Id;
    $id = $args['id'];
    $group = Group::find($id);
    $group->users()->attach($user_id, [permission => $permission]);
    $group_users = $group->users();
    $gm_serial = new GroupMemberSerializer;
    $response->write(json_encode($gm_serial->toApiList($group_users)));
    return $response;
});

/**
 * @api {delete} /group/{id}/member/{member_id}
 * @apiParam {int} permission permission id to add to user
 * @apiParam {int} id id of group to modify
 * @apiParam {int} member_id id of member to change 
 * @apiDescription deletes pivot relation (permission of user) in lookup table and removes user
 * from group
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
 *           "name": "Ann Gould",
 *           "permission": 1
 *           }
 *       ]
 *       "Description": ""
 *     }
 *    ]
 */
$app->delete('/api/group/{id}/member/{member_id}', function (Request $request, Response $response, array $args) {
    $group_id = $args['id'];
    $user_id = $args['member_id'];
    $body = json_decode($request->getBody());
    $group = Group::find($group_id);
    $group->users()->detach($user_id);
    $group_users = $group->users();
    $gm_serial = new GroupMemberSerializer;
    $response->write(json_encode($gm_serial->toApiList($group_users)));
    return $repsonse;
});