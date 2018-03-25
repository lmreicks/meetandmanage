<?php

namespace Logic\Errors;

class ErrorList {
    const DEFAULT = "There was a problem handling your request. Please try again";
    const NOT_AUTHORIZED_TO_DELETE = "You are not authorized to delete this resource";
    const NOT_AUTHORIZED_TO_VIEW = "You are not authorized to view this resource";

    // event
    const EVENT_NOT_FOUND = "The event requested was not found";
}