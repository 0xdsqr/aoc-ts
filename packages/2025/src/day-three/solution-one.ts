import { forEach, readAocInput } from "@dsqr/aoc-utils"

function findMaxJoltage(bank: string): number {
  let max = 0
  const digits = bank.split("")

  digits.forEach((digit1, i) => {
    digits.slice(i + 1).forEach((digit2) => {
      const jolts = Number(digit1) * 10 + Number(digit2)
      max = Math.max(max, jolts)
    })
  })

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
