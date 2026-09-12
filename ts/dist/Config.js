"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'RadioSrf1',
        slug: "radio-srf1",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://www.srf.ch",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            music: {},
        }
    };
    entity = {
        "music": {
            "fields": [
                {
                    "name": "album",
                    "short": "Album name",
                    "type": "`$STRING`"
                },
                {
                    "name": "artist",
                    "req": true,
                    "short": "Artist name",
                    "type": "`$STRING`"
                },
                {
                    "name": "duration",
                    "short": "Duration in seconds",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "date-time",
                    "name": "playedAt",
                    "short": "Timestamp when the song was played",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "req": true,
                    "short": "Song title",
                    "type": "`$STRING`"
                }
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
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 10,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/radio-srf-1/gespielte-musik",
                            "segments": [
                                {
                                    "lit": "radio-srf-1"
                                },
                                {
                                    "lit": "gespielte-musik"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "date",
                                    "limit"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.tracks`"
                            },
                            "parts": [
                                "radio-srf-1",
                                "gespielte-musik"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map