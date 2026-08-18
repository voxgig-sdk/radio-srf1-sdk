-- RadioSrf1 SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "RadioSrf1",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://www.srf.ch",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["music"] = {},
      },
    },
    entity = {
      ["music"] = {
        ["fields"] = {
          {
            ["name"] = "album",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "artist",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "duration",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "playedAt",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "music",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/radio-srf-1/gespielte-musik",
                ["parts"] = {
                  "radio-srf-1",
                  "gespielte-musik",
                },
                ["select"] = {
                  ["exist"] = {
                    "date",
                    "limit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.tracks`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
