package core

type RadioSrf1Error struct {
	IsRadioSrf1Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewRadioSrf1Error(code string, msg string, ctx *Context) *RadioSrf1Error {
	return &RadioSrf1Error{
		IsRadioSrf1Error: true,
		Sdk:              "RadioSrf1",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *RadioSrf1Error) Error() string {
	return e.Msg
}
