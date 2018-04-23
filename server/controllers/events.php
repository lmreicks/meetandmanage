<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\Group;
use Models\EventLookup;
use Logic\ModelSerializers\EventSerializer;
use Logic\ModelSerializers\UserSerializer;
use Logic\Errors\ErrorResponse;
use Logic\Errors\StatusCodes;
use Logic\PermissionValidator;


/**
 * @api {get} /event Get all events for current user
 * @apiGroup Event
 * @apiHeader {string} authentication a users unique authentication token
 * @apiSuccessExample {json} Success-Response:
 *    [
 *   {
 *       "Id": 29,
 *       "Title": "309 Meetings",
 *       "OwnerId": "2",
 *       "StartTime": "05:05:00",
 *       "EndTime": "06:05:05",
 *       "StartDate": "2018-03-20",
 *       "EndDate": "2018-03-20",
 *       "Location": "TLA",
 *       "Notes": null,
 *       "Members": [
 *           {
 *               "Id": 1,
 *               "Email": "lexi@gmail.com",
 *               "Name": "lexi"
 *           },
 *           {
 *               "Id": 3,
 *               "Email": "tlnance@iastate.edu",
 *               "Name": "Trevin"
 *           },
 *           {
 *               "Id": 5,
 *               "Email": "bmjensen@iastate.edu",
 *               "Name": "Bailey"
 *           },
 *           {
 *               "Id": 6,
 *               "Email": "anngould@iastate.edu",
 *               "Name": "Ann Gould"
 *           }
 *       ]
 *    },
 *     {
 *         
 *     }
 *]
 */
$app->get('/api/event', function (Request $request, Response $response, array $args) {

    $es = new EventSerializer;
    $user = new User;
    $user = $request->getAttribute('user');
    $events = $user->events;
    $return = json_encode($es->toApiList($events));
    $response->getBody()->write($return);
    return $response;
});

/**
 * @api {post} /event Creates an event
 * @apiGroup Event
 * @apiHeader: {string} authentication a users unique authentication token
 * @apiParamExample {json} Request-Example:
 *  {
 *       "Id": 29,
 *       "Title": "309 Meetings",
 *       "OwnerId": "2",
 *       "StartTime": "05:05:00",
 *       "EndTime": "06:05:05",
 *       "StartDate": "2018-03-20",
 *       "EndDate": "2018-03-20",
 *       "Location": "TLA",
 *       "Notes": null,
 *       "Members": [
 *           {
 *               "Id": 1,
 *               "Email": "lexi@gmail.com",
 *               "Name": "lexi"
 *           },
 *           {
 *               "Id": 3,
 *              "Email": "tlnance@iastate.edu",
 *             "Name": "Trevin"
 *           },
 *           {
 *               "Id": 5,
 *              "Email": "bmjensen@iastate.edu",
 *               "Name": "Bailey"
 *           },
 *           {
 *               "Id": 6,
 *               "Email": "anngould@iastate.edu",
 *               "Name": "Ann Gould"
 *           }
 *       ]
 *   }
 * @apiSuccessExample {json} Success-Response:
 *    {
 *       "Id": 29,
 *       "Title": "309 Meetings",
 *       "OwnerId": "2",
 *       "StartTime": "05:05:00",
 *       "EndTime": "06:05:05",
 *       "StartDate": "2018-03-20",
 *       "EndDate": "2018-03-20",
 *       "Location": "TLA",
 *       "Notes": null,
 *       "Members": [
 *           {
 *               "Id": 1,
 *               "Email": "lexi@gmail.com",
 *               "Name": "lexi"
 *           },
 *           {
 *               "Id": 3,
 *               "Email": "tlnance@iastate.edu",
 *               "Name": "Trevin"
 *           },
 *           {
 *               "Id": 5,
 *               "Email": "bmjensen@iastate.edu",
 *               "Name": "Bailey"
 *           },
 *           {
 *               "Id": 6,
 *               "Email": "anngould@iastate.edu",
 *               "Name": "Ann Gould"
 *           }
 *       ]
 *   }
 */
