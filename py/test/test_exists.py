# ProjectName SDK exists test

import pytest
from radiosrf1_sdk import RadioSrf1SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = RadioSrf1SDK.test(None, None)
        assert testsdk is not None
