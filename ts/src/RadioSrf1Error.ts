
import { Context } from './Context'


class RadioSrf1Error extends Error {

  isRadioSrf1Error = true

  sdk = 'RadioSrf1'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  RadioSrf1Error
}

