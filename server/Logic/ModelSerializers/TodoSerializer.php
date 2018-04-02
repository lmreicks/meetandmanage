<?php


namespace Logic\ModelSerializers;

use Logic\ModelSerializers\ModelSerializer;
use Models\Todo;

class TodoSerializer extends ModelSerializer {

    function toApi($todo) {
        $out = new \stdClass;
        $out->Date = $todo->date;
        $out->Description = $todo->description;
        $out->IsDone = $todo->$is_done;
        $out->Title = $todo->title;
        return $out;
    }

    function toApiList($todos) {
        $out = array();
        foreach($todos as $todo) array_push($out, $this->toApi($todo));
        return $out;
    }

    function toServer($todo) {
        $out = new Todo;
        $out->date = $todo->Date;
        $out->description = $todo->Description;
        $out->is_done = $todo->IsDone;
        $out->title = $out->Title;
        return $out;
    }

    function toServerList($todos) {
        $out = array();
        foreach($todos as $todo) array_push($out, $this->toServer($todo));
        return $out;
    }
}

?>