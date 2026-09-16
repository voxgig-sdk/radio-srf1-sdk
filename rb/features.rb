# RadioSrf1 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module RadioSrf1Features
  def self.make_feature(name)
    case name
    when "base"
      RadioSrf1BaseFeature.new
    when "ratelimit"
      RadioSrf1RatelimitFeature.new
    when "retry"
      RadioSrf1RetryFeature.new
    when "test"
      RadioSrf1TestFeature.new
    when "timeout"
      RadioSrf1TimeoutFeature.new
    else
      RadioSrf1BaseFeature.new
    end
  end
end
