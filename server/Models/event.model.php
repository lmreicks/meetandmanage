<?php

namespace Models;

class Event extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'events';

    protected $fillable = [
        'Title', 'OwnerId', 'StartTime', 'EndTime', 'StartDate', 'EndDate', 'Notes', 'Location', 'Members'
    ];
}

?>