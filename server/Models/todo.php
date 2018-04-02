<?php

namespace Model;

class Todo extends \Illuminate\Database\Eloquent\Model{

    protected $fillable = [
        'date', 'title', 'description', 'is_done'
    ];

    public function owner(){
        return $this->hasOne('Models\User');
    }
}