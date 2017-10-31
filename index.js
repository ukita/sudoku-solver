#!/usr/bin/env node
const yargs = require('yargs');
const clear = require('clear');
const _ = require('lodash');
const CliTable = require('cli-table2');

const sudoku = require('./sudoku');

clear();

const { argv } = yargs
  .options({
    puzzle: {
      alias: 'p',
      describe: 'Sudoku puzzle to be solved',
      string: true,
      demandOption: true,
    },
  })
  .help()
  .alias('help', 'h');

const graph = sudoku.parseString(argv.puzzle);
const solvedPuzzle = sudoku.solvePuzzle(graph);
const size = Math.sqrt(solvedPuzzle.length);

const drawTable = (...array) => {
  const table = new CliTable({
    style: {
      head: [],
      border: [],
    },
  });

  table.push(...array);
  return table.toString();
};

console.log('Given puzzle');
console.log(drawTable(..._.chunk(graph.map(v => (typeof v.color === 'object' ? '-' : v.color)), size)));

console.log('Solved puzzle');
console.log(drawTable(..._.chunk(solvedPuzzle, size)));
