
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'RadioSrf1',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://www.srf.ch",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      music: {
      },

    }
  }


  entity = {
    "music": {
      "fields": [
        {
          "name": "album",
          "type": "`$STRING`"
        },
        {
          "name": "artist",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "type": "`$INTEGER`"
        },
        {
          "name": "playedAt",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "req": true,
          "type": "`$STRING`"
        }
      ],
      "name": "music",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "date",
                    "orig": "date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/radio-srf-1/gespielte-musik",
              "parts": [
                "radio-srf-1",
                "gespielte-musik"
              ],
              "select": {
                "exist": [
                  "date",
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.tracks`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

