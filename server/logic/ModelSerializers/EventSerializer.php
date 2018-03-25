<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;

class EventSerializer extends ModelSerializer{

    function toApi($model){
        return json_encode(array(
            'Title' => $model->title,
            'OwnerId' => $model->owner_id,
            'StartTime' => $model->start_time,
            'EndTime' => $model->end_time,
            'StartDate' => $model->start_date,
            'EndDate' => $model->end_date,
            'Location' => $model->location,
            'Notes' => $model->notes
        ))
    }

    function toApiList($models){
        $serializedList = Array();
        foreach ($models as $model){
            array_push($serializedList, $this.toApi($model));
        }
        return json_encode($serializedList);
    }

    function toServer($model){

    }

    function toServerList($models){
        $serverList = Array();
        foreach($models as $model){
            array_push($serverList, $toServer($model));
        }
        return $serverList;
    }

}