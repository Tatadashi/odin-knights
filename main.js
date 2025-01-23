class Vertex {
  constructor(coord) {
    this.position = coord;
    this.x = coord[0];
    this.y = coord[1];
    this.moves = Infinity;
    this.prev = null;
  }
}

function djikstraAlgorithm(start, end) {
  const visited = [];
  const unvisited = [];
  start = new Vertex(start);
  end = new Vertex(end);

  start.moves = 0;
  unvisited.push(start);

  while (true) {
    const curr = unvisited.shift();
    visited.push(curr);

    if (JSON.stringify(curr.position) === JSON.stringify(end.position)) {
      return curr;
    }
    checkNeighbors(curr, visited, unvisited);
  }
}

function checkNeighbors(curr, visited, unvisited) {
  const dir = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  for (let i = 0; i < dir.length; i++) {
    const nextPosition = [curr.x + dir[i][0], curr.y + dir[i][1]];
    const neighbor = new Vertex(nextPosition);

    //since unweighted, first time seeing vertex will be shortest path, acting like BFS, otherwise have to refactor
    neighbor.moves = curr.moves + VERTEX_WEIGHT;
    neighbor.prev = curr;

    if (
      neighbor.x < 0 ||
      neighbor.x > BOARD_LENGTH ||
      neighbor.y < 0 ||
      neighbor.y > BOARD_LENGTH
    ) {
      continue;
    }

    if (
      visited.some(
        (vertex) =>
          JSON.stringify(vertex.position) === JSON.stringify(neighbor.position)
      )
    ) {
      continue;
    }

    unvisited.push(neighbor);
  }
}

function knightMoves(start, end) {
  const path = [];
  let endVertex = djikstraAlgorithm(start, end);

  while (endVertex) {
    path.unshift(endVertex.position);
    endVertex = endVertex.prev;
  }

  console.log(`You made it in ${path.length} moves! Here's your path:`);
  for (let i = 0; i < path.length; i++) {
    console.log(path[i]);
  }
}

const BOARD_LENGTH = 7;
const VERTEX_WEIGHT = 1;

knightMoves([0, 0], [7, 7]);
