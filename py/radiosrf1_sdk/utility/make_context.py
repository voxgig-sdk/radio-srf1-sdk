# RadioSrf1 SDK utility: make_context

from radiosrf1_sdk.core.context import RadioSrf1Context


def make_context_util(ctxmap, basectx):
    return RadioSrf1Context(ctxmap, basectx)
