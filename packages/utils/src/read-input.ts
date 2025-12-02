async function* readFromFile(path: string) {
  const file = Bun.file(path)
  const text = await file.text()

  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (trimmed) yield trimmed
  }
}

async function* readFromUrl(url: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)
  const text = await response.text()

  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (trimmed) yield trimmed
  }
}

async function forEachFileLine(
  path: string,
  fn: (line: string) => Promise<void> | void,
) {
  for await (const line of readFromFile(path)) {
    await fn(line)
  }
}

async function forEachUrlLine(
  url: string,
  fn: (line: string) => Promise<void> | void,
) {
  for await (const line of readFromUrl(url)) {
    await fn(line)
  }
}

async function* readAocInput(day: number, year: number = 2025) {
  const session = process.env.AOC_SESSION
  if (!session) {
    throw new Error(
      "AOC_SESSION environment variable required. Get your session cookie from https://adventofcode.com (DevTools → Application → Cookies → session) and set: export AOC_SESSION=your_cookie",
    )
  }

  const url = `https://adventofcode.com/${year}/day/${day}/input`
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AoC Solver)",
      Cookie: `session=${session}`,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch AoC input: ${response.status} ${response.statusText}`,
    )
  }

  const text = await response.text()
  for (const line of text.split("\n")) {
    const trimmed = line.trim()
    if (trimmed) yield trimmed
  }
}

async function forEachAocLine(
  day: number,
  fn: (line: string) => Promise<void> | void,
  year: number = 2025,
) {
  for await (const line of readAocInput(day, year)) {
    await fn(line)
  }
}

export {
  readFromFile,
  readFromUrl,
  forEachFileLine,
  forEachUrlLine,
  readAocInput,
  forEachAocLine,
}
