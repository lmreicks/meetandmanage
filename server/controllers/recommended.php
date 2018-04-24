<?php

use Models\Group;
use Models\User;
use Slim\Http\Request;
use Slim\Http\Response;
use Logic\ModelSerializers\GroupSerializer;

$app->get('/api/recommended', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    
    $userGroups = $user->groups;
    $userGroupIds = array();
    foreach($userGroups as $g)
        array_push($userGroupIds, $g->id);
    
    $Q = new Queue();

    $Q->NQ($user);
    $visitedGroups = array();
    $visitedUsers = array();
    array_push($visitedUsers, $user->id);
    $count = 0;
    while (!$Q->isEmpty()){
        $currUser = $Q->DQ();
        
        foreach($currUser->groups as $group){
            if (in_array($group->id, $visitedGroups)){
                array_push($visitedGroups, $group->id);
                continue;
            }
            $groupUsers = $group->users;
            array_push($visitedGroups, $group->id);
            foreach($groupUsers as $gu){
                if (in_array($gu->id, $visitedUsers) || $count > 100) continue; // add all users to Q
                $count++;
                array_push($visitedUsers, $gu->id);
                $Q->NQ($gu);
            }
        }
    }
    $counts = array_count_values($visitedGroups);
    // return the highest n recommendations such that the start user is not already in the group
    $i = count($counts);
    $j = 0;
    $arrOut = array();
    while ($tempGroup = current($counts)){
        $gID = key($counts);
        next($counts);
        if (in_array($gID, $userGroupIds))
            continue;
        $g = Group::Find($gID);
        array_push($arrOut, $g);
        if (++$j >= 3)
            break;
    }
    $gs = new GroupSerializer;
    $response->write(json_encode($gs->toApiList($arrOut)));
    return $response;
});


Class Queue {

    private $tail;
    private $head;
    private $count;
    function __construct(){
        $this->tail = new ListItem(null);
        $this->head = new ListItem(null);
        $this->tail->setNext(null);
        $this->head->setPrev(null);
        $this->head->setnext($this->tail);
        $this->tail->setPrev($this->head);
        $this->count = 0;
    }

    function NQ($value){
        $last = $this->tail->getPrev();
        $add = new ListItem($value);
        $last->setNext($add);
        $this->tail->setPrev($add);
        $add->setPrev($last);
        $add->setNext($this->tail);
        $this->count++;
    }

    function DQ(){
        if ($this->isEmpty())
            return;
        $this->count--;
        $first = $this->head->getNext();
        $newFirst = $first->getNext();
        $this->head->setNext($newFirst);
        $newFirst->setPrev($this->head);
        return $first->getVal();
    }

    function isEmpty(){
        if ($this->count ==  0) return true;
        return false;
    }
}

Class ListItem {
    private $prev;
    private $next;
    private $val;

    function __construct($input){
        $this->val = $input;
    }

    function getVal(){
        return $this->val;
    }

    function getPrev(){
        return $this->prev;
    }

    function setPrev($val){
        $this->prev = $val;
    }

    function getNext(){
        return $this->next;
    }

    function setNext($val){
        $this->next = $val;
    }
}