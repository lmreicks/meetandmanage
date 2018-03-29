<?php

namespace Models;

/**
* server side group model
*/
class Group extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'group';

    protected $fillable = [
        'group_name', 'description'
    ];

    public function users() {
        return $this->belongsToMany('Models\User');
    }

    public function events(){
        return $this->belongsToMany('Models\Event');
    }
}