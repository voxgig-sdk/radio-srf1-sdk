# RadioSrf1 SDK feature factory

from radiosrf1_sdk.feature.base_feature import RadioSrf1BaseFeature
from radiosrf1_sdk.feature.ratelimit_feature import RadioSrf1RatelimitFeature
from radiosrf1_sdk.feature.retry_feature import RadioSrf1RetryFeature
from radiosrf1_sdk.feature.test_feature import RadioSrf1TestFeature
from radiosrf1_sdk.feature.timeout_feature import RadioSrf1TimeoutFeature


_FEATURES = {
    "base": lambda: RadioSrf1BaseFeature(),
    "ratelimit": lambda: RadioSrf1RatelimitFeature(),
    "retry": lambda: RadioSrf1RetryFeature(),
    "test": lambda: RadioSrf1TestFeature(),
    "timeout": lambda: RadioSrf1TimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
