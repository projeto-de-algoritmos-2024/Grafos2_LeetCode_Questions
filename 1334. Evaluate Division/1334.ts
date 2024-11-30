function findTheCity(n: number, edges: number[][], distanceThreshold: number): number {
  const adjList: [number, number][][] = Array.from({ length: n }, () => []);
  for (const [from, to, weight] of edges) {
      adjList[from].push([to, weight]);
      adjList[to].push([from, weight]);
  }
  function dijkstra(start: number): number[] {
      const distances = Array(n).fill(Infinity);
      distances[start] = 0;

      const minHeap: [number, number][] = [[0, start]];

      while (minHeap.length > 0) {
          const [currentDist, currentNode] = minHeap.shift()!;

          if (currentDist > distances[currentNode]) continue;

          for (const [neighbor, weight] of adjList[currentNode]) {
              const newDist = currentDist + weight;
              if (newDist < distances[neighbor]) {
                  distances[neighbor] = newDist;
                  minHeap.push([newDist, neighbor]);
                  let i = minHeap.length - 1;
                  while (i > 0 && minHeap[i][0] < minHeap[i - 1][0]) {
                      [minHeap[i], minHeap[i - 1]] = [minHeap[i - 1], minHeap[i]];
                      i--;
                  }
              }
          }
      }
      return distances;
  }

  let resultCity = -1;
  let minReachable = n;

  for (let i = 0; i < n; i++) {
      const distances = dijkstra(i);
      const reachable = distances.filter((dist) => dist <= distanceThreshold).length - 1;

      if (reachable < minReachable || (reachable === minReachable && i > resultCity)) {
          minReachable = reachable;
          resultCity = i;
      }
  }

  return resultCity;
}
