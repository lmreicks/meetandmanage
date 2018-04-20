<?php
namespace Logic;

use Slim\Http\Request;
use Slim\Http\Response;
use Models\User;
use Models\Group;

class PermissionValidator{

    //Owner only
    function is_owner($user_id, $group_id){
        $group = Group::find($group_id);
        $group_users = $group->users;
        foreach ($group_users as $member) {
            if ($member->id == $user_id) {
                // echo $member->pivot->permission;
                if($member->pivot->permission == 3){
                    return 1;
                }
            }
        }
        return 0;
    }

    //this is for the owner and a manager... People who administrate the group
    function is_admin($user_id, $group_id){
        $group = Group::find($group_id);
        $group_users = $group->users;
        foreach ($group_users as $member) {
            if ($member->id == $user_id) {
                //if owner or manager
                if($member->pivot->permission == 3 || $member->pivot->permission == 2){
                    return 1;
                }
            }
        }
        return 0;
    }
}
