import { forEachAocLine, logger, assertEqual } from "@dsqr/aoc-utils"

async function solutionTwo(): Promise<number> {
  let memory = ""
  await forEachAocLine(3, (line: string) => {
    memory += line
  }, 2024)

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
