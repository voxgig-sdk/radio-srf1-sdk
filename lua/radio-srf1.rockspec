package = "voxgig-sdk-radio-srf1"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/radio-srf1-sdk.git"
}
description = {
  summary = "RadioSrf1 SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["radio-srf1_sdk"] = "radio-srf1_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
