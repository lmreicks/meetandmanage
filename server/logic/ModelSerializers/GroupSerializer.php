<?php

namespace Logic\ModelSerializers;
use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Logic\ModelSerializers\ModelSerializer;
use Logic\ModelSerializers\UserSerializer;
use Logic\ModelSerializers\GroupMemberSerializer;

class GroupSerializer extends ModelSerializer{
    
    function toApi($model){
        $gms = new GroupMemberSerializer;
        $apiGroup = new \stdClass;
        $apiGroup->Id = $model->id;
        $apiGroup->Name = $model->Title;
        $apiGroup->Description = $model->description;
        $apiGroup->Members = $gms->toApiList($model->users);
        return $apiGroup;
    } 

    function toApiList($models){
        $serialized = Array();
        foreach($models as $model)
            array_push($serialized, $this->toApi($model));

        return $serialized;
    }

    function toServer($model){
        $out = new Group;
        $out->group_name = $model->Name;
        $out->description = $model->Description;
        return $out;
    }

    function toServerList($models){
        $out = Array();
        foreach($models as $model)
            array_push($out, $this.toServer($model));
        
        return $serialized;
    }

}