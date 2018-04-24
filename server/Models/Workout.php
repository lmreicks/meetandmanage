<?php

namespace Models;

/**
* server side group model
*/
class Workout extends \Illuminate\Database\Eloquent\Model {
    protected $table = 'workout';

    protected $fillable = [
        'name', 'date', 'reps', 'sets', 'weight', 'user_id'
    ];

    public function owner(){
        return $this->hasOne('Models\User');
    }
}
