<?php
namespace Logic\ModelSerializers;
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Logic\ModelSerializers\ModelSerializer;
use Logic\ModelSerializers\UserSerializer;

class GroupMemberSerializer extends ModelSerializer{
    
    function toApi($user){
        $apiUser = new \stdClass;
        $apiUser->Id = $user->id;
        $apiUser->Email = $user->email;
        $apiUser->Name = $user->name;
        
        $apiGroupMember = new \stdClass;

        $apiGroupMember->User = $apiUser;
        //will it be this easy????
        $apiGroupMember->Permission = $user->pivot->permission;
        return $apiGroupMember;
    } 

    function toApiList($models){
        $serialized = Array();
        foreach($models as $model)
            array_push($serialized, $this->toApi($model));

        return $serialized;
    }

    function toServer($group_member){
        //works perfectly
        $user = new User;

        $user->id = $group_member->Id;
        $user->email = $group_member->Email;
        $user->name = $group_member->Name;
       // $user->pivot->permission = $group_member->Permission;

        return $out;
    }

    function toServerList($models){
        $out = Array();
        foreach($models as $model)
            array_push($out, $this.toServer($model));
        
        return $serialized;
    }

}