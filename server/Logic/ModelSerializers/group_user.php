<?php
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\Group;
use Logic\PermissionValidator;
use Logic\ModelSerializers\GroupMemberSerializer;

/**
 * @api {get} /roles/{id}
 * @apiParam {id} group_id id of group to modify
 * @apiParam {User} User that's logged in
 * @apiDescription Outputs all users in a group and their permissions
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"User":{"Id":2,"Email":"lmreicks@iastate.edu","Name":"lmreicks"},"Permission":"1"},{"User":{"Id":3,"Email":"tlnance@iastate.edu","Name":"Trevin"},"Permission":"0"},{"User":{"Id":5,"Email":"bmjensen@iastate.edu","Name":"Bailey"},"Permission":"0"},{"User":{"Id":6,"Email":"anngould@iastate.edu","Name":"Ann Gould"},"Permission":"2"}]
 *
 */
$app->get('/api/group/{id}/member', function (Request $request, Response $response, array $args) {
    $group_id = $args['id'];
    $group = Group::find($group_id);
    $group_users = $group->users;
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
 *    {"User":{"Id":6,"Email":"anngould@iastate.edu","Name":"Ann Gould"},"Permission":"2"}
 *    ]
 */
$app->get('/api/group/{id}/member/{member_id}', function (Request $request, Response $response,array $args) {
    $group_id = $args['id'];
    $user_id = $args['member_id'];
    $group = Group::find($group_id);
    $group_users = $group->users;
    $apiGroupMember = NULL;

    $gm_serial = new GroupMemberSerializer;
    foreach ($group_users as $member) {
        if ($member->id == $user_id) {
            $apiGroupMember = $gm_serial->toApi($member);
        }
    }

    if ($apiGroupMember == NULL) {
        // return error
    }
    $response->write(json_encode($apiGroupMember));
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
 *    {"User":{"Id":2,"Email":"lmreicks@iastate.edu","Name":"lmreicks"},"Permission":"1"}
 *    ]
 */
$app->put('/api/group/{id}/member/{member_id}', function (Request $request, Response $response, array $args) {
    //only for owner and manager
    //owner cannot downgrade themselves
    $pv = new PermissionValidator;
    $group_id = $args['id'];
    $user_id = $args['member_id'];
    $user = $request->getAttribute('user');
    $admin_val = $pv->is_admin($user_id, $group_id);
    if($admin_val){
        $owner_val = $pv->is_owner($user->id, $group_id);
        if($owner_val == 1 && ($user->id == $user_id)){
            $response->write(json_encode("Owner cannot modifiy their own permission"));
        }
        else{
            $body = json_decode($request->getBody());
            $permission = $body->Permission;
            $group = Group::find($group_id);
            $group->users()->updateExistingPivot($user_id, [permission => $permission]);
            $group_users = $group->users;
            $gm_serial = new GroupMemberSerializer;
            $response->write(json_encode($gm_serial->toApiList($group_users)));
        }
    }
    else{
        $response->write(json_encode("User permission denied"));
    }
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
 *    [{"User":{"Id":2,"Email":"lmreicks@iastate.edu","Name":"lmreicks"},"Permission":"0"},{"User":{"Id":3,"Email":"tlnance@iastate.edu","Name":"Trevin"},"Permission":"0"},{"User":{"Id":5,"Email":"bmjensen@iastate.edu","Name":"Bailey"},"Permission":"0"},{"User":{"Id":6,"Email":"anngould@iastate.edu","Name":"Ann Gould"},"Permission":"2"}]
 */
$app->post('/api/group/{id}/member', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $permission = $body->Permission;
    $user_id = $body->User->Id;
    $id = $args['id'];
    $group = Group::find($id);
    $group->users()->attach($user_id, [permission => $permission]);
    $group_users = $group->users;
    $gm_serial = new GroupMemberSerializer;

    // get and return new user
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
 *    "true"
 */
$app->delete('/api/group/{id}/member/{member_id}', function (Request $request, Response $response, array $args) {
    //check to make sure owner cannot delete themselves
    //check to make sure that an owner or manager is deleting someone
    $group_id = $args['id'];
    $user_id = $args['member_id'];
    $user = $request->getAttribute('user');
    $pv = new PermissionValidator;
    $can_delete = 0;
    if(($user->id == $user_id) || $pv->is_admin($user->id, $group_id)){
        //owner cannot delete themselves
        $can_delete = 1;
        if($pv->is_owner($user_id, $group_id)){
            if($user->id == $user_id){
                $can_delete = 0;
            }
        }
    }
    if($can_delete){
        $group = Group::find($group_id);
        $val = "false";
        $group_users = $group->users;
        foreach ($group_users as $member) {
            if ($member->id == $user_id) {
                $val = "true";
                $group->users()->detach($user_id);
            }
        }
        $response->write(json_encode($val));
    }
    else{
        $response->write(json_encode("permission invalid"));
    }
    
    return $repsonse;
});