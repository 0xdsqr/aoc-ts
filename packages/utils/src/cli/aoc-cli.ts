#!/usr/bin/env bun

import { createCli } from "@aoc/cli"
import { scaffoldDayCommand } from "./commands/scaffold"

const cli = createCli({
  name: "dsqr-aoc",
  version: "0.0.1",
})

cli.registerCommand({
  name: "scaffold",
  description: "Create a new day scaffold with solution and test files",
  aliases: ["new"],
  handler: scaffoldDayCommand,
})

cli.run(process.argv.slice(2))
