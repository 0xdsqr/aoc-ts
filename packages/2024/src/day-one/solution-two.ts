import { assertEqual, forEach, readAocInput } from "@dsqr/aoc-utils"

async function solutionTwo(): Promise<number> {
  const left: number[] = []
  const rightCounts = new Map<number, number>()

  await forEach(readAocInput(1, 2024), (line: string) => {
    const parts = line.split(/\s+/).map(Number)
    if (parts.length >= 2) {
      left.push(parts[0]!)
      rightCounts.set(parts[1]!, (rightCounts.get(parts[1]!) || 0) + 1)
    }
  })

  const similarityScore = left.reduce(
    (sum, num) => sum + num * (rightCounts.get(num) || 0),
    0,
  )
  return similarityScore
}

export { solutionTwo }
