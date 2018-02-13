<?php

namespace Models;

use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Capsule\Manager as DB;

class User extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'users';

    protected $fillable = [
        'name', 'email', 'password'
    ];

    public function validate(array $data) {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:225|unique:users',
            'password' => 'required|min:6|confirmed'
        ]);
    }
}

?>