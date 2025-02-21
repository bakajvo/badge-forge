#!/usr/bin/env node
import { Command } from 'commander'
import { generate } from './generate.js'
import { CliOptions } from './types.js'

const cli = new Command()

cli.name('badge-forge')
    .description('Forge your own GitHub badges!')
    .option('-d, --debug', 'Turn on debug mode')
    .version('1.0.0')

cli.command('generate').description('Generate GitHub badges').action(generate)

cli.parse(process.argv)

const { debug: isDebug = false } = cli.opts<CliOptions>()

export { cli, isDebug }
