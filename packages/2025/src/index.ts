import { assertEqual, logger } from "@dsqr/aoc-utils"
import { solutionOne as day1Part1 } from "./day-one/solution-one.js"
import { solutionTwo as day1Part2 } from "./day-one/solution-two.js"

async function runAllSolutions() {
  logger.log("=== AoC 2025 ===")

  logger.log("\nDay 1:")
  const d1p1 = await day1Part1()
  assertEqual(d1p1, 1152)
  logger.log(`  Part 1: ${d1p1}`)
  const d1p2 = await day1Part2()
  assertEqual(d1p2, 6671)
  logger.log(`  Part 2: ${d1p2}`)
}

await runAllSolutions()
