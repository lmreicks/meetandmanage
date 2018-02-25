<?php 

namespace Models;

class Error {
    public $statusCode;
    public $message;
}

function setError($response, $statusCode, $message) {
    $error = array(
        "statuscode" => $statusCode,
        "message" => $message
    );
    $response->withStatus($statusCode)->write(json_endcode($error));
    return $response;
}