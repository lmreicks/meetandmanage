<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup; 
use Models\Group;
use Models\Group_User;
use Logic\ModelSerializers\GroupSerializer;

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

$app->get('/api/group_user/{id}', function (Request $request, Response $response, array $args) {
    $group_id = $args['id'];
    $group_users = Group_User::where('group_id', '=', $group_id)->get();
    $response->write(json_encode($group_users));
});

//delete method as well

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
//get group member & permission
// $app->get('/api/roles/{id}/member/{member_id}', function (Request $request, Response $response, array $args) {
//     $group_id = $args['id'];
//     $member_id = $args['member_id'];
//     $group_user = Group_User::where('group_id', '=', $group_id)->get();
//     //$members = $group_user->get_group_user;
//     $response->write(json_encode($members));
//     return $response;
// });

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
//update group member basically only the permission should be updated because the member is just a user with a role
$app->put('/api/group/{id}/member/{member_id}', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $permission = $body->Permission;
    $group_id = $args['id'];
    $member_id = $args['member_id'];
    $group_users = Group_User::where('group_id', '=', $group_id)->get();
    foreach ($group_users as $group_user){
        $group_user = $group_user->user_id;
        if($group_user == $member_id){
            //query error somewhere here
          $specific = Group_User::where('user_id','=',$member_id)->first();
          $specific->permission = $permission;
          $specific->save();  
        }
    }
    $response->write(json_encode($specific));
    //$permission = $body->Permission;
});

/**
 * @api {post} /roles/{id}/member/{member_id}
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