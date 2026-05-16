<?php
declare(strict_types=1);

// RadioSrf1 SDK utility: feature_hook

class RadioSrf1FeatureHook
{
    public static function call(RadioSrf1Context $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
