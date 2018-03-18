<?php

namespace Models;

class Event extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'events';

    protected $fillable = [
        'title', 'owner_id', 'start_time', 'end_time', 'start_date', 'end_date', 'notes', 'location'
    ];

    public function users() {
        return $this->belongsToMany('Models\User');
    }

    public function owner() {
        return $this->hasOne('Models\User');
    }
}

?>