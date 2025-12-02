# Advent of Code 2025

Solving Advent of Code puzzles with TypeScript.

## ⇁ Packages

**[@dsqr/aoc-utils](./packages/utils/README.md)** - Input utilities
Published on npm as `@dsqr/aoc-utils`

**@aoc/2025** - 2025 puzzle solutions

## ⇁ Setup

Install dependencies:
```bash
bun install
```

## ⇁ Scaffold a New Day

```bash
bun packages/utils/src/cli/index.ts scaffold 2
bun packages/utils/src/cli/index.ts scaffold 3
```

Or use the alias:
```bash
bun packages/utils/src/cli/index.ts new 25
```

## ⇁ Running Solutions

```bash
bun run packages/2025/src/day-one/solution-one.ts
bun run packages/2025/src/day-one/solution-two.ts
```

## ⇁ Testing

Run all tests:
```bash
bun test
```

Run tests for a specific day:
```bash
bun test packages/2025/src/day-one
```

Watch mode:
```bash
bun test --watch
```

## ⇁ Development

Build all packages:
```bash
bun run build
```

## ⇁ Getting AoC Input

Set your session cookie to fetch puzzle input directly from AoC:
```bash
export AOC_SESSION=your_session_cookie_here
```

Get your session cookie from https://adventofcode.com (DevTools → Application → Cookies → session)

Then use `forEachAocLine()` from `@dsqr/aoc-utils` to read it.

## ⇁ Development with Nix

Setup development environment:
```bash
nix flake update
direnv allow
```

This provides:
- Bun - Ultra-fast JavaScript runtime
- Node.js - TypeScript support
- Biome - Linting and formatting

## ⇁ License

Do whatever you want with it. MIT.
