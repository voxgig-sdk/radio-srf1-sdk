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
}
