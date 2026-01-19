export function removeDuplicates<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array));
}

export function chunkArray<T>(array: readonly T[], groupSize: number): T[][] {
  if (groupSize <= 0) {
    return [];
  }
  
  const chunks: T[][] = [];
  for (let index = 0; index < array.length; index += groupSize) {
    chunks.push(array.slice(index, index + groupSize));
  }
  return chunks;
}

export function groupBy<T, K extends string | number>(
  array: readonly T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((result, item) => {
    const key = getKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

export function findItem<T>(
  array: readonly T[],
  predicate: (item: T) => boolean
): T | undefined {
  return array.find(predicate);
}

export function filterItems<T>(
  array: readonly T[],
  predicate: (item: T) => boolean
): T[] {
  return array.filter(predicate);
}
