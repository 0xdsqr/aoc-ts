import { forEach, readAocInput } from "@dsqr/aoc-utils"

async function solutionTwo(): Promise<number> {
  const grid: string[] = []

  await forEach(readAocInput(4, 2024), (line: string) => {
    grid.push(line)
  })

  let count = 0
  const rows = grid.length
  const cols = grid[0]?.length || 0

  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (grid[r]![c] !== "A") continue

      const tl = grid[r - 1]![c - 1]
      const tr = grid[r - 1]![c + 1]
      const bl = grid[r + 1]![c - 1]
      const br = grid[r + 1]![c + 1]

      const diag1 = tl! + br!
      const diag2 = tr! + bl!

      if (
        (diag1 === "MS" || diag1 === "SM") &&
        (diag2 === "MS" || diag2 === "SM")
      ) {
        count++
      }
    }
  }

  return count
}

export { solutionTwo }
