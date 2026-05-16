package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewMusicEntityFunc func(client *RadioSrf1SDK, entopts map[string]any) RadioSrf1Entity

