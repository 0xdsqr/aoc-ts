import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { forEach, readAocInput, toArray } from "../src/read-input"

describe("read-input - AoC operations", () => {
  let originalSession: string | undefined

  beforeEach(() => {
    originalSession = process.env.AOC_SESSION
  })

  afterEach(() => {
    if (originalSession !== undefined) {
      process.env.AOC_SESSION = originalSession
    } else {
      delete process.env.AOC_SESSION
    }
  })

  describe("readAocInput", () => {
    it("should throw error if AOC_SESSION is not set", async () => {
      delete process.env.AOC_SESSION

      try {
        const gen = readAocInput(1)
        await toArray(gen)
        expect(false).toBe(true)
      } catch (error) {
        expect((error as Error).message).toContain("AOC_SESSION")
      }
    })

    it("should construct correct AoC URL with day and year", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch
      let capturedUrl = ""

      globalThis.fetch = (async (url: string) => {
        capturedUrl = url
        return new Response("test-data")
      }) as typeof fetch

      const gen = readAocInput(5, 2025)
      await toArray(gen)

      expect(capturedUrl).toBe("https://adventofcode.com/2025/day/5/input")
      globalThis.fetch = originalFetch
    })

    it("should use default year 2025", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch
      let capturedUrl = ""

      globalThis.fetch = (async (url: string) => {
        capturedUrl = url
        return new Response("test-data")
      }) as typeof fetch

      const gen = readAocInput(1)
      await toArray(gen)

      expect(capturedUrl).toContain("2025/day/1/input")
      globalThis.fetch = originalFetch
    })

    it("should include session in Cookie header", async () => {
      process.env.AOC_SESSION = "test-session-token"
      const originalFetch = globalThis.fetch
      let capturedHeaders: Record<string, string> = {}

      globalThis.fetch = (async (url: string, options?: RequestInit) => {
        if (typeof options?.headers === "object" && options.headers !== null) {
          capturedHeaders = options.headers as Record<string, string>
        }
        return new Response("test-data")
      }) as typeof fetch

      const gen = readAocInput(1)
      await toArray(gen)

      expect(capturedHeaders.Cookie).toBe("session=test-session-token")
      globalThis.fetch = originalFetch
    })

    it("should include User-Agent header", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch
      let capturedHeaders: Record<string, string> = {}

      globalThis.fetch = (async (url: string, options?: RequestInit) => {
        if (typeof options?.headers === "object" && options.headers !== null) {
          capturedHeaders = options.headers as Record<string, string>
        }
        return new Response("test-data")
      }) as typeof fetch

      const gen = readAocInput(1)
      await toArray(gen)

      expect(capturedHeaders["User-Agent"]).toContain("Mozilla")
      globalThis.fetch = originalFetch
    })

    it("should throw error on failed response", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("Unauthorized", { status: 401 })
      }) as typeof fetch

      try {
        const gen = readAocInput(1)
        await toArray(gen)
        expect(false).toBe(true)
      } catch (error) {
        expect((error as Error).message).toContain("Failed to fetch: 401")
      }

      globalThis.fetch = originalFetch
    })

    it("should yield trimmed lines from response", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("  line1  \n  line2  \n\n  line3  ")
      }) as typeof fetch

      const gen = readAocInput(1)
      const lines = await toArray(gen)

      expect(lines).toEqual(["line1", "line2", "line3"])
      globalThis.fetch = originalFetch
    })

    it("should skip empty lines by default", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("line1\n\n\nline2")
      }) as typeof fetch

      const gen = readAocInput(1)
      const lines = await toArray(gen)

      expect(lines).toEqual(["line1", "line2"])
      expect(lines.length).toBe(2)
      globalThis.fetch = originalFetch
    })

    it("should include empty lines when skipEmpty is false", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("line1\n\nline2")
      }) as typeof fetch

      const gen = readAocInput(1, 2025, { skipEmpty: false })
      const lines = await toArray(gen)

      expect(lines).toContain("")
      expect(lines.length).toBe(3)
      globalThis.fetch = originalFetch
    })
  })

  describe("forEach helper with readAocInput", () => {
    it("should execute callback for each line", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("line1\nline2\nline3")
      }) as typeof fetch

      const collected: { line: string; index: number }[] = []
      const gen = readAocInput(1)
      await forEach(gen, (line, index) => {
        collected.push({ line, index })
      })

      expect(collected).toEqual([
        { line: "line1", index: 0 },
        { line: "line2", index: 1 },
        { line: "line3", index: 2 },
      ])
      globalThis.fetch = originalFetch
    })

    it("should handle async callbacks", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("line1\nline2")
      }) as typeof fetch

      const lines: string[] = []
      const gen = readAocInput(1)
      await forEach(gen, async (line) => {
        lines.push(line.toUpperCase())
      })

      expect(lines).toEqual(["LINE1", "LINE2"])
      globalThis.fetch = originalFetch
    })

    it("should pass index to callback", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("a\nb\nc")
      }) as typeof fetch

      const indices: number[] = []
      const gen = readAocInput(1)
      await forEach(gen, (line, index) => {
        indices.push(index)
      })

      expect(indices).toEqual([0, 1, 2])
      globalThis.fetch = originalFetch
    })
  })

  describe("first helper with readAocInput", () => {
    it("should return the first line", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("first\nsecond\nthird")
      }) as typeof fetch

      const { first } = await import("../src/read-input")
      const line = await first(readAocInput(1))

      expect(line).toBe("first")
      globalThis.fetch = originalFetch
    })

    it("should throw when no lines available", async () => {
      process.env.AOC_SESSION = "test-token"
      const originalFetch = globalThis.fetch

      globalThis.fetch = (async () => {
        return new Response("")
      }) as typeof fetch

      const { first } = await import("../src/read-input")

      try {
        await first(readAocInput(1))
        expect(false).toBe(true)
      } catch (error) {
        expect((error as Error).message).toContain("No lines available")
      }

      globalThis.fetch = originalFetch
    })
  })
})
