<?php
declare(strict_types=1);

// RadioSrf1 SDK utility: result_body

class RadioSrf1ResultBody
{
    public static function call(RadioSrf1Context $ctx): ?RadioSrf1Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
