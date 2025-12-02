import { forEach, readAocInput } from "@dsqr/aoc-utils"

async function solutionTwo(): Promise<number> {
  let memory = ""
  await forEach(readAocInput(3, 2024), (line: string) => {
    memory += line
  })

  let enabled = true
  let totalSum = 0
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g

  for (const match of memory.matchAll(regex)) {
    if (match[0] === "do()") enabled = true
    else if (match[0] === "don't()") enabled = false
    else if (enabled) totalSum += parseInt(match[1]!) * parseInt(match[2]!)
  }

  return totalSum
}

export { solutionTwo }
