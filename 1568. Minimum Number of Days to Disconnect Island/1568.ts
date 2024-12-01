function minDays(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;

    const countIslands = (): number => {
        let islandCount = 0;

        const dfs = (i: number, j: number) => {
            if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] !== 1) return;
            grid[i][j] = -1;
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

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === -1) {
                    grid[i][j] = 1;
                }
            }
        }

        return islandCount;
    };

    if (countIslands() !== 1) return 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                grid[i][j] = 0;
                if (countIslands() !== 1) return 1;
                grid[i][j] = 1;
            }
        }
    }

    return 2;
}
