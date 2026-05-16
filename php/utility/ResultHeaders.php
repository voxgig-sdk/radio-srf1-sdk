<?php
declare(strict_types=1);

// RadioSrf1 SDK utility: result_headers

class RadioSrf1ResultHeaders
{
    public static function call(RadioSrf1Context $ctx): ?RadioSrf1Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
