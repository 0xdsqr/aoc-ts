# Advent of Code 2025

Solving Advent of Code puzzles with TypeScript and Bun.

## ⇁ Packages

**[@dsqr/aoc-utils](./packages/utils/README.md)** - Input utilities library (published on npm)

**[@aoc/2025](./packages/2025/README.md)** - 2025 puzzle solutions

**[@aoc/2024](./packages/2024/README.md)** - 2024 puzzle solutions

**[@aoc/cli](./packages/cli/README.md)** - Type-safe CLI framework

## ⇁ Quick Start

Install dependencies:
```bash
bun install
```

Set your AoC session cookie:
```bash
export AOC_SESSION=your_cookie_here
```

Get your session cookie from https://adventofcode.com (DevTools → Cookies → session)

Run a solution:
```bash
bun packages/2025/src/day-one/solution-one.ts
```

## ⇁ Create a New Day

```bash
bun packages/utils/src/cli/aoc-cli.ts scaffold 2
```

## ⇁ Testing

Run all tests with coverage:
```bash
bun test --coverage
```

Watch mode:
```bash
bun test --watch
```

## ⇁ Build

Build all packages:
```bash
bun run build
```

## ⇁ Development with Nix

Setup development environment:
```bash
nix flake update
direnv allow
```

This provides Bun, Node.js, and Biome.

## ⇁ License

Do whatever you want with it. MIT.
