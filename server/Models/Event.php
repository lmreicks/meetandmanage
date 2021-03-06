<?php

namespace Models;

class Event extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'events';

    protected $fillable = [
        'title', 'owner_id', 'start_date', 'end_date', 'notes', 'location'
    ];

    public function users() {
        return $this->belongsToMany('Models\User');
    }

    public function owner() {
        return $this->hasOne('Models\User');
    }

    public function group() {
        return $this->hasOne('Models\Group');
    }

}

?>