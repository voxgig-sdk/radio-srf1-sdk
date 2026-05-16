# RadioSrf1 SDK utility: make_context
require_relative '../core/context'
module RadioSrf1Utilities
  MakeContext = ->(ctxmap, basectx) {
    RadioSrf1Context.new(ctxmap, basectx)
  }
end
