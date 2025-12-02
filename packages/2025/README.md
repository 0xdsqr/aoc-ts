# @aoc/2025

Advent of Code 2025 solutions in TypeScript.

## Setup

Get your session cookie from https://adventofcode.com (DevTools → Application → Cookies → session):

```bash
export AOC_SESSION=your_cookie_here
```

## Running Solutions

```bash
bun run packages/2025/src/day-one/solution-one.ts
bun run packages/2025/src/day-one/solution-two.ts
```

## Scaffolding New Days

```bash
bun packages/utils/src/cli/aoc-cli.ts scaffold <day>
```

## Structure

```
src/
├── day-one/
│   ├── solution-one.ts
│   └── solution-two.ts
├── day-two/
├── ...
└── index.ts
```

## License

MIT
