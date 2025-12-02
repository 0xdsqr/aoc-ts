import { assertEqual, logger } from "@dsqr/aoc-utils"
import { solutionOne as day4Part1 } from "./day-four/solution-one.js"
import { solutionTwo as day4Part2 } from "./day-four/solution-two.js"
import { solutionOne as day1Part1 } from "./day-one/solution-one.js"
import { solutionTwo as day1Part2 } from "./day-one/solution-two.js"
import { solutionOne as day3Part1 } from "./day-three/solution-one.js"
import { solutionTwo as day3Part2 } from "./day-three/solution-two.js"
import { solutionOne as day2Part1 } from "./day-two/solution-one.js"
import { solutionTwo as day2Part2 } from "./day-two/solution-two.js"

async function runAllSolutions() {
  logger.log("=== AoC 2024 ===")

  logger.log("\nDay 1:")
  const d1p1 = await day1Part1()
  assertEqual(d1p1, 2166959)
  logger.log(`  Part 1: ${d1p1}`)
  const d1p2 = await day1Part2()
  assertEqual(d1p2, 23741109)
  logger.log(`  Part 2: ${d1p2}`)

  logger.log("\nDay 2:")
  const d2p1 = await day2Part1()
  assertEqual(d2p1, 279)
  logger.log(`  Part 1: ${d2p1}`)
  const d2p2 = await day2Part2()
  assertEqual(d2p2, 343)
  logger.log(`  Part 2: ${d2p2}`)

  logger.log("\nDay 3:")
  const d3p1 = await day3Part1()
  assertEqual(d3p1, 160672468)
  logger.log(`  Part 1: ${d3p1}`)
  const d3p2 = await day3Part2()
  assertEqual(d3p2, 84893551)
  logger.log(`  Part 2: ${d3p2}`)

  logger.log("\nDay 4:")
  const d4p1 = await day4Part1()
  assertEqual(d4p1, 2646)
  logger.log(`  Part 1: ${d4p1}`)
  const d4p2 = await day4Part2()
  assertEqual(d4p2, 2000)
  logger.log(`  Part 2: ${d4p2}`)
}

await runAllSolutions()
