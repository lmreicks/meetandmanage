<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Logic\ModelSerializers\EventSerializer;
use Logic\ModelSerializers\UserSerializer;
use Logic\Errors\ErrorResponse;
use Logic\Errors\StatusCodes;

/**
 * @api {get} /event
 * @apiHeader: {string} authentication a users unique authentication token
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
    $user = $request->getAttribute('user');
    $events = $user->events;
    $return = json_encode($es->toApiList($events));
    $response->getBody()->write($return);
    return $response;
});

/**
 * @api {post} /event
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
    
    $es = new EventSerializer;
    $us = new UserSerializer;
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    $event = $es->toServer($body);

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
    return $response;
    
});

/**@api {delete} /event
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
        $response->write(json_encode($es->toApi($event)));
        return $response;
    }
    $response = $re($response, StatusCodes::HTTP_BAD_REQUEST, "Not your event to delete");
    return $response; //switch to error for not owner of event
});

/**@api {put} /event
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
    
    
    $existing->save();

    $response->getBody()->write(json_encode($event));

    
    return $response;

});

/**
* takes in an event and validates that there are no errors in the model itself
*/
class EventValidator {
    public function __invoke($body, $response) {

        $er = new ErrorResponse;
        if ($body->start_date == NULL) return $er($response, HTTP_BAD_REQUEST, EVENT_START_DATE_NULL);
        if ($body->end_date == NULL) return $er($response, HTTP_BAD_REQUEST, EVENT_END_DATE_NULL);

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
