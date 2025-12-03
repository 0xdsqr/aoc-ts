# @aoc/2025

Advent of Code 2025 solutions in TypeScript.

## Setup

Set your session cookie:
```bash
export AOC_SESSION=your_cookie_here
```

Get your cookie from https://adventofcode.com (DevTools → Cookies → session)

## Running Solutions

```bash
# Run all solutions for the year
bun src/index.ts

# Run a single day (both parts)
bun src/day-one/index.ts

# Run a specific part
bun src/day-one/solution-one.ts
bun src/day-one/solution-two.ts
```

## Creating New Days

```bash
bun packages/utils/src/cli/aoc-cli.ts scaffold 2
```

## Structure

```
src/
├── day-one/
│   ├── index.ts          # Run both parts of day one
│   ├── solution-one.ts
│   └── solution-two.ts
├── day-two/
│   ├── index.ts          # Run both parts of day two
│   ├── solution-one.ts
│   └── solution-two.ts
└── index.ts              # Run all days
```

## License

Do whatever you want with it. MIT.
