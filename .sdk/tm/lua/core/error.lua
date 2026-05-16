-- RadioSrf1 SDK error

local RadioSrf1Error = {}
RadioSrf1Error.__index = RadioSrf1Error


function RadioSrf1Error.new(code, msg, ctx)
  local self = setmetatable({}, RadioSrf1Error)
  self.is_sdk_error = true
  self.sdk = "RadioSrf1"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function RadioSrf1Error:error()
  return self.msg
end


function RadioSrf1Error:__tostring()
  return self.msg
end


return RadioSrf1Error
