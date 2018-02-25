<?php

namespace Models;

class EventLookup extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'event_lookup';

    protected $fillable = [
        'EventId', 'Email'
    ];
}

?>