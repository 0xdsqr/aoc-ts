import { logger } from "./index.js"

function assert<T>(
  value: T,
  expected: T,
  message?: string,
): asserts value is T {
  if (value !== expected) {
    const msg =
      message || `Assertion failed: expected ${expected}, got ${value}`
    logger.error(msg)
    throw new Error(msg)
  }
}

function assertEqual<T>(actual: T, expected: T, label?: string): void {
  if (actual !== expected) {
    const msg = label
      ? `${label}: expected ${expected}, got ${actual}`
      : `expected ${expected}, got ${actual}`
    logger.error(msg)
    throw new Error(msg)
  }
}

export { assert, assertEqual }
