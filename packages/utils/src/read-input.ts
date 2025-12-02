/**
 * Utility functions for reading and processing line-based input.
 */

type LineCallback = (line: string, index: number) => Promise<void> | void

interface ReadOptions {
  skipEmpty?: boolean
}

async function* readFromFile(
  path: string,
  { skipEmpty = true }: ReadOptions = {}
): AsyncGenerator<string> {
  const text = await Bun.file(path).text()

  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (!skipEmpty || trimmed) yield trimmed
  }
}

async function* readFromUrl(
  url: string,
  { skipEmpty = true }: ReadOptions = {}
): AsyncGenerator<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()
  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (!skipEmpty || trimmed) yield trimmed
  }
}

async function* readAocInput(
  day: number,
  year = 2025,
  { skipEmpty = true }: ReadOptions = {}
): AsyncGenerator<string> {
  const session = process.env.AOC_SESSION
  if (!session) {
    throw new Error(
      "AOC_SESSION required. Get from https://adventofcode.com cookies"
    )
  }

  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AoC Solver)",
        Cookie: `session=${session}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()
  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (!skipEmpty || trimmed) yield trimmed
  }
}

async function forEach(
  generator: AsyncGenerator<string>,
  fn: LineCallback
): Promise<void> {
  let index = 0
  for await (const line of generator) {
    await fn(line, index++)
  }
}

async function toArray(generator: AsyncGenerator<string>): Promise<string[]> {
  const result: string[] = []
  for await (const item of generator) {
    result.push(item)
  }
  return result
}

export { readFromFile, readFromUrl, readAocInput, forEach, toArray }
export type { ReadOptions, LineCallback }