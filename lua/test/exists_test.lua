-- RadioSrf1 SDK exists test

local sdk = require("radio-srf1_sdk")

describe("RadioSrf1SDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
