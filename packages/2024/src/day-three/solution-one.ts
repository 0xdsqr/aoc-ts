import { forEach, readAocInput } from "@dsqr/aoc-utils"

async function solutionOne(): Promise<number> {
  let memory = ""
  await forEach(readAocInput(3, 2024), (line: string) => {
    memory += line
  })

  return Array.from(memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)).reduce(
    (sum, m) => sum + parseInt(m[1]!) * parseInt(m[2]!),
    0,
  )
}

export { solutionOne }
