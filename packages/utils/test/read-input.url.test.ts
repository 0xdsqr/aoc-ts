import { describe, expect, it } from "bun:test"
import { forEachUrlLine, readFromUrl } from "../src/read-input"

function createTestServer(
  handler: (req: Request) => Response,
): { url: string; stop: () => void } {
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
      const server = createTestServer(() => new Response("url-line1\nurl-line2\n\nurl-line3"))
      const lines: string[] = []
      for await (const line of readFromUrl(server.url)) {
        lines.push(line)
      }
      expect(lines).toEqual(["url-line1", "url-line2", "url-line3"])
      server.stop()
    })

    it("should skip blank lines from URL", async () => {
      const server = createTestServer(() => new Response("line1\n\n\nline2\n"))
      const lines: string[] = []
      for await (const line of readFromUrl(server.url)) {
        lines.push(line)
      }
      expect(lines).toEqual(["line1", "line2"])
      expect(lines).not.toContain("")
      server.stop()
    })

    it("should handle non-200 responses", async () => {
      const server = createTestServer(() => new Response("Not Found", { status: 404 }))
      try {
        for await (const line of readFromUrl(server.url)) {
        }
        expect(false).toBe(true)
      } catch (error) {
        expect((error as Error).message).toContain("Failed to fetch")
      }
      server.stop()
    })
  })

  describe("forEachUrlLine", () => {
    it("should execute callback for each URL line", async () => {
      const server = createTestServer(() => new Response("url-line1\nurl-line2"))
      const lines: string[] = []
      await forEachUrlLine(server.url, (line) => {
        lines.push(line)
      })
      expect(lines).toEqual(["url-line1", "url-line2"])
      server.stop()
    })

    it("should handle async callbacks", async () => {
      const server = createTestServer(() => new Response("line1\nline2"))
      const lines: string[] = []
      await forEachUrlLine(server.url, async (line) => {
        lines.push(line.toUpperCase())
      })
      expect(lines).toEqual(["LINE1", "LINE2"])
      server.stop()
    })
  })
})
