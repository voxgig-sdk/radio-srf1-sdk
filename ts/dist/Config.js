"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
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
                    "title": "Album",
                    "type": "`$STRING`",
                    "short": "Album name"
                },
                {
                    "name": "artist",
                    "title": "Artist",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Artist name"
                },
                {
                    "name": "duration",
                    "title": "Duration",
                    "type": "`$INTEGER`",
                    "short": "Duration in seconds"
                },
                {
                    "name": "playedAt",
                    "title": "Played At",
                    "type": "`$STRING`",
                    "short": "Timestamp when the song was played",
                    "format": "date-time"
                },
                {
                    "name": "title",
                    "title": "Title",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Song title"
                }
            ],
            "name": "music",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
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
                            "parts": [
                                "radio-srf-1",
                                "gespielte-musik"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.tracks`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "date",
                                    "limit"
                                ]
                            }
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