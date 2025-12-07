const logger = {
  log: (...args: unknown[]) => console.log(...args),
  error: (...args: unknown[]) => console.error(...args),
  warn: (...args: unknown[]) => console.warn(...args),
  info: (...args: unknown[]) => console.info(...args),
}

const spinner = (message: string) => ({
  start: () => console.log(`⏳ ${message}`),
  succeed: (msg?: string) => console.log(`✓ ${msg || message}`),
  fail: (msg?: string) => console.error(`✗ ${msg || message}`),
})

export { logger, spinner }
