package voxgigradiosrf1sdk

import (
	"github.com/voxgig-sdk/radio-srf1-sdk/go/core"
	"github.com/voxgig-sdk/radio-srf1-sdk/go/entity"
	"github.com/voxgig-sdk/radio-srf1-sdk/go/feature"
	_ "github.com/voxgig-sdk/radio-srf1-sdk/go/utility"
)

// Type aliases preserve external API.
type RadioSrf1SDK = core.RadioSrf1SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type RadioSrf1Entity = core.RadioSrf1Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type RadioSrf1Error = core.RadioSrf1Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewMusicEntityFunc = func(client *core.RadioSrf1SDK, entopts map[string]any) core.RadioSrf1Entity {
		return entity.NewMusicEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewRadioSrf1SDK = core.NewRadioSrf1SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
