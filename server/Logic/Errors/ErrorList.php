<?php

namespace Logic\Errors;

class ErrorList {
    // const DEFAULT = 'There was a problem handling your request. Please try again';
    const NOT_AUTHORIZED_TO_DELETE = 'You are not authorized to delete this resource';
    const NOT_AUTHORIZED_TO_VIEW = "You are not authorized to view this resource";
    const NOT_AUTHORIZED_TO_EDIT = "You are not authorized to edit this resource";

    // event
    const EVENT_NOT_FOUND = "The event requested was not found";
    const EVENT_START_DATE_NULL = "Event start date is null";
    const EVENT_START_TIME_NULL = "Event start time is null";
    const EVENT_END_DATE_NULL = "Event end date is null";
    const EVENT_END_TIME_NULL = "Event end time is null";
    const EVENT_END_BEFORE_START = "Event start is after end date";
    const EVENT_TITLE_NULL = "Event title is null";
    
}