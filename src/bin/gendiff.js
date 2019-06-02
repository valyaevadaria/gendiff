#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('1.2.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstPath, secondPath) => console.log(genDiff(firstPath, secondPath, program.format)))
  .parse(process.argv);