$app->post('/api/event', function (Request $request, Response $response, array $args) {
<<<<<<< server/controllers/events.php
    
=======
    $pv = new PermissionValidator;
>>>>>>> server/controllers/events.php
    $es = new EventSerializer;
    $us = new UserSerializer;
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    $event = $es->toServer($body);
<<<<<<< server/controllers/events.php

    $ev = new EventValidator;
    $result = $ev($event, $response);
    if ($result->getStatusCode() >= 400){
        $response = $result;
        return $response;
    }
    $event->save();
    $event->users()->attach($user->id);
    $mems = $body->Members;
    if ($mems == null || count($mems) == 0) goto end;
    $members = $us->toServerList($mems);
    $ids = array();
    foreach($members as $m) array_push($ids, $m->id);
    $event->users()->attach($ids);
    $event->save();

    end:
    $response->getBody()->write(json_encode($es->toApi($event)));
=======
    $group_id = $event->group_id;
    if ($group_id != NULL){
        $valid = $pv->is_admin($user->id, $group_id);
        if($valid){
            $event->save();
            $event->users()->attach($user->id);
            $ids = array();
            foreach($members as $m) array_push();
            $event->users()->attach($body->Members);

            $event->save();
            $membersArray = $body->members;
            $response->getBody()->write(json_encode($es->toApi($event)));
        }
        else{
            $response->getBody()->write(json_encode("User permission denied"));
        }
    }

    
>>>>>>> server/controllers/events.php
    return $response;
    
});

/**
 * @api {delete} /event/:id Deletes an event
 * @apiGroup Event
 * @apiHeader: {string} authentication a users unique authentication token
 */
$app->delete('/api/event/{id}', function (Request $request, Response $response, array $args){

    $re = new ErrorResponse;
    $es = new EventSerializer;
    $user = $request->getAttribute('user');
    $eventID = $args['id'];
    $event = Event::where('id','=',$eventID)->first();
    if ($event == NULL) {
        $response = $re($response, StatusCodes::HTTP_BAD_REQUEST, "Event not found");
        return $response;
    }
    
    $ownerId = $event->owner_id;
    $userId = $user->id;
    if ($ownerId == $userId){
        $event = Event::where('id','=',$eventID)->delete();
        $response->write(json_encode(true));
        return $response;
    }
    $response = $re($response, StatusCodes::HTTP_BAD_REQUEST, "Not your event to delete");
    return $response; //switch to error for not owner of event
});

/**
 * @api {put} /event/:id Update an event
 * @apiGroup Event
 * @apiHeader: {string} authentication a users unique authentication token
 * @apiParamExample {json} Request-Example:
 *  {
 *       "Id": 29,
 *       "Title": "309 Meetings",
 *       "OwnerId": "2",
 *       "StartTime": "05:05:00",
 *       "EndTime": "06:05:05",
 *       "StartDate": "2018-03-20",
 *       "EndDate": "2018-03-20",
 *       "Location": "TLA",
 *       "Notes": null,
 *       "Members": [
 *           {
 *               "Id": 1,
 *               "Email": "lexi@gmail.com",
 *               "Name": "lexi"
 *           },
 *           {
 *               "Id": 3,
 *              "Email": "tlnance@iastate.edu",
 *             "Name": "Trevin"
 *           },
 *           {
 *               "Id": 5,
 *              "Email": "bmjensen@iastate.edu",
 *               "Name": "Bailey"
 *           },
 *           {
 *               "Id": 6,
 *               "Email": "anngould@iastate.edu",
 *               "Name": "Ann Gould"
 *           }
 *       ]
 *   }
 * @apiSuccessExample {json} Success-Response:
 *  {
 *       "Id": 29,
 *       "Title": "309 Meetings",
 *       "OwnerId": "2",
 *       "StartTime": "05:05:00",
 *       "EndTime": "06:05:05",
 *       "StartDate": "2018-03-20",
 *       "EndDate": "2018-03-20",
 *       "Location": "TLA",
 *       "Notes": null,
 *       "Members": [
 *           {
 *               "Id": 1,
 *               "Email": "lexi@gmail.com",
 *               "Name": "lexi"
 *           },
 *           {
 *               "Id": 3,
 *              "Email": "tlnance@iastate.edu",
 *             "Name": "Trevin"
 *           },
 *           {
 *               "Id": 5,
 *              "Email": "bmjensen@iastate.edu",
 *               "Name": "Bailey"
 *           },
 *           {
 *               "Id": 6,
 *               "Email": "anngould@iastate.edu",
 *               "Name": "Ann Gould"
 *           }
 *       ]
 *   }
 */
