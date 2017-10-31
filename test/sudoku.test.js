const test = require('ava');
const fs = require('fs');
const sudoku = require('../sudoku');

const puzzleString = '.....3..1.2....4';
const puzzleGraph = JSON.parse(fs.readFileSync('test/graph.json'));

test('should parse puzzle string', async (t) => {
  const graph = sudoku.parseString(puzzleString);

  t.deepEqual(
    graph,
    puzzleGraph,
  );
});

test('should solve puzzle', async (t) => {
  const puzzle = sudoku.parseString(puzzleString);
  const solvedPuzzle = sudoku.solvePuzzle(puzzle);

  t.deepEqual(
    solvedPuzzle,
    [
      4, 1, 3, 2,
      2, 3, 4, 1,
      1, 4, 2, 3,
      3, 2, 1, 4,
    ],
  );
});
