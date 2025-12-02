import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { forEachAocLine, readAocInput } from "../src/read-input"

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
        for await (const line of readAocInput(1)) {
        }
        expect(false).toBe(true)
      } catch (error) {
        expect(error).toBeDefined()
        expect((error as Error).message).toContain("AOC_SESSION")
      }
    })

    it("should include session in request headers", async () => {
      process.env.AOC_SESSION = "test-session-token"

      const originalFetch = globalThis.fetch
      let capturedHeaders: Record<string, string> = {}

      globalThis.fetch = (async (url: string, options?: RequestInit) => {
        if (typeof options?.headers === "object" && options.headers !== null) {
          capturedHeaders = options.headers as Record<string, string>
        }
        throw new Error("Test fetch - mocked")
      }) as typeof fetch

      try {
        for await (const line of readAocInput(1)) {
        }
      } catch {
      }

      expect(capturedHeaders.Cookie).toContain("session=test-session-token")
      globalThis.fetch = originalFetch
    })

    it("should construct correct AoC URL", async () => {
      process.env.AOC_SESSION = "test-token"

      const originalFetch = globalThis.fetch
      let capturedUrl = ""

      globalThis.fetch = (async (url: string) => {
        capturedUrl = url
        throw new Error("Test fetch - mocked")
      }) as typeof fetch

      try {
        for await (const line of readAocInput(5, 2025)) {
        }
      } catch {
      }

      expect(capturedUrl).toContain("https://adventofcode.com/2025/day/5/input")
      globalThis.fetch = originalFetch
    })

    it("should use default year 2025", async () => {
      process.env.AOC_SESSION = "test-token"

      const originalFetch = globalThis.fetch
      let capturedUrl = ""

      globalThis.fetch = (async (url: string) => {
        capturedUrl = url
        throw new Error("Test fetch - mocked")
      }) as typeof fetch

      try {
        for await (const line of readAocInput(1)) {
        }
      } catch {
      }

      expect(capturedUrl).toContain("/2025/")
      globalThis.fetch = originalFetch
    })

    it("should handle failed AoC requests", async () => {
      process.env.AOC_SESSION = "invalid-token"

      const originalFetch = globalThis.fetch
      globalThis.fetch = (async () => {
        return new Response("Unauthorized", { status: 401 })
      }) as typeof fetch

      try {
        for await (const line of readAocInput(1)) {
        }
        expect(false).toBe(true)
      } catch (error) {
        expect((error as Error).message).toContain("Failed to fetch AoC input")
      }

      globalThis.fetch = originalFetch
    })
  })

  describe("forEachAocLine", () => {
    it("should throw error if AOC_SESSION is not set", async () => {
      delete process.env.AOC_SESSION

      try {
        await forEachAocLine(1, () => {})
        expect(false).toBe(true)
      } catch (error) {
        expect(error).toBeDefined()
        expect((error as Error).message).toContain("AOC_SESSION")
      }
    })

    it("should execute callback for each line", async () => {
      process.env.AOC_SESSION = "test-token"

      const originalFetch = globalThis.fetch
      globalThis.fetch = (async () => {
        return new Response("aoc-line1\naoc-line2\n\naoc-line3")
      }) as typeof fetch

      const lines: string[] = []
      await forEachAocLine(1, (line) => {
        lines.push(line)
      })

      expect(lines).toEqual(["aoc-line1", "aoc-line2", "aoc-line3"])
      globalThis.fetch = originalFetch
    })

    it("should handle async callbacks", async () => {
      process.env.AOC_SESSION = "test-token"

      const originalFetch = globalThis.fetch
      globalThis.fetch = (async () => {
        return new Response("line1\nline2")
      }) as typeof fetch

      const lines: string[] = []
      await forEachAocLine(1, async (line) => {
        lines.push(line.toUpperCase())
      })

      expect(lines).toEqual(["LINE1", "LINE2"])
      globalThis.fetch = originalFetch
    })

    it("should support custom year", async () => {
      process.env.AOC_SESSION = "test-token"

      const originalFetch = globalThis.fetch
      let capturedUrl = ""

      globalThis.fetch = (async (url: string) => {
        capturedUrl = url
        return new Response("test")
      }) as typeof fetch

      await forEachAocLine(1, () => {}, 2024)

      expect(capturedUrl).toContain("/2024/")
      globalThis.fetch = originalFetch
    })
  })
})
