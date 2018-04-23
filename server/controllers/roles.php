<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup; 
use Models\Group;
use Logic\ModelSerializers\GroupSerializer;

//need to learn how to use multiple arguements in the url :)
//outputs all users and their permissions based off of group_id
/**
 * @api {get} /roles/{id} Get All Group Members
 * 
 * @apiGroup Group Members
 * 
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
$app->get('/api/roles/{id}', function (Request $request, Response $response, array $args) {
    $group_id = $args['id'];
    $user = $request->getAttribute('user'); 
    //check if they can access users and roles 
    //figure out from here
    $group = Group::where('id','=',$group_id)->first();
    $members = $group->users; //gets members of groups
    $roles = $members; //howto link the two
    //get specific ids from groups... TODO
    $response->write(json_encode($roles));
    return $response;
});

/**
 * @api {get} /roles/{id}/member/{member_id} Get Group Member
 * 
 * @apiGroup Group Members
 * 
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
//get group member & permission
$app->get('/api/roles/{id}/member/{member_id}', function (Request $request, Response $response, array $args) {
    $group_id = $args['id'];
    $member_id = $args['member_id'];
    $group = Group::where('id', '=', $group_id);
    $members = $group->get_group_user;
    $response->write(json_encode($members));
    return $response;
});

/**
 * @api {put} /roles/{id}/member/{member_id} Update Group Member
 * 
 * @apiGroup Group Members
 * 
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
//update group member basically only the permission should be updated because the member is just a user with a role
$app->put('/api/roles/{id}/member/{member_id}', function (Request $request, Response $response, array $args) {
    return $response;
});

/**
 * @api {post} /roles/{id}/member/{member_id} Create Group Member
 * 
 * @apiGroup Group Members
 * 
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
//add user to group... creates entry in lookup table with group, user id and role
$app->post('/api/roles/{id}', function (Request $request, Response $response, array $args) {
    return $response;
}); 