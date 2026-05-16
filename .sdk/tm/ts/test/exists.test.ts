
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RadioSrf1SDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await RadioSrf1SDK.test()
    equal(null !== testsdk, true)
  })

})
