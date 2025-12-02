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
import { forEachAocLine } from "@dsqr/aoc-utils"

await forEachAocLine(1, (line) => {
  console.log(line)
})
```

## ⇁ API Reference

<details><summary><strong>readFromFile</strong></summary>

Async generator that reads a file line-by-line, skipping empty lines.

```typescript
import { readFromFile } from "@dsqr/aoc-utils"

for await (const line of readFromFile("./input.txt")) {
  console.log(line)
}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | string | Path to the file |

</details>

<details><summary><strong>readFromUrl</strong></summary>

Async generator that fetches a URL and reads it line-by-line, skipping empty lines.

```typescript
import { readFromUrl } from "@dsqr/aoc-utils"

for await (const line of readFromUrl("https://example.com/data.txt")) {
  console.log(line)
}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | URL to fetch |

</details>

<details><summary><strong>forEachFileLine</strong></summary>

Process each line from a file with a callback function.

```typescript
import { forEachFileLine } from "@dsqr/aoc-utils"

await forEachFileLine("./input.txt", (line) => {
  console.log(line)
})
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | string | Path to the file |
| `fn` | function | Callback executed for each line (can be async) |

</details>

<details><summary><strong>forEachUrlLine</strong></summary>

Process each line from a URL with a callback function.

```typescript
import { forEachUrlLine } from "@dsqr/aoc-utils"

await forEachUrlLine("https://example.com/data.txt", (line) => {
  console.log(line)
})
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | string | URL to fetch |
| `fn` | function | Callback executed for each line (can be async) |

</details>

<details><summary><strong>readAocInput</strong></summary>

Async generator that fetches puzzle input from Advent of Code servers.

```typescript
import { readAocInput } from "@dsqr/aoc-utils"

// Requires AOC_SESSION environment variable
for await (const line of readAocInput(1, 2025)) {
  console.log(line)
}
```

**Setup:**
Get your session cookie from https://adventofcode.com (DevTools → Application → Cookies → session):
```bash
export AOC_SESSION=your_cookie_here
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `day` | number | ✓ | Puzzle day (1-25) |
| `year` | number | - | Puzzle year (default: 2025) |

</details>

<details><summary><strong>forEachAocLine</strong></summary>

Process each line from Advent of Code puzzle input with a callback function.

```typescript
import { forEachAocLine } from "@dsqr/aoc-utils"

await forEachAocLine(1, (line) => {
  console.log(line)
}, 2025)
```

**Setup:**
Requires `AOC_SESSION` environment variable. Get it from https://adventofcode.com (DevTools → Application → Cookies → session):
```bash
export AOC_SESSION=your_cookie_here
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `day` | number | ✓ | Puzzle day (1-25) |
| `fn` | function | ✓ | Callback executed for each line (can be async) |
| `year` | number | - | Puzzle year (default: 2025) |

</details>

## ⇁ CLI

Install globally or use with `bun`:

```bash
bun packages/utils/src/cli/index.ts scaffold 2
```

Or after publishing:
```bash
npm install -g @dsqr/aoc-utils
dsqr-aoc scaffold 2
```

<details><summary><strong>scaffold</strong></summary>

Create a new day scaffold with solution and test files.

```bash
dsqr-aoc scaffold <day>
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `day` | number | Day number (1-25) |

**Example:**
```bash
dsqr-aoc scaffold 2
```

Creates:
```
src/day-02/
  ├── solution-one.ts
  ├── solution-two.ts
  └── test/
      ├── fixtures/
      ├── solution-one.test.ts
      └── solution-two.test.ts
```

</details>

## ⇁ License

Do whatever you want with it. MIT.