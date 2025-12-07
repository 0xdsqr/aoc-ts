#!/usr/bin/env bun

import { createCli } from "./create-cli.js"
import { scaffoldDayCommand } from "./commands/scaffold.js"

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
