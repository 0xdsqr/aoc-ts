# @dsqr/aoc-utils

Lightweight async utilities for reading Advent of Code puzzle input from files, URLs, or AoC servers.

## ⇁ Installation

| Package Manager | Command |
|-----------------|---------|
| bun | `bun add @dsqr/aoc-utils` |
| npm | `npm install @dsqr/aoc-utils` |
| pnpm | `pnpm add @dsqr/aoc-utils` |

## ⇁ Quick Start

```typescript
import { forEach, readAocInput } from "@dsqr/aoc-utils"

await forEach(readAocInput(1), (line) => {
  console.log(line)
})
```

## ⇁ API Reference

### Generators

<details><summary><strong>readFromFile(path, options?)</strong></summary>

Async generator that reads a file line-by-line.

```typescript
import { readFromFile } from "@dsqr/aoc-utils"

for await (const line of readFromFile("./input.txt")) {
  console.log(line)
}
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `path` | string | - | Path to the file |
| `options.skipEmpty` | boolean | true | Skip empty lines |

</details>

<details><summary><strong>readFromUrl(url, options?)</strong></summary>

Async generator that fetches a URL and reads it line-by-line.

```typescript
import { readFromUrl } from "@dsqr/aoc-utils"

for await (const line of readFromUrl("https://example.com/data.txt")) {
  console.log(line)
}
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | string | - | URL to fetch |
| `options.skipEmpty` | boolean | true | Skip empty lines |

</details>

<details><summary><strong>readAocInput(day, year?, options?)</strong></summary>

Async generator that fetches puzzle input from Advent of Code servers.

```typescript
import { readAocInput } from "@dsqr/aoc-utils"

// Requires AOC_SESSION environment variable
for await (const line of readAocInput(1, 2025)) {
  console.log(line)
}
```

**Setup:**
Get your session cookie from https://adventofcode.com (DevTools → Cookies → session):
```bash
export AOC_SESSION=your_cookie_here
```

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `day` | number | - | Puzzle day (1-25) |
| `year` | number | 2025 | Puzzle year |
| `options.skipEmpty` | boolean | true | Skip empty lines |

</details>

### Helpers

<details><summary><strong>forEach(generator, callback)</strong></summary>

Process each line from a generator with a callback function.

```typescript
import { forEach, readAocInput } from "@dsqr/aoc-utils"

await forEach(readAocInput(1), (line, index) => {
  console.log(`Line ${index}: ${line}`)
})
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `generator` | AsyncGenerator | The source generator |
| `callback` | (line: string, index: number) => Promise<void> \| void | Function called for each line |

</details>

<details><summary><strong>toArray(generator)</strong></summary>

Collect all lines from a generator into an array.

```typescript
import { toArray, readAocInput } from "@dsqr/aoc-utils"

const lines = await toArray(readAocInput(1))
console.log(lines) // string[]
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `generator` | AsyncGenerator | The source generator |

**Returns:**
`Promise<string[]>` - Array of all lines

</details>

<details><summary><strong>first(generator)</strong></summary>

Get the first line from a generator (useful for single-line inputs).

```typescript
import { first, readAocInput } from "@dsqr/aoc-utils"

const line = await first(readAocInput(1))
console.log(line) // string
```

Throws an error if the generator has no lines.

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `generator` | AsyncGenerator | The source generator |

**Returns:**
`Promise<string>` - The first line

**Throws:**
`Error` - "No lines available in generator"

</details>

## ⇁ CLI

Scaffold a new day:

```bash
bun packages/utils/src/cli/aoc-cli.ts scaffold 2
```

**Parameters:**
- `day` (number) - Day number (1-25)

Creates the directory structure:
```
src/day-02/
  ├── solution-one.ts
  ├── solution-two.ts
  └── test/
      └── fixtures/
```

## ⇁ License

Do whatever you want with it. MIT.