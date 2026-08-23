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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'short' => 'Album name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'artist',
              'req' => true,
              'short' => 'Artist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'duration',
              'short' => 'Duration in seconds',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'playedAt',
              'short' => 'Timestamp when the song was played',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'req' => true,
              'short' => 'Song title',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'music',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/radio-srf-1/gespielte-musik',
                  'parts' => [
                    'radio-srf-1',
                    'gespielte-musik',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'limit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.tracks`',
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
