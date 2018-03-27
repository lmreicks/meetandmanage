<?php

namespace Models;

class User extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'password'
    ];

    public function events() {
        return $this->belongsToMany('Models\Event');
    }

    public function todos(){
        return $this->belongsToMany('Models\todoTask');
    }

    public function group(){
        return $this->belongsToMany('Models\Group');
    }
}

?>