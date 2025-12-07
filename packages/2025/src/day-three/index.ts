import { assertEqual, logger } from "@dsqr/aoc-utils"
import { solutionOne } from "./solution-one.js"
import { solutionTwo } from "./solution-two.js"

async function runDay() {
  logger.log("Day 3:")
  const p1 = await solutionOne()
  assertEqual(p1, 17324)
  logger.log(`  Part 1: ${p1}`)
  const p2 = await solutionTwo()
  assertEqual(p2, 171846613143331n)
  logger.log(`  Part 2: ${p2}`)
}

await runDay()
