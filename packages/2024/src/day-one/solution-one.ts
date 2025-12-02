import { assertEqual, forEach, readAocInput } from "@dsqr/aoc-utils"

async function solutionOne(): Promise<number> {
  const left: number[] = []
  const right: number[] = []

  await forEach(readAocInput(1, 2024), (line: string) => {
    const parts = line.split(/\s+/).map(Number)
    if (parts.length >= 2) {
      left.push(parts[0]!)
      right.push(parts[1]!)
    }
  })

  left.sort((a, b) => a - b)
  right.sort((a, b) => a - b)

  return left.reduce((sum, l, i) => sum + Math.abs(l - right[i]!), 0)
}

export { solutionOne }
