
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RadioSrf1SDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = RadioSrf1SDK.test()
    equal(testsdk instanceof RadioSrf1SDK, true,
      'RadioSrf1SDK.test() must return a client synchronously')
  })

})
