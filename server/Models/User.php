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
        return $this->hasMany('Models\Todo');
    }

    public function groups() {
        return $this->belongsToMany('Models\Group');
    }

    public function workouts(){
        return $this->hasMany('Models\Workout');
    }
}

?>