function solutionOneTemplate(day: number): string {
  return `import { forEachAocLine, logger } from "@aoc/utils"

async function solutionOne(): Promise<number> {
  let answer = 0

  await forEachAocLine(${day}, (line: string) => {
  })

  return answer
}

const result = await solutionOne()
logger.log(result)

export { solutionOne }
`
}

function solutionTwoTemplate(day: number): string {
  return `import { forEachAocLine, logger } from "@aoc/utils"

async function solutionTwo(): Promise<number> {
  let answer = 0

  await forEachAocLine(${day}, (line: string) => {
  })

  return answer
}

const result = await solutionTwo()
logger.log(result)

export { solutionTwo }
`
}

export { solutionOneTemplate, solutionTwoTemplate }
