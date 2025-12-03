import { assertEqual, logger } from "@dsqr/aoc-utils"
import { solutionOne } from "./solution-one.js"
import { solutionTwo } from "./solution-two.js"

async function runDay() {
  logger.log("Day 2:")
  const p1 = await solutionOne()
  assertEqual(p1, 28146997880)
  logger.log(`  Part 1: ${p1}`)
  const p2 = await solutionTwo()
  assertEqual(p2, 40028128307)
  logger.log(`  Part 2: ${p2}`)
}

await runDay()
