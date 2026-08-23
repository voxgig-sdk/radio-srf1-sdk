# RadioSrf1 SDK configuration

module RadioSrf1Config
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "RadioSrf1",
        "slug" => "radio-srf1",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://www.srf.ch",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "music" => {},
        },
      },
      "entity" => {
        "music" => {
          "fields" => [
            {
              "name" => "album",
              "short" => "Album name",
              "type" => "`$STRING`",
            },
            {
              "name" => "artist",
              "req" => true,
              "short" => "Artist name",
              "type" => "`$STRING`",
            },
            {
              "name" => "duration",
              "short" => "Duration in seconds",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "playedAt",
              "short" => "Timestamp when the song was played",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "req" => true,
              "short" => "Song title",
              "type" => "`$STRING`",
            },
          ],
          "name" => "music",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "date",
                        "orig" => "date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/radio-srf-1/gespielte-musik",
                  "parts" => [
                    "radio-srf-1",
                    "gespielte-musik",
                  ],
                  "select" => {
                    "exist" => [
                      "date",
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.tracks`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    RadioSrf1Features.make_feature(name)
  end
end
