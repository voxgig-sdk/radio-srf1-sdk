<?php
declare(strict_types=1);

// RadioSrf1 SDK configuration

class RadioSrf1Config
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "RadioSrf1",
                "slug" => "radio-srf1",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://www.srf.ch",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "music" => [],
                ],
            ],
            "entity" => [
        'music' => [
          'fields' => [
            [
              'name' => 'album',
              'title' => 'Album',
              'type' => '`$STRING`',
              'short' => 'Album name',
            ],
            [
              'name' => 'artist',
              'title' => 'Artist',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Artist name',
            ],
            [
              'name' => 'duration',
              'title' => 'Duration',
              'type' => '`$INTEGER`',
              'short' => 'Duration in seconds',
            ],
            [
              'name' => 'playedAt',
              'title' => 'Played At',
              'type' => '`$STRING`',
              'short' => 'Timestamp when the song was played',
              'format' => 'date-time',
            ],
            [
              'name' => 'title',
              'title' => 'Title',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Song title',
            ],
          ],
          'name' => 'music',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/radio-srf-1/gespielte-musik',
                  'segments' => [
                    [
                      'lit' => 'radio-srf-1',
                    ],
                    [
                      'lit' => 'gespielte-musik',
                    ],
                  ],
                  'parts' => [
                    'radio-srf-1',
                    'gespielte-musik',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.tracks`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 10,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'limit',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return RadioSrf1Features::make_feature($name);
    }
}
