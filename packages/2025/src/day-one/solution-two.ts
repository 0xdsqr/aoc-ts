import { forEachAocLine, logger, assertEqual } from "@dsqr/aoc-utils"

const wrap100 = (x: number) => ((x % 100) + 100) % 100

const countZeros = (current: number, step: number, distance: number): number => {
  let k0 = wrap100(-current * step)
  if (k0 === 0) k0 = 100
  return k0 < 1 || k0 > distance ? 0 : 1 + Math.floor((distance - k0) / 100)
}

async function solutionTwo(): Promise<number> {
  let current = 50
  let zeroCount = 0

  await forEachAocLine(1, (line: string) => {
    const step = line[0] === "L" ? -1 : 1
    const distance = parseInt(line.slice(1))
    zeroCount += countZeros(current, step, distance)
    current = wrap100(current + step * distance)
  })

  return zeroCount
}

export { solutionTwo }
