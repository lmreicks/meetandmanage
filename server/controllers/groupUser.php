<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Group;
use Models\User;


 $app->delete('/api/groupUser', function (Request $request, Response $response, array $args){
    $body = json_decode($request->getBody());
    //currently with just the id... If we are deleting a user as given a user object we can query the id
    $delete_id = $args['id'];
    $group_id = $body->group_id;
    $group = new Group;
    $group = Group::where('id', '=', $group_id)->first();
    //selects member ids based off of group_id and member provided in api call
    $members = Group::select('members')->where('members', 'regexp', $delete_id, 'and', 'id', '=', $group_id)->first()["members"];
    $delete_str= "'" . $delete_id . "',";
    $members2 = str_replace($delete_str, "", $members);

    $delete_str_2 = ",'" . $delete_id . "'";
    $members2 = str_replace($delete_str_2, "", $members2);

    $delete_str_3 = "'" . $delete_id . "'";
    $members2 = str_replace($delete_str_3, "", $members2);

	// $members3 = str_replace("\"members\":", "", $members2); NOTE we do not rly need this anymore, getting the dictionary value at the key "members" fixed it :)
    $group->members = $members2;
    $group->save();

    //check to see if query works
    $response->getBody()->write(json_encode($group));
    echo $members;
    return $response;
});

$app->put('/api/groupUser', function (Request $request, Response $response, array $args){
    $body = json_decode($request->getBody());
    //currently with just the id... If we are deleting a user as given a user object we can query the id
    $update_id = $args['id'];
    $group_id = $body->group_id;
    $group = new Group;
    $group = Group::where('id', '=', $group_id)->first();
    //selects member ids based off of group_id and member provided in api call
    $members = Group::select('members')->where('id', '=', $group_id)->first()["members"];
    $members2 = $members . "," . "'" . $update_id . "'";
    $group->members = $members2;
    $group->save();

    $response->getBody()->write(json_encode($group));
    echo $members;
    return $response;
});