<?php

namespace Models;

class Event extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'events';

    protected $fillable = [
        'email','Title', 'ownerId', 'start_time', 'end_time', 'Start_Date', 'End_Date', 'repeat', 'notes', 'Location', 'members'
    ];
}

?>