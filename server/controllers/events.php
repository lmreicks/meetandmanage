<?php

use Slim\Http\Request;
use Slim\Http\Response;
use Models\Event;
use Models\User;
use Models\EventLookup;
use Logic\ModelSerializers\EventSerializer;


<<<<<<< HEAD
/**
* returns a json formatted serialized list of all events corresponding to the given user
* is given a request with the user as an attribute
*/
=======

/**
 * @api {get} /user/:id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    [
 *     {
 *       "Id": "1",
 *       "Title": "New Event",
 *       "Description: "DFJK",
 *       "StartDate": 10-19-2019
 *     }
 *    ]
 */
>>>>>>> 69726ff3f516488bf18bfb235b5918591ae02c76
$app->get('/api/event', function (Request $request, Response $response, array $args) {

    $es = new EventSerializer;
    $user = $request->getAttribute('user');
    $events = $user->events;
    $return = json_encode($es->toApiList($events));
    $response->getBody()->write($return);
    return $response;
});

/**
* adds the given api object to the given user in the attribute
* returns the added event
*/
$app->post('/api/event', function (Request $request, Response $response, array $args) {
    
    # need to parse through list of members given in the $request body
    # if the email is in the database, add it to the table mapping events with all of it's members
    # at some point down the road we will add an email api to this to include non members into all of the "fun"

    $es = new EventSerializer;
    $body = json_decode($request->getBody());
    $user = $request->getAttribute('user');
    // $event = new Event; 
    // $validate = new EventValidator($body);
    // if ($validate != true) return $validate;

    // if ($body->OwnerId == NULL) {
    //     $response->write('no ownerId');
    //     return $response;// change to use ann's error handling
    // }
    // if ($user->id != $body->OwnerId){
    //     $resonse->write('user id does not match ownerId');
    //     return $response;// diddo
    // }
    // if ($body->Title == NULL || $body->Title == '') {
    //     $response->write('no Title');
    //     return $response; //diddo
    // }   

    // $event->Title = $body->Title;
    // $event->OwnerId = $body->OwnerId;
    // $event->StartTime = date("H:i", strtotime(substr($body->StartTime, 0, 8)));
    // $event->EndTime = substr($body->EndTime, 0, 8);
    // $event->StartDate = substr($body->StartDate, 0, 10);
    // $event->EndDate = substr($body->EndDate, 0, 10);
    // $event->Notes = $body->Notes;
    // $event->Location = $body->Location;

    $event = $es->toServer($body);
    $event->save();
    $event->users()->attach($user->id);
    $ids = array();
    foreach($members as $m) array_push();
    $event->users()->attach($body->Members);

    $event->save();
    $membersArray = $body->members;
    $response->getBody()->write(json_encode($es->toApi($event)));
    return $response;
});

/**
* deletes the event with the given id, if the id exists and the given user owns the event
*/
$app->delete('/api/event/{id}', function (Request $request, Response $response, array $args){

    $es = new EventSerializer;
    $user = $request->getAttribute('user');
    $eventID = $args['id'];
    $event = Event::where('id','=',$eventID)->first();
    if ($event == NULL) {
        $response->write("Event not found");
        return $response;
    }
    $ownerId = $event->ownerId;
    $userId = $user->id;
    if ($ownerId === $id){
        $event = Event::where('id','=',$eventID)->delete();
        $response->write(json_encode($es->toApi($event)));
        return $response;
    }
    // $response->write("Not your event to delete");
    return $response; //switch to error for not owner of event
});

/**
* updates the given api event to the given user
*/
$app->put('/api/event', function (Request $request, Response $response, array $args) {
    $es = new EventSerializer;
    $body = json_decode($request->getBody());
    $event = $es->toServer($body);
    echo $event;
    // $event_id = $es->id;
    // $event = Event::find($event_id);
    $existing = Event::find($event->id);
    $existing->title = $event->title;
    $existing->location = $event->location;
    $existing->notes = $event->notes;
    $user = $request->getAttributes('user');
    // if ($user->id != $event->OwnerId){
    //     $response->getBody()->write("not your event to edit");
    //     return $response;
    // }
    
    
    $existing->save();

    $response->getBody()->write(json_encode($event));

    
    return $response;

});

/**
* takes in an event and validates that there are no errors in the model itself
*/
class EventValidator {
    public function __invoke($body){
        if ($body->StartDate == NULL) return false;
        if ($body->EndDate == NULL) return false;


        
        $title = $body->Title;
        
        $location = $body->Location;
        $StartDate = explode('-',$body->StartDate);
        $endDate = explode('-',$body->EndDate);
        $startTime = explode(':', $body->StartTime);
        $endTime = explode(':', $body->EndTime);
        $eTime = $endTime[0] * 3600 + $endTime[1] * 60 + $endTime[2];
        $sTime = $startTime[0] * 3600 + $startTime[1] * 60 + $startTime[2];
        if ($endDate[2] < $startDate[2]) return false;
        if ($endDate[2] == $startDate[2] && $endDate[0] < $startDate[0]) return false;
        if ($endDate[2] == $startDate[2] && $endDate[0] == $startDate[0] && $endDate[1] < $startDate[1]) return false;
        if ($endDate[2] == $startDate[2] && $endDate[0] == $startDate[0] && $endDate[1] == $startDate[1]) return false;
        if ($endDate[2] == $startDate[2] && $endDate[0] == $startDate[0] && $endDate[1] == $startDate[1] && $eTime < $sTime) return false;
        if ($title == NULL) return false;
        
        return true;
    }
}