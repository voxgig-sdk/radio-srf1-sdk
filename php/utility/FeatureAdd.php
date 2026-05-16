<?php
declare(strict_types=1);

// RadioSrf1 SDK utility: feature_add

class RadioSrf1FeatureAdd
{
    public static function call(RadioSrf1Context $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
