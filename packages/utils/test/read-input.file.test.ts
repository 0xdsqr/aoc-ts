import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { join } from "path"
import { forEach, readFromFile, toArray } from "../src/read-input"

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
      const lines = await toArray(readFromFile(testFile))
      expect(lines).toEqual(["line1", "line2", "line3"])
    })

    it("should handle empty files", async () => {
      const emptyFile = join(import.meta.dir, "./fixtures/empty.txt")
      await Bun.write(emptyFile, "")

      const lines = await toArray(readFromFile(emptyFile))
      expect(lines).toEqual([])
    })

    it("should skip blank lines by default", async () => {
      const lines = await toArray(readFromFile(testFile))
      expect(lines).not.toContain("")
      expect(lines.length).toBe(3)
    })

    it("should include blank lines when skipEmpty is false", async () => {
      const blankFile = join(import.meta.dir, "./fixtures/blank.txt")
      await Bun.write(blankFile, "line1\n\nline2")

      const lines = await toArray(readFromFile(blankFile, { skipEmpty: false }))
      expect(lines).toContain("")
      expect(lines.length).toBe(3)
    })

    it("should trim whitespace from lines", async () => {
      const wsFile = join(import.meta.dir, "./fixtures/whitespace.txt")
      await Bun.write(wsFile, "  line1  \n  line2  \n")

      const lines = await toArray(readFromFile(wsFile))
      expect(lines).toEqual(["line1", "line2"])
    })
  })

  describe("forEach helper with readFromFile", () => {
    it("should execute callback for each line", async () => {
      const lines: string[] = []
      await forEach(readFromFile(testFile), (line) => {
        lines.push(line)
      })
      expect(lines).toEqual(["line1", "line2", "line3"])
    })

    it("should handle async callbacks", async () => {
      const lines: string[] = []
      await forEach(readFromFile(testFile), async (line) => {
        lines.push(line.toUpperCase())
      })
      expect(lines).toEqual(["LINE1", "LINE2", "LINE3"])
    })

    it("should pass index to callback", async () => {
      const collected: { line: string; index: number }[] = []
      await forEach(readFromFile(testFile), (line, index) => {
        collected.push({ line, index })
      })

      expect(collected).toEqual([
        { line: "line1", index: 0 },
        { line: "line2", index: 1 },
        { line: "line3", index: 2 },
      ])
    })
  })
})
