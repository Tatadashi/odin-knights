//Graph Traversal like Maze but instead of 4 directions, use Shortest Distance
function hop(curr, end, seen, path) {
  //base case
  if (
    curr.y < 0 ||
    curr.y > BOARD_LENGTH ||
    curr.x < 0 ||
    curr.x > BOARD_LENGTH
  ) {
    return false;
  }

  if (curr.y === end.y && curr.x === end.x) {
    path.push(end);
    return true;
  }

  if (seen[curr.y][curr.x]) {
    return false;
  }

  //pre
  seen[curr.y][curr.x] = true;
  path.push(curr);

  //recurse
  const [x, y] = dir[0];
  if (hop({ x: curr.x + x, y: curr.y + y }, end, seen, path)) {
    return true;
  }

  //post
  path.pop();
}

function knightMoves(start = [0, 0], end = [4, 2]) {
  const path = [];
  const seen = [];
  start = { x: start[0], y: start[1] };
  end = { x: end[0], y: end[1] };

  for (let i = 0; i < BOARD_LENGTH; i++) {
    seen.push(new Array(BOARD_LENGTH).fill(false));
  }

  hop(start, end, seen, path);

  console.log(`You made it in ${path.length} moves! Here's your path:`);
  for (let i = 0; i < path.length; i++) {
    console.log(path[i]);
  }
}

const dir = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];
const BOARD_LENGTH = 7;

knightMoves();
