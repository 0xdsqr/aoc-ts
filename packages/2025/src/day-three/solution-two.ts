import { forEach, readAocInput } from "@dsqr/aoc-utils"

function findMaxJoltage12(bank: string): bigint {
  const n = bank.length
  const keep = 12
  const skip = n - keep

  let result = ""
  let pos = 0
  let skipped = 0

  for (let i = 0; i < keep; i++) {
    const remaining = keep - i
    const canSkipMore = skip - skipped
    const searchEnd = Math.min(pos + canSkipMore, n - remaining)

    let maxDigit = bank[pos]
    let maxPos = pos

    for (let j = pos; j <= searchEnd; j++) {
      if (bank[j] > maxDigit) {
        maxDigit = bank[j]
        maxPos = j
      }
    }

    result += maxDigit
    skipped += maxPos - pos
    pos = maxPos + 1
  }

  return BigInt(result)
}

async function solutionTwo(): Promise<bigint> {
  let total = 0n

  await forEach(readAocInput(3), (line: string) => {
    total += findMaxJoltage12(line)
  })

  return total
}

export { solutionTwo }
