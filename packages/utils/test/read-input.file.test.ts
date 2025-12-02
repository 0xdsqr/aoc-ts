import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { join } from "path"
import { forEachFileLine, readFromFile } from "../src/read-input"

describe("read-input - file operations", () => {
  const testFile = join(import.meta.dir, "./fixtures/test-input.txt")

  beforeEach(async () => {
    await Bun.write(testFile, "line1\nline2\n\nline3\n")
  })

  afterEach(async () => {
    try {
      await Bun.write(testFile, "")
    } catch {}
  })

  describe("readFromFile", () => {
    it("should read lines from file", async () => {
      const lines: string[] = []
      for await (const line of readFromFile(testFile)) {
        lines.push(line)
      }
      expect(lines).toEqual(["line1", "line2", "line3"])
    })

    it("should handle empty files", async () => {
      const emptyFile = join(import.meta.dir, "./fixtures/empty.txt")
      await Bun.write(emptyFile, "")

      const lines: string[] = []
      for await (const line of readFromFile(emptyFile)) {
        lines.push(line)
      }
      expect(lines).toEqual([])
    })

    it("should skip blank lines", async () => {
      const lines: string[] = []
      for await (const line of readFromFile(testFile)) {
        lines.push(line)
      }
      expect(lines).not.toContain("")
    })

    it("should trim whitespace from lines", async () => {
      const wsFile = join(import.meta.dir, "./fixtures/whitespace.txt")
      await Bun.write(wsFile, "  line1  \n  line2  \n")

      const lines: string[] = []
      for await (const line of readFromFile(wsFile)) {
        lines.push(line)
      }
      expect(lines).toEqual(["line1", "line2"])
    })
  })

  describe("forEachFileLine", () => {
    it("should execute callback for each line", async () => {
      const lines: string[] = []
      await forEachFileLine(testFile, (line) => {
        lines.push(line)
      })
      expect(lines).toEqual(["line1", "line2", "line3"])
    })

    it("should handle async callbacks", async () => {
      const lines: string[] = []
      await forEachFileLine(testFile, async (line) => {
        lines.push(line.toUpperCase())
      })
      expect(lines).toEqual(["LINE1", "LINE2", "LINE3"])
    })

    it("should handle sync callbacks", async () => {
      let count = 0
      await forEachFileLine(testFile, () => {
        count++
      })
      expect(count).toBe(3)
    })
  })
})
