package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "RadioSrf1",
			"slug": "radio-srf1",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://www.srf.ch",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"music": map[string]any{},
			},
		},
		"entity": map[string]any{
			"music": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "album",
						"short": "Album name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artist",
						"req": true,
						"short": "Artist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"short": "Duration in seconds",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "playedAt",
						"short": "Timestamp when the song was played",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"req": true,
						"short": "Song title",
						"type": "`$STRING`",
					},
				},
				"name": "music",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "date",
											"orig": "date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/radio-srf-1/gespielte-musik",
								"segments": []any{
									map[string]any{
										"lit": "radio-srf-1",
									},
									map[string]any{
										"lit": "gespielte-musik",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tracks`",
								},
								"parts": []any{
									"radio-srf-1",
									"gespielte-musik",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
