<?php
declare(strict_types=1);

// RadioSrf1 SDK context

require_once __DIR__ . '/Control.php';
require_once __DIR__ . '/Operation.php';
require_once __DIR__ . '/Spec.php';
require_once __DIR__ . '/Result.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Error.php';
require_once __DIR__ . '/Helpers.php';

class RadioSrf1Context
{
    public string $id;
    public array $out;
    public mixed $client;
    public ?RadioSrf1Utility $utility;
    public RadioSrf1Control $ctrl;
    public array $meta;
    public ?array $config;
    public ?array $entopts;
    public ?array $options;
    public mixed $entity;
    public ?array $shared;
    public array $opmap;
    public array $data;
    public array $reqdata;
    public array $match;
    public array $reqmatch;
    public ?array $point;
    public ?RadioSrf1Spec $spec;
    public ?RadioSrf1Result $result;
    public ?RadioSrf1Response $response;
    public RadioSrf1Operation $op;

    public function __construct(array $ctxmap = [], ?self $basectx = null)
    {
        $this->id = 'C' . random_int(10000000, 99999999);
        $this->out = [];

        $this->client = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'client') ?? ($basectx ? $basectx->client : null);
        $this->utility = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'utility') ?? ($basectx ? $basectx->utility : null);

        $this->ctrl = new RadioSrf1Control();
        $ctrl_raw = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'ctrl');
        if (is_array($ctrl_raw)) {
            if (array_key_exists('throw', $ctrl_raw)) {
                $this->ctrl->throw_err = $ctrl_raw['throw'];
            }
            if (isset($ctrl_raw['explain']) && is_array($ctrl_raw['explain'])) {
                $this->ctrl->explain = $ctrl_raw['explain'];
            }
        } elseif ($basectx !== null && $basectx->ctrl !== null) {
            $this->ctrl = $basectx->ctrl;
        }

        $m = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'meta');
        $this->meta = is_array($m) ? $m : ($basectx ? $basectx->meta ?? [] : []);

        $cfg = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'config');
        $this->config = is_array($cfg) ? $cfg : ($basectx ? $basectx->config : null);

        $eo = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'entopts');
        $this->entopts = is_array($eo) ? $eo : ($basectx ? $basectx->entopts : null);

        $o = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'options');
        $this->options = is_array($o) ? $o : ($basectx ? $basectx->options : null);

        $e = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'entity');
        $this->entity = $e ?? ($basectx ? $basectx->entity : null);

        $s = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'shared');
        $this->shared = is_array($s) ? $s : ($basectx ? $basectx->shared : null);

        $om = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'opmap');
        $this->opmap = is_array($om) ? $om : ($basectx ? $basectx->opmap ?? [] : []);

        $this->data = RadioSrf1Helpers::to_map(RadioSrf1Helpers::get_ctx_prop($ctxmap, 'data')) ?? [];
        $this->reqdata = RadioSrf1Helpers::to_map(RadioSrf1Helpers::get_ctx_prop($ctxmap, 'reqdata')) ?? [];
        $this->match = RadioSrf1Helpers::to_map(RadioSrf1Helpers::get_ctx_prop($ctxmap, 'match')) ?? [];
        $this->reqmatch = RadioSrf1Helpers::to_map(RadioSrf1Helpers::get_ctx_prop($ctxmap, 'reqmatch')) ?? [];

        $pt = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'point');
        $this->point = is_array($pt) ? $pt : ($basectx ? $basectx->point : null);

        $sp = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'spec');
        $this->spec = ($sp instanceof RadioSrf1Spec) ? $sp : ($basectx ? $basectx->spec : null);

        $r = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'result');
        $this->result = ($r instanceof RadioSrf1Result) ? $r : ($basectx ? $basectx->result : null);

        $rp = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'response');
        $this->response = ($rp instanceof RadioSrf1Response) ? $rp : ($basectx ? $basectx->response : null);

        $opname = RadioSrf1Helpers::get_ctx_prop($ctxmap, 'opname') ?? '';
        $this->op = $this->resolve_op($opname);
    }

    public function resolve_op(string $opname): RadioSrf1Operation
    {
        // Cache key is `<entity>:<opname>` so two entities with the same op
        // (e.g. both have a "list") get distinct cached Operations. Keying
        // on opname alone caused the first-resolved entity's points to be
        // served to every subsequent entity's call.
        $entname = (is_object($this->entity) && method_exists($this->entity, 'get_name'))
            ? $this->entity->get_name()
            : '_';
        $cacheKey = $entname . ':' . $opname;

        if (isset($this->opmap[$cacheKey])) {
            return $this->opmap[$cacheKey];
        }
        if ($opname === '') {
            return new RadioSrf1Operation([]);
        }

        $opcfg = \Voxgig\Struct\Struct::getpath($this->config, "entity.{$entname}.op.{$opname}");

        $input = ($opname === 'update' || $opname === 'create') ? 'data' : 'match';

        $points = [];
        if (is_array($opcfg)) {
            $t = \Voxgig\Struct\Struct::getprop($opcfg, 'points');
            if (is_array($t)) {
                $points = $t;
            }
        }

        $op = new RadioSrf1Operation([
            'entity' => $entname,
            'name' => $opname,
            'input' => $input,
            'points' => $points,
        ]);
        $this->opmap[$cacheKey] = $op;
        return $op;
    }

    public function make_error(string $code, string $msg): RadioSrf1Error
    {
        return new RadioSrf1Error($code, $msg, $this);
    }
}
