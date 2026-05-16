# RadioSrf1 SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

RadioSrf1Utility.registrar = ->(u) {
  u.clean = RadioSrf1Utilities::Clean
  u.done = RadioSrf1Utilities::Done
  u.make_error = RadioSrf1Utilities::MakeError
  u.feature_add = RadioSrf1Utilities::FeatureAdd
  u.feature_hook = RadioSrf1Utilities::FeatureHook
  u.feature_init = RadioSrf1Utilities::FeatureInit
  u.fetcher = RadioSrf1Utilities::Fetcher
  u.make_fetch_def = RadioSrf1Utilities::MakeFetchDef
  u.make_context = RadioSrf1Utilities::MakeContext
  u.make_options = RadioSrf1Utilities::MakeOptions
  u.make_request = RadioSrf1Utilities::MakeRequest
  u.make_response = RadioSrf1Utilities::MakeResponse
  u.make_result = RadioSrf1Utilities::MakeResult
  u.make_point = RadioSrf1Utilities::MakePoint
  u.make_spec = RadioSrf1Utilities::MakeSpec
  u.make_url = RadioSrf1Utilities::MakeUrl
  u.param = RadioSrf1Utilities::Param
  u.prepare_auth = RadioSrf1Utilities::PrepareAuth
  u.prepare_body = RadioSrf1Utilities::PrepareBody
  u.prepare_headers = RadioSrf1Utilities::PrepareHeaders
  u.prepare_method = RadioSrf1Utilities::PrepareMethod
  u.prepare_params = RadioSrf1Utilities::PrepareParams
  u.prepare_path = RadioSrf1Utilities::PreparePath
  u.prepare_query = RadioSrf1Utilities::PrepareQuery
  u.result_basic = RadioSrf1Utilities::ResultBasic
  u.result_body = RadioSrf1Utilities::ResultBody
  u.result_headers = RadioSrf1Utilities::ResultHeaders
  u.transform_request = RadioSrf1Utilities::TransformRequest
  u.transform_response = RadioSrf1Utilities::TransformResponse
}
