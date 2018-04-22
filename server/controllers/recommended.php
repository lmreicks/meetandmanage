<?php

use Model\Group;
use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/api/recomended', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    
    $Q = new Queue();

    $Q->NQ(10);
    echo $Q->DQ();
    if ($Q->isEmpty()){
        $response->write(json_encode("Q works ish"));
        return $response;
    } 
    $Q->NQ($user);
    $visitedGroups = array();
    $visitedUsers = array();
    $count = 0;
    while (!$Q->isEmpty()){
        $currUser = $Q->DQ();
        echo $currUser;
        $currGroups = $currUser->group;
        foreach($currGroups as $group){
            $groupUsers = $group->users;
            echo $group;
            if (in_array($group, $visitedGroups)){
                array_push($visitedGroups, $group);// add group again to cound the total times each group is found in the search
                continue; 
            }  // do not revisit group if already seen
            array_push($visitedGroups, $group); // add group to visited
            foreach($groupUsers as $gu){
                if (in_array($gu, $visitedUsers)) continue; // add all users to Q
                array_push($visitedUsers, $gu);
                $Q->NQ($gu);
            }
        }
    }
    $counts = array_count_values($visitedGroups);
    print_r($counts);
    $response->write(json_encode($counts));
    return $response;
});


Class Queue {

    private $tail;
    private $head;

    function __construct(){
        $this->tail = new ListItem(null);
        $this->head = new ListItem(null);
        $this->tail->setNext(null);
        $this->head->setPrev(null);
        $this->head->setnext($this->tail);
        $this->tail->setPrev($this->head);
    }

    function NQ($value){
        $last = $this->tail->getPrev();
        $add = new ListItem($value);
        $last->setNext($add);
        $this->tail->setPrev($add);
        $add->setPrev($last);
        $add->setNext($this->tail);
    }

    function DQ(){
        if ($this->isEmpty())
            return;
        $first = $this->head->getNext();
        $newFirst = $first->getNext();
        $this->head->setNext($newFirst);
        $newFirst->setPrev($this->head);
    }

    function isEmpty(){
        if ($this->head->getNext() === $this->tail) return true;
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