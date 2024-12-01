function minDays(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  // Conta o número de ilhas diretamente no grid
  const countIslands = (): number => {
      let islandCount = 0;

      const dfs = (i: number, j: number) => {
          if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] !== 1) return;
          grid[i][j] = -1; // Marcar como visitado
          dfs(i - 1, j);
          dfs(i + 1, j);
          dfs(i, j - 1);
          dfs(i, j + 1);
      };

      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
              if (grid[i][j] === 1) {
                  islandCount++;
                  dfs(i, j);
              }
          }
      }

      // Restaurar o grid ao estado original
      for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
              if (grid[i][j] === -1) {
                  grid[i][j] = 1;
              }
          }
      }

      return islandCount;
  };

  // Verifica se já está desconectado
  if (countIslands() !== 1) return 0;

  // Testa com remoção de uma célula
  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          if (grid[i][j] === 1) {
              grid[i][j] = 0; // Remove temporariamente
              if (countIslands() !== 1) return 1;
              grid[i][j] = 1; // Reverte
          }
      }
  }

  return 2;
}