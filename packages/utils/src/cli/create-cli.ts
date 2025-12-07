import type { Cli, CliConfig, Command, CommandInput } from "./types"

export function createCli(config: CliConfig): Cli {
  const commands: Command[] = []

  return {
    registerCommand: (command: Command) => {
      commands.push(command)
    },
    run: async (args: string[]) => {
      const commandName = args[0]
      const command = commandName ? commands.find(
        (cmd) => cmd.name === commandName || cmd.aliases?.includes(commandName)
      ) : undefined

      if (!command) {
        console.error(`Unknown command: ${commandName}`)
        console.log(`\nAvailable commands:`)
        commands.forEach((cmd) => {
          console.log(`  ${cmd.name} - ${cmd.description}`)
        })
        process.exit(1)
      }

      const input: CommandInput = {
        args: args.slice(1),
        options: {},
        flags: {},
      }

      await command.handler(input)
    },
  }
}
