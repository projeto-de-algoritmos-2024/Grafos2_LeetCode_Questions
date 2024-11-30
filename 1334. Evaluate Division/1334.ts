function findTheCity(
  n: number,
  edges: number[][],
  distanceThreshold: number
): number {
  const adjList: Map<number, [number, number][]> = new Map();
  for (let i = 0; i < n; i++) {
    adjList.set(i, []);
  }
  for (const [from, to, weight] of edges) {
    adjList.get(from)!.push([to, weight]);
    adjList.get(to)!.push([from, weight]);
  }

  function dijkstra(start: number): number[] {
    const distances = Array(n).fill(Infinity);
    distances[start] = 0;

    const minHeap: [number, number][] = [[0, start]];

    while (minHeap.length > 0) {
      minHeap.sort((a, b) => a[0] - b[0]);
      const [currentDist, currentNode] = minHeap.shift()!;

      if (currentDist > distances[currentNode]) continue;

      for (const [neighbor, weight] of adjList.get(currentNode)!) {
        const newDist = currentDist + weight;
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          minHeap.push([newDist, neighbor]);
        }
      }
    }

    return distances;
  }

  let resultCity = -1;
  let minReachable = n;

  for (let i = 0; i < n; i++) {
    const distances = dijkstra(i);
    const reachable = distances.filter(
      (dist) => dist <= distanceThreshold
    ).length;

    if (
      reachable < minReachable ||
      (reachable === minReachable && i > resultCity)
    ) {
      minReachable = reachable;
      resultCity = i;
    }
  }

  return resultCity;
}
