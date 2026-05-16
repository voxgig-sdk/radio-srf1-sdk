# RadioSrf1 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module RadioSrf1Features
  def self.make_feature(name)
    case name
    when "base"
      RadioSrf1BaseFeature.new
    when "test"
      RadioSrf1TestFeature.new
    else
      RadioSrf1BaseFeature.new
    end
  end
end
