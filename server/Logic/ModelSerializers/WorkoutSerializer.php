<?php


namespace Logic\ModelSerializers;

use Logic\ModelSerializers\ModelSerializer;
use Models\Workout;

class WorkoutSerializer extends ModelSerializer {

    function toApi($workout) {
        $out = new \stdClass;
        if ($workout->id != null) 
            $out->Id = $workout->id;
        $out->Name = $workout->name;
        $out->Date = $workout->date;
        $out->Reps = $workout->reps;
        $out->Sets = $workout->sets;
        $out->Weight = $workout->weight;
        $out->UserId = $workout->user_id;
        return $out;
    }

    function toApiList($workout) {
        $arrOut = array();
        foreach($workout as $w)
            array_push($arrOut, $this->toApi($w));
        return $arrOut;
    }

    function toServer($workout) {
        $out = new Workout;
        if ($workout->Id != null)
            $out->id = $workout->Id;
        $out->name = $workout->Name;
        $out->date = $workout->Date;
        $out->reps = $workout->Reps;
        $out->sets = $workout->Sets;
        $out->weight = $workout->Weight;
        return $out;
    }

    function toServerList($workout) {
        $arrOut = array();
        foreach($workout as $w)
            array_push($arrOut, $this->toServer($w));

        return $arrOut;
    }
}