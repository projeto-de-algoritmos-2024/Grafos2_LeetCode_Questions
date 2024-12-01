function minDays(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const isDisconnected = () => countIslands() !== 1;

  const countIslands = (): number => {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    let islandCount = 0;

    const dfs = (i: number, j: number) => {
      if (
        i < 0 ||
        i >= rows ||
        j < 0 ||
        j >= cols ||
        visited[i][j] ||
        grid[i][j] === 0
      ) {
        return;
      }
      visited[i][j] = true;
      dfs(i - 1, j);
      dfs(i + 1, j);
      dfs(i, j - 1);
      dfs(i, j + 1);
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 1 && !visited[i][j]) {
          islandCount++;
          dfs(i, j);
        }
      }
    }

    return islandCount;
  };

  if (isDisconnected()) return 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        grid[i][j] = 0;
        if (isDisconnected()) return 1;
        grid[i][j] = 1;
      }
    }
  }

  return 2;
}
