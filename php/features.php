<?php
declare(strict_types=1);

// RadioSrf1 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class RadioSrf1Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new RadioSrf1BaseFeature();
            case "test":
                return new RadioSrf1TestFeature();
            default:
                return new RadioSrf1BaseFeature();
        }
    }

    /**
     * Does a generated feature class back this name? False for a name only
     * an options extend instance can supply (the station adopt path) - the
     * constructor uses this to skip make_feature for such names instead of
     * adding a stray BaseFeature.
     */
    public static function has_feature(string $name): bool
    {
        switch ($name) {
            case "base":
            case "test":
                return true;
            default:
                return false;
        }
    }
}
