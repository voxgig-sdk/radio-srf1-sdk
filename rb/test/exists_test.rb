# RadioSrf1 SDK exists test

require "minitest/autorun"
require_relative "../RadioSrf1_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = RadioSrf1SDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
