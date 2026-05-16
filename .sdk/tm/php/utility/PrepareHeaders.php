<?php
declare(strict_types=1);

// RadioSrf1 SDK utility: prepare_headers

class RadioSrf1PrepareHeaders
{
    public static function call(RadioSrf1Context $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
