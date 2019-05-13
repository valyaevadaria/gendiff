#!/usr/bin/env node
import commander from 'commander';

const program = commander;

program
  .version('0.0.9')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
