import { first, readAocInput } from "@dsqr/aoc-utils"

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function invalidIDv2(num: number): number | null {
  const s = String(num)
  const len = s.length

  for (let unit = 1; unit <= Math.floor(len / 2); unit++) {
    if (len % unit !== 0) continue

    const chunk = s.slice(0, unit)
    const repeats = len / unit

    if (chunk.repeat(repeats) === s) {
      return num
    }
  }

  return null
}

export async function solutionTwo(): Promise<number> {
  const singleLine = (await first(readAocInput(2))).trim()

  let total = 0
  const ranges = singleLine.split(",")

  ranges.forEach((block) => {
    const cleaned = block.trim()
    if (!cleaned) return

    const [startStr, endStr] = cleaned.split("-")
    const start = Number(startStr)
    const end = Number(endStr)

    range(start, end).forEach((n) => {
      const bad = invalidIDv2(n)
      if (bad !== null) {
        total += bad
      }
    })
  })

  return total
}
