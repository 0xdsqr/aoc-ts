import { forEach, readAocInput } from "@dsqr/aoc-utils"

function findMaxJoltage(bank: string): number {
  let max = 0

  for (let i = 0; i < bank.length - 1; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const jolts = Number(bank[i]) * 10 + Number(bank[j])
      if (jolts > max) max = jolts
    }
  }

  return max
}

async function solutionOne(): Promise<number> {
  let total = 0

  await forEach(readAocInput(3), (line: string) => {
    total += findMaxJoltage(line)
  })

  return total
}

export { solutionOne }
