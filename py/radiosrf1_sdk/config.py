# RadioSrf1 SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "RadioSrf1",
            "slug": "radio-srf1",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://www.srf.ch",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "music": {},
            },
        },
        "entity": {
      "music": {
        "fields": [
          {
            "name": "album",
            "short": "Album name",
            "type": "`$STRING`",
          },
          {
            "name": "artist",
            "req": True,
            "short": "Artist name",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "short": "Duration in seconds",
            "type": "`$INTEGER`",
          },
          {
            "format": "date-time",
            "name": "playedAt",
            "short": "Timestamp when the song was played",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "req": True,
            "short": "Song title",
            "type": "`$STRING`",
          },
        ],
        "name": "music",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/radio-srf-1/gespielte-musik",
                "segments": [
                  {
                    "lit": "radio-srf-1",
                  },
                  {
                    "lit": "gespielte-musik",
                  },
                ],
                "select": {
                  "exist": [
                    "date",
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.tracks`",
                },
                "parts": [
                  "radio-srf-1",
                  "gespielte-musik",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
