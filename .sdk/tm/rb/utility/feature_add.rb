# RadioSrf1 SDK utility: feature_add
module RadioSrf1Utilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
