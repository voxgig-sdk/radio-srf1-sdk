-- RadioSrf1 SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "RadioSrf1",
      slug = "radio-srf1",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
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
            ["title"] = "Album",
            ["type"] = "`$STRING`",
            ["short"] = "Album name",
          },
          {
            ["name"] = "artist",
            ["title"] = "Artist",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Artist name",
          },
          {
            ["name"] = "duration",
            ["title"] = "Duration",
            ["type"] = "`$INTEGER`",
            ["short"] = "Duration in seconds",
          },
          {
            ["name"] = "playedAt",
            ["title"] = "Played At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the song was played",
            ["format"] = "date-time",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Song title",
          },
        },
        ["name"] = "music",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/radio-srf-1/gespielte-musik",
                ["segments"] = {
                  {
                    ["lit"] = "radio-srf-1",
                  },
                  {
                    ["lit"] = "gespielte-musik",
                  },
                },
                ["parts"] = {
                  "radio-srf-1",
                  "gespielte-musik",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.tracks`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "date",
                    "limit",
                  },
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
