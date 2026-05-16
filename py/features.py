# RadioSrf1 SDK feature factory

from feature.base_feature import RadioSrf1BaseFeature
from feature.test_feature import RadioSrf1TestFeature


def _make_feature(name):
    features = {
        "base": lambda: RadioSrf1BaseFeature(),
        "test": lambda: RadioSrf1TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
