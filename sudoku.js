const _ = require('lodash');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const cross = (cols, rows) => {
  const squares = [];

  [...cols].forEach(col => [...rows].forEach(row => squares.push(`${col}${row}`)));

  return squares;
};

const chunkArray = (array, size) => _.chunk(array, size).map(s => s.join(''));

const makeGraph = (list) => {
  const size = Math.sqrt(list.length);
  const cols = alphabet.substr(0, size).split('');
  const rows = _.range(1, size + 1);

  const squares = cross(cols, rows);

  const rowsList = rows.map(row => cross(cols, [row]));

  const colsList = cols.map(col => cross([col], rows));

  const boxes = [];
  const boxSize = Math.sqrt(size);
  const chunckedCol = chunkArray(cols, boxSize);
  const chunckedRow = chunkArray(rows, boxSize);

  chunckedCol.forEach(col => chunckedRow.forEach(row => boxes.push(cross(col, row))));

  const unitList = [...rowsList, ...colsList, ...boxes];

  const units = {};
  squares.forEach((square) => {
    unitList.forEach((unit) => {
      if (unit.includes(square)) {
        units[square] = units[square] || [];
        units[square].push(unit);
      }
    });
  });

  const peers = {};
  squares.forEach((square) => {
    const set = new Set();
    units[square].forEach((unit) => {
      unit.forEach((s) => {
        if (square !== s) {
          set.add(s);
        }
      });
      peers[square] = [...set.values()];
    });
  });

  const graph = [];
  _.zip(squares, list).forEach(([key, value]) => {
    graph.push({
      vertex: key,
      status: value !== 0,
      color: value !== 0 ? value : rows,
      adjList: peers[key],
    });
  });

  return graph;
};

const getVertex = (graph, vertex) => graph.filter(v => v.vertex === vertex)[0];

const updateVertex = (vertex) => {
  if (!vertex.status && vertex.color.length === 1) {
    return { ...vertex, color: vertex.color[0], status: true };
  }

  return vertex;
};

const computeWelshpowell = (graph) => {
  const computedGraph = graph
    .map((v) => {
      if (v.status) return v;

      return {
        ...v,
        color: v.adjList.reduce((color, adj) => {
          const adjVertex = getVertex(graph, adj);
          if (adjVertex.status) return color.filter(c => adjVertex.color !== c);
          return color;
        }, v.color),
      };
    })
    .map(updateVertex);

  if (computedGraph.filter(v => !v.status).length === 0) {
    return computedGraph;
  }

  return computeWelshpowell(computedGraph);
};

module.exports.parseString = (string) => {
  const values = string
    .replace(/\./g, '0')
    .split('')
    .map(c => parseInt(c, 10));

  return makeGraph(values);
};

module.exports.solvePuzzle = (graph) => {
  const solvedGraph = computeWelshpowell(graph);

  return solvedGraph.map(v => v.color);
};
