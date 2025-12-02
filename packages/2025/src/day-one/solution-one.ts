import { assertEqual, forEach, readAocInput } from "@dsqr/aoc-utils"

const wrap100 = (x: number) => ((x % 100) + 100) % 100

async function solutionOne(): Promise<number> {
  let current = 50
  let zeroCount = 0

  await forEach(readAocInput(1), (line: string) => {
    const direction = line[0] === "L" ? -1 : 1
    const distance = parseInt(line.slice(1))
    current = wrap100(current + direction * distance)
    if (current === 0) zeroCount++
  })

  return zeroCount
}

export { solutionOne }
