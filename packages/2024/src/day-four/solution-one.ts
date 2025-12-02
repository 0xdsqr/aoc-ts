import { forEach, readAocInput } from "@dsqr/aoc-utils"

async function solutionOne(): Promise<number> {
  const grid: string[] = []

  await forEach(readAocInput(4, 2024), (line: string) => {
    grid.push(line)
  })

  let count = 0
  const rows = grid.length
  const cols = grid[0]?.length || 0
  const allDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of allDirections) {
        let word = ""
        let valid = true
        for (let i = 0; i < 4; i++) {
          const nr = r + i * dr!
          const nc = c + i * dc!
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
            valid = false
            break
          }
          word += grid[nr]![nc]
        }
        if (valid && word === "XMAS") count++
      }
    }
  }

  return count
}

export { solutionOne }
