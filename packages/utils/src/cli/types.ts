export interface CommandInput {
  args: string[]
  options: Record<string, unknown>
  flags: Record<string, unknown>
}

export interface Command {
  name: string
  description: string
  aliases?: string[]
  handler: (input: CommandInput) => Promise<void> | void
}

export interface CliConfig {
  name: string
  version: string
}

export interface Cli {
  registerCommand: (command: Command) => void
  run: (args: string[]) => Promise<void>
}
