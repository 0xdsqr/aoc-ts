import { assertEqual, forEach, readAocInput } from "@dsqr/aoc-utils"

const isSafeReport = (levels: number[]): boolean => {
  if (levels.length < 2) return true
  const increasing = levels[1]! > levels[0]!
  return levels.every(
    (level, i) =>
      i === 0 ||
      (Math.abs(level - levels[i - 1]!) >= 1 &&
        Math.abs(level - levels[i - 1]!) <= 3 &&
        level > levels[i - 1]! === increasing),
  )
}

const canBeSafeWithDampener = (levels: number[]): boolean =>
  isSafeReport(levels) ||
  levels.some((_, i) =>
    isSafeReport([...levels.slice(0, i), ...levels.slice(i + 1)]),
  )

async function solutionTwo(): Promise<number> {
  let safeCount = 0
  await forEach(readAocInput(2, 2024), (line: string) => {
    const levels = line.split(/\s+/).map(Number)
    if (canBeSafeWithDampener(levels)) safeCount++
  })
  return safeCount
}

export { solutionTwo }
