<?php

namespace Models;

class Group_User extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'group_user';

    protected $fillable = [
        'permission'
    ];

    public function users() {
        return $this->belongsToMany('Models\User');
    }

    public function events(){
        return $this->belongsToMany('Models\Event');
    }

}
