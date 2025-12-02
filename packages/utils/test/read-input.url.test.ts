import { describe, expect, it } from "bun:test"
import { forEach, readFromUrl, toArray } from "../src/read-input"

function createTestServer(handler: (req: Request) => Response): {
  url: string
  stop: () => void
} {
  const server = Bun.serve({
    port: 0,
    fetch: handler,
  })
  return {
    url: `http://localhost:${server.port}`,
    stop: () => server.stop(),
  }
}

describe("read-input - URL operations", () => {
  describe("readFromUrl", () => {
    it("should read lines from URL", async () => {
      const server = createTestServer(
        () => new Response("url-line1\nurl-line2\n\nurl-line3"),
      )

      const lines = await toArray(readFromUrl(server.url))

      expect(lines).toEqual(["url-line1", "url-line2", "url-line3"])
      server.stop()
    })

    it("should skip blank lines by default", async () => {
      const server = createTestServer(() => new Response("line1\n\n\nline2\n"))

      const lines = await toArray(readFromUrl(server.url))

      expect(lines).toEqual(["line1", "line2"])
      expect(lines).not.toContain("")
      server.stop()
    })

    it("should include blank lines when skipEmpty is false", async () => {
      const server = createTestServer(() => new Response("line1\n\nline2"))

      const lines = await toArray(readFromUrl(server.url, { skipEmpty: false }))

      expect(lines).toContain("")
      expect(lines.length).toBe(3)
      server.stop()
    })

    it("should trim whitespace from lines", async () => {
      const server = createTestServer(() => new Response("  line1  \n  line2  "))

      const lines = await toArray(readFromUrl(server.url))

      expect(lines).toEqual(["line1", "line2"])
      server.stop()
    })

    it("should throw error on non-200 response", async () => {
      const server = createTestServer(
        () => new Response("Not Found", { status: 404 }),
      )

      try {
        await toArray(readFromUrl(server.url))
        expect(false).toBe(true)
      } catch (error) {
        expect((error as Error).message).toContain("Failed to fetch: 404")
      }

      server.stop()
    })

    it("should throw error on 500 response", async () => {
      const server = createTestServer(
        () => new Response("Server Error", { status: 500 }),
      )

      try {
        await toArray(readFromUrl(server.url))
        expect(false).toBe(true)
      } catch (error) {
        expect((error as Error).message).toContain("Failed to fetch: 500")
      }

      server.stop()
    })
  })

  describe("forEach helper with readFromUrl", () => {
    it("should execute callback for each line", async () => {
      const server = createTestServer(
        () => new Response("url-line1\nurl-line2"),
      )

      const lines: string[] = []
      await forEach(readFromUrl(server.url), (line) => {
        lines.push(line)
      })

      expect(lines).toEqual(["url-line1", "url-line2"])
      server.stop()
    })

    it("should handle async callbacks", async () => {
      const server = createTestServer(() => new Response("line1\nline2"))

      const lines: string[] = []
      await forEach(readFromUrl(server.url), async (line) => {
        lines.push(line.toUpperCase())
      })

      expect(lines).toEqual(["LINE1", "LINE2"])
      server.stop()
    })

    it("should pass index to callback", async () => {
      const server = createTestServer(() => new Response("a\nb\nc"))

      const result: { line: string; index: number }[] = []
      await forEach(readFromUrl(server.url), (line, index) => {
        result.push({ line, index })
      })

      expect(result).toEqual([
        { line: "a", index: 0 },
        { line: "b", index: 1 },
        { line: "c", index: 2 },
      ])
      server.stop()
    })
  })

  describe("first helper with readFromUrl", () => {
    it("should return the first line", async () => {
      const server = createTestServer(
        () => new Response("first\nsecond\nthird"),
      )

      const line = await first(readFromUrl(server.url))

      expect(line).toBe("first")
      server.stop()
    })

    it("should throw when no lines available", async () => {
      const server = createTestServer(() => new Response(""))

      try {
        await first(readFromUrl(server.url))
        expect(false).toBe(true)
      } catch (error) {
        expect((error as Error).message).toContain("No lines available")
      }

      server.stop()
    })
  })
})
