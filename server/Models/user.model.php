<?php

namespace Models;

class User extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'password', 'remember_token'
    ];

    public function events() {
        return $this->belongsToMany('Models\Event');
    }
}

?>