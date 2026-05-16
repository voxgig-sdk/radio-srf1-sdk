<?php
declare(strict_types=1);

// RadioSrf1 SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

RadioSrf1Utility::setRegistrar(function (RadioSrf1Utility $u): void {
    $u->clean = [RadioSrf1Clean::class, 'call'];
    $u->done = [RadioSrf1Done::class, 'call'];
    $u->make_error = [RadioSrf1MakeError::class, 'call'];
    $u->feature_add = [RadioSrf1FeatureAdd::class, 'call'];
    $u->feature_hook = [RadioSrf1FeatureHook::class, 'call'];
    $u->feature_init = [RadioSrf1FeatureInit::class, 'call'];
    $u->fetcher = [RadioSrf1Fetcher::class, 'call'];
    $u->make_fetch_def = [RadioSrf1MakeFetchDef::class, 'call'];
    $u->make_context = [RadioSrf1MakeContext::class, 'call'];
    $u->make_options = [RadioSrf1MakeOptions::class, 'call'];
    $u->make_request = [RadioSrf1MakeRequest::class, 'call'];
    $u->make_response = [RadioSrf1MakeResponse::class, 'call'];
    $u->make_result = [RadioSrf1MakeResult::class, 'call'];
    $u->make_point = [RadioSrf1MakePoint::class, 'call'];
    $u->make_spec = [RadioSrf1MakeSpec::class, 'call'];
    $u->make_url = [RadioSrf1MakeUrl::class, 'call'];
    $u->param = [RadioSrf1Param::class, 'call'];
    $u->prepare_auth = [RadioSrf1PrepareAuth::class, 'call'];
    $u->prepare_body = [RadioSrf1PrepareBody::class, 'call'];
    $u->prepare_headers = [RadioSrf1PrepareHeaders::class, 'call'];
    $u->prepare_method = [RadioSrf1PrepareMethod::class, 'call'];
    $u->prepare_params = [RadioSrf1PrepareParams::class, 'call'];
    $u->prepare_path = [RadioSrf1PreparePath::class, 'call'];
    $u->prepare_query = [RadioSrf1PrepareQuery::class, 'call'];
    $u->result_basic = [RadioSrf1ResultBasic::class, 'call'];
    $u->result_body = [RadioSrf1ResultBody::class, 'call'];
    $u->result_headers = [RadioSrf1ResultHeaders::class, 'call'];
    $u->transform_request = [RadioSrf1TransformRequest::class, 'call'];
    $u->transform_response = [RadioSrf1TransformResponse::class, 'call'];
});
