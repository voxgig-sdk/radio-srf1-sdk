

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RadioSrf1SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('MusicEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RADIO_SRF1_TEST_LIVE=TRUE.
  afterEach(liveDelay('RADIO_SRF1_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RadioSrf1SDK.test()
    const ent = testsdk.Music()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RADIO_SRF1_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'music.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"album":{"a":true,"h":"Album","n":"album","r":false,"sh":"Album name","t":"`$STRING`","key$":"album","index$":0},"artist":{"a":true,"h":"Artist","n":"artist","r":true,"sh":"Artist name","t":"`$STRING`","key$":"artist","index$":1},"duration":{"a":true,"h":"Duration","n":"duration","r":false,"sh":"Duration in seconds","t":"`$INTEGER`","key$":"duration","index$":2},"playedAt":{"a":true,"fo":"date-time","h":"Played At","n":"playedAt","r":false,"sh":"Timestamp when the song was played","t":"`$STRING`","key$":"playedAt","index$":3},"title":{"a":true,"h":"Title","n":"title","r":true,"sh":"Song title","t":"`$STRING`","key$":"title","index$":4}},"name":"music","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /radio-srf-1/gespielte-musik","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"date","or":"date","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/radio-srf-1/gespielte-musik","q":{"exist":["date","limit"]},"r":{},"s":[{"lit":"radio-srf-1"},{"lit":"gespielte-musik"}],"t":{"req":"`reqdata`","res":"`body.tracks`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"music","name__orig":"music","Name":"Music","name_":"music","name-":"music","NAME":"MUSIC","index$":0}, {"active":true,"entity":"music","key$":"BasicMusicFlow","kind":"basic","name":"BasicMusicFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"music_ref01"}}],"index$":0}]}, 'Music', {"GET /radio-srf-1/gespielte-musik":{"protocol":"http","operationId":"getPlayedMusic","responses":{"200":{"description":"Successful response with played music information","content":{"application/json":{"schema":{"type":"object","properties":{"tracks":{"items":{"properties":{"album":{"description":"Album name","type":"string","key$":"album"},"artist":{"description":"Artist name","type":"string","key$":"artist"},"duration":{"description":"Duration in seconds","type":"integer","key$":"duration"},"playedAt":{"description":"Timestamp when the song was played","format":"date-time","type":"string","key$":"playedAt"},"title":{"description":"Song title","type":"string","key$":"title"}},"required":["title","artist"],"type":"object","index$":0},"key$":"tracks","type":"array"},"station":{"description":"Radio station name","example":"Radio SRF 1","key$":"station","type":"string"},"lastUpdated":{"description":"Last update timestamp","format":"date-time","key$":"lastUpdated","type":"string"}}},"example":{"tracks":[{"title":"Example Song","artist":"Example Artist","playedAt":"2024-01-15T14:30:00Z","album":"Example Album","duration":210}],"station":"Radio SRF 1","lastUpdated":"2024-01-15T14:35:00Z"}}}},"400":{"description":"Bad request - Invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}}},"parameters":[{"name":"limit","in":"query","description":"Number of tracks to return","required":false,"schema":{"type":"integer","default":10,"minimum":1,"maximum":100},"index$":0},{"name":"date","in":"query","description":"Date for which to retrieve played music (format: YYYY-MM-DD)","required":false,"schema":{"type":"string","format":"date"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let music_ref01_data = Object.values(setup.data.existing.music)[0] as any

    // LIST
    const music_ref01_ent = client.Music()
    const music_ref01_match: any = {}

    const music_ref01_list = (await music_ref01_ent.list(music_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/music/MusicTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = RadioSrf1SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['music01','music02','music03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RADIO_SRF1_TEST_MUSIC_ENTID': idmap,
    'RADIO_SRF1_TEST_LIVE': 'FALSE',
    'RADIO_SRF1_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RADIO_SRF1_TEST_MUSIC_ENTID']

  const live = 'TRUE' === env.RADIO_SRF1_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RADIO_SRF1_TEST_MUSIC_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new RadioSrf1SDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.RADIO_SRF1_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
