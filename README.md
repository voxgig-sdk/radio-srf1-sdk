# RadioSrf1 SDK

Radio SRF 1 client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install radio-srf1
```

**Python**
```bash
pip install radio-srf1-sdk
```

**PHP**
```bash
composer require voxgig/radio-srf1-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/radio-srf1-sdk/go
```

**Ruby**
```bash
gem install radio-srf1-sdk
```

**Lua**
```bash
luarocks install radio-srf1-sdk
```

## Quickstart

### TypeScript

```ts
import { RadioSrf1SDK } from 'radio-srf1'

const client = new RadioSrf1SDK({
  apikey: process.env.RADIO-SRF1_APIKEY,
})

// List all musics
const musics = await client.Music().list()
console.log(musics.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o radio-srf1-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "radio-srf1": {
      "command": "/abs/path/to/radio-srf1-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Music** |  | `/radio-srf-1/gespielte-musik` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from radiosrf1_sdk import RadioSrf1SDK

client = RadioSrf1SDK({
    "apikey": os.environ.get("RADIO-SRF1_APIKEY"),
})

# List all musics
musics, err = client.Music().list()
print(musics)
```

### PHP

```php
<?php
require_once 'radiosrf1_sdk.php';

$client = new RadioSrf1SDK([
    "apikey" => getenv("RADIO-SRF1_APIKEY"),
]);

// List all musics
[$musics, $err] = $client->Music()->list();
print_r($musics);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/radio-srf1-sdk/go"

client := sdk.NewRadioSrf1SDK(map[string]any{
    "apikey": os.Getenv("RADIO-SRF1_APIKEY"),
})

// List all musics
musics, err := client.Music(nil).List(nil, nil)
fmt.Println(musics)
```

### Ruby

```ruby
require_relative "RadioSrf1_sdk"

client = RadioSrf1SDK.new({
  "apikey" => ENV["RADIO-SRF1_APIKEY"],
})

# List all musics
musics, err = client.Music().list
puts musics
```

### Lua

```lua
local sdk = require("radio-srf1_sdk")

local client = sdk.new({
  apikey = os.getenv("RADIO-SRF1_APIKEY"),
})

-- List all musics
local musics, err = client:Music():list()
print(musics)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = RadioSrf1SDK.test()
const result = await client.Music().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = RadioSrf1SDK.test()
result, err = client.Music().load({"id": "test01"})
```

### PHP

```php
$client = RadioSrf1SDK::test();
[$result, $err] = $client->Music()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Music(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RadioSrf1SDK.test
result, err = client.Music().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Music():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the Radio SRF 1 OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