$app->put('/api/event', function (Request $request, Response $response, array $args) {
    $re = new ErrorResponse;
    $es = new EventSerializer;
    $body = json_decode($request->getBody());
    $event = $es->toServer($body);
<<<<<<< server/controllers/events.php
    $ev = new EventValidator;
    $result = $ev($event, $response);
    if ($result->getStatusCode() >= 400){
        $response = $result;
        return $response;
    }
    // $event_id = $es->id;
    // $event = Event::find($event_id);
    $existing = Event::find($event->id);
    $existing->title = $event->title;
    $existing->location = $event->location;
    $existing->notes = $event->notes;
    $user = $request->getAttributes('user');
    if ($user->id != $event->OwnerId){
        $response = $re($response, StatusCodes::HTTP_BAD_REQUEST, "Not your event to edit");
        return $response;
    }
=======
    $user = $request->getAttributes('user');
    $group_id = $event->group_id;
    if ($group_id != NULL){
        $valid = $pv->is_admin($user->id, $group_id);
        if($valid){
            $existing = Event::find($event->id);
            $existing->title = $event->title;
            $existing->location = $event->location;
            $existing->notes = $event->notes;
            $existing->save();
            $response->getBody()->write(json_encode($event));
        }
        else{
            $response->getBody()->write(json_encode("User permission denied"));
        }
    }
    // $event_id = $es->id;
    // $event = Event::find($event_id);
    

    // if ($user->id != $event->OwnerId){
    //     $response->getBody()->write("not your event to edit");
    //     return $response;
    // }
>>>>>>> server/controllers/events.php
    
    
   

    
    return $response;

});

/**
* takes in an event and validates that there are no errors in the model itself
*/
class EventValidator {
    public function __invoke($body, $response) {

        $er = new ErrorResponse;
        if ($body->start_date == NULL) return $er($response, StatusCodes::HTTP_BAD_REQUEST, "Event start date null");
        if ($body->end_date == NULL) return $er($response, StatusCodes::HTTP_BAD_REQUEST, "Event end date null");

        $title = $body->Title;
        
        $location = $body->Location;
        $startDate = $body->start_date;
        $endDate = $body->end_date;
        
        $sDateArr = date_parse($startDate);
        $eDateArr = date_parse($endDate);
       
        if ($sDateArr['year'] > $eDateArr['year'] ||
            $sDateArr['year'] == $eDateArr['year'] && $sDateArr['month'] > $eDateArr['month'] ||
            $sDateArr['year'] == $eDateArr['year'] && $sDateArr['month'] == $eDateArr['month'] && $sDateArr['day'] > $eDateArr['day'] ||
            $sDateArr['year'] == $eDateArr['year'] && $sDateArr['month'] == $eDateArr['month'] && $sDateArr['day'] == $eDateArr['day'] && $sDateArr['hour'] > $eDateArr['hour'] ||
            $sDateArr['year'] == $eDateArr['year'] && $sDateArr['month'] == $eDateArr['month'] && $sDateArr['day'] == $eDateArr['day'] && $sDateArr['hour'] == $eDateArr['hour'] && $sDateArr['minute'] > $eDateArr['minute'] ||
            $sDateArr['year'] == $eDateArr['year'] && $sDateArr['month'] == $eDateArr['month'] && $sDateArr['day'] == $eDateArr['day'] && $sDateArr['hour'] == $eDateArr['hour'] && $sDateArr['minute'] == $eDateArr['minute'] && $sDateArr['second'] > $eDateArr['second']
        ){
            return $er($response, StatusCodes::HTTP_BAD_REQUEST, "Start date after end date"); 
        }      
        return $response;
    }
}
