<?php

namespace Models;

/**
* server side group model
*/
class Group extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'group';

    protected $fillable = [
        'name', 'description'
    ];

    public function users() {
        return $this->belongsToMany('Models\User')->withPivot('permission');
    }

    public function events() {
        return $this->hasMany('Models\Event');
    }

}
