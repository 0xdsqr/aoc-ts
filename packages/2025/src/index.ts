import { logger } from "@dsqr/aoc-utils"

async function runAllDays() {
  logger.log("=== AoC 2025 ===\n")

  await import("./day-one/index.js")
  logger.log()
  await import("./day-two/index.js")
}

await runAllDays()
