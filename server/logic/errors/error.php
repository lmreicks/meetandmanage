<?php 

namespace Logic\Errors;

use Errors\StatusCodes;

class ErrorResponse {
    public $statusCode;
    public $message;

    function __invoke($response, $statusCode, $message) {
        return setError($response, $statusCode, $message);
    }

    function setError($response, $statusCode, $message) {
        if (!StatusCodes::isCode($statusCode)) {
            throw Error("Not a valid status code");
            return $response;
        }
        $error = array(
            "statuscode" => $statusCode,
            "message" => $message
        );
        $response->withStatus($statusCode)->write(json_endcode($error));
        return $response;
    }
}