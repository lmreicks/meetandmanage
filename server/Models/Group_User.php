<?php

namespace Models;

class Group_User extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'group_user';

    protected $fillable = [
        'permission'
    ];

}
