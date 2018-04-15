<?php

namespace Models;

class Group extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'group';

    protected $fillable = [
        'group_name', 'description'
    ];

    public function users() {
        return $this->belongsToMany('Models\User')->withPivot('permission');
    }

    public function events(){
        return $this->belongsToMany('Models\Event');
    }

}
