<?php

use Model\Group;
use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/api/recomended', function (Request $request, Response $response, array $args) {
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');

    $Q = new Queue();
    $Q->NQ($user);
    $visitedGroups = array();
    $visitedUsers = array();

    while (!$Q->isEmpty()){
        $currUser = $Q->DQ();
        $currGroups = $currUser->group;
        foreach($currGroups as $group){
            $groupUsers = $group->users;
            if (in_array($group, $visitedGroups)) continue;
            foreach($groupUsers as $gu){
                if (in_array($gu, $visitedUsers)) continue;
                $Q->NQ($gu);
            }
        }
    }
});


Class Queue {

    private $tail;
    private $head;

    function __construct(){
        $tail = new ListItem(null);
        $head = new ListItem(null);
        $tail->prev = $head;
        $head->next = $tail;
    }

    function NQ($value){
        $last = $tail->prev;
        $new = new ListItem($value);
        $last->next = $new;
        $new->next = $tail;
        $tail->prev = $new;
    }

    function DQ(){
        $toRemove = $head->next;
        $newFirst = $toRemove->next;
        $head->next = $newFirst;
        $newFirst->prev = $head;
        return $toRemove->val;
    }

    function isEmpty(){
        if ($head->next == $tail) return true;
        return false;
    }
}

Class ListItem {
    public $prev;
    public $next;
    public $val;

    function __construct($input){
        $val = $input;
    }
}