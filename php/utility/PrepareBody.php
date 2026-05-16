<?php
declare(strict_types=1);

// RadioSrf1 SDK utility: prepare_body

class RadioSrf1PrepareBody
{
    public static function call(RadioSrf1Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
