<?php
declare(strict_types=1);

// RadioSrf1 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class RadioSrf1MakeContext
{
    public static function call(array $ctxmap, ?RadioSrf1Context $basectx): RadioSrf1Context
    {
        return new RadioSrf1Context($ctxmap, $basectx);
    }
}
