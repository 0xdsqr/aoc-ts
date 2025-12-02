import { first, readAocInput } from "@dsqr/aoc-utils"

async function solutionTwo(): Promise<number> {
  const singleLine = (await first(readAocInput(2))).trim();

  let answer = 0
  console.log(singleLine)

  return answer
}

export { solutionTwo }
