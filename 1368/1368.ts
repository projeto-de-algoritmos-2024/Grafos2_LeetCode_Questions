function minCost(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    const directions = [
        [0, 1],  
        [0, -1], 
        [1, 0],  
        [-1, 0], 
    ];

    const dist = Array.from({ length: m }, () => Array(n).fill(Infinity));
    const queue: [number, number, number][] = [];

    const inBounds = (x: number, y: number) => x >= 0 && x < m && y >= 0 && y < n;

    dist[0][0] = 0;
    queue.push([0, 0, 0]);

    while (queue.length > 0) {
        queue.sort((a, b) => a[0] - b[0]);
        const [currentCost, x, y] = queue.shift()!;

        if (currentCost > dist[x][y]) continue;

        for (let d = 0; d < 4; d++) {
            const [dx, dy] = directions[d];
            const nx = x + dx;
            const ny = y + dy;

            if (!inBounds(nx, ny)) continue;

            const newCost = currentCost + (grid[x][y] === d + 1 ? 0 : 1);

            if (newCost < dist[nx][ny]) {
                dist[nx][ny] = newCost;
                queue.push([newCost, nx, ny]);
            }
        }
    }

    return dist[m - 1][n - 1];
}