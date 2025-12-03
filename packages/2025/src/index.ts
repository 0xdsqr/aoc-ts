import { assertEqual, logger } from "@dsqr/aoc-utils"
import { solutionOne as day1Part1 } from "./day-one/solution-one.js"
import { solutionTwo as day1Part2 } from "./day-one/solution-two.js"
import { solutionOne as day2Part1 } from "./day-two/solution-one.js"
import { solutionTwo as day2Part2 } from "./day-two/solution-two.js"

async function runAllSolutions() {
  logger.log("=== AoC 2025 ===")

  logger.log("\nDay 1:")
  const d1p1 = await day1Part1()
  assertEqual(d1p1, 1152)
  logger.log(`  Part 1: ${d1p1}`)
  const d1p2 = await day1Part2()
  assertEqual(d1p2, 6671)
  logger.log(`  Part 2: ${d1p2}`)

  logger.log("\nDay 2:")
  const d2p1 = await day2Part1()
  assertEqual(d2p1, 28146997880)
  logger.log(`  Part 1: ${d2p1}`)
  const d2p2 = await day2Part2()
  assertEqual(d2p2, 40028128307)
  logger.log(`  Part 2: ${d2p2}`)
}

await runAllSolutions()
