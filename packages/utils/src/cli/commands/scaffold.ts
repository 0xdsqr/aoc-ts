import { join } from "path"
import type { CommandInput } from "../../index.js"
import { logger, spinner } from "../../index.js"
import * as templates from "./templates.js"

async function scaffoldDayCommand(input: CommandInput) {
  const [dayStr] = input.args
  const year = (input.flags.year as string) || "2025"

  if (!dayStr || isNaN(Number(dayStr))) {
    throw new Error("Day must be a number between 1 and 25")
  }

  const dayNum = Number(dayStr)
  if (dayNum < 1 || dayNum > 25) {
    throw new Error("Day must be between 1 and 25")
  }

  const spin = spinner(`Scaffolding day ${dayNum}...`)
  spin.start()

  try {
    const baseDir = import.meta.dir.split("packages/utils")[0]!
    const result = await scaffoldDay(dayNum, baseDir, year)
    spin.succeed(`Scaffolded ${result.dayName}`)

    logger.log(`${result.dayDir}`)
    logger.log(`├── solution-one.ts`)
    logger.log(`└── solution-two.ts`)
  } catch (error) {
    spin.fail()
    throw error
  }
}

const dayNames = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twenty-one",
  "twenty-two",
  "twenty-three",
  "twenty-four",
  "twenty-five",
]

export async function scaffoldDay(dayNum: number, baseDir: string, year: string = "2025") {
  const dayName = `day-${dayNames[dayNum]}`
  const dayDir = join(baseDir, `packages/${year}/src`, dayName)

  await Bun.write(
    join(dayDir, "solution-one.ts"),
    templates.solutionOneTemplate(dayNum),
  )
  await Bun.write(
    join(dayDir, "solution-two.ts"),
    templates.solutionTwoTemplate(dayNum),
  )

  const indexPath = join(baseDir, `packages/${year}/src/index.ts`)
  const indexExists = await Bun.file(indexPath).exists()

  if (!indexExists) {
    const indexTemplate = getNewIndexTemplate(year, dayNum, dayName)
    await Bun.write(indexPath, indexTemplate)
  } else {
    await updateIndexWithDay(indexPath, dayNum, dayName)
  }

  return { dayName, dayDir }
}

function getNewIndexTemplate(year: string, dayNum: number, dayName: string): string {
  return `import { solutionOne as day${dayNum}Part1 } from "./${dayName}/solution-one.js"
import { solutionTwo as day${dayNum}Part2 } from "./${dayName}/solution-two.js"
import { logger, assertEqual } from "@dsqr/aoc-utils"

async function runAllSolutions() {
  logger.log("=== AoC ${year} ===")

  logger.log("\\nDay ${dayNum}:")
  const d${dayNum}p1 = await day${dayNum}Part1()
  assertEqual(d${dayNum}p1, 0)
  logger.log(\`  Part 1: \${d${dayNum}p1}\`)
  const d${dayNum}p2 = await day${dayNum}Part2()
  assertEqual(d${dayNum}p2, 0)
  logger.log(\`  Part 2: \${d${dayNum}p2}\`)
}

await runAllSolutions()
`
}

async function updateIndexWithDay(indexPath: string, dayNum: number, dayName: string) {
  const content = await Bun.file(indexPath).text()

  const importLine = `import { solutionOne as day${dayNum}Part1 } from "./${dayName}/solution-one.js"`
  const importLine2 = `import { solutionTwo as day${dayNum}Part2 } from "./${dayName}/solution-two.js"`

  if (content.includes(`day${dayNum}Part1`)) return

  const lines = content.split("\n")
  const lastImportIdx = lines.findIndex((l, i) => l.startsWith("import") && !lines[i + 1]?.startsWith("import"))

  lines.splice(lastImportIdx + 1, 0, importLine, importLine2)

  const runFuncStart = lines.findIndex(l => l.includes("async function runAllSolutions"))
  const lastLogIdx = lines.findLastIndex((l, i) => i < lines.length - 3 && (l.includes("logger.log") || l.includes("assertEqual")))

  const daySection = `\n  logger.log("\\nDay ${dayNum}:")
  const d${dayNum}p1 = await day${dayNum}Part1()
  assertEqual(d${dayNum}p1, 0)
  logger.log(\`  Part 1: \${d${dayNum}p1}\`)
  const d${dayNum}p2 = await day${dayNum}Part2()
  assertEqual(d${dayNum}p2, 0)
  logger.log(\`  Part 2: \${d${dayNum}p2}\`)`

  lines.splice(lastLogIdx + 1, 0, daySection)

  await Bun.write(indexPath, lines.join("\n"))
}

export { scaffoldDayCommand }
